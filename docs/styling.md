# Styling conventions

This app is a shadcn/ui + Tailwind CSS v4 site. The goal is one styling system,
not a hand-written CSS framework beside Tailwind.

## Rules

1. **Tokens live in CSS.** Semantic colors, fonts, radii, the shell width and the
   page gutter are declared in `apps/web/src/styles/base.css` (`:root`,
   `html[data-theme="light"]`), together with the shadcn aliases
   (`--background`, `--border`, `--ring`, …) so `:root` has a single home. They
   are exposed to Tailwind through `@theme` / `@theme inline` in `globals.css`.
   Never hardcode a color in a component.
2. **One selector, one place.** A selector is defined once; context-specific
   overrides belong in an `@media` block next to the component they adjust, never
   as a second top-level rule. `globals.css` keeps only the Tailwind wiring and
   the unlayered Radix overrides — it must not re-declare `:root`, `html` or
   `body`, because a later unlayered rule silently wins (this once blanked the
   body gradients).
3. **Layout, spacing, typography, color and states use Tailwind utilities in
   JSX.** Prefer the 4px scale (`1 = 4px`) and the named tokens
   (`text-ink`, `text-fg-muted`, `border-line`, `bg-panel`, `text-brand`, …).
4. **Reusable UI is a component with `cva` variants**, not a new class name.
   - `components/ui/button.tsx` is the only Button source
     (`default` / `outline` / `ghost`, plus size scale).
   - `components/ui/brand.tsx` holds `Container`, `StatusPill`, `Chip`,
     `IconButton`, `LangButton`, `SectionLabel`, `ThemeGlyph`.
5. **CSS is for what utilities cannot express.** `styles/visuals.css` holds
   WebGL/Canvas stacking, the HUD/marquee/scanline artwork, the custom cursor,
   keyframes, conic/radial gradients and masks, reduced-motion overrides, and a
   small number of shadcn/Radix overrides. Anything else belongs in JSX.
6. **No call-site overrides** of a component's color, border, height or font
   size. Page files may adjust layout only (`w-full`, `gap-*`, margins).

## File map

- `styles/base.css` — the single `:root` (semantic tokens + shadcn aliases) and
  the minimal base resets that Tailwind's preflight does not cover (body
  gradients, focus ring, selection, default border colour, `--nav-h` at small
  widths). Imported as `layer(base)`.
- `styles/visuals.css` — the only remaining hand-written component CSS:
  hero/HUD artwork, the instrument and stem player, the cursor, grain, marquee,
  type lab, toast, reveal and reduced-motion. Imported as `layer(components)`.
- `styles/globals.css` — Tailwind entry: imports, `@theme` token exposure, the
  `zh:` variant and the unlayered Radix dialog overrides. No base selectors.

There is no `design.css` any more. The prototype's editorial layer has been
fully ported to utilities and primitives (Plan B phases 1–3), and the rules that
could not be expressed as utilities now live in `visuals.css`.

## Layer order

Tokens and resets are in `layer(base)`; `visuals.css` is imported with
`layer(components)`; Tailwind utilities are later in the cascade, so a utility
on an element always wins over residual visual CSS. New component work must not
depend on unlayered CSS winning.

Scoped preflight (`.tw-root`) is intentionally not enabled yet: the app has no
Ant Design surface to isolate from. `#root` already carries `.tw-root`, so
enabling the scoped preflight later is a one-line change plus visual QA.

## Accessibility

- Focus styles come from the Button base (`focus-visible:ring-2 ring-brand/50`)
  and from native focus for links; do not remove outlines without a replacement.
- All icon-only controls need `aria-label`; toggles use `aria-pressed`.
- `prefers-reduced-motion` is handled by the visual runtimes and by
  `@media (prefers-reduced-motion: reduce)` in CSS for decorative animation.
