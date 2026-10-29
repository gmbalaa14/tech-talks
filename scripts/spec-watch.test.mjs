import { test } from "node:test";
import assert from "node:assert/strict";
import { evaluate } from "./spec-watch.mjs";

const watch = { repo: "x/y", factKey: "specRevision", reviewIntervalDays: 90 };
const today = new Date("2026-11-15");

test("a newer upstream release is flagged", () => {
  const f = evaluate({ slug: "mcp", watch, facts: { specRevision: "2026-07-28", lastReviewed: "2026-10-27" }, latestTag: "2026-11-25", today });
  assert.deepEqual(f.map((x) => x.kind), ["new-release"]);
});

test("same release and a recent review is clean", () => {
  const f = evaluate({ slug: "mcp", watch, facts: { specRevision: "2026-07-28", lastReviewed: "2026-10-27" }, latestTag: "2026-07-28", today });
  assert.equal(f.length, 0);
});

test("an old review date is flagged even with no new release", () => {
  const f = evaluate({ slug: "mcp", watch, facts: { specRevision: "2026-07-28", lastReviewed: "2026-01-01" }, latestTag: "2026-07-28", today });
  assert.deepEqual(f.map((x) => x.kind), ["stale-review"]);
});

test("non-date tags are ignored", () => {
  const f = evaluate({ slug: "mcp", watch, facts: { specRevision: "2026-07-28", lastReviewed: "2026-10-27" }, latestTag: "v1.2.3", today });
  assert.equal(f.length, 0);
});
