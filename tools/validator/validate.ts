import { stat } from "node:fs/promises";
import { basename, relative, resolve } from "node:path";

import fg from "fast-glob";
import type { ZodIssue } from "zod";

import {
  contextSchema,
  edgeSchema,
  glossaryMismatches,
  isEndpointCombinationAllowed,
  nodeSchema,
} from "../../schema/index.js";
import type {
  Diagnostic,
  LoadedContext,
  LoadedEdge,
  LoadedNode,
  ValidationResult,
} from "./types.js";
import { parseMarkdownFrontmatter, parseYamlFile } from "./yaml-source.js";

type LocatedRecord = LoadedNode | LoadedEdge | LoadedContext;

interface LocatedBilingualValue {
  value: { zh: string; en: string };
  path: Array<string | number>;
}

interface LocatedStringValue {
  value: string;
  path: Array<string | number>;
}

const EMBEDDED_YAML_FIELD_RESIDUE =
  /[}\]]\s*,?\s*(schema_version|source|target|type|importance|note|refs|disputed)\s*:\s*\S[^,}\]]*$/i;

function bilingualValues(value: unknown, path: Array<string | number> = []): LocatedBilingualValue[] {
  if (Array.isArray(value)) {
    return value.flatMap((item, index) => bilingualValues(item, [...path, index]));
  }
  if (typeof value !== "object" || value === null) return [];

  const record = value as Record<string, unknown>;
  if (typeof record.zh === "string" && typeof record.en === "string") {
    return [{ value: { zh: record.zh, en: record.en }, path }];
  }

  return Object.entries(record).flatMap(([key, item]) => bilingualValues(item, [...path, key]));
}

function stringValues(value: unknown, path: Array<string | number> = []): LocatedStringValue[] {
  if (typeof value === "string") return [{ value, path }];
  if (Array.isArray(value)) {
    return value.flatMap((item, index) => stringValues(item, [...path, index]));
  }
  if (typeof value !== "object" || value === null) return [];

  return Object.entries(value).flatMap(([key, item]) => stringValues(item, [...path, key]));
}

function embeddedFieldResidueDiagnostics(records: LocatedRecord[]): Diagnostic[] {
  return records.flatMap((record) =>
    stringValues(record.value).flatMap(({ value, path }) => {
      const match = EMBEDDED_YAML_FIELD_RESIDUE.exec(value);
      if (!match) return [];

      const field = match[1];
      return [
        {
          file: record.file,
          ...record.locate(path),
          severity: "error",
          code: "content.embedded-yaml-field-residue",
          message: `String ends with text resembling a serialized \`${field}\` YAML field.`,
          suggestion:
            "Remove the residual serialized text from the string and restore the field as a sibling YAML key.",
          path,
        } satisfies Diagnostic,
      ];
    }),
  );
}

function glossaryDiagnostics(records: LocatedRecord[]): Diagnostic[] {
  return records.flatMap((record) =>
    bilingualValues(record.value).flatMap(({ value, path }) =>
      glossaryMismatches(value).map((mismatch) => {
        const diagnosticPath = [...path, mismatch.language];
        const found = value[mismatch.language];
        const expected = mismatch.expected[mismatch.language];
        const strict = mismatch.severity === "error";
        return {
          file: record.file,
          ...record.locate(diagnosticPath),
          severity: mismatch.severity,
          code: strict ? "glossary.strict-mismatch" : "glossary.translation-mismatch",
          message: strict
            ? `Controlled label \`${mismatch.expected.zh} / ${mismatch.expected.en}\` must match exactly; found \`${found}\`.`
            : `Preferred translation for \`${mismatch.expected.zh}\` is \`${mismatch.expected.en}\`; found \`${found}\`.`,
          suggestion: strict
            ? `Use the exact controlled ${mismatch.language} label \`${expected}\`.`
            : `Use \`${expected}\` or ask the content coordinator to review schema/data/glossary.json.`,
          path: diagnosticPath,
        } satisfies Diagnostic;
      }),
    ),
  );
}

export const DEFAULT_INPUTS = [
  "content/nodes/**/*.md",
  "content/edges/**/*.{yaml,yml}",
  "content/contexts/**/*.{yaml,yml}",
];

