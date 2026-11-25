import { TOKENS, SEVERITIES } from "./tokens.js";
import { PIECES } from "./compiled.js";
import {
  composeDocument,
  escapeHtml,
  fill,
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
  const s = badge.severity;
  const sev = TOKENS.light.severity[s];
  // §7 badge anatomy: a pill with a 6px dot in the base tone and an uppercase label.
  const dot = `<span class="t-sev-${s}-dot" style="display:inline-block;width:6px;height:6px;border-radius:${TOKENS.radius.full};background-color:${sev.base};margin-right:6px;vertical-align:middle;"></span>`;
  return `<span class="t-sev-${s} t-sev-${s}-fg" style="display:inline-block;background-color:${sev.bg};color:${sev.fg};font-family:${TOKENS.font.condensed};font-size:${TOKENS.fontSize.xs};font-weight:600;letter-spacing:0.05em;padding:3px 10px;border-radius:${TOKENS.radius.full};text-transform:uppercase;margin-bottom:${TOKENS.space[2]};">${dot}${escapeHtml(badge.label)}</span>`;
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
    ? `<div class="t-text-2" style="color:${TOKENS.light.textSecondary};font-size:${TOKENS.fontSize.xs};margin-top:${TOKENS.space[1]};">${escapeHtml(item.meta)}</div>`
    : "";

  const descriptionHtml = item.description
    ? `<div class="t-text-2" style="color:${TOKENS.light.textSecondary};font-size:${TOKENS.fontSize.sm};margin-top:${TOKENS.space[2]};line-height:1.5;">${escapeHtml(item.description)}</div>`
    : "";

  return `
    <tr>
      <td class="t-divider" style="font-family:${TOKENS.font.sans};padding:${TOKENS.space[4]} 0;${dividerStyle}">
        ${renderBadge(item.badge)}
        <div class="t-text" style="color:${TOKENS.light.textPrimary};font-size:${TOKENS.fontSize.base};line-height:1.6;${item.badge ? `margin-top:${TOKENS.space[1]};` : ""}">${titleHtml}</div>
        ${metaHtml}
        ${descriptionHtml}
      </td>
    </tr>
  `;
}

function renderSection(section, isFirst, pieces) {
  requireString(section?.title, "section.title");
  if (!Array.isArray(section.items) || section.items.length === 0) {
    throw new TypeError("section.items is required and must be a non-empty array");
  }

  const rows = section.items
    .map((item, idx) => renderItem(item, idx === section.items.length - 1))
    .join("");

  const heading = isFirst ? pieces.sectionHeading : pieces.sectionHeadingSpaced;
  return (
    fill(heading, { text: escapeHtml(section.title) }) + fill(pieces.digestTable, { rows })
  );
}

export function composeDigest(input, pieces) {
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

  const children = [
    fill(pieces.headline, { text: escapeHtml(headline) }),
    intro ? fill(pieces.intro, { text: escapeHtml(intro) }) : "",
    ...sections.map((section, idx) => renderSection(section, idx === 0, pieces)),
    safeCta ? fill(pieces.buttonSpaced, safeCta) + fill(pieces.fallbackLink, safeCta) : "",
  ].join("");

  return composeDocument(pieces, {
    title: subject,
    previewText,
    body: fill(pieces.card, { children }),
    logoUrl,
    logoDarkUrl,
    supportEmail,
  });
}

export function wrapDigest(input) {
  return composeDigest(input, PIECES);
}
