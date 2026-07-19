"use client";

import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";

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
          className="object-contain p-6 transition duration-300 group-hover:scale-[1.03]"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
    );
  }

  return (
    <div className="flex aspect-[16/10] items-center justify-center overflow-hidden rounded-t-lg bg-panel">
      <svg
        viewBox="0 0 200 120"
        className="h-full w-full opacity-40"
        aria-hidden
      >
        <circle
          cx="40"
          cy="60"
          r="8"
          fill="none"
          stroke="#34D399"
          strokeWidth="1.5"
        />
        <circle
          cx="100"
          cy="40"
          r="8"
          fill="none"
          stroke="#34D399"
          strokeWidth="1.5"
        />
        <circle cx="100" cy="80" r="8" fill="#FF6B6B" stroke="#FF6B6B" strokeWidth="1.5" />
        <circle
          cx="160"
          cy="60"
          r="8"
          fill="none"
          stroke="#34D399"
          strokeWidth="1.5"
        />
        <path
          d="M40,60 C70,60 70,40 100,40"
          fill="none"
          stroke="#34D399"
          strokeWidth="1"
        />
        <path
          d="M40,60 C70,60 70,80 100,80"
          fill="none"
          stroke="#34D399"
          strokeWidth="1"
        />
        <path
          d="M100,40 C130,40 130,60 160,60"
          fill="none"
          stroke="#34D399"
          strokeWidth="1"
        />
        <path
          d="M100,80 C130,80 130,60 160,60"
          fill="none"
          stroke="#34D399"
          strokeWidth="1"
        />
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
  const rotateX = useSpring(useMotionValue(0), { stiffness: 150, damping: 15 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 150, damping: 15 });

  function onMove(e: React.MouseEvent<HTMLElement>) {
    if (reduced) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    e.currentTarget.style.setProperty("--mx", `${px * 100}%`);
    e.currentTarget.style.setProperty("--my", `${py * 100}%`);
    rotateX.set((0.5 - py) * 12);
    rotateY.set((px - 0.5) * 12);
  }

  function onLeave(e: React.MouseEvent<HTMLElement>) {
    rotateX.set(0);
    rotateY.set(0);
    e.currentTarget.style.removeProperty("--mx");
    e.currentTarget.style.removeProperty("--my");
  }

  const card = (
    <Link
      href={href}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="card-spotlight group block overflow-hidden rounded-lg border border-line bg-panel transition duration-200 hover:-translate-y-1 hover:border-emerald"
    >
      <div className="overflow-hidden">
        <ProjectThumb title={title} image={image} />
      </div>
      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-display text-lg font-semibold">{title}</h3>
          <span
            className="font-mono text-coral transition group-hover:translate-x-1"
            aria-hidden
          >
            →
          </span>
        </div>
        <p className="mt-2 line-clamp-2 text-sm text-muted">{summary}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded border border-line px-2 py-0.5 font-mono text-[0.65rem] uppercase tracking-wider text-muted"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );

  if (reduced) {
    return card;
  }

  return (
    <motion.div
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
    >
      {card}
    </motion.div>
  );
}
