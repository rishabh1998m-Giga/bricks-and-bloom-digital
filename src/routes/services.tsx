import { useEffect, useRef, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { serviceGroups, type ServiceItem } from "@/lib/site-data";
import { RevealScope, Line } from "@/components/site/Reveal";
import { usePointerField } from "@/lib/motion";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Landscape Design, Execution & Maintenance | Brick & Blooms" },
      {
        name: "description",
        content:
          "Terrace and vertical gardens, villa landscaping, pergolas, pools, water features, softscape, hardscape, moss walls — plus garden maintenance, office plant rental and FRP planters.",
      },
      { property: "og:title", content: "Services — Brick & Blooms" },
      {
        property: "og:description",
        content:
          "Landscape design and execution, from terrace gardens to swimming pools — and the maintenance that keeps them.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://bricks-and-bloom-digital.lovable.app/services" },
    ],
    links: [{ rel: "canonical", href: "https://bricks-and-bloom-digital.lovable.app/services" }],
  }),
  component: ServicesPage,
});

/** Animated architectural blueprint grid that drifts subtly with the cursor. */
function BlueprintField() {
  const pos = usePointerField();
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden opacity-[0.08]"
      style={{
        maskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
        WebkitMaskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
      }}
    >
      <div
        className="blueprint-grid absolute -inset-[10%] h-[120%] w-[120%]"
        style={{
          transform: `translate(${pos.x * -1.2}%, ${pos.y * -1.2}%)`,
          transition: "transform 1.2s cubic-bezier(0.16,1,0.3,1)",
        }}
      />
    </div>
  );
}

