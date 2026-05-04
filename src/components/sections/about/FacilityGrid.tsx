import { motion } from 'framer-motion';
import SectionShell from '@/components/shared/SectionShell';
import SectionHeader from '@/components/shared/SectionHeader';
import { facilityImages } from '@/data/about';
import { fadeUp, stagger, useEntrance } from '@/lib/motion';

const FacilityGrid = () => {
  const entrance = useEntrance();

  return (
    <SectionShell background="primary" headingId="about-facility-heading">
      <motion.div {...entrance} variants={fadeUp}>
        <SectionHeader
          eyebrow="Inside the facility"
          eyebrowVariant="teal"
          heading={
            <>
              Ghaziabad, UP.
              <br />
              10,000 sq. ft. under one roof.
            </>
          }
          headingId="about-facility-heading"
          descriptor="Design, panel fabrication, software development, factory acceptance testing, and commissioning support — operated by the engineers who designed the system, not handed off to a third party."
          layout="split"
          className="mb-14"
        />
      </motion.div>

      <motion.ul
        className="about-facility-grid"
        {...entrance}
        variants={stagger(0.1)}
      >
        {facilityImages.map((img, idx) => (
          <motion.li
            key={idx}
            className="about-facility-tile"
            variants={fadeUp}
          >
            <figure>
              <div className="about-facility-image-wrap">
                <img
                  src={img.src}
                  alt={img.alt}
                  className="about-facility-image"
                  loading="lazy"
                />
              </div>
              <figcaption className="about-facility-caption">
                <span className="about-facility-caption-marker" aria-hidden="true">
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <span>{img.caption}</span>
              </figcaption>
            </figure>
          </motion.li>
        ))}
      </motion.ul>
    </SectionShell>
  );
};

export default FacilityGrid;
