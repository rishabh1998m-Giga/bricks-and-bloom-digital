import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { projects } from "@/lib/site-data";
import { usePinProgress, clamp } from "@/lib/motion";
import { RevealImage, RevealScope, Line } from "@/components/site/Reveal";

/**
 * Horizontal run of the project archive, driven by vertical scroll on
 * desktop and a native swipe rail on touch.
 */
export function FeaturedWork() {
  const { ref, progress } = usePinProgress<HTMLDivElement>();
  const trackRef = useRef<HTMLDivElement | null>(null);
  // Exact horizontal distance the rail must travel so the last panel lands
  // flush with the right edge — no empty run-out before the next section.
  const [travel, setTravel] = useState(0);

  useEffect(() => {
    const measure = () => {
      const el = trackRef.current;
      if (!el) return;
      setTravel(Math.max(0, el.scrollWidth - window.innerWidth));
    };
    measure();
    window.addEventListener("resize", measure);
    const t = window.setTimeout(measure, 400);
    return () => {
      window.removeEventListener("resize", measure);
      window.clearTimeout(t);
    };
  }, []);

  const shift = clamp(progress) * travel;
  // Pin only as long as there is horizontal distance left to cover.
  const pinHeight = travel > 0 ? `calc(100svh + ${Math.round(travel)}px)` : "100svh";

  return (
    <section aria-label="Selected work">
      <div className="edge section-t">
        <RevealScope threshold={0.4}>
          <div className="rule-t flex flex-wrap items-end justify-between gap-6 pt-5">
            <p className="meta text-muted-foreground">
              <span className="text-accent">03</span> — Selected work
            </p>
            <Link to="/work" className="meta link-draw">
              Full archive ({projects.length})
            </Link>
          </div>
          <h2 className="display mt-6 text-[clamp(2.45rem,5.8vw,5.25rem)] leading-[0.95] md:mt-8 md:leading-[0.86]">
            <Line delay={0} drift={-60}>
              Four sites,
            </Line>
            <Line delay={120} drift={50} className="italic text-accent">
              four arguments.
            </Line>
          </h2>
        </RevealScope>
      </div>

      {/* desktop: pinned horizontal run */}
      <div ref={ref} className="relative hidden md:block" style={{ height: pinHeight }}>
        <div className="sticky top-0 flex h-svh items-center overflow-hidden">
          <div
            ref={trackRef}
            className="flex w-max gap-[6vw] px-[clamp(1.25rem,4vw,4.5rem)] will-change-transform"
            style={{ transform: `translate3d(-${shift}px, 0, 0)` }}
          >
            {projects.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
            <div className="flex w-[min(30vw,26rem)] shrink-0 items-center">
              <Link to="/work" className="display text-[clamp(1.9rem,4.2vw,3.75rem)] italic text-accent link-draw">
                See all work →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* touch: swipe rail */}
      <div className="no-scrollbar mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto px-[clamp(1.25rem,4vw,4.5rem)] pb-6 md:hidden">
        {projects.map((p) => (
          <div key={p.slug} className="w-[78vw] shrink-0 snap-start">
            <ProjectCard project={p} />
          </div>
        ))}
      </div>
    </section>
  );
}

function ProjectCard({ project: p }: { project: (typeof projects)[number] }) {
  return (
    <Link
      to="/work/$slug"
      params={{ slug: p.slug }}
      data-cursor="Open project"
      className="group block w-full shrink-0 md:w-[min(34vw,32rem)]"
    >
      <div className="flex items-baseline justify-between">
        <span className="meta text-accent">{p.index}</span>
        <span className="meta text-muted-foreground">{p.year}</span>
      </div>
      <RevealImage
        src={p.image}
        alt={`${p.name}, ${p.location}`}
        direction="up"
        width={1200}
        height={1500}
        className="mt-4 aspect-[4/5]"
        imgClassName="transition-transform duration-[1.4s] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.04]"
      />
      <div className="rule-t mt-5 flex items-baseline justify-between gap-4 pt-4">
        <h3 className="display text-[clamp(1.75rem,3vw,2.75rem)]">{p.name}</h3>
        <span className="meta shrink-0 text-muted-foreground">{p.category}</span>
      </div>
      <p className="body-copy mt-3 max-w-[40ch] text-muted-foreground">{p.intro}</p>
    </Link>
  );
}
