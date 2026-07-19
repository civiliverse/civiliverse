import { mkdtemp, mkdir, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { resolve } from "node:path";

import { stringify as stringifyYaml } from "yaml";

import {
  contextSchema,
  DOMAINS,
  DOMAIN_TABLE,
  ENDPOINT_RULES,
  GLOSSARY,
  glossaryMismatches,
  NODE_TYPES,
  nodeSchema,
  normalizeLicense,
} from "../schema/index.js";
import { validateRepository } from "../tools/validator/validate.js";

function validNode(id = "test-node", type = "tech") {
  return {
    schema_version: 1,
    id,
    type,
    title: { zh: "测试节点", en: "Test node" },
    summary: { zh: "测试摘要", en: "Test summary" },
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
    refs: [{ title: "A source without a URL" }],
    status: "draft",
    ...(type === "disaster" ? { subtype: "env" } : {}),
  };
}

function nodeMarkdown(value: unknown): string {
  return `---\n${stringifyYaml(value, { lineWidth: 0 })}---\n\nBody\n`;
}

async function writeNode(root: string, id: string, type: string): Promise<void> {
  const directory = resolve(root, `content/nodes/${type}`);
  await mkdir(directory, { recursive: true });
  await writeFile(resolve(directory, `${id}.md`), nodeMarkdown(validNode(id, type)), "utf8");
}

describe("frozen schema v0 node fields", () => {
  const badFields: Array<{
    name: string;
    path: string;
    mutate(value: any): void;
  }> = [
    {
      name: "culture_secondary rejects unknown cultures",
      path: "culture_secondary.0",
      mutate: (value) => (value.culture_secondary = ["atlantis"]),
    },
    {
      name: "tier rejects non-v0 tiers",
      path: "tier",
      mutate: (value) => (value.tier = "landmark"),
    },
    {
      name: "domains rejects an empty primary-domain list",
      path: "domains",
      mutate: (value) => (value.domains = []),
    },
    {
      name: "domains rejects values outside the controlled 12 slugs",
      path: "domains.0",
      mutate: (value) => (value.domains = ["history"]),
    },
    {
      name: "region requires both languages",
      path: "region.en",
      mutate: (value) => (value.region = { zh: "杭州" }),
    },
    {
      name: "quote source requires both languages",
      path: "quote.source.en",
      mutate: (value) =>
        (value.quote = {
          text: { zh: "引文", en: "Quote" },
          source: { zh: "来源" },
        }),
    },
    {
      name: "icon source is controlled",
      path: "icon.source",
      mutate: (value) => (value.icon.source = "stock"),
    },
    {
      name: "final icon requires an id",
      path: "icon.id",
      mutate: (value) => delete value.icon.id,
    },
    {
      name: "icon fallback requires author/slug",
      path: "icon.fallback",
      mutate: (value) => {
        value.icon.status = "needs-ai";
        value.icon.fallback = "gear-hammer";
      },
    },
    {
      name: "refs requires at least one source",
      path: "refs",
      mutate: (value) => (value.refs = []),
    },
    {
      name: "confidence level is controlled",
      path: "confidence.level",
      mutate: (value) => (value.confidence = { level: "certain" }),
    },
    {
      name: "workflow status is controlled",
      path: "status",
      mutate: (value) => (value.status = "published"),
    },
    {
      name: "version title requires both languages",
      path: "versions.0.title.en",
      mutate: (value) => (value.versions = [{ title: { zh: "第一版" } }]),
    },
    {
      name: "disaster subtype is required",
      path: "subtype",
      mutate: (value) => {
        value.type = "disaster";
      },
    },
  ];

  it.each(badFields)("rejects $name", ({ mutate, path }) => {
    const value = structuredClone(validNode());
    mutate(value);
    const result = nodeSchema.safeParse(value);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues.some((issue) => issue.path.join(".") === path)).toBe(true);
    }
  });

  it("allows empty images, URL-less historical refs, and needs-ai without id", () => {
    const value = validNode();
    value.icon = {
      source: "ai",
      license: "CC BY 4.0",
      status: "needs-ai",
    } as any;
    expect(nodeSchema.safeParse(value).success).toBe(true);
  });
});

