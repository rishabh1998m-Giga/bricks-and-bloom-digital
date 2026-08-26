import { howWeWork } from "@/lib/site-data";
import { RevealScope } from "@/components/site/Reveal";

export function HowWeWork() {
  return (
    <section className="edge section-y" aria-label="How we work">
      <RevealScope threshold={0.12}>
        <div className="rule-t pt-5">
          <p className="meta text-muted-foreground">
            <span className="text-accent">05</span> — How We Work
          </p>
        </div>

        <header className="mt-10 mb-14 md:mt-14 md:mb-20">
          <h2 className="display text-[clamp(2.6rem,7vw,5.6rem)]">
            How We Work
          </h2>
          <p className="mt-4 max-w-[52ch] text-base leading-relaxed text-muted-foreground md:text-lg">
            A Seamless Journey From Vision To Reality
          </p>
        </header>

        <div className="relative">
          {/* timeline rail */}
          <div
            className="pointer-events-none absolute left-[1.15rem] top-2 bottom-2 hidden w-px bg-gradient-to-b from-accent via-border to-transparent md:block"
            aria-hidden="true"
          />

          <ol className="grid gap-y-10 md:gap-y-12">
            {howWeWork.map((step, i) => (
              <li key={step.index} className="fade-in" style={{ transitionDelay: `${i * 100}ms` }}>
                <article className="grid gap-5 md:grid-cols-[3.5rem_1fr]">
                  <div className="relative flex items-center gap-5 md:justify-center md:gap-0">
                    <span className="meta text-xl font-semibold tracking-tight text-accent md:text-2xl">
                      {step.index}
                    </span>
                    <span
                      className="h-2 w-2 rounded-full bg-accent md:absolute md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2"
                      aria-hidden="true"
                    />
                    <span className="h-px flex-1 bg-border/60 md:hidden" aria-hidden="true" />
                  </div>

                  <div className="rounded-2xl border border-border/60 bg-surface/40 p-6 shadow-sm backdrop-blur-sm transition-colors duration-500 hover:border-accent/30 hover:bg-surface md:p-8">
                    <h3 className="display text-[clamp(1.45rem,3.25vw,2.35rem)] leading-tight tracking-[-0.02em]">
                      {step.title}
                    </h3>
                    <p className="mt-3 max-w-[60ch] text-sm leading-[1.75] text-muted-foreground md:text-base md:leading-[1.7]">
                      {step.description}
                    </p>
                  </div>
                </article>
              </li>
            ))}
          </ol>
        </div>
      </RevealScope>
    </section>
  );
}