function displayPath(cwd: string, file: string): string {
  const path = relative(cwd, file) || file;
  return path.replaceAll("\\", "/");
}

function suggestionForIssue(issue: ZodIssue): string {
  const field = issue.path.at(-1);
  if (issue.code === "invalid_type" && issue.received === "undefined") {
    return `Add the required \`${String(field)}\` field using the schema example.`;
  }
  if (field === "license") {
    return "Use Public Domain, CC0, CC BY, or CC BY-SA with a supported version.";
  }
  if (field === "ai_generated") {
    return "Set `ai_generated` explicitly to `true` or `false`.";
  }
  if (field === "id" || field === "source" || field === "target") {
    return "Use a lowercase kebab-case identifier, for example `printing-press`.";
  }
  if (issue.path.includes("domains")) {
    return "Use a slug from schema/data/domains.json; the first item is the primary layout domain.";
  }
  if (field === "status") {
    return "Use one of the workflow statuses defined in schema/constants.ts.";
  }
  if (issue.code === "unrecognized_keys") {
    return "Remove or rename the unknown field; schema objects do not allow silent extra keys.";
  }
  return `Update \`${issue.path.join(".") || "document"}\` to match the generated JSON Schema.`;
}

function issuesToDiagnostics(
  file: string,
  issues: ZodIssue[],
  locate: (path: Array<string | number>) => { line: number; column: number },
  prefix: Array<string | number> = [],
): Diagnostic[] {
  return issues.map((issue) => {
    const path = [...prefix, ...issue.path];
    return {
      file,
      ...locate(path),
      severity: "error",
      code: `schema.${issue.code}`,
      message: issue.message,
      suggestion: suggestionForIssue(issue),
      path,
    };
  });
}

async function expandInputs(cwd: string, inputs: string[]): Promise<string[]> {
  const patterns: string[] = [];
  for (const input of inputs) {
    const absolute = resolve(cwd, input);
    const info = await stat(absolute).catch(() => undefined);
    if (info?.isDirectory()) {
      patterns.push(`${input.replaceAll("\\", "/")}/**/*.{md,yaml,yml}`);
    } else {
      patterns.push(input.replaceAll("\\", "/"));
    }
  }
  const matches = await fg(patterns, { cwd, absolute: true, onlyFiles: true, unique: true });
  return matches.sort((left, right) => left.localeCompare(right));
}

function nodePathDiagnostics(node: LoadedNode): Diagnostic[] {
  const parts = node.file.split("/");
  const contentIndex = parts.findIndex(
    (part, index) => part === "content" && parts[index + 1] === "nodes",
  );
  if (contentIndex < 0) return [];

  const relativeParts = parts.slice(contentIndex + 2);
  const diagnostics: Diagnostic[] = [];
  if (relativeParts.length !== 2) {
    diagnostics.push({
      file: node.file,
      ...node.locate(["type"]),
      severity: "error",
      code: "path.node-location",
      message: "Node files must be stored at content/nodes/{type}/{id}.md.",
      suggestion: `Move this file to content/nodes/${node.value.type}/${node.value.id}.md.`,
      path: ["type"],
    });
    return diagnostics;
  }

  const directoryType = relativeParts[0];
  if (directoryType !== node.value.type) {
    diagnostics.push({
      file: node.file,
      ...node.locate(["type"]),
      severity: "error",
      code: "path.node-type-mismatch",
      message: `Node type \`${node.value.type}\` does not match directory \`${directoryType}\`.`,
      suggestion: `Move this file to content/nodes/${node.value.type}/${node.value.id}.md or fix its type.`,
      path: ["type"],
    });
  }

  const filenameId = basename(relativeParts[1] ?? "", ".md");
  if (filenameId !== node.value.id) {
    diagnostics.push({
      file: node.file,
      ...node.locate(["id"]),
      severity: "error",
      code: "path.node-id-mismatch",
      message: `Node id \`${node.value.id}\` does not match filename \`${filenameId}.md\`.`,
      suggestion: `Rename the file to ${node.value.id}.md or fix its id.`,
      path: ["id"],
    });
  }
  return diagnostics;
}

