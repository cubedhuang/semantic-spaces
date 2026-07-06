import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const words = defineCollection({
  loader: glob({ base: "./words", pattern: "**/*.{md,mdx}" }),
});

export const collections = { words };
