import { Link } from "@tanstack/react-router";
import { studio } from "@/lib/site-data";
import { RevealScope, Line } from "@/components/site/Reveal";

export function ContactCta() {
  return (
    <section className="edge section-y-lg" aria-label="Start a project">
      <RevealScope threshold={0.3}>
        <h2 className="display text-[clamp(2.4rem,8vw,7rem)]">
          <Line delay={0} drift={-70}>
            Have a site?
          </Line>
          <Line delay={130} drift={60} className="italic text-accent">
            Let&rsquo;s walk it.
          </Line>
        </h2>

        <div className="mt-12 flex flex-wrap items-end justify-between gap-8">
          <Link
            to="/contact"
            data-cursor="Write to us"
            className="display link-draw text-[clamp(1.4rem,2.8vw,2.4rem)] italic"
          >
            Start a conversation →
          </Link>
          <div className="flex flex-col gap-2 md:text-right">
            <a href={`mailto:${studio.email}`} className="meta link-draw text-muted-foreground">
              {studio.email}
            </a>
            <span className="meta text-muted-foreground">{studio.location}</span>
          </div>
        </div>
      </RevealScope>
    </section>
  );
}
