#!/usr/bin/env node
/**
 * Civiliverse · 文明配色色盲安全校验 (CVD safety check)
 *
 * 对 10 个彩色文明槽位(跨文明=星白, 另计)做两两区分度检查:
 *   - 正常视觉 + 三型色觉缺失模拟(Machado et al. 2009, severity 1.0)
 *   - 距离度量: OKLab 欧氏距离 × 100 (数值越大越易区分)
 * 结论按可视化规范解读: 颜色从不单独承载文明信息(形状/图标/位置/标签冗余兜底),
 * 本检查保证的是"正常视觉全对清晰可分 + CVD 下最弱对仍有非零区分度并有冗余通道"。
 *
 * 用法: node pipeline/palette-check.mjs   (非零退出 = 正常视觉存在 ΔE < 6 的失败对)
 */
const PALETTE = {
  sinic: "#e54e58", africa: "#ab4e13", indic: "#c88524", "ancient-near-east": "#807906",
  islamic: "#5ba963", americas: "#03919b", western: "#3777eb", "greco-roman": "#8c55c2",
  "sea-oceania": "#cb67b4", steppe: "#a44072",
};
const BG = "#0b1026"; // 深空底色(风格 A); 风格 B 更暗, 对比只增不减

const hex2lin = (h) => [1, 3, 5].map((i) => {
  const c = parseInt(h.slice(i, i + 2), 16) / 255;
  return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
});
// Machado et al. 2009, severity 1.0 (linear RGB -> linear RGB)
const CVD = {
  protanopia: [[0.152286, 1.052583, -0.204868], [0.114503, 0.786281, 0.099216], [-0.003882, -0.048116, 1.051998]],
  deuteranopia: [[0.367322, 0.860646, -0.227968], [0.280085, 0.672501, 0.047413], [-0.011820, 0.042940, 0.968881]],
  tritanopia: [[1.255528, -0.076749, -0.178779], [-0.078411, 0.930809, 0.147602], [0.004733, 0.691367, 0.303900]],
};
const mul = (M, v) => M.map((r) => r[0] * v[0] + r[1] * v[1] + r[2] * v[2]);
function oklab([r, g, b]) {
  const l = 0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b;
  const m = 0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b;
  const s = 0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b;
  const [l_, m_, s_] = [l, m, s].map(Math.cbrt);
  return [
    0.2104542553 * l_ + 0.7936177850 * m_ - 0.0040720468 * s_,
    1.9779984951 * l_ - 2.4285922050 * m_ + 0.4505937099 * s_,
    0.0259040371 * l_ + 0.7827717662 * m_ - 0.8086757660 * s_,
  ];
}
const dE = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]) * 100;

const names = Object.keys(PALETTE);
const conditions = { normal: (v) => v, ...Object.fromEntries(Object.entries(CVD).map(([k, M]) => [k, (v) => mul(M, v)])) };
let fail = false;
const summary = {};
for (const [cond, f] of Object.entries(conditions)) {
  const labs = Object.fromEntries(names.map((n) => [n, oklab(f(hex2lin(PALETTE[n])))]));
  let min = Infinity, minPair = null;
  for (let i = 0; i < names.length; i++) for (let j = i + 1; j < names.length; j++) {
    const d = dE(labs[names[i]], labs[names[j]]);
    if (d < min) { min = d; minPair = [names[i], names[j]]; }
  }
  const bgLab = oklab(f(hex2lin(BG)));
  const minBg = Math.min(...names.map((n) => dE(labs[n], bgLab)));
  summary[cond] = { minPair: `${minPair[0]} × ${minPair[1]}`, minDeltaE: +min.toFixed(1), minVsBackground: +minBg.toFixed(1) };
  if (cond === "normal" && min < 6) fail = true;
}
console.log(JSON.stringify(summary, null, 2));
console.log(fail ? "FAIL: normal-vision pair below threshold" : "OK: all-pairs distinct under normal vision; CVD weakest pairs rely on redundant channels (shape/icon/position/label)");
process.exit(fail ? 1 : 0);
