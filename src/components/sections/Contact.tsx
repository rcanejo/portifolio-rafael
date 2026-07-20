"use client";

import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { OrchestratorScene } from "@/components/motion/OrchestratorScene";
import type { Dictionary, Locale } from "@/content/types";
import { siteConfig } from "@/lib/site";

interface ContactProps {
  lang: Locale;
  dict: Dictionary;
}

export function Contact({ lang, dict }: ContactProps) {
  return (
    <section id="contato" className="scroll-mt-24 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-16 lg:grid-cols-2">
          <div>
            <Reveal>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-emerald">
                {dict.contact.label}
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="font-display mt-4 text-[clamp(2rem,5vw,3.5rem)] font-bold tracking-tight">
                {dict.contact.title}
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-6 text-muted leading-relaxed">{dict.contact.subtitle}</p>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="mt-8 flex flex-wrap gap-6">
                <a
                  href={siteConfig.links.whatsapp(lang)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-sm text-muted transition hover:-translate-y-0.5 hover:text-coral"
                >
                  WhatsApp
                </a>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="font-mono text-sm text-muted transition hover:-translate-y-0.5 hover:text-coral"
                >
                  {siteConfig.email}
                </a>
                <a
                  href={siteConfig.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-sm text-muted transition hover:-translate-y-0.5 hover:text-coral"
                >
                  GitHub
                </a>
                <Link
                  href={`/${lang}/cv`}
                  className="font-mono text-sm text-emerald underline-offset-4 hover:underline"
                >
                  {dict.contact.downloadCv}
                </Link>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.15}>
            <OrchestratorScene />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
