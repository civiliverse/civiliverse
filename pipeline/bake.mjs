#!/usr/bin/env node
/**
 * Civiliverse · P0 布局烘焙 v1 (layout bake)
 *
 * 输入:  slices/<slice>.json   (nodes: era/culture/domains/tier, edges)
 * 输出:  out/positions.json    ({ id: [x, y, z] }, 2 位小数)
 *
 * 规则(任务书 P0-T3):
 *   x = 时间(分段比例尺, meta.breaks, 远古压缩、近现代展开)
 *   y/z = 领域聚类(每个主领域一个"星云"锚点) + 关系边弱引力 + 防重叠
 *   确定性: 固定 seed(meta.seed) + 固定迭代数(meta.ticks), 同输入必得同输出
 *
 * 用法:
 *   node pipeline/bake.mjs                 # 烘焙并写 out/positions.json
 *   node pipeline/bake.mjs --check         # 烘焙两次比对, 验证确定性(CI 用)
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { forceSimulation, forceLink, forceCollide, forceY, forceZ } from "d3-force-3d";

const here = dirname(fileURLToPath(import.meta.url));
const SLICE = join(here, "slices", "p0-knowledge-replication.json");

/** mulberry32 — 可复现的伪随机源 */
function mulberry32(seed) {
  let a = seed >>> 0;
  return function () {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** x = 分段线性时间比例尺 */
function xOf(year, breaks) {
  if (year <= breaks[0][0]) return breaks[0][1];
  for (let i = 0; i < breaks.length - 1; i++) {
    const [a, xa] = breaks[i], [b, xb] = breaks[i + 1];
    if (year <= b) return xa + ((year - a) / (b - a)) * (xb - xa);
  }
  return breaks.at(-1)[1];
}

/** 主领域 → y/z 星云锚点(固定角度表, 未列出的领域用名称散列取角) */
const DOMAIN_ANGLE = {
  "信息与传播": 90,   // 主星云带, 靠中上
  "制度与教育": 250,
  "计算": 20,
  "数学与逻辑": 330,
  "经济": 160,
  "宗教与思想": 210,
  "史学": 120,
};
function anchorOf(domain) {
  let deg = DOMAIN_ANGLE[domain];
  if (deg == null) {
    let h = 0;
    for (const ch of String(domain)) h = (h * 31 + ch.codePointAt(0)) >>> 0;
    deg = h % 360;
  }
  const R = 92, rad = (deg * Math.PI) / 180;
  return { y: R * Math.cos(rad), z: R * Math.sin(rad) };
}

export function bake(slicePath = SLICE) {
  const slice = JSON.parse(readFileSync(slicePath, "utf8"));
  const { seed, ticks, breaks } = slice.meta;
  const rng = mulberry32(seed);

  const nodes = slice.nodes.map((n) => {
    const anchor = anchorOf((n.domains && n.domains[0]) || "?");
    const x = xOf(n.era.from, breaks);
    return {
      id: n.id, tier: n.tier, anchor,
      fx: x,                                  // x 轴锁死 = 时间
      x, y: anchor.y + (rng() - 0.5) * 70, z: anchor.z + (rng() - 0.5) * 70,
    };
  });
  const links = slice.edges.map((e) => ({
    source: e.from, target: e.to,
    strength: e.strength === "major" ? 0.05 : 0.025,
  }));

  const sim = forceSimulation(nodes, 3)
    .randomSource(rng)
    .force("link", forceLink(links).id((d) => d.id).distance(46).strength((l) => l.strength))
    .force("collide", forceCollide((d) => (d.tier === "major" ? 18 : 12)).iterations(2))
    .force("y", forceY((d) => d.anchor.y).strength(0.045))
    .force("z", forceZ((d) => d.anchor.z).strength(0.045))
    .stop();
  for (let i = 0; i < ticks; i++) sim.tick();

  const round = (v) => Math.round(v * 100) / 100;
  const positions = {};
  for (const n of [...nodes].sort((a, b) => a.id.localeCompare(b.id))) {
    positions[n.id] = [round(n.fx), round(n.y), round(n.z)];
  }
  return { meta: { slice: slice.meta.slice, seed, ticks, generator: "bake v1" }, positions };
}

const isMain = process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1];
if (isMain) {
  const check = process.argv.includes("--check");
  const a = bake();
  if (check) {
    const b = bake();
    const same = JSON.stringify(a) === JSON.stringify(b);
    console.log(same ? "OK bake is deterministic (two runs identical)" : "FAIL nondeterministic bake");
    process.exit(same ? 0 : 1);
  }
  mkdirSync(join(here, "out"), { recursive: true });
  const outPath = join(here, "out", "positions.json");
  writeFileSync(outPath, JSON.stringify(a, null, 1));
  console.log(`baked ${Object.keys(a.positions).length} nodes -> ${outPath}`);
}
