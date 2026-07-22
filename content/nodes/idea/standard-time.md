---
schema_version: 1
id: standard-time
type: idea
title: { zh: 标准时间, en: Standard Time }
summary:
  zh: 以统一的参考时刻取代各地方太阳时的制度。在铁路出现之前，每座城镇各用自己的正午，相距一度经度即差四分钟，这在步行与马车的世界里毫无妨碍。铁路使之成为问题：同一条线上的车站若各用本地时，时刻表便无从编排，误点即意味着相撞。英国铁路公司自 1840 年起在全线统一采用格林尼治时间（俗称「铁路时间」），1880 年成为法定时间；美国铁路于 1883 年自行划定四个时区，比国会立法早了三十五年。1884 年华盛顿国际子午线会议以格林尼治为本初子午线，把地球划为二十四个时区。此制的实质是：**为了让机器准点，人类重新定义了「现在」。**
  en: "The institution of a common reference time in place of each locality's solar time. Before the railway, every town kept its own noon, four minutes apart for each degree of longitude, which mattered not at all in a world of walking and coaches. The railway made it a problem: if the stations along a line each kept local time, no timetable could be composed, and a train that was late was a train that might collide. British railway companies adopted Greenwich time across their systems from 1840—'railway time'—and it became the legal time of the country in 1880. American railroads drew four time zones on their own authority in 1883, thirty-five years before Congress legislated. The International Meridian Conference at Washington in 1884 took Greenwich for the prime meridian and divided the earth into twenty-four zones. What the institution amounts to is this: so that machines might run on time, humanity redefined the present."
era: { start_year: 1840, end_year: 1884 }
culture: western
culture_secondary: [trans]
tier: minor
domains: [economy-governance, astronomy-navigation]
region: { zh: 英国→北美→国际（华盛顿会议）, en: "Britain → North America → international (the Washington conference)" }
quote:
  text:
    zh: 伦敦时间比雷丁快约四分钟，比锡伦塞斯特快七分半，比布里奇沃特快十四分。
    en: "London time is about 4 minutes in advance of Reading, 7½ before Cirencester, 14 before Bridgwater."
  source: { zh: 大西部铁路时刻表附注（1841）, en: "Note in a Great Western Railway timetable (1841)" }
icon: { source: game-icons, id: "delapouite/world-clock", license: "CC BY 3.0", status: tentative }
images:
  - src: /assets/nodes/standard-time/main-r5.png
    caption:
      zh: 十九世纪末铁路调度室以多地时钟、时刻表与电报协调列车的场景重建（AI 复原想象图）。
      en: A late-nineteenth-century railway dispatch room coordinating trains with clocks, timetables, and telegraphy (AI reconstruction, imagined).
    credit: Civiliverse Art Group (AI-generated with OpenAI built-in image generation)
    license: CC BY 4.0
    source_url: https://raw.githubusercontent.com/civiliverse/civiliverse/main/web/public/assets/nodes/standard-time/main-r5.png
    ai_generated: true
refs:
  - { title: "The Culture of Time and Space, 1880–1918", author: "Stephen Kern" }
  - { title: "Einstein's Clocks, Poincaré's Maps: Empires of Time", author: "Peter Galison" }
  - { title: "Greenwich Time and the Longitude", author: "Derek Howse" }
  - { title: "Standard time", url: "https://en.wikipedia.org/wiki/Standard_time" }
confidence:
  level: high
  caveats: [ 「铁路时间」在英国的推行是逐条线路、逐家公司进行的，1840 年为大西部铁路之始，非全国同时, 1884 年国际子午线会议通过的是本初子午线与计日起点，二十四时区的完整落实由各国自行立法，历时数十年（法国至 1911 年方以格林尼治为基准）, 时区边界的划定从来不只是天文问题，政治与经济考量常使边界大幅偏离经线，本条不以「科学划分」表述之, 「为机器而改时间」为本条的概括表述，其中亦有电报使远距校时成为可能这一并行条件，不宜只归因于铁路 ]
