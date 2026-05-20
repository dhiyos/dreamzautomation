# Typography & Color Consistency Plan

## Goal
Eliminate the visual drift across the site (mixed fonts, ad-hoc sizes, hardcoded hex colors) by locking one type system and two scoped palettes, then migrating every page and component onto those tokens.

## 1. Canonical Type System — Montserrat, single scale

One family site-wide: **Montserrat** (300/400/500/600/700/800). Remove Libre Baskerville and IBM Plex Sans imports/usages.

Define a fixed semantic scale in `src/index.css` as utility classes. All components must use these — no inline `style={{ fontFamily }}`, no ad-hoc `text-[2.3rem]`.

| Class | Use | Size | Weight | Tracking | Line-height |
|---|---|---|---|---|---|
| `.text-display` | Hero H1 | clamp(40px, 6vw, 72px) | 800 | -0.03em | 1.05 |
| `.heading-h1` | Page H1 | clamp(36px, 5vw, 56px) | 800 | -0.02em | 1.08 |
| `.heading-h2` | Section H2 | clamp(28px, 3.5vw, 44px) | 700 | -0.02em | 1.1 |
| `.heading-h3` | Card / sub H3 | 22–24px | 700 | -0.01em | 1.2 |
| `.heading-h4` | Small H4 | 18px | 600 | -0.005em | 1.3 |
| `.text-eyebrow` | Eyebrows | 11px | 600 | 0.18em UPPER | 1 |
| `.text-body-lg` | Lead body | 17px | 400 | normal | 1.6 |
| `.text-body` | Default body | 15px | 400 | normal | 1.65 |
| `.text-body-sm` | Small / meta | 13px | 400 | normal | 1.6 |
| `.text-caption` | Caption / micro | 11–12px | 500 | 0.04em | 1.5 |
| `.text-metric` | Big numerals | clamp(40px, 5vw, 64px) | 300 | -0.02em | 1 |

Rules:
- Headings always `text-primary`; body `text-muted`; eyebrows = section accent.
- Italic display variant allowed only via `.text-display-italic` modifier.
- Delete the existing `.text-card-title`, `.text-card-body`, `.text-tagline-italic`, etc. or alias them to the new classes.

## 2. Color Palettes — Two scoped systems

Both stay, but the boundary is made explicit via tokens and a CSS scope class.

### A. Dreamz Industrial (default — every page except Case Studies)
Already defined in `:root` of `index.css`. Keep as-is:
- `--bg-primary` deep navy, `--accent-blue` cyan, `--accent-teal`, `--accent-amber`
- Used by Home, About, Solutions, Industries, Insights, Contact, all marketing sections.

### B. Midnight Indigo (Case Studies only)
Add a `.theme-indigo` scope class that overrides the same semantic tokens:

```css
.theme-indigo {
  --bg-primary: 240 35% 7%;     /* #0a0a1a */
  --bg-secondary: 240 39% 14%;  /* #141432 */
  --bg-tertiary: 240 51% 24%;   /* #1e1e5a */
  --accent-blue: 239 84% 60%;   /* #4f46e5 */
  --accent-blue-hover: 234 89% 74%; /* #a5b4fc */
  --text-primary: 0 0% 100%;
  --text-muted: 215 20% 65%;
  --line-default: 240 51% 24% / 0.6;
}
```

Apply `.theme-indigo` on the root `<div>` of `CaseStudiesIndex.tsx` and `CaseStudyDetail.tsx`. Everything inside resolves to indigo via tokens — no hex literals.

### Hard rules
- Zero hex/`rgb()`/`hsl()` literals in components. Always `hsl(var(--token))` or Tailwind semantic classes (`bg-bg-primary`, `text-text-muted`, `border-line-default`).
- Accent usage: ≤1 accent color per section. Amber reserved for "alert/highlight" only.

## 3. Sweep Plan (Full)

### Step 1 — Foundation
- Update `src/index.css`: keep `:root` tokens, add `.theme-indigo` scope, replace/alias all typography component classes with the new scale, remove Libre/IBM Plex `@import` lines.
- Update `tailwind.config.ts`: ensure `fontFamily.sans = ['Montserrat', …]` only; remove any other family.
- Delete dead font links in `index.html` if any.

### Step 2 — Case Studies migration
- `src/pages/CaseStudiesIndex.tsx` + `src/pages/CaseStudyDetail.tsx`:
  - Remove all `FONT_HEAD` / `FONT_BODY` inline style objects.
  - Remove Google Fonts `<link>` injections for Libre Baskerville / IBM Plex.
  - Replace hardcoded hex (`#0a0a1a`, `#141432`, `#a5b4fc`, `#4f46e5`, `#1e1e5a`, slate-* utility classes) with semantic tokens under `.theme-indigo`.
  - Replace ad-hoc heading sizes with `.heading-h1/h2/h3` and `.text-metric` utilities.

### Step 3 — Page-by-page audit
For each page below, replace inline font-family, replace raw color/hex/slate-* utilities with semantic tokens, replace heading sizes with utility classes:
- `src/pages/Index.tsx` + all sections under `src/components/sections/*`
- `src/pages/About.tsx` + `src/components/sections/about/*`
- `src/pages/Solutions.tsx`
- `src/pages/Industries.tsx`
- `src/pages/Contact.tsx`
- `src/pages/InsightsIndex.tsx`, `src/pages/InsightDetail.tsx`
- `src/components/Nav.tsx`, `src/components/Hero.tsx`, `src/components/sections/Footer.tsx`
- Shared: `CtaButton`, `Eyebrow`, `SectionHeader`, `PageHero`, `AccentCard`, `AnimatedMetric`, `SequenceMarker`, `CaseStudyArchitecture`, `MiniArchitecture`

### Step 4 — Cleanup in `index.css`
- Audit the 70+ `font-family: 'Montserrat'` declarations — remove them (inherited from `body`).
- Replace any remaining hex literals (lines 32–35 `--process-*` etc., and the many class blocks 800–2175) with token references.
- Collapse duplicate heading rules.

### Step 5 — Verification
- Screenshot each route at 1440 + 390 viewports; eyeball for regressions.
- Grep guard: `rg "font-family|#[0-9a-fA-F]{3,6}|fontFamily:" src/` should return only `index.css` + theme scope.

## Out of Scope
- No copy changes, no layout restructuring, no new pages.
- Logo wordmark classes (`.logo-*` in TrustBar) keep their bespoke weights/tracking — they're brand marks, not body type.

## Deliverable
A single PR-equivalent change: updated `index.css` + `tailwind.config.ts` foundation, every page/component migrated, zero hardcoded fonts or hex outside the token files.
