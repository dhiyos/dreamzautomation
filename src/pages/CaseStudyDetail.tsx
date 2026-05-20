import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import Nav from '@/components/Nav';
import Footer from '@/components/sections/Footer';
import CtaStrip from '@/components/sections/CtaStrip';
import NotFound from './NotFound';
import {
  allCaseStudies,
  findCaseStudyBySlug,
  findRichCaseStudyBySlug,
  type UnifiedCaseStudy,
} from '@/lib/caseStudies';
import type { RichCaseStudy } from '@/types/content';
import { fadeUp, useEntrance } from '@/lib/motion';
import SEO from '@/components/shared/SEO';
import CaseStudyArchitecture from '@/components/shared/CaseStudyArchitecture';

const FONT_HEAD = { fontFamily: "'Libre Baskerville', Georgia, serif" } as const;
const FONT_BODY = { fontFamily: "'IBM Plex Sans', system-ui, sans-serif" } as const;

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <h2
    className="text-[11px] uppercase tracking-[0.3em] text-[hsl(var(--accent-blue-hover))] font-semibold mb-6"
    style={FONT_BODY}
  >
    {children}
  </h2>
);

const SectionH3 = ({ children }: { children: React.ReactNode }) => (
  <h3 className="text-2xl md:text-3xl text-white mb-5 leading-snug" style={FONT_HEAD}>
    {children}
  </h3>
);

type Metric = { value: string; label: string };

interface EditorialProps {
  eyebrow: string;
  client: string;
  deck: string;
  metrics: Metric[];
  heroImage?: { src: string; alt: string; caption?: string };
  overview?: string;
  challengeIntro?: string;
  painPoints?: string[];
  workIntro?: string;
  workSections?: { label: string; items: string[] }[];
  beforeAfter?: RichCaseStudy['beforeAfter'];
  outcomeIntro?: string;
  benefits?: string[];
  dataHandled?: { label: string; value: string }[];
  equipment?: RichCaseStudy['equipment'];
  architecture?: RichCaseStudy['architecture'];
  architectureImage?: RichCaseStudy['architectureImage'];
  galleryImages?: { src: string; alt: string; caption?: string }[];
  projectFacts?: { label: string; value: string }[];
  year?: string;
  application?: string;
  partnerLine?: string;
  pullQuote?: string;
  nextCase?: { slug: string; client: string; sectorEyebrow: string } | null;
}

