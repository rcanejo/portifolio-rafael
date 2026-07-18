import Link from "next/link";
import { HeroGraph } from "@/components/motion/HeroGraph";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerTitle } from "@/components/motion/StaggerTitle";
import { TypeLabel } from "@/components/motion/TypeLabel";
import type { Dictionary } from "@/content/types";

interface HeroProps {
  dict: Dictionary;
}

export function Hero({ dict }: HeroProps) {
  return (
    <section className="relative flex min-h-screen items-center pt-24">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-5 lg:gap-8">
        <div className="lg:col-span-3">
          <TypeLabel
            text={dict.hero.label}
            className="font-mono text-xs uppercase tracking-[0.2em] text-emerald"
          />
          <StaggerTitle
            text={dict.hero.name}
            className="font-display mt-6 text-[clamp(3.5rem,9vw,7.5rem)] font-bold leading-[0.95] tracking-tight text-fg"
          />
          <Reveal delay={0.5}>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted">
              {dict.hero.subtitle}
            </p>
          </Reveal>
          <Reveal delay={0.65}>
            <Link
              href="#projetos"
              className="btn-sweep mt-10 inline-flex items-center gap-2 rounded-lg border border-emerald px-6 py-3 font-mono text-sm uppercase tracking-wider text-emerald transition hover:text-ink"
            >
              {dict.hero.cta}
              <span aria-hidden>→</span>
            </Link>
          </Reveal>
        </div>
        <div className="lg:col-span-2">
          <HeroGraph interactive className="h-auto w-full max-w-lg mx-auto lg:ml-auto" />
        </div>
      </div>
    </section>
  );
}
