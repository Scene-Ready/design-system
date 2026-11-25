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

  it("leaves page background above the logo", () => {
    const html = wrapSimpleMessage(FIXTURES.simple);
    // A section is a centered 600px div; the body's own wrapper div isn't one.
    const isSection = (el) =>
      el.tagName === "div" && /margin:0px auto/.test(el.attrs.find((a) => a.name === "style")?.value ?? "");
    const firstSection = elements(parse(html)).find(isSection);
    expect(hasClass(firstSection, "t-bg-page")).toBe(true);
    expect(text(firstSection).trim()).toBe("");
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

const RENDERED = [
  ["simple message", () => wrapSimpleMessage(FIXTURES.simple), FIXTURES.simple.cta],
  ["incident alert", () => wrapIncidentAlert(FIXTURES.incident), FIXTURES.incident.cta],
  ["digest", () => wrapDigest(FIXTURES.digest), FIXTURES.digest.cta],
];

const styleOf = (el) => el.attrs.find((a) => a.name === "style")?.value ?? "";
const px = (css, prop) => Number(css.match(new RegExp(`(?:^|;)\\s*${prop}:\\s*(\\d+)px`))?.[1]);

describe.each(RENDERED)("%s follows BRANDING.md", (_, render, cta) => {
  const html = render();
  const els = elements(parse(html));

  it("uses at most two font weights (§5.5)", () => {
    const weights = new Set([...html.matchAll(/font-weight:\s*(\d+)/g)].map((m) => m[1]));
    weights.add("400");
    expect([...weights].sort()).toHaveLength(2);
  });

  it("makes the button at least 44px tall (§11.2)", () => {
    const link = els.find((el) => el.tagName === "a" && text(el).trim() === cta.label);
    const css = styleOf(link);
    const [top, , bottom = top] = css.match(/padding:([^;]+)/)[1].trim().split(/\s+/).map(parseFloat);
    expect(top + bottom + px(css, "line-height")).toBeGreaterThanOrEqual(44);
  });

  it("shows the button's URL as a visible fallback link (§11.2)", () => {
    const url = new URL(cta.url).href;
    const fallback = els.find(
      (el) => el.tagName === "a" && text(el).trim() === url && el.attrs.some((a) => a.name === "href" && a.value === url),
    );
    expect(fallback).toBeDefined();
  });

  it("keeps the dark-mode button rounded", () => {
    // The outer table of a bulletproof button is square; only the cell carries the radius.
    expect(html).not.toMatch(/\.t-cta table\s*\{[^}]*background/);
  });

  it("sets no essential text below 14px (§11.2)", () => {
    // 12px is allowed for the footer and badges only.
    const small = els.filter((el) => px(styleOf(el), "font-size") < 14 && text(el).trim() && px(styleOf(el), "font-size") > 0);
    const allowed = (el) =>
      /display:none/.test(styleOf(el)) || // the inbox preview text
      /Barlow Condensed/.test(styleOf(el)) || // badges and the status strip label
      /t-sev-/.test(el.attrs.find((a) => a.name === "class")?.value ?? "") ||
      /Scene Ready &middot;|Scene Ready ·|receiving this|Need help/.test(text(el)) ||
      /Expires|PDT/.test(text(el)); // digest timestamps (§5.3: xs is for timestamps)
    expect(small.filter((el) => !allowed(el)).map((el) => text(el).trim())).toEqual([]);
  });
});

describe("body text", () => {
  it("sets paragraphs in primary text (§11.1)", () => {
    const paragraphs = [
      [wrapSimpleMessage(FIXTURES.simple), FIXTURES.simple.body[0]],
      [wrapIncidentAlert(FIXTURES.incident), FIXTURES.incident.summary],
      [wrapDigest(FIXTURES.digest), FIXTURES.digest.intro.slice(0, 20)],
    ];
    for (const [html, start] of paragraphs) {
      const els = elements(parse(html)).filter((el) => text(el).includes(start) && /color:/.test(styleOf(el)));
      const innermost = els.at(-1);
      expect(styleOf(innermost)).toMatch(/color:#111827/i);
    }
  });
});

describe("wrapSimpleMessage order", () => {
  it("leads with the headline, then the greeting", () => {
    const card = cardText(wrapSimpleMessage(FIXTURES.simple), FIXTURES.simple.headline);
    expect(card.indexOf(FIXTURES.simple.headline)).toBeLessThan(card.indexOf("Hello,"));
  });
});

describe("wrapDigest badges", () => {
  it("draw a status dot in the base tone (§7)", () => {
    const html = wrapDigest(FIXTURES.digest);
    const badge = elements(parse(html)).find((el) => el.tagName === "span" && text(el).trim() === "Out of service");
    const dot = badge.childNodes.find((c) => c.tagName === "span");
    expect(styleOf(dot)).toMatch(/background-color:#DC2626/i);
    expect(px(styleOf(dot), "width")).toBe(6);
  });
});
