"use client";

import { useEffect, useState } from "react";

function canUseCursorGlow() {
  if (typeof document !== "undefined" && document.documentElement.dataset.theme === "light") {
    return false;
  }
  return (
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches &&
    !window.matchMedia("(pointer: coarse)").matches
  );
}

export function CursorGlow() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [enabled] = useState(canUseCursorGlow);

  useEffect(() => {
    if (!enabled) return;
    const move = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0"
      aria-hidden
      style={{
        background: `radial-gradient(600px circle at ${pos.x}px ${pos.y}px, var(--theme-glow), transparent 40%)`,
      }}
    />
  );
}
