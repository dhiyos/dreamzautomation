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
import { industries } from '@/data/industries';

import heroBg from '@/assets/solutions-hero-bg.jpg?w=1920&format=webp';
import heroBgSrcSet from '@/assets/solutions-hero-bg.jpg?w=768;1280;1920&format=webp&as=srcset';
import heroVideo from '@/assets/industries/hero.mp4.asset.json';
import imgPetrochem from '@/assets/industries/petrochem.jpg?w=1400&format=webp';
import imgConverting from '@/assets/industries/converting.jpg?w=1000&format=webp';
import imgAutomotive from '@/assets/industries/automotive.jpg?w=1000&format=webp';
import imgMetro from '@/assets/industries/metro.jpg?w=1200&format=webp';
import imgEducation from '@/assets/industries/education.jpg?w=1200&format=webp';

const FONT_HEAD: React.CSSProperties = { fontFamily: "'Urbanist', sans-serif" };
const FONT_BODY: React.CSSProperties = { fontFamily: "'Epilogue', sans-serif" };

const INK = '#0a0a1a';
const SURFACE = '#141432';
const INDIGO = '#4f46e5';
const INDIGO_SOFT = '#a5b4fc';

// ── Motion primitives ────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};
const staggerParent = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

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
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
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

const Tilt: React.FC<{ children: React.ReactNode; max?: number; className?: string }> = ({
  children,
  max = 5,
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

// ── Data wiring ──────────────────────────────────────────────────────────
type ImgKey = 'petrochemicals' | 'converting-films' | 'automotive' | 'transportation' | 'education';
const heroImages: Record<ImgKey, string> = {
  petrochemicals: imgPetrochem,
  'converting-films': imgConverting,
  automotive: imgAutomotive,
  transportation: imgMetro,
  education: imgEducation,
};

const indexById = Object.fromEntries(industries.map((i) => [i.id, i]));
const get = (id: string) => indexById[id];

const featuredOrder: ImgKey[] = [
  'petrochemicals',
  'converting-films',
  'automotive',
  'transportation',
  'education',
];
const typographicIds = ['food-beverage', 'water', 'building-services', 'ceramics'];

// ── Image-led bento tile ─────────────────────────────────────────────────
const ImageTile: React.FC<{
  id: ImgKey;
  index: number;
  className?: string;
}> = ({ id, index, className }) => {
  const ind = get(id);
  if (!ind) return null;
  const inner = (
    <Tilt className="w-full h-full">
      <div
        className="group relative overflow-hidden h-full"
        style={{
          background: SURFACE,
          boxShadow: '0 30px 80px -40px rgba(79,70,229,0.45)',
        }}
      >
        <ParallaxImage
          src={heroImages[id]}
          alt={ind.name}
          className="absolute inset-0 w-full h-full"
          imgClassName="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-[900ms]"
          range={45}
        />
        {/* gradient overlays */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(180deg, rgba(10,10,26,0.15) 0%, rgba(10,10,26,0.55) 55%, rgba(10,10,26,0.92) 100%)',
          }}
        />
        {/* indigo edge wash on hover */}
        <div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          style={{
            background:
              'radial-gradient(ellipse at top right, rgba(79,70,229,0.35), transparent 60%)',
          }}
        />

        {/* numeric index */}
        <div
          className="absolute top-5 left-6 text-[10px] font-bold uppercase tracking-[0.35em]"
          style={{ ...FONT_HEAD, color: INDIGO_SOFT, transform: 'translateZ(40px)' }}
        >
          {String(index + 1).padStart(2, '0')} · {ind.pillarLabel}
        </div>

        {/* arrow */}
        <div
          className="absolute top-4 right-4 h-9 w-9 rounded-full border border-white/20 flex items-center justify-center text-sm text-white/70 group-hover:bg-[#4f46e5] group-hover:border-[#4f46e5] group-hover:text-white transition-all duration-300"
          style={{ transform: 'translateZ(60px)' }}
        >
          ↗
        </div>

        {/* content */}
        <div
          className="absolute inset-x-0 bottom-0 p-6 md:p-8 flex flex-col gap-3"
          style={{ transform: 'translateZ(30px)' }}
        >
          <h3
            className="text-2xl md:text-[28px] lg:text-3xl font-bold leading-[1.05] text-white tracking-tight"
            style={FONT_HEAD}
          >
            {ind.name}
          </h3>
          <p
            className="text-sm md:text-[15px] leading-relaxed text-white/70 max-w-[52ch] line-clamp-3 md:line-clamp-4"
            style={FONT_BODY}
          >
            {ind.blurb}
          </p>
          {ind.caseStudySlug ? (
            <div className="mt-2 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.22em] text-[#a5b4fc]">
              <span
                aria-hidden="true"
                style={{ background: INDIGO, width: 24, height: 1, display: 'inline-block' }}
              />
              <span className="truncate" style={FONT_HEAD}>
                Explore more →
              </span>
            </div>
          ) : null}
        </div>
      </div>
    </Tilt>
  );

  const wrapperClass = className;
  return ind.caseStudySlug ? (
    <Link
      to={`/case-studies/${ind.caseStudySlug}`}
      aria-label={`${ind.name} — explore more`}
      className={wrapperClass}
    >
      {inner}
    </Link>
  ) : (
    <div className={wrapperClass}>{inner}</div>
  );
};

// ── Typographic tile (no image) ──────────────────────────────────────────
const TypoTile: React.FC<{ id: string; index: number }> = ({ id, index }) => {
  const ind = get(id);
  if (!ind) return null;
  return (
    <motion.li
      variants={fadeUp}
      className="group relative h-full p-7 md:p-8 border border-white/10 hover:border-[#4f46e5]/60 transition-colors duration-300"
      style={{ background: 'rgba(20,20,50,0.4)', backdropFilter: 'blur(6px)' }}
    >
      <div
        className="text-[10px] font-bold uppercase tracking-[0.35em] mb-5"
        style={{ ...FONT_HEAD, color: INDIGO_SOFT }}
      >
        {String(index + 6).padStart(2, '0')} · {ind.pillarLabel}
      </div>
      <h3
        className="text-xl md:text-2xl font-bold leading-tight text-white tracking-tight mb-3"
        style={FONT_HEAD}
      >
        {ind.name}
      </h3>
      <p className="text-sm leading-relaxed text-white/65" style={FONT_BODY}>
        {ind.blurb}
      </p>
      <div
        aria-hidden="true"
        className="absolute left-0 top-0 h-px w-0 group-hover:w-full transition-all duration-700"
        style={{ background: INDIGO }}
      />
    </motion.li>
  );
};

// ── Page ─────────────────────────────────────────────────────────────────
const Industries: React.FC = () => {
  const reduce = useReducedMotion();
  const heroRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroProg } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroY = useTransform(heroProg, [0, 1], [0, 160]);
  const heroOpacity = useTransform(heroProg, [0, 1], [1, 0.3]);

  return (
    <div className="min-h-screen" style={{ background: INK, color: '#fff', ...FONT_BODY }}>
      <SEO
        title="Industries Served — Process, Converting, Automotive & More"
        description="Two decades across petrochemicals, BOPP/converting, automotive, food, transportation, water and engineering education in India."
        path="/industries"
      />
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Urbanist:wght@400;600;700;800;900&family=Epilogue:wght@300;400;500;600&display=swap');`}</style>
      <Nav />
      <main>
        {/* ── HERO ────────────────────────────────────────────────────── */}
        <section
          ref={heroRef}
          aria-labelledby="industries-page-heading"
          className="relative overflow-hidden"
          style={{ minHeight: '92vh', background: INK }}
        >
          <motion.video
            src={heroVideo.url}
            poster={heroBg}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover"
            style={reduce ? { opacity: 0.35 } : { y: heroY, opacity: heroOpacity, scale: 1.1 }}
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'linear-gradient(180deg, rgba(10,10,26,0.55) 0%, rgba(10,10,26,0.7) 40%, rgba(10,10,26,0.98) 100%)',
            }}
          />
          {/* indigo accent grid */}
          <div
            className="absolute inset-0 pointer-events-none opacity-40"
            style={{
              backgroundImage:
                'linear-gradient(rgba(79,70,229,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(79,70,229,0.12) 1px, transparent 1px)',
              backgroundSize: '80px 80px',
              maskImage:
                'radial-gradient(ellipse at 70% 30%, rgba(0,0,0,0.6), transparent 70%)',
            }}
          />

          <div className="relative max-w-[1400px] mx-auto px-6 md:px-10 lg:px-14 pt-44 md:pt-56 pb-24">
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-[1100px]"
            >
              <h1
                id="industries-page-heading"
                className="text-[44px] sm:text-6xl md:text-7xl lg:text-[112px] font-black leading-[0.92] tracking-[-0.03em] text-white"
                style={FONT_HEAD}
              >
                Refineries, lines, tunnels &amp; plant floors.
                <br />
                <span style={{ color: INDIGO_SOFT, fontStyle: 'italic', fontWeight: 600 }}>
                  Engineered to run.
                </span>{' '}
                Built to last.
              </h1>
              <p
                className="mt-10 max-w-[640px] text-base md:text-lg leading-relaxed text-white/75"
                style={FONT_BODY}
              >
                From hot-standby refining controls to metro tunnel SCADA, BOPP converting lines to
                Siemens-grade training kits — we know these floors cold. Below is where our work
                has lived, what we've shipped, and where you'll find us this decade.
              </p>

              <div className="mt-14 flex flex-wrap items-center gap-x-10 gap-y-4 text-[11px] uppercase tracking-[0.3em] font-bold text-white/50" style={FONT_HEAD}>
                <span><span style={{ color: INDIGO_SOFT }}>20+</span> &nbsp; Years on the floor</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── BENTO GRID: 5 image-led ─────────────────────────────────── */}
        <section aria-label="Featured industries" className="relative py-20 md:py-32">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-14">
            <motion.div
              initial={reduce ? false : 'hidden'}
              whileInView="show"
              viewport={{ once: true, amount: 0.15 }}
              variants={staggerParent}
            >
              <motion.div variants={fadeUp} className="mb-12 md:mb-16 flex items-end justify-between gap-8 flex-wrap">
                <div>
                  <div
                    className="text-[10px] font-bold uppercase tracking-[0.4em] mb-5"
                    style={{ ...FONT_HEAD, color: INDIGO_SOFT }}
                  >
                    <span style={{ background: INDIGO, width: 24, height: 1, display: 'inline-block', verticalAlign: 'middle', marginRight: 12 }} />
                    Featured · 01 — 05
                  </div>
                  <h2
                    className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[0.95] tracking-tight text-white"
                    style={FONT_HEAD}
                  >
                    Where the work <span style={{ color: INDIGO_SOFT, fontStyle: 'italic', fontWeight: 600 }}>lives.</span>
                  </h2>
                </div>
                <p className="max-w-[420px] text-sm md:text-base text-white/65 leading-relaxed" style={FONT_BODY}>
                  Verticals with the deepest case-study pedigree — refining, converting, automotive,
                  transportation and education.
                </p>
              </motion.div>

              {/* Bento layout */}
              <motion.div
                variants={staggerParent}
                className="grid gap-4 md:gap-5"
                style={{
                  gridTemplateColumns: 'repeat(12, minmax(0, 1fr))',
                  gridAutoRows: 'minmax(260px, auto)',
                }}
              >
                <motion.div
                  variants={fadeUp}
                  className="col-span-12 md:col-span-8 md:row-span-2"
                  style={{ minHeight: 540 }}
                >
                  <ImageTile id="petrochemicals" index={featuredOrder.indexOf('petrochemicals')} className="block h-full" />
                </motion.div>
                <motion.div variants={fadeUp} className="col-span-12 md:col-span-4">
                  <ImageTile id="converting-films" index={featuredOrder.indexOf('converting-films')} className="block h-full" />
                </motion.div>
                <motion.div variants={fadeUp} className="col-span-12 md:col-span-4">
                  <ImageTile id="automotive" index={featuredOrder.indexOf('automotive')} className="block h-full" />
                </motion.div>
                <motion.div
                  variants={fadeUp}
                  className="col-span-12 md:col-span-7"
                  style={{ minHeight: 360 }}
                >
                  <ImageTile id="transportation" index={featuredOrder.indexOf('transportation')} className="block h-full" />
                </motion.div>
                <motion.div
                  variants={fadeUp}
                  className="col-span-12 md:col-span-5"
                  style={{ minHeight: 360 }}
                >
                  <ImageTile id="education" index={featuredOrder.indexOf('education')} className="block h-full" />
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ── ALSO SERVING — typographic row ─────────────────────────── */}
        <section
          aria-label="Also serving"
          className="relative py-20 md:py-28 border-t border-white/5"
          style={{ background: 'linear-gradient(180deg, #0a0a1a 0%, #0d0d24 100%)' }}
        >
          <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-14">
            <motion.div
              initial={reduce ? false : 'hidden'}
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              variants={staggerParent}
            >
              <motion.div variants={fadeUp} className="mb-12 md:mb-16 flex items-end justify-between gap-8 flex-wrap">
                <div>
                  <div
                    className="text-[10px] font-bold uppercase tracking-[0.4em] mb-5"
                    style={{ ...FONT_HEAD, color: INDIGO_SOFT }}
                  >
                    <span style={{ background: INDIGO, width: 24, height: 1, display: 'inline-block', verticalAlign: 'middle', marginRight: 12 }} />
                    Also serving · 06 — 09
                  </div>
                  <h2
                    className="text-3xl md:text-4xl lg:text-5xl font-bold leading-[0.95] tracking-tight text-white"
                    style={FONT_HEAD}
                  >
                    Adjacent floors we know <span style={{ color: INDIGO_SOFT, fontStyle: 'italic', fontWeight: 600 }}>by feel.</span>
                  </h2>
                </div>
                <p className="max-w-[420px] text-sm md:text-base text-white/65 leading-relaxed" style={FONT_BODY}>
                  Food &amp; beverage, water treatment, BMS, ceramics — verticals where our Siemens
                  pedigree carries over directly.
                </p>
              </motion.div>

              <motion.ul
                variants={staggerParent}
                className="grid gap-4 md:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 list-none"
              >
                {typographicIds.map((id, i) => (
                  <TypoTile key={id} id={id} index={i} />
                ))}
              </motion.ul>
            </motion.div>
          </div>
        </section>

        <CtaStrip />
      </main>
      <Footer />
    </div>
  );
};

export default Industries;
