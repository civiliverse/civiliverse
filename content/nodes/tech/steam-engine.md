---
schema_version: 1
id: steam-engine
type: tech
title: { zh: 蒸汽机, en: The Steam Engine }
summary:
  zh: 以蒸汽的压力与凝结为动力源的热机。1712年纽科门的大气式引擎首次实用化，用于矿井抽水；1765年瓦特提出分离冷凝器，大幅降低燃料消耗，1781年以行星齿轮把往复运动转为旋转，动力自此可驱动工厂机械与后来的车船。值得注意的是理论的次序：热力学是在蒸汽机运转半个多世纪之后，由卡诺（1824）从既成的机器中总结出来的。
  en: "A heat engine driven by the pressure and condensation of steam. Newcomen's atmospheric engine of 1712 was the first practical one, pumping water from mines; Watt's separate condenser of 1765 cut fuel consumption sharply, and his sun-and-planet gear of 1781 turned reciprocation into rotation, so that power could drive factory machinery and, later, vehicles and ships. The order of theory is worth noting: thermodynamics was drawn out of the working machine by Carnot in 1824, more than a century after Newcomen."
era: { start_year: 1698, end_year: 1900, circa: true }
culture: western
tier: major
domains: [energy-power, materials-chemistry]
region: { zh: 英国→世界, en: Britain → the world }
quote:
  text:
    zh: 我脑中已别无他念，唯此机器而已。
    en: "I can think of nothing else but this machine."
  source: { zh: 瓦特1765年致友人书（论分离冷凝器之构想）, en: "James Watt, letter of 1765, on the idea of the separate condenser" }
icon: { source: ai, license: "CC BY 3.0", status: needs-ai, fallback: "delapouite/steam-blast" }
images:
  - src: /assets/nodes/steam-engine/main-a.png
    caption:
      zh: 纽科门式大气蒸汽机与矿井抽水杆系的剖面式重建（AI 复原想象图）。
      en: A cutaway-style reconstruction of a Newcomen atmospheric engine and mine-pump rods (AI reconstruction, imagined).
    credit: Civiliverse Art Group (AI-generated with OpenAI built-in image generation)
    license: CC BY 4.0
    source_url: https://raw.githubusercontent.com/civiliverse/civiliverse/main/web/public/assets/nodes/steam-engine/main-a.png
    ai_generated: true
refs:
  - { title: "The Unbound Prometheus: Technological Change and Industrial Development in Western Europe from 1750 to the Present", author: "David S. Landes" }
  - { title: "The Origins of Feedback Control / A History of Mechanical Inventions", author: "Abbott Payson Usher" }
  - { title: "Steam engine", url: "https://en.wikipedia.org/wiki/Steam_engine" }
confidence:
  level: high
  caveats: [ 萨弗里1698「矿工之友」为更早的实用装置但无活塞、效率极低, 瓦特并非「发明蒸汽机」而是改良纽科门机——通俗叙事常误, 瓦特专利延至1800年是否阻碍高压蒸汽发展（特里维西克一系）学界有争论, 卡诺1824《论火的动力》晚于机器实用逾百年、为「实践先于理论」之判例 ]
status: draft
versions:
  - { title: { zh: 萨弗里「矿工之友」（1698，无活塞）, en: "Savery's Miner's Friend (1698, pistonless)" } }
  - { title: { zh: 纽科门大气式引擎（1712）, en: "Newcomen atmospheric engine (1712)" } }
  - { title: { zh: 瓦特分离冷凝器与旋转输出（1765—1781）, en: "Watt's separate condenser and rotative output (1765–1781)" } }
  - { title: { zh: 高压蒸汽与移动动力（特里维西克，1801起）, en: "High-pressure steam and mobile power (Trevithick, from 1801)" } }
---

**卷首引文** — 「我脑中已别无他念，唯此机器而已。」——瓦特，1765年致友人书
*"I can think of nothing else but this machine." — James Watt, 1765*

**定位句** — 人类第一次可以不问风向、不问水位、不问牲口累不累，就有力气可用。
*The first time humans could have power without asking about the wind, the water level, or whether the animals were tired.*

