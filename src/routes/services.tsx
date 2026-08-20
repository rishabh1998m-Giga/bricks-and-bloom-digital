import { createFileRoute, Link } from "@tanstack/react-router";
import { services } from "@/lib/site-data";
import { RevealImage, RevealScope, Line } from "@/components/site/Reveal";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Architecture, Landscape & Interiors | Brick & Blooms" },
      {
        name: "description",
        content:
          "Architecture, landscape, interiors and design strategy — from first site walk to final joint, resolved at full scale.",
      },
      { property: "og:title", content: "Services — Brick & Blooms" },
      {
        property: "og:description",
        content: "Architecture, landscape, interiors and design strategy from the studio.",
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
    <div className="pt-[26vh] pb-[10vh]">
      <div className="edge">
        <RevealScope threshold={0.05}>
          <p className="meta text-muted-foreground">Capability</p>
          <h1 className="display mt-6 text-[clamp(3rem,13vw,11rem)]">
            <Line delay={0} drift={-70}>
              Services
            </Line>
          </h1>
          <p className="mt-10 max-w-[52ch] text-sm leading-relaxed text-muted-foreground">
            Four disciplines, one drawing set. Projects are led by the same pair of hands from brief to handover,
            with landscape and building resolved in a single section.
          </p>
        </RevealScope>
      </div>

      <div className="mt-24 flex flex-col">
        {services.map((s, i) => (
          <section
            key={s.index}
            className="edge rule-t py-[8vh]"
            aria-label={s.title}
          >
            <div className="grid gap-10 md:grid-cols-12">
              <div className={`md:col-span-6 ${i % 2 === 1 ? "md:order-2" : ""}`}>
                <div className="flex items-baseline gap-6">
                  <span className="meta text-accent">{s.index}</span>
                  <h2 className="display text-[clamp(2.25rem,6.5vw,5.5rem)]">{s.title}</h2>
                </div>
                <p className="display mt-6 text-[clamp(1.25rem,2.4vw,2rem)] italic text-accent">{s.lead}</p>
                <p className="mt-6 max-w-[46ch] text-sm leading-relaxed text-muted-foreground">{s.detail}</p>
                <ul className="mt-10 flex flex-col">
                  {s.capabilities.map((c) => (
                    <li key={c} className="meta border-t border-border py-4 text-muted-foreground">
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
              <div className={`md:col-span-5 ${i % 2 === 1 ? "md:order-1" : "md:col-start-8"}`}>
                <RevealImage
                  src={s.image}
                  alt={`${s.title} work by Brick & Blooms`}
                  direction={i % 2 === 0 ? "right" : "left"}
                  width={1200}
                  height={1500}
                  className="aspect-[4/5]"
                />
              </div>
            </div>
          </section>
        ))}
      </div>

      <div className="edge rule-t pt-12">
        <Link to="/contact" className="display link-draw text-[clamp(1.75rem,5vw,4rem)] italic">
          Discuss a project →
        </Link>
      </div>
    </div>
  );
}
