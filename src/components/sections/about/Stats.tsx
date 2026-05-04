import { motion } from 'framer-motion';
import SectionShell from '@/components/shared/SectionShell';
import SectionHeader from '@/components/shared/SectionHeader';
import { aboutStats } from '@/data/about';
import { fadeUp, stagger, useEntrance } from '@/lib/motion';

const Stats = () => {
  const entrance = useEntrance();

  return (
    <SectionShell background="secondary" headingId="about-stats-heading">
      <motion.div {...entrance} variants={fadeUp}>
        <SectionHeader
          eyebrow="By the numbers"
          eyebrowVariant="blue"
          heading="The plant-floor scorecard."
          headingId="about-stats-heading"
          descriptor="Engineering scale you can verify, on the ground in Ghaziabad and across the installed base we serve."
          layout="split"
          className="mb-12"
        />
      </motion.div>

      <motion.dl
        className="about-stats-grid"
        {...entrance}
        variants={stagger(0.08)}
      >
        {aboutStats.map((stat) => (
          <motion.div key={stat.label} className="about-stat" variants={fadeUp}>
            <dt className="about-stat-label">{stat.label}</dt>
            <dd className="about-stat-value">{stat.value}</dd>
            {stat.sublabel ? (
              <dd className="about-stat-sublabel">{stat.sublabel}</dd>
            ) : null}
          </motion.div>
        ))}
      </motion.dl>
    </SectionShell>
  );
};

export default Stats;
