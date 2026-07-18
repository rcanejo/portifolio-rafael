import { createClient } from "@sanity/client";
import type {
  Certificate,
  Localized,
  Project,
  Service,
  Stat,
} from "@/content/types";

type SanityProjectRow = {
  slug: string;
  title: Localized;
  summary: Localized;
  description: Localized;
  tags?: string[];
  featured?: boolean;
};

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2024-01-01";

export function getSanityClient() {
  if (!projectId) {
    throw new Error("Sanity project ID not configured");
  }
  return createClient({ projectId, dataset, apiVersion, useCdn: true });
}

export async function fetchProjects(): Promise<Project[]> {
  const client = getSanityClient();
  const rows = await client.fetch<SanityProjectRow[]>(
    `*[_type == "project"] | order(_createdAt desc) {
      "slug": slug.current,
      title, summary, description, tags, featured
    }`,
  );
  return rows.map((r) => ({
    slug: r.slug,
    title: r.title,
    summary: r.summary,
    description: r.description,
    tags: r.tags ?? [],
    featured: r.featured ?? false,
  }));
}

export async function fetchCertificates(): Promise<Certificate[]> {
  const client = getSanityClient();
  return client.fetch<Certificate[]>(
    `*[_type == "certificate"] | order(year desc) {
      year, course, institution, highlight
    }`,
  );
}

export async function fetchServices(): Promise<Service[]> {
  const client = getSanityClient();
  return client.fetch<Service[]>(
    `*[_type == "service"] | order(_createdAt asc) {
      icon, title, description
    }`,
  );
}

export async function fetchStats(): Promise<Stat[]> {
  const client = getSanityClient();
  return client.fetch<Stat[]>(
    `*[_type == "stat"] | order(_createdAt asc) {
      value, suffix, label
    }`,
  );
}
