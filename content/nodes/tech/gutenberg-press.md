---
schema_version: 1
id: gutenberg-press
type: tech
title: { zh: 古登堡印刷机, en: The Gutenberg Press }
summary:
  zh: "约1440年代古登堡在美因茨集成的印刷系统：可批量铸造的金属活字（字冲—字模—铸字盒）、油性墨，及改自葡萄/纸张螺旋压床的压印机。拼音文字只需数十字模，天然适配活字量产。约1455年印出四十二行圣经。它是欧洲印刷革命的物质引擎。"
  en: "The printing system Gutenberg integrated at Mainz in the 1440s: mass-castable metal type (punch–matrix–hand mould), oil-based ink, and a screw press adapted from wine and paper presses. An alphabetic script needing only a few dozen sorts suited mass composition. Around 1455 it produced the 42-line Bible. It was the material engine of Europe's printing revolution."
era: { start_year: 1440, end_year: 1455, circa: true }
culture: western
tier: major
domains: [information-communication, materials-chemistry]
region: { zh: 美因茨（神圣罗马帝国）, en: "Mainz (Holy Roman Empire)" }
quote:
  text:
    zh: 此书非以芦苇、铁笔或羽毛写成，而是借字冲与铅字之奇妙谐配印就。
    en: "…printed not by reed, stylus, or pen, but by the wondrous concord, proportion, and harmony of punches and types."
  source: { zh: 《大全》（Catholicon）1460年美因茨版牌记（一般归古登堡工坊）, en: "Colophon of the Catholicon, Mainz 1460 (generally attributed to Gutenberg's workshop)" }
icon: { source: ai, license: "CC BY 3.0", status: needs-ai, fallback: "lorc/printing-press" }
images: []
refs:
  - { title: "The Gutenberg Revolution", author: John Man }
  - { title: "L'apparition du livre", author: "Febvre & Martin" }
  - { title: "Printing press", url: "https://en.wikipedia.org/wiki/Printing_press" }
confidence:
  level: high
  caveats: [ 四十二行圣经约1455、金属活字/油墨/螺旋压印机三要素为确证, Catholicon 牌记归属古登堡有学界讨论, 古登堡对手模铸字盒的具体贡献细节有争议 ]
status: draft
versions: []
---

**卷首引文** — 「此书非以芦苇、铁笔或羽毛写成，而是借字冲与铅字之奇妙谐配印就。」——《大全》1460年美因茨版牌记
*"…printed not by reed, stylus, or pen, but by the wondrous concord, proportion, and harmony of punches and types." — Colophon of the Catholicon, Mainz 1460*

**定位句** — 让欧洲第一次可以「精确复制」书籍的那台机器——它的祖先是一台榨葡萄的压床。
*The machine that first let Europe copy books exactly—its ancestor was a press for crushing grapes.*

**历史叙述** — 约1440年代，美因茨的金匠约翰内斯·古登堡把几项已有技术组装成一个可运转的系统。其核心是**金属活字的批量铸造**：以钢制字冲敲出铜制字模，再置于可调的手铸字盒中，浇入铅锡锑合金，即可快速、齐整地复制成千上万枚字母。配以适合金属表面的油性墨，及一台改自葡萄/纸张螺旋压床的压印机，一页页文字便能均匀施压印于纸上。与东亚的泥、木活字不同，欧洲的拼音文字只需数十种字模，天然适配这套量产逻辑。约1455年，古登堡工坊印出著名的四十二行圣经，行距整饬如手抄，却是机器的产物。
*In the 1440s Johannes Gutenberg, a goldsmith of Mainz, assembled several existing techniques into a working system. At its core was the mass-casting of metal type: a steel punch struck a copper matrix, which was set in an adjustable hand mould and filled with a lead-tin-antimony alloy to reproduce thousands of letters quickly and uniformly. With oil-based ink suited to metal, and a screw press adapted from wine and paper presses, page after page could be pressed evenly onto paper. Unlike the clay and wooden type of East Asia, Europe's alphabetic script needed only a few dozen matrices and suited this logic of mass production. Around 1455 Gutenberg's workshop printed the famous 42-line Bible—as orderly as a scribe's hand, yet a machine's product.*

**史论** — 古登堡印刷机的关键，常被误认作「压印机」那台大家伙，其实真正的创新在**手铸字盒**——一套让同一字母被无限、齐整复制的模具系统。这提醒我们：一项「革命性技术」往往不是一个惊人的大发明，而是若干既有部件的巧妙集成（金属铸造、油墨、螺旋压床、字模），其难点在配合而非单点。图谱把这台机器（tech）与「印刷革命」（idea）以 enables 边相连，而非划等号——机器是使能条件，「革命」却属于它落地的社会（字母、纸、资本、竞争市场）。同一逻辑下的活字，东亚早有，却未生同等剧变（见「活字印刷」「印刷革命」）。
*The key to the Gutenberg press is often mistaken for the big press itself; the real innovation was the hand mould—a system of matrices that let one letter be reproduced endlessly and uniformly. A "revolutionary technology" is often not one astonishing invention but the deft integration of existing parts (metal casting, oil ink, screw press, matrices), its difficulty in the fit rather than any single point. The graph joins this machine (a technology) to "the printing revolution" (an idea) with an enables edge, not an equals sign—the machine was the enabling condition, but the "revolution" belonged to the society it met (alphabet, paper, capital, competitive markets). Type under the same logic existed early in East Asia without a comparable upheaval (see "Movable-Type Printing" and "The Printing Revolution").*

**图注**（史料图）— 手铸字盒与铅活字。真正让书「可复制」的不是那台压床，而是这套能把一个字母浇上千遍的小模具。／ *A hand mould and cast metal type. What truly made books reproducible was not the great press but this small mould, which could cast one letter a thousand times over.*

**参考文献** — John Man, The Gutenberg Revolution (2002)｜Febvre & Martin, L'apparition du livre (1958)｜Printing press (Wikipedia)。

**〔边建议 → content/edges〕**
- `{source: gutenberg, target: gutenberg-press, type: contributed, importance: major, note:{zh: 古登堡集成金属活字系统, en: Gutenberg integrated the metal-type system}}` —— **batch-2 新增**（person→tech ✓；见 #26）
- `{source: gutenberg-press, target: printing-revolution, type: enables, importance: major, note:{zh: 印刷革命的物质引擎, en: The material engine of the printing revolution}}` —— **batch-2 新增**（tech→idea ✓）

**〔附注〕** icon：语义＝螺旋压印机/铅字；needs-ai，回退 `lorc/printing-press`。冷幽默：定位句「榨葡萄的压床」的技术谱系反差（合手册 §2.2 正例）。插图 A＝手铸字盒与铅字照（Commons PD/CC）；B＝AI 款 A。

---
