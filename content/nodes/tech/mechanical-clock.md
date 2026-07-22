---
schema_version: 1
id: mechanical-clock
type: tech
title: { zh: 机械钟, en: The Mechanical Clock }
summary:
  zh: 以重锤驱动、由擒纵机构分割时间的计时装置。其关键不在动力而在擒纵——一套使齿轮时走时停的机构，把连续下落的重锤转换为可数的等时脉冲。中国的水运仪象台（苏颂等，1088）已用水轮与「天衡」实现了同类的擒纵原理，但其传统未延续；欧洲的重锤驱动机械钟约在 1270 至 1300 年间出现，最早服务于修道院的定时祷告，随后进入城市钟楼。它带来的深远变化并非计时更准（早期机械钟每日误差可达一刻钟，远逊日晷与水钟），而是把「时」从随昼夜长短伸缩的不等时辰，改为一年到头长度相同的等分小时——时间自此成为一种可脱离自然节律来分配与买卖的东西。
  en: "A timekeeper driven by a falling weight and divided by an escapement. Its crux is not the drive but the escape—a mechanism that lets the train advance and arrests it in turn, converting a continuously falling weight into countable, equal beats. In China the astronomical clock tower of Su Song (1088) had realized the same principle with a water wheel and its 'celestial balance,' though that tradition did not continue; weight-driven mechanical clocks appear in Europe between about 1270 and 1300, serving first the appointed prayers of monasteries and then the towers of towns. The change they brought was not accuracy—early mechanical clocks might err a quarter-hour a day, far worse than sundial or clepsydra—but the replacement of unequal hours that stretched and shrank with the seasons by equal hours of the same length all year: time thereby became something that could be allotted and sold apart from the rhythm of nature."
era: { start_year: 1270, end_year: 1700 }
culture: western
culture_secondary: [sinic]
tier: major
domains: [science-method, astronomy-navigation]
region: { zh: 西欧（另有中国宋代水运仪象台一系）, en: "Western Europe (with the separate Song Chinese line of the astronomical clock)" }
quote:
  text:
    zh: 昼夜机绳，随时自击。
    en: "The mechanism runs by day and night, and strikes of itself as the hour comes."
  source: { zh: 苏颂《新仪象法要》（1092）述水运仪象台报时机构, en: "Su Song, Xin Yixiang Fayao (1092), on the striking mechanism of the astronomical clock" }
icon: { source: game-icons, id: "delapouite/clockwork", license: "CC BY 3.0", status: tentative }
images:
  - src: /assets/nodes/mechanical-clock/main-r5.png
    caption:
      zh: 十四世纪欧洲塔钟工坊与早期机械钟传动系统的场景重建（AI 复原想象图）。
      en: A reconstruction of a fourteenth-century European tower workshop and the mechanical clock's early gearwork (AI reconstruction, imagined).
    credit: Civiliverse Art Group (AI-generated with OpenAI built-in image generation)
    license: CC BY 4.0
    source_url: https://raw.githubusercontent.com/civiliverse/civiliverse/main/web/public/assets/nodes/mechanical-clock/main-r5.png
    ai_generated: true
  - src: /assets/nodes/mechanical-clock/detail-escapement-r5.png
    caption:
      zh: 重锤、齿轮与擒纵机构的解释性近景，不含近代摆钟结构（AI 复原想象图）。
      en: An interpretive close-up of weights, gears, and an escapement, without a modern pendulum (AI reconstruction, imagined).
    credit: Civiliverse Art Group (AI-generated with OpenAI built-in image generation)
    license: CC BY 4.0
    source_url: https://raw.githubusercontent.com/civiliverse/civiliverse/main/web/public/assets/nodes/mechanical-clock/detail-escapement-r5.png
    ai_generated: true
refs:
  - { title: "Revolution in Time: Clocks and the Making of the Modern World", author: "David S. Landes" }
  - { title: 《中国科学技术史》第四卷第二分册·机械工程（水运仪象台）, author: 李约瑟（Joseph Needham）等 }
  - { title: "The Culture of Time and Space, 1880–1918", author: "Stephen Kern" }
  - { title: "Clock", url: "https://en.wikipedia.org/wiki/Clock" }
confidence:
  level: medium
  caveats: [ 欧洲第一台机械钟的确切年代与地点不可考——1270 至 1300 年间的文献记载多为间接旁证，无实物存世, 苏颂水运仪象台的擒纵机构与欧洲重锤钟擒纵是否有传承关系尚无证据，主流意见视为独立发明；本条并列而不连传播之边, 兰德斯「钟表纪律→近代性」论题影响甚大，但被批评为以后果倒推动机、且低估了修道院与商业城市各自的独立需求；本条采 disputed 边并写明争议, 早期机械钟的日误差数据源自少数复原实验与间接记载，量级可信、精确值不可靠 ]
