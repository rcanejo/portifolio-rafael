import { HoverCard } from "@/components/motion/HoverCard";
import { Reveal, StaggerItem, StaggerReveal } from "@/components/motion/Reveal";
import type { Dictionary, Locale, Service } from "@/content/types";
import { localize } from "@/lib/content";

function ServiceIcon({ icon }: { icon: string }) {
  const paths: Record<string, string> = {
    workflow:
      "M4 6h4v4H4V6zm6 0h4v4h-4V6zm6 0h4v4h-4V6M4 14h4v4H4v-4zm6 0h4v4h-4v-4zm6 0h4v4h-4v-4",
    message:
      "M4 4h16v10H5.17L4 15.17V4zm2 2v6h12V6H6zm2 2h8v2H8V8z",
    code: "M8 8l-4 4 4 4M16 8l4 4-4 4M14 4l-4 16",
    chart: "M4 18V6h2v12H4zm4-4v4h2v-4H8zm4-6v10h2V8h-2zm4 3v7h2v-7h-2z",
  };

  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-emerald transition-transform duration-500 group-hover:scale-110"
      aria-hidden
    >
      <path d={paths[icon] ?? paths.workflow} />
    </svg>
  );
}

interface ServicesProps {
  lang: Locale;
  dict: Dictionary;
  services: Service[];
}

export function Services({ lang, dict, services }: ServicesProps) {
  return (
    <section id="servicos" className="scroll-mt-24 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-emerald">
            {dict.services.label}
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-display mt-4 text-[clamp(2rem,5vw,3.5rem)] font-bold tracking-tight">
            {dict.services.title}
          </h2>
        </Reveal>

        <StaggerReveal className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <StaggerItem key={service.title.pt}>
              <HoverCard>
                <article className="group h-full rounded-lg border border-line bg-panel p-6 transition-[border-color,box-shadow] duration-500 hover:border-emerald hover:shadow-[0_12px_40px_rgba(0,0,0,0.35)]">
                  <ServiceIcon icon={service.icon} />
                  <h3 className="font-display mt-4 text-lg font-semibold transition-colors duration-500 group-hover:text-emerald">
                    {localize(service.title, lang)}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted transition-colors duration-500 group-hover:text-fg/80">
                    {localize(service.description, lang)}
                  </p>
                </article>
              </HoverCard>
            </StaggerItem>
          ))}
        </StaggerReveal>
      </div>
    </section>
  );
}
