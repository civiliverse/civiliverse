---
schema_version: 1
id: casting
type: tech
title: { zh: 铸造, en: Casting }
summary:
  zh: 将金属熔为液态、注入范模、冷凝成形的工艺。它随铜的熔炼而生（约公元前四千纪），第一次使金属器的形状不再受锤子所能达到之处的限制——中空、分叉、带纹饰的复杂形体自此可以一次成形，且可凭同一范模反复复制。失蜡法约于前四千纪末出现于近东与印度河流域，商代中国则把块范法推到极致，以数十块陶范拼合浇出重逾八百公斤的青铜方鼎。铸造亦是中国冶铁独走一路的关键：竖炉温度足以得到液态生铁，可直接浇铸农具，比欧洲的高炉早约一千八百年。其代价是脆——铸件晶粒粗、内有缩孔，受冲击易沿晶界开裂，故凡吃力之器仍须锻打。
  en: "The shaping of metal by melting it, pouring it into a mould, and letting it solidify. It arose with the smelting of copper in the fourth millennium BCE and for the first time freed the shape of a metal object from what a hammer could reach: hollow, branching, ornamented forms could now be made in one operation, and repeated from the same mould. Lost-wax casting appears in the Near East and the Indus around the end of the fourth millennium; Shang China carried the piece-mould method to its limit, assembling dozens of ceramic sections to pour bronze cauldrons of more than eight hundred kilograms. Casting was also the key to China's separate iron road: shaft furnaces ran hot enough to tap liquid cast iron and pour farm tools directly, some eighteen centuries before the European blast furnace. The price is brittleness—coarse grain and internal porosity make castings crack along grain boundaries under shock, so load-bearing pieces must still be forged."
era: { start_year: -4000, end_year: 1900, circa: true }
culture: trans
tier: major
domains: [materials-chemistry, construction-civil]
region: { zh: 近东与印度河流域→中国→欧亚各地, en: "The Near East and the Indus → China → across Eurasia" }
quote:
  text:
    zh: 凡铸鼎，唐虞以前不可考。惟禹铸九鼎，则因九州贡赋壤则已成，入贡方物岁例已定，疏浚河道已通，「万世永赖」，故铸之。
    en: "Of the casting of cauldrons before the age of Yao and Shun nothing can be known. Yu alone cast the Nine Cauldrons—for by then the tribute of the Nine Provinces was assessed, the yearly offerings fixed, and the rivers dredged and open; that these things might endure, he cast them."
  source: { zh: 宋应星《天工开物·冶铸》（1637）, en: "Song Yingxing, Tiangong Kaiwu, on founding (1637)" }
icon: { source: game-icons, id: "delapouite/molten-metal", license: "CC BY 3.0", status: tentative }
images:
  - src: /assets/nodes/casting/main-r5.png
    caption:
      zh: 商周时期陶范分铸青铜器的作坊场景重建（AI 复原想象图）。
      en: A workshop reconstruction of piece-mould bronze casting in Shang–Zhou China (AI reconstruction, imagined).
    credit: Civiliverse Art Group (AI-generated with OpenAI built-in image generation)
    license: CC BY 4.0
    source_url: https://raw.githubusercontent.com/civiliverse/civiliverse/main/web/public/assets/nodes/casting/main-r5.png
    ai_generated: true
refs:
  - { title: 《中国科学技术史》第五卷第十一分册·钢铁冶金, author: 李约瑟（Joseph Needham）等 }
  - { title: "The Coming of the Age of Iron", author: "Theodore A. Wertime & James D. Muhly (eds.)" }
  - { title: "Ancient Chinese Bronzes: Casting Technology and Style", author: "Robert W. Bagley" }
  - { title: "Casting", url: "https://en.wikipedia.org/wiki/Casting" }
confidence:
  level: high
  caveats: [ 失蜡法的最早实例（近东、印度河、巴尔干）年代相近而各有主张，孰先孰后未定, 商代块范法与失蜡法孰为主的争论长期存在；主流意见以块范法为商周主流工艺，失蜡法在中国的确证实例年代较晚, 「中国比欧洲早约一千八百年掌握生铁铸造」指竖炉直接浇铸生铁的确证考古年代之差，非指全部冶金技术的领先, 铸件力学性能劣于锻件为现代冶金学结论；古代匠人以经验分工锻铸，不以此机理立说 ]
status: draft
versions:
  - { title: { zh: 开放石范与双合范（前 4000 起，近东）, en: "Open and bivalve stone moulds (from 4000 BCE, Near East)" } }
  - { title: { zh: 失蜡法（约前 3700 起，近东与印度河流域）, en: "Lost-wax casting (from c. 3700 BCE, Near East and the Indus)" } }
  - { title: { zh: 块范法青铜礼器（商周中国）, en: "Piece-mould ritual bronzes (Shang and Zhou China)" } }
  - { title: { zh: 生铁直接浇铸（前 5 世纪起，中国）, en: "Direct casting of iron (from the 5th c. BCE, China)" } }
  - { title: { zh: 高炉与焦炭铸铁（近代早期欧洲）, en: "Blast furnace and coke-fired iron founding (early modern Europe)" } }
