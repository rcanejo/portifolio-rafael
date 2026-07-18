"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function PageTransition() {
  const pathname = usePathname();

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const overlay = document.createElement("div");
    overlay.className =
      "fixed inset-0 z-[150] bg-emerald pointer-events-none origin-left scale-x-0";
    overlay.style.transition = "transform 400ms ease";
    document.body.appendChild(overlay);

    requestAnimationFrame(() => {
      overlay.style.transform = "scaleX(1)";
      setTimeout(() => {
        overlay.style.transform = "scaleX(0)";
        overlay.style.transformOrigin = "right";
        setTimeout(() => overlay.remove(), 400);
      }, 200);
    });
  }, [pathname]);

  return null;
}
