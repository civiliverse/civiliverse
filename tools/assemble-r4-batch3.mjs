import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";

import { parse, stringify } from "yaml";

const root = resolve(import.meta.dirname, "..");
const deliveryDir = resolve(root, "_公共交换", "07-内容组交付");

function nodeSections(source) {
  const heading = /^## #(\d+) .*?→ `([^`]+)`\r?$/gm;
  const matches = [...source.matchAll(heading)];
  const result = [];

  for (let index = 0; index < matches.length; index += 1) {
    const match = matches[index];
    const start = match.index + match[0].length;
    const end = matches[index + 1]?.index ?? source.length;
    let section = source.slice(start, end).replace(/^\r?\n+/, "").trimEnd();
    section = section.replace(/(?:\r?\n---\s*)+$/, "").trimEnd();
    const yamlMatch = section.match(/```yaml\r?\n([\s\S]*?)\r?\n```\r?\n/);
    if (!yamlMatch) throw new Error(`Missing YAML block for #${match[1]}`);
    const frontmatter = parse(yamlMatch[1]);
    if (frontmatter.id !== match[2].match(/([^/]+)\.md$/)?.[1]) {
      throw new Error(`Target/id mismatch for #${match[1]}: ${frontmatter.id} -> ${match[2]}`);
    }
    result.push({
      number: Number(match[1]),
      target: match[2],
      yaml: yamlMatch[1],
      body: section.slice(yamlMatch.index + yamlMatch[0].length).trim(),
    });
  }

  return result;
}

async function writeNodes() {
  const source = await readFile(resolve(deliveryDir, "R4-batch-3-词条.md"), "utf8");
  const sections = nodeSections(source);
  if (sections.length !== 32) throw new Error(`Expected 32 batch-3 nodes, found ${sections.length}`);

  for (const section of sections) {
    const target = resolve(root, section.target.replaceAll("/", "\\"));
    await mkdir(dirname(target), { recursive: true });
    await writeFile(target, `---\n${section.yaml}\n---\n\n${section.body}\n`, "utf8");
  }
  return { source, count: sections.length };
}

async function writeContexts() {
  const source = await readFile(resolve(deliveryDir, "R4-context-增补.md"), "utf8");
  const heading = /^## \d+ .*?→ `([^`]+)`\r?$/gm;
  const matches = [...source.matchAll(heading)];
  if (matches.length !== 7) throw new Error(`Expected 7 R4 contexts, found ${matches.length}`);

  for (let index = 0; index < matches.length; index += 1) {
    const match = matches[index];
    const start = match.index + match[0].length;
    const end = matches[index + 1]?.index ?? source.length;
    const section = source.slice(start, end);
    const yamlMatch = section.match(/```yaml\r?\n([\s\S]*?)\r?\n```/);
    if (!yamlMatch) throw new Error(`Missing context YAML for ${match[1]}`);
    parse(yamlMatch[1]);
    const target = resolve(root, match[1].replaceAll("/", "\\"));
    await mkdir(dirname(target), { recursive: true });
    await writeFile(target, `${yamlMatch[1]}\n`, "utf8");
  }

  const highMiddleAges = resolve(root, "content", "contexts", "high-middle-ages.yaml");
  const current = await readFile(highMiddleAges, "utf8");
  const updated = current.includes("\nparent:")
    ? current
    : current.replace(/^(era: .*\r?\n)/m, "$1parent: latin-west\n");
  if (!updated.includes("parent: latin-west")) throw new Error("Failed to set high-middle-ages parent");
  await writeFile(highMiddleAges, updated, "utf8");
  return matches.length;
}

async function setCultureSecondary(relativePath, values) {
  const target = resolve(root, relativePath);
  const current = await readFile(target, "utf8");
  const line = `culture_secondary: [${values.join(", ")}]`;
  let updated = current;
  if (/^culture_secondary:/m.test(current)) {
    updated = current.replace(/^culture_secondary:.*$/m, line);
  } else {
    updated = current.replace(/^(culture: .*\r?\n)/m, `$1${line}\n`);
  }
  if (!updated.includes(line)) throw new Error(`Failed to update ${relativePath}`);
  await writeFile(target, updated, "utf8");
}

async function applyCultureSecondary() {
  await setCultureSecondary("content/nodes/tech/papermaking.md", ["islamic", "western"]);
  await setCultureSecondary("content/nodes/idea/hindu-arabic-numerals.md", ["islamic"]);
  await setCultureSecondary("content/nodes/idea/zero-place-value.md", ["islamic"]);
  await setCultureSecondary("content/nodes/idea/algebra.md", ["indic", "greco-roman"]);
}

