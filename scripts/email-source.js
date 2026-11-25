// MJML source for the email wrappers' pieces. `npm run build:emails` compiles each piece to
// HTML in emails/compiled.js, so the wrappers never run mjml.
//
// Slots: {{name}} takes escaped text or a URL; [[name]] takes child pieces (more MJML here,
// compiled HTML at runtime). Compose pieces with `fill` from emails/compose.js.
//
// Each piece is compiled on its own. Column pieces are compiled inside a card, so they
// assume the card's width; every card has the same side padding.

import { TOKENS, SEVERITIES } from "../emails/tokens.js";
import { WEB_FONTS } from "../emails/compose.js";

const D = TOKENS.dark;
const important = (decls) => decls.map((d) => `${d} !important;`).join(" ");
const HIDE = ["display: none", "max-height: 0", "overflow: hidden"];
const SHOW = ["display: block", "max-height: none", "overflow: visible"];

// Dark mode, as [selectors, declarations]. Applied twice: under prefers-color-scheme, and
// under Outlook's [data-ogsc] (which ignores the media query).
const DARK_RULES = [
  [["body", ".t-bg-page", ".t-bg-page > div", ".t-bg-page > table"], [`background-color: ${D.bgPage}`]],
  [[".t-bg-card", ".t-bg-card > div", ".t-bg-card > table"], [`background-color: ${D.bgCard}`]],
  [[".t-text", ".t-text *"], [`color: ${D.textPrimary}`]],
  [[".t-text-2", ".t-text-2 *"], [`color: ${D.textSecondary}`]],
  [[".t-text-3", ".t-text-3 *"], [`color: ${D.textTertiary}`]],
  [[".t-text-brand", ".t-text-brand *"], [`color: ${D.textBrand}`]],
  [[".t-border"], [`border-color: ${D.border}`]],
  [[".t-divider"], [`border-color: ${D.divider}`]],
  [[".t-cta a"], [`background-color: ${D.accent}`, `color: ${D.accentText}`]],
  [["a", ".t-link", ".t-link a"], [`color: ${D.link}`]],
  [[".t-logo-light-section"], HIDE],
  [[".t-logo-dark-section"], SHOW],
  ...SEVERITIES.flatMap((severity) => {
    const sev = D.severity[severity];
    const c = `.t-sev-${severity}`;
    return [
      [[c, `${c} > div`, `${c} > table`], [`background-color: ${sev.bg}`]],
      [[`${c}-fg`, `${c}-fg *`], [`color: ${sev.fg}`]],
      [[`${c}-bar > table > tbody > tr > td`], [`border-left-color: ${sev.base}`]],
      [[`${c}-dot`], [`background-color: ${sev.base}`]],
    ];
  }),
];

const darkRules = (scope, indent) =>
  DARK_RULES.map(([selectors, decls]) => {
    const scoped = selectors.filter((sel) => !(scope && sel === "body")).map((sel) => scope + sel);
    return `${indent}${scoped.join(", ")} { ${important(decls)} }`;
  }).join("\n");

