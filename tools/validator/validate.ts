import { stat } from "node:fs/promises";
import { relative, resolve } from "node:path";

import fg from "fast-glob";
import type { ZodIssue } from "zod";

import {
  edgeSchema,
  isEndpointCombinationAllowed,
  nodeSchema,
} from "../../schema/index.js";
import type { Diagnostic, LoadedEdge, LoadedNode, ValidationResult } from "./types.js";
import { parseMarkdownFrontmatter, parseYamlFile } from "./yaml-source.js";

export const DEFAULT_INPUTS = ["content/nodes/**/*.md", "data/edges/**/*.{yaml,yml}"];

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

  return {
    diagnostics: [],
    node: { value: result.data, file: shownFile, locate: parsed.source.locate },
  };
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

function graphDiagnostics(nodes: LoadedNode[], edges: LoadedEdge[]): Diagnostic[] {
  const diagnostics: Diagnostic[] = [];
  const nodeById = new Map<string, LoadedNode>();

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

  for (const edge of edges) {
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
  const diagnostics: Diagnostic[] = [];

  for (const file of files) {
    if (file.toLowerCase().endsWith(".md")) {
      const loaded = await loadNode(cwd, file);
      diagnostics.push(...loaded.diagnostics);
      if (loaded.node) nodes.push(loaded.node);
    } else {
      const loaded = await loadEdges(cwd, file);
      diagnostics.push(...loaded.diagnostics);
      edges.push(...loaded.edges);
    }
  }

  diagnostics.push(...graphDiagnostics(nodes, edges));
  diagnostics.sort(
    (left, right) =>
      left.file.localeCompare(right.file) || left.line - right.line || left.column - right.column,
  );

  return { diagnostics, nodes, edges, filesChecked: files.length };
}
