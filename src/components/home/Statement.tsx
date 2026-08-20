import { Line, RevealScope } from "@/components/site/Reveal";

/**
 * Editorial statement. Lines begin displaced along the horizontal axis and
 * lock into the grid as they resolve — a reference to drafting alignment.
 */
export function Statement() {
  return (
    <section className="edge relative py-[18vh]">
      <RevealScope threshold={0.3}>
        <div className="grid gap-10 md:grid-cols-12">
          <p className="meta text-muted-foreground md:col-span-3">
            <span className="text-accent">01</span> — Position
          </p>

          <h2 className="display text-[clamp(2.5rem,8.5vw,8rem)] md:col-span-9">
            <Line delay={0} drift={-90}>
              We design
            </Line>
            <Line delay={110} drift={70}>
              spaces where
            </Line>
            <Line delay={220} drift={-50}>
              architecture
            </Line>
            <Line delay={330} drift={40} className="italic text-accent">
              meets landscape.
            </Line>
          </h2>

          <div className="md:col-span-3" />
          <div className="fade-in grid gap-10 md:col-span-9 md:grid-cols-2" style={{ transitionDelay: "560ms" }}>
            <p className="max-w-[46ch] text-sm leading-relaxed text-muted-foreground">
              The studio works across built form and open ground at the same scale of attention. A wall and a
              planting bed are drawn in the same section, on the same sheet, in the same week.
            </p>
            <p className="max-w-[46ch] text-sm leading-relaxed text-muted-foreground">
              Our work is deliberately slow: local material, few gestures, and detailing resolved at full size
              before anything is built. We design for the fifteenth year, not the first photograph.
            </p>
          </div>
        </div>
      </RevealScope>
    </section>
  );
}
