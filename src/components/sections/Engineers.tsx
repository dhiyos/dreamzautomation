import { motion } from 'framer-motion';
import SectionShell from '@/components/shared/SectionShell';
import SectionHeader from '@/components/shared/SectionHeader';
import CtaButton from '@/components/shared/CtaButton';
import { engineers } from '@/data/engineers';
import { fadeUp, stagger, useEntrance } from '@/lib/motion';

const Engineers = () => {
  const entrance = useEntrance();

  return (
    <SectionShell background="primary" headingId="engineers-heading">
      <motion.div {...entrance} variants={fadeUp}>
        <SectionHeader
          eyebrow="Meet the Engineers"
          eyebrowVariant="teal"
          heading={
            <>
              Three founders.
              <br />
              Thirty-plus years.
            </>
          }
          headingId="engineers-heading"
          descriptor="Dreamz was founded in 2005 by engineers, for engineers. Two decades later, the same three founders are still the ones you'll meet in the first call, review the technical brief, and sign off on every project that leaves our facility."
          layout="split"
          className="mb-14"
        />
      </motion.div>

      <motion.div
        className="engineers-grid"
        {...entrance}
        variants={stagger(0.1)}
      >
        {engineers.map((engineer) => {
          const role = engineer.accent === 'teal' ? 'lead' : 'technical';
          return (
            <motion.article
              key={engineer.id}
              className="engineer-card"
              data-role={role}
              variants={fadeUp}
            >
              <div className="engineer-portrait">
                {engineer.photoPath ? (
                  <img
                    src={engineer.photoPath}
                    alt={`Portrait of ${engineer.name}`}
                    className="engineer-photo"
                  />
                ) : (
                  <>
                    <span className="engineer-initials" aria-hidden="true">
                      {engineer.initials}
                    </span>
                    <span className="engineer-portrait-label">Photo · 640×800</span>
                  </>
                )}
              </div>

              <div className="engineer-role-tag">{engineer.roleTag}</div>
              <h3 className="engineer-name">{engineer.name}</h3>
              <p className="engineer-title">{engineer.title}</p>
              <div className="engineer-rule" />
              <p className="engineer-bio">{engineer.bio}</p>
            </motion.article>
          );
        })}
      </motion.div>

      <motion.div className="engineers-cta-row" {...entrance} variants={fadeUp}>
        <div className="engineers-cta-text">
          <div className="engineers-cta-eyebrow">Talk to the Team</div>
          <p className="engineers-cta-heading">
            Starting a project?{' '}
            <span className="engineers-cta-heading-italic">
              The right engineer will respond within one business day.
            </span>
          </p>
        </div>
        <CtaButton variant="primary" href="#contact">
          Request an Assessment
        </CtaButton>
      </motion.div>
    </SectionShell>
  );
};

export default Engineers;
