import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const words = defineCollection({
  loader: glob({ base: "./words", pattern: "**/*.{md,mdx}" }),
});

const guides = defineCollection({
  loader: glob({ base: "./guides", pattern: "**/*.{md,mdx}" }),
  schema: z.object({
    title: z.string(),
  }),
});

export const collections = { words, guides };
