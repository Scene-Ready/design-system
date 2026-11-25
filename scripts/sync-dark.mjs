#!/usr/bin/env node
// Keeps the OS-following dark block in tokens.css identical to [data-theme='dark'].
//
// tokens.css carries the dark aliases twice: under [data-theme='dark'] (forced
// dark) and under @media (prefers-color-scheme: dark) for
// :root:not([data-theme='light']) (follow the OS). The first is the source; the
// media-query copy is generated from it.
//
//   node scripts/sync-dark.mjs          rewrite the media-query copy
//   node scripts/sync-dark.mjs --check  exit 1 if the copies differ (npm run check)
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const file = join(dirname(fileURLToPath(import.meta.url)), "..", "tokens.css");
const css = readFileSync(file, "utf8");
const check = process.argv.includes("--check");

const source = css.match(/^\[data-theme='dark'\] \{\n([\s\S]*?)\n\}$/m);
if (!source) fail("no top-level [data-theme='dark'] { … } block");

const START = "/* BEGIN GENERATED: OS dark mode (npm run sync-dark) */";
const END = "/* END GENERATED: OS dark mode */";
const body = source[1]
  .split("\n")
  .map((line) => (line ? `  ${line}` : line))
  .join("\n");
const generated = `${START}
@media (prefers-color-scheme: dark) {
  :root:not([data-theme='light']) {
${body}
  }
}
${END}`;

const at = css.indexOf(START);
const end = css.indexOf(END);
if ((at === -1) !== (end === -1) || end < at) fail("the generated-block markers are missing or out of order");

if (check) {
  if (at === -1 || css.slice(at, end + END.length) !== generated) {
    fail("the prefers-color-scheme copy differs from [data-theme='dark']; run `npm run sync-dark`");
  }
  console.log("sync-dark: the prefers-color-scheme block matches [data-theme='dark']");
} else {
  const next =
    at === -1
      ? css.replace(source[0], `${source[0]}\n\n${generated}`)
      : css.slice(0, at) + generated + css.slice(end + END.length);
  writeFileSync(file, next);
  console.log(next === css ? "sync-dark: already in sync" : "sync-dark: rewrote the prefers-color-scheme block");
}

function fail(message) {
  console.error(`sync-dark: ${message}`);
  process.exit(1);
}
