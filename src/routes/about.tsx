import { createFileRoute, Link } from "@tanstack/react-router";
import { materials } from "@/lib/site-data";
import { BloomScene } from "@/components/site/BloomScene";
import { RevealImage, RevealScope, Line } from "@/components/site/Reveal";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Our Story — Brick & Blooms" },
      {
        name: "description",
        content:
          "For six years Brick & Blooms has crafted bespoke landscape architecture and turnkey execution across residential, commercial, hospitality and institutional spaces — where every brick finds its bloom.",
      },
      { property: "og:title", content: "Our Story — Brick & Blooms" },
      {
        property: "og:description",
        content:
          "We don't just design landscapes — we craft a new way of living. Bespoke landscape architecture and turnkey execution, from concept to completion.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://bricks-and-bloom-digital.lovable.app/about" },
    ],
    links: [{ rel: "canonical", href: "https://bricks-and-bloom-digital.lovable.app/about" }],
  }),
  component: AboutPage,
});

const sectors = [
  { index: "01", title: "Residential", detail: "Private villas, bungalows, and luxury apartments" },
  { index: "02", title: "Commercial", detail: "Corporate campuses, retail, and workspaces" },
  { index: "03", title: "Hospitality", detail: "Resorts, hotels, and retreats" },
  { index: "04", title: "Institutional", detail: "Schools, hospitals, and public spaces" },
];

const greenery = materials.find((m) => m.name === "Greenery")!;
const concrete = materials.find((m) => m.name === "Concrete")!;

