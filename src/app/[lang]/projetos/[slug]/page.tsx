import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/motion/Reveal";
import type { Locale } from "@/content/types";
import { getProjectBySlug, getProjects, localize } from "@/lib/content";
import { getDictionary, hasLocale } from "../../dictionaries";

export async function generateStaticParams() {
  const projects = await getProjects();
  const langs: Locale[] = ["pt", "en"];
  return langs.flatMap((lang) =>
    projects.map((p) => ({ lang, slug: p.slug })),
  );
}

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/projetos/[slug]">) {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) return {};
  const project = await getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: localize(project.title, lang as Locale),
  };
}

export default async function ProjectPage({
  params,
}: PageProps<"/[lang]/projetos/[slug]">) {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) notFound();

  const locale = lang as Locale;
  const [dict, project] = await Promise.all([
    getDictionary(locale),
    getProjectBySlug(slug),
  ]);

  if (!project) notFound();

  return (
    <article className="mx-auto max-w-3xl px-6 py-32">
      <Reveal>
        <Link
          href={`/${locale}#projetos`}
          className="font-mono text-xs uppercase tracking-wider text-emerald hover:underline"
        >
          ← {dict.projects.label}
        </Link>
      </Reveal>
      <Reveal delay={0.1}>
        <h1 className="font-display mt-8 text-[clamp(2rem,5vw,3rem)] font-bold">
          {localize(project.title, locale)}
        </h1>
      </Reveal>
      <Reveal delay={0.15}>
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
      </Reveal>
      <Reveal delay={0.2}>
        <p className="mt-8 text-lg leading-relaxed text-muted">
          {localize(project.description, locale)}
        </p>
      </Reveal>
    </article>
  );
}
