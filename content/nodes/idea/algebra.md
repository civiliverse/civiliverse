---
schema_version: 1
id: algebra
type: idea
title: { zh: 代数, en: Algebra }
summary:
  zh: 以符号与运算规则处理未知量的数学分支。其名出自花拉子米约820年所著《还原与对消计算书》中的「al-jabr」（还原，指移项）。该书把二次方程归为六种标准型，给出通用解法并以几何论证其正确，是第一部把「解方程」作为独立学科系统处理的著作。其拉丁译本于12世纪进入欧洲，algebra 与 algorithm（源自作者之名）两词由此而来。
  en: The branch of mathematics that treats unknown quantities by symbols and rules of operation. Its name comes from al-jabr ("restoration," i.e. transposing terms) in al-Khwarizmi's Compendium on Calculation by Restoration and Balancing, of about 820. The book reduces quadratics to six standard forms, gives general procedures, and proves them geometrically—the first systematic treatment of equation-solving as a subject in its own right. Latin translations carried it into Europe in the twelfth century, whence both "algebra" and "algorithm" (from the author's name).
era: { start_year: 820, end_year: 1600, circa: true }
culture: islamic
culture_secondary: [indic, greco-roman]
tier: major
domains: [math-computing, science-method]
region: { zh: 巴格达→安达卢斯→拉丁欧洲, en: Baghdad → al-Andalus → Latin Europe }
quote:
  text:
    zh: 我作此书，取算术中最简易而最有用者，以应人们在继承、遗产、分割、诉讼与贸易中日常所需。
    en: "I have composed this work on calculation by restoration and balancing, confining it to what is easiest and most useful in arithmetic, such as men constantly require in cases of inheritance, legacies, partition, lawsuits, and trade."
  source: { zh: 花拉子米《还原与对消计算书》序（约820）, en: "al-Khwarizmi, preface to the Kitāb al-jabr wa'l-muqābala (c. 820)" }
icon: { source: ai, license: "CC BY 3.0", status: needs-ai, fallback: "delapouite/abacus" }
images:
  - src: /assets/nodes/algebra/main-a.png
    caption:
      zh: 以算板、几何拼块与补方图表现早期代数方法（AI 复原想象图）。
      en: An interpretive study of early algebra through a counting board, geometric tiles, and completing the square (AI reconstruction, imagined).
    credit: Civiliverse Art Group (AI-generated with OpenAI built-in image generation)
    license: CC BY 4.0
    source_url: https://raw.githubusercontent.com/civiliverse/civiliverse/main/web/public/assets/nodes/algebra/main-a.png
    ai_generated: true
refs:
  - { title: "The Algebra of Mohammed ben Musa", author: "Frederic Rosen (trans., 1831)", url: "https://archive.org/details/algebraofmohamme00khwa" }
  - { title: "Episodes in the Mathematics of Medieval Islam", author: "J. L. Berggren" }
  - { title: "Algebra", url: "https://en.wikipedia.org/wiki/Algebra" }
confidence:
  level: high
  caveats: [ 花拉子米的代数为「修辞代数」、全书无符号、方程与解法皆以文字叙述, 丢番图与婆罗摩笈多的先行工作性质不同（前者求特解、后者已有负数与二次解法），「谁是代数之父」之问设问本身可疑, 符号代数至16—17世纪韦达、笛卡尔方成形 ]
status: draft
versions:
  - { title: { zh: 修辞代数（花拉子米，9世纪）, en: "Rhetorical algebra (al-Khwarizmi, 9th c.)" } }
  - { title: { zh: 三次方程的几何解（海亚姆，11世纪）, en: "Geometric solution of cubics (Omar Khayyam, 11th c.)" } }
  - { title: { zh: 符号代数（韦达、笛卡尔，16—17世纪）, en: "Symbolic algebra (Viète, Descartes, 16th–17th c.)" } }
---

**卷首引文** — 「取算术中最简易而最有用者，以应人们在继承、遗产、分割、诉讼与贸易中日常所需。」——花拉子米《还原与对消计算书》序（约820）
*"…confining it to what is easiest and most useful in arithmetic, such as men constantly require in cases of inheritance, legacies, partition, lawsuits, and trade." — al-Khwarizmi, c. 820*

**定位句** — 一门以「移项」为名的学问，作者写它是为了帮人分遗产。
*A discipline named after "moving terms across," written to help people divide estates.*

