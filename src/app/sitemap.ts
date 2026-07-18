import type { MetadataRoute } from "next";
import { getProjects } from "@/lib/content";

const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://portfolio-rafael-eight.vercel.app";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await getProjects();
  const langs = ["pt", "en"] as const;

  const staticRoutes = langs.flatMap((lang) => [
    { url: `${baseUrl}/${lang}`, lastModified: new Date() },
    { url: `${baseUrl}/${lang}/cv`, lastModified: new Date() },
  ]);

  const projectRoutes = langs.flatMap((lang) =>
    projects.map((p) => ({
      url: `${baseUrl}/${lang}/projetos/${p.slug}`,
      lastModified: new Date(),
    })),
  );

  return [...staticRoutes, ...projectRoutes];
}
