"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/content/types";

interface LangSwitcherProps {
  lang: Locale;
}

export function LangSwitcher({ lang }: LangSwitcherProps) {
  const pathname = usePathname();

  const switchTo = (target: Locale) => {
    const segments = pathname.split("/");
    segments[1] = target;
    return segments.join("/") || `/${target}`;
  };

  return (
    <div className="flex items-center gap-1 font-mono text-xs uppercase tracking-wider">
      <Link
        href={switchTo("pt")}
        className={lang === "pt" ? "text-emerald" : "text-muted hover:text-fg"}
        aria-current={lang === "pt" ? "true" : undefined}
      >
        PT
      </Link>
      <span className="text-line">|</span>
      <Link
        href={switchTo("en")}
        className={lang === "en" ? "text-emerald" : "text-muted hover:text-fg"}
        aria-current={lang === "en" ? "true" : undefined}
      >
        EN
      </Link>
    </div>
  );
}
