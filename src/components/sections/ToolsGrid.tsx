"use client";

import { motion, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { ToolIcon } from "@/components/sections/ToolIcon";
import type { Dictionary, Tool } from "@/content/types";
import { toolsGridMotion as m } from "@/lib/motion/tools-grid";

interface ToolsGridProps {
  dict: Dictionary;
  tools: Tool[];
}

export function ToolsGrid({ dict, tools }: ToolsGridProps) {
  const reduced = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [paused, setPaused] = useState(false);

  const highlighted = hoverIndex ?? activeIndex;

  const advance = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % tools.length);
  }, [tools.length]);

  useEffect(() => {
    if (reduced || paused) return;
    const id = window.setInterval(advance, m.cycleInterval);
    return () => window.clearInterval(id);
  }, [advance, paused, reduced]);

  return (
    <section id="ferramentas" className="scroll-mt-24 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-emerald">
            {dict.tools.label}
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-display mt-4 text-[clamp(2rem,5vw,3.5rem)] font-bold tracking-tight">
            {dict.tools.title}
          </h2>
        </Reveal>

        <div className="relative mt-16">
          <div
            className="pointer-events-none absolute inset-0 -z-10 grid-bg opacity-40"
            aria-hidden
          />
          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {tools.map((tool, i) => {
              const isActive = highlighted === i;

              return (
                <Reveal key={tool.name} delay={i * m.stagger}>
                  <li>
                    <motion.div
                      className={`group relative flex items-center gap-3 rounded-xl border px-4 py-3.5 transition-colors duration-300 ${
                        isActive
                          ? "border-emerald/30 bg-fg text-ink shadow-[0_0_28px_rgba(52,211,153,0.25)]"
                          : "border-line/80 bg-panel/60 text-fg backdrop-blur-sm hover:border-line"
                      }`}
                      animate={{
                        scale: isActive ? m.activeScale : 1,
                      }}
                      transition={{ type: "spring", ...m.spring }}
                      onMouseEnter={() => {
                        setHoverIndex(i);
                        setPaused(true);
                      }}
                      onMouseLeave={() => {
                        setHoverIndex(null);
                        setPaused(false);
                      }}
                    >
                      {isActive && (
                        <motion.div
                          className="pointer-events-none absolute -inset-px rounded-xl bg-emerald/10"
                          layoutId="tool-highlight"
                          transition={{ type: "spring", ...m.spring }}
                          aria-hidden
                        />
                      )}
                      <span className="relative z-10 shrink-0">
                        <ToolIcon
                          id={tool.icon}
                          colored={isActive}
                          className="h-5 w-5"
                        />
                      </span>
                      <span
                        className={`relative z-10 font-mono text-sm tracking-wide ${
                          isActive ? "font-medium" : "text-fg/90"
                        }`}
                      >
                        {tool.name}
                      </span>
                    </motion.div>
                  </li>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
