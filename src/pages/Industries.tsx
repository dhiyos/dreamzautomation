import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Nav from '@/components/Nav';
import Footer from '@/components/sections/Footer';
import CtaStrip from '@/components/sections/CtaStrip';
import PageHero from '@/components/shared/PageHero';
import SectionShell from '@/components/shared/SectionShell';
import { industries } from '@/data/industries';
import { fadeUp, stagger, useEntrance } from '@/lib/motion';
import SEO from '@/components/shared/SEO';

const Industries = () => {
  const entrance = useEntrance();

  return (
    <div className="min-h-screen bg-bg-primary">
      <SEO
        title="Industries Served — Process, Converting, Automotive & More"
        description="Two decades across petrochemicals, BOPP/converting, automotive, food, transportation, water and engineering education in India."
        path="/industries"
      />
      <Nav />
      <main>
        <PageHero
          eyebrow="Where We Operate"
          headingId="industries-page-heading"
          heading={
            <>
              Industries we know{' '}
              <span className="page-hero-heading-accent">cold.</span>
            </>
          }
          descriptor="Two decades of operating-floor experience across the verticals that built the firm — process industry, converting and films, automotive, food, transportation, water, and the institutions training the engineers who run them."
        />

        <SectionShell background="secondary" headingId="industries-grid-heading">
          <h2 id="industries-grid-heading" className="sr-only">
            Industries served
          </h2>

          <motion.ul
            className="industries-grid"
            {...entrance}
            variants={stagger(0.08)}
          >
            {industries.map((ind) => {
              const accentClass = `industry-card-${ind.pillarAccent}`;
              return (
                <motion.li
                  key={ind.id}
                  className={`industry-card ${accentClass}`}
                  variants={fadeUp}
                >
                  <div className="industry-card-pillar">{ind.pillarLabel}</div>
                  <h3 className="industry-card-name">{ind.name}</h3>
                  <p className="industry-card-blurb">{ind.blurb}</p>
                  {ind.caseStudySlug && ind.caseStudyLabel ? (
                    <Link
                      to={`/case-studies/${ind.caseStudySlug}`}
                      className="industry-card-cs"
                    >
                      <span className="industry-card-cs-label">Case study</span>
                      <span className="industry-card-cs-text">
                        {ind.caseStudyLabel}
                      </span>
                      <span aria-hidden="true" className="industry-card-cs-arrow">
                        →
                      </span>
                    </Link>
                  ) : null}
                </motion.li>
              );
            })}
          </motion.ul>
        </SectionShell>

        <CtaStrip />
      </main>
      <Footer />
    </div>
  );
};

export default Industries;
