import { test } from "node:test";
import assert from "node:assert/strict";
import { detect } from "./detect-changes.mjs";

const slugs = ["mcp", "docker"];

test("a change inside one topic rebuilds only that topic", () => {
  const r = detect(["topics/mcp/slides/slides.md", "topics/mcp/site/src/content/acts/01.mdx"], slugs);
  assert.deepEqual(r, { all: false, portal: false, topics: ["mcp"] });
});

test("topic.json also refreshes the portal card", () => {
  const r = detect(["topics/docker/topic.json"], slugs);
  assert.deepEqual(r, { all: false, portal: true, topics: ["docker"] });
});

test("portal changes rebuild only the portal", () => {
  const r = detect(["portal/src/pages/index.astro"], slugs);
  assert.deepEqual(r, { all: false, portal: true, topics: [] });
});

test("shared tokens rebuild everything", () => {
  const r = detect(["shared/tokens/base.css"], slugs);
  assert.deepEqual(r, { all: true, portal: true, topics: ["mcp", "docker"] });
});

test("docs, templates and scripts deploy nothing", () => {
  const r = detect(["README.md", "templates/topic/theme.css", "scripts/lib.mjs"], slugs);
  assert.deepEqual(r, { all: false, portal: false, topics: [] });
});

test("unknown topic folders are ignored", () => {
  const r = detect(["topics/ghost/site/x.md"], slugs);
  assert.deepEqual(r, { all: false, portal: false, topics: [] });
});
