import { mkdirSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

import {
  wrapSimpleMessage,
  wrapIncidentAlert,
  wrapDigest,
} from "../emails/index.js";

const here = dirname(fileURLToPath(import.meta.url));
const distDir = resolve(here, "..", "dist");
mkdirSync(distDir, { recursive: true });

const samples = {
  simple: wrapSimpleMessage({
    subject: "Reset your Scene Ready password",
    previewText: "Use this link to set a new password — expires in 30 minutes.",
    recipientName: "Capt. Reyes",
    headline: "Reset your password",
    body: [
      "We received a request to reset the password for your Scene Ready account.",
      "If this was you, use the button below. Otherwise you can ignore this email — your password will not change.",
    ],
    cta: {
      label: "Reset password",
      url: "https://app.sceneready.tech/reset?t=4f2a-9c81-bf07",
    },
    footnote: "This link expires in 30 minutes. If you didn't request a reset, ignore this email or contact support.",
    supportEmail: "support@sceneready.tech",
  }),

  incident: wrapIncidentAlert({
    subject: "Callout dispatched — Engine 12 to 1421 Birch St",
    previewText: "Structure fire. Engine 12 dispatched at 14:03. Acknowledge to confirm response.",
    severity: "danger",
    badgeLabel: "Callout dispatched",
    headline: "Structure fire — 1421 Birch St",
    summary: "Engine 12 has been dispatched. Acknowledge to confirm your response or open the incident for full details.",
    facts: [
      { label: "Apparatus", value: "Engine 12" },
      { label: "Crew On Duty", value: "Reyes, Doan, Park" },
      { label: "Location", value: "1421 Birch St, Building B" },
      { label: "Dispatched", value: "14:03 PDT" },
      { label: "Caller report", value: "Smoke visible from second floor; occupants reportedly evacuated." },
    ],
    cta: {
      label: "Acknowledge response",
      url: "https://app.sceneready.tech/c/8821/ack",
    },
    secondaryCta: {
      label: "Open incident in Scene Ready",
      url: "https://app.sceneready.tech/c/8821",
    },
    supportEmail: "support@sceneready.tech",
  }),

  digest: wrapDigest({
    subject: "Daily digest — May 4",
    previewText: "3 callouts, 1 apparatus out of service, 2 certs expiring this week.",
    headline: "Daily digest — May 4",
    intro: "Here's what happened on shift in the last 24 hours: 3 callouts closed, 1 apparatus out of service, 2 certifications expiring this week.",
    sections: [
      {
        title: "Callouts",
        items: [
          {
            title: "Structure fire — 1421 Birch St",
            url: "https://app.sceneready.tech/c/8821",
            meta: "14:03 PDT — Engine 12, Ladder 4",
            description: "Single-family residence, second floor. Suppressed in 22 minutes; one occupant treated for smoke inhalation.",
            badge: { label: "Closed", severity: "success" },
          },
          {
            title: "Vehicle accident — I-280 NB at Page Mill",
            url: "https://app.sceneready.tech/c/8822",
            meta: "09:48 PDT — Engine 7, Medic 3",
            description: "Two-vehicle MVA, one extrication. Two patients transported to Stanford.",
            badge: { label: "Closed", severity: "success" },
          },
          {
            title: "Medical assist — 412 Cedar Ave",
            url: "https://app.sceneready.tech/c/8823",
            meta: "06:12 PDT — Medic 1",
            description: "Lift assist; patient evaluated on scene, refused transport.",
            badge: { label: "Closed", severity: "success" },
          },
        ],
      },
      {
        title: "Apparatus",
        items: [
          {
            title: "Ladder 4 — out of service",
            description: "Pump pressure fault flagged at end of shift. Service appointment scheduled for May 5, 08:00.",
            badge: { label: "Out of service", severity: "warning" },
          },
        ],
      },
      {
        title: "Certifications expiring this week",
        items: [
          {
            title: "FF-II — Reyes",
            meta: "Expires May 9 (5 days)",
            badge: { label: "Action needed", severity: "warning" },
          },
          {
            title: "EMT-B — Doan",
            meta: "Expires May 11 (7 days)",
            badge: { label: "Action needed", severity: "warning" },
          },
        ],
      },
    ],
    cta: {
      label: "Open dashboard",
      url: "https://app.sceneready.tech",
    },
    supportEmail: "support@sceneready.tech",
  }),
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
