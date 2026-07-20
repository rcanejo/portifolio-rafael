"use client";

import Image from "next/image";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";
import { plaqueMotion as m } from "@/lib/motion/plaque";

interface Plaque3DProps {
  badge: string;
  institution: string;
}

export function Plaque3D({ badge, institution }: Plaque3DProps) {
  const reduced = useReducedMotion();
  const spring = { ...m.spring };

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const smoothX = useSpring(mouseX, spring);
  const smoothY = useSpring(mouseY, spring);

  const rotateX = useSpring(useMotionValue(0), spring);
  const rotateY = useSpring(useMotionValue(0), spring);

  const specularX = useTransform(smoothX, (v) => `${v * 100}%`);
  const specularY = useTransform(smoothY, (v) => `${v * 100}%`);
  const specularBg = useMotionTemplate`radial-gradient(ellipse 120px 180px at ${specularX} ${specularY}, rgba(255,255,255,${m.specularOpacity}), transparent 70%)`;

  function onMove(e: React.MouseEvent<HTMLElement>) {
    if (reduced) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    mouseX.set(px);
    mouseY.set(py);
    rotateX.set((0.5 - py) * m.tiltDegrees);
    rotateY.set((px - 0.5) * m.tiltDegrees);
  }

  function onLeave() {
    mouseX.set(0.5);
    mouseY.set(0.5);
    rotateX.set(0);
    rotateY.set(0);
  }

  const scene = (
    <div
      className="relative mx-auto flex w-full max-w-[280px] flex-col items-center sm:max-w-[320px]"
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Placa */}
      <div
        className="relative aspect-[5/7] w-full"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Nébula (fundo) */}
        <div
          className="absolute inset-0 overflow-hidden rounded-[1.75rem]"
          style={{ transform: `translateZ(${m.layers.nebula}px)` }}
        >
          <Image
            src="/achievement/nebula.svg"
            alt=""
            fill
            className="object-cover"
            priority
            aria-hidden
          />
        </div>

        {/* Estrela em relevo */}
        <div
          className="absolute inset-x-[18%] top-[12%] aspect-square"
          style={{
            transform: `translateZ(${m.layers.star}px)`,
            filter: "drop-shadow(0 8px 24px rgba(147, 51, 234, 0.65))",
          }}
        >
          <Image
            src="/achievement/star.svg"
            alt=""
            fill
            className="object-contain"
            aria-hidden
          />
        </div>

        {/* Texto 5D */}
        <div
          className="absolute inset-x-0 bottom-[28%] flex justify-center"
          style={{
            transform: `translateZ(${m.layers.badge}px)`,
            filter: "drop-shadow(0 4px 12px rgba(255,255,255,0.35))",
          }}
        >
          <span className="font-display text-[clamp(3.5rem,14vw,4.5rem)] font-bold leading-none tracking-tight text-white">
            {badge}
          </span>
        </div>

        {/* Marca ibe.IA */}
        <div
          className="absolute inset-x-0 bottom-[14%] flex items-center justify-center gap-1.5"
          style={{ transform: `translateZ(${m.layers.brand}px)` }}
        >
          <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 text-white/90" aria-hidden>
            <path
              fill="currentColor"
              d="M8 1.5l1.2 3.7h3.8L10.4 7.8l1.2 3.7L8 9.2l-3.6 2.3 1.2-3.7L2.9 5.2h3.8z"
            />
          </svg>
          <span className="font-mono text-xs tracking-wide text-white/90">
            {institution}
          </span>
        </div>

        {/* Borda acrílica / LED */}
        <div
          className="pointer-events-none absolute inset-0 rounded-[1.75rem] border-2 border-violet-400/70"
          style={{
            transform: `translateZ(${m.layers.acrylic}px)`,
            boxShadow:
              "inset 0 0 30px rgba(139,92,246,0.35), 0 0 40px rgba(124,58,237,0.45), 0 0 80px rgba(59,130,246,0.2)",
          }}
          aria-hidden
        />

        {/* Brilho especular */}
        {!reduced && (
          <motion.div
            className="pointer-events-none absolute inset-0 rounded-[1.75rem] mix-blend-overlay"
            style={{ background: specularBg, transform: `translateZ(${m.layers.acrylic + 2}px)` }}
            aria-hidden
          />
        )}
      </div>

      {/* Base cilíndrica */}
      <div
        className="relative -mt-2 h-10 w-[72%] rounded-b-full bg-gradient-to-b from-zinc-100 to-zinc-300 shadow-lg"
        style={{
          transform: "translateZ(-8px)",
          boxShadow: "0 12px 40px rgba(124,58,237,0.35), 0 4px 12px rgba(0,0,0,0.25)",
        }}
      >
        <div className="absolute inset-x-0 top-0 h-3 rounded-b-full bg-white/90" />
        <div className="absolute inset-x-[42%] top-2 h-4 w-4 rounded-full border border-zinc-300/80 bg-white/60" aria-hidden />
        {!reduced && (
          <motion.div
            className="absolute -inset-x-4 -top-6 h-8 rounded-full bg-violet-500/40 blur-xl"
            animate={{
              opacity: [m.ledPulse.minOpacity, m.ledPulse.maxOpacity, m.ledPulse.minOpacity],
            }}
            transition={{
              duration: m.ledPulse.duration,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            aria-hidden
          />
        )}
      </div>

      {/* Reflexo no chão */}
      <div
        className="mt-4 h-6 w-[60%] rounded-full bg-violet-500/20 blur-xl"
        style={{ transform: "translateZ(-20px) rotateX(90deg)" }}
        aria-hidden
      />
    </div>
  );

  if (reduced) {
    return (
      <div className="flex justify-center py-8" aria-label={`Placa ${badge} ${institution}`}>
        {scene}
      </div>
    );
  }

  return (
    <div
      className="flex min-h-[min(480px,65vh)] w-full items-center justify-center py-8"
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      aria-label={`Placa ${badge} ${institution}`}
    >
      <motion.div
        style={{
          perspective: m.perspective,
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
      >
        {scene}
      </motion.div>
    </div>
  );
}
