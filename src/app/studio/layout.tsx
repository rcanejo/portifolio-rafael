import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Sanity Studio",
  robots: { index: false, follow: false },
};

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // O painel só fica acessível quando o Sanity está configurado.
  // Sem projectId (uso de conteúdo estático), /studio responde 404 e não expõe superfície pública.
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) notFound();

  return children;
}
