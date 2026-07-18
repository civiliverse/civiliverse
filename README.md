# Civiliverse · 科技史宇宙

Civiliverse is an open 3D knowledge cosmos of the history of technology: five
types of bilingual nodes connected by nine kinds of historical relationships.

This repository is the single source of truth for content and code. Node
entries are Markdown with YAML frontmatter; graph edges are YAML. The site is
built as static assets and deployed through Cloudflare Pages.

## Data quality tools

The TypeScript data pipeline currently provides:

- Zod source schemas and generated JSON Schema for nodes and edges.
- A repository validator with file/line diagnostics and repair suggestions.
- A local Game Icons index, bilingual keyword search, and CC BY 3.0 attribution.
- A Wikimedia Commons review/import flow with license filtering, explicit human
  confirmation, 320/800/1600px WebP output, and traceable attribution.

See [docs/data-pipeline.md](docs/data-pipeline.md) for commands and the review
workflow. Schema decisions that still need coordinator confirmation are listed
in [schema/README.md](schema/README.md).

Content is licensed under CC BY 4.0. Code is licensed under MIT.
