import { motion, useReducedMotion } from 'framer-motion';
import { SectionShell } from '@/components/shared/SectionShell';
import { Eyebrow } from '@/components/shared/Eyebrow';
import { CtaButton } from '@/components/shared/CtaButton';
import { processStages } from '@/data/process';

export const Process = () => {
  const reduce = useReducedMotion();

  const headerInitial = reduce ? false : { opacity: 0, y: 16 };
  const stageInitial = reduce ? false : { opacity: 0, y: 20 };
  const arcInitial = reduce ? false : { opacity: 0 };

  const staggerBase = reduce ? 0 : 0.12;
  const arcDelay = reduce ? 0 : staggerBase * processStages.length + 0.6;

  return (
    <SectionShell headingId="process-heading" background="primary" ariaLabel="Our Process">
      {/* Centred header */}
      <motion.div
        initial={headerInitial}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: reduce ? 0 : 0.5, ease: 'easeOut' }}
        className="process-header"
      >
        <div className="process-eyebrow-wrap">
          <Eyebrow text="OUR PROCESS" variant="blue" />
        </div>
        <h2 id="process-heading" className="heading-h2 process-heading">
          From Concept to <br />
          Commissioning.
        </h2>
        <p className="text-body-default process-descriptor">
          Twenty years of disciplined engineering practice, distilled into a predictable
          four-stage process. One accountable team — from the first discovery workshop to
          long-term partnership.
        </p>
      </motion.div>

      {/* Stages row */}
      <div className="process-stages-wrapper">
        <motion.div
          className="process-arc-container"
          aria-hidden="true"
          initial={arcInitial}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: reduce ? 0 : 0.6, delay: arcDelay, ease: 'easeOut' }}
        >
          <svg
            className="process-arc-svg"
            viewBox="0 0 1200 50"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M 150 45 Q 300 5 450 45"
              stroke="hsl(var(--accent-blue))"
              strokeWidth="1.5"
              strokeDasharray="3 5"
              fill="none"
            />
            <path
              d="M 450 45 Q 600 5 750 45"
              stroke="hsl(var(--accent-teal))"
              strokeWidth="1.5"
              strokeDasharray="3 5"
              fill="none"
            />
            <path
              d="M 750 45 Q 900 5 1050 45"
              stroke="hsl(var(--accent-blue))"
              strokeWidth="1.5"
              strokeDasharray="3 5"
              fill="none"
            />
          </svg>
        </motion.div>

        <div className="process-stages-row">
          {processStages.map((stage, idx) => (
            <motion.article
              key={stage.id}
              className="process-stage"
              data-colour={stage.colour}
              initial={stageInitial}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: reduce ? 0 : 0.5,
                delay: reduce ? 0 : idx * staggerBase,
                ease: 'easeOut',
              }}
            >
              <div className="process-stage-header">
                <div className="process-stage-icon" aria-hidden="true">
                  {stage.number}
                </div>
                <div className="process-stage-title-block">
                  <div className="process-stage-eyebrow">{stage.eyebrow}</div>
                  <h3 className="process-stage-title">{stage.title}</h3>
                </div>
              </div>

              <p className="process-stage-description">{stage.description}</p>

              <ul className="process-stage-bullets">
                {stage.bullets.map((b) => (
                  <li key={b.title} className="process-stage-bullet">
                    <strong>{b.title}</strong>
                    <em>{b.context}</em>
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="process-cta-row">
        <CtaButton variant="ghost" href="#contact" className="process-cta-button">
          Start a Project
        </CtaButton>
      </div>
    </SectionShell>
  );
};

export default Process;
