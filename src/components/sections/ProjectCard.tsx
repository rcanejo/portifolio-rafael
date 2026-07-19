"use client";

import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";
import { useState } from "react";
import { cardHoverMotion as m } from "@/lib/motion/card-hover";

function ProjectThumb({
  title,
  image,
}: {
  title: string;
  image?: string;
}) {
  if (image) {
    return (
      <div className="relative flex aspect-[16/10] items-center justify-center overflow-hidden rounded-t-lg bg-white">
        <Image
          src={image}
          alt={title}
          fill
          className="object-contain p-6 transition duration-700 ease-out group-hover:scale-[var(--card-image-scale)]"
          sizes="(max-width: 768px) 100vw, 33vw"
          style={{ "--card-image-scale": m.imageScale } as React.CSSProperties}
        />
      </div>
    );
  }

  return (
    <div className="flex aspect-[16/10] items-center justify-center overflow-hidden rounded-t-lg bg-panel">
      <svg
        viewBox="0 0 200 120"
        className="h-full w-full opacity-40 transition duration-700 ease-out group-hover:scale-105 group-hover:opacity-60"
        aria-hidden
      >
        <circle cx="40" cy="60" r="8" fill="none" stroke="#34D399" strokeWidth="1.5" />
        <circle cx="100" cy="40" r="8" fill="none" stroke="#34D399" strokeWidth="1.5" />
        <circle cx="100" cy="80" r="8" fill="#FF6B6B" stroke="#FF6B6B" strokeWidth="1.5" />
        <circle cx="160" cy="60" r="8" fill="none" stroke="#34D399" strokeWidth="1.5" />
        <path d="M40,60 C70,60 70,40 100,40" fill="none" stroke="#34D399" strokeWidth="1" />
        <path d="M40,60 C70,60 70,80 100,80" fill="none" stroke="#34D399" strokeWidth="1" />
        <path d="M100,40 C130,40 130,60 160,60" fill="none" stroke="#34D399" strokeWidth="1" />
        <path d="M100,80 C130,80 130,60 160,60" fill="none" stroke="#34D399" strokeWidth="1" />
      </svg>
      <span className="sr-only">{title}</span>
    </div>
  );
}

export interface ProjectCardProps {
  href: string;
  title: string;
  summary: string;
  tags: string[];
  image?: string;
}

export function ProjectCard({
  href,
  title,
  summary,
  tags,
  image,
}: ProjectCardProps) {
  const reduced = useReducedMotion();
  const [hovered, setHovered] = useState(false);

  const spring = { ...m.spring };

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const smoothX = useSpring(mouseX, spring);
  const smoothY = useSpring(mouseY, spring);

  const rotateX = useSpring(useMotionValue(0), spring);
  const rotateY = useSpring(useMotionValue(0), spring);
  const lift = useSpring(useMotionValue(0), spring);
  const scale = useSpring(useMotionValue(1), spring);

  const spotlightX = useTransform(smoothX, (v) => `${v * 100}%`);
  const spotlightY = useTransform(smoothY, (v) => `${v * 100}%`);

  const spotlightBg = useMotionTemplate`radial-gradient(${m.spotlightRadius}px circle at ${spotlightX} ${spotlightY}, rgba(52, 211, 153, ${m.spotlightOpacity}), rgba(52, 211, 153, 0.08) 35%, transparent 70%)`;
  const borderGlow = useMotionTemplate`radial-gradient(480px circle at ${spotlightX} ${spotlightY}, rgba(52, 211, 153, 0.5), transparent 55%)`;

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

  function onEnter() {
    setHovered(true);
    if (!reduced) {
      lift.set(m.lift);
      scale.set(1.02);
    }
  }

  function onLeave() {
    setHovered(false);
    mouseX.set(0.5);
    mouseY.set(0.5);
    rotateX.set(0);
    rotateY.set(0);
    lift.set(0);
    scale.set(1);
  }

  const cardContent = (
    <Link
      href={href}
      onMouseMove={onMove}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className="project-card group relative block overflow-hidden rounded-lg border border-line bg-panel"
    >
      {!reduced && (
        <>
          <motion.div
            className="pointer-events-none absolute inset-0 z-0 rounded-lg opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{ background: spotlightBg }}
            aria-hidden
          />
          <motion.div
            className="pointer-events-none absolute -inset-px z-0 rounded-lg opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{
              background: borderGlow,
              mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              maskComposite: "exclude",
              WebkitMaskComposite: "xor",
              padding: "1px",
            }}
            aria-hidden
          />
        </>
      )}

      <div className="relative z-10">
        <div className="overflow-hidden">
          <ProjectThumb title={title} image={image} />
        </div>
        <div className="p-6">
          <div className="flex items-start justify-between gap-4">
            <h3 className="font-display text-lg font-semibold transition-colors duration-500 group-hover:text-emerald">
              {title}
            </h3>
            <motion.span
              className="font-mono text-coral"
              aria-hidden
              animate={hovered && !reduced ? { x: m.arrowTravel } : { x: 0 }}
              transition={{ type: "spring", ...spring }}
            >
              →
            </motion.span>
          </div>
          <p className="mt-2 line-clamp-2 text-sm text-muted transition-colors duration-500 group-hover:text-fg/80">
            {summary}
          </p>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <span
                key={tag}
                className="project-tag rounded border border-line/80 bg-ink/40 px-2 py-0.5 font-mono text-[0.6rem] uppercase tracking-wider text-muted transition-all duration-500 group-hover:-translate-y-0.5 group-hover:border-emerald/40 group-hover:bg-emerald/5 group-hover:text-emerald/90"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );

  if (reduced) {
    return (
      <div className="transition duration-200 hover:-translate-y-1 hover:border-emerald">
        {cardContent}
      </div>
    );
  }

  return (
    <motion.div
      style={{
        perspective: m.perspective,
        rotateX,
        rotateY,
        y: lift,
        scale,
        transformStyle: "preserve-3d",
      }}
    >
      {cardContent}
    </motion.div>
  );
}
