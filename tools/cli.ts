#!/usr/bin/env node

import { resolve } from "node:path";

import { Command } from "commander";

import { LEGACY_LICENSE_ALIASES, normalizeLicense } from "../schema/index.js";
import { importCommonsSelections } from "./commons/importer.js";
import { searchCommons } from "./commons/search.js";
import { writeGameIconAttribution } from "./game-icons/attribution.js";
import { buildGameIconIndex, GAME_ICONS_REPOSITORY } from "./game-icons/indexer.js";
import { searchGameIcons } from "./game-icons/search.js";
import { syncGameIcons } from "./game-icons/sync.js";
import { formatValidationResult } from "./validator/format.js";
import { validateRepository } from "./validator/validate.js";

const program = new Command();

function integer(value: string): number {
  const parsed = Number.parseInt(value, 10);
  if (!Number.isInteger(parsed) || parsed <= 0) throw new Error(`Expected a positive integer, got ${value}`);
  return parsed;
}

function commaSeparatedIntegers(value: string): number[] {
  return value.split(",").map((part) => integer(part.trim()));
}

function selectedValues(values: string[]): Array<string | number> {
  return values.flatMap((value) => value.split(",")).map((value) => {
    const trimmed = value.trim();
    return /^\d+$/.test(trimmed) ? Number.parseInt(trimmed, 10) : trimmed;
  });
}

program
  .name("civiliverse-data")
  .description("Civiliverse data pipeline and quality gate")
  .version("0.1.0");

program
  .command("validate")
  .description("Validate node Markdown, edge YAML, and graph endpoint rules")
  .argument("[paths...]", "files, directories, or glob patterns")
  .option("--cwd <directory>", "repository root", process.cwd())
  .option("--format <format>", "pretty or json", "pretty")
  .action(async (paths: string[], options: { cwd: string; format: string }) => {
    const result = await validateRepository({ cwd: options.cwd, inputs: paths });
    if (options.format === "json") {
      console.log(JSON.stringify(result, (_key, value) => (typeof value === "function" ? undefined : value), 2));
    } else if (options.format === "pretty") {
      console.log(formatValidationResult(result));
    } else {
      throw new Error(`Unknown output format: ${options.format}`);
    }
    if (result.diagnostics.some(({ severity }) => severity === "error")) process.exitCode = 1;
  });

const licenses = program
  .command("licenses")
  .description("Inspect and apply one-time legacy license normalization mappings");

licenses
  .command("normalize")
  .description("Print canonical whitelist values for legacy license strings")
  .argument("<values...>", "license values such as PD-old or CC-BY-3.0")
  .option("--json", "print machine-readable JSON")
  .action((values: string[], options: { json?: boolean }) => {
    const results = values.map((value) => ({ input: value, canonical: normalizeLicense(value) ?? null }));
    if (options.json) console.log(JSON.stringify(results, null, 2));
    else for (const result of results) console.log(`${result.input}\t${result.canonical ?? "UNSUPPORTED"}`);
    if (results.some(({ canonical }) => canonical === null)) process.exitCode = 1;
  });

licenses
  .command("aliases")
  .description("Print the complete one-time legacy license mapping")
  .action(() => console.log(JSON.stringify(LEGACY_LICENSE_ALIASES, null, 2)));

const icons = program.command("icons").description("Index and search the official Game Icons repository");

icons
  .command("sync")
  .description("Clone/update Game Icons, build the local index, and write attribution")
  .option("--repo-dir <directory>", "local Game Icons checkout", ".cache/game-icons/repo")
  .option("--source <url>", "source Git repository", GAME_ICONS_REPOSITORY)
  .option("--index <file>", "index JSON output", "data/generated/game-icons-index.json")
  .option("--attribution <file>", "attribution Markdown output", "ATTRIBUTION_GAME_ICONS.md")
  .action(async (options) => {
    const state = await syncGameIcons({
      repositoryDirectory: options.repoDir,
      sourceRepository: options.source,
    });
    const index = await buildGameIconIndex({
      repositoryDirectory: options.repoDir,
      outputFile: options.index,
      sourceRepository: options.source,
    });
    await writeGameIconAttribution({ indexFile: options.index, outputFile: options.attribution });
    console.log(`${state}: indexed ${index.icon_count} icons; attribution written to ${options.attribution}`);
  });

icons
  .command("index")
  .description("Build an index from an existing local Game Icons checkout")
  .requiredOption("--repo-dir <directory>", "local Game Icons checkout")
  .option("--index <file>", "index JSON output", "data/generated/game-icons-index.json")
  .option("--source <url>", "source repository URL", GAME_ICONS_REPOSITORY)
  .action(async (options) => {
    const index = await buildGameIconIndex({
      repositoryDirectory: options.repoDir,
      outputFile: options.index,
      sourceRepository: options.source,
    });
    console.log(`Indexed ${index.icon_count} icons to ${options.index}`);
  });

icons
  .command("search")
  .description("Search icon ids and aliases with English or Chinese keywords")
  .argument("<query>", "English or Chinese search terms")
  .option("--index <file>", "index JSON", "data/generated/game-icons-index.json")
  .option("--limit <number>", "maximum candidates", integer, 20)
  .option("--json", "print machine-readable JSON")
  .action(async (query: string, options) => {
    const results = await searchGameIcons({ indexFile: options.index, query, limit: options.limit });
    if (options.json) console.log(JSON.stringify(results, null, 2));
    else {
      for (const result of results) {
        console.log(`${result.id}\t${result.author}\t${result.preview_path}\t${result.source_url}`);
      }
    }
  });

icons
  .command("attribution")
  .description("Generate the Game Icons CC BY 3.0 attribution list from an index")
  .option("--index <file>", "index JSON", "data/generated/game-icons-index.json")
  .option("--out <file>", "attribution Markdown output", "ATTRIBUTION_GAME_ICONS.md")
  .action(async (options) => {
    await writeGameIconAttribution({ indexFile: options.index, outputFile: options.out });
    console.log(`Attribution written to ${options.out}`);
  });

const commons = program.command("commons").description("Review and import Wikimedia Commons images");

commons
  .command("search")
  .description("Create a review manifest; this command never imports images")
  .argument("<query>", "node search terms")
  .option("--limit <number>", "maximum candidates", integer, 20)
  .option("--out <file>", "candidate manifest", "reports/commons-candidates.json")
  .action(async (query: string, options) => {
    const manifest = await searchCommons({ query, limit: options.limit, outputFile: options.out });
    const eligible = manifest.candidates.filter(({ eligible }) => eligible).length;
    console.log(`Wrote ${manifest.candidates.length} candidates (${eligible} eligible) to ${options.out}`);
    console.log("Review the manifest, then use `commons import --select ... --confirm`.");
  });

commons
  .command("import")
  .description("Download explicitly selected, eligible candidates and create WebP derivatives")
  .requiredOption("--manifest <file>", "reviewed candidate manifest")
  .requiredOption("--select <values...>", "page ids or exact Commons titles")
  .requiredOption("--out <directory>", "image output directory")
  .option("--widths <list>", "comma-separated WebP widths", commaSeparatedIntegers, [320, 800, 1600])
  .option("--confirm", "confirm that a human reviewed and selected the candidates", false)
  .action(async (options) => {
    const attributions = await importCommonsSelections({
      manifestFile: resolve(options.manifest),
      selected: selectedValues(options.select),
      outputDirectory: resolve(options.out),
      confirmed: options.confirm,
      widths: options.widths,
    });
    console.log(`Imported ${attributions.length} Commons images to ${options.out}`);
  });

program.parseAsync(process.argv).catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
});
