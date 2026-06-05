import { motion, useReducedMotion, type Variants } from "framer-motion";
import SiemensCard from "./SiemensCard";
import heroBgFallback from "@/assets/hero-it-ot-convergence.jpg?w=1280&format=webp";
const heroVideo = { url: "/videos/home-hero.mp4" };

const Hero = () => {
  const reduce = useReducedMotion();

  const container: Variants = {
    hidden: {},
    show: {
      transition: reduce
        ? { staggerChildren: 0 }
        : { staggerChildren: 0.1, delayChildren: 0 },
    },
  };

  const item: Variants = {
    hidden: reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: reduce ? { duration: 0 } : { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section
      aria-labelledby="hero-heading"
      className="w-full hero-section relative overflow-hidden"
    >
      {/* Background: IT–OT convergence. Always render the video (matches Industries
          hero); reduced-motion is honored by the content animations, not by hiding it. */}
      <video
        aria-hidden="true"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster={heroBgFallback}
        className="absolute inset-0 z-0 w-full h-full object-cover object-left"
      >
        <source src={heroVideo.url} type="video/mp4" />
      </video>
      {/* Legibility overlay — strong on left where copy lives, soft on right */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0"
        style={{
          background:
            "linear-gradient(90deg, hsl(var(--bg-primary) / 0.92) 0%, hsl(var(--bg-primary) / 0.78) 35%, hsl(var(--bg-primary) / 0.65) 65%, hsl(var(--bg-primary) / 0.55) 100%)",
        }}
      />
      <div className="page-container relative z-10">
        <div className="grid items-center grid-cols-1 lg:grid-cols-[1.2fr_1fr] hero-grid">
          {/* Left column */}
          <motion.div variants={container} initial="hidden" animate="show" className="self-center">
            {/* Eyebrow */}
            <motion.div variants={item} className="flex items-center gap-3" style={{ marginBottom: 24 }}>
              <span
                aria-hidden="true"
                className="bg-accent-blue inline-block shrink-0 border-0 rounded-none"
                style={{ width: 40, height: 1 }}
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
              id="hero-heading"
              variants={item}
              className="text-text-primary"
              style={{
                fontWeight: 800,
                fontSize: "clamp(44px, 6vw, 72px)",
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
              style={{
                fontWeight: 500,
                fontSize: "clamp(18px, 2vw, 22px)",
                lineHeight: 1.4,
                marginBottom: 28,
              }}
            >
              Since 2005 — from concept to commissioning,
              <br />
              under one roof.
            </motion.p>

            {/* CTA row */}
            <motion.div variants={item} className="flex flex-wrap items-center" style={{ gap: 12, marginTop: 8 }}>
              <a
                href="/contact"
                className="bg-accent-blue hover:bg-accent-blue-hover text-text-primary uppercase transition-colors duration-150 inline-block"
                style={{ fontWeight: 700, fontSize: 12, letterSpacing: "0.02em", padding: "14px 28px" }}
              >
                Request an Assessment →
              </a>
              <a
                href="/solutions"
                className="bg-accent-teal text-text-primary uppercase inline-block hover:brightness-110 transition-all duration-150"
                style={{
                  fontWeight: 600,
                  fontSize: 12,
                  letterSpacing: "0.02em",
                  padding: "14px 28px",
                }}
              >
                Explore Solutions
              </a>
            </motion.div>
          </motion.div>

          {/* Right column */}
          <div className="self-center">
            <SiemensCard />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
