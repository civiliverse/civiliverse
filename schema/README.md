# Civiliverse data contract

Zod in this directory is the source of truth. `pnpm schema:export` writes the
derived JSON Schema files to `schema/generated/`; generated files are build
artifacts and are not committed.

## Frozen v0 contract (2026-07-18)

- Node types: `tech`, `idea`, `person`, `wonder`, `disaster`.
- Edge types: `enables`, `derives`, `applies`, `informs`, `inspires`,
  `contributed`, `patronized`, `parallels`, `causes`, `regulates`.
- Node files live at `content/nodes/{type}/{id}.md`; frontmatter ids are bare
  kebab-case and globally unique.
- Cultures are the 11 slugs and bilingual labels in `constants.ts`.
- Domains are the 12 slugs and bilingual labels in `data/domains.json`; the
  first node domain is its primary layout domain.
- Endpoint combinations are the frozen table in `constants.ts`.
- `parallels` is undirected, and A-B duplicates B-A.
- `causes` accepts only `tech`, `idea`, or `wonder` as its source and requires a
  `disaster` target.
- `regulates` accepts only an `idea` source and a `tech` or `wonder` target.
- Disaster subtypes are `env`, `famine`, `accident`, and `atrocity`.
- Edge importance is `major` or `minor`.
- Edges live at `content/edges/*.yaml`.
- Historical contexts live at `content/contexts/*.yaml`; parent references are
  checked across the repository.
- Image licenses are restricted to Public Domain, CC0, CC BY, and CC BY-SA.
- Every image carries a bilingual caption, credit, source URL, license, and an
  explicit `ai_generated` boolean.
- Game Icons assets use CC BY 3.0.
- Game Icons ids use `author-slug/icon-slug`, because the official repository
  contains duplicate basenames under different creator directories.
- `licenses.ts` provides the one-time normalization map for legacy strings such
  as `PD-old` and `CC-BY-3.0`; strict schemas continue to accept only canonical
  values.

## Single-source design

Enums and the edge endpoint matrix remain centralized in `constants.ts`.
Machine-controlled domains and bilingual terminology live in
`data/domains.json` and `data/glossary.json`; `vocabulary.ts` validates and
exports those files for schema, validator, and downstream consumers. Strict
labels produce errors when a complete bilingual label is mismatched. Check-level
proper names and frequent terms produce review warnings when only one side uses
the preferred pair.
