import "server-only";
import { notFound } from "next/navigation";
import type { Dictionary, Locale } from "@/content/types";

const dictionaries = {
  pt: () => import("./dictionaries/pt.json").then((m) => m.default as Dictionary),
  en: () => import("./dictionaries/en.json").then((m) => m.default as Dictionary),
};

export const locales: Locale[] = ["pt", "en"];

export function hasLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  if (!hasLocale(locale)) notFound();
  return dictionaries[locale]();
}
