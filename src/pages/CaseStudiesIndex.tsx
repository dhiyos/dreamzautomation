import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Nav from '@/components/Nav';
import Footer from '@/components/sections/Footer';
import CtaStrip from '@/components/sections/CtaStrip';
import PageHero from '@/components/shared/PageHero';
import SectionShell from '@/components/shared/SectionShell';
import SectionHeader from '@/components/shared/SectionHeader';
import { caseStudiesByPillarAndItem } from '@/lib/caseStudies';
import { fadeUp, stagger, useEntrance } from '@/lib/motion';
import SEO from '@/components/shared/SEO';

const CaseStudiesIndex = () => {
  const entrance = useEntrance();
  const pillars = caseStudiesByPillarAndItem();

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
          descriptor="Twenty-one years of commissioned projects, organised the way we organise the firm — by Solutions pillar, then by the specific vertical the work sits in. Click any project to read the full case study."
        />

        {pillars.map((pillar, pIdx) => {
          const headingId = `cs-pillar-${pillar.pillarId}-heading`;
          return (
            <SectionShell
              key={pillar.pillarId}
              background={pIdx % 2 === 0 ? 'primary' : 'secondary'}
              headingId={headingId}
            >
              <motion.div {...entrance} variants={fadeUp}>
                <SectionHeader
                  eyebrow={pillar.pillarCategory}
                  eyebrowVariant={pillar.pillarAccent}
                  heading={pillar.pillarTitle}
                  headingId={headingId}
                  descriptor={pillar.pillarBlurb}
                  layout="split"
                  className="mb-12"
                />
              </motion.div>

              <div className="cs-item-stack">
                {pillar.items.map((item, iIdx) => (
                  <motion.section
                    key={item.itemId}
                    className="cs-item-block"
                    aria-labelledby={`cs-item-${item.itemId}-heading`}
                    {...entrance}
                    variants={fadeUp}
                  >
                    <header className="cs-item-header">
                      <span className="cs-item-number">
                        {String(iIdx + 1).padStart(2, '0')}
                      </span>
                      <h3
                        id={`cs-item-${item.itemId}-heading`}
                        className="cs-item-name"
                      >
                        {item.itemName}
                      </h3>
                      <span className="cs-item-count">
                        {item.caseStudies.length}{' '}
                        {item.caseStudies.length === 1 ? 'project' : 'projects'}
                      </span>
                    </header>

                    <motion.ul
                      className="cs-grid"
                      {...entrance}
                      variants={stagger(0.08)}
                    >
                      {item.caseStudies.map((cs) => (
                        <motion.li
                          key={cs.slug}
                          className="cs-card"
                          variants={fadeUp}
                        >
                          <Link
                            to={`/case-studies/${cs.slug}`}
                            className="cs-card-link"
                          >
                            <div className="cs-card-eyebrow">
                              {cs.sectorEyebrow}
                            </div>
                            <h4 className="cs-card-client cs-card-client-sm">
                              {cs.client}
                            </h4>
                            {cs.subtitle ? (
                              <p className="cs-card-subtitle">{cs.subtitle}</p>
                            ) : null}
                            <p className="cs-card-description cs-card-description-sm">
                              {cs.description}
                            </p>
                            {cs.metrics && cs.metrics.length > 0 ? (
                              <div className="cs-card-metrics-row">
                                {cs.metrics.slice(0, 3).map((m, mIdx) => (
                                  <span
                                    key={mIdx}
                                    className="cs-card-metric-inline"
                                  >
                                    <strong>{m.value}</strong>
                                    <span> {m.label}</span>
                                  </span>
                                ))}
                              </div>
                            ) : null}
                            <span className="cs-card-readmore cs-card-readmore-sm">
                              Read project →
                            </span>
                          </Link>
                        </motion.li>
                      ))}
                    </motion.ul>
                  </motion.section>
                ))}
              </div>
            </SectionShell>
          );
        })}

        <CtaStrip />
      </main>
      <Footer />
    </div>
  );
};

export default CaseStudiesIndex;
