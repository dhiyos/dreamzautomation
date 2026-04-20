export interface Testimonial {
  id: string;
  quote: string;
  clientName: string;
  projectDescription: string;
  accent?: 'blue' | 'teal';
}

export interface CaseStudy {
  id: string;
  slug: string;
  client: string;
  sector: string;
  title: string;
  summary: string;
  metrics: { label: string; value: string }[];
  featured?: boolean;
}

export interface SolutionItem {
  id: string;
  name: string;
}

export interface SolutionPillar {
  id: string;
  number: string;
  category: string;
  title: string;
  blurb: string;
  accent: 'blue' | 'teal' | 'amber';
  items: SolutionItem[];
}

export interface ItemCaseStudy {
  id: string;
  client: string;
  sector: string;
  metricValue: string;
  metricLabel: string;
  description: string;
  totalInCategory?: number;
}

export interface ProcessBullet {
  title: string;
  context: string;
}

export interface ProcessStage {
  id: string;
  number: string;
  eyebrow: string;
  title: string;
  description: string;
  colour: 'deep-blue' | 'electric-blue' | 'teal' | 'muted-teal';
  bullets: ProcessBullet[];
}

export interface Industry {
  id: string;
  name: string;
  slug: string;
  description: string;
}

export interface ProductFeature {
  id: string;
  category: string;
  title: string;
  description: string;
  accent: 'blue' | 'teal';
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  authorRole: string;
  date: string;
  readTime: string;
  category: 'technical' | 'market' | 'founder';
}

export interface Engineer {
  id: string;
  name: string;
  title: string;
  bio: string;
  email: string;
  featured: boolean;
  photoPath?: string;
}

export interface Certification {
  id: string;
  title: string;
  subtitle: string;
  validUntil: string;
  logoPath?: string;
}

export interface ClientLogo {
  id: string;
  name: string;
  displayAs: 'text' | 'image';
  textClass?: string;
  imagePath?: string;
}

export interface FooterColumn {
  title: string;
  links: { label: string; href: string }[];
}
