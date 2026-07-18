import { z } from "zod";

import { CULTURES, SCHEMA_VERSION } from "./constants.js";
import {
  bilingualTextSchema,
  kebabIdSchema,
  referenceSchema,
} from "./common.js";

export const contextEraSchema = z
  .object({
    start_year: z.number().int(),
    end_year: z.number().int(),
  })
  .strict()
  .superRefine((era, context) => {
    if (era.end_year < era.start_year) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["end_year"],
        message: "end_year must be greater than or equal to start_year",
      });
    }
  });

export const contextSchema = z
  .object({
    schema_version: z.literal(SCHEMA_VERSION),
    id: kebabIdSchema,
    title: bilingualTextSchema,
    culture: z.enum(CULTURES),
    era: contextEraSchema,
    parent: kebabIdSchema.optional(),
    summary: bilingualTextSchema,
    refs: z.array(referenceSchema).optional(),
  })
  .strict()
  .superRefine((value, context) => {
    if (value.parent === value.id) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["parent"],
        message: "a context may not be its own parent",
      });
    }
  });

export type CiviliverseContext = z.infer<typeof contextSchema>;
