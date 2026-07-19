"use client";

import dynamic from "next/dynamic";
import { LoadingOverlay } from "./LoadingOverlay";
import { PageTransition } from "./PageTransition";

const CursorGlow = dynamic(
  () => import("./CursorGlow").then((m) => m.CursorGlow),
  { ssr: false },
);

export function ClientEffects() {
  return (
    <>
      <LoadingOverlay />
      <CursorGlow />
      <PageTransition />
    </>
  );
}
