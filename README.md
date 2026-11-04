# @scene-ready/design-system

The Scene Ready design system — canonical CSS tokens, brand assets, and usage spec for Fire, EMS, and Search & Rescue software at [sceneready.tech](https://sceneready.tech).

This package ships:

- **`tokens.css`** — design tokens as CSS custom properties (primitives + semantic aliases, with built-in dark mode via `[data-theme="dark"]`).
- **`assets/`** — official logo SVGs (standard + reversed for dark backgrounds), app icon, and favicon.
- **`BRANDING.md`** — the full design system specification (color, typography, spacing, components, accessibility).
- **`./emails`** — themed email wrappers (`wrapSimpleMessage`, `wrapIncidentAlert`, `wrapDigest`) for transactional, incident, and digest emails. See [`emails/README.md`](./emails/README.md).

`tokens.css` and assets are published as static files — no build step. The email wrappers are the only JavaScript code; they need `mjml` and are intended for server-side use only. `mjml` is an **optional peer dependency**, so apps that only use the tokens and assets don't install it — see [Themed emails](#themed-emails).

## Install

```sh
npm install git+https://github.com/scene-ready/design-system.git
```

Pin to a tag for reproducible builds:

```sh
npm install git+https://github.com/scene-ready/design-system.git#v0.3.0
```

Equivalent in `package.json`:

```json
{
  "dependencies": {
    "@scene-ready/design-system": "git+https://github.com/scene-ready/design-system.git#v0.3.0"
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

### Dark mode

The semantic aliases flip automatically when `data-theme="dark"` is set on any ancestor:

```html
<html data-theme="dark">
  <!-- everything inside renders in dark mode -->
</html>
```

### Logo assets

Reference the SVGs by their subpath:

```html
<img src="/node_modules/@scene-ready/design-system/assets/scene-ready-brandmark.svg" alt="Scene Ready" />
```

Or, with a bundler that resolves package imports for static assets:

```js
import brandmark from "@scene-ready/design-system/assets/scene-ready-brandmark.svg";
```

Available files in `assets/`:

- `scene-ready-brandmark.svg` / `-reversed.svg` — full wordmark
- `scene-ready-icon.svg` / `-reversed.svg` — icon mark
- `scene-ready-appicon.svg` — square app icon
- `scene-ready-favicon.svg` / `favicon.ico` — favicon

Use `-reversed` variants on dark backgrounds.

### Themed emails

The email wrappers need `mjml`, which this package lists as an optional peer dependency. Install it alongside the design system in any service that sends email:

```sh
npm install mjml@^4.18.0
```

```js
import { wrapSimpleMessage } from "@scene-ready/design-system";

const html = wrapSimpleMessage({
  subject: "Reset your Scene Ready password",
  headline: "Reset your password",
  body: "We received a request to reset your password.",
  cta: { label: "Reset password", url: "https://app.sceneready.tech/reset?t=..." },
});
```

Three wrappers are available — `wrapSimpleMessage`, `wrapIncidentAlert`, `wrapDigest` — each returning a complete HTML document string. Light + dark themes activate automatically via `prefers-color-scheme`. **Server-side only** (needs `mjml`). See [`emails/README.md`](./emails/README.md) for full API and dark-mode client matrix.

## Versioning

This package is consumed via git, not the npm registry. Versions are tracked as git tags (`v0.1.0`, `v0.2.0`, `v0.3.0`, …) on this repo.

Always pin to a tag in your `package.json` rather than tracking `main` — token changes can be visually breaking even when they're technically backwards-compatible CSS.

## Spec

See [`BRANDING.md`](./BRANDING.md) for the full design system specification: color palette, typography scale, spacing, component specs, dark-mode mapping, voice rules, and accessibility requirements.

## Contributing

When changing a token value:

1. Update `tokens.css` (the canonical source).
2. Update any per-section table in `BRANDING.md` that quotes the value inline (the doc and the file must agree).
3. If you touch a logo SVG, update the matching file in `assets/` and the inline SVG block in `BRANDING.md` together.
4. Bump `version` in `package.json` and tag the commit (`git tag vX.Y.Z`) so consumers can pin to it.
