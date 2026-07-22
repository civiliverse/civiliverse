---
schema_version: 1
id: forging
type: tech
title: { zh: 锻造, en: Forging }
summary:
  zh: 在固态下以捶打使金属成形的工艺。它是人类最早的金属加工方式——安纳托利亚的恰约努等遗址中，公元前八千纪的自然铜小件即以冷锻打制，早于任何熔炼。锻造不只改形，还改质：捶打使铸态的粗大晶粒破碎细化，使夹杂物沿受力方向拉成流线，得到的器物比同成分的铸件更韧、更耐冲击。西亚与欧洲的块炼铁路线完全依赖锻造——炉温不足以熔铁，出炉的是渗着炉渣的海绵状铁块，只能靠反复加热捶打把渣挤出去。刀剑的折叠锻打、马蹄铁与农具的打制、直至工业时代的模锻曲轴，都是这一工艺的延长。
  en: "The shaping of metal in the solid state by hammering. It is the oldest form of metalworking: at sites such as Çayönü in Anatolia, small objects of native copper were cold-hammered in the eighth millennium BCE, before any smelting. Forging changes not only shape but substance—hammering breaks up the coarse as-cast grain and draws inclusions into flow lines along the direction of working, so that a forged piece is tougher and more shock-resistant than a casting of the same composition. The bloomery iron route of West Asia and Europe depended on it entirely: furnaces too cool to melt iron yielded a slag-riddled sponge that could be consolidated only by reheating and hammering the slag out. Folded blades, horseshoes and hoes, and the die-forged crankshafts of the industrial age are all extensions of the same operation."
era: { start_year: -8000, end_year: 1900, circa: true }
culture: trans
tier: major
domains: [materials-chemistry, military]
region: { zh: 安纳托利亚与近东→欧亚·非洲各地, en: "Anatolia and the Near East → across Eurasia and Africa" }
quote:
  text:
    zh: 铁匠坐在炉前，凝神谛视他的活计；火焰的热气烤炙着他，他与炉火的炎威相争。
    en: "So doth the smith, sitting by the anvil and considering the iron work; the vapour of the fire wasteth his flesh, and he fighteth with the heat of the furnace."
  source: { zh: 《便西拉智训》三十八章（约前二世纪）, en: "Sirach 38 (c. 2nd century BCE)" }
icon: { source: game-icons, id: "lorc/anvil-impact", license: "CC BY 3.0", status: tentative }
images:
  - src: /assets/nodes/forging/main-r5.png
    caption:
      zh: 早期块炼铁工坊中反复加热、锻打并排出炉渣的工艺重建（AI 复原想象图）。
      en: A reconstruction of repeated heating, hammering, and slag removal in an early bloomery workshop (AI reconstruction, imagined).
    credit: Civiliverse Art Group (AI-generated with OpenAI built-in image generation)
    license: CC BY 4.0
    source_url: https://raw.githubusercontent.com/civiliverse/civiliverse/main/web/public/assets/nodes/forging/main-r5.png
    ai_generated: true
refs:
  - { title: "The Coming of the Age of Iron", author: "Theodore A. Wertime & James D. Muhly (eds.)" }
  - { title: "Çayönü Tepesi and the beginnings of metallurgy in the Ancient World", author: "Aslıhan Yener et al." }
  - { title: "Forging", url: "https://en.wikipedia.org/wiki/Forging" }
  - { title: 《天工开物·锤锻》, author: 宋应星（1637） }
confidence:
  level: high
  caveats: [ 冷锻自然铜的最早年代随新发掘上下浮动，恰约努、恰塔霍裕克等遗址所出多在前八千纪至前七千纪之间, 「锻造改善力学性能」为冶金学确证，但古代匠人对其机理的理解程度不可考，正文只述工艺效果不述其认识, 折叠锻打次数与刃质的关系常被通俗读物夸大（「千锤百炼」多为修辞），实际折叠次数过多反而有害 ]
status: draft
versions:
  - { title: { zh: 冷锻自然铜（前 8000 起，安纳托利亚）, en: "Cold-hammering of native copper (from 8000 BCE, Anatolia)" } }
  - { title: { zh: 热锻与退火（随铜合金普及）, en: "Hot forging and annealing (with the spread of copper alloys)" } }
  - { title: { zh: 块炼铁的锻打排渣（前 1200 起，西亚—欧洲）, en: "Consolidating bloomery iron by hammering (from 1200 BCE, West Asia–Europe)" } }
  - { title: { zh: 折叠锻打与夹钢刃（东亚、西亚、欧洲各有其法）, en: "Folded and laminated blades (with distinct traditions in East Asia, West Asia, and Europe)" } }
  - { title: { zh: 水力锻锤与模锻（中古晚期—工业时代）, en: "Water-powered trip hammers and die forging (late medieval to industrial)" } }
