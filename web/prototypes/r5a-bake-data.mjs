#!/usr/bin/env node
/**
 * Civiliverse · R5a 数据烘焙器（继承 R4a；R5 改动＝目标文件、no-op 退出码修复、informs/enables r2 端点扩展标记）
 * 读仓库 content/（节点 md frontmatter＋定位句、边 yaml、context yaml）与 schema/data/domains.json，
 * 生成确定性 JS 数据块，注入 civiliverse-r4a-proto.html 的 DATA-START/DATA-END 之间。
 *
 * 用法：node web/prototypes/r5a-bake-data.mjs [repoRoot]
 * 退出码：0＝写入成功或无变化（no-op 亦为成功空操作，偿丙复审 R4 之债）；非 0＝真错误。
 * 确定性：节点按 id 排序、边按 (s,t,ty) 排序、context 按 id 排序；无时间戳。
 * 渲染词表在此归一：causes=#b84a44（R3 记账②收束）；文明配色＝pipeline/palette-check.mjs 之 CVD 安全表（trans=星白）。
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(process.argv[2] || path.join(HERE, "..", ".."));

async function loadYaml() {
  try { return await import("yaml"); }
  catch {
    // 沙箱挂载下 pnpm 符号链接不可读时，走 .pnpm 实路径
    const direct = path.join(ROOT, "node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/index.js");
    const { createRequire } = await import("node:module");
    return createRequire(import.meta.url)(direct);
  }
}
const YAML = await loadYaml();
const parse = YAML.parse || YAML.default.parse;

const read = (p) => fs.readFileSync(path.join(ROOT, p), "utf8");

/* ── domains ── */
const domainsJson = JSON.parse(read("schema/data/domains.json"));
const DOMZH = Object.fromEntries(domainsJson.domains.map((d) => [d.slug, d.zh]));

/* ── nodes ── */
const TYPES = ["tech", "idea", "person", "wonder", "disaster"];
const nodes = [];
for (const t of TYPES) {
  const dir = path.join(ROOT, "content/nodes", t);
  for (const f of fs.readdirSync(dir).filter((x) => x.endsWith(".md")).sort()) {
    const raw = fs.readFileSync(path.join(dir, f), "utf8");
    const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
    if (!m) throw new Error("no frontmatter: " + f);
    const fm = parse(m[1]);
    const body = m[2] || "";
    const locM = body.match(/^\*\*定位句\*\*\s*—\s*(.+)$/m);
    const q = fm.quote || {};
    nodes.push({
      id: fm.id, type: fm.type, sub: fm.subtype || null,
      zh: fm.title?.zh || fm.id, en: fm.title?.en || "",
      y0: fm.era?.start_year ?? null, y1: fm.era?.end_year ?? null, circa: !!fm.era?.circa,
      culture: fm.culture, sec: fm.culture_secondary || null, tier: fm.tier || "minor",
      doms: (fm.domains || []).map((s) => DOMZH[s] || s),
      region: fm.region?.zh || "",
      quote: q.text?.zh || "", qsrc: q.source?.zh || "",
      loc: locM ? locM[1].trim() : "",
      sum: fm.summary?.zh || "",
      conf: fm.confidence?.level || "", cavs: fm.confidence?.caveats || [],
      refs: (fm.refs || []).map((r) => r.author ? `${r.title}（${r.author}）` : `${r.title}`),
      imgs: (fm.images || []).map((im) => ({
        src: im.src, cap: im.caption?.zh || "", credit: im.credit || "",
        lic: im.license || "", url: im.source_url || "", ai: !!im.ai_generated,
      })),
      vers: (fm.versions || []).map((v) => ({ t: v.title?.zh || v.t || "", e: v.era || v.e || "" })),
    });
  }
}
nodes.sort((a, b) => (a.id < b.id ? -1 : 1));

/* ── edges ── */
const edges = [];
for (const f of fs.readdirSync(path.join(ROOT, "content/edges")).filter((x) => x.endsWith(".yaml")).sort()) {
  const d = parse(read("content/edges/" + f));
  for (const e of d.edges) {
    edges.push({ s: e.source, t: e.target, ty: e.type, imp: e.importance || "minor",
      disputed: !!e.disputed, n: e.note?.zh || "" });
  }
}
edges.sort((a, b) => (a.s + "|" + a.t + "|" + a.ty < b.s + "|" + b.t + "|" + b.ty ? -1 : 1));

