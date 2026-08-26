# Services Page — Rebuild Around Design & Execution + Maintenance

Replace the current four-discipline Services page entirely with the two service groups you supplied, each item given a two-line description and its own image.

## Content structure

**Design & Execution** (12)
Terrace Garden, Vertical Garden, Villa Landscaping, Pergola & Fabrication, Luxury Landscapes, Swimming Pools, Water Fountains & Ponds, Commercial Landscaping, Landscape Irrigation, Softscape, Hardscape, Moss Wall

**Maintenance** (3)
Garden Maintenance, Office Plant Rental, FRP Planters

Each entry gets a numbered index, the exact service name as given, and a concise two-line description written in the site's existing editorial voice (short, material-led, no marketing filler).

## Layout

Keeps the site's current visual language — no redesign.

```text
[ Capability eyebrow ]
[ Services              ]   large display title
[ short intro paragraph ]

── Design & Execution ──────────  section rule + group heading
 01 Terrace Garden      [image]
 02 Vertical Garden     [image]
 ...  (responsive card grid, 2 up on tablet, 3 up on desktop)

── Maintenance ─────────────────
 01 Garden Maintenance  [image]
 ...

[ Discuss a project → ]
```

- Card: 4:5 image with the existing clip-path reveal, index + name, two-line description underneath.
- Existing `RevealImage` / `RevealScope` / `Line` components and `edge`, `rule-t`, `meta`, `display` utilities are reused, so spacing, type scale and scroll animation match the rest of the site.
- Grid capped at the site's max width so it stays balanced on ultrawide screens; single column on mobile.

## Images

Fifteen new images generated to match the site's warm, material, architectural-photography palette (terracotta, stone, board-formed concrete, dense green planting) — one per service, each specific to its subject (e.g. moss wall close-up, corten pergola, still pool edge, FRP planter row in an office lobby). Uploaded as CDN assets and referenced from the site data file, consistent with how existing project imagery is handled.

## Technical notes

- `src/lib/site-data.ts`: replace the `services` array with a typed structure of two groups, each holding items `{ index, title, description, image, alt }`. Existing consumers of `services` (if any outside the services route) are updated to the new shape.
- `src/routes/services.tsx`: rewrite the body to render the two groups; head/meta updated to describe the new service list (title, description, og tags, canonical preserved).
- No backend, no data model, no changes to other pages.
