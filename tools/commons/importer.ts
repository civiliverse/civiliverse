import { mkdir, readFile, writeFile } from "node:fs/promises";
import { extname, relative, resolve } from "node:path";

import sharp from "sharp";
import { stringify as stringifyYaml } from "yaml";

import type {
  CommonsAttribution,
  CommonsCandidate,
  CommonsCandidateManifest,
} from "./types.js";

function safeStem(title: string): string {
  const withoutNamespace = title.replace(/^File:/i, "").replace(/\.[^.]+$/, "");
  const stem = withoutNamespace
    .normalize("NFKD")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
  return stem || "commons-image";
}

function extensionFor(candidate: CommonsCandidate): string {
  const fromUrl = extname(new URL(candidate.original_url).pathname).toLowerCase();
  if (/^\.[a-z0-9]{2,5}$/.test(fromUrl)) return fromUrl;
  const subtype = candidate.mime.split("/")[1]?.replace("jpeg", "jpg");
  return subtype ? `.${subtype}` : ".bin";
}

function portablePath(root: string, file: string): string {
  return relative(root, file).replaceAll("\\", "/");
}

function validateDownloadUrl(value: string): void {
  const url = new URL(value);
  if (url.protocol !== "https:" || !url.hostname.endsWith("wikimedia.org")) {
    throw new Error(`Refusing non-Wikimedia download URL: ${value}`);
  }
}

async function download(candidate: CommonsCandidate, outputFile: string, fetchImpl: typeof fetch) {
  validateDownloadUrl(candidate.original_url);
  const response = await fetchImpl(candidate.original_url, {
    headers: { "user-agent": "CiviliverseDataPipeline/0.1 (https://civiliverse.com)" },
  });
  if (!response.ok) {
    throw new Error(`Download failed for ${candidate.title}: ${response.status} ${response.statusText}`);
  }
  const bytes = Buffer.from(await response.arrayBuffer());
  await writeFile(outputFile, bytes);
}

export async function importCommonsSelections(options: {
  manifestFile: string;
  selected: Array<string | number>;
  outputDirectory: string;
  confirmed: boolean;
  widths?: number[];
  fetchImpl?: typeof fetch;
}): Promise<CommonsAttribution[]> {
  if (!options.confirmed) {
    throw new Error("Human confirmation is required; re-run with --confirm after reviewing candidates.");
  }
  const manifest = JSON.parse(
    await readFile(resolve(options.manifestFile), "utf8"),
  ) as CommonsCandidateManifest;
  const selected = new Set(options.selected.map(String));
  if (selected.size === 0) throw new Error("Select at least one candidate by page id or exact title.");
  const candidates = manifest.candidates.filter(
    (candidate) => selected.has(String(candidate.page_id)) || selected.has(candidate.title),
  );
  if (candidates.length !== selected.size) {
    const matched = new Set(candidates.flatMap((candidate) => [String(candidate.page_id), candidate.title]));
    const missing = [...selected].filter((value) => !matched.has(value));
    throw new Error(`Selected candidates were not found: ${missing.join(", ")}`);
  }
  const ineligible = candidates.filter((candidate) => !candidate.eligible || !candidate.license);
  if (ineligible.length > 0) {
    throw new Error(
      `Cannot import ineligible Commons candidates: ${ineligible.map(({ title }) => title).join(", ")}`,
    );
  }

  const outputDirectory = resolve(options.outputDirectory);
  const originalsDirectory = resolve(outputDirectory, "original");
  const derivativesDirectory = resolve(outputDirectory, "webp");
  await mkdir(originalsDirectory, { recursive: true });
  await mkdir(derivativesDirectory, { recursive: true });
  const widths = [...new Set(options.widths ?? [320, 800, 1600])].sort((a, b) => a - b);
  const fetchImpl = options.fetchImpl ?? fetch;
  const attributions: CommonsAttribution[] = [];

  for (const candidate of candidates) {
    const stem = `${safeStem(candidate.title)}-${candidate.page_id}`;
    const originalFile = resolve(originalsDirectory, `${stem}${extensionFor(candidate)}`);
    await download(candidate, originalFile, fetchImpl);
    const derivatives: Array<{ width: number; file: string }> = [];
    for (const width of widths) {
      const derivativeFile = resolve(derivativesDirectory, `${stem}-${width}w.webp`);
      await sharp(originalFile)
        .rotate()
        .resize({ width, withoutEnlargement: true })
        .webp({ quality: 82 })
        .toFile(derivativeFile);
      derivatives.push({ width, file: portablePath(outputDirectory, derivativeFile) });
    }
    attributions.push({
      page_id: candidate.page_id,
      title: candidate.title,
      source_url: candidate.description_url,
      original_url: candidate.original_url,
      artist: candidate.artist,
      credit: candidate.credit,
      license: candidate.license!,
      ai_generated: false,
      original_file: portablePath(outputDirectory, originalFile),
      derivatives,
    });
  }

  await writeFile(
    resolve(outputDirectory, "attribution.json"),
    `${JSON.stringify({ schema_version: 1, images: attributions }, null, 2)}\n`,
    "utf8",
  );
  const imageFragments = attributions.map((attribution) => ({
    src: attribution.derivatives.at(-1)?.file ?? attribution.original_file,
    // Intentionally invalid until the content team supplies both captions.
    caption: { zh: "", en: "" },
    credit: `${attribution.artist}; ${attribution.credit}`,
    license: attribution.license,
    source_url: attribution.source_url,
    ai_generated: false,
  }));
  await writeFile(
    resolve(outputDirectory, "images.yaml"),
    stringifyYaml({ images: imageFragments }, { lineWidth: 0 }),
    "utf8",
  );

  return attributions;
}
