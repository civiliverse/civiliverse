import { createHash } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

import { stringify } from "yaml";

const root = resolve(import.meta.dirname, "..");
const credit = "Civiliverse Art Group (AI-generated with OpenAI built-in image generation)";

const assets = [
  {
    node: "content/nodes/tech/movable-type.md",
    file: "movable-type/main-a.png",
    source: "movable-type/main-a.png",
    caption: {
      zh: "活字字模、排字盘与制墨工具的示意性静物（AI 复原想象图）。",
      en: "An interpretive still life of movable type, a composing tray, and inking tools (AI reconstruction, imagined).",
    },
  },
  {
    node: "content/nodes/tech/movable-type.md",
    file: "movable-type/icon-line.png",
    source: "movable-type/icon-line.png",
    finalIcon: true,
    caption: {
      zh: "独立活字与字模规矩的线性图标（AI 生成图）。",
      en: "A line icon combining an individual type block with a composing square (AI-generated).",
    },
  },
  {
    node: "content/nodes/idea/printing-revolution.md",
    file: "printing-revolution/main-b.png",
    source: "printing-revolution/main-b.png",
    caption: {
      zh: "15 世纪美因茨印坊与螺旋压印机的示意性场景（AI 复原想象图）。",
      en: "An interpretive view of a 15th-century Mainz printshop and screw press (AI reconstruction, imagined).",
    },
  },
  {
    node: "content/nodes/wonder/library-of-alexandria.md",
    file: "library-of-alexandria/main-b.png",
    source: "library-of-alexandria/main-b.png",
    caption: {
      zh: "托勒密时期亚历山大图书馆卷轴厅的推想性重建（AI 复原想象图）。",
      en: "A conjectural reconstruction of a scroll hall in the Ptolemaic Library of Alexandria (AI reconstruction, imagined).",
    },
  },
  {
    node: "content/nodes/disaster/great-famine-ireland.md",
    file: "great-famine-ireland/main-a-restrained.png",
    source: "great-famine-ireland/main-a-restrained.png",
    caption: {
      zh: "歉收后的马铃薯田、空篮与远处石屋；以环境间接呈现灾难（AI 复原想象图）。",
      en: "A failed potato field, empty basket, and distant cottages; the disaster is shown indirectly through landscape (AI reconstruction, imagined).",
    },
  },
  {
    node: "content/nodes/tech/ddt.md",
    file: "ddt/icon-line.png",
    source: "ddt/icon-line.png",
    finalIcon: true,
    caption: {
      zh: "手压喷雾器与分子环的线性图标（AI 生成图）。",
      en: "A line icon of a hand sprayer and molecular ring (AI-generated).",
    },
  },
  {
    node: "content/nodes/disaster/ddt-ecological-crisis.md",
    file: "ddt-ecological-crisis/icon-line.png",
    source: "ddt-ecological-crisis/icon-line.png",
    finalIcon: true,
    caption: {
      zh: "空鸟巢与裂纹薄壳蛋的克制型线性图标（AI 生成图）。",
      en: "A restrained line icon of an empty nest and cracked thin-shelled egg (AI-generated).",
    },
  },
  {
    node: "content/nodes/idea/silent-spring.md",
    file: "silent-spring/icon-line.png",
    source: "silent-spring/icon-line.png",
    finalIcon: true,
    caption: {
      zh: "翻开的书与无鸟枯枝的线性图标（AI 生成图）。",
      en: "A line icon of an open book and a leafless, birdless branch (AI-generated).",
    },
  },
  {
    node: "content/nodes/idea/environmental-movement.md",
    file: "environmental-movement/icon-line.png",
    source: "environmental-movement/icon-line.png",
    finalIcon: true,
    caption: {
      zh: "地球轮廓与叶脉的线性图标（AI 生成图）。",
      en: "A line icon combining the globe and a leaf vein (AI-generated).",
    },
  },
  {
    node: "content/nodes/idea/pesticide-regulation.md",
    file: "pesticide-regulation/icon-line.png",
    source: "pesticide-regulation/icon-line.png",
    finalIcon: true,
    caption: {
      zh: "麦穗与法典卷轴置于天平两端的线性图标（AI 生成图）。",
      en: "A line icon balancing a wheat ear against a legal scroll (AI-generated).",
    },
  },
];

function sha256(buffer) {
  return createHash("sha256").update(buffer).digest("hex");
}

function imageRecord(asset) {
  const encodedPath = asset.file.split("/").map(encodeURIComponent).join("/");
  return {
    src: `/assets/nodes/${asset.file}`,
    caption: asset.caption,
    credit,
    license: "CC BY 4.0",
    source_url: `https://raw.githubusercontent.com/civiliverse/civiliverse/main/web/public/assets/nodes/${encodedPath}`,
    ai_generated: true,
  };
}

const grouped = new Map();
const hashes = [];
for (const asset of assets) {
  const publicPath = resolve(root, "web", "public", "assets", "nodes", ...asset.file.split("/"));
  const sourcePath = resolve(
    root,
    "_公共交换",
    "06-丙-数据美术组交付",
    "配图",
    ...asset.source.split("/"),
  );
  const [publicFile, sourceFile] = await Promise.all([readFile(publicPath), readFile(sourcePath)]);
  const publicHash = sha256(publicFile);
  const sourceHash = sha256(sourceFile);
  if (publicHash !== sourceHash) throw new Error(`Copied asset hash mismatch: ${asset.file}`);
  hashes.push({ file: asset.file, sha256: publicHash });
  const current = grouped.get(asset.node) ?? [];
  current.push(asset);
  grouped.set(asset.node, current);
}

for (const [node, nodeAssets] of grouped) {
  const path = resolve(root, ...node.split("/"));
  let markdown = await readFile(path, "utf8");
  const records = nodeAssets.map(imageRecord);
  const yaml = stringify({ images: records }, { lineWidth: 0 }).trimEnd();
  if (/^images: \[\]$/m.test(markdown)) {
    markdown = markdown.replace(/^images: \[\]$/m, yaml);
  } else {
    for (const record of records) {
      if (!markdown.includes(record.src)) throw new Error(`Unexpected images field in ${node}`);
    }
  }
  const finalIcon = nodeAssets.find((asset) => asset.finalIcon);
  if (finalIcon) {
    const iconId = `civiliverse/${finalIcon.file.split("/")[0]}`;
    markdown = markdown.replace(
      /^(icon: \{ source: ai, )(?!id:)([^\r\n]*status:) (?:needs-ai|final)(,[^\r\n]*\})$/m,
      `$1id: "${iconId}", $2 final$3`,
    );
  }
  await writeFile(path, markdown, "utf8");
}

process.stdout.write(`${JSON.stringify({ assets: assets.length, nodes: grouped.size, hashes }, null, 2)}\n`);
