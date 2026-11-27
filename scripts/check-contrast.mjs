#!/usr/bin/env node
// Checks WCAG 2.2 contrast for the design system, two ways:
//
// 1. Token pairings. Resolves tokens.css in light and dark mode (translucent
//    colours are composited over the surface they sit on) and checks every
//    text/surface pairing the guide allows against its minimum.
// 2. The guide's table. Recomputes every row of "Verified contrast pairings" in
//    BRANDING.md and fails if a printed ratio is off, so the table can't drift.
//
// Run with `npm run check`. Ratios use the WCAG 2.x relative-luminance formula.
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const strip = (css) => css.replace(/\/\*[\s\S]*?\*\//g, "");
const tokensCss = strip(readFileSync(join(root, "tokens.css"), "utf8"));

function block(selectorPattern) {
  const m = tokensCss.match(new RegExp(`${selectorPattern}\\s*\\{([\\s\\S]*?)\\n\\}`));
  if (!m) throw new Error(`check-contrast: no ${selectorPattern} block in tokens.css`);
  return Object.fromEntries([...m[1].matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g)].map((x) => [x[1], x[2].trim()]));
}
const light = block(":root");
const dark = { ...light, ...block("\\[data-theme='dark'\\]") };

function resolve(name, theme, seen = new Set()) {
  if (seen.has(name)) throw new Error(`check-contrast: ${name} refers to itself`);
  seen.add(name);
  const value = theme[name];
  if (value === undefined) throw new Error(`check-contrast: ${name} is not defined`);
  const ref = value.match(/^var\((--[\w-]+)\)$/);
  return ref ? resolve(ref[1], theme, seen) : value;
}

function parse(value) {
  const hex = value.match(/^#([0-9a-f]{6})$/i);
  if (hex) return [0, 2, 4].map((i) => parseInt(hex[1].slice(i, i + 2), 16)).concat(1);
  const rgba = value.match(/^rgba\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)\s*\)$/);
  if (rgba) return rgba.slice(1).map(Number);
  throw new Error(`check-contrast: can't read colour ${value}`);
}
const over = (fg, bg) => [0, 1, 2].map((i) => fg[i] * fg[3] + bg[i] * (1 - fg[3])).concat(1);
const luminance = (c) =>
  c
    .slice(0, 3)
    .map((v) => v / 255)
    .map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4))
    .reduce((sum, v, i) => sum + v * [0.2126, 0.7152, 0.0722][i], 0);
export function ratio(fg, bg) {
  const [a, b] = [luminance(fg), luminance(bg)].sort((x, y) => y - x);
  return (a + 0.05) / (b + 0.05);
}

// A translucent surface sits on a card; a translucent foreground on its surface.
function pair(theme, fgToken, bgToken, under = "--bg-card") {
  let bg = parse(resolve(bgToken, theme));
  if (bg[3] < 1) bg = over(bg, parse(resolve(under, theme)));
  let fg = parse(resolve(fgToken, theme));
  if (fg[3] < 1) fg = over(fg, bg);
  return ratio(fg, bg);
}

const TEXT = 4.5; // WCAG 1.4.3, normal text
const UI = 3; // WCAG 1.4.11, component boundaries and focus indicators
const surfaces = ["--bg-page", "--bg-card"];

// Each entry: [modes, foreground, backgrounds, minimum].
// Exempt by decision (design-system#10), so not listed:
// - light --text-tertiary: placeholders and decorative text only (2.5:1);
// - --text-disabled: disabled controls are exempt from 1.4.3;
// - secondary/tertiary text on --bg-elevated: the guide allows primary text only there.
const RULES = [
  [["light", "dark"], "--text-primary", [...surfaces, "--bg-elevated"], TEXT],
  [["light", "dark"], "--text-secondary", surfaces, TEXT],
  [["dark"], "--text-tertiary", surfaces, TEXT],
  [["light", "dark"], "--text-brand", surfaces, TEXT],
  [["light", "dark"], "--text-accent", surfaces, TEXT],
  [["light", "dark"], "--text-brand-hover", surfaces, TEXT],
  [["light", "dark"], "--text-accent-hover", surfaces, TEXT],
  [["light", "dark"], "--text-inverse", ["--accent", "--accent-hover", "--bg-secondary", "--bg-secondary-hover", "--danger", "--danger-hover", "--bg-sidebar"], TEXT],
  ...["success", "warning", "danger", "info", "neutral"].map((s) => [["light", "dark"], `--${s}-fg`, [`--${s}-surface`, ...surfaces], TEXT]),
  // Status marks (badge dots, strip bars, icons) are non-text: 3:1 on the page and card.
  ...["success", "warning", "danger", "info", "neutral"].map((s) => [["light", "dark"], `--${s}-mark`, surfaces, UI]),
  [["light", "dark"], "--text-brand", ["--brand-surface"], TEXT],
  [["light", "dark"], "--brand-mark", [...surfaces, "--brand-surface"], UI],
  [["light", "dark"], "--focus-ring", [...surfaces, "--bg-elevated"], UI],
  [["light", "dark"], "--border-input", ["--bg-card", "--bg-input"], UI],
];

const failures = [];
let checked = 0;
for (const [modes, fg, bgs, min] of RULES) {
  for (const mode of modes) {
    const theme = mode === "light" ? light : dark;
    for (const bg of bgs) {
      const r = pair(theme, fg, bg);
      checked++;
      if (r < min) failures.push(`${mode}: ${fg} on ${bg} is ${r.toFixed(2)}:1, needs ${min}:1`);
    }
  }
}

// The guide's table: rows with two hex codes and a printed ratio.
const guide = readFileSync(join(root, "BRANDING.md"), "utf8");
const section = guide.split(/^### Verified contrast pairings$/m)[1]?.split(/^#{2,3} /m)[0];
if (!section) failures.push('BRANDING.md: no "### Verified contrast pairings" section');
let rows = 0;
for (const line of (section ?? "").split("\n")) {
  const cells = line.split("|").slice(1, -1);
  const hexes = cells.slice(0, 2).map((c) => c.match(/#[0-9A-Fa-f]{6}/)?.[0]);
  const printed = cells[2]?.match(/([\d.]+):1/)?.[1];
  if (!hexes[0] || !hexes[1] || !printed) continue;
  rows++;
  const actual = ratio(parse(hexes[0]), parse(hexes[1])).toFixed(1);
  if (actual !== Number(printed).toFixed(1)) failures.push(`BRANDING.md table: ${hexes[0]} on ${hexes[1]} printed ${printed}:1, actual ${actual}:1`);
}
if (section && rows === 0) failures.push("BRANDING.md: the contrast table has no rows with two hex codes and a ratio");

if (failures.length > 0) {
  console.error(`check-contrast: ${failures.length} failure(s)\n  ${failures.join("\n  ")}`);
  process.exit(1);
}
console.log(`check-contrast: ${checked} token pairings pass; ${rows} rows of the guide's table match`);
