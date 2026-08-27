import { createFileRoute } from "@tanstack/react-router";

import { Hero } from "@/components/home/Hero";
import { Statement } from "@/components/home/Statement";

import { FeaturedWork } from "@/components/home/FeaturedWork";

import { HowWeWork } from "@/components/home/HowWeWork";
import { ContactCta } from "@/components/home/ContactCta";
import { MapLocation } from "@/components/home/MapLocation";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Brick & Blooms — Architecture & Landscape Studio" },
      {
        name: "description",
        content:
          "Brick & Blooms is an architecture and landscape studio designing built form and open ground with equal attention.",
      },
      { property: "og:title", content: "Brick & Blooms — Architecture & Landscape Studio" },
      {
        property: "og:description",
        content: "Structure holds. Planting moves. We design the joint. Architecture and landscape, in balance.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://bricks-and-bloom-digital.lovable.app/" },
    ],
    links: [{ rel: "canonical", href: "https://bricks-and-bloom-digital.lovable.app/" }],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Hero />
      <Statement />
      <FeaturedWork />
      <HowWeWork />
      <ContactCta />
      <MapLocation />
    </>
  );
}
