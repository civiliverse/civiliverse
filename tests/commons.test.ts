import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { resolve } from "node:path";

import sharp from "sharp";

import { importCommonsSelections } from "../tools/commons/importer.js";
import { normalizeCommonsLicense } from "../tools/commons/license.js";
import { searchCommons } from "../tools/commons/search.js";
import type { CommonsCandidateManifest } from "../tools/commons/types.js";

describe("Wikimedia Commons tooling", () => {
  it("normalizes only whitelist-compatible licenses", () => {
    expect(normalizeCommonsLicense("CC BY-SA 4.0")).toBe("CC BY-SA 4.0");
    expect(normalizeCommonsLicense("Creative Commons Attribution 3.0")).toBe("CC BY 3.0");
    expect(normalizeCommonsLicense("Public domain")).toBe("Public Domain");
    expect(normalizeCommonsLicense("PD-old")).toBe("Public Domain");
    expect(normalizeCommonsLicense("CC-BY-3.0")).toBe("CC BY 3.0");
    expect(normalizeCommonsLicense("CC BY-NC 4.0")).toBeUndefined();
    expect(normalizeCommonsLicense("All rights reserved")).toBeUndefined();
  });

  it("keeps rejected results visible in a review manifest", async () => {
    const responseBody = {
      query: {
        pages: [
          {
            pageid: 1,
            title: "File:Allowed.jpg",
            imageinfo: [
              {
                url: "https://upload.wikimedia.org/allowed.jpg",
                descriptionurl: "https://commons.wikimedia.org/wiki/File:Allowed.jpg",
                mime: "image/jpeg",
                extmetadata: {
                  LicenseShortName: { value: "CC BY-SA 4.0" },
                  Artist: { value: "<b>Ada</b>" },
                  Credit: { value: "Museum" },
                },
              },
            ],
          },
          {
            pageid: 2,
            title: "File:Rejected.jpg",
            imageinfo: [
              {
                url: "https://upload.wikimedia.org/rejected.jpg",
                descriptionurl: "https://commons.wikimedia.org/wiki/File:Rejected.jpg",
                mime: "image/jpeg",
                extmetadata: {
                  LicenseShortName: { value: "CC BY-NC 4.0" },
                  Artist: { value: "Grace" },
                  Credit: { value: "Archive" },
                },
              },
            ],
          },
        ],
      },
    };
    const manifest = await searchCommons({
      query: "analytical engine",
      fetchImpl: async () => new Response(JSON.stringify(responseBody), { status: 200 }),
    });
    expect(manifest.candidates).toHaveLength(2);
    expect(manifest.candidates[0]).toMatchObject({ page_id: 1, artist: "Ada", eligible: true });
    expect(manifest.candidates[1]).toMatchObject({ page_id: 2, eligible: false, license: null });
  });

  it("requires confirmation, then creates three WebPs and traceable attribution", async () => {
    const root = await mkdtemp(resolve(tmpdir(), "civiliverse-commons-"));
    try {
      const manifestFile = resolve(root, "candidates.json");
      const outputDirectory = resolve(root, "output");
      const manifest: CommonsCandidateManifest = {
        schema_version: 1,
        generated_at: new Date(0).toISOString(),
        query: "test",
        api: "https://commons.wikimedia.org/w/api.php",
        candidates: [
          {
            page_id: 42,
            title: "File:Test image.png",
            description_url: "https://commons.wikimedia.org/wiki/File:Test_image.png",
            original_url: "https://upload.wikimedia.org/test.png",
            mime: "image/png",
            artist: "Test Artist",
            credit: "Test Archive",
            license: "CC BY 4.0",
            license_raw: "CC BY 4.0",
            eligible: true,
            rejection_reasons: [],
          },
        ],
      };
      await writeFile(manifestFile, JSON.stringify(manifest), "utf8");
      await expect(
        importCommonsSelections({
          manifestFile,
          selected: [42],
          outputDirectory,
          confirmed: false,
        }),
      ).rejects.toThrow(/Human confirmation/);

      const png = await sharp({
        create: { width: 32, height: 32, channels: 3, background: "#336699" },
      })
        .png()
        .toBuffer();
      const attributions = await importCommonsSelections({
        manifestFile,
        selected: [42],
        outputDirectory,
        confirmed: true,
        fetchImpl: async () => new Response(new Uint8Array(png), { status: 200 }),
      });
      expect(attributions[0]?.derivatives).toHaveLength(3);
      const attributionJson = await readFile(resolve(outputDirectory, "attribution.json"), "utf8");
      expect(attributionJson).toContain("Test Artist");
      expect(attributionJson).toContain('"ai_generated": false');
      const imagesYaml = await readFile(resolve(outputDirectory, "images.yaml"), "utf8");
      expect(imagesYaml).toContain("source_url: https://commons.wikimedia.org/");
    } finally {
      await rm(root, { recursive: true, force: true });
    }
  });
});
