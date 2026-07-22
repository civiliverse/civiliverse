---
schema_version: 1
id: electricity
type: tech
title: { zh: 电力, en: Electricity }
summary:
  zh: 把电作为可控能量形式加以产生、输送与使用的技术体系。其技术史起点是 1800 年伏打的电堆——人类第一次拥有稳定的持续电流；1831 年法拉第的电磁感应给出了机械能与电能互换的原理，发电机与电动机由此而来。1880 年代，爱迪生的直流系统与特斯拉、西屋的交流系统就输电方式展开竞争，交流因可变压远送而胜出，电力自此不再是实验室现象而成为城市基础设施。电与此前一切动力的根本差别在于**可输送**：蒸汽机的功必须在原地使用，电则可以在百公里外发出、在此处使用——工厂的布局、家务的形态与夜晚的长度都因此重排。
  en: "The technical system by which electricity is generated, transmitted, and used as a controllable form of energy. Its history as technology begins with Volta's pile of 1800, which for the first time gave a steady continuous current; Faraday's induction of 1831 supplied the principle by which mechanical and electrical energy are exchanged, and from it came the generator and the motor. In the 1880s Edison's direct-current system contended with the alternating-current system of Tesla and Westinghouse over the mode of distribution; alternating current prevailed because it could be transformed and sent far, and electricity ceased to be a laboratory phenomenon and became urban infrastructure. What distinguishes it from every earlier form of power is that it travels: the work of a steam engine must be used where it is made, whereas electricity may be generated a hundred kilometres away and spent here. The layout of factories, the shape of housework, and the length of the evening were all rearranged accordingly."
era: { start_year: 1800, end_year: 1930 }
culture: western
tier: major
domains: [energy-power, materials-chemistry]
region: { zh: 意大利与英国→美国与欧洲→各国, en: "Italy and Britain → the United States and Europe → worldwide" }
quote:
  text:
    zh: 我们将使电便宜到只有富人才点蜡烛。
    en: "We will make electricity so cheap that only the rich will burn candles."
  source: { zh: 爱迪生，1880 年前后对记者语（广为转引，原始出处存疑）, en: "Attributed to Thomas Edison, c. 1880 (widely quoted; original source uncertain)" }
icon: { source: game-icons, id: "lorc/lightning-arc", license: "CC BY 3.0", status: tentative }
images:
  - src: /assets/nodes/electricity/main-r5.png
    caption:
      zh: 十九世纪末早期集中供电站中直流发电机与配电设备的场景重建（AI 复原想象图）。
      en: A reconstruction of dynamos and distribution equipment in a late-nineteenth-century central power station (AI reconstruction, imagined).
    credit: Civiliverse Art Group (AI-generated with OpenAI built-in image generation)
    license: CC BY 4.0
    source_url: https://raw.githubusercontent.com/civiliverse/civiliverse/main/web/public/assets/nodes/electricity/main-r5.png
    ai_generated: true
refs:
  - { title: "Networks of Power: Electrification in Western Society, 1880–1930", author: "Thomas P. Hughes" }
  - { title: "Empires of Light: Edison, Tesla, Westinghouse, and the Race to Electrify the World", author: "Jill Jonnes" }
  - { title: "Experimental Researches in Electricity", author: "Michael Faraday (1839–1855)" }
  - { title: "Electricity", url: "https://en.wikipedia.org/wiki/Electricity" }
confidence:
  level: high
  caveats: [ 「电流之战」常被叙述为爱迪生与特斯拉的个人对决，实为爱迪生通用电气与西屋公司的商业与技术路线之争，且交流最终亦吸收了直流的部分做法, 伏打电堆的发明有伽伐尼「动物电」之争为其前史，二人的分歧本身是电学概念成形的一部分，不宜略去, 卷首引文的原始出处存疑，本条如实标注，不作为史料使用, 电气化对生产率的影响存在显著时滞（工厂重新布局需数十年），Paul David 等对此的研究为「通用技术需配套组织变革」之经典案例 ]
status: draft
versions:
  - { title: { zh: 伏打电堆与持续电流（1800）, en: "The voltaic pile and continuous current (1800)" } }
  - { title: { zh: 电磁感应与发电机原理（法拉第，1831）, en: "Electromagnetic induction and the dynamo principle (Faraday, 1831)" } }
  - { title: { zh: 直流照明系统（爱迪生，1882，珍珠街电站）, en: "The direct-current lighting system (Edison, Pearl Street, 1882)" } }
  - { title: { zh: 交流输电与变压器（西屋与特斯拉，1880 年代末）, en: "Alternating-current transmission and the transformer (Westinghouse and Tesla, late 1880s)" } }
  - { title: { zh: 区域电网与负荷管理（1900–1930）, en: "Regional grids and load management (1900–1930)" } }
---

