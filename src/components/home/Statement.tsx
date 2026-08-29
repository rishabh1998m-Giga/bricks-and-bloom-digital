import { Line, RevealScope } from "@/components/site/Reveal";

/**
 * Editorial statement. Lines begin displaced along the horizontal axis and
 * lock into the grid as they resolve — a reference to drafting alignment.
 */
export function Statement() {
  return (
    <section className="edge relative section-y">
      <RevealScope threshold={0.3}>
        <div className="grid gap-y-1 md:grid-cols-12 md:gap-y-2">
          <div className="hidden md:block md:col-span-1" />

          <h2 className="display text-[clamp(2rem,5.2vw,4.25rem)] leading-[0.98] md:leading-[0.92] md:col-span-11">
            <Line delay={0} drift={-60}>
              We design spaces where architecture{" "}
            </Line>
            <Line delay={120} drift={45} className="italic text-accent">
              meets landscape.
            </Line>
          </h2>
        </div>
      </RevealScope>
    </section>
  );
}
