// MJML source for the email wrappers' pieces. `npm run build:emails` compiles each piece to
// HTML in emails/compiled.js, so the wrappers never run mjml.
//
// Slots: {{name}} takes escaped text or a URL; [[name]] takes child pieces (more MJML here,
// compiled HTML at runtime). Compose pieces with `fill` from emails/shell.js.
//
// Each piece is compiled on its own. Column pieces are compiled inside a card, so they
// assume the card's width; every card has the same side padding.

import { TOKENS, SEVERITIES } from "../emails/tokens.js";
import { WEB_FONTS } from "../emails/shell.js";

const STYLE_BLOCK = `
:root { color-scheme: light dark; supported-color-schemes: light dark; }
body, html { margin: 0; padding: 0; }
a { color: ${TOKENS.light.link}; text-decoration: underline; }
.t-logo-dark-section { display: none !important; mso-hide: all; max-height: 0; overflow: hidden; }
@media (prefers-color-scheme: dark) {
  body, .t-bg-page, .t-bg-page > div, .t-bg-page > table { background-color: ${TOKENS.dark.bgPage} !important; }
  .t-bg-card, .t-bg-card > div, .t-bg-card > table { background-color: ${TOKENS.dark.bgCard} !important; }
  .t-text, .t-text * { color: ${TOKENS.dark.textPrimary} !important; }
  .t-text-2, .t-text-2 * { color: ${TOKENS.dark.textSecondary} !important; }
  .t-text-3, .t-text-3 * { color: ${TOKENS.dark.textTertiary} !important; }
  .t-text-brand, .t-text-brand * { color: ${TOKENS.dark.textBrand} !important; }
  .t-border { border-color: ${TOKENS.dark.border} !important; }
  .t-divider { border-color: ${TOKENS.dark.divider} !important; }
  .t-cta table { background-color: ${TOKENS.dark.accent} !important; }
  .t-cta a { background-color: ${TOKENS.dark.accent} !important; color: ${TOKENS.dark.accentText} !important; }
  .t-link, .t-link a { color: ${TOKENS.dark.link} !important; }
  a { color: ${TOKENS.dark.link} !important; }
  .t-logo-light-section { display: none !important; max-height: 0 !important; overflow: hidden !important; }
  .t-logo-dark-section { display: block !important; max-height: none !important; overflow: visible !important; }
${SEVERITIES.map((s) => darkSeverityRules(s, "  ")).join("\n")}
}
[data-ogsc] .t-bg-page, [data-ogsc] .t-bg-page > div, [data-ogsc] .t-bg-page > table { background-color: ${TOKENS.dark.bgPage} !important; }
[data-ogsc] .t-bg-card, [data-ogsc] .t-bg-card > div, [data-ogsc] .t-bg-card > table { background-color: ${TOKENS.dark.bgCard} !important; }
[data-ogsc] .t-text, [data-ogsc] .t-text * { color: ${TOKENS.dark.textPrimary} !important; }
[data-ogsc] .t-text-2, [data-ogsc] .t-text-2 * { color: ${TOKENS.dark.textSecondary} !important; }
[data-ogsc] .t-text-3, [data-ogsc] .t-text-3 * { color: ${TOKENS.dark.textTertiary} !important; }
[data-ogsc] .t-text-brand, [data-ogsc] .t-text-brand * { color: ${TOKENS.dark.textBrand} !important; }
[data-ogsc] .t-cta table { background-color: ${TOKENS.dark.accent} !important; }
[data-ogsc] .t-cta a { background-color: ${TOKENS.dark.accent} !important; }
[data-ogsc] .t-link, [data-ogsc] .t-link a { color: ${TOKENS.dark.link} !important; }
[data-ogsc] .t-logo-light-section { display: none !important; max-height: 0 !important; overflow: hidden !important; }
[data-ogsc] .t-logo-dark-section { display: block !important; max-height: none !important; overflow: visible !important; }
${SEVERITIES.map((s) => darkSeverityRules(s, "", "[data-ogsc] ")).join("\n")}
@media only screen and (max-width: 599px) {
  .t-mobile-stack { width: 100% !important; max-width: 100% !important; display: block !important; }
}
`.trim();

