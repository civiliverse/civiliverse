# Data pipeline guide

Requirements: Node.js 20 or newer and pnpm 11.9.0.

```console
pnpm install --frozen-lockfile
pnpm check
```

`pnpm check` runs static type checking, all tests, JSON Schema export, and the
repository validator. CI runs the same quality gate on every pull request.

## Validate nodes and edges

The default locations are `content/nodes/**/*.md` and
`data/edges/**/*.{yaml,yml}`.

```console
pnpm start validate
pnpm start validate content/nodes data/edges
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
culture: europe
icon:
  source: game-icons
  id: lorc/book-cover
  license: CC BY 3.0
images: []
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
