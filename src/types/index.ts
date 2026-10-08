export type Language = 'en' | 'fr' | 'ar';

export interface Project {
  id: string;
  title: string;
  description: {
    en: string;
    fr: string;
    ar: string;
  };
  longDescription?: {
    en: string;
    fr: string;
    ar: string;
  };
  technologies: string[];
  image: string;
  category: 'web' | 'desktop' | 'ml' | 'government';
  demoUrl?: string;
  githubUrl?: string;
  featured?: boolean;
  metrics?: string;
  highlights?: {
    en: string[];
    fr: string[];
    ar: string[];
  };
}

export interface Skill {
  name: string;
  category: 'frontend' | 'backend' | 'database' | 'infrastructure' | 'tools';
  level: number; // 0 to 100
  levelLabel: {
    en: string;
    fr: string;
    ar: string;
  };
  description: {
    en: string;
    fr: string;
    ar: string;
  };
  iconName: string;
  color: string;
}

export interface Experience {
  id: string;
  role: {
    en: string;
    fr: string;
    ar: string;
  };
  organization: string;
  location: string;
  period: {
    en: string;
    fr: string;
    ar: string;
  };
  isCurrent?: boolean;
  featured?: boolean;
  tasks: {
    en: string[];
    fr: string[];
    ar: string[];
  };
  technologies: string[];
  links?: { name: string; url: string }[];
}

export interface EducationItem {
  id: string;
  degree: {
    en: string;
    fr: string;
    ar: string;
  };
  institution: string;
  period: string;
  details?: {
    en: string;
    fr: string;
    ar: string;
  };
}

export interface ServiceItem {
  id: string;
  iconName: string;
  title: {
    en: string;
    fr: string;
    ar: string;
  };
  description: {
    en: string;
    fr: string;
    ar: string;
  };
  features: {
    en: string[];
    fr: string[];
    ar: string[];
  };
}

export interface PersonalInfo {
  name: {
    latin: string;
    arabic: string;
  };
  title: {
    en: string;
    fr: string;
    ar: string;
  };
  subtitle: {
    en: string;
    fr: string;
    ar: string;
  };
  email: string;
  phone: string;
  whatsapp: string;
  location: {
    en: string;
    fr: string;
    ar: string;
  };
  driverLicense: string;
  languages: {
    name: { en: string; fr: string; ar: string };
    level: string;
  }[];
  socials: {
    github: string;
    linkedin: string;
    email: string;
    whatsapp: string;
    phone: string;
  };
  stats: {
    yearsExperience: number;
    technologiesCount: number;
    projectsCompleted: number;
    satisfactionRate: number;
  };
}
