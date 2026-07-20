---
schema_version: 1
id: euclid-elements
type: idea
title: { zh: 《几何原本》, en: "Euclid's Elements" }
summary:
  zh: 欧几里得约公元前300年在亚历山大里亚编成的十三卷几何与数论著作。其价值不在新定理——多数命题前人已知——而在结构：全书自二十三个定义、五条公设与五条公理出发，此后四百余个命题，每一个的证明只许调用此前已证之物。这套「公理—演绎」的书写形式此后成为西方论证的范本，经巴格达译注、拉丁转译回流欧洲，1607年由利玛窦与徐光启译出前六卷，汉语的「几何」「点」「线」「平行」诸词即出于此。1830年前后非欧几何的构造，使其两千年的「不证自明」成为一种可选的假设。
  en: "The thirteen books of geometry and number theory compiled by Euclid at Alexandria about 300 BCE. Their value lies not in new theorems—most propositions were already known—but in structure: from twenty-three definitions, five postulates, and five common notions, each of more than four hundred propositions may be proved only from what is already proved. This axiomatic-deductive form became the model of demonstration in the West; it was translated and annotated at Baghdad, returned to Europe in Latin, and in 1607 was rendered into Chinese by Matteo Ricci and Xu Guangqi, whose first six books gave Chinese its words for geometry, point, line, and parallel. Around 1830 the construction of non-Euclidean geometries turned two thousand years of self-evidence into one assumption among possible others."
era: { start_year: -300, end_year: -250, circa: true }
culture: greco-roman
tier: major
domains: [math-computing, science-method]
region: { zh: 亚历山大里亚→巴格达→拉丁欧洲→北京, en: "Alexandria → Baghdad → Latin Europe → Beijing" }
quote:
  text:
    zh: 通往几何学，没有王家专用的路。
    en: "There is no royal road to geometry."
  source: { zh: 普罗克洛《欧几里得〈几何原本〉第一卷注》所记欧几里得答托勒密一世语（5世纪，晚出传闻）, en: "Euclid to Ptolemy I, as reported by Proclus, Commentary on Euclid Book I (5th c. CE; a late attribution)" }
icon: { source: game-icons, id: "delapouite/drawing-compass", license: "CC BY 3.0", status: tentative }
images:
  - src: /assets/nodes/euclid-elements/main-a.png
    caption:
      zh: 尺规、几何图形与立体模型构成的《几何原本》工作台（AI 复原想象图）。
      en: An interpretive Elements worktable with compass, straightedge, plane figures, and geometric solids (AI reconstruction, imagined).
    credit: Civiliverse Art Group (AI-generated with OpenAI built-in image generation)
    license: CC BY 4.0
    source_url: https://raw.githubusercontent.com/civiliverse/civiliverse/main/web/public/assets/nodes/euclid-elements/main-a.png
    ai_generated: true
refs:
  - { title: "The Thirteen Books of Euclid's Elements", author: "Thomas L. Heath（译注）" }
  - { title: 《几何原本》前六卷, author: 利玛窦、徐光启译（1607） }
  - { title: "The Mathematics of Plato's Academy", author: "David H. Fowler" }
  - { title: "Euclid's Elements", url: "https://en.wikipedia.org/wiki/Euclid%27s_Elements" }
confidence:
  level: high
  caveats: [ 欧几里得其人生平几无可考，「欧几里得」是否为一人抑或一个编纂传统的名号、学界有讨论, 「没有王家之路」出自晚出的普罗克洛注（5世纪）、系传闻而非同时代记载，本条作卷首引文并已注明来路, 多数命题源自欧多克索斯、泰阿泰德等前人，欧氏之功在编次与公理化——此为学界通说, 第五公设（平行公设）于19世纪由非欧几何证明为可替换，「不证自明」由此失去绝对性，此点对其影响力的评价至关重要, 「《原本》导致了科学革命」一类断言为过度归因、本条不采；相关边标 disputed ]
