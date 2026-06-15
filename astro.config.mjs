// @ts-check
import { defineConfig } from "astro/config";
import cloudflare from "@astrojs/cloudflare";
import { unified } from "@astrojs/markdown-remark";
import remarkDirective from "remark-directive";
import remarkExample from "./plugins/remarkExample.mjs";

// https://astro.build/config
export default defineConfig({
  adapter: cloudflare(),
  markdown: {
    processor: unified({
      remarkPlugins: [remarkDirective, remarkExample],
    }),
  },
});