status: draft
versions:
  - { title: { zh: 铁路时间（大西部铁路，1840 起，英国）, en: "Railway time (Great Western Railway, from 1840, Britain)" } }
  - { title: { zh: 格林尼治时间成为英国法定时间（1880）, en: "Greenwich time made the legal time of Britain (1880)" } }
  - { title: { zh: 北美铁路四时区（1883）, en: "The four railroad time zones of North America (1883)" } }
  - { title: { zh: 国际子午线会议与二十四时区（华盛顿，1884）, en: "The International Meridian Conference and the twenty-four zones (Washington, 1884)" } }
---

**卷首引文** — 「伦敦时间比雷丁快约四分钟，比锡伦塞斯特快七分半，比布里奇沃特快十四分。」——大西部铁路时刻表附注（1841）
*"London time is about 4 minutes in advance of Reading, 7½ before Cirencester, 14 before Bridgwater." — note in a Great Western Railway timetable (1841)*

**定位句** — 在铁路之前，问「现在几点」这句话，必须先说清楚是在哪儿问的。
*Before the railway, the question of what time it is could not be answered without first saying where it was being asked.*

**历史叙述** — 地方太阳时是最自然的计时方式：正午即太阳最高之时，每个地方自有其正午。经度每差一度，正午差四分钟；英国东西相距约十度，两端的正午便差近半小时。在马车时代这不成其为问题——旅程以日计，几分钟的差异无处可察。铁路把旅程压到以小时计，问题随之出现：一列车沿线经过十几个各用本地时的车站，时刻表上的每一个数字都需注明是哪座钟的时间；更要紧的是，单线铁路以时刻错车，若两端对时不一致，「错车」就变成迎面相撞。1840 年，大西部铁路率先在全线采用伦敦（格林尼治）时间，其他公司陆续跟进，「铁路时间」一词即由此而来；起初许多城镇拒绝改钟，一些教堂钟楼装了两根分针，一根走本地时、一根走铁路时。1880 年英国以立法确认格林尼治时间为全国法定时间。美国的情形更能说明问题：其国土跨经度更广，铁路公司多达数百家，各自使用的标准时一度有五十余种；1883 年 11 月 18 日，各大铁路依自行协商的方案同时改钟，把全国划为四个时区——这一天被称作「两个正午的星期日」，而联邦立法直到 1918 年才追认。1884 年，二十五国代表在华盛顿开国际子午线会议，以格林尼治为本初子午线（法国投弃权票，并在此后二十余年坚持巴黎时间），以之为基准划分二十四时区，并定以格林尼治午夜为世界日之始。
*Local solar time is the most natural of all reckonings: noon is when the sun stands highest, and each place has its own. A degree of longitude is four minutes of noon; Britain spans some ten degrees, so its ends differ by nearly half an hour. In the age of the coach this was no problem—journeys were counted in days and a few minutes were imperceptible. The railway compressed journeys into hours, and the problem appeared: a train passing a dozen stations each keeping its own time made every figure in a timetable require a note as to whose clock it was. More seriously, single-track lines pass each other by the timetable, and if the two ends do not agree, passing becomes collision. In 1840 the Great Western adopted London—Greenwich—time across its system, other companies followed, and the phrase railway time was born. Many towns at first refused to move their clocks, and some church towers carried two minute hands, one for the town and one for the railway. In 1880 Parliament made Greenwich time the legal time of the country. The American case shows the difficulty more plainly still: a wider span of longitude, hundreds of railroad companies, and at one point more than fifty standards in use among them. On 18 November 1883 the major roads changed their clocks together on a scheme they had negotiated among themselves, dividing the country into four zones—the day was called the Sunday of Two Noons—and federal law caught up only in 1918. In 1884 delegates of twenty-five states met at Washington in the International Meridian Conference, took Greenwich for the prime meridian (France abstaining, and holding to Paris time for another two decades), divided the earth into twenty-four zones on that basis, and set the beginning of the universal day at Greenwich midnight.*

