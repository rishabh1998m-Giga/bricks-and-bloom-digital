import { Link } from "@tanstack/react-router";
import { studio } from "@/lib/site-data";
import mark from "@/assets/bb-mark.png.asset.json";

export function Footer() {
  return (
    <footer className="edge rule-t pt-20 pb-10">
      <div className="grid gap-16 md:grid-cols-[1fr_auto]">
        <div>
          <p className="meta text-muted-foreground">Architecture &amp; Landscape</p>
          <div className="mt-6 flex items-center gap-4">
            <img
              src={mark.url}
              alt=""
              aria-hidden="true"
              width={504}
              height={454}
              loading="lazy"
              className="h-11 w-auto shrink-0"
            />
            <span className="flex flex-col leading-none">
              <span className="display text-2xl leading-[0.95] tracking-[0.05em] text-foreground">
                Brick &amp; Blooms
              </span>
              <span className="meta mt-1.5 text-[0.6rem] tracking-[0.3em] text-accent">
                A new way of living
              </span>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-12 gap-y-10 md:grid-cols-2 md:pt-16">
          <div className="flex flex-col gap-3">
            <span className="meta text-muted-foreground">Index</span>
            <Link to="/work" className="link-draw text-sm">
              Work
            </Link>
            <Link to="/services" className="link-draw text-sm">
              Services
            </Link>
            <Link to="/contact" className="link-draw text-sm">
              Contact
            </Link>
          </div>
          <div className="flex flex-col gap-3">
            <span className="meta text-muted-foreground">Studio</span>
            <a href={`mailto:${studio.email}`} className="link-draw text-sm">
              {studio.email}
            </a>
            <a href={`tel:${studio.phone.replace(/\s/g, "")}`} className="link-draw text-sm">
              {studio.phone}
            </a>
            <span className="text-sm text-muted-foreground">{studio.location}</span>
          </div>
        </div>
      </div>

      <div className="rule-t mt-20 flex flex-wrap items-center justify-between gap-4 pt-6">
        <span className="meta text-muted-foreground">
          © {new Date().getFullYear()} {studio.name}
        </span>
        <div className="flex gap-8">
          {studio.socials.map((s) => (
            <a key={s.label} href={s.href} className="meta link-draw text-muted-foreground hover:text-foreground">
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
