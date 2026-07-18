import { mkdtemp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { resolve } from "node:path";

import { writeGameIconAttribution } from "../tools/game-icons/attribution.js";
import { buildGameIconIndex } from "../tools/game-icons/indexer.js";
import { searchGameIcons } from "../tools/game-icons/search.js";

const svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10"><path d="M0 0h10v10H0z"/></svg>';

describe("Game Icons tooling", () => {
  it("indexes local metadata, searches Chinese aliases, and writes CC BY attribution", async () => {
    const root = await mkdtemp(resolve(tmpdir(), "civiliverse-icons-"));
    try {
      const repo = resolve(root, "icons");
      await mkdir(resolve(repo, "lorc"), { recursive: true });
      await mkdir(resolve(repo, "delapouite"), { recursive: true });
      await mkdir(resolve(repo, "badges"), { recursive: true });
      await writeFile(resolve(repo, "lorc", "flame.svg"), svg);
      await writeFile(resolve(repo, "delapouite", "gear-hammer.svg"), svg);
      await writeFile(resolve(repo, "badges", "gear-hammer.svg"), svg);
      const indexFile = resolve(root, "index.json");
      const attributionFile = resolve(root, "ATTRIBUTION.md");
      const index = await buildGameIconIndex({ repositoryDirectory: repo, outputFile: indexFile });
      expect(index.icon_count).toBe(2);

      const results = await searchGameIcons({ indexFile, query: "机械工具" });
      expect(results[0]?.id).toBe("delapouite/gear-hammer");
      expect(results[0]?.preview_path).toBe("delapouite/gear-hammer.svg");

      await writeGameIconAttribution({ indexFile, outputFile: attributionFile });
      const attribution = await readFile(attributionFile, "utf8");
      expect(attribution).toContain("CC BY 3.0");
      expect(attribution).toContain("delapouite/gear-hammer");
      expect(attribution).toContain("Delapouite");
    } finally {
      await rm(root, { recursive: true, force: true });
    }
  });
});