---

**卷首引文** — 「铁匠坐在炉前，凝神谛视他的活计；火焰的热气烤炙着他，他与炉火的炎威相争。」——《便西拉智训》三十八章（约前二世纪）
*"So doth the smith, sitting by the anvil and considering the iron work; the vapour of the fire wasteth his flesh, and he fighteth with the heat of the furnace." — Sirach 38 (c. 2nd century BCE)*

**定位句** — 人类学会用金属，比学会熔化金属早了四千年——中间这四千年，靠的是锤子。
*Humanity worked metal four thousand years before it could melt metal. In between, there was the hammer.*

**历史叙述** — 最早的金属器不是铸出来的，是打出来的。安纳托利亚东南的恰约努遗址出土了公元前八千纪的自然铜小件——锥、针、珠——以冷锻打制而成；此时人类尚不知何谓熔炼，只是把偶然拾得的、本就以单质形态存在的铜块当作一种「可以敲打成形而不碎」的奇怪石头。冷锻会使铜逐渐变硬变脆，继续敲打便会开裂；退火（加热后缓冷）可以恢复其延展性，这一步的发现使锻造第一次成为一门可控的工艺。熔炼与铸造出现后，锻造并未退场，而是分工：形状复杂者铸，受力吃紧者锻。铁的到来使锻造的地位再次上升——西亚与欧洲的块炼炉温度只有一千一百至一千三百度，达不到铁的熔点，炉中所得是海绵状的铁渣混合物，须趁热反复捶打，把液态的炉渣一点点挤出来，才能得到可用的熟铁。一柄好剑因此意味着几十次乃至上百次的加热与捶打。中世纪水力锻锤把这份苦役交给了河流，18 世纪的模锻与蒸汽锤则把它交给了机器：同一个动作，从人的臂力放大到数吨的落锤。
*The earliest metal objects were not cast but hammered. At Çayönü in southeastern Anatolia, small objects of native copper—awls, pins, beads—were cold-hammered in the eighth millennium BCE, at a time when smelting was unknown and copper was simply an odd stone that could be beaten into shape without shattering. Cold work hardens copper and makes it brittle, so that continued hammering cracks it; annealing—heating and slow cooling—restores ductility, and with that discovery forging first became a controllable craft. Smelting and casting did not displace it but divided the work with it: cast what is complex, forge what must bear load. Iron raised forging's standing again. The bloomeries of West Asia and Europe ran at 1100–1300°C, short of iron's melting point, and yielded a spongy mass of metal and slag that had to be hammered hot, again and again, to squeeze the liquid slag out before usable wrought iron remained. A good sword therefore meant dozens, sometimes hundreds, of heats and hammerings. The medieval water-powered trip hammer handed that labour to rivers; die forging and the steam hammer of the eighteenth century handed it to machines—the same motion, scaled from a man's arm to a falling weight of several tons.*

**史论** — 锻造在科技史里长期被当作「铸造之前的原始阶段」，这个次序判断是错的，而且错得有代表性。它错在把工艺史读成了单线进步史：似乎每一种做法都在等着被下一种取代。实情是两种工艺各有其不可替代的物理位置——铸件晶粒粗大、内有缩孔，受冲击时沿晶界开裂；锻件的纤维流线随形而走，同样成分下韧性可高出数倍。所以直到今天，曲轴、连杆、起落架、扳手仍是锻件，没有一样改成了铸件。**一种工艺被另一种「取代」，通常只发生在教科书的目录里；在车间里，它们各自守着自己那份物理。** 另一层则关乎劳动：锻造是全部金属工艺中最耗人力的一种，一炉铁料要经几十次加热捶打，其成本大半不在矿石而在人。这解释了为什么水力锻锤与蒸汽锤在近代早期的欧洲被优先发明——不是因为那里的人更聪明，而是因为那里的锻工工资最先贵到值得用一条河去替换。
*Forging is often filed in the history of technology as the primitive stage before casting, and the ordering is wrong in an instructive way. It misreads craft history as a single line of progress, as though each practice were waiting to be superseded by the next. In fact the two hold distinct and irreplaceable physical positions: castings have coarse grain and internal porosity and crack along grain boundaries under shock, while a forging's flow lines follow its shape, giving several times the toughness at the same composition. Which is why crankshafts, connecting rods, landing gear, and wrenches are still forged, and not one of them has been converted to a casting. A technique is generally "superseded" only in a table of contents; on the shop floor each keeps its own share of the physics. A second layer concerns labour. Forging is the most labour-intensive of all metal processes—a charge of iron may take dozens of heats and hammerings, and most of its cost lies not in ore but in people. That is why water-powered and then steam hammers were developed first in early modern Europe: not because anyone there was cleverer, but because smiths' wages there were the first to become dear enough to be worth replacing with a river.*