**史论** — 标准时间是「技术要求制度跟着改」的一个格外干净的例子。它干净在于：需求明确（避免撞车、编出时刻表）、方案唯一（统一参照）、阻力具体（各地不愿改自己的正午），而结果彻底——今天全世界没有一个地方还在用本地太阳时。值得留意的是**改的顺序**：不是政府立法在先、企业遵守在后，而是铁路公司自己先改，社会随之适应，法律最后追认。英国的立法晚于铁路时间四十年，美国晚了三十五年。这个顺序在技术史上极为常见：**基础设施的运营者常常在事实上行使着立法的效果，而正式的立法多是对既成事实的确认。** 第二层关于「谁的时间」。以格林尼治为本初子午线不是天文学结论——任何一条经线在物理上都同样可以充当零度；它是当时全球四分之三的航海图已以格林尼治为基准这一事实的结果，而这个事实又是英国海权的结果。法国在会上投弃权票并坚持巴黎时间二十余年，与其说是固执，不如说是对这一点看得很清楚。加利森指出，时间的统一同时也是帝国的一项技术：电报把校时信号送到殖民地，铁路把时区铺到内陆，一个中心的「现在」由此成为所有人的「现在」。第三层则较少被提起：标准时间取消了一样东西——它使「此地的正午」不再等于此地太阳最高的时刻。今天大多数人一生中从未注意过自己所在地的真太阳时与钟表时相差多少。**这是现代生活里一次极安静的替换：一个由天体位置定义的时刻，被一个由协议定义的时刻取代了，而且没有人怀念它。**
*Standard time is an unusually clean instance of a technology requiring institutions to change. Clean, because the need was definite—avoid collisions, compose a timetable; the solution unique—one common reference; the resistance concrete—towns unwilling to move their own noon; and the outcome complete, since nowhere on earth now keeps local solar time. What deserves notice is the order in which it changed. Legislation did not come first with compliance after: the railway companies changed their own clocks, society adapted, and the law confirmed the result. Britain legislated forty years after railway time, the United States thirty-five. The sequence is very common in the history of technology: the operators of infrastructure often exercise in fact the effect of legislation, and formal law is largely the ratification of an accomplished fact. A second layer concerns whose time. Greenwich as prime meridian is not an astronomical conclusion—physically any meridian will serve as zero. It followed from the fact that three-quarters of the world's shipping charts were already reckoned from Greenwich, and that fact followed from British sea power. France's abstention at the conference and its adherence to Paris time for two decades were less obstinacy than clarity about this. Peter Galison has shown that the unification of time was also an instrument of empire: the telegraph carried time signals to the colonies and the railway laid zones across the interior, so that one centre's present became everyone's present. A third layer is seldom mentioned. Standard time abolished something: the noon of a place is no longer the moment its sun stands highest, and most people now live an entire life without noticing how far apparent solar time at their own location departs from the clock. It was a very quiet substitution in modern life—a moment defined by the position of a heavenly body replaced by a moment defined by agreement, and no one has missed it.*

**图注**（史料图）— 1883 年 11 月 18 日北美铁路时区图。这一天被称作「两个正午的星期日」：许多城镇在同一日过了两次正午。／ *The North American railroad time zones of 18 November 1883. The day was called the Sunday of Two Noons: many towns passed noon twice.*

**参考文献** — Kern, *The Culture of Time and Space*｜Galison, *Einstein's Clocks, Poincaré's Maps*｜Howse, *Greenwich Time and the Longitude*｜Standard time (Wikipedia)。