/* ── contexts ── */
const contexts = [];
for (const f of fs.readdirSync(path.join(ROOT, "content/contexts")).filter((x) => x.endsWith(".yaml")).sort()) {
  const c = parse(read("content/contexts/" + f));
  contexts.push({ id: c.id, zh: c.title?.zh || c.id, en: c.title?.en || "", culture: c.culture,
    y0: c.era?.start_year ?? null, y1: c.era?.end_year ?? null, parent: c.parent || null,
    sum: c.summary?.zh || "" });
}
contexts.sort((a, b) => (a.id < b.id ? -1 : 1));

/* ── 端点完整性自检（渲染不吞悬空）── */
const ids = new Set(nodes.map((n) => n.id));
for (const e of edges) if (!ids.has(e.s) || !ids.has(e.t))
  throw new Error(`dangling edge ${e.s}->${e.t}`);

/* ── 文明带渲染表：CVD 安全配色（pipeline/palette-check.mjs 唯一色源；trans=星白）── */
const PAL = { sinic: "#e54e58", africa: "#ab4e13", indic: "#c88524", "ancient-near-east": "#807906",
  islamic: "#5ba963", americas: "#03919b", western: "#3777eb", "greco-roman": "#8c55c2",
  "sea-oceania": "#cb67b4", steppe: "#a44072", trans: "#d8d8e0" };
const ORDER = [["ancient-near-east", "古代近东"], ["greco-roman", "希腊—罗马"], ["western", "欧洲—西方"],
  ["trans", "跨文明"], ["islamic", "伊斯兰世界"], ["indic", "印度—南亚"], ["sinic", "中华（东亚）"],
  ["steppe", "中亚—草原"], ["americas", "美洲原住民"], ["africa", "撒南非洲"], ["sea-oceania", "东南亚—大洋洲"]];
const cnt = Object.fromEntries(ORDER.map(([k]) => [k, 0]));
for (const n of nodes) cnt[n.culture] = (cnt[n.culture] || 0) + 1;
const mx = Math.max(...Object.values(cnt));
const CULTURES = ORDER.map(([k, zh]) => ({ k, zh, c: PAL[k],
  w: +(0.055 + 0.12 * (cnt[k] || 0) / mx).toFixed(4) }));

const DATA = {
  META: { nodes: nodes.length, edges: edges.length, contexts: contexts.length, seed: 20260718 },
  CULTURES,
  TYPEZH: { tech: "技术", idea: "思想", person: "人物", wonder: "奇观", disaster: "灾祸" },
  /* 渲染词表＝唯一色源（causes 已归一 #b84a44，R3 记账②收束于此） */
  EDGETYPES: {
    enables: { zh: "使能", c: "#7fb069", r2: true }, derives: { zh: "衍生", c: "#8fa3bf" },
    applies: { zh: "应用", c: "#b48ead" }, informs: { zh: "反哺", c: "#5e81ac", r2: true },
    inspires: { zh: "激发", c: "#d9b44a" }, contributed: { zh: "贡献", c: "#c78d5e" },
    patronized: { zh: "赞助", c: "#b97a8b" }, parallels: { zh: "并流", c: "#9a9a9a" },
    causes: { zh: "致祸", c: "#b84a44" }, regulates: { zh: "管制", c: "#d4472a", r1: true },
  },
  NODES: nodes, EDGES: edges, CONTEXTS: contexts,
};

const js = "window.CIVDATA = " + JSON.stringify(DATA, null, 1) + ";\n";
const htmlPath = path.join(ROOT, "web/prototypes/civiliverse-r5a-proto.html");
const html = fs.readFileSync(htmlPath, "utf8");
if (!/\/\*DATA-START\*\//.test(html) || !/\/\*DATA-END\*\//.test(html))
  throw new Error("DATA markers not found in " + htmlPath); /* 真错误：标记缺失 */
const out = html.replace(/(\/\*DATA-START\*\/)[\s\S]*?(\/\*DATA-END\*\/)/,
  (_, a, b) => a + "\n" + js + b);
if (out === html) { /* no-op＝成功空操作（数据无变化），exit 0 —— R4 债③清偿 */
  console.log(`no-op: data unchanged (${nodes.length} nodes / ${edges.length} edges / ${contexts.length} contexts), ${path.relative(ROOT, htmlPath)} left as-is`);
  process.exit(0);
}
fs.writeFileSync(htmlPath, out);
console.log(`baked: ${nodes.length} nodes / ${edges.length} edges / ${contexts.length} contexts -> ${path.relative(ROOT, htmlPath)}`);
