/**
 * Ajuste fino da placa 5D (pseudo-3D por hover).
 *
 * Como usar: altere os números abaixo e salve — o dev server recarrega sozinho.
 */
export const plaqueMotion = {
  /** Inclinação máxima em graus */
  tiltDegrees: 28,

  /** Perspectiva do palco — fica no elemento PAI do rotacionado */
  perspective: 1100,

  /** Quanto a placa flutua no hover (px) */
  lift: -6,

  /** Glow pulsante do LED na base */
  ledPulse: {
    duration: 3.2,
    minOpacity: 0.35,
    maxOpacity: 0.85,
  },

  /** Intensidade do brilho especular que segue o mouse */
  specularOpacity: 0.45,

  spring: {
    stiffness: 40,
    damping: 8,
    mass: 0.55,
  },
} as const;

export type PlaqueMotion = typeof plaqueMotion;
