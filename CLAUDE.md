# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

This is the **`@scene-ready/design-system` package** for Scene Ready (sceneready.tech — software for Fire, EMS, and Search & Rescue). It is documentation + brand assets distributed as a git-installed npm package, not an application:

- `BRANDING.md` — the authoritative spec (~600 lines) covering brand identity, color palette, typography, spacing, components, dark mode, and accessibility.
- `tokens.css` — the canonical, machine-readable design tokens (CSS custom properties). Downstream Scene Ready apps import this file via `@scene-ready/design-system/tokens.css`; `BRANDING.md` is the prose that describes how to use them.
- `assets/` — official logo SVGs (`scene-ready-brandmark.svg`, `-icon.svg`, `-appicon.svg`, reversed variants for dark backgrounds) and `favicon.ico`.
- `package.json` — declares the package as `@scene-ready/design-system` with `exports` for `./tokens.css`, `./assets/*`, and `./BRANDING.md`. Marked `private: true` so it is never published to the public npm registry.
- `README.md` — consumer-facing install + usage docs.

Consumers install from git (e.g. `npm install git+https://github.com/scene-ready/design-system.git#v0.1.0`). There is no build system, no tests, and no source code to compile — `tokens.css` is the artifact. Common tasks are editing `BRANDING.md`, adding/updating assets, or bumping a token value.

**When you change a token value, you must also bump `version` in `package.json` and tag the commit (`git tag vX.Y.Z`)** so consumers can pin to the new release.

## Working in this repo

**`tokens.css` is the canonical source for token *values*; `BRANDING.md` is the canonical source for token *usage*.** Downstream apps import `tokens.css`. When asked to build a UI component, page, or snippet, reference token names — never hardcode hex codes or px values.

**Prefer semantic aliases over primitives whenever a value should change between light and dark mode.** `tokens.css` defines two layers: primitives (`--navy-700`, `--gray-50`, `--space-4`) and semantic aliases (`--bg-page`, `--text-primary`, `--border`, `--accent`, `--focus-ring`, `--success-fg`, etc.). The aliases flip automatically when `data-theme="dark"` is set on an ancestor; primitives don't. Use `--bg-card` for a card background, not `--white`. Use `--success-fg` for status text, not `--success`.

**If you change a token, update both `tokens.css` and any per-section table in `BRANDING.md` that quotes the value inline.** The component spec tables (Buttons, Form Inputs, Cards, etc.) often quote hex codes and pixel values directly; grep the doc before committing a token change to catch every occurrence.

**Logo assets must stay in sync with the inline SVG in `BRANDING.md`.** The "SVG Icon Mark (inline use)" block in BRANDING.md and the files in `assets/` are the same artwork — if one is updated, update the other. Do not introduce new logo variants without a corresponding entry in the Variants table.

**Brand-color rules that are easy to violate:**
- Navy and Red are brand colors only — never use them as status colors. Status uses the semantic palette (success/warning/danger/info).
- Red 700 (`#C8102E`) is for accents, CTAs, and active states only — never large background fills.
- Dark mode does not invert brand colors; it lifts them (e.g. Red 700 → Red 500). See the Color Mapping table.

**Voice rules for any UI copy you generate:** active voice, fire/EMS/SAR terminology ("On Duty", "Crew", "Apparatus"), no "Oops!"/"Uh oh!" — this is software used during emergencies. Error messages must be specific and actionable.
