import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Nav from '@/components/Nav';
import Footer from '@/components/sections/Footer';
import CtaStrip from '@/components/sections/CtaStrip';
import PageHero from '@/components/shared/PageHero';
import SectionShell from '@/components/shared/SectionShell';
import Eyebrow from '@/components/shared/Eyebrow';
import { solutions, itemCaseStudies } from '@/data/solutions';
import { fadeUp, stagger, useEntrance } from '@/lib/motion';
import solutionsHeroBg from '@/assets/solutions-hero-bg.jpg?w=1280&format=webp';
import solutionsHeroBgSrcSet from '@/assets/solutions-hero-bg.jpg?w=768;1280;1920&format=webp&as=srcset';
import SEO from '@/components/shared/SEO';

const Solutions = () => {
  const entrance = useEntrance();

  return (
    <div className="min-h-screen bg-bg-primary">
      <SEO
        title="Solutions — DCS, PLC, SCADA & Machine Automation"
        description="Three pillars: process-industry automation, machine-level motion & converting, and customised training kits — designed and commissioned in Ghaziabad."
        path="/solutions"
      />
      <Nav />
      <main>
        <PageHero
          backgroundImage={solutionsHeroBg}
          backgroundImageSrcSet={solutionsHeroBgSrcSet}
          eyebrow="What We Build"
          headingId="solutions-page-heading"
          heading={
            <>
              Three pillars.{' '}
              <span className="page-hero-heading-accent">
                One accountable team.
              </span>
            </>
          }
          descriptor="Process-industry automation, machine-level motion and converting work, and customised training kits — all designed, panel-fabricated, software-developed, and commissioned out of the same 10,000 sq. ft. facility in Ghaziabad. Founder review on every brief."
          stamps={[
            'Siemens System House · Since 2007',
            'ISO 9001:2015',
            'CE Marked · TÜV India',
          ]}
        />

        <SectionShell background="primary" headingId="solutions-pillars-heading">
          <h2 id="solutions-pillars-heading" className="sr-only">
            Capability pillars
          </h2>
          <motion.div
            className="solutions-pillar-stack"
            {...entrance}
            variants={stagger(0.12)}
          >
            {solutions.map((pillar) => {
              const itemsWithCs = pillar.items.filter((it) => itemCaseStudies[it.id]);
              return (
                <motion.article
                  key={pillar.id}
                  className={`solutions-pillar solutions-pillar-${pillar.accent}`}
                  variants={fadeUp}
                >
                  <div className="solutions-pillar-meta">
                    <span className="solutions-pillar-number">{pillar.number}</span>
                    <Eyebrow text={pillar.category} variant={pillar.accent} />
                  </div>
                  <h3 className="solutions-pillar-title">{pillar.title}</h3>
                  <p className="solutions-pillar-blurb">{pillar.blurb}</p>

                  <ul className="solutions-pillar-items">
                    {pillar.items.map((it) => {
                      const cs = itemCaseStudies[it.id];
                      return (
                        <li key={it.id} className="solutions-pillar-item">
                          <span className="solutions-pillar-item-name">{it.name}</span>
                          {cs ? (
                            <Link
                              to={`/case-studies/${cs.id}`}
                              className="solutions-pillar-item-link"
                            >
                              Case study →
                            </Link>
                          ) : null}
                        </li>
                      );
                    })}
                  </ul>

                  {itemsWithCs.length > 0 ? (
                    <div className="solutions-pillar-footer">
                      <Link to="/case-studies" className="solutions-pillar-footer-link">
                        See all {pillar.category.toLowerCase()} case studies →
                      </Link>
                    </div>
                  ) : null}
                </motion.article>
              );
            })}
          </motion.div>
        </SectionShell>

        <CtaStrip />
      </main>
      <Footer />
    </div>
  );
};

export default Solutions;
