import type { Certificate, Project, Service, Stat } from "./types";

export const projects: Project[] = [
  {
    slug: "mirra-maison-atendimento-ia",
    title: {
      pt: "Atendimento IA no WhatsApp — Mirra & Maison",
      en: "AI WhatsApp Support — Mirra & Maison",
    },
    summary: {
      pt: "Agente humanizado que ouve áudio, lê imagens e responde no WhatsApp como uma pessoa real — construído do zero em 2 meses.",
      en: "Human-like agent that listens to audio, reads images, and replies on WhatsApp like a real person — built from scratch in 2 months.",
    },
    description: {
      pt: "Sistema completo de atendimento profissional no WhatsApp para a Mirra & Maison: recebe texto, áudio, imagem, vídeo e documentos, com memória por conversa, base de conhecimento vetorizada e roteamento inteligente de distribuidores.",
      en: "Full professional WhatsApp support system for Mirra & Maison: handles text, audio, images, video, and documents, with per-conversation memory, vector knowledge base, and smart distributor routing.",
    },
    tags: [
      "n8n",
      "ZAPI",
      "OpenAI",
      "Supabase",
      "Redis",
      "Postgres",
      "Hetzner",
      "Docker",
      "Traefik",
    ],
    image: "/projects/mirra-maison.png",
    featured: true,
    client: { name: "Mirra & Maison", logo: "/projects/mirra-maison.png" },
    role: {
      pt: "Desenvolvimento 100% do zero",
      en: "Built 100% from scratch",
    },
    duration: { pt: "2 meses", en: "2 months" },
    year: 2025,
    challenge: {
      pt: "A Mirra & Maison precisava escalar o atendimento no WhatsApp sem perder a qualidade humana: múltiplos clientes simultâneos, mensagens em vários formatos (texto, áudio, imagem, vídeo, documento) e respostas que dependem de conhecimento técnico sobre cosméticos e da rede nacional de distribuidores.",
      en: "Mirra & Maison needed to scale WhatsApp support without losing human quality: multiple simultaneous customers, messages in many formats (text, audio, image, video, document), and answers that depend on technical cosmetics knowledge and a national distributor network.",
    },
    solution: {
      pt: "Construí um agente de IA orquestrado no n8n, hospedado em infraestrutura própria (Hetzner + Docker), integrado ao WhatsApp via ZAPI. O sistema agrupa mensagens em blocos de contexto, processa áudio e imagem com OpenAI, consulta uma base vetorizada no Supabase e aciona tools para alertar humanos ou encaminhar leads a distribuidores regionais — tudo com comportamento humanizado na conversa.",
      en: "I built an AI agent orchestrated in n8n, hosted on dedicated infrastructure (Hetzner + Docker), integrated with WhatsApp via ZAPI. The system groups messages into context blocks, processes audio and images with OpenAI, queries a vector base in Supabase, and triggers tools to alert humans or route leads to regional distributors — all with humanized conversation behavior.",
    },
    humanized: [
      {
        icon: "check",
        title: { pt: "Confirmação de leitura", en: "Read receipts" },
        description: {
          pt: "Marca mensagens como visualizadas (check azul) antes de responder, como em uma conversa real.",
          en: "Marks messages as read (blue check) before replying, like a real conversation.",
        },
      },
      {
        icon: "typing",
        title: { pt: '"Digitando…"', en: '"Typing…"' },
        description: {
          pt: "Exibe o indicador de digitação enquanto a IA prepara a resposta em texto.",
          en: "Shows the typing indicator while the AI prepares a text reply.",
        },
      },
      {
        icon: "mic",
        title: { pt: "Gravando áudio", en: "Recording audio" },
        description: {
          pt: 'Mostra "gravando áudio" quando a resposta será enviada em voz, mantendo naturalidade.',
          en: 'Shows "recording audio" when the reply will be sent as voice, keeping things natural.',
        },
      },
      {
        icon: "image",
        title: { pt: "Mídia na resposta", en: "Media in replies" },
        description: {
          pt: "A IA pode enviar imagens e documentos quando faz sentido no atendimento.",
          en: "The AI can send images and documents when it makes sense in the conversation.",
        },
      },
      {
        icon: "layers",
        title: { pt: "Bloco de contexto único", en: "Single context block" },
        description: {
          pt: "Várias mensagens seguidas (texto + áudio + imagem) são agrupadas e interpretadas como um único contexto.",
          en: "Multiple consecutive messages (text + audio + image) are grouped and interpreted as one context.",
        },
      },
      {
        icon: "spark",
        title: { pt: "Tom adaptável", en: "Adaptable tone" },
        description: {
          pt: "Engenharia de prompt aplicada a situações reais — respostas dinâmicas, não roteiros fixos de robô.",
          en: "Prompt engineering applied to real situations — dynamic replies, not fixed robot scripts.",
        },
      },
    ],
    capabilities: [
      {
        icon: "memory",
        title: { pt: "Memória por conversa", en: "Per-conversation memory" },
        description: {
          pt: "Cada atendimento mantém contexto isolado via Redis, permitindo dezenas de conversas simultâneas sem misturar informações.",
          en: "Each session keeps isolated context via Redis, enabling dozens of simultaneous conversations without mixing information.",
        },
      },
      {
        icon: "search",
        title: { pt: "Base vetorizada + web", en: "Vector KB + web search" },
        description: {
          pt: "Busca em base de conhecimento específica da empresa (cosméticos) no Supabase com embeddings OpenAI, complementada por pesquisas externas quando necessário.",
          en: "Searches company-specific knowledge (cosmetics) in Supabase with OpenAI embeddings, complemented by external research when needed.",
        },
      },
      {
        icon: "bell",
        title: { pt: "Alerta humano", en: "Human alert" },
        description: {
          pt: "Aciona o time de suporte em casos definidos por regras pré-estabelecidas, sem depender de palavras-chave fixas.",
          en: "Notifies the support team in cases defined by pre-established rules, without relying on fixed keywords.",
        },
      },
      {
        icon: "map",
        title: { pt: "Roteamento de distribuidor", en: "Distributor routing" },
        description: {
          pt: "Identifica a região do cliente pelo contexto, busca o distribuidor correto na base nacional e alerta o representante sobre o lead.",
          en: "Identifies the customer's region from context, finds the right distributor in the national database, and alerts the representative about the lead.",
        },
      },
    ],
    stack: [
      {
        category: { pt: "Infraestrutura", en: "Infrastructure" },
        items: ["Hetzner", "Docker", "Swarm", "Portainer", "Traefik"],
      },
      {
        category: { pt: "Automação", en: "Automation" },
        items: ["n8n"],
      },
      {
        category: { pt: "Inteligência Artificial", en: "Artificial Intelligence" },
        items: ["OpenAI (chat, transcrição, visão, embeddings)"],
      },
      {
        category: { pt: "APIs & Integrações", en: "APIs & Integrations" },
        items: ["ZAPI (WhatsApp)", "HTTP Requests"],
      },
      {
        category: { pt: "Dados", en: "Data" },
        items: ["Postgres", "Supabase (pgvector)", "Redis"],
      },
    ],
    results: [
      {
        pt: "Atendimento profissional no WhatsApp disponível continuamente, com respostas contextuais em múltiplos formatos.",
        en: "Professional WhatsApp support available continuously, with contextual replies across multiple formats.",
      },
      {
        pt: "Conversas simultâneas isoladas por memória, sem perder o fio de cada cliente.",
        en: "Simultaneous conversations isolated by memory, without losing each customer's thread.",
      },
      {
        pt: "Encaminhamento automático de leads qualificados ao distribuidor regional correto.",
        en: "Automatic routing of qualified leads to the correct regional distributor.",
      },
      {
        pt: "Escalonamento para humanos apenas quando as regras de negócio exigem — o restante fica com a IA.",
        en: "Escalation to humans only when business rules require it — everything else stays with the AI.",
      },
    ],
    flow: [
      {
        id: "cliente",
        label: { pt: "Cliente (WhatsApp)", en: "Customer (WhatsApp)" },
        kind: "io",
      },
      {
        id: "zapi",
        label: { pt: "ZAPI / Webhook", en: "ZAPI / Webhook" },
        kind: "io",
      },
      {
        id: "buffer",
        label: { pt: "Buffer (Redis)", en: "Buffer (Redis)" },
        kind: "process",
      },
      {
        id: "pre",
        label: {
          pt: "Transcrição + Visão (OpenAI)",
          en: "Transcription + Vision (OpenAI)",
        },
        kind: "process",
      },
      {
        id: "agente",
        label: { pt: "Agente IA", en: "AI Agent" },
        kind: "core",
      },
      {
        id: "memoria",
        label: { pt: "Memória por conversa", en: "Per-conversation memory" },
        kind: "data",
      },
      {
        id: "kb",
        label: {
          pt: "Base vetorizada (Supabase)",
          en: "Vector KB (Supabase)",
        },
        kind: "data",
      },
      {
        id: "tools",
        label: {
          pt: "Tools: distribuidor / alerta",
          en: "Tools: distributor / alert",
        },
        kind: "tool",
      },
      {
        id: "resposta",
        label: { pt: "Resposta humanizada", en: "Humanized reply" },
        kind: "io",
      },
    ],
  },
  {
    slug: "automacao-processos-internos",
    title: {
      pt: "Automação de Processos Internos",
      en: "Internal Process Automation",
    },
    summary: {
      pt: "Orquestração de tarefas repetitivas entre planilhas, e-mail e sistemas legados.",
      en: "Orchestration of repetitive tasks across spreadsheets, email, and legacy systems.",
    },
    description: {
      pt: "Automação low-code conectando Google Sheets, Gmail e APIs internas, reduzindo trabalho manual em rotinas administrativas.",
      en: "Low-code automation connecting Google Sheets, Gmail, and internal APIs, reducing manual work in admin routines.",
    },
    tags: ["Make", "Google Sheets", "APIs", "Low-code"],
    featured: true,
  },
  {
    slug: "dashboard-operacional",
    title: {
      pt: "Dashboard Operacional",
      en: "Operations Dashboard",
    },
    summary: {
      pt: "Painel em tempo real para acompanhar métricas de automações e atendimentos.",
      en: "Real-time panel to track automation and support metrics.",
    },
    description: {
      pt: "Interface construída com Lovable e Supabase para visualizar volume de atendimentos, SLAs e saúde dos fluxos automatizados.",
      en: "Interface built with Lovable and Supabase to visualize support volume, SLAs, and automated flow health.",
    },
    tags: ["Lovable", "Supabase", "Dashboard", "No-code"],
    featured: true,
  },
];

