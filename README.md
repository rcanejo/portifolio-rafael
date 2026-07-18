# Portfólio — Rafael Targino Canêjo

Site bilíngue (PT/EN) com Next.js 16, animações premium e CMS Sanity opcional.

**Live:** [portfolio-rafael-eight.vercel.app](https://portfolio-rafael-eight.vercel.app)

## Stack

- Next.js 16 + React 19 + TypeScript + Tailwind CSS 4
- Motion (animações) + GSAP (scroll timeline)
- Sanity CMS (`/studio`) — opcional
- Resend (formulário de contato) — opcional
- Vercel (hospedagem)

## Desenvolvimento

```bash
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) — redireciona para `/pt` ou `/en`.

## Variáveis de ambiente

Copie `.env.example` para `.env.local` e preencha:

| Variável | Obrigatória | Descrição |
|----------|-------------|-----------|
| `NEXT_PUBLIC_SITE_URL` | Recomendada | URL do site (SEO/sitemap) |
| `CONTACT_EMAIL` | Recomendada | E-mail que recebe contatos |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Recomendada | Número com DDI (ex: 5511999999999) |
| `RESEND_API_KEY` | Opcional | Sem isso, formulário abre mailto |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Opcional | Sem isso, usa `src/content/data.ts` |

## Estrutura

- `src/app/[lang]/` — páginas PT/EN
- `src/components/sections/` — seções do site
- `src/components/motion/` — animações (Reveal, HeroGraph, etc.)
- `src/content/data.ts` — conteúdo estático (placeholders)
- `design-concepts/v2/` — referência visual aprovada
- `sanity/` — schemas do CMS

## Conteúdo

Edite `src/content/data.ts` ou configure Sanity em `/studio`.

Placeholders estão marcados — substitua com projetos, certificados e links reais.

## Domínio próprio (Cloudflare)

1. Registre o domínio na [Cloudflare Registrar](https://www.cloudflare.com/products/registrar/) (~R$40–80/ano)
2. Sugestões: `rafaelcanejo.dev`, `rafaeltargino.dev`, `rafaelcanejo.com.br`
3. Na Vercel: Project → Settings → Domains → adicione o domínio
4. Na Cloudflare DNS: CNAME `@` → `cname.vercel-dns.com` (ou registros que a Vercel indicar)
5. Atualize `NEXT_PUBLIC_SITE_URL` na Vercel

## Deploy

Push na branch `main` dispara deploy automático na Vercel.

```bash
npm run build
npm run lint
git push origin main
```

## Currículo

- `/pt/cv` e `/en/cv` — versão visual premium
- Botão "Baixar / Imprimir PDF" usa `window.print()` (Salvar como PDF)
