# Scene Ready — Brand Guide

> **Scope**: the brand for everything Scene Ready produces: web applications, marketing websites, email, printed documents, presentations and social media.
>
> **How to use it**: Part 1 (Foundation) applies everywhere. Part 2 (Media) applies the foundation to each kind of output. Part 3 (Reference) holds the tokens and assets to build from. This file, published in `@scene-ready/design-system`, is the only copy: products link to it (`node_modules/@scene-ready/design-system/BRANDING.md`) and keep no copy of their own. A product guide (such as RigPrep's `docs/branding.md`) may add product rules on top, but never contradicts this one.
>
> **Source of values**: [`tokens.css`](./tokens.css) is the canonical source for token values; this document is the canonical source for how to use them. When building UI, reference token names. Never hardcode hex codes or pixel values.

---

## Contents

**Part 1 — Foundation**
1. [Brand Identity](#1-brand-identity)
2. [Voice & Tone](#2-voice--tone)
3. [Logo](#3-logo)
4. [Color](#4-color)
5. [Typography](#5-typography)
6. [Iconography & Imagery](#6-iconography--imagery)
7. [Status Language](#7-status-language)
8. [Accessibility](#8-accessibility)

**Part 2 — Media**
9. [Web Applications](#9-web-applications)
10. [Marketing Websites](#10-marketing-websites)
11. [Email](#11-email)
12. [Printed Documents](#12-printed-documents)
13. [Presentations](#13-presentations)
14. [Social Media & Avatars](#14-social-media--avatars)

**Part 3 — Reference**
15. [Design Tokens](#15-design-tokens)
16. [Asset Inventory](#16-asset-inventory)
17. [Do's and Don'ts](#17-dos-and-donts)

---

# Part 1 — Foundation

## 1. Brand Identity

| | |
|---|---|
| **Company** | Scene Ready |
| **Tagline** | Prepared to Perform. |
| **Domains** | `sceneready.tech`: the company and marketing site. `sceneready.app`: the products (`platform.sceneready.app`, `auth.sceneready.app` …) |
| **Industries served** | Fire, EMS, Search & Rescue |
| **Product modules** | Plans, Crew, Gear, Comms |

### Name usage
- Write **Scene Ready**: two words, both capitalized. Never "SceneReady", "Scene-Ready", or "SR" in customer-facing copy.
- The wordmark is set in all caps (**SCENE READY**) with wide letter-spacing. Running text uses title case.
- Product names follow the parent name: "Scene Ready Scheduler", or just "Scheduler" once the context is clear.
- The tagline always ends with a period: **Prepared to Perform.** In the logo lockup, where it's set in all caps, drop the period: PREPARED TO PERFORM.

### Brand attributes
| We are… | …not |
|---|---|
| **Confident**: we speak with earned authority | Arrogant |
| **Direct**: clear, with no corporate fluff | Cold |
| **Mission-driven**: we equip people and don't lecture them | Preachy |
| **Professional**: serious tools with human warmth | Sterile |

### Design principles
1. **Built for the worst moment.** People use our work during emergencies, at night, in apparatus cabs, wearing gloves. Choose legibility, contrast and large targets over decoration.
2. **Navy leads, red points.** Navy carries the brand. Red is a pointer that says "act here" or "this matters". It is never wallpaper.
3. **State is never color alone.** Every status pairs color with text, and ideally an icon too. It has to survive grayscale printing, color blindness and sunlight glare.
4. **Speak the crew's language.** Use fire, EMS and SAR terms, not generic SaaS vocabulary.

---

## 2. Voice & Tone

### Core rules (all media)
- Use active voice and direct language.
- Use fire/EMS/SAR terms naturally: **Crew** not "Users", **Apparatus** not "Vehicle", **On Duty** not "Available", **Preplan**, **Incident**, **Station**, **Shift**.
- Avoid jargon from other industries: *stakeholders, synergy, circle back, leverage, bandwidth*.
- Never be playful about errors or risk: no "Oops!", "Uh oh!", "Whoops", or emoji in error states. This is software used during emergencies.
- Keep confirmations professional: "Preplan saved." not "Nice work! 🎉".
- Be specific and actionable: "Shift end time must be after start time." not "Invalid input."

### Tone by medium
| Medium | Tone | Example |
|---|---|---|
| App UI labels | Terse, imperative | "Save Preplan", "Assign Crew" |
| App errors | Specific cause and fix | "Certification expired on 3/14. Upload a renewal to restore this member to the roster." |
| Transactional email | Brief. Say what happened, what to do, and when it expires | "Click the button below to reset your password. This link expires in 1 hour." |
| Marketing web | Confident and outcome-focused, with short sentences | "Every crew. Every shift. Ready before the tones drop." |
| Print / training docs | Instructional and procedural, numbered steps | "1. Anchor the main line. 2. Confirm the edge protection." |
| Social | Direct and respectful of the work. Never exploit real incidents | "Congrats to the 40 members of Station 3 who completed rope ops certification this month." |

### Mechanics
- **Case**: Title Case for buttons, page titles and nav items. Sentence case for body text, helper text and email subject lines.
- **Numbers**: use numerals ("3 crews", "24-hour shift"). Use 24-hour time in operational contexts (`07:00`); 12-hour time is fine in marketing.
- **Dates**: use unambiguous formats in operational data (`2026-09-13` or `13 Sep 2026`). Avoid bare `9/13` in anything that gets exported or printed.
- **Emphasis**: use SemiBold or color. **Never italics** in UI. Italics are acceptable in long-form print for titles of publications only.
- **Abbreviations**: use industry-standard ones freely (EMS, SAR, OOS, HSEEP, NFPA, SCBA). Spell out others on first use.

---

## 3. Logo

### The Chevron Mark
A pair of upward-pointing chevrons, navy over red. They stand for forward motion, rank and readiness; chevrons are a familiar rank insignia in fire and EMS.

### Variants
| Variant | Description | Use for | Asset |
|---|---|---|---|
| **Parent lockup** | Chevron pair + "SCENE READY" wordmark + red rule + tagline | Website header, letterhead, cover pages, shared materials | `scene-ready-brandmark.svg` |
| **Parent lockup, reversed** | White upper chevron and wordmark, red lower chevron | Navy/dark backgrounds, dark photos | `scene-ready-brandmark-reversed.svg` |
| **Icon only** | Chevron pair, no text | App sidebars, patches, tight spaces | `scene-ready-icon.svg` / `-icon-reversed.svg` |
| **App icon** | Reversed chevrons on a navy rounded square (rx = 96/512) | iOS/Android/PWA icons, desktop shortcuts | `scene-ready-appicon.svg` |
| **Favicon / avatar** | Reversed chevrons on a navy circle | Browser tabs, social avatars | `scene-ready-favicon.svg`, `favicon.ico` |
| **Wordmark only** | "SCENE READY" text | Email signatures, tight horizontal spaces | Set in type (below) |
| **Technology mark** | Dual chevron with data nodes and connections | Software product family | Planned — no asset yet |
| **Training mark** | Triple stacked chevron + arrow | Training, certification, education | Planned — no asset yet |

### SVG icon mark (inline use)
This is the same artwork as `assets/scene-ready-icon.svg`; if one changes, change the other.

```svg
<svg viewBox="0 0 100 100">
  <path d="M 50 12 L 88 44 L 88 58 L 50 28 L 12 58 L 12 44 Z" fill="#1B2A4A"/>
  <path d="M 50 38 L 88 70 L 88 84 L 50 54 L 12 84 L 12 70 Z" fill="#C8102E"/>
</svg>
```

**Reversed (on dark backgrounds)**:
```svg
<svg viewBox="0 0 100 100">
  <path d="M 50 12 L 88 44 L 88 58 L 50 28 L 12 58 L 12 44 Z" fill="#FFFFFF"/>
  <path d="M 50 38 L 88 70 L 88 84 L 50 54 L 12 84 L 12 70 Z" fill="#C8102E"/>
</svg>
```

**The red chevron is always red**, in every variant, on every background. Only the upper chevron swaps between navy and white.

### Wordmark lockup
- Wordmark: Barlow **700**, all caps, letter-spacing ≈ 0.14em (5px at 36px), navy (or white when reversed).
- Rule: 1.5px Red 700 line under the wordmark, spanning about 60% of its width.
- Tagline: Barlow **400**, all caps, letter-spacing ≈ 0.27em (3px at 11px), Gray 400 (or white at 50% when reversed).
- The icon sits to the left of the wordmark; its height roughly spans the wordmark cap height plus the tagline.
- The text in the brandmark files is outlined (paths, not `<text>`), so the lockup renders the same in email clients, Office, print RIPs and design tools with no font installed.
- **Typeset wordmark** (where images are blocked or a lockup won't fit): Barlow Condensed 700, 18–20px, letter-spacing `--tracking-eyebrow` (0.1em), uppercase, navy or white. The lockup's wider spacing (0.14em, 0.27em) is drawn into the artwork; text never copies it.

### Clear space and minimum size
| | Rule |
|---|---|
| Clear space | At least **the height of one chevron** on all sides |
| Full lockup, minimum | **160px** wide on screen / **40mm** in print |
| Icon only, minimum | **24px** on screen / **6mm** in print |
| Favicon | 16px (use `scene-ready-favicon.svg`; the navy disc keeps it legible) |

### Backgrounds
| Background | Use |
|---|---|
| White, Gray 50, Navy 50 | Standard mark |
| Navy 700 / Navy 900 / black | Reversed mark |
| Photography | Reversed mark, only over a **≥ 60% dark overlay** or a clearly dark, uncluttered area |
| Red, or any semantic color | ❌ Never. Put the mark on a white or navy panel instead |

### Misuse
Don't rotate, skew, stretch or re-proportion the mark. Don't recolor either chevron. Don't add drop shadows, glows, outlines, gradients or bevels. Don't place it on busy imagery. Don't rebuild it from other shapes.

---

## 4. Color

All values below live in [`tokens.css`](./tokens.css). Reference the token, not the hex.

### 4.1 Brand palette
| Token | Hex | RGB | Role |
|---|---|---|---|
| Navy 950 `--navy-950` | `#0A1220` | 10 18 32 | Dark-mode sidebar only |
| Navy 900 `--navy-900` | `#0F1A30` | 15 26 48 | Dark-mode page background, deepest surfaces |
| **Navy 700** ★ `--navy-700` | `#1B2A4A` | 27 42 74 | **Primary brand color**: headings, nav, sidebar, header bands |
| Navy 500 `--navy-500` | `#2A3F6A` | 42 63 106 | Focus rings (light), hover states, dark-mode elevated surfaces |
| Navy 300 `--navy-300` | `#4A6491` | 74 100 145 | Decorative accents, chart secondary |
| Navy 100 `--navy-100` | `#C5D0E0` | 197 208 224 | Tints, tag backgrounds, table zebra (print) |
| Navy 50 `--navy-50` | `#E8ECF2` | 232 236 242 | Subtle panels, callout backgrounds |
| Red 900 `--red-900` | `#9A0C24` | 154 12 36 | Primary button hover |
| **Red 700** ★ `--red-700` | `#C8102E` | 200 16 46 | **Brand accent**: primary buttons (both modes), active indicators, accent rules, light-mode links |
| Red 500 `--red-500` | `#E8334E` | 232 51 78 | Decorative accent on dark backgrounds; not for text or button fills |
| Red 300 `--red-300` | `#F28C9A` | 242 140 154 | Dark-mode links and accent text; dark-mode focus ring |
| Red 100 `--red-100` | `#FCE4E8` | 252 228 232 | Subtle red tint |
| Red 50 `--red-50` | `#FFF1F3` | 255 241 243 | Barely-red tint |

### 4.2 Neutrals
| Token | Hex | Role |
|---|---|---|
| Gray 900 `--gray-900` | `#111827` | Primary text (light) |
| Gray 800 `--gray-800` | `#1F2937` | Bold secondary text |
| Gray 700 `--gray-700` | `#374151` | Emphasized secondary text |
| Gray 650 `--gray-650` | `#4B5563` | Neutral status text on tints |
| Gray 600 `--gray-600` | `#6B7280` | Secondary text, labels, timestamps, icons (light) |
| Gray 500 `--gray-500` | `#8B95A5` | Input borders (3:1 on white) |
| Gray 400 `--gray-400` | `#9CA3AF` | Placeholders and decorative text (light, **not for essential text**); secondary and tertiary text (dark) |
| Gray 300 `--gray-300` | `#D1D5DB` | Dividers; dark-mode neutral status text |
| Gray 200 `--gray-200` | `#E5E7EB` | Card borders, table dividers |
| Gray 100 `--gray-100` | `#F3F4F6` | Disabled backgrounds, alternate rows; dark-mode primary text |
| Gray 50 `--gray-50` | `#F9FAFB` | Page background (light) |
| White `--white` | `#FFFFFF` | Cards, inputs |

### 4.3 Semantic (status) colors
Status colors carry meaning; they are not decoration. Each status has four tones:

| Status | Base (dots, icons, borders) | Text, light (`-dark`) | Tint (`-bg`) | Lifted, dark (`-light`) | Text, dark | Meaning |
|---|---|---|---|---|---|---|
| Success | `#059669` | `#047857` | `#ECFDF5` | `#34D399` | `#34D399` | Saved, passed, current, on duty, in service |
| Warning | `#D97706` | `#B45309` | `#FFFBEB` | `#FBBF24` | `#FBBF24` | Expiring, maintenance due, conflict, responding |
| Danger | `#DC2626` | `#B91C1C` | `#FEF2F2` | `#F87171` | `#FCA5A5` (`--danger-pale`) | Failed, expired, error, out of service |
| Info | `#2563EB` | `#1D4ED8` | `#EFF6FF` | `#60A5FA` | `#93C5FD` (`--info-pale`) | New assignment, update, in training |
| Neutral | `#6B7280` | `#4B5563` | `#F3F4F6` | `#9CA3AF` | `#D1D5DB` | Off duty, inactive, archived |

**For status text, use the mode-aware aliases** `--success-fg` … `--neutral-fg` on `--success-surface` … `--neutral-surface`. They resolve to the text tones above in each mode, so badge and banner text passes WCAG AA in both. **The base tone fails AA as small text on its tint** (success 3.6:1, warning 3.1:1); use it for fills that stay the same in both modes (the danger button). **For dots, bars, icons and borders, use the mode-aware `--success-mark` … `--neutral-mark`**: the base tone in light mode, the lifted tone in dark mode, where the base tones fall under 3:1 on Navy 700 (info 2.8:1, danger 2.9:1). The `-bg` primitives are light-only and glare on dark surfaces; the `-surface` aliases switch to translucent tints in dark mode.

| Status | Surface token | Text token |
|---|---|---|
| Success | `--success-surface` | `--success-fg` |
| Warning | `--warning-surface` | `--warning-fg` |
| Danger | `--danger-surface` | `--danger-fg` |
| Info | `--info-surface` | `--info-fg` |
| Neutral | `--neutral-surface` | `--neutral-fg` |

**Rules**
- Never use brand navy or red as a status color, with one exception: the Brand status (§7), which marks a unit On Scene. Brand red is not "danger"; danger is `#DC2626`.
- Use no more than one semantic color per component.
- Semantic colors cover less than 5% of any screen or page.

### 4.4 Proportions
| Color | Share | Where |
|---|---|---|
| White / Gray 50 | 60–70% | Backgrounds, content areas |
| Navy 700 | 15–20% | Navigation, headers, headings |
| Grays | 10–15% | Body text, borders |
| Red 700 | 5–10% | CTAs, active states, accent rules |
| Semantic | < 5% | Status only |

Never use Red 700 for large background fills.

### 4.5 Print color (starting values)
| Color | Hex | CMYK (naive conversion; **proof before press**) | Pantone candidate |
|---|---|---|---|
| Navy 700 | `#1B2A4A` | 64 / 43 / 0 / 71 | PMS 2767 C (closest; verify against a swatch book) |
| Navy 900 | `#0F1A30` | 69 / 46 / 0 / 81 | — |
| Red 700 | `#C8102E` | 0 / 92 / 77 / 22 | **PMS 186 C** |
| Gray 600 | `#6B7280` | 16 / 11 / 0 / 50 | Cool Gray 9 C (approximate) |
| Success | `#059669` | 97 / 0 / 30 / 41 | — |
| Warning | `#D97706` | 0 / 45 / 97 / 15 | — |
| Danger | `#DC2626` | 0 / 83 / 83 / 14 | — |

The CMYK values are mechanical conversions, not press-matched builds. For anything printed in volume (patches, apparatus decals, banners), have the printer match **PMS 186 C** for red and approve a navy drawdown.

---

## 5. Typography

### 5.1 Typefaces
| Role | Token | Typeface | Weights shipped | Use |
|---|---|---|---|---|
| **Primary** | `--font-sans` | **Barlow** | 400, 500, 600, 700, 800 (800 display only) | Headings, body, buttons, inputs, wordmark |
| **Condensed** | `--font-condensed` | **Barlow Condensed** | 400, 500, 600, 700 | Uppercase labels, table headers, tags, badges, metadata, typeset wordmark |
| **Mono** | `--font-mono` | **JetBrains Mono** | 400, 500 | Numeric table data, timestamps, IDs, unit numbers, code |

All three are free under the SIL Open Font License. **Apps self-host them**, never from Google Fonts or another CDN, so they make no third-party requests and work offline. The package ships them in `fonts/` (Latin and Latin Extended, woff2). `scene-ready-brand-assets` copies them to `/fonts/` in the app's static root, and every app links the same stylesheet:

```html
<link rel="stylesheet" href="/fonts/fonts.css">
```

A bundled app may import `@scene-ready/design-system/fonts.css` instead. Use only the shipped weights; a weight that isn't shipped is faked by the browser. For print or desktop work, install the fonts locally.

### 5.2 Fallback stacks by environment
| Environment | Sans | Condensed | Mono |
|---|---|---|---|
| Web / apps | `'Barlow', system-ui, -apple-system, sans-serif` | `'Barlow Condensed', system-ui, sans-serif` | `'JetBrains Mono', Consolas, Monaco, monospace` |
| Email | `'Barlow', Arial, Helvetica, sans-serif` (Outlook: Arial) | `'Barlow Condensed', 'Arial Narrow', Arial, sans-serif` | `Consolas, 'Courier New', monospace` |
| Office docs / slides without Barlow installed | Arial | Arial Narrow | Consolas |

### 5.3 Screen type scale
Each size's line height is its `--leading-*` token (`--leading-base` for `--text-base`); Tailwind's `text-*` utilities set both.

| Token | Size | Line height | Weight | Use |
|---|---|---|---|---|
| `--text-xs` | 12px / 0.75rem | 1.5 | 400 | Captions, timestamps, badges |
| `--text-sm` | 14px / 0.875rem | 1.5 | 400–500 | Labels, helper text, table cells |
| `--text-base` | 16px / 1rem | 1.6 | 400 | Body, inputs |
| `--text-lg` | 18px / 1.125rem | 1.5 | 500–600 | Lead paragraphs, card titles |
| `--text-xl` | 20px / 1.25rem | 1.4 | 600 | Card headings, section labels, modal titles |
| `--text-2xl` | 24px / 1.5rem | 1.3 | 600–700 | Page section headings (H3) |
| `--text-3xl` | 30px / 1.875rem | 1.25 | 700 | Page headings (H2) |
| `--text-4xl` | 36px / 2.25rem | 1.2 | 700 | Primary page headings (H1) |
| `--text-5xl` | 48px / 3rem | 1.1 | 700 | Hero / display |

For the print scale, see §12.

### 5.4 Text colors
These are **semantic aliases**: dark mode flips them automatically (§9.4). Always reference these tokens for text color rather than a gray primitive.

| Token | Light | Dark | Use |
|---|---|---|---|
| `--text-primary` | `#111827` | `#F3F4F6` | Headings, primary body text |
| `--text-secondary` | `#6B7280` | `#9CA3AF` | Supporting text, descriptions, metadata, **timestamps** |
| `--text-tertiary` | `#9CA3AF` | `#9CA3AF` | **Placeholders and decorative text only** (2.5:1 on white) |
| `--text-inverse` | `#FFFFFF` | `#FFFFFF` | Text on dark surfaces (sidebar, buttons) |
| `--text-brand` | `#1B2A4A` | `#FFFFFF` | Branded headings, navigation items |
| `--text-accent` | `#C8102E` | `#F28C9A` | Links, highlighted terms |
| `--text-disabled` | `#9CA3AF` | `#6B7280` | Disabled controls only |

On dark-mode **elevated surfaces** (menus, popovers, dropdowns on Navy 500), use `--text-primary` only: secondary text there is 4.1:1.

### 5.5 Rules
- Take weights from the type scale (§5.3) and the component specs; never add a weight for emphasis. Running text stays at 400, with 600 for bold.
- Headings are Navy 700 (or white on dark), never gray and never red.
- Red text is for links and highlighted terms only. Never set body paragraphs in red.
- The minimum size for essential text is **14px** on screen and **9pt** in print. Anything smaller is a caption, badge or timestamp.
- All-caps text always gets letter-spacing: **`--tracking-caps` (0.05em)** for badges, table headers and small labels, **`--tracking-eyebrow` (0.1em)** for eyebrow labels. Nothing outside 0.05–0.1em. Set it in Barlow Condensed at 14px and below.
- Set numbers compared in columns in JetBrains Mono (or Barlow with `font-variant-numeric: tabular-nums`).

---

## 6. Iconography & Imagery

### Icons
| | |
|---|---|
| Library | **Lucide** (`lucide-react` in React apps; SVG export elsewhere) |
| Style | Outline only, stroke 1.5–2, round caps and joins. **Never filled** |
| Sizes | 16px in buttons · 20px default (nav, tables) · 24px in cards and headers · 32–48px in empty states |
| Color | Inherit from text color. Interactive hover goes to Red 700 or Navy 500 |
| Touch target | ≥ 44×44px hit area on touch screens (`pointer: coarse`); at least 24×24px elsewhere. Smaller controls (32px and 40px buttons, 40px inputs) extend their hit area with padding or a pseudo-element, not their visible size |

**Custom domain icons** (SCBA mask, Maltese cross, SAR grid, rope hardware): draw on a 24px grid with a 1.5px stroke, round caps and joins, no fill, so they sit naturally beside Lucide icons.

The Maltese cross and Star of Life are widely used community symbols, but specific renditions and uses can be protected. Keep them generic, and don't imply endorsement by any agency or association.

### Photography (marketing, print, social)
- **Real, competent, candid**: crews training, equipment in good order, command posts, briefings. Shoot for authenticity, not stock-photo heroics.
- **Never** show identifiable patients, active-incident casualties, or scenes that exploit tragedy.
- Get releases for identifiable personnel. Blur or crop apparatus unit numbers and agency names unless you have permission.
- Grade photos cool and slightly desaturated so navy and red elements stand out against them.
- To put text or the logo over a photo, use a Navy 900 overlay at **60–80%** opacity.

### Illustration and diagrams
- Build flat, geometric line illustrations from the brand palette: navy lines, a single red accent, gray fills.
- Chart series order: Navy 700 → Navy 300 → Gray 400 → Red 700 (highlight series only). Use semantic colors only when the chart shows status.

---

## 7. Status Language

These operational states are shared across every product and every medium. A printed roster, an email digest and the app UI use **the same words and the same colors**.

**Badge anatomy**: a pill with a 6px dot and an UPPERCASE label.

```
┌─●──LABEL──┐   (dot + uppercase text inside pill)
└───────────┘
```

`font-size: 12px; font-weight: 600; font-family: var(--font-condensed); text-transform: uppercase; letter-spacing: var(--tracking-caps); padding: 3px 10px; border-radius: 9999px;` The label uses the status text token (`--*-fg`), the background the surface token (`--*-surface`), and the dot the mark token (`--*-mark`).

| Status | Background | Label | Dot |
|---|---|---|---|
| Success | `--success-surface` | `--success-fg` | `--success-mark` |
| Warning | `--warning-surface` | `--warning-fg` | `--warning-mark` |
| Danger | `--danger-surface` | `--danger-fg` | `--danger-mark` |
| Info | `--info-surface` | `--info-fg` | `--info-mark` |
| Neutral | `--neutral-surface` | `--neutral-fg` | `--neutral-mark` |
| Brand | `--brand-surface` (Navy 700 at 8%; white at 8% in dark) | `--text-brand` | `--brand-mark` (Red 700; Red 300 in dark) |

| Domain | State | Label | Status |
|---|---|---|---|
| Personnel | On Duty / Available | ON DUTY | success |
| | Responding / En Route | RESPONDING | warning |
| | On Scene | ON SCENE | brand |
| | Off Duty | OFF DUTY | neutral |
| | In Training | IN TRAINING | info |
| | Out of Service | OUT OF SERVICE | danger |
| Equipment / Apparatus | In Service | IN SERVICE | success |
| | Maintenance Due | MAINT DUE | warning |
| | Out of Service | OOS | danger |
| Apparatus on an incident | Dispatched | DISPATCHED | info |
| | En Route | EN ROUTE | warning |
| | Staging | STAGING | info |
| | On Scene | ON SCENE | brand |
| | At Patient | AT PATIENT | brand |
| | Transporting | TRANSPORTING | warning |
| | At Hospital | AT HOSPITAL | info |
| | Cleared | CLEARED | neutral |
| | Canceled | CANCELED | neutral |
| Incidents | Active / Closed / Archived | ACTIVE / CLOSED / ARCHIVED | warning / success / neutral |
| Preplans | Current / Review Needed / Expired | CURRENT / REVIEW / EXPIRED | success / warning / danger |
| Certifications | Current / Expiring Soon / Expired | CURRENT / EXPIRING / EXPIRED | success / warning / danger |

An apparatus on an incident takes its tone from what it's doing: **warning** while moving, **brand** while working on scene, **info** while committed but stationary off the scene, **neutral** once done. A new state goes wherever that rule puts it; don't add a hue. Several states share info, so the label tells them apart.

**In print or grayscale**, the label carries the meaning on its own. Optionally add a shape: ● success, ▲ warning, ■ danger, ◆ info, ○ neutral, ▼ brand.

---

## 8. Accessibility

Target **WCAG 2.2 Level AA** for all digital output. Apply the same contrast minimums to print.

- **Contrast**: text ≥ **4.5:1**. Large text (≥ 24px, or ≥ 18.66px bold) ≥ **3:1**. UI component boundaries (input borders) and focus indicators ≥ **3:1**.
- **Color**: never the only signal (§1, principle 3). Errors always pair an icon with a text message.
- **Focus**: visible on every interactive element (§9.5), and never hidden behind sticky headers or overlays.
- **Keyboard**: every function is operable, and tab order is logical.
- **Targets**: at least 44×44px hit area on touch screens, and 24×24px elsewhere (WCAG 2.2 asks for 24×24). The visible control can be smaller: see §6.
- **Dragging**: anything done by dragging (canvas editors, reordering) also has a single-pointer alternative.
- **Authentication**: no cognitive tests to sign in; allow paste and password managers.
- **Text alternatives**: meaningful images get alt text. Icon-only buttons get `aria-label`. Decorative marks get `aria-hidden`. Form inputs have associated labels.
- **Motion**: respect `prefers-reduced-motion` (§9.6).

### Verified contrast pairings
Computed with the WCAG 2.x relative-luminance formula. `npm run check` recomputes every row and every token pairing in both modes, and fails if either drifts.

| Foreground | Background | Ratio | Result | Use |
|---|---|---|---|---|
| Gray 900 `#111827` | White `#FFFFFF` | 17.7:1 | ✅ AAA | Primary text |
| Navy 700 `#1B2A4A` | White `#FFFFFF` | 14.2:1 | ✅ AAA | Headings, brand text |
| Navy 700 `#1B2A4A` | Gray 50 `#F9FAFB` | 13.6:1 | ✅ AAA | Headings on the page |
| White `#FFFFFF` | Navy 700 `#1B2A4A` | 14.2:1 | ✅ AAA | Text on sidebar, header bands |
| Gray 100 `#F3F4F6` | Navy 700 `#1B2A4A` | 12.9:1 | ✅ AAA | Dark-mode primary text on cards |
| White `#FFFFFF` | Red 700 `#C8102E` | 5.9:1 | ✅ AA | Primary button (both modes) |
| White `#FFFFFF` | Red 900 `#9A0C24` | 8.6:1 | ✅ AAA | Primary button, hover |
| Red 700 `#C8102E` | White `#FFFFFF` | 5.9:1 | ✅ AA | Links, accent text (light) |
| Red 300 `#F28C9A` | Navy 700 `#1B2A4A` | 6.1:1 | ✅ AA | Links, accent text (dark), on cards |
| Red 300 `#F28C9A` | Navy 900 `#0F1A30` | 7.4:1 | ✅ AAA | Links, accent text (dark), on the page |
| Gray 600 `#6B7280` | White `#FFFFFF` | 4.8:1 | ✅ AA | Secondary text, timestamps (light) |
| Gray 400 `#9CA3AF` | Navy 700 `#1B2A4A` | 5.6:1 | ✅ AA | Secondary and tertiary text (dark), on cards |
| Gray 400 `#9CA3AF` | Navy 900 `#0F1A30` | 6.8:1 | ✅ AA | Secondary and tertiary text (dark), on the page |
| Success dark `#047857` | Success bg `#ECFDF5` | 5.2:1 | ✅ AA | Status text (light) |
| Warning dark `#B45309` | Warning bg `#FFFBEB` | 4.8:1 | ✅ AA | Status text (light) |
| Danger dark `#B91C1C` | Danger bg `#FEF2F2` | 5.9:1 | ✅ AA | Status text (light) |
| Info dark `#1D4ED8` | Info bg `#EFF6FF` | 6.2:1 | ✅ AA | Status text (light) |
| Gray 650 `#4B5563` | Gray 100 `#F3F4F6` | 6.9:1 | ✅ AA | Neutral status text (light) |
| White `#FFFFFF` | Danger `#DC2626` | 4.8:1 | ✅ AA | Danger button |
| Gray 500 `#8B95A5` | White `#FFFFFF` | 3.0:1 | ✅ UI (3:1) | Input border (light) |
| Navy 500 `#2A3F6A` | White `#FFFFFF` | 10.4:1 | ✅ UI (3:1) | Focus ring (light) |
| Red 300 `#F28C9A` | Navy 500 `#2A3F6A` | 4.5:1 | ✅ UI (3:1) | Focus ring (dark), on elevated surfaces |
| Gray 400 `#9CA3AF` | White `#FFFFFF` | 2.5:1 | ❌ Not for text | Placeholders and decorative text only |
| Gray 400 `#9CA3AF` | Navy 500 `#2A3F6A` | 4.1:1 | ❌ Not for text | Dark secondary text on elevated: don't |
| Red 700 `#C8102E` | Navy 700 `#1B2A4A` | 2.4:1 | ❌ Not for text | Red text on navy: never |
| Success `#059669` | Success bg `#ECFDF5` | 3.6:1 | ❌ Not for text | Base tone as text: icons and dots only |
| Warning `#D97706` | Warning bg `#FFFBEB` | 3.1:1 | ❌ Not for text | Base tone as text: icons and dots only |

Dark-mode status text on its surface (all ≥ 4.5:1) and the dark-mode input border (white at 35%, 3.1:1) are translucent, so they're checked by `npm run check` rather than listed here.

---

# Part 2 — Media

## 9. Web Applications

### 9.1 Shell
```
┌──────────┬──────────────────────────────────────────┐
│          │ Top bar — 64px, white, 1px Gray 200 bottom│
│ Sidebar  ├──────────────────────────────────────────┤
│ Navy 700 │                                          │
│ 256px /  │ Main — Gray 50 bg, 24px padding          │
│ 64px     │ White cards, 1px Gray 200, 8px radius    │
└──────────┴──────────────────────────────────────────┘
```

| Region | Spec |
|---|---|
| Sidebar (collapsed) | 64px wide, `--bg-sidebar`, icon-only nav |
| Sidebar (expanded) | 256px wide, `--bg-sidebar`, icon + label nav |
| Top bar | Remaining width, 64px tall, `--bg-card`, bottom 1px `--border` |
| Main content | `--bg-page`, 24px padding |
| Content cards | Fluid width, `--bg-card`, 1px `--border`, 8px radius |

- **Standard shell**: the layout above (Scheduler, Scenario Prep, Auth).
- **Dense tool shell**: full-screen canvas and editor apps (RigPrep Sim) use a 48px **navy** top bar with left and right panels (280px / 320px) around the canvas. This is an approved variant.

**Navigation sidebar**
| Property | Value |
|---|---|
| Nav item | 44px tall, padding 0 16px (centered when collapsed), 14px Barlow 500, white at 70% |
| Nav icon | 20px, white at 70% |
| Hover | White at 10% background |
| Active | White text at 100%, 3px Red 700 left border, white at 10% background |
| Section divider | 1px white at 10% |
| Logo area | 64px tall, vertically centered |

### 9.2 Components

#### Buttons
| Variant | Background | Text | Border | Hover | Use |
|---|---|---|---|---|---|
| Primary | `--accent` (Red 700, both modes) | `--text-inverse` | None | `--accent-hover` (Red 900) | Main CTAs: Save, Submit, Confirm. One per view region |
| Secondary | `--bg-secondary` (Navy 700; dark Navy 500) | `--text-inverse` | None | `--bg-secondary-hover` | Secondary actions: View, Details |
| Outline | Transparent | `--text-brand` | 1px `--text-brand` | `--bg-secondary` bg, `--text-inverse` | Tertiary: Cancel, Back, Filter |
| Ghost | Transparent | `--text-brand` | None | `--bg-hover` | Inline actions, icon buttons |
| Danger | `--danger` | `--text-inverse` | None | `--danger-hover` | Destructive: Delete, Remove |
| Disabled | `--bg-disabled` | `--text-disabled` | None | No change (`cursor: default`) | Any inactive button |

| Size | Height | Horizontal padding | Font | Radius |
|---|---|---|---|---|
| sm | 32px | 12px | 14px / 600 | 6px |
| md | 40px | 16px | 14px / 600 | 6px |
| lg | 48px | 24px | 16px / 600 | 8px |

All buttons use `--font-sans` at weight 600. Icon + text buttons have an 8px gap; icons in buttons are 16px.

#### Form inputs
| Property | Value |
|---|---|
| Height | 40px (md) / 48px (lg) |
| Background | `--bg-input` |
| Border | 1px solid `--border-input` (Gray 500 light; white at 35% dark: both 3:1) |
| Radius | 6px |
| Padding | 0 12px |
| Font | 16px Barlow 400, `--text-primary` |
| Placeholder | `--text-tertiary` |
| Focus | 2px solid `--focus-ring` + `0 0 0 4px var(--focus-ring-shadow)` (§9.5) |
| Error | 2px solid `--danger-mark` + `0 0 0 3px rgba(220, 38, 38, 0.15)`; message below in 14px `--danger-fg`, 4px top margin, with an icon |
| Disabled | `--bg-input-disabled`, `--text-disabled` |
| Label | 14px Barlow 500, `--text-secondary` (`--text-primary` on elevated surfaces such as modals, §5.4), 4px above the input; always visible, never placeholder-only |

#### Cards
| Property | Value |
|---|---|
| Background | `--bg-card` |
| Border | 1px solid `--border` |
| Radius | 8px |
| Padding | 24px body / 16px 24px header and footer |
| Shadow | `--shadow-md`; interactive hover `--shadow-lg` |
| Header | 18px Barlow 600, `--text-brand`, bottom 1px `--border` |
| Section divider | 1px `--border`, 16px vertical margin |

#### Tables
| Property | Value |
|---|---|
| Header | `--bg-page` background; 12px Barlow Condensed 600, uppercase, `--text-secondary`, letter-spacing `--tracking-caps` |
| Rows | Bottom 1px `--border`; hover `--bg-hover` |
| Cells | 12px 16px padding; 14px Barlow 400, `--text-primary`; numbers in JetBrains Mono 500 |
| Selected row | `--brand-surface` background + 3px `--text-brand` left border |
| Empty state | Centered, 14px `--text-secondary`, optional 32px icon above |

#### Modals
| Property | Value |
|---|---|
| Overlay | Black at 50% |
| Panel | `--bg-elevated`, 12px radius, 24px padding, `--shadow-2xl` |
| Max widths | 480px (sm) / 640px (md) / 800px (lg) |
| Header | 20px Barlow 600, `--text-brand`, bottom 1px `--border`, 16px 24px padding |
| Footer | Top 1px `--border`, 16px 24px padding, right-aligned buttons |
| Enter | Fade + scale 95% → 100%, 200ms `--ease-out` |
| Close | Top right, ghost button, 20px X icon |

#### Toasts
| Property | Value |
|---|---|
| Position | Fixed, top right, 16px from the edges |
| Size | 360px max width, 8px radius, `--shadow-lg` |
| Style | `--bg-elevated` with a 4px left border in the status mark (`--*-mark`) |
| Content | 20px status icon + 14px bold title + 14px `--text-primary` description (toasts are elevated, §5.4); X to dismiss |
| Dismiss | Success and info after 5s; warning and danger persist |
| Enter | Slide in from the right, 300ms `--ease-out` |

#### Empty states
| Property | Value |
|---|---|
| Layout | Centered in the parent card or content area, 12px between elements |
| Icon | 48px, Gray 300 |
| Heading | 18px Barlow 600, `--text-brand` |
| Description | 14px Barlow 400, `--text-secondary` |
| Action | Primary or outline button, centered below |

### 9.3 Spacing, radius, elevation
- **Spacing**: 4px base: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96 (`--space-1` … `--space-24`). Use only these values for margin, padding and gap. The one exception is the badge's `3px 10px` padding (§7), which keeps a 12px label at 24px tall.
- **Radius**: 0 (tables) · 4 (tags) · 6 (sm and md buttons, inputs) · 8 (cards, lg buttons) · 12 (modals, hero) · full (avatars, badges and other pills). Don't mix rounded and sharp corners within one card.
- **Shadow**: `--shadow-sm` → `--shadow-2xl`. In dark mode surfaces get lighter as they rise (page Navy 900 → card Navy 700 → elevated Navy 500), and shadows deepen.

### 9.4 Dark mode
Dark mode is a first-class requirement, not an option: it's what crews use in apparatus cabs, command posts and at night.

**Wiring**: `tokens.css` follows the OS. With no `data-theme`, the semantic aliases switch with `prefers-color-scheme`; `data-theme="dark"` forces dark on that element and its descendants; `data-theme="light"` on `<html>` forces light. Components that use `--bg-page`, `--text-primary`, `--border`, `--success-fg` … need no per-component dark CSS. `tailwind.css` declares the `dark:` variant with the same rule, so `dark:` utilities switch together with the tokens; don't declare one in the app. Don't use a `.dark` class or `light-dark()`.

| App | Sets on `<html>` |
|---|---|
| Has a theme setting (Light / Dark / System) | `data-theme` to the resolved `light` or `dark`; nothing when the user picks System |
| Follows the OS, no setting | nothing |
| **Has no dark mode** | **`data-theme="light"`** — without it the app turns dark on dark-mode machines |

Set it before first paint (an inline script in `<head>` or server-rendered) so the page doesn't flash the wrong theme. `data-theme="light"` is honored on `<html>` only; `data-theme="dark"` works on any element. The decision is recorded in [ADR 0001](./docs/adr/0001-follow-the-os-theme.md).

| Element | Token | Light | Dark |
|---|---|---|---|
| Page | `--bg-page` | `#F9FAFB` | `#0F1A30` Navy 900 |
| Card | `--bg-card` | `#FFFFFF` | `#1B2A4A` Navy 700 |
| Elevated surface | `--bg-elevated` | `#FFFFFF` | `#2A3F6A` Navy 500 |
| Sidebar | `--bg-sidebar` | `#1B2A4A` | `#0A1220` Navy 950 |
| Input background | `--bg-input` | `#FFFFFF` | `#1B2A4A` |
| Primary text | `--text-primary` | `#111827` | `#F3F4F6` |
| Secondary text | `--text-secondary` | `#6B7280` | `#9CA3AF` |
| Tertiary text | `--text-tertiary` | `#9CA3AF` | `#9CA3AF` |
| Link / accent text | `--text-accent` | `#C8102E` Red 700 | `#F28C9A` Red 300 |
| Borders | `--border` | `#E5E7EB` | `rgba(255,255,255,0.10)` |
| Input border | `--border-input` | `#8B95A5` Gray 500 | `rgba(255,255,255,0.35)` |
| Primary button | `--accent` / `--accent-hover` | `#C8102E` / `#9A0C24` | `#C8102E` / `#9A0C24` |
| Secondary button | `--bg-secondary` / `--bg-secondary-hover` | `#1B2A4A` / `#0F1A30` | `#2A3F6A` / `#4A6491` |
| Focus ring | `--focus-ring` | `#2A3F6A` Navy 500 | `#F28C9A` Red 300 |
| Status text | `--success-fg` … `--neutral-fg` | Text tones (§4.3) | Lifted / pale tones (§4.3) |
| Status surfaces | `--success-surface` … | `-bg` tints | Lifted color at 14% opacity |
| Status marks | `--success-mark` … | Base tones | Lifted (`-light`) tones; neutral Gray 400 |
| Brand status | `--brand-surface`, `--brand-mark` | Navy 700 at 8%, Red 700 | White at 8%, Red 300 |
| Neutral surface | `--neutral-surface` | `#F3F4F6` | `rgba(255,255,255,0.08)` |
| Hover overlay | `--bg-hover` | `#F3F4F6` | `rgba(255,255,255,0.08)` |
| Disabled button / input | `--bg-disabled` / `--bg-input-disabled` | `#E5E7EB` / `#F3F4F6` | white at 8% / 5% |
| Disabled text | `--text-disabled` | `#9CA3AF` | `#6B7280` |
| Shadows | `--shadow-sm` … `-2xl` | 5–20% black | 30–50% black |

**Rules**
- Never invert brand colors: navy stays navy and red stays red. Only lightness shifts.
- **Red text lifts; red fills don't.** Links and accent text lift to Red 300; the primary button stays Red 700 so its white label passes. Red 500 is decorative only.
- On elevated surfaces use primary text only.
- Test every state in both modes, especially focus rings, errors and disabled inputs.

### 9.5 Focus ring
One rule; `--focus-ring` and `--focus-ring-shadow` flip in dark mode.

```css
:focus-visible {
  outline: 2px solid var(--focus-ring);
  outline-offset: 2px;
  box-shadow: 0 0 0 4px var(--focus-ring-shadow);
}
```

### 9.6 Motion
| Token | Value | Use |
|---|---|---|
| `--duration-fast` | 100ms | Hover color changes |
| `--duration-normal` | 200ms | Dropdowns, tooltips, modals, sidebar |
| `--duration-slow` | 300ms | Toasts, drawers (**maximum** for any animation) |
| `--ease-out` | `cubic-bezier(0.16, 1, 0.3, 1)` | Entrances |
| `--ease-in-out` | `cubic-bezier(0.4, 0, 0.2, 1)` | Two-way transitions |

- Animate only `transform` and `opacity`.
- **No entrance animations on page load.** Content must be visible immediately.
- Under `prefers-reduced-motion: reduce`, cut durations to about 0 and replace slides with fades.
- Sidebar expand/collapse: 200ms. Modal enter: fade + scale, 200ms. Toast enter: slide, 300ms. Hover: 100ms on background, color and border color.

### 9.7 Responsive breakpoints
| Min width | Name | Max content | Columns | Gutter | Margin |
|---|---|---|---|---|---|
| 0 | Mobile | 100% | 4 | 16px | 16px |
| 640px | Small tablet | 640px | 8 | 16px | 24px |
| 768px | Tablet | 768px | 8 | 24px | 32px |
| 1024px | Desktop | 1024px | 12 | 24px | 32px |
| 1280px | Large | 1280px | 12 | 24px | auto |
| 1536px | Wide | 1440px | 12 | 32px | auto |

Below 1024px, the sidebar collapses to an off-canvas drawer.

---

## 10. Marketing Websites

Marketing pages use the same tokens as the apps with more room to breathe and more expressive type. A marketing page should still feel like the brand of the product it sells.

| Element | Spec |
|---|---|
| Header | White (or Navy 700 over a hero), 64–72px tall, parent lockup left (≥ 160px wide), nav in Barlow 500 16px, one **Red 700 primary CTA** at right ("Request a Demo") |
| Hero | Navy 900, or a photo with a 60–80% navy overlay. H1 Barlow 700 48px (`--text-5xl`), up to 64px on wide screens, white, `letter-spacing: -0.01em`; subhead 18–20px Gray 100 or 300; primary red CTA + white outline secondary |
| Section rhythm | 80–96px vertical padding on desktop, 48–64px on mobile. Alternate white and Gray 50 sections, with one Navy 700 band per page at most (e.g. testimonial or final CTA) |
| Eyebrow labels | Barlow Condensed 600, 14px, uppercase, `--tracking-eyebrow`, **Red 700** on light backgrounds or Red 300 on dark, above section H2s |
| Content width | 1280px max grid; long-form text 65–75 characters per line (≈ 680px) |
| Feature cards | App card spec; Lucide icon 24–32px in a Navy 50 rounded square (12px radius) |
| Accent rule | A 48px × 3px Red 700 bar under key headings echoes the lockup's rule. Use it sparingly |
| Footer | Navy 900; reversed lockup; links in Gray 400 → white on hover; tagline "Prepared to Perform."; © line in 12px Gray 400 |
| Forms | App input spec; always show visible labels, never placeholder-only |

Keep the product-UI restraint: no gradients on the brand colors, no glassmorphism, no illustration styles that clash with outline icons.

---

## 11. Email

### 11.1 Layout: the design-system wrappers
Transactional email uses the wrappers in [`emails/`](./emails/README.md): `wrapSimpleMessage` (password reset, verification, notices), `wrapIncidentAlert` (callouts, apparatus OOS, expiring certifications) and `wrapDigest` (daily and weekly summaries). They produce:

```
Gray 50 page background, 600px column
├─ Header — white card section, the brandmark lockup centered (240px image, so the
│     artwork clears the 160px minimum);
│     the reversed lockup swaps in for dark-mode clients
├─ Body — white card
│     Headline: Barlow 600, 24px / 1.3, Navy 700
│     Paragraphs: 16px, primary text, line-height 1.6 (§5.3)
│     Incident alerts: a status strip (status surface, 4px base-tone left bar,
│       Barlow Condensed uppercase label in the status text tone) + facts table
│     CTA button: Red 700, white 16px 600, 12px × 24px padding, 8px radius,
│       48px tall; its URL shows below it as a fallback link
└─ Footer — Gray 50, centered 12px secondary text:
      "Scene Ready · sceneready.tech", why-you-got-this line, support address
```

Light is the default (inline styles). Dark activates in clients that honor `prefers-color-scheme` or Outlook's `[data-ogsc]`: surfaces flip to Navy 900 / 700, links lift to Red 300 and status text to its dark-mode `--*-fg` tones (the lifted and pale colours, §4.3). New email goes through these wrappers; product-specific templates move to them.

### 11.2 Technical rules
- The wrappers handle table layout, inline styles and bulletproof buttons (MJML). Hand-built email follows the same rules.
- **Logos are hosted PNGs in production.** Pass `logoUrl` / `logoDarkUrl` pointing at `scene-ready-brandmark.png` and `-reversed.png` (480×240, 2× the header), served by an app that runs `scene-ready-brand-assets`. The default SVGs on GitHub are for development only: Outlook's Word renderer and several webmail clients don't render SVG. Keep `alt="Scene Ready"`.
- Fonts: Barlow first, falling back to Arial (§5.2). Web fonts load only in Apple Mail and iOS, and that's fine.
- Always send a plain-text part alongside the HTML, and give every CTA a visible fallback URL.
- Minimum text is 14px for body copy. 12px is only for the footer, status labels (badges, the status strip) and metadata lines such as timestamps (§5.3). CTA tap targets are at least 44px tall.
- Test dark-mode rendering in real clients before a release.

### 11.3 Subject lines and copy
- Sentence case, under ~50 characters, say what happened: "Reset your password", "You've been added to Station 3 — B Shift", "Certification expiring in 30 days".
- No emoji, no ALL CAPS, no urgency theatrics.
- From name: **Scene Ready** or **Scene Ready {Product}**.

### 11.4 Email signature (staff)
```
Firstname Lastname
Title | Scene Ready
sceneready.tech
```
Name in Barlow/Arial 600, 14px, Navy 700. Other lines in 14px Gray 600. You may add a 16px red rule and the typeset wordmark. No image-only signatures, quotes, or rows of social icons.

---

## 12. Printed Documents

Covers reports, letterhead, training handouts, exercise documents (HSEEP situation manuals, after-action reports), preplans, rosters and proposals.

### 12.1 Page setup
| | US Letter (default) | A4 |
|---|---|---|
| Margins | 0.75in (19mm) all sides; 1in outer for bound docs | 20mm |
| Grid | 12 columns, 0.25in (6mm) gutter | same |
| Header | Icon (6–8mm) + typeset "SCENE READY" in Barlow Condensed 700 8–9pt Navy, +0.1em, left; document title in 8–9pt Gray 600, right; 0.5pt Gray 300 rule below |
| Footer | "Page 3 of 12" right; classification or "Prepared to Perform." left; 8pt Gray 600 |

### 12.2 Print type scale
| Element | Size / leading | Weight | Color |
|---|---|---|---|
| Cover title | 32–40pt / 1.1 | Barlow 700 | Navy 700 |
| H1 | 20pt / 24pt | Barlow 700 | Navy 700 |
| H2 | 14pt / 18pt | Barlow 700 | Navy 700 |
| H3 / eyebrow | 10pt / 12pt, uppercase, +0.1em | Barlow Condensed 600 | Navy 700 for an H3; Red 700 for an eyebrow above a heading |
| Body | **10–11pt / 14–15pt** | Barlow 400 | Gray 900 |
| Table text | 9pt / 12pt | Barlow 400; numbers in JetBrains Mono | Gray 900 |
| Table header | 9pt uppercase, +0.05em | Barlow Condensed 600 | White on Navy 700, or Gray 700 on Navy 50 |
| Captions, footnotes | 8pt / 10pt | Barlow 400 | Gray 600 |
| Minimum | **8pt** captions / **9pt** essential text | | |

### 12.3 Page elements
- **Cover page**: full-bleed Navy 700 or 900 panel on the upper 40–60% with the reversed lockup (≥ 60mm wide), title in white, and document metadata (date, version, org) in Gray 100. The lower portion stays white. A 3pt Red 700 rule may mark the panel's edge.
- **Letterhead**: parent lockup top left (40–50mm wide), contact block top right in 9pt Gray 600, 0.5pt Red 700 rule under the header, nothing else.
- **Callouts**: Navy 50 background, 3pt Navy 700 left rule. Warnings use the warning tint with a warning-tone left rule **plus** a "CAUTION" or "WARNING" label.
- **Tables**: zebra rows in Gray 100 or Navy 50 at 50%, no vertical rules, 0.5pt Gray 300 horizontal rules.
- **Status in print**: use the §7 labels. Documents are often photocopied in grayscale, so the words carry the meaning on their own.

### 12.4 Production
- Export **PDF/X-4** for professional print and **tagged PDF (PDF/UA)** for digital distribution (headings, reading order, alt text).
- Use vector logos. The brandmark SVGs are already outlined; convert to PDF/EPS as the printer needs. Raster images need ≥ 300 ppi at final size.
- Give full-bleed covers 0.125in (3mm) of bleed.
- Rich black for large navy areas is the printer's call. Don't specify 100K for navy panels.
- For operational documents (preplans, rosters, field guides), stay print-friendly: no large solid-navy areas that eat toner, and the page must still read on an office black-and-white laser.

### 12.5 Word / Google Docs template settings
Where Barlow can't be embedded, use Arial for headings and body and Arial Narrow for labels.
Heading 1: 20pt bold Navy `#1B2A4A`, 18pt space before. Heading 2: 14pt bold Navy. Heading 3: 10pt bold caps, character spacing expanded by 1pt (+0.1em), Navy. Normal: 10.5pt, exactly 15pt line spacing, 6pt after, `#111827`. Table style: header row Navy fill with white bold text, banded rows `#F3F4F6`.

---

## 13. Presentations

| | |
|---|---|
| Aspect | 16:9 |
| Title slide | Navy 900 background; reversed lockup top left or centered; title Barlow 700 40–48pt white; subtitle 20pt Gray 300; 4pt × 80px Red 700 rule |
| Section divider | Navy 700 background; eyebrow in Barlow Condensed, Red 300; section title 36pt white |
| Content slide | White background; title 28–32pt Navy 700 top left; body **≥ 18pt** Gray 900; icon mark 24px bottom right or slide number 12pt Gray 600 |
| Data | Chart palette from §6. Highlight one series in Red 700 and keep the rest navy and gray |
| Limits | One idea per slide, no more than 6 bullets, no clip art, no transitions beyond a fade |

---

## 14. Social Media & Avatars

| Asset | Spec |
|---|---|
| Profile avatar | `scene-ready-favicon.svg` (navy disc, reversed chevrons) exported at 400×400 PNG. The platform's circle crop fits the disc exactly |
| App store / PWA icon | `scene-ready-appicon.svg` at 512, 192, 180, 128 |
| Cover / banner | Navy 900 background or dark-overlay photo, reversed lockup, tagline. Keep key content inside the platform's safe area (centered ~60%) |
| Post graphics | 1080×1080 or 1080×1350. White or navy background, one headline in Barlow 700, one red accent, icon mark in a bottom corner at ≥ 48px |
| Link previews (OG) | 1200×630. Navy 900 background, reversed lockup or icon left, page title 56–64px white |
| Copy | Voice rules from §2. Tag agencies only with permission. No real-incident imagery without consent |

---

# Part 3 — Reference

## 15. Design Tokens

### 15.1 CSS custom properties
The canonical definitions live in [`tokens.css`](./tokens.css): primitives (`--navy-700`, `--gray-50`, `--space-4` …) and semantic aliases (`--bg-page`, `--text-primary`, `--border`, `--accent`, `--focus-ring`, `--success-fg` …) that follow the OS color scheme unless `data-theme` sets one (§9.4). Prefer the aliases whenever a value should change between modes; use primitives only when it shouldn't.

Install the package from a pinned tag and import the tokens once at the application root, before any component styles:

```json
{ "dependencies": { "@scene-ready/design-system": "https://codeload.github.com/Scene-Ready/design-system/tar.gz/refs/tags/vX.Y.Z" } }
```

```css
@import "@scene-ready/design-system/tokens.css";
```

### 15.2 Tailwind CSS v4
Apps on Tailwind import the shared theme after the tokens and keep no brand values of their own:

```css
@import "tailwindcss";
@import "@scene-ready/design-system/tokens.css";
@import "@scene-ready/design-system/tailwind.css";
```

The theme maps Tailwind's colors (`navy-*`, `red-*`, `gray-*`, status tones and the semantic aliases as `bg-page`, `text-primary`, `text-success-fg`, `bg-danger-surface`, `text-accent-fg` …), fonts, sizes, radii, shadows and easing onto the token variables. The theme also declares the `dark:` variant (§9.4), so apps declare none. The red and gray scales replace Tailwind's. For red text use `text-accent-fg`, not `text-accent` (the fill, Red 700 in both modes). See the [README](./README.md#tailwind) for the full mapping.

### 15.3 Changing a token
Update `tokens.css` (dark values in `[data-theme='dark']` only, then `npm run sync-dark` to regenerate the OS-following copy), any table here that quotes the value, `tailwind.css` (if a token is added, renamed or removed) and `emails/tokens.js` (email clients can't read CSS variables). Then run `npm run check`, which fails if the two dark copies differ, on a theme reference to a missing token, on a token pairing below its contrast minimum in either mode, or on a ratio in §8 that doesn't match its colors. Bump `version` in `package.json` and tag the release; apps bump their pin by hand.

---

## 16. Asset Inventory

All brand files ship in this package under `assets/`. Apps never commit copies: `scene-ready-brand-assets <dir>` copies the fixed-URL files (favicon, brandmarks, icons) and the fonts into the app's static root at build time, and UI code imports marks from `@scene-ready/design-system/assets/…`.

| File | Size / viewBox | Notes |
|---|---|---|
| `scene-ready-brandmark.svg` | 400×200 | Parent lockup, navy; text outlined |
| `scene-ready-brandmark-reversed.svg` | 400×200 | Parent lockup, reversed; text outlined |
| `scene-ready-brandmark.png` | 480×240 | Parent lockup for email, 2× the 240px header (§11.2); exported from the SVG |
| `scene-ready-brandmark-reversed.png` | 480×240 | Reversed lockup for email; exported from the SVG |
| `scene-ready-icon.svg` | 100×100 | Icon mark, navy |
| `scene-ready-icon-reversed.svg` | 100×100 | Icon mark, reversed |
| `scene-ready-appicon.svg` | 512×512 | Navy rounded square, rx 96 |
| `scene-ready-favicon.svg` | 512×512 | Navy disc |
| `favicon.ico` | 16, 32 | Parent favicon |
| `fonts/` | — | Barlow, Barlow Condensed, JetBrains Mono (woff2) + `fonts.css` |

Product icons (`product-icon.svg`, a product's own `favicon.ico`) live in their product's repo.

**To be produced**: PNG exports of the icon for email (36/72px), monochrome marks (1-color navy, white and black) for embroidery, stamps and fax, the Technology and Training marks, and an OG / social image template.

---

## 17. Do's and Don'ts

### Logo
- ✓ Use only the official assets. Keep clear space of one chevron height. Use the reversed mark on dark backgrounds
- ✓ Use hosted PNGs in email
- ✗ Don't rotate, skew, recolor, glow, shadow or outline the mark
- ✗ Don't place it on red, semantic colors, or busy photos without a ≥ 60% dark overlay
- ✗ Don't use SVG logos in production email

### Color
- ✓ Let navy dominate, with red as the accent. Keep semantic colors for status only
- ✓ Use the `-fg` / `-surface` tokens for status text and backgrounds; `--*-mark` for dots, bars and icons
- ✓ Check contrast for every new pairing (`npm run check` covers the tokens)
- ✗ Don't fill large backgrounds with Red 700
- ✗ Don't use brand colors as status indicators (the §7 Brand status is the one exception), or more than one semantic color in a component
- ✗ Don't put red text on navy; in dark mode red text is Red 300

### Typography
- ✓ Barlow everywhere, Barlow Condensed for uppercase labels, mono for numbers in columns
- ✓ Self-host the fonts; use Arial / Arial Narrow where Barlow can't load
- ✓ Stick to the type scale (the marketing hero H1, §10, is the one size above it)
- ✗ Don't add weights outside the type scale and component specs, essential text below 14px (screen) or 9pt (print), italics for emphasis, or gray headings
- ✗ Don't set essential text, including timestamps, in `--text-tertiary`

### Layout and components
- ✓ Use the 4px spacing scale, keep radius consistent within a component, and show loading states for async work
- ✓ Pair every status with a text label
- ✗ Don't mix rounded and sharp corners in one card, animate layout properties, use page-load entrance animations, or run any animation longer than 300ms

### Voice
- ✓ Be direct, specific and actionable, in the crew's own language
- ✗ Don't use "Oops!", emoji in errors, corporate jargon, or exploit real incidents
