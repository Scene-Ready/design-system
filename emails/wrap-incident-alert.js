import { TOKENS, SEVERITIES } from "./tokens.js";
import {
  buildShell,
  escapeHtml,
  requireCta,
  requireString,
  safeUrl,
} from "./shell.js";

function buildSeverityStrip(severity, badgeLabel) {
  const sev = TOKENS.light.severity[severity];
  return `
    <mj-section css-class="t-sev-${severity}" background-color="${sev.bg}" padding="0">
      <mj-column css-class="t-sev-${severity}-bar" border-left="4px solid ${sev.fg}" padding="${TOKENS.space[3]} ${TOKENS.space[5]}">
        <mj-text css-class="t-sev-${severity}-fg" color="${sev.fg}" font-family="${TOKENS.font.condensed}" font-size="${TOKENS.fontSize.xs}" font-weight="700" letter-spacing="0.08em" padding="0">
          ${escapeHtml(badgeLabel.toUpperCase())}
        </mj-text>
      </mj-column>
    </mj-section>
  `;
}

function buildFactsTable(facts) {
  if (!facts || facts.length === 0) return "";
  const rows = facts
    .map(
      ({ label, value }) => `
        <tr>
          <td class="t-text-3 t-border" style="padding: ${TOKENS.space[3]} ${TOKENS.space[4]} ${TOKENS.space[3]} 0; font-size: ${TOKENS.fontSize.sm}; color: ${TOKENS.light.textTertiary}; border-bottom: 1px solid ${TOKENS.light.border}; vertical-align: top; width: 35%;">
            ${escapeHtml(label)}
          </td>
          <td class="t-text t-border" style="padding: ${TOKENS.space[3]} 0; font-size: ${TOKENS.fontSize.sm}; color: ${TOKENS.light.textPrimary}; border-bottom: 1px solid ${TOKENS.light.border}; vertical-align: top;">
            ${escapeHtml(value)}
          </td>
        </tr>`
    )
    .join("");
  return `
    <mj-table padding="0 0 ${TOKENS.space[6]} 0">
      <table cellpadding="0" cellspacing="0" border="0" role="presentation" style="width:100%; border-collapse:collapse;">
        ${rows}
      </table>
    </mj-table>
  `;
}

function buildCtaBlock(cta, secondaryCta) {
  if (!cta && !secondaryCta) return "";
  const primary = cta
    ? `<mj-button css-class="t-cta" href="${cta.url}" background-color="${TOKENS.light.accent}" color="${TOKENS.light.accentText}" border-radius="${TOKENS.radius.md}" font-weight="600" font-size="${TOKENS.fontSize.base}" inner-padding="${TOKENS.space[3]} ${TOKENS.space[6]}" align="left" padding="0">
         ${cta.label}
       </mj-button>`
    : "";
  const secondary = secondaryCta
    ? `<mj-text css-class="t-link" font-size="${TOKENS.fontSize.sm}" padding="${TOKENS.space[3]} 0 0 0">
         <a href="${secondaryCta.url}" style="color:${TOKENS.light.accent};text-decoration:underline;">${secondaryCta.label}</a>
       </mj-text>`
    : "";
  return primary + secondary;
}

export function wrapIncidentAlert(input) {
  if (!input || typeof input !== "object") {
    throw new TypeError("wrapIncidentAlert: input object is required");
  }
  const {
    subject,
    severity,
    badgeLabel,
    headline,
    summary,
    facts,
    cta,
    secondaryCta,
    previewText,
    logoUrl,
    logoDarkUrl,
    supportEmail,
  } = input;

  requireString(subject, "subject");
  requireString(badgeLabel, "badgeLabel");
  requireString(headline, "headline");
  requireString(summary, "summary");
  if (!SEVERITIES.includes(severity)) {
    throw new TypeError(`severity must be one of ${SEVERITIES.join(", ")} — got "${severity}"`);
  }
  if (facts != null && !Array.isArray(facts)) {
    throw new TypeError("facts must be an array of { label, value } when provided");
  }

  const safeCta = cta ? requireCta(cta, "cta") : null;
  const safeSecondary = secondaryCta ? requireCta(secondaryCta, "secondaryCta") : null;
  const safeFacts = (facts ?? []).map((f) => {
    requireString(f?.label, "facts[].label");
    requireString(f?.value, "facts[].value");
    return f;
  });

  const bodyMjml = `
    ${buildSeverityStrip(severity, badgeLabel)}
    <mj-section css-class="t-bg-card" background-color="${TOKENS.light.bgCard}" padding="${TOKENS.space[6]} ${TOKENS.space[6]} ${TOKENS.space[8]} ${TOKENS.space[6]}">
      <mj-column>
        <mj-text css-class="t-text-brand" color="${TOKENS.light.textBrand}" font-size="${TOKENS.fontSize["2xl"]}" line-height="1.25" font-weight="700" padding="0 0 ${TOKENS.space[3]} 0">
          ${escapeHtml(headline)}
        </mj-text>
        <mj-text css-class="t-text-2" color="${TOKENS.light.textSecondary}" font-size="${TOKENS.fontSize.base}" line-height="1.5" padding="0 0 ${TOKENS.space[6]} 0">
          ${escapeHtml(summary)}
        </mj-text>
        ${buildFactsTable(safeFacts)}
        ${buildCtaBlock(safeCta, safeSecondary)}
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