function AboutPage() {
  return (
    <div className="pb-[clamp(3rem,7vh,6rem)]">
      {/* 01 — Opening manifesto over the living sculpture */}
      <section
        className="relative flex min-h-[92svh] items-end overflow-hidden"
        aria-label="Our story"
      >
        {/* 3D centrepiece: a breathing brick wall with rising blooms */}
        <BloomScene className="absolute inset-0" />
        {/* vignette + bottom scrim keep the typography legible */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 90% at 50% 38%, transparent 40%, color-mix(in oklab, var(--ink) 55%, transparent) 100%)",
          }}
        />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, color-mix(in oklab, var(--ink) 88%, transparent) 0%, transparent 38%)",
          }}
        />
        <div className="edge relative w-full pb-[clamp(2.5rem,6vh,4.5rem)] pt-[clamp(8rem,22vh,13rem)]">
          <RevealScope threshold={0.05}>
            <p className="meta text-muted-foreground">
              <span className="text-accent">Our Story</span> — Est. six years ago
            </p>
            <h1 className="display mt-5 max-w-[16ch] text-[clamp(2.5rem,8vw,7.25rem)] leading-[1.02]">
              <Line delay={0} drift={-60}>
                We don&rsquo;t just design
              </Line>
              <Line delay={120} drift={50}>
                landscapes — we craft
              </Line>
              <Line delay={240} drift={-40} className="italic text-accent">
                a new way of living.
              </Line>
            </h1>
          </RevealScope>
        </div>
      </section>

      {/* 02 — Six years chapter */}
      <section className="edge section-y" aria-labelledby="about-six-years">
        <RevealScope threshold={0.2}>
          <div className="rule-t pt-5">
            <p className="meta text-muted-foreground">
              <span className="text-accent">01</span> — The practice
            </p>
          </div>
          <h2
            id="about-six-years"
            className="display mt-12 max-w-[26ch] text-[clamp(1.75rem,4.2vw,3.75rem)] leading-[1.15]"
          >
            For the last six years, we have been redefining exterior spaces through bespoke Landscape
            Architecture and Turnkey Execution.
          </h2>
        </RevealScope>

        <RevealScope threshold={0.3} className="mt-[clamp(3.5rem,10vh,8rem)]">
          <p className="meta text-muted-foreground">Every space deserves</p>
          <p className="display mt-8 text-[clamp(2.25rem,7vw,6rem)] leading-[1.05]">
            <Line delay={0} drift={-50}>
              A custom story.
            </Line>
            <Line delay={130} drift={60} className="italic">
              A custom design.
            </Line>
            <Line delay={260} drift={-40} className="text-accent">
              A custom approach.
            </Line>
          </p>
        </RevealScope>
      </section>

      {/* 03 — Softscape / Hardscape duality */}
      <section className="edge section-y" aria-labelledby="about-duality">
        <RevealScope threshold={0.2}>
          <div className="rule-t pt-5">
            <p className="meta text-muted-foreground">
              <span className="text-accent">02</span> — One partner, both crafts
            </p>
          </div>
          <p className="mt-12 max-w-[52ch] text-sm leading-relaxed text-muted-foreground md:text-base">
            From concept to completion, we are your single-window partner for transforming outdoor
            visions into enduring realities. Our expertise blends the art of Softscape with the
            strength of Hardscape, creating balanced, breathing exteriors that are timeless,
            functional, and soulful.
          </p>
        </RevealScope>

        <div className="mt-[clamp(2.5rem,6vh,4.5rem)] grid gap-8 md:grid-cols-2">
          <figure>
            <RevealImage
              src={greenery.image}
              alt="Dense native greenery, unclipped and layered"
              direction="left"
              width={1200}
              height={1500}
              className="aspect-[4/5]"
            />
            <figcaption className="mt-5 flex items-baseline justify-between gap-6">
              <span className="display text-[clamp(1.5rem,2.8vw,2.25rem)]">Softscape</span>
              <span className="meta text-accent">The art</span>
            </figcaption>
          </figure>
          <figure className="md:mt-[clamp(3rem,8vh,6rem)]">
            <RevealImage
              src={concrete.image}
              alt="Board-formed concrete and cut stone surfaces"
              direction="right"
              width={1200}
              height={1500}
              className="aspect-[4/5]"
            />
            <figcaption className="mt-5 flex items-baseline justify-between gap-6">
              <span className="display text-[clamp(1.5rem,2.8vw,2.25rem)]">Hardscape</span>
              <span className="meta text-accent">The strength</span>
            </figcaption>
          </figure>
        </div>
      </section>

      {/* 04 — Who we build for */}
      <section className="edge section-y" aria-labelledby="about-sectors">
        <RevealScope threshold={0.2}>
          <div className="rule-t pt-5">
            <p className="meta text-muted-foreground">
              <span className="text-accent">03</span> — Who we build for
            </p>
          </div>
          <h2
            id="about-sectors"
            className="display mt-12 text-[clamp(2rem,5.5vw,4.5rem)]"
          >
            We curate exterior <span className="italic text-accent">environments</span> for
          </h2>
        </RevealScope>

        <ul className="mt-[clamp(2.5rem,6vh,4.5rem)]">
          {sectors.map((s) => (
            <li key={s.index}>
              <RevealScope threshold={0.35}>
                <div className="rule-t group flex flex-wrap items-baseline gap-x-8 gap-y-1 py-7 transition-colors duration-500 hover:bg-[color-mix(in_oklab,var(--accent)_6%,transparent)] md:py-9">
                  <span className="meta w-10 text-accent">{s.index}</span>
                  <h3 className="display text-[clamp(1.75rem,4.5vw,3.5rem)] transition-transform duration-500 group-hover:translate-x-3">
                    {s.title}
                  </h3>
                  <p className="meta ml-auto text-muted-foreground">{s.detail}</p>
                </div>
              </RevealScope>
            </li>
          ))}
        </ul>
      </section>

      {/* 05 — Motto */}
      <section className="edge section-y" aria-labelledby="about-motto">
        <RevealScope threshold={0.25}>
          <div className="rule-t pt-5">
            <p className="meta text-muted-foreground">
              <span className="text-accent">04</span> — Our motto
            </p>
          </div>
          <h2
            id="about-motto"
            className="display mt-12 text-[clamp(2.75rem,10vw,9rem)] leading-[1.02]"
          >
            <Line delay={0} drift={-60}>
              Creating a
            </Line>
            <Line delay={140} drift={70} className="italic text-accent">
              New Way of Living.
            </Line>
          </h2>
          <p className="mt-[clamp(2.5rem,6vh,4rem)] max-w-[54ch] text-sm leading-relaxed text-muted-foreground md:text-base">
            With unique design thinking, meticulous project management, and flawless execution, we
            build not just landscapes, but lifestyles.
          </p>
          <p className="display mt-[clamp(3rem,8vh,5.5rem)] max-w-[20ch] text-[clamp(1.5rem,3.4vw,2.75rem)] italic leading-snug">
            Brick &amp; Blooms — where every brick finds its{" "}
            <span className="text-accent">bloom.</span>
          </p>
        </RevealScope>
      </section>

      {/* 06 — CTA */}
      <div className="edge rule-t pt-12">
        <RevealScope threshold={0.3}>
          <div className="flex flex-wrap items-end justify-between gap-8">
            <Link
              to="/work"
              className="display link-draw text-[clamp(1.75rem,5vw,4rem)] italic"
            >
              See the work →
            </Link>
            <Link to="/contact" className="meta link-draw text-muted-foreground">
              Or start a conversation
            </Link>
          </div>
        </RevealScope>
      </div>
    </div>
  );
}