**卷首引文** — 「我们将使电便宜到只有富人才点蜡烛。」——传为爱迪生语（约 1880，原始出处存疑）
*"We will make electricity so cheap that only the rich will burn candles." — attributed to Thomas Edison, c. 1880*

**定位句** — 此前所有的动力都必须在它产生的地方使用；电是第一种可以送走的力。
*Every earlier form of power had to be used where it was made. Electricity was the first that could be sent.*

**历史叙述** — 静电现象自古已知，摩擦生电与莱顿瓶在 18 世纪已是沙龙里的把戏，但那都是转瞬即逝的放电。1800 年伏打以锌片、铜片与盐水浸布叠成电堆，第一次给出稳定的持续电流——电学自此从静电走向电流，可以做实验，也可以做事。1820 年奥斯特发现电流使磁针偏转，1831 年法拉第反过来证明变化的磁场能生电流：这条互换原理是发电机与电动机的共同基础。此后半个世纪，电主要用于电报（1840 年代起）与电镀，直到照明的需求把它推向大规模供电。1879 年前后，爱迪生与斯旺各自做出可用的白炽灯；1882 年爱迪生在纽约珍珠街建成中心电站，以直流向周边数百户供电。直流的困难在于电压不能变换，输电距离受限于线路损耗，故须每隔一二公里设一座电站。西屋公司买下变压器专利并延聘特斯拉，以交流实现高压远送、末端降压入户；1880 年代末双方展开激烈的商业与舆论战，1893 年芝加哥世博会照明与 1895 年尼亚加拉水电站相继采用交流，路线之争大体落定。此后的关键人物不再是发明家而是系统建设者：休斯所述的「电力网络」时代，其难题是负荷曲线、电价结构与跨区互联——即如何让白天与夜晚、工厂与家庭的用电互相填补。
*Static electricity had been known since antiquity, and by the eighteenth century friction machines and Leyden jars were salon entertainments—but all of it was momentary discharge. In 1800 Volta stacked zinc and copper discs with brine-soaked cloth into a pile, and for the first time there was a steady continuous current: the study passed from static electricity to current electricity, and could now be experimented with and put to work. In 1820 Ørsted found that a current deflects a magnetic needle; in 1831 Faraday showed the converse, that a changing magnetic field generates a current. That exchange is the common basis of generator and motor. For the next half-century electricity served chiefly telegraphy, from the 1840s, and electroplating, until the demand for light pushed it toward supply at scale. Around 1879 Edison and Swan each produced a serviceable incandescent lamp; in 1882 Edison's Pearl Street station in New York supplied direct current to several hundred customers nearby. Direct current could not be transformed, so line losses limited its reach and a station was needed every kilometre or two. Westinghouse bought the transformer patents and engaged Tesla, sending alternating current at high voltage and stepping it down at the customer's end. A fierce commercial and public campaign followed in the late 1880s; the lighting of the Chicago World's Fair in 1893 and the Niagara plant of 1895 both took alternating current, and the contest was substantially settled. The decisive figures thereafter were not inventors but system builders: in the era of the power networks described by Thomas Hughes, the problems were load curves, tariff structure, and interconnection—how to make day and night, factory and household, fill in one another's demand.*

**史论** — 电力最值得科技史注意的一点，是它把「技术」这个词的重心从装置移到了系统。白炽灯泡是一件容易讲的发明，但灯泡本身不值钱——爱迪生真正的工作是同时设计发电机、电缆、开关、电表、计费方式与一整套市政特许权谈判，任何一环缺失，灯泡都只是玻璃球。休斯把这类技术称为「大型技术系统」，其演化不由单个发明推动，而由系统内部各部分之间的**不平衡**推动：某一环的能力超前，就在别处形成瓶颈，瓶颈处便成为下一轮投入的方向。这个模型此后被反复用于铁路、电信与互联网，是技术史少有的具备预测力的分析工具。第二层关于时滞。电动机在 1890 年代已可替代蒸汽机，但美国制造业的生产率并未随之跃升——原因是工厂的布局仍沿袭蒸汽时代：一台大蒸汽机经天轴与皮带带动全厂，机器必须挤在轴下。要发挥电的好处，须给每台机器配独立电机、按工艺流程而非按传动重排厂房，而这意味着推倒重建。这一转变用了约三十年，生产率的跃升才出现。**一项通用技术的收益，往往不在它被采用的时候兑现，而在围绕它的组织被重写之后才兑现**——这是电气化留给此后每一次「新技术为何还没见效」之问的标准答案。
*What most deserves the historian's notice in electricity is that it moved the weight of the word technology from the device to the system. The incandescent lamp is an easy invention to narrate, and the lamp by itself was worth nothing: Edison's real work was to design at once the generator, the cable, the switch, the meter, the basis of billing, and a whole course of negotiation for municipal franchises—without any one of which the lamp is a glass bulb. Hughes called such things large technological systems, and their development is driven not by single inventions but by imbalance among their parts: where one element runs ahead, a bottleneck forms elsewhere, and the bottleneck becomes the direction of the next investment. The model has since been applied to railways, telecommunications, and the internet, and is among the few analytical tools in the history of technology with predictive purchase. A second layer concerns delay. Electric motors could replace steam engines by the 1890s, yet American manufacturing productivity did not rise accordingly, because plants were still laid out for steam: one great engine drove the whole works through line shafting and belts, and machines had to crowd beneath the shaft. To gain what electricity offered required a motor on each machine and a building rearranged by process rather than by transmission—which meant demolition and rebuilding. The change took some thirty years, and only then did productivity jump. The returns of a general-purpose technology are usually realized not when it is adopted but after the organization around it has been rewritten—which is electrification's standard answer to every subsequent question of why the new technology has not yet shown results.*

