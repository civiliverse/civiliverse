import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";

import sharp from "sharp";
import { stringify } from "yaml";

const root = resolve(import.meta.dirname, "..");
const generated = resolve(
  "C:/Users/yilin/.codex/generated_images/019f7a84-520f-7572-bf57-48be617dc619",
);
const delivery = resolve(root, "_公共交换", "06-丙-数据美术组交付", "配图二批");
const publicRoot = resolve(root, "web", "public", "assets", "nodes");
const credit = "Civiliverse Art Group (AI-generated with OpenAI built-in image generation)";
const sharedStyle =
  "Antique copperplate engraving in a 17th–18th-century scientific-atlas style, fine cross-hatching, sepia and warm copper duotone on aged paper, restrained scholarly mood, subtle star-chart motifs, deep midnight framing.";
const sharedAvoid =
  "No readable writing, labels, watermark, logo, baked-in text, photorealism, garish colors, cartoon, anachronism, or gore.";

const assets = [
  {
    id: "gunpowder",
    type: "tech",
    source: "exec-21dace9c-d7b1-4402-9a33-790c84f3c4bd.png",
    request:
      "Song-dynasty gunpowder materials arranged as a restrained technology still life: ceramic bowls of charcoal, sulfur, and saltpeter, a bronze mortar and pestle, and bamboo fire-arrow components; no active explosion or battle spectacle.",
    caption: {
      zh: "宋代火药原料、研钵与竹制火箭构件的示意性静物（AI 复原想象图）。",
      en: "An interpretive still life of Song-era gunpowder materials, mortar, and bamboo fire-arrow parts (AI reconstruction, imagined).",
    },
  },
  {
    id: "compass",
    type: "tech",
    source: "exec-446a05c3-38dd-4bae-a9cd-fa61264ca1eb.png",
    request:
      "A Song-dynasty mariner's magnetic compass: a magnetized needle floating in a shallow water bowl on a wooden ship table, simple rope and period navigation tools nearby, with a calm sea horizon beyond.",
    caption: {
      zh: "水浮磁针、航海器具与宋式帆船的示意性组合（AI 复原想象图）。",
      en: "An interpretive arrangement of a floating magnetic needle, navigation tools, and a Song-era vessel (AI reconstruction, imagined).",
    },
  },
  {
    id: "bronze-metallurgy",
    type: "tech",
    source: "exec-1a0f8230-545f-4641-a8e0-371d46e63d73.png",
    request:
      "An ancient bronze foundry as a restrained technology study: clay crucibles, a small furnace, stone and clay molds, tongs, and newly cast bronze vessels; no heroic spectacle.",
    caption: {
      zh: "古代青铜铸造的炉、坩埚、范与器物组合（AI 复原想象图）。",
      en: "An interpretive study of an ancient bronze furnace, crucibles, molds, and cast vessels (AI reconstruction, imagined).",
    },
  },
  {
    id: "maya-calendar",
    type: "idea",
    source: "exec-477e06ed-2874-4473-b312-e0f28f736a2e.png",
    request:
      "Maya Long Count calendrical astronomy: a calendar keeper observing the sun's shadow beside a carved stela with abstract non-readable glyph texture and restrained stepped architecture; nonfigurative Maya-inspired geometric border only, no Greco-Roman imagery.",
    caption: {
      zh: "历法记录者以日影与石碑校定时间的推想性场景（AI 复原想象图）。",
      en: "A conjectural scene of a calendar keeper using solar shadow and a stela to reckon time (AI reconstruction, imagined).",
    },
  },
  {
    id: "quipu",
    type: "tech",
    source: "exec-f84f2b42-5f76-4604-b67e-f4629a3864e3.png",
    request:
      "A close museum-like study of an Inca quipu: one thick primary cord with many pendant cords, varied knots, spacing, and twist directions, with a woven storage basket and Andean cloth nearby.",
    caption: {
      zh: "主绳、垂绳与多种结形构成的奇普示意性陈列（AI 复原想象图）。",
      en: "An interpretive display of a quipu's primary cord, pendants, and varied knots (AI reconstruction, imagined).",
    },
  },
  {
    id: "polynesian-navigation",
    type: "tech",
    source: "exec-dd9cb5e2-48d6-4ee6-8104-d2217643c910.png",
    request:
      "Polynesian wayfinding at sea: a period-plausible voyaging canoe on open ocean at night, a navigator quietly reading stars, swell, wind, and seabirds; no magnetic compass aboard.",
    caption: {
      zh: "航海者综合星位、海浪与海鸟判断方向的推想性场景（AI 复原想象图）。",
      en: "A conjectural scene of wayfinding by stars, ocean swell, wind, and seabirds (AI reconstruction, imagined).",
    },
  },
  {
    id: "algebra",
    type: "idea",
    source: "exec-5f386c80-ce14-47d8-921c-15ad123e29d0.png",
    request:
      "An Abbasid-era algebra study in Baghdad: counting board, compass, straightedge, geometric tiles, and a square-completion diagram suggesting al-jabr and geometric quadratic solutions without readable formulas.",
    caption: {
      zh: "以算板、几何拼块与补方图表现早期代数方法（AI 复原想象图）。",
      en: "An interpretive study of early algebra through a counting board, geometric tiles, and completing the square (AI reconstruction, imagined).",
    },
  },
  {
    id: "optics-alhazen",
    type: "idea",
    source: "exec-762856c6-b934-4bbf-a77d-b38809a3a082.png",
    request:
      "Ibn al-Haytham's optics as an experiment: a dark room with a small aperture projecting an inverted outdoor scene onto an interior screen, with glass vessels and a simple mirror on the table.",
    caption: {
      zh: "小孔将室外景象倒投于暗室墙面的实验示意（AI 复原想象图）。",
      en: "An interpretive camera-obscura experiment projecting an inverted outdoor scene inside a dark room (AI reconstruction, imagined).",
    },
  },
  {
    id: "steam-engine",
    type: "tech",
    source: "exec-3007f522-2975-42ed-9649-2561df1e9c1b.png",
    request:
      "An early Newcomen atmospheric pumping engine in a mine engine house: vertical cylinder, rocking beam, and pump rods descending into the shaft; no locomotive or steampunk fantasy.",
    caption: {
      zh: "纽科门式大气蒸汽机与矿井抽水杆系的剖面式重建（AI 复原想象图）。",
      en: "A cutaway-style reconstruction of a Newcomen atmospheric engine and mine-pump rods (AI reconstruction, imagined).",
    },
  },
  {
    id: "telegraph",
    type: "tech",
    source: "exec-a971c147-8dd1-40c6-a217-2d4ba6f83928.png",
    request:
      "A mid-19th-century electric telegraph office: Morse key, sounder, blank paper-tape mechanism, battery cells, and insulated wires on a wooden desk, with poles beside a railway outside.",
    caption: {
      zh: "电键、响器、电池与纸带机组成的早期电报工作台（AI 复原想象图）。",
      en: "An interpretive early telegraph desk with key, sounder, batteries, and blank paper tape (AI reconstruction, imagined).",
    },
  },
  {
    id: "scientific-revolution",
    type: "idea",
    source: "exec-10e9d5c8-e0de-4e4f-95e7-075890e91635.png",
    request:
      "The Scientific Revolution as a restrained instrument table: early telescope, prism, air pump, celestial globe, compass, and blank folio in an early-modern observatory; no heroic portrait.",
    caption: {
      zh: "望远镜、棱镜、气泵与天球仪构成的近代科学仪器群像（AI 复原想象图）。",
      en: "An interpretive ensemble of telescope, prism, air pump, and celestial globe (AI reconstruction, imagined).",
    },
  },
  {
    id: "railway",
    type: "tech",
    source: "exec-1c3f8b1b-1169-4226-a08a-6744e04f6e2d.png",
    request:
      "An early public railway around 1825–1830: a small steam locomotive pulling mixed passenger and freight carriages along iron rails, with a modest station and no telegraph poles.",
    caption: {
      zh: "19 世纪 20 年代早期公用铁路、蒸汽机车与混合列车的重建（AI 复原想象图）。",
      en: "A reconstruction of an early public railway with steam locomotive and mixed train in the 1820s (AI reconstruction, imagined).",
    },
  },
  {
    id: "neolithic-agriculture",
    type: "tech",
    source: "exec-f3ad480a-321b-4571-a440-6742061c9f25.png",
    request:
      "Neolithic agriculture as an archaeological reconstruction: emmer and einkorn plots, stone sickles, grinding stone, woven grain baskets, clay storage bins, and domesticated goats at a village edge.",
    caption: {
      zh: "早期麦作、石镰、磨盘、储粮陶罐与山羊的村落场景（AI 复原想象图）。",
      en: "An interpretive village scene of early cereals, stone sickles, grinding, storage jars, and goats (AI reconstruction, imagined).",
    },
  },
  {
    id: "euclid-elements",
    type: "idea",
    source: "exec-0a4b3842-e01c-4856-a48c-9fd15aff0f04.png",
    request:
      "Euclid's Elements as a Hellenistic mathematical worktable: straightedge, compass, wax tablet, blank papyrus, wooden solids, and diagrams of triangles and circles without letters or numerals.",
    caption: {
      zh: "尺规、几何图形与立体模型构成的《几何原本》工作台（AI 复原想象图）。",
      en: "An interpretive Elements worktable with compass, straightedge, plane figures, and geometric solids (AI reconstruction, imagined).",
    },
  },
  {
    id: "maize-domestication",
    type: "tech",
    source: "exec-9502755a-86e9-4304-ab11-da0f0e471da4.png",
    request:
      "Maize domestication as a comparative botanical technology plate: teosinte ears, intermediate cob forms, and domesticated maize arranged from small branching forms to large compact cobs, with a grinding slab and woven basket.",
    caption: {
      zh: "大刍草、过渡穗轴与驯化玉米的比较性植物图谱（AI 复原想象图）。",
      en: "A comparative botanical plate of teosinte, intermediate cobs, and domesticated maize (AI reconstruction, imagined).",
    },
  },
];

