---
schema_version: 1
id: hindu-arabic-numerals
type: idea
title: { zh: 印度—阿拉伯数字, en: Hindu–Arabic Numerals }
summary:
  zh: "含零的十进位、位值制数码系统（十个数字符号）。源出印度（笈多至中世纪早期），经伊斯兰世界传布（故西方称「阿拉伯数字」），再由花拉子米、金迪之著及斐波那契《计算之书》(1202) 传入欧洲，缓慢取代罗马数字用于计算与商业。它是现代计算的隐形基础设施。"
  en: "The decimal, positional numeral system with ten digit-signs, including zero. It originated in India (Gupta to early medieval), was transmitted through the Islamic world (whence \"Arabic numerals\" in the West), and reached Europe via the works of al-Khwarizmi and al-Kindi and Fibonacci's Liber Abaci (1202), slowly displacing Roman numerals for calculation and commerce. It is the invisible infrastructure of modern computation."
era: { start_year: 500, end_year: 1500, circa: true }
culture: indic
tier: major
domains: [math-computing, information-communication]
region: { zh: 印度→伊斯兰世界→欧洲, en: "India → the Islamic world → Europe" }
quote:
  text:
    zh: 印度的九个数字是：9 8 7 6 5 4 3 2 1。用这九个数字，再加上阿拉伯人称作零的符号「0」，任何数都写得出来。
    en: "The nine Indian figures are: 9 8 7 6 5 4 3 2 1. With these nine figures, and with the sign 0… any number may be written."
  source: { zh: 斐波那契《计算之书》(1202) 开篇, en: "Fibonacci, Liber Abaci (1202), opening" }
icon: { source: game-icons, id: "delapouite/abacus", license: "CC BY 3.0", status: tentative }
images: []
refs:
  - { title: "The Universal History of Numbers", author: "Georges Ifrah" }
  - { title: "Fibonacci's Liber Abaci", author: "L. E. Sigler (trans.)" }
  - { title: "Hindu–Arabic numeral system", url: "https://en.wikipedia.org/wiki/Hindu%E2%80%93Arabic_numeral_system" }
confidence:
  level: high
  caveats: [ 源出印度、经阿拉伯传欧为共识, 各数字字形演变路线细节有争议, 欧洲1299年佛罗伦萨等地曾因防伪禁用「阿拉伯数字」入账为史实 ]
status: draft
versions: []
---

**卷首引文** — 「印度的九个数字是：9 8 7 6 5 4 3 2 1。用这九个数字，再加上阿拉伯人称作零的符号『0』，任何数都写得出来。」——斐波那契《计算之书》(1202)
*"The nine Indian figures are: 9 8 7 6 5 4 3 2 1. With these nine figures, and with the sign 0… any number may be written." — Fibonacci, Liber Abaci (1202)*

**定位句** — 九个数字加一个零，重写了人类计算的方式——也顺带写错了自己的名字（「阿拉伯数字」其实来自印度）。
*Nine figures and a zero that rewrote how humans compute—and misremembered their own name along the way ("Arabic numerals" in fact came from India).*

**历史叙述** — 这套数码源出印度：约公元一千纪中叶，印度数学已用十个符号、按位值记数，含一个表「空位」并可参与运算的零。经由贸易与翻译，它传入伊斯兰世界——花拉子米约825年著《印度数字算法》专述其用，其拉丁化书名 *Algoritmi* 后来演成「算法」(algorithm) 一词。约1202年，比萨商人之子斐波那契在《计算之书》里把这套「印度记数法」系统介绍给拉丁欧洲，力陈其便于商算。然而欧洲接纳得并不痛快：珠算派（abacists）与笔算派（algorists）争执数百年，佛罗伦萨等地甚至一度立法禁止在账簿上使用阿拉伯数字，理由是「0」「6」「9」易被篡改。直到印刷时代，这套数码才彻底定于一尊。
*The system originated in India: by the mid-first millennium CE Indian mathematics used ten signs in positional notation, with a zero that marked an empty place and could enter into calculation. Through trade and translation it passed to the Islamic world—al-Khwarizmi wrote On the Hindu Art of Reckoning around 825, and the Latinized form of his name, Algoritmi, became our word "algorithm." Around 1202 Fibonacci, son of a Pisan merchant, introduced this "Indian reckoning" systematically to Latin Europe in the Liber Abaci, urging its convenience for commerce. Yet Europe took it up grudgingly: abacists and algorists quarrelled for centuries, and cities such as Florence briefly legislated against using Arabic numerals in ledgers, on the ground that 0, 6, and 9 were easily forged. Only in the age of print did the digits win out for good.*

