/**
 * Ajuste fino do toggle dia/noite (light/dark).
 *
 * Como usar: altere os números abaixo e salve — o dev server recarrega sozinho.
 *
 * Dicas rápidas:
 * - Mais bounce / menos rigidez → diminua `spring.damping` (ex.: 8–12)
 * - Deslize mais “solto” → diminua `spring.stiffness` (ex.: 80–140)
 * - Parallax mais forte nas nuvens/estrelas → aumente `parallax`
 * - Transição mais lenta → aumente `spring.mass`
 */
export const themeToggleMotion = {
  /** Largura do track (px) */
  width: 72,

  /** Altura do track (px) */
  height: 36,

  /** Diâmetro do sol/lua (px) */
  knob: 28,

  /** Margem interna do knob em relação às bordas */
  pad: 4,

  spring: {
    /** Rigidez — menor = mais fluido. Faixa típica: 80–200 */
    stiffness: 120,
    /** Amortecimento — menor = mais bounce. Faixa típica: 8–18 */
    damping: 12,
    /** Massa — maior = mais lento/pesado. Faixa típica: 0.5–1.2 */
    mass: 0.7,
  },

  /**
   * Fator de parallax das camadas de fundo (nuvens, anéis, estrelas).
   * 0 = sem parallax, 1 = acompanha o knob 1:1, 0.4–0.7 = efeito natural.
   */
  parallax: 0.55,

  /** Duração aproximada do fade de estrelas/nuvens (s) — complementa a mola */
  fadeDuration: 0.45,
} as const;
