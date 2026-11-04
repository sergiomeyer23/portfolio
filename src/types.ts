export type Lang = "br" | "en";

/** Textos da interface por idioma. A chave vem do atributo data-i18n. */
export type CopyDict = Record<string, string>;

export type ProjectArea = "data" | "software" | "oss";

export interface Project {
  title: string;
  titleEn: string;
  category: string;
  categoryEn: string;
  description: string;
  descriptionEn: string;
  result: string;
  resultEn: string;
  technologies: string[];
  repository: string;
  areas: ProjectArea[];
  flow: string[];
  flowEn?: string[];
  featured?: boolean;
  ci?: string;
  live?: string;
}

export interface Service {
  icon: string;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  items: string[];
  itemsEn: string[];
}

export interface CaseStudy {
  title: string;
  titleEn: string;
  challenge: string;
  challengeEn: string;
  approach: string;
  approachEn: string;
  result: string;
  resultEn: string;
  technologies: string[];
}

export interface DagBudget {
  id: string;
  name: string;
  p99: string;
  throughput: string;
}

/** API que script.ts publica para engineering.ts e terminal.ts. */
export interface PortfolioApi {
  getLanguage: () => Lang;
  projects: Project[];
  skills: string[];
  escapeHtml: (value: unknown) => string;
  downloadResume: (version: string) => void;
  showToast: (message: string) => void;
  dagBudgets?: () => DagBudget[];
}

declare global {
  interface Window {
    portfolio: PortfolioApi;
  }

  interface DocumentEventMap {
    "portfolio:languagechange": CustomEvent<{ language: Lang }>;
    "portfolio:toggle-terminal": CustomEvent<void>;
  }
}
