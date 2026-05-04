import { motion } from 'framer-motion';
import SectionShell from '@/components/shared/SectionShell';
import SectionHeader from '@/components/shared/SectionHeader';
import { aboutTimeline } from '@/data/about';
import { fadeUp, stagger, useEntrance } from '@/lib/motion';

const Timeline = () => {
  const entrance = useEntrance();

  return (
    <SectionShell background="secondary" headingId="about-timeline-heading">
      <motion.div {...entrance} variants={fadeUp}>
        <SectionHeader
          eyebrow="Milestones"
          eyebrowVariant="blue"
          heading="2005 to today."
          headingId="about-timeline-heading"
          descriptor="The decisions and delivered projects that brought Dreamz from a three-engineer startup in Delhi NCR to a Siemens System House serving the converting, process, and motion-control industries."
          layout="split"
          className="mb-14"
        />
      </motion.div>

      <motion.ol
        className="about-timeline"
        {...entrance}
        variants={stagger(0.08)}
      >
        {aboutTimeline.map((m, idx) => (
          <motion.li
            key={`${m.year}-${idx}`}
            className="about-timeline-item"
            variants={fadeUp}
          >
            <div className="about-timeline-year">{m.year}</div>
            <div className="about-timeline-marker" aria-hidden="true">
              <span className="about-timeline-dot" />
              {idx < aboutTimeline.length - 1 ? (
                <span className="about-timeline-line" />
              ) : null}
            </div>
            <div className="about-timeline-content">
              <h3 className="about-timeline-title">{m.title}</h3>
              <p className="about-timeline-body">{m.body}</p>
            </div>
          </motion.li>
        ))}
      </motion.ol>
    </SectionShell>
  );
};

export default Timeline;