export const certificates: Certificate[] = [
  {
    year: 2025,
    course: {
      pt: "Formação em Agentes IA e Automações",
      en: "AI Agents & Automation Training",
    },
    institution: "ibe.IA",
    highlight: true,
  },
  {
    year: 2025,
    course: {
      pt: "Formação em Vibe Coding",
      en: "Vibe Coding Training",
    },
    institution: "ibe.IA",
    highlight: true,
  },
  {
    year: 2024,
    course: {
      pt: "Automações com n8n — Nível Avançado",
      en: "Advanced n8n Automations",
    },
    institution: "ibe.IA",
  },
  {
    year: 2024,
    course: {
      pt: "Engenharia de Prompts para Negócios",
      en: "Prompt Engineering for Business",
    },
    institution: "ibe.IA",
  },
  {
    year: 2024,
    course: {
      pt: "Integrações WhatsApp Business API",
      en: "WhatsApp Business API Integrations",
    },
    institution: "ibe.IA",
  },
  {
    year: 2023,
    course: {
      pt: "Fundamentos de NoCode/LowCode",
      en: "NoCode/LowCode Fundamentals",
    },
    institution: "ibe.IA",
  },
];

export const services: Service[] = [
  {
    icon: "workflow",
    title: {
      pt: "Automações com IA",
      en: "AI Automations",
    },
    description: {
      pt: "Fluxos inteligentes que eliminam tarefas repetitivas e conectam ferramentas do seu ecossistema.",
      en: "Smart flows that eliminate repetitive tasks and connect tools across your ecosystem.",
    },
  },
  {
    icon: "message",
    title: {
      pt: "Atendimento Multiplataforma",
      en: "Multi-Platform Support",
    },
    description: {
      pt: "Agentes no WhatsApp e outros canais com triagem, contexto e escalonamento para humanos.",
      en: "Agents on WhatsApp and other channels with triage, context, and human escalation.",
    },
  },
  {
    icon: "code",
    title: {
      pt: "Apps NoCode/LowCode",
      en: "NoCode/LowCode Apps",
    },
    description: {
      pt: "MVPs e ferramentas internas com Lovable, Supabase e integrações sob medida.",
      en: "MVPs and internal tools with Lovable, Supabase, and custom integrations.",
    },
  },
  {
    icon: "chart",
    title: {
      pt: "Processos & Integrações",
      en: "Processes & Integrations",
    },
    description: {
      pt: "Mapeamento de processos, APIs, planilhas e CRMs trabalhando juntos sem fricção.",
      en: "Process mapping with APIs, spreadsheets, and CRMs working together seamlessly.",
    },
  },
];

export const stats: Stat[] = [
  {
    value: 12,
    suffix: "+",
    label: { pt: "Automações entregues", en: "Automations delivered" },
  },
  {
    value: 8,
    suffix: "+",
    label: { pt: "Projetos concluídos", en: "Projects completed" },
  },
  {
    value: 6,
    suffix: "+",
    label: { pt: "Certificações ibe.IA", en: "ibe.IA certifications" },
  },
  {
    value: 3,
    suffix: "+",
    label: { pt: "Anos com automação & IA", en: "Years in automation & AI" },
  },
];

export const tools = [
  "n8n",
  "Make",
  "Zapier",
  "Cursor",
  "Claude",
  "ChatGPT",
  "Supabase",
  "Lovable",
  "WhatsApp API",
  "ibe.IA",
];
