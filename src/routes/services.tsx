import { createFileRoute, Link } from "@tanstack/react-router";
import { serviceGroups } from "@/lib/site-data";
import { RevealImage, RevealScope, Line } from "@/components/site/Reveal";

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
          <p className="mt-10 max-w-[52ch] text-sm leading-relaxed text-muted-foreground">
            Two halves of the same practice — design and execution on one side, long-term care on the other.
            Every scope is drawn, built and maintained by the same team.
          </p>
        </RevealScope>
      </div>

      {serviceGroups.map((group) => (
        <section
          key={group.key}
          className="edge rule-t mt-[clamp(3.5rem,9vh,7rem)] pt-[clamp(2rem,5vh,4rem)]"
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

          <ul className="mt-[clamp(2rem,5vh,3.5rem)] grid gap-x-8 gap-y-[clamp(2.5rem,6vh,4.5rem)] sm:grid-cols-2 lg:grid-cols-3">
            {group.items.map((item, i) => (
              <li key={item.title} className="flex flex-col">
                <RevealImage
                  src={item.image}
                  alt={item.alt}
                  direction={i % 3 === 1 ? "left" : i % 3 === 2 ? "right" : "up"}
                  width={1200}
                  height={1500}
                  className="aspect-[4/5]"
                />
                <div className="mt-5 flex items-baseline gap-4">
                  <span className="meta text-accent">{item.index}</span>
                  <h3 className="display text-[clamp(1.35rem,2.4vw,1.9rem)]">{item.title}</h3>
                </div>
                <p className="mt-3 max-w-[38ch] whitespace-pre-line text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </li>
            ))}
          </ul>
        </section>
      ))}

      <div className="edge rule-t mt-[clamp(3.5rem,9vh,7rem)] pt-12">
        <Link to="/contact" className="display link-draw text-[clamp(1.75rem,5vw,4rem)] italic">
          Discuss a project →
        </Link>
      </div>
    </div>
  );
}
