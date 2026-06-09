import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";

const words = defineCollection({
  loader: glob({ base: "./words", pattern: "**/*.{md,mdx}" }),
});

export const collections = { words };
