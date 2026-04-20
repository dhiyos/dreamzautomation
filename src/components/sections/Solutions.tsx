import { motion } from 'framer-motion';
import { SectionShell } from '@/components/shared/SectionShell';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { fadeUp, stagger, useEntrance } from '@/lib/motion';
import { solutions, type SolutionPillar } from '@/data/solutions';

const accentVarMap: Record<SolutionPillar['accent'], string> = {
  blue: 'var(--accent-blue)',
  teal: 'var(--accent-teal)',
  amber: 'var(--accent-amber)',
};

const dividerOpacity: Record<SolutionPillar['accent'], number> = {
  blue: 0.25,
  teal: 0.35,
  amber: 0.35,
};

export const Solutions = () => {
  const entranceProps = useEntrance();

  return (
    <SectionShell
      headingId="solutions-heading"
      background="secondary"
      ariaLabel="Solutions"
    >
      <motion.div {...entranceProps}>
        <SectionHeader
          eyebrow="SOLUTIONS"
          heading={<>What We Deliver.</>}
          headingId="solutions-heading"
          descriptor="Three capability pillars. One accountable team. From high-end DCS for mission-critical process plants to precision machine automation for OEMs and customised training kits for the next generation of automation engineers."
          layout="split"
          className="mb-[56px]"
        />
      </motion.div>

      <motion.div
        className="solutions-grid"
        variants={stagger(0.12)}
        {...entranceProps}
      >
        {solutions.map((pillar) => {
          const isAmber = pillar.accent === 'amber';
          const titleId = `solution-${pillar.id}-title`;
          const accentColor = `hsl(${
            pillar.accent === 'blue'
              ? 'var(--accent-blue)'
              : pillar.accent === 'teal'
                ? 'var(--accent-teal)'
                : 'var(--accent-amber)'
          })`;

          return (
            <motion.article
              key={pillar.id}
              className="solutions-pillar"
              variants={fadeUp}
              aria-labelledby={titleId}
            >
              {/* Coloured header */}
              <div
                className="solutions-pillar-header"
                style={{ backgroundColor: accentColor }}
              >
                <div className="solutions-pillar-header-text">
                  <div
                    className="solutions-pillar-category"
                    style={{
                      color: isAmber
                        ? 'rgba(11, 25, 41, 0.6)'
                        : 'rgba(255, 255, 255, 0.7)',
                    }}
                  >
                    {pillar.category}
                  </div>
                  <h3
                    id={titleId}
                    className="solutions-pillar-title"
                    style={{
                      color: isAmber ? 'hsl(var(--bg-primary))' : 'hsl(var(--text-primary))',
                    }}
                  >
                    {pillar.title}
                  </h3>
                </div>
                <div
                  className="solutions-pillar-number"
                  aria-hidden="true"
                  style={{
                    color: isAmber
                      ? 'rgba(11, 25, 41, 0.25)'
                      : 'rgba(255, 255, 255, 0.22)',
                  }}
                >
                  {pillar.number}
                </div>
              </div>

              {/* Body */}
              <div className="solutions-pillar-body">
                <p className="solutions-pillar-blurb">{pillar.blurb}</p>
                <span
                  className="solutions-pillar-divider"
                  aria-hidden="true"
                  style={{
                    backgroundColor: `hsl(${
                      pillar.accent === 'blue'
                        ? 'var(--accent-blue)'
                        : pillar.accent === 'teal'
                          ? 'var(--accent-teal)'
                          : 'var(--accent-amber)'
                    } / ${dividerOpacity[pillar.accent]})`,
                  }}
                />
                <ul className="solutions-pillar-list">
                  {pillar.items.map((item) => (
                    <li key={item} className="solutions-pillar-item">
                      <span
                        className="solutions-pillar-pip"
                        aria-hidden="true"
                        style={{ backgroundColor: accentColor }}
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.article>
          );
        })}
      </motion.div>
    </SectionShell>
  );
};

export default Solutions;
