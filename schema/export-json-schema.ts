import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { zodToJsonSchema } from "zod-to-json-schema";

import { edgeFileSchema, edgeSchema } from "./edge.js";
import { nodeSchema } from "./node.js";

const here = dirname(fileURLToPath(import.meta.url));
const outputDirectory = resolve(here, "generated");

const schemas = [
  ["node.schema.json", nodeSchema, "CiviliverseNode"],
  ["edge.schema.json", edgeSchema, "CiviliverseEdge"],
  ["edge-file.schema.json", edgeFileSchema, "CiviliverseEdgeFile"],
] as const;

await mkdir(outputDirectory, { recursive: true });

for (const [filename, schema, name] of schemas) {
  const jsonSchema = zodToJsonSchema(schema, {
    name,
    target: "jsonSchema7",
    $refStrategy: "root",
  });
  await writeFile(resolve(outputDirectory, filename), `${JSON.stringify(jsonSchema, null, 2)}\n`, "utf8");
}

console.log(`Exported ${schemas.length} JSON Schemas to ${outputDirectory}`);
