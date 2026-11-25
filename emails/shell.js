const PINNED_TAG = "v0.2.0";
const ASSET_BASE = `https://raw.githubusercontent.com/scene-ready/design-system/${PINNED_TAG}/assets`;

export const DEFAULT_LOGO_LIGHT_URL = `${ASSET_BASE}/scene-ready-brandmark.svg`;
export const DEFAULT_LOGO_DARK_URL = `${ASSET_BASE}/scene-ready-brandmark-reversed.svg`;
export const DEFAULT_SUPPORT_EMAIL = "support@sceneready.tech";

const HTML_ESCAPES = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

export function escapeHtml(value) {
  if (value == null) return "";
  return String(value).replace(/[&<>"']/g, (c) => HTML_ESCAPES[c]);
}

export function safeUrl(url) {
  if (typeof url !== "string" || url.length === 0) {
    throw new TypeError("safeUrl: expected non-empty string url");
  }
  let parsed;
  try {
    parsed = new URL(url);
  } catch {
    throw new TypeError(`safeUrl: invalid URL "${url}"`);
  }
  if (parsed.protocol !== "http:" && parsed.protocol !== "https:" && parsed.protocol !== "mailto:") {
    throw new TypeError(`safeUrl: rejected protocol "${parsed.protocol}" — only http, https, mailto allowed`);
  }
  return escapeHtml(parsed.toString());
}

export function requireString(value, name) {
  if (typeof value !== "string" || value.length === 0) {
    throw new TypeError(`${name} is required and must be a non-empty string`);
  }
  return value;
}

export function requireCta(cta, name) {
  if (!cta || typeof cta !== "object") {
    throw new TypeError(`${name} is required and must be { label, url }`);
  }
  requireString(cta.label, `${name}.label`);
  requireString(cta.url, `${name}.url`);
  return { label: escapeHtml(cta.label), url: safeUrl(cta.url) };
}

// Web fonts the email loads, by family name.
export const WEB_FONTS = Object.freeze({
  Barlow: "https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600;700&display=swap",
  "Barlow Condensed":
    "https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700&display=swap",
});

// The families mjml would link, in its order: its default Roboto (named in our fallback
// stack), then ours. A family is linked only when the email uses it.
const LINKED_FONTS = Object.freeze({
  Roboto: "https://fonts.googleapis.com/css?family=Roboto:300,400,500,700",
  ...WEB_FONTS,
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
  const hrefs = Object.entries(LINKED_FONTS)
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

// The whole email: logo header, the body sections, footer. `pieces` is emails/compiled.js at
// runtime; the tests pass the MJML source to check the two render alike.
export function composeDocument(
  pieces,
  {
    title,
    previewText,
    body,
    logoUrl = DEFAULT_LOGO_LIGHT_URL,
    logoDarkUrl = DEFAULT_LOGO_DARK_URL,
    supportEmail = DEFAULT_SUPPORT_EMAIL,
  },
) {
  requireString(title, "title");
  const support = supportEmail
    ? fill(pieces.supportLine, { email: escapeHtml(supportEmail) })
    : "";
  const html = fill(pieces.document, {
    title: escapeHtml(title),
    preview: escapeHtml(previewText ?? title),
    logoUrl: safeUrl(logoUrl),
    logoDarkUrl: safeUrl(logoDarkUrl),
    body,
    support,
    fonts: fontTags(pieces.document + body + support),
  });
  return mergeOutlookConditionals(html);
}
