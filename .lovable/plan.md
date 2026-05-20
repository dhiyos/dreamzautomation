## Goal

Replace the current bento + 4-column tile grid on `/industries` with an editorial, full-width stacked layout. One industry per scroll band, alternating image and copy across the band, with generous vertical breathing room. Nothing stitched together, nothing fighting for attention.

## Layout

```text
┌──────────────────────────────────────────────────────────────┐
│ HERO (unchanged: "Engineered to run. / Built to last.")      │
└──────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│  01 · Petrochemicals & Refining                              │
│  ┌────────────────────────┐    Pillar · Process              │
│  │                        │    Big serif/italic accent       │
│  │     image (left)       │    Blurb (max ~60ch)             │
│  │                        │    [ Explore more → ]            │
│  └────────────────────────┘                                  │
└──────────────────────────────────────────────────────────────┘
                          ~ 160px gap
┌──────────────────────────────────────────────────────────────┐
│  02 · Converting & Film Plants            ┌───────────────┐  │
│  Pillar · Process / Machines              │               │  │
│  Blurb                                    │ image (right) │  │
│  [ Explore more → ]                       │               │  │
│                                           └───────────────┘  │
└──────────────────────────────────────────────────────────────┘
... continues alternating for all 5 featured industries ...

┌──────────────────────────────────────────────────────────────┐
│  ALSO SERVING                                                │
│  Single quiet section: 4 industries as a horizontal          │
│  type-only list (name · pillar · one-line blurb), no cards.  │
└──────────────────────────────────────────────────────────────┘

CTA strip + Footer (unchanged)
```

Each band is ≥ 80vh on desktop so only one industry is visible at a time. Image takes ~50% of the band width, copy column ~40%, with ~10% gutter. Mobile collapses to a single stacked column with the image on top.

## Sections

1. **Hero** — keep as-is.
2. **Featured industries (5 bands)** — Petrochemicals, Converting, Automotive, Transportation, Education. One per full-width section, alternating sides (odd = image-left, even = image-right). Each band contains:
   - Index number (`01 — 05`) as oversized faint numeral in the background of the copy column
   - Pillar eyebrow chip (Process / Machines / Training, colored per existing accent)
   - Industry name as the big editorial heading
   - Blurb (existing copy from `industries.ts`)
   - "Explore more →" link wrapping the whole band when a `caseStudySlug` exists
3. **Also serving** — replace the 4-column TypoTile grid with a single quiet typographic list. One row per industry, separated by hairlines: `Name · Pillar · short blurb`. No card chrome.
4. **CTA strip + Footer** — unchanged.

## Motion

- Each band fades + slides up on enter (existing `fadeUp` variant) with `viewport={{ once: true, amount: 0.3 }}`.
- Image inside the band keeps the existing `ParallaxImage` scroll-linked parallax so the band has subtle life as the user scrolls through it.
- Reduced-motion: fades disabled, parallax disabled (already wired via `useReducedMotion`).

## Technical changes

- **`src/pages/Industries.tsx`** — rewrite the two sections after the hero (`Featured industries` bento + `Also serving` grid).
  - Remove the `ImageTile` bento block and the `TypoTile` 4-column grid.
  - Add a new `IndustryBand` local component that renders one full-width section, takes an `index` prop to decide alignment (`index % 2 === 0` → image-left), and reuses the same data lookups (`get(id)`, `pillarAccentColor`).
  - Map `featuredOrder` → `<IndustryBand />` stack.
  - Add a new `AlsoServingList` block: simple `<ul>` of typographic rows with hairline `border-b`.
- Reuse existing `FONT_HEAD`, `FONT_BODY`, `INDIGO`, `INDIGO_SOFT`, accent helpers, and the existing `ParallaxImage` and `Tilt` (Tilt is dropped for bands — too noisy at full width).
- No data changes (`src/data/industries.ts` stays the same).
- No new routes, no new dependencies.
- No changes to `index.css` / `tailwind.config.ts`.

## Out of scope

- Hero (unchanged).
- Industry copy / order in `industries.ts` (unchanged).
- CTA strip and footer (unchanged).
- Other pages.
