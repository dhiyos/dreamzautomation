import { featuredCaseStudies } from '@/data/featuredCaseStudies';
import { itemCaseStudies, solutions } from '@/data/solutions';
import { richCaseStudies, richCaseStudiesBySlug } from '@/data/caseStudiesRich';
import type {
  ArchitectureDiagram,
  FeaturedCaseStudy,
  ItemCaseStudy,
  RichCaseStudy,
  SolutionPillar,
} from '@/types/content';

export type UnifiedCaseStudy = {
  slug: string;
  source: 'featured' | 'item' | 'rich';
  client: string;
  sectorEyebrow: string;
  subtitle?: string;
  description: string;
  metrics: { value: string; label: string }[];
  pillarId?: string;
  pillarLabel?: string;
  industryItemId?: string;
  industryItemName?: string;
  heroImage?: { src: string; alt: string };
  hasArchitecture?: boolean;
  architecture?: ArchitectureDiagram;
};

const findPillarForItem = (
  itemId: string,
): { pillar: SolutionPillar; itemName: string } | null => {
  for (const pillar of solutions) {
    const item = pillar.items.find((i) => i.id === itemId);
    if (item) return { pillar, itemName: item.name };
  }
  return null;
};

// Legacy featured entries don't carry pillar or solution-item metadata.
// Map them here so the CaseStudies index can group everything under both a
// pillar and the specific solution vertical from the homepage.
interface LegacyOverride {
  pillarId: 'process' | 'machines' | 'training';
  solutionItemId: string;
}

const LEGACY_OVERRIDES: Record<string, LegacyOverride> = {
  'hero-motocorp-gurgaon': { pillarId: 'machines', solutionItemId: 'conveyor-paint' },
  'motherson-mate-manesar': { pillarId: 'machines', solutionItemId: 'conveyor-paint' },
};

const pillarLabelFor = (
  pillarId: 'process' | 'machines' | 'training' | undefined,
): string | undefined => {
  if (!pillarId) return undefined;
  return solutions.find((p) => p.id === pillarId)?.category;
};

const itemNameFor = (
  pillarId: 'process' | 'machines' | 'training' | undefined,
  itemId: string | undefined,
): string | undefined => {
  if (!pillarId || !itemId) return undefined;
  const pillar = solutions.find((p) => p.id === pillarId);
  return pillar?.items.find((i) => i.id === itemId)?.name;
};

const fromFeatured = (cs: FeaturedCaseStudy): UnifiedCaseStudy => {
  const override = LEGACY_OVERRIDES[cs.slug];
  return {
    slug: cs.slug,
    source: 'featured',
    client: cs.client,
    sectorEyebrow: cs.sectorEyebrow,
    subtitle: cs.subtitle,
    description: cs.description,
    metrics: cs.metrics,
    pillarId: override?.pillarId,
    pillarLabel: pillarLabelFor(override?.pillarId),
    industryItemId: override?.solutionItemId,
    industryItemName: itemNameFor(override?.pillarId, override?.solutionItemId),
  };
};

const fromItem = (
  itemKey: string,
  cs: ItemCaseStudy,
): UnifiedCaseStudy => {
  const pillarMatch = findPillarForItem(itemKey);
  return {
    slug: cs.id,
    source: 'item',
    client: cs.client,
    sectorEyebrow: cs.sector,
    description: cs.description,
    metrics: [{ value: cs.metricValue, label: cs.metricLabel }],
    pillarId: pillarMatch?.pillar.id,
    pillarLabel: pillarMatch?.pillar.category,
    industryItemId: itemKey,
    industryItemName: pillarMatch?.itemName,
  };
};

const fromRich = (rich: RichCaseStudy): UnifiedCaseStudy => ({
  slug: rich.slug,
  source: 'rich',
  client: rich.client,
  sectorEyebrow: rich.sectorEyebrow,
  subtitle: rich.subtitle ?? rich.title,
  description: rich.valueHeadline ?? rich.intro,
  metrics: rich.metrics ?? [],
  pillarId: rich.pillarId,
  pillarLabel: pillarLabelFor(rich.pillarId),
  industryItemId: rich.solutionItemId,
  industryItemName: itemNameFor(rich.pillarId, rich.solutionItemId),
  heroImage: rich.heroImage
    ? { src: rich.heroImage.src, alt: rich.heroImage.alt }
    : undefined,
  hasArchitecture: !!rich.architecture,
  architecture: rich.architecture,
});

