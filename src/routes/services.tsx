import { createFileRoute, Link } from "@tanstack/react-router";
import { serviceGroups, type ServiceItem } from "@/lib/site-data";
import { RevealScope, Line } from "@/components/site/Reveal";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Landscape Design, Execution & Maintenance | Brick & Blooms" },
      {
        name: "description",
        content:
          "Terrace and vertical gardens, villa landscaping, pergolas, pools, water features, softscape, hardscape, moss walls — plus garden maintenance, office plant rental and FRP planters.",
      },
      { property: "og:title", content: "Services — Brick & Blooms" },
      {
        property: "og:description",
        content:
          "Landscape design and execution, from terrace gardens to swimming pools — and the maintenance that keeps them.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://bricks-and-bloom-digital.lovable.app/services" },
    ],
    links: [{ rel: "canonical", href: "https://bricks-and-bloom-digital.lovable.app/services" }],
  }),
  component: ServicesPage,
});

function ServiceRow({ item }: { item: ServiceItem }) {
  return (
    <li>
      <details className="group border-t border-border/60 [&_summary::-webkit-details-marker]:hidden">
        <summary className="flex cursor-pointer list-none items-baseline gap-5 py-[clamp(1.25rem,3vh,2.25rem)] transition-colors duration-500 hover:bg-accent/[0.04] sm:gap-10">
          <span className="meta w-8 shrink-0 text-muted-foreground transition-colors duration-500 group-open:text-accent group-hover:text-accent">
            {item.index}
          </span>
          <h3 className="display flex-1 text-[clamp(1.6rem,4.2vw,3.25rem)] leading-[1.05] transition-all duration-500 group-open:italic group-open:text-accent group-hover:translate-x-2 group-hover:italic group-hover:text-accent">
            {item.title}
          </h3>
          <span
            aria-hidden
            className="display shrink-0 text-[clamp(1.5rem,3vw,2.5rem)] leading-none text-muted-foreground transition-transform duration-500 group-open:rotate-45 group-open:text-accent group-hover:rotate-45 group-hover:text-accent"
          >
            +
          </span>
        </summary>
        <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-open:grid-rows-[1fr]">
          <div className="overflow-hidden">
            <p className="body-copy max-w-[58ch] pb-[clamp(1.5rem,3.5vh,2.5rem)] pl-[3.25rem] text-muted-foreground sm:pl-[4.5rem]">
              {item.description}
            </p>
          </div>
        </div>
      </details>
    </li>
  );
}

function ServicesPage() {
  return (
    <div className="pt-[clamp(8rem,26vh,16rem)] pb-[clamp(4rem,10vh,9rem)]">
      <div className="edge">
        <RevealScope threshold={0.05}>
          <p className="meta text-muted-foreground">Capability</p>
          <h1 className="display mt-6 text-[clamp(3rem,13vw,11rem)]">
            <Line delay={0} drift={-70}>
              Services
            </Line>
          </h1>
          <p className="body-copy mt-10 max-w-[52ch] text-muted-foreground">
            Two halves of the same practice — design and execution on one side, long-term care on the other.
            Every scope is drawn, built and maintained by the same team.
          </p>
          <p className="meta mt-6 text-accent">Select a scope to read more</p>
        </RevealScope>
      </div>

      {serviceGroups.map((group) => (
        <section
          key={group.key}
          className="edge rule-t mt-[clamp(3rem,8vh,6rem)] pt-[clamp(1.75rem,4.5vh,3.5rem)]"
          aria-labelledby={`group-${group.key}`}
        >
          <RevealScope threshold={0.05}>
            <div className="flex flex-wrap items-baseline justify-between gap-x-10 gap-y-3">
              <h2 id={`group-${group.key}`} className="display text-[clamp(2rem,5.5vw,4.25rem)]">
                {group.title}
              </h2>
              <p className="display text-[clamp(1rem,1.8vw,1.5rem)] italic text-accent">{group.lead}</p>
            </div>
          </RevealScope>

          <ul className="mt-[clamp(1.75rem,4.5vh,3rem)] border-b border-border/60">
            {group.items.map((item) => (
              <ServiceRow key={item.title} item={item} />
            ))}
          </ul>
        </section>
      ))}

      <div className="edge rule-t mt-[clamp(3rem,8vh,6rem)] pt-12">
        <Link to="/contact" className="display link-draw text-[clamp(1.75rem,5vw,4rem)] italic">
          Discuss a project →
        </Link>
      </div>
    </div>
  );
}
