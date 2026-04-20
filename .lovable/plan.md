

## Plan — Nav + Hero for Dreamz Automation Systems

### Confirmation
Homepage only. Nav + Hero only. No other sections. Sharp corners everywhere (`--radius: 0`). Montserrat exclusively. Dark navy `#0B1929` base. No mobile hamburger yet. All links/CTAs are placeholders (`href="#"`).

**Stack note:** Lovable runs React + Vite + Tailwind (Next.js is not available here). SEO meta tags will live in `index.html`. The foundation from the previous turn is already in place — I'll verify tokens and extend where needed.

---

### File structure

```text
index.html                       (verify meta tags, Montserrat link)
src/index.css                    (verify tokens, body defaults, sharp corners)
tailwind.config.ts               (verify colour + font mappings; add letter-spacing if needed)
src/pages/Index.tsx              (compose <Nav /> + <Hero />)
src/components/Nav.tsx           (NEW — sticky top nav)
src/components/Hero.tsx          (NEW — two-column hero)
src/components/SiemensCard.tsx   (NEW — partnership card, used inside Hero)
package.json                     (ensure framer-motion is installed)
```

Keeping SiemensCard separate makes the hero file readable and lets us reuse the card pattern later if needed.

---

### Component breakdown

**`Nav.tsx`**
- Sticky `<header>`, `top-0 z-50`, background `rgba(11,25,41,0.92)` + `backdrop-blur-md`, 1px bottom border `line-default`
- Inner flex row inside the 1200px container, vertical padding 18px
- Left: 28×28 `accent-blue` square with white "A" (Montserrat ExtraBold) + wordmark "DREAMZ AUTOMATION" (Bold 14px, uppercase, tracking 0.02em)
- Centre: nav links (Solutions, Industries, Products, Case Studies, Insights, About) — Medium 13px, `text-muted` → `text-primary` on hover, colour transition
- Right: CTA button "Request an Assessment" — `accent-blue` bg, white, Bold 12px uppercase, tracking 0.02em, padding 10×20, hover `accent-blue-hover`
- All `href="#"`, button non-functional

**`Hero.tsx`**
- Section with 120px top / 100px bottom padding, 1px bottom border `line-default`
- Container: 1200px max-width, responsive horizontal padding
- Grid: `grid-cols-[1.2fr_1fr]` gap 80px, items-center (stacks on mobile)
- **Left column:**
  - Eyebrow row: 40×1px `accent-blue` line + 12px gap + label text (Semibold 11px, uppercase, tracking 0.18em, `accent-blue`)
  - Headline H1: ExtraBold 72px, line-height 1, tracking -3%, two lines — "Engineering" / "Your Dreamz." with "Dreamz." (incl. period) in `accent-teal`
  - Italic tagline: Medium Italic 22px, line-height 1.4, `text-muted`, with explicit line break before "under one roof."
  - Body paragraph: Regular 15px, line-height 1.75, `text-muted`, max-width 460px
  - CTA row: Primary (`accent-blue`, "Request an Assessment →") + Ghost (border `line-strong`, "Explore Solutions", border hovers to `accent-blue`)
  - Framer Motion: each child fades in from `y: 20` over 0.6s, staggered 0.1s via parent `staggerChildren`
- **Right column:** renders `<SiemensCard />`, fades in from `y: 20` with 0.3s delay

**`SiemensCard.tsx`**
- `bg-tertiary`, top border 3px `accent-teal`, padding 36px / 32px, sharp corners
- Eyebrow "— AUTHORIZED PARTNER" (Semibold 10px, tracking 0.2em, `accent-teal`)
- "SIEMENS" wordmark (ExtraBold 42px, tracking -0.01em, `accent-teal`)
- Subtitle "AUTHORIZED SYSTEM INTEGRATOR" (Bold 12px uppercase, tracking 0.08em, white)
- 2×2 stats grid: outer wrapper `bg-line-default` with `gap-px`, each cell `bg-secondary` padding 20×18, number ExtraBold 32px `accent-teal`, label Medium 11px `text-muted`
  - 20+ / Years of Experience
  - 50+ / Engineering Professionals
  - 400+ / Plants Automated
  - 50+ / Industry Leaders Served

---

### Tailwind config approach

Already scaffolded in previous turn — I'll verify and extend:
- Colour tokens (`bg-primary`, `bg-secondary`, `bg-tertiary`, `bg-card-hover`, `surface-light`, `accent-blue`, `accent-blue-hover`, `accent-teal`, `accent-amber`, `text-primary`, `text-muted`, `text-dim`, `line-default`, `line-strong`) mapped from CSS HSL variables
- `fontFamily.sans = ['Montserrat', ...]` as the only family
- Add `letterSpacing` extensions for the exact tracking values used (-0.03em, -0.02em, -0.01em, 0.02em, 0.08em, 0.18em, 0.2em) so we use Tailwind classes consistently
- Confirm `--radius: 0` and that body uses `bg-bg-primary text-text-primary antialiased`
- Confirm Montserrat `<link>` in `index.html` includes italic 400 + 500

---

### Order of implementation

1. Verify/patch foundation: `index.html` font link (italics), `index.css` tokens, `tailwind.config.ts` letter-spacing extensions
2. Build `Nav.tsx` and wire into `Index.tsx`
3. Build `SiemensCard.tsx`
4. Build `Hero.tsx` (compose card on right)
5. Add Framer Motion entrance animations
6. Visual QA at desktop + 832px viewport (current preview width)

---

### Questions / concerns

1. **Mobile hero stacking.** You said no hamburger yet, but the hero grid will need to stack on narrow viewports. I'll stack left-then-card below 1024px so it doesn't break the current 832px preview. OK?
2. **Headline at 832px viewport.** 72px ExtraBold will overflow narrow widths. I'll clamp it (e.g. `clamp(44px, 6vw, 72px)`) so it stays at 72px on desktop but scales down gracefully. OK?
3. **Container padding vs nav padding.** Spec says nav inner horizontal padding is 56px and page padding is also 56px desktop / 24px mobile — I'll use the same container utility for both so they align perfectly.
4. **Stats grid gap technique.** I'll use `gap-px` with a `bg-line-default` wrapper so the 1px lines render exactly as specified — confirming this is the look you want (vs explicit borders).

If any of the above shouldn't be assumed, tell me before I build; otherwise I'll proceed with the defaults above on approval.

