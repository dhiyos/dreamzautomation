import * as React from 'react';
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import { Link } from 'react-router-dom';
import Nav from '@/components/Nav';
import Footer from '@/components/sections/Footer';
import CtaStrip from '@/components/sections/CtaStrip';
import SEO from '@/components/shared/SEO';
import { solutions, itemCaseStudies } from '@/data/solutions';

import heroBg from '@/assets/solutions-hero-bg.jpg?w=1920&format=webp';
import heroBgSrcSet from '@/assets/solutions-hero-bg.jpg?w=768;1280;1920&format=webp&as=srcset';
import imgPetrochem from '@/assets/solutions/process-petrochem.jpg?w=800&format=webp';
import imgWater from '@/assets/solutions/process-water.jpg?w=800&format=webp';
import imgMetro from '@/assets/solutions/process-metro.jpg?w=800&format=webp';
import imgPrinting from '@/assets/solutions/machines-printing.jpg?w=1200&format=webp';
import imgRobotics from '@/assets/solutions/machines-robotics.jpg?w=1200&format=webp';
import imgTraining from '@/assets/solutions/training-kit.jpg?w=1200&format=webp';

const FONT_HEAD: React.CSSProperties = {};
const FONT_BODY: React.CSSProperties = {};

interface Tile {
  itemId: string;
  image: string;
  eyebrow: string;
  title: string;
}

const processTiles: Tile[] = [
  { itemId: 'petrochem', image: imgPetrochem, eyebrow: 'Petrochem & Gas', title: 'Refining, SIL-3 safety, hot-standby control' },
  { itemId: 'water', image: imgWater, eyebrow: 'Environment', title: 'Water treatment, HVAC & BMS telemetry' },
  { itemId: 'tunnel', image: imgMetro, eyebrow: 'Transport', title: 'Metro & tunnel SCADA subsystems' },
];

const machineTiles: Tile[] = [
  { itemId: 'bopp', image: imgPrinting, eyebrow: 'Converting', title: 'Printing, coating, lamination & slitters' },
  { itemId: 'conveyor-paint', image: imgRobotics, eyebrow: 'Robotics & Paint', title: 'Paint shop, ED/CED & pick-and-place' },
];

// ── Motion primitives ────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
};

const staggerParent = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

/** Image with scroll-linked parallax inside its overflow-hidden frame. */
const ParallaxImage: React.FC<{
  src: string;
  alt?: string;
  className?: string;
  imgClassName?: string;
  range?: number;
  eager?: boolean;
}> = ({ src, alt = '', className, imgClassName, range = 50, eager = false }) => {
  const reduce = useReducedMotion();
  const ref = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-range, range]);

  return (
    <div ref={ref} className={className} style={{ overflow: 'hidden' }}>
      <motion.img
        src={src}
        alt={alt}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        style={reduce ? undefined : { y, scale: 1.18, willChange: 'transform' }}
        className={imgClassName ?? 'w-full h-full object-cover'}
      />
    </div>
  );
};

/** Subtle 3D tilt on hover, disabled under reduced-motion. */
const Tilt: React.FC<{ children: React.ReactNode; max?: number; className?: string }> = ({
  children,
  max = 6,
  className,
}) => {
  const reduce = useReducedMotion();
  const mvX = useMotionValue(0);
  const mvY = useMotionValue(0);
  const sx = useSpring(mvX, { stiffness: 200, damping: 18, mass: 0.4 });
  const sy = useSpring(mvY, { stiffness: 200, damping: 18, mass: 0.4 });
  const rotateY = useTransform(sx, [-0.5, 0.5], [-max, max]);
  const rotateX = useTransform(sy, [-0.5, 0.5], [max, -max]);

  if (reduce) return <div className={className}>{children}</div>;

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mvX.set((e.clientX - r.left) / r.width - 0.5);
    mvY.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    mvX.set(0);
    mvY.set(0);
  };

  return (
    <motion.div
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={className}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        transformPerspective: 1200,
      }}
    >
      {children}
    </motion.div>
  );
};