const EditorialDetail = (p: EditorialProps) => {
  const entrance = useEntrance();
  const hasSidebar =
    !!p.equipment ||
    (p.projectFacts && p.projectFacts.length > 0) ||
    !!p.year ||
    !!p.application ||
    !!p.partnerLine ||
    !!p.nextCase;

  return (
    <div className="bg-[hsl(var(--bg-primary))] text-slate-200 pt-28 pb-24 px-6 sm:px-12 lg:px-24" style={FONT_BODY}>
      <div className="max-w-5xl mx-auto">
        {/* Breadcrumb */}
        <nav className="mb-12">
          <Link
            to="/case-studies"
            className="text-[hsl(var(--accent-blue-hover))] hover:text-white text-[11px] tracking-[0.25em] uppercase inline-flex items-center gap-2 group transition-colors"
          >
            <svg className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            All Case Studies
          </Link>
        </nav>

        {/* Header */}
        <motion.header className="mb-14" {...entrance} variants={fadeUp}>
          <div className="flex flex-wrap items-center gap-3 text-[hsl(var(--accent-blue-hover))]/70 uppercase tracking-[0.25em] text-[10px] font-semibold mb-7">
            {p.eyebrow.split('·').map((part, i, arr) => (
              <span key={i} className="flex items-center gap-3">
                <span>{part.trim()}</span>
                {i < arr.length - 1 && <span className="w-1 h-1 bg-[hsl(var(--accent-blue))]/60 rounded-full" />}
              </span>
            ))}
          </div>

          <h1
            className="text-5xl md:text-7xl text-white mb-8 leading-[1.05]"
            style={FONT_HEAD}
          >
            {p.client}
          </h1>

          <p className="text-xl md:text-2xl text-slate-400 leading-relaxed font-light max-w-3xl">
            {p.deck}
          </p>
        </motion.header>

        {/* Hero Image */}
        {p.heroImage ? (
          <motion.figure
            className="relative aspect-[16/9] w-full overflow-hidden bg-[hsl(var(--bg-secondary))] rounded-sm mb-16"
            {...entrance}
            variants={fadeUp}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--bg-primary))] via-transparent to-transparent opacity-60 z-10 pointer-events-none" />
            <img
              src={p.heroImage.src}
              alt={p.heroImage.alt}
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </motion.figure>
        ) : null}

        {/* KPI Strip */}
        {p.metrics.length > 0 ? (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-0 mb-20 border-y border-[hsl(var(--bg-tertiary))]/60 py-10"
            {...entrance}
            variants={fadeUp}
          >
            {p.metrics.slice(0, 3).map((m, idx) => (
              <div
                key={idx}
                className={`px-2 py-6 md:py-0 md:px-10 ${
                  idx === 1 ? 'border-y md:border-y-0 md:border-x border-[hsl(var(--bg-tertiary))]/60' : ''
                }`}
              >
                <div
                  className="text-4xl md:text-5xl text-[hsl(var(--accent-blue-hover))] font-light mb-2 leading-none"
                  style={FONT_HEAD}
                >
                  {m.value}
                </div>
                <div className="text-[10px] uppercase tracking-[0.3em] text-slate-500 font-semibold">
                  {m.label}
                </div>
              </div>
            ))}
          </motion.div>
        ) : null}

        {/* Main 12-col grid */}
        <div className={`grid grid-cols-1 ${hasSidebar ? 'lg:grid-cols-12' : ''} gap-16`}>
          <div className={hasSidebar ? 'lg:col-span-8 space-y-16' : 'space-y-16'}>
            {p.overview ? (
              <motion.section {...entrance} variants={fadeUp}>
                <SectionLabel>Project Overview</SectionLabel>
                <p className="text-lg text-slate-300 leading-relaxed">{p.overview}</p>
              </motion.section>
            ) : null}

            {(p.challengeIntro || (p.painPoints && p.painPoints.length > 0)) ? (
              <motion.section
                className="bg-[hsl(var(--bg-secondary))]/40 p-8 md:p-12 border-l-2 border-[hsl(var(--accent-blue))]/60"
                {...entrance}
                variants={fadeUp}
              >
                <SectionLabel>The Challenge</SectionLabel>
                {p.challengeIntro ? (
                  <p className="text-slate-300 leading-relaxed mb-5">{p.challengeIntro}</p>
                ) : null}
                {p.painPoints && p.painPoints.length > 0 ? (
                  <ul className="space-y-3 mt-4">
                    {p.painPoints.map((pp, i) => (
                      <li key={i} className="flex gap-3 text-slate-300 leading-relaxed">
                        <span className="text-[hsl(var(--accent-blue))] mt-2 w-1.5 h-1.5 bg-[hsl(var(--accent-blue))] rounded-full shrink-0" />
                        <span>{pp}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </motion.section>
            ) : null}

            {(p.workIntro || (p.workSections && p.workSections.length > 0) || p.beforeAfter) ? (
              <motion.section {...entrance} variants={fadeUp}>
                <SectionLabel>The Approach</SectionLabel>
                {p.workIntro ? (
                  <p className="text-lg text-slate-300 leading-relaxed mb-8">{p.workIntro}</p>
                ) : null}

                {p.beforeAfter ? (
                  <div className="grid md:grid-cols-2 gap-6 mt-6">
                    <div className="border border-[hsl(var(--bg-tertiary))]/60 p-6">
                      <div className="text-[10px] uppercase tracking-[0.25em] text-slate-500 font-semibold mb-4">
                        {p.beforeAfter.beforeLabel}
                      </div>
                      <dl className="space-y-3">
                        {p.beforeAfter.before.map((s, idx) => (
                          <div key={idx}>
                            <dt className="text-[11px] uppercase tracking-wider text-slate-500">
                              {s.label}
                            </dt>
                            <dd className="text-slate-200">{s.value}</dd>
                          </div>
                        ))}
                      </dl>
                    </div>
                    <div className="border border-[hsl(var(--accent-blue))]/40 p-6 bg-[hsl(var(--bg-secondary))]/40">
                      <div className="text-[10px] uppercase tracking-[0.25em] text-[hsl(var(--accent-blue-hover))] font-semibold mb-4">
                        {p.beforeAfter.afterLabel}
                      </div>
                      <dl className="space-y-3">
                        {p.beforeAfter.after.map((s, idx) => (
                          <div key={idx}>
                            <dt className="text-[11px] uppercase tracking-wider text-[hsl(var(--accent-blue-hover))]/60">
                              {s.label}
                            </dt>
                            <dd className="text-white">{s.value}</dd>
                          </div>
                        ))}
                      </dl>
                    </div>
                  </div>
                ) : null}

                {p.workSections && p.workSections.length > 0 ? (
                  <div className="space-y-8 mt-2">
                    {p.workSections.map((s, idx) => (
                      <div key={idx}>
                        <SectionH3>{s.label}</SectionH3>
                        <ul className="space-y-2.5">
                          {s.items.map((it, i) => (
                            <li key={i} className="flex gap-3 text-slate-300 leading-relaxed">
                              <span className="text-[hsl(var(--accent-blue))] mt-2.5 w-1 h-1 bg-[hsl(var(--accent-blue))] rounded-full shrink-0" />
                              <span>{it}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                ) : null}
              </motion.section>
            ) : null}

            {(p.outcomeIntro || (p.benefits && p.benefits.length > 0)) ? (
              <motion.section {...entrance} variants={fadeUp}>
                <SectionLabel>The Outcome</SectionLabel>
                {p.outcomeIntro ? (
                  <p className="text-lg text-slate-300 leading-relaxed mb-6">{p.outcomeIntro}</p>
                ) : null}
                {p.benefits && p.benefits.length > 0 ? (
                  <ul className="space-y-3">
                    {p.benefits.map((b, i) => (
                      <li key={i} className="flex gap-3 text-slate-300 leading-relaxed">
                        <span className="text-[hsl(var(--accent-blue-hover))] shrink-0">✓</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </motion.section>
            ) : null}

            {p.pullQuote ? (
              <motion.blockquote
                {...entrance}
                variants={fadeUp}
                className="py-10 text-2xl md:text-3xl italic text-white leading-snug border-t border-[hsl(var(--bg-tertiary))]/60"
                style={FONT_HEAD}
              >
                “{p.pullQuote}”
              </motion.blockquote>
            ) : null}

            {p.dataHandled && p.dataHandled.length > 0 ? (
              <motion.section {...entrance} variants={fadeUp}>
                <SectionLabel>At Scale</SectionLabel>
                <dl className="grid grid-cols-2 md:grid-cols-3 gap-px bg-[hsl(var(--bg-tertiary))]/40 border border-[hsl(var(--bg-tertiary))]/40">
                  {p.dataHandled.map((d, idx) => (
                    <div key={idx} className="bg-[hsl(var(--bg-primary))] p-5">
                      <dt className="text-[10px] uppercase tracking-[0.25em] text-slate-500 font-semibold mb-2">
                        {d.label}
                      </dt>
                      <dd className="text-xl text-white" style={FONT_HEAD}>
                        {d.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </motion.section>
            ) : null}
          </div>

          {/* Sidebar */}
          {hasSidebar ? (
            <aside className="lg:col-span-4 space-y-10">
              {(p.year || p.application || p.partnerLine || (p.projectFacts && p.projectFacts.length > 0)) ? (
                <div className="border border-[hsl(var(--bg-tertiary))]/60 p-6 bg-[hsl(var(--bg-secondary))]/30">
                  <h3 className="text-[10px] uppercase tracking-[0.25em] text-[hsl(var(--accent-blue-hover))]/70 font-semibold mb-5">
                    Project Facts
                  </h3>
                  <dl className="space-y-4 text-sm">
                    {p.year ? (
                      <div>
                        <dt className="text-[10px] uppercase tracking-wider text-slate-500">Year</dt>
                        <dd className="text-slate-200">{p.year}</dd>
                      </div>
                    ) : null}
                    {p.application ? (
                      <div>
                        <dt className="text-[10px] uppercase tracking-wider text-slate-500">Application</dt>
                        <dd className="text-slate-200">{p.application}</dd>
                      </div>
                    ) : null}
                    {p.partnerLine ? (
                      <div>
                        <dt className="text-[10px] uppercase tracking-wider text-slate-500">Delivery</dt>
                        <dd className="text-slate-200">{p.partnerLine}</dd>
                      </div>
                    ) : null}
                    {p.projectFacts?.map((f, i) => (
                      <div key={i}>
                        <dt className="text-[10px] uppercase tracking-wider text-slate-500">{f.label}</dt>
                        <dd className="text-slate-200">{f.value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              ) : null}

              {p.equipment ? (
                <div>
                  <h3 className="text-[10px] uppercase tracking-[0.25em] text-[hsl(var(--accent-blue-hover))]/70 font-semibold mb-4">
                    {p.equipment.title}
                  </h3>
                  <ul className="divide-y divide-[hsl(var(--bg-tertiary))]/40 border-y border-[hsl(var(--bg-tertiary))]/40">
                    {p.equipment.rows.map((row, idx) => (
                      <li key={idx} className="flex items-center justify-between gap-4 py-2.5 text-sm">
                        <span className="text-slate-300">{row.section}</span>
                        <span className="text-[hsl(var(--accent-blue-hover))] tabular-nums">{row.quantity}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {p.nextCase ? (
                <Link
                  to={`/case-studies/${p.nextCase.slug}`}
                  className="block bg-[hsl(var(--bg-secondary))]/40 border border-[hsl(var(--bg-tertiary))]/60 p-6 hover:border-[hsl(var(--accent-blue))]/60 transition-colors group"
                >
                  <h3 className="text-[10px] uppercase tracking-[0.25em] text-[hsl(var(--accent-blue-hover))]/70 font-semibold mb-3">
                    Next Case Study
                  </h3>
                  <div className="text-[10px] uppercase tracking-[0.2em] text-slate-500 mb-2">
                    {p.nextCase.sectorEyebrow}
                  </div>
                  <h4 className="text-lg text-white mb-4 group-hover:text-[hsl(var(--accent-blue-hover))] transition-colors" style={FONT_HEAD}>
                    {p.nextCase.client}
                  </h4>
                  <span className="inline-flex items-center gap-2 text-xs text-[hsl(var(--accent-blue-hover))] uppercase tracking-[0.2em]">
                    Read project
                    <svg className="w-3 h-3 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </Link>
              ) : null}
            </aside>
          ) : null}
        </div>

        {/* Architecture */}
        {p.architecture ? (
          <motion.section className="mt-24" {...entrance} variants={fadeUp}>
            <SectionLabel>System Architecture</SectionLabel>
            <CaseStudyArchitecture diagram={p.architecture} />
          </motion.section>
        ) : p.architectureImage ? (
          <motion.section className="mt-24" {...entrance} variants={fadeUp}>
            <SectionLabel>System Architecture</SectionLabel>
            <figure>
              <img
                src={p.architectureImage.src}
                alt={p.architectureImage.alt}
                loading="lazy"
                className="w-full border border-[hsl(var(--bg-tertiary))]/60"
              />
              {p.architectureImage.caption ? (
                <figcaption className="text-xs text-slate-500 mt-3 italic">
                  {p.architectureImage.caption}
                </figcaption>
              ) : null}
            </figure>
          </motion.section>
        ) : null}

        {/* Gallery */}
        {p.galleryImages && p.galleryImages.length > 0 ? (
          <motion.section className="mt-24" {...entrance} variants={fadeUp}>
            <SectionLabel>On-site</SectionLabel>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {p.galleryImages.map((img, idx) => (
                <figure key={idx} className="aspect-square bg-[hsl(var(--bg-secondary))] overflow-hidden">
                  <img
                    src={img.src}
                    alt={img.alt}
                    loading="lazy"
                    className="w-full h-full object-cover grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
                  />
                </figure>
              ))}
            </div>
          </motion.section>
        ) : null}
      </div>
    </div>
  );
};

const toEditorial = (
  rich: RichCaseStudy | null,
  cs: UnifiedCaseStudy | null,
  nextCase: UnifiedCaseStudy | null
): EditorialProps => {
  if (rich) {
    return {
      eyebrow: rich.sectorEyebrow,
      client: rich.client,
      deck: rich.valueHeadline || rich.title,
      metrics: (rich.metrics || []).map((m) => ({ value: m.value, label: m.label })),
      heroImage: rich.heroImage,
      overview: rich.intro,
      challengeIntro: rich.challenge?.intro,
      painPoints: rich.challenge?.painPoints,
      workIntro: rich.workIntro,
      workSections: rich.sections,
      beforeAfter: rich.beforeAfter,
      outcomeIntro: rich.outcome?.intro,
      benefits: rich.outcome?.benefits,
      dataHandled: rich.dataHandled,
      equipment: rich.equipment,
      architecture: rich.architecture,
      architectureImage: rich.architectureImage,
      galleryImages: rich.galleryImages,
      projectFacts: rich.projectFacts,
      year: rich.year,
      application: rich.application,
      partnerLine: rich.partnerLine,
      pullQuote: undefined,
      nextCase: nextCase
        ? { slug: nextCase.slug, client: nextCase.client, sectorEyebrow: nextCase.sectorEyebrow }
        : null,
    };
  }
  return {
    eyebrow: cs!.sectorEyebrow,
    client: cs!.client,
    deck: cs!.subtitle || cs!.description,
    metrics: cs!.metrics,
    overview: cs!.description,
    nextCase: nextCase
      ? { slug: nextCase.slug, client: nextCase.client, sectorEyebrow: nextCase.sectorEyebrow }
      : null,
  };
};

const CaseStudyDetail = () => {
  const { slug = '' } = useParams();
  const rich = findRichCaseStudyBySlug(slug);
  const cs = rich ? null : findCaseStudyBySlug(slug);

  if (!rich && !cs) {
    return <NotFound />;
  }

  const allOthers = allCaseStudies().filter((c) => c.slug !== slug);
  const nextCase = allOthers[0] ?? null;

  const seoTitle = rich
    ? `${rich.client} — ${rich.title}`.slice(0, 70)
    : cs
      ? `${cs.client} — ${cs.sectorEyebrow} | Case Study`.slice(0, 70)
      : 'Case Study';
  const seoDesc = (rich ? rich.intro : cs?.description ?? '').slice(0, 158);

  const props = toEditorial(rich, cs, nextCase);

  return (
    <div className="min-h-screen bg-[hsl(var(--bg-primary))]">
      <SEO
        title={seoTitle}
        description={seoDesc}
        path={`/case-studies/${slug}`}
        ogType="article"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: rich ? rich.title : cs?.client ?? 'Case Study',
          description: seoDesc,
          author: { '@type': 'Organization', name: 'Dreamz Automation Systems Pvt. Ltd.' },
          publisher: { '@type': 'Organization', name: 'Dreamz Automation Systems Pvt. Ltd.' },
          ...(rich?.heroImage ? { image: rich.heroImage.src } : {}),
        }}
      />
      <link
        href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@300;400;500;600&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&display=swap"
        rel="stylesheet"
      />
      <Nav />
      <main>
        <EditorialDetail {...props} />
        <CtaStrip />
      </main>
      <Footer />
    </div>
  );
};

export default CaseStudyDetail;
