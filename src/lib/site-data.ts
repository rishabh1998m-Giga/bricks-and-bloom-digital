import hero from "@/assets/hero-legacy.webp.asset.json";
import p01 from "@/assets/project-01.jpg";
import p02 from "@/assets/project-02.jpg";
import p03 from "@/assets/project-03.jpg";
import p04 from "@/assets/project-04.jpg";
import matBrick from "@/assets/mat-brick.jpg";
import matConcrete from "@/assets/mat-stone.jpg";
import matTimber from "@/assets/mat-concrete.jpg";
import matGreen from "@/assets/mat-green.jpg";
import legacyMain from "@/assets/legacy-main.png.asset.json";
import legacy2 from "@/assets/legacy-2.webp.asset.json";
import legacy3 from "@/assets/legacy-3.webp.asset.json";
import legacy4 from "@/assets/legacy-4.webp.asset.json";
import legacy6 from "@/assets/legacy-6.webp.asset.json";
import emb1 from "@/assets/embassy-1.jpg.asset.json";
import emb2 from "@/assets/embassy-2.jpg.asset.json";
import emb3 from "@/assets/embassy-3.jpg.asset.json";
import emb4 from "@/assets/embassy-4.jpg.asset.json";
import emb5 from "@/assets/embassy-5.jpg.asset.json";
import emb6 from "@/assets/embassy-6.jpg.asset.json";
import emb7 from "@/assets/embassy-7.jpg.asset.json";
import kav1 from "@/assets/kavita-2-2.webp.asset.json";
import kav2 from "@/assets/kavita-3-2.webp.asset.json";
import kav3 from "@/assets/kavita-4-2.webp.asset.json";
import kav4 from "@/assets/kavita-7.webp.asset.json";
import kav5 from "@/assets/kavita-10.webp.asset.json";
import ctn1 from "@/assets/DSC00078.webp.asset.json";
import ctn2 from "@/assets/DSC00080.webp.asset.json";
import ctn3 from "@/assets/DSC00098.webp.asset.json";
import ctn4 from "@/assets/DSC00138.webp.asset.json";
import svcTerrace from "@/assets/svc-terrace-garden.jpg.asset.json";
import svcVertical from "@/assets/svc-vertical-garden.jpg.asset.json";
import svcVilla from "@/assets/svc-villa-landscaping.jpg.asset.json";
import svcPergola from "@/assets/svc-pergola.jpg.asset.json";
import svcLuxury from "@/assets/svc-luxury-landscapes.jpg.asset.json";
import svcPools from "@/assets/svc-swimming-pools.jpg.asset.json";
import svcWater from "@/assets/svc-fountains-ponds.jpg.asset.json";
import svcCommercial from "@/assets/svc-commercial-landscaping.jpg.asset.json";
import svcIrrigation from "@/assets/svc-irrigation.jpg.asset.json";
import svcSoftscape from "@/assets/svc-softscape.jpg.asset.json";
import svcHardscape from "@/assets/svc-hardscape.jpg.asset.json";
import svcMoss from "@/assets/svc-moss-wall.jpg.asset.json";
import svcMaintenance from "@/assets/svc-garden-maintenance.jpg.asset.json";
import svcOffice from "@/assets/svc-office-plants.jpg.asset.json";
import svcPlanters from "@/assets/svc-frp-planters.jpg.asset.json";

/**
 * PLACEHOLDER CONTENT — replace with Brick & Blooms's real project archive,
 * photography and studio copy. Structure is stable; only values change.
 */

export const studio = {
  name: "Brick & Blooms",
  email: "Hello@brickandblooms.com",
  phone: "76768 40060",
  whatsapp: "https://wa.me/917676840060",
  location: "Bengaluru, India",
  socials: [
    { label: "Instagram", href: "#" },
    { label: "LinkedIn", href: "#" },
    { label: "Journal", href: "#" },
  ],
};

import m01 from "@/assets/method-01.jpg";
import m02 from "@/assets/method-02.jpg";
import m03 from "@/assets/method-03.jpg";
import m04 from "@/assets/method-04.jpg";

export const heroImage = hero.url;

export type Category = "Architecture" | "Landscape" | "Interior";

export type Project = {
  slug: string;
  index: string;
  name: string;
  location: string;
  year: string;
  category: Category;
  discipline: string;
  image: string;
  intro: string;
  body: string[];
  materials: string[];
  gallery: { src: string; caption: string; span: "full" | "half" }[];
};

