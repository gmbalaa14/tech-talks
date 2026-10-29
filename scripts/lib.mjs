// Shared helpers for repo scripts. Pure Node, no dependencies.
import { readFileSync, readdirSync, existsSync, statSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

export const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
export const TOPICS_DIR = join(ROOT, "topics");
export const OUT_DIR = join(ROOT, ".out");

// Folder names that would clash with portal files on the published branch.
export const RESERVED_SLUGS = ["_portal", "assets", "404", "templates", "shared", "portal"];
export const SLUG_RE = /^[a-z0-9]+(-[a-z0-9]+)*$/;

export const config = JSON.parse(readFileSync(join(ROOT, "repo.config.json"), "utf8"));

export function readJSON(path) {
  return JSON.parse(readFileSync(path, "utf8"));
}

export function listTopics() {
  if (!existsSync(TOPICS_DIR)) return [];
  return readdirSync(TOPICS_DIR)
    .filter((name) => statSync(join(TOPICS_DIR, name)).isDirectory())
    .filter((name) => existsSync(join(TOPICS_DIR, name, "topic.json")))
    .sort();
}

export function topicDir(slug) {
  return join(TOPICS_DIR, slug);
}

/** Run a command, stream its output, and exit this process if it fails. */
export function run(cmd, args, opts = {}) {
  const res = spawnSync(cmd, args, {
    stdio: "inherit",
    cwd: ROOT,
    shell: process.platform === "win32",
    ...opts,
  });
  if (res.status !== 0) {
    console.error(`\nCommand failed (${res.status}): ${cmd} ${args.join(" ")}`);
    process.exit(res.status ?? 1);
  }
}

export function basePath(slug) {
  return slug ? `/${config.repo}/${slug}` : `/${config.repo}`;
}
