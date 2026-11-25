import { TOKENS, SEVERITIES } from "./tokens.js";
import { PIECES } from "./compiled.js";
import {
  composeDocument,
  escapeHtml,
  fill,
  requireCta,
  requireString,
} from "./shell.js";

function factsRows(facts) {
  return facts
    .map(
      ({ label, value }) => `
        <tr>
          <td class="t-text-2 t-border" style="font-family: ${TOKENS.font.sans}; padding: ${TOKENS.space[3]} ${TOKENS.space[4]} ${TOKENS.space[3]} 0; font-size: ${TOKENS.fontSize.sm}; color: ${TOKENS.light.textSecondary}; border-bottom: 1px solid ${TOKENS.light.border}; vertical-align: top; width: 35%;">
            ${escapeHtml(label)}
          </td>
          <td class="t-text t-border" style="font-family: ${TOKENS.font.sans}; padding: ${TOKENS.space[3]} 0; font-size: ${TOKENS.fontSize.sm}; color: ${TOKENS.light.textPrimary}; border-bottom: 1px solid ${TOKENS.light.border}; vertical-align: top;">
            ${escapeHtml(value)}
          </td>
        </tr>`
    )
    .join("");
}

export function composeIncidentAlert(input, pieces) {
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

  const children = [
    fill(pieces.headline, { text: escapeHtml(headline) }),
    fill(pieces.lead, { text: escapeHtml(summary) }),
    safeFacts.length > 0 ? fill(pieces.factsTable, { rows: factsRows(safeFacts) }) : "",
    safeCta ? fill(pieces.buttonFlush, safeCta) : "",
    safeSecondary ? fill(pieces.link, safeSecondary) : "",
  ].join("");

  const body =
    fill(pieces[`severityStrip_${severity}`], { label: escapeHtml(badgeLabel.toUpperCase()) }) +
    fill(pieces.alertCard, { children });

  return composeDocument(pieces, {
    title: subject,
    previewText,
    body,
    logoUrl,
    logoDarkUrl,
    supportEmail,
  });
}

export function wrapIncidentAlert(input) {
  return composeIncidentAlert(input, PIECES);
}
