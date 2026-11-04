# `@scene-ready/design-system/emails`

Themed email shells for Scene Ready services. Three wrappers cover the three email patterns we actually send:

| Wrapper              | Use cases                                                                  |
| -------------------- | -------------------------------------------------------------------------- |
| `wrapSimpleMessage`  | Password reset, email verification, account confirmation, simple notices.  |
| `wrapIncidentAlert`  | Callout dispatched, apparatus out of service, certification expiring.      |
| `wrapDigest`         | Daily digest, weekly recap, shift summary — multi-section content.         |

Each function takes a structured input object and returns a complete HTML document string ready to hand to your MTA (SES, SendGrid, Postmark, etc.).

## Install

```sh
npm install git+https://github.com/scene-ready/design-system.git#v0.3.0 mjml@^4.18.0
```

`mjml` is an optional peer dependency of the package: apps that only use `tokens.css` and the logo assets don't get it, so services that send email install it themselves.

## Server-side only

These wrappers depend on `mjml`, which is a sizable Node-only package. **Do not bundle this module for the browser.** Call it from your transactional-mail worker / SES webhook / SendGrid handler.

## Usage

```js
import { wrapSimpleMessage, wrapIncidentAlert, wrapDigest } from "@scene-ready/design-system";

const html = wrapSimpleMessage({
  subject: "Reset your Scene Ready password",
  recipientName: "Capt. Reyes",
  headline: "Reset your password",
  body: "We received a request to reset the password for your Scene Ready account.",
  cta: { label: "Reset password", url: "https://app.sceneready.tech/reset?t=..." },
  footnote: "This link expires in 30 minutes. If you didn't request this, ignore this email.",
});
```

```js
const html = wrapIncidentAlert({
  subject: "Callout dispatched — Engine 12",
  severity: "danger",                    // "info" | "success" | "warning" | "danger"
  badgeLabel: "Callout dispatched",
  headline: "Structure fire — 1421 Birch St",
  summary: "Engine 12 dispatched at 14:03. Acknowledge to confirm response.",
  facts: [
    { label: "Apparatus", value: "Engine 12" },
    { label: "Crew On Duty", value: "Reyes, Doan, Park" },
    { label: "Dispatched", value: "14:03 PDT" },
  ],
  cta: { label: "Acknowledge response", url: "https://app.sceneready.tech/c/8821/ack" },
  secondaryCta: { label: "Open incident", url: "https://app.sceneready.tech/c/8821" },
});
```

```js
const html = wrapDigest({
  subject: "Daily digest — May 4",
  headline: "Daily digest — May 4",
  intro: "3 callouts closed, 1 apparatus out of service, 2 certs expiring.",
  sections: [
    {
      title: "Callouts",
      items: [
        {
          title: "Structure fire — 1421 Birch St",
          url: "https://app.sceneready.tech/c/8821",
          meta: "14:03 PDT — Engine 12",
          description: "Single-family residence. Suppressed in 22 minutes.",
          badge: { label: "Closed", severity: "success" },
        },
      ],
    },
  ],
  cta: { label: "Open dashboard", url: "https://app.sceneready.tech" },
});
```

## API

All three functions share these optional fields:

| Field          | Type     | Default                                                    | Notes                                                       |
| -------------- | -------- | ---------------------------------------------------------- | ----------------------------------------------------------- |
| `previewText`  | `string` | falls back to `subject`                                    | Inbox preview snippet.                                      |
| `logoUrl`      | `string` | pinned-tag SVG on `raw.githubusercontent.com`              | Light-mode brandmark URL. **Self-host in production.**      |
| `logoDarkUrl`  | `string` | pinned-tag reversed SVG on `raw.githubusercontent.com`     | Dark-mode brandmark URL. **Self-host in production.**       |
| `supportEmail` | `string` | `support@sceneready.tech`                                  | Footer support link; pass `""` to omit.                     |

The default logo URLs point at this repo's git tag — convenient for development, but in production you should host the brandmark on your own CDN and pass both URLs explicitly. `raw.githubusercontent.com` is rate-limited and not optimized for email-client image caching.

### `wrapSimpleMessage(input)`

| Field           | Required | Type                  | Notes                                |
| --------------- | -------- | --------------------- | ------------------------------------ |
| `subject`       | yes      | `string`              | `<title>` + previewText fallback.    |
| `headline`      | yes      | `string`              | h1 above the body.                   |
| `body`          | yes      | `string \| string[]`  | Each entry becomes a `<p>`.          |
| `cta`           | yes      | `{ label, url }`      | Red 700 button.                      |
| `recipientName` | no       | `string`              | "Hello, {name}." line if provided.   |
| `footnote`      | no       | `string`              | Small print under the CTA.           |

