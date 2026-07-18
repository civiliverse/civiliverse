# Civiliverse · Schema v0 冻结规格

**状态**：**冻结**（2026-07-18，依裁定卡 C-19/20 授权由协调定稿）；**r1 修订已生效**（2026-07-18，总编辑批复 R2 裁定 4 题，见文末 §六；向后兼容，schema_version 不递增）　**实现方**：数据组（`schema/`，一处改定于 constants）　**适用**：合并后全仓库内容与工具以此为准；语义改动须经协调并递增 `schema_version`。
**〔仓库注〕本件已替换根目录旧版，现为仓库内的人读权威规格；机器约束仍以 `schema/` 的 Zod 定义为源。**

## 一、节点 node（`content/nodes/{type}/{id}.md` frontmatter）

| 字段 | 类型与约束 | 必填 | 说明 |
|---|---|---|---|
| schema_version | 字面量 `1` | ✓ | |
| id | 裸 kebab-case，全库唯一 | ✓ | 目录名即类型；路由 `/node/{type}/{id}` |
| type | tech｜idea｜person｜wonder｜disaster | ✓ | 分界按裁定 A-2（tech＝物质性，idea＝理论性；「可更换零件」类归 tech） |
| title / summary | `{zh, en}` | ✓ | |
| era | `{start_year:int, end_year?:int, circa?:bool}` | ✓ | 负数＝公元前 |
| culture | 11 枚举：`sinic / indic / islamic / western / greco-roman / ancient-near-east / americas / africa / steppe / sea-oceania / trans` | ✓ | 两可归属标 disputed 者布局置于区域边界（裁定 A-8） |
| culture_secondary | culture 枚举数组 | | 次要标签，供滤镜与叙述 |
| tier | major｜minor | ✓ | 视觉大小与 LOD 依据；枚举可扩展（裁定 C-20） |
| domains | 非空字符串数组，**首项＝主领域**（定 y/z 布局） | ✓ | 值域＝十二领域受控表（机检比对） |
| region | `{zh, en}` | | 地理表述 |
| quote | `{text:{zh,en}, source:{zh,en}}` | | 卷首引文；引文选择是幽默首选载体（裁定 B-17） |
| icon | `{source: game-icons\|ai\|custom, id?: "author/slug"全称, license, status: final\|needs-ai\|tentative, fallback?}` | ✓ | 裸 id 不合法；needs-ai 时 id 可缺、fallback 给过渡图标 |
| images | 数组，允许空；元素必含 `src / caption:{zh,en} / credit / license(受控串) / source_url / ai_generated` | ✓ | draft 期可 `[]`；一经入库全字段可追溯（红线） |
| refs | `[{title, url?, author?}]` | ✓≥1 | url 可选（古籍无 URL） |
| confidence | `{level: high\|medium\|low, caveats?: string[]}` | | 结构化置信 |
| status | draft｜ai-reviewed｜editor-approved | ✓ | 审校流转 |
| subtype | env｜famine｜accident｜**atrocity**（disaster 专用） | disaster✓ | 方案甲；**atrocity 为 r1 新增**（系统性暴行，判例：纳粹大屠杀，经阿伦特/鲍曼技术关联论证）；收录门槛：与科学技术发展本身有较强关系，政治主因不收（编辑判断、非机检）；零幽默红线对 atrocity 绝对适用 |
| versions | `[{title:{zh,en}, era?, note?:{zh,en}}]` | | 族节点重要版本更迭，供「星球层」渲染（裁定 A-1）；P0 可空 |
| aliases / wikidata_id | 沿数据组现有定义 | | 供检索与 T6 交叉核对 |

## 二、边 edge（`content/edges/*.yaml`，边即内容，CC BY 4.0）

字段：`schema_version, source, target, type, importance: major|minor, note:{zh,en}(必), refs?, disputed?`。

**端点规则表（冻结＋r1）**：

| type | 源 | 目标 | 备注 |
|---|---|---|---|
| enables | tech·idea·person·wonder | tech·idea·wonder | wonder 入源（图书馆→编目学） |
| derives | tech·idea·wonder | tech·idea·wonder | |
| applies | idea | tech·wonder | |
| informs | tech·wonder | idea | |
| inspires | 任意 | idea·person·wonder | 灾祸→矫正/抗争走此边（方案甲） |
| contributed | person | tech·idea·wonder | |
| patronized | person | person·tech·idea·wonder | 机构赞助方以人物代表或挂「时代背景」；**方向＝赞助者→被赞助者** |
| parallels | 任意（无向） | 任意 | A-B 与 B-A 同一条（校验器去重） |
| causes | tech·idea·wonder | disaster | person 不作源（裁定 C-21） |
| **regulates** | idea | tech·wonder | **r1 新增**：制度/规范对技术与奇观的约束（管制、禁令、审批、公约）；灾祸回路「矫正→技术」闭合边走此类型（判例：农药管制→DDT） |

实现时如遇既有合法用例与此表冲突，报协调（甲）裁定后修表，不得静默放宽。

## 三、时代背景 context（`content/contexts/*.yaml`，裁定 A-5/A-9）

最小集：`{schema_version, id, title:{zh,en}, culture, era:{start_year, end_year}, parent?: context-id, summary:{zh,en}, refs?}`。**culture_secondary 不属 context 字段**（r1 明确）。
语义：文明×年代的范围区域，可点击进入背景介绍；嵌套经 parent 表达（**中华 ⊃ 宋朝｜蒙元｜明治日本**——r1 勘误：原示例「西方 ⊃ 明治日本」作废，明治按裁定③挂 sinosphere，西学影响以节点层 culture_secondary 与边界布局表达）；泛化群体概念一律转 context，不立 person。校验：id 唯一、parent 存在、era 合法、culture 在枚举。

## 四、受控串

图片/图标许可：`Public Domain / CC0 / CC BY x.x / CC BY-SA x.x / CC BY 3.0`（图标）。旧写法由数据组一次性归一化映射。

## 五、三组迁移清单（r1 增补）

**数据组**：edge type 枚举＋`regulates` 端点校验；subtype 枚举＋`atrocity`；坏样例各补≥1；随下一 PR 入仓。**内容组**：回路闭合边改 regulates；context 删 culture_secondary；meiji-japan 回填 parent: sinosphere。**工程组**：regulates 边着色/图例、atrocity 子类进渲染词表（R2b 原型已落）。

## 六、修订记录

- **r1（2026-07-18，总编辑批复《R2-总编辑裁定记录》）**：①边类型新增 `regulates`（idea→tech·wonder）；②disaster subtype 新增 `atrocity`；③§三示例勘误（明治日本 ⊂ sinosphere）；④明确 context 无 culture_secondary。均向后兼容，`schema_version` 保持 `1`。
