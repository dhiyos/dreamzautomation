import { featuredCaseStudies } from '@/data/featuredCaseStudies';
import { itemCaseStudies, solutions } from '@/data/solutions';
import type { FeaturedCaseStudy, ItemCaseStudy, SolutionPillar } from '@/types/content';

export type UnifiedCaseStudy = {
  slug: string;
  source: 'featured' | 'item';
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

export const allCaseStudies = (): UnifiedCaseStudy[] => {
  const featured = featuredCaseStudies.map(fromFeatured);
  const items = Object.entries(itemCaseStudies).map(([itemKey, cs]) =>
    fromItem(itemKey, cs),
  );
  return [...featured, ...items];
};

export const findCaseStudyBySlug = (slug: string): UnifiedCaseStudy | null => {
  return allCaseStudies().find((cs) => cs.slug === slug) ?? null;
};

export const featuredCaseStudiesUnified = (): UnifiedCaseStudy[] =>
  featuredCaseStudies.map(fromFeatured);

export const itemCaseStudiesUnified = (): UnifiedCaseStudy[] =>
  Object.entries(itemCaseStudies).map(([itemKey, cs]) => fromItem(itemKey, cs));