// ── Tile components ──────────────────────────────────────────────────────
const TileCard: React.FC<{ tile: Tile }> = ({ tile }) => {
  const cs = itemCaseStudies[tile.itemId];
  const inner = (
    <Tilt className="w-full h-full">
      <div className="group relative overflow-hidden bg-[hsl(var(--bg-secondary))] aspect-[4/5] shadow-[0_20px_60px_-30px_rgba(79,70,229,0.4)]">
        <ParallaxImage
          src={tile.image}
          alt={tile.title}
          className="absolute inset-0 w-full h-full"
          imgClassName="w-full h-full object-cover opacity-60 group-hover:opacity-90 transition-opacity duration-700"
          range={40}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--bg-primary))] via-[hsl(var(--bg-primary))]/40 to-transparent pointer-events-none" />
        <div className="absolute inset-0 p-6 flex flex-col justify-end" style={{ transform: 'translateZ(30px)' }}>
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[hsl(var(--accent-blue-hover))] mb-2" style={FONT_HEAD}>
            {tile.eyebrow}
          </span>
          <p className="text-base md:text-lg font-semibold leading-tight text-white" style={FONT_HEAD}>
            {tile.title}
          </p>
          {cs ? (
            <span className="mt-3 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[hsl(var(--accent-blue-hover))] opacity-0 group-hover:opacity-100 transition-opacity">
              Case study <span aria-hidden="true">→</span>
            </span>
          ) : null}
        </div>
        <div
          className="absolute top-4 right-4 h-8 w-8 rounded-full border border-white/20 flex items-center justify-center text-xs text-white/70 group-hover:bg-[hsl(var(--accent-blue))] group-hover:border-[hsl(var(--accent-blue))] group-hover:text-white transition-all"
          style={{ transform: 'translateZ(50px)' }}
        >
          ↗
        </div>
      </div>
    </Tilt>
  );
  return cs ? (
    <Link to={`/case-studies/${cs.id}`} aria-label={`${tile.title} — view case study`}>
      {inner}
    </Link>
  ) : (
    inner
  );
};

const Chips: React.FC<{ items: { id: string; name: string }[]; usedIds: string[] }> = ({ items, usedIds }) => {
  const remaining = items.filter((it) => !usedIds.includes(it.id));
  return (
    <motion.ul
      className="mt-10 flex flex-wrap gap-2"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={staggerParent}
    >
      {remaining.map((it) => {
        const cs = itemCaseStudies[it.id];
        const base =
          'inline-flex items-center gap-2 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] border border-white/10 bg-[hsl(var(--bg-primary))]/40 transition-colors';
        return (
          <motion.li key={it.id} variants={fadeUp}>
            {cs ? (
              <Link
                to={`/case-studies/${cs.id}`}
                className={`${base} text-white/80 hover:text-white hover:bg-[hsl(var(--accent-blue))] hover:border-[hsl(var(--accent-blue))]`}
                style={FONT_HEAD}
              >
                {it.name}
                <span className="text-[hsl(var(--accent-blue-hover))]" aria-hidden="true">→</span>
              </Link>
            ) : (
              <span className={`${base} text-white/60`} style={FONT_HEAD}>
                {it.name}
              </span>
            )}
          </motion.li>
        );
      })}
    </motion.ul>
  );
};

