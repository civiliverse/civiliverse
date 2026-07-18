import { z } from "zod";

import { IMAGE_LICENSES } from "./constants.js";

export const nonBlankStringSchema = z.string().trim().min(1, "must not be blank");

export const bilingualTextSchema = z
  .object({
    zh: nonBlankStringSchema,
    en: nonBlankStringSchema,
  })
  .strict();

export const historicalEraSchema = z
  .object({
    start_year: z.number().int(),
    end_year: z.number().int().optional(),
    circa: z.boolean().optional(),
  })
  .strict()
  .superRefine((era, context) => {
    if (era.end_year !== undefined && era.end_year < era.start_year) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["end_year"],
        message: "end_year must be greater than or equal to start_year",
      });
    }
  });

export const referenceSchema = z
  .object({
    title: nonBlankStringSchema,
    url: z.string().url(),
    author: nonBlankStringSchema.optional(),
    accessed: z.string().date().optional(),
  })
  .strict();

export const imageLicenseSchema = z.enum(IMAGE_LICENSES);

export const iconSchema = z
  .object({
    source: nonBlankStringSchema,
    id: z.string().regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*(?:\/[a-z0-9]+(?:-[a-z0-9]+)*)?$/,
      "use a lowercase source-local icon id",
    ),
    license: imageLicenseSchema,
    creator: nonBlankStringSchema.optional(),
    source_url: z.string().url().optional(),
  })
  .strict()
  .superRefine((icon, context) => {
    if (icon.source === "game-icons" && icon.license !== "CC BY 3.0") {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["license"],
        message: "game-icons assets must use the CC BY 3.0 license",
      });
    }
    if (icon.source === "game-icons" && !icon.id.includes("/")) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["id"],
        message: "game-icons ids must include the author directory, for example `lorc/gear-hammer`",
      });
    }
  });

export const imageSchema = z
  .object({
    src: nonBlankStringSchema.refine((value) => !value.includes("\\"), {
      message: "use forward slashes in image paths",
    }),
    caption: bilingualTextSchema,
    credit: nonBlankStringSchema,
    license: imageLicenseSchema,
    source_url: z.string().url(),
    ai_generated: z.boolean(),
  })
  .strict();
