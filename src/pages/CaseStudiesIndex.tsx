import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link, useSearchParams } from 'react-router-dom';
import Nav from '@/components/Nav';
import Footer from '@/components/sections/Footer';
import CtaStrip from '@/components/sections/CtaStrip';
import { allCaseStudies, type UnifiedCaseStudy } from '@/lib/caseStudies';
import { fadeUp, stagger, useEntrance } from '@/lib/motion';
import SEO from '@/components/shared/SEO';

type PillarFilter = 'all' | 'process' | 'machines' | 'training';

const FONT_HEAD: Record<string, string> = {};
const FONT_BODY: Record<string, string> = {};

const PILLAR_OPTIONS: { id: PillarFilter; label: string }[] = [
  { id: 'all', label: 'All Sectors' },
  { id: 'process', label: 'Process' },
  { id: 'machines', label: 'Machines' },
  { id: 'training', label: 'Training' },
];

const FEATURED_SLUG = 'dmrc-metro-line-3';

const FeatureCard = ({ cs }: { cs: UnifiedCaseStudy }) => {
  const heroMetric = cs.metrics?.[0];
  return (
    <Link
      to={`/case-studies/${cs.slug}`}
      className="group block bg-[hsl(var(--bg-secondary))] rounded-sm overflow-hidden border border-[hsl(var(--bg-tertiary))]/60 hover:border-[hsl(var(--accent-blue))] transition-all"
    >
      <div className="grid md:grid-cols-2">
        <div className="aspect-video md:aspect-auto bg-[hsl(var(--bg-tertiary))]/40 relative overflow-hidden min-h-[280px]">
          {cs.heroImage ? (
            <img
              src={cs.heroImage.src}
              alt={cs.heroImage.alt}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover opacity-50 grayscale group-hover:grayscale-0 group-hover:opacity-90 transition-all duration-700"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-[10rem] text-[hsl(var(--bg-tertiary))]/60 font-light leading-none" style={FONT_HEAD}>
                {cs.client.charAt(0)}
              </span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[hsl(var(--bg-secondary))]/40 pointer-events-none" />
        </div>
        <div className="p-8 lg:p-12 flex flex-col justify-center">
          <div className="text-[hsl(var(--accent-blue-hover))] text-[10px] font-semibold tracking-[0.25em] uppercase mb-5">
            Featured · {cs.sectorEyebrow}
          </div>
          <h2 className="text-3xl md:text-4xl mb-3 text-white leading-tight" style={FONT_HEAD}>
            {cs.client}
          </h2>
          <p className="text-lg text-slate-300 mb-8 leading-snug">{cs.description}</p>
          {heroMetric ? (
            <div className="mb-8">
              <span
                className="block text-4xl text-[hsl(var(--accent-blue-hover))] font-light mb-1 leading-none"
                style={FONT_HEAD}
              >
                {heroMetric.value}
              </span>
              <span className="text-[10px] uppercase tracking-[0.25em] text-slate-500">
                {heroMetric.label}
              </span>
            </div>
          ) : null}
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-[hsl(var(--accent-blue-hover))] group-hover:text-white transition-colors">
            View Case Study
            <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
};

const ProjectCard = ({ cs }: { cs: UnifiedCaseStudy }) => {
  const heroMetric = cs.metrics?.[0];
  return (
    <motion.li variants={fadeUp} className="group">
      <Link
        to={`/case-studies/${cs.slug}`}
        className="flex flex-col h-full bg-[hsl(var(--bg-secondary))] p-8 rounded-sm border border-[hsl(var(--bg-tertiary))]/60 hover:border-[hsl(var(--accent-blue))] transition-all"
      >
        <div className="text-[hsl(var(--accent-blue-hover))] text-[10px] font-semibold tracking-[0.25em] uppercase mb-5">
          {cs.sectorEyebrow}
        </div>
        <h3 className="text-2xl mb-3 text-white leading-tight" style={FONT_HEAD}>
          {cs.client}
        </h3>
        <p className="text-base text-slate-300/90 mb-8 leading-snug flex-grow">
          {cs.description}
        </p>
        {heroMetric ? (
          <div className="mb-6">
            <span
              className="block text-3xl text-[hsl(var(--accent-blue-hover))] font-light mb-1 leading-none"
              style={FONT_HEAD}
            >
              {heroMetric.value}
            </span>
            <span className="text-[10px] uppercase tracking-[0.25em] text-slate-500">
              {heroMetric.label}
            </span>
          </div>
        ) : null}
        <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.25em] text-[hsl(var(--accent-blue-hover))] group-hover:text-white transition-colors">
          Read
          <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </span>
      </Link>
    </motion.li>
  );
};

const CaseStudiesIndex = () => {
  const entrance = useEntrance();
  const all = useMemo(() => allCaseStudies(), []);
  const [params, setParams] = useSearchParams();
  const activePillar = (params.get('pillar') as PillarFilter) ?? 'all';

  const setPillar = (pillar: PillarFilter) => {
    if (pillar === 'all') params.delete('pillar');
    else params.set('pillar', pillar);
    setParams(params, { replace: true });
  };

  const filtered = useMemo(() => {
    if (activePillar === 'all') return all;
    return all.filter((cs) => cs.pillarId === activePillar);
  }, [all, activePillar]);

  const featured = useMemo(() => {
    const pinned = filtered.find((cs) => cs.slug === FEATURED_SLUG);
    if (pinned) return pinned;
    return filtered.find((cs) => cs.source === 'rich') ?? filtered[0] ?? null;
  }, [filtered]);

  const rest = useMemo(
    () => (featured ? filtered.filter((cs) => cs.slug !== featured.slug) : filtered),
    [filtered, featured],
  );

  return (
    <div className="min-h-screen bg-[hsl(var(--bg-primary))]">
      <SEO
        title="Case Studies — Industrial Automation Projects in India"
        description="Selected commissioned projects across DCS, PLC, SCADA, and machine automation — IOCL Mathura, DMRC Metro, UFlex BOPP, and more."
        path="/case-studies"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@300;400;500;600&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&display=swap"
        rel="stylesheet"
      />
      <Nav />
      <main className="text-slate-200" style={FONT_BODY}>
        {/* HERO */}
        <header className="pt-32 pb-20 px-6 sm:px-12 lg:px-24">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-px bg-[hsl(var(--accent-blue))]" />
              <span className="text-[hsl(var(--accent-blue-hover))] text-xs font-semibold uppercase tracking-[0.25em]">
                Selected Work
              </span>
            </div>
            <h1
              className="text-5xl md:text-7xl leading-tight mb-8 text-white"
              style={FONT_HEAD}
            >
              Plants that{' '}
              <span className="italic font-normal text-slate-400">have to work</span> —
              <br />
              every shift, every day.
            </h1>
            <p className="max-w-xl text-lg text-slate-400 leading-relaxed">
              Twenty-one years of commissioned projects, each one accountable to a number.
            </p>
          </div>
        </header>

        {/* FILTER NAV */}
        <nav className="px-6 sm:px-12 lg:px-24">
          <div className="max-w-6xl mx-auto flex flex-wrap items-end gap-8 border-b border-[hsl(var(--bg-tertiary))] pb-6 mb-12">
            {PILLAR_OPTIONS.map((opt) => {
              const active = activePillar === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setPillar(opt.id)}
                  className={`pb-1 text-sm font-medium tracking-wide transition-colors border-b-2 -mb-[25px] ${
                    active
                      ? 'text-[hsl(var(--accent-blue-hover))] border-[hsl(var(--accent-blue))]'
                      : 'text-slate-500 border-transparent hover:text-white'
                  }`}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        </nav>

        {/* GRID */}
        <section className="px-6 sm:px-12 lg:px-24 pb-24">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
            {featured ? (
              <motion.div className="lg:col-span-12" {...entrance} variants={fadeUp}>
                <FeatureCard cs={featured} />
              </motion.div>
            ) : null}

            {rest.length > 0 ? (
              <motion.ul
                key={activePillar}
                className="lg:col-span-12 grid grid-cols-1 md:grid-cols-2 gap-8 list-none p-0 m-0"
                {...entrance}
                variants={stagger(0.06)}
              >
                {rest.map((cs) => (
                  <ProjectCard key={cs.slug} cs={cs} />
                ))}
              </motion.ul>
            ) : (
              <p className="lg:col-span-12 text-slate-500 italic text-center py-10">
                No additional projects in this view.
              </p>
            )}
          </div>
        </section>

        <CtaStrip />
      </main>
      <Footer />
    </div>
  );
};

export default CaseStudiesIndex;
