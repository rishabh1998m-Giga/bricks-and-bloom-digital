import hero from "@/assets/hero.jpg";
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

/**
 * PLACEHOLDER CONTENT — replace with Brick & Blooms's real project archive,
 * photography and studio copy. Structure is stable; only values change.
 */

export const studio = {
  name: "Brick & Blooms",
  email: "studio@bricksandbloom.in",
  phone: "+91 00000 00000",
  location: "India",
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

export const heroImage = hero;

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
    slug: "jaali-pavilion",
    index: "02",
    name: "Jaali Pavilion",
    location: "Ahmedabad, Gujarat",
    year: "2023",
    category: "Architecture",
    discipline: "Architecture / Fabrication",
    image: p02,
    intro:
      "A perforated brick screen turning direct western light into a slow-moving field of shadow.",
    body: [
      "The pavilion is a single room defined by two jaali walls. The screen module was developed over eleven physical prototypes until the porosity read as solid from outside and dissolved from within.",
      "Shadow is the primary material. Across the day the floor pattern travels the full length of the room, marking time without a single mechanical element.",
    ],
    materials: ["Wire-cut brick", "Grey kota floor", "Mild steel frame"],
    gallery: [
      { src: p02, caption: "Interior, midday", span: "full" },
      { src: matBrick, caption: "Screen module prototype", span: "half" },
      { src: matTimber, caption: "Timber shuttering study", span: "half" },
    ],
  },
  {
    slug: "still-water-court",
    index: "03",
    name: "Still Water Court",
    location: "Bengaluru, Karnataka",
    year: "2023",
    category: "Architecture",
    discipline: "Architecture / Landscape",
    image: p03,
    intro:
      "Two concrete wings held apart by a black reflecting pool — a room made entirely of surface and sky.",
    body: [
      "The court is the building's climatic heart: air drawn across water cools the surrounding rooms by several degrees before it enters them.",
      "The pool is finished in a dark oxide so the walls read twice — once in mass, once in reflection. A single monolith bench is the only object permitted in the space.",
    ],
    materials: ["Board-formed concrete", "Oxide render", "Water"],
    gallery: [
      { src: p03, caption: "The court at rest", span: "full" },
      { src: matConcrete, caption: "Wall texture, north wing", span: "half" },
      { src: matGreen, caption: "Aquatic planting", span: "half" },
    ],
  },
  {
    slug: "roof-meadow",
    index: "04",
    name: "Roof Meadow",
    location: "Mumbai, Maharashtra",
    year: "2022",
    category: "Landscape",
    discipline: "Landscape / Interior",
    image: p04,
    intro:
      "A stone paving grid interrupted by planted bands — a meadow negotiated with a structural slab.",
    body: [
      "Load limits set the geometry. Planting occurs only where the slab is strongest, producing bands of grass that alternate with kota paving in a strict 1:2 rhythm.",
      "The result is neither terrace nor garden but a measured field, softened seasonally as the grasses shift from green to bleached gold.",
    ],
    materials: ["Kota stone", "Ornamental grasses", "Weathering steel"],
    gallery: [
      { src: p04, caption: "Paving and planting rhythm", span: "full" },
      { src: matGreen, caption: "Grass bands in late season", span: "half" },
      { src: matConcrete, caption: "Parapet detail", span: "half" },
    ],
  },
];

export const services = [
  {
    index: "01",
    title: "Architecture",
    lead: "Built form, from first site walk to final joint.",
    detail:
      "Houses, pavilions and small institutional work developed through drawing, physical models and full-scale material mock-ups.",
    capabilities: ["Feasibility & site strategy", "Concept to construction drawings", "Detail & fabrication design", "Site supervision"],
    image: p02,
  },
  {
    index: "02",
    title: "Landscape",
    lead: "Ground, water, planting and time.",
    detail:
      "Landscape as structure rather than decoration — grading, water movement and native planting designed to mature over decades.",
    capabilities: ["Grading & contour design", "Native planting schemes", "Water & stormwater strategy", "Long-term maintenance plans"],
    image: legacyMain.url,
  },
  {
    index: "03",
    title: "Interior / Spatial",
    lead: "The inside of the same idea.",
    detail:
      "Interiors resolved in the same material logic as the building: no applied finishes, no borrowed language.",
    capabilities: ["Spatial planning", "Bespoke joinery", "Material & light studies", "Furniture curation"],
    image: p03,
  },
  {
    index: "04",
    title: "Design + Strategy",
    lead: "Before the drawing, the argument.",
    detail:
      "Briefing, masterplanning and design advisory for clients deciding what should be built at all.",
    capabilities: ["Brief development", "Masterplanning", "Design review & advisory", "Identity & publication"],
    image: p04,
  },
];

export const materials = [
  { name: "Brick", note: "Wire-cut, hand-laid", origin: "Local kilns", image: matBrick },
  { name: "Concrete", note: "Board-formed, unsealed", origin: "Cast in situ", image: matConcrete },
  { name: "Timber", note: "Reclaimed, oiled", origin: "Salvage yards", image: matTimber },
  { name: "Greenery", note: "Native, unclipped", origin: "Regional nurseries", image: matGreen },
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
