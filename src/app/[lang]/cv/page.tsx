"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import type { Locale } from "@/content/types";
import { achievement, certificates, projects, tools } from "@/content/data";
import { siteConfig } from "@/lib/site";

const copy = {
  pt: {
    back: "Voltar ao portfólio",
    download: "Baixar / Imprimir PDF",
    profile: "Perfil Profissional",
    profileText:
      "Desenvolvedor NoCode/LowCode especializado em automações com IA. Construo agentes humanizados no WhatsApp, orquestração com n8n, integrações CRM e infraestrutura própria. Atuo na comunidade ibe.IA desde julho de 2025 e entrego projetos reais para escritórios de advocacia, e-commerce e operações internas.",
    experience: "Experiência Profissional",
    education: "Formação",
    skills: "Habilidades",
    achievements: "Conquistas",
    achievementItem: "Placa 5D ibe.IA — primeiro marco de faturamento comprovado na comunidade.",
    cohnRole: "Desenvolvimento e coordenação da equipe de automação · Grupo IDE",
    cohnPeriod: "2026",
    cohnBullets: [
      "Dois agentes de IA no WhatsApp oficial + Chatwoot: triagem por área, qualificação e handoff humano.",
      "Orquestração n8n com buffer humano, multimídia (transcrição, visão, PDF) e memória compartilhada no Postgres.",
      "Tools CRM: etiquetas automáticas, notas privadas, balanceamento de advogados, pgvector por área e ZapSign + Drive.",
    ],
    mirraRole: "Desenvolvimento 100% do zero",
    mirraPeriod: "2025",
    mirraBullets: [
      "Agente humanizado no WhatsApp (ZAPI): texto, áudio, imagem, vídeo e documento com memória por conversa.",
      "Base vetorizada sincronizada em tempo real via Notion e Supabase.",
      "Infra própria em Hetzner com Docker, Traefik e Redis.",
    ],
    subtitle: "Desenvolvedor NoCode/LowCode · Automações com IA",
  },
  en: {
    back: "Back to portfolio",
    download: "Download / Print PDF",
    profile: "Professional Profile",
    profileText:
      "NoCode/LowCode developer focused on AI automations. I build human-like WhatsApp agents, n8n orchestration, CRM integrations, and self-hosted infrastructure. Active in the ibe.IA community since July 2025, delivering real projects for law firms, e-commerce, and internal operations.",
    experience: "Professional Experience",
    education: "Education",
    skills: "Skills",
    achievements: "Achievements",
    achievementItem: "ibe.IA 5D Plaque — first verified revenue milestone in the community.",
    cohnRole: "Development and automation team coordination · Grupo IDE",
    cohnPeriod: "2026",
    cohnBullets: [
      "Two AI agents on official WhatsApp + Chatwoot: area triage, qualification, and human handoff.",
      "n8n orchestration with human message buffer, multimedia (transcription, vision, PDF), and shared Postgres memory.",
      "CRM tools: automatic labels, private notes, lawyer load balancing, pgvector by area, and ZapSign + Drive.",
    ],
    mirraRole: "Built 100% from scratch",
    mirraPeriod: "2025",
    mirraBullets: [
      "Human-like WhatsApp agent (ZAPI): text, audio, image, video, and documents with per-conversation memory.",
      "Vector knowledge base synced in real time via Notion and Supabase.",
      "Self-hosted infrastructure on Hetzner with Docker, Traefik, and Redis.",
    ],
    subtitle: "NoCode/LowCode Developer · AI Automations",
  },
} as const;

export default function CvPage() {
  const params = useParams();
  const lang = (params.lang as Locale) ?? "pt";
  const t = copy[lang];

  const cohn = projects.find((p) => p.slug === "cohn-santos-atendimento-juridico-ia");
  const mirra = projects.find((p) => p.slug === "mirra-maison-atendimento-ia");

  return (
    <div className="cv-document min-h-screen bg-white print:bg-white">
      <div className="mx-auto max-w-[210mm] px-8 py-16 print:px-12 print:py-8">
      <div className="no-print mb-8 flex items-center justify-between gap-4 border-b border-[#ccc] pb-4">
        <Link
          href={`/${lang}`}
          className="font-mono text-xs uppercase tracking-wider text-[#333] hover:underline"
        >
          ← {t.back}
        </Link>
        <button
          type="button"
          onClick={() => window.print()}
          className="rounded border border-[#333] px-4 py-2 font-mono text-xs uppercase tracking-wider text-[#111] hover:bg-[#f0f0f0]"
        >
          {t.download}
        </button>
      </div>

      <header className="border-b border-[#ccc] pb-6">
        <h1 className="text-3xl font-bold tracking-tight">{siteConfig.name}</h1>
        <p className="mt-1 text-base">{t.subtitle}</p>
        <p className="mt-3 text-sm leading-relaxed">
          {siteConfig.whatsappDisplay} · {siteConfig.email} ·{" "}
          {siteConfig.links.github.replace("https://", "")}
        </p>
      </header>

      <section className="mt-8">
        <h2 className="text-sm font-bold uppercase tracking-widest">{t.profile}</h2>
        <p className="mt-2 text-sm leading-relaxed">{t.profileText}</p>
      </section>

      <section className="mt-8">
        <h2 className="text-sm font-bold uppercase tracking-widest">{t.experience}</h2>

        {cohn && (
          <article className="mt-4">
            <h3 className="text-base font-bold">{cohn.title[lang]}</h3>
            <p className="text-sm">
              {t.cohnRole} · {t.cohnPeriod}
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-relaxed">
              {t.cohnBullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </article>
        )}

        {mirra && (
          <article className="mt-6">
            <h3 className="text-base font-bold">{mirra.title[lang]}</h3>
            <p className="text-sm">
              {t.mirraRole} · {t.mirraPeriod}
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-relaxed">
              {t.mirraBullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </article>
        )}
      </section>

      <section className="mt-8">
        <h2 className="text-sm font-bold uppercase tracking-widest">{t.education}</h2>
        <ul className="mt-3 space-y-3 text-sm leading-relaxed">
          {certificates.map((c) => (
            <li key={c.course.pt}>
              <strong>{c.course[lang]}</strong>
              <span> · {c.institution}</span>
              {c.description && (
                <p className="mt-0.5 text-[13px] leading-relaxed">{c.description[lang]}</p>
              )}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="text-sm font-bold uppercase tracking-widest">{t.skills}</h2>
        <p className="mt-2 text-sm leading-relaxed">
          {tools.map((tool) => tool.name).join(", ")}
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-sm font-bold uppercase tracking-widest">{t.achievements}</h2>
        <p className="mt-2 text-sm leading-relaxed">
          {t.achievementItem} {achievement.subtitle[lang]}
        </p>
      </section>
      </div>
    </div>
  );
}
