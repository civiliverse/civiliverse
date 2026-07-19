import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { stringify } from "yaml";

const root = resolve(import.meta.dirname, "..");
const deliveryDir = resolve(root, "_公共交换", "07-内容组交付");
const mainSource = await readFile(resolve(deliveryDir, "R3-batch-2-词条.md"), "utf8");
const alternateSource = await readFile(
  resolve(deliveryDir, "R3-batch-2-词条-续9到29.md"),
  "utf8",
);

function sections(source) {
  const heading = /^## #(\d+) .*?→ `([^`]+)`\r?$/gm;
  const matches = [...source.matchAll(heading)];
  const result = new Map();

  for (let index = 0; index < matches.length; index += 1) {
    const match = matches[index];
    const start = match.index + match[0].length;
    const end = matches[index + 1]?.index ?? source.length;
    let section = source.slice(start, end).replace(/^\r?\n+/, "");
    section = section.replace(/\r?\n---\r?\n(?:\r?\n## 进度[\s\S]*)?$/, "").trimEnd();

    const yamlMatch = section.match(/^```yaml\r?\n([\s\S]*?)\r?\n```\r?\n/);
    if (!yamlMatch) throw new Error(`Missing YAML block for #${match[1]}`);

    result.set(Number(match[1]), {
      target: match[2],
      yaml: yamlMatch[1],
      body: section.slice(yamlMatch[0].length).trim(),
    });
  }

  return result;
}

const main = sections(mainSource);
const alternate = sections(alternateSource);
if (main.size !== 21) throw new Error(`Expected 21 main sections, found ${main.size}`);

for (const [number, original] of main) {
  const selected = number === 22 ? alternate.get(number) : original;
  if (!selected) throw new Error(`Missing selected source for #${number}`);

  let yaml = selected.yaml;
  // The delivery uses plain one-line scalars for summaries. A few contain `: `,
  // which YAML interprets as a nested mapping unless the scalar is quoted.
  yaml = yaml.replace(
    /^  (zh|en): (.*)$/gm,
    (_line, language, value) => `  ${language}: ${JSON.stringify(value)}`,
  );
  if (number === 9) {
    const corrected = yaml.replace(
      /era: \{ start_year: -3400, end_year: -100, circa: true \}/,
      "era: { start_year: -3400, end_year: 75, circa: true }",
    );
    if (corrected === yaml) throw new Error("The #9 era correction did not match the source");
    yaml = corrected;
  }
  if (number === 19) {
    yaml = yaml.replace(
      /^  source: \{ zh: 西非流传谚语（约16世纪，传统） \/ West African proverb \(c\. 16th c\., traditional\), en:/m,
      '  source: { zh: "西非流传谚语（约16世纪，传统） / West African proverb (c. 16th c., traditional)", en:',
    );
  }

  const target = resolve(root, selected.target.replaceAll("/", "\\"));
  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, `---\n${yaml}\n---\n\n${selected.body}\n`, "utf8");
}

const edges = [
  {
    schema_version: 1,
    source: "papermaking",
    target: "woodblock-printing",
    type: "enables",
    importance: "major",
    note: { zh: "无纸不成雕印", en: "No paper, no woodblock printing" },
  },
  {
    schema_version: 1,
    source: "nalanda",
    target: "house-of-wisdom",
    type: "parallels",
    importance: "major",
    note: {
      zh: "跨文明知识奇观群的又一呼应",
      en: "Another echo in the cross-civilizational cluster of knowledge wonders",
    },
  },
  {
    schema_version: 1,
    source: "gutenberg",
    target: "gutenberg-press",
    type: "contributed",
    importance: "major",
    note: { zh: "古登堡集成金属活字系统", en: "Gutenberg integrated the metal-type system" },
  },
  {
    schema_version: 1,
    source: "cuneiform",
    target: "phoenician-alphabet",
    type: "parallels",
    importance: "minor",
    note: {
      zh: "两河楔形与地中海字母并非直系传承——字母另承埃及圣书字，此处并列以破「书写单线进化」误解",
      en: "Mesopotamian wedges and the Mediterranean alphabet are not a direct lineage—the alphabet descends from Egyptian; paired here to dispel the myth of writing's single-line evolution",
    },
  },
  {
    schema_version: 1,
    source: "phoenician-alphabet",
    target: "hindu-arabic-numerals",
    type: "parallels",
    importance: "minor",
    note: {
      zh: "两套跨文明流布的记号系统——一记语言、一记数量，都以「少量符号的组合」征服繁复",
      en: "Two cross-civilizational notation systems—one for language, one for quantity—each conquering complexity by combining a few signs",
    },
  },
  {
    schema_version: 1,
    source: "phoenician-alphabet",
    target: "gutenberg-press",
    type: "applies",
    importance: "minor",
    note: {
      zh: "拼音文字仅数十字母，被古登堡活字系统所应用/落实（少量字模即可量产）；applies 演示正例",
      en: "An alphabetic script of only a few dozen letters, applied and realized in Gutenberg's type system (mass production from few matrices); an exemplar of the applies edge",
    },
  },
  {
    schema_version: 1,
    source: "papyrus",
    target: "papermaking",
    type: "parallels",
    importance: "minor",
    note: {
      zh: "两种书写材料的世代交替——纸终取代纸草（见塔阿利比语）",
      en: "Two writing materials in generational succession—paper finally displaced papyrus (cf. al-Thaʿālibī)",
    },
  },
  {
    schema_version: 1,
    source: "zero-place-value",
    target: "hindu-arabic-numerals",
    type: "enables",
    importance: "major",
    note: {
      zh: "位值与零是这套数码运作的原理内核",
      en: "Place-value and zero are the working principle behind these numerals",
    },
  },
  {
    schema_version: 1,
    source: "al-khwarizmi",
    target: "hindu-arabic-numerals",
    type: "contributed",
    importance: "major",
    note: {
      zh: "《印度数字算法》把这套系统传入伊斯兰世界（拉丁化即 algorism/algorithm）",
      en: "His On the Hindu Art of Reckoning transmitted the system to the Islamic world (Latinized as algorism/algorithm)",
    },
  },
  {
    schema_version: 1,
    source: "hindu-arabic-numerals",
    target: "double-entry-bookkeeping",
    type: "enables",
    importance: "minor",
    disputed: true,
    note: {
      zh: "便算的数码为商业算术与复式记账提供便利（使能之一，非唯一）",
      en: "Convenient digits eased commercial arithmetic and double-entry (an enabling factor, not the sole cause)",
    },
  },
  {
    schema_version: 1,
    source: "al-khwarizmi",
    target: "house-of-wisdom",
    type: "contributed",
    importance: "minor",
    note: {
      zh: "巴格达学术圈（智慧宫）代表学者",
      en: "A representative scholar of the Baghdad circle (House of Wisdom)",
    },
  },
  {
    schema_version: 1,
    source: "house-of-wisdom",
    target: "hindu-arabic-numerals",
    type: "enables",
    importance: "major",
    note: {
      zh: "翻译运动把印度数码与希腊科学熔铸再传",
      en: "The translation movement fused and transmitted the Indian numerals and Greek science",
    },
  },
  {
    schema_version: 1,
    source: "house-of-wisdom",
    target: "timbuktu-manuscripts",
    type: "parallels",
    importance: "minor",
    note: {
      zh: "伊斯兰学术网络的西非呼应",
      en: "A West African echo of the Islamic scholarly network",
    },
  },
  {
    schema_version: 1,
    source: "grand-canal",
    target: "woodblock-printing",
    type: "enables",
    importance: "minor",
    disputed: true,
    note: {
      zh: "运河联通的南北市场与流通网络，为宋代书业繁荣提供条件（使能之一，非唯一）",
      en: "The canal's north–south market and circulation network was one enabling condition of the Song book trade (not the sole cause)",
    },
  },
  {
    schema_version: 1,
    source: "house-of-wisdom",
    target: "heliocentrism",
    type: "informs",
    importance: "minor",
    disputed: true,
    note: {
      zh: "伊斯兰天文（马拉盖学派诸模型）为哥白尼所承（程度有争议）",
      en: "Islamic astronomy (the Maragha-school models) fed Copernicus (degree disputed)",
    },
  },
];

const edgesTarget = resolve(root, "content", "edges", "r3-batch2.yaml");
await writeFile(edgesTarget, stringify({ edges }, { lineWidth: 0 }), "utf8");

process.stdout.write(
  "Assembled 21 batch-2 nodes and 15 non-dangling edges; #22 uses the adjudicated alternate text and #9 ends at 75 CE.\n",
);
