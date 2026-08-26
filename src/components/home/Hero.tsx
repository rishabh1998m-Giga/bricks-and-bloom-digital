import { Link } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import { heroImage } from "@/lib/site-data";
import { usePinProgress, usePointerField } from "@/lib/motion";

/**
 * Full-viewport architectural field. The image is pinned while the page
 * scrolls: type separates, the frame crops inward, and the next section
 * emerges through the aperture rather than after it.
 */
export function Hero() {
  const { ref, progress } = usePinProgress<HTMLDivElement>();
  const pointer = usePointerField();

  const inset = progress * 8; // frame crops inward, in vw
  const typeShift = progress * 100;

  return (
    <section ref={ref} className="relative h-[145svh] md:h-[170svh]" aria-label="Brick & Blooms">
      <div className="sticky top-0 h-svh overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            clipPath: `inset(${inset * 0.6}vh ${inset}vw ${inset * 0.6}vh ${inset}vw)`,
            transition: "clip-path .1s linear",
          }}
        >
          <img
            src={heroImage}
            alt="Concrete arcade over a still water channel, planted terraces spilling greenery above"
            width={1920}
            height={1200}
            fetchPriority="high"
            decoding="async"
            className="h-full w-full object-cover"
            style={{
              transform: `scale(${1.12 + progress * 0.06}) translate3d(${pointer.x * -14}px, ${pointer.y * -10 - progress * 40}px, 0)`,
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, color-mix(in oklab, var(--ink) 62%, transparent) 0%, color-mix(in oklab, var(--ink) 30%, transparent) 42%, color-mix(in oklab, var(--ink) 82%, transparent) 100%)",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to right, color-mix(in oklab, var(--ink) 72%, transparent) 0%, color-mix(in oklab, var(--ink) 34%, transparent) 46%, transparent 78%)",
            }}
          />
        </div>

        {/* hero title — layered editorial lockup */}
        <div
          className="pointer-events-none absolute inset-0 flex items-end pb-[17.5rem] sm:pb-[15rem] md:items-center md:pb-0"
          style={{
            opacity: 1 - progress * 1.5,
            transform: `translate3d(0, ${-typeShift * 0.35}px, 0)`,
          }}
        >
          <div className="edge w-full">
            <p className="meta mb-4 flex items-center gap-3 text-foreground/70 md:mb-6">
              <span className="inline-block h-px w-8 bg-accent" />
              Landscape &amp; architecture studio
            </p>
            <h1 className="display text-balance text-foreground [text-shadow:0_2px_28px_color-mix(in_oklab,var(--ink)_75%,transparent)]">
              <span
                className="block"
                style={{
                  fontSize: "clamp(2.75rem, 8vw + 1rem, 5.75rem)",
                  lineHeight: 1.02,
                  transform: `translate3d(${pointer.x * 6}px, 0, 0)`,
                }}
              >
                New Way
              </span>
              <span
                className="block italic"
                style={{
                  fontSize: "clamp(2.25rem, 6.6vw + 0.9rem, 4.9rem)",
                  lineHeight: 1.05,
                  marginLeft: "clamp(1rem, 9vw, 9rem)",
                  transform: `translate3d(${pointer.x * -10}px, 0, 0)`,
                }}
              >
                of Living
              </span>
            </h1>
          </div>
        </div>

        {/* precise information, small against the monument */}
        <div
          className="edge absolute inset-x-0 bottom-0 pb-[max(1.5rem,env(safe-area-inset-bottom))] md:pb-8"
          style={{ opacity: 1 - progress * 1.6 }}
        >
          <div className="grid grid-cols-2 gap-3 pb-4 sm:flex sm:flex-wrap sm:items-center sm:gap-4 sm:pb-5">
            <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
              <Link to="/work">Our Work</Link>
            </Button>
            <Button asChild variant="default" size="lg" className="w-full sm:w-auto">
              <Link to="/contact">Book Appointment</Link>
            </Button>
          </div>
          <div className="rule-t flex flex-wrap items-end justify-between gap-x-6 gap-y-2 pt-4 sm:pt-5">
            <p className="meta max-w-[34ch] text-foreground/90">
              Architecture, landscape and the ground between them.
            </p>

            <p className="meta hidden max-w-[30ch] text-right text-foreground/75 md:block">
              Structure holds. Planting moves. We design the joint.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
