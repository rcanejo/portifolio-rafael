"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Dictionary, Locale } from "@/content/types";
import { siteConfig } from "@/lib/site";
import { LangSwitcher } from "./LangSwitcher";

interface HeaderProps {
  lang: Locale;
  dict: Dictionary;
}

const navItems = [
  { key: "about" as const, href: "#sobre" },
  { key: "services" as const, href: "#servicos" },
  { key: "projects" as const, href: "#projetos" },
  { key: "certificates" as const, href: "#formacao" },
  { key: "contact" as const, href: "#contato" },
];

export function Header({ lang, dict }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`no-print fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled ? "border-b border-line bg-ink/80 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          href={`/${lang}`}
          className="font-mono text-sm tracking-widest text-emerald"
          aria-label={siteConfig.shortName}
        >
          RC·
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Main">
          {navItems.map((item) => (
            <a
              key={item.key}
              href={item.href}
              className="font-mono text-xs uppercase tracking-wider text-muted transition-colors hover:text-fg"
            >
              {dict.nav[item.key]}
            </a>
          ))}
          <Link
            href={`/${lang}/cv`}
            className="font-mono text-xs uppercase tracking-wider text-muted transition-colors hover:text-fg"
          >
            {dict.nav.cv}
          </Link>
          <LangSwitcher lang={lang} />
          <a
            href={siteConfig.links.whatsapp(lang)}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-emerald px-4 py-2 font-mono text-xs uppercase tracking-wider text-emerald transition-colors hover:bg-emerald hover:text-ink"
          >
            {dict.nav.whatsapp}
          </a>
        </nav>

        <button
          type="button"
          className="flex flex-col gap-1.5 md:hidden"
          aria-label="Menu"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          <span className={`block h-0.5 w-6 bg-fg transition ${open ? "translate-y-2 rotate-45" : ""}`} />
          <span className={`block h-0.5 w-6 bg-fg transition ${open ? "opacity-0" : ""}`} />
          <span className={`block h-0.5 w-6 bg-fg transition ${open ? "-translate-y-2 -rotate-45" : ""}`} />
        </button>
      </div>

      {open && (
        <nav
          className="border-t border-line bg-ink/95 px-6 py-8 md:hidden"
          aria-label="Mobile"
        >
          <ul className="flex flex-col gap-6">
            {navItems.map((item, i) => (
              <li key={item.key} style={{ animationDelay: `${i * 80}ms` }}>
                <a
                  href={item.href}
                  className="font-display text-2xl text-fg"
                  onClick={() => setOpen(false)}
                >
                  {dict.nav[item.key]}
                </a>
              </li>
            ))}
            <li>
              <Link
                href={`/${lang}/cv`}
                className="font-display text-2xl text-fg"
                onClick={() => setOpen(false)}
              >
                {dict.nav.cv}
              </Link>
            </li>
            <li className="pt-4">
              <LangSwitcher lang={lang} />
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
