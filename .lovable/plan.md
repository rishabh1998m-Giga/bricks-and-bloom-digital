# Build an About / Our Story page

A world-class editorial "Our Story" page at `/about`, using the user's supplied copy verbatim, in the site's existing warm quarry-dark aesthetic (Instrument Serif display type, terracotta accent, reveal/parallax motion).

## Page structure (`src/routes/about.tsx`)

1. **Opening manifesto** — full-bleed hero (reuse the Legacy Brewing hero image or a material texture) with the line "At Brick & Blooms Ventures, we don't just design landscapes — we craft a new way of living" as a large masked-line serif lockup, animated on load.
2. **Six years chapter** — the "For the last six years…" paragraph set as an oversized editorial statement; "Every space deserves a custom story. A custom design. A custom approach." broken into three stacked masked lines for emphasis.
3. **Single-window partner** — "From concept to completion…" paired with the Softscape / Hardscape duality shown as two labeled image panels (existing material imagery: greenery vs stone/concrete) with clip-path reveals.
4. **Who we build for** — the four sectors (Residential, Commercial, Hospitality, Institutional) as a numbered index list with hover image swap or subtle accent underline; each with its one-line descriptor.
5. **Motto section** — "Creating a New Way of Living" as a full-width dark chapter break, plus the closing paragraphs ("With unique design thinking…" and "Brick & Blooms — Where Every Brick Finds its Bloom").
6. **CTA** — link to /work and /contact reusing the existing ContactCta pattern.

## Technical details

- New route `src/routes/about.tsx` with `createFileRoute("/about")` and its own `head()` (unique title/description/og tags).
- Reuse existing primitives: `RevealScope`, `Line`, `RevealImage`, `useReveal` — no new animation systems.
- Reuse existing assets (hero-legacy, mat-* textures, project photos); no new image generation needed unless a gap appears.
- Add "About" to `Header` nav array and `Footer` link list.
- Copy used verbatim as supplied (normalizing "Brick and Blooms" to the established "Brick & Blooms").
- Verify with Playwright screenshots at desktop + mobile widths.
