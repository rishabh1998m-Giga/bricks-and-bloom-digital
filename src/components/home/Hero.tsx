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
    <section ref={ref} className="relative h-[190svh]" aria-label="Bricks and Bloom">
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
            alt="Courtyard house at dusk: board-formed concrete meeting hand-laid brick around a still water channel"
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
                "linear-gradient(to bottom, color-mix(in oklab, var(--ink) 55%, transparent) 0%, transparent 35%, color-mix(in oklab, var(--ink) 70%, transparent) 100%)",
            }}
          />
        </div>

        {/* monumental wordmark, asymmetric and edge-bound */}
        <div className="edge pointer-events-none absolute inset-0 flex flex-col justify-center">
          <h1 className="sr-only">Bricks &amp; Bloom — architecture and landscape studio</h1>
          <div aria-hidden className="relative">
            <span
              className="display block text-[clamp(3.5rem,17vw,15rem)] leading-[0.82]"
              style={{ transform: `translate3d(${pointer.x * 8 - typeShift * 0.4}px, ${pointer.y * 5}px, 0)` }}
            >
              Bricks
            </span>
            <span
              className="display block pl-[6vw] text-[clamp(2rem,7vw,6rem)] italic text-accent"
              style={{ transform: `translate3d(${pointer.x * -12}px, ${pointer.y * 8 - progress * 20}px, 0)` }}
            >
              &amp;
            </span>
            <span
              className="display block text-right text-[clamp(3.5rem,17vw,15rem)] italic leading-[0.82]"
              style={{ transform: `translate3d(${pointer.x * -8 + typeShift * 0.5}px, ${pointer.y * -5}px, 0)` }}
            >
              Bloom
            </span>
          </div>
        </div>

        {/* precise information, small against the monument */}
        <div
          className="edge absolute inset-x-0 bottom-0 pb-8"
          style={{ opacity: 1 - progress * 1.6 }}
        >
          <div className="rule-t flex flex-wrap items-end justify-between gap-6 pt-5">
            <p className="meta max-w-[22ch] text-foreground/80">
              Architecture, landscape and the ground between them. New Delhi.
            </p>
            <p className="meta max-w-[26ch] text-right text-muted-foreground">
              Structure holds. Planting moves. We design the joint.
            </p>
          </div>
          <p className="meta mt-6 text-accent">
            Scroll — <span className="text-muted-foreground">enter the court</span>
          </p>
        </div>
      </div>
    </section>
  );
}
