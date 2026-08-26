import { useRef } from "react";
import { howWeWork } from "@/lib/site-data";
import { RevealScope, useReveal } from "@/components/site/Reveal";

export function HowWeWork() {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref, { selector: ".step-reveal", threshold: 0.15, once: false });

  return (
    <section ref={ref} className="edge section-y" aria-label="How we work">
      <RevealScope threshold={0.15}>
        <div className="rule-t pt-5">
          <p className="meta text-muted-foreground">
            <span className="text-accent">05</span> — How We Work
          </p>
        </div>

        <div className="mt-10 md:mt-14">
          <header className="mb-16 md:mb-20">
            <h2 className="font-display text-[clamp(2.6rem,7vw,5.6rem)] leading-[0.95] tracking-[-0.02em] text-foreground">
              How We Work
            </h2>
            <p className="mt-4 max-w-[48ch] text-base md:text-lg leading-relaxed text-muted-foreground">
              A Seamless Journey From Vision To Reality
            </p>
          </header>

          <div className="relative">
            {/* timeline rail */}
            <div
              className="pointer-events-none absolute left-[1.1rem] top-2 bottom-2 hidden w-px bg-gradient-to-b from-accent via-border to-transparent md:block"
              aria-hidden="true"
            />

            <ol className="grid gap-y-10 md:gap-y-14">
              {howWeWork.map((step) => (
                <li key={step.index} className="step-reveal">
                  <article className="grid gap-6 md:grid-cols-[3.5rem_1fr]">
                    <div className="relative flex items-center md:justify-center">
                      <span className="font-mono text-2xl font-semibold tracking-tight text-accent md:text-3xl">
                        {step.index}
                      </span>
                      <span
                        className="absolute left-[2.35rem] top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-accent md:left-auto md:top-1/2 md:translate-x-0"
                        aria-hidden="true"
                      />
                    </div>

                    <div className="rounded-2xl border border-border/60 bg-surface/50 p-6 shadow-sm backdrop-blur-sm transition-colors duration-500 hover:border-accent/30 hover:bg-surface md:p-8">
                      <h3 className="font-display text-[clamp(1.5rem,3vw,2.25rem)] leading-tight tracking-[-0.02em] text-foreground">
                        {step.title}
                      </h3>
                      <p className="mt-3 max-w-[60ch] text-sm leading-relaxed text-muted-foreground md:text-base md:leading-[1.7]">
                        {step.description}
                      </p>
                    </div>
                  </article>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </RevealScope>
    </section>
  );
}
