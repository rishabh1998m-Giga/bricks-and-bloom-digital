import { Link } from "@tanstack/react-router";
import { studio } from "@/lib/site-data";
import logo from "@/assets/brick-blooms-logo-light.png.asset.json";

export function Footer() {
  return (
    <footer className="edge rule-t pt-20 pb-10">
      <div className="grid gap-16 md:grid-cols-[1fr_auto]">
        <div>
          <p className="meta text-muted-foreground">Architecture &amp; Landscape</p>
          <img
            src={logo.url}
            alt="Brick & Blooms — a new way of living"
            width={1184}
            height={571}
            loading="lazy"
            className="mt-6 h-auto w-[min(100%,28rem)]"
          />
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
