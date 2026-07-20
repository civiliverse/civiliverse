---
schema_version: 1
id: maya-calendar
type: idea
title: { zh: 玛雅历法（长纪历）, en: The Maya Calendar (Long Count) }
summary:
  zh: 中美洲玛雅文明的历法体系，由260日的卓尔金历、365日的哈布历与线性计日的长纪历三者交织而成。长纪历以约公元前3114年为纪元起点逐日累计，可精确标定数千年内任一日期，并在铭文中与零的符号、位值制记数配合使用——这是世界上独立发展出零概念的两三处之一。它服务于王权正统、战争择日与金星周期的推算，是天文观测与政治时间的合体。
  en: "The calendrical system of the Maya, interweaving the 260-day tzolkʼin, the 365-day haabʼ, and the linear day-count of the Long Count. The Long Count tallies days from an era base around 3114 BCE, fixing any date within millennia, and in inscriptions works together with a zero sign and positional notation—one of only two or three places where the concept of zero arose independently. It served dynastic legitimacy, the choosing of days for war, and the reckoning of the Venus cycle: astronomy and political time fused in one instrument."
era: { start_year: -100, end_year: 900, circa: true }
culture: americas
tier: major
domains: [astronomy-navigation, math-computing]
region: { zh: 中美洲（今墨西哥南部·危地马拉·伯利兹）, en: "Mesoamerica (southern Mexico, Guatemala, Belize)" }
quote:
  text:
    zh: 我们找到大量这类文字书写的书籍，因其中并无一处不含迷信与魔鬼的谎言，我们把它们全部焚毁；他们为此极为痛心，深感悲苦。
    en: "We found a large number of books in these characters and, as they contained nothing in which there was not to be seen superstition and lies of the devil, we burned them all, which they regretted to an amazing degree, and which caused them much affliction."
  source: { zh: 兰达《尤卡坦纪事》（约1566）, en: "Diego de Landa, Relación de las cosas de Yucatán (c. 1566)" }
icon: { source: ai, license: "CC BY 3.0", status: needs-ai, fallback: "lorc/aztec-calendar-sun" }
images:
  - src: /assets/nodes/maya-calendar/main-a.png
    caption:
      zh: 历法记录者以日影与石碑校定时间的推想性场景（AI 复原想象图）。
      en: A conjectural scene of a calendar keeper using solar shadow and a stela to reckon time (AI reconstruction, imagined).
    credit: Civiliverse Art Group (AI-generated with OpenAI built-in image generation)
    license: CC BY 4.0
    source_url: https://raw.githubusercontent.com/civiliverse/civiliverse/main/web/public/assets/nodes/maya-calendar/main-a.png
    ai_generated: true
refs:
  - { title: "Breaking the Maya Code", author: "Michael D. Coe" }
  - { title: "The Maya", author: "Michael D. Coe & Stephen Houston" }
  - { title: "Maya calendar", url: "https://en.wikipedia.org/wiki/Maya_calendar" }
confidence:
  level: high
  caveats: [ 长纪历纪元起点换算依 GMT 相关系数（584283）、学界仍有数日之差的异说, 长纪历实为奥尔梅克—伊萨帕地区更早发明、玛雅承用并发扬, 「2012年周期终结」在古代铭文中并无末日含义、系现代附会, 玛雅零符号与旧大陆零无历史联系、属独立发明 ]
status: draft
versions:
  - { title: { zh: 卓尔金历（260日仪式历）, en: "Tzolkʼin (260-day ritual round)" } }
  - { title: { zh: 哈布历（365日太阳年）, en: "Haabʼ (365-day vague year)" } }
  - { title: { zh: 历法轮（52年周期）, en: "Calendar Round (52-year cycle)" } }
  - { title: { zh: 长纪历（线性计日）, en: "Long Count (linear day tally)" } }
---

**卷首引文** — 「我们找到大量这类文字书写的书籍……我们把它们全部焚毁；他们为此极为痛心。」——兰达《尤卡坦纪事》（约1566）
*"We found a large number of books in these characters… we burned them all, which they regretted to an amazing degree." — Diego de Landa, c. 1566*

**定位句** — 烧掉玛雅书籍的那个人，也留下了后世破译玛雅文字的第一把钥匙。
*The man who burned the Maya books also left behind the first key to reading them.*

