import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";

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
      <div className="flex items-baseline justify-between gap-6">
        <Link to="/" className="group flex items-baseline gap-3" aria-label="Bricks & Bloom, home">
          <span
            className="display leading-none transition-[font-size] duration-700"
            style={{ fontSize: condensed ? "1.35rem" : "1.7rem" }}
          >
            Bricks
          </span>
          <span className="meta text-accent">&amp;</span>
          <span
            className="display leading-none italic transition-[font-size] duration-700"
            style={{ fontSize: condensed ? "1.35rem" : "1.7rem" }}
          >
            Bloom
          </span>
        </Link>

        <nav className="hidden items-baseline gap-10 md:flex">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="meta link-draw text-foreground/75 transition-colors hover:text-foreground"
              data-active={pathname.startsWith(item.to) ? "true" : "false"}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="meta text-foreground md:hidden"
          aria-expanded={open}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      <div
        className="overflow-hidden md:hidden"
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
