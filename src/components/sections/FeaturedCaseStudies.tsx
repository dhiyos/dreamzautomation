import { useMemo, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { SectionShell } from '@/components/shared/SectionShell';
import { Eyebrow } from '@/components/shared/Eyebrow';
import { featuredCaseStudies } from '@/data/featuredCaseStudies';

export const FeaturedCaseStudies = () => {
  const reduce = useReducedMotion();
  const [activeId, setActiveId] = useState(featuredCaseStudies[0].id);

  const activeCaseStudy = useMemo(
    () => featuredCaseStudies.find((cs) => cs.id === activeId) ?? featuredCaseStudies[0],
    [activeId],
  );
  const queueCaseStudies = useMemo(
    () => featuredCaseStudies.filter((cs) => cs.id !== activeId),
    [activeId],
  );
  const activeIndex = featuredCaseStudies.findIndex((cs) => cs.id === activeId);

  const handleNext = () => {
    const i = (activeIndex + 1) % featuredCaseStudies.length;
    setActiveId(featuredCaseStudies[i].id);
  };
  const handlePrevious = () => {
    const i = (activeIndex - 1 + featuredCaseStudies.length) % featuredCaseStudies.length;
    setActiveId(featuredCaseStudies[i].id);
  };

  const headerInitial = reduce ? false : { opacity: 0, y: 16 };
  const cardInitial = reduce ? false : { opacity: 0, y: 16 };

  return (
    <SectionShell
      headingId="featured-case-studies-heading"
      background="secondary"
      ariaLabel="Featured Case Studies"
    >
      {/* Header row */}
      <div className="case-section-head-row">
        <motion.div
          className="case-section-header"
          initial={headerInitial}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: reduce ? 0 : 0.5, ease: 'easeOut' }}
        >
          <Eyebrow text="FEATURED CASE STUDIES" variant="blue" />
          <h2 id="featured-case-studies-heading" className="case-section-h2">
            Proof, not promises.
          </h2>
          <p className="case-section-descriptor">
            Three marquee deployments that demonstrate the breadth of Dreamz's engineering
            — from SCADA-driven metro systems serving millions of commuters to plant-floor
            track &amp; trace systems running at automotive scale.
          </p>
        </motion.div>

        <motion.div
          className="case-nav-arrows"
          initial={headerInitial}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: reduce ? 0 : 0.5, delay: reduce ? 0 : 0.1, ease: 'easeOut' }}
        >
          <button
            type="button"
            className="case-nav-arrow"
            onClick={handlePrevious}
            aria-label="Previous case study"
          >
            ←
          </button>
          <button
            type="button"
            className="case-nav-arrow"
            onClick={handleNext}
            aria-label="Next case study"
          >
            →
          </button>
        </motion.div>
      </div>

      {/* Body row */}
      <div className="case-body-row">
        {/* Featured */}
        <div aria-live="polite">
          <AnimatePresence mode="wait">
            <motion.article
              key={activeCaseStudy.id}
              className="case-featured"
              initial={reduce ? false : { opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={reduce ? undefined : { opacity: 0, x: -8 }}
              transition={{ duration: reduce ? 0 : 0.3, ease: 'easeOut' }}
            >
              <div className="case-featured-eyebrow">{activeCaseStudy.sectorEyebrow}</div>
              <h3 className="case-featured-client">{activeCaseStudy.client}</h3>
              <div className="case-featured-subtitle">{activeCaseStudy.subtitle}</div>
              <p className="case-featured-desc">{activeCaseStudy.description}</p>

              <div className="case-featured-metrics">
                {activeCaseStudy.metrics.map((m) => (
                  <div key={m.label} className="case-featured-metric">
                    <div className="case-featured-metric-val">{m.value}</div>
                    <div className="case-featured-metric-lbl">{m.label}</div>
                  </div>
                ))}
              </div>

              <a
                href={`/case-studies/${activeCaseStudy.slug}`}
                className="case-featured-cta"
              >
                <span>Read the Full Case Study</span>
                <span className="case-featured-cta-arrow" aria-hidden="true">
                  →
                </span>
              </a>
            </motion.article>
          </AnimatePresence>
        </div>

        {/* Queue */}
        <motion.div
          className="case-queue"
          initial={cardInitial}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: reduce ? 0 : 0.5, delay: reduce ? 0 : 0.25, ease: 'easeOut' }}
        >
          {queueCaseStudies.map((cs) => (
            <button
              key={cs.id}
              type="button"
              className="case-queue-card"
              onClick={() => setActiveId(cs.id)}
              aria-label={`Show ${cs.client} case study`}
            >
              <div>
                <div className="case-queue-eyebrow">{cs.sectorEyebrow}</div>
                <div className="case-queue-client">{cs.client}</div>
                <div className="case-queue-subtitle">{cs.subtitle}</div>
              </div>
              <div className="case-queue-footer">
                <div className="case-queue-metric">{cs.queueMetric}</div>
                <span className="case-queue-arrow" aria-hidden="true">
                  →
                </span>
              </div>
            </button>
          ))}
        </motion.div>
      </div>

      {/* View all */}
      <div className="case-view-all">
        <a href="/case-studies" className="case-view-all-link">
          <span>View All Case Studies</span>
          <span aria-hidden="true">→</span>
        </a>
      </div>
    </SectionShell>
  );
};

export default FeaturedCaseStudies;
