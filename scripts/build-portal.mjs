#!/usr/bin/env node
// Builds the home page into .out/portal/. It reads every topics/*/topic.json.
import { cpSync, mkdirSync, rmSync } from "node:fs";
import { join } from "node:path";
import { OUT_DIR, ROOT, run } from "./lib.mjs";

const out = join(OUT_DIR, "portal");
rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });
run("npm", ["run", "build", "-w", "portal"]);
cpSync(join(ROOT, "portal", "dist"), out, { recursive: true });
console.log(`\nBuilt portal -> ${out}`);
