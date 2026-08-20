import { useEffect, useRef, useState } from "react";

const STEPS = Array.from({ length: 21 }, (_, i) => i / 20);

/**
 * Marks an element with data-revealed while it is in view, and clears the flag
 * once it leaves — so the animation replays on every entry, scrolling up or
 * down, and after a refresh mid-page.
 */
export function useReveal<T extends HTMLElement>(threshold = 0.2) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || typeof IntersectionObserver === "undefined") {
      el.setAttribute("data-revealed", "true");
      return;
    }

    const set = (on: boolean) => el.setAttribute("data-revealed", on ? "true" : "false");

    const evaluate = (entry: IntersectionObserverEntry) => {
      const elHeight = entry.boundingClientRect.height || el.offsetHeight || 1;
      // Effective trigger distance: never ask for more than a fifth of the
      // viewport, so tall sections still fire on small screens.
      const need = Math.min(elHeight * threshold, window.innerHeight * 0.18, elHeight * 0.9);
      set(entry.isIntersecting && entry.intersectionRect.height >= need);
    };

    const io = new IntersectionObserver((entries) => entries.forEach(evaluate), {
      threshold: STEPS,
      rootMargin: "0px 0px -6% 0px",
    });
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return ref;
}


/**
 * Scroll progress of an element through the viewport.
 * 0 = element top hits viewport bottom, 1 = element bottom hits viewport top.
 */
export function useScrollProgress<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let frame = 0;

    const measure = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const total = rect.height + window.innerHeight;
      const raw = (window.innerHeight - rect.top) / total;
      setProgress(Math.min(1, Math.max(0, raw)));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return { ref, progress };
}

/**
 * Progress across a pinned section: 0 while the sticky child is entering,
 * 1 when the tall wrapper has fully passed.
 */
export function usePinProgress<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let frame = 0;

    const measure = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const distance = rect.height - window.innerHeight;
      if (distance <= 0) return setProgress(0);
      setProgress(Math.min(1, Math.max(0, -rect.top / distance)));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return { ref, progress };
}

/** Smoothed, normalised pointer position in [-1, 1]. Fine pointers only. */
export function usePointerField() {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    let frame = 0;
    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };

    const loop = () => {
      current.x += (target.x - current.x) * 0.07;
      current.y += (target.y - current.y) * 0.07;
      setPos({ x: current.x, y: current.y });
      frame = requestAnimationFrame(loop);
    };
    const onMove = (e: PointerEvent) => {
      target.x = (e.clientX / window.innerWidth) * 2 - 1;
      target.y = (e.clientY / window.innerHeight) * 2 - 1;
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    frame = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return pos;
}

export function useHydrated() {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);
  return hydrated;
}

export const clamp = (v: number, min = 0, max = 1) => Math.min(max, Math.max(min, v));
export const lerp = (a: number, b: number, t: number) => a + (b - a) * clamp(t);
