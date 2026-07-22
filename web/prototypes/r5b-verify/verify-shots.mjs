#!/usr/bin/env node
/**
 * Civiliverse · R5b 机检：3D 银河盘——WebGL 断言＋五档距离带截图＋旋转视角＋交互烟测＋控制台零错误
 * 用法：node verify-shots.mjs [protoPath] [outDir]；依赖 playwright（chromium headless-shell，SwiftShader WebGL）。
 * 注意：跨浏览器版本仅功能断言可比；像素哈希只在钉死浏览器版本时可比（丙复审 R4 边界）。
 */
import { chromium } from "playwright";
import path from "node:path";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const proto = path.resolve(process.argv[2] || path.join(HERE, "..", "civiliverse-r5b-proto.html"));
const outDir = path.resolve(process.argv[3] || HERE);

const browser = await chromium.launch({ args: ["--enable-unsafe-swiftshader"] });
const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
page.setDefaultTimeout(9000);
const errors = [];
const BENIGN = /GPU stall due to ReadPixels/; /* 无头截图自身引发的 SwiftShader 性能提示（ReadPixels＝截图调用），非应用缺陷；仅此一种放行 */
page.on("console", (m) => { if ((m.type() === "error" || m.type() === "warning") && !BENIGN.test(m.text())) errors.push(m.type() + ": " + m.text()); });
page.on("pageerror", (e) => errors.push("pageerror: " + e.message));

await page.goto("file://" + proto);
await page.waitForFunction("!!window.__R5B");
const meta = await page.evaluate("window.__R5B.counts");
console.log("data:", JSON.stringify(meta));
if (meta.nodes !== 78 || meta.edges !== 97 || meta.contexts !== 16)
  throw new Error("counts mismatch (want 78/97/16): " + JSON.stringify(meta));
if (!(await page.evaluate("window.__R5B.webgl()"))) throw new Error("WebGL context not created");
const neb = await page.evaluate("window.__R5B.nebulaCount()");
console.log("nebula sprites:", neb);
if (neb < 150) throw new Error("nebula sprites < 120: " + neb);

async function settle(ms = 700) { await page.waitForTimeout(ms); }
async function shot(name) { await page.screenshot({ path: path.join(outDir, name + ".png") }); console.log("shot:", name); }
async function lvl() { return page.evaluate("window.__R5B.level()"); }
async function setView(o) { await page.evaluate("window.__R5B.setView(" + JSON.stringify(o) + ")"); }

/* 逐档（相机距离＝480/k 档中值；固定视角保证确定性） */
const dists = [360, 203, 111, 62];
for (let i = 0; i < 4; i++) {
  await setView({ theta: -0.62, phi: 0.80, dist: dists[i], target: [0, 0, 0] });
  await settle(500);
  const l = await lvl();
  if (l !== i) throw new Error("level mismatch: want L" + i + " got L" + l);
  await shot("shot-L" + i);
}
/* L4：定星降落（活字印刷） */
await page.evaluate("window.__R5B.flyToNode('movable-type', 34)");
await settle(1100);
if ((await lvl()) !== 4) throw new Error("L4 not reached");
const drawerOpen = await page.evaluate("document.getElementById('drawer').classList.contains('open')");
if (!drawerOpen) throw new Error("L4 auto-landing did not open drawer");
await shot("shot-L4");
/* 退档自动收 */
await setView({ dist: 111 });
await settle(400);
if (await page.evaluate("document.getElementById('drawer').classList.contains('open')"))
  throw new Error("drawer should auto-close on leaving L4");
/* 旋转视角（3D 断言性快照：低仰角侧视旋臂） */
await page.evaluate("window.__R5B.clearSel()");
await setView({ theta: -2.35, phi: 1.28, dist: 215, target: [0, 0, 0] });
await settle(400);
await shot("shot-rot");
/* 星球层：#55（脱孤后 4 边；atrocity 禁 AI/mourn 样式) */
await page.evaluate("window.__R5B.select('holocaust', true)");
await settle(400);
await page.click("#drawerBody .land");
await settle(500);
await shot("shot-planet-holocaust");
await page.click("#ascend");
await settle(300);
/* 回路聚焦 */
await page.evaluate("window.__R5B.clearSel(); window.__R5B.focusLoop(true)");
await settle(1100);
await shot("shot-loop");
await page.evaluate("window.__R5B.focusLoop(false)");
await settle(900);
/* 时间刷拖选＋重置；滤镜开合 */
const tlb = await page.locator("#tl").boundingBox();
await page.mouse.move(tlb.x + tlb.width * 0.55, tlb.y + tlb.height / 2);
await page.mouse.down();
await page.mouse.move(tlb.x + tlb.width * 0.8, tlb.y + tlb.height / 2, { steps: 6 });
await page.mouse.up();
await settle(250);
await page.click("#tlReset");
await page.evaluate("(function(){var cb=document.querySelector(\"#filters input[data-t='person']\"); cb.checked=false; cb.dispatchEvent(new Event('change'));})()");
await settle(150);
await page.evaluate("(function(){var cb=document.querySelector(\"#filters input[data-t='person']\"); cb.checked=true; cb.dispatchEvent(new Event('change'));})()");
/* 滚轮推拉＋拖拽旋转烟测 */
const st = await page.locator("#gl").boundingBox();
await page.mouse.move(st.x + st.width / 2, st.y + st.height / 2);
await page.mouse.wheel(0, -600);
await settle(200);
await page.mouse.down();
await page.mouse.move(st.x + st.width / 2 + 160, st.y + st.height / 2 - 60, { steps: 5 });
await page.mouse.up();
await settle(200);
const labels = await page.evaluate("window.__R5B.labelCount()");
console.log("labels shown:", labels);

await browser.close();
if (errors.length) {
  console.error("CONSOLE/PAGE ERRORS:\n" + errors.join("\n"));
  process.exit(1);
}
console.log("R5B VERIFY PASS: WebGL + 5 level shots + rotation + planet/loop/brush smoke, zero console errors/warnings");
