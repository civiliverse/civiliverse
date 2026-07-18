import { z } from "zod";

import { EDGE_TYPES, SCHEMA_VERSION } from "./constants.js";
import { bilingualTextSchema, referenceSchema } from "./common.js";

const nodeReferenceSchema = z
  .string()
  .min(2)
  .max(100)
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "use a lowercase kebab-case node id");

export const edgeSchema = z
  .object({
    schema_version: z.literal(SCHEMA_VERSION),
    source: nodeReferenceSchema,
    target: nodeReferenceSchema,
    type: z.enum(EDGE_TYPES),
    importance: z.enum(["major", "minor"]),
    note: bilingualTextSchema,
    refs: z.array(referenceSchema).optional(),
    disputed: z.boolean().default(false),
  })
  .strict()
  .superRefine((edge, context) => {
    if (edge.source === edge.target) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["target"],
        message: "an edge may not connect a node to itself",
      });
    }
  });

export const edgeFileSchema = z.union([
  edgeSchema,
  z.array(edgeSchema),
  z.object({ edges: z.array(edgeSchema) }).strict(),
]);

export type CiviliverseEdge = z.infer<typeof edgeSchema>;
