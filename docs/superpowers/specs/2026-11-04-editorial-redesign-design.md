# Editorial Light Redesign — Design Spec

Date: 2026-11-04

## Goal

Visual redesign of the portfolio so it reads as premium and art-directed, with a
clean first screen on a small laptop (1366×768). Content, i18n, behavior and tests
stay; the look, layout rhythm and markup of the presentational layer change.

## Direction

Quiet Premium Neutral, editorial. Replaces the current dark theme with green/cyan
glow gradients and glassmorphism cards.

## Keep unchanged

- Copy and i18n (BR/EN) via `data-i18n` and the `copy` object.
- Project filters, command palette, contact form, CV menu, mobile menu.
- Accessibility behavior and the existing Playwright + axe tests.
- Plain HTML/CSS/JS, no build step (see `ARCHITECTURE.md`).
- CV PDFs and all site content.

## Tokens (starting values, refined during comp analysis)

- Paper `#F4EFE6`, ink `#14110F`, muted ink `#5E574F`, hairline `rgba(20,17,15,.14)`.
- Accent vermilion `#D9411E`; inverse band `#14110F` for the contact section.
- Contrast: body-size text must meet 4.5:1. Vermilion is used large or on the
  inverse band only if it falls short on paper.
- Type: editorial serif for display (italic for emphasis), Plus Jakarta Sans for
  text, JetBrains Mono only for small code labels such as PR numbers.
- Radius: 0–2px on text blocks, one 18px radius on image frames. One button style.
- Spacing: section padding 140–160px desktop, 88px mobile; 12-column grid,
  1200px max width.
- No glass, backdrop blur, glow gradients or card-in-card.

## Sections (one comp each)

1. **Hero** — short 2–3 line headline ("Do dado bruto à decisão." with
   "Data & Software Engineer" as a quiet line), one primary CTA plus one text link,
   portrait offset right in a fixed 4:5 frame with a thin vermilion rule behind it.
   Stats, availability pill and bubble removed; availability moves to the nav as
   plain text.
2. **Open Source** — poster-style "Bayer · MotherML" statement; the two PRs as an
   open ruled list.
3. **About** — narrow text column left; pull-quote and the three facts as a ruled
   list right. Skills as an inline typographic list, not chips.
4. **Projects** — filters as plain text tabs; ruled editorial list with number,
   title and stack; rows expand on hover/focus to show description and links.
5. **Cases** — alternating off-grid layout, large problem-to-decision line,
   offset number.
6. **Services** — three columns separated by vertical rhythm lines, no boxes.
7. **Contact** — inverse ink band, large headline, form as underlined fields,
   links below.
8. **Footer** — single hairline row.

Signature components: off-grid editorial layout, layered image crop frames,
vertical rhythm lines, hover-accordion project list.
Motion cues: staggered float-up and smooth accordion expansion; both disabled
under `prefers-reduced-motion`.

## Technical approach

- Keep IDs, `data-i18n` keys and render functions; restyle through classes and
  template markup tweaks. Update tests that assert on changed class names or text.
- No image-generation tool is available in this environment. Reference comps are
  built as static HTML in the scratchpad, screenshotted with Chromium at 1366×768
  and 390×844, analyzed, and then the real site is implemented to match.

## Verification

- `npm run check` (html-validate, stylelint, eslint, Playwright + axe) passes.
- Before/after screenshots at 1366×768 and 390×844.

## Out of scope

New content or copy, a build step, new pages, changes to the CV PDFs.
