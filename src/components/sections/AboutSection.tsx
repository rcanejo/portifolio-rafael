"use client";

import { useEffect, useRef } from "react";
import { Counter } from "@/components/motion/Counter";
import { Reveal } from "@/components/motion/Reveal";
import type { Dictionary, Locale, Stat } from "@/content/types";
import { localize } from "@/lib/content";

interface AboutSectionProps {
  lang: Locale;
  dict: Dictionary;
  stats: Stat[];
}

export function AboutSection({ lang, dict, stats }: AboutSectionProps) {
  const highlightRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = highlightRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.classList.add("is-visible");
      },
      { threshold: 0.5 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const parts = dict.about.p1.split(dict.about.ibeHighlight);

  return (
    <section id="sobre" className="scroll-mt-24 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-emerald">
            {dict.about.label}
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-display mt-4 text-[clamp(2rem,5vw,3.5rem)] font-bold tracking-tight">
            {dict.about.title}
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-16 lg:grid-cols-2">
          <div className="space-y-6 text-muted leading-relaxed">
            <Reveal delay={0.15}>
              <p>
                {parts[0]}
                <span ref={highlightRef} className="underline-emerald text-fg font-medium">
                  {dict.about.ibeHighlight}
                </span>
                {parts[1]}
              </p>
            </Reveal>
            <Reveal delay={0.25}>
              <p>{dict.about.p2}</p>
            </Reveal>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat, i) => (
              <Reveal key={stat.label.pt} delay={0.2 + i * 0.08}>
                <div className="rounded-lg border border-line bg-panel p-6">
                  <Counter
                    value={stat.value}
                    suffix={stat.suffix}
                    className="font-display text-4xl font-bold text-emerald md:text-5xl"
                  />
                  <p className="mt-2 font-mono text-xs uppercase tracking-wider text-muted">
                    {localize(stat.label, lang)}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
