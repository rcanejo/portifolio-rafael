"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";
import type { ReactNode } from "react";
import { cardHoverMotion as m } from "@/lib/motion/card-hover";

interface HoverCardProps {
  children: ReactNode;
  className?: string;
}

export function HoverCard({ children, className }: HoverCardProps) {
  const reduced = useReducedMotion();
  const spring = { ...m.spring };

  const rotateX = useSpring(useMotionValue(0), spring);
  const rotateY = useSpring(useMotionValue(0), spring);
  const lift = useSpring(useMotionValue(0), spring);
  const scale = useSpring(useMotionValue(1), spring);

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    if (reduced) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    rotateX.set((0.5 - py) * (m.tiltDegrees * 0.65));
    rotateY.set((px - 0.5) * (m.tiltDegrees * 0.65));
  }

  function onEnter() {
    if (!reduced) {
      lift.set(m.lift * 0.75);
      scale.set(1.015);
    }
  }

  function onLeave() {
    rotateX.set(0);
    rotateY.set(0);
    lift.set(0);
    scale.set(1);
  }

  if (reduced) {
    return (
      <div className={`transition duration-200 hover:-translate-y-1 ${className ?? ""}`}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      className={className}
      onMouseMove={onMove}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      style={{
        perspective: m.perspective,
        rotateX,
        rotateY,
        y: lift,
        scale,
        transformStyle: "preserve-3d",
      }}
    >
      {children}
    </motion.div>
  );
}
