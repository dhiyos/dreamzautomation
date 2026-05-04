import { motion, useReducedMotion } from 'framer-motion';
import facilityHero from '@/assets/facility-india-1.jpg';

const AboutHero = () => {
  const reduce = useReducedMotion();
  const initial = reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 };
  const animate = { opacity: 1, y: 0 };
  const transition = reduce
    ? { duration: 0 }
    : { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] };

  return (
    <section
      aria-labelledby="about-hero-heading"
      className="about-hero relative overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${facilityHero})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0"
        style={{
          background:
            'linear-gradient(180deg, hsl(var(--bg-primary) / 0.78) 0%, hsl(var(--bg-primary) / 0.92) 100%), linear-gradient(90deg, hsl(var(--bg-primary) / 0.6) 0%, hsl(var(--bg-primary) / 0.4) 100%)',
        }}
      />

      <div className="page-container relative z-10 about-hero-inner">
        <motion.div
          initial={initial}
          animate={animate}
          transition={transition}
        >
          <div className="about-hero-eyebrow">
            <span className="about-hero-eyebrow-line" aria-hidden="true" />
            <span>About Dreamz Automation</span>
          </div>

          <h1 id="about-hero-heading" className="about-hero-heading">
            Industrial automation,{' '}
            <span className="about-hero-heading-accent">
              built by the engineers who have to live with it.
            </span>
          </h1>

          <p className="about-hero-descriptor">
            Founded in 2005 in Delhi NCR. A Siemens Authorized System House since 2007.
            Fifty engineers and one accountable team — designing, building, commissioning,
            and supporting automation systems that have to work the day they go live, and
            every day after.
          </p>

          <div className="about-hero-stamps">
            <span className="about-hero-stamp">Siemens System House · Since 2007</span>
            <span className="about-hero-stamp-divider" aria-hidden="true" />
            <span className="about-hero-stamp">ISO 9001:2015</span>
            <span className="about-hero-stamp-divider" aria-hidden="true" />
            <span className="about-hero-stamp">CE Marked · TÜV India</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutHero;
