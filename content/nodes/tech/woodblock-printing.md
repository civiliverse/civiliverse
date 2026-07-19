---
schema_version: 1
id: woodblock-printing
type: tech
title: { zh: 雕版印刷, en: Woodblock Printing }
summary:
  zh: "将整页文字图像反刻于木板、刷墨覆纸捶印的复制技术。唐代成熟，现存最早有明确纪年的印本为868年敦煌《金刚经》。因一版一刷、契合汉字数量庞大之特性，雕版在中国长期是印刷主流，胜过活字，广用于佛经、历书、科考用书与宋代书籍市场。"
  en: "A reproduction technique in which a whole page of text and image is carved in reverse on a woodblock, inked, and impressed onto paper. Mature by the Tang, its earliest dated survivor is the Dunhuang Diamond Sutra of 868. Because one block prints one page and suits a script of many thousands of characters, woodblock—not movable type—remained China's mainstream, used for Buddhist canons, calendars, examination texts, and the Song book market."
era: { start_year: 700, end_year: 1900, circa: true }
culture: sinic
tier: major
domains: [information-communication, materials-chemistry]
region: { zh: 中国（东亚）, en: China (East Asia) }
quote:
  text:
    zh: 咸通九年四月十五日，王玠为二亲敬造普施。
    en: "Reverently made for universal free distribution by Wang Jie on behalf of his two parents, the 15th day of the 4th month of the 9th year of Xiantong [11 May 868]."
  source: { zh: 敦煌《金刚般若波罗蜜经》卷末题记（868年）, en: "Colophon of the Dunhuang Diamond Sutra (868 CE)" }
icon: { source: ai, license: "CC BY 3.0", status: needs-ai, fallback: "lorc/wood-beam" }
images: []
refs:
  - { title: 《纸和印刷》（李约瑟《中国科学技术史》第五卷第一分册）, author: 钱存训 }
  - { title: "The Diamond Sutra (British Library, Or.8210/P.2)", url: "https://www.bl.uk/collection-items/the-diamond-sutra" }
  - { title: "Woodblock printing", url: "https://en.wikipedia.org/wiki/Woodblock_printing" }
confidence:
  level: high
  caveats: [ 868年《金刚经》为现存最早有纪年完整印本、非印刷术起点（更早有武周陀罗尼残片）, 雕版起源上限（隋末唐初）有争议 ]
status: draft
versions: []
---

**卷首引文** — 「咸通九年四月十五日，王玠为二亲敬造普施。」——敦煌《金刚经》卷末题记（868年）
*"Reverently made for universal free distribution by Wang Jie on behalf of his two parents… [11 May 868]." — Colophon of the Dunhuang Diamond Sutra*

**定位句** — 世界上最早的一本「印出版权页」的书，印的是一部佛经——为的是免费送人。
*The world's earliest book with a printed "colophon"—a Buddhist sutra, made to be given away for free.*

**历史叙述** — 雕版印刷在唐代成熟。工匠将一整页文字反刻于木板，刷墨、覆纸、以刷捶印，一板可印千百张。现存最早有明确纪年的完整印本，是1900年在敦煌藏经洞发现的868年《金刚经》——卷首扉画精严，卷末题记标明施刻者与年月，今藏大英图书馆。更早尚有武周时期的陀罗尼咒印本残片。雕版此后成为东亚印刷的主流：佛藏、儒经、历书、医方、科考程文与宋代繁荣的坊刻书籍，大多出自雕版。它与活字并非「落后与先进」，而是各擅胜场——面对数以万计的汉字，一次刻成整版的雕版，反比逐字排检的活字更省事、更耐用。
*Woodblock printing matured under the Tang. A craftsman carved a whole page in reverse on a block, inked it, laid on paper, and rubbed—one block yielding hundreds of impressions. The earliest dated complete survivor is the 868 Diamond Sutra found in the Dunhuang cave-library in 1900: a finely cut frontispiece, a colophon naming donor and date, now in the British Library. Earlier still are fragments of dharani charms from the Wu Zhou period. Woodblock became the mainstream of East Asian printing: Buddhist and Confucian canons, calendars, medical formularies, examination texts, and the thriving commercial books of the Song mostly came from blocks. It was not "backward" against movable type's "advanced," but better suited: facing tens of thousands of characters, a block carved once was cheaper and more durable than type set graph by graph.*

**史论** — 雕版印刷是反辉格史的好教材：教科书常把它当作活字的「前身」「过渡」，仿佛技术必然朝活字进化。事实恰相反——在汉字世界里，雕版长期是**更优解**，活字才是那个「叫好不叫座」的岔路（见「活字印刷」）。这提醒我们：判断一项技术「先进与否」，不能脱离它所服务的文字与社会。雕版还揭示了印刷的另一重出身：它最早的大用户不是商人或学者，而是要「广种福田」的佛教徒——技术的第一推动力，常来自意料之外的地方。
*Woodblock printing is a fine lesson in anti-Whig history: textbooks cast it as the "precursor" or "transition" to movable type, as if technology must evolve toward type. The reverse is true—in the world of Chinese characters, woodblock long remained the better solution, and movable type was the admired-but-unadopted side road (see "Movable-Type Printing"). Judging a technology "advanced" cannot be divorced from the script and society it serves. Woodblock also reveals print's other parentage: its earliest heavy users were not merchants or scholars but Buddhists sowing "fields of merit"—a technology's first push often comes from an unexpected quarter.*

**图注**（史料图）— 敦煌《金刚经》(868年) 卷首扉画，释迦于祇树给孤独园说法。世界现存最早的有纪年印本，今藏大英图书馆。／ *The frontispiece of the 868 Diamond Sutra, the Buddha preaching in the Jetavana. The earliest dated printed book extant, now in the British Library.*

**参考文献** — 钱存训《纸和印刷》｜大英图书馆《金刚经》(Or.8210/P.2)｜Woodblock printing (Wikipedia)。

**〔边建议 → content/edges〕**
- `{source: papermaking, target: woodblock-printing, type: enables, importance: major}` —— 见 #12（batch-2 新增）
- `{source: woodblock-printing, target: movable-type, type: enables, importance: major}` —— 已在 batch-1 边定稿

**〔附注〕** icon：语义＝反刻木板＋刷；needs-ai，回退 `lorc/wood-beam`。插图 A＝敦煌《金刚经》扉画（Commons PD，大英图书馆）。冷幽默：定位句「免费送人」的反差，克制。

---
