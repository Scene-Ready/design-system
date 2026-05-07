import mjml2html from "mjml";
import { TOKENS } from "./tokens.js";

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

const STYLE_BLOCK = `
:root { color-scheme: light dark; supported-color-schemes: light dark; }
body, html { margin: 0; padding: 0; }
a { color: ${TOKENS.light.accent}; text-decoration: underline; }
.t-logo-dark-section { display: none !important; mso-hide: all; max-height: 0; overflow: hidden; }
@media (prefers-color-scheme: dark) {
  body, .t-bg-page, .t-bg-page > div { background-color: ${TOKENS.dark.bgPage} !important; }
  .t-bg-card, .t-bg-card > div { background-color: ${TOKENS.dark.bgCard} !important; }
  .t-text, .t-text * { color: ${TOKENS.dark.textPrimary} !important; }
  .t-text-2, .t-text-2 * { color: ${TOKENS.dark.textSecondary} !important; }
  .t-text-3, .t-text-3 * { color: ${TOKENS.dark.textTertiary} !important; }
  .t-text-brand, .t-text-brand * { color: ${TOKENS.dark.textBrand} !important; }
  .t-border { border-color: ${TOKENS.dark.border} !important; }
  .t-divider { background-color: ${TOKENS.dark.divider} !important; border-color: ${TOKENS.dark.divider} !important; }
  .t-cta table { background-color: ${TOKENS.dark.accent} !important; }
  .t-cta a { background-color: ${TOKENS.dark.accent} !important; color: ${TOKENS.dark.accentText} !important; }
  .t-link, .t-link a { color: ${TOKENS.dark.accent} !important; }
  a { color: ${TOKENS.dark.accent} !important; }
  .t-logo-light-section { display: none !important; max-height: 0 !important; overflow: hidden !important; }
  .t-logo-dark-section { display: block !important; max-height: none !important; overflow: visible !important; }
  .t-sev-info       { background-color: ${TOKENS.dark.severity.info.bg} !important; }
  .t-sev-info-fg, .t-sev-info-fg * { color: ${TOKENS.dark.severity.info.fg} !important; }
  .t-sev-info-bar { background-color: ${TOKENS.dark.severity.info.fg} !important; }
  .t-sev-success    { background-color: ${TOKENS.dark.severity.success.bg} !important; }
  .t-sev-success-fg, .t-sev-success-fg * { color: ${TOKENS.dark.severity.success.fg} !important; }
  .t-sev-success-bar { background-color: ${TOKENS.dark.severity.success.fg} !important; }
  .t-sev-warning    { background-color: ${TOKENS.dark.severity.warning.bg} !important; }
  .t-sev-warning-fg, .t-sev-warning-fg * { color: ${TOKENS.dark.severity.warning.fg} !important; }
  .t-sev-warning-bar { background-color: ${TOKENS.dark.severity.warning.fg} !important; }
  .t-sev-danger     { background-color: ${TOKENS.dark.severity.danger.bg} !important; }
  .t-sev-danger-fg, .t-sev-danger-fg * { color: ${TOKENS.dark.severity.danger.fg} !important; }
  .t-sev-danger-bar { background-color: ${TOKENS.dark.severity.danger.fg} !important; }
}
[data-ogsc] .t-bg-page, [data-ogsc] .t-bg-page > div { background-color: ${TOKENS.dark.bgPage} !important; }
[data-ogsc] .t-bg-card, [data-ogsc] .t-bg-card > div { background-color: ${TOKENS.dark.bgCard} !important; }
[data-ogsc] .t-text, [data-ogsc] .t-text * { color: ${TOKENS.dark.textPrimary} !important; }
[data-ogsc] .t-text-2, [data-ogsc] .t-text-2 * { color: ${TOKENS.dark.textSecondary} !important; }
[data-ogsc] .t-text-3, [data-ogsc] .t-text-3 * { color: ${TOKENS.dark.textTertiary} !important; }
[data-ogsc] .t-text-brand, [data-ogsc] .t-text-brand * { color: ${TOKENS.dark.textBrand} !important; }
[data-ogsc] .t-cta table { background-color: ${TOKENS.dark.accent} !important; }
[data-ogsc] .t-cta a { background-color: ${TOKENS.dark.accent} !important; }
[data-ogsc] .t-link, [data-ogsc] .t-link a { color: ${TOKENS.dark.accent} !important; }
[data-ogsc] .t-logo-light-section { display: none !important; max-height: 0 !important; overflow: hidden !important; }
[data-ogsc] .t-logo-dark-section { display: block !important; max-height: none !important; overflow: visible !important; }
@media only screen and (max-width: 599px) {
  .t-mobile-stack { width: 100% !important; max-width: 100% !important; display: block !important; }
}
`.trim();

