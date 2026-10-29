#!/usr/bin/env node
// Usage: npm run dev -- <slug> [slides]
//   npm run dev -- mcp          -> scroll site dev server
//   npm run dev -- mcp slides   -> Slidev presenter (use for the webinar)
import { run, listTopics } from "./lib.mjs";

const [slug, what] = process.argv.slice(2);
if (!slug || !listTopics().includes(slug)) {
  console.error(`Usage: npm run dev -- <slug> [slides]\nTopics: ${listTopics().join(", ") || "(none)"}`);
  process.exit(1);
}
run("npm", ["run", "dev", "-w", `@tech-talks/${slug}-${what === "slides" ? "slides" : "site"}`]);
