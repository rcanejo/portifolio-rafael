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
  const lift = useSpring(useMotionValue(0), spring);

  const specularX = useTransform(smoothX, (v) => `${v * 100}%`);
  const specularY = useTransform(smoothY, (v) => `${v * 100}%`);
  const specularBg = useMotionTemplate`radial-gradient(ellipse 140px 200px at ${specularX} ${specularY}, rgba(255,255,255,${m.specularOpacity}), transparent 65%)`;

  function handleMove(e: React.MouseEvent<HTMLElement>) {
    if (reduced) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    mouseX.set(px);
    mouseY.set(py);
    rotateX.set((0.5 - py) * m.tiltDegrees);
    rotateY.set((px - 0.5) * m.tiltDegrees);
    lift.set(m.lift);
  }

  function handleLeave() {
    mouseX.set(0.5);
    mouseY.set(0.5);
    rotateX.set(0);
    rotateY.set(0);
    lift.set(0);
  }

  const label = `Placa ${badge} ${institution}`;

  const plaque = (
    <div className="relative mx-auto w-full max-w-[320px] sm:max-w-[360px]">
      {!reduced && (
        <motion.div
          className="pointer-events-none absolute -inset-8 rounded-full bg-violet-600/30 blur-3xl"
          animate={{
            opacity: [m.ledPulse.minOpacity, m.ledPulse.maxOpacity, m.ledPulse.minOpacity],
            scale: [0.95, 1.05, 0.95],
          }}
          transition={{
            duration: m.ledPulse.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          aria-hidden
        />
      )}

      <div
        className="relative w-full rounded-[1.75rem] p-[5px]"
        style={{
          background:
            "linear-gradient(145deg, rgba(167,139,250,0.95), rgba(59,130,246,0.75), rgba(139,92,246,0.9))",
          boxShadow:
            "0 0 50px rgba(124,58,237,0.55), 0 0 100px rgba(59,130,246,0.25), inset 0 0 20px rgba(255,255,255,0.15)",
        }}
      >
        <div className="relative overflow-hidden rounded-[1.45rem] bg-[#070d1a]">
          <Image
            src="/achievement/plaque-5d.png"
            alt={label}
            width={720}
            height={960}
            priority
            sizes="(max-width: 768px) 320px, 360px"
            className="h-auto w-full select-none"
          />

          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 85% 90% at 50% 45%, transparent 45%, rgba(7,13,26,0.5) 100%)",
            }}
            aria-hidden
          />

          {!reduced && (
            <motion.div
              className="pointer-events-none absolute inset-0 mix-blend-soft-light"
              style={{ background: specularBg }}
              aria-hidden
            />
          )}

          <div
            className="pointer-events-none absolute inset-0 rounded-[1.45rem] ring-1 ring-inset ring-white/20"
            aria-hidden
          />
        </div>
      </div>

      <div
        className="mx-auto mt-5 h-10 w-[70%] rounded-full bg-violet-500/20 blur-2xl"
        aria-hidden
      />
    </div>
  );

  if (reduced) {
    return (
      <div className="flex w-full justify-center py-6" aria-label={label}>
        {plaque}
      </div>
    );
  }

  return (
    <div
      className="flex min-h-[420px] w-full items-center justify-center py-6 lg:min-h-[520px]"
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      aria-label={label}
    >
      <div style={{ perspective: m.perspective }}>
        <motion.div
          style={{
            rotateX,
            rotateY,
            y: lift,
            transformStyle: "preserve-3d",
          }}
        >
          {plaque}
        </motion.div>
      </div>
    </div>
  );
}