**历史叙述** — 玛雅的时间由三套系统同时计量。卓尔金历以20个日名配1–13的数字，循环260日，用于仪式与占卜；哈布历为18个月各20日加5日「无名日」，共365日，合于农时；二者啮合，须52年方回到同一组合，是为「历法轮」。为标定更长的时段，玛雅承用并发扬了长纪历——自纪元起点逐日累计，以 baktun（144000日）、katun（7200日）、tun（360日）、winal（20日）、kʼin（日）五级记数，纪元起点经 GMT 换算约当公元前3114年8月11日。铭文中，位值与一枚贝壳状的零号使这套计数得以书写。玛雅人以此推算金星会合周期（《德累斯顿抄本》中的金星表误差极小）、日月食与王朝纪年，把国王的即位、战争与献祭嵌入宇宙的节律。16世纪，方济各会士兰达在尤卡坦焚毁大批抄本，却又在《尤卡坦纪事》中记录了日名、月名与一份「字母表」——这份错漏百出的记录，三个世纪后成了破译工作的起点。
*Maya time was measured by three systems at once. The tzolkʼin paired twenty day-names with the numbers one to thirteen, cycling every 260 days, and governed ritual and divination; the haabʼ ran eighteen months of twenty days plus five "nameless" days, 365 in all, tracking the agricultural year. Meshed together they return to the same combination only after fifty-two years—the Calendar Round. To fix longer spans the Maya inherited and elaborated the Long Count, tallying days from an era base in five registers: baktun (144,000 days), katun (7,200), tun (360), winal (20), and kʼin (one). Under the GMT correlation the base falls around 11 August 3114 BCE. In inscriptions, positional notation and a shell-shaped zero made this count writable. With it the Maya computed the synodic cycle of Venus—the Venus table of the Dresden Codex is remarkably accurate—along with eclipses and dynastic chronology, setting accessions, wars, and sacrifices into the rhythm of the cosmos. In the sixteenth century the Franciscan Diego de Landa burned a great many codices in Yucatán, yet also recorded in his Relación the day-names, month-names, and an "alphabet"—a garbled record that, three centuries later, became the starting point for decipherment.*

**史论** — 玛雅的零是一份独立的证据：位值制与零并非旧大陆的专利，人类在完全隔绝的条件下第二次想到了它。这对「数学沿单一路径进步」的想象是一记纠正——需要什么，人就造得出什么，中美洲需要记录亿万日的王朝时间，于是有了零。至于「2012年末日」，那是现代人的附会：一个 baktun 周期的翻页在玛雅铭文里从无终结之意，正如里程表跳到十万公里不意味着车要散架。最堪玩味的仍是兰达：他一面焚书，一面因职业性的记录癖留下了解码的线索。历史常把毁灭者与保存者交给同一个人——这不是命运的幽默，而是提醒我们，史料从来不是清白地流传下来的。
*The Maya zero is independent evidence: positional notation and zero are no Old World monopoly, and humanity thought of them a second time in complete isolation. That corrects the picture of mathematics advancing along a single road—people build what they need, and Mesoamerica needed to record dynastic time in the hundreds of thousands of days. As for the "2012 apocalypse," that is a modern imposition: the turning of a baktun carries no sense of ending in Maya inscription, just as an odometer rolling past a hundred thousand does not mean the car will fall apart. Landa remains the most instructive figure: he burned the books, and his professional compulsion to record left the key to reading them. History often hands destroyer and preserver to the same man—not fate's joke, but a reminder that sources never reach us innocently.*

**图注**（史料图）— 《德累斯顿抄本》金星表页。四部幸存的玛雅抄本之一——兰达焚书之后，全世界只剩下四部。／ *A Venus-table page of the Dresden Codex, one of four surviving Maya codices. After the burnings, four are all the world has.*

**参考文献** — Michael D. Coe, *Breaking the Maya Code*｜Coe & Houston, *The Maya*｜Maya calendar (Wikipedia)。

**〔边建议 → content/edges〕**
- `{source: zero-place-value, target: maya-calendar, type: parallels, importance: major, disputed: true}` —— 已在《R3-T6报告》§3.2 未激活边清单（本条建成后即可激活；无向，义＝独立发明的并列，非影响关系）

**〔附注〕** icon：语义＝贝壳零号与日名轮；needs-ai，回退 `lorc/aztec-calendar-sun`（全称请丙核，注意勿用阿兹特克太阳石代表玛雅——**图像不可混淆两个文明**，此为插图硬约束）。插图 A＝《德累斯顿抄本》页（Commons PD）。兰达引文属**沉重史料**，图注与史论按庄重口径处理，不作调侃；史论末段的冷判断限于「史料流传」层面，未涉焚书之痛本身。
