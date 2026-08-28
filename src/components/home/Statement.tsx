import { Line, RevealScope } from "@/components/site/Reveal";

/**
 * Editorial statement. Lines begin displaced along the horizontal axis and
 * lock into the grid as they resolve — a reference to drafting alignment.
 */
export function Statement() {
  return (
    <section className="edge relative section-y-lg">
      <RevealScope threshold={0.3}>
        <div className="grid gap-x-10 gap-y-5 md:grid-cols-12 md:gap-y-8">
          <div className="md:col-span-3" />

          <h2 className="display text-[clamp(2.45rem,6.4vw,5.75rem)] leading-[0.95] md:leading-[0.86] md:col-span-9">
            <Line delay={0} drift={-90}>
              We design{" "}
            </Line>
            <Line delay={110} drift={70}>
              spaces where{" "}
            </Line>
            <Line delay={220} drift={-50}>
              architecture{" "}
            </Line>
            <Line delay={330} drift={40} className="italic text-accent">
              meets landscape.
            </Line>
          </h2>

          <div className="md:col-span-3" />
          <div className="fade-in grid gap-x-10 gap-y-4 md:col-span-9 md:mt-2 md:gap-y-6 md:grid-cols-2" style={{ transitionDelay: "560ms" }}>
            <p className="body-copy max-w-[46ch] text-muted-foreground">
              The studio works across built form and open ground at the same scale of attention. A wall and a
              planting bed are drawn in the same section, on the same sheet, in the same week.
            </p>
            <p className="body-copy max-w-[46ch] text-muted-foreground">
              Our work is deliberately slow: local material, few gestures, and detailing resolved at full size
              before anything is built. We design for the fifteenth year, not the first photograph.
            </p>
          </div>
        </div>
      </RevealScope>
    </section>
  );
}
