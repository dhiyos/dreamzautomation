import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link, useSearchParams } from 'react-router-dom';
import Nav from '@/components/Nav';
import Footer from '@/components/sections/Footer';
import CtaStrip from '@/components/sections/CtaStrip';
import PageHero from '@/components/shared/PageHero';
import SectionShell from '@/components/shared/SectionShell';
import MiniArchitecture from '@/components/shared/MiniArchitecture';
import { allCaseStudies, type UnifiedCaseStudy } from '@/lib/caseStudies';
import { richCaseStudies } from '@/data/caseStudiesRich';
import { solutions } from '@/data/solutions';
import { fadeUp, stagger, useEntrance } from '@/lib/motion';
import SEO from '@/components/shared/SEO';

type PillarFilter = 'all' | 'process' | 'machines' | 'training';

const PILLAR_OPTIONS: { id: PillarFilter; label: string; accent?: 'blue' | 'teal' | 'amber' }[] = [
  { id: 'all', label: 'All Projects' },
  { id: 'process', label: 'Process', accent: 'blue' },
  { id: 'machines', label: 'Machines', accent: 'teal' },
  { id: 'training', label: 'Training', accent: 'amber' },
];

const FEATURED_SLUG = 'dmrc-metro-line-3';

const accentForPillar = (pillarId?: string): 'blue' | 'teal' | 'amber' => {
  const p = solutions.find((s) => s.id === pillarId);
  return p?.accent ?? 'blue';
};

const FeatureBand = ({ cs }: { cs: UnifiedCaseStudy }) => {
  const accent = accentForPillar(cs.pillarId);
  const rich = richCaseStudies.find((r) => r.slug === cs.slug);
  const heroMetric = cs.metrics?.[0];
  return (
    <Link to={`/case-studies/${cs.slug}`} className={`cs-mag-feature cs-mag-accent-${accent}`}>
      <div className="cs-mag-feature-glow" aria-hidden="true" />
      <div className="cs-mag-feature-grid">
        <div className="cs-mag-feature-text">
          <div className="cs-mag-tag">
            <span className={`cs-mag-tag-dot cs-mag-tag-dot-${accent}`} aria-hidden="true" />
            <span className="cs-mag-tag-label">Featured</span>
            <span className="cs-mag-tag-sep" aria-hidden="true">·</span>
            <span className="cs-mag-tag-sector">{cs.sectorEyebrow}</span>
          </div>

          <h2 className="cs-mag-feature-headline">{cs.description}</h2>

          {cs.metrics && cs.metrics.length > 0 ? (
            <ul className="cs-mag-feature-metrics">
              {cs.metrics.slice(0, 3).map((m, idx) => (
                <li key={idx} className="cs-mag-feature-metric">
                  <span className="cs-mag-feature-metric-value">{m.value}</span>
                  <span className="cs-mag-feature-metric-label">{m.label}</span>
                </li>
              ))}
            </ul>
          ) : null}

          <div className="cs-mag-feature-foot">
            <div className="cs-mag-feature-client">
              <span>{cs.client}</span>
              {rich?.partnerLine ? (
                <span className="cs-mag-feature-partner"> · {rich.partnerLine}</span>
              ) : null}
            </div>
            <span className="cs-mag-feature-cta">
              Read full case study <span aria-hidden="true">→</span>
            </span>
          </div>
        </div>

        <div className="cs-mag-feature-visual">
          {cs.architecture ? (
            <MiniArchitecture diagram={cs.architecture} className="cs-mag-feature-mini" />
          ) : heroMetric ? (
            <div className={`cs-mag-feature-numeral cs-mag-numeral-${accent}`}>
              <span className="cs-mag-feature-numeral-value">{heroMetric.value}</span>
              <span className="cs-mag-feature-numeral-label">{heroMetric.label}</span>
            </div>
          ) : null}
        </div>
      </div>
    </Link>
  );
};

