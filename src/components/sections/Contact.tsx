"use client";

import Link from "next/link";
import { useActionState, useEffect } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { submitContact, type ContactState } from "@/app/actions/contact";
import type { Dictionary, Locale } from "@/content/types";
import { siteConfig } from "@/lib/site";

const initialState: ContactState = { ok: false, message: "" };

interface ContactProps {
  lang: Locale;
  dict: Dictionary;
}

export function Contact({ lang, dict }: ContactProps) {
  const [state, formAction, pending] = useActionState(submitContact, initialState);

  useEffect(() => {
    if (state.useMailto && state.mailto) {
      window.location.href = state.mailto;
    }
  }, [state.useMailto, state.mailto]);

  return (
    <section id="contato" className="scroll-mt-24 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-16 lg:grid-cols-2">
          <div>
            <Reveal>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-emerald">
                {dict.contact.label}
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="font-display mt-4 text-[clamp(2rem,5vw,3.5rem)] font-bold tracking-tight">
                {dict.contact.title}
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-6 text-muted leading-relaxed">{dict.contact.subtitle}</p>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="mt-8 flex flex-wrap gap-6">
                <a
                  href={siteConfig.links.whatsapp(lang)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-sm text-muted transition hover:-translate-y-0.5 hover:text-coral"
                >
                  WhatsApp
                </a>
                <a
                  href={siteConfig.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-sm text-muted transition hover:-translate-y-0.5 hover:text-coral"
                >
                  LinkedIn
                </a>
                <a
                  href={siteConfig.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-sm text-muted transition hover:-translate-y-0.5 hover:text-coral"
                >
                  GitHub
                </a>
                <Link
                  href={`/${lang}/cv`}
                  className="font-mono text-sm text-emerald underline-offset-4 hover:underline"
                >
                  {dict.contact.downloadCv}
                </Link>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.15}>
            <form action={formAction} className="space-y-6 rounded-lg border border-line bg-panel p-8">
              <input type="hidden" name="lang" value={lang} />
              <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden />

              <div>
                <label htmlFor="name" className="font-mono text-xs uppercase tracking-wider text-muted">
                  {dict.contact.name}
                </label>
                <input
                  id="name"
                  name="name"
                  required
                  className="mt-2 w-full rounded-lg border border-line bg-ink px-4 py-3 text-fg outline-none transition focus:border-emerald focus:ring-1 focus:ring-emerald"
                />
              </div>
              <div>
                <label htmlFor="email" className="font-mono text-xs uppercase tracking-wider text-muted">
                  {dict.contact.email}
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="mt-2 w-full rounded-lg border border-line bg-ink px-4 py-3 text-fg outline-none transition focus:border-emerald focus:ring-1 focus:ring-emerald"
                />
              </div>
              <div>
                <label htmlFor="message" className="font-mono text-xs uppercase tracking-wider text-muted">
                  {dict.contact.message}
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  className="mt-2 w-full resize-none rounded-lg border border-line bg-ink px-4 py-3 text-fg outline-none transition focus:border-emerald focus:ring-1 focus:ring-emerald"
                />
              </div>

              {state.message && (
                <p className={`text-sm ${state.ok ? "text-emerald" : "text-coral"}`}>
                  {state.message}
                </p>
              )}

              <button
                type="submit"
                disabled={pending}
                className="btn-sweep w-full rounded-lg border border-emerald px-6 py-3 font-mono text-sm uppercase tracking-wider text-emerald transition hover:text-ink disabled:opacity-50"
              >
                {pending ? dict.contact.sending : dict.contact.send}
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
