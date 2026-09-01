import { Link } from "@tanstack/react-router";
import { studio } from "@/lib/site-data";
import { assetUrl } from "@/lib/asset-url";
import logo from "@/assets/bb-logo-full.png.asset.json";

export function Footer() {
  return (
    <footer className="edge rule-t pt-20 pb-10">
      <div className="grid gap-16 md:grid-cols-[1fr_auto]">
        <div>
          <p className="meta text-muted-foreground">Architecture &amp; Landscape</p>
          <div className="mt-6 inline-flex">
            <img
              src={assetUrl(logo)}
              alt="Brick & Blooms — a new way of living"
              width={1184}
              height={571}
              loading="lazy"
              className="h-16 w-auto md:h-20"
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
            <Link to="/about" className="link-draw text-sm">
              About
            </Link>
            <Link to="/contact" className="link-draw text-sm">
              Contact
            </Link>
          </div>
          <div className="flex flex-col gap-3">
            <span className="meta text-muted-foreground">Studio</span>
            <address className="not-italic text-sm leading-relaxed text-muted-foreground">
              Brick &amp; Blooms
              <br />
              Kaveri Nagar, Banagirinagara
              <br />
              Banashankari 3rd Stage, Banashankari
              <br />
              Bengaluru, Karnataka 560070
              <br />
              India
            </address>
            <a href={`mailto:${studio.email}`} className="link-draw text-sm">
              {studio.email}
            </a>
            <a href={studio.whatsapp} target="_blank" rel="noopener noreferrer" className="link-draw text-sm">
              {studio.phone}
            </a>
          </div>
        </div>
      </div>

      <div className="rule-t mt-20 flex flex-wrap items-center justify-between gap-4 pt-6">
        <span className="meta text-muted-foreground">© 2026 {studio.name}</span>
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
