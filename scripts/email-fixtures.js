// Sample inputs for each email wrapper: `npm run preview:emails` renders them, and the
// tests render the same inputs.

export const FIXTURES = {
  simple: {
    subject: "Reset your Scene Ready password",
    previewText: "Use this link to set a new password — expires in 30 minutes.",
    recipientName: "Capt. Reyes",
    headline: "Reset your password",
    body: [
      "We received a request to reset the password for your Scene Ready account.",
      "If this was you, use the button below. Otherwise you can ignore this email — your password will not change.",
    ],
    cta: {
      label: "Reset Password",
      url: "https://auth.sceneready.app/reset?t=4f2a-9c81-bf07",
    },
    footnote: "This link expires in 30 minutes. If you didn't request a reset, ignore this email or contact support.",
    supportEmail: "support@sceneready.tech",
  },

  incident: {
    subject: "Callout dispatched — 1421 Birch St",
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
      label: "Acknowledge Response",
      url: "https://platform.sceneready.app/c/8821/ack",
    },
    secondaryCta: {
      label: "Open incident in Scene Ready",
      url: "https://platform.sceneready.app/c/8821",
    },
    supportEmail: "support@sceneready.tech",
  },

  digest: {
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
            url: "https://platform.sceneready.app/c/8821",
            meta: "14:03 PDT — Engine 12, Ladder 4",
            description: "Single-family residence, second floor. Suppressed in 22 minutes; one occupant treated for smoke inhalation.",
            badge: { label: "Closed", severity: "success" },
          },
          {
            title: "Vehicle accident — I-280 NB at Page Mill",
            url: "https://platform.sceneready.app/c/8822",
            meta: "09:48 PDT — Engine 7, Medic 3",
            description: "Two-vehicle MVA, one extrication. Two patients transported to Stanford.",
            badge: { label: "Closed", severity: "success" },
          },
          {
            title: "Medical assist — 412 Cedar Ave",
            url: "https://platform.sceneready.app/c/8823",
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
            badge: { label: "OOS", severity: "danger" },
          },
        ],
      },
      {
        title: "Certifications expiring this week",
        items: [
          {
            title: "FF-II — Reyes",
            meta: "Expires May 9 (5 days)",
            badge: { label: "Expiring", severity: "warning" },
          },
          {
            title: "EMT-B — Doan",
            meta: "Expires May 11 (7 days)",
            badge: { label: "Expiring", severity: "warning" },
          },
        ],
      },
    ],
    cta: {
      label: "Open Dashboard",
      url: "https://platform.sceneready.app",
    },
    supportEmail: "support@sceneready.tech",
  },
};
