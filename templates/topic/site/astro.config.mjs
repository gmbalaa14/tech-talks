import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import { readFileSync } from "node:fs";

const cfg = JSON.parse(readFileSync(new URL("../../../repo.config.json", import.meta.url), "utf8"));

export default defineConfig({
  site: cfg.siteOrigin,
  // The topic is served from /<repo>/<slug>/. Slides are built to /<repo>/<slug>/slides/.
  base: "__BASE__",
  trailingSlash: "always",
  integrations: [mdx()],
  markdown: { shikiConfig: { theme: "github-light" } },
});
