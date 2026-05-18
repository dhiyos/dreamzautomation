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

const RichDetail = ({ cs }: { cs: RichCaseStudy }) => {
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
          <p className="cs-detail-title">{cs.title}</p>
          {cs.subtitle ? (
            <p className="cs-detail-subtitle">{cs.subtitle}</p>
          ) : null}

          {(cs.year || cs.application || cs.partnerLine) && (
            <div className="cs-detail-stamps">
              {cs.year ? (
                <span className="cs-detail-stamp">
                  <span className="cs-detail-stamp-label">Year</span>
                  <span className="cs-detail-stamp-value">{cs.year}</span>
                </span>
              ) : null}
              {cs.application ? (
                <span className="cs-detail-stamp">
                  <span className="cs-detail-stamp-label">Application</span>
                  <span className="cs-detail-stamp-value">{cs.application}</span>
                </span>
              ) : null}
              {cs.partnerLine ? (
                <span className="cs-detail-stamp">
                  <span className="cs-detail-stamp-label">Delivery</span>
                  <span className="cs-detail-stamp-value">{cs.partnerLine}</span>
                </span>
              ) : null}
            </div>
          )}

          {cs.metrics && cs.metrics.length > 0 ? (
            <ul className="cs-detail-metric-row">
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

      <SectionShell background="primary" headingId="cs-rich-overview-heading">
        <h2 id="cs-rich-overview-heading" className="sr-only">
          Project overview
        </h2>
        <div className="cs-rich-grid">
          <motion.div className="cs-rich-main" {...entrance} variants={fadeUp}>
            <p className="cs-rich-lead">{cs.intro}</p>
          </motion.div>
          {cs.heroImage ? (
            <motion.figure
              className="cs-rich-figure"
              {...entrance}
              variants={fadeUp}
            >
              <img
                src={cs.heroImage.src}
                alt={cs.heroImage.alt}
                className="cs-rich-figure-img"
                loading="lazy"
              />
              {cs.heroImage.caption ? (
                <figcaption className="cs-rich-figure-caption">
                  {cs.heroImage.caption}
                </figcaption>
              ) : null}
            </motion.figure>
          ) : null}
        </div>
      </SectionShell>

      {cs.spec && cs.spec.length > 0 ? (
        <SectionShell background="secondary" headingId="cs-rich-spec-heading">
          <motion.div {...entrance} variants={fadeUp}>
            <h2 id="cs-rich-spec-heading" className="cs-rich-section-h2">
              System specifications
            </h2>
            <dl className="cs-rich-spec-list">
              {cs.spec.map((s, idx) => (
                <div key={idx} className="cs-rich-spec-row">
                  <dt className="cs-rich-spec-label">{s.label}</dt>
                  <dd className="cs-rich-spec-value">{s.value}</dd>
                </div>
              ))}
            </dl>
          </motion.div>
        </SectionShell>
      ) : null}

      {cs.sections && cs.sections.length > 0 ? (
        <SectionShell background="primary" headingId="cs-rich-sections-heading">
          <h2 id="cs-rich-sections-heading" className="sr-only">
            Project detail
          </h2>
          <div className="cs-rich-sections">
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
        </SectionShell>
      ) : null}

      {cs.equipment ? (
        <SectionShell background="secondary" headingId="cs-rich-equipment-heading">
          <motion.div {...entrance} variants={fadeUp}>
            <h2 id="cs-rich-equipment-heading" className="cs-rich-section-h2">
              {cs.equipment.title}
            </h2>
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
        </SectionShell>
      ) : null}

      {cs.dataHandled && cs.dataHandled.length > 0 ? (
        <SectionShell background="primary" headingId="cs-rich-data-heading">
          <motion.div {...entrance} variants={fadeUp}>
            <h2 id="cs-rich-data-heading" className="cs-rich-section-h2">
              Data handled
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

      {cs.architectureImage ? (
        <SectionShell
          background="secondary"
          headingId="cs-rich-architecture-heading"
        >
          <motion.div {...entrance} variants={fadeUp}>
            <h2 id="cs-rich-architecture-heading" className="cs-rich-section-h2">
              System architecture
            </h2>
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
        </SectionShell>
      ) : null}

      {cs.galleryImages && cs.galleryImages.length > 0 ? (
        <SectionShell background="primary" headingId="cs-rich-gallery-heading">
          <motion.div {...entrance} variants={fadeUp}>
            <h2 id="cs-rich-gallery-heading" className="cs-rich-section-h2">
              Screens & on-site
            </h2>
            <ul className="cs-rich-gallery">
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

  return (
    <div className="min-h-screen bg-bg-primary">
      <Nav />
      <main>
        {rich ? <RichDetail cs={rich} /> : cs ? <ThinDetail cs={cs} /> : null}

        {related.length > 0 ? (
          <SectionShell background="secondary" headingId="cs-detail-related-heading">
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
