"use client";

import {
  motion,
  useReducedMotion,
  type Transition,
} from "motion/react";
import { startTransition, useOptimistic } from "react";
import { usePathname, useRouter } from "next/navigation";
import type { Dictionary, Locale } from "@/content/types";
import { langToggleMotion as m } from "@/lib/motion/lang-toggle";

interface LangSwitcherProps {
  lang: Locale;
  dict: Dictionary;
  className?: string;
}

function Sparkle({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 12 12" fill="white" aria-hidden>
      <path d="M6 0 L7.2 4.8 L12 6 L7.2 7.2 L6 12 L4.8 7.2 L0 6 L4.8 4.8 Z" />
    </svg>
  );
}

/** Círculo neutro — sem bandeira (já existe no fundo do track) */
function NeutralKnob() {
  return (
    <div
      className="absolute inset-0 rounded-full"
      style={{
        background:
          "radial-gradient(circle at 32% 28%, #ffffff 0%, #ececec 52%, #d2d2d2 100%)",
        boxShadow:
          "0 2px 5px rgba(0,0,0,0.28), inset 0 1px 1px rgba(255,255,255,0.95)",
      }}
    />
  );
}

/** Sigla PT com cores da bandeira brasileira nas letras */
function PtLabel() {
  return (
    <span className="absolute inset-0 flex items-center justify-center font-mono text-[11px] font-bold leading-none tracking-tight select-none">
      <span
        style={{
          color: "#009c3b",
          textShadow: "0 0.5px 0 rgba(0,39,118,0.2)",
        }}
      >
        P
      </span>
      <span
        style={{
          color: "#ffdf00",
          WebkitTextStroke: "0.35px #002776",
          paintOrder: "stroke fill",
        }}
      >
        T
      </span>
    </span>
  );
}

/** Sigla EN com cores da bandeira dos EUA nas letras */
function EnLabel() {
  return (
    <span className="absolute inset-0 flex items-center justify-center font-mono text-[11px] font-bold leading-none tracking-tight select-none">
      <span style={{ color: "#b22234" }}>E</span>
      <span style={{ color: "#3c3b6e" }}>N</span>
    </span>
  );
}

export function LangSwitcher({ lang, dict, className }: LangSwitcherProps) {
  const pathname = usePathname();
  const router = useRouter();
  const reduced = useReducedMotion();
  const [optimisticLang, setOptimisticLang] = useOptimistic(
    lang,
    (_current, next: Locale) => next,
  );
  const visualEn = optimisticLang === "en";
  const isEn = lang === "en";

  const travel = m.width - m.knob - m.pad * 2;
  const knobX = visualEn ? travel : 0;

  const spring: Transition = reduced
    ? { duration: 0 }
    : { type: "spring", ...m.spring };

  const fade = reduced
    ? { duration: 0 }
    : { duration: m.fadeDuration, ease: [0.4, 0, 0.2, 1] as const };

  function toggle() {
    const target: Locale = isEn ? "pt" : "en";
    const segments = pathname.split("/");
    segments[1] = target;
    startTransition(() => {
      setOptimisticLang(target);
      router.push(segments.join("/") || `/${target}`);
    });
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className={`pill-toggle relative overflow-hidden rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald focus-visible:ring-offset-2 focus-visible:ring-offset-ink ${className ?? ""}`}
      style={{ width: m.width, height: m.height }}
      aria-label={dict.lang.toggle}
      aria-pressed={isEn}
      title={isEn ? dict.lang.en : dict.lang.pt}
    >
      {/* Fundo — verde Brasil ↔ azul EUA */}
      <motion.div
        className="absolute inset-0"
        animate={{
          backgroundColor: visualEn ? "#3c3b6e" : "#009c3b",
        }}
        transition={fade}
      />

      {/* Camada decorativa BR: losango amarelo + círculo azul */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        animate={{ opacity: visualEn ? 0 : 1, x: visualEn ? -8 * m.parallax : 0 }}
        transition={spring}
        aria-hidden
      >
        <span
          className="absolute left-1/2 top-1/2 block"
          style={{
            width: 48,
            height: 28,
            background: "#ffdf00",
            transform: "translate(-50%, -50%)",
            clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
            opacity: 0.85,
          }}
        />
        <span
          className="absolute left-1/2 top-1/2 block rounded-full"
          style={{
            width: 18,
            height: 18,
            background: "#002776",
            transform: "translate(-50%, -50%)",
          }}
        />
        {[
          [46, 42],
          [54, 48],
          [48, 56],
          [52, 40],
        ].map(([x, y], i) => (
          <span
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: 1.5,
              height: 1.5,
              left: `${x}%`,
              top: `${y}%`,
            }}
          />
        ))}
      </motion.div>

      {/* Camada decorativa US: listras + cantão */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        animate={{ opacity: visualEn ? 1 : 0, x: visualEn ? 0 : 8 * m.parallax }}
        transition={spring}
        aria-hidden
      >
        <div className="absolute inset-0 flex flex-col">
          {Array.from({ length: 7 }).map((_, i) => (
            <span
              key={i}
              className="flex-1"
              style={{
                background: i % 2 === 0 ? "#b22234" : "rgba(255,255,255,0.85)",
              }}
            />
          ))}
        </div>
        <div
          className="absolute left-0 top-0"
          style={{ width: "42%", height: "58%", background: "#3c3b6e" }}
        >
          {[
            [20, 25],
            [45, 25],
            [70, 25],
            [32, 50],
            [58, 50],
            [20, 75],
            [45, 75],
            [70, 75],
          ].map(([x, y], i) => (
            <span
              key={i}
              className="absolute"
              style={{ left: `${x}%`, top: `${y}%`, transform: "translate(-50%, -50%)" }}
            >
              <Sparkle size={i % 3 === 0 ? 5 : 3.5} />
            </span>
          ))}
        </div>
      </motion.div>

      {/* Anéis de brilho seguindo o knob */}
      <motion.div
        className="pointer-events-none absolute top-1/2 -translate-y-1/2"
        style={{ width: m.height * 2.4, height: m.height * 2.4 }}
        animate={{
          x: m.pad + knobX + m.knob / 2 - (m.height * 2.4) / 2,
        }}
        transition={spring}
        aria-hidden
      >
        <motion.div
          className="absolute inset-0 rounded-full"
          animate={{
            background: visualEn
              ? "radial-gradient(circle, rgba(178,34,52,0.35) 0%, transparent 65%)"
              : "radial-gradient(circle, rgba(255,223,0,0.4) 0%, transparent 65%)",
          }}
          transition={fade}
        />
      </motion.div>

      {/* Knob neutro + siglas PT/EN */}
      <motion.div
        className="absolute top-1/2 z-10 -translate-y-1/2"
        style={{ width: m.knob, height: m.knob, left: m.pad }}
        animate={{ x: knobX }}
        transition={spring}
      >
        <NeutralKnob />

        <motion.div
          className="absolute inset-0"
          animate={{
            opacity: visualEn ? 0 : 1,
            scale: visualEn ? 0.88 : 1,
            x: visualEn ? -3 : 0,
          }}
          transition={spring}
          aria-hidden
        >
          <PtLabel />
        </motion.div>

        <motion.div
          className="absolute inset-0"
          animate={{
            opacity: visualEn ? 1 : 0,
            scale: visualEn ? 1 : 0.88,
            x: visualEn ? 0 : 3,
          }}
          transition={spring}
          aria-hidden
        >
          <EnLabel />
        </motion.div>
      </motion.div>
    </button>
  );
}