// ── Page ─────────────────────────────────────────────────────────────────
const Solutions = () => {
  const reduce = useReducedMotion();
  const viewport = { once: true, amount: 0.2 };
  const initial = reduce ? false : 'hidden';
  const whileInView = reduce ? undefined : 'show';

  const process = solutions.find((p) => p.id === 'process')!;
  const machines = solutions.find((p) => p.id === 'machines')!;
  const training = solutions.find((p) => p.id === 'training')!;

  // Hero parallax (subtle drift on the background image)
  const heroRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroProg } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroY = useTransform(heroProg, [0, 1], [0, 140]);
  const heroOpacity = useTransform(heroProg, [0, 1], [1, 0.25]);

  return (
    <div className="min-h-screen bg-[hsl(var(--bg-primary))] text-[hsl(var(--text-primary))]" style={FONT_BODY}>
      <SEO
        title="Solutions — DCS, PLC, SCADA & Machine Automation"
        description="Three pillars: process-industry automation, machine-level motion & converting, and customised training kits — designed and commissioned in Ghaziabad."
        path="/solutions"
      />

      <link
        href="https://fonts.googleapis.com/css2?family=Urbanist:wght@300;400;700;800;900&family=Epilogue:wght@300;400;500;600&display=swap"
        rel="stylesheet"
      />

      <Nav />

      <main>
        {/* ── HERO ───────────────────────────────────────────────────────── */}
        <header
          ref={heroRef}
          className="relative min-h-[88vh] flex flex-col justify-center px-6 md:px-20 overflow-hidden"
        >
          <motion.div
            className="absolute inset-0 z-0"
            style={reduce ? undefined : { y: heroY, opacity: heroOpacity }}
          >
            <img
              src={heroBg}
              srcSet={heroBgSrcSet}
              sizes="100vw"
              alt=""
              aria-hidden="true"
              loading="eager"
              decoding="async"
              className="w-full h-[120%] object-cover object-center opacity-30"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--bg-primary))] via-[hsl(var(--bg-primary))]/70 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--bg-primary))] via-transparent to-[hsl(var(--bg-primary))]/60" />
          </motion.div>

          <motion.div
            className="relative z-10 max-w-5xl pt-24"
            initial={initial}
            animate="show"
            variants={staggerParent}
          >
            <motion.h1
              variants={fadeUp}
              className="text-6xl sm:text-7xl md:text-[10rem] font-extrabold leading-[0.85] mb-10 tracking-tighter"
              style={FONT_HEAD}
            >
              Automation that
              <br />
              <span className="text-[hsl(var(--accent-blue-hover))]">stays running.</span>
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="text-lg md:text-2xl text-slate-300/80 max-w-3xl leading-relaxed"
            >
              DCS, PLC, SCADA, and machine automation — designed, built, and commissioned
              by a single accountable team in Ghaziabad. Brownfield migrations without
              production loss. Greenfield lines delivered on schedule.
            </motion.p>
          </motion.div>
        </header>

        {/* ── PILLAR 01 · PROCESS ────────────────────────────────────────── */}
        <section aria-labelledby="pillar-process" className="py-24 md:py-32 px-6 md:px-20 border-t border-white/5">
          <motion.div
            className="flex flex-col md:flex-row gap-12 md:gap-16"
            initial={initial}
            whileInView={whileInView}
            viewport={viewport}
            variants={staggerParent}
          >
            <motion.div variants={fadeUp} className="md:w-1/3">
              <span
                className="text-[7rem] md:text-[9rem] font-black text-[hsl(var(--bg-tertiary))]/40 block leading-none -mb-8 select-none"
                style={FONT_HEAD}
                aria-hidden="true"
              >
                01
              </span>
              <h2
                id="pillar-process"
                className="text-4xl md:text-5xl font-bold relative z-10 uppercase tracking-tight"
                style={FONT_HEAD}
              >
                Process Industry
                <br />
                <span className="text-[hsl(var(--accent-blue-hover))]">Automation</span>
              </h2>
              <p className="mt-6 text-slate-400 leading-relaxed max-w-md">{process.blurb}</p>
              <p className="mt-6 text-xs uppercase tracking-[0.3em] text-white/30" style={FONT_HEAD}>
                {process.items.length} capabilities ·{' '}
                {process.items.filter((i) => itemCaseStudies[i.id]).length} case studies
              </p>
            </motion.div>

            <div className="md:w-2/3 grid grid-cols-2 md:grid-cols-3 gap-4">
              <motion.div variants={fadeUp} className="md:col-span-1">
                <TileCard tile={processTiles[0]} />
              </motion.div>
              <motion.div variants={fadeUp} className="md:col-span-1 md:mt-16">
                <TileCard tile={processTiles[1]} />
              </motion.div>
              <motion.div variants={fadeUp} className="md:col-span-1">
                <TileCard tile={processTiles[2]} />
              </motion.div>
            </div>
          </motion.div>

          <Chips items={process.items} usedIds={processTiles.map((t) => t.itemId)} />
        </section>

        {/* ── PILLAR 02 · MACHINES ───────────────────────────────────────── */}
        <section
          aria-labelledby="pillar-machines"
          className="py-24 md:py-32 px-6 md:px-20 bg-[hsl(var(--bg-secondary))]/40 border-t border-white/5"
        >
          <motion.div
            className="flex flex-col md:flex-row-reverse gap-12 md:gap-16"
            initial={initial}
            whileInView={whileInView}
            viewport={viewport}
            variants={staggerParent}
          >
            <motion.div variants={fadeUp} className="md:w-1/3 md:text-right">
              <span
                className="text-[7rem] md:text-[9rem] font-black text-[hsl(var(--bg-tertiary))]/40 block leading-none -mb-8 select-none"
                style={FONT_HEAD}
                aria-hidden="true"
              >
                02
              </span>
              <h2
                id="pillar-machines"
                className="text-4xl md:text-5xl font-bold relative z-10 uppercase tracking-tight"
                style={FONT_HEAD}
              >
                Machine
                <br />
                <span className="text-[hsl(var(--accent-blue-hover))]">Automation</span>
              </h2>
              <p className="mt-6 text-slate-400 leading-relaxed md:ml-auto max-w-md">
                {machines.blurb}
              </p>
              <p className="mt-6 text-xs uppercase tracking-[0.3em] text-white/30" style={FONT_HEAD}>
                {machines.items.length} capabilities ·{' '}
                {machines.items.filter((i) => itemCaseStudies[i.id]).length} case studies
              </p>
            </motion.div>

            <div className="md:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {machineTiles.map((tile) => {
                const cs = itemCaseStudies[tile.itemId];
                const card = (
                  <Tilt max={5} className="w-full">
                    <div className="group relative overflow-hidden">
                      <ParallaxImage
                        src={tile.image}
                        alt={tile.title}
                        className="relative aspect-video bg-[hsl(var(--bg-secondary))]"
                        imgClassName="w-full h-full object-cover"
                        range={60}
                      />
                      <div
                        className="mt-5 flex items-start justify-between gap-4"
                        style={{ transform: 'translateZ(20px)' }}
                      >
                        <div>
                          <span
                            className="text-[10px] font-bold uppercase tracking-[0.3em] text-[hsl(var(--accent-blue-hover))]"
                            style={FONT_HEAD}
                          >
                            {tile.eyebrow}
                          </span>
                          <h4 className="text-xl md:text-2xl font-bold mt-1" style={FONT_HEAD}>
                            {tile.title}
                          </h4>
                          {cs ? (
                            <p className="text-sm text-slate-400 mt-2">Case study: {cs.client}</p>
                          ) : null}
                        </div>
                        <div className="shrink-0 h-10 w-10 flex items-center justify-center border border-white/10 rounded-full group-hover:bg-[hsl(var(--accent-blue))] group-hover:border-[hsl(var(--accent-blue))] transition-all">
                          <span className="text-xs">↗</span>
                        </div>
                      </div>
                    </div>
                  </Tilt>
                );
                return (
                  <motion.div key={tile.itemId} variants={fadeUp}>
                    {cs ? <Link to={`/case-studies/${cs.id}`}>{card}</Link> : card}
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          <Chips items={machines.items} usedIds={machineTiles.map((t) => t.itemId)} />
        </section>

        {/* ── PILLAR 03 · EDUCATION ──────────────────────────────────────── */}
        <section
          aria-labelledby="pillar-training"
          className="py-24 md:py-32 px-6 md:px-20 border-t border-white/5 overflow-hidden"
        >
          <motion.div
            className="max-w-7xl mx-auto"
            initial={initial}
            whileInView={whileInView}
            viewport={viewport}
            variants={staggerParent}
          >
            <motion.div
              variants={fadeUp}
              className="relative overflow-hidden bg-[hsl(var(--bg-secondary))] border border-white/5 p-8 md:p-16"
            >
              <div className="absolute right-0 top-0 w-full md:w-1/2 h-full opacity-50">
                <ParallaxImage
                  src={imgTraining}
                  alt=""
                  className="w-full h-full"
                  imgClassName="w-full h-full object-cover"
                  range={70}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--bg-secondary))] via-[hsl(var(--bg-secondary))]/70 md:via-transparent to-transparent pointer-events-none" />
              </div>

              <div className="relative z-10 md:w-1/2">
                <span
                  className="text-[7rem] md:text-[9rem] font-black text-[hsl(var(--bg-tertiary))]/40 block leading-none -mb-8 select-none"
                  style={FONT_HEAD}
                  aria-hidden="true"
                >
                  03
                </span>
                <h2
                  id="pillar-training"
                  className="text-4xl md:text-5xl font-bold uppercase tracking-tight mb-6"
                  style={FONT_HEAD}
                >
                  Education &
                  <br />
                  <span className="text-[hsl(var(--accent-blue-hover))]">Training</span>
                </h2>
                <p className="text-slate-300 mb-10 leading-relaxed max-w-md">{training.blurb}</p>

                <motion.ul
                  className="space-y-3 mb-10 max-w-md"
                  initial="hidden"
                  whileInView="show"
                  viewport={viewport}
                  variants={staggerParent}
                >
                  {training.items.map((it) => (
                    <motion.li
                      key={it.id}
                      variants={fadeUp}
                      className="flex items-center gap-3 text-sm text-slate-300"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--accent-blue))]" />
                      <span style={FONT_HEAD} className="uppercase tracking-[0.12em] text-xs">
                        {it.name}
                      </span>
                    </motion.li>
                  ))}
                </motion.ul>

                <Link
                  to="/case-studies"
                  className="inline-block bg-white text-[hsl(var(--bg-primary))] px-8 py-3 font-bold text-xs uppercase tracking-[0.2em] hover:bg-[hsl(var(--accent-blue))] hover:text-white transition-all"
                  style={FONT_HEAD}
                >
                  Request Catalogue
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </section>

        <CtaStrip />
      </main>
      <Footer />
    </div>
  );
};

export default Solutions;
