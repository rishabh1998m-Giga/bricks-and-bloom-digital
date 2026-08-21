import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import mark from "@/assets/bb-mark.png.asset.json";

const nav = [
  { to: "/work", label: "Work" },
  { to: "/services", label: "Services" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [condensed, setCondensed] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const onScroll = () => setCondensed(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="edge fixed inset-x-0 top-0 z-50 transition-[padding,background-color,backdrop-filter] duration-700"
      style={{
        paddingTop: condensed ? "0.85rem" : "1.75rem",
        paddingBottom: condensed ? "0.85rem" : "1.75rem",
        backgroundColor: condensed ? "color-mix(in oklab, var(--ink) 78%, transparent)" : "transparent",
        backdropFilter: condensed ? "blur(6px)" : "none",
      }}
    >
      <div className="flex items-center justify-between gap-6">
        <Link to="/" className="group flex items-center gap-3 sm:gap-4" aria-label="Brick & Blooms, home">
          <img
            src={mark.url}
            alt=""
            aria-hidden="true"
            width={504}
            height={454}
            className="w-auto shrink-0 transition-[height] duration-700"
            style={{ height: condensed ? "1.9rem" : "2.5rem" }}
          />
          <span className="flex flex-col leading-none">
            <span
              className="display whitespace-nowrap leading-[0.95] text-foreground transition-[font-size] duration-700"
              style={{ fontSize: condensed ? "1.15rem" : "1.4rem", letterSpacing: "0.06em" }}
            >
              Brick &amp; Blooms
            </span>
            <span
              className="meta overflow-hidden text-accent transition-all duration-700"
              style={{
                fontSize: "0.55rem",
                letterSpacing: "0.28em",
                maxHeight: condensed ? 0 : "1rem",
                opacity: condensed ? 0 : 1,
                marginTop: condensed ? 0 : "0.3rem",
              }}
            >
              A new way of living
            </span>
          </span>
        </Link>

        <nav className="hidden items-baseline gap-8 sm:flex lg:gap-12">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="meta link-draw text-[0.82rem] tracking-[0.14em] text-foreground transition-colors hover:text-accent sm:text-[0.875rem]"
              data-active={pathname.startsWith(item.to) ? "true" : "false"}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="meta text-[0.82rem] tracking-[0.14em] text-foreground sm:hidden"
          aria-expanded={open}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      <div
        className="overflow-hidden sm:hidden"
        style={{
          maxHeight: open ? "18rem" : 0,
          transition: "max-height .7s cubic-bezier(.16,1,.3,1)",
        }}
      >
        <div className="rule-t mt-4 flex flex-col gap-5 pt-6 pb-3">
          {nav.map((item) => (
            <Link key={item.to} to={item.to} className="display text-4xl">
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
