import { featuredCaseStudies } from '@/data/featuredCaseStudies';
import { itemCaseStudies, solutions } from '@/data/solutions';
import { richCaseStudies, richCaseStudiesBySlug } from '@/data/caseStudiesRich';
import type {
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

const fromFeatured = (cs: FeaturedCaseStudy): UnifiedCaseStudy => ({
  slug: cs.slug,
  source: 'featured',
  client: cs.client,
  sectorEyebrow: cs.sectorEyebrow,
  subtitle: cs.subtitle,
  description: cs.description,
  metrics: cs.metrics,
});

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
  description: rich.intro,
  metrics: rich.metrics ?? [],
});

export const allCaseStudies = (): UnifiedCaseStudy[] => {
  const richMap = richCaseStudiesBySlug();
  const rich = richCaseStudies.map(fromRich);
  const featured = featuredCaseStudies
    .filter((cs) => !richMap.has(cs.slug))
    .map(fromFeatured);
  const items = Object.entries(itemCaseStudies)
    .filter(([, cs]) => !richMap.has(cs.id))
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
