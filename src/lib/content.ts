import type {
  Achievement,
  Certificate,
  Locale,
  Project,
  Service,
  Stat,
  Tool,
} from "@/content/types";
import {
  achievement as staticAchievement,
  certificates as staticCertificates,
  projects as staticProjects,
  services as staticServices,
  stats as staticStats,
  tools as staticTools,
} from "@/content/data";

export async function getProjects(): Promise<Project[]> {
  if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    try {
      const { fetchProjects } = await import("./sanity");
      const remote = await fetchProjects();
      if (remote.length > 0) return remote;
    } catch {
      // fallback to static content
    }
  }
  return staticProjects;
}

export async function getProjectBySlug(slug: string): Promise<Project | undefined> {
  const projects = await getProjects();
  return projects.find((p) => p.slug === slug);
}

export async function getCertificates(): Promise<Certificate[]> {
  if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    try {
      const { fetchCertificates } = await import("./sanity");
      const remote = await fetchCertificates();
      if (remote.length > 0) return remote;
    } catch {
      // fallback
    }
  }
  return staticCertificates;
}

export async function getServices(): Promise<Service[]> {
  if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    try {
      const { fetchServices } = await import("./sanity");
      const remote = await fetchServices();
      if (remote.length > 0) return remote;
    } catch {
      // fallback
    }
  }
  return staticServices;
}

export async function getStats(): Promise<Stat[]> {
  if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    try {
      const { fetchStats } = await import("./sanity");
      const remote = await fetchStats();
      if (remote.length > 0) return remote;
    } catch {
      // fallback
    }
  }
  return staticStats;
}

export async function getTools(): Promise<Tool[]> {
  return staticTools;
}

export async function getAchievement(): Promise<Achievement> {
  return staticAchievement;
}

export function localize<T extends Record<Locale, string>>(
  obj: T,
  locale: Locale,
): string {
  return obj[locale];
}
