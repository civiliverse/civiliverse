import { z } from "zod";

import { CULTURES, SCHEMA_VERSION } from "./constants.js";
import {
  bilingualTextSchema,
  historicalEraSchema,
  iconSchema,
  imageSchema,
  nonBlankStringSchema,
  referenceSchema,
} from "./common.js";

const nodeIdSchema = z
  .string()
  .min(2)
  .max(100)
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "use a lowercase kebab-case node id");

const baseNodeShape = {
  schema_version: z.literal(SCHEMA_VERSION),
  id: nodeIdSchema,
  title: bilingualTextSchema,
  summary: bilingualTextSchema,
  era: historicalEraSchema,
  culture: z.enum(CULTURES),
  icon: iconSchema,
  images: z.array(imageSchema),
  aliases: z
    .object({
      zh: z.array(nonBlankStringSchema),
      en: z.array(nonBlankStringSchema),
    })
    .strict()
    .optional(),
  refs: z.array(referenceSchema).optional(),
  wikidata_id: z.string().regex(/^Q[1-9][0-9]*$/).optional(),
};

export const techNodeSchema = z.object({ ...baseNodeShape, type: z.literal("tech") }).strict();
export const ideaNodeSchema = z.object({ ...baseNodeShape, type: z.literal("idea") }).strict();
export const personNodeSchema = z.object({ ...baseNodeShape, type: z.literal("person") }).strict();
export const wonderNodeSchema = z.object({ ...baseNodeShape, type: z.literal("wonder") }).strict();
export const disasterNodeSchema = z
  .object({ ...baseNodeShape, type: z.literal("disaster") })
  .strict();

export const nodeSchema = z.discriminatedUnion("type", [
  techNodeSchema,
  ideaNodeSchema,
  personNodeSchema,
  wonderNodeSchema,
  disasterNodeSchema,
]);

export type CiviliverseNode = z.infer<typeof nodeSchema>;
