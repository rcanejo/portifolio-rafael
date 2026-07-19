import { Reveal, StaggerItem, StaggerReveal } from "@/components/motion/Reveal";
import type { Dictionary, Locale, Project } from "@/content/types";
import { localize } from "@/lib/content";
import { ProjectCard } from "./ProjectCard";

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
              <ProjectCard
                href={`/${lang}/projetos/${project.slug}`}
                title={localize(project.title, lang)}
                summary={localize(project.summary, lang)}
                tags={project.tags}
                image={project.image ?? project.client?.logo}
              />
            </StaggerItem>
          ))}
        </StaggerReveal>
      </div>
    </section>
  );
}
