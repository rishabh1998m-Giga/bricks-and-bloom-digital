import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { studio, services } from "@/lib/site-data";
import { RevealScope, Line } from "@/components/site/Reveal";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Brick & Blooms" },
      {
        name: "description",
        content:
          "Start a conversation with Brick & Blooms about an architecture, landscape or interior commission in India.",
      },
      { property: "og:title", content: "Contact — Brick & Blooms" },
      { property: "og:description", content: "Have a site? Let's walk it. Studio enquiries welcome." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://bricks-and-bloom-digital.lovable.app/contact" },
    ],
    links: [{ rel: "canonical", href: "https://bricks-and-bloom-digital.lovable.app/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [discipline, setDiscipline] = useState(services[0]?.title ?? "");

  return (
    <div className="edge pt-[clamp(8rem,26vh,16rem)] pb-[clamp(4.5rem,12vh,11rem)]">
      <RevealScope threshold={0.05}>
        <p className="meta text-muted-foreground">Enquiries</p>
        <h1 className="display mt-6 text-[clamp(3rem,12vw,10rem)]">
          <Line delay={0} drift={-70}>
            Contact
          </Line>
        </h1>
      </RevealScope>

      <div className="mt-20 grid gap-16 md:grid-cols-12">
        <form
          className="flex flex-col gap-10 md:col-span-7"
          onSubmit={(e) => {
            e.preventDefault();
            const form = e.currentTarget;
            const data = new FormData(form);
            const subject = `Enquiry — ${discipline}`;
            const body = `Name: ${data.get("name")}\nPhone: ${data.get("phone")}\nEmail: ${data.get("email")}\nSite: ${data.get("site")}\n\n${data.get("message")}`;
            window.location.href = `mailto:${studio.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
          }}
        >
          <Field name="name" label="Name" required />
          <Field name="phone" label="Phone" type="tel" />
          <Field name="email" label="Email" type="email" required />
          <Field name="site" label="Where is the site?" />

          <fieldset>
            <legend className="meta text-muted-foreground">Discipline</legend>
            <div className="mt-5 flex flex-wrap gap-3">
              {services.map((s) => (
                <button
                  key={s.title}
                  type="button"
                  onClick={() => setDiscipline(s.title)}
                  className="meta border px-4 py-2 transition-colors"
                  style={{
                    borderColor: discipline === s.title ? "var(--clay)" : "var(--border)",
                    color: discipline === s.title ? "var(--clay)" : undefined,
                  }}
                >
                  {s.title}
                </button>
              ))}
            </div>
          </fieldset>

          <label className="block">
            <span className="meta text-muted-foreground">Tell us about the project</span>
            <textarea
              name="message"
              rows={5}
              required
              className="mt-4 w-full resize-none border-0 border-b border-border bg-transparent pb-3 text-lg outline-none transition-colors focus:border-accent"
            />
          </label>

          <button
            type="submit"
            data-cursor="Send"
            className="display link-draw self-start text-[clamp(1.5rem,3.5vw,2.75rem)] italic text-accent"
          >
            Send enquiry →
          </button>
        </form>

        <aside className="flex flex-col gap-10 md:col-span-4 md:col-start-9">
          <div className="rule-t pt-5">
            <span className="meta text-muted-foreground">Studio</span>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{studio.location}</p>
          </div>
          <div className="rule-t pt-5">
            <span className="meta text-muted-foreground">Direct</span>
            <p className="mt-3 flex flex-col gap-2 text-sm">
              <a href={`mailto:${studio.email}`} className="link-draw self-start">
                {studio.email}
              </a>
              <a href={studio.whatsapp} target="_blank" rel="noopener noreferrer" className="link-draw self-start">
                {studio.phone}
              </a>
            </p>
          </div>
          <div className="rule-t pt-5">
            <span className="meta text-muted-foreground">Elsewhere</span>
            <div className="mt-3 flex flex-col gap-2">
              {studio.socials.map((s) => (
                <a key={s.label} href={s.href} className="link-draw self-start text-sm">
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Field({
  name,
  label,
  type = "text",
  required,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="meta text-muted-foreground">{label}</span>
      <input
        name={name}
        type={type}
        required={required}
        className="mt-4 w-full border-0 border-b border-border bg-transparent pb-3 text-lg outline-none transition-colors focus:border-accent"
      />
    </label>
  );
}
