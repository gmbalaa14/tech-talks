import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync, existsSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { publish } from "./publish.mjs";

function setup() {
  const base = mkdtempSync(join(tmpdir(), "tt-"));
  const out = join(base, "out");
  const pages = join(base, "pages");
  mkdirSync(join(pages, "docker"), { recursive: true });
  writeFileSync(join(pages, "docker", "index.html"), "docker v1");
  mkdirSync(join(pages, "mcp"), { recursive: true });
  writeFileSync(join(pages, "mcp", "old.html"), "stale");
  writeFileSync(join(pages, "index.html"), "portal v1");
  mkdirSync(join(pages, "_portal"));
  writeFileSync(join(pages, "_portal", "old.css"), "old");
  return { out, pages };
}

test("publishing one topic replaces only that topic", () => {
  const { out, pages } = setup();
  mkdirSync(join(out, "topics", "mcp", "slides"), { recursive: true });
  writeFileSync(join(out, "topics", "mcp", "index.html"), "mcp v2");
  writeFileSync(join(out, "topics", "mcp", "slides", "index.html"), "slides v2");

  publish(out, pages);

  assert.equal(readFileSync(join(pages, "mcp", "index.html"), "utf8"), "mcp v2");
  assert.equal(readFileSync(join(pages, "mcp", "slides", "index.html"), "utf8"), "slides v2");
  assert.equal(existsSync(join(pages, "mcp", "old.html")), false, "old topic files are removed");
  assert.equal(readFileSync(join(pages, "docker", "index.html"), "utf8"), "docker v1", "other topics untouched");
  assert.equal(readFileSync(join(pages, "index.html"), "utf8"), "portal v1", "portal untouched");
});

test("publishing the portal keeps every topic folder", () => {
  const { out, pages } = setup();
  mkdirSync(join(out, "portal", "_portal"), { recursive: true });
  writeFileSync(join(out, "portal", "index.html"), "portal v2");
  writeFileSync(join(out, "portal", "_portal", "new.css"), "new");

  publish(out, pages);

  assert.equal(readFileSync(join(pages, "index.html"), "utf8"), "portal v2");
  assert.equal(existsSync(join(pages, "_portal", "old.css")), false);
  assert.equal(existsSync(join(pages, "_portal", "new.css")), true);
  assert.equal(readFileSync(join(pages, "docker", "index.html"), "utf8"), "docker v1");
  assert.equal(existsSync(join(pages, "mcp", "old.html")), true);
});
