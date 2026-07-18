# Civiliverse · Schema v0 冻结规格

**状态**：**冻结**（2026-07-18，依总编辑裁定卡 C-19/20 授权由协调定稿）
**实现方**：数据组（`schema/`，一处改定于 constants）
**适用**：合并后全仓库内容与工具以此为准；语义改动须经协调并递增 `schema_version`。

> **致数据组（codex）开工说明**：本文件可整篇作为任务输入。请按 §五"数据组"清单在仓库现有 `schema/` 实现上落实本规格（临时决策集中在 constants 的设计正好派上用场），交付为一个 PR：代码＋更新后的测试样例（20 个坏样例保持全覆盖，新增字段各配至少一个坏样例）＋`pnpm check` 全绿。仓库 main 已含你们的 PR #1 与工程组脚手架。

---

## 一、节点 node（`content/nodes/{type}/{id}.md` frontmatter）

| 字段 | 类型与约束 | 必填 | 说明 |
|---|---|---|---|
| schema_version | 字面量 `1` | ✓ | |
| id | 裸 kebab-case，全库唯一 | ✓ | 目录名即类型；路由 `/node/{type}/{id}` |
| type | tech｜idea｜person｜wonder｜disaster | ✓ | 分界按裁定 A-2（tech＝物质性，idea＝理论性；"可更换零件"类归 tech） |
| title / summary | `{zh, en}` | ✓ | |
| era | `{start_year:int, end_year?:int, circa?:bool}` | ✓ | 负数＝公元前 |
| culture | 11 枚举：`sinic / indic / islamic / western / greco-roman / ancient-near-east / americas / africa / steppe / sea-oceania / trans` | ✓ | 与内容组 T1 §3 十一大类一一对应（工程打样已用同表）；两可归属标 disputed 者，布局置于区域边界（裁定 A-8） |
| culture_secondary | culture 枚举数组 | | 次要标签（归属规则二），供滤镜与叙述 |
| tier | major｜minor | ✓ | 视觉大小与 LOD 依据；**枚举可扩展**（未来加档如 `landmark` 为向后兼容升级，裁定 C-20） |
| domains | 非空字符串数组，**首项＝主领域**（定 y/z 布局） | ✓ | 值域＝知识本体 v1 十二领域受控表（机检比对） |
| region | `{zh, en}` | | 地理表述 |
| quote | `{text:{zh,en}, source:{zh,en}}` | | 卷首引文；引文选择是幽默首选载体（裁定 B-17） |
| icon | `{source: game-icons\|ai\|custom, id?: "author/slug"全称, license, status: final\|needs-ai\|tentative, fallback?}` | ✓ | 裸 id 不合法；needs-ai 时 id 可缺、fallback 给过渡图标 |
| images | 数组，**允许空**；元素必含 `src / caption:{zh,en} / credit / license(受控串) / source_url / ai_generated` | ✓ | draft 期可 `[]`；一经入库全字段可追溯（红线不放松） |
| refs | `[{title, url?, author?}]` | ✓≥1 | **url 可选**（古籍无 URL） |
| confidence | `{level: high\|medium\|low, caveats?: string[]}` | | 结构化置信，供机检与抽检聚焦 |
| status | draft｜ai-reviewed｜editor-approved | ✓ | 审校流转（默认 draft） |
| subtype | env｜famine｜accident（disaster 专用） | disaster✓ | 方案甲；收录门槛"与科技发展本身强相关、政治主因不收"（裁定 A-14）为编辑判断，非机检项 |
| versions | `[{title:{zh,en}, era?, note?:{zh,en}}]` | | 族节点的重要版本更迭，供"星球层"渲染（裁定 A-1）；P0 可空 |
| aliases / wikidata_id | 沿数据组现有定义 | | 供检索与 T6 交叉核对 |

## 二、边 edge（**`content/edges/*.yaml`**，边即内容，CC BY 4.0）

字段：`schema_version, source, target, type, importance: major|minor, note:{zh,en}(必), refs?, disputed?`。
工程演示数据的 `from/to/strength` 一律迁移为 `source/target/importance`。

**端点规则表（冻结）**：

| type | 源 | 目标 | 备注 |
|---|---|---|---|
| enables | tech·idea·person·**wonder** | tech·idea·wonder | wonder 入源（例：亚历山大图书馆 →enables→ 文献编目学） |
| derives | tech·idea·wonder | tech·idea·wonder | |
| applies | idea | tech·wonder | |
| informs | tech·wonder | idea | |
| inspires | 任意 | idea·person·wonder | 灾祸→矫正/抗争走此边（方案甲） |
| contributed | person | tech·idea·wonder | |
| patronized | person | person·tech·idea·wonder | 机构作赞助方：以代表人物或挂「时代背景」，不新增机构类型 |
| parallels | 任意（无向） | 任意 | A-B 与 B-A 视为同一条（校验器去重） |
| causes | tech·idea·**wonder** | disaster | **person 不作源**（裁定 C-21，防灾祸"个人罪责化"） |

实现时如遇既有合法用例与此表冲突：报协调裁定后修表，不得静默放宽。

## 三、新增：时代背景 context（`content/contexts/*.yaml`，裁定 A-5/A-9）

最小集：`{schema_version, id, title:{zh,en}, culture, era:{start_year, end_year}, parent?: context-id, summary:{zh,en}, refs?}`。

语义：文明×年代的**范围区域**，前端呈现为可点击背景区（进入背景介绍页）；**嵌套**经 parent 表达（中华 ⊃ 宋朝｜蒙元；亦可挂次级如明治日本）；泛化群体概念（"某代工匠群"）一律转为 context，不立 person 节点。首批示例：宋朝、蒙元、中世纪盛期、明治日本。
校验项：id 唯一、parent 引用存在、era 合法（start ≤ end）、culture 在枚举内。

## 四、受控串（沿数据组现有实现）

图片/图标许可：`Public Domain / CC0 / CC BY x.x / CC BY-SA x.x`（图标为 `CC BY 3.0`）。旧写法（`PD-old`、`CC-BY-3.0`）由数据组提供一次性归一化映射。

## 五、三组迁移清单

**数据组**：constants 换 culture 枚举（含中文对照表）；新增 tier / domains / region / quote / confidence / status / subtype / versions / culture_secondary 字段；refs.url 改可选；icon 三态（final/needs-ai/tentative＋fallback）；context schema 与校验（含 parent 引用检查）；端点表按 §二更新；边默认目录改 `content/edges`；20 坏样例测试保持覆盖并为新增字段各配坏样例；受控译名表（风格手册 §5）纳入双语机检字典。

**内容组**：五条打样按本规格重排入仓（validator 全绿）；知识本体 v1 与批产模板引用本规格；confidence 由自由文本改结构化。

**工程组**：演示切片字段名迁移（from/to/strength → source/target/importance）；tier→大小映射保持；context 区域渲染进 P1 概念稿。