function darkSeverityRules(severity, indent, scope = "") {
  const sev = TOKENS.dark.severity[severity];
  const c = `${scope}.t-sev-${severity}`;
  return [
    `${c}, ${c} > div, ${c} > table { background-color: ${sev.bg} !important; }`,
    `${c}-fg, ${c}-fg * { color: ${sev.fg} !important; }`,
    `${c}-bar > table > tbody > tr > td { border-left-color: ${sev.base} !important; }`,
  ]
    .map((line) => indent + line)
    .join("\n");
}

const LOGO_SECTION_PADDING = `${TOKENS.space[6]} ${TOKENS.space[6]} ${TOKENS.space[4]} ${TOKENS.space[6]}`;
const CARD_SIDES = `${TOKENS.space[6]} ${TOKENS.space[8]} ${TOKENS.space[6]}`;

const DOCUMENT = `<mjml>
  <mj-head>
    <mj-title>{{title}}</mj-title>
    <mj-preview>{{preview}}</mj-preview>
    <mj-raw>
      <meta name="color-scheme" content="light dark" />
      <meta name="supported-color-schemes" content="light dark" />
    </mj-raw>
${Object.entries(WEB_FONTS)
  .map(([name, href]) => `    <mj-font name="${name}" href="${href}" />`)
  .join("\n")}
    <mj-attributes>
      <mj-all font-family="${TOKENS.font.sans}" />
      <mj-text font-size="${TOKENS.fontSize.base}" line-height="1.5" color="${TOKENS.light.textPrimary}" padding="0" />
      <mj-button background-color="${TOKENS.light.accent}" color="${TOKENS.light.accentText}" font-weight="600" border-radius="${TOKENS.radius.md}" font-size="${TOKENS.fontSize.base}" inner-padding="${TOKENS.space[3]} ${TOKENS.space[6]}" />
      <mj-section padding="0" />
    </mj-attributes>
    <mj-style>${STYLE_BLOCK}</mj-style>
  </mj-head>
  <mj-body css-class="t-bg-page" background-color="${TOKENS.light.bgPage}" width="${TOKENS.layout.contentWidth}">
    <mj-section css-class="t-logo-light-section t-bg-card" background-color="${TOKENS.light.bgCard}" padding="${LOGO_SECTION_PADDING}">
      <mj-column>
        <mj-image src="{{logoUrl}}" alt="Scene Ready" width="180px" align="center" padding="0" />
      </mj-column>
    </mj-section>
    <mj-section css-class="t-logo-dark-section" background-color="${TOKENS.dark.bgCard}" padding="${LOGO_SECTION_PADDING}">
      <mj-column>
        <mj-image src="{{logoDarkUrl}}" alt="Scene Ready" width="180px" align="center" padding="0" />
      </mj-column>
    </mj-section>
    [[body]]
    <mj-section css-class="t-bg-page" background-color="${TOKENS.light.bgPage}" padding="${TOKENS.space[6]} ${TOKENS.space[6]}">
      <mj-column>
        <mj-text css-class="t-text-2" align="center" color="${TOKENS.light.textSecondary}" font-size="${TOKENS.fontSize.xs}" line-height="1.5" padding="0">
          Scene Ready &middot; sceneready.tech<br/>
          You're receiving this because you have a Scene Ready account.
        </mj-text>
        [[support]]
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>`;

const card = (paddingTop) => `
    <mj-section css-class="t-bg-card" background-color="${TOKENS.light.bgCard}" padding="${paddingTop} ${CARD_SIDES}">
      <mj-column>
        [[children]]
      </mj-column>
    </mj-section>`;

const severityStrip = (severity) => {
  const sev = TOKENS.light.severity[severity];
  return `
    <mj-section css-class="t-sev-${severity}" background-color="${sev.bg}" padding="0">
      <mj-column css-class="t-sev-${severity}-bar" border-left="4px solid ${sev.base}" padding="${TOKENS.space[3]} ${TOKENS.space[5]}">
        <mj-text css-class="t-sev-${severity}-fg" color="${sev.fg}" font-family="${TOKENS.font.condensed}" font-size="${TOKENS.fontSize.xs}" font-weight="700" letter-spacing="0.08em" padding="0">
          {{label}}
        </mj-text>
      </mj-column>
    </mj-section>`;
};

const headline = (paddingBottom) => `
        <mj-text css-class="t-text-brand" color="${TOKENS.light.textBrand}" font-size="${TOKENS.fontSize["2xl"]}" line-height="1.25" font-weight="700" padding="0 0 ${paddingBottom} 0">
          {{text}}
        </mj-text>`;

