import { useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { SectionShell } from '@/components/shared/SectionShell';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { fadeUp, useEntrance } from '@/lib/motion';
import { companyProfile } from '@/data/companyProfile';

export const CompanyProfile = () => {
  const entranceProps = useEntrance();
  const reduce = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const onTabKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft' && e.key !== 'Home' && e.key !== 'End') {
      return;
    }
    e.preventDefault();
    const last = companyProfile.length - 1;
    let next = activeIndex;
    if (e.key === 'ArrowRight') next = activeIndex === last ? 0 : activeIndex + 1;
    if (e.key === 'ArrowLeft') next = activeIndex === 0 ? last : activeIndex - 1;
    if (e.key === 'Home') next = 0;
    if (e.key === 'End') next = last;
    setActiveIndex(next);
    tabRefs.current[next]?.focus();
  };

  const activeCard = companyProfile[activeIndex];
  const activeAccent =
    activeCard.accent === 'teal' ? 'var(--accent-teal)' : 'var(--accent-blue)';

  return (
    <SectionShell
      headingId="company-profile-heading"
      background="primary"
      ariaLabel="Company Profile"
      className="pt-[100px] lg:pt-[100px]"
    >
      <motion.div {...entranceProps}>
        <SectionHeader
          eyebrow="COMPANY PROFILE"
          heading={
            <>
              Engineering{' '}
              <span className="text-accent-teal">Your Dreamz.</span>
            </>
          }
          headingId="company-profile-heading"
          descriptor="A leading Siemens System Integrator delivering end-to-end industrial automation solutions — from design and engineering through assembly, software development and commissioning. All under one roof, all from one accountable team."
          layout="split"
          className="mb-[56px]"
        />
      </motion.div>

      <motion.div className="company-tabs" variants={fadeUp} {...entranceProps}>
        <div
          role="tablist"
          aria-label="Company profile sections"
          className="company-tabs-list"
        >
          {companyProfile.map((card, i) => {
            const seq = String(i + 1).padStart(2, '0');
            const isActive = i === activeIndex;
            const accentVar =
              card.accent === 'teal' ? 'var(--accent-teal)' : 'var(--accent-blue)';
            return (
              <button
                key={card.id}
                id={`profile-tab-${card.id}`}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls={`profile-panel-${card.id}`}
                tabIndex={isActive ? 0 : -1}
                onClick={() => setActiveIndex(i)}
                onKeyDown={onTabKeyDown}
                className="company-tab"
                data-active={isActive}
                style={{ '--panel-accent': accentVar } as React.CSSProperties}
              >
                <span className="company-tab-seq">{seq}</span>
                <span className="company-tab-label">{card.title}</span>
              </button>
            );
          })}
        </div>

        <div
          className="company-tabs-panel-wrapper"
          style={{ '--panel-accent': activeAccent } as React.CSSProperties}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCard.id}
              id={`profile-panel-${activeCard.id}`}
              role="tabpanel"
              aria-labelledby={`profile-tab-${activeCard.id}`}
              tabIndex={0}
              className="company-tab-panel"
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            >
              <div className="company-tab-text">
                <h3 className="company-tab-title">{activeCard.title}</h3>
                <span className="company-tab-rule" aria-hidden="true" />
                <p className="company-tab-body">{activeCard.body}</p>
                <a href="/solutions" className="company-tab-cta">
                  <span className="company-tab-cta-label">LEARN MORE</span>
                  <span className="company-tab-arrow" aria-hidden="true">
                    →
                  </span>
                </a>
              </div>

              <figure className="company-tab-figure" aria-hidden={!activeCard.imagePath}>
                {activeCard.imagePath ? (
                  <img
                    src={activeCard.imagePath}
                    alt={activeCard.imageHint}
                    className="company-tab-image"
                  />
                ) : (
                  <div className="company-tab-placeholder">
                    <span className="company-tab-placeholder-seq">
                      {String(activeIndex + 1).padStart(2, '0')}
                    </span>
                    <span className="company-tab-placeholder-tag">PHOTO PENDING</span>
                    <span className="company-tab-placeholder-hint">
                      {activeCard.imageHint}
                    </span>
                  </div>
                )}
              </figure>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </SectionShell>
  );
};

export default CompanyProfile;
