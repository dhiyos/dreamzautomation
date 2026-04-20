import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { SectionShell } from '@/components/shared/SectionShell';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { fadeUp, useEntrance } from '@/lib/motion';
import { companyProfile } from '@/data/companyProfile';

export const CompanyProfile = () => {
  const entranceProps = useEntrance();
  const reduce = useReducedMotion();
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const isExpanded = (cardId: string, index: number) => {
    if (hoveredId === null) return index === 0;
    return hoveredId === cardId;
  };

  const formatSequence = (id: string, index: number) => {
    const num = String(index + 1).padStart(2, '0');
    return `${num} / ${id.replace(/-/g, ' ').toUpperCase()}`;
  };

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

      <motion.div
        className="company-panels"
        variants={fadeUp}
        {...entranceProps}
        onMouseLeave={() => setHoveredId(null)}
      >
        {companyProfile.map((card, index) => {
          const expanded = isExpanded(card.id, index);
          const accentVar = card.accent === 'teal' ? 'var(--accent-teal)' : 'var(--accent-blue)';
          return (
            <article
              key={card.id}
              className="company-panel"
              data-expanded={expanded}
              tabIndex={0}
              aria-expanded={expanded}
              onMouseEnter={() => setHoveredId(card.id)}
              onFocus={() => setHoveredId(card.id)}
              onBlur={() => setHoveredId(null)}
              style={
                {
                  '--panel-accent': accentVar,
                  transitionDuration: reduce ? '0ms' : undefined,
                } as React.CSSProperties
              }
            >
              <div>
                <div className="company-panel-seq">
                  {formatSequence(card.id, index)}
                </div>
                <h3 className="company-panel-title">{card.title}</h3>
                <span className="company-panel-rule" aria-hidden="true" />
                <p className="company-panel-body">{card.body}</p>
              </div>

              <a href="#" className="company-panel-cta" tabIndex={-1}>
                <span className="company-panel-cta-label">LEARN MORE</span>
                <span className="company-panel-arrow" aria-hidden="true">→</span>
              </a>
            </article>
          );
        })}
      </motion.div>
    </SectionShell>
  );
};

export default CompanyProfile;
