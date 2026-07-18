import { execFile } from "node:child_process";
import { access, mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { promisify } from "node:util";

import { GAME_ICONS_REPOSITORY } from "./indexer.js";

const execFileAsync = promisify(execFile);

export async function syncGameIcons(options: {
  repositoryDirectory: string;
  sourceRepository?: string;
}): Promise<"cloned" | "updated"> {
  const repositoryDirectory = resolve(options.repositoryDirectory);
  const sourceRepository = options.sourceRepository ?? GAME_ICONS_REPOSITORY;
  const gitDirectory = resolve(repositoryDirectory, ".git");
  const exists = await access(gitDirectory).then(
    () => true,
    () => false,
  );

  if (exists) {
    await execFileAsync("git", ["-C", repositoryDirectory, "pull", "--ff-only"]);
    return "updated";
  }

  await mkdir(dirname(repositoryDirectory), { recursive: true });
  await execFileAsync("git", ["clone", "--depth", "1", sourceRepository, repositoryDirectory]);
  return "cloned";
}
