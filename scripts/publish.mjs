#!/usr/bin/env node
// Copies build output into a checkout of the Pages branch WITHOUT disturbing other topics.
//   node scripts/publish.mjs --from .out --to <path-to-gh-pages-checkout>
// .out/topics/<slug>/  -> <to>/<slug>/      (replaces only that folder)
// .out/portal/         -> <to>/             (replaces root files and _portal/, keeps topic folders)
import { cpSync, existsSync, mkdirSync, readdirSync, rmSync, statSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

export function publish(from, to) {
  mkdirSync(to, { recursive: true });
  const published = [];

  const topicsFrom = join(from, "topics");
  if (existsSync(topicsFrom)) {
    for (const slug of readdirSync(topicsFrom)) {
      const src = join(topicsFrom, slug);
      if (!statSync(src).isDirectory()) continue;
      rmSync(join(to, slug), { recursive: true, force: true });
      cpSync(src, join(to, slug), { recursive: true });
      published.push(`${slug}/`);
    }
  }

  const portalFrom = join(from, "portal");
  if (existsSync(portalFrom)) {
    // Remove only the portal's own files: loose root files and the _portal assets folder.
    for (const name of readdirSync(to)) {
      if (name === ".git") continue;
      const p = join(to, name);
      if (statSync(p).isFile() || name === "_portal") rmSync(p, { recursive: true, force: true });
    }
    cpSync(portalFrom, to, { recursive: true });
    published.push("portal (root)");
  }

  writeFileSync(join(to, ".nojekyll"), "");
  return published;
}

if (process.argv[1]?.endsWith("publish.mjs")) {
  const args = process.argv.slice(2);
  const get = (k) => (args.includes(k) ? args[args.indexOf(k) + 1] : undefined);
  const from = resolve(get("--from") ?? ".out");
  const to = get("--to");
  if (!to) {
    console.error("Usage: node scripts/publish.mjs --from .out --to <gh-pages checkout>");
    process.exit(1);
  }
  console.log("Published:", publish(from, resolve(to)).join(", ") || "(nothing)");
}
