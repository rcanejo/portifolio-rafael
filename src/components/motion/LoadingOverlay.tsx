"use client";

import { useEffect, useState } from "react";
import { HeroGraph } from "./HeroGraph";

function shouldShowLoading() {
  if (typeof window === "undefined") return false;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  return !sessionStorage.getItem("portfolio-loaded");
}

export function LoadingOverlay() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!shouldShowLoading()) return;

    const showId = requestAnimationFrame(() => setVisible(true));
    const timer = setTimeout(() => {
      setVisible(false);
      sessionStorage.setItem("portfolio-loaded", "1");
    }, 1200);

    return () => {
      cancelAnimationFrame(showId);
      clearTimeout(timer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-ink transition-opacity duration-500"
      aria-hidden
    >
      <HeroGraph className="h-64 w-80 opacity-90" />
    </div>
  );
}
