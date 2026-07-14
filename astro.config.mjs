// @ts-check
import { defineConfig } from "astro/config";
import cloudflare from "@astrojs/cloudflare";
import { satteri } from "@astrojs/markdown-satteri";
import mdx from "@astrojs/mdx";

import satteriExample from "./plugins/satteriExample.mjs";

// https://astro.build/config
export default defineConfig({
  site: "https://kon.nimi.li",
  adapter: cloudflare(),
  integrations: [mdx()],
  markdown: {
    processor: satteri({
      mdastPlugins: [satteriExample],
      features: { directive: true },
    }),
  },
  prefetch: {
    prefetchAll: true
  }
});
