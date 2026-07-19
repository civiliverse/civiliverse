import { z } from "zod";

import {
  CONFIDENCE_LEVELS,
  CULTURES,
  DISASTER_SUBTYPES,
  NODE_STATUSES,
  NODE_TIERS,
  SCHEMA_VERSION,
} from "./constants.js";
import { DOMAINS } from "./vocabulary.js";
import {
  bilingualTextSchema,
  historicalEraSchema,
  iconSchema,
  imageSchema,
  kebabIdSchema,
  nonBlankStringSchema,
  referenceSchema,
} from "./common.js";

const quoteSchema = z
  .object({
    text: bilingualTextSchema,
    source: bilingualTextSchema,
  })
  .strict();

const confidenceSchema = z
  .object({
    level: z.enum(CONFIDENCE_LEVELS),
    caveats: z.array(nonBlankStringSchema).optional(),
  })
  .strict();

const versionSchema = z
  .object({
    title: bilingualTextSchema,
    era: historicalEraSchema.optional(),
    note: bilingualTextSchema.optional(),
  })
  .strict();

const baseNodeShape = {
  schema_version: z.literal(SCHEMA_VERSION),
  id: kebabIdSchema,
  title: bilingualTextSchema,
  summary: bilingualTextSchema,
  era: historicalEraSchema,
  culture: z.enum(CULTURES),
  culture_secondary: z.array(z.enum(CULTURES)).optional(),
  tier: z.enum(NODE_TIERS),
  domains: z.array(z.enum(DOMAINS)).min(1, "domains must contain a primary domain"),
  region: bilingualTextSchema.optional(),
  quote: quoteSchema.optional(),
  icon: iconSchema,
  images: z.array(imageSchema),
  aliases: z
    .object({
      zh: z.array(nonBlankStringSchema),
      en: z.array(nonBlankStringSchema),
    })
    .strict()
    .optional(),
  refs: z.array(referenceSchema).min(1, "refs must contain at least one source"),
  confidence: confidenceSchema.optional(),
  status: z.enum(NODE_STATUSES),
  versions: z.array(versionSchema).optional(),
  wikidata_id: z.string().regex(/^Q[1-9][0-9]*$/).optional(),
};

export const techNodeSchema = z.object({ ...baseNodeShape, type: z.literal("tech") }).strict();
export const ideaNodeSchema = z.object({ ...baseNodeShape, type: z.literal("idea") }).strict();
export const personNodeSchema = z.object({ ...baseNodeShape, type: z.literal("person") }).strict();
export const wonderNodeSchema = z.object({ ...baseNodeShape, type: z.literal("wonder") }).strict();
export const disasterNodeSchema = z
  .object({
    ...baseNodeShape,
    type: z.literal("disaster"),
    subtype: z.enum(DISASTER_SUBTYPES),
  })
  .strict();

export const nodeSchema = z.discriminatedUnion("type", [
  techNodeSchema,
  ideaNodeSchema,
  personNodeSchema,
  wonderNodeSchema,
  disasterNodeSchema,
]);

export type CiviliverseNode = z.infer<typeof nodeSchema>;