function edgeKey(edge) {
  if (edge.type === "parallels") {
    return `${edge.type}:${[edge.source, edge.target].sort().join(":")}`;
  }
  return `${edge.type}:${edge.source}:${edge.target}`;
}

function parseInlineEdge(literal) {
  const noteAt = literal.indexOf(", note:{zh: ");
  const prefix = literal.slice(1, noteAt < 0 ? -1 : noteAt);
  const edge = { schema_version: 1 };
  for (const field of prefix.split(", ")) {
    const separator = field.indexOf(": ");
    if (separator < 0) throw new Error(`Malformed edge field in ${literal}`);
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

function parseBatch3Candidates(source) {
  const edges = [];
  const pattern = /^- `(\{source:[^`\r\n]+\})`([^\r\n]*)$/gm;
  for (const match of source.matchAll(pattern)) {
    const annotation = match[2];
    if (!annotation.includes("batch-3 新增") || annotation.includes("不采")) continue;
    if (!match[1].includes(", note:{zh: ")) continue;
    edges.push(parseInlineEdge(match[1]));
  }
  return edges;
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

async function writeEdges(ids, batch3Source) {
  const revision = await readFile(resolve(deliveryDir, "R3-乙-修订版定稿-9项整改.md"), "utf8");
  const batch1All = parseBatch1Edges(revision);
  const batch1Active = batch1All.filter((edge) => ids.has(edge.source) && ids.has(edge.target));
  const batch1Deferred = batch1All.filter((edge) => !ids.has(edge.source) || !ids.has(edge.target));
  await writeFile(
    resolve(root, "content", "edges", "r3-batch1.yaml"),
    stringify({ edges: batch1Active }, { lineWidth: 0 }),
    "utf8",
  );

  const batch2Main = await readFile(resolve(deliveryDir, "R3-batch-2-词条.md"), "utf8");
  const batch2Alternate = await readFile(
    resolve(deliveryDir, "R3-batch-2-词条-续9到29.md"),
    "utf8",
  );
  const batch2Path = resolve(root, "content", "edges", "r3-batch2.yaml");
  const batch2Existing = parse(await readFile(batch2Path, "utf8")).edges;
  const batch2Candidates = [
    ...parseBatch2Candidates(batch2Main),
    ...parseBatch2Candidates(batch2Alternate),
  ].filter(
    (edge) =>
      !(edge.source === "cuneiform" &&
        edge.target === "phoenician-alphabet" &&
        edge.type !== "parallels"),
  );
  const batch2Merged = new Map(batch2Existing.map((edge) => [edgeKey(edge), edge]));
  for (const edge of batch2Candidates) batch2Merged.set(edgeKey(edge), edge);
  const batch2Active = [...batch2Merged.values()].filter(
    (edge) => ids.has(edge.source) && ids.has(edge.target),
  );
  const batch2Deferred = [...batch2Merged.values()].filter(
    (edge) => !ids.has(edge.source) || !ids.has(edge.target),
  );
  await writeFile(batch2Path, stringify({ edges: batch2Active }, { lineWidth: 0 }), "utf8");

  const batch3Candidates = parseBatch3Candidates(batch3Source);
  const batch3Merged = new Map();
  for (const edge of batch3Candidates) batch3Merged.set(edgeKey(edge), edge);
  const batch3Active = [...batch3Merged.values()].filter(
    (edge) => ids.has(edge.source) && ids.has(edge.target),
  );
  const batch3Deferred = [...batch3Merged.values()].filter(
    (edge) => !ids.has(edge.source) || !ids.has(edge.target),
  );
  await writeFile(
    resolve(root, "content", "edges", "r4-batch3.yaml"),
    stringify({ edges: batch3Active }, { lineWidth: 0 }),
    "utf8",
  );

  return {
    batch1Active: batch1Active.length,
    batch1Deferred,
    batch2Active: batch2Active.length,
    batch2Deferred,
    batch3Active: batch3Active.length,
    batch3Deferred,
  };
}

const nodes = await writeNodes();
const contexts = await writeContexts();
await applyCultureSecondary();
const ids = await nodeIds();
const edges = await writeEdges(ids, nodes.source);

process.stdout.write(
  `${JSON.stringify({ nodes: nodes.count, contexts, nodeTotal: ids.size, ...edges }, null, 2)}\n`,
);