async function loadNode(cwd: string, file: string): Promise<{
  node?: LoadedNode;
  diagnostics: Diagnostic[];
}> {
  const parsed = await parseMarkdownFrontmatter(file);
  const shownFile = displayPath(cwd, file);
  if (!parsed.source) {
    return {
      diagnostics: parsed.diagnostics.map((diagnostic) => ({ ...diagnostic, file: shownFile })),
    };
  }

  const result = nodeSchema.safeParse(parsed.source.data);
  if (!result.success) {
    return {
      diagnostics: issuesToDiagnostics(shownFile, result.error.issues, parsed.source.locate),
    };
  }

  const node: LoadedNode = { value: result.data, file: shownFile, locate: parsed.source.locate };
  return { diagnostics: nodePathDiagnostics(node), node };
}

function edgeEntries(data: unknown): Array<{
  data: unknown;
  prefix: Array<string | number>;
}> {
  if (Array.isArray(data)) {
    return data.map((value, index) => ({ data: value, prefix: [index] }));
  }
  if (typeof data === "object" && data !== null && "edges" in data) {
    const edges = (data as { edges?: unknown }).edges;
    if (Array.isArray(edges)) {
      return edges.map((value, index) => ({ data: value, prefix: ["edges", index] }));
    }
  }
  return [{ data, prefix: [] }];
}

async function loadEdges(cwd: string, file: string): Promise<{
  edges: LoadedEdge[];
  diagnostics: Diagnostic[];
}> {
  const parsed = await parseYamlFile(file);
  const shownFile = displayPath(cwd, file);
  if (!parsed.source) {
    return {
      edges: [],
      diagnostics: parsed.diagnostics.map((diagnostic) => ({ ...diagnostic, file: shownFile })),
    };
  }

  const edges: LoadedEdge[] = [];
  const diagnostics: Diagnostic[] = [];
  for (const entry of edgeEntries(parsed.source.data)) {
    const result = edgeSchema.safeParse(entry.data);
    if (!result.success) {
      diagnostics.push(
        ...issuesToDiagnostics(shownFile, result.error.issues, parsed.source.locate, entry.prefix),
      );
      continue;
    }
    edges.push({
      value: result.data,
      file: shownFile,
      locate: (path) => parsed.source!.locate([...entry.prefix, ...path]),
    });
  }
  return { edges, diagnostics };
}

async function loadContext(cwd: string, file: string): Promise<{
  context?: LoadedContext;
  diagnostics: Diagnostic[];
}> {
  const parsed = await parseYamlFile(file);
  const shownFile = displayPath(cwd, file);
  if (!parsed.source) {
    return {
      diagnostics: parsed.diagnostics.map((diagnostic) => ({ ...diagnostic, file: shownFile })),
    };
  }

  const result = contextSchema.safeParse(parsed.source.data);
  if (!result.success) {
    return {
      diagnostics: issuesToDiagnostics(shownFile, result.error.issues, parsed.source.locate),
    };
  }

  return {
    diagnostics: [],
    context: { value: result.data, file: shownFile, locate: parsed.source.locate },
  };
}

