"use client";

import { motion, useReducedMotion } from "motion/react";
import type { FlowKind, FlowStage, Locale } from "@/content/types";
import { localize } from "@/lib/content";

const POSITIONS: Record<string, { x: number; y: number; w: number; h: number }> = {
  cliente: { x: 16, y: 168, w: 88, h: 44 },
  zapi: { x: 120, y: 168, w: 88, h: 44 },
  buffer: { x: 224, y: 168, w: 88, h: 44 },
  pre: { x: 328, y: 168, w: 120, h: 44 },
  agente: { x: 468, y: 158, w: 96, h: 56 },
  memoria: { x: 468, y: 48, w: 120, h: 44 },
  kb: { x: 468, y: 318, w: 120, h: 44 },
  tools: { x: 620, y: 158, w: 120, h: 56 },
  resposta: { x: 776, y: 168, w: 120, h: 44 },
};

const EDGES: { from: string; to: string; d: string }[] = [
  {
    from: "cliente",
    to: "zapi",
    d: "M104,190 L120,190",
  },
  {
    from: "zapi",
    to: "buffer",
    d: "M208,190 L224,190",
  },
  {
    from: "buffer",
    to: "pre",
    d: "M312,190 L328,190",
  },
  {
    from: "pre",
    to: "agente",
    d: "M448,190 L468,186",
  },
  {
    from: "memoria",
    to: "agente",
    d: "M516,92 C516,120 516,140 516,158",
  },
  {
    from: "kb",
    to: "agente",
    d: "M516,318 C516,280 516,240 516,214",
  },
  {
    from: "agente",
    to: "tools",
    d: "M564,186 L620,186",
  },
  {
    from: "tools",
    to: "resposta",
    d: "M740,186 L776,190",
  },
];

function nodeStyle(kind: FlowKind) {
  switch (kind) {
    case "core":
      return {
        fill: "rgba(52,211,153,0.12)",
        stroke: "#34D399",
        strokeWidth: 2,
        strokeDasharray: undefined as string | undefined,
      };
    case "tool":
      return {
        fill: "none",
        stroke: "#FF6B6B",
        strokeWidth: 1.5,
        strokeDasharray: undefined,
      };
    case "data":
      return {
        fill: "none",
        stroke: "#34D399",
        strokeWidth: 1.5,
        strokeDasharray: "4 3",
      };
    default:
      return {
        fill: "none",
        stroke: "#34D399",
        strokeWidth: 1.5,
        strokeDasharray: undefined,
      };
  }
}

function FlowNode({
  stage,
  locale,
  reduced,
}: {
  stage: FlowStage;
  locale: Locale;
  reduced: boolean;
}) {
  const pos = POSITIONS[stage.id];
  if (!pos) return null;

  const style = nodeStyle(stage.kind);
  const label = localize(stage.label, locale);
  const fontSize = label.length > 22 ? 8 : 9;

  const rect = (
    <g>
      <rect
        x={pos.x}
        y={pos.y}
        width={pos.w}
        height={pos.h}
        rx={8}
        fill={style.fill}
        stroke={style.stroke}
        strokeWidth={style.strokeWidth}
        strokeDasharray={style.strokeDasharray}
      />
      <text
        x={pos.x + pos.w / 2}
        y={pos.y + pos.h / 2 + 3}
        textAnchor="middle"
        fill="#E8EEE9"
        fontSize={fontSize}
        fontFamily="var(--font-jetbrains, ui-monospace, monospace)"
      >
        {label.length > 28 ? `${label.slice(0, 26)}…` : label}
      </text>
    </g>
  );

  if (reduced) return rect;

  return (
    <motion.g
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.3 }}
    >
      {rect}
    </motion.g>
  );
}

interface ProjectFlowProps {
  stages: FlowStage[];
  locale: Locale;
  hint?: string;
}

export function ProjectFlow({ stages, locale, hint }: ProjectFlowProps) {
  const reduced = useReducedMotion();
  const stageMap = new Map(stages.map((s) => [s.id, s]));

  return (
    <div className="overflow-x-auto rounded-lg border border-line bg-panel/50 p-4">
      <svg
        viewBox="0 0 920 400"
        className="min-w-[720px] w-full"
        aria-label={hint}
        role="img"
      >
        <defs>
          <radialGradient id="flow-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(52,211,153,0.15)" />
            <stop offset="100%" stopColor="rgba(52,211,153,0)" />
          </radialGradient>
        </defs>
        <ellipse cx="516" cy="186" rx="180" ry="120" fill="url(#flow-glow)" />

        {EDGES.map((edge, i) => {
          const path = (
            <path
              key={edge.d}
              d={edge.d}
              fill="none"
              stroke="#34D399"
              strokeWidth={1.5}
              strokeLinecap="round"
              opacity={0.7}
            />
          );

          if (reduced) {
            return (
              <g key={edge.d}>
                {path}
                <circle r={3} fill="#34D399">
                  <animateMotion dur="4s" repeatCount="indefinite" path={edge.d} />
                </circle>
              </g>
            );
          }

          return (
            <g key={edge.d}>
              <motion.path
                d={edge.d}
                fill="none"
                stroke="#34D399"
                strokeWidth={1.5}
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.7 }}
                transition={{ duration: 0.8, delay: 0.1 + i * 0.08, ease: "easeOut" }}
              />
              <circle r={3} fill="#34D399">
                <animateMotion
                  dur={`${3 + (i % 3)}s`}
                  repeatCount="indefinite"
                  path={edge.d}
                  begin={`${i * 0.3}s`}
                />
              </circle>
            </g>
          );
        })}

        {stages.map((stage) =>
          stageMap.has(stage.id) ? (
            <FlowNode
              key={stage.id}
              stage={stage}
              locale={locale}
              reduced={!!reduced}
            />
          ) : null,
        )}
      </svg>

      {hint ? (
        <p className="mt-3 font-mono text-xs text-muted">{hint}</p>
      ) : null}

      <div className="mt-4 flex flex-wrap gap-4 font-mono text-[0.65rem] uppercase tracking-wider text-muted">
        <span className="flex items-center gap-2">
          <span className="inline-block h-2 w-4 rounded border border-emerald bg-emerald/20" />
          Core
        </span>
        <span className="flex items-center gap-2">
          <span className="inline-block h-2 w-4 rounded border border-dashed border-emerald" />
          Data
        </span>
        <span className="flex items-center gap-2">
          <span className="inline-block h-2 w-4 rounded border border-coral" />
          Tool
        </span>
      </div>
    </div>
  );
}