**历史叙述** — 花拉子米供职于巴格达智慧宫，约820年撰《还原与对消计算书》。书名中的两个动作即其方法核心：al-jabr（还原）指把方程一侧的负项移至另一侧使之为正，al-muqābala（对消）指两侧同类项相消。他将一次与二次方程归纳为六种标准形式（因当时不用负数，故不能合为一式），对每型给出可机械执行的解法步骤，再以正方形与矩形的面积图示证明其成立——代数与几何在此互为担保。全书没有一个符号，未知数称「事物」（shayʼ），平方称「财产」（māl），方程与解全以文字写出，故称「修辞代数」。此书与他关于印度数字算术的另一部著作一同经12世纪的拉丁翻译进入欧洲：前者给了欧洲 algebra 一词，后者的作者名 al-Khwarizmi 在拉丁语中讹为 algorismi，最终成了 algorithm。至于代数的思想来源，则不止一处：丢番图的《算术》处理不定方程的特解，婆罗摩笈多（628年）已系统使用负数并给出二次方程解法，花拉子米的贡献在于把这些散落的技艺整理成一门可教、可用、有证明的学科。
*Al-Khwarizmi served at the House of Wisdom in Baghdad and wrote the Compendium on Calculation by Restoration and Balancing around 820. The two operations in its title are the method: al-jabr, "restoration," moves a negative term to the other side to make it positive; al-muqābala, "balancing," cancels like terms on both sides. He reduced linear and quadratic equations to six standard forms—six rather than one because negative numbers were not admitted—gave for each a mechanically executable procedure, and then proved each by areas of squares and rectangles, algebra and geometry standing surety for one another. The book contains not a single symbol: the unknown is "the thing" (shayʼ), its square is "property" (māl), and equations and solutions alike are written out in words—hence "rhetorical algebra." It entered Europe with his other work, on calculating with the Indian numerals, through twelfth-century Latin translation: the first gave Europe the word algebra, while the author's name, Latinized as algorismi, became algorithm. As for the sources of algebraic thought, there is more than one: Diophantus' Arithmetica handles particular solutions of indeterminate equations, and Brahmagupta (628) already used negative numbers systematically and solved quadratics. Al-Khwarizmi's contribution was to organize scattered techniques into a teachable, usable, demonstrated discipline.*

**史论** — 「谁发明了代数」是个问错了的问题。丢番图有方程而无一般解法，婆罗摩笈多有解法而未成体系，花拉子米把它做成了学科——三者之间不是接力赛的三棒，而是三种不同的工作。图谱因此给 algebra 标注了印度与希腊两个次要文明维度：它的形成本身就是跨文明的，把它系于任何单一文明名下都要削足适履。还有一点常被忽视：花拉子米在序言里说得明白，他写这书是为了处理继承、分割与贸易——伊斯兰继承法的份额计算相当繁复，正是这类日常的、法律的、商业的需求把一门抽象学问逼了出来。数学史里最纯粹的成果，往往有一个非常不纯粹的出身。
*"Who invented algebra" is a badly posed question. Diophantus had equations without general procedures; Brahmagupta had procedures without a system; al-Khwarizmi made it a discipline—three different kinds of work, not three legs of a relay. The graph therefore tags algebra with Indic and Greco-Roman as secondary civilizational dimensions: its formation was itself cross-civilizational, and filing it under any single one requires cutting the foot to fit the shoe. A second point is often passed over. Al-Khwarizmi says plainly in his preface that he wrote for inheritance, partition, and trade—the fractional shares of Islamic inheritance law are intricate, and it was this everyday, legal, commercial demand that forced an abstract discipline into being. The purest results in the history of mathematics often have thoroughly impure parentage.*

**图注**（史料图）— 花拉子米《还原与对消计算书》抄本页，以几何图形证明二次方程解法。全书没有一个符号——代数最初是用散文写的。／ *A manuscript page of al-Khwarizmi's Algebra, proving a quadratic procedure by geometric figures. The book contains no symbols: algebra was first written in prose.*

**参考文献** — Rosen (trans.), *The Algebra of Mohammed ben Musa* (1831)｜J. L. Berggren, *Episodes in the Mathematics of Medieval Islam*｜Algebra (Wikipedia)。

**〔边建议 → content/edges〕**
- `{source: zero-place-value, target: algebra, type: enables, importance: major}` —— 已在《R3-T6报告》§3.2 未激活边清单（本条建成后即可激活）
- `{source: al-khwarizmi, target: algebra, type: contributed, importance: major}` —— 同上
- `{source: house-of-wisdom, target: algebra, type: enables, importance: major}` —— 同上

**〔附注〕** icon：语义＝六型方程与几何证明图；needs-ai，回退 `delapouite/abacus`（全称请丙核）。插图 A＝《代数》抄本几何证明页（Commons PD）。**culture_secondary＝[indic, greco-roman]**，依《R4-glossary-协调稿》§四口径 1（跨文明形成、正文有据），非罗列相关文明。
