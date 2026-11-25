import { mkdirSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

import {
  wrapSimpleMessage,
  wrapIncidentAlert,
  wrapDigest,
} from "../emails/index.js";
import { FIXTURES } from "./email-fixtures.js";

const here = dirname(fileURLToPath(import.meta.url));
const distDir = resolve(here, "..", "dist");
mkdirSync(distDir, { recursive: true });

const samples = {
  simple: wrapSimpleMessage(FIXTURES.simple),
  incident: wrapIncidentAlert(FIXTURES.incident),
  digest: wrapDigest(FIXTURES.digest),
};

for (const [name, html] of Object.entries(samples)) {
  const outPath = resolve(distDir, `preview-${name}.html`);
  writeFileSync(outPath, html);
  console.log(`wrote ${outPath} (${html.length} bytes)`);
}

console.log("\nOpen the files in a browser to preview.");
console.log("To preview dark mode:");
console.log("  - macOS: switch System Settings -> Appearance -> Dark");
console.log("  - DevTools: Rendering panel -> Emulate prefers-color-scheme -> dark");
