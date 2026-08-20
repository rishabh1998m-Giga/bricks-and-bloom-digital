import { useEffect, useRef, useState } from "react";

/**
 * Minimal desktop cursor: a 6px mark that becomes a small typographic label
 * over elements carrying data-cursor="LABEL". Disabled on touch.
 */
export function Cursor() {
  const dot = useRef<HTMLDivElement | null>(null);
  const [label, setLabel] = useState<string | null>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    document.documentElement.classList.add("cursor-none-fine");

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const current = { ...target };
    let frame = 0;

    const loop = () => {
      current.x += (target.x - current.x) * 0.22;
      current.y += (target.y - current.y) * 0.22;
      if (dot.current) {
        dot.current.style.transform = `translate3d(${current.x}px, ${current.y}px, 0) translate(-50%, -50%)`;
      }
      frame = requestAnimationFrame(loop);
    };

    const onMove = (e: PointerEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      setActive(true);
      const el = (e.target as HTMLElement | null)?.closest?.("[data-cursor]");
      setLabel(el ? el.getAttribute("data-cursor") : null);
    };
    const onLeave = () => setActive(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    frame = requestAnimationFrame(loop);
    return () => {
      document.documentElement.classList.remove("cursor-none-fine");
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      ref={dot}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[100] hidden mix-blend-difference [@media(pointer:fine)]:block"
      style={{ opacity: active ? 1 : 0, transition: "opacity .3s ease" }}
    >
      {label ? (
        <span className="meta whitespace-nowrap border border-bone/70 px-2 py-1 text-bone">{label}</span>
      ) : (
        <span className="block h-1.5 w-1.5 bg-bone" />
      )}
    </div>
  );
}
