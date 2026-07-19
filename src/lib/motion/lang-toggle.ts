/**
 * Ajuste fino do toggle PT/EN (bandeiras Brasil / EUA).
 * Mesmas dimensões do theme toggle para ficarem alinhados no header.
 *
 * Como usar: altere os números abaixo e salve — o dev server recarrega sozinho.
 */
export const langToggleMotion = {
  width: 72,
  height: 36,
  knob: 28,
  pad: 4,

  spring: {
    stiffness: 120,
    damping: 12,
    mass: 0.7,
  },

  parallax: 0.55,
  fadeDuration: 0.45,
} as const;
