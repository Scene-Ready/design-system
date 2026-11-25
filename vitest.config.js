import { cloudflareTest } from "@cloudflare/vitest-pool-workers";
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    projects: [
      {
        // The wrappers run where the apps send email: a Worker, without mjml.
        plugins: [
          cloudflareTest({
            miniflare: {
              compatibilityDate: "2026-04-14",
              compatibilityFlags: ["nodejs_compat"],
            },
          }),
        ],
        test: { name: "workers", include: ["test/emails.test.js"] },
      },
      {
        // Compares the precompiled pieces with mjml, which only loads in Node.
        test: { name: "node", environment: "node", include: ["test/parity.test.js", "test/tokens.test.js"] },
      },
    ],
  },
});