status: draft
versions:
  - { title: { zh: 水运仪象台（苏颂等，1088，中国）, en: "Su Song's astronomical clock tower (1088, China)" } }
  - { title: { zh: 重锤驱动与机轴擒纵（约 1270–1300，西欧）, en: "Weight drive and verge escapement (c. 1270–1300, Western Europe)" } }
  - { title: { zh: 城市钟楼与等分小时的普及（14–15 世纪）, en: "Town clocks and the spread of equal hours (14th–15th c.)" } }
  - { title: { zh: 摆钟（惠更斯，1656）与航海钟（哈里森，1761）, en: "The pendulum clock (Huygens, 1656) and the marine chronometer (Harrison, 1761)" } }
---

**卷首引文** — 「昼夜机绳，随时自击。」——苏颂《新仪象法要》（1092）
*"The mechanism runs by day and night, and strikes of itself as the hour comes." — Su Song, Xin Yixiang Fayao (1092)*

**定位句** — 它刚问世时比日晷还不准，却改变了此后所有人对「一小时」这个词的理解。
*It was less accurate than a sundial when it appeared, and it changed what everyone since has meant by "an hour."*

**历史叙述** — 计时的难处不在于让什么东西动起来，而在于让它**匀速**地动。水钟以水流的稳定近似匀速，其精度在古代已相当可观，但受温度与水质影响，且难以驱动复杂的报时机构。真正的突破是擒纵：一套周期性地放行与制止齿轮的机构，使连续的动力被切成等时的脉冲。1088 年苏颂等人在开封建成的水运仪象台，以水轮的定量注水配合「天衡」杠杆实现了这一原理，其上有浑仪、浑象与逐刻报时的木人，是当时世界上最复杂的机械装置之一；靖康之变后该台被拆运北去，此后中国的这一技术传统未获延续。欧洲的机械钟约在 1270 至 1300 年间出现，采重锤驱动与机轴一冕状轮擒纵，无实物存世，最早的证据是修道院账簿与编年史中的旁记。修道院是最初的用户：昼夜七次定时祷告，须有人按时敲钟唤醒众人，机械钟正是把这份差事自动化。14 世纪起，城市开始在钟楼上装大钟——布防、开市、开工与宵禁自此有了公共的、不由任何人裁量的信号。它的精度长期不佳，日差可达一刻钟，须以日晷校准；直到 1656 年惠更斯把摆引入钟机，日差才降至十几秒的量级，1761 年哈里森的航海钟则解决了海上经度测定这一悬案。
*The difficulty of timekeeping is not to set something moving but to make it move evenly. A water clock approximates evenness by the steadiness of flow, and in antiquity did so quite well, but it is sensitive to temperature and to the water itself, and it drives complex striking work only with difficulty. The breakthrough is the escapement: a mechanism that periodically releases and arrests the train, cutting a continuous drive into equal beats. The astronomical clock tower completed at Kaifeng in 1088 by Su Song and his collaborators realized the principle with a water wheel filled by measured amounts and a 'celestial balance' lever, carrying an armillary sphere, a celestial globe, and jacks that announced each quarter—among the most complex machines then existing anywhere. The tower was dismantled and carried north after the fall of Kaifeng, and the tradition was not continued in China. European mechanical clocks appear between about 1270 and 1300, weight-driven with a verge-and-crown-wheel escapement; none survives, and the earliest evidence is incidental notice in monastic accounts and chronicles. Monasteries were the first users: seven appointed offices by day and night required someone to ring the community awake on time, and the clock automated the duty. From the fourteenth century towns began mounting great clocks in their towers, so that watch, market, work, and curfew had a public signal at no one's discretion. Accuracy remained poor—a quarter-hour a day was ordinary, and sundials were used to reset them—until Huygens applied the pendulum in 1656 and brought the daily error to tens of seconds, and Harrison's marine chronometer of 1761 settled the outstanding problem of longitude at sea.*

**史论** — 兰德斯在《时间的革命》中提出，机械钟造就了近代性：钟点的公共化培养了守时、纪律与对时间的经济核算，这些正是资本主义与工业社会的心理前提。这个论题漂亮，也有其证据——工厂的作息、火车的时刻表、以时计酬的工资，确实都以等分小时为前提。但它须与两条批评一并读。其一是倒果为因之嫌：修道院要钟，是为了祷告准时，不是为了培养守时的经济人；城市要钟，是为了协调市政，不是为了预备工业革命——把后来的结果读作当初的动因，是技术史最常见的失误。其二是反例：中国有过更复杂的计时机械而未生近代性，欧洲的等分小时普及了三四百年才等来工厂——若钟是原因，这段时滞无从解释。可以稳妥地说的是较窄的一层：**机械钟没有创造纪律，它提供了纪律得以外化的形式。** 在它之前，「到时候了」这句话由某个具体的人来说——教士、工头、更夫；在它之后，这句话由一个不属于任何人的装置来说。这一步转换本身不带道德倾向，却使一切要求他人守时的安排获得了一种非人称的、看似中立的权威。此后从工厂汽笛到打卡钟，从火车时刻表到今天日程软件里的会议提醒，用的都是这份权威。
*In Revolution in Time, David Landes argued that the mechanical clock made modernity: the public hour bred punctuality, discipline, and the economic reckoning of time, which are the psychological preconditions of capitalism and industrial society. The thesis is handsome and not without evidence—factory hours, railway timetables, and wages paid by the hour do all presuppose the equal hour. It must be read with two criticisms. The first is the suspicion of reading causes off consequences: monasteries wanted clocks so that prayer would be punctual, not to cultivate an economic man; towns wanted them to coordinate civic business, not to prepare an industrial revolution—and taking the later outcome for the original motive is the commonest fault in the history of technology. The second is the counter-instance: China possessed more complex timekeeping machinery and no modernity followed, while equal hours were general in Europe for three or four centuries before the factory arrived; if the clock were the cause, the delay is unaccountable. What can safely be said is narrower: the mechanical clock did not create discipline, it supplied the form in which discipline could be externalized. Before it, "it is time" was said by a particular person—priest, foreman, watchman. After it, the sentence was said by a device belonging to no one. The substitution carries no moral tendency in itself, yet it lends every arrangement that requires punctuality of others an impersonal and seemingly neutral authority. Everything since, from the factory whistle to the time clock, from the railway timetable to the meeting reminder in today's calendar software, has drawn on that authority.*

