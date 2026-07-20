/**
 * Parâmetros da cena do orquestrador (Contact).
 * pulseSpeed: duração de um ciclo de pulso nas trilhas (s)
 * nodeGlowDuration: tempo de brilho sequencial em cada nó (s)
 * particleCount: partículas leves ao redor do circuito
 * dashLength: comprimento do traço animado nas trilhas
 */
export const orchestratorMotion = {
  pulseSpeed: 2.4,
  nodeGlowDuration: 3.6,
  particleCount: 6,
  dashLength: 8,
  glowOpacity: 0.85,
  trackOpacity: 0.35,
} as const;

export type OrchestratorMotion = typeof orchestratorMotion;
