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
    aliases: z.array(z.string().min(1)).optional(),
    matcher: z.literal("manual").optional(),
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

function normalized(value: string, language: "zh" | "en"): string {
  const normalizedValue = value
    .normalize("NFKC")
    .replace(/[*_`“”\"'《》「」『』]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .toLocaleLowerCase("en");

  return language === "en"
    ? normalizedValue.replace(/\b(?:a|an|the)\s+/g, "")
    : normalizedValue;
}

function includesNormalized(
  haystack: string,
  needles: readonly string[],
  language: "zh" | "en",
): boolean {
  const normalizedHaystack = normalized(haystack, language);
  return needles.some((needle) => normalizedHaystack.includes(normalized(needle, language)));
}

function isRuleBasedTransliterationEntry(entry: { zh: string; en: string }): boolean {
  const emperor = /帝$/.test(entry.zh) && /^Emperor\b.+\bof\b/i.test(entry.en);
  const era = /(?:元年|年间)$/.test(entry.zh) && /\bera\b/i.test(entry.en);
  const sexagenary = /^[甲乙丙丁戊己庚辛壬癸][子丑寅卯辰巳午未申酉戌亥](?:年)?$/.test(entry.zh);
  return emperor || era || sexagenary;
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
    if (entry.matcher === "manual" || isRuleBasedTransliterationEntry(entry)) continue;
    const aliases = entry.aliases ?? [];
    const hasZh = includesNormalized(value.zh, [entry.zh, ...aliases], "zh");
    const hasEn = includesNormalized(value.en, [entry.en, ...aliases], "en");
    // Content is authored Chinese-first: check that an explicit Chinese controlled term
    // has a recognized English rendering. Reverse substring matching turns ordinary
    // English words such as "compass" or "elements" into unrelated false positives.
    if (hasZh && !hasEn) {
      mismatches.push({ severity: "warning", expected: entry, language: "en" });
    }
  }

  return mismatches;
}
