"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import type { Locale } from "@/content/types";
import { certificates, projects, stats, tools } from "@/content/data";
import { siteConfig } from "@/lib/site";

const experience = {
  pt: [
    {
      role: "Desenvolvedor de Automações com IA",
      org: "Freelance / Projetos próprios",
      period: "2023 a presente",
      bullets: [
        "Automações n8n e Make para atendimento WhatsApp e processos internos.",
        "Integrações low-code com CRM, planilhas e APIs.",
        "MVPs com Lovable, Supabase e Cursor.",
      ],
    },
  ],
  en: [
    {
      role: "AI Automation Developer",
      org: "Freelance / Personal projects",
      period: "2023 to present",
      bullets: [
        "n8n and Make automations for WhatsApp support and internal processes.",
        "Low-code integrations with CRM, spreadsheets, and APIs.",
        "MVPs with Lovable, Supabase, and Cursor.",
      ],
    },
  ],
};

export default function CvPage() {
  const params = useParams();
  const lang = (params.lang as Locale) ?? "pt";
  const isPt = lang === "pt";

  const labels = {
    pt: {
      back: "Voltar ao portfólio",
      download: "Baixar / Imprimir PDF",
      experience: "Experiência",
      education: "Formação",
      skills: "Competências",
      subtitle: "Desenvolvedor NoCode/LowCode · Automações com IA",
    },
    en: {
      back: "Back to portfolio",
      download: "Download / Print PDF",
      experience: "Experience",
      education: "Education",
      skills: "Skills",
      subtitle: "NoCode/LowCode Developer · AI Automations",
    },
  }[lang];

  return (
    <div className="mx-auto max-w-3xl px-6 py-32 print:py-8">
      <div className="no-print mb-8 flex items-center justify-between gap-4">
        <Link
          href={`/${lang}`}
          className="font-mono text-xs uppercase tracking-wider text-emerald hover:underline"
        >
          ← {labels.back}
        </Link>
        <button
          type="button"
          onClick={() => window.print()}
          className="rounded-lg border border-emerald px-4 py-2 font-mono text-xs uppercase tracking-wider text-emerald hover:bg-emerald hover:text-ink"
        >
          {labels.download}
        </button>
      </div>

      <header className="border-b border-line pb-8">
        <h1 className="font-display text-4xl font-bold">{siteConfig.name}</h1>
        <p className="mt-2 font-mono text-sm text-emerald">{labels.subtitle}</p>
        <p className="mt-4 text-sm text-muted">
          {siteConfig.email} · {siteConfig.links.linkedin.replace("https://", "")}
        </p>
      </header>

      <section className="mt-10">
        <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-emerald">
          {labels.experience}
        </h2>
        {experience[lang].map((item) => (
          <div key={item.role} className="mt-6">
            <h3 className="font-display text-lg font-semibold">{item.role}</h3>
            <p className="font-mono text-xs text-muted">
              {item.org} · {item.period}
            </p>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-muted">
              {item.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section className="mt-10">
        <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-emerald">
          {labels.education}
        </h2>
        <ul className="mt-4 space-y-3">
          {certificates.slice(0, 4).map((c) => (
            <li key={c.course.pt} className="text-sm">
              <span className="font-mono text-emerald">{c.year}</span>{" · "}
              <strong>{c.course[lang]}</strong>
              <span className="text-muted"> · {c.institution}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-emerald">
          {labels.skills}
        </h2>
        <p className="mt-4 font-mono text-sm leading-relaxed text-muted">
          {tools.join(" · ")}
        </p>
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label.pt} className="rounded border border-line p-3 text-center">
              <p className="font-display text-2xl font-bold text-emerald">
                {s.value}
                {s.suffix}
              </p>
              <p className="font-mono text-[0.6rem] uppercase text-muted">
                {s.label[lang]}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10 print:break-before-page">
        <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-emerald">
          {isPt ? "Projetos" : "Projects"}
        </h2>
        <ul className="mt-4 space-y-4">
          {projects.map((p) => (
            <li key={p.slug}>
              <strong>{p.title[lang]}</strong>
              <p className="text-sm text-muted">{p.summary[lang]}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
