## Goal

Replace named clients with vague industry-specific positioning everywhere case studies appear (e.g. "a leading packaging company" instead of "Uflex Industry").

## Proposed anonymized labels

| Current client | Proposed label |
|---|---|
| IOCL · Mathura Refinery | A major Indian oil refinery |
| Uflex Industry | A leading flexible packaging manufacturer |
| Vacmet Industry | A large BOPP/BOPET film producer |
| Bangalore Int. Airport · Hyderabad Int. Airport | Two major Indian international airports |
| DMRC Metro Line 3 | A major Indian metro rail operator |
| Road Tunnel Authority · Kumarhati, Solan | A Himalayan road-tunnel authority |
| Hero MotoCorp | One of the world's largest two-wheeler OEMs |
| Motherson MATE | A leading global auto-components supplier |
| Bambino Agro Industries | A well-known packaged food manufacturer |
| Coperion Ideal / Reliance Industries | A leading petrochemicals producer (via an OEM partner) |

## Files to change

**Case study data**
- `src/data/caseStudiesRich.ts` — replace `client`, plus name mentions in `intro`, `challenge.intro`, image `alt`/`caption`, `projectFacts`/`spec` rows naming the site (e.g. "Site: IOCL Mathura Refinery" → "Site: Major North-Indian refinery").
- `src/data/featuredCaseStudies.ts` — replace `client` and the Hero MotoCorp mention inside the description.
- `src/data/solutions.ts` — replace `client` on the 6 item case studies and the Reliance mention inside one description.

**Surfaces that name case-study clients**
- `src/data/industries.ts` — rewrite the 4 `caseStudyLabel` lines (IOCL, Hero MotoCorp, Bambino, DMRC).
- `src/pages/CaseStudiesIndex.tsx` line 156 — meta description: drop the "IOCL Mathura, DMRC Metro, UFlex BOPP" enumeration; use generic phrasing.
- `src/components/sections/Testimonials.tsx` line 132 — replace "Mathura Refinery in 2011 to NSTI Dehradun in 2025".
- `public/llms.txt` lines 16–17 — rename the two optional case-study entries (slugs/URLs unchanged so links still work).

URL slugs (`iocl-mathura`, `dmrc-metro-line-3`, `uflex-bopp`, etc.) stay as-is to avoid breaking inbound links and the sitemap. Only display copy changes.

## Questions before I implement

1. **Testimonials section** (`src/data/testimonials.ts`): the 6 quotes are attributed to named people at named companies (e.g. "Senior Manager · Uflex"). Anonymizing them destroys the proof value. Options:
   - **A.** Leave testimonials untouched (they are quoted endorsements, not case-study attributions).
   - **B.** Anonymize the company but keep the author role ("Senior Manager · a leading packaging company"). Author names also removed.
   - **C.** Remove the testimonials section entirely.

2. **Trust Bar / client logos** (`src/data/clients.ts`, shown on the homepage as a logo wall): these are named clients but not case-study attributions. Keep as-is, or also remove/anonymize?

3. **Founders' pedigree** (`src/data/founderPedigree.ts`) and About-page copy may also reference past employers / projects by name — should those be left alone (they're biographical, not case studies)?

Once you confirm 1–3, I'll make the edits in one pass.
