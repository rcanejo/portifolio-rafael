"use client";

import { useReducedMotion } from "motion/react";
import { orchestratorMotion as m } from "@/lib/motion/orchestrator";

const NODES = [
  { cx: 50, cy: 18, label: "API" },
  { cx: 82, cy: 32, label: "CRM" },
  { cx: 88, cy: 58, label: "DB" },
  { cx: 72, cy: 82, label: "IA" },
  { cx: 28, cy: 82, label: "n8n" },
  { cx: 12, cy: 58, label: "Queue" },
  { cx: 18, cy: 32, label: "Webhook" },
];

const TRACKS = [
  "M50 38 L50 18",
  "M58 42 L82 32",
  "M62 52 L88 58",
  "M58 68 L72 82",
  "M42 68 L28 82",
  "M38 52 L12 58",
  "M42 42 L18 32",
  "M50 38 L58 42 L62 52 L58 68 L42 68 L38 52 L42 42 Z",
];

export function OrchestratorScene() {
  const reduced = useReducedMotion();

  return (
    <div
      className="relative flex aspect-[4/3] w-full items-center justify-center overflow-hidden rounded-lg border border-line bg-panel p-6"
      aria-hidden
    >
      <svg
        viewBox="0 0 100 100"
        className="h-full max-h-[320px] w-full"
        role="img"
        aria-label="Orquestrador conectando sistemas"
      >
        <defs>
          <radialGradient id="orch-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--color-emerald)" stopOpacity="0.25" />
            <stop offset="100%" stopColor="var(--color-emerald)" stopOpacity="0" />
          </radialGradient>
        </defs>

        <circle cx="50" cy="50" r="42" fill="url(#orch-glow)" />

        {TRACKS.map((d, i) => (
          <path
            key={d}
            d={d}
            fill="none"
            stroke="var(--color-emerald)"
            strokeOpacity={m.trackOpacity}
            strokeWidth="0.6"
            strokeDasharray={reduced ? undefined : `${m.dashLength} ${m.dashLength}`}
            className={reduced ? undefined : "orch-track"}
            style={
              reduced
                ? undefined
                : { animationDuration: `${m.pulseSpeed + i * 0.15}s` }
            }
          />
        ))}

        {NODES.map((node, i) => (
          <g key={node.label}>
            <circle
              cx={node.cx}
              cy={node.cy}
              r="3.2"
              fill="var(--color-panel)"
              stroke="var(--color-emerald)"
              strokeWidth="0.8"
              className={reduced ? undefined : "orch-node"}
              style={
                reduced
                  ? undefined
                  : {
                      animationDuration: `${m.nodeGlowDuration}s`,
                      animationDelay: `${i * (m.nodeGlowDuration / NODES.length)}s`,
                    }
              }
            />
            <text
              x={node.cx}
              y={node.cy - 5}
              textAnchor="middle"
              className="fill-muted font-mono text-[3px] uppercase tracking-wider"
            >
              {node.label}
            </text>
          </g>
        ))}

        <g transform="translate(50 52)">
          <ellipse cx="0" cy="8" rx="7" ry="2.5" fill="var(--color-emerald)" fillOpacity="0.12" />
          <circle cx="0" cy="-2" r="3.5" fill="var(--color-fg)" fillOpacity="0.9" />
          <rect x="-4" y="1" width="8" height="9" rx="2" fill="var(--color-fg)" fillOpacity="0.85" />
          <rect x="-6" y="3" width="3" height="7" rx="1.5" fill="var(--color-fg)" fillOpacity="0.7" />
          <rect x="3" y="3" width="3" height="7" rx="1.5" fill="var(--color-fg)" fillOpacity="0.7" />
          <rect x="-5" y="10" width="4" height="5" rx="1" fill="var(--color-fg)" fillOpacity="0.75" />
          <rect x="1" y="10" width="4" height="5" rx="1" fill="var(--color-fg)" fillOpacity="0.75" />
          <rect
            x="-8"
            y="-1"
            width="16"
            height="10"
            rx="1"
            fill="var(--color-ink)"
            stroke="var(--color-emerald)"
            strokeWidth="0.5"
          />
          <line
            x1="-6"
            y1="2"
            x2="6"
            y2="2"
            stroke="var(--color-emerald)"
            strokeWidth="0.4"
            strokeOpacity="0.6"
          />
          <line
            x1="-6"
            y1="4"
            x2="4"
            y2="4"
            stroke="var(--color-coral)"
            strokeWidth="0.4"
            strokeOpacity="0.5"
          />
        </g>

        {!reduced &&
          Array.from({ length: m.particleCount }).map((_, i) => (
            <circle key={`p-${i}`} r="0.6" fill="var(--color-coral)" fillOpacity="0.7">
              <animateMotion
                dur={`${m.pulseSpeed * 1.2 + i * 0.3}s`}
                repeatCount="indefinite"
                path={TRACKS[i % TRACKS.length]}
              />
            </circle>
          ))}
      </svg>
    </div>
  );
}
