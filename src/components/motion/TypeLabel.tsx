"use client";

import { useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

interface TypeLabelProps {
  text: string;
  speed?: number;
  className?: string;
}

export function TypeLabel({ text, speed = 50, className }: TypeLabelProps) {
  const reduced = useReducedMotion();
  const [display, setDisplay] = useState(reduced ? text : "");
  const [done, setDone] = useState(reduced);

  useEffect(() => {
    if (reduced) return;

    let i = 0;
    const interval = setInterval(() => {
      i += 1;
      setDisplay(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(interval);
        setDone(true);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [reduced, speed, text]);

  return (
    <span className={className}>
      {display}
      {!done && (
        <span className="ml-0.5 inline-block h-[1em] w-[2px] animate-pulse bg-emerald align-middle" />
      )}
    </span>
  );
}