export const projects: Project[] = [
  {
    slug: "legacy-brewing-company",
    index: "01",
    name: "Legacy Brewing Company",
    location: "Bengaluru, Karnataka",
    year: "2024",
    category: "Architecture",
    discipline: "Architecture / Landscape",
    image: legacyMain.url,
    intro:
      "A brewery and courtyard built as one landscape — arched concrete, still water and planting that spills over every edge.",
    body: [
      "The brief asked for a brewhouse that could hold a crowd without feeling like one. The answer was to sink the ground floor behind a run of concrete arches and let a shallow water body wrap the whole plinth, so arrival happens across water rather than tarmac.",
      "Above, weathering-steel screens carry cascading planters. The greenery is structural to the experience: it filters the western sun, cools the terraces, and softens the raw board-formed concrete as it matures season by season.",
    ],
    materials: ["Board-formed concrete", "Weathering steel", "Cascading planting"],
    gallery: [
      { src: legacy2.url, caption: "Arched plinth and reflecting water body", span: "full" },
      { src: legacy3.url, caption: "Terrace seating under the planted edge", span: "half" },
      { src: legacy4.url, caption: "Weathering-steel screen with climbers", span: "half" },
      { src: legacy6.url, caption: "Entry court and fountains", span: "full" },
    ],
  },

  {
    slug: "embassy",
    index: "02",
    name: "Embassy",
    location: "Bengaluru, Karnataka",
    year: "2023",
    category: "Landscape",
    discipline: "Landscape / Interior",
    image: emb1.url,
    intro:
      "A narrow city terrace rebuilt as a green room — stone-and-turf paving, layered planting and a laser-cut screen lit from behind.",
    body: [
      "The site was a leftover strip of deck between a tower wall and its boundary. Rather than furnish it, we re-grounded it: a stone grid interleaved with turf runs the full length, drawing the eye to a shaded lounge at the far end.",
      "Evening is the design condition. Concealed uplights wash the planting, and a perforated corten screen behind the water bowl turns the boundary into the brightest surface on the terrace.",
    ],
    materials: ["Kota and stone paving", "Corten screen", "Layered tropical planting"],
    gallery: [
      { src: emb2.url, caption: "The stone-and-turf walk at dusk", span: "full" },
      { src: emb3.url, caption: "Lounge under the lit pergola", span: "half" },
      { src: emb7.url, caption: "Backlit corten screen and water bowl", span: "half" },
      { src: emb4.url, caption: "Deck and bench beneath the frame", span: "full" },
      { src: emb5.url, caption: "Seating against the planted edge", span: "half" },
      { src: emb6.url, caption: "Paving rhythm and planters", span: "half" },
    ],
  },
  {
    slug: "corten-court",
    index: "03",
    name: "Corten Court",
    location: "Bengaluru, Karnataka",
    year: "2023",
    category: "Landscape",
    discipline: "Landscape / Architecture",
    image: ctn2.url,
    intro:
      "A perforated weathering-steel court where light, gravel and dense tropical planting turn a service gap into the quietest room of the house.",
    body: [
      "A double-height slot between two blocks was clad end to end in perforated corten. The panels are set on a shifting grid so daylight from the skylight above breaks into thousands of moving dots across the gravel and stone below.",
      "At ground level the court is read barefoot: black basalt chip, round stepping stones, soft turf edges and a boulder left as the single object. Monstera, philodendron and heliconia hold the boundary and keep the space cool through the afternoon.",
    ],
    materials: ["Perforated corten screen", "Basalt gravel & stone", "Layered tropical planting"],
    gallery: [
      { src: ctn1.url, caption: "Perforated corten wall under the skylight", span: "full" },
      { src: ctn3.url, caption: "Frangipani and moss bed against textured stone", span: "half" },
      { src: ctn4.url, caption: "Shaded lounge on the planted deck", span: "half" },
    ],
  },
  {
    slug: "kavita",
    index: "04",
    name: "Kavita",
    location: "Bengaluru, Karnataka",
    year: "2022",
    category: "Landscape",
    discipline: "Landscape / Interior",
    image: kav1.url,
    intro:
      "A private courtyard garden of gravel, turf-jointed stone and dense tropical planting, tuned to read as well at night as at noon.",
    body: [
      "The house wrapped a leftover side yard. We re-grounded it: a field of rose gravel meets stepping stone laid into turf, so every route through the garden is felt underfoot before it is seen.",
      "Planting does the enclosure — banana, philodendron and fern layered against the boundary walls — while a stone-clad porch and arched openings anchor the composition. Concealed lighting turns the same garden into a warm, quiet room after dark.",
    ],
    materials: ["Rose gravel & stone", "Turf-jointed paving", "Layered tropical planting"],
    gallery: [
      { src: kav2.url, caption: "Stepping stones set into turf", span: "full" },
      { src: kav3.url, caption: "Bench beneath the wrought-iron screens", span: "half" },
      { src: kav4.url, caption: "Stone-clad porch and gravel walk", span: "half" },
      { src: kav5.url, caption: "The courtyard after dark", span: "full" },
    ],
  },
];

