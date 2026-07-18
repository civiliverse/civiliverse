# Data pipeline guide

Requirements: Node.js 20 or newer and pnpm 11.9.0.

```console
pnpm install --frozen-lockfile
pnpm check
```

`pnpm check` runs static type checking, all tests, JSON Schema export, and the
repository validator. CI runs the same quality gate on every pull request.

## Validate nodes, edges, and contexts

The default locations are `content/nodes/**/*.md`, `content/edges/**/*.{yaml,yml}`,
and `content/contexts/**/*.{yaml,yml}`.

```console
pnpm start validate
pnpm start validate content/nodes content/edges content/contexts
pnpm start validate --format json
```

Pretty diagnostics use the conventional `file:line:column` form and always
include a concrete repair suggestion. The command exits non-zero if it finds an
error.

Minimal node frontmatter:

```yaml
---
schema_version: 1
id: printing-press
type: tech
title:
  zh: 印刷机
  en: Printing press
summary:
  zh: 以机械压力将油墨转印到纸张的印刷技术。
  en: Printing technology that transfers ink to paper by mechanical pressure.
era:
  start_year: 1440
  circa: true
culture: western
tier: major
domains:
  - information-communication
icon:
  source: game-icons
  id: lorc/book-cover
  license: CC BY 3.0
  status: final
images: []
refs:
  - title: A history of printing
status: draft
---
```

Edge file (a single edge, a YAML list, and `{ edges: [...] }` are accepted):

```yaml
schema_version: 1
source: movable-type
target: printing-press
type: enables
importance: major
note:
  zh: 活字排版使机械化的重复印刷成为可能。
  en: Movable type made mechanized repeat printing possible.
disputed: false
```

Context file:

```yaml
schema_version: 1
id: song-dynasty
title:
  zh: 宋朝
  en: Song dynasty
culture: sinic
era:
  start_year: 960
  end_year: 1279
parent: imperial-china
summary:
  zh: 造纸、印刷与城市文化高度发展的时代背景。
  en: A context of intensive growth in papermaking, printing, and urban culture.
```

The validator checks context ids, parent references, eras, cultures, node file
locations, reversed duplicates of undirected `parallels` edges, the controlled
12-domain slug list, and bilingual terminology. Strict label mismatches are
errors; preferred-name mismatches are warnings for content review.

The machine-readable vocabulary files are `schema/data/domains.json` and
`schema/data/glossary.json`. They are the single source of truth; updates must
arrive through a coordinated content-review PR.

## Normalize legacy licenses

Strict schemas accept canonical license strings only. For one-time migrations:

```console
pnpm start licenses aliases
pnpm start licenses normalize PD-old CC-BY-3.0
```

## Game Icons

The sync command clones or fast-forwards the official repository, builds a
local JSON index, and regenerates the CC BY 3.0 attribution list:

```console
pnpm start icons sync
pnpm start icons search "机械 工具"
pnpm start icons search "printing book" --json
```

Search output contains the icon id, creator, local SVG preview path, and source
page. The tool only proposes candidates; content editors make the semantic
choice.

## Wikimedia Commons

Image intake is intentionally split into two commands.

1. Produce a candidate manifest. No image is downloaded or added:

   ```console
   pnpm start commons search "printing press" --out reports/printing-press.json
   ```

2. A human reviews both eligible and rejected candidates in the JSON manifest,
   then explicitly selects page ids or exact titles:

   ```console
   pnpm start commons import \
     --manifest reports/printing-press.json \
     --select 12345 67890 \
     --out content/assets/printing-press \
     --confirm
   ```

Import refuses non-whitelisted licenses, missing creator/credit metadata,
untraceable sources, unknown selections, and calls without `--confirm`. A
successful import preserves the original, generates WebPs at 320/800/1600px,
and writes `attribution.json` plus an `images.yaml` frontmatter fragment. Its
bilingual captions are deliberately blank, so node validation keeps failing
until the content team completes them.
