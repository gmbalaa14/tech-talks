#!/usr/bin/env node
// Decides what to rebuild from a list of changed files.
//   node scripts/detect-changes.mjs --base <sha> --head <sha>
//   node scripts/detect-changes.mjs --files a,b,c
//   node scripts/detect-changes.mjs --all
// Prints JSON. In GitHub Actions it also writes `topics` and `portal` to $GITHUB_OUTPUT.
import { appendFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { listTopics } from "./lib.mjs";

const ZERO_SHA = /^0+$/;

/** Files that affect every topic and the portal. */
const GLOBAL = [/^shared\//, /^package(-lock)?\.json$/, /^repo\.config\.json$/, /^\.github\/workflows\/deploy\.yml$/];

export function detect(files, slugs) {
  const topics = new Set();
  let portal = false;
  let all = false;

  for (const raw of files) {
    const f = raw.replace(/\\/g, "/");
    if (GLOBAL.some((re) => re.test(f))) {
      all = true;
      continue;
    }
    if (f.startsWith("portal/")) {
      portal = true;
      continue;
    }
    const m = f.match(/^topics\/([^/]+)\/(.+)$/);
    if (!m) continue; // docs, templates, scripts: nothing to deploy
    const [, slug, rest] = m;
    if (!slugs.includes(slug)) continue;
    topics.add(slug);
    if (rest === "topic.json" || rest === "icon.svg") portal = true; // the home page card changed
  }

  if (all) return { all: true, portal: true, topics: [...slugs] };
  return { all: false, portal, topics: [...topics].sort() };
}

function gitDiff(base, head) {
  const res = spawnSync("git", ["diff", "--name-only", base, head], { encoding: "utf8" });
  if (res.status !== 0) throw new Error(res.stderr || "git diff failed");
  return res.stdout.split("\n").filter(Boolean);
}

const isMain = process.argv[1]?.endsWith("detect-changes.mjs");
if (isMain) {
  const args = process.argv.slice(2);
  const get = (k) => {
    const i = args.indexOf(k);
    return i >= 0 ? args[i + 1] : undefined;
  };
  const slugs = listTopics();
  let result;

  if (args.includes("--all") || get("--only") === "all") {
    result = { all: true, portal: true, topics: slugs };
  } else if (get("--only") !== undefined) {
    // Manual runs: "portal" or a comma list of topic slugs, e.g. "mcp,docker".
    const wanted = get("--only").split(",").map((s) => s.trim()).filter(Boolean);
    const portal = wanted.includes("portal");
    const topics = wanted.filter((w) => w !== "portal");
    const unknown = topics.filter((t) => !slugs.includes(t));
    if (unknown.length) {
      console.error(`Unknown topic(s): ${unknown.join(", ")}. Known: ${slugs.join(", ")}`);
      process.exit(1);
    }
    result = { all: false, portal, topics: topics.sort() };
  } else if (get("--files") !== undefined) {
    result = detect(get("--files").split(",").filter(Boolean), slugs);
  } else {
    const base = get("--base");
    const head = get("--head") ?? "HEAD";
    // First push of a branch has no usable base: build everything.
    result = !base || ZERO_SHA.test(base) ? { all: true, portal: true, topics: slugs } : detect(gitDiff(base, head), slugs);
  }

  console.log(JSON.stringify(result));
  if (process.env.GITHUB_OUTPUT) {
    appendFileSync(process.env.GITHUB_OUTPUT, `topics=${JSON.stringify(result.topics)}\nportal=${result.portal}\n`);
  }
}
