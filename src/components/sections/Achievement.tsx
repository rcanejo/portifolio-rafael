import { Plaque3D } from "@/components/motion/Plaque3D";
import { Reveal } from "@/components/motion/Reveal";
import type { Achievement, Dictionary, Locale } from "@/content/types";
import { localize } from "@/lib/content";

interface AchievementSectionProps {
  lang: Locale;
  dict: Dictionary;
  achievement: Achievement;
}

export function AchievementSection({
  lang,
  dict,
  achievement,
}: AchievementSectionProps) {
  return (
    <section id="conquista" className="scroll-mt-24 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-emerald">
            {dict.achievement.label}
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-display mt-4 text-[clamp(2rem,5vw,3.5rem)] font-bold tracking-tight">
            {dict.achievement.title}
          </h2>
        </Reveal>

        <div className="mt-16 grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal delay={0.15}>
            <div>
              <h3 className="font-display text-2xl font-semibold">
                {localize(achievement.title, lang)}
              </h3>
              <p className="mt-2 font-mono text-sm text-emerald">
                {localize(achievement.subtitle, lang)}
              </p>
              <p className="mt-6 text-sm font-medium uppercase tracking-wider text-muted">
                {dict.achievement.contextLabel}
              </p>
              <p className="mt-3 max-w-prose leading-relaxed text-fg/90">
                {localize(achievement.context, lang)}
              </p>
              <p className="mt-4 max-w-prose leading-relaxed text-muted">
                {localize(achievement.story, lang)}
              </p>
            </div>
          </Reveal>

          <div className="min-h-[420px] lg:min-h-[520px]">
            <Plaque3D
              badge={achievement.badge}
              institution={achievement.institution}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
