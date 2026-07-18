import Link from "next/link";
import { Reveal, StaggerItem, StaggerReveal } from "@/components/motion/Reveal";
import type { Dictionary, Locale, Project } from "@/content/types";
import { localize } from "@/lib/content";

function ProjectThumb({ title }: { title: string }) {
  return (
    <div className="flex aspect-[16/10] items-center justify-center overflow-hidden rounded-t-lg bg-panel">
      <svg viewBox="0 0 200 120" className="h-full w-full opacity-40" aria-hidden>
        <circle cx="40" cy="60" r="8" fill="none" stroke="#34D399" strokeWidth="1.5" />
        <circle cx="100" cy="40" r="8" fill="none" stroke="#34D399" strokeWidth="1.5" />
        <circle cx="100" cy="80" r="8" fill="#FF6B6B" stroke="#FF6B6B" strokeWidth="1.5" />
        <circle cx="160" cy="60" r="8" fill="none" stroke="#34D399" strokeWidth="1.5" />
        <path d="M40,60 C70,60 70,40 100,40" fill="none" stroke="#34D399" strokeWidth="1" />
        <path d="M40,60 C70,60 70,80 100,80" fill="none" stroke="#34D399" strokeWidth="1" />
        <path d="M100,40 C130,40 130,60 160,60" fill="none" stroke="#34D399" strokeWidth="1" />
        <path d="M100,80 C130,80 130,60 160,60" fill="none" stroke="#34D399" strokeWidth="1" />
      </svg>
      <span className="sr-only">{title}</span>
    </div>
  );
}

interface ProjectsProps {
  lang: Locale;
  dict: Dictionary;
  projects: Project[];
}

export function Projects({ lang, dict, projects }: ProjectsProps) {
  const featured = projects.filter((p) => p.featured).slice(0, 3);

  return (
    <section id="projetos" className="scroll-mt-24 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-emerald">
            {dict.projects.label}
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-display mt-4 text-[clamp(2rem,5vw,3.5rem)] font-bold tracking-tight">
            {dict.projects.title}
          </h2>
        </Reveal>

        <StaggerReveal className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((project) => (
            <StaggerItem key={project.slug}>
              <Link
                href={`/${lang}/projetos/${project.slug}`}
                className="group block overflow-hidden rounded-lg border border-line bg-panel transition duration-200 hover:-translate-y-1 hover:border-emerald"
              >
                <div className="overflow-hidden transition duration-300 group-hover:scale-[1.03]">
                  <ProjectThumb title={localize(project.title, lang)} />
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-display text-lg font-semibold">
                      {localize(project.title, lang)}
                    </h3>
                    <span
                      className="font-mono text-coral transition group-hover:translate-x-1"
                      aria-hidden
                    >
                      →
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-muted line-clamp-2">
                    {localize(project.summary, lang)}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded border border-line px-2 py-0.5 font-mono text-[0.65rem] uppercase tracking-wider text-muted"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerReveal>
      </div>
    </section>
  );
}
