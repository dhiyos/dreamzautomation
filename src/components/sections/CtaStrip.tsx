import { motion } from 'framer-motion';
import CtaButton from '@/components/shared/CtaButton';
import { fadeUp, useEntrance } from '@/lib/motion';

const CtaStrip = () => {
  const entrance = useEntrance();

  return (
    <section
      role="region"
      aria-labelledby="cta-strip-heading"
      className="cta-strip-section"
    >
      <motion.div
        {...entrance}
        variants={fadeUp}
        className="page-container cta-strip-inner"
      >
        <div className="cta-strip-text">
          <div className="cta-strip-eyebrow">Ready to start?</div>
          <h2 id="cta-strip-heading" className="cta-strip-heading">
            Engineer your next automation project with Dreamz.
          </h2>
        </div>

        <div className="cta-strip-action">
          <CtaButton variant="white" href="/contact">
            Request an Assessment
          </CtaButton>
        </div>
      </motion.div>
    </section>
  );
};

export default CtaStrip;
