---
schema_version: 1
id: quipu
type: tech
title: { zh: 印加结绳（奇普）, en: Quipu }
summary:
  zh: 安第斯文明以打结的绳束记录信息的媒介。主绳垂下数十至上千条副绳，以结的形制（单结、长结、8字结）、位置与颜色、绳股的捻向编码信息。数值部分已确证为十进位值制——结距主绳的远近即位数，无结即零。印加帝国以之管理人口、贡赋与仓储，专职「结绳官」世代传习。叙事类奇普至今未能释读。
  en: The Andean medium for recording information in knotted cords. From a primary cord hang tens to thousands of pendant cords, encoding data by knot type (single, long, figure-eight), position, colour, and ply direction. The numerical portion is securely decoded as decimal positional notation—distance from the main cord gives place value, and an empty position is zero. The Inca state ran census, tribute, and storehouses on quipu, maintained by hereditary khipukamayuq. Narrative quipu remain unread.
era: { start_year: 800, end_year: 1600, circa: true }
culture: americas
tier: minor
domains: [information-communication, economy-governance]
region: { zh: 安第斯（今秘鲁·玻利维亚·厄瓜多尔）, en: "The Andes (modern Peru, Bolivia, Ecuador)" }
quote:
  text:
    zh: 他们以结计数，其精确不下于我们的数字；至于我们无从记录之事，他们亦以结存之。
    en: "By these knots they counted with an exactness not inferior to our figures; and what we could not have set down, they kept by knots as well."
  source: { zh: 印卡·加西拉索·德拉维加《印卡王室述评》（1609，述其母族传统）, en: "Inca Garcilaso de la Vega, Comentarios Reales de los Incas (1609)" }
icon: { source: ai, license: "CC BY 3.0", status: needs-ai, fallback: "delapouite/knot" }
images:
  - src: /assets/nodes/quipu/main-a.png
    caption:
      zh: 主绳、垂绳与多种结形构成的奇普示意性陈列（AI 复原想象图）。
      en: An interpretive display of a quipu's primary cord, pendants, and varied knots (AI reconstruction, imagined).
    credit: Civiliverse Art Group (AI-generated with OpenAI built-in image generation)
    license: CC BY 4.0
    source_url: https://raw.githubusercontent.com/civiliverse/civiliverse/main/web/public/assets/nodes/quipu/main-a.png
    ai_generated: true
refs:
  - { title: "Signs of the Inka Khipu: Binary Coding in the Andean Knotted-String Records", author: "Gary Urton" }
  - { title: "Code of the Quipu", author: "Marcia Ascher & Robert Ascher" }
  - { title: "Quipu", url: "https://en.wikipedia.org/wiki/Quipu" }
confidence:
  level: medium
  caveats: [ 数值编码（十进位值＋零位空缺）为确证、由 L. L. Locke 1923 首解, 叙事/非数值奇普是否记录语言仍属未决、Urton 的二进制编码假说有争议, 「quipu／khipu」两种拼写并行、本库正译 quipu, 现存约千余件、多数无出土脉络，殖民时期大量销毁 ]
status: draft
versions: []
---

**卷首引文** — 「他们以结计数，其精确不下于我们的数字。」——印卡·加西拉索《印卡王室述评》（1609）
*"By these knots they counted with an exactness not inferior to our figures." — Inca Garcilaso de la Vega, 1609*

**定位句** — 一个管理过一千万人的帝国，全部账目挂在绳子上。
*An empire of ten million people kept its entire accounts on string.*

