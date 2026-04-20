

## Finalised Architecture — Confirmed & Locked

All adjustments and answers integrated. Ready to build shared primitives first, then sections one prompt at a time.

---

### Confirmations

I will:

- **Build shared primitives first, in one commit**, before any section work — so every section can import from a stable foundation.
- **Follow exact component APIs** from the approved plan + your adjustments below.
- **Respect all design constraints**: sharp corners (`rounded-none` everywhere), Montserrat only, no gradients, no shadows (except focus-visible rings), no `rounded-*` utilities.
- **Data layer**: typed arrays in `src/data/*.ts`, shared interfaces in `src/types/content.ts`.
- **Animations**: every section entrance goes through the shared `useEntrance` hook; `useReducedMotion` honoured globally; marquee uses CSS keyframes paused under `prefers-reduced-motion: reduce`.
- **No speculative plumbing**: no CMS, no routing, no auth — just static composition.

---

### Adjustments locked in

| # | Adjustment | Status |
|---|---|---|
| 1 | Footer = Brand / Solutions / Case Studies / Insights / Company (no Industries column) | Locked |
| 2 | H2: clamp(32px, 4vw, 48px), tracking -0.02em, line-height 1.08, ExtraBold | Locked |
| 3 | `AccentCard hover='surface'` → `bg-card-hover` (#1A3048) | Locked |
| 4 | Engineers: Vinod gets `accent-teal` top rule; Piyush + Tapeshwer get `accent-blue` top rules | Locked |
| 5 | `CtaButton` accepts `icon?: string` prop, default `→`, rendered after label | Locked |

### Open-question answers locked in

- **Case study cards**: whole card = `<a>` wrapping `<article>`, ghost "Read case study →" inside.
- **Insights**: local `data/insights.ts` + `// TODO: Replace with CMS integration...` comment.
- **Engineers**: 2-sentence bios, email always visible via `ContactEmail`.
- **Architecture**: `PlaceholderImage` 16/10, label `SYSTEM ARCHITECTURE DIAGRAM — DMRC METRO LINE 3`.
- **Certifications**: small 80×80 placeholder area, typography-led card body.
- **Trust bar**: monochrome `<span>` wordmarks (Montserrat tracking tuned per brand), opacity 0.5 → 1.0 + `text-muted` → `text-primary` on hover. Swap to `<img>` later, no other changes.
- **CTA strip**: full-bleed `accent-blue` band, inner content in `.page-container`, primary button = white bg / `accent-blue` text (amber stays training-only).

---

### Additions accepted

**Addition A — `ContactEmail` primitive** added to shared primitives commit:

```ts
interface ContactEmailProps {
  email: string;
  className?: string;
  label?: string;     // optional override; default = email itself
}
// Renders <a href="mailto:..."> with text-accent-blue + hover underline.
```

**Addition B — Global typography utilities** added to `src/index.css` under `@layer components`:

- `.text-eyebrow` — Semibold 11px uppercase, tracking 0.18em, `text-accent-blue`
- `.text-tagline-italic` — Medium Italic 22px (clamped where used), line-height 1.4, `text-text-muted`
- `.text-body-large` — Regular 15px, line-height 1.75, `text-text-muted`, max-width 460px
- `.text-card-title` — Bold 17px, tracking -0.005em, `text-text-primary`
- `.text-card-body` — Regular 13px, line-height 1.7, `text-text-muted`

Sections apply these via single class names instead of 5–6 Tailwind utilities.

---

### Updated shared-primitives file list (Prompt 1 scope)

```text
src/components/shared/
  SectionShell.tsx
  SectionHeader.tsx
  Eyebrow.tsx
  AccentCard.tsx
  CtaButton.tsx           ← now accepts icon prop
  PlaceholderImage.tsx
  SequenceMarker.tsx
  ContactEmail.tsx        ← NEW (Addition A)
src/lib/
  motion.ts               ← fadeUp, stagger, useEntrance
src/types/
  content.ts              ← shared interfaces
src/index.css             ← + .text-eyebrow / .text-tagline-italic / .text-body-large / .text-card-title / .text-card-body (Addition B)
```

No section files touched in Prompt 1. `Hero.tsx` will be lightly refactored later (after primitives exist) to consume `Eyebrow` + `CtaButton` — but only as a follow-up cleanup, not in Prompt 1, to avoid scope creep.

---

### Build order (locked)

1. **Shared primitives** ← awaiting your Prompt 1 spec
2. Trust Bar
3. Company Profile
4. Solutions
5. Featured Product
6. Featured Case Studies
7. Architecture Showcase
8. Engineers
9. Certifications
10. Testimonials
11. Insights Preview
12. CTA Strip
13. Footer

---

Confirmed and ready. Send the **Prompt 1 — Shared Primitives** spec when ready and I'll build the full primitives commit against the APIs above.