/** A single luxury service row. Expands on hover/focus; dims siblings via CSS. */
function ServiceRow({
  item,
  onHover,
}: {
  item: ServiceItem;
  onHover: (item: ServiceItem | null, rect?: DOMRect) => void;
}) {
  const rowRef = useRef<HTMLLIElement>(null);
  const [open, setOpen] = useState(false);

  const handleEnter = () => {
    setOpen(true);
    onHover(item, rowRef.current?.getBoundingClientRect());
  };

  const handleLeave = () => {
    setOpen(false);
    onHover(null);
  };

  return (
    <li
      ref={rowRef}
      className="group service-row focus-dim-child relative border-t border-border/40 transition-opacity duration-500"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onFocus={handleEnter}
      onBlur={handleLeave}
    >
      {/* animated top rule draw */}
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-gradient-to-r from-accent via-foreground/40 to-transparent transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100 group-focus-visible:scale-x-100"
      />

      <button
        type="button"
        aria-expanded={open}
        className="flex w-full cursor-pointer items-baseline gap-4 py-[clamp(1.1rem,2.6vh,1.9rem)] text-left sm:gap-8"
      >
        <span
          className={`meta w-7 shrink-0 text-[clamp(0.7rem,1.1vw,0.85rem)] transition-colors duration-500 sm:w-10 ${
            open ? "text-accent" : "text-muted-foreground"
          }`}
        >
          {item.index}
        </span>
        <h3
          className={`display flex-1 text-[clamp(1.5rem,3.8vw,3rem)] leading-[1.05] transition-all duration-500 ${
            open ? "translate-x-3 italic text-accent" : ""
          }`}
        >
          {item.title}
        </h3>
        <span
          aria-hidden
          className={`display hidden shrink-0 text-[clamp(1.25rem,2.2vw,1.75rem)] leading-none transition-all duration-500 sm:block ${
            open ? "rotate-45 text-accent" : "text-muted-foreground"
          }`}
        >
          +
        </span>
      </button>

      <div
        className={`grid transition-[grid-template-rows] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <p
            className={`body-copy max-w-[62ch] pb-[clamp(1.25rem,2.8vh,2rem)] pl-[clamp(2.75rem,4.8vw,4.5rem)] text-muted-foreground transition-all delay-100 duration-500 ${
              open ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"
            }`}
          >
            {item.description}
          </p>
        </div>
      </div>
    </li>
  );
}

/** Cursor-following detail card for fine-pointer devices. No images. */
function ServiceCursorCard({
  active,
  pointer,
}: {
  active: { item: ServiceItem; rect: DOMRect } | null;
  pointer: { x: number; y: number };
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!active) return;
    const rect = active.rect;
    const cardWidth = cardRef.current?.offsetWidth || 320;
    const cardHeight = cardRef.current?.offsetHeight || 160;

    // Position card to the right of the row, vertically centered on the row
    let x = rect.right + 20;
    let y = rect.top + rect.height / 2 - cardHeight / 2;

    // Keep within viewport
    if (x + cardWidth > window.innerWidth - 24) {
      x = rect.left - cardWidth - 20;
    }
    if (y < 24) y = 24;
    if (y + cardHeight > window.innerHeight - 24) {
      y = window.innerHeight - cardHeight - 24;
    }

    setPos({ x, y });
  }, [active]);

  if (!active) return null;

  return (
    <div
      ref={cardRef}
      className="service-cursor-card pointer-events-none fixed z-[80] hidden w-[min(28rem,38vw)] border border-border/60 bg-card/95 p-6 backdrop-blur-md lg:block"
      style={{
        left: pos.x,
        top: pos.y,
        opacity: active ? 1 : 0,
        transform: `translate(${pointer.x * 8}px, ${pointer.y * 8}px)`,
        transition: "opacity 0.35s ease, transform 0.6s cubic-bezier(0.16,1,0.3,1), left 0.4s ease, top 0.4s ease",
      }}
    >
      <p className="meta text-accent">{active.item.index}</p>
      <h4 className="display mt-2 text-[clamp(1.5rem,2.2vw,2rem)] italic">
        {active.item.title}
      </h4>
      <p className="body-copy mt-4 text-card-foreground/80">
        {active.item.description}
      </p>
    </div>
  );
}

/** Connecting arc between the two service groups. */
function GroupConnector() {
  return (
    <div className="edge my-[clamp(2rem,6vh,4.5rem)] flex items-center justify-center" aria-hidden="true">
      <div className="relative h-px w-full max-w-xs overflow-hidden bg-border/40">
        <span className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-transparent via-accent to-transparent animate-shimmer" />
      </div>
      <span className="meta mx-6 shrink-0 text-muted-foreground">&</span>
      <div className="relative h-px w-full max-w-xs overflow-hidden bg-border/40">
        <span className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-transparent via-accent to-transparent animate-shimmer" />
      </div>
    </div>
  );
}

function ServicesPage() {
  const [active, setActive] = useState<{ item: ServiceItem; rect: DOMRect } | null>(null);
  const pointer = usePointerField();

  return (
    <div className="relative min-h-screen pt-[clamp(7rem,22vh,14rem)] pb-[clamp(4rem,10vh,9rem)]">
      <BlueprintField />

      <div className="edge relative">
        <RevealScope threshold={0.05}>
          <div className="flex flex-wrap items-baseline gap-x-8 gap-y-2">
            <p className="meta text-muted-foreground">Capability</p>
            <span className="meta text-accent">Bengaluru & beyond</span>
          </div>

          <h1 className="display mt-8 text-[clamp(3.5rem,14vw,12rem)] leading-[0.85]">
            <Line delay={0} drift={-60}>
              Services
            </Line>
          </h1>

          <div className="mt-10 grid gap-8 lg:grid-cols-2 lg:gap-16">
            <p className="body-copy max-w-[52ch] text-muted-foreground">
              Two halves of the same practice — design and execution on one side, long-term care on the other.
              Every scope is drawn, built and maintained by the same team.
            </p>
            <p className="meta self-end text-right text-muted-foreground lg:text-left">
              Glide over a scope — it opens itself
            </p>
          </div>
        </RevealScope>
      </div>

      <ServiceCursorCard active={active} pointer={pointer} />

      {serviceGroups.map((group, i) => (
        <section
          key={group.key}
          className="edge relative mt-[clamp(3.5rem,9vh,7rem)]"
          aria-labelledby={`group-${group.key}`}
        >
          {i === 1 && <GroupConnector />}

          <RevealScope threshold={0.05}>
            <div className="rule-t flex flex-wrap items-baseline justify-between gap-x-10 gap-y-3 pt-[clamp(1.5rem,3.5vh,2.5rem)]">
              <h2 id={`group-${group.key}`} className="display text-[clamp(2rem,5.5vw,4.25rem)]">
                {group.title}
              </h2>
              <p className="display text-[clamp(1rem,1.8vw,1.5rem)] italic text-accent">{group.lead}</p>
            </div>
          </RevealScope>

          <ul className="focus-dim mt-[clamp(1.25rem,3vh,2rem)] border-b border-border/40">
            {group.items.map((item) => (
              <ServiceRow key={item.title} item={item} onHover={setActive} />
            ))}
          </ul>
        </section>
      ))}

      <div className="edge rule-t mt-[clamp(3.5rem,9vh,7rem)] pt-12">
        <RevealScope threshold={0.1}>
          <Link
            to="/contact"
            className="group magnetic inline-flex items-baseline gap-4 text-foreground"
          >
            <span className="display link-draw text-[clamp(1.75rem,5vw,4rem)] italic">
              Discuss a project
            </span>
            <span
              aria-hidden
              className="display text-[clamp(1.25rem,3vw,2rem)] transition-transform duration-500 group-hover:translate-x-3"
            >
              →
            </span>
          </Link>
        </RevealScope>
      </div>
    </div>
  );
}