const ProjectCard = ({ cs }: { cs: UnifiedCaseStudy }) => {
  const accent = accentForPillar(cs.pillarId);
  const heroMetric = cs.metrics?.[0];
  const supporting = (cs.metrics ?? []).slice(1, 3);
  return (
    <motion.li
      className={`cs-mag-card cs-mag-accent-${accent}`}
      variants={fadeUp}
    >
      <Link to={`/case-studies/${cs.slug}`} className="cs-mag-card-link">
        <div className="cs-mag-card-top">
          {heroMetric ? (
            <div className={`cs-mag-card-numeral cs-mag-numeral-${accent}`}>
              <span className="cs-mag-card-numeral-value">{heroMetric.value}</span>
              <span className="cs-mag-card-numeral-label">{heroMetric.label}</span>
            </div>
          ) : (
            <div className="cs-mag-card-numeral cs-mag-card-numeral-empty" aria-hidden="true">
              <span className="cs-mag-card-numeral-value">·</span>
            </div>
          )}
        </div>

        <div className="cs-mag-card-body">
          <div className="cs-mag-tag cs-mag-tag-small">
            <span className={`cs-mag-tag-dot cs-mag-tag-dot-${accent}`} aria-hidden="true" />
            <span className="cs-mag-tag-label">{cs.pillarLabel ?? '—'}</span>
            <span className="cs-mag-tag-sep" aria-hidden="true">·</span>
            <span className="cs-mag-tag-sector">
              {cs.industryItemName ?? cs.sectorEyebrow}
            </span>
          </div>

          <h3 className="cs-mag-card-client">{cs.client}</h3>
          <p className="cs-mag-card-headline">{cs.description}</p>

          {supporting.length > 0 ? (
            <ul className="cs-mag-card-supporting">
              {supporting.map((m, idx) => (
                <li key={idx} className="cs-mag-card-supp">
                  <span className="cs-mag-card-supp-value">{m.value}</span>
                  <span className="cs-mag-card-supp-label">{m.label}</span>
                </li>
              ))}
            </ul>
          ) : null}

          <span className="cs-mag-card-cta">
            Read <span aria-hidden="true">→</span>
          </span>
        </div>
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

  const counts = useMemo(() => {
    const c: Record<PillarFilter, number> = { all: all.length, process: 0, machines: 0, training: 0 };
    for (const cs of all) {
      if (cs.pillarId === 'process') c.process += 1;
      else if (cs.pillarId === 'machines') c.machines += 1;
      else if (cs.pillarId === 'training') c.training += 1;
    }
    return c;
  }, [all]);

  return (
    <div className="min-h-screen bg-bg-primary">
      <SEO
        title="Case Studies — Industrial Automation Projects in India"
        description="Selected commissioned projects across DCS, PLC, SCADA, and machine automation — IOCL Mathura, DMRC Metro, UFlex BOPP, and more."
        path="/case-studies"
      />
      <Nav />
      <main>
        <PageHero
          eyebrow="Selected Work"
          headingId="case-studies-page-heading"
          heading={
            <>
              Plants that{' '}
              <span className="page-hero-heading-accent">
                have to work — every shift, every day.
              </span>
            </>
          }
          descriptor="Twenty-one years of commissioned projects, each one accountable to a number."
        />

        {featured ? (
          <SectionShell background="primary" headingId="cs-mag-feature-section">
            <h2 id="cs-mag-feature-section" className="sr-only">Featured case study</h2>
            <motion.div {...entrance} variants={fadeUp}>
              <FeatureBand cs={featured} />
            </motion.div>
          </SectionShell>
        ) : null}

        <SectionShell background="secondary" headingId="cs-mag-grid-heading">
          <div className="cs-mag-toolbar">
            <h2 id="cs-mag-grid-heading" className="cs-mag-grid-heading">
              More projects
            </h2>
            <div className="cs-mag-chips" role="tablist" aria-label="Filter case studies by pillar">
              {PILLAR_OPTIONS.map((opt) => {
                const active = activePillar === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setPillar(opt.id)}
                    className={`cs-mag-chip${active ? ' cs-mag-chip-active' : ''}${
                      opt.accent ? ` cs-mag-chip-${opt.accent}` : ''
                    }`}
                  >
                    <span>{opt.label}</span>
                    <span className="cs-mag-chip-count">{counts[opt.id]}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {rest.length === 0 ? (
            <p className="cs-mag-empty">No additional projects in this view.</p>
          ) : (
            <motion.ul
              key={activePillar}
              className="cs-mag-grid"
              {...entrance}
              variants={stagger(0.06)}
            >
              {rest.map((cs) => (
                <ProjectCard key={cs.slug} cs={cs} />
              ))}
            </motion.ul>
          )}
        </SectionShell>

        <CtaStrip />
      </main>
      <Footer />
    </div>
  );
};

export default CaseStudiesIndex;
