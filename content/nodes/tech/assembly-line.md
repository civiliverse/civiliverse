---
schema_version: 1
id: assembly-line
type: tech
title: { zh: 生产流水线, en: The Assembly Line }
summary:
  zh: 使待装配之物以固定节拍在工位间移动、由各工位重复施加单一操作的生产组织方式。1913 年福特公司在底特律高地公园厂把它用于整车装配：底盘由绞盘牵引缓行，工人立于原地重复一动，T 型车的装配工时自约十二小时降至约九十分钟，售价随之下落到普通工人负担得起的区间。其前提是可更换零件——零件若须现场锉配，流水线一步也走不动。它的代价在人：节拍由机器而非工人决定，工作被拆到只剩几秒的循环，1913 年福特厂的年离职率一度高达百分之三百七十，公司以「五美元日薪」才把人留住。此后一个世纪，「流水线」既是生产效率的同义词，也是人被当作工序处理的最常用意象。
  en: "A form of production in which the object under assembly moves between stations at a fixed tempo while each station repeats a single operation upon it. Ford applied it to whole-car assembly at Highland Park in Detroit in 1913: chassis drawn slowly by winch past men who stood in place and repeated one motion, cutting the labour time of a Model T from about twelve hours to roughly ninety minutes and bringing the price within reach of an ordinary worker. Its precondition is interchangeable parts—if components must be filed to fit, the line cannot move a step. Its cost falls on people: the tempo is set by the machine rather than the worker, and the work is divided down to cycles of seconds. Annual turnover at Ford reached some 370 per cent in 1913, and only the five-dollar day kept the workforce in place. For a century since, the assembly line has been both the synonym of productive efficiency and the readiest image of persons handled as stages in a process."
era: { start_year: 1913, end_year: 1970 }
culture: western
tier: major
domains: [economy-governance, materials-chemistry]
region: { zh: 底特律→各工业国, en: "Detroit → the industrial world" }
quote:
  text:
    zh: 凡工人，须不必移动一步。
    en: "The man who places a part does not fasten it."
  source: { zh: 亨利·福特《我的生活与工作》（1922）述流水线诸原则, en: "Henry Ford, My Life and Work (1922), on the principles of the line" }
icon: { source: game-icons, id: "delapouite/conveyor-belt", license: "CC BY 3.0", status: tentative }
images:
  - src: /assets/nodes/assembly-line/main-r5.png
    caption:
      zh: 二十世纪初汽车底盘沿移动生产线连续装配的工厂场景重建（AI 复原想象图）。
      en: A reconstruction of automobile chassis moving through continuous assembly in an early-twentieth-century factory (AI reconstruction, imagined).
    credit: Civiliverse Art Group (AI-generated with OpenAI built-in image generation)
    license: CC BY 4.0
    source_url: https://raw.githubusercontent.com/civiliverse/civiliverse/main/web/public/assets/nodes/assembly-line/main-r5.png
    ai_generated: true
refs:
  - { title: "My Life and Work", author: "Henry Ford (1922)" }
  - { title: "The Machine That Changed the World", author: "James P. Womack, Daniel T. Jones & Daniel Roos" }
  - { title: "Labor and Monopoly Capital: The Degradation of Work in the Twentieth Century", author: "Harry Braverman" }
  - { title: "Assembly line", url: "https://en.wikipedia.org/wiki/Assembly_line" }
confidence:
  level: high
  caveats: [ 「福特发明流水线」为流行简化——连续流程在此前的芝加哥屠宰场拆解线、面粉磨坊、罐头厂已行之有年，福特的贡献在于把它用于复杂产品的总装并配以严格的零件互换性, T 型车装配工时「12 小时→93 分钟」为福特公司自报口径，各文献引数略有出入，本条取「约十二小时→约九十分钟」的稳健表述, 「五美元日薪」兼有留人、抑制工会与塑造消费者的多重动机，学界对其权重仍有争论，本条不取单一解释, 关于流水线与大屠杀的意象关联，见史论；本条不主张任何因果 ]
status: draft
versions:
  - { title: { zh: 屠宰场拆解线与谷物连续流程（19 世纪后期）, en: "Meatpacking disassembly lines and continuous-flow milling (later 19th c.)" } }
  - { title: { zh: 高地公园厂整车装配线（1913）, en: "Whole-car assembly line at Highland Park (1913)" } }
  - { title: { zh: 五美元日薪与工时节拍化（1914）, en: "The five-dollar day and the tempo-set working day (1914)" } }
  - { title: { zh: 战后自动化传送与丰田生产方式的反题（1950 年代起）, en: "Postwar automated transfer, and the Toyota system as counter-thesis (from the 1950s)" } }
