---
schema_version: 1
id: environmental-movement
type: idea
title: { zh: 现代环保运动, en: The Modern Environmental Movement }
summary:
  zh: "1960–70年代在西方兴起、随后全球化的社会运动与思想潮流，以生态系统的相互联系为核心认知，主张正视工业技术的环境代价。《寂静的春天》为其奠基意象；地球日（1970）、美国环保署（1970）为其制度里程碑。它是灾祸类 inspires 边的公共汇聚点。"
  en: "A social movement and intellectual current that arose in the West in the 1960s–70s and then globalized, centered on the interconnectedness of ecosystems and insisting that the environmental costs of industrial technology be faced. Silent Spring provided its founding image; Earth Day (1970) and the US EPA (1970) were its institutional milestones. It is the public convergence point of disaster-class inspires edges."
era: { start_year: 1962, end_year: 1972, circa: true }
culture: western
culture_secondary: [trans]
tier: major
domains: [economy-governance, science-method]
region: { zh: 美国／全球, en: United States / global }
quote:
  text:
    zh: 万物相互关联。
    en: "Everything is connected to everything else."
  source: { zh: 巴里·康芒纳「生态学第一法则」，《封闭的循环》（1971）, en: "Barry Commoner, 'the first law of ecology,' The Closing Circle (1971)" }
icon: { source: ai, license: "CC BY 3.0", status: needs-ai, fallback: "delapouite/earth-africa-europe" }
images: []
refs:
  - { title: The Closing Circle, author: Barry Commoner }
  - { title: Silent Spring, author: Rachel Carson }
confidence:
  level: high
  caveats: [ 地球日1970、EPA1970 为确证, 康芒纳「万物相互关联」为《封闭的循环》(1971)著名表述, 运动的多源性（不止源于卡森一书） ]
status: draft
versions: []
---

**卷首引文** — 「万物相互关联。」——巴里·康芒纳「生态学第一法则」，《封闭的循环》（1971）
*"Everything is connected to everything else." — Barry Commoner, "the first law of ecology," The Closing Circle (1971)*

**定位句** — 当"技术的代价"第一次拥有了自己的政治。
*When "the cost of technology" first acquired a politics of its own.*

**历史叙述** — 现代环保运动在1960年代的西方成形。《寂静的春天》（1962）提供了它最初的意象，蕾切尔·卡森之后，一批思想者（如提出"生态学四法则"的巴里·康芒纳）把"生态系统相互联系"的认知推向公众。1970年，首个地球日动员了约两千万美国人；同年，美国环保署（EPA）成立。运动随后全球化，从空气与水的立法，到对核能、化工、气候的持续争论。它不再把污染视为个别工厂的偶发过失，而视为工业技术模式的系统性外部性——这一视角，正是从 DDT 一案里学来的。
*The modern environmental movement took shape in the 1960s West. Silent Spring (1962) gave it its first image; after Rachel Carson, thinkers such as Barry Commoner (who framed "four laws of ecology") pushed the insight of ecosystem interconnection into public life. In 1970 the first Earth Day mobilized some twenty million Americans; the same year the US Environmental Protection Agency was founded. The movement then globalized, from clean-air and clean-water legislation to enduring arguments over nuclear power, chemicals, and climate. It ceased to treat pollution as the occasional lapse of an individual factory and saw it instead as the systemic externality of an industrial-technological pattern—a viewpoint learned, precisely, from the DDT case.*

**史论** — 在这张图谱里，环保运动是灾祸类 inspires 边的**公共汇聚点**：DDT 生态危机、伦敦大烟雾、后来的核事故与气候危机，都有一条 inspires 边指向它。这正是"方案甲"建模的意义——把"矫正与抗争"作为独立的思想节点，而非灾难的附庸，从而让"代价—回应"的因果回路在图谱上闭合、可见。但史论也须避免辉格式的自满：环保运动内部从来不是铁板一块（保育 vs 环境正义、增长 vs 去增长），其成效与代价（如某些管制的分配后果）也仍在争论中。它是一个重要的枢纽节点，而不是历史的道德终点。
*In this graph, the environmental movement is the public convergence point of disaster-class inspires edges: the DDT ecological crisis, the Great Smog of London, later nuclear accidents, and the climate crisis each send an inspires edge toward it. This is the point of the "Plan A" modeling—to make "correction and protest" independent idea nodes rather than appendages of catastrophe, so that the cost-and-response loop closes and becomes visible on the graph. Yet the historical gaze must avoid Whiggish complacency: the movement was never monolithic (conservation vs. environmental justice, growth vs. degrowth), and its achievements and costs—such as the distributive consequences of certain regulations—remain debated. It is an important hub, not the moral end of history.*

**图注**（史料图）— 1970年首个地球日的集会。约两千万美国人走上街头，"环境"自此成为一种政治。／ *A rally on the first Earth Day, 1970. Some twenty million Americans took to the streets, and "the environment" became a politics.*

**参考文献** — Barry Commoner, The Closing Circle (1971)｜Rachel Carson, Silent Spring (1962)。

**〔边建议 → content/edges〕**
- `{source: silent-spring, target: environmental-movement, type: inspires, importance: major, note:{zh: 奠基意象, en: Founding image}}`
- `{source: environmental-movement, target: pesticide-regulation, type: inspires, importance: major, note:{zh: 推动农药立法与管制, en: Drove pesticide legislation and regulation}}`
- `{source: great-smog-london, target: environmental-movement, type: inspires, importance: minor, note:{zh: 多灾祸汇入的运动, en: A movement fed by multiple disasters}}`

**〔附注〕** icon：语义＝地球/绿叶；needs-ai，过渡回退 `delapouite/earth-africa-europe`。引文康芒纳"万物相互关联"为运动认识论的凝练，属克制引用。
