#!/usr/bin/env node
// Usage: node scripts/build-topic.mjs <slug>
// Builds ONE topic (site + slides) into .out/topics/<slug>/ without touching any other topic.
import { cpSync, existsSync, mkdirSync, rmSync } from "node:fs";
import { join } from "node:path";
import { OUT_DIR, topicDir, listTopics, run } from "./lib.mjs";

const slug = process.argv[2];
if (!slug || !listTopics().includes(slug)) {
  console.error(`Unknown topic "${slug}". Topics: ${listTopics().join(", ")}`);
  process.exit(1);
}

const dir = topicDir(slug);
const out = join(OUT_DIR, "topics", slug);
rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });

run("npm", ["run", "build", "-w", `@tech-talks/${slug}-site`]);
cpSync(join(dir, "site", "dist"), out, { recursive: true });

if (existsSync(join(dir, "slides", "slides.md"))) {
  run("npm", ["run", "build", "-w", `@tech-talks/${slug}-slides`]);
  cpSync(join(dir, "slides", "dist"), join(out, "slides"), { recursive: true });
}

console.log(`\nBuilt ${slug} -> ${out}`);
