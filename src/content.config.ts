import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const words = defineCollection({
  loader: glob({ base: "./words", pattern: "**/*.{md,mdx}" }),
  schema: z.object({
    examples: z
      .object({
        tok: z.string(),
        en: z.string(),
      })
      .array()
      .optional(),
  }),
});

export const collections = { words };
