"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function SetLang() {
  const pathname = usePathname();

  useEffect(() => {
    const lang = pathname.split("/")[1];
    if (lang === "pt" || lang === "en") {
      document.documentElement.lang = lang;
    }
  }, [pathname]);

  return null;
}
