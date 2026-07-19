/**
 * Ajuste fino do hover dos cards (projetos e serviços).
 *
 * Como usar: altere os números abaixo e salve — o dev server recarrega sozinho.
 *
 * Dicas rápidas:
 * - Mais movimento no hover → aumente `lift`, `tiltDegrees` e `arrowTravel`
 * - Mais solto / menos rígido → diminua `springStiffness` e `springDamping`
 * - Mais “bounce” (oscilação) → diminua `springDamping` (ex.: 8–10)
 * - Movimento mais lento/pesado → aumente `springMass`
 */
export const cardHoverMotion = {
  /** Quanto o card sobe no hover, em pixels. Ex.: -6 sutil, -12 bem visível */
  lift: -12,

  /** Inclinação 3D máxima em graus. Ex.: 12 discreto, 24 dramático */
  tiltDegrees: 24,

  /** Quanto a seta → desliza para a direita (px) */
  arrowTravel: 12,

  /** Zoom da imagem/thumbnail no hover. 1 = sem zoom, 1.08 = 8% maior */
  imageScale: 1.08,

  /** Raio do spotlight que segue o cursor dentro do card (px) */
  spotlightRadius: 360,

  /** Intensidade do brilho do spotlight (0–1) */
  spotlightOpacity: 0.32,

  spring: {
    /** Rigidez da mola — menor = mais fluido. Faixa típica: 30–80 */
    stiffness: 42,

    /** Amortecimento — menor = mais bounce. Faixa típica: 8–18 */
    damping: 10,

    /** Massa — maior = mais inércia/lentidão. Faixa típica: 0.4–1 */
    mass: 0.55,
  },

  /** Perspectiva 3D do container (px) — menor = tilt mais exagerado */
  perspective: 800,
} as const;

export type CardHoverMotion = typeof cardHoverMotion;
