# Civiliverse data contract

Zod in this directory is the source of truth. `pnpm schema:export` writes the
derived JSON Schema files to `schema/generated/`; generated files are build
artifacts and are not committed.

## Fixed by the v1.0 brief

- Node types: `tech`, `idea`, `person`, `wonder`, `disaster`.
- Edge types: `enables`, `derives`, `applies`, `informs`, `inspires`,
  `contributed`, `patronized`, `parallels`, `causes`.
- `parallels` is undirected; the other edge types are directed.
- The target of `causes` must be a `disaster`.
- Edge importance is `major` or `minor`.
- Image licenses are restricted to Public Domain, CC0, CC BY, and CC BY-SA.
- Every image carries a bilingual caption, credit, source URL, license, and an
  explicit `ai_generated` boolean.
- Game Icons assets use CC BY 3.0.
- Game Icons ids use `author-slug/icon-slug`, because the official repository
  contains duplicate basenames under different creator directories.

## Coordinator confirmation required

The repository did not contain the frozen `/schema` contract when the data
pipeline work began. The following implementation details are therefore
provisional and intentionally centralized in `constants.ts`:

1. The labels of the 11 `culture` values.
2. The endpoint combinations for eight relationships other than the fixed
   `causes -> disaster` constraint.
3. Core frontmatter naming (`title`, `summary`, `era.start_year`,
   `importance`) and the direction of `patronized` (currently patron to target).

The validator, JSON Schema exporter, tests, and downstream tools all import the
same definitions. A coordinator revision therefore requires one schema change
and corresponding fixture updates, not a divergent rewrite.
