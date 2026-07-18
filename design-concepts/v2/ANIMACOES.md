# Mapa de Animações — Portfólio Rafael Canêjo (Conceito B refinado)

Baseado nos 6 tipos de animação do artigo da Tubik que usamos como referência.
Paleta: fundo `#0B0F0E` · esmeralda `#34D399` · coral `#FF6B6B` · off-white `#E8EEE9`.

---

## 1. Loading animation (primeira visita)

- Tela escura com o **grafo de nós do hero se desenhando**: as linhas esmeralda
  "crescem" da esquerda para a direita (efeito draw de SVG), os nós acendem um a um,
  o nó coral pisca por último.
- Duração: ~1,2s. Depois a tela "abre" revelando o hero.
- Só acontece na primeira visita da sessão (não irrita quem navega entre páginas).

## 2. Hero animation

- O nome **"Rafael Canêjo"** entra com as letras subindo em stagger (uma cascata
  rápida, letra por letra, ~40ms de intervalo).
- O rótulo mono "AUTOMAÇÕES · IA · NOCODE" digita como terminal (efeito typewriter).
- O **grafo de nós** à direita fica vivo permanentemente:
  - pulsos de luz percorrem as linhas (como dados fluindo pelo fluxo de automação);
  - **reage ao mouse**: os nós próximos ao cursor se afastam suavemente e as linhas
    se curvam (efeito elástico, física de mola) — este é o "elemento 3D pontual"
    que combinamos, feito com React Three Fiber ou SVG + física.

## 3. Scroll reveals (todas as seções)

- Cada seção entra quando atinge ~70% da viewport:
  - o rótulo mono ("02 — PROJETOS") desliza da esquerda;
  - o título grande sobe com leve fade (600ms, easing suave);
  - cards/itens entram em stagger (100ms entre cada um).
- A **linha do tempo de certificados se desenha** conforme o scroll desce:
  a linha vertical esmeralda cresce acompanhando a rolagem, e cada dot acende
  quando a linha passa por ele (GSAP ScrollTrigger).

## 4. Hover animations

- **Cards de projeto**: borda ganha cor esmeralda, o card levanta 4px, a seta
  coral desliza para a direita, e o screenshot dá um zoom sutil (1.03x).
- **Botões**: preenchimento esmeralda "varre" da esquerda para a direita;
  a seta → avança 4px.
- **Links de redes (WhatsApp/LinkedIn/GitHub)**: ícone sobe levemente e ganha
  o accent coral.
- **Certificados**: o thumbnail inclina 2° e amplia, abrindo em lightbox ao clicar.

## 5. Accent animations (detalhes vivos)

- Palavras-chave do texto do hero ("automatizam", "resultados") ganham um
  sublinhado esmeralda que se desenha quando entram na tela.
- Números da seção de estatísticas **contam de 0 até o valor final** quando
  aparecem no scroll.
- O marquee de ferramentas (n8n, Cursor, Claude, Supabase...) desliza infinito,
  pausa no hover.

## 6. Transições de página / especiais

- Navegação entre páginas (ex: home → detalhe de projeto): a tela desliza com
  um painel esmeralda que varre a tela (page transition estilo "cortina"), 400ms.
- O fundo tem **grade sutil + noise** fixos; um glow esmeralda muito discreto
  segue o cursor (parallax leve, quase subliminar).
- Botão flutuante de WhatsApp com pulso suave a cada ~8s.

---

## Ordem de implementação

| Onda | O quê | Quando |
|------|-------|--------|
| V1 | Scroll reveals, hovers, marquee, contadores | Já no primeiro build |
| V2 | Loading, grafo interativo com física, transições de cortina, glow do cursor | Fase 5 do plano |
