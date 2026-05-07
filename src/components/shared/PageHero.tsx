import { motion, useReducedMotion } from 'framer-motion';
import * as React from 'react';

interface PageHeroProps {
  eyebrow: string;
  heading: React.ReactNode;
  headingId: string;
  descriptor?: string;
  stamps?: string[];
  backgroundImage?: string;
}

const PageHero: React.FC<PageHeroProps> = ({
  eyebrow,
  heading,
  headingId,
  descriptor,
  stamps,
  backgroundImage,
}) => {
  const reduce = useReducedMotion();
  const initial = reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 };
  const animate = { opacity: 1, y: 0 };
  const transition = reduce
    ? { duration: 0 }
    : { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] };

  return (
    <section
      aria-labelledby={headingId}
      className={`page-hero${backgroundImage ? ' page-hero-with-bg' : ''}`}
    >
      {backgroundImage ? (
        <>
          <div
            className="page-hero-bg"
            style={{ backgroundImage: `url(${backgroundImage})` }}
            aria-hidden="true"
          />
          <div className="page-hero-bg-overlay" aria-hidden="true" />
        </>
      ) : null}
      <div className="page-container page-hero-inner">
        <motion.div initial={initial} animate={animate} transition={transition}>
          <div className="page-hero-eyebrow">
            <span className="page-hero-eyebrow-line" aria-hidden="true" />
            <span>{eyebrow}</span>
          </div>

          <h1 id={headingId} className="page-hero-heading">
            {heading}
          </h1>

          {descriptor ? <p className="page-hero-descriptor">{descriptor}</p> : null}

          {stamps && stamps.length > 0 ? (
            <div className="page-hero-stamps">
              {stamps.map((stamp, idx) => (
                <React.Fragment key={stamp}>
                  <span className="page-hero-stamp">{stamp}</span>
                  {idx < stamps.length - 1 ? (
                    <span className="page-hero-stamp-divider" aria-hidden="true" />
                  ) : null}
                </React.Fragment>
              ))}
            </div>
          ) : null}
        </motion.div>
      </div>
    </section>
  );
};

export default PageHero;
