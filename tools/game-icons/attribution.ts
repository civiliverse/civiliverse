import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";

import { readGameIconIndex } from "./indexer.js";

export async function writeGameIconAttribution(options: {
  indexFile: string;
  outputFile: string;
}): Promise<void> {
  const index = await readGameIconIndex(options.indexFile);
  const groups = new Map<string, typeof index.icons>();
  for (const icon of index.icons) {
    const current = groups.get(icon.author) ?? [];
    current.push(icon);
    groups.set(icon.author, current);
  }

  const lines = [
    "# Game Icons attribution",
    "",
    `Generated from [game-icons/icons](${index.source_repository})${
      index.source_commit ? ` at commit \`${index.source_commit}\`` : ""
    }.`,
    "",
    "All listed icons are licensed under [CC BY 3.0](https://creativecommons.org/licenses/by/3.0/).",
    "",
  ];
  for (const [author, icons] of [...groups].sort(([left], [right]) => left.localeCompare(right))) {
    lines.push(`## ${author}`, "");
    for (const icon of icons.sort((left, right) => left.id.localeCompare(right.id))) {
      lines.push(`- [${icon.name}](${icon.source_url}) (id: \`${icon.id}\`)`);
    }
    lines.push("");
  }

  const outputFile = resolve(options.outputFile);
  await mkdir(dirname(outputFile), { recursive: true });
  await writeFile(outputFile, `${lines.join("\n").trimEnd()}\n`, "utf8");
}
