import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { parse, stringify } from "yaml";

const root = resolve(import.meta.dirname, "..");
const deliveryDir = resolve(root, "_公共交换", "07-内容组交付");

function quoteNestedScalars(yaml) {
  return yaml.replace(/^  (zh|en): (.*)$/gm, (_line, language, value) => {
    if (/^(?:["'|>{[])/.test(value)) return `  ${language}: ${value}`;
    return `  ${language}: ${JSON.stringify(value)}`;
  });
}

function nodeSections(source) {
  const heading = /^## .*?→ `([^`]+)`.*$/gm;
  const matches = [...source.matchAll(heading)];
  const result = [];

  for (let index = 0; index < matches.length; index += 1) {
    const match = matches[index];
    const start = match.index + match[0].length;
    const end = matches[index + 1]?.index ?? source.length;
    let section = source.slice(start, end).replace(/^\r?\n+/, "");
    section = section.replace(/\r?\n---\r?\n[\s\S]*$/, "").trimEnd();
    const yamlMatch = section.match(/^```yaml\r?\n([\s\S]*?)\r?\n```\r?\n/);
    if (!yamlMatch) throw new Error(`Missing YAML block for ${match[1]}`);
    result.push({
      target: match[1],
      yaml: yamlMatch[1],
      body: section.slice(yamlMatch[0].length).trim(),
    });
  }

  return result;
}

function applyAdjudicatedPatches(section) {
  let { yaml, body } = section;
  const id = yaml.match(/^id: ([^\r\n]+)$/m)?.[1];

  if (id === "ddt") {
    body = body.replace(
      "以 applies 边接入它的疟疾防治用途",
      "以 informs 边接入疟疾防治理念（技术实践反哺理念）",
    );
    body = body.replace(
      "an applies edge to its use in malaria control",
      "an informs edge to the idea of malaria control",
    );
  }

  if (id === "ddt-ecological-crisis") {
    yaml = yaml.replace(", forbid: [skull]", "");
  }

  if (id === "pesticide-regulation") {
    body = body.replace(
      /^\*\*〔附注〕\*\* icon：语义＝天平\/法条（管制）；needs-ai，过渡回退 `delapouite\/scales`。\*\*回路闭合边的端点问题\*\*：.*$/m,
      "**〔附注〕** icon：语义＝天平/法条（管制）；needs-ai，过渡回退 `delapouite/scales`。**回路闭合边的端点问题**：已按总编辑**裁定④**以新边类型 **`regulates`（idea→tech·wonder）** 闭合：`pesticide-regulation —regulates→ ddt`，端点合法，**不再标 disputed**。此后药监→药物、核管→核电、生物安全→基因工程、SOLAS→造船等「制度约束技术」同类关系一律走 regulates。",
    );
  }

  if (id === "cai-lun") {
    body = body.replace(
      "故其词条以 contributed（对造纸术）与 patronized（受皇家作坊供养）两类边接入图谱，而不是一条简单的\"发明\"箭头。",
      "故其词条以 contributed（对造纸术）一类边接入图谱，而不是一条简单的\"发明\"箭头；皇家作坊的赞助关系俟「汉和帝／东汉尚方」节点建成后，以正确方向（赞助者→被赞助者）另挂 patronized 边。",
    );
    body = body.replace(
      "joins the graph through contributed (to papermaking) and patronized (sustained by the imperial workshops) edges, not a single arrow of \"invention.\"",
      "joins the graph through a contributed edge (to papermaking), not a single arrow of \"invention\"; the imperial-workshop patronage will be attached later, in the correct direction (patron→beneficiary), once a 'Emperor He / Han imperial workshops' node exists.",
    );
    body = body.replace(/^.*type: patronized.*\r?\n/m, "");
  }

  return { ...section, yaml: quoteNestedScalars(yaml), body };
}

async function writeNodes() {
  const sources = [
    "R2-T4-DDT回路词条.md",
    "R2-五条打样-冻结schema.md",
  ];
  const sections = [];
  for (const sourceName of sources) {
    const source = await readFile(resolve(deliveryDir, sourceName), "utf8");
    sections.push(...nodeSections(source));
  }
  if (sections.length !== 11) throw new Error(`Expected 11 batch-1 nodes, found ${sections.length}`);

  for (const original of sections) {
    const section = applyAdjudicatedPatches(original);
    const target = resolve(root, section.target.replaceAll("/", "\\"));
    await mkdir(dirname(target), { recursive: true });
    await writeFile(target, `---\n${section.yaml}\n---\n\n${section.body}\n`, "utf8");
  }
  return sections.length;
}

async function writeContexts() {
  const source = await readFile(resolve(deliveryDir, "R2-时代背景-首批5条.md"), "utf8");
  const revision = await readFile(resolve(deliveryDir, "R3-乙-修订版定稿-9项整改.md"), "utf8");
  const revisedFence = revision.match(/```yaml\r?\n(# 3 · mongol-yuan[\s\S]*?)\r?\n```/)?.[1];
  if (!revisedFence) throw new Error("Missing revised context YAML block");
  const revisedContexts = new Map();
  for (const document of revisedFence.split(/\r?\n---\r?\n/)) {
    const yaml = document.replace(/^#.*\r?\n/, "");
    const id = yaml.match(/^id: ([^\r\n]+)$/m)?.[1];
    if (id) revisedContexts.set(id, yaml);
  }
  const headings = [...source.matchAll(/^## \d+ .*?→ `([^`]+)`\r?$/gm)];
  if (headings.length !== 5) throw new Error(`Expected 5 contexts, found ${headings.length}`);

  for (let index = 0; index < headings.length; index += 1) {
    const heading = headings[index];
    const start = heading.index + heading[0].length;
    const end = headings[index + 1]?.index ?? source.indexOf("\n---", start);
    const section = source.slice(start, end);
    const yamlMatch = section.match(/```yaml\r?\n([\s\S]*?)\r?\n```/);
    if (!yamlMatch) throw new Error(`Missing context YAML for ${heading[1]}`);
    let yaml = yamlMatch[1];
    const id = yaml.match(/^id: ([^\r\n]+)$/m)?.[1];
    if (revisedContexts.has(id)) yaml = revisedContexts.get(id);
    yaml = quoteNestedScalars(yaml);
    const target = resolve(root, heading[1].replaceAll("/", "\\"));
    await mkdir(dirname(target), { recursive: true });
    await writeFile(target, `${yaml}\n`, "utf8");
  }
  return headings.length;
}

function edgeKey(edge) {
  if (edge.type === "parallels") {
    return `${edge.type}:${[edge.source, edge.target].sort().join(":")}`;
  }
  return `${edge.type}:${edge.source}:${edge.target}`;
}

async function nodeIds() {
  const base = resolve(root, "content", "nodes");
  const ids = new Set();
  for (const type of await readdir(base, { withFileTypes: true })) {
    if (!type.isDirectory()) continue;
    for (const entry of await readdir(resolve(base, type.name), { withFileTypes: true })) {
      if (entry.isFile() && entry.name.endsWith(".md")) ids.add(entry.name.slice(0, -3));
    }
  }
  return ids;
}

function parseInlineEdge(literal) {
  const noteAt = literal.indexOf(", note:{zh: ");
  const prefix = literal.slice(1, noteAt < 0 ? -1 : noteAt);
  const edge = { schema_version: 1 };
  for (const field of prefix.split(", ")) {
    const separator = field.indexOf(": ");
    const key = field.slice(0, separator);
    const value = field.slice(separator + 2);
    edge[key] = value === "true" ? true : value === "false" ? false : value;
  }
  if (noteAt >= 0) {
    const noteLiteral = literal.slice(noteAt + ", note:{zh: ".length, -2);
    const enAt = noteLiteral.indexOf(", en: ");
    if (enAt < 0) throw new Error(`Missing English edge note in ${literal}`);
    edge.note = {
      zh: noteLiteral.slice(0, enAt),
      en: noteLiteral.slice(enAt + ", en: ".length),
    };
  }
  return edge;
}

function parseBatch1Edges(source) {
  const ranges = [
    source.match(/### 2\.1[\s\S]*?```\r?\n([\s\S]*?)\r?\n```/)?.[1],
    source.match(/### 2\.2[\s\S]*?```\r?\n([\s\S]*?)\r?\n```/)?.[1],
  ];
  if (ranges.some((range) => !range)) throw new Error("Missing batch-1 edge blocks");
  const edges = ranges.flatMap((range) =>
    [...range.matchAll(/- (\{source:[\s\S]*?\}\})(?=\s*#|\s*$)/gm)].map((match) =>
      parseInlineEdge(match[1].replace(/\r?\n\s*/g, " ")),
    ),
  );
  if (edges.length !== 27) throw new Error(`Expected 27 batch-1 edges, found ${edges.length}`);
  return edges;
}

function parseBatch2Candidates(source) {
  const edges = [];
  const pattern = /`(\{source:[^`\r\n]+\})`\s*——\s*\*\*batch-2 新增\*\*/g;
  for (const match of source.matchAll(pattern)) edges.push(parseInlineEdge(match[1]));
  return edges;
}

async function writeEdges(ids) {
  const revision = await readFile(resolve(deliveryDir, "R3-乙-修订版定稿-9项整改.md"), "utf8");
  const batch1All = parseBatch1Edges(revision);
  const batch1Active = batch1All.filter((edge) => ids.has(edge.source) && ids.has(edge.target));
  const batch1Deferred = batch1All.filter((edge) => !ids.has(edge.source) || !ids.has(edge.target));
  await writeFile(
    resolve(root, "content", "edges", "r3-batch1.yaml"),
    stringify({ edges: batch1Active }, { lineWidth: 0 }),
    "utf8",
  );

  const main = await readFile(resolve(deliveryDir, "R3-batch-2-词条.md"), "utf8");
  const alternate = await readFile(resolve(deliveryDir, "R3-batch-2-词条-续9到29.md"), "utf8");
  const existingPath = resolve(root, "content", "edges", "r3-batch2.yaml");
  const existing = parse(await readFile(existingPath, "utf8")).edges;
  const candidates = [...parseBatch2Candidates(main), ...parseBatch2Candidates(alternate)].filter(
    (edge) => !(edge.source === "cuneiform" && edge.target === "phoenician-alphabet" && edge.type !== "parallels"),
  );
  const merged = new Map(existing.map((edge) => [edgeKey(edge), edge]));
  for (const edge of candidates) {
    if (ids.has(edge.source) && ids.has(edge.target) && !merged.has(edgeKey(edge))) {
      merged.set(edgeKey(edge), edge);
    }
  }
  const allCandidateKeys = new Map(candidates.map((edge) => [edgeKey(edge), edge]));
  const batch2Deferred = [...allCandidateKeys.values()].filter(
    (edge) => !ids.has(edge.source) || !ids.has(edge.target),
  );
  await writeFile(existingPath, stringify({ edges: [...merged.values()] }, { lineWidth: 0 }), "utf8");

  return {
    batch1Active: batch1Active.length,
    batch1Deferred,
    batch2Active: merged.size,
    batch2Deferred,
  };
}

const nodes = await writeNodes();
const contexts = await writeContexts();
const ids = await nodeIds();
const edges = await writeEdges(ids);

process.stdout.write(
  `${JSON.stringify({ nodes, contexts, nodeTotal: ids.size, ...edges }, null, 2)}\n`,
);