function graphDiagnostics(
  nodes: LoadedNode[],
  edges: LoadedEdge[],
  contexts: LoadedContext[],
): Diagnostic[] {
  const diagnostics: Diagnostic[] = [];
  const nodeById = new Map<string, LoadedNode>();
  const contextById = new Map<string, LoadedContext>();
  const parallelByPair = new Map<string, LoadedEdge>();

  for (const node of nodes) {
    const previous = nodeById.get(node.value.id);
    if (previous) {
      diagnostics.push({
        file: node.file,
        ...node.locate(["id"]),
        severity: "error",
        code: "graph.duplicate-node-id",
        message: `Node id \`${node.value.id}\` is already defined in ${previous.file}.`,
        suggestion: "Give each node a globally unique lowercase kebab-case id.",
        path: ["id"],
      });
    } else {
      nodeById.set(node.value.id, node);
    }
  }

  for (const context of contexts) {
    const previous = contextById.get(context.value.id);
    if (previous) {
      diagnostics.push({
        file: context.file,
        ...context.locate(["id"]),
        severity: "error",
        code: "context.duplicate-id",
        message: `Context id \`${context.value.id}\` is already defined in ${previous.file}.`,
        suggestion: "Give each context a globally unique lowercase kebab-case id.",
        path: ["id"],
      });
    } else {
      contextById.set(context.value.id, context);
    }
  }

  for (const context of contexts) {
    if (context.value.parent && !contextById.has(context.value.parent)) {
      diagnostics.push({
        file: context.file,
        ...context.locate(["parent"]),
        severity: "error",
        code: "context.missing-parent",
        message: `Context parent references missing context \`${context.value.parent}\`.`,
        suggestion: `Add context \`${context.value.parent}\` or correct the parent id.`,
        path: ["parent"],
      });
    }
  }

  for (const edge of edges) {
    if (edge.value.type === "parallels") {
      const key = [edge.value.source, edge.value.target].sort().join("\u0000");
      const previous = parallelByPair.get(key);
      if (previous) {
        diagnostics.push({
          file: edge.file,
          ...edge.locate(["type"]),
          severity: "error",
          code: "graph.duplicate-parallels",
          message: `Undirected parallels edge duplicates ${previous.file}; A-B and B-A are the same edge.`,
          suggestion: "Keep one parallels edge and merge any notes or references into it.",
          path: ["type"],
        });
      } else {
        parallelByPair.set(key, edge);
      }
    }

    const source = nodeById.get(edge.value.source);
    const target = nodeById.get(edge.value.target);
    for (const [field, endpoint] of [
      ["source", source],
      ["target", target],
    ] as const) {
      if (!endpoint) {
        const id = edge.value[field];
        diagnostics.push({
          file: edge.file,
          ...edge.locate([field]),
          severity: "error",
          code: "graph.missing-endpoint",
          message: `Edge ${field} references missing node \`${id}\`.`,
          suggestion: `Add node \`${id}\` or correct the edge ${field} id.`,
          path: [field],
        });
      }
    }
    if (!source || !target) continue;

    if (source.value.type === "person" && target.value.type === "disaster") {
      diagnostics.push({
        file: edge.file,
        ...edge.locate(["source"]),
        severity: "error",
        code: "graph.person-to-disaster",
        message: "Person nodes cannot be the source of an edge targeting a disaster.",
        suggestion:
          "Model the institutional, technical, or ideological precondition instead of attributing a disaster to one person.",
        path: ["source"],
      });
    }

    if (!isEndpointCombinationAllowed(edge.value.type, source.value.type, target.value.type)) {
      diagnostics.push({
        file: edge.file,
        ...edge.locate(["type"]),
        severity: "error",
        code: "graph.illegal-endpoints",
        message: `${edge.value.type} does not allow ${source.value.type} -> ${target.value.type}.`,
        suggestion: "Choose a relationship allowed by schema/constants.ts ENDPOINT_RULES or fix its direction.",
        path: ["type"],
      });
    }
  }

  return diagnostics;
}

export async function validateRepository(options: {
  cwd?: string;
  inputs?: string[];
} = {}): Promise<ValidationResult> {
  const cwd = resolve(options.cwd ?? process.cwd());
  const files = await expandInputs(cwd, options.inputs?.length ? options.inputs : DEFAULT_INPUTS);
  const nodes: LoadedNode[] = [];
  const edges: LoadedEdge[] = [];
  const contexts: LoadedContext[] = [];
  const diagnostics: Diagnostic[] = [];

  for (const file of files) {
    if (file.toLowerCase().endsWith(".md")) {
      const loaded = await loadNode(cwd, file);
      diagnostics.push(...loaded.diagnostics);
      if (loaded.node) nodes.push(loaded.node);
    } else if (displayPath(cwd, file).includes("content/contexts/")) {
      const loaded = await loadContext(cwd, file);
      diagnostics.push(...loaded.diagnostics);
      if (loaded.context) contexts.push(loaded.context);
    } else {
      const loaded = await loadEdges(cwd, file);
      diagnostics.push(...loaded.diagnostics);
      edges.push(...loaded.edges);
    }
  }

  diagnostics.push(...graphDiagnostics(nodes, edges, contexts));
  diagnostics.push(...embeddedFieldResidueDiagnostics([...nodes, ...edges, ...contexts]));
  diagnostics.push(...glossaryDiagnostics([...nodes, ...edges, ...contexts]));
  diagnostics.sort(
    (left, right) =>
      left.file.localeCompare(right.file) || left.line - right.line || left.column - right.column,
  );

  return { diagnostics, nodes, edges, contexts, filesChecked: files.length };
}
