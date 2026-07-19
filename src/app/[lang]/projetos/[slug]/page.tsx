import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProjectFlow } from "@/components/motion/ProjectFlow";
import { Reveal } from "@/components/motion/Reveal";
import { CaseFeatureGrid } from "@/components/sections/case/CaseFeatureGrid";
import { StackGroups } from "@/components/sections/case/StackGroups";
import type { Locale } from "@/content/types";
import { getProjectBySlug, getProjects, localize } from "@/lib/content";
import { siteConfig } from "@/lib/site";
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
  const title = localize(project.title, lang as Locale);
  return {
    title,
    description: localize(project.summary, lang as Locale),
    openGraph: { title },
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

  const pd = dict.projectDetail;
  const metaParts: string[] = [];
  if (project.role) metaParts.push(localize(project.role, locale));
  if (project.duration) metaParts.push(localize(project.duration, locale));
  if (project.year) metaParts.push(String(project.year));

  return (
    <article className="mx-auto max-w-4xl px-6 py-32">
      <Reveal>
        <Link
          href={`/${locale}#projetos`}
          className="font-mono text-xs uppercase tracking-wider text-emerald hover:underline"
        >
          ← {pd.back}
        </Link>
      </Reveal>

      <Reveal delay={0.05}>
        <header className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-8">
          {project.client?.logo ? (
            <div className="relative h-20 w-40 shrink-0 overflow-hidden rounded-lg border border-line bg-white p-3">
              <Image
                src={project.client.logo}
                alt={project.client.name}
                fill
                className="object-contain p-2"
                sizes="160px"
              />
            </div>
          ) : null}
          <div>
            {project.client ? (
              <p className="font-mono text-xs uppercase tracking-wider text-emerald">
                {project.client.name}
              </p>
            ) : null}
            <h1 className="font-display mt-2 text-[clamp(2rem,5vw,3rem)] font-bold tracking-tight">
              {localize(project.title, locale)}
            </h1>
            {metaParts.length > 0 ? (
              <p className="mt-3 font-mono text-xs text-muted">
                {metaParts.join(" · ")}
              </p>
            ) : null}
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
        </header>
      </Reveal>

      {project.challenge && project.solution ? (
        <Reveal delay={0.1}>
          <div className="mt-16 grid gap-10 md:grid-cols-2">
            <div>
              <h2 className="font-mono text-xs uppercase tracking-wider text-emerald">
                {pd.challenge}
              </h2>
              <p className="mt-4 leading-relaxed text-muted">
                {localize(project.challenge, locale)}
              </p>
            </div>
            <div>
              <h2 className="font-mono text-xs uppercase tracking-wider text-emerald">
                {pd.solution}
              </h2>
              <p className="mt-4 leading-relaxed text-muted">
                {localize(project.solution, locale)}
              </p>
            </div>
          </div>
        </Reveal>
      ) : (
        <Reveal delay={0.1}>
          <p className="mt-12 text-lg leading-relaxed text-muted">
            {localize(project.description, locale)}
          </p>
        </Reveal>
      )}

      {project.flow && project.flow.length > 0 ? (
        <Reveal delay={0.15}>
          <section className="mt-20">
            <h2 className="font-mono text-xs uppercase tracking-wider text-emerald">
              {pd.architecture}
            </h2>
            <div className="mt-6">
              <ProjectFlow
                stages={project.flow}
                locale={locale}
                hint={pd.architectureHint}
              />
            </div>
          </section>
        </Reveal>
      ) : null}

      {project.humanized && project.humanized.length > 0 ? (
        <Reveal delay={0.2}>
          <section className="mt-20">
            <h2 className="font-display text-2xl font-bold">{pd.humanized}</h2>
            <div className="mt-8">
              <CaseFeatureGrid items={project.humanized} locale={locale} />
            </div>
          </section>
        </Reveal>
      ) : null}

      {project.capabilities && project.capabilities.length > 0 ? (
        <Reveal delay={0.25}>
          <section className="mt-20">
            <h2 className="font-display text-2xl font-bold">{pd.capabilities}</h2>
            <div className="mt-8">
              <CaseFeatureGrid items={project.capabilities} locale={locale} />
            </div>
          </section>
        </Reveal>
      ) : null}

      {project.stack && project.stack.length > 0 ? (
        <Reveal delay={0.3}>
          <section className="mt-20">
            <h2 className="font-display text-2xl font-bold">{pd.stack}</h2>
            <div className="mt-8">
              <StackGroups groups={project.stack} locale={locale} />
            </div>
          </section>
        </Reveal>
      ) : null}

      {project.results && project.results.length > 0 ? (
        <Reveal delay={0.35}>
          <section className="mt-20">
            <h2 className="font-display text-2xl font-bold">{pd.results}</h2>
            <ul className="mt-6 space-y-4">
              {project.results.map((result) => (
                <li
                  key={localize(result, locale)}
                  className="flex gap-3 text-muted"
                >
                  <span
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald"
                    aria-hidden
                  />
                  <span className="leading-relaxed">
                    {localize(result, locale)}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        </Reveal>
      ) : null}

      <Reveal delay={0.4}>
        <div className="mt-20 flex flex-wrap gap-4">
          <Link
            href={siteConfig.links.whatsapp(locale)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-sweep inline-flex items-center gap-2 rounded-lg border border-emerald px-6 py-3 font-mono text-sm uppercase tracking-wider text-emerald transition hover:text-ink"
          >
            {pd.cta}
            <span aria-hidden>→</span>
          </Link>
          <Link
            href={`/${locale}#contato`}
            className="inline-flex items-center gap-2 rounded-lg border border-line px-6 py-3 font-mono text-sm uppercase tracking-wider text-muted transition hover:border-emerald hover:text-fg"
          >
            {dict.contact.label}
          </Link>
        </div>
      </Reveal>
    </article>
  );
}
