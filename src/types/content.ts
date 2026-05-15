export interface Testimonial {
  id: string;
  clientName: string;
  authorName: string;
  authorRole: string;
  date: string;
  projectContext: string;
  quote: string;
  logoPath: string | null;
  logoTextClass?: string;
  accent: 'blue' | 'teal';
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

export interface InsightSlot {
  id: string;
  pillar: 'technical' | 'market' | 'founder';
  pillarLabel: string;
  accent: 'blue' | 'teal';
  authorName: string;
  authorRole: string;
  authorInitials: string;
  authorPhotoPath: string | null;
  status: 'coming-soon' | 'published';
  title?: string;
  excerpt?: string;
  date?: string;
  readTime?: string;
  slug?: string;
}

export interface Engineer {
  id: string;
  name: string;
  title: string;
  roleTag: string;
  accent: 'blue' | 'teal';
  bio: string;
  initials: string;
  photoPath: string | null;
}

export interface CertificationDetail {
  label: string;
  value: string;
}

export interface Certification {
  id: string;
  categoryTag: string;
  accent: 'blue' | 'teal';
  title: string;
  statement: string;
  details: CertificationDetail[];
  logoPath?: string | null;
  markInitials?: string;
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

export interface FeaturedMetric {
  value: string;
  label: string;
}

export interface FeaturedCaseStudy {
  id: string;
  slug: string;
  sectorEyebrow: string;
  client: string;
  subtitle: string;
  description: string;
  metrics: FeaturedMetric[];
  queueMetric: string;
}

export interface RichCaseStudyImage {
  src: string;
  alt: string;
  caption?: string;
}

export interface RichCaseStudySpec {
  label: string;
  value: string;
}

export interface RichCaseStudySection {
  label: string;
  items: string[];
}

export interface RichCaseStudyEquipmentRow {
  section: string;
  quantity: string;
}

export interface RichCaseStudyEquipment {
  title: string;
  rows: RichCaseStudyEquipmentRow[];
}

export interface RichCaseStudyDataPoint {
  label: string;
  value: string;
}

export interface RichCaseStudy {
  slug: string;
  pillarId?: 'process' | 'machines' | 'training';
  client: string;
  sectorEyebrow: string;
  title: string;
  subtitle?: string;
  year?: string;
  application?: string;
  intro: string;
  partnerLine?: string;
  metrics?: FeaturedMetric[];
  spec?: RichCaseStudySpec[];
  sections?: RichCaseStudySection[];
  equipment?: RichCaseStudyEquipment;
  highlights?: string[];
  dataHandled?: RichCaseStudyDataPoint[];
  heroImage?: RichCaseStudyImage;
  architectureImage?: RichCaseStudyImage;
  galleryImages?: RichCaseStudyImage[];
  draft?: boolean;
}