**图注**（史料图）— 《新仪象法要》所载水运仪象台外观图（1092）。台高约十二米，内有水轮、擒纵与逐刻报时的木人。／ *The astronomical clock tower as illustrated in Su Song's Xin Yixiang Fayao (1092). Some twelve metres high, it contained a water wheel, an escapement, and jacks announcing each quarter.*

**参考文献** — Landes, *Revolution in Time*｜李约瑟《中国科学技术史》第四卷第二分册｜Kern, *The Culture of Time and Space*｜Clock (Wikipedia)。

**〔边建议 → content/edges〕**
- `{source: mechanical-clock, target: scientific-revolution, type: enables, importance: minor, disputed: true, note:{zh: 兰德斯论题——钟点公共化与「宇宙如钟表」的机械论隐喻为近代科学之助；其批评者指出此说以后果倒推动机，且中国有更复杂计时机械而无同类后果, en: "Landes's thesis: the public hour and the clockwork metaphor of the cosmos assisted the new science; critics reply that this reads motive off consequence, and that China had more complex timekeeping and no comparable outcome"}}` —— **R5 新增**（tech→idea ✓，甲审定书 §3.3 已预核合表并注明 disputed）〔对端已入仓〕

**〔不采之边 · 登记〕**
- `mechanical-clock —causes→ {工业纪律／资本主义}` 一类（**乙类·史学不成立＋端点违表**）：兰德斯论题的强版本已被普遍批评；且 `causes` 目标须为 disaster，端点亦不合。**坚决不连。**
- 中国水运仪象台 ⇄ 欧洲机械钟的**传播边**（**乙类·证据不足**）：二者的擒纵是否有传承，现无任何证据链；主流意见视为独立发明。**不连**——本条以 `culture_secondary: [sinic]` 与正文并列承载此关系，这正是 glossary 协调稿 §四口径 1 所指「形成实质性跨越第二个文明带」的用法。
- `mechanical-clock —enables→ standard-time`（**丙类·语义冗余**）：标准时间的直接推手是铁路与电报的调度需求，不是钟本身（钟早已存在六百年）。该关系已由 C2 的 `railway —informs→ standard-time` 准确承载；自本条另连一边会把真实动因让位给一个更古老而更不相干的前提。**不采。**

**〔附注〕**
- icon：`delapouite/clockwork`（tentative，请丙核；语义须为**齿轮机构**而非表盘，以免与 standard-time 的图标撞义）。插图 A＝《新仪象法要》水运仪象台图版（PD）；B＝AI 款 A「机轴擒纵与冕状轮」。
- **`culture: western` ＋ `culture_secondary: [sinic]` 的依据**：依 glossary 协调稿 §四口径 1（形成或传播实质性跨越第二文明带，且正文有据）。本条 summary 与历史叙述均以相当篇幅陈述苏颂一系，且该系在时间上更早、在机构上更复杂，若不标次级，本条将被读成纯西方发明。**注意与口径 2 的区别**：此处不是「后世影响」，而是同一技术问题的两次独立解决，二者在本条中并列陈述。请甲复核此标注。
- 卷首引文取苏颂而非欧洲文献，是有意为之：本条的 `culture` 为 western，引文取中国一系，可在词条第一眼即提示读者本条不是单一文明的故事（手册 §2.2「幽默住在材料里」的同一机制，用于纠偏而非取趣）。
- 幽默仅在定位句（准度反差）与史论收尾（日程软件的提醒）两处，均克制；历史叙述段全陈述。
- 新专名：擒纵机构／escapement、机轴擒纵／verge escapement、冕状轮／crown wheel、水运仪象台／the astronomical clock tower、苏颂／Su Song、《新仪象法要》／Xin Yixiang Fayao、天衡／celestial balance、不等时辰／unequal hours、等分小时／equal hours、惠更斯／Christiaan Huygens、哈里森／John Harrison、航海钟／marine chronometer、兰德斯／David S. Landes——已并入《R5-glossary-协调稿》增补表。
