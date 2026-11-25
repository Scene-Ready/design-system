// emails/tokens.js copies tokens.css by hand (email clients can't read CSS variables).
// This catches the copy drifting.
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

import { TOKENS } from "../emails/tokens.js";

const css = readFileSync(new URL("../tokens.css", import.meta.url), "utf8").replace(/\/\*[\s\S]*?\*\//g, "");
const block = (selector) => {
  const body = css.match(new RegExp(`${selector}\\s*\\{([\\s\\S]*?)\\n\\}`))[1];
  return Object.fromEntries([...body.matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g)].map((m) => [m[1], m[2].trim()]));
};
const light = block(":root");
const dark = { ...light, ...block("\\[data-theme='dark'\\]") };
const resolve = (theme, name) => {
  const value = theme[name];
  const ref = value?.match(/^var\((--[\w-]+)\)$/);
  return ref ? resolve(theme, ref[1]) : value;
};
const norm = (v) => String(v).toLowerCase().replace(/\s/g, "");

const ALIASES = {
  bgPage: "--bg-page",
  bgCard: "--bg-card",
  border: "--border",
  textPrimary: "--text-primary",
  textSecondary: "--text-secondary",
  textTertiary: "--text-tertiary",
  textBrand: "--text-brand",
  accent: "--accent",
  link: "--text-accent",
};

describe("emails/tokens.js", () => {
  it.each([
    ["light", light],
    ["dark", dark],
  ])("matches tokens.css in %s mode", (mode, theme) => {
    for (const [key, token] of Object.entries(ALIASES)) {
      expect(norm(TOKENS[mode][key]), `${mode}.${key}`).toBe(norm(resolve(theme, token)));
    }
    for (const s of ["info", "success", "warning", "danger", "neutral"]) {
      const sev = TOKENS[mode].severity[s];
      expect(norm(sev.fg), `${mode} ${s} fg`).toBe(norm(resolve(theme, `--${s}-fg`)));
      expect(norm(sev.bg), `${mode} ${s} bg`).toBe(norm(resolve(theme, `--${s}-surface`)));
      expect(norm(sev.base), `${mode} ${s} mark`).toBe(norm(resolve(theme, `--${s}-mark`)));
    }
  });

  it("matches tokens.css radii", () => {
    expect(TOKENS.radius).toEqual({ lg: resolve(light, "--radius-lg"), full: resolve(light, "--radius-full") });
  });

  it("matches tokens.css letter-spacing", () => {
    expect(TOKENS.tracking).toEqual({
      caps: resolve(light, "--tracking-caps"),
      eyebrow: resolve(light, "--tracking-eyebrow"),
    });
  });
});

describe("BRANDING.md", () => {
  // Uppercase text uses --tracking-caps or --tracking-eyebrow (§5.5); the guide's own values must too.
  // The lockup's spacing (marked ≈) is drawn into the artwork, not set as text.
  it("quotes only the tracking tokens' letter-spacing", () => {
    const guide = readFileSync(new URL("../BRANDING.md", import.meta.url), "utf8");
    const allowed = new Set([resolve(light, "--tracking-caps"), resolve(light, "--tracking-eyebrow")]);
    const quoted = guide
      .split("\n")
      .filter((line) => !line.includes("≈"))
      .flatMap((line) => [...line.matchAll(/(?:letter-spacing[^\n;|]*?|\+)(?<![-\d.])(\d*\.\d+em)/g)].map((m) => m[1]));
    expect(quoted.length).toBeGreaterThan(0);
    expect(quoted.filter((v) => !allowed.has(v))).toEqual([]);
  });
});
