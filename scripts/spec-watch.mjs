#!/usr/bin/env node
// Watches the things a topic was written against and reports drift.
//
//   node scripts/spec-watch.mjs                 report only (dry run)
//   node scripts/spec-watch.mjs --create-issues open GitHub issues (needs `gh` and GITHUB_TOKEN)
//   node scripts/spec-watch.mjs --fixture f.json use a canned "latest release" instead of the network
//
// A topic opts in through "watch" in topics/<slug>/topic.json:
//   "watch": { "repo": "owner/name", "factKey": "specRevision", "tagPattern": "^\\d{4}-\\d{2}-\\d{2}$",
//              "reviewIntervalDays": 90 }
// and records what it was written against in topics/<slug>/facts.json:
//   { "specRevision": "2026-07-28", "lastReviewed": "2026-10-27", "sources": [ ... ] }
import { existsSync, readFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { join } from "node:path";
import { listTopics, topicDir, readJSON } from "./lib.mjs";

const DAY = 86_400_000;

/** Pure: compare a topic's facts to the latest upstream tag and the calendar. */
export function evaluate({ slug, watch, facts, latestTag, today = new Date() }) {
  const findings = [];
  const pattern = new RegExp(watch.tagPattern ?? "^\\d{4}-\\d{2}-\\d{2}$");

  if (latestTag && pattern.test(latestTag)) {
    const current = facts[watch.factKey ?? "specRevision"];
    if (!current || latestTag > current) {
      findings.push({
        kind: "new-release",
        title: `${slug}: upstream released ${latestTag} (topic covers ${current ?? "unknown"})`,
        body: `The watched repo \`${watch.repo}\` has a newer release than this topic covers.\n\n- Covered: \`${current ?? "unknown"}\`\n- Latest: \`${latestTag}\`\n\nReview the changelog, update \`topics/${slug}/facts.json\` and the affected slides/pages, then bump \`lastReviewed\`.`,
      });
    }
  }

  const interval = watch.reviewIntervalDays ?? 90;
  const reviewed = Date.parse(facts.lastReviewed ?? "");
  if (Number.isNaN(reviewed) || (today - reviewed) / DAY > interval) {
    findings.push({
      kind: "stale-review",
      title: `${slug}: scheduled review is due (last reviewed ${facts.lastReviewed ?? "never"})`,
      body: `This topic has not been reviewed in more than ${interval} days. Skim the sources in \`facts.json\`, fix anything outdated, and bump \`lastReviewed\`.`,
    });
  }
  return findings;
}

async function fetchLatestTag(repo) {
  const headers = { "User-Agent": "tech-talks-spec-watch", Accept: "application/vnd.github+json" };
  if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  const rel = await fetch(`https://api.github.com/repos/${repo}/releases/latest`, { headers });
  if (rel.ok) return (await rel.json()).tag_name;
  const tags = await fetch(`https://api.github.com/repos/${repo}/tags?per_page=30`, { headers });
  if (!tags.ok) throw new Error(`GitHub API ${rel.status}/${tags.status} for ${repo}`);
  const names = (await tags.json()).map((t) => t.name).filter((n) => /^\d{4}-\d{2}-\d{2}$/.test(n));
  return names.sort().at(-1);
}

async function checkLinks(urls) {
  const broken = [];
  for (const url of urls) {
    try {
      let res = await fetch(url, { method: "HEAD", redirect: "follow", signal: AbortSignal.timeout(15000) });
      if (res.status === 405 || res.status === 403) res = await fetch(url, { redirect: "follow", signal: AbortSignal.timeout(15000) });
      if (res.status >= 400) broken.push(`${url} (${res.status})`);
    } catch (e) {
      broken.push(`${url} (${e.message})`);
    }
  }
  return broken;
}

function issueExists(title) {
  const res = spawnSync("gh", ["issue", "list", "--state", "open", "--search", `"${title}" in:title`, "--json", "title"], { encoding: "utf8" });
  return res.status === 0 && JSON.parse(res.stdout || "[]").some((i) => i.title === title);
}

function createIssue(f) {
  if (issueExists(f.title)) return console.log(`  (issue already open) ${f.title}`);
  const res = spawnSync("gh", ["issue", "create", "--title", f.title, "--body", f.body, "--label", "topic-review"], { stdio: "inherit" });
  if (res.status !== 0) spawnSync("gh", ["issue", "create", "--title", f.title, "--body", f.body], { stdio: "inherit" });
}

const isMain = process.argv[1]?.endsWith("spec-watch.mjs");
if (isMain) {
  const args = process.argv.slice(2);
  const fixtureIdx = args.indexOf("--fixture");
  const fixture = fixtureIdx >= 0 ? readJSON(args[fixtureIdx + 1]) : null;
  const create = args.includes("--create-issues");
  const all = [];

  for (const slug of listTopics()) {
    const meta = readJSON(join(topicDir(slug), "topic.json"));
    const factsPath = join(topicDir(slug), "facts.json");
    if (!meta.watch || !existsSync(factsPath)) continue;
    const facts = readJSON(factsPath);

    let latestTag = null;
    try {
      latestTag = fixture ? fixture[slug] : await fetchLatestTag(meta.watch.repo);
    } catch (e) {
      console.warn(`! ${slug}: could not read upstream (${e.message})`);
    }

    const findings = evaluate({ slug, watch: meta.watch, facts, latestTag });

    if (!fixture) {
      const broken = await checkLinks(facts.sources ?? []);
      if (broken.length) {
        findings.push({
          kind: "broken-links",
          title: `${slug}: ${broken.length} source link(s) are broken`,
          body: `These sources listed in \`topics/${slug}/facts.json\` failed to load:\n\n${broken.map((b) => `- ${b}`).join("\n")}`,
        });
      }
    }

    console.log(`${slug}: covers ${facts[meta.watch.factKey ?? "specRevision"]}, upstream ${latestTag ?? "unknown"}, ${findings.length} finding(s)`);
    for (const f of findings) console.log(`  - [${f.kind}] ${f.title}`);
    all.push(...findings);
  }

  if (create) for (const f of all) createIssue(f);
  if (!all.length) console.log("Everything is current.");
}
