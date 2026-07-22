import { mkdtemp, mkdir, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { resolve } from "node:path";

import { stringify as stringifyYaml } from "yaml";

import { validateRepository } from "../tools/validator/validate.js";

function baseNode(id = "source-tech", type = "tech") {
  return {
    schema_version: 1,
    id,
    type,
    title: { zh: "测试节点", en: "Test node" },
    summary: { zh: "用于校验器测试。", en: "Used by validator tests." },
    era: { start_year: 1000 },
    culture: "sinic",
    tier: "major",
    domains: ["information-communication"],
    icon: {
      source: "game-icons",
      id: "lorc/gear-hammer",
      license: "CC BY 3.0",
      status: "final",
    },
    images: [],
    refs: [{ title: "Test source" }],
    status: "draft",
    ...(type === "disaster" ? { subtype: "env" } : {}),
  };
}

function nodeMarkdown(value: unknown): string {
  return `---\n${stringifyYaml(value, { lineWidth: 0 })}---\n\n## 中文\n\n正文\n\n## English\n\nBody\n`;
}

function baseEdge(overrides: Record<string, unknown> = {}) {
  return {
    schema_version: 1,
    source: "source-tech",
    target: "target-tech",
    type: "enables",
    importance: "major",
    note: { zh: "测试关系。", en: "Test relationship." },
    disputed: false,
    ...overrides,
  };
}

function lineOf(text: string, needle: string): number {
  const line = text.split(/\r?\n/).findIndex((value) => value.includes(needle));
  if (line < 0) throw new Error(`Needle not present in sample: ${needle}`);
  return line + 1;
}

interface BadSample {
  name: string;
  kind: "node" | "edge";
  content: string;
  code: string;
  lineNeedle?: string;
  expectedLine?: number;
}

const nodeWith = (mutate: (value: any) => void): string => {
  const value = baseNode();
  mutate(value);
  return nodeMarkdown(value);
};

const edgeWith = (mutate: (value: any) => void): string => {
  const value = baseEdge();
  mutate(value);
  return stringifyYaml(value, { lineWidth: 0 });
};

const badSamples: BadSample[] = [
  {
    name: "missing frontmatter opener",
    kind: "node",
    content: "# No frontmatter\n",
    code: "frontmatter.missing",
    expectedLine: 1,
  },
  {
    name: "unclosed frontmatter",
    kind: "node",
    content: "---\nid: broken\n",
    code: "frontmatter.unclosed",
    expectedLine: 1,
  },
  {
    name: "invalid YAML",
    kind: "node",
    content: "---\nid: [broken\n---\n",
    code: "yaml.syntax",
    lineNeedle: "id:",
  },
  {
    name: "unknown node type",
    kind: "node",
    content: nodeWith((value) => (value.type = "place")),
    code: "schema.invalid_union_discriminator",
    lineNeedle: "type:",
  },
  {
    name: "invalid node id",
    kind: "node",
    content: nodeWith((value) => (value.id = "Bad ID")),
    code: "schema.invalid_string",
    lineNeedle: "id:",
  },
  {
    name: "blank Chinese title",
    kind: "node",
    content: nodeWith((value) => (value.title.zh = "")),
    code: "schema.too_small",
    lineNeedle: "zh:",
  },
  {
    name: "missing English title",
    kind: "node",
    content: nodeWith((value) => delete value.title.en),
    code: "schema.invalid_type",
    lineNeedle: "zh:",
  },
  {
    name: "reversed era",
    kind: "node",
    content: nodeWith((value) => (value.era = { start_year: 100, end_year: 50 })),
    code: "schema.custom",
    lineNeedle: "end_year:",
  },
  {
    name: "culture outside enum",
    kind: "node",
    content: nodeWith((value) => (value.culture = "atlantis")),
    code: "schema.invalid_enum_value",
    lineNeedle: "culture:",
  },
  {
    name: "invalid icon id",
    kind: "node",
    content: nodeWith((value) => (value.icon.id = "Gear Hammer")),
    code: "schema.invalid_string",
    lineNeedle: "id: Gear",
  },
  {
    name: "wrong Game Icons license",
    kind: "node",
    content: nodeWith((value) => (value.icon.license = "CC BY 4.0")),
    code: "schema.custom",
    lineNeedle: "license:",
  },
  {
    name: "image license outside whitelist",
    kind: "node",
    content: nodeWith((value) =>
      value.images.push({
        src: "image.webp",
        caption: { zh: "图", en: "Image" },
        credit: "Creator",
        license: "All Rights Reserved",
        source_url: "https://example.org/image",
        ai_generated: false,
      }),
    ),
    code: "schema.invalid_enum_value",
    lineNeedle: "license: All",
  },
  {
    name: "image missing traceable source URL",
    kind: "node",
    content: nodeWith((value) =>
      value.images.push({
        src: "image.webp",
        caption: { zh: "图", en: "Image" },
        credit: "Creator",
        license: "CC BY 4.0",
        source_url: "not-a-url",
        ai_generated: false,
      }),
    ),
    code: "schema.invalid_string",
    lineNeedle: "source_url:",
  },
  {
    name: "image lacks explicit AI flag",
    kind: "node",
    content: nodeWith((value) =>
      value.images.push({
        src: "image.webp",
        caption: { zh: "图", en: "Image" },
        credit: "Creator",
        license: "CC BY 4.0",
        source_url: "https://example.org/image",
      }),
    ),
    code: "schema.invalid_type",
    lineNeedle: "- src:",
  },
  {
    name: "self edge",
    kind: "edge",
    content: edgeWith((value) => (value.target = value.source)),
    code: "schema.custom",
    lineNeedle: "target:",
  },
  {
    name: "duplicate YAML key",
    kind: "edge",
    content: `${stringifyYaml(baseEdge())}type: causes\n`,
    code: "yaml.syntax",
    lineNeedle: "type: causes",
  },
  {
    name: "embedded trailing YAML field residue",
    kind: "edge",
    content: edgeWith(
      (value) =>
        (value.note.en =
          "Whether sub-Saharan ironworking was transmitted or independent remains unsettled; juxtaposed without direction}, disputed: tru"),
    ),
    code: "content.embedded-yaml-field-residue",
    lineNeedle: "en:",
  },
  {
    name: "unknown edge type",
    kind: "edge",
    content: edgeWith((value) => (value.type = "blocks")),
    code: "schema.invalid_enum_value",
    lineNeedle: "type:",
  },
  {
    name: "broken endpoint",
    kind: "edge",
    content: edgeWith((value) => (value.target = "missing-node")),
    code: "graph.missing-endpoint",
    lineNeedle: "target:",
  },
  {
    name: "causes must target disaster",
    kind: "edge",
    content: edgeWith((value) => (value.type = "causes")),
    code: "graph.illegal-endpoints",
    lineNeedle: "type:",
  },
  {
    name: "contributed must originate at person",
    kind: "edge",
    content: edgeWith((value) => (value.type = "contributed")),
    code: "graph.illegal-endpoints",
    lineNeedle: "type:",
  },
];

describe("validator bad-sample acceptance suite", () => {
  it("contains exactly 21 deliberately bad samples", () => {
    expect(badSamples).toHaveLength(21);
  });

  it.each(badSamples)("reports $name at the correct line with a fix", async (sample) => {
    const root = await mkdtemp(resolve(tmpdir(), "civiliverse-validator-"));
    try {
      const nodesDirectory = resolve(root, "content/nodes");
      const techDirectory = resolve(nodesDirectory, "tech");
      const personDirectory = resolve(nodesDirectory, "person");
      const disasterDirectory = resolve(nodesDirectory, "disaster");
      const edgesDirectory = resolve(root, "content/edges");
      await mkdir(techDirectory, { recursive: true });
      await mkdir(personDirectory, { recursive: true });
      await mkdir(disasterDirectory, { recursive: true });
      await mkdir(edgesDirectory, { recursive: true });
      await writeFile(resolve(techDirectory, "source-tech.md"), nodeMarkdown(baseNode()), "utf8");
      await writeFile(
        resolve(techDirectory, "target-tech.md"),
        nodeMarkdown(baseNode("target-tech", "tech")),
        "utf8",
      );
      await writeFile(
        resolve(personDirectory, "source-person.md"),
        nodeMarkdown(baseNode("source-person", "person")),
        "utf8",
      );
      await writeFile(
        resolve(disasterDirectory, "target-disaster.md"),
        nodeMarkdown(baseNode("target-disaster", "disaster")),
        "utf8",
      );

      const sampleFile = resolve(
        sample.kind === "node" ? techDirectory : edgesDirectory,
        sample.kind === "node" ? "bad.md" : "bad.yaml",
      );
      await writeFile(sampleFile, sample.content, "utf8");
      const result = await validateRepository({ cwd: root });
      const diagnostic = result.diagnostics.find(
        ({ code, file }) => code === sample.code && file.endsWith(sample.kind === "node" ? "bad.md" : "bad.yaml"),
      );
      expect(diagnostic, JSON.stringify(result.diagnostics, null, 2)).toBeDefined();
      const expectedLine = sample.expectedLine ?? lineOf(sample.content, sample.lineNeedle!);
      expect(diagnostic?.line).toBe(expectedLine);
      expect(diagnostic?.column).toBeGreaterThan(0);
      expect(diagnostic?.suggestion.length).toBeGreaterThan(10);
    } finally {
      await rm(root, { recursive: true, force: true });
    }
  });
});