---

**卷首引文** — 「放零件的人，不负责把它拧紧。」——亨利·福特《我的生活与工作》（1922）
*"The man who places a part does not fasten it." — Henry Ford, My Life and Work (1922)*

**定位句** — 它没有让人干得更快，它让人不必再走动——被移动的是产品，被固定的是人。
*It did not make men work faster. It made them stop walking: the product moves, the person is held in place.*

**历史叙述** — 连续流程并非福特所创。19 世纪后期的辛辛那提与芝加哥屠宰场已把猪羊挂上悬链，沿线各工各司一刀，福特本人称其为灵感之源；面粉磨坊与罐头厂亦早有类似安排。福特的新意有二：一是把连续流程用于**总装**——即把上千个零件合成一台复杂机器，而非把一头牲畜拆开；二是为此付出了零件互换性的代价，凡不能免锉配的零件一律重做工装。1913 年高地公园厂先在磁电机装配上试行，工时自二十分钟降至五分钟；随后底盘装配线建成，绞盘牵引底盘缓缓移动，一百余名工人各守一位。同年该厂的离职率骤升——工作被拆解到只剩几秒一循环，多数人做不下去；1914 年公司宣布「五美元日薪」，日薪近乎翻倍，队伍才稳住。T 型车的售价自 1908 年的八百余美元降至 1920 年代的三百美元以下，汽车由富人玩物变为大众用品。此后流水线随福特厂房的图纸走向世界：苏联的高尔基汽车厂、德国的大众、日本的丰田皆自其取法——丰田后来发展出的准时化与自働化，恰是在保留连续流程的同时，对「节拍由机器定、工人不得停线」这一点作出的反题。
*Continuous flow was not Ford's invention. The slaughterhouses of Cincinnati and Chicago had by the later nineteenth century hung carcasses on overhead rails, each man along the line making his one cut—Ford himself named them as his source—and flour mills and canneries had similar arrangements. Ford's novelty was twofold: he applied continuous flow to assembly, the composition of a complex machine from a thousand parts rather than the dismemberment of an animal; and he paid the price this required in interchangeability, retooling any component that could not be made to fit without filing. At Highland Park in 1913 the method was first tried on magneto assembly, cutting the operation from twenty minutes to five; the chassis line followed, a winch drawing the frame slowly past a hundred men each fixed at a station. Turnover in the plant rose sharply the same year—work reduced to a cycle of seconds proved unendurable for most—and only the five-dollar day of 1914, nearly doubling the wage, held the workforce. The price of a Model T fell from something over eight hundred dollars in 1908 to under three hundred by the 1920s, and the motor car passed from a rich man's toy to a common possession. The line then travelled on the drawings of Ford's own buildings: the Gorky works in the USSR, Volkswagen in Germany, Toyota in Japan all took from it—and the just-in-time and autonomation that Toyota later developed are precisely a counter-thesis to one feature of it, that the tempo is set by the machine and the worker may not stop the line.*

**史论** — 流水线是技术史上少见的、其得失同样明显的发明。得的一面无需辩护：它把汽车、家电与药品的价格拉到普通家庭可及之处，二十世纪物质生活的普遍改善有相当一部分记在它的账上。失的一面也无需辩护：它把「工作」的定义改写了——在它之前，一个工人的技艺是他能做完一整件东西；在它之后，技艺被拆进机器与工装，人所提供的是一段可替换的动作。布雷弗曼称之为去技能化，卓别林在《摩登时代》里用两把扳手把它演成了喜剧，而福特厂 1913 年那个百分之三百七十的离职率，是同一件事的非喜剧版本。真正需要小心的是第三层。流水线此后成了一个**意象**：凡是把人当作待处理事项、按流程逐站推进的组织，都会被称作「流水线式」的——包括对纳粹灭绝营的描述。这个比喻抓住了某种真实（登记、编号、按序处理、分工使无人面对整体），却也遮蔽了同样真实的另一半：东线约一百五十万人死于面对面的枪杀，那里没有传送带，也没有任何流程可供藏身。**一个比喻用得越顺手，越要提防它替我们省下的那部分思考。** 至于流水线本身，它从未要求任何人做任何事；它只是把「按节拍完成分内一步」变成了一种如此自然的工作方式，以至于此后每一个要求人们如此工作的组织，都能声称自己不过是在按常理办事。
*The assembly line is one of the rare inventions whose gains and losses are equally plain. The gains need no defence: it brought motor cars, appliances, and medicines within reach of ordinary households, and a considerable share of the general improvement in twentieth-century material life belongs to its account. The losses need none either: it rewrote what work means. Before it, a worker's skill was that he could make a whole thing; after it, the skill lay in the machines and the jigs, and what the person supplied was a replaceable stretch of motion. Braverman called this deskilling; Chaplin played it as comedy in Modern Times with two wrenches; and Ford's 370 per cent turnover in 1913 is the same fact without the comedy. It is the third layer that requires care. The line became an image: any organization that handles persons as items and moves them station by station is called assembly-line—including, in many descriptions, the Nazi extermination camps. The metaphor catches something true—registration, numbering, processing in order, a division of labour in which no one faces the whole—and conceals something equally true: some one and a half million people were shot face to face in the East, where there was no conveyor and no procedure to hide behind. The more readily a metaphor comes to hand, the more one should mistrust the thinking it saves us. As for the line itself, it required nothing of anyone; it only made completing one's own step in time so natural a way to work that every organization since which asks people to work that way can claim to be doing no more than the obvious.*

