import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";

import { normalizeCommonsLicense, stripCommonsHtml } from "./license.js";
import type { CommonsCandidate, CommonsCandidateManifest } from "./types.js";

export const COMMONS_API = "https://commons.wikimedia.org/w/api.php";

interface CommonsMetadataValue {
  value?: string;
}

interface CommonsPage {
  pageid?: number;
  title?: string;
  imageinfo?: Array<{
    url?: string;
    descriptionurl?: string;
    mime?: string;
    width?: number;
    height?: number;
    extmetadata?: Record<string, CommonsMetadataValue | undefined>;
  }>;
}

interface CommonsResponse {
  query?: { pages?: CommonsPage[] };
}

function candidateFromPage(page: CommonsPage): CommonsCandidate | undefined {
  const info = page.imageinfo?.[0];
  if (!page.pageid || !page.title || !info?.url || !info.descriptionurl || !info.mime) return undefined;
  const metadata = info.extmetadata ?? {};
  const licenseRaw = stripCommonsHtml(
    metadata.LicenseShortName?.value ?? metadata.License?.value ?? metadata.UsageTerms?.value,
  );
  const license = normalizeCommonsLicense(licenseRaw) ?? null;
  const artist = stripCommonsHtml(metadata.Artist?.value);
  const credit = stripCommonsHtml(metadata.Credit?.value ?? metadata.Attribution?.value);
  const rejectionReasons: string[] = [];
  if (!license) rejectionReasons.push("license is not on the Civiliverse whitelist");
  if (!artist) rejectionReasons.push("creator/artist metadata is missing");
  if (!credit) rejectionReasons.push("credit/attribution metadata is missing");

  return {
    page_id: page.pageid,
    title: page.title,
    description_url: info.descriptionurl,
    original_url: info.url,
    mime: info.mime,
    ...(info.width === undefined ? {} : { width: info.width }),
    ...(info.height === undefined ? {} : { height: info.height }),
    artist,
    credit,
    license,
    license_raw: licenseRaw,
    eligible: rejectionReasons.length === 0,
    rejection_reasons: rejectionReasons,
  };
}

export async function searchCommons(options: {
  query: string;
  limit?: number;
  outputFile?: string;
  fetchImpl?: typeof fetch;
}): Promise<CommonsCandidateManifest> {
  const parameters = new URLSearchParams({
    action: "query",
    format: "json",
    formatversion: "2",
    generator: "search",
    gsrsearch: options.query,
    gsrnamespace: "6",
    gsrlimit: String(Math.min(Math.max(options.limit ?? 20, 1), 50)),
    prop: "imageinfo",
    iiprop: "url|mime|size|extmetadata",
    origin: "*",
  });
  const fetchImpl = options.fetchImpl ?? fetch;
  const response = await fetchImpl(`${COMMONS_API}?${parameters}`, {
    headers: { "user-agent": "CiviliverseDataPipeline/0.1 (https://civiliverse.com)" },
  });
  if (!response.ok) {
    throw new Error(`Wikimedia Commons API returned ${response.status} ${response.statusText}`);
  }
  const body = (await response.json()) as CommonsResponse;
  const candidates = (body.query?.pages ?? [])
    .map(candidateFromPage)
    .filter((candidate): candidate is CommonsCandidate => candidate !== undefined)
    .sort((left, right) => Number(right.eligible) - Number(left.eligible) || left.title.localeCompare(right.title));
  const manifest: CommonsCandidateManifest = {
    schema_version: 1,
    generated_at: new Date().toISOString(),
    query: options.query,
    api: COMMONS_API,
    candidates,
  };

  if (options.outputFile) {
    const outputFile = resolve(options.outputFile);
    await mkdir(dirname(outputFile), { recursive: true });
    await writeFile(outputFile, `${JSON.stringify(manifest, null, 2)}\n`, "utf8");
  }
  return manifest;
}
