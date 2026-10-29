#!/usr/bin/env node
// Guards the token contract:
//  1. shared/tokens/base.css defines every name in contract.json (catches renames or removals).
//  2. every topic theme.css only overrides known tokens (warns on typos) and has the required files.
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { ROOT, listTopics, topicDir, readJSON } from "./lib.mjs";

const contract = readJSON(join(ROOT, "shared", "tokens", "contract.json")).required;
const base = readFileSync(join(ROOT, "shared", "tokens", "base.css"), "utf8");
const names = (css) => new Set([...css.matchAll(/(--[a-z0-9-]+)\s*:/gi)].map((m) => m[1]));

let errors = 0;
const fail = (msg) => {
  console.error(`✗ ${msg}`);
  errors++;
};

const baseNames = names(base);
for (const t of contract) if (!baseNames.has(t)) fail(`base.css is missing contract token ${t}`);

const REQUIRED_FILES = ["topic.json", "theme.css", "facts.json", "icon.svg"];
for (const slug of listTopics()) {
  const dir = topicDir(slug);
  for (const f of REQUIRED_FILES) if (!existsSync(join(dir, f))) fail(`topics/${slug}/${f} is missing`);
  const themePath = join(dir, "theme.css");
  if (existsSync(themePath)) {
    for (const n of names(readFileSync(themePath, "utf8"))) {
      const looksLikeToken = /^--(color|role|font|space|radius|measure|motion)-?/.test(n);
      if (looksLikeToken && !contract.includes(n)) console.warn(`! topics/${slug}/theme.css: "${n}" is not in the contract (typo, or a topic-only token?)`);
    }
  }
  const meta = existsSync(join(dir, "topic.json")) ? readJSON(join(dir, "topic.json")) : {};
  for (const k of ["slug", "title", "summary"]) if (!meta[k]) fail(`topics/${slug}/topic.json needs "${k}"`);
  if (meta.slug && meta.slug !== slug) fail(`topics/${slug}/topic.json slug "${meta.slug}" does not match the folder name`);
}

if (errors) process.exit(1);
console.log(`✓ token contract intact (${contract.length} tokens, ${listTopics().length} topic(s))`);