**图注**（史料图）— 福特高地公园厂的底盘装配线（约 1913）。移动的是底盘，站定的是人。／ *The chassis line at Ford's Highland Park plant (c. 1913). The chassis moves; the men stand.*

**参考文献** — Ford, *My Life and Work* (1922)｜Womack, Jones & Roos, *The Machine That Changed the World*｜Braverman, *Labor and Monopoly Capital*｜Assembly line (Wikipedia)。

**〔边建议 → content/edges〕**
- `{source: interchangeable-parts, target: assembly-line, type: enables, importance: major, note:{zh: 零件若须现场锉配，流水线一步也走不动；互换性是连续总装的硬前提, en: If parts must be filed to fit, the line cannot move a step: interchangeability is the hard precondition of continuous assembly}}` —— **R5 新增**（tech→tech ✓）〔对端已入仓〕
- `{source: efficiency-ideology, target: assembly-line, type: applies, importance: major}` —— 见 A1（同一条边，**装配时只入一条**）

**〔待裁定边〕** `assembly-line —informs→ holocaust`：见本件卷首〈待裁定边表〉，候甲 schema 裁定，本轮不装配。

**〔不采之边 · 登记〕**
- `assembly-line —causes→ {luddites 一类劳工抗争}`（**乙类·年代与端点双重不成立**）：卢德运动早一个世纪；且 `causes` 目标须为 disaster，端点亦违表。**坚决不连。**
- `steam-engine —enables→ assembly-line`（**丙类·语义稀释**）：动力来源与生产组织不在同一层，若如此连边，则蒸汽机将与二十世纪几乎每一项工业技术相连，成为枢纽噪声（防则见《R5-冶金族规划与词条》）。真实的前提关系已由 `interchangeable-parts` 一边承载。**不采。**
- `assembly-line —informs→ efficiency-ideology`（**丙类·方向冗余**）：确有反哺（福特的实践反过来强化了效率话语），但与 A1 的 `applies` 边构成双向重复；`parallels` 亦不宜（二者非并列而是理念与实施）。**不采**，反哺关系写在两条正文里。

**〔附注〕**
- icon：`delapouite/conveyor-belt`（tentative，请丙核；若无此名，取传送带／齿轮链条类，**语义须为传送而非工厂建筑**）。插图 A＝高地公园厂装配线历史照片（PD，多帧在美国国家档案馆与福特档案）；B＝AI 款 B（概念艺术风）不宜——本条正文涉屠杀比喻，**依手册 §7「灾祸慎用款 B」的精神，AI 图一律用款 A 克制变体**。
- **红线自查**：史论第三层涉屠杀，按 §十一 从严——不写灭绝营装置细节、不作因果、明写比喻的限度与那一百五十万枪杀之限定；该层零幽默。幽默仅在定位句与图注（且均为工厂语境，不涉屠杀）。
- 引文取舍说明：福特原书名句甚多，选「放零件的人不负责把它拧紧」而非更著名的「顾客可以要任何颜色，只要它是黑的」——后者是俏皮话，与本条涉屠杀的史论并置会越红线 1／3 的分寸；前者是分工原则的原始表述，信息价值也更高。
- 新专名：高地公园厂／Highland Park、五美元日薪／the five-dollar day、T 型车／Model T、连续流程／continuous flow、拆解线／disassembly line、准时化／just-in-time、自働化／autonomation、丰田生产方式／the Toyota Production System、《摩登时代》／Modern Times——已并入《R5-glossary-协调稿》增补表。
