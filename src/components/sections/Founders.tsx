import { motion } from 'framer-motion';
import SectionShell from '@/components/shared/SectionShell';
import SectionHeader from '@/components/shared/SectionHeader';
import CtaButton from '@/components/shared/CtaButton';
import {
  foundersPhotoPath,
  foundersNoteParagraphs,
  foundersSignoff,
  foundersSignoffSubline,
} from '@/data/founders';
import { fadeUp, useEntrance } from '@/lib/motion';

const Founders = () => {
  const entrance = useEntrance();

  return (
    <SectionShell background="primary" headingId="founders-heading">
      <motion.div {...entrance} variants={fadeUp}>
        <SectionHeader
          eyebrow="From the Founders"
          eyebrowVariant="teal"
          heading="Meet the Founders"
          headingId="founders-heading"
          descriptor="Vinod, Tapeshwar, and Piyush founded Dreamz Automation in 2005 and have led every project since. Three decades of combined experience across petrochemicals, process industry, motion control, and digitalization — and a shared conviction that the next era of automation is about elevating legacy systems, not replacing them."
          layout="split"
          className="mb-14"
        />
      </motion.div>

      <motion.article className="founders-note" {...entrance} variants={fadeUp}>
        <figure className="founders-portrait">
          <img
            src={foundersPhotoPath}
            alt="Vinod Pandey, Tapeshwar Tyagi, and Piyush Pathak — founders of Dreamz Automation"
            className="founders-photo"
          />
        </figure>

        <div className="founders-note-body">
          <p className="founders-note-lead">{foundersNoteParagraphs[0]}</p>

          <div className="founders-note-columns">
            {foundersNoteParagraphs.slice(1).map((para, idx) => (
              <p key={idx} className="founders-note-paragraph">
                {para}
              </p>
            ))}
          </div>

          <p className="founders-signoff">
            <span className="founders-signoff-names">{foundersSignoff}</span>
            <span className="founders-signoff-subline">{foundersSignoffSubline}</span>
          </p>
        </div>
      </motion.article>

      <motion.div className="engineers-cta-row" {...entrance} variants={fadeUp}>
        <div className="engineers-cta-text">
          <div className="engineers-cta-eyebrow">Talk to the Founders</div>
          <p className="engineers-cta-heading">
            Starting a project?{' '}
            <span className="engineers-cta-heading-italic">
              We'll respond within one business day.
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

export default Founders;
