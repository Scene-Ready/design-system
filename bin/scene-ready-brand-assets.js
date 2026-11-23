#!/usr/bin/env node
// Copies the seven parent-brand files from this package into an app's static
// root, so they are served at fixed URLs (/favicon.ico, /scene-ready-favicon.svg …).
// Usage: scene-ready-brand-assets <dir>
import { copyFileSync, existsSync, mkdirSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const BRAND_FILES = [
  "favicon.ico",
  "scene-ready-favicon.svg",
  "scene-ready-appicon.svg",
  "scene-ready-icon.svg",
  "scene-ready-icon-reversed.svg",
  "scene-ready-brandmark.svg",
  "scene-ready-brandmark-reversed.svg",
];

const source = join(dirname(fileURLToPath(import.meta.url)), "..", "assets");
const target = process.argv[2];

if (!target || process.argv.length > 3) {
  console.error("Usage: scene-ready-brand-assets <dir>");
  process.exit(2);
}

const missing = BRAND_FILES.filter((f) => !existsSync(join(source, f)));
if (missing.length > 0) {
  console.error(`scene-ready-brand-assets: missing from ${source}: ${missing.join(", ")}`);
  process.exit(1);
}

const dir = resolve(target);
mkdirSync(dir, { recursive: true });
for (const f of BRAND_FILES) copyFileSync(join(source, f), join(dir, f));
console.log(`scene-ready-brand-assets: copied ${BRAND_FILES.length} files to ${dir}`);
