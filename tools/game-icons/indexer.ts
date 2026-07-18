import { execFile } from "node:child_process";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { basename, dirname, relative, resolve, sep } from "node:path";
import { promisify } from "node:util";

import fg from "fast-glob";

import type { GameIconIndex, GameIconRecord } from "./types.js";

const execFileAsync = promisify(execFile);

export const GAME_ICONS_REPOSITORY = "https://github.com/game-icons/icons.git";

const AUTHOR_NAMES: Readonly<Record<string, string>> = {
  andymeneely: "Andy Meneely",
  aussiesim: "Aussiesim",
  "carl-olsen": "Carl Olsen",
  "caro-asercion": "Caro Asercion",
  cathelineau: "Cathelineau",
  catsu: "Catsu",
  darkzaitzev: "DarkZaitzev",
  "delapouite": "Delapouite",
  "faithtoken": "Faithtoken",
  felbrigg: "Felbrigg",
  "generalace135": "General Ace135",
  guard13007: "Guard13007",
  "heavenly-dog": "HeavenlyDog",
  irongamer: "IronGamer",
  "john-colburn": "John Colburn",
  "john-redman": "John Redman",
  "kier-heyl": "Kier Heyl",
  lorc: "Lorc",
  "lord-berandas": "Lord Berandas",
  lucasms: "Lucas MS",
  "pepijn-poolman": "Pepijn Poolman",
  "pierre-leducq": "Pierre Leducq",
  "priorblue": "PriorBlue",
  quoting: "Quoting",
  rihlsul: "Rihlsul",
  sbed: "Sbed",
  seregacthtuf: "Seregacthtuf",
  skoll: "Skoll",
  sparker: "Sparker",
  spencerdub: "SpencerDub",
  starseeker: "Starseeker",
  "various-artists": "Various artists",
  "viscious-speed": "Viscious Speed",
  "willdabeast": "Willdabeast",
  zajkonur: "Zajkonur",
  zeromancer: "Zeromancer",
};

const ZH_KEYWORD_ALIASES: Readonly<Record<string, readonly string[]>> = {
  火: ["fire", "flame", "burn"],
  水: ["water", "river", "wave", "drop"],
  风: ["wind", "air"],
  电: ["electric", "lightning", "power"],
  光: ["light", "sun", "ray"],
  机械: ["machine", "gear", "cog", "mechanical"],
  工具: ["tool", "hammer", "anvil"],
  武器: ["weapon", "sword", "bow", "gun"],
  农业: ["farm", "wheat", "crop", "plow"],
  航海: ["ship", "sail", "anchor", "navigation"],
  飞行: ["flight", "wing", "airplane", "rocket"],
  医学: ["medicine", "medical", "health", "heart"],
  书: ["book", "scroll", "writing"],
  印刷: ["print", "printing", "press", "book"],
  建筑: ["building", "tower", "temple", "bridge"],
  时间: ["time", "clock", "hourglass"],
  星: ["star", "space", "astronomy"],
  灾难: ["disaster", "danger", "warning", "death"],
  人物: ["person", "human", "head", "face"],
  思想: ["idea", "thought", "brain", "lightbulb"],
};

function words(value: string): string[] {
  return value
    .normalize("NFKD")
    .toLowerCase()
    .split(/[^\p{L}\p{N}]+/u)
    .filter(Boolean);
}

export function expandSearchTerms(query: string): string[] {
  const terms = new Set(words(query));
  for (const [chinese, aliases] of Object.entries(ZH_KEYWORD_ALIASES)) {
    if (query.includes(chinese)) {
      terms.add(chinese);
      for (const alias of aliases) terms.add(alias);
    }
  }
  return [...terms];
}

async function sourceCommit(repositoryDirectory: string): Promise<string | undefined> {
  try {
    const { stdout } = await execFileAsync("git", ["-C", repositoryDirectory, "rev-parse", "HEAD"]);
    return stdout.trim() || undefined;
  } catch {
    return undefined;
  }
}

function authorFromPath(relativePath: string): { slug: string; name: string } {
  const segments = relativePath.split("/");
  const slug = segments.length > 1 ? (segments[0] ?? "game-icons") : "game-icons";
  return { slug, name: AUTHOR_NAMES[slug] ?? slug.replaceAll("-", " ") };
}

export async function buildGameIconIndex(options: {
  repositoryDirectory: string;
  outputFile: string;
  sourceRepository?: string;
}): Promise<GameIconIndex> {
  const repositoryDirectory = resolve(options.repositoryDirectory);
  const outputFile = resolve(options.outputFile);
  const svgFiles = await fg("**/*.svg", {
    cwd: repositoryDirectory,
    absolute: true,
    onlyFiles: true,
    ignore: [".git/**", "badges/**", "node_modules/**"],
  });
  const icons: GameIconRecord[] = svgFiles.map((file) => {
    const relativePath = relative(repositoryDirectory, file).split(sep).join("/");
    const name = basename(file, ".svg");
    const author = authorFromPath(relativePath);
    const id = `${author.slug}/${name}`;
    const keywords = [
      ...new Set([...words(name), ...words(dirname(relativePath)), ...expandSearchTerms(name)]),
    ];
    return {
      id,
      name,
      author: author.name,
      author_slug: author.slug,
      relative_path: relativePath,
      preview_path: relativePath,
      source_url: `https://game-icons.net/1x1/${author.slug}/${name}.html`,
      license: "CC BY 3.0",
      keywords,
    };
  });
  icons.sort((left, right) => left.id.localeCompare(right.id));

  const commit = await sourceCommit(repositoryDirectory);
  const index: GameIconIndex = {
    schema_version: 1,
    generated_at: new Date().toISOString(),
    source_repository: options.sourceRepository ?? GAME_ICONS_REPOSITORY,
    ...(commit ? { source_commit: commit } : {}),
    icon_count: icons.length,
    icons,
  };
  await mkdir(dirname(outputFile), { recursive: true });
  await writeFile(outputFile, `${JSON.stringify(index, null, 2)}\n`, "utf8");
  return index;
}

export async function readGameIconIndex(indexFile: string): Promise<GameIconIndex> {
  return JSON.parse(await readFile(indexFile, "utf8")) as GameIconIndex;
}
