// Runs before `vite dev` and `vite build` (predev/prebuild hooks); writes public/sitemap.xml.

import { writeFileSync } from 'fs';
import { resolve } from 'path';

const BASE_URL = 'https://dreamzautomation.lovable.app';

interface SitemapEntry {
  path: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: string;
}

const caseStudySlugs = [
  'iocl-mathura',
  'uflex-bopp',
  'vacmet-bopp',
  'airport-cms',
  'dmrc-metro-line-3',
  'kumarhati-solan-tunnel',
  'hero-motocorp-gurgaon',
  'motherson-mate-manesar',
];

const insightSlugs = [
  'retrofitting-brownfield-coating-iot',
  'oee-signals-coating-machine',
  'edge-vs-cloud-converting-industry',
];

const entries: SitemapEntry[] = [
  { path: '/', changefreq: 'weekly', priority: '1.0' },
  { path: '/about', changefreq: 'monthly', priority: '0.8' },
  { path: '/solutions', changefreq: 'monthly', priority: '0.9' },
  { path: '/industries', changefreq: 'monthly', priority: '0.8' },
  { path: '/case-studies', changefreq: 'weekly', priority: '0.9' },
  { path: '/insights', changefreq: 'weekly', priority: '0.8' },
  ...caseStudySlugs.map((s) => ({
    path: `/case-studies/${s}`,
    changefreq: 'monthly' as const,
    priority: '0.7',
  })),
  ...insightSlugs.map((s) => ({
    path: `/insights/${s}`,
    changefreq: 'monthly' as const,
    priority: '0.6',
  })),
];

function generateSitemap(entries: SitemapEntry[]) {
  const urls = entries.map((e) =>
    [
      `  <url>`,
      `    <loc>${BASE_URL}${e.path}</loc>`,
      e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
      e.priority ? `    <priority>${e.priority}</priority>` : null,
      `  </url>`,
    ]
      .filter(Boolean)
      .join('\n'),
  );

  return [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
    ...urls,
    `</urlset>`,
  ].join('\n');
}

writeFileSync(resolve('public/sitemap.xml'), generateSitemap(entries));
console.log(`sitemap.xml written (${entries.length} entries)`);
