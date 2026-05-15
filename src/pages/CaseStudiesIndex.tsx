import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Nav from '@/components/Nav';
import Footer from '@/components/sections/Footer';
import CtaStrip from '@/components/sections/CtaStrip';
import PageHero from '@/components/shared/PageHero';
import SectionShell from '@/components/shared/SectionShell';
import SectionHeader from '@/components/shared/SectionHeader';
import { caseStudiesByPillar } from '@/lib/caseStudies';
import { fadeUp, stagger, useEntrance } from '@/lib/motion';

const PILLAR_BLURBS: Record<'process' | 'machines' | 'training', string> = {
  process:
    'Plant-level integration work — DCS, PLC, SCADA, panels, and edge connectivity across petrochemicals, BOPP, food, transportation, and building services.',
  machines:
    'Machine-level motion and traceability work for OEMs and the automotive supply base — drives, paint shop conveyors, and end-to-end shop-floor data.',
  training:
    'Hands-on training kits delivered to engineering institutions and corporate L&D — case studies will surface here as institutional engagements wrap up.',
};

const CaseStudiesIndex = () => {
  const entrance = useEntrance();
  const groups = caseStudiesByPillar();

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
          descriptor="Twenty-one years of commissioned projects, organised the way we organise the firm — by Solutions pillar. Process Industry work first, then Machine-level engagements, then Training. Each entry below opens to the full project detail."
        />

        {groups.map((group, idx) => {
          const headingId = `case-studies-pillar-${group.pillarId}-heading`;
          return (
            <SectionShell
              key={group.pillarId}
              background={idx % 2 === 0 ? 'primary' : 'secondary'}
              headingId={headingId}
            >
              <motion.div {...entrance} variants={fadeUp}>
                <SectionHeader
                  eyebrow={group.pillarCategory}
                  eyebrowVariant={group.pillarAccent}
                  heading={group.pillarTitle}
                  headingId={headingId}
                  descriptor={PILLAR_BLURBS[group.pillarId]}
                  layout="split"
                  className="mb-14"
                />
              </motion.div>

              <motion.ul
                className="cs-grid"
                {...entrance}
                variants={stagger(0.08)}
              >
                {group.caseStudies.map((cs) => (
                  <motion.li key={cs.slug} className="cs-card" variants={fadeUp}>
                    <Link to={`/case-studies/${cs.slug}`} className="cs-card-link">
                      <div className="cs-card-eyebrow">{cs.sectorEyebrow}</div>
                      <h3 className="cs-card-client cs-card-client-sm">
                        {cs.client}
                      </h3>
                      {cs.subtitle ? (
                        <p className="cs-card-subtitle">{cs.subtitle}</p>
                      ) : null}
                      <p className="cs-card-description cs-card-description-sm">
                        {cs.description}
                      </p>
                      {cs.metrics && cs.metrics.length > 0 ? (
                        <div className="cs-card-metrics-row">
                          {cs.metrics.slice(0, 3).map((m, mIdx) => (
                            <span key={mIdx} className="cs-card-metric-inline">
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