const STYLE_BLOCK = `
:root { color-scheme: light dark; supported-color-schemes: light dark; }
body, html { margin: 0; padding: 0; }
a { color: ${TOKENS.light.link}; text-decoration: underline; }
.t-logo-dark-section { display: none !important; mso-hide: all; max-height: 0; overflow: hidden; }
@media (prefers-color-scheme: dark) {
${darkRules("", "  ")}
}
${darkRules("[data-ogsc] ", "")}
@media only screen and (max-width: 599px) {
  .t-mobile-stack { width: 100% !important; max-width: 100% !important; display: block !important; }
}
`.trim();

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
      <mj-text font-size="${TOKENS.fontSize.base}" line-height="1.6" color="${TOKENS.light.textPrimary}" padding="0" />
      <mj-button background-color="${TOKENS.light.accent}" color="${TOKENS.light.accentText}" font-weight="600" border-radius="${TOKENS.radius.md}" font-size="${TOKENS.fontSize.base}" inner-padding="${TOKENS.space[3]} ${TOKENS.space[6]}" />
      <mj-section padding="0" />
    </mj-attributes>
    <mj-style>${STYLE_BLOCK}</mj-style>
  </mj-head>
  <mj-body css-class="t-bg-page" background-color="${TOKENS.light.bgPage}" width="${TOKENS.layout.contentWidth}">
    <mj-section css-class="t-bg-page" background-color="${TOKENS.light.bgPage}" padding="${TOKENS.space[6]} 0 0 0"></mj-section>
    <mj-section css-class="t-logo-light-section t-bg-card" background-color="${TOKENS.light.bgCard}" padding="${LOGO_SECTION_PADDING}">
      <mj-column>
        <mj-image src="{{logoUrl}}" alt="Scene Ready" width="240px" align="center" padding="0" />
      </mj-column>
    </mj-section>
    <mj-section css-class="t-logo-dark-section" background-color="${TOKENS.dark.bgCard}" padding="${LOGO_SECTION_PADDING}">
      <mj-column>
        <mj-image src="{{logoDarkUrl}}" alt="Scene Ready" width="240px" align="center" padding="0" />
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
        <mj-text css-class="t-sev-${severity}-fg" color="${sev.fg}" font-family="${TOKENS.font.condensed}" font-size="${TOKENS.fontSize.xs}" font-weight="600" letter-spacing="${TOKENS.tracking.caps}" padding="0">
          {{label}}
        </mj-text>
      </mj-column>
    </mj-section>`;
};

const headline = `
        <mj-text css-class="t-text-brand" color="${TOKENS.light.textBrand}" font-size="${TOKENS.fontSize["2xl"]}" line-height="1.3" font-weight="600" padding="0 0 ${TOKENS.space[3]} 0">
          {{text}}
        </mj-text>`;

const bodyText = (paddingBottom) => `
        <mj-text css-class="t-text" color="${TOKENS.light.textPrimary}" font-size="${TOKENS.fontSize.base}" line-height="1.6" padding="0 0 ${paddingBottom} 0">
          {{text}}
        </mj-text>`;

const button = (padding) => `
        <mj-button css-class="t-cta" href="{{url}}" background-color="${TOKENS.light.accent}" color="${TOKENS.light.accentText}" border-radius="${TOKENS.radius.md}" font-weight="600" font-size="${TOKENS.fontSize.base}" inner-padding="${TOKENS.space[3]} ${TOKENS.space[6]}" line-height="${TOKENS.space[6]}" align="left" padding="${padding}">
          {{label}}
        </mj-button>`;

// The rows go straight into mj-table, which renders the <table> itself. A second <table>
// inside it is invalid, and browsers close the card's column early to repair it (#11).
const table = (padding) => `
        <mj-table role="presentation" font-size="${TOKENS.fontSize.sm}" line-height="1.5" padding="${padding}">
          {{rows}}
        </mj-table>`;

const sectionHeading = (paddingTop) => `
        <mj-text css-class="t-text-brand" color="${TOKENS.light.textBrand}" font-size="${TOKENS.fontSize.lg}" line-height="1.5" font-weight="600" padding="${paddingTop} 0 ${TOKENS.space[2]} 0">
          {{text}}
        </mj-text>`;

// level: "document" is the whole email; "section" pieces go in [[body]]; "column" pieces go
// in a card's [[children]] or the footer's [[support]]. A plain object groups variants.
export const SOURCE = {
  document: { level: "document", mjml: DOCUMENT },
  // Cards differ only in top padding: 16px under the logo, 24px under the status strip.
  cardUnderLogo: { level: "section", mjml: card(TOKENS.space[4]) },
  cardUnderStrip: { level: "section", mjml: card(TOKENS.space[6]) },
  severityStrip: Object.fromEntries(SEVERITIES.map((s) => [s, { level: "section", mjml: severityStrip(s) }])),
  supportLine: {
    level: "column",
    mjml: `
        <mj-text css-class="t-text-2" align="center" color="${TOKENS.light.textSecondary}" font-size="${TOKENS.fontSize.xs}" line-height="1.5" padding="${TOKENS.space[1]} 0 0 0">
          Need help? <a href="mailto:{{email}}" class="t-link" style="color:${TOKENS.light.accent};text-decoration:underline;">{{email}}</a>
        </mj-text>`,
  },
  headline: { level: "column", mjml: headline },
  greeting: {
    level: "column",
    mjml: `
        <mj-text css-class="t-text" color="${TOKENS.light.textPrimary}" font-size="${TOKENS.fontSize.base}" padding="0 0 ${TOKENS.space[3]} 0">
          Hello, {{name}}.
        </mj-text>`,
  },
  // Paragraphs before a button or table (24px below); the digest intro sits closer to its
  // first section heading (16px).
  bodyText: { level: "column", mjml: bodyText(TOKENS.space[6]) },
  digestIntro: { level: "column", mjml: bodyText(TOKENS.space[4]) },
  footnote: {
    level: "column",
    mjml: `
        <mj-text css-class="t-text-2" color="${TOKENS.light.textSecondary}" font-size="${TOKENS.fontSize.sm}" line-height="1.5" padding="${TOKENS.space[4]} 0 0 0">
          {{text}}
        </mj-text>`,
  },
  // The digest's button follows a table, so it carries its own 24px above.
  button: { level: "column", mjml: button("0") },
  digestButton: { level: "column", mjml: button(`${TOKENS.space[6]} 0 0 0`) },
  // §11.2: every button has a visible fallback URL, for clients that block buttons.
  fallbackLink: {
    level: "column",
    mjml: `
        <mj-text css-class="t-text-2" color="${TOKENS.light.textSecondary}" font-size="${TOKENS.fontSize.sm}" line-height="1.5" padding="${TOKENS.space[2]} 0 0 0">
          Button not working? Open <a href="{{url}}" class="t-link" style="color:${TOKENS.light.accent};text-decoration:underline;word-break:break-all;">{{url}}</a>
        </mj-text>`,
  },
  link: {
    level: "column",
    mjml: `
        <mj-text css-class="t-link" font-size="${TOKENS.fontSize.sm}" line-height="1.5" padding="${TOKENS.space[3]} 0 0 0">
          <a href="{{url}}" style="color:${TOKENS.light.accent};text-decoration:underline;">{{label}}</a>
        </mj-text>`,
  },
  factsTable: { level: "column", mjml: table(`0 0 ${TOKENS.space[6]} 0`) },
  digestTable: { level: "column", mjml: table("0") },
  firstSectionHeading: { level: "column", mjml: sectionHeading("0") },
  sectionHeading: { level: "column", mjml: sectionHeading(TOKENS.space[6]) },
};

// The same pieces as MJML strings, for composing a whole MJML document to compare against.
const mjmlOf = (entry) =>
  entry.level ? entry.mjml : Object.fromEntries(Object.entries(entry).map(([k, v]) => [k, mjmlOf(v)]));
export const SOURCE_PIECES = mjmlOf(SOURCE);
