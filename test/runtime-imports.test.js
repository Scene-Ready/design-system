// The wrappers run in Workers, where mjml can't load (#13). Every module reachable from
// the package entry must import only other files in the package, never an npm package.
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const IMPORT = /^\s*(?:import|export)\s[^;]*?from\s+["']([^"']+)["']/gm;

function reachable(url, seen = new Map()) {
  if (seen.has(url.href)) return seen;
  const specifiers = [...readFileSync(url, "utf8").matchAll(IMPORT)].map((m) => m[1]);
  seen.set(url.href, specifiers);
  for (const s of specifiers) if (s.startsWith(".")) reachable(new URL(s, url), seen);
  return seen;
}

describe("the email entry point", () => {
  it("imports no packages, so it needs nothing installed at runtime", () => {
    const graph = reachable(new URL("../emails/index.js", import.meta.url));
    const bare = [...graph].flatMap(([file, specs]) => specs.filter((s) => !s.startsWith(".")).map((s) => `${file}: ${s}`));
    expect(graph.size).toBeGreaterThan(3);
    expect(bare).toEqual([]);
  });
});
