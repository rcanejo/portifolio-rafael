/**
 * Ajuste fino da esteira de ferramentas.
 */
export const toolsGridMotion = {
  /** Duração da fileira 1 (s) — menor = mais rápido */
  marqueeDurationRow1: 42,

  /** Duração da fileira 2 (s) — sentido oposto */
  marqueeDurationRow2: 48,

  /** Escala da pill no hover */
  activeScale: 1.03,

  spring: {
    stiffness: 320,
    damping: 28,
    mass: 0.45,
  },
} as const;

export type ToolsGridMotion = typeof toolsGridMotion;
