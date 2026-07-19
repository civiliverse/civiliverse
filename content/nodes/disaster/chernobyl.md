---
schema_version: 1
id: chernobyl
type: disaster
subtype: accident
title: { zh: 切尔诺贝利, en: Chernobyl }
summary:
  zh: 1986年4月26日，苏联乌克兰切尔诺贝利核电站4号机组在一次涡轮惰转试验中功率失控，蒸汽爆炸掀开千余吨的反应堆顶盖，石墨慢化剂燃烧十日，放射性物质随气流散布至半个欧洲。事故原因经历了官方定性的重大修订：1986年归咎操作人员违规，1992年国际专家组改以 RBMK 堆型的正空泡系数与控制棒设计缺陷为主因。
  en: "On 26 April 1986 the fourth unit of the Chernobyl nuclear plant in Soviet Ukraine ran out of control during a turbine coast-down test; a steam explosion lifted the thousand-tonne upper biological shield, the graphite moderator burned for ten days, and radioactive material spread on the winds across half of Europe. The official attribution underwent a major revision: in 1986 operator violations were blamed, while in 1992 an international expert group placed the primary cause in the RBMK design—its positive void coefficient and the flaw in its control rods."
era: { start_year: 1986, end_year: 1986 }
culture: western
tier: major
domains: [energy-power, medicine-life]
region: { zh: 苏联·乌克兰（普里皮亚季）, en: "Pripyat, Ukrainian SSR, Soviet Union" }
quote:
  text:
    zh: 我们此前所依赖的那种安全，其实建立在无人愿意去问的问题之上。
    en: "The safety we relied upon rested on questions no one was willing to ask."
  source: { zh: 综述自苏联科学院院士列加索夫事故后录音手记之主旨（1988）, en: "Summarized from the thesis of Valery Legasov's post-accident tapes (1988)" }
icon: { source: ai, license: "CC BY 3.0", status: needs-ai, fallback: "lorc/radioactive" }
images: []
refs:
  - { title: "INSAG-7: The Chernobyl Accident — Updating of INSAG-1", author: "IAEA International Nuclear Safety Advisory Group (1992)", url: "https://www.iaea.org/publications/3786/the-chernobyl-accident-updating-of-insag-1" }
  - { title: "Chernobyl: History of a Tragedy", author: "Serhii Plokhy" }
  - { title: "Chernobyl disaster", url: "https://en.wikipedia.org/wiki/Chernobyl_disaster" }
confidence:
  level: high
  caveats: [ 即时死亡2人、急性放射病死亡28人（事故后数月内）为确证；长期超额死亡估计分歧极大（2005年切尔诺贝利论坛估最高暴露人群约4000例，另有远高于此的估计），本条不取单一数字, 儿童期暴露致甲状腺癌约数千例为确证、其中死亡数较低, 事故归因经INSAG-1（1986，归咎操作）至INSAG-7（1992，改以设计缺陷为主）之修订, 卷首引文为列加索夫录音主旨之综述、非逐字原文（已注明） ]
status: draft
versions: []
---

**卷首引文** — 「我们此前所依赖的那种安全，其实建立在无人愿意去问的问题之上。」——综述自列加索夫录音手记主旨（1988）
*"The safety we relied upon rested on questions no one was willing to ask." — summarized from Valery Legasov's tapes, 1988*

**定位句** — 一次为了验证安全而做的试验，成了核电史上最严重的事故。
*A test run to verify a safety feature became the worst accident in the history of nuclear power.*

