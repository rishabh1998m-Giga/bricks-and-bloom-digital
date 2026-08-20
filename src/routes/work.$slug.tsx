import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { projects } from "@/lib/site-data";
import { RevealImage, RevealScope, Line } from "@/components/site/Reveal";

export const Route = createFileRoute("/work/$slug")({
  loader: ({ params }) => {
    const project = projects.find((p) => p.slug === params.slug);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ params, loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Unavailable — Bricks & Bloom" }, { name: "robots", content: "noindex" }] };
    }
    const p = loaderData.project;
    const url = `https://bricks-and-bloom-digital.lovable.app/work/${params.slug}`;
    return {
      meta: [
        { title: `${p.name} — Bricks & Bloom` },
        { name: "description", content: p.intro },
        { property: "og:title", content: `${p.name} — Bricks & Bloom` },
        { property: "og:description", content: p.intro },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
      ],
      links: [{ rel: "canonical", href: url }],
    };
  },
  notFoundComponent: ProjectNotFound,
  component: ProjectDetail,
});

function ProjectNotFound() {
  return (
    <div className="edge flex min-h-svh flex-col justify-center">
      <p className="meta text-accent">404</p>
      <h1 className="display mt-6 text-[clamp(2.5rem,9vw,7rem)]">No such project</h1>
      <Link to="/work" className="meta link-draw mt-10">
        Back to the archive
      </Link>
    </div>
  );
}

function ProjectDetail() {
  const { project: p } = Route.useLoaderData();
  const others = projects.filter((o) => o.slug !== p.slug).slice(0, 2);

  return (
    <article>
      <header className="edge pt-[26vh]">
        <RevealScope threshold={0.05}>
          <p className="meta text-muted-foreground">
            <span className="text-accent">{p.index}</span> — {p.discipline}
          </p>
          <h1 className="display mt-6 text-[clamp(2.75rem,11vw,9.5rem)]">
            <Line delay={0} drift={-60}>
              {p.name}
            </Line>
          </h1>
          <div className="rule-t mt-12 grid gap-8 pt-5 md:grid-cols-4">
            <Fact label="Location" value={p.location} />
            <Fact label="Year" value={p.year} />
            <Fact label="Category" value={p.category} />
            <Fact label="Materials" value={p.materials.join(", ")} />
          </div>
        </RevealScope>
      </header>

      <div className="mt-16 px-[clamp(0rem,2vw,2rem)]">
        <RevealImage
          src={p.image}
          alt={`${p.name} — principal view`}
          direction="center"
          width={1920}
          height={1080}
          priority
          className="aspect-[16/9]"
        />
      </div>

      <section className="edge py-[12vh]">
        <RevealScope>
          <div className="grid gap-10 md:grid-cols-12">
            <p className="display text-[clamp(1.5rem,3.2vw,2.6rem)] italic text-accent md:col-span-6">{p.intro}</p>
            <div className="flex flex-col gap-6 md:col-span-5 md:col-start-8">
              {p.body.map((para) => (
                <p key={para.slice(0, 24)} className="text-sm leading-relaxed text-muted-foreground">
                  {para}
                </p>
              ))}
            </div>
          </div>
        </RevealScope>
      </section>

      <section className="edge grid gap-6 md:grid-cols-2" aria-label="Project gallery">
        {p.gallery.map((g) => (
          <figure key={g.caption} className={g.span === "full" ? "md:col-span-2" : undefined}>
            <RevealImage
              src={g.src}
              alt={g.caption}
              direction={g.span === "full" ? "up" : "left"}
              width={1600}
              height={1000}
              className={g.span === "full" ? "aspect-[16/9]" : "aspect-[4/3]"}
            />
            <figcaption className="meta mt-3 text-muted-foreground">{g.caption}</figcaption>
          </figure>
        ))}
      </section>

      <section className="edge py-[14vh]" aria-label="Next projects">
        <div className="rule-t pt-5">
          <p className="meta text-muted-foreground">Next</p>
        </div>
        <div className="mt-10 grid gap-12 md:grid-cols-2">
          {others.map((o) => (
            <Link
              key={o.slug}
              to="/work/$slug"
              params={{ slug: o.slug }}
              data-cursor="Open project"
              className="group block"
            >
              <RevealImage
                src={o.image}
                alt={o.name}
                direction="up"
                width={1200}
                height={800}
                className="aspect-[3/2]"
                imgClassName="transition-transform duration-[1.4s] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.04]"
              />
              <h2 className="display mt-5 text-[clamp(1.6rem,3vw,2.5rem)]">{o.name}</h2>
              <span className="meta text-muted-foreground">
                {o.category} — {o.year}
              </span>
            </Link>
          ))}
        </div>
      </section>
    </article>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="fade-in">
      <span className="meta text-muted-foreground">{label}</span>
      <p className="mt-2 text-sm">{value}</p>
    </div>
  );
}
