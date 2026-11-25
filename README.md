# @scene-ready/design-system

The Scene Ready design system — canonical CSS tokens, brand assets, and usage spec for Fire, EMS, and Search & Rescue software at [sceneready.tech](https://sceneready.tech).

This package ships:

- **`tokens.css`** — design tokens as CSS custom properties (primitives + semantic aliases, with built-in dark mode that follows the OS, or `data-theme` when set).
- **`tailwind.css`** — a Tailwind CSS v4 theme that maps Tailwind's colours, fonts, sizes, radii, shadows and easing onto the tokens, so an app's utilities read `tokens.css` instead of copied values.
- **`fonts/` — Barlow, Barlow Condensed and JetBrains Mono as self-hosted woff2 files with `fonts.css`. No app loads fonts from Google.
- **`assets/`** — official logo SVGs (standard + reversed for dark backgrounds), app icon, and favicon.
- **`BRANDING.md`** — the full design system specification (color, typography, spacing, components, accessibility).
- **`./emails`** — themed email wrappers (`wrapSimpleMessage`, `wrapIncidentAlert`, `wrapDigest`) for transactional, incident, and digest emails. See [`emails/README.md`](./emails/README.md).

`tokens.css`, fonts and assets are published as static files — no build step. The `scene-ready-brand-assets` command is a dependency-free Node script. The email wrappers are the only JavaScript code. Their MJML is compiled when the package is built, so they have no runtime dependencies and run in a Cloudflare Worker — see [Themed emails](#themed-emails).

## Install

Pin a release tag through GitHub's tarball URL. It needs no git, SSH key or `insteadOf` rule in CI:

```json
{
  "dependencies": {
    "@scene-ready/design-system": "https://codeload.github.com/Scene-Ready/design-system/tar.gz/refs/tags/v0.9.0"
  }
}
```

## Use

### Tokens

Import once at the application root, before any component styles:

```css
@import "@scene-ready/design-system/tokens.css";
```

Or from a JS/TS entry point (Vite, webpack, Next.js, etc.):

```js
import "@scene-ready/design-system/tokens.css";
```

Then reference the tokens in your component CSS — never hardcode hex codes or pixel values:

```css
.card {
  background: var(--bg-card);
  color: var(--text-primary);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: var(--space-4);
  box-shadow: var(--shadow-md);
}
```

**Prefer semantic aliases** (`--bg-card`, `--text-primary`, `--border`, `--accent`, `--success-fg`) over primitives (`--navy-700`, `--gray-50`) whenever a value should change between light and dark mode.

### Tailwind

Apps on Tailwind CSS v4 import the theme after Tailwind and the tokens, and keep no brand values of their own:

```css
@import "tailwindcss";
@import "@scene-ready/design-system/tokens.css";
@import "@scene-ready/design-system/tailwind.css";
```

Every mapped utility compiles to a `var()` of its token (`bg-navy-700` is `background-color: var(--navy-700)`), so a token change reaches every app on its next build with nothing to edit. Colours are also emitted as Tailwind's usual variables (`--color-navy-700: var(--navy-700)`), so `var(--color-…)` in arbitrary values and inline styles keeps working. Opacity modifiers (`bg-navy-700/50`) work through `color-mix()`; browsers without it (Safari before 16.2, Chrome before 111) show the colour fully opaque. `white` is left as Tailwind's own `#fff`, which equals `--white`, so `bg-white/50` keeps Tailwind's fallback.

| Utilities | Token |
|---|---|
| `navy-50`…`navy-950`, `red-50`…`red-900`, `gray-50`…`gray-900` | the primitives of the same name |
| `success`, `success-bg`, `success-light`, `success-dark` (and `warning`, `danger`, `info`; `danger-pale`, `info-pale`) | status primitives. The base tone is for dots, icons and borders; status text uses `-fg` |
| `bg-page`, `bg-card`, `bg-elevated`, `bg-sidebar`, `bg-input`, `bg-hover`, `bg-disabled`, `bg-input-disabled`, `bg-secondary-fill`, `bg-secondary-fill-hover` | `--bg-*` |
| `text-primary`, `text-secondary`, `text-tertiary`, `text-inverse`, `text-brand`, `text-disabled-fg` | `--text-*` |
| `border-border`, `border-border-input` | `--border`, `--border-input` |
| `accent`, `accent-hover`, `danger-hover`, `focus-ring` | the same names (`accent` is the fill: buttons, active bars) |
| `accent-fg` | `--text-accent`: red text and links. Use `text-accent-fg`, never `text-accent`, for text |
| `success-fg`, `success-surface` (and `warning`, `danger`, `info`, `neutral`) | mode-aware status |
| `font-sans`, `font-condensed`, `font-mono`; `text-xs`…`text-5xl` | type tokens (Tailwind's line heights kept) |
| `rounded-none`…`rounded-full`, `shadow-sm`…`shadow-2xl`, `ease-out`, `ease-in-out` | the same names |

The semantic utilities in the middle rows switch with the theme (see [Dark mode](#dark-mode)), so components that use them need no `dark:` variants. The primitives don't switch. The theme declares the `dark:` variant with the same rule as the tokens; don't declare your own `@custom-variant dark`.

The red and gray scales replace Tailwind's: only the brand steps compile, so `bg-red-600` produces no CSS. The brand grays differ from Tailwind's at 500 (`#8B95A5`, the input-border gray) and 600 (`#6B7280`), and add 650 (`#4B5563`, neutral status text). Tailwind's other palettes stay available; to switch them off as well, add `@theme { --color-*: initial; }` before the import.

Spacing needs no mapping: Tailwind's `0.25rem` step equals `--space-1`, so `p-4` is `--space-4`. Durations and layout sizes have no Tailwind namespace; use them as arbitrary values: `duration-(--duration-fast)`, `w-(--sidebar-width)`.

### Dark mode

The semantic aliases, and Tailwind's `dark:` utilities, follow the OS color scheme unless `data-theme` says otherwise:

| `<html>` | Result |
|---|---|
| no `data-theme` | follows the OS (`prefers-color-scheme`) |
| `data-theme="dark"` | dark (also works on any element, for a dark region) |
| `data-theme="light"` | light |

- **An app with a theme setting** sets `data-theme` to the resolved `light` or `dark`, and nothing for System. Set it before first paint.
- **An app that follows the OS** sets nothing.
- **An app with no dark mode must pin `<html data-theme="light">`**, or it turns dark on dark-mode machines.

See [BRANDING.md §9.4](./BRANDING.md#94-dark-mode) and [ADR 0001](./docs/adr/0001-follow-the-os-theme.md).

#### Upgrading to 0.8.0

Before 0.8.0 the tokens stayed light unless `data-theme="dark"` was set. They now follow the OS. On upgrade:

- **No dark mode?** Add `data-theme="light"` to `<html>`, or the app goes dark on dark-mode machines.
- **Declared your own `@custom-variant dark`?** Remove it; `tailwind.css` declares it now.
- **Using a `.dark` class or `light-dark()`?** Switch to `data-theme`, or nothing to follow the OS.

### Favicons, fonts and other fixed-URL brand files

Browsers ask for `/favicon.ico` by itself, and `<link>` tags need stable URLs, so these files must sit in the app's static root. Don't commit copies. Copy them at build time with the package's command:

```json
{
  "scripts": {
    "predev": "scene-ready-brand-assets public",
    "prebuild": "scene-ready-brand-assets public"
  }
}
```

`scene-ready-brand-assets <dir>` copies all seven files below, flat, into `<dir>` (less any named with `--skip`), replaces `<dir>/fonts/` with the package's fonts, and exits non-zero if anything is missing from the package. Gitignore them in the app:

```gitignore
public/favicon.ico
public/scene-ready-*.svg
public/fonts/
```

Every app's `<head>` uses the same block:

```html
<link rel="icon" href="/favicon.ico" sizes="any" />
<link rel="icon" type="image/svg+xml" href="/scene-ready-favicon.svg" />
<link rel="apple-touch-icon" href="/scene-ready-appicon.svg" />
<link rel="stylesheet" href="/fonts/fonts.css" />
```

Product icons (`product-icon.svg`, a product's own `favicon.ico`) stay in their app and stay committed. An app that ships its own `favicon.ico` in the same folder leaves the parent one out with `--skip`, which can be repeated:

```sh
scene-ready-brand-assets public --skip favicon.ico
```

and gitignores only `public/scene-ready-*.svg`.

### Fonts

`/fonts/fonts.css` declares Barlow (400–800), Barlow Condensed (400–700) and JetBrains Mono (400, 500), the families `--font-sans`, `--font-condensed` and `--font-mono` name. Each weight has a Latin and a Latin Extended file; the browser downloads only the weights and subsets a page actually renders, so shipping all of them costs nothing at runtime. A bundled app can import the stylesheet instead of linking it; its URLs are relative, so the bundler picks up and fingerprints the files:

```js
import "@scene-ready/design-system/fonts.css";
```

Don't load these families from Google Fonts or another CDN: it adds a third-party request and breaks the app offline. With fonts served from the app's own origin, a Content Security Policy needs only `font-src 'self'`. An app that works offline should add `/fonts/*.woff2` to its service worker's precache.

The files come from the pinned Fontsource packages (SIL OFL 1.1; licences in `fonts/*-OFL.txt`). To add a weight, edit `FAMILIES` in `scripts/vendor-fonts.mjs`, run `npm run vendor-fonts`, and commit `fonts/`.

Transactional emails are the exception: email clients fetch fonts over the network anyway, so the email wrappers still name Google Fonts.

### Logo assets in UI

To show a mark in a component, import it so the bundler fingerprints it:

```js
import brandmark from "@scene-ready/design-system/assets/scene-ready-brandmark.svg";
```

Available files in `assets/`:

- `scene-ready-brandmark.svg` / `-reversed.svg`: full wordmark
- `scene-ready-icon.svg` / `-reversed.svg`: icon mark
- `scene-ready-appicon.svg`: square app icon
- `scene-ready-favicon.svg` / `favicon.ico`: favicon

Use `-reversed` variants on dark backgrounds.

### Themed emails

The email wrappers need nothing besides this package, and run in a Cloudflare Worker or in Node:

```js
import { wrapSimpleMessage } from "@scene-ready/design-system";

const html = wrapSimpleMessage({
  subject: "Reset your Scene Ready password",
  headline: "Reset your password",
  body: "We received a request to reset your password.",
  cta: { label: "Reset Password", url: "https://auth.sceneready.app/reset?t=..." },
});
```

Three wrappers are available — `wrapSimpleMessage`, `wrapIncidentAlert`, `wrapDigest` — each returning a complete HTML document string. Light + dark themes activate automatically via `prefers-color-scheme`. Pass plain text: the wrappers escape it and validate URLs. See [`emails/README.md`](./emails/README.md) for full API and dark-mode client matrix.

## Versioning

This package is consumed via git, not the npm registry. Versions are tracked as git tags (`v0.1.0`, …, `v0.9.0`) on this repo. When a mark changes, cut a release, then bump each app's pin by hand.

Always pin to a tag in your `package.json` rather than tracking `main` — token changes can be visually breaking even when they're technically backwards-compatible CSS.

## Spec

See [`BRANDING.md`](./BRANDING.md) for the full design system specification: color palette, typography scale, spacing, component specs, dark-mode mapping, voice rules, and accessibility requirements.

## Contributing

When changing a token value:

1. Update `tokens.css` (the canonical source).
2. Update any per-section table in `BRANDING.md` that quotes the value inline (the doc and the file must agree).
3. When adding, renaming or removing a token, update `tailwind.css` to match, and `emails/tokens.js` (email clients can't read CSS variables). After changing `emails/tokens.js`, run `npm run build:emails` to recompile the email pieces. Then run `npm run check`. It fails if `tailwind.css` points at a token `tokens.css` doesn't define, if a token pairing falls below its WCAG contrast minimum in either mode, or if a ratio in `BRANDING.md`'s contrast table doesn't match its colors, or if `emails/compiled.js` is out of date.
4. If you touch a logo SVG, update the matching file in `assets/` and the inline SVG block in `BRANDING.md` together.
5. Bump `version` in `package.json` and tag the commit (`git tag vX.Y.Z`) so consumers can pin to it.
