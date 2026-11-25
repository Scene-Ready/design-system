import { TOKENS } from "./tokens.js";
import { PIECES } from "./compiled.js";
import {
  composeDocument,
  escapeHtml,
  fill,
  requireCta,
  requireString,
} from "./shell.js";

function paragraphsHtml(body) {
  const arr = Array.isArray(body) ? body : [body];
  return arr
    .map((p) => `<p style="margin: 0 0 ${TOKENS.space[4]} 0;">${escapeHtml(p)}</p>`)
    .join("");
}

export function composeSimpleMessage(input, pieces) {
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

  const children = [
    fill(pieces.headlineSpaced, { text: escapeHtml(headline) }),
    recipientName ? fill(pieces.greeting, { name: escapeHtml(recipientName) }) : "",
    fill(pieces.lead, { text: paragraphsHtml(body) }),
    fill(pieces.buttonFlush, safeCta),
    fill(pieces.fallbackLink, safeCta),
    footnote ? fill(pieces.footnote, { text: escapeHtml(footnote) }) : "",
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

export function wrapSimpleMessage(input) {
  return composeSimpleMessage(input, PIECES);
}
