"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

function pathWithoutLocale(pathname: string) {
  return pathname.replace(/^\/(pt|en)(?=\/|$)/, "") || "/";
}

export function PageTransition() {
  const pathname = usePathname();
  const prevPath = useRef(pathname);

  useEffect(() => {
    const prev = prevPath.current;
    prevPath.current = pathname;

    // Troca só de idioma (/pt ↔ /en) — não dispara cortina (evita balançar o header)
    if (
      pathWithoutLocale(prev) === pathWithoutLocale(pathname) &&
      prev !== pathname
    ) {
      return;
    }

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
