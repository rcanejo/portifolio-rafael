import type {
  Achievement,
  Certificate,
  Project,
  Service,
  Stat,
  Tool,
} from "./types";

export const projects: Project[] = [
  {
    slug: "cohn-santos-atendimento-juridico-ia",
    title: {
      pt: "Atendimento jurídico com IA, Cohn & Santos",
      en: "AI Legal Support, Cohn & Santos",
    },
    summary: {
      pt: "Dois agentes de IA no WhatsApp oficial + CRM: triagem por área, qualificação e handoff humano com contexto completo.",
      en: "Two AI agents on official WhatsApp + CRM: area triage, qualification, and human handoff with full context.",
    },
    description: {
      pt: "Sistema multiagente para escritório de advocacia: WhatsApp Business API, Chatwoot e n8n, com buffer humano, prompts dinâmicos por área e ferramentas CRM para advogados.",
      en: "Multi-agent system for a law firm: WhatsApp Business API, Chatwoot, and n8n, with human message buffer, dynamic area prompts, and CRM tools for lawyers.",
    },
    tags: [
      "Chatwoot",
      "WhatsApp Business API",
      "n8n",
      "OpenAI",
      "Postgres",
      "pgvector",
      "Google Sheets",
      "Google Drive",
      "ZapSign",
      "Redis",
      "Docker",
      "Hetzner",
    ],
    image: "/projects/cohn-santos/logo.png",
    featured: true,
    client: {
      name: "Cohn & Santos",
      logo: "/projects/cohn-santos/logo.png",
    },
    role: {
      pt: "Desenvolvimento e coordenação da equipe de automação · Grupo IDE",
      en: "Development and automation team coordination · Grupo IDE",
    },
    duration: {
      pt: "3 meses de desenvolvimento + 2 meses de ajustes e melhoria de qualidade",
      en: "3 months of development + 2 months of tuning and quality improvements",
    },
    year: 2026,
    challenge: {
      pt: "O escritório Cohn & Santos precisava escalar o atendimento inicial no WhatsApp sem perder qualidade humana nem controle jurídico: clientes enviam áudios longos, documentos e imagens; casos exigem triagem por área (trabalhista, previdenciário, consumidor, entre outras); advogados humanos precisam assumir conversas já qualificadas, com contexto e documentos organizados. Tudo fica visível no CRM junto ao atendimento da IA.",
      en: "Cohn & Santos needed to scale initial WhatsApp support without losing human quality or legal control: clients send long audio messages, documents, and images; cases require triage by practice area (labor, social security, consumer law, and more); human lawyers must take over already qualified conversations with organized context and documents. Everything stays visible in the CRM alongside AI support.",
    },
    solution: {
      pt: "Orquestrei no n8n o triângulo WhatsApp oficial, Chatwoot (CRM) e n8n: webhook recebe eventos, cadastra e atualiza leads no Postgres (já etiquetados), aplica buffer humano de mensagens e processa multimídia (transcrição, visão, PDF). Roteamento entre agente recepcionista (primeiro contato, triagem de área via switch no Postgres, base própria) e agente principal (prompt robusto por área, extraído dinamicamente de Google Sheets). Memória compartilhada entre os dois no Postgres. Tools do agente principal: alterar contexto e área no banco, acionar etiquetas via HTTP API do Chatwoot, gerar notas privadas (briefing invisível ao cliente para o advogado), buscar e associar advogado com balanceamento por área e menor carga, base vetorizada por área com busca em fontes confiáveis, integração ZapSign + Google Drive (pasta por cliente com documentos assinados e mídias). Respostas humanizadas em texto, áudio, imagem e documento. Atuei no desenvolvimento e na coordenação da equipe de automação do Grupo IDE.",
      en: "I orchestrated in n8n the official WhatsApp, Chatwoot (CRM), and n8n triangle: webhooks receive events, register and update leads in Postgres (pre-tagged), apply a human message buffer, and process multimedia (transcription, vision, PDF). Routing between a receptionist agent (first contact, area triage via Postgres switch, own knowledge base) and a main agent (robust area-specific prompt pulled dynamically from Google Sheets). Shared memory between both in Postgres. Main agent tools: update context and area in the database, trigger labels via Chatwoot HTTP API, generate private notes (client-invisible briefings for lawyers), find and assign lawyers with load balancing by area, per-area vector knowledge base with trusted external sources, ZapSign + Google Drive integration (per-client folder with signed documents and media). Humanized replies in text, audio, image, and documents. I led development and coordinated the automation team at Grupo IDE.",
    },
    humanized: [
      {
        icon: "check",
        title: { pt: "Confirmação de leitura", en: "Read receipts" },
        description: {
          pt: "Marca mensagens como visualizadas antes de responder, como em uma conversa real com o escritório.",
          en: "Marks messages as read before replying, like a real conversation with the firm.",
        },
      },
      {
        icon: "typing",
        title: { pt: '"Digitando…"', en: '"Typing…"' },
        description: {
          pt: "Exibe o indicador de digitação enquanto a IA prepara respostas empáticas e contextualizadas.",
          en: "Shows the typing indicator while the AI prepares empathetic, contextual replies.",
        },
      },
      {
        icon: "mic",
        title: { pt: "Gravando áudio", en: "Recording audio" },
        description: {
          pt: 'Mostra "gravando áudio" quando a resposta será enviada em voz, natural para clientes que preferem falar.',
          en: 'Shows "recording audio" when the reply will be sent as voice, natural for clients who prefer speaking.',
        },
      },
      {
        icon: "image",
        title: { pt: "Mídia na resposta", en: "Media in replies" },
        description: {
          pt: "A IA envia documentos, imagens e orientações quando faz sentido no atendimento jurídico inicial.",
          en: "The AI sends documents, images, and guidance when it makes sense in initial legal support.",
        },
      },
      {
        icon: "layers",
        title: { pt: "Bloco de contexto único", en: "Single context block" },
        description: {
          pt: "Várias mensagens seguidas (texto + áudio + documento) são agrupadas e interpretadas como um único contexto.",
          en: "Multiple consecutive messages (text + audio + document) are grouped and interpreted as one context.",
        },
      },
      {
        icon: "spark",
        title: { pt: "Tom adaptável", en: "Adaptable tone" },
        description: {
          pt: "Linguagem empática e adequada ao atendimento jurídico inicial, dinâmica, sem roteiro fixo de robô.",
          en: "Empathetic language suited to initial legal support, dynamic, not a fixed robot script.",
        },
      },
    ],
    capabilities: [
      {
        icon: "layers",
        title: {
          pt: "Triângulo WhatsApp + Chatwoot + n8n",
          en: "WhatsApp + Chatwoot + n8n triangle",
        },
        description: {
          pt: "WhatsApp Business API conectado ao Chatwoot; webhook dispara o n8n, cadastro, etiquetas e controle CRM desde a entrada.",
          en: "WhatsApp Business API connected to Chatwoot; webhook triggers n8n, registration, labels, and CRM control from the first message.",
        },
      },
      {
        icon: "memory",
        title: { pt: "Memória compartilhada", en: "Shared memory" },
        description: {
          pt: "Agente recepcionista e agente principal compartilham o mesmo contexto por conversa no Postgres, transição imperceptível.",
          en: "Receptionist and main agent share the same per-conversation context in Postgres, seamless handoff between them.",
        },
      },
      {
        icon: "map",
        title: {
          pt: "Recepcionista + triagem de área",
          en: "Receptionist + area triage",
        },
        description: {
          pt: "Primeiro contato identifica a área jurídica e atualiza valores no Postgres via switch, direciona ao agente principal certo.",
          en: "First contact identifies the legal area and updates Postgres values via switch, routes to the right main agent.",
        },
      },
      {
        icon: "refresh",
        title: {
          pt: "Prompts dinâmicos (Google Sheets)",
          en: "Dynamic prompts (Google Sheets)",
        },
        description: {
          pt: "System prompt extraído de planilhas conforme área e estágio do caso, adaptação sem redeploy.",
          en: "System prompt pulled from spreadsheets by area and case stage, adaptation without redeploy.",
        },
      },
      {
        icon: "search",
        title: {
          pt: "Base vetorizada por área",
          en: "Per-area vector knowledge base",
        },
        description: {
          pt: "Busca em pgvector por área jurídica, complementada por fontes externas confiáveis (preferencialmente governamentais).",
          en: "pgvector search by legal area, complemented by trusted external sources (preferably government sites).",
        },
      },
      {
        icon: "bell",
        title: {
          pt: "Etiquetas CRM automáticas",
          en: "Automatic CRM labels",
        },
        description: {
          pt: "HTTP API do Chatwoot aplica etiquetas (área, qualificado, ia-atendimento) para o time humano filtrar e assumir casos.",
          en: "Chatwoot HTTP API applies labels (area, qualified, ai-support) so the human team can filter and take over cases.",
        },
      },
      {
        icon: "spark",
        title: {
          pt: "Notas privadas (briefing)",
          en: "Private notes (briefing)",
        },
        description: {
          pt: "Relatório estruturado anexado à conversa, invisível ao cliente. O advogado assume com contexto, pendências e viabilidade.",
          en: "Structured report attached to the conversation, invisible to the client. The lawyer takes over with context, pending items, and feasibility.",
        },
      },
      {
        icon: "image",
        title: {
          pt: "ZapSign + Drive por cliente",
          en: "ZapSign + Drive per client",
        },
        description: {
          pt: "Documentos assinados e mídias da conversa organizados automaticamente em pasta exclusiva no Google Drive, com distribuição equilibrada de advogados por área e carga.",
          en: "Signed documents and conversation media automatically organized in a dedicated Google Drive folder, with balanced lawyer assignment by area and workload.",
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
        category: {
          pt: "Inteligência Artificial",
          en: "Artificial Intelligence",
        },
        items: ["OpenAI (chat, transcrição, visão, embeddings)"],
      },
      {
        category: { pt: "CRM & Canais", en: "CRM & Channels" },
        items: ["Chatwoot", "WhatsApp Business API (oficial)"],
      },
      {
        category: { pt: "APIs & Integrações", en: "APIs & Integrations" },
        items: [
          "HTTP Chatwoot",
          "Google Sheets",
          "Google Drive",
          "ZapSign",
        ],
      },
      {
        category: { pt: "Dados", en: "Data" },
        items: [
          "Postgres (memória, switch de área, leads)",
          "pgvector (KB por área)",
          "Redis (buffer)",
        ],
      },
    ],
    results: [
      {
        pt: "Triagem automática por área jurídica antes do atendimento aprofundado.",
        en: "Automatic triage by legal area before in-depth support.",
      },
      {
        pt: "Dois agentes cooperando com contexto único. A transição do recepcionista ao principal é imperceptível para o cliente.",
        en: "Two agents cooperating with shared context. The receptionist-to-main handoff is imperceptible to the client.",
      },
      {
        pt: "Advogados recebem conversas qualificadas com etiquetas e nota/briefing prontos no CRM.",
        en: "Lawyers receive qualified conversations with labels and ready briefings in the CRM.",
      },
      {
        pt: "Distribuição equilibrada de casos entre advogados por área de atuação e carga de atendimentos.",
        en: "Balanced case distribution among lawyers by practice area and active workload.",
      },
      {
        pt: "Documentos e mídias organizados por cliente no Drive, sem fricção para quem conversa.",
        en: "Documents and media organized per client in Drive, with no friction for the person chatting.",
      },
      {
        pt: "Atendimento contínuo, empático e multimodal, texto, áudio e documento.",
        en: "Continuous, empathetic, multimodal support, text, audio, and documents.",
      },
    ],
    flow: [
      {
        id: "cliente",
        label: {
          pt: "Cliente (WhatsApp oficial)",
          en: "Client (Official WhatsApp)",
        },
        kind: "io",
      },
      {
        id: "zapi",
        label: { pt: "Chatwoot / Webhook", en: "Chatwoot / Webhook" },
        kind: "io",
      },
      {
        id: "buffer",
        label: {
          pt: "Buffer + cadastro (Postgres)",
          en: "Buffer + registration (Postgres)",
        },
        kind: "process",
      },
      {
        id: "pre",
        label: {
          pt: "Transcrição + Visão + PDF",
          en: "Transcription + Vision + PDF",
        },
        kind: "process",
      },
      {
        id: "agente",
        label: {
          pt: "Agente IA (recepcionista + principal)",
          en: "AI Agent (receptionist + main)",
        },
        kind: "core",
      },
      {
        id: "memoria",
        label: { pt: "Memória compartilhada", en: "Shared memory" },
        kind: "data",
      },
      {
        id: "notion",
        label: {
          pt: "Google Sheets (prompts dinâmicos)",
          en: "Google Sheets (dynamic prompts)",
        },
        kind: "io",
      },
      {
        id: "sync",
        label: {
          pt: "Router / triagem de área",
          en: "Router / area triage",
        },
        kind: "process",
      },
      {
        id: "kb",
        label: {
          pt: "Base vetorizada por área",
          en: "Per-area vector KB",
        },
        kind: "data",
      },
      {
        id: "tools",
        label: {
          pt: "Etiqueta / nota / advogado / ZapSign",
          en: "Label / note / lawyer / ZapSign",
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
    slug: "mirra-maison-atendimento-ia",
    title: {
      pt: "Atendimento IA no WhatsApp, Mirra & Maison",
      en: "AI WhatsApp Support, Mirra & Maison",
    },
    summary: {
      pt: "Agente humanizado que ouve áudio, lê imagens e responde no WhatsApp como uma pessoa real, construído do zero em 2 meses.",
      en: "Human-like agent that listens to audio, reads images, and replies on WhatsApp like a real person, built from scratch in 2 months.",
    },
    description: {
      pt: "Sistema completo de atendimento profissional no WhatsApp para a Mirra & Maison: recebe texto, áudio, imagem, vídeo e documentos, com memória por conversa, base de conhecimento vetorizada sincronizada em tempo real via Notion e Supabase, e roteamento inteligente de distribuidores.",
      en: "Full professional WhatsApp support system for Mirra & Maison: handles text, audio, images, video, and documents, with per-conversation memory, vector knowledge base synced in real time via Notion and Supabase, and smart distributor routing.",
    },
    tags: [
      "n8n",
      "ZAPI",
      "OpenAI",
      "Supabase",
      "Notion",
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
      pt: "Construí um agente de IA orquestrado no n8n, hospedado em infraestrutura própria (Hetzner + Docker), integrado ao WhatsApp via ZAPI. O sistema agrupa mensagens em blocos de contexto, processa áudio e imagem com OpenAI, consulta uma base vetorizada no Supabase e aciona tools para alertar humanos ou encaminhar leads a distribuidores regionais, tudo com comportamento humanizado na conversa. A equipe da Mirra & Maison atualiza produtos, distribuidores e conteúdo direto no Notion; configurei a API do Notion para disparar webhooks que sincronizam o Supabase em tempo real, garantindo que a IA sempre consulte dados atualizados.",
      en: "I built an AI agent orchestrated in n8n, hosted on dedicated infrastructure (Hetzner + Docker), integrated with WhatsApp via ZAPI. The system groups messages into context blocks, processes audio and images with OpenAI, queries a vector base in Supabase, and triggers tools to alert humans or route leads to regional distributors, all with humanized conversation behavior. The Mirra & Maison team updates products, distributors, and content directly in Notion; I configured the Notion API to fire webhooks that sync Supabase in real time, ensuring the AI always queries up-to-date data.",
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
          pt: "Engenharia de prompt aplicada a situações reais, respostas dinâmicas, não roteiros fixos de robô.",
          en: "Prompt engineering applied to real situations, dynamic replies, not fixed robot scripts.",
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
          pt: "Busca em base de conhecimento específica da empresa (cosméticos) no Supabase com embeddings OpenAI, alimentada em tempo real pelo Notion, complementada por pesquisas externas quando necessário.",
          en: "Searches company-specific knowledge (cosmetics) in Supabase with OpenAI embeddings, fed in real time from Notion, complemented by external research when needed.",
        },
      },
      {
        icon: "refresh",
        title: { pt: "Notion e Supabase em tempo real", en: "Real-time Notion and Supabase sync" },
        description: {
          pt: "A empresa edita produtos, distribuidores e informações no Notion; webhooks via API disparam fluxos no n8n que atualizam o Supabase automaticamente. A IA consulta sempre dados frescos, sem deploy manual.",
          en: "The company edits products, distributors, and information in Notion; API webhooks trigger n8n flows that update Supabase automatically. The AI always queries fresh data, with no manual deploy.",
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
        items: ["ZAPI (WhatsApp)", "Notion API (webhooks)", "HTTP Requests"],
      },
      {
        category: { pt: "Dados", en: "Data" },
        items: ["Postgres", "Supabase (pgvector)", "Notion (fonte editorial)", "Redis"],
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
        pt: "Base de conhecimento sempre atualizada: alterações no Notion refletem no Supabase em tempo real para a IA.",
        en: "Knowledge base always up to date: Notion changes reflect in Supabase in real time for the AI.",
      },
      {
        pt: "Escalonamento para humanos apenas quando as regras de negócio exigem. O restante fica com a IA.",
        en: "Escalation to humans only when business rules require it. Everything else stays with the AI.",
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
        id: "notion",
        label: {
          pt: "Notion (fonte editorial)",
          en: "Notion (editorial source)",
        },
        kind: "io",
      },
      {
        id: "sync",
        label: {
          pt: "Webhook e sync Supabase",
          en: "Webhook and Supabase sync",
        },
        kind: "process",
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
];

export const certificates: Certificate[] = [
  {
    year: 2025,
    since: "2025-07",
    course: {
      pt: "Integrante, estudante e ativo na comunidade",
      en: "Member, student, and active in the community",
    },
    institution: "ibe.IA (Comunidade Sem Codar)",
    highlight: true,
    description: {
      pt: "Atuo profissionalmente na área de automações e IA, aplicando na prática o que aprendo na plataforma e contribuindo ativamente na comunidade desde julho de 2025.",
      en: "I work professionally in automations and AI, applying what I learn on the platform in practice and contributing actively to the community since July 2025.",
    },
  },
  {
    year: 2021,
    course: {
      pt: "Sistemas de Informação, 2 anos de fundamentos",
      en: "Information Systems, 2 years of fundamentals",
    },
    institution: "Faculdade",
    description: {
      pt: "Dois anos de formação em lógica de programação, banco de dados e engenharia de software que hoje sustentam meu trabalho prático. Continuo aplicando e aprofundando esse conhecimento em projetos reais e na comunidade ibe.IA.",
      en: "Two years of training in programming logic, databases, and software engineering that now support my hands-on work. I keep applying and deepening that foundation through real projects and the ibe.IA community.",
    },
  },
];

export const achievement: Achievement = {
  slug: "placa-5d-ibe-ia",
  badge: "5D",
  institution: "ibe.IA",
  title: {
    pt: "Placa 5D ibe.IA",
    en: "ibe.IA 5D Plaque",
  },
  subtitle: {
    pt: "Primeiro marco de faturamento comprovado",
    en: "First verified revenue milestone",
  },
  context: {
    pt: "A ibe.IA reconhece integrantes que comprovam faturamentos acima de 5, 6 e 7 dígitos aplicando o que aprendem na plataforma e com estudos adjacentes da mesma área. Conquistei a placa de 5 dígitos, meu primeiro passo depois de muitos projetos, madrugadas viradas e muito esforço. A meta sempre será o próximo passo.",
    en: "ibe.IA recognizes members who prove revenue above 5, 6, and 7 figures by applying what they learn on the platform and adjacent studies in the same field. I earned the 5-figure plaque, my first step after many projects, late nights, and hard work. The goal is always the next step.",
  },
  story: {
    pt: "Cada projeto entregue, cada fluxo no ar e cada cliente atendido somaram até esse reconhecimento físico. Não é só um troféu: é prova de que o caminho prático funciona quando você insiste.",
    en: "Every delivered project, every live flow, and every client served added up to this physical recognition. It is not just a trophy: it proves the practical path works when you persist.",
  },
};

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
    value: 1,
    label: { pt: "Placa 5D ibe.IA", en: "ibe.IA 5D plaque" },
  },
  {
    value: 3,
    suffix: "+",
    label: { pt: "Anos com automação & IA", en: "Years in automation & AI" },
  },
];

export const tools: Tool[] = [
  { name: "n8n", icon: "n8n" },
  { name: "Supabase", icon: "supabase" },
  { name: "Claude", icon: "claude" },
  { name: "OpenAI", icon: "openai" },
  { name: "Google Drive", icon: "google-drive" },
  { name: "Google Sheets", icon: "google-sheets" },
  { name: "Google Calendar", icon: "google-calendar" },
  { name: "Hetzner", icon: "hetzner" },
  { name: "Python", icon: "python" },
  { name: "JavaScript", icon: "javascript" },
  { name: "Cursor", icon: "cursor" },
  { name: "Lovable", icon: "lovable" },
  { name: "React", icon: "react" },
  { name: "Next.js", icon: "nextjs" },
  { name: "TypeScript", icon: "typescript" },
  { name: "Tailwind CSS", icon: "tailwind" },
  { name: "HTML & CSS", icon: "html-css" },
  { name: "Postgres", icon: "postgres" },
  { name: "pgvector", icon: "pgvector" },
  { name: "Termius", icon: "termius" },
  { name: "Portainer", icon: "portainer" },
];
