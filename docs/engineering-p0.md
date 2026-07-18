# 工程组 P0 交付说明（Fable5）

**版本** v1.1（2026-07-18）　**分支** `fable5/p0-engineering`（基于 `codex/data-pipeline-p0`，请在 PR #1 合并后合并本分支）

## 交付清单与任务书对照

| 任务书条目 | 交付物 | 位置 |
|---|---|---|
| **T1 仓库脚手架** | 目录结构（content/nodes 五类含 disaster、content/edges、assets/icons、assets/images、pipeline、web）；Vite + React + TS 站点外壳（可构建）；CI 骨架 | `web/`、`content/`、`assets/`、`.github/workflows/web-build.yml` |
| **T2 视觉打样（核心）** | 单文件交互原型 v1.1：深空宇宙场景（星空/星云/辉光）、五类形状、11 文明色、图标徽章（11 枚，game-icons）、词条抽屉（手稿纸感、双语、引文、AI 图标注、边即论证）、聚焦模式（1–2 跳邻域 + 边类型着色）、时间轴刷选、类型/文明滤镜、**A 星图手稿 / B 科幻洁净两版整体风格切换**、设计规范速览面板 | `web/public/prototype/p0-visual.html`（构建后挂 `/prototype/p0-visual.html`） |
| **T3 布局烘焙 v0** | 53 节点"知识的复制与传播"切片；确定性烘焙脚本（seed 20260717、400 ticks、x=分段时间比例尺、y/z=领域星云 + 边引力 + 防重叠）；positions.json；CI 确定性检查 | `pipeline/slices/p0-knowledge-replication.json`、`pipeline/bake.mjs`、`pipeline/out/positions.json` |
| 配色色盲校验 | 可复现校验脚本（OKLab×100 + Machado 三型模拟） | `pipeline/palette-check.mjs` |

运行：`pnpm install` 后 `node pipeline/bake.mjs --check`（确定性）、`node pipeline/palette-check.mjs`（配色）、`pnpm --filter @civiliverse/web build`（站点构建）。

## 配色校验结果（可复现）

深空底色 #0b1026 上 10 个彩色文明槽位两两区分度（OKLab 距离 ×100）：

| 条件 | 最弱对 | 最小 ΔE | 对底色最小 ΔE |
|---|---|---|---|
| 正常视觉 | 非洲 × 古代近东 | **13.0** | 36.9 |
| protanopia | 美洲 × 东南亚—大洋洲 | 6.6 | 27.8 |
| deuteranopia | 非洲 × 古代近东 | **2.5** | 35.3 |
| tritanopia | 非洲 × 中亚—草原 | 3.3 | 38.3 |

**解读与既定对策**：正常视觉全对清晰可分；CVD 下最弱的是两枚土色系（赤陶 × 赭金）。按视觉语法，颜色从不单独承载文明信息——形状=类型、图标=身份、x=时代、标签与图例常在，弱对有冗余通道兜底。**若总编辑要求更高 CVD 分离度**：可将古代近东由 #807906 调向更亮的黄绿（如 #8a8a2e）或将非洲调深（如 #9a3f0f），重跑本脚本即可验证（预计 deuteranopia 最小 ΔE 可提至 ≥5）。旧版打样中"三型模拟最小 ΔE 5.4"的表述无法用本脚本复现，v1.1 已按上表订正——**以可复现脚本为准**。

## 与 schema 冻结的对齐清单（打样数据 → 正式 schema）

打样先于 schema 冻结，演示数据有意保持轻量，正式化时需按冻结稿转换：

1. 边字段 `from/to/strength` → 冻结稿的 `source/target/importance`（组会纪要 §四已含此项）；
2. 节点 id 带类型前缀（`tech/papermaking`）→ 冻结稿裸 kebab；
3. `domains` 值为演示用 7 领域，待按 T1 十二领域改名重挂；
4. 图标为裸 id，待改 `author/slug` 全称（数据组索引工具输出）；
5. culture 槽位 11 类与内容组 T1 §3 一致（sinic/greco-roman/…），slug 以裁定卡 A-8/9 结果为准微调；
6. `tier: major|minor` 已在打样数据中使用——支持冻结稿新增该字段的提案。

## 演示数据的编辑警示（待总编辑）

53 节点 / 60 边为工程演示样稿，**全部待总编辑审定**，其中两条灾祸样例涉敏感史实，笔墨从严、零幽默，是否保留请总编辑定：`disaster/radio-genocide`（电台与卢旺达大屠杀）、`disaster/literary-inquisition`（文字狱，causes 边已标 disputed）。词条正文仅"活字印刷"为完整版式示范，其余为字段卡。

## Cloudflare Pages 切换指引（总编辑照做即可）

当前 Pages 直接服务仓库根目录占位页。切换到构建站点：Pages 项目 civiliverse → Settings → Builds & deployments → Build command 填 `corepack enable && pnpm install --frozen-lockfile && pnpm --filter @civiliverse/web build`，Build output directory 填 `web/dist`，保存后重新部署即可；届时原型页在 `/prototype/p0-visual.html`。（也可先不切，等 P1 站点成形。）

## 已知限制（P1 计划）

图集 sprite/instancing、LOD 三档、AB 路径、搜索、URL 路由、移动端 2D 降级、Lighthouse 与 3000 节点性能基准均属 P1（任务书 T4–T7）；本打样为视觉与交互定调用，非性能样板。AI 插图两款风格的成图打样依赖图像生成步骤，prompt 模板见内容组 T2 §7——建议总编辑圈定视觉风格后由内容组批量出图。
