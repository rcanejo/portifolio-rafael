import { notFound } from "next/navigation";
import { AboutSection } from "@/components/sections/AboutSection";
import { Certificates } from "@/components/sections/Certificates";
import { Contact } from "@/components/sections/Contact";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { Services } from "@/components/sections/Services";
import { ToolsMarquee } from "@/components/sections/ToolsMarquee";
import type { Locale } from "@/content/types";
import {
  getCertificates,
  getProjects,
  getServices,
  getStats,
  getTools,
} from "@/lib/content";
import { getDictionary, hasLocale } from "./dictionaries";

export async function generateMetadata({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};

  const titles = {
    pt: "Rafael Canêjo — Automações & IA",
    en: "Rafael Canêjo — Automations & AI",
  };

  return {
    title: titles[lang as Locale],
    alternates: {
      languages: { pt: "/pt", en: "/en" },
    },
  };
}

export default async function HomePage({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const locale = lang as Locale;
  const [dict, projects, certificates, services, stats, tools] =
    await Promise.all([
      getDictionary(locale),
      getProjects(),
      getCertificates(),
      getServices(),
      getStats(),
      getTools(),
    ]);

  return (
    <>
      <Hero dict={dict} />
      <ToolsMarquee tools={tools} />
      <AboutSection lang={locale} dict={dict} stats={stats} />
      <Services lang={locale} dict={dict} services={services} />
      <Projects lang={locale} dict={dict} projects={projects} />
      <Certificates lang={locale} dict={dict} certificates={certificates} />
      <Contact lang={locale} dict={dict} />
    </>
  );
}
