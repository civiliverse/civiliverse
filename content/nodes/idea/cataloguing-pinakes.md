---
schema_version: 1
id: cataloguing-pinakes
type: idea
title: { zh: 文献编目学（《书目》）, en: "Cataloguing (the Pinakes)" }
summary:
  zh: "由亚历山大图书馆学者卡利马科斯编纂的《书目》（Pinakes，约前3世纪），逐一著录馆藏作者与作品、按门类分列并附小传与首句，凡一百二十卷。它被视为世界最早的图书馆分类目录与书目学的开端——当藏书多到「找不到」时，如何检索本身成了一门技术。"
  en: "The Pinakes (\"Tables,\" c. 3rd c. BCE), compiled by the Library of Alexandria scholar Callimachus, which listed the collection's authors and works by category with brief biographies and opening lines, in 120 books. It is regarded as the world's earliest library catalogue and the beginning of bibliography—when a collection grows too large to find anything in, retrieval itself becomes a technology."
era: { start_year: -245, end_year: -240, circa: true }
culture: greco-roman
tier: minor
domains: [information-communication, science-method]
region: { zh: 托勒密埃及·亚历山大, en: "Ptolemaic Egypt, Alexandria" }
quote:
  text:
    zh: 大书即大祸。
    en: "A big book is a big evil."
  source: { zh: 卡利马科斯（残篇 465 Pfeiffer）, en: "Callimachus, fr. 465 Pfeiffer (μέγα βιβλίον μέγα κακόν)" }
icon: { source: game-icons, id: "delapouite/card-catalog", license: "CC BY 3.0", status: tentative }
images: []
refs:
  - { title: "Callimachus and His Critics", author: Alan Cameron }
  - { title: "The Library of Alexandria", author: "Roy MacLeod (ed.)" }
  - { title: "Pinakes", url: "https://en.wikipedia.org/wiki/Pinakes" }
confidence:
  level: medium
  caveats: [ 《书目》120卷、按门类分列为古代记述, 原书佚失、内容据后世征引重建, 「最早目录」为通行评价、非无争议 ]
status: draft
versions: []
---

**卷首引文** — 「大书即大祸。」——卡利马科斯（残篇 465 Pfeiffer）
*"A big book is a big evil." — Callimachus, fr. 465 Pfeiffer*

**定位句** — 当书多到没人找得到时，「怎么找」本身成了一项发明。
*When there are too many books to find any of them, "how to find" becomes an invention in itself.*

**历史叙述** — 亚历山大图书馆藏书动辄以十万卷计，一个此前无人认真面对的问题随之而来：书这么多，怎么知道有什么、又怎么找到？诗人兼学者卡利马科斯（约前305–前240）给出的答案，是编纂《书目》（Pinakes，字面意为「表」）——凡一百二十卷，逐一著录馆藏的作者与作品，按诗歌、修辞、法律、医学、历史等门类分列，每位作者附小传，每部作品记其首句与行数以便识别。这实际上是世界上第一部图书馆分类目录，也是「书目学」（bibliography）的开端。它不生产新知识，却让既有的知识变得**可检索**——而可检索，是知识能否被使用的前提。
*The Library of Alexandria held books by the hundred thousand, and with them came a problem no one had seriously faced: with so many books, how does one know what exists, or find it? The poet-scholar Callimachus (c. 305–240 BCE) answered with the Pinakes ("Tables")—120 books that listed the collection's authors and works, arranged by category (poetry, rhetoric, law, medicine, history…), each author given a short life, each work recorded with its opening line and number of lines for identification. This was, in effect, the world's first library catalogue and the beginning of bibliography. It produced no new knowledge, but made existing knowledge retrievable—and retrievability is the precondition for knowledge being used at all.*

**史论** — 编目学是一个容易被忽略、却极具「科技史」资格的节点：它提醒我们，**组织信息本身就是一种技术**，其重要性不亚于生产信息。图书馆（wonder）以 enables 边引出编目学（idea），恰是「奇观催生新方法」的样板——正是藏书的巨量，逼出了检索的方法。卡利马科斯那句「大书即大祸」本是讥讽冗长的史诗，用在这里却别有反讽：一个把一百二十卷目录都编出来的人，竟嫌别人的书太长。而这句抱怨背后是一个至今未解的真问题——信息越多，找到所需的成本越高。从《书目》到卡片目录再到搜索引擎，人类一直在回答同一道题。
*Cataloguing is an easily overlooked node with strong credentials in the history of technology: it reminds us that organizing information is itself a technology, no less important than producing it. The Library (a wonder) gives rise to cataloguing (an idea) through an enables edge—a model of "a wonder begetting a new method," since it was the sheer mass of the collection that forced the method of retrieval. Callimachus's line "a big book is a big evil" was a jibe at bloated epic, but here it turns ironic: the man who compiled a 120-book catalogue complains that others' books are too long. Behind the complaint lies a real problem still unsolved—the more information there is, the costlier it is to find what one needs. From the Pinakes to the card catalogue to the search engine, humanity has been answering the same question.*

**图注**（史料图）— 后世重建的《书目》分类示意。原书久佚，我们对它的了解，全靠古人引用它时留下的只言片语——目录自己也需要被别人编目。／ *A modern reconstruction of the Pinakes' categories. The work is long lost; we know it only through others' passing citations—the catalogue itself had to be catalogued by others.*

**参考文献** — Alan Cameron, Callimachus and His Critics (1995)｜Roy MacLeod (ed.), The Library of Alexandria (2000)｜Pinakes (Wikipedia)。

**〔边建议 → content/edges〕**
- `{source: library-of-alexandria, target: cataloguing-pinakes, type: enables, importance: minor}` —— 已在 batch-1 边定稿（wonder→idea ✓）

**〔附注〕** icon：`delapouite/card-catalog`（目录卡）；语义＝分类检索。冷幽默：卷首引文「大书即大祸」＋史论反讽（编目者嫌书长），属引文首选载体，克制。插图 A＝AI 款 A「卷轴分类的书架」。

---