**历史叙述** — 奇普由一条主绳与自其垂下的若干副绳构成，副绳可再挂子绳，多者逾千。信息编码在四个维度上：结的形制（单结记一，长结的圈数记二至九，8字结记一位数之末位）、结在绳上的位置（自主绳向下依次为个、十、百、千位）、绳的颜色（表类别）与纺捻方向（S 捻或 Z 捻）。1923年，洛克证明其数值部分为十进位值制，且以「该位无结」表零——安第斯人因此在没有书写的条件下拥有了位值制。印加国家据此运转：人口普查按十进编户，贡赋与劳役按册摊派，各地仓廪的存粮存衣皆有账可稽，专司其事的「结绳官」（khipukamayuq）世袭其职，并以口述与绳记互证。西班牙征服后，殖民当局起初仍用奇普征税，其后视之为偶像崇拜之具而大量销毁；今存约千余件，多数已脱离出土脉络。
*A quipu consists of a primary cord with pendant cords hanging from it, which may bear subsidiaries of their own—sometimes more than a thousand in all. Information is encoded along four dimensions: knot type (a single knot for one, a long knot whose turns give two through nine, a figure-eight for the units place), position along the cord (descending from the primary as units, tens, hundreds, thousands), colour (category), and ply direction (S or Z). In 1923 L. L. Locke showed the numerical portion to be decimal and positional, with an empty position standing for zero—so the Andes possessed place value without writing. The Inca state ran on it: population was registered in decimal units, tribute and labour service assessed from the rolls, and the grain and cloth in provincial storehouses accounted for, all in the keeping of hereditary khipukamayuq who cross-checked cords against oral recitation. After the conquest the colonial administration at first went on collecting taxes by quipu, then came to see the cords as instruments of idolatry and destroyed them in quantity; some thousand survive, most without excavated context.*

**史论** — 奇普最容易招来的一句评价是「相当于文字」，但这句话既抬举了它又贬低了它。它在数值上做到了书写系统未必做到的事——位值与零，清清楚楚；而它是否记录语言，至今没有定论。把「有无文字」当作文明门槛，本身就是一件需要警惕的度量：安第斯没有走上文字之路，却建起了跨越三千公里、编户千万的行政体系，说明记录技术的用途远不止「写下句子」。另一层是它的**不可读**：奇普的解码困难不只因为它复杂，更因为读它的人被系统地消灭了——技术依赖的从来不只是物，还有会用这物的人群。当持有知识的社群被摧毁，物件就退化成谜语。
*The easiest thing to say about quipu is that it "amounted to writing," which both flatters and diminishes it. Numerically it achieved what writing systems do not always achieve—place value and zero, unambiguously; whether it recorded language remains unsettled. Treating the presence of writing as the threshold of civilization is itself a measure to be handled with care: the Andes never took the road to script, yet built an administration spanning three thousand kilometres and registering millions, which shows that recording technology serves far more than the setting down of sentences. The other layer is its unreadability. Quipu resists decoding not only because it is complex but because the people who read it were systematically destroyed—technology never depends on objects alone, but on the community that can use them. When the knowing community is broken, the object decays into a riddle.*

**图注**（史料图）— 印加奇普（约15—16世纪）。垂绳上的结距主绳愈远，位数愈低；空位即零。／ *An Inca quipu, 15th–16th century. The farther a knot cluster lies from the primary cord, the lower its place value; an empty position is zero.*

**参考文献** — Gary Urton, *Signs of the Inka Khipu*｜Ascher & Ascher, *Code of the Quipu*｜Quipu (Wikipedia)。

**〔边建议 → content/edges〕**
- `{source: quipu, target: zero-place-value, type: parallels, importance: minor, disputed: true, note:{zh: 位值与零位在安第斯的独立实现（无历史关联，并列以破单线叙事）, en: Place value and an empty-position zero realized independently in the Andes; juxtaposed, with no historical connection}}` —— **batch-3 新增**（无向 ✓）

**〔附注〕** icon：语义＝主绳与垂结；needs-ai，回退 `delapouite/knot`（全称请丙核）。插图 A＝博物馆藏奇普照片（Commons，需核许可）。译名：**正译 quipu、khipu 列 alias**（见《R4-glossary-协调稿》§2.2）。史论末段涉殖民毁灭，按庄重口径写，无幽默。
