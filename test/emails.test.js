// Runs in workerd: the wrappers must work in a Cloudflare Worker, where mjml can't load.
import { describe, expect, it } from "vitest";
import { parse } from "parse5";

import { wrapDigest, wrapIncidentAlert, wrapSimpleMessage } from "../emails/index.js";
import { FIXTURES } from "../scripts/email-fixtures.js";

// Parse the way a browser or mail client does, so markup a browser would repair shows up.
function elements(node, out = []) {
  for (const child of node.childNodes ?? []) {
    if (child.tagName) out.push(child);
    elements(child.content ?? child, out);
  }
  return out;
}

function text(node) {
  if (node.nodeName === "#text") return node.value;
  return (node.childNodes ?? []).map(text).join("");
}

function hasClass(el, name) {
  const cls = el.attrs.find((a) => a.name === "class")?.value ?? "";
  return cls.split(/\s+/).includes(name);
}

// The card is the t-bg-card section that holds the headline (the logo section shares the class).
// Its first cell carries the card's padding, so content outside that cell loses the card layout.
function cardText(html, headline) {
  const cards = elements(parse(html)).filter(
    (el) => el.tagName === "div" && hasClass(el, "t-bg-card") && text(el).includes(headline),
  );
  expect(cards).toHaveLength(1);
  const paddedCell = elements(cards[0]).find((el) => el.tagName === "td");
  return text(paddedCell);
}

describe("wrapDigest", () => {
  it("renders every section inside the card", () => {
    const input = FIXTURES.digest;
    const card = cardText(wrapDigest(input), input.headline);
    for (const section of input.sections) {
      expect(card).toContain(section.title);
      for (const item of section.items) expect(card).toContain(item.title);
    }
    expect(card).toContain(input.cta.label);
  });
});

describe("wrapIncidentAlert", () => {
  it("renders the facts and both calls to action inside the card", () => {
    const input = FIXTURES.incident;
    const html = wrapIncidentAlert(input);
    const card = cardText(html, input.headline);
    for (const fact of input.facts) expect(card).toContain(fact.value);
    expect(card).toContain(input.cta.label);
    expect(card).toContain(input.secondaryCta.label);
    expect(html).toContain(input.badgeLabel.toUpperCase());
  });
});

describe("wrapSimpleMessage", () => {
  it("renders the greeting, body, button and footnote inside the card", () => {
    const input = FIXTURES.simple;
    const card = cardText(wrapSimpleMessage(input), input.headline);
    expect(card).toContain(`Hello, ${input.recipientName}.`);
    for (const p of input.body) expect(card).toContain(p);
    expect(card).toContain(input.cta.label);
    expect(card).toContain(input.footnote);
  });

  it("lines the button up with the text", () => {
    const cells = elements(parse(wrapSimpleMessage(FIXTURES.simple))).filter((el) => el.tagName === "td");
    const style = (cls) => cells.find((el) => hasClass(el, cls)).attrs.find((a) => a.name === "style").value;
    const paddingLeft = (css) => css.match(/padding:([^;]+)/)[1].trim().split(/\s+/).at(-1);
    expect(paddingLeft(style("t-cta"))).toBe(paddingLeft(style("t-text-brand")));
  });

  it("escapes HTML in user content", () => {
    const html = wrapSimpleMessage({
      ...FIXTURES.simple,
      subject: "<script>alert(1)</script>",
      headline: 'Crew "A" & <b>Engine</b> {{body}}',
    });
    expect(html).not.toContain("<script>alert(1)");
    expect(html).toContain("&lt;script&gt;alert(1)&lt;/script&gt;");
    expect(html).toContain("Crew &quot;A&quot; &amp; &lt;b&gt;Engine&lt;/b&gt; {{body}}");
  });

  it("rejects a javascript: button URL", () => {
    expect(() =>
      wrapSimpleMessage({ ...FIXTURES.simple, cta: { label: "Go", url: "javascript:alert(1)" } }),
    ).toThrow(/rejected protocol/);
  });
});
