"use client";

import { motion, useReducedMotion } from "motion/react";

interface StaggerTitleProps {
  text: string;
  className?: string;
}

export function StaggerTitle({ text, className }: StaggerTitleProps) {
  const reduced = useReducedMotion();
  const letters = text.split("");

  if (reduced) {
    return <h1 className={className}>{text}</h1>;
  }

  return (
    <h1 className={className} aria-label={text}>
      {letters.map((char, i) => (
        <motion.span
          key={`${char}-${i}`}
          className="inline-block"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 18,
            delay: 0.3 + i * 0.04,
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </h1>
  );
}
