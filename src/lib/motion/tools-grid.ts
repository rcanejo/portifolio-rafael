/**
 * Ajuste fino do grid de ferramentas.
 */
export const toolsGridMotion = {
  /** Intervalo entre destaques automáticos (ms) */
  cycleInterval: 2200,

  /** Escala da pill destacada */
  activeScale: 1.03,

  /** Intensidade do glow no hover/destaque (0–1) */
  glowOpacity: 0.55,

  /** Raio do glow (px) */
  glowRadius: 28,

  spring: {
    stiffness: 320,
    damping: 28,
    mass: 0.45,
  },

  /** Atraso entre pills na entrada (s) */
  stagger: 0.04,
} as const;

export type ToolsGridMotion = typeof toolsGridMotion;
