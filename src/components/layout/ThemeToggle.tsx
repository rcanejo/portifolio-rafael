"use client";

import {
  motion,
  useReducedMotion,
  type Transition,
} from "motion/react";
import type { Dictionary } from "@/content/types";
import { themeToggleMotion as m } from "@/lib/motion/theme-toggle";
import { useTheme } from "./ThemeProvider";

interface ThemeToggleProps {
  dict: Dictionary;
  className?: string;
}

const STARS = [
  { x: 10, y: 8, s: 3.2 },
  { x: 22, y: 18, s: 2.2 },
  { x: 14, y: 26, s: 1.6 },
  { x: 28, y: 7, s: 2.0 },
  { x: 8, y: 16, s: 1.4 },
  { x: 32, y: 22, s: 1.8 },
] as const;

function Sparkle({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 12 12" fill="white" aria-hidden>
      <path d="M6 0 L7.2 4.8 L12 6 L7.2 7.2 L6 12 L4.8 7.2 L0 6 L4.8 4.8 Z" />
    </svg>
  );
}

export function ThemeToggle({ dict, className }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();
  const reduced = useReducedMotion();
  const isDark = theme === "dark";

  const travel = m.width - m.knob - m.pad * 2;
  const knobX = isDark ? travel : 0;

  const spring: Transition = reduced
    ? { duration: 0 }
    : { type: "spring", ...m.spring };

  const fade = reduced
    ? { duration: 0 }
    : { duration: m.fadeDuration, ease: [0.4, 0, 0.2, 1] as const };

  function toggle() {
    setTheme(isDark ? "light" : "dark");
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className={`pill-toggle theme-toggle relative overflow-hidden rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald focus-visible:ring-offset-2 focus-visible:ring-offset-ink ${className ?? ""}`}
      style={{ width: m.width, height: m.height }}
      aria-label={dict.theme.toggle}
      aria-pressed={isDark}
      title={isDark ? dict.theme.dark : dict.theme.light}
    >
      {/* Céu — cor base */}
      <motion.div
        className="absolute inset-0"
        animate={{
          backgroundColor: isDark ? "#1a2340" : "#5dade2",
        }}
        transition={fade}
      />

      {/* Anéis atmosféricos (concentric glow) — seguem o knob com parallax */}
      <motion.div
        className="pointer-events-none absolute top-1/2 -translate-y-1/2"
        style={{ width: m.height * 2.8, height: m.height * 2.8 }}
        animate={{
          x: m.pad + knobX + m.knob / 2 - (m.height * 2.8) / 2,
          opacity: 1,
        }}
        transition={spring}
        aria-hidden
      >
        <motion.div
          className="absolute inset-0 rounded-full"
          animate={{
            background: isDark
              ? "radial-gradient(circle, #4a5568 0%, #2d3748 35%, #1a2340 65%, transparent 70%)"
              : "radial-gradient(circle, #85c1e9 0%, #5dade2 30%, #3498db 55%, transparent 70%)",
          }}
          transition={fade}
          style={{ opacity: 0.9 }}
        />
        <motion.div
          className="absolute inset-[18%] rounded-full"
          animate={{
            backgroundColor: isDark ? "#5a6a7a" : "#7ec8e8",
          }}
          transition={fade}
          style={{ opacity: 0.55 }}
        />
        <motion.div
          className="absolute inset-[36%] rounded-full"
          animate={{
            backgroundColor: isDark ? "#7a8a9a" : "#a8d8ef",
          }}
          transition={fade}
          style={{ opacity: 0.4 }}
        />
      </motion.div>

      {/* Estrelas (noite) */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        animate={{ opacity: isDark ? 1 : 0 }}
        transition={fade}
        aria-hidden
      >
        {STARS.map((star, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{ left: star.x, top: star.y }}
            animate={{
              x: isDark ? 0 : -12 * m.parallax,
              scale: isDark ? 1 : 0.4,
            }}
            transition={spring}
          >
            {star.s >= 2 ? (
              <Sparkle size={star.s * 2.2} />
            ) : (
              <span
                className="block rounded-full bg-white"
                style={{ width: star.s, height: star.s }}
              />
            )}
          </motion.div>
        ))}
      </motion.div>

      {/* Nuvens de trás (atrás do knob) */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        animate={{
          opacity: isDark ? 0.15 : 1,
          x: isDark ? 10 * m.parallax : 0,
        }}
        transition={spring}
        aria-hidden
      >
        <span
          className="absolute rounded-full bg-white/90"
          style={{ width: 22, height: 14, right: 6, bottom: 2 }}
        />
        <span
          className="absolute rounded-full bg-[#c5e4f5]"
          style={{ width: 16, height: 11, right: 20, bottom: 0 }}
        />
        <span
          className="absolute rounded-full bg-white/80"
          style={{ width: 14, height: 10, right: -2, bottom: 6 }}
        />
      </motion.div>

      {/* Knob: sol + lua sobrepostos (morph por opacidade/deslocamento) */}
      <motion.div
        className="absolute top-1/2 z-10 -translate-y-1/2"
        style={{ width: m.knob, height: m.knob, left: m.pad }}
        animate={{ x: knobX }}
        transition={spring}
      >
        {/* Sol */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "radial-gradient(circle at 35% 30%, #ffe566 0%, #ffd000 45%, #f5b800 100%)",
            boxShadow:
              "0 2px 6px rgba(0,0,0,0.25), inset 0 1px 2px rgba(255,255,255,0.5)",
          }}
          animate={{
            opacity: isDark ? 0 : 1,
            scale: isDark ? 0.85 : 1,
            x: isDark ? -4 : 0,
          }}
          transition={spring}
        />

        {/* Lua */}
        <motion.div
          className="absolute inset-0 overflow-hidden rounded-full"
          style={{
            background:
              "radial-gradient(circle at 35% 30%, #f0f0f0 0%, #d8d8d8 55%, #c0c0c0 100%)",
            boxShadow:
              "0 2px 6px rgba(0,0,0,0.3), inset 0 1px 2px rgba(255,255,255,0.6)",
          }}
          animate={{
            opacity: isDark ? 1 : 0,
            scale: isDark ? 1 : 0.85,
            x: isDark ? 0 : 4,
          }}
          transition={spring}
        >
          {/* Craters */}
          <span
            className="absolute rounded-full"
            style={{
              width: 7,
              height: 7,
              top: 7,
              left: 8,
              background: "#b0b0b0",
              boxShadow: "inset 1px 1px 2px rgba(0,0,0,0.25)",
            }}
          />
          <span
            className="absolute rounded-full"
            style={{
              width: 5,
              height: 5,
              top: 15,
              left: 16,
              background: "#b8b8b8",
              boxShadow: "inset 1px 1px 1px rgba(0,0,0,0.2)",
            }}
          />
          <span
            className="absolute rounded-full"
            style={{
              width: 4,
              height: 4,
              top: 10,
              left: 18,
              background: "#ababab",
              boxShadow: "inset 0.5px 0.5px 1px rgba(0,0,0,0.2)",
            }}
          />
          {/* Rim light amarelo (eco do sol) */}
          <span
            className="pointer-events-none absolute inset-0 rounded-full"
            style={{
              boxShadow: "inset -2px 0 0 0 rgba(255, 200, 0, 0.35)",
            }}
          />
        </motion.div>
      </motion.div>

      {/* Nuvens da frente (na frente do knob — profundidade 3D) */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-20"
        animate={{
          opacity: isDark ? 0 : 1,
          x: isDark ? 14 * m.parallax : 0,
        }}
        transition={spring}
        aria-hidden
      >
        <span
          className="absolute rounded-full bg-white"
          style={{ width: 18, height: 12, right: 4, bottom: -2 }}
        />
        <span
          className="absolute rounded-full bg-[#d6ebf5]"
          style={{ width: 12, height: 9, right: 16, bottom: -1 }}
        />
      </motion.div>
    </button>
  );
}
