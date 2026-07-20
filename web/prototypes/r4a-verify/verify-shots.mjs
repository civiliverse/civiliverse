#!/usr/bin/env node
/**
 * Civiliverse · R4a 机检：五档逐档截图＋交互烟测＋控制台零错误断言
 *
 * 用法：node verify-shots.mjs [protoPath] [outDir]
 *   默认 protoPath＝同目录 ../civiliverse-r4a-proto.html，outDir＝本目录。
 * 依赖：playwright（chromium headless-shell）。1280×720，与 R3 基线一致。
 * 断言：console error/warning 数＝0 且无 pageerror；逐档 level() 读数与预期档一致。
 */
import { chromium } from "playwright";
import path from "node:path";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const proto = path.resolve(process.argv[2] || path.join(HERE, "..", "civiliverse-r4a-proto.html"));
const outDir = path.resolve(process.argv[3] || HERE);

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
const errors = [];
page.on("console", (m) => { if (m.type() === "error" || m.type() === "warning") errors.push(m.type() + ": " + m.text()); });
page.on("pageerror", (e) => errors.push("pageerror: " + e.message));

await page.goto("file://" + proto);
await page.waitForFunction("!!window.__R4A");
const meta = await page.evaluate("window.__R4A.counts");
console.log("data:", JSON.stringify(meta));

async function settle(ms = 750) { await page.waitForTimeout(ms); }
async function shot(name) { await page.screenshot({ path: path.join(outDir, name + ".png") }); console.log("shot:", name); }
async function lvl() { return page.evaluate("window.__R4A.level()"); }

/* ── 逐档截图（缩放尺直达） ── */
const expect = [0, 1, 2, 3];
for (let i = 0; i < 4; i++) {
  await page.evaluate(`window.__R4A.zoomToLevel(${i})`);
  await settle();
  const l = await lvl();
  if (l !== expect[i]) throw new Error(`level mismatch: want L${expect[i]} got L${l}`);
  await shot("shot-L" + i);
}
/* L4：定星降落（确定性目标＝movable-type）→ 词条面板自动打开 */
await page.evaluate("window.__R4A.centerOn('movable-type')");
await settle();
await page.evaluate("window.__R4A.zoomTo(6.2)");
await settle(1100);
if ((await lvl()) !== 4) throw new Error("L4 not reached");
const drawerOpen = await page.evaluate("document.getElementById('drawer').classList.contains('open')");
if (!drawerOpen) throw new Error("L4 auto-landing did not open drawer");
await shot("shot-L4");

/* ── 交互烟测 ── */
/* 退出 L4 自动收面板 */
await page.evaluate("window.__R4A.zoomToLevel(2)");
await settle(900);
if (await page.evaluate("document.getElementById('drawer').classList.contains('open')"))
  throw new Error("drawer should auto-close on leaving L4");
/* 选星→星球层→升空 */
await page.evaluate("window.__R4A.select('printing-revolution')");
await settle(300);
await page.click("#drawerBody .land");
await settle(500);
await shot("shot-planet");
await page.click("#ascend");
await settle(200);
/* 孤星（#55 裁定零边）星球层如实呈现 */
await page.evaluate("window.__R4A.select('holocaust')");
await settle(200);
await page.click("#drawerBody .land");
await settle(400);
await shot("shot-planet-holocaust");
await page.click("#ascend");
await settle(200);
await page.evaluate("window.__R4A.clearSel()");
/* 回路聚焦开合 */
await page.evaluate("window.__R4A.focusLoop(true)");
await settle(1000);
await shot("shot-loop");
await page.evaluate("window.__R4A.focusLoop(false)");
await settle(700);
/* 区域双击聚焦（宋朝→L3） */
await page.evaluate("window.__R4A.zoomRegion('song-dynasty')");
await settle(900);
if ((await lvl()) !== 3) throw new Error("zoomRegion should land in L3");
await shot("shot-region-song");
/* 背景介绍页 */
await page.evaluate("window.__R4A.zoomToLevel(1)");
await settle(900);
await page.click("g.region[data-ctx='sinosphere'] rect");
await settle(300);
if (!(await page.evaluate("document.getElementById('ctxintro').classList.contains('open')")))
  throw new Error("ctx intro should open");
/* 时间刷拖选＋重置 */
const tl = await page.locator("#tl").boundingBox();
await page.mouse.move(tl.x + tl.width * 0.55, tl.y + tl.height / 2);
await page.mouse.down();
await page.mouse.move(tl.x + tl.width * 0.8, tl.y + tl.height / 2, { steps: 6 });
await page.mouse.up();
await settle(200);
await page.click("#tlReset");
/* 滤镜开关 */
await page.click("#filters input[data-t='person']", { force: true });
await settle(150);
await page.click("#filters input[data-t='person']", { force: true });
/* 滚轮平滑缩放（光标锚定） */
const st = await page.locator("#cosmos").boundingBox();
await page.mouse.move(st.x + st.width / 2, st.y + st.height / 2);
await page.mouse.wheel(0, -600);
await settle(200);
await page.mouse.wheel(0, 900);
await settle(200);

await browser.close();
if (errors.length) {
  console.error("CONSOLE/PAGE ERRORS:\n" + errors.join("\n"));
  process.exit(1);
}
console.log("R4A VERIFY PASS: 5 level shots + smoke, zero console errors/warnings");
