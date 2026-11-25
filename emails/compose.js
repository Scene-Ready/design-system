// Composes an email from pieces: fills slots, links the fonts it uses, and repeats mjml's
// whole-document clean-up. `pieces` is emails/compiled.js at runtime; the parity test
// passes the MJML source, to check the two render alike.

import { escapeHtml, requireString, safeUrl } from "./input.js";

// A released tag that has these files: the email links them, so they must stay reachable.
const PINNED_TAG = "v0.8.0";
const ASSET_BASE = `https://raw.githubusercontent.com/Scene-Ready/design-system/${PINNED_TAG}/assets`;

export const DEFAULT_LOGO_LIGHT_URL = `${ASSET_BASE}/scene-ready-brandmark.svg`;
export const DEFAULT_LOGO_DARK_URL = `${ASSET_BASE}/scene-ready-brandmark-reversed.svg`;
export const DEFAULT_SUPPORT_EMAIL = "support@sceneready.tech";

// Web fonts the email loads, by family name, in the weights it uses (§5.5: 400 and 600).
// mjml links a family only when the email uses it; its own defaults (Roboto, Lato…) never
// match, because the email stacks don't name them.
export const WEB_FONTS = Object.freeze({
  Barlow: "https://fonts.googleapis.com/css2?family=Barlow:wght@400;600&display=swap",
  "Barlow Condensed": "https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600&display=swap",
});

// Puts values into a piece's {{name}} and [[name]] slots. One pass over the template, so a
// value that contains slot syntax is left as it is.
export function fill(template, slots) {
  return template.replace(/\{\{(\w+)\}\}|\[\[(\w+)\]\]/g, (_, text, children) => {
    const name = text ?? children;
    if (!(name in slots)) throw new Error(`fill: no value for slot "${name}"`);
    return slots[name];
  });
}

// mjml's font detection (mjml-core buildFontsTags): link a family when an attribute's
// font-family names it.
function fontTags(content) {
  const hrefs = Object.entries(WEB_FONTS)
    .filter(([name]) => new RegExp(`"[^"]*font-family:[^"]*${name}[^"]*"`, "i").test(content))
    .map(([, href]) => href);
  if (hrefs.length === 0) return "";
  return `<!--[if !mso]><!-->
${hrefs.map((href) => `<link href="${href}" rel="stylesheet" type="text/css">`).join("\n")}
<style type="text/css">
${hrefs.map((href) => `@import url(${href});`).join("\n")}
</style>
<!--<![endif]-->`;
}

// mjml joins the Outlook-only wrappers of adjacent sections (mjml-core
// mergeOutlookConditionnals); pieces compiled apart need the same join once composed.
function mergeOutlookConditionals(html) {
  return html.replace(/(<!\[endif]-->\s*?<!--\[if mso \| IE]>)/gm, "");
}

// The whole email: logo header, `body` (the composed sections), footer. Reads the fields
// every wrapper shares from its input: subject, previewText, logoUrl, logoDarkUrl,
// supportEmail.
export function composeDocument(pieces, input, body) {
  const {
    subject,
    previewText,
    logoUrl = DEFAULT_LOGO_LIGHT_URL,
    logoDarkUrl = DEFAULT_LOGO_DARK_URL,
    supportEmail = DEFAULT_SUPPORT_EMAIL,
  } = input;
  requireString(subject, "subject");
  const support = supportEmail ? fill(pieces.supportLine, { email: escapeHtml(supportEmail) }) : "";
  const html = fill(pieces.document, {
    title: escapeHtml(subject),
    preview: escapeHtml(previewText ?? subject),
    logoUrl: safeUrl(logoUrl),
    logoDarkUrl: safeUrl(logoDarkUrl),
    body,
    support,
    fonts: fontTags(pieces.document + body + support),
  });
  return mergeOutlookConditionals(html);
}
