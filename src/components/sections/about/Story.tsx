import { motion } from 'framer-motion';
import SectionShell from '@/components/shared/SectionShell';
import SectionHeader from '@/components/shared/SectionHeader';
import { aboutStoryParagraphs } from '@/data/about';
import { fadeUp, useEntrance } from '@/lib/motion';

const Story = () => {
  const entrance = useEntrance();

  return (
    <SectionShell background="primary" headingId="about-story-heading">
      <motion.div {...entrance} variants={fadeUp}>
        <SectionHeader
          eyebrow="The Company"
          eyebrowVariant="teal"
          heading={
            <>
              Twenty years of engineering
              <br />
              what comes next.
            </>
          }
          headingId="about-story-heading"
          descriptor="Dreamz Automation is a founder-led system integrator. The same three engineers who started the firm in 2005 still review every project today."
          layout="split"
          className="mb-14"
        />
      </motion.div>

      <motion.div className="about-story-body" {...entrance} variants={fadeUp}>
        {aboutStoryParagraphs.map((para, idx) => (
          <p
            key={idx}
            className={
              idx === 0 ? 'about-story-lead' : 'about-story-paragraph'
            }
          >
            {para}
          </p>
        ))}
      </motion.div>
    </SectionShell>
  );
};

export default Story;
