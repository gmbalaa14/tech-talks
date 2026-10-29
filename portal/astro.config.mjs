import { defineConfig } from "astro/config";
import { readFileSync } from "node:fs";

// Repo-level settings live in ../repo.config.json (owner, repo name).
const cfg = JSON.parse(readFileSync(new URL("../repo.config.json", import.meta.url), "utf8"));

export default defineConfig({
  site: cfg.siteOrigin,
  base: `/${cfg.repo}`,
  trailingSlash: "always",
  // Keep portal assets out of the way of topic folders on the published branch.
  build: { assets: "_portal" },
});
