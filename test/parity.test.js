// Runs in Node, where mjml loads. The wrappers compose precompiled pieces; composing the
// same pieces as MJML and compiling the whole document must give the same email.
import { describe, expect, it } from "vitest";
import mjml2html from "mjml";

import { composeDigest } from "../emails/wrap-digest.js";
import { composeIncidentAlert } from "../emails/wrap-incident-alert.js";
import { composeSimpleMessage } from "../emails/wrap-simple-message.js";
import { PIECES } from "../emails/compiled.js";
import { SOURCE_PIECES } from "../scripts/email-source.js";
import { FIXTURES } from "../scripts/email-fixtures.js";

const normalize = (html) => html.replace(/>\s+</g, "><").replace(/\s+/g, " ").trim();

function compileMjml(mjml) {
  const { html, errors } = mjml2html(mjml, { validationLevel: "strict", minify: false });
  expect(errors).toEqual([]);
  return html;
}

const CASES = [
  ["simple message", composeSimpleMessage, FIXTURES.simple],
  [
    "simple message, single paragraph, no greeting, footnote or support line",
    composeSimpleMessage,
    { ...FIXTURES.simple, body: "One line.", recipientName: undefined, footnote: undefined, supportEmail: "" },
  ],
  ["incident alert", composeIncidentAlert, FIXTURES.incident],
  [
    "incident alert, info, no facts or buttons",
    composeIncidentAlert,
    { ...FIXTURES.incident, severity: "info", facts: undefined, cta: undefined, secondaryCta: undefined },
  ],
  ["digest", composeDigest, FIXTURES.digest],
  [
    "digest, one section, no intro or button",
    composeDigest,
    { ...FIXTURES.digest, sections: FIXTURES.digest.sections.slice(1, 2), intro: undefined, cta: undefined },
  ],
];

describe("precompiled emails", () => {
  it.each(CASES)("%s matches the whole document compiled by mjml", (_, compose, input) => {
    const expected = compileMjml(compose(input, SOURCE_PIECES));
    expect(normalize(compose(input, PIECES))).toBe(normalize(expected));
  });
});
