import { useState } from "react";
import { materials } from "@/lib/site-data";
import { RevealScope, Line } from "@/components/site/Reveal";

/** Material index: hovering a name swaps the plate beside it. */
export function MaterialSampler() {
  const [active, setActive] = useState(0);
  const current = materials[active] ?? materials[0]!;

  return (
    <section className="edge section-y" aria-label="Material palette">
      <RevealScope threshold={0.25}>
        <div className="rule-t flex flex-wrap items-end justify-between gap-6 pt-5">
          <p className="meta text-muted-foreground">
            <span className="text-accent">04</span> — Material
          </p>
          <p className="meta max-w-[28ch] text-muted-foreground md:text-right">
            Few materials, used honestly, left to weather.
          </p>
        </div>

        <div className="mt-7 grid gap-x-12 gap-y-7 md:mt-10 md:gap-y-10 md:grid-cols-12">
          <div className="md:col-span-7">
            {materials.map((m, i) => (
              <button
                key={m.name}
                type="button"
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                className="group flex w-full items-baseline justify-between gap-6 border-b border-border py-4 text-left transition-colors md:py-5"
                data-cursor={m.note}
              >
                <span
                  className="display text-[clamp(1.9rem,4.6vw,3.75rem)] transition-[opacity,transform] duration-700"
                  style={{
                    opacity: active === i ? 1 : 0.42,
                    transform: active === i ? "translateX(0.75rem)" : "none",
                  }}
                >
                  {m.name}
                </span>
                <span className="meta shrink-0 text-muted-foreground">{m.origin}</span>
              </button>
            ))}
          </div>

          <div className="md:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden">
              {materials.map((m, i) => (
                <img
                  key={m.name}
                  src={m.image}
                  alt={`${m.name} — ${m.note}`}
                  width={1000}
                  height={1250}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover transition-[opacity,transform] duration-[1.1s] ease-[cubic-bezier(.16,1,.3,1)]"
                  style={{
                    opacity: active === i ? 1 : 0,
                    transform: active === i ? "scale(1)" : "scale(1.06)",
                  }}
                />
              ))}
            </div>
            <div className="rule-t mt-4 flex items-baseline justify-between pt-4">
              <span className="meta text-accent">{current.name}</span>
              <span className="meta text-muted-foreground">{current.note}</span>
            </div>
          </div>
        </div>

        <h2 className="display mt-9 text-[clamp(2.15rem,5vw,4.5rem)] leading-[0.98] md:mt-14 md:leading-[0.86]">
          <Line delay={0} drift={-40}>
            Nothing applied.
          </Line>
          <Line delay={110} drift={40} className="italic text-accent">
            Everything structural.
          </Line>
        </h2>
      </RevealScope>
    </section>
  );
}
