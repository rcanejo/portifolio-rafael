"use client";

import { useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

interface CounterProps {
  value: number;
  suffix?: string;
  className?: string;
}

export function Counter({ value, suffix = "", className }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const reduced = useReducedMotion();
  const [display, setDisplay] = useState(() => (reduced ? value : 0));

  useEffect(() => {
    if (!inView) return;

    if (reduced) {
      const id = requestAnimationFrame(() => setDisplay(value));
      return () => cancelAnimationFrame(id);
    }

    let start: number | null = null;
    const duration = 1500;
    let frameId = 0;

    const step = (timestamp: number) => {
      if (start === null) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      setDisplay(Math.round(eased * value));
      if (progress < 1) frameId = requestAnimationFrame(step);
    };

    frameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameId);
  }, [inView, reduced, value]);

  return (
    <span ref={ref} className={className}>
      {display}
      {suffix}
    </span>
  );
}