export const allCaseStudies = (): UnifiedCaseStudy[] => {
  const richMap = richCaseStudiesBySlug();
  const featuredSlugs = new Set(featuredCaseStudies.map((cs) => cs.slug));
  const rich = richCaseStudies.map(fromRich);
  const featured = featuredCaseStudies
    .filter((cs) => !richMap.has(cs.slug))
    .map(fromFeatured);
  // items lose to both rich and featured on slug collision
  const items = Object.entries(itemCaseStudies)
    .filter(([, cs]) => !richMap.has(cs.id) && !featuredSlugs.has(cs.id))
    .map(([itemKey, cs]) => fromItem(itemKey, cs));
  return [...rich, ...featured, ...items];
};

export const findCaseStudyBySlug = (slug: string): UnifiedCaseStudy | null => {
  return allCaseStudies().find((cs) => cs.slug === slug) ?? null;
};

export const findRichCaseStudyBySlug = (slug: string): RichCaseStudy | null => {
  return richCaseStudiesBySlug().get(slug) ?? null;
};

export const featuredCaseStudiesUnified = (): UnifiedCaseStudy[] => {
  const richMap = richCaseStudiesBySlug();
  // Promote rich entries that ship as the featured headline projects, then
  // fall back to legacy featuredCaseStudies entries that don't have a rich
  // counterpart.
  const promotedSlugs = ['dmrc-metro-line-3', 'uflex-bopp', 'iocl-mathura'];
  const promoted = promotedSlugs
    .map((slug) => richMap.get(slug))
    .filter((r): r is RichCaseStudy => Boolean(r))
    .map(fromRich);
  const legacy = featuredCaseStudies
    .filter((cs) => !richMap.has(cs.slug) && !promotedSlugs.includes(cs.slug))
    .map(fromFeatured);
  return [...promoted, ...legacy].slice(0, 3);
};

export interface PillarCaseStudies {
  pillarId: 'process' | 'machines' | 'training';
  pillarCategory: string;
  pillarTitle: string;
  pillarAccent: 'blue' | 'teal' | 'amber';
  caseStudies: UnifiedCaseStudy[];
}

export interface ItemCaseStudies {
  itemId: string;
  itemName: string;
  caseStudies: UnifiedCaseStudy[];
}

export interface PillarWithItems {
  pillarId: 'process' | 'machines' | 'training';
  pillarCategory: string;
  pillarTitle: string;
  pillarBlurb: string;
  pillarAccent: 'blue' | 'teal' | 'amber';
  items: ItemCaseStudies[];
}

export const caseStudiesByPillar = (): PillarCaseStudies[] => {
  const all = allCaseStudies();
  return solutions
    .map((pillar) => ({
      pillarId: pillar.id as 'process' | 'machines' | 'training',
      pillarCategory: pillar.category,
      pillarTitle: pillar.title,
      pillarAccent: pillar.accent,
      caseStudies: all.filter((cs) => cs.pillarId === pillar.id),
    }))
    .filter((group) => group.caseStudies.length > 0);
};

export const caseStudiesByPillarAndItem = (): PillarWithItems[] => {
  const all = allCaseStudies();
  return solutions
    .map((pillar) => {
      const items = pillar.items
        .map((item) => ({
          itemId: item.id,
          itemName: item.name,
          caseStudies: all.filter(
            (cs) => cs.pillarId === pillar.id && cs.industryItemId === item.id,
          ),
        }))
        .filter((entry) => entry.caseStudies.length > 0);
      return {
        pillarId: pillar.id as 'process' | 'machines' | 'training',
        pillarCategory: pillar.category,
        pillarTitle: pillar.title,
        pillarBlurb: pillar.blurb,
        pillarAccent: pillar.accent,
        items,
      };
    })
    .filter((group) => group.items.length > 0);
};

export const itemCaseStudiesUnified = (): UnifiedCaseStudy[] => {
  const richMap = richCaseStudiesBySlug();
  // Include rich entries that are NOT promoted to featured, plus old itemCaseStudies
  // for any solution-item slugs that don't have a rich version yet.
  const featuredSlugs = new Set(featuredCaseStudiesUnified().map((cs) => cs.slug));
  const additionalRich = richCaseStudies
    .filter((r) => !featuredSlugs.has(r.slug))
    .map(fromRich);
  const legacyItems = Object.entries(itemCaseStudies)
    .filter(([, cs]) => !richMap.has(cs.id) && !featuredSlugs.has(cs.id))
    .map(([itemKey, cs]) => fromItem(itemKey, cs));
  return [...additionalRich, ...legacyItems];
};
