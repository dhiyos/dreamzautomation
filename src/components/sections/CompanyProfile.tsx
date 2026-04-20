import { motion } from 'framer-motion';
import { SectionShell } from '@/components/shared/SectionShell';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { AccentCard } from '@/components/shared/AccentCard';
import { fadeUp, stagger, useEntrance } from '@/lib/motion';
import { companyProfile } from '@/data/companyProfile';

export const CompanyProfile = () => {
  const entranceProps = useEntrance();

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
        className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6"
        variants={stagger(0.08)}
        {...entranceProps}
      >
        {companyProfile.map((card) => (
          <motion.div key={card.id} variants={fadeUp}>
            <AccentCard
              accent={card.accent}
              padding="md"
              hover="surface"
              as="article"
            >
              <h3 className="text-card-title mb-[14px]">{card.title}</h3>
              <span
                className="mb-[18px] block"
                style={{ width: '24px', height: '1px', backgroundColor: '#2A4566' }}
                aria-hidden="true"
              />
              <p className="text-card-body">{card.body}</p>
            </AccentCard>
          </motion.div>
        ))}
      </motion.div>
    </SectionShell>
  );
};

export default CompanyProfile;
