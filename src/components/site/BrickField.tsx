import { useEffect, useRef } from "react";

/**
 * BrickField — an image-free, pointer-reactive brick lattice.
 * Cells warm to terracotta and lift as the pointer (or an ambient
 * drifting "bloom") passes over them. Purely DOM + CSS transforms.
 */
export function BrickField({ className = "" }: { className?: string }) {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let cells: HTMLDivElement[] = [];
    let cols = 0;
    let rows = 0;
    let cw = 0;
    let ch = 0;
    let raf = 0;

    // pointer target + smoothed position, in normalised host coords
    const target = { x: 0.5, y: 0.45 };
    const pos = { x: 0.5, y: 0.45 };
    let hasPointer = false;
    let t = 0;

    const build = () => {
      const rect = host.getBoundingClientRect();
      const unit = rect.width < 640 ? 74 : rect.width < 1100 ? 88 : 104;
      cols = Math.max(4, Math.ceil(rect.width / unit));
      rows = Math.max(4, Math.ceil(rect.height / (unit * 0.42)));
      cw = rect.width / cols;
      ch = rect.height / rows;

      host.innerHTML = "";
      cells = [];
      const frag = document.createDocumentFragment();
      for (let r = 0; r < rows; r++) {
        const rowEl = document.createElement("div");
        rowEl.style.cssText = `position:absolute;left:${
          r % 2 ? -cw / 2 : 0
        }px;top:${r * ch}px;width:${rect.width + cw}px;height:${ch}px;display:flex;`;
        for (let c = 0; c <= cols; c++) {
          const cell = document.createElement("div");
          cell.style.cssText = `flex:0 0 ${cw}px;height:100%;padding:2px;will-change:transform,opacity;`;
          const face = document.createElement("div");
          face.style.cssText =
            "width:100%;height:100%;border-radius:2px;background:color-mix(in oklab, var(--foreground) 6%, transparent);box-shadow:inset 0 0 0 1px color-mix(in oklab, var(--foreground) 7%, transparent);transition:background-color .4s ease;";
          cell.appendChild(face);
          rowEl.appendChild(cell);
          cells.push(cell);
        }
        frag.appendChild(rowEl);
      }
      host.appendChild(frag);
    };

    const paint = () => {
      const rect = host.getBoundingClientRect();
      t += 0.006;

      if (!hasPointer || reduced) {
        // ambient bloom drifts across the wall
        target.x = 0.5 + Math.cos(t) * 0.32;
        target.y = 0.5 + Math.sin(t * 1.37) * 0.28;
      }
      pos.x += (target.x - pos.x) * 0.08;
      pos.y += (target.y - pos.y) * 0.08;

      const px = pos.x * rect.width;
      const py = pos.y * rect.height;
      const radius = Math.min(rect.width, rect.height) * 0.62;

      for (let i = 0; i < cells.length; i++) {
        const cell = cells[i];
        const r = Math.floor(i / (cols + 1));
        const c = i % (cols + 1);
        const x = (r % 2 ? -cw / 2 : 0) + c * cw + cw / 2;
        const y = r * ch + ch / 2;
        const d = Math.hypot(x - px, y - py);
        let f = 1 - d / radius;
        f = f < 0 ? 0 : f * f;

        const lift = f * 14;
        const scale = 1 + f * 0.06;
        cell.style.transform = `translate3d(0, ${-lift}px, 0) scale(${scale})`;
        cell.style.opacity = String(0.24 + f * 0.76);
        const face = cell.firstElementChild as HTMLElement;
        face.style.backgroundColor =
          f > 0.04
            ? `color-mix(in oklab, var(--brick, var(--accent)) ${Math.round(
                f * 82,
              )}%, color-mix(in oklab, var(--foreground) 6%, transparent))`
            : "color-mix(in oklab, var(--foreground) 6%, transparent)";
      }
      raf = requestAnimationFrame(paint);
    };

    const onMove = (e: PointerEvent) => {
      const rect = host.getBoundingClientRect();
      if (e.clientY < rect.top || e.clientY > rect.bottom) return;
      hasPointer = true;
      target.x = (e.clientX - rect.left) / rect.width;
      target.y = (e.clientY - rect.top) / rect.height;
    };
    const onLeave = () => {
      hasPointer = false;
    };

    build();
    raf = requestAnimationFrame(paint);

    const ro = new ResizeObserver(() => build());
    ro.observe(host);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={hostRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    />
  );
}
