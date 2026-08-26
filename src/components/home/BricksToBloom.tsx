import { useEffect, useState } from "react";
import { usePinProgress, clamp } from "@/lib/motion";
import { materials } from "@/lib/site-data";

/** Phones get a shorter, wider bond so bricks stay brick-shaped. */
function useBond() {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    const on = () => setMobile(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  const cols = mobile ? 4 : 8;
  const rows = mobile ? 6 : 5;
  return { cols, rows, cells: Array.from({ length: cols * rows }, (_, i) => i) };
}

// deterministic pseudo-random per cell — stable across SSR and client
const rand = (i: number, salt: number) => {
  const x = Math.sin((i + 1) * 12.9898 + salt * 78.233) * 43758.5453;
  return x - Math.floor(x);
};

/**
 * Signature interaction: a rigid masonry bond dissolves into an organic
 * field as the section is scrolled. Geometry only — no illustration.
 */
export function BricksToBloom() {
  const { ref, progress } = usePinProgress<HTMLDivElement>();
  const t = clamp((progress - 0.08) / 0.78);
  const green = materials[3]?.image ?? "";
  const { cols: COLS, rows: ROWS, cells: CELLS } = useBond();

  return (
    <section
      ref={ref}
      className="relative h-[200svh] md:h-[260svh]"
      aria-label="From bricks to bloom"
    >
      <div className="sticky top-0 flex h-svh flex-col justify-center overflow-hidden">
        <div className="edge">
          <div className="flex items-baseline justify-between">
            <span className="meta text-muted-foreground">
              <span className="text-accent">02</span> — Transformation
            </span>
            <span className="meta text-muted-foreground tabular-nums">{Math.round(t * 100)}%</span>
          </div>
        </div>

        <div className="relative mx-auto mt-6 aspect-[4/5] w-full max-w-[1500px] px-[clamp(1rem,4vw,4.5rem)] sm:mt-8 sm:aspect-[16/9]">
          {/* landscape revealed behind the dissolving bond */}
          <img
            src={green}
            alt=""
            aria-hidden
            width={1200}
            height={1200}
            loading="lazy"
            decoding="async"
            className="absolute inset-x-[clamp(1rem,4vw,4.5rem)] inset-y-0 h-full w-auto min-w-[calc(100%-2*clamp(1rem,4vw,4.5rem))] object-cover"
            style={{ opacity: clamp(t * 1.4 - 0.15), transform: `scale(${1.08 - t * 0.08})` }}
          />

          <div className="absolute inset-x-[clamp(1rem,4vw,4.5rem)] inset-y-0">
            {CELLS.map((i: number) => {
              const col = i % COLS;
              const row = Math.floor(i / COLS);
              const offsetRow = row % 2 === 1 ? 0.5 : 0; // running bond
              const w = 100 / COLS;
              const h = 100 / ROWS;
              const d = rand(i, 1);
              const stagger = clamp((t - d * 0.35) / 0.65);
              const dx = (rand(i, 2) - 0.5) * 42 * stagger;
              const dy = (rand(i, 3) - 0.5) * 34 * stagger;
              const rot = (rand(i, 4) - 0.5) * 26 * stagger;
              const scale = 1 - stagger * (0.35 + d * 0.4);

              return (
                <span
                  key={i}
                  aria-hidden
                  className="absolute block bg-brick"
                  style={{
                    left: `${(col + offsetRow) * w}%`,
                    top: `${row * h}%`,
                    width: `calc(${w}% - 4px)`,
                    height: `calc(${h}% - 4px)`,
                    transform: `translate3d(${dx}%, ${dy}%, 0) rotate(${rot}deg) scale(${scale})`,
                    opacity: 1 - stagger * 0.92,
                    borderTop: "1px solid color-mix(in oklab, var(--bone) 12%, transparent)",
                    willChange: "transform",
                  }}
                />
              );
            })}
          </div>

          {/* the two words trade places as the field dissolves */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <span
              className="display absolute text-[clamp(2.5rem,10vw,8.5rem)] tracking-tight"
              style={{ opacity: 1 - clamp(t * 1.8), transform: `translateY(${-t * 40}px)` }}
            >
              BRICKS
            </span>
            <span
              className="display absolute text-[clamp(2.5rem,10vw,8.5rem)] italic"
              style={{
                opacity: clamp((t - 0.5) * 2.4),
                transform: `translateY(${(1 - t) * 40}px)`,
                color: "var(--bone)",
                textShadow: "0 0 40px color-mix(in oklab, var(--ink) 60%, transparent)",
              }}
            >
              Bloom
            </span>
          </div>
        </div>

        <div className="edge mt-6 sm:mt-8">
          <div className="rule-t flex flex-wrap justify-between gap-x-6 gap-y-1.5 pt-4">
            <span className="meta text-muted-foreground">Bond → dispersal → ground cover</span>
            <span className="meta text-muted-foreground">
              Masonry module {COLS} × {ROWS}, running bond
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
