"use client";

import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { ToolIcon } from "@/components/sections/ToolIcon";
import type { Dictionary, Tool } from "@/content/types";
import { toolsGridMotion as m } from "@/lib/motion/tools-grid";

interface ToolsGridProps {
  dict: Dictionary;
  tools: Tool[];
}

interface ToolPillProps {
  tool: Tool;
  pillKey: string;
  hovered: boolean;
  onHover: (key: string | null) => void;
}

function ToolPill({ tool, pillKey, hovered, onHover }: ToolPillProps) {
  return (
    <motion.div
      className={`relative flex shrink-0 items-center gap-3 rounded-xl border px-4 py-3.5 transition-colors duration-300 ${
        hovered
          ? "border-emerald/30 bg-fg text-ink shadow-[0_0_28px_rgba(52,211,153,0.25)]"
          : "border-line/80 bg-panel/60 text-fg backdrop-blur-sm"
      }`}
      animate={{ scale: hovered ? m.activeScale : 1 }}
      transition={{ type: "spring", ...m.spring }}
      onMouseEnter={() => onHover(pillKey)}
      onMouseLeave={() => onHover(null)}
    >
      <span className="relative z-10 shrink-0">
        <ToolIcon id={tool.icon} colored={hovered} className="h-5 w-5" />
      </span>
      <span
        className={`relative z-10 whitespace-nowrap font-mono text-sm tracking-wide ${
          hovered ? "font-medium" : "text-fg/90"
        }`}
      >
        {tool.name}
      </span>
    </motion.div>
  );
}

interface MarqueeRowProps {
  tools: Tool[];
  rowId: string;
  reverse?: boolean;
  duration: number;
  staticLayout?: boolean;
  hoveredKey: string | null;
  onHover: (key: string | null) => void;
}

function MarqueeRow({
  tools,
  rowId,
  reverse = false,
  duration,
  staticLayout = false,
  hoveredKey,
  onHover,
}: MarqueeRowProps) {
  const items = staticLayout ? tools : [...tools, ...tools];

  return (
    <div
      className="overflow-hidden py-2"
      style={{
        maskImage:
          "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
      }}
      onMouseLeave={() => onHover(null)}
    >
      <div
        className={`flex w-max gap-3 ${staticLayout ? "flex-wrap justify-center px-6" : reverse ? "marquee-track-reverse" : "marquee-track"}`}
        style={
          staticLayout
            ? undefined
            : { animationDuration: `${duration}s` }
        }
      >
        {items.map((tool, i) => {
          const pillKey = `${rowId}-${tool.name}-${i}`;
          return (
            <ToolPill
              key={pillKey}
              tool={tool}
              pillKey={pillKey}
              hovered={hoveredKey === pillKey}
              onHover={onHover}
            />
          );
        })}
      </div>
    </div>
  );
}

export function ToolsGrid({ dict, tools }: ToolsGridProps) {
  const reduced = useReducedMotion();
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);

  const midpoint = Math.ceil(tools.length / 2);
  const row1 = tools.slice(0, midpoint);
  const row2 = tools.slice(midpoint);

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
      </div>

      <div className="relative mt-16 w-full space-y-3">
        <div
          className="pointer-events-none absolute inset-0 -z-10 grid-bg opacity-40"
          aria-hidden
        />
        <MarqueeRow
          tools={row1}
          rowId="r1"
          duration={m.marqueeDurationRow1}
          staticLayout={!!reduced}
          hoveredKey={hoveredKey}
          onHover={setHoveredKey}
        />
        <MarqueeRow
          tools={row2.length > 0 ? row2 : row1}
          rowId="r2"
          reverse
          duration={m.marqueeDurationRow2}
          staticLayout={!!reduced}
          hoveredKey={hoveredKey}
          onHover={setHoveredKey}
        />
      </div>
    </section>
  );
}
