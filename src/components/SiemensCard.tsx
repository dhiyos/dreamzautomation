import { motion, useReducedMotion, type Variants } from "framer-motion";

const STATS = [
  { value: "20+", label: "Years of Experience" },
  { value: "50+", label: "Engineering Professionals" },
  { value: "400+", label: "Plants Automated" },
  { value: "50+", label: "Industry Leaders Served" },
];

const SiemensCard = () => {
  const reduce = useReducedMotion();

  const variants: Variants = {
    hidden: reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: reduce
        ? { duration: 0 }
        : { duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={variants}
      className="bg-bg-tertiary w-full border-t-[3px] border-accent-teal"
      style={{ padding: "36px 32px" }}
    >
      <div
        className="text-accent-teal uppercase"
        style={{ fontWeight: 600, fontSize: 10, letterSpacing: "0.20em", marginBottom: 14 }}
      >
        — AUTHORIZED PARTNER
      </div>

      <div
        className="text-accent-teal"
        style={{
          fontWeight: 800,
          fontSize: "clamp(32px, 3.5vw, 42px)",
          lineHeight: 1,
          letterSpacing: "-0.01em",
          marginBottom: 8,
        }}
      >
        SIEMENS
      </div>

      <div
        className="text-text-primary uppercase"
        style={{ fontWeight: 700, fontSize: 12, letterSpacing: "0.08em", marginBottom: 28 }}
      >
        AUTHORIZED SYSTEM INTEGRATOR
      </div>

      {/* 2x2 stats grid — 1px lines via gap on bg-line-default wrapper */}
      <div className="grid grid-cols-2 bg-line-default" style={{ gap: 1 }}>
        {STATS.map((s) => (
          <div key={s.label} className="bg-bg-secondary" style={{ padding: "20px 18px" }}>
            <div
              className="text-accent-teal"
              style={{
                fontWeight: 800,
                fontSize: "clamp(26px, 2.8vw, 32px)",
                lineHeight: 1,
                letterSpacing: "-0.02em",
                marginBottom: 6,
              }}
            >
              {s.value}
            </div>
            <div
              className="text-text-muted"
              style={{ fontWeight: 500, fontSize: 11, lineHeight: 1.4 }}
            >
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default SiemensCard;
