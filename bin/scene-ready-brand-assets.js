#!/usr/bin/env node
// Copies the seven parent-brand files from this package into an app's static
// root, so they are served at fixed URLs (/favicon.ico, /scene-ready-favicon.svg …),
// and the self-hosted fonts into <dir>/fonts/ (/fonts/fonts.css and its woff2 files).
// Usage: scene-ready-brand-assets <dir> [--skip <file>]...
// --skip leaves one of the seven out, e.g. `--skip favicon.ico` in an app that
// ships its own product favicon.ico in the same folder.
import { copyFileSync, existsSync, mkdirSync, readdirSync, rmSync } from "node:fs";
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
const USAGE = "Usage: scene-ready-brand-assets <dir> [--skip <file>]...";
const args = process.argv.slice(2);
const skip = new Set();
let target;
for (let i = 0; i < args.length; i++) {
  if (args[i] === "--skip") {
    const file = args[++i];
    if (!BRAND_FILES.includes(file)) {
      console.error(`scene-ready-brand-assets: --skip needs one of: ${BRAND_FILES.join(", ")}`);
      process.exit(2);
    }
    skip.add(file);
  } else if (target === undefined && !args[i].startsWith("-")) {
    target = args[i];
  } else {
    console.error(USAGE);
    process.exit(2);
  }
}
if (target === undefined) {
  console.error(USAGE);
  process.exit(2);
}

const missing = BRAND_FILES.filter((f) => !existsSync(join(source, f)));
if (missing.length > 0) {
  console.error(`scene-ready-brand-assets: missing from ${source}: ${missing.join(", ")}`);
  process.exit(1);
}

const fontsSource = join(dirname(fileURLToPath(import.meta.url)), "..", "fonts");
if (!existsSync(join(fontsSource, "fonts.css"))) {
  console.error(`scene-ready-brand-assets: missing ${join(fontsSource, "fonts.css")}`);
  process.exit(1);
}

const dir = resolve(target);
mkdirSync(dir, { recursive: true });
const files = BRAND_FILES.filter((f) => !skip.has(f));
for (const f of files) copyFileSync(join(source, f), join(dir, f));

// <dir>/fonts/ belongs to this package: replace it whole so a release that drops
// or renames a font file leaves nothing stale behind.
const fontsDir = join(dir, "fonts");
rmSync(fontsDir, { recursive: true, force: true });
mkdirSync(fontsDir);
const fonts = readdirSync(fontsSource);
for (const f of fonts) copyFileSync(join(fontsSource, f), join(fontsDir, f));

console.log(`scene-ready-brand-assets: copied ${files.length} files and fonts/ (${fonts.length} files) to ${dir}`);
