/**
 * Ajuste fino da placa 5D (pseudo-3D por hover).
 *
 * Como usar: altere os números abaixo e salve — o dev server recarrega sozinho.
 */
export const plaqueMotion = {
  /** Inclinação máxima em graus (maior que cards de projeto) */
  tiltDegrees: 32,

  /** Perspectiva do container — menor = tilt mais dramático */
  perspective: 900,

  /** Profundidade das camadas internas (px, translateZ) */
  layers: {
    nebula: -18,
    star: 28,
    badge: 36,
    brand: 22,
    acrylic: 8,
  },

  /** Glow pulsante do LED na base */
  ledPulse: {
    duration: 3.2,
    minOpacity: 0.45,
    maxOpacity: 0.95,
  },

  /** Intensidade do brilho especular que segue o mouse */
  specularOpacity: 0.55,

  spring: {
    stiffness: 38,
    damping: 6,
    mass: 0.6,
  },
} as const;

export type PlaqueMotion = typeof plaqueMotion;
