import type {
  CiviliverseContext,
  CiviliverseEdge,
  CiviliverseNode,
} from "../../schema/index.js";

export type DiagnosticSeverity = "error" | "warning";

export interface SourcePosition {
  line: number;
  column: number;
}

export interface Diagnostic extends SourcePosition {
  file: string;
  severity: DiagnosticSeverity;
  code: string;
  message: string;
  suggestion: string;
  path?: Array<string | number>;
}

export interface LoadedNode {
  value: CiviliverseNode;
  file: string;
  locate(path: Array<string | number>): SourcePosition;
}

export interface LoadedEdge {
  value: CiviliverseEdge;
  file: string;
  locate(path: Array<string | number>): SourcePosition;
}

export interface LoadedContext {
  value: CiviliverseContext;
  file: string;
  locate(path: Array<string | number>): SourcePosition;
}

export interface ValidationResult {
  diagnostics: Diagnostic[];
  nodes: LoadedNode[];
  edges: LoadedEdge[];
  contexts: LoadedContext[];
  filesChecked: number;
}