**图注**（史料图）— 珍珠街电站的直流发电机组（纽约，1882）。爱迪生的发明清单里，最难的一项其实是电表。／ *The dynamos of the Pearl Street station (New York, 1882). The hardest item on Edison's list of inventions was in fact the meter.*

**参考文献** — Hughes, *Networks of Power*｜Jonnes, *Empires of Light*｜Faraday, *Experimental Researches in Electricity*｜Electricity (Wikipedia)。

**〔边建议 → content/edges〕**
- `{source: electricity, target: telegraph, type: enables, importance: major, note:{zh: 稳定持续电流（伏打电堆及其后继）为有线电报的物质前提；电报是电的第一项大规模实用, en: A steady continuous current, from the voltaic pile onward, is the material precondition of the electric telegraph, which was electricity's first large-scale application}}` —— **R5 新增**（tech→tech ✓，甲审定书 §3.3 已预核合表）〔对端已入仓〕

**〔不采之边 · 登记〕**
- `electricity —enables→ {几乎一切现代技术}`（**丙类·枢纽噪声**）：电是二十世纪几乎全部技术的前提，若逐一连边，本节点将成为图上最大的噪声源，`enables` 随之失去判别力。依《R5-冶金族规划与词条》所立**枢纽噪声防则**，本轮只连「换一条能量路线此对端便不成立」者——电报即属此类（有线电报无电即不存在）。**其余不采。**
- `steam-engine —enables→ electricity`（**丙类·语义稀释兼时序含混**）：早期发电确以蒸汽机为原动机，但电的原理来源是法拉第感应而非蒸汽；此边会把「谁转动发电机」误画为「谁使电成为可能」。**不采**，关系写在正文。
- `electricity —causes→ {任何环境灾祸}`（**甲类·端点不存在**）：发电的环境代价（燃煤电厂与大烟雾、核电与切尔诺贝利）确为本图谱题中之义，但其中介节点（`coal-power`／`nuclear-power`）均未建。**登记为 R6 增补建议**：`coal-power`（tech，western，energy-power）与 `nuclear-power`（tech，trans，energy-power），建成后可分别连 `great-smog-london` 与 `chernobyl`——**这两条是本图谱现存的两处真实断链**（两条灾祸现在只能间接挂靠），建议甲优先排入 R6 名单。本轮不连、不造悬空。

**〔附注〕**
- icon：`lorc/lightning-arc`（tentative，请丙核；语义须为**电弧／电流**，不宜取闪电云图，以免读作自然现象）。插图 A＝珍珠街电站发电机组照片（PD）或法拉第感应线圈实物（博物馆 CC）；B＝AI 款 A「电堆与检流计」。
- 引文诚实：爱迪生「只有富人才点蜡烛」一语流传极广而**原始出处存疑**，`source` 与 caveats 均已如实标注，正文不引作史料。选它作卷首，取的正是「豪言与后来实情」的反差（电确实变得极便宜，而蜡烛确实变成了奢侈品的一种）——趣味住在材料里，符合手册 §2.2。
- **不设 `culture_secondary`**：电学的形成集中在西欧与北美（意、英、美、德），未实质性跨出 western 带；其全球扩散属口径 2 所排除的「后世影响」，以边与正文承载。
- 幽默仅在图注（电表一句）与卷首引文的选择；历史叙述与史论前半全陈述。
- 新专名：伏打／Alessandro Volta、伏打电堆／the voltaic pile、伽伐尼／Luigi Galvani、奥斯特／Hans Christian Ørsted、法拉第／Michael Faraday、电磁感应／electromagnetic induction、莱顿瓶／Leyden jar、白炽灯／incandescent lamp、斯旺／Joseph Swan、珍珠街电站／the Pearl Street station、西屋／George Westinghouse、特斯拉／Nikola Tesla、变压器／transformer、电流之战／the war of the currents、天轴／line shafting、大型技术系统／large technological system、休斯／Thomas P. Hughes——已并入《R5-glossary-协调稿》增补表。
