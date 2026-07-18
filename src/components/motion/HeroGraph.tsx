"use client";

import { motion, useReducedMotion } from "motion/react";
import { useCallback, useMemo, useRef, useState } from "react";

const NODES = [
  { id: "a", cx: 120, cy: 200, r: 14 },
  { id: "b", cx: 260, cy: 120, r: 12 },
  { id: "c", cx: 260, cy: 280, r: 12 },
  { id: "d", cx: 400, cy: 200, r: 16, coral: true },
  { id: "e", cx: 500, cy: 100, r: 11 },
  { id: "f", cx: 500, cy: 300, r: 11 },
  { id: "g", cx: 560, cy: 200, r: 13 },
];

const EDGES = [
  { from: "a", to: "b", d: "M120,200 C180,200 200,120 260,120" },
  { from: "a", to: "c", d: "M120,200 C180,200 200,280 260,280" },
  { from: "b", to: "d", d: "M260,120 C320,120 340,200 400,200" },
  { from: "c", to: "d", d: "M260,280 C320,280 340,200 400,200" },
  { from: "d", to: "e", d: "M400,200 C440,200 460,100 500,100" },
  { from: "d", to: "f", d: "M400,200 C440,200 460,300 500,300" },
  { from: "e", to: "g", d: "M500,100 C530,100 540,200 560,200" },
  { from: "f", to: "g", d: "M500,300 C530,300 540,200 560,200" },
];

interface HeroGraphProps {
  interactive?: boolean;
  className?: string;
}

export function HeroGraph({ interactive = false, className }: HeroGraphProps) {
  const reduced = useReducedMotion();
  const svgRef = useRef<SVGSVGElement>(null);
  const [mouse, setMouse] = useState({ x: 300, y: 200 });
  const [offsets, setOffsets] = useState<Record<string, { x: number; y: number }>>({});

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<SVGSVGElement>) => {
      if (!interactive || reduced) return;
      const rect = svgRef.current?.getBoundingClientRect();
      if (!rect) return;
      const x = ((e.clientX - rect.left) / rect.width) * 600;
      const y = ((e.clientY - rect.top) / rect.height) * 400;
      setMouse({ x, y });

      const next: Record<string, { x: number; y: number }> = {};
      for (const node of NODES) {
        const dx = node.cx - x;
        const dy = node.cy - y;
        const dist = Math.hypot(dx, dy);
        if (dist < 120) {
          const force = (120 - dist) / 120;
          next[node.id] = { x: (dx / dist) * force * 18, y: (dy / dist) * force * 18 };
        } else {
          next[node.id] = { x: 0, y: 0 };
        }
      }
      setOffsets(next);
    },
    [interactive, reduced],
  );

  const edgePaths = useMemo(() => EDGES, []);

  if (reduced) {
    return (
      <svg viewBox="0 0 600 400" className={className} aria-hidden>
        {edgePaths.map((edge) => (
          <path key={edge.d} d={edge.d} fill="none" stroke="#34D399" strokeWidth={1.5} opacity={0.6} />
        ))}
        {NODES.map((node) => (
          <circle
            key={node.id}
            cx={node.cx}
            cy={node.cy}
            r={node.r}
            fill={node.coral ? "#FF6B6B" : "none"}
            stroke={node.coral ? "#FF6B6B" : "#34D399"}
            strokeWidth={2}
          />
        ))}
      </svg>
    );
  }

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 600 400"
      className={className}
      aria-hidden
      onMouseMove={handleMouseMove}
    >
      <defs>
        <radialGradient id="hero-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(52, 211, 153, 0.25)" />
          <stop offset="100%" stopColor="rgba(52, 211, 153, 0)" />
        </radialGradient>
      </defs>
      <ellipse cx="340" cy="200" rx="220" ry="160" fill="url(#hero-glow)" />

      {edgePaths.map((edge, i) => (
        <motion.path
          key={edge.d}
          d={edge.d}
          fill="none"
          stroke="#34D399"
          strokeWidth={1.5}
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.7 }}
          transition={{ duration: 1.2, delay: 0.2 + i * 0.12, ease: "easeOut" }}
        />
      ))}

      {edgePaths.map((edge, i) => (
        <circle key={`pulse-${edge.d}`} r={3} fill="#34D399">
          <animateMotion
            dur={`${3 + (i % 3)}s`}
            repeatCount="indefinite"
            path={edge.d}
            begin={`${i * 0.4}s`}
          />
        </circle>
      ))}

      {NODES.map((node, i) => {
        const off = offsets[node.id] ?? { x: 0, y: 0 };
        const cx = node.cx + off.x;
        const cy = node.cy + off.y;

        return (
          <motion.g
            key={node.id}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 18,
              delay: 0.5 + i * 0.08,
            }}
          >
            <circle
              cx={cx}
              cy={cy}
              r={node.r}
              fill={node.coral ? "#FF6B6B" : "none"}
              stroke={node.coral ? "#FF6B6B" : "#34D399"}
              strokeWidth={2}
            >
              {node.coral && (
                <animate
                  attributeName="opacity"
                  values="1;0.5;1"
                  dur="5s"
                  repeatCount="indefinite"
                />
              )}
            </circle>
          </motion.g>
        );
      })}

      {interactive && !reduced && (
        <circle cx={mouse.x} cy={mouse.y} r={80} fill="rgba(52,211,153,0.04)" />
      )}
    </svg>
  );
}