status: draft
versions:
  - { title: { zh: 希腊文抄本传统（前3世纪起）, en: "The Greek manuscript tradition (from the 3rd c. BCE)" } }
  - { title: { zh: 阿拉伯文译注（9世纪起：哈贾吉、萨比特·伊本·库拉）, en: "Arabic translation and commentary (from the 9th c.: al-Hajjaj, Thabit ibn Qurra)" } }
  - { title: { zh: 拉丁转译（12世纪：巴斯的阿德拉德、克雷莫纳的杰拉德）, en: "Latin translation (12th c.: Adelard of Bath, Gerard of Cremona)" } }
  - { title: { zh: 汉译《几何原本》前六卷（1607：利玛窦、徐光启）, en: "The Chinese Jihe Yuanben, first six books (1607: Ricci and Xu)" } }
---

**卷首引文** — 「通往几何学，没有王家专用的路。」——普罗克洛所记欧几里得答托勒密一世语（5世纪，晚出传闻）
*"There is no royal road to geometry." — Euclid to Ptolemy I, as reported by Proclus (5th c. CE; a late attribution)*

**定位句** — 《几何原本》里几乎没有一条定理是欧几里得先发现的。它改变历史的不是内容，是次序。
*Almost no theorem in the Elements was first found by Euclid. What changed history was not its content but its order.*

**历史叙述** — 约公元前300年，欧几里得在托勒密治下的亚历山大里亚编成十三卷《原本》。其中的命题大多有更早的来路：比例论出自欧多克索斯，无理量的分类出自泰阿泰德。欧氏之功在于把它们编成一条不可跳跃的链——卷首列出二十三个定义、五条公设（如「由任意一点到任意一点可作直线」）与五条公理，其后四百六十余个命题，每一个的证明只许调用此前已证之物。这套形式随希腊化世界的书写传统流传；9世纪起在巴格达被译为阿拉伯文并大量注疏，其中试图由前四条公设推出第五条的努力延续了数百年。12世纪，巴斯的阿德拉德与克雷莫纳的杰拉德据阿拉伯文本译出拉丁文，《原本》回到欧洲，成为大学教育的骨干。1482年威尼斯印出首个印刷本；此后四百年，它是仅次于《圣经》的印次最多的书。1607年，利玛窦与徐光启在北京译出前六卷，徐光启为之定名「几何」，并译定「点」「线」「面」「平行」「相似」诸词。1830年前后，罗巴切夫斯基与鲍耶各自构造出否定第五公设而不产生矛盾的几何。
*About 300 BCE Euclid compiled the thirteen books of the Elements at Ptolemaic Alexandria. Most of the propositions have earlier sources—the theory of proportion from Eudoxus, the classification of irrationals from Theaetetus—and Euclid's achievement was to set them in a chain that cannot be skipped: twenty-three definitions, five postulates ("to draw a straight line from any point to any point"), and five common notions, after which each of some four hundred and sixty propositions may be proved only from what is already proved. The form travelled with the written traditions of the Hellenistic world; from the ninth century it was translated and heavily annotated at Baghdad, where attempts to derive the fifth postulate from the other four ran on for centuries. In the twelfth, Adelard of Bath and Gerard of Cremona rendered it into Latin from the Arabic, and the Elements returned to Europe as the backbone of university teaching. Venice printed the first edition in 1482; for four centuries after, it was the most-printed book after the Bible. In 1607 Ricci and Xu Guangqi translated the first six books at Beijing, Xu coining jihe for geometry along with the Chinese terms for point, line, surface, parallel, and similar. Around 1830 Lobachevsky and Bolyai independently constructed geometries that deny the fifth postulate without contradiction.*

**史论** — 《原本》的影响远远溢出了数学。它示范的不是几何知识，而是一种可以搬走的**论证体制**：先把前提摆到桌面上，此后不许再从桌子底下拿东西。牛顿的《原理》以几何证明的形式写成，斯宾诺莎的《伦理学》标着「依几何次序证明」，《独立宣言》开篇的「我们认为这些真理不言而喻」用的也是公理的口吻。把这些全算作《原本》的功劳是过度归因——制度、印刷、争论的风气各有其份；但说它们与《原本》无关也说不通：那种「摆出前提再往下推」的写法，是有人先写出来，别人才学得到的。真正的收梢在1830年。当罗巴切夫斯基证明可以不要第五公设时，《原本》最被称道的那一层——自明性——塌了，而它最本质的那一层反倒更牢固了：**公理体系的价值从来不在于公理为真，而在于把「假定了什么」摆在明处。** 一本书因为自己的前提被推翻而变得更重要，这在思想史上不多见。
*The reach of the Elements runs well past mathematics. What it demonstrated was not geometrical knowledge but a portable regime of argument: put the premises on the table, and thereafter take nothing more from under it. Newton's Principia is written in geometrical proofs; Spinoza's Ethics is subtitled "demonstrated in geometrical order"; the Declaration of Independence opens by holding truths to be self-evident, which is the voice of an axiom. To credit all of this to Euclid would be over-attribution—institutions, printing, and a culture of dispute each had their share—but to say it is unrelated will not do either: writing that sets out its premises and then reasons from them is something someone had to write first for others to learn it. The proper ending comes in 1830. When Lobachevsky showed the fifth postulate could be dispensed with, the most celebrated layer of the Elements—self-evidence—collapsed, and its most essential layer became firmer for it: the worth of an axiomatic system never lay in the axioms being true, but in putting on open display what has been assumed. A book made more important by the overthrow of its own premises is a rare thing in the history of ideas.*