**图注**（史料图）— 《天工开物》「锤锻」篇的锻铁图（1637）。两人抡锤、一人扶钳的配置，自青铜时代至工业革命几乎未变。／ *Ironsmiths at the anvil, from Song Yingxing's Tiangong Kaiwu (1637). The arrangement—two on the hammers, one on the tongs—scarcely changed from the Bronze Age to the Industrial Revolution.*

**参考文献** — Wertime & Muhly (eds.), *The Coming of the Age of Iron*｜Yener et al. on Çayönü Tepesi｜宋应星《天工开物·锤锻》（1637）｜Forging (Wikipedia)。

**〔边建议 → content/edges〕**
- `{source: forging, target: ironworking, type: enables, importance: major, note:{zh: 块炼铁出炉为渣铁混合的海绵块，须反复加热捶打排渣方得熟铁，锻造为西亚—欧洲冶铁路线的成器前提, en: Bloomery iron leaves the furnace as a slag-riddled sponge; only repeated hot hammering expels the slag, making forging the shaping precondition of the West Asian and European iron route}}` —— **R5 新增**（tech→tech ✓）〔对端已入仓〕
- `{source: forging, target: wootz-steel, type: enables, importance: minor, note:{zh: 坩埚所得钢饼须经长时低温锻打成刃，其花纹亦于此步显现；本边只主张成刃工序，不主张坩埚熔炼, en: The crucible cake was forged into a blade by long, low-temperature working, in which the pattern also emerges; this edge asserts the blade-making step only, not the crucible melt}}` —— **R5 新增**（tech→tech ✓）〔对端已入仓〕

**〔不采之边 · 登记〕**
- `forging —parallels→ casting`（**丙类·语义冗余或稀释**）：二者的并列关系是本族**规划页 §1.2 的主题**，已由「两条工艺主根共同汇入三条金属路线」的图形结构完整承载；再连一条无向并列，既不增信息，又会把 `parallels` 从「成就并列」稀释为「凡同类皆可连」。**不采。**
- `forging —enables→ meroe-ironworking`（**甲类·端点存在但证据不足**，此项为对 12.2 三类的边界情形，说明见附注）：麦罗埃冶铁的具体成形工艺（块炼锻打抑或另有他法）现有考古报告不足以支撑一条独立断言，2019 年《Antiquity》炉渣研究亦未及此。**不采**，且**不列为下轮增补建议**——待新证据而非待新节点。
- `forging —enables→ stirrup`（**丙类·语义冗余**）：`ironworking —enables→ stirrup` 已于 R4 收尾建成并承载「金属工艺前提」之义；再自 forging 连一条，会把丙在《R5-甲直办修复事后复核》§二.5 明确警告的「把上位前提误画成唯一直接前提」的风险实现出来。**不采。**

**〔附注〕**
- icon：`lorc/anvil-impact`（tentative，请丙核；与 `ironworking` 的 fallback 同名，**请丙确认二者是否宜同图标**——乙建议 forging 用砧与锤，ironworking 改用炉与鼓风，语义分开）。插图 A＝《天工开物·锤锻》图版（PD）；B＝AI 款 A「砧上赤热铁块与双锤」。
- **与 `ironworking` 正文的重叠核查**：ironworking 现文已述块炼法「须反复加热锻打排渣」。本条不重复其冶炼叙述，只从**工艺本身**立论（冷锻—退火—热锻—排渣—模锻的工艺线），二者视角不同、无冗余；ironworking 正文**一字未动**。
- era 取 `-8000..1900` 为工艺自冷锻至模锻的活动包络，非连续单一形态；`circa: true`，caveats 已明示最早年代随发掘浮动。
- 新专名：恰约努／Çayönü、自然铜／native copper、冷锻／cold hammering、退火／annealing、块炼法／bloomery、熟铁／wrought iron、纤维流线／flow lines、模锻／die forging、水力锻锤／trip hammer、《便西拉智训》／Sirach、《天工开物》／Tiangong Kaiwu、宋应星／Song Yingxing——已并入《R5-glossary-协调稿》增补表。
