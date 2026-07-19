---
schema_version: 1
id: rachel-carson
type: person
title: { zh: 蕾切尔·卡森, en: Rachel Carson }
summary:
  zh: "美国海洋生物学家与科普作家（1907–1964）。以《我们周围的海洋》（1951）成名，1962年出版《寂静的春天》，以科学与文学之力揭示农药生态代价，成为现代环保运动的枢纽人物。她在与乳腺癌抗争中完成此书，1964年病逝。"
  en: "American marine biologist and science writer (1907–1964). Made her name with The Sea Around Us (1951) and in 1962 published Silent Spring, which used science and literary craft to expose the ecological cost of pesticides, making her a pivotal figure of the modern environmental movement. She completed the book while fighting breast cancer and died in 1964."
era: { start_year: 1907, end_year: 1964 }
culture: western
tier: major
domains: [medicine-life, science-method]
region: { zh: 美国, en: United States }
quote:
  text:
    zh: 在自然中，没有什么是孤立存在的。
    en: "In nature nothing exists alone."
  source: { zh: 蕾切尔·卡森《寂静的春天》（1962）, en: "Rachel Carson, Silent Spring (1962)" }
icon: { source: game-icons, id: "delapouite/seabird", license: "CC BY 3.0", status: tentative }
images: []
refs:
  - { title: "Rachel Carson", url: "https://en.wikipedia.org/wiki/Rachel_Carson" }
  - { title: The Sea Around Us, author: Rachel Carson }
confidence:
  level: high
  caveats: [ 生卒1907–1964、乳腺癌病逝为确证, 引文「In nature nothing exists alone」见于《寂静的春天》 ]
status: draft
versions: []
---

**卷首引文** — 「在自然中，没有什么是孤立存在的。」——蕾切尔·卡森《寂静的春天》（1962）
*"In nature nothing exists alone." — Rachel Carson, Silent Spring (1962)*

**定位句** — 用一本书改变了人与自然关系的生物学家——她自己正被癌症一点点夺走。
*The biologist who changed humanity's relationship with nature in a single book—while cancer was taking her, a little at a time.*

**历史叙述** — 蕾切尔·卡森1907年生于宾夕法尼亚，先受训为海洋生物学家，任职于美国渔业与野生动物局。她以《海风下》《我们周围的海洋》（1951）等海洋三部曲成名，文笔兼具科学的准确与散文的优美。1950年代末，她把目光转向合成农药的滥用，历数年之功写成《寂静的春天》（1962）。彼时她已身患乳腺癌，是在化疗与病痛间完成此书并出庭作证的。面对化工业的围攻，她冷静援引证据、不为人身攻击所动。1964年，卡森病逝，未及看到她所点燃的运动开花结果——环保署与 DDT 禁令都在她身后到来。
*Rachel Carson was born in Pennsylvania in 1907, trained as a marine biologist, and worked for the US Fish and Wildlife Service. She made her name with a sea trilogy—Under the Sea-Wind and The Sea Around Us (1951) among them—writing with both scientific accuracy and the grace of an essayist. In the late 1950s she turned to the abuse of synthetic pesticides, and over several years wrote Silent Spring (1962). By then she had breast cancer, and it was between chemotherapy and pain that she finished the book and gave testimony. Against the chemical industry's siege she calmly marshaled evidence, unmoved by personal attacks. Carson died in 1964, before she could see the movement she had lit bear fruit—the EPA and the DDT ban both came after her.*

**史论** — 卡森是"人物是枢纽、不是原因"这一编例的绝佳注脚：环保运动并非"因为卡森"而发生，1950年代的农药疑虑、生态学的成熟、战后中产的健康焦虑早已在积聚——但正是她，把这些分散的伏流汇成了一道公众能看见的河。同时，她的遭遇也让一段常被略过的史实显影：一位女性专家如何被"情绪化""不客观"的话术围剿，而她所以能穿透围剿，恰因其科学信誉无懈可击。因此，本节点以 contributed 边连《寂静的春天》，而非在她与整场运动之间画一支"她导致了这一切"的箭头——她是那个恰逢其时、把话说清楚的人。
*Carson is a fine footnote to the rule that "a person is a hub, not a cause": the environmental movement did not happen "because of Carson." Pesticide doubts in the 1950s, the maturing of ecology, and the postwar middle class's anxiety about health had long been gathering—but it was she who drew these scattered undercurrents into a river the public could see. Her ordeal also brings to light a fact often skipped: how a woman expert was besieged by the rhetoric of the "emotional" and the "unobjective," and how she pierced that siege precisely because her scientific credibility was unassailable. This node therefore joins Silent Spring through a contributed edge, rather than drawing an arrow of "she caused it all" between her and the whole movement—she was the person who, at the right moment, said it clearly.*

**图注**（史料图）— 蕾切尔·卡森于野外，约1962年。她受训观察海洋，最终却让世界听见了陆地上鸟鸣的缺席。／ *Rachel Carson in the field, c. 1962. Trained to observe the sea, she finally made the world hear the absence of birdsong on land.*

**参考文献** — Rachel Carson (Wikipedia)｜Carson, The Sea Around Us (1951)。

**〔边建议 → content/edges〕**
- `{source: rachel-carson, target: silent-spring, type: contributed, importance: major, note:{zh: 著述《寂静的春天》, en: Authored Silent Spring}}`
- `{source: rachel-carson, target: environmental-movement, type: inspires, importance: minor, note:{zh: 其人其书成为运动象征, en: She and her book became symbols of the movement}}`

**〔附注〕** icon：`delapouite/seabird`（海鸟，呼应其海洋学出身与"鸟鸣"主题）；person 节点形状＝恒星光点。冷幽默：本条克制；定位句的沉痛反差属"分量感"而非幽默。