**〔边建议 → content/edges〕**
- `{source: railway, target: standard-time, type: informs, importance: major, note:{zh: 单线铁路以时刻错车，两端对时不一即为相撞之险；时刻表的编排使统一参照时成为必需，铁路公司先于立法自行改钟, en: Single-track lines pass by the timetable, so clocks that disagree at the two ends are a risk of collision; composing timetables made a common reference time necessary, and the companies changed their clocks in advance of any legislation}}` —— **R5 新增**（`informs`＝tech→idea ✓）〔源端已入仓〕
- `{source: telegraph, target: standard-time, type: informs, importance: minor, note:{zh: 电报使远距离校时成为可能——格林尼治的报时信号经电缆送达各地，统一时间自此可实施而不止于可主张, en: The telegraph made time signals transmissible at a distance—Greenwich's signal reached distant places by cable—so that a common time could be enforced and not merely proposed}}` —— **R5 新增**（`informs`＝tech→idea ✓）〔源端已入仓〕

**〔不采之边 · 登记〕**
- `mechanical-clock —enables→ standard-time`（**丙类·语义冗余**）：见 B2 同处登记，钟早六百年即存在，非本条动因。**不采。**
- `standard-time —regulates→ railway`（**丙类·方向与语义双重不当**）：`regulates`（idea→tech·wonder）端点合法，但标准时间不是对铁路的**管制**，而是铁路自身提出并推行的安排；连此边会把一件自下而上的事画成自上而下的事，恰好反了本条史论的要点。**不采。**
- `standard-time —informs→ efficiency-ideology`（**丙类·语义稀释**）：统一时间确为按时计酬与工时测定的前提之一，但 `efficiency-ideology` 的思想来源是车间实测，非计时制度；此边会把二者的松散呼应画成学脉。**不采**，关系写在 A1 正文（「以时计酬的工资」）。

**〔附注〕**
- icon：`delapouite/world-clock`（tentative，请丙核；语义须为**时区／地球与钟**，须与 `mechanical-clock` 的齿轮机构图标明显区分）。插图 A＝1883 年北美铁路时区图（PD）或格林尼治报时球照片（PD／CC）；B＝AI 款 A「双分针的教堂钟面」——**此意象为本条最佳的 AI 图题材**（史料照片罕见，而意象本身可考、无争议），请美术组考虑。
- **`tier: minor` 的说明**：本条不在名单预核之列（属节点池），tier 由乙拟定为 minor——理由是其独立的技术含量有限，价值主要在制度—技术关系的示范。请甲复核；若甲认为其在「时间／通信」族中的枢纽地位应升 major，乙无异议。
- **`culture_secondary: [trans]` 申请**：同 A1，与 glossary 协调稿 §四口径 3「次级也不用 trans」相抵。本条的理由是 1884 年会议本身即为二十五国的国际安排，其成立形态即跨文明。**请甲与 A1 一并裁定**；若不准，乙的备选同样是删去该行、由正文承载。
- **口径 3 的一处普遍问题（请甲留意）**：本轮 A1 与 C2 两条均触到「口径 3 禁用 trans 作次级」的边界。乙的观察是：口径 3 的本意（防止 `trans` 被滥用为「反正影响很广」的懒惰标签）完全正确，但它未区分「**后世影响很广**」（应禁）与「**成立形态本身即跨文明**」（似应许）。**建议 R6 修订口径 3 增列此例外**，本轮先按甲的个案批复执行。
- 幽默仅在定位句、图注（两个正午）与史论收尾（没有人怀念它）三处，均克制。
- 新专名：地方太阳时／local solar time、真太阳时／apparent solar time、铁路时间／railway time、格林尼治时间／Greenwich Mean Time、本初子午线／the prime meridian、国际子午线会议／the International Meridian Conference、两个正午的星期日／the Sunday of Two Noons、报时球／time ball、大西部铁路／the Great Western Railway、加利森／Peter Galison、克恩／Stephen Kern——已并入《R5-glossary-协调稿》增补表。

---

# 本轮交付自检（乙，2026-07-22）

> 依手册 §十（端点自查清单）、§十二（不采之边汇总）、**§十三.3（孤立清零核算，v0.5 新立）**。以下各项**均为机检结果**，脚本逐条跑过，非人工目测；机检口径与甲第 3 步可复跑的方式见 §六。