---

**卷首引文** — 「凡铸鼎，唐虞以前不可考。惟禹铸九鼎……『万世永赖』，故铸之。」——宋应星《天工开物·冶铸》（1637）
*"Of the casting of cauldrons before the age of Yao and Shun nothing can be known. Yu alone cast the Nine Cauldrons … that these things might endure, he cast them." — Song Yingxing, Tiangong Kaiwu (1637)*

**定位句** — 锤子只能碰到它够得着的地方；范模能让金属自己流到想去的地方。
*A hammer reaches only where it can strike. A mould lets the metal find its own way there.*

**历史叙述** — 铸造以熔炼为前提，故其起点晚于锻造约四千年。已知最早的金属范铸出现于公元前四千纪的近东——先是把熔铜倒进开放的石凹槽，得到扁平的斧、凿；继而以双合范扣合浇注，可得两面成形之器。真正解放形状的是失蜡法：以蜂蜡塑出所欲之形，外敷泥料成壳，焙烧使蜡流尽，再注入铜液——蜡的自由度就是器物的自由度。此法约于前四千纪末见于近东与印度河流域（摩亨佐-达罗的「舞女」小铜像常被举为早例）。中国走的是另一条路：商代匠人不以失蜡法为主，而把**块范法**做到了近乎不可思议的地步——以数十块刻好纹饰的陶范内外拼合，一次浇成通体饕餮纹的重器；安阳出土的后母戊鼎重达八百余公斤，需数座熔炉同时供液。这套范铸传统直接接住了铁：至迟公元前五世纪，中国的竖炉已能把炉温推到生铁的熔点之上，液态铁水可以像铜一样浇进范里，铸铁农具因此在战国大量普及；欧洲要到 14 世纪才有可用的高炉，18 世纪以焦炭代木炭之后，铸铁才成为桥梁、机床与蒸汽机汽缸的材料。
*Casting presupposes smelting, and so begins some four thousand years after forging. The earliest known metal moulds appear in the fourth-millennium Near East: molten copper poured into open stone hollows to make flat axes and chisels, then bivalve moulds closed on each other to shape both faces. What truly freed shape was the lost-wax process—model the object in beeswax, coat it in clay, fire the shell until the wax runs out, and pour bronze into the void: the freedom of the wax is the freedom of the object. The method is found in the Near East and the Indus by the end of the fourth millennium, the "dancing girl" bronze from Mohenjo-daro being a standard early instance. China took another road. Shang founders did not work chiefly in lost wax but pushed the piece-mould method to a degree that still astonishes: dozens of ceramic sections, their ornament carved in the negative, assembled inside and out and poured at once to yield a vessel covered in taotie masks. The Houmuwu cauldron from Anyang weighs more than eight hundred kilograms and required several furnaces tapping together. That founding tradition took up iron directly: by the fifth century BCE at the latest, Chinese shaft furnaces reached above the melting point of cast iron, and liquid iron could be poured into moulds as bronze was, so that cast-iron farm tools became common in the Warring States. Europe had no workable blast furnace until the fourteenth century, and only after coke replaced charcoal in the eighteenth did cast iron become the stuff of bridges, machine tools, and steam-engine cylinders.*

**史论** — 铸造史最值得一说的，是它如何暴露「技术水平」这个词的空洞。若以「谁先掌握液态金属成形」为尺，中国在冶铁一项上领先欧洲约一千八百年；若以「谁的器物更精」为尺，商代块范法所出的纹饰精度，直到近代机械复制之前无人企及。但这两把尺都量不出后来发生的事——铸铁在欧洲成为工业材料，在中国则长期停在农具与炊器。差别不在会不会铸，而在铸出来的东西被放进了什么样的经济里：18 世纪的英国有煤、有焦炭、有对标准件的持续需求、有肯为一座铁桥付钱的股东。**技术史里最常被误认为「领先与落后」的，其实是「用途与市场」。** 另一层是工艺分工的诚实：铸件好看、好复制、成本低，却脆；凡受冲击的部位——刀刃、犁铧的刃口、车轴——古今中外一律另行锻打或表面处理。中国的炒钢、灌钢，欧洲的可锻铸铁与退火处理，都是同一个问题的不同答案：**怎样把铸造的自由，和锻造的韧，装进同一件器物里。**
*What casting best exposes is the emptiness of the phrase "level of technology." Measured by who first shaped metal in the liquid state, China led Europe in iron by some eighteen centuries; measured by fineness, the ornament pulled from Shang piece-moulds was unmatched until mechanical reproduction. Neither ruler measures what actually followed—cast iron became an industrial material in Europe and remained, in China, largely a matter of hoes and cooking pots. The difference is not in knowing how to cast but in what economy the castings fell into: eighteenth-century Britain had coal, coke, a standing demand for standardized parts, and shareholders willing to pay for an iron bridge. What is most often mistaken in the history of technology for "ahead and behind" is in fact use and market. A second layer is the honesty of the division of labour. Castings are handsome, reproducible, and cheap—and brittle; every part that takes a blow, edge, ploughshare, axle, has always been forged or surface-treated instead, in every tradition. Chinese puddling and co-fusion, European malleable iron and annealing, are different answers to a single question: how to put the freedom of casting and the toughness of forging into the same object.*

