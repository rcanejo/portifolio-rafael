export type Locale = "pt" | "en";

export type Localized = Record<Locale, string>;

export interface CaseFeature {
  icon: string;
  title: Localized;
  description: Localized;
}

export interface StackGroup {
  category: Localized;
  items: string[];
}

export type FlowKind = "io" | "process" | "core" | "data" | "tool";

export interface FlowStage {
  id: string;
  label: Localized;
  kind: FlowKind;
}

export interface Project {
  slug: string;
  title: Localized;
  summary: Localized;
  description: Localized;
  tags: string[];
  image?: string;
  featured: boolean;
  client?: { name: string; logo?: string };
  role?: Localized;
  duration?: Localized;
  year?: number;
  challenge?: Localized;
  solution?: Localized;
  humanized?: CaseFeature[];
  capabilities?: CaseFeature[];
  stack?: StackGroup[];
  results?: Localized[];
  flow?: FlowStage[];
}

export interface Certificate {
  year: number;
  course: Localized;
  institution: string;
  image?: string;
  highlight?: boolean;
}

export interface Service {
  icon: string;
  title: Localized;
  description: Localized;
}

export interface Stat {
  value: number;
  suffix?: string;
  label: Localized;
}

export interface Dictionary {
  nav: {
    about: string;
    services: string;
    projects: string;
    certificates: string;
    contact: string;
    cv: string;
    whatsapp: string;
  };
  hero: {
    label: string;
    name: string;
    subtitle: string;
    cta: string;
  };
  about: {
    label: string;
    title: string;
    p1: string;
    p2: string;
    ibeHighlight: string;
  };
  services: {
    label: string;
    title: string;
  };
  projects: {
    label: string;
    title: string;
    viewAll: string;
  };
  certificates: {
    label: string;
    title: string;
  };
  contact: {
    label: string;
    title: string;
    subtitle: string;
    name: string;
    email: string;
    message: string;
    send: string;
    sending: string;
    success: string;
    error: string;
    formSoon: string;
    downloadCv: string;
  };
  footer: {
    rights: string;
  };
  cv: {
    title: string;
    subtitle: string;
    experience: string;
    education: string;
    skills: string;
    download: string;
    print: string;
  };
  projectDetail: {
    back: string;
    role: string;
    duration: string;
    year: string;
    challenge: string;
    solution: string;
    architecture: string;
    architectureHint: string;
    humanized: string;
    capabilities: string;
    stack: string;
    results: string;
    cta: string;
  };
}
