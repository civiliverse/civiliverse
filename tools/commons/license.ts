import { IMAGE_LICENSES, type ImageLicense } from "../../schema/index.js";

function clean(value: string): string {
  return value
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;|&#160;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/\s+/g, " ")
    .trim();
}

export function normalizeCommonsLicense(rawValue: string): ImageLicense | undefined {
  const cleaned = clean(rawValue);
  const normalized = cleaned
    .toUpperCase()
    .replace(/CREATIVE COMMONS/g, "CC")
    .replace(/ATTRIBUTION-SHARE\s*ALIKE/g, "BY-SA")
    .replace(/ATTRIBUTION/g, "BY")
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (/^(PUBLIC DOMAIN|PD)( MARK)?$/.test(normalized)) return "Public Domain";
  if (/^CC\s*0(?:\s+1\.0)?$/.test(normalized)) return "CC0";

  const match = normalized.match(/^CC (BY(?: SA)?) (1\.0|2\.0|2\.5|3\.0|4\.0)(?: INTERNATIONAL)?$/);
  if (!match) return undefined;
  const family = match[1]?.replace(" ", "-");
  const version = match[2];
  const candidate = `CC ${family} ${version}`;
  return IMAGE_LICENSES.includes(candidate as ImageLicense) ? (candidate as ImageLicense) : undefined;
}

export function stripCommonsHtml(value: string | undefined): string {
  return clean(value ?? "");
}