describe("machine-readable controlled vocabularies", () => {
  it("loads the frozen 12 domains from the JSON source of truth", () => {
    expect(DOMAIN_TABLE.version).toBe(1);
    expect(DOMAINS).toEqual([
      "information-communication",
      "math-computing",
      "science-method",
      "astronomy-navigation",
      "medicine-life",
      "agriculture-food",
      "energy-power",
      "materials-chemistry",
      "construction-civil",
      "transport",
      "military",
      "economy-governance",
    ]);
  });

  it("loads every frozen strict and check-level glossary entry", () => {
    expect(GLOSSARY.version).toBe(1);
    expect(GLOSSARY.strict).toHaveLength(18);
    expect(GLOSSARY.check).toHaveLength(67);
    expect(GLOSSARY.strict).toContainEqual({ zh: "引发", en: "causes" });
    expect(GLOSSARY.strict).toContainEqual({ zh: "管制", en: "regulates" });
    expect(GLOSSARY.check).toContainEqual({
      zh: "活字印刷",
      en: "movable-type printing",
      type: "term",
    });
  });
});

describe("frozen endpoint table", () => {
  it("matches the coordinator-frozen combinations exactly", () => {
    expect(ENDPOINT_RULES).toEqual({
      enables: {
        source: ["tech", "idea", "person", "wonder"],
        target: ["tech", "idea", "wonder"],
        directed: true,
      },
      derives: {
        source: ["tech", "idea", "wonder"],
        target: ["tech", "idea", "wonder"],
        directed: true,
      },
      applies: { source: ["idea"], target: ["tech", "wonder"], directed: true },
      informs: { source: ["tech", "wonder"], target: ["idea"], directed: true },
      inspires: {
        source: NODE_TYPES,
        target: ["idea", "person", "wonder"],
        directed: true,
      },
      contributed: {
        source: ["person"],
        target: ["tech", "idea", "wonder"],
        directed: true,
      },
      patronized: {
        source: ["person"],
        target: ["person", "tech", "idea", "wonder"],
        directed: true,
      },
      parallels: { source: NODE_TYPES, target: NODE_TYPES, directed: false },
      causes: {
        source: ["tech", "idea", "wonder"],
        target: ["disaster"],
        directed: true,
      },
      regulates: {
        source: ["idea"],
        target: ["tech", "wonder"],
        directed: true,
      },
    });
  });

  it("accepts atrocity and rejects values outside the r1 disaster subtype enum", () => {
    const accepted = validNode("atrocity-example", "disaster");
    accepted.subtype = "atrocity";
    expect(nodeSchema.safeParse(accepted).success).toBe(true);

    const rejected = structuredClone(accepted);
    rejected.subtype = "war-crime";
    const result = nodeSchema.safeParse(rejected);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues.some((issue) => issue.path.join(".") === "subtype")).toBe(true);
    }
  });
});

