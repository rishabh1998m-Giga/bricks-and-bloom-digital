import { useCallback, useEffect, useRef, useState } from "react";
import { howWeWork } from "@/lib/site-data";
import { RevealScope } from "@/components/site/Reveal";

const DURATION = 6000;

export function HowWeWork() {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const [paused, setPaused] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => setInView(!!entries[0]?.isIntersecting),
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const select = useCallback((i: number) => {
    setActive(i);
    setProgress(0);
  }, []);

  useEffect(() => {
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || paused || !inView) return;
    const start = performance.now() - progress * DURATION;
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / DURATION);
      setProgress(p);
      if (p >= 1) {
        setActive((a) => (a + 1) % howWeWork.length);
        setProgress(0);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, paused, inView]);

  const step = howWeWork[active]!;

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown" || e.key === "ArrowRight") {
      e.preventDefault();
      select((active + 1) % howWeWork.length);
    }
    if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
      e.preventDefault();
      select((active - 1 + howWeWork.length) % howWeWork.length);
    }
  };

  return (
    <section
      ref={sectionRef}
      className="edge section-y"
      aria-label="How we work"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <RevealScope threshold={0.12}>
        <div className="rule-t pt-5">
          <p className="meta text-muted-foreground">
            <span className="text-accent">05</span> — How We Work
          </p>
        </div>

        <header className="mt-6 mb-7 md:mt-10 md:mb-12">
          <h2 className="display text-[clamp(2.45rem,5.4vw,4.4rem)] leading-[0.98] md:leading-[0.86]">
            How We Work
          </h2>
          <p className="body-copy mt-3 max-w-[52ch] text-muted-foreground md:mt-4 md:text-[1.15rem]">
            A Seamless Journey From Vision To Reality
          </p>
        </header>

        <div className="fade-in grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-14">
          {/* Step selector */}
          <div
            role="tablist"
            aria-orientation="vertical"
            aria-label="Process steps"
            onKeyDown={onKey}
            className="flex flex-col"
          >
            {howWeWork.map((s, i) => {
              const isActive = i === active;
              return (
                <button
                  key={s.index}
                  role="tab"
                  type="button"
                  aria-selected={isActive}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => select(i)}
                  onMouseEnter={() => select(i)}
                  className="group relative w-full border-t border-border/60 py-5 text-left last:border-b md:py-6"
                >
                  {/* progress rail */}
                  <span
                    aria-hidden="true"
                    className="absolute left-0 top-0 h-px bg-accent transition-[width] duration-100 ease-linear"
                    style={{ width: isActive ? `${progress * 100}%` : "0%" }}
                  />
                  <span
                    aria-hidden="true"
                    className={`absolute inset-y-0 left-0 w-px transition-colors duration-500 ${
                      isActive ? "bg-accent" : "bg-transparent"
                    }`}
                  />
                  <div className="flex items-baseline gap-4 pl-4 pr-2 md:gap-6 md:pl-6">
                    <span
                      className={`meta text-xs tabular-nums transition-colors duration-300 md:text-sm ${
                        isActive ? "text-accent" : "text-muted-foreground"
                      }`}
                    >
                      {s.index}
                    </span>
                    <span
                      className={`display leading-none tracking-[-0.02em] transition-all duration-500 ${
                        isActive
                          ? "text-foreground text-[clamp(1.7rem,3.6vw,2.6rem)]"
                          : "text-muted-foreground group-hover:text-foreground text-[clamp(1.45rem,3vw,2.1rem)]"
                      }`}
                    >
                      {s.title}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Detail panel */}
          <div className="relative min-h-[19rem] overflow-hidden rounded-2xl border border-border/60 bg-card/60 p-7 backdrop-blur-sm md:min-h-[22rem] md:p-10">
            {/* oversized ghost numeral */}
            <span
              aria-hidden="true"
              key={`n-${active}`}
              className="pointer-events-none absolute -right-4 -top-8 select-none font-serif text-[10rem] leading-none text-accent/10 md:-right-6 md:text-[16rem]"
              style={{ animation: "hww-num 700ms cubic-bezier(0.22,1,0.36,1) both" }}
            >
              {step.index}
            </span>

            <div
              key={active}
              role="tabpanel"
              aria-live="polite"
              className="relative"
              style={{ animation: "hww-in 600ms cubic-bezier(0.22,1,0.36,1) both" }}
            >
              <p className="meta text-xs text-accent md:text-sm">{step.caption}</p>
              <h3 className="display mt-3 text-[clamp(1.9rem,3.8vw,2.9rem)] leading-[1.02] tracking-[-0.025em]">
                {step.title}
              </h3>
              <p className="body-copy mt-5 max-w-[54ch] text-muted-foreground">
                {step.description}
              </p>

              <ul className="mt-7 flex flex-wrap gap-2">
                {step.tags.map((t) => (
                  <li
                    key={t}
                    className="meta rounded-full border border-border/70 px-3.5 py-1.5 text-[0.68rem] text-muted-foreground transition-colors duration-300 hover:border-accent/50 hover:text-foreground"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </div>

            <div className="absolute inset-x-7 bottom-6 flex items-center gap-3 md:inset-x-10">
              {howWeWork.map((s, i) => (
                <button
                  key={s.index}
                  type="button"
                  aria-label={`Go to step ${s.index} ${s.title}`}
                  onClick={() => select(i)}
                  className={`h-1 flex-1 overflow-hidden rounded-full transition-colors duration-300 ${
                    i === active ? "bg-border" : "bg-border/40 hover:bg-border"
                  }`}
                >
                  <span
                    className="block h-full bg-accent transition-[width] duration-100 ease-linear"
                    style={{
                      width: i === active ? `${progress * 100}%` : i < active ? "100%" : "0%",
                    }}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </RevealScope>

      <style>{`
        @keyframes hww-in {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: none; }
        }
        @keyframes hww-num {
          from { opacity: 0; transform: translateY(24px) scale(0.96); }
          to { opacity: 1; transform: none; }
        }
        @media (prefers-reduced-motion: reduce) {
          [style*="hww-"] { animation: none !important; }
        }
      `}</style>
    </section>
  );
}
