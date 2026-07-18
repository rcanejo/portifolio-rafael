import Link from "next/link";
import type { Dictionary, Locale } from "@/content/types";
import { siteConfig } from "@/lib/site";

interface FooterProps {
  lang: Locale;
  dict: Dictionary;
}

export function Footer({ lang, dict }: FooterProps) {
  return (
    <footer className="no-print border-t border-line py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 md:flex-row">
        <p className="font-mono text-xs text-muted">{dict.footer.rights}</p>
        <div className="flex items-center gap-6">
          <a
            href={siteConfig.links.whatsapp(lang)}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-muted transition hover:-translate-y-0.5 hover:text-coral"
          >
            WhatsApp
          </a>
          <a
            href={siteConfig.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-muted transition hover:-translate-y-0.5 hover:text-coral"
          >
            LinkedIn
          </a>
          <a
            href={siteConfig.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-muted transition hover:-translate-y-0.5 hover:text-coral"
          >
            GitHub
          </a>
          <Link
            href={`/${lang}/cv`}
            className="font-mono text-xs text-muted transition hover:-translate-y-0.5 hover:text-coral"
          >
            CV
          </Link>
        </div>
      </div>
    </footer>
  );
}