export type ServiceItem = {
  index: string;
  title: string;
  description: string;
  image: string;
  alt: string;
};

export type ServiceGroup = {
  key: string;
  title: string;
  lead: string;
  items: ServiceItem[];
};

export const serviceGroups: ServiceGroup[] = [
  {
    key: "design-execution",
    title: "Design & Execution",
    lead: "Drawn, detailed and built by the same hands.",
    items: [
      {
        index: "01",
        title: "Terrace Garden",
        description:
          "Rooftops and balconies rebuilt as usable ground — load, drainage and soil depth resolved first.\nPlanting chosen to hold its shape through the hottest months.",
        image: svcTerrace.url,
        alt: "Rooftop terrace garden with raised planters and warm paving",
      },
      {
        index: "02",
        title: "Vertical Garden",
        description:
          "Living walls engineered around irrigation, drainage and light before a single plant is set.\nSpecies layered so the wall reads dense from the first week.",
        image: svcVertical.url,
        alt: "Dense living wall of ferns and tropical foliage on a concrete facade",
      },
      {
        index: "03",
        title: "Villa Landscaping",
        description:
          "Private grounds designed as one continuous ground plane from gate to threshold.\nLawn, path and canopy tuned to how the house is actually used.",
        image: svcVilla.url,
        alt: "Villa garden with stepping-stone path, lawn and palms at golden hour",
      },
      {
        index: "04",
        title: "Pergola & Fabrication",
        description:
          "Shade structures, screens and bespoke metalwork detailed for weather and time.\nFabricated in our own workshop and set on site by our team.",
        image: svcPergola.url,
        alt: "Timber pergola casting shadow patterns over a stone deck with climbers",
      },
      {
        index: "05",
        title: "Luxury Landscapes",
        description:
          "Large private estates where every level, edge and sightline is drawn.\nMaterials specified to age well rather than photograph well.",
        image: svcLuxury.url,
        alt: "Luxury landscaped courtyard with sculpted planting and stone terraces",
      },
      {
        index: "06",
        title: "Swimming Pools",
        description:
          "Pools set into the landscape rather than dropped onto it — coping, deck and planting as one detail.\nFiltration and lighting planned with the structure.",
        image: svcPools.url,
        alt: "Still dark-lined swimming pool beside a stone villa terrace",
      },
      {
        index: "07",
        title: "Water Fountains & Ponds",
        description:
          "Moving and still water designed for sound, reflection and cooling.\nPumps, liners and aquatic planting balanced for low maintenance.",
        image: svcWater.url,
        alt: "Stone fountain and lily pond in a shaded garden courtyard",
      },
      {
        index: "08",
        title: "Commercial Landscaping",
        description:
          "Campuses, hotels and workplaces where the landscape carries heavy daily use.\nDetailed for durability, phasing and long service life.",
        image: svcCommercial.url,
        alt: "Corporate campus plaza with structured planting beds and stone paving",
      },
      {
        index: "09",
        title: "Landscape Irrigation",
        description:
          "Drip and sprinkler systems zoned to soil, aspect and plant type.\nAutomated controls that cut water use without stressing the garden.",
        image: svcIrrigation.url,
        alt: "Drip irrigation line and sprinkler head among mulch and groundcover",
      },
      {
        index: "10",
        title: "Softscape",
        description:
          "Soil, turf, shrubs and trees — the living half of the drawing.\nPlanting palettes built from species that belong to the site.",
        image: svcSoftscape.url,
        alt: "Layered planting of ornamental grasses, ferns and flowering shrubs",
      },
      {
        index: "11",
        title: "Hardscape",
        description:
          "Paving, steps, walls and edges cut and laid to a set-out drawing.\nStone, concrete and gravel chosen for grip, wear and warmth.",
        image: svcHardscape.url,
        alt: "Stone paving, steps and a low retaining wall meeting gravel and planting",
      },
      {
        index: "12",
        title: "Moss Wall",
        description:
          "Preserved moss panels that bring texture and quiet indoors with no irrigation.\nCut to the wall, framed or edge-to-edge.",
        image: svcMoss.url,
        alt: "Preserved moss wall panel mounted on a warm interior wall",
      },
    ],
  },
  {
    key: "maintenance",
    title: "Maintenance",
    lead: "The years after handover, held to the same standard.",
    items: [
      {
        index: "01",
        title: "Garden Maintenance",
        description:
          "Scheduled pruning, feeding, pest control and seasonal replanting.\nThe same team that built the garden keeps it.",
        image: svcMaintenance.url,
        alt: "Garden tools resting beside a clipped hedge and mown lawn",
      },
      {
        index: "02",
        title: "Office Plant Rental",
        description:
          "Curated indoor planting supplied, placed and rotated on contract.\nWatering and replacement handled entirely by us.",
        image: svcOffice.url,
        alt: "Modern office lobby with large potted indoor plants in daylight",
      },
      {
        index: "03",
        title: "FRP Planters",
        description:
          "Lightweight fibreglass planters in bespoke sizes, finishes and colours.\nBuilt for terraces and rooftops where weight matters.",
        image: svcPlanters.url,
        alt: "Row of large fibreglass planters in terracotta and stone finishes",
      },
    ],
  },
];

