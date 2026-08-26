import { approach } from "@/lib/site-data";
import { RevealScope } from "@/components/site/Reveal";

/** Four boards pinned to an asymmetric drafting grid. */
export function Approach() {
  return (
    <section className="edge section-y" aria-label="How we work">
      <RevealScope threshold={0.2}>
        <div className="rule-t pt-5">
          <p className="meta text-muted-foreground">
            <span className="text-accent">05</span> — Method
          </p>
        </div>

        <div className="mt-8 grid gap-x-10 gap-y-10 md:mt-14 md:gap-y-16 md:grid-cols-12">
          {approach.map((a, i) => (
            <article
              key={a.index}
              className={`fade-in md:col-span-5 ${i % 2 === 1 ? "md:mt-16 md:ml-auto" : ""}`}
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              <div className="overflow-hidden">
                <img
                  src={a.image}
                  alt={a.alt}
                  width={1200}
                  height={1500}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[4/3] w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(.16,1,.3,1)] hover:scale-[1.04]"
                />
              </div>
              <span className="meta mt-4 block text-accent md:mt-6">{a.index}</span>
              <h3 className="display mt-2 text-[clamp(2.1rem,4vw,3.25rem)] leading-[1.02] md:mt-3">{a.title}</h3>
              <p className="body-copy mt-3 max-w-[42ch] text-muted-foreground md:mt-4">{a.text}</p>
            </article>
          ))}
        </div>
      </RevealScope>
    </section>
  );
}
