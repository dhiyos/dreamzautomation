import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Nav from '@/components/Nav';
import Footer from '@/components/sections/Footer';
import CtaStrip from '@/components/sections/CtaStrip';
import PageHero from '@/components/shared/PageHero';
import SectionShell from '@/components/shared/SectionShell';
import SectionHeader from '@/components/shared/SectionHeader';
import {
  featuredCaseStudiesUnified,
  itemCaseStudiesUnified,
} from '@/lib/caseStudies';
import { fadeUp, stagger, useEntrance } from '@/lib/motion';

const CaseStudiesIndex = () => {
  const entrance = useEntrance();
  const featured = featuredCaseStudiesUnified();
  const more = itemCaseStudiesUnified();

  return (
    <div className="min-h-screen bg-bg-primary">
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
          descriptor="Twenty-one years of commissioned projects across petrochemicals, converting, automotive, food, and transportation. A small selection here — the installed base is wider, ask us about the work that sits closest to your line."
        />

        <SectionShell background="primary" headingId="case-studies-featured-heading">
          <motion.div {...entrance} variants={fadeUp}>
            <SectionHeader
              eyebrow="Featured Projects"
              eyebrowVariant="teal"
              heading="Projects we are happy to walk you through."
              headingId="case-studies-featured-heading"
              descriptor="Three engagements that show the range — transit-grade SCADA, a 40+ PLC IT-OT integration on a moving automotive line, and an end-to-end traceability rollout."
              layout="split"
              className="mb-14"
            />
          </motion.div>

          <motion.ul
            className="cs-featured-grid"
            {...entrance}
            variants={stagger(0.1)}
          >
            {featured.map((cs) => (
              <motion.li key={cs.slug} className="cs-featured-card" variants={fadeUp}>
                <Link to={`/case-studies/${cs.slug}`} className="cs-featured-link">
                  <div className="cs-card-eyebrow">{cs.sectorEyebrow}</div>
                  <h3 className="cs-card-client">{cs.client}</h3>
                  {cs.subtitle ? (
                    <p className="cs-card-subtitle">{cs.subtitle}</p>
                  ) : null}
                  <p className="cs-card-description">{cs.description}</p>
                  <ul className="cs-card-metrics">
                    {cs.metrics.map((m, idx) => (
                      <li key={idx} className="cs-card-metric">
                        <span className="cs-card-metric-value">{m.value}</span>
                        <span className="cs-card-metric-label">{m.label}</span>
                      </li>
                    ))}
                  </ul>
                  <span className="cs-card-readmore">Read the full project →</span>
                </Link>
              </motion.li>
            ))}
          </motion.ul>
        </SectionShell>

        <SectionShell background="secondary" headingId="case-studies-more-heading">
          <motion.div {...entrance} variants={fadeUp}>
            <SectionHeader
              eyebrow="More Work"
              eyebrowVariant="blue"
              heading="From the wider installed base."
              headingId="case-studies-more-heading"
              descriptor="A cross-section of the work that sits inside the solutions catalogue — process safety, line conversions, line-level upgrades, and traceability rollouts."
              layout="split"
              className="mb-14"
            />
          </motion.div>

          <motion.ul className="cs-grid" {...entrance} variants={stagger(0.06)}>
            {more.map((cs) => (
              <motion.li key={cs.slug} className="cs-card" variants={fadeUp}>
                <Link to={`/case-studies/${cs.slug}`} className="cs-card-link">
                  <div className="cs-card-eyebrow">{cs.sectorEyebrow}</div>
                  <h3 className="cs-card-client cs-card-client-sm">{cs.client}</h3>
                  <p className="cs-card-description cs-card-description-sm">
                    {cs.description}
                  </p>
                  <div className="cs-card-metrics-row">
                    {cs.metrics.map((m, idx) => (
                      <span key={idx} className="cs-card-metric-inline">
                        <strong>{m.value}</strong>
                        <span> {m.label}</span>
                      </span>
                    ))}
                  </div>
                  <span className="cs-card-readmore cs-card-readmore-sm">
                    Read project →
                  </span>
                </Link>
              </motion.li>
            ))}
          </motion.ul>
        </SectionShell>

        <CtaStrip />
      </main>
      <Footer />
    </div>
  );
};

export default CaseStudiesIndex;
