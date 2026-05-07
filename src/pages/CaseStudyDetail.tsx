import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import Nav from '@/components/Nav';
import Footer from '@/components/sections/Footer';
import CtaStrip from '@/components/sections/CtaStrip';
import SectionShell from '@/components/shared/SectionShell';
import NotFound from './NotFound';
import { allCaseStudies, findCaseStudyBySlug } from '@/lib/caseStudies';
import { fadeUp, useEntrance } from '@/lib/motion';

const CaseStudyDetail = () => {
  const { slug = '' } = useParams();
  const cs = findCaseStudyBySlug(slug);
  const entrance = useEntrance();

  if (!cs) {
    return <NotFound />;
  }

  const related = allCaseStudies()
    .filter((c) => c.slug !== cs.slug)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-bg-primary">
      <Nav />
      <main>
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
          <motion.div
            className="cs-detail-body"
            {...entrance}
            variants={fadeUp}
          >
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