**史论** — 「阿拉伯数字」这个错名，本身就是一份传播史的化石：它记下的是数码**走过的路**（经阿拉伯世界入欧），而非它的**出生地**（印度）——正如「造纸术」里纸的缓慢西行、字母沿商船流布。名字会把路线错认成源头，这是传播史里一再上演的误会。更值得玩味的是欧洲的**抵触**：一项后来被视为理所当然的「进步」，当年却因防伪、习惯与行会利益被抵制立法数百年。这戳破了「先进技术必被迅速采纳」的辉格幻觉——技术的胜出从不自动，要熬过怀疑、诉讼与市场。图谱以 enables 边让「零与位值制」（原理内核）托起这套数码，再以一条 disputed 的 enables 边把它接向「复式记账」（便算之用）。
*The misnomer "Arabic numerals" is itself a fossil of transmission history: it records the road the digits travelled (into Europe via the Arab world), not their birthplace (India)—just as paper crept slowly west and the alphabet spread by ship. Names mistake the route for the source, a recurring confusion in the history of diffusion. More telling is Europe's resistance: a "progress" later taken for granted was for centuries opposed and legislated against, out of fear of forgery, habit, and guild interest. This punctures the Whig fantasy that advanced technology is adopted at once—a technology's victory is never automatic; it must outlast doubt, lawsuit, and the market. The graph has "zero and place-value" (the conceptual core) carry these numerals through an enables edge, and joins them to "double-entry bookkeeping" (their use in reckoning) through a further, disputed enables edge.*

**图注**（史料图）— 数字字形演变图：从印度婆罗米数字，经东阿拉伯（印度式）与西阿拉伯（安达卢斯「戈巴」）数字，到欧洲印本定型。同一套数，一路换脸。／ *The evolution of the digit-forms: from Indian Brahmi, through Eastern-Arabic and Western-Arabic (Andalusi "ghubar") figures, to their fixing in European print. One set of numbers, changing faces all the way.*

**参考文献** — Georges Ifrah, The Universal History of Numbers (2000)｜Sigler (trans.), Fibonacci's Liber Abaci (2002)｜Hindu–Arabic numeral system (Wikipedia)。

**〔边建议 → content/edges〕**
- `{source: zero-place-value, target: hindu-arabic-numerals, type: enables, importance: major, note:{zh: 位值与零是这套数码运作的原理内核, en: Place-value and zero are the working principle behind these numerals}}` —— **batch-2 新增**（idea→idea ✓；见 #16）
- `{source: al-khwarizmi, target: hindu-arabic-numerals, type: contributed, importance: major, note:{zh: 《印度数字算法》把这套系统传入伊斯兰世界（拉丁化即 algorism/algorithm）, en: His On the Hindu Art of Reckoning transmitted the system to the Islamic world (Latinized as algorism/algorithm)}}` —— **batch-2 新增**（person→idea ✓；见 #25）
- `{source: hindu-arabic-numerals, target: double-entry-bookkeeping, type: enables, importance: minor, disputed: true, note:{zh: 便算的数码为商业算术与复式记账提供便利（使能之一，非唯一）, en: Convenient digits eased commercial arithmetic and double-entry (an enabling factor, not the sole cause)}}` —— **batch-2 新增**（idea→idea ✓；见 #23）

**〔附注〕** icon：`delapouite/abacus`（算/数）；备选 `delapouite/rolling-dices` 之外更宜数码类。冷幽默：定位句「写错了自己的名字」的克制反差（引文首选＋定位句）。插图 A＝数字字形演变表（Commons PD）；B＝AI 款 A「印度—阿拉伯数码手稿」。

---
