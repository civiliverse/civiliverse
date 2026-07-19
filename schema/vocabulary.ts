import { z } from "zod";

import domainsJson from "./data/domains.json" with { type: "json" };
import glossaryJson from "./data/glossary.json" with { type: "json" };

const domainTableSchema = z
  .object({
    version: z.literal(1),
    domains: z
      .array(
        z
          .object({
            slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
            zh: z.string().min(1),
            en: z.string().min(1),
          })
          .strict(),
      )
      .length(12),
  })
  .strict()
  .superRefine((table, context) => {
    for (const field of ["slug", "zh", "en"] as const) {
      const seen = new Set<string>();
      table.domains.forEach((domain, index) => {
        if (seen.has(domain[field])) {
          context.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["domains", index, field],
            message: `duplicate domain ${field}`,
          });
        }
        seen.add(domain[field]);
      });
    }
  });

const glossaryEntrySchema = z
  .object({
    zh: z.string().min(1),
    en: z.string().min(1),
    key: z.string().min(1).optional(),
    type: z.string().min(1).optional(),
  })
  .strict();

const glossaryTableSchema = z
  .object({
    version: z.literal(1),
    strict: z.array(glossaryEntrySchema),
    check: z.array(glossaryEntrySchema),
  })
  .strict();

export const DOMAIN_TABLE = domainTableSchema.parse(domainsJson);
export const GLOSSARY = glossaryTableSchema.parse(glossaryJson);

export const DOMAINS = DOMAIN_TABLE.domains.map(({ slug }) => slug) as [string, ...string[]];
export type Domain = (typeof DOMAINS)[number];

export const DOMAIN_LABELS: Readonly<Record<string, { readonly zh: string; readonly en: string }>> =
  Object.fromEntries(DOMAIN_TABLE.domains.map(({ slug, zh, en }) => [slug, { zh, en }]));

export const STRICT_LABELS: Readonly<Record<string, { readonly zh: string; readonly en: string }>> =
  Object.fromEntries(GLOSSARY.strict.map(({ key, zh, en }) => [key ?? en, { zh, en }]));

export interface BilingualValue {
  zh: string;
  en: string;
}

export interface GlossaryMismatch {
  severity: "error" | "warning";
  expected: BilingualValue;
  language: "zh" | "en";
}

function normalized(value: string): string {
  return value
    .normalize("NFKC")
    .replace(/[*_`“”\"]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .toLocaleLowerCase("en");
}

function includesNormalized(haystack: string, needle: string): boolean {
  return normalized(haystack).includes(normalized(needle));
}

export function glossaryMismatches(value: BilingualValue): GlossaryMismatch[] {
  const mismatches: GlossaryMismatch[] = [];

  for (const entry of GLOSSARY.strict) {
    const exactZh = value.zh.trim() === entry.zh;
    const exactEn = value.en.trim() === entry.en;
    if (exactZh && !exactEn) {
      mismatches.push({ severity: "error", expected: entry, language: "en" });
    } else if (exactEn && !exactZh) {
      mismatches.push({ severity: "error", expected: entry, language: "zh" });
    }
  }

  for (const entry of GLOSSARY.check) {
    const hasZh = includesNormalized(value.zh, entry.zh);
    const hasEn = includesNormalized(value.en, entry.en);
    if (hasZh && !hasEn) {
      mismatches.push({ severity: "warning", expected: entry, language: "en" });
    } else if (hasEn && !hasZh) {
      mismatches.push({ severity: "warning", expected: entry, language: "zh" });
    }
  }

  return mismatches;
}