### `wrapIncidentAlert(input)`

| Field          | Required | Type                                | Notes                                                                |
| -------------- | -------- | ----------------------------------- | -------------------------------------------------------------------- |
| `subject`      | yes      | `string`                            |                                                                      |
| `severity`     | yes      | `"info" \| "success" \| "warning" \| "danger"` | Drives strip + badge color.                                |
| `badgeLabel`   | yes      | `string`                            | Rendered uppercase in Barlow Condensed.                              |
| `headline`     | yes      | `string`                            |                                                                      |
| `summary`      | yes      | `string`                            | Lead paragraph.                                                      |
| `facts`        | no       | `Array<{ label, value }>`           | Two-column key/value table (Apparatus, Crew, Location, Time, etc.). |
| `cta`          | no       | `{ label, url }`                    | Primary CTA button.                                                  |
| `secondaryCta` | no       | `{ label, url }`                    | Inline text link beneath the button.                                 |

### `wrapDigest(input)`

| Field      | Required | Type                          | Notes                                          |
| ---------- | -------- | ----------------------------- | ---------------------------------------------- |
| `subject`  | yes      | `string`                      |                                                |
| `headline` | yes      | `string`                      |                                                |
| `sections` | yes      | `Section[]` (non-empty)       | See shape below.                               |
| `intro`    | no       | `string`                      | Lead paragraph above the first section.        |
| `cta`      | no       | `{ label, url }`              | Footer CTA button.                             |

```ts
type Section = {
  title: string;
  items: Array<{
    title: string;
    description?: string;
    url?: string;                              // makes title a link
    meta?: string;                             // small grey line under title
    badge?: { label: string; severity: "info" | "success" | "warning" | "danger" };
  }>;
};
```

## Theming

Light is the default (inline styles, full backward compatibility). Dark activates automatically in clients that respect the recipient's color-scheme preference:

| Client                                | Dark mode behavior                                              |
| ------------------------------------- | --------------------------------------------------------------- |
| Apple Mail (macOS, iOS, iPadOS)       | Full `prefers-color-scheme` support — surfaces, text, accents flip. |
| Outlook for iOS / Outlook.com web     | `[data-ogsc]` selectors handle it — same flip.                  |
| Outlook 2019+ (Windows desktop)       | Honors `prefers-color-scheme` in Outlook 365 modern builds.     |
| Thunderbird                           | Full `prefers-color-scheme` support.                            |
| Gmail (web, Android, iOS)             | Partial auto-inversion. `[data-ogsc]` covers Gmail iOS.         |
| Outlook 2016/2019 (Word renderer)     | Stays light. **SVG logos do not render** — pass a hosted PNG via `logoUrl`/`logoDarkUrl` if you need to support these clients. |
| Older clients                         | Stay light. Acceptable.                                         |

Brand colors lift in dark mode per the design spec — Red 700 → Red 500, status foregrounds → `-light` variants, surfaces flip to Navy 900 / Navy 700. The brandmark logo swaps to its reversed (white-chevron) variant via stacked `<img>` sections.

## Voice

Email copy must follow the Scene Ready voice rules from `BRANDING.md`:

- Active voice, direct.
- Fire/EMS/SAR terminology naturally — "On Duty", "Crew", "Apparatus", "Callout".
- **No "Oops!" or "Uh oh!"** — this is software used during emergencies.
- Specific, actionable error and instruction copy.

## Preview locally

```sh
npm run preview:emails
# wrote dist/preview-simple.html
# wrote dist/preview-incident.html
# wrote dist/preview-digest.html
```

Open the files in a browser. To preview dark mode without sending the email:

- **macOS Safari**: System Settings → Appearance → Dark.
- **Chrome / Edge DevTools**: Rendering panel → "Emulate CSS media feature prefers-color-scheme" → "dark".

For real-client verification (Gmail, Apple Mail, Outlook desktop, Outlook iOS) you must send the rendered HTML through an MTA — there is no substitute. Do this before tagging a release.

## Security

- All interpolated text is HTML-escaped.
- All URLs are validated with `new URL()` and rejected unless `http:`, `https:`, or `mailto:`. `javascript:` and `data:` schemes throw.
- Wrappers throw `TypeError` with a specific field name on missing/invalid input — they never silently render broken email.
