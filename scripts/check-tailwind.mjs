#!/usr/bin/env node
// Checks that tailwind.css only points at tokens that exist in tokens.css, so a
// renamed or removed token can't leave a Tailwind utility reading an undefined
// variable. Run with `npm run check`.
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const strip = (css) => css.replace(/\/\*[\s\S]*?\*\//g, "");
const tokens = new Set(
  [...strip(readFileSync(join(root, "tokens.css"), "utf8")).matchAll(/(--[\w-]+)\s*:/g)].map((m) => m[1]),
);
const used = [...strip(readFileSync(join(root, "tailwind.css"), "utf8")).matchAll(/var\((--[\w-]+)\)/g)].map((m) => m[1]);

const missing = [...new Set(used.filter((name) => !tokens.has(name)))];
if (missing.length > 0) {
  console.error(`check-tailwind: tailwind.css uses tokens missing from tokens.css: ${missing.join(", ")}`);
  process.exit(1);
}
console.log(`check-tailwind: ${used.length} token references, all defined in tokens.css`);
