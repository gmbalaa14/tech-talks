import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join, resolve } from "node:path";

export interface Topic {
  slug: string;
  title: string;
  summary: string;
  tags: string[];
  accent: string;
  order: number;
  iconSvg: string;
  hasSlides: boolean;
  covers?: string; // e.g. "MCP spec 2026-07-28"
  lastReviewed?: string;
}

/** Locate topics/ whether the build runs from portal/ (npm workspace) or the repo root. */
function topicsRoot(): string {
  const here = process.cwd();
  for (const candidate of [resolve(here, "..", "topics"), resolve(here, "topics")]) {
    if (existsSync(candidate)) return candidate;
  }
  throw new Error(`Could not find the topics/ folder from ${here}`);
}

export function loadTopics(): Topic[] {
  const root = topicsRoot();
  const topics: Topic[] = [];

  for (const slug of readdirSync(root)) {
    const dir = join(root, slug);
    const metaPath = join(dir, "topic.json");
    if (!statSync(dir).isDirectory() || !existsSync(metaPath)) continue;

    const meta = JSON.parse(readFileSync(metaPath, "utf8"));
    const iconPath = join(dir, meta.icon ?? "icon.svg");
    const factsPath = join(dir, "facts.json");
    const facts = existsSync(factsPath) ? JSON.parse(readFileSync(factsPath, "utf8")) : {};

    topics.push({
      slug,
      title: meta.title,
      summary: meta.summary,
      tags: meta.tags ?? [],
      accent: meta.accent ?? "#3b5bdb",
      order: meta.order ?? 100,
      iconSvg: existsSync(iconPath) ? readFileSync(iconPath, "utf8") : "",
      hasSlides: existsSync(join(dir, "slides", "slides.md")),
      covers: facts.coversLabel,
      lastReviewed: facts.lastReviewed,
    });
  }
  return topics.sort((a, b) => a.order - b.order || a.title.localeCompare(b.title));
}

export function formatDate(iso?: string): string {
  if (!iso) return "";
  return new Date(iso + "T00:00:00Z").toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });
}
