import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import Nav from '@/components/Nav';
import Footer from '@/components/sections/Footer';
import CtaStrip from '@/components/sections/CtaStrip';
import SectionShell from '@/components/shared/SectionShell';
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

const RichDetail = ({ cs }: { cs: RichCaseStudy }) => {
  const entrance = useEntrance();

  const hasChallenge =
    !!cs.challenge && (cs.challenge.intro || (cs.challenge.painPoints?.length ?? 0) > 0);
  const hasWork = !!cs.workIntro || !!cs.beforeAfter || (cs.sections?.length ?? 0) > 0;
  const hasOutcome =
    !!cs.outcome && (cs.outcome.intro || (cs.outcome.benefits?.length ?? 0) > 0);
  const hasSupporting =
    !!cs.architectureImage || (cs.galleryImages?.length ?? 0) > 0 || !!cs.equipment;

  return (
    <>
      {/* ─── HERO ─── */}
      <section className="cs-detail-hero" aria-labelledby="cs-detail-heading">
        <div className="page-container cs-detail-hero-inner">
          <Link to="/case-studies" className="cs-detail-back">
            ← All case studies
          </Link>

          <div className="cs-detail-eyebrow">{cs.sectorEyebrow}</div>
          <h1 id="cs-detail-heading" className="cs-detail-heading">
            {cs.client}
          </h1>

          {cs.valueHeadline ? (
            <p className="cs-detail-value">{cs.valueHeadline}</p>
          ) : (
            <p className="cs-detail-title">{cs.title}</p>
          )}

          {cs.metrics && cs.metrics.length > 0 ? (
            <ul className="cs-detail-metric-row cs-detail-metric-row-outcome">
              {cs.metrics.map((m, idx) => (
                <li key={idx} className="cs-detail-metric">
                  <span className="cs-detail-metric-value">{m.value}</span>
                  <span className="cs-detail-metric-label">{m.label}</span>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </section>

      {/* ─── THE CHALLENGE ─── */}
      {hasChallenge ? (
        <SectionShell background="primary" headingId="cs-challenge-heading">
          <motion.div {...entrance} variants={fadeUp} className="cs-narrative">
            <div className="cs-narrative-marker cs-narrative-marker-amber">
              The Challenge
            </div>
            <h2 id="cs-challenge-heading" className="cs-narrative-heading">
              Where they were.
            </h2>
            {cs.challenge?.intro ? (
              <p className="cs-narrative-lead">{cs.challenge.intro}</p>
            ) : null}
            {(cs.challenge?.painPoints?.length ?? 0) > 0 ? (
              <ul className="cs-pain-list">
                {cs.challenge!.painPoints!.map((p, idx) => (
                  <li key={idx} className="cs-pain-item">
                    {p}
                  </li>
                ))}
              </ul>
            ) : null}
          </motion.div>
        </SectionShell>
      ) : null}

      {/* ─── THE WORK ─── */}
      {hasWork ? (
        <SectionShell background="secondary" headingId="cs-work-heading">
          <motion.div {...entrance} variants={fadeUp} className="cs-narrative">
            <div className="cs-narrative-marker cs-narrative-marker-blue">
              What We Did
            </div>
            <h2 id="cs-work-heading" className="cs-narrative-heading">
              The work delivered.
            </h2>
            {cs.workIntro ? (
              <p className="cs-narrative-lead">{cs.workIntro}</p>
            ) : null}
          </motion.div>

          {cs.beforeAfter ? (
            <motion.div
              className="cs-before-after"
              {...entrance}
              variants={fadeUp}
            >
              <div className="cs-before-after-col cs-before-after-before">
                <div className="cs-before-after-label">
                  {cs.beforeAfter.beforeLabel}
                </div>
                <dl className="cs-before-after-list">
                  {cs.beforeAfter.before.map((s, idx) => (
                    <div key={idx} className="cs-before-after-row">
                      <dt className="cs-before-after-row-label">{s.label}</dt>
                      <dd className="cs-before-after-row-value">{s.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
              <div className="cs-before-after-divider" aria-hidden="true">
                <span className="cs-before-after-divider-text">to</span>
              </div>
              <div className="cs-before-after-col cs-before-after-after">
                <div className="cs-before-after-label">
                  {cs.beforeAfter.afterLabel}
                </div>
                <dl className="cs-before-after-list">
                  {cs.beforeAfter.after.map((s, idx) => (
                    <div key={idx} className="cs-before-after-row">
                      <dt className="cs-before-after-row-label">{s.label}</dt>
                      <dd className="cs-before-after-row-value">{s.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </motion.div>
          ) : null}

          {!cs.beforeAfter && cs.sections && cs.sections.length > 0 ? (
            <div className="cs-rich-sections cs-work-sections">
              {cs.sections.map((section, idx) => (
                <motion.div
                  key={idx}
                  className="cs-rich-section"
                  {...entrance}
                  variants={fadeUp}
                >
                  <h3 className="cs-rich-section-h3">{section.label}</h3>
                  <ul className="cs-rich-bullets">
                    {section.items.map((it, i) => (
                      <li key={i} className="cs-rich-bullet">
                        {it}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          ) : null}
        </SectionShell>
      ) : null}

      {/* ─── THE OUTCOME ─── */}
      {hasOutcome ? (
        <SectionShell background="primary" headingId="cs-outcome-heading">
          <motion.div {...entrance} variants={fadeUp} className="cs-narrative">
            <div className="cs-narrative-marker cs-narrative-marker-teal">
              The Outcome
            </div>
            <h2 id="cs-outcome-heading" className="cs-narrative-heading">
              What changed.
            </h2>
            {cs.outcome?.intro ? (
              <p className="cs-narrative-lead">{cs.outcome.intro}</p>
            ) : null}
            {(cs.outcome?.benefits?.length ?? 0) > 0 ? (
              <ul className="cs-outcome-list">
                {cs.outcome!.benefits!.map((b, idx) => (
                  <li key={idx} className="cs-outcome-item">
                    {b}
                  </li>
                ))}
              </ul>
            ) : null}
          </motion.div>
        </SectionShell>
      ) : null}

      {/* ─── THE NUMBERS (dataHandled) ─── */}
      {cs.dataHandled && cs.dataHandled.length > 0 ? (
        <SectionShell background="secondary" headingId="cs-numbers-heading">
          <motion.div {...entrance} variants={fadeUp}>
            <div className="cs-narrative-marker cs-narrative-marker-blue">
              At Scale
            </div>
            <h2 id="cs-numbers-heading" className="cs-rich-section-h2">
              The numbers under the hood.
            </h2>
            <dl className="cs-rich-data-grid">
              {cs.dataHandled.map((d, idx) => (
                <div key={idx} className="cs-rich-data-cell">
                  <dt className="cs-rich-data-label">{d.label}</dt>
                  <dd className="cs-rich-data-value">{d.value}</dd>
                </div>
              ))}
            </dl>
          </motion.div>
        </SectionShell>
      ) : null}

      {/* ─── SUPPORTING DETAIL (equipment / architecture / gallery) ─── */}
      {hasSupporting ? (
        <SectionShell background="primary" headingId="cs-supporting-heading">
          <h2 id="cs-supporting-heading" className="sr-only">
            Supporting detail
          </h2>
          {cs.equipment ? (
            <motion.div
              {...entrance}
              variants={fadeUp}
              className="cs-supporting-block"
            >
              <h3 className="cs-rich-section-h3">{cs.equipment.title}</h3>
              <div className="cs-rich-equipment-table-wrap">
                <table className="cs-rich-equipment-table">
                  <thead>
                    <tr>
                      <th scope="col" className="cs-rich-equipment-th-num">
                        SN
                      </th>
                      <th scope="col" className="cs-rich-equipment-th-section">
                        Section
                      </th>
                      <th scope="col" className="cs-rich-equipment-th-qty">
                        Qty
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {cs.equipment.rows.map((row, idx) => (
                      <tr key={idx}>
                        <td className="cs-rich-equipment-td-num">{idx + 1}</td>
                        <td className="cs-rich-equipment-td-section">
                          {row.section}
                        </td>
                        <td className="cs-rich-equipment-td-qty">{row.quantity}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          ) : null}

          {cs.architectureImage ? (
            <motion.div
              {...entrance}
              variants={fadeUp}
              className="cs-supporting-block"
            >
              <h3 className="cs-rich-section-h3">System architecture</h3>
              <figure className="cs-rich-architecture-figure">
                <img
                  src={cs.architectureImage.src}
                  alt={cs.architectureImage.alt}
                  className="cs-rich-architecture-img"
                  loading="lazy"
                />
                {cs.architectureImage.caption ? (
                  <figcaption className="cs-rich-figure-caption">
                    {cs.architectureImage.caption}
                  </figcaption>
                ) : null}
              </figure>
            </motion.div>
          ) : null}

          {cs.galleryImages && cs.galleryImages.length > 0 ? (
            <motion.div
              {...entrance}
              variants={fadeUp}
              className="cs-supporting-block"
            >
              <h3 className="cs-rich-section-h3">
                {cs.heroImage ? 'Screens & on-site' : 'On-site'}
              </h3>
              <ul className="cs-rich-gallery">
                {cs.heroImage ? (
                  <li className="cs-rich-gallery-item">
                    <figure>
                      <img
                        src={cs.heroImage.src}
                        alt={cs.heroImage.alt}
                        className="cs-rich-gallery-img"
                        loading="lazy"
                      />
                      {cs.heroImage.caption ? (
                        <figcaption className="cs-rich-figure-caption">
                          {cs.heroImage.caption}
                        </figcaption>
                      ) : null}
                    </figure>
                  </li>
                ) : null}
                {cs.galleryImages.map((img, idx) => (
                  <li key={idx} className="cs-rich-gallery-item">
                    <figure>
                      <img
                        src={img.src}
                        alt={img.alt}
                        className="cs-rich-gallery-img"
                        loading="lazy"
                      />
                      {img.caption ? (
                        <figcaption className="cs-rich-figure-caption">
                          {img.caption}
                        </figcaption>
                      ) : null}
                    </figure>
                  </li>
                ))}
              </ul>
            </motion.div>
          ) : null}
        </SectionShell>
      ) : null}

      {/* ─── PROJECT FACTS ─── */}
      {cs.projectFacts && cs.projectFacts.length > 0 ? (
        <SectionShell background="secondary" headingId="cs-facts-heading">
          <motion.div {...entrance} variants={fadeUp}>
            <h2 id="cs-facts-heading" className="cs-rich-section-h2">
              Project facts.
            </h2>
            <dl className="cs-facts-grid">
              {cs.year ? (
                <div className="cs-facts-cell">
                  <dt className="cs-facts-label">Year</dt>
                  <dd className="cs-facts-value">{cs.year}</dd>
                </div>
              ) : null}
              {cs.application ? (
                <div className="cs-facts-cell">
                  <dt className="cs-facts-label">Application</dt>
                  <dd className="cs-facts-value">{cs.application}</dd>
                </div>
              ) : null}
              {cs.partnerLine ? (
                <div className="cs-facts-cell">
                  <dt className="cs-facts-label">Delivery</dt>
                  <dd className="cs-facts-value">{cs.partnerLine}</dd>
                </div>
              ) : null}
              {cs.projectFacts.map((f, idx) => (
                <div key={idx} className="cs-facts-cell">
                  <dt className="cs-facts-label">{f.label}</dt>
                  <dd className="cs-facts-value">{f.value}</dd>
                </div>
              ))}
            </dl>
          </motion.div>
        </SectionShell>
      ) : null}
    </>
  );
};

const ThinDetail = ({ cs }: { cs: UnifiedCaseStudy }) => {
  const entrance = useEntrance();

  return (
    <>
      <section className="cs-detail-hero" aria-labelledby="cs-detail-heading">
        <div className="page-container cs-detail-hero-inner">
          <Link to="/case-studies" className="cs-detail-back">
            ← All case studies
          </Link>

          <div className="cs-detail-eyebrow">{cs.sectorEyebrow}</div>
          <h1 id="cs-detail-heading" className="cs-detail-heading">
            {cs.client}
          </h1>
          {cs.subtitle ? (
            <p className="cs-detail-subtitle">{cs.subtitle}</p>
          ) : null}

          <ul className="cs-detail-metric-row">
            {cs.metrics.map((m, idx) => (
              <li key={idx} className="cs-detail-metric">
                <span className="cs-detail-metric-value">{m.value}</span>
                <span className="cs-detail-metric-label">{m.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <SectionShell background="primary" headingId="cs-detail-overview-heading">
        <motion.div className="cs-detail-body" {...entrance} variants={fadeUp}>
          <h2 id="cs-detail-overview-heading" className="cs-detail-body-heading">
            Project overview
          </h2>
          <p className="cs-detail-body-lead">{cs.description}</p>
          <p className="cs-detail-body-note">
            Detailed scope, system architecture, and commissioning notes for this
            project are available on request — typically shared during a paid
            assessment or under a mutual NDA.
          </p>
        </motion.div>
      </SectionShell>
    </>
  );
};

const CaseStudyDetail = () => {
  const { slug = '' } = useParams();
  const rich = findRichCaseStudyBySlug(slug);
  const cs = rich ? null : findCaseStudyBySlug(slug);

  if (!rich && !cs) {
    return <NotFound />;
  }

  const allOthers = allCaseStudies().filter((c) => c.slug !== slug);
  const related = allOthers.slice(0, 3);

  const seoTitle = rich
    ? `${rich.client} — ${rich.title}`.slice(0, 70)
    : cs
      ? `${cs!.client} — ${cs!.sectorEyebrow} | Case Study`.slice(0, 70)
      : 'Case Study';
  const seoDesc = (rich ? rich.intro : cs?.description ?? '').slice(0, 158);

  return (
    <div className="min-h-screen bg-bg-primary">
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
          author: {
            '@type': 'Organization',
            name: 'Dreamz Automation Systems Pvt. Ltd.',
          },
          publisher: {
            '@type': 'Organization',
            name: 'Dreamz Automation Systems Pvt. Ltd.',
          },
          ...(rich?.heroImage ? { image: rich.heroImage.src } : {}),
        }}
      />
      <Nav />
      <main>
        {rich ? <RichDetail cs={rich} /> : cs ? <ThinDetail cs={cs} /> : null}

        {related.length > 0 ? (
          <SectionShell background="primary" headingId="cs-detail-related-heading">
            <h2 id="cs-detail-related-heading" className="heading-h2 mb-10">
              More work
            </h2>
            <ul className="cs-detail-related-grid">
              {related.map((r) => (
                <li key={r.slug} className="cs-card">
                  <Link to={`/case-studies/${r.slug}`} className="cs-card-link">
                    <div className="cs-card-eyebrow">{r.sectorEyebrow}</div>
                    <h3 className="cs-card-client cs-card-client-sm">{r.client}</h3>
                    <p className="cs-card-description cs-card-description-sm">
                      {r.description}
                    </p>
                    <span className="cs-card-readmore cs-card-readmore-sm">
                      Read project →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </SectionShell>
        ) : null}

        <CtaStrip />
      </main>
      <Footer />
    </div>
  );
};

export default CaseStudyDetail;
