#!/usr/bin/env node
// Builds the portal and every topic into .out/. Used for a full local preview.
import { listTopics, run } from "./lib.mjs";

run("node", ["scripts/build-portal.mjs"]);
for (const slug of listTopics()) run("node", ["scripts/build-topic.mjs", slug]);
