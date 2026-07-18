"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

interface TimelineDrawProps {
  className?: string;
}

export function TimelineDraw({ className }: TimelineDrawProps) {
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = lineRef.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      el.style.transform = "scaleY(1)";
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { scaleY: 0, transformOrigin: "top" },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: el.parentElement,
            start: "top 70%",
            end: "bottom 30%",
            scrub: 0.6,
          },
        },
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={lineRef}
      className={`absolute left-0 top-0 h-full w-px origin-top bg-emerald ${className ?? ""}`}
      aria-hidden
    />
  );
}