**图注**（史料图）— 后母戊鼎（商代晚期，安阳出土，重八百余公斤）。它由数十块陶范拼合一次浇成，需要多座熔炉同时供液，是块范法的极限之作。／ *The Houmuwu cauldron (late Shang, from Anyang; over 800 kg). Poured in a single operation from dozens of assembled ceramic sections, it required several furnaces tapping at once—the piece-mould method at its limit.*

**参考文献** — 李约瑟《中国科学技术史》第五卷第十一分册｜Bagley, *Ancient Chinese Bronzes: Casting Technology and Style*｜Wertime & Muhly (eds.), *The Coming of the Age of Iron*｜宋应星《天工开物·冶铸》｜Casting (Wikipedia)。

**〔边建议 → content/edges〕**
- `{source: casting, target: bronze-metallurgy, type: enables, importance: major, note:{zh: 青铜的价值大半在于可熔铸成形——合金降低熔点、改善流动性，范铸使复杂器形与批量复制成为可能, en: Much of bronze's value lay in being castable: alloying lowered the melting point and improved flow, and moulding made complex forms and repeatable copies possible}}` —— **R5 新增**（tech→tech ✓）〔对端已入仓〕
- `{source: casting, target: ironworking, type: enables, importance: major, note:{zh: 中国竖炉温度足以得到液态生铁并直接浇铸，与西亚—欧洲的块炼锻打路线并行；本边表达冶铁的铸造一支，不否认锻造一支, en: Chinese shaft furnaces ran hot enough to tap and pour liquid iron, a road parallel to the West Asian and European bloomery-and-forge route; this edge represents the casting branch of ironworking without denying the forging branch}}` —— **R5 新增**（tech→tech ✓）〔对端已入仓〕
- `{source: casting, target: wootz-steel, type: enables, importance: major, note:{zh: 乌兹钢以坩埚熔炼得钢饼，属液态成形一路；其后成刃则赖锻打, en: Wootz was won as a cake from a crucible melt, a liquid-state route; the blade that followed was made by forging}}` —— **R5 新增**（tech→tech ✓）〔对端已入仓〕

**〔不采之边 · 登记〕**
- `casting —parallels→ forging`：同 forging 条〔不采之边〕第一项，**丙类·语义稀释**，不重复登记理由。
- `casting —enables→ pyramids-giza` 一类「铸造使巨工可能」：**乙类·史学不成立**——吉萨金字塔的施工以铜凿、木橇、坡道与人力组织为主，铜工具在其中是耗材而非关键变量（一说铜凿磨损极快、需大量补给），把巨工归因于铸造是倒果为因。**坚决不连。**
- `casting —enables→ movable-type`（活字）：**丙类·语义冗余**——金属活字的铸造关系已由 `movable-type` 与 `gutenberg-press` 既有正文与边承载；若自 casting 向每一件金属器都连一条 enables，此节点将成为图上的枢纽噪声，`enables` 的判别力随之归零。**不采**，并作为通则记入附注。

**〔附注〕**
- icon：`delapouite/molten-metal`（tentative，请丙核；若无此名，取坩埚／浇包类，语义须为**液态金属**而非火焰）。插图 A＝后母戊鼎（博物馆照片，许可须核）或《天工开物·冶铸》图版（PD）；B＝AI 款 A「陶范拼合与浇注」。
- **枢纽噪声防则（本条立，请甲追认为通则）**：`forging`／`casting` 这类**贯穿性工艺节点**天然可与几乎每一件金属器连 `enables`。本轮定则：**只连"该工艺是此对端得以成立的路线性前提"者**（即换一条工艺路线此对端便不成立），不连"此对端在制造中用到了该工艺"者。据此本轮各连 2–3 条止，不做枢纽。此则若获追认，建议随手册 v0.6 编入 §十二。
- **与 `bronze-metallurgy`／`ironworking` 正文的重叠核查**：两条既有正文均述及范铸与生铁，本条不复述其金属史，只述**工艺线**（石范—双合范—失蜡—块范—铁范）与其力学代价；既有正文**一字未动**。
- 引文诚实：《天工开物》「禹铸九鼎」一段系宋应星转述传说以论铸鼎之义，**非史实陈述**；`source` 已标明出处与年代，正文亦不采九鼎为史实。
- 新专名：范铸／mould casting、失蜡法／lost-wax casting、块范法／piece-mould casting、双合范／bivalve mould、后母戊鼎／Houmuwu cauldron、饕餮纹／taotie、摩亨佐-达罗／Mohenjo-daro、生铁／cast iron、可锻铸铁／malleable iron、缩孔／porosity——已并入《R5-glossary-协调稿》增补表。
