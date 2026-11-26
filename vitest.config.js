import { cloudflareTest } from "@cloudflare/vitest-plugin";
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    // A private-repo CI runner has 2 vCPUs (home/docs/coding-standards.md, Tests): start at 3
    // for workerd. Local runs keep vitest's default.
    ...(process.env.CI ? { maxWorkers: 3 } : {}),
    projects: [
      {
        // The wrappers run where the apps send email: a Worker, without mjml.
        plugins: [
          cloudflareTest({
            miniflare: {
              compatibilityDate: "2026-11-23",
              compatibilityFlags: ["nodejs_compat"],
            },
          }),
        ],
        test: { name: "workers", include: ["test/emails.test.js"] },
      },
      {
        // Compares the precompiled pieces with mjml, which only loads in Node.
        test: { name: "node", environment: "node", include: ["test/parity.test.js", "test/tokens.test.js", "test/runtime-imports.test.js"] },
      },
    ],
  },
});
