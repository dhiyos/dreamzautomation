import { motion } from 'framer-motion';
import SectionShell from '@/components/shared/SectionShell';
import SectionHeader from '@/components/shared/SectionHeader';
import { founderPedigrees } from '@/data/founderPedigree';
import { fadeUp, stagger, useEntrance } from '@/lib/motion';

const FoundersPedigree = () => {
  const entrance = useEntrance();

  return (
    <SectionShell background="secondary" headingId="about-pedigree-heading">
      <motion.div {...entrance} variants={fadeUp}>
        <SectionHeader
          eyebrow="The Founders"
          eyebrowVariant="teal"
          heading={
            <>
              Three engineers.
              <br />
              Ninety years between them.
            </>
          }
          headingId="about-pedigree-heading"
          descriptor="Vinod, Piyush, and Tapeshwer each spent two decades inside the industries Dreamz now serves before they founded the firm in 2005. They are still the people who review every brief — and they are still the people you will meet on the first call."
          layout="split"
          className="mb-14"
        />
      </motion.div>

      <motion.ul
        className="founder-pedigree-grid"
        {...entrance}
        variants={stagger(0.1)}
      >
        {founderPedigrees.map((f) => {
          const accentClass =
            f.accent === 'teal' ? 'pedigree-card-teal' : 'pedigree-card-blue';
          return (
            <motion.li
              key={f.id}
              className={`founder-pedigree-card ${accentClass}`}
              variants={fadeUp}
            >
              <div className="founder-pedigree-portrait">
                <img
                  src={f.photoPath}
                  alt={`Portrait of ${f.name}`}
                  className="founder-pedigree-photo"
                  loading="lazy"
                />
              </div>

              <div className="founder-pedigree-role-tag">{f.roleTag}</div>
              <h3 className="founder-pedigree-name">{f.name}</h3>
              <p className="founder-pedigree-title">{f.title}</p>

              <div className="founder-pedigree-years">
                <span className="founder-pedigree-years-value">{f.yearsLabel}</span>
                <span className="founder-pedigree-years-sub">{f.yearsSubLabel}</span>
              </div>

              <div className="founder-pedigree-rule" aria-hidden="true" />

              <div className="founder-pedigree-block">
                <div className="founder-pedigree-block-label">{f.pedigreeLabel}</div>
                <p className="founder-pedigree-block-body">{f.pedigree}</p>
              </div>

              <div className="founder-pedigree-block">
                <div className="founder-pedigree-block-label">{f.ownsLabel}</div>
                <ul className="founder-pedigree-owns-list">
                  {f.owns.map((item, idx) => (
                    <li key={idx} className="founder-pedigree-owns-item">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.li>
          );
        })}
      </motion.ul>
    </SectionShell>
  );
};

export default FoundersPedigree;
