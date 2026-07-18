import type { Diagnostic, ValidationResult } from "./types.js";

function color(code: number, text: string, enabled: boolean): string {
  return enabled ? `\u001B[${code}m${text}\u001B[0m` : text;
}

export function formatDiagnostic(diagnostic: Diagnostic, colors = process.stdout.isTTY): string {
  const location = `${diagnostic.file}:${diagnostic.line}:${diagnostic.column}`;
  const severity = color(diagnostic.severity === "error" ? 31 : 33, diagnostic.severity, colors);
  return `${location} ${severity} ${diagnostic.code}: ${diagnostic.message}\n  fix: ${diagnostic.suggestion}`;
}

export function formatValidationResult(
  result: ValidationResult,
  colors = process.stdout.isTTY,
): string {
  const output = result.diagnostics.map((diagnostic) => formatDiagnostic(diagnostic, colors));
  const errorCount = result.diagnostics.filter(({ severity }) => severity === "error").length;
  const warningCount = result.diagnostics.length - errorCount;
  const label = errorCount === 0 ? color(32, "PASS", colors) : color(31, "FAIL", colors);
  output.push(
    `${label}: ${result.filesChecked} files, ${result.nodes.length} nodes, ${result.edges.length} edges, ${errorCount} errors, ${warningCount} warnings`,
  );
  return output.join("\n");
}
