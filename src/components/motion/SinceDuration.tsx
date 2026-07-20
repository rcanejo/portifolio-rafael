"use client";

import { useEffect, useState } from "react";
import type { Dictionary, Locale } from "@/content/types";
import { formatSinceDuration } from "@/lib/since-duration";

interface SinceDurationProps {
  since: string;
  lang: Locale;
  labels: Dictionary["certificates"];
}

export function SinceDuration({ since, lang, labels }: SinceDurationProps) {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const interval = window.setInterval(() => {
      setNow(new Date());
    }, 60_000 * 60 * 24);

    return () => window.clearInterval(interval);
  }, []);

  const text = formatSinceDuration(since, lang, labels, now);

  return (
    <p className="mt-2 font-mono text-xs text-emerald" aria-live="polite">
      {text}
    </p>
  );
}
