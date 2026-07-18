"use client";

import { useEffect } from "react";

interface LightboxProps {
  src?: string;
  alt: string;
  open: boolean;
  onClose: () => void;
}

export function Lightbox({ src, alt, open, onClose }: LightboxProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-6 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal
      aria-label={alt}
    >
      <div
        className="relative max-h-[90vh] max-w-4xl overflow-hidden rounded-lg border border-line bg-panel p-2"
        onClick={(e) => e.stopPropagation()}
      >
        {src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={src} alt={alt} className="max-h-[85vh] w-auto object-contain" />
        ) : (
          <div className="flex h-64 w-96 items-center justify-center text-muted">
            {alt}
          </div>
        )}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 rounded border border-line bg-ink px-2 py-1 font-mono text-xs text-fg hover:border-emerald"
        >
          ESC
        </button>
      </div>
    </div>
  );
}
