import { TOKENS } from "./tokens.js";
import {
  buildShell,
  escapeHtml,
  requireCta,
  requireString,
} from "./shell.js";

function paragraphsHtml(body) {
  const arr = Array.isArray(body) ? body : [body];
  return arr
    .map((p) => `<p style="margin: 0 0 ${TOKENS.space[4]} 0;">${escapeHtml(p)}</p>`)
    .join("");
}

export function wrapSimpleMessage(input) {
  if (!input || typeof input !== "object") {
    throw new TypeError("wrapSimpleMessage: input object is required");
  }
  const {
    subject,
    headline,
    body,
    cta,
    recipientName,
    footnote,
    previewText,
    logoUrl,
    logoDarkUrl,
    supportEmail,
  } = input;

  requireString(subject, "subject");
  requireString(headline, "headline");
  if (body == null || (typeof body !== "string" && !Array.isArray(body))) {
    throw new TypeError("body is required and must be a string or string[]");
  }
  const safeCta = requireCta(cta, "cta");

  const greeting = recipientName
    ? `<mj-text css-class="t-text" color="${TOKENS.light.textPrimary}" font-size="${TOKENS.fontSize.base}" padding="0 0 ${TOKENS.space[3]} 0">
         Hello, ${escapeHtml(recipientName)}.
       </mj-text>`
    : "";

  const footnoteBlock = footnote
    ? `<mj-text css-class="t-text-3" color="${TOKENS.light.textTertiary}" font-size="${TOKENS.fontSize.xs}" line-height="1.5" padding="${TOKENS.space[4]} 0 0 0">
         ${escapeHtml(footnote)}
       </mj-text>`
    : "";

  const bodyMjml = `
    <mj-section css-class="t-bg-card" background-color="${TOKENS.light.bgCard}" padding="${TOKENS.space[4]} ${TOKENS.space[6]} ${TOKENS.space[8]} ${TOKENS.space[6]}">
      <mj-column>
        ${greeting}
        <mj-text css-class="t-text-brand" color="${TOKENS.light.textBrand}" font-size="${TOKENS.fontSize["2xl"]}" line-height="1.25" font-weight="700" padding="0 0 ${TOKENS.space[4]} 0">
          ${escapeHtml(headline)}
        </mj-text>
        <mj-text css-class="t-text-2" color="${TOKENS.light.textSecondary}" font-size="${TOKENS.fontSize.base}" line-height="1.5" padding="0 0 ${TOKENS.space[6]} 0">
          ${paragraphsHtml(body)}
        </mj-text>
        <mj-button css-class="t-cta" href="${safeCta.url}" background-color="${TOKENS.light.accent}" color="${TOKENS.light.accentText}" border-radius="${TOKENS.radius.md}" font-weight="600" font-size="${TOKENS.fontSize.base}" inner-padding="${TOKENS.space[3]} ${TOKENS.space[6]}" align="left">
          ${safeCta.label}
        </mj-button>
        ${footnoteBlock}
      </mj-column>
    </mj-section>
  `;

  return buildShell({
    title: subject,
    previewText,
    bodyMjml,
    logoUrl,
    logoDarkUrl,
    supportEmail,
  });
}