describe("context and repository validation", () => {
  it("validates context fields and rejects an invalid era", () => {
    const result = contextSchema.safeParse({
      schema_version: 1,
      id: "song-dynasty",
      title: { zh: "宋朝", en: "Song dynasty" },
      culture: "sinic",
      era: { start_year: 1279, end_year: 960 },
      summary: { zh: "时代背景", en: "Historical context" },
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues.some((issue) => issue.path.join(".") === "era.end_year")).toBe(true);
    }
  });

  it("reports missing and duplicate context parents plus reversed parallels", async () => {
    const root = await mkdtemp(resolve(tmpdir(), "civiliverse-schema-v0-"));
    try {
      await writeNode(root, "alpha", "tech");
      await writeNode(root, "beta", "tech");
      const contextsDirectory = resolve(root, "content/contexts");
      const edgesDirectory = resolve(root, "content/edges");
      await mkdir(contextsDirectory, { recursive: true });
      await mkdir(edgesDirectory, { recursive: true });
      const context = {
        schema_version: 1,
        id: "song-dynasty",
        title: { zh: "宋朝", en: "Song dynasty" },
        culture: "sinic",
        era: { start_year: 960, end_year: 1279 },
        parent: "missing-china",
        summary: { zh: "时代背景", en: "Historical context" },
      };
      await writeFile(resolve(contextsDirectory, "song.yaml"), stringifyYaml(context), "utf8");
      await writeFile(resolve(contextsDirectory, "duplicate.yaml"), stringifyYaml(context), "utf8");
      const edge = {
        schema_version: 1,
        source: "alpha",
        target: "beta",
        type: "parallels",
        importance: "minor",
        note: { zh: "平行", en: "Parallel" },
      };
      await writeFile(resolve(edgesDirectory, "one.yaml"), stringifyYaml(edge), "utf8");
      await writeFile(
        resolve(edgesDirectory, "two.yaml"),
        stringifyYaml({ ...edge, source: "beta", target: "alpha" }),
        "utf8",
      );

      const result = await validateRepository({ cwd: root });
      const codes = result.diagnostics.map(({ code }) => code);
      expect(codes).toContain("context.duplicate-id");
      expect(codes).toContain("context.missing-parent");
      expect(codes).toContain("graph.duplicate-parallels");
      expect(result.contexts).toHaveLength(2);
    } finally {
      await rm(root, { recursive: true, force: true });
    }
  });

  it("enforces content/nodes/{type}/{id}.md", async () => {
    const root = await mkdtemp(resolve(tmpdir(), "civiliverse-node-path-"));
    try {
      const wrongDirectory = resolve(root, "content/nodes/person");
      await mkdir(wrongDirectory, { recursive: true });
      await writeFile(
        resolve(wrongDirectory, "wrong-name.md"),
        nodeMarkdown(validNode("actual-id", "tech")),
        "utf8",
      );
      const result = await validateRepository({ cwd: root });
      const codes = result.diagnostics.map(({ code }) => code);
      expect(codes).toContain("path.node-type-mismatch");
      expect(codes).toContain("path.node-id-mismatch");
    } finally {
      await rm(root, { recursive: true, force: true });
    }
  });

  it("reports strict glossary mismatches as errors and check-level mismatches as warnings", async () => {
    const root = await mkdtemp(resolve(tmpdir(), "civiliverse-glossary-"));
    try {
      const directory = resolve(root, "content/nodes/tech");
      await mkdir(directory, { recursive: true });
      const node = validNode("printing-test", "tech");
      node.title = { zh: "技术", en: "Technique" };
      node.summary = { zh: "活字印刷改变了知识传播。", en: "Printing changed knowledge sharing." };
      await writeFile(resolve(directory, "printing-test.md"), nodeMarkdown(node), "utf8");

      const result = await validateRepository({ cwd: root });
      const strict = result.diagnostics.find(({ code }) => code === "glossary.strict-mismatch");
      const check = result.diagnostics.find(
        ({ code }) => code === "glossary.translation-mismatch",
      );
      expect(strict).toMatchObject({ severity: "error", path: ["title", "en"] });
      expect(check).toMatchObject({ severity: "warning", path: ["summary", "en"] });
    } finally {
      await rm(root, { recursive: true, force: true });
    }
  });

  it("supports glossary articles, aliases, and rule-based transliteration exemptions", () => {
    expect(
      glossaryMismatches({ zh: "印刷革命改变了欧洲。", en: "the Printing Revolution changed Europe." }),
    ).toHaveLength(0);
    expect(glossaryMismatches({ zh: "奇普用于记账。", en: "Khipu recorded accounts." })).toHaveLength(
      0,
    );
    expect(
      glossaryMismatches({ zh: "汉和帝下令呈纸。", en: "The Han court ordered paper presented." }),
    ).toHaveLength(0);
    expect(glossaryMismatches({ zh: "生铁路线", en: "cast-iron route" })).toHaveLength(0);
    expect(
      glossaryMismatches({ zh: "尺规作图", en: "compass-and-straightedge construction" }),
    ).toHaveLength(0);
  });

  it("rejects regulates unless the endpoints are idea to tech or wonder", async () => {
    const root = await mkdtemp(resolve(tmpdir(), "civiliverse-regulates-"));
    try {
      await writeNode(root, "source-tech", "tech");
      await writeNode(root, "target-tech", "tech");
      const edgesDirectory = resolve(root, "content/edges");
      await mkdir(edgesDirectory, { recursive: true });
      await writeFile(
        resolve(edgesDirectory, "illegal-regulates.yaml"),
        stringifyYaml({
          schema_version: 1,
          source: "source-tech",
          target: "target-tech",
          type: "regulates",
          importance: "major",
          note: { zh: "技术不作管制边的源。", en: "A technology may not source regulates." },
        }),
        "utf8",
      );

      const result = await validateRepository({ cwd: root });
      expect(result.diagnostics).toContainEqual(
        expect.objectContaining({ code: "graph.illegal-endpoints", path: ["type"] }),
      );
    } finally {
      await rm(root, { recursive: true, force: true });
    }
  });
});

describe("legacy license migration", () => {
  it("maps historical aliases without weakening strict schemas", () => {
    expect(normalizeLicense("PD-old")).toBe("Public Domain");
    expect(normalizeLicense("CC-BY-3.0")).toBe("CC BY 3.0");
    expect(normalizeLicense("All Rights Reserved")).toBeUndefined();
  });
});