**历史叙述** — 试验的目的本身并不荒谬：若外电中断，主泵在柴油发电机启动前的数十秒内靠什么供电？工程上的设想是利用涡轮惰转发电。1986年4月25日夜，4号机组为此降功率，因调度要求推迟数小时，值班班组已换、氙中毒使功率意外跌至极低，操作人员为继续试验抽出了过多控制棒，并关停了若干保护信号。凌晨1时23分，试验开始后冷却剂流量下降、蒸汽空泡增多——RBMK 堆型在低功率下具有正空泡系数，空泡越多反应性越强，功率随之攀升。班长按下 AZ-5 紧急停堆，而该型控制棒下端为石墨制，插入之初反而排开水、局部增加反应性，形成致命的一推。数秒内功率暴涨，蒸汽爆炸掀开顶盖，石墨着火。此后是直升机投硼砂与铅、消防员与「清理人」在高辐射场作业、普里皮亚季于26小时后疏散、10月建成「石棺」。放射性云先由瑞典的监测站发现，苏联方才对外承认。2016年，新安全罩就位覆盖旧石棺。
*The purpose of the test was not in itself absurd: if outside power fails, what feeds the main pumps during the tens of seconds before the diesel generators come up? The engineering idea was to use the coasting turbine as a generator. On the night of 25 April 1986 unit four reduced power for the test; a dispatcher's request delayed it by hours, so a different shift took it over, and xenon poisoning dropped power unexpectedly low. To continue, the operators withdrew too many control rods and disabled several protection signals. At 1:23 a.m. the test began: coolant flow fell and steam voids grew—and the RBMK at low power has a positive void coefficient, so more voids mean more reactivity and rising power. The shift chief pressed AZ-5 to scram, but the rods of this design carry graphite at their lower ends, which on first insertion displaces water and locally adds reactivity: a fatal shove. Within seconds power surged, a steam explosion lifted the shield, and the graphite caught fire. What followed was helicopters dropping boron and lead, firefighters and "liquidators" working in extreme fields, the evacuation of Pripyat twenty-six hours later, and the "sarcophagus" completed in October. The radioactive plume was first detected by monitoring stations in Sweden, after which the Soviet Union acknowledged the accident. In 2016 the New Safe Confinement was moved into place over the old shelter.*

**史论** — 切尔诺贝利最持久的教益，藏在事故归因的那次修订里。1986年，国际原子能机构的第一份报告（INSAG-1）基本采纳苏联的说法，把责任压在操作人员的违规上；1992年的 INSAG-7 则推翻了这一重心，指出正空泡系数与控制棒石墨端是设计层面的固有缺陷，操作人员并不知情——他们按下的是一个被告知为「停堆」的按钮。这不是为个人开脱，而是安全工程的一条根本原则：**当一套系统只有在人不犯错时才安全，它就是不安全的。** 另一层则关乎信息：反应堆的这一缺陷在此前的内部文件中已有记录，却未向操作人员传达；事故发生后的沉默又使邻国的防护延误。技术风险从来不只是物理量，它同时是一个关于谁知道什么、谁被允许说什么的制度问题。这也是本图谱把核事故与 DDT、臭氧层并置的理由——三者的差别，不在技术的危险程度，而在制度对危险的响应速度。
*The most durable lesson of Chernobyl lies in the revision of its attribution. In 1986 the IAEA's first report (INSAG-1) largely adopted the Soviet account and laid responsibility on operator violations; INSAG-7 in 1992 shifted that weight, finding the positive void coefficient and the graphite-tipped rods to be inherent design faults of which the operators were unaware—the button they pressed had been described to them as a scram. This is not exculpation of individuals but a foundational principle of safety engineering: a system that is safe only when people do not err is not safe. A further layer concerns information. The rod defect was recorded in earlier internal documents and never conveyed to operators; the silence after the accident then delayed protective measures in neighbouring countries. Technological risk is never only a physical quantity; it is simultaneously an institutional question of who knows what and who is permitted to say it. That is why this graph sets the nuclear accident beside DDT and the ozone hole—what differs among them is not the degree of danger but the speed of institutional response.*

**图注**（史料图）— 事故后的4号机组与其后建起的石棺。围栏之内至今仍是禁区。／ *Unit four after the accident, with the shelter built over it. Inside the fence it remains a closed zone.*

**参考文献** — IAEA INSAG-7 (1992)｜Serhii Plokhy, *Chernobyl: History of a Tragedy*｜Chernobyl disaster (Wikipedia)。

**〔边建议 → content/edges〕**
- `{source: chernobyl, target: environmental-movement, type: inspires, importance: major, note:{zh: 欧洲反核与环境政治的分水岭, en: A watershed for anti-nuclear and environmental politics in Europe}}` —— **batch-3 新增**（disaster→idea ✓ inspires）

**〔附注〕** icon：语义＝辐射标识与冷却塔轮廓；needs-ai，回退 `lorc/radioactive`（全称请丙核）。插图 A＝4号机组与石棺照片（需核许可）；灾祸类图仅款 A 克制变体，**不描绘伤者面部**，以空城、遗物、围栏等间接意象承载。**全条零幽默**（红线 3）；伤亡数字按 caveats 并陈、不取单一耸动值；清理人的牺牲据实写，不渲染。
