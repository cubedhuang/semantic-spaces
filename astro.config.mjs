// @ts-check
import { defineConfig } from "astro/config";
import cloudflare from "@astrojs/cloudflare";
import { unified } from "@astrojs/markdown-remark";
import mdx from "@astrojs/mdx";

import remarkDirective from "remark-directive";
import remarkExample from "./plugins/remarkExample.mjs";
import remarkOgDescription from "./plugins/remarkOgDescription.mts";

// https://astro.build/config
export default defineConfig({
  site: "https://kon.nimi.li",
  adapter: cloudflare(),
  integrations: [mdx()],
  markdown: {
    processor: unified({
      remarkPlugins: [remarkDirective, remarkExample, remarkOgDescription],
    }),
  },
  prefetch: {
    prefetchAll: true,
  },
});
