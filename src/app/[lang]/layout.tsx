import { notFound } from "next/navigation";
import { BackgroundLayers } from "@/components/layout/BackgroundLayers";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { SetLang } from "@/components/layout/SetLang";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";
import { ClientEffects } from "@/components/motion/ClientEffects";
import type { Locale } from "@/content/types";
import { getDictionary, hasLocale, locales } from "./dictionaries";

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function LangLayout({
  children,
  params,
}: LayoutProps<"/[lang]">) {
  const { lang } = await params;

  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang as Locale);

  return (
    <>
      <SetLang />
      <ClientEffects />
      <BackgroundLayers />
      <Header lang={lang as Locale} dict={dict} />
      <main className="relative z-10 flex-1">{children}</main>
      <Footer lang={lang as Locale} dict={dict} />
      <WhatsAppFloat lang={lang as Locale} />
    </>
  );
}