function buildHeader(logoUrl, logoDarkUrl) {
  return `
    <mj-section css-class="t-logo-light-section t-bg-card" background-color="${TOKENS.light.bgCard}" padding="${TOKENS.space[6]} ${TOKENS.space[6]} ${TOKENS.space[4]} ${TOKENS.space[6]}">
      <mj-column>
        <mj-image src="${logoUrl}" alt="Scene Ready" width="180px" align="center" padding="0" />
      </mj-column>
    </mj-section>
    <mj-section css-class="t-logo-dark-section" background-color="${TOKENS.dark.bgCard}" padding="${TOKENS.space[6]} ${TOKENS.space[6]} ${TOKENS.space[4]} ${TOKENS.space[6]}">
      <mj-column>
        <mj-image src="${logoDarkUrl}" alt="Scene Ready" width="180px" align="center" padding="0" />
      </mj-column>
    </mj-section>
  `;
}

function buildFooter(supportEmail) {
  const supportLine = supportEmail
    ? `<mj-text css-class="t-text-3" align="center" color="${TOKENS.light.textTertiary}" font-size="${TOKENS.fontSize.xs}" line-height="1.5" padding="${TOKENS.space[1]} 0 0 0">
         Need help? <a href="mailto:${escapeHtml(supportEmail)}" class="t-link" style="color:${TOKENS.light.accent};text-decoration:underline;">${escapeHtml(supportEmail)}</a>
       </mj-text>`
    : "";
  return `
    <mj-section css-class="t-bg-page" background-color="${TOKENS.light.bgPage}" padding="${TOKENS.space[6]} ${TOKENS.space[6]}">
      <mj-column>
        <mj-text css-class="t-text-3" align="center" color="${TOKENS.light.textTertiary}" font-size="${TOKENS.fontSize.xs}" line-height="1.5" padding="0">
          Scene Ready &middot; sceneready.tech<br/>
          You're receiving this because you have a Scene Ready account.
        </mj-text>
        ${supportLine}
      </mj-column>
    </mj-section>
  `;
}

export function buildShell({
  title,
  previewText,
  bodyMjml,
  logoUrl = DEFAULT_LOGO_LIGHT_URL,
  logoDarkUrl = DEFAULT_LOGO_DARK_URL,
  supportEmail = DEFAULT_SUPPORT_EMAIL,
}) {
  requireString(title, "title");
  requireString(bodyMjml, "bodyMjml");
  safeUrl(logoUrl);
  safeUrl(logoDarkUrl);

  const preview = previewText ?? title;

  const mjmlSrc = `<mjml>
  <mj-head>
    <mj-title>${escapeHtml(title)}</mj-title>
    <mj-preview>${escapeHtml(preview)}</mj-preview>
    <mj-raw>
      <meta name="color-scheme" content="light dark" />
      <meta name="supported-color-schemes" content="light dark" />
    </mj-raw>
    <mj-font name="Barlow" href="https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600;700&display=swap" />
    <mj-font name="Barlow Condensed" href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700&display=swap" />
    <mj-attributes>
      <mj-all font-family="${TOKENS.font.sans}" />
      <mj-text font-size="${TOKENS.fontSize.base}" line-height="1.5" color="${TOKENS.light.textPrimary}" padding="0" />
      <mj-button background-color="${TOKENS.light.accent}" color="${TOKENS.light.accentText}" font-weight="600" border-radius="${TOKENS.radius.md}" font-size="${TOKENS.fontSize.base}" inner-padding="${TOKENS.space[3]} ${TOKENS.space[6]}" />
      <mj-section padding="0" />
    </mj-attributes>
    <mj-style>${STYLE_BLOCK}</mj-style>
  </mj-head>
  <mj-body css-class="t-bg-page" background-color="${TOKENS.light.bgPage}" width="${TOKENS.layout.contentWidth}">
    ${buildHeader(logoUrl, logoDarkUrl)}
    ${bodyMjml}
    ${buildFooter(supportEmail)}
  </mj-body>
</mjml>`;

  const result = mjml2html(mjmlSrc, { validationLevel: "strict", minify: false });
  if (result.errors && result.errors.length > 0) {
    const messages = result.errors.map((e) => e.formattedMessage || e.message).join("\n");
    throw new Error(`MJML compile failed:\n${messages}`);
  }
  return result.html;
}
