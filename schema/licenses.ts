import { IMAGE_LICENSES, type ImageLicense } from "./constants.js";

/** One-time aliases accepted by migration tools, never by the strict schema. */
export const LEGACY_LICENSE_ALIASES: Readonly<Record<string, ImageLicense>> = {
  "PD-old": "Public Domain",
  PD: "Public Domain",
  "CC-0": "CC0",
  "CC0-1.0": "CC0",
  "CC-BY-1.0": "CC BY 1.0",
  "CC-BY-2.0": "CC BY 2.0",
  "CC-BY-2.5": "CC BY 2.5",
  "CC-BY-3.0": "CC BY 3.0",
  "CC-BY-4.0": "CC BY 4.0",
  "CC-BY-SA-1.0": "CC BY-SA 1.0",
  "CC-BY-SA-2.0": "CC BY-SA 2.0",
  "CC-BY-SA-2.5": "CC BY-SA 2.5",
  "CC-BY-SA-3.0": "CC BY-SA 3.0",
  "CC-BY-SA-4.0": "CC BY-SA 4.0",
};

export function normalizeLicense(value: string): ImageLicense | undefined {
  if (IMAGE_LICENSES.includes(value as ImageLicense)) return value as ImageLicense;
  return LEGACY_LICENSE_ALIASES[value];
}
