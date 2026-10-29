#!/usr/bin/env node
// Usage: npm run new-topic -- <slug> "Title"
// Copies templates/topic to topics/<slug> and fills in the placeholders.
import { cpSync, existsSync, readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { ROOT, TOPICS_DIR, RESERVED_SLUGS, SLUG_RE, basePath } from "./lib.mjs";

const TEXT_EXT = /\.(json|md|mdx|css|astro|mjs|ts|svg|yml|yaml|html|vue|txt)$/;

export function scaffold(slug, title) {
  if (!SLUG_RE.test(slug)) throw new Error(`Slug "${slug}" must be lowercase letters, digits and hyphens.`);
  if (RESERVED_SLUGS.includes(slug)) throw new Error(`Slug "${slug}" is reserved.`);
  const dest = join(TOPICS_DIR, slug);
  if (existsSync(dest)) throw new Error(`topics/${slug} already exists.`);

  cpSync(join(ROOT, "templates", "topic"), dest, { recursive: true });

  const vars = {
    __SLUG__: slug,
    __TITLE__: title,
    __BASE__: basePath(slug),
    __TODAY__: new Date().toISOString().slice(0, 10),
  };
  const walk = (dir) => {
    for (const name of readdirSync(dir)) {
      const full = join(dir, name);
      if (statSync(full).isDirectory()) walk(full);
      else if (TEXT_EXT.test(name)) {
        let text = readFileSync(full, "utf8");
        for (const [k, v] of Object.entries(vars)) text = text.split(k).join(v);
        writeFileSync(full, text);
      }
    }
  };
  walk(dest);
  return dest;
}

if (import.meta.url === `file://${process.argv[1]}` || process.argv[1]?.endsWith("new-topic.mjs")) {
  const [slug, ...rest] = process.argv.slice(2);
  const title = rest.join(" ").trim() || slug;
  if (!slug) {
    console.error('Usage: npm run new-topic -- <slug> "Title"');
    process.exit(1);
  }
  try {
    const dest = scaffold(slug, title);
    console.log(`Created ${dest}\nNext: npm install, then npm run dev -- ${slug}`);
  } catch (e) {
    console.error(e.message);
    process.exit(1);
  }
}
