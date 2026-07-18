import { readFile } from "node:fs/promises";

import { isNode, LineCounter, parseDocument, type Document } from "yaml";

import type { Diagnostic, SourcePosition } from "./types.js";

interface YamlSource {
  data: unknown;
  document: Document.Parsed;
  locate(path: Array<string | number>): SourcePosition;
}

export interface ParsedSource {
  source?: YamlSource;
  diagnostics: Diagnostic[];
}

function normalizePath(file: string): string {
  return file.replaceAll("\\", "/");
}

function yamlErrorDiagnostic(
  file: string,
  message: string,
  line: number,
  column: number,
): Diagnostic {
  return {
    file: normalizePath(file),
    line,
    column,
    severity: "error",
    code: "yaml.syntax",
    message,
    suggestion: "Fix the YAML syntax at this location, then run validation again.",
  };
}

function createLocator(
  document: Document.Parsed,
  lineCounter: LineCounter,
  lineOffset: number,
): (path: Array<string | number>) => SourcePosition {
  return (path) => {
    let candidatePath = [...path];
    let offset: number | undefined;

    while (candidatePath.length > 0) {
      const value = document.getIn(candidatePath, true);
      if (isNode(value) && value.range) {
        offset = value.range[0];
        break;
      }
      candidatePath = candidatePath.slice(0, -1);
    }

    if (offset === undefined && isNode(document.contents) && document.contents.range) {
      offset = document.contents.range[0];
    }

    const position = lineCounter.linePos(offset ?? 0);
    return { line: position.line + lineOffset, column: position.col };
  };
}

function parseYamlText(file: string, yamlText: string, lineOffset: number): ParsedSource {
  const lineCounter = new LineCounter();
  const document = parseDocument(yamlText, {
    lineCounter,
    prettyErrors: false,
    strict: true,
    uniqueKeys: true,
  });
  const diagnostics: Diagnostic[] = document.errors.map((error) => {
    const position = error.linePos?.[0] ?? lineCounter.linePos(error.pos[0]);
    return yamlErrorDiagnostic(
      file,
      error.message.replace(/\s+at line \d+.*$/s, ""),
      position.line + lineOffset,
      position.col,
    );
  });

  if (diagnostics.length > 0) {
    return { diagnostics };
  }

  return {
    diagnostics,
    source: {
      data: document.toJS(),
      document,
      locate: createLocator(document, lineCounter, lineOffset),
    },
  };
}

export async function parseYamlFile(file: string): Promise<ParsedSource> {
  const text = await readFile(file, "utf8");
  return parseYamlText(file, text.replace(/^\uFEFF/, ""), 0);
}

export async function parseMarkdownFrontmatter(file: string): Promise<ParsedSource> {
  const text = (await readFile(file, "utf8")).replace(/^\uFEFF/, "");
  const lines = text.split(/\r?\n/);
  if (lines[0]?.trim() !== "---") {
    return {
      diagnostics: [
        {
          file: normalizePath(file),
          line: 1,
          column: 1,
          severity: "error",
          code: "frontmatter.missing",
          message: "Markdown node must start with a YAML frontmatter delimiter (---).",
          suggestion: "Add `---` on line 1, the node fields, and a closing `---` delimiter.",
        },
      ],
    };
  }

  const closingIndex = lines.findIndex((line, index) => index > 0 && line.trim() === "---");
  if (closingIndex < 0) {
    return {
      diagnostics: [
        {
          file: normalizePath(file),
          line: 1,
          column: 1,
          severity: "error",
          code: "frontmatter.unclosed",
          message: "YAML frontmatter has no closing --- delimiter.",
          suggestion: "Add a closing `---` line after the final frontmatter field.",
        },
      ],
    };
  }

  return parseYamlText(file, lines.slice(1, closingIndex).join("\n"), 1);
}
