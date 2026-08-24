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
    <section ref={ref} className="relative h-[190svh]" aria-label="Brick & Blooms">
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
          className="pointer-events-none absolute inset-0 flex items-center"
          style={{
            opacity: 1 - progress * 1.5,
            transform: `translate3d(0, ${-typeShift * 0.35}px, 0)`,
          }}
        >
          <div className="edge w-full">
            <h1 className="display text-balance text-foreground [text-shadow:0_2px_28px_color-mix(in_oklab,var(--ink)_75%,transparent)]">
              <span
                className="block"
                style={{
                  fontSize: "clamp(2.75rem, 11vw, 9.5rem)",
                  transform: `translate3d(${pointer.x * 6}px, 0, 0)`,
                }}
              >
                Nature&rsquo;s
              </span>
              <span
                className="block italic"
                style={{
                  fontSize: "clamp(2.25rem, 9vw, 8rem)",
                  marginLeft: "clamp(1.5rem, 12vw, 14rem)",
                  transform: `translate3d(${pointer.x * -10}px, 0, 0)`,
                }}
              >
                Beauty
              </span>
              <span
                className="meta mt-6 block text-foreground/85"
                style={{
                  fontSize: "clamp(0.7rem, 1.1vw, 0.95rem)",
                  letterSpacing: "0.42em",
                  marginLeft: "clamp(0.25rem, 3vw, 3rem)",
                }}
              >
                Delivered
              </span>
            </h1>
          </div>
        </div>

        {/* precise information, small against the monument */}
        <div
          className="edge absolute inset-x-0 bottom-0 pb-8"
          style={{ opacity: 1 - progress * 1.6 }}
        >
          <div className="rule-t flex flex-wrap items-end justify-between gap-6 pt-5">
            <p className="meta max-w-[22ch] text-foreground/90">
              Architecture, landscape and the ground between them.
            </p>

            <p className="meta max-w-[26ch] text-right text-foreground/75">
              Structure holds. Planting moves. We design the joint.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
