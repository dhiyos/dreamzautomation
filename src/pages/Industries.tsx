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
const heroVideo = { url: '/videos/industries-hero.mp4' };
import imgPetrochem from '@/assets/industries/petrochem.jpg?w=1400&format=webp';
import imgConverting from '@/assets/industries/converting.jpg?w=1000&format=webp';
import imgAutomotive from '@/assets/industries/automotive.jpg?w=1000&format=webp';
import imgMetro from '@/assets/industries/metro.jpg?w=1200&format=webp';
import imgEducation from '@/assets/industries/education.jpg?w=1200&format=webp';

const FONT_HEAD: React.CSSProperties = {};
const FONT_BODY: React.CSSProperties = {};

const INK = 'hsl(var(--bg-primary))';
const SURFACE = 'hsl(var(--bg-secondary))';
const INDIGO = 'hsl(var(--accent-blue))';
const INDIGO_SOFT = 'hsl(var(--accent-blue-hover))';

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

// ── Editorial band (one industry, full-width, alternating sides) ─────────
const IndustryBand: React.FC<{ id: ImgKey; index: number }> = ({ id, index }) => {
  const ind = get(id);
  if (!ind) return null;
  const imageLeft = index % 2 === 0;

  const accentColor =
    INDIGO_SOFT;

  const media = (
    <div className="relative w-full" style={{ aspectRatio: '4 / 3' }}>
      <ParallaxImage
        src={heroImages[id]}
        alt={ind.name}
        className="absolute inset-0 w-full h-full"
        imgClassName="w-full h-full object-cover"
        range={50}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(180deg, rgba(10,10,26,0) 60%, rgba(10,10,26,0.55) 100%)',
        }}
      />
    </div>
  );

  const copy = (
    <div className="relative">
      <span
        aria-hidden="true"
        className="absolute -top-10 md:-top-14 -left-2 md:-left-4 font-black select-none pointer-events-none leading-none"
        style={{
          ...FONT_HEAD,
          fontSize: 'clamp(120px, 18vw, 240px)',
          color: 'rgba(79,70,229,0.07)',
          letterSpacing: '-0.05em',
        }}
      >
        {String(index + 1).padStart(2, '0')}
      </span>

      <div className="relative">
        <div
          className="text-[11px] font-bold uppercase tracking-[0.35em] mb-6 flex items-center gap-3"
          style={{ ...FONT_HEAD, color: accentColor }}
        >
          <span
            aria-hidden="true"
            style={{ background: accentColor, width: 28, height: 1, display: 'inline-block' }}
          />
          {String(index + 1).padStart(2, '0')} · {ind.pillarLabel}
        </div>

        <h3
          className="text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-bold leading-[1.02] tracking-[-0.02em] text-white mb-8"
          style={FONT_HEAD}
        >
          {ind.name}
        </h3>

        <p
          className="text-base md:text-lg leading-relaxed text-white/70 max-w-[58ch] mb-10"
          style={FONT_BODY}
        >
          {ind.blurb}
        </p>

        {ind.caseStudySlug ? (
          <span
            className="inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.25em] text-white"
            style={FONT_HEAD}
          >
            <span
              aria-hidden="true"
              className="block h-px w-10 group-hover:w-16 transition-all duration-500"
              style={{ background: accentColor }}
            />
            Explore more →
          </span>
        ) : null}
      </div>
    </div>
  );

  const inner = (
    <motion.div
      variants={fadeUp}
      className="group grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 lg:gap-20 items-center"
    >
      <div className={`md:col-span-7 ${imageLeft ? 'md:order-1' : 'md:order-2'}`}>{media}</div>
      <div className={`md:col-span-5 ${imageLeft ? 'md:order-2' : 'md:order-1'}`}>{copy}</div>
    </motion.div>
  );

  if (ind.caseStudySlug) {
    return (
      <Link
        to={`/case-studies/${ind.caseStudySlug}`}
        aria-label={`${ind.name} — explore more`}
        className="block"
      >
        {inner}
      </Link>
    );
  }
  return inner;
};

// ── Quiet typographic row for "Also serving" ─────────────────────────────
const AlsoServingRow: React.FC<{ id: string; index: number }> = ({ id, index }) => {
  const ind = get(id);
  if (!ind) return null;
  return (
    <motion.li
      variants={fadeUp}
      className="grid grid-cols-12 gap-6 md:gap-10 items-baseline py-7 md:py-9 border-t border-white/10"
    >
      <div
        className="col-span-2 md:col-span-1 text-[11px] font-bold tracking-[0.25em] pt-1"
        style={{ ...FONT_HEAD, color: INDIGO_SOFT }}
      >
        {String(index + 6).padStart(2, '0')}
      </div>
      <h3
        className="col-span-10 md:col-span-4 text-xl md:text-2xl font-bold text-white tracking-tight"
        style={FONT_HEAD}
      >
        {ind.name}
      </h3>
      <div
        className="hidden md:block md:col-span-2 text-[10px] font-bold uppercase tracking-[0.3em] text-white/40"
        style={FONT_HEAD}
      >
        {ind.pillarLabel}
      </div>
      <p
        className="col-span-12 md:col-span-5 text-sm md:text-[15px] leading-relaxed text-white/60"
        style={FONT_BODY}
      >
        {ind.blurb}
      </p>
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
    <div className="min-h-screen" style={{ background: INK, color: 'hsl(var(--text-primary))', ...FONT_BODY }}>
      <SEO
        title="Industries Served — Process, Converting, Automotive & More"
        description="Two decades across petrochemicals, BOPP/converting, automotive, food, transportation, water and engineering education in India."
        path="/industries"
      />
      
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
                <span style={{ color: INDIGO_SOFT, fontStyle: 'italic', fontWeight: 600 }}>
                  Engineered to run.
                </span>
                <br />
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

              {/* Editorial stack: one industry per band, alternating sides */}
              <div className="flex flex-col gap-28 md:gap-40 lg:gap-48 mt-4">
                {featuredOrder.map((id, i) => (
                  <IndustryBand key={id} id={id} index={i} />
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── ALSO SERVING — typographic row ─────────────────────────── */}
        <section
          aria-label="Also serving"
          className="relative py-20 md:py-28 border-t border-white/5"
          style={{ background: 'linear-gradient(180deg, hsl(var(--bg-primary)) 0%, hsl(var(--bg-secondary)) 100%)' }}
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
                className="list-none border-b border-white/10"
              >
                {typographicIds.map((id, i) => (
                  <AlsoServingRow key={id} id={id} index={i} />
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