const secondaryText = (paddingBottom) => `
        <mj-text css-class="t-text-2" color="${TOKENS.light.textSecondary}" font-size="${TOKENS.fontSize.base}" line-height="1.5" padding="0 0 ${paddingBottom} 0">
          {{text}}
        </mj-text>`;

const button = (padding) => `
        <mj-button css-class="t-cta" href="{{url}}" background-color="${TOKENS.light.accent}" color="${TOKENS.light.accentText}" border-radius="${TOKENS.radius.md}" font-weight="600" font-size="${TOKENS.fontSize.base}" inner-padding="${TOKENS.space[3]} ${TOKENS.space[6]}" align="left"${padding ? ` padding="${padding}"` : ""}>
          {{label}}
        </mj-button>`;

// The rows go straight into mj-table, which renders the <table> itself. A second <table>
// inside it is invalid, and browsers close the card's column early to repair it (#11).
const table = (padding) => `
        <mj-table role="presentation" line-height="1.5" padding="${padding}">
          {{rows}}
        </mj-table>`;

const sectionHeading = (paddingTop) => `
        <mj-text css-class="t-text-brand" color="${TOKENS.light.textBrand}" font-size="${TOKENS.fontSize.lg}" font-weight="700" padding="${paddingTop} 0 ${TOKENS.space[2]} 0">
          {{text}}
        </mj-text>`;

// level: "document" is the whole email; "section" pieces go in [[body]]; "column" pieces go
// in a card's [[children]] or the footer's [[support]].
export const SOURCE = {
  document: { level: "document", mjml: DOCUMENT },
  card: { level: "section", mjml: card(TOKENS.space[4]) },
  alertCard: { level: "section", mjml: card(TOKENS.space[6]) },
  ...Object.fromEntries(
    SEVERITIES.map((s) => [`severityStrip_${s}`, { level: "section", mjml: severityStrip(s) }]),
  ),
  supportLine: {
    level: "column",
    mjml: `
        <mj-text css-class="t-text-2" align="center" color="${TOKENS.light.textSecondary}" font-size="${TOKENS.fontSize.xs}" line-height="1.5" padding="${TOKENS.space[1]} 0 0 0">
          Need help? <a href="mailto:{{email}}" class="t-link" style="color:${TOKENS.light.accent};text-decoration:underline;">{{email}}</a>
        </mj-text>`,
  },
  greeting: {
    level: "column",
    mjml: `
        <mj-text css-class="t-text" color="${TOKENS.light.textPrimary}" font-size="${TOKENS.fontSize.base}" padding="0 0 ${TOKENS.space[3]} 0">
          Hello, {{name}}.
        </mj-text>`,
  },
  headline: { level: "column", mjml: headline(TOKENS.space[3]) },
  headlineSpaced: { level: "column", mjml: headline(TOKENS.space[4]) },
  lead: { level: "column", mjml: secondaryText(TOKENS.space[6]) },
  intro: { level: "column", mjml: secondaryText(TOKENS.space[4]) },
  footnote: {
    level: "column",
    mjml: `
        <mj-text css-class="t-text-2" color="${TOKENS.light.textSecondary}" font-size="${TOKENS.fontSize.xs}" line-height="1.5" padding="${TOKENS.space[4]} 0 0 0">
          {{text}}
        </mj-text>`,
  },
  button: { level: "column", mjml: button(null) },
  buttonFlush: { level: "column", mjml: button("0") },
  buttonSpaced: { level: "column", mjml: button(`${TOKENS.space[6]} 0 0 0`) },
  link: {
    level: "column",
    mjml: `
        <mj-text css-class="t-link" font-size="${TOKENS.fontSize.sm}" padding="${TOKENS.space[3]} 0 0 0">
          <a href="{{url}}" style="color:${TOKENS.light.accent};text-decoration:underline;">{{label}}</a>
        </mj-text>`,
  },
  factsTable: { level: "column", mjml: table(`0 0 ${TOKENS.space[6]} 0`) },
  digestTable: { level: "column", mjml: table("0") },
  sectionHeading: { level: "column", mjml: sectionHeading("0") },
  sectionHeadingSpaced: { level: "column", mjml: sectionHeading(TOKENS.space[6]) },
};

// The same pieces as MJML strings, for composing a whole MJML document to compare against.
export const SOURCE_PIECES = Object.fromEntries(
  Object.entries(SOURCE).map(([name, { mjml }]) => [name, mjml]),
);