**图注**（史料图）— 1607年汉译《几何原本》书影（利玛窦、徐光启译）。徐光启当年定下的「点」「线」「平行」，今日中学课本仍在用。／ *The Chinese Jihe Yuanben of 1607, translated by Matteo Ricci and Xu Guangqi. The words Xu chose for point, line, and parallel are still those in Chinese school textbooks today.*

**参考文献** — Thomas L. Heath, *The Thirteen Books of Euclid's Elements*｜利玛窦、徐光启译《几何原本》（1607）｜David H. Fowler, *The Mathematics of Plato's Academy*｜Euclid's Elements (Wikipedia)。

**〔边建议 → content/edges〕**
- `{source: euclid-elements, target: scientific-method, type: enables, importance: major, disputed: true, note:{zh: 公理—演绎的论证范型为近代科学方法的形式来源之一；作用程度有争议，故标 disputed, en: The axiomatic-deductive form is one formal source of the modern scientific method; the degree is contested, hence disputed}}` —— **batch-3 新增**（idea→idea ✓）〔scientific-method 已入仓〕
- `{source: euclid-elements, target: optics-alhazen, type: enables, importance: minor, note:{zh: 海什木《光学》以几何证明处理视觉，其形式直承《原本》的希腊—阿拉伯传承线, en: Ibn al-Haytham's Optics treats vision by geometrical demonstration, taking its form from the Greek-Arabic transmission of the Elements}}` —— **batch-3 新增**（idea→idea ✓）〔#40 本件同批〕

**〔不采之边 · 登记〕**
- `euclid-elements —enables→ scientific-revolution`：与上条 `→ scientific-method` 意涵重复，且更易被读成单因论（「几何原本导致科学革命」）；**不采**，语义改由 scientific-method 中转承载。
- `printing-revolution —enables→ euclid-elements`：印刷放大了《原本》的流通，却非使之可能，语义不合 `enables`；**不采**。若须表达流通放大，宜俟 R5 议定专用语义或写入正文。

**〔附注〕**
- icon：`delapouite/drawing-compass`（tentative，请丙核）——**须与 #31 指南针的 `delapouite/compass` 明确区分**：二者中文一作「圆规」一作「罗盘」、英文皆 compass，极易在 glossary 机检中互串，已在协调稿登记为双语易混对。
- 插图 A＝1607 年汉译本或 1482 年威尼斯首印本书影（Commons PD）；B＝AI 款 A「公设与命题的链」。
- **引文诚实**：卷首引文出自 5 世纪普罗克洛注，非同时代记载，已在 `source` 与 caveats 双处标明「晚出传闻」，不冒充一手（手册 §八）。
- 幽默仅在卷首引文的选择与史论末句；历史叙述段全陈述。
- 新专名：欧几里得／Euclid、公设／postulate、公理（共同概念）／common notion、第五公设（平行公设）／fifth (parallel) postulate、欧多克索斯／Eudoxus、泰阿泰德／Theaetetus、普罗克洛／Proclus、萨比特·伊本·库拉／Thabit ibn Qurra、巴斯的阿德拉德／Adelard of Bath、克雷莫纳的杰拉德／Gerard of Cremona、罗巴切夫斯基／Lobachevsky、鲍耶／Bolyai、徐光启／Xu Guangqi、利玛窦／Matteo Ricci——已并入 glossary 协调稿增补表。
