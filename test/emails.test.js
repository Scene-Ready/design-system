// Runs in workerd: the wrappers must work in a Cloudflare Worker, where mjml can't load.
import { describe, expect, it } from "vitest";
import { parse } from "parse5";

import { wrapDigest, wrapIncidentAlert, wrapSimpleMessage } from "../emails/index.js";
import { FIXTURES } from "../scripts/email-fixtures.js";
import { TOKENS } from "../emails/tokens.js";

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

const styleOf = (el) => el.attrs?.find((a) => a.name === "style")?.value ?? "";
const classOf = (el) => el.attrs?.find((a) => a.name === "class")?.value ?? "";
function ancestors(el) {
  const out = [];
  for (let node = el.parentNode; node; node = node.parentNode) out.push(node);
  return out;
}
// The footer is the last section: a page-coloured 600px div, after the card.
const isFooter = (node) => node.tagName === "div" && /(^|\s)t-bg-page(\s|$)/.test(classOf(node)) && /margin:0px auto/.test(styleOf(node)) && /sceneready\.tech/.test(text(node));
const px = (css, prop) => Number(css.match(new RegExp(`(?:^|;)\\s*${prop}:\\s*(\\d+)px`))?.[1]);

describe.each(RENDERED)("%s follows BRANDING.md", (_, render, cta) => {
  const html = render();
  const els = elements(parse(html));

  it("sets text in 400 with 600 for bold (§5.5, §11.1)", () => {
    const weights = new Set([...html.matchAll(/font-weight:\s*(\d+)/g)].map((m) => m[1]));
    weights.add("400");
    expect([...weights].sort()).toEqual(["400", "600"]);
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

  it("falls back to Arial in its font stacks, and links no Roboto (§5.2)", () => {
    const stacks = new Set([...html.matchAll(/font-family:\s*([^;"]+)/g)].map((m) => m[1].trim()));
    for (const stack of stacks) if (/Barlow/.test(stack)) expect(stack).toMatch(/Arial/);
    expect(html).not.toMatch(/family=Roboto/);
  });

  it("sets text on the §5.3 scale: 16px at 1.6, 24px at 1.3", () => {
    const lineHeights = (size) =>
      new Set(
        els
          .map(styleOf)
          .filter((css) => px(css, "font-size") === size && /line-height:/.test(css))
          .map((css) => css.match(/line-height:\s*([^;]+)/)[1].trim()),
      );
    expect([...lineHeights(16)].filter((lh) => !lh.endsWith("px"))).toEqual(["1.6"]);
    expect([...lineHeights(24)]).toEqual(["1.3"]);
  });

  it("shows the logo lockup at least 160px wide (§3)", () => {
    // The lockup files include clear space: the artwork is about 70% of the image width.
    const logo = els.find((el) => el.tagName === "img" && el.attrs.some((a) => a.name === "alt" && a.value === "Scene Ready"));
    const width = Number(logo.attrs.find((a) => a.name === "width").value);
    expect(width * 0.7).toBeGreaterThanOrEqual(160);
  });

  it("keeps the dark-mode button rounded", () => {
    // The outer table of a bulletproof button is square; only the cell carries the radius.
    expect(html).not.toMatch(/\.t-cta table\s*\{[^}]*background/);
  });

  it("sets no essential text below 14px (§11.2)", () => {
    // 12px is allowed only for the footer, status labels and metadata lines, by role.
    const smallRoles = (el) =>
      [el, ...ancestors(el)].some(
        (node) =>
          isFooter(node) ||
          /display:none/.test(styleOf(node)) || // the inbox preview text
          /(^|\s)(t-sev-\w+|t-meta)(\s|$)/.test(classOf(node)),
      );
    const small = els.filter((el) => px(styleOf(el), "font-size") > 0 && px(styleOf(el), "font-size") < 14 && text(el).trim());
    expect(small.filter((el) => !smallRoles(el)).map((el) => text(el).trim())).toEqual([]);
  });

  it("requests only the font weights it uses", () => {
    const used = new Set([...html.matchAll(/font-weight:\s*(\d+)/g)].map((m) => m[1]).concat("400"));
    const requested = [...html.matchAll(/family=[^"&]*wght@([\d;]+)/g)].flatMap((m) => m[1].split(";"));
    expect(requested.length).toBeGreaterThan(0);
    for (const w of requested) expect(used).toContain(w);
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
      expect(styleOf(innermost).toLowerCase()).toContain(`color:${TOKENS.light.textPrimary.toLowerCase()}`);
    }
  });
});

describe("wrapSimpleMessage order", () => {
  it("leads with the headline, then the greeting", () => {
    const card = cardText(wrapSimpleMessage(FIXTURES.simple), FIXTURES.simple.headline);
    expect(card.indexOf(FIXTURES.simple.headline)).toBeLessThan(card.indexOf("Hello,"));
  });
});

const badgeIn = (html, label) => elements(parse(html)).find((el) => el.tagName === "span" && text(el).trim() === label);

describe("wrapDigest badges", () => {
  it("draw a 6px status dot in the mark colour (§7)", () => {
    const badge = badgeIn(wrapDigest(FIXTURES.digest), "OOS");
    const dot = badge.childNodes.find((c) => c.tagName === "span");
    expect(styleOf(dot).toLowerCase()).toContain(`background-color:${TOKENS.light.severity.danger.base.toLowerCase()}`);
    expect(px(styleOf(dot), "width")).toBe(6);
  });

  it("render a neutral badge, for states such as ARCHIVED (§7)", () => {
    const html = wrapDigest({
      ...FIXTURES.digest,
      sections: [{ title: "Incidents", items: [{ title: "Brush fire — Ridge Rd", badge: { label: "Archived", severity: "neutral" } }] }],
    });
    const badge = badgeIn(html, "Archived");
    expect(styleOf(badge).toLowerCase()).toContain(`color:${TOKENS.light.severity.neutral.fg.toLowerCase()}`);
  });
});

describe("uppercase labels", () => {
  it.each([
    ["incident strip", () => wrapIncidentAlert(FIXTURES.incident)],
    ["digest badges", () => wrapDigest(FIXTURES.digest)],
  ])("%s track at --tracking-caps (§5.5, §7)", (_, render) => {
    const tracking = elements(parse(render()))
      .map(styleOf)
      .filter((css) => /Barlow Condensed/.test(css) && /letter-spacing/.test(css))
      .map((css) => css.match(/letter-spacing:\s*([^;]+)/)[1].trim());
    expect(tracking.length).toBeGreaterThan(0);
    expect(new Set(tracking)).toEqual(new Set([TOKENS.tracking.caps]));
  });
});
