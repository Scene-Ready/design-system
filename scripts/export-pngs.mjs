#!/usr/bin/env node
// Exports the PNG brandmarks email needs (BRANDING.md §16): the parent lockup,
// light and reversed, at 480×240, which is 2× the 240px email header. Email
// clients such as Gmail and Outlook's Word renderer don't show SVG images.
// Rerun after changing either brandmark SVG: `npm run export-pngs`.
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { Resvg } from "@resvg/resvg-js";

const assets = join(dirname(fileURLToPath(import.meta.url)), "..", "assets");
const WIDTH = 480;

for (const name of ["scene-ready-brandmark", "scene-ready-brandmark-reversed"]) {
  const svg = readFileSync(join(assets, `${name}.svg`));
  const png = new Resvg(svg, { fitTo: { mode: "width", value: WIDTH } }).render().asPng();
  writeFileSync(join(assets, `${name}.png`), png);
  console.log(`wrote assets/${name}.png`);
}