**历史叙述** — 17世纪末的矿井越挖越深，排水成了产业瓶颈。1698年萨弗里的「矿工之友」以蒸汽凝结产生的真空直接吸水，无活塞、效率低且危险。1712年，纽科门造出装有活塞与缸体的大气式引擎：缸内注汽后喷水冷凝形成真空，大气压推动活塞下行，如此往复带动摇杆抽水。此机耗煤惊人，但煤矿口边煤价近乎为零，故在英国矿区大量装用。1765年，正在修理一台纽科门机模型的格拉斯哥仪器师瓦特意识到，问题出在每一次循环都要把整个汽缸冷却又加热——若将凝结移至另一个容器，汽缸即可保持高温。这就是分离冷凝器，燃料消耗随之降至约三分之一。瓦特与博尔顿合伙经营，1781年以行星齿轮把往复运动转为旋转，蒸汽动力自此走出矿井、进入纺织厂与磨坊。1801年后，特里维西克等人转向高压蒸汽，使机器小型化，铁路与汽船由是可能。而热机效率的理论解释，要到1824年卡诺《论火的动力》才出现。
*By the late seventeenth century mines were deep enough that drainage had become an industrial bottleneck. Savery's Miner's Friend of 1698 raised water directly by the vacuum of condensing steam—no piston, low efficiency, and dangerous. In 1712 Newcomen built an atmospheric engine with cylinder and piston: steam admitted to the cylinder was condensed by a water spray, and atmospheric pressure drove the piston down, working a rocking beam to pump. It burned coal prodigiously, but at the pithead coal was nearly free, and such engines were installed across the British coalfields. In 1765 James Watt, an instrument-maker at Glasgow repairing a model Newcomen engine, saw that the fault lay in cooling and reheating the whole cylinder every cycle—move the condensation to a separate vessel and the cylinder could stay hot. That was the separate condenser, and fuel consumption fell to roughly a third. In partnership with Matthew Boulton, Watt added the sun-and-planet gear in 1781, converting reciprocation to rotation, and steam power left the mine for the textile mill and the flour mill. After 1801 Trevithick and others turned to high-pressure steam, which made engines small enough for railways and steamships. The theory of heat-engine efficiency arrived only with Carnot's Reflections on the Motive Power of Fire in 1824.*

**史论** — 蒸汽机最有教益的一点，是它把「科学指导技术」的常见图景整个倒了过来。纽科门是铁匠，瓦特是仪器匠，两人都不掌握热力学——因为当时还没有热力学；恰恰是为了解释这些已在运转的机器为何有效率上限，卡诺才写下了后来成为热力学第二定律源头的论文。技术在此走在科学前面，而且走了一百多年。另一处值得留意的是专利：瓦特的专利经议会延长至1800年，其间他坚拒高压路线，特里维西克等人的探索因而受限——这是「知识产权保护创新」这一常识的一个反例，也提醒我们，制度既能供给激励，也能设置路障。至于「瓦特发明蒸汽机」的说法，本图谱不采：他改良的是别人的机器，而这恰恰是技术史的常态——**绝大多数发明都是修理别人的东西修出来的**。
*The most instructive thing about the steam engine is that it inverts the familiar picture of science guiding technology. Newcomen was a blacksmith and Watt an instrument-maker; neither commanded thermodynamics, because there was none. It was precisely in order to explain why these already-working machines had a ceiling of efficiency that Carnot wrote the paper from which the second law descends. Technology went first here, and by more than a century. The patent is worth noticing too: Watt's was extended by Act of Parliament to 1800, during which he firmly resisted the high-pressure route, constraining Trevithick and others—a counterexample to the commonplace that intellectual property protects innovation, and a reminder that institutions supply both incentives and roadblocks. As for "Watt invented the steam engine," this graph declines the phrase: he improved someone else's machine, which is the ordinary condition of technical history—most inventions come out of repairing other people's things.*

**图注**（史料图）— 纽科门大气式引擎图（18世纪）。它的效率低到只有守着煤矿才用得起——技术的可行性，常常先是一笔账。／ *An eighteenth-century plate of the Newcomen atmospheric engine. So inefficient it made sense only at the pithead: technical feasibility often begins as arithmetic.*

**参考文献** — David S. Landes, *The Unbound Prometheus*｜A. P. Usher, *A History of Mechanical Inventions*｜Steam engine (Wikipedia)。

**〔边建议 → content/edges〕**
- `{source: steam-engine, target: luddites, type: causes, importance: minor}` —— **不采**（causes 目标须 disaster，卢德运动为 idea；改用下条）
- `{source: steam-engine, target: luddites, type: inspires, importance: major, note:{zh: 机器动力化引发的手工业者抗争（inspires：灾祸/冲击→抗争理念）, en: Mechanized power provoked the artisans' resistance}}` —— **batch-3 新增**（tech→idea ✓ inspires 源任意、目标 idea）〔待建：名单#47，本件同批〕
- `{source: steam-engine, target: railway, type: enables, importance: major, note:{zh: 高压蒸汽使动力可移动, en: High-pressure steam made power mobile}}` —— **batch-3 新增**〔待建：增补名单#56，**候甲审定**〕

**〔附注〕** icon：语义＝汽缸与摇杆；needs-ai，回退 `delapouite/steam-blast`（全称请丙核）。插图 A＝纽科门机版画（Commons PD）。**端点自查留痕**：初拟的 `steam-engine —causes→ luddites` 违端点表（causes 目标须 disaster），已按手册 §十.1 自查改为 inspires，非法版本存于上并注明不采，供甲复核与后续教学。
