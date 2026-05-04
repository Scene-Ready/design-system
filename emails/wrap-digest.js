import { TOKENS, SEVERITIES } from "./tokens.js";
import {
  buildShell,
  escapeHtml,
  requireCta,
  requireString,
  safeUrl,
} from "./shell.js";

function renderBadge(badge) {
  if (!badge) return "";
  if (!SEVERITIES.includes(badge.severity)) {
    throw new TypeError(`badge.severity must be one of ${SEVERITIES.join(", ")} — got "${badge.severity}"`);
  }
  requireString(badge.label, "badge.label");
  const sev = TOKENS.light.severity[badge.severity];
  return `<span class="t-sev-${badge.severity} t-sev-${badge.severity}-fg" style="display:inline-block;background-color:${sev.bg};color:${sev.fg};font-family:${TOKENS.font.condensed};font-size:${TOKENS.fontSize.xs};font-weight:700;letter-spacing:0.08em;padding:2px ${TOKENS.space[2]};border-radius:${TOKENS.radius.full};text-transform:uppercase;margin-bottom:${TOKENS.space[2]};">${escapeHtml(badge.label)}</span>`;
}

function renderItem(item, isLast) {
  requireString(item?.title, "item.title");
  const dividerStyle = isLast
    ? ""
    : `border-bottom:1px solid ${TOKENS.light.divider};`;

  let url = null;
  if (item.url != null) {
    url = safeUrl(item.url);
  }

  const titleHtml = url
    ? `<a href="${url}" style="color:${TOKENS.light.textPrimary};text-decoration:none;font-weight:600;">${escapeHtml(item.title)}</a>`
    : `<span style="font-weight:600;">${escapeHtml(item.title)}</span>`;

  const metaHtml = item.meta
    ? `<div class="t-text-3" style="color:${TOKENS.light.textTertiary};font-size:${TOKENS.fontSize.xs};margin-top:${TOKENS.space[1]};">${escapeHtml(item.meta)}</div>`
    : "";

  const descriptionHtml = item.description
    ? `<div class="t-text-2" style="color:${TOKENS.light.textSecondary};font-size:${TOKENS.fontSize.sm};margin-top:${TOKENS.space[2]};line-height:1.5;">${escapeHtml(item.description)}</div>`
    : "";

  return `
    <tr>
      <td class="t-divider" style="padding:${TOKENS.space[4]} 0;${dividerStyle}">
        ${renderBadge(item.badge)}
        <div class="t-text" style="color:${TOKENS.light.textPrimary};font-size:${TOKENS.fontSize.base};line-height:1.4;${item.badge ? `margin-top:${TOKENS.space[1]};` : ""}">${titleHtml}</div>
        ${metaHtml}
        ${descriptionHtml}
      </td>
    </tr>
  `;
}

function renderSection(section, isFirst) {
  requireString(section?.title, "section.title");
  if (!Array.isArray(section.items) || section.items.length === 0) {
    throw new TypeError("section.items is required and must be a non-empty array");
  }

  const itemRows = section.items
    .map((item, idx) => renderItem(item, idx === section.items.length - 1))
    .join("");

  const headingPadding = isFirst
    ? `0 0 ${TOKENS.space[2]} 0`
    : `${TOKENS.space[6]} 0 ${TOKENS.space[2]} 0`;

  return `
    <mj-text css-class="t-text-brand" color="${TOKENS.light.textBrand}" font-size="${TOKENS.fontSize.lg}" font-weight="700" padding="${headingPadding}">
      ${escapeHtml(section.title)}
    </mj-text>
    <mj-table padding="0">
      <table cellpadding="0" cellspacing="0" border="0" role="presentation" style="width:100%;border-collapse:collapse;">
        ${itemRows}
      </table>
    </mj-table>
  `;
}

export function wrapDigest(input) {
  if (!input || typeof input !== "object") {
    throw new TypeError("wrapDigest: input object is required");
  }
  const {
    subject,
    headline,
    sections,
    intro,
    cta,
    previewText,
    logoUrl,
    logoDarkUrl,
    supportEmail,
  } = input;

  requireString(subject, "subject");
  requireString(headline, "headline");
  if (!Array.isArray(sections) || sections.length === 0) {
    throw new TypeError("sections is required and must be a non-empty array");
  }

  const safeCta = cta ? requireCta(cta, "cta") : null;

  const introBlock = intro
    ? `<mj-text css-class="t-text-2" color="${TOKENS.light.textSecondary}" font-size="${TOKENS.fontSize.base}" line-height="1.5" padding="0 0 ${TOKENS.space[4]} 0">
         ${escapeHtml(intro)}
       </mj-text>`
    : "";

  const sectionsMjml = sections
    .map((section, idx) => renderSection(section, idx === 0))
    .join("");

  const ctaBlock = safeCta
    ? `<mj-button css-class="t-cta" href="${safeCta.url}" background-color="${TOKENS.light.accent}" color="${TOKENS.light.accentText}" border-radius="${TOKENS.radius.md}" font-weight="600" font-size="${TOKENS.fontSize.base}" inner-padding="${TOKENS.space[3]} ${TOKENS.space[6]}" align="left" padding="${TOKENS.space[6]} 0 0 0">
         ${safeCta.label}
       </mj-button>`
    : "";

  const bodyMjml = `
    <mj-section css-class="t-bg-card" background-color="${TOKENS.light.bgCard}" padding="${TOKENS.space[4]} ${TOKENS.space[6]} ${TOKENS.space[8]} ${TOKENS.space[6]}">
      <mj-column>
        <mj-text css-class="t-text-brand" color="${TOKENS.light.textBrand}" font-size="${TOKENS.fontSize["2xl"]}" line-height="1.25" font-weight="700" padding="0 0 ${TOKENS.space[3]} 0">
          ${escapeHtml(headline)}
        </mj-text>
        ${introBlock}
        ${sectionsMjml}
        ${ctaBlock}
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