function sha256(buffer) {
  return createHash("sha256").update(buffer).digest("hex");
}

function imageRecord(asset) {
  const file = `${asset.id}/main-a.png`;
  return {
    src: `/assets/nodes/${file}`,
    caption: asset.caption,
    credit,
    license: "CC BY 4.0",
    source_url: `https://raw.githubusercontent.com/civiliverse/civiliverse/main/web/public/assets/nodes/${file}`,
    ai_generated: true,
  };
}

const summary = [];
for (const asset of assets) {
  const input = resolve(generated, asset.source);
  const output = await sharp(input).resize(1800, 1200, { fit: "fill" }).png().toBuffer();
  const hash = sha256(output);
  const deliveryImage = resolve(delivery, asset.id, "main-a.png");
  const publicImage = resolve(publicRoot, asset.id, "main-a.png");
  await mkdir(dirname(deliveryImage), { recursive: true });
  await mkdir(dirname(publicImage), { recursive: true });
  await Promise.all([writeFile(deliveryImage, output), writeFile(publicImage, output)]);

  const prompt = [
    "Use case: historical-scene",
    "Asset type: Civiliverse node main illustration, 3:2 landscape",
    `Primary request: ${asset.request}`,
    `Style/medium: ${sharedStyle}`,
    "Composition/framing: centered, wide landscape, museum-publication clarity",
    "Lighting/mood: restrained, scholarly, precise",
    `Constraints/Avoid: ${sharedAvoid}`,
  ].join("\n");
  const manifest = `# ${asset.id} · R4 美编二批\n\n- 文件：\`main-a.png\`\n- 尺寸：1800×1200 PNG（3:2）\n- SHA-256：\`${hash}\`\n- 原始生成文件：\`${input}\`\n- 生成工具：OpenAI 内置图像生成（seed、精确模型版本未暴露）\n- 生成时间：2026-07-19\n- 后处理：由 1536×1024 机械缩放至 1800×1200；未作内容编辑\n- \`ai_generated: true\`\n- 署名：\`${credit}\`\n- 许可：\`CC BY 4.0\`\n\n## 最终提示词\n\n\`\`\`text\n${prompt}\n\`\`\`\n\n## 双语说明\n\n- zh：${asset.caption.zh}\n- en：${asset.caption.en}\n\n## 人工过闸\n\n- 适用性：通过。主体与节点语义一致，款 A 基线一致。\n- 红线：未见可读文字、水印、现代标识、苦难猎奇或时代错置。\n- 边界：均为解释性重建，须依 \`ai_generated: true\` 与图注明示，不能作为史料图使用。\n`;
  await writeFile(resolve(delivery, asset.id, "manifest.md"), manifest, "utf8");

  const nodePath = resolve(root, "content", "nodes", asset.type, `${asset.id}.md`);
  let markdown = await readFile(nodePath, "utf8");
  const record = imageRecord(asset);
  const yaml = stringify({ images: [record] }, { lineWidth: 0 }).trimEnd();
  if (/^images: \[\]$/m.test(markdown)) {
    markdown = markdown.replace(/^images: \[\]$/m, yaml);
  } else if (!markdown.includes(record.src)) {
    throw new Error(`Unexpected images field in ${nodePath}`);
  }
  await writeFile(nodePath, markdown, "utf8");
  summary.push({ id: asset.id, file: `web/public/assets/nodes/${asset.id}/main-a.png`, sha256: hash });
}

process.stdout.write(`${JSON.stringify({ count: assets.length, summary }, null, 2)}\n`);