/** Flat list of service names, used by the contact form discipline picker. */
export const services = serviceGroups.flatMap((g) =>
  g.items.map((item) => ({ title: item.title, group: g.title })),
);


export const materials = [
  { name: "Brick", note: "Wire-cut, hand-laid", origin: "Local kilns", image: matBrick },
  { name: "Concrete", note: "Board-formed, unsealed", origin: "Cast in situ", image: matConcrete },
  { name: "Timber", note: "Reclaimed, oiled", origin: "Salvage yards", image: matTimber },
  { name: "Greenery", note: "Native, unclipped", origin: "Regional nurseries", image: matGreen },
];

export const howWeWork = [
  {
    index: "01",
    title: "CONSULT",
    caption: "Listening on site",
    tags: ["Site visit", "Brief", "Context study"],
    description:
      "We listen. We visit your site, understand your requirements, lifestyle, and vision. Every great landscape starts with a conversation.",
  },
  {
    index: "02",
    title: "DESIGN & PROPOSE",
    caption: "Drawing the vision",
    tags: ["3D visuals", "Material palette", "Transparent estimate"],
    description:
      "Our team of landscape architects translates your vision into a bespoke design. We present detailed 3D visuals, material selections, and a transparent estimate proposal — fully customized for you.",
  },
  {
    index: "03",
    title: "APPROVE",
    caption: "Clarity before ground breaks",
    tags: ["Sign-off", "No hidden costs", "Timeline"],
    description:
      "Once you love the design, you sign off on the proposal. No hidden costs, no confusion. Just clarity to begin.",
  },
  {
    index: "04",
    title: "EXECUTE",
    caption: "Turnkey build",
    tags: ["Hardscape", "Softscape", "Lighting & irrigation"],
    description:
      "Our turnkey execution team takes over. From hardscape to softscape, lighting to irrigation — we manage everything end-to-end, on time, with precision.",
  },
  {
    index: "05",
    title: "MAINTAIN",
    caption: "Growing with time",
    tags: ["Seasonal care", "Plant health", "Long-term"],
    description:
      "We don't just build, we nurture. Our maintenance team ensures your landscape grows more beautiful with time.",
  },
];


export const approach = [
  {
    index: "01",
    title: "Site first",
    text: "Every project begins with weeks on the ground: light, wind, water, existing trees, what the neighbours already built.",
    image: m01,
    alt: "Survey instrument set up on bare ground beside mature trees at golden hour",
  },
  { index: "02", title: "Draw slowly", text: "Hand sections before software. The section is where architecture and landscape actually meet.", image: m02, alt: "Hand drawing an architectural section in pencil under a warm desk lamp" },
  { index: "03", title: "Build a piece", text: "Full-scale mock-ups of the one detail that carries the project.", image: m03, alt: "Full-scale brick and concrete mock-up wall standing in a workshop" },
  {
    index: "04",
    title: "Leave it open",
    text: "We design for the state a place reaches in fifteen years, not for the photograph taken in its first week.",
    image: m04,
    alt: "Weathered brick wall overgrown with climbers and ornamental grasses",
  },
];
