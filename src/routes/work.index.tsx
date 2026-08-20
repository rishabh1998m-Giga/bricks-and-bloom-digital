import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { projects, type Category } from "@/lib/site-data";
import { RevealImage, RevealScope, Line } from "@/components/site/Reveal";

export const Route = createFileRoute("/work/")({
  head: () => ({
    meta: [
      { title: "Work — Brick & Blooms Architecture & Landscape" },
      {
        name: "description",
        content:
          "Selected architecture, landscape and interior projects by Brick & Blooms across Gujarat, Karnataka and Maharashtra.",
      },
      { property: "og:title", content: "Work — Brick & Blooms" },
      { property: "og:description", content: "An archive of built form and open ground." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://bricks-and-bloom-digital.lovable.app/work" },
    ],
    links: [{ rel: "canonical", href: "https://bricks-and-bloom-digital.lovable.app/work" }],
  }),
  component: WorkIndex,
});

const filters = ["All", "Architecture", "Landscape", "Interior"] as const;

function WorkIndex() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const shown = projects.filter((p) => filter === "All" || p.category === (filter as Category));

  return (
    <div className="edge pt-[26vh] pb-[12vh]">
      <RevealScope threshold={0.1}>
        <p className="meta text-muted-foreground">Archive — {projects.length} projects</p>
        <h1 className="display mt-6 text-[clamp(3rem,13vw,11rem)]">
          <Line delay={0} drift={-70}>
            Work
          </Line>
        </h1>

        <div className="rule-t mt-12 flex flex-wrap gap-8 pt-5">
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className="meta link-draw"
              data-active={filter === f ? "true" : "false"}
              style={{ color: filter === f ? "var(--clay)" : undefined }}
            >
              {f}
            </button>
          ))}
        </div>
      </RevealScope>

      <div className="mt-16 grid gap-x-10 gap-y-24 md:grid-cols-2">
        {shown.map((p, i) => (
          <Link
            key={p.slug}
            to="/work/$slug"
            params={{ slug: p.slug }}
            data-cursor="Open project"
            className="group block"
            style={{ marginTop: i % 2 === 1 ? "6rem" : undefined }}
          >
            <div className="flex items-baseline justify-between">
              <span className="meta text-accent">{p.index}</span>
              <span className="meta text-muted-foreground">
                {p.category} — {p.year}
              </span>
            </div>
            <RevealImage
              src={p.image}
              alt={`${p.name}, ${p.location}`}
              direction={i % 2 === 0 ? "left" : "right"}
              width={1200}
              height={1500}
              className="mt-4 aspect-[4/5]"
              imgClassName="transition-transform duration-[1.4s] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.04]"
            />
            <div className="rule-t mt-5 flex items-baseline justify-between gap-4 pt-4">
              <h2 className="display text-[clamp(1.9rem,3.5vw,3rem)]">{p.name}</h2>
              <span className="meta shrink-0 text-muted-foreground">{p.location}</span>
            </div>
            <p className="mt-3 max-w-[46ch] text-sm leading-relaxed text-muted-foreground">{p.intro}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
