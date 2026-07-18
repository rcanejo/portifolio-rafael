"use client";

import { useState } from "react";
import { Lightbox } from "@/components/motion/Lightbox";
import { Reveal } from "@/components/motion/Reveal";
import { TimelineDraw } from "@/components/motion/TimelineDraw";
import type { Certificate, Dictionary, Locale } from "@/content/types";
import { localize } from "@/lib/content";

interface CertificatesProps {
  lang: Locale;
  dict: Dictionary;
  certificates: Certificate[];
}

export function Certificates({ lang, dict, certificates }: CertificatesProps) {
  const [lightbox, setLightbox] = useState<{ src?: string; alt: string } | null>(
    null,
  );

  return (
    <section id="formacao" className="scroll-mt-24 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-emerald">
            {dict.certificates.label}
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-display mt-4 text-[clamp(2rem,5vw,3.5rem)] font-bold tracking-tight">
            {dict.certificates.title}
          </h2>
        </Reveal>

        <div className="relative mt-16 pl-8">
          <TimelineDraw />
          <ul className="space-y-12">
            {certificates.map((cert, i) => (
              <Reveal key={`${cert.year}-${cert.course.pt}`} delay={i * 0.08}>
                <li className="relative grid gap-4 md:grid-cols-[1fr_auto] md:items-center">
                  <div className="relative pl-6">
                    <span
                      className={`absolute -left-[2.05rem] top-2 h-3 w-3 rounded-full border-2 ${
                        cert.highlight
                          ? "border-coral bg-coral"
                          : "border-emerald bg-ink"
                      }`}
                      aria-hidden
                    />
                    <p className="font-mono text-xs text-emerald">{cert.year}</p>
                    <h3 className="font-display mt-1 text-lg font-semibold">
                      {localize(cert.course, lang)}
                    </h3>
                    <p className="mt-1 text-sm text-muted">{cert.institution}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      setLightbox({
                        src: cert.image,
                        alt: localize(cert.course, lang),
                      })
                    }
                    className="group h-20 w-32 rounded-lg border border-line bg-panel transition hover:rotate-2 hover:scale-105 hover:border-emerald md:justify-self-end"
                    aria-label={localize(cert.course, lang)}
                  >
                    <div className="flex h-full items-center justify-center font-mono text-[0.6rem] uppercase tracking-wider text-muted">
                      {cert.institution}
                    </div>
                  </button>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>

      <Lightbox
        open={!!lightbox}
        src={lightbox?.src}
        alt={lightbox?.alt ?? ""}
        onClose={() => setLightbox(null)}
      />
    </section>
  );
}
