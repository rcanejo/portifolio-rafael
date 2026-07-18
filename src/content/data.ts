import type { Certificate, Project, Service, Stat } from "./types";

// PLACEHOLDER — substituir na Fase 6 com conteúdo real de Rafael

export const projects: Project[] = [
  {
    slug: "atendimento-whatsapp-ia",
    title: {
      pt: "Atendimento WhatsApp com IA",
      en: "AI-Powered WhatsApp Support",
    },
    summary: {
      pt: "Agente de atendimento multiplataforma com triagem automática e handoff humano.",
      en: "Multi-platform support agent with automatic triage and human handoff.",
    },
    description: {
      pt: "Fluxo completo de atendimento no WhatsApp integrado a CRM, com respostas contextuais via IA e escalonamento inteligente para operadores.",
      en: "Full WhatsApp support flow integrated with CRM, contextual AI replies, and smart escalation to human operators.",
    },
    tags: ["n8n", "WhatsApp API", "IA", "CRM"],
    featured: true,
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
