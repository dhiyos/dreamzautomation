import { motion, type Variants } from "framer-motion";
import SiemensCard from "./SiemensCard";

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

const Hero = () => {
  return (
    <section
      className="w-full border-b border-line-default"
      style={{ paddingTop: 120, paddingBottom: 100 }}
    >
      <div className="page-container">
        <div className="grid items-center gap-10 lg:gap-20 grid-cols-1 lg:grid-cols-[1.2fr_1fr]">
          {/* Left column */}
          <motion.div variants={container} initial="hidden" animate="show">
            {/* Eyebrow */}
            <motion.div variants={item} className="flex items-center" style={{ marginBottom: 24 }}>
              <span
                aria-hidden="true"
                className="bg-accent-blue inline-block"
                style={{ width: 40, height: 1, marginRight: 12 }}
              />
              <span
                className="text-accent-blue uppercase"
                style={{ fontWeight: 600, fontSize: 11, letterSpacing: "0.18em" }}
              >
                IT — OT CONVERGENCE · INDUSTRIAL AUTOMATION · DIGITALIZATION
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={item}
              className="text-text-primary"
              style={{
                fontWeight: 800,
                fontSize: "clamp(44px, 7vw, 72px)",
                lineHeight: 1.0,
                letterSpacing: "-0.03em",
                marginBottom: 8,
              }}
            >
              Engineering
              <br />
              Your <span className="text-accent-teal">Dreamz.</span>
            </motion.h1>

            {/* Italic tagline */}
            <motion.p
              variants={item}
              className="text-text-muted italic"
              style={{ fontWeight: 500, fontSize: 22, lineHeight: 1.4, marginBottom: 28 }}
            >
              Since 2005 — from concept to commissioning,
              <br />
              under one roof.
            </motion.p>

            {/* Body */}
            <motion.p
              variants={item}
              className="text-text-muted"
              style={{ fontWeight: 400, fontSize: 15, lineHeight: 1.75, maxWidth: 460, marginBottom: 36 }}
            >
              Siemens Authorized System House for Delhi NCR. 50+ engineering professionals.
              10,000 sq. ft. integration facility. Trusted by Reliance, IOCL, DMRC, Motherson,
              Frick, and 50+ industry leaders across India and beyond.
            </motion.p>

            {/* CTA row */}
            <motion.div variants={item} className="flex flex-wrap items-center" style={{ gap: 12 }}>
              <a
                href="#"
                className="bg-accent-blue hover:bg-accent-blue-hover text-text-primary uppercase transition-colors duration-200 inline-block"
                style={{ fontWeight: 700, fontSize: 12, letterSpacing: "0.02em", padding: "14px 28px" }}
              >
                Request an Assessment →
              </a>
              <a
                href="#"
                className="text-text-primary uppercase inline-block transition-colors duration-200"
                style={{
                  fontWeight: 600,
                  fontSize: 12,
                  letterSpacing: "0.02em",
                  padding: "13px 28px",
                  border: "1px solid hsl(var(--line-strong))",
                  backgroundColor: "transparent",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = "hsl(var(--accent-blue))";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = "hsl(var(--line-strong))";
                }}
              >
                Explore Solutions
              </a>
            </motion.div>
          </motion.div>

          {/* Right column */}
          <div>
            <SiemensCard />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
