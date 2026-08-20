import type { ReactNode } from "react";
import { useReveal } from "@/lib/motion";
import { cn } from "@/lib/utils";

type Direction = "up" | "left" | "right" | "center";

/** Clip-path image reveal. Direction varies per section by design. */
export function RevealImage({
  src,
  alt,
  direction = "up",
  className,
  imgClassName,
  width,
  height,
  priority,
}: {
  src: string;
  alt: string;
  direction?: Direction;
  className?: string;
  imgClassName?: string;
  width?: number;
  height?: number;
  priority?: boolean;
}) {
  const ref = useReveal<HTMLDivElement>(0.15);
  return (
    <div ref={ref} className={cn("overflow-hidden", className)}>
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        className={cn(
          "h-full w-full object-cover",
          direction === "up" && "reveal-up",
          direction === "left" && "reveal-left",
          direction === "right" && "reveal-right",
          direction === "center" && "reveal-center",
          imgClassName,
        )}
      />
    </div>
  );
}

/** Wraps children in a reveal scope so .line-mask / .fade-in animate on entry. */
export function RevealScope({
  children,
  className,
  threshold = 0.25,
}: {
  children: ReactNode;
  className?: string;
  threshold?: number;
}) {
  const ref = useReveal<HTMLDivElement>(threshold);
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

/** A single masked line of display type with optional lateral drift + delay. */
export function Line({
  children,
  delay = 0,
  drift = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  drift?: number;
  className?: string;
}) {
  return (
    <span className={cn("line-mask", className)}>
      <span style={{ transitionDelay: `${delay}ms`, ["--drift" as string]: `${drift}px` }}>{children}</span>
    </span>
  );
}
