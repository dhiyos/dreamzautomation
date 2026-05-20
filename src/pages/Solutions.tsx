import { motion, useReducedMotion } from 'framer-motion';
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

// Locked design tokens for this page (Midnight Indigo + Urbanist/Epilogue).
const FONT_HEAD: React.CSSProperties = { fontFamily: "'Urbanist', sans-serif" };
const FONT_BODY: React.CSSProperties = { fontFamily: "'Epilogue', sans-serif" };

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

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
};

const TileCard: React.FC<{ tile: Tile; tall?: boolean }> = ({ tile, tall }) => {
  const cs = itemCaseStudies[tile.itemId];
  const inner = (
    <div
      className={`group relative overflow-hidden bg-[#141432] ${tall ? 'aspect-[4/5]' : 'aspect-[4/5]'}`}
    >
      <img
        src={tile.image}
        alt={tile.title}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-90 group-hover:scale-110 transition-all duration-[900ms] ease-out"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a1a] via-[#0a0a1a]/40 to-transparent" />
      <div className="absolute inset-0 p-6 flex flex-col justify-end">
        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#a5b4fc] mb-2" style={FONT_HEAD}>
          {tile.eyebrow}
        </span>
        <p className="text-base md:text-lg font-semibold leading-tight text-white" style={FONT_HEAD}>
          {tile.title}
        </p>
        {cs ? (
          <span className="mt-3 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#4f46e5] opacity-0 group-hover:opacity-100 transition-opacity">
            Case study <span aria-hidden="true">→</span>
          </span>
        ) : null}
      </div>
      <div className="absolute top-4 right-4 h-8 w-8 rounded-full border border-white/20 flex items-center justify-center text-xs text-white/70 group-hover:bg-[#4f46e5] group-hover:border-[#4f46e5] group-hover:text-white transition-all">
        ↗
      </div>
    </div>
  );
  return cs ? <Link to={`/case-studies/${cs.id}`} aria-label={`${tile.title} — view case study`}>{inner}</Link> : inner;
};

const Chips: React.FC<{ items: { id: string; name: string }[]; usedIds: string[] }> = ({ items, usedIds }) => {
  const remaining = items.filter((it) => !usedIds.includes(it.id));
  return (
    <ul className="mt-10 flex flex-wrap gap-2">
      {remaining.map((it) => {
        const cs = itemCaseStudies[it.id];
        const base =
          'inline-flex items-center gap-2 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] border border-white/10 bg-[#0a0a1a]/40 transition-colors';
        return (
          <li key={it.id}>
            {cs ? (
              <Link
                to={`/case-studies/${cs.id}`}
                className={`${base} text-white/80 hover:text-white hover:bg-[#4f46e5] hover:border-[#4f46e5]`}
                style={FONT_HEAD}
              >
                {it.name}
                <span className="text-[#a5b4fc]" aria-hidden="true">→</span>
              </Link>
            ) : (
              <span className={`${base} text-white/60`} style={FONT_HEAD}>
                {it.name}
              </span>
            )}
          </li>
        );
      })}
    </ul>
  );
};

const Solutions = () => {
  const reduce = useReducedMotion();
  const viewport = { once: true, amount: 0.2 };
  const initial = reduce ? false : 'hidden';
  const whileInView = reduce ? undefined : 'show';

  const process = solutions.find((p) => p.id === 'process')!;
  const machines = solutions.find((p) => p.id === 'machines')!;
  const training = solutions.find((p) => p.id === 'training')!;

  return (
    <div className="min-h-screen bg-[#0a0a1a] text-[#f8fafc]" style={FONT_BODY}>
      <SEO
        title="Solutions — DCS, PLC, SCADA & Machine Automation"
        description="Three pillars: process-industry automation, machine-level motion & converting, and customised training kits — designed and commissioned in Ghaziabad."
        path="/solutions"
      />

      {/* Fonts loaded once for the page */}
      <link
        href="https://fonts.googleapis.com/css2?family=Urbanist:wght@300;400;700;800;900&family=Epilogue:wght@300;400;500;600&display=swap"
        rel="stylesheet"
      />

      <Nav />

      <main>
        {/* ── HERO ───────────────────────────────────────────────────────── */}
        <header className="relative min-h-[88vh] flex flex-col justify-center px-6 md:px-20 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              src={heroBg}
              srcSet={heroBgSrcSet}
              sizes="100vw"
              alt=""
              aria-hidden="true"
              loading="eager"
              decoding="async"
              className="w-full h-full object-cover object-center opacity-30"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a1a] via-[#0a0a1a]/70 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a1a] via-transparent to-[#0a0a1a]/60" />
          </div>

          <motion.div
            className="relative z-10 max-w-5xl pt-24"
            initial={initial}
            whileInView={whileInView}
            viewport={viewport}
            variants={fadeUp}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="h-px w-12 bg-[#4f46e5]" />
              <span
                className="text-[#a5b4fc] font-bold tracking-[0.35em] text-[10px] uppercase"
                style={FONT_HEAD}
              >
                Expertise & Solutions
              </span>
            </div>
            <h1
              className="text-6xl sm:text-7xl md:text-9xl font-extrabold leading-[0.85] mb-8 tracking-tighter"
              style={FONT_HEAD}
            >
              THREE
              <br />
              PILLARS.
            </h1>
            <p className="text-lg md:text-2xl text-slate-300/80 max-w-2xl leading-relaxed">
              From process-wide control to high-speed machine motion to the next generation of plant
              engineers — precision delivered out of one accountable team in Ghaziabad.
            </p>

            <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 text-[10px] tracking-[0.25em] uppercase font-bold text-white/40" style={FONT_HEAD}>
              <span className="inline-flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#4f46e5]" /> Siemens System House · 2007
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#4f46e5]" /> ISO 9001:2015
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#4f46e5]" /> CE Marked · TÜV India
              </span>
            </div>
          </motion.div>
        </header>

        {/* ── PILLAR 01 · PROCESS ────────────────────────────────────────── */}
        <section aria-labelledby="pillar-process" className="py-24 md:py-32 px-6 md:px-20 border-t border-white/5">
          <motion.div
            className="flex flex-col md:flex-row gap-12 md:gap-16"
            initial={initial}
            whileInView={whileInView}
            viewport={viewport}
            variants={fadeUp}
          >
            <div className="md:w-1/3">
              <span
                className="text-[7rem] md:text-[9rem] font-black text-[#1e1e5a]/40 block leading-none -mb-8 select-none"
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
                <span className="text-[#a5b4fc]">Automation</span>
              </h2>
              <p className="mt-6 text-slate-400 leading-relaxed max-w-md">{process.blurb}</p>
              <p className="mt-6 text-xs uppercase tracking-[0.3em] text-white/30" style={FONT_HEAD}>
                {process.items.length} capabilities · {process.items.filter((i) => itemCaseStudies[i.id]).length} case studies
              </p>
            </div>

            <div className="md:w-2/3 grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="md:col-span-1">
                <TileCard tile={processTiles[0]} />
              </div>
              <div className="md:col-span-1 md:mt-16">
                <TileCard tile={processTiles[1]} />
              </div>
              <div className="md:col-span-1">
                <TileCard tile={processTiles[2]} />
              </div>
            </div>
          </motion.div>

          <Chips items={process.items} usedIds={processTiles.map((t) => t.itemId)} />
        </section>

        {/* ── PILLAR 02 · MACHINES ───────────────────────────────────────── */}
        <section
          aria-labelledby="pillar-machines"
          className="py-24 md:py-32 px-6 md:px-20 bg-[#141432]/40 border-t border-white/5"
        >
          <motion.div
            className="flex flex-col md:flex-row-reverse gap-12 md:gap-16"
            initial={initial}
            whileInView={whileInView}
            viewport={viewport}
            variants={fadeUp}
          >
            <div className="md:w-1/3 md:text-right">
              <span
                className="text-[7rem] md:text-[9rem] font-black text-[#1e1e5a]/40 block leading-none -mb-8 select-none"
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
                <span className="text-[#a5b4fc]">Automation</span>
              </h2>
              <p className="mt-6 text-slate-400 leading-relaxed md:ml-auto max-w-md">
                {machines.blurb}
              </p>
              <p className="mt-6 text-xs uppercase tracking-[0.3em] text-white/30" style={FONT_HEAD}>
                {machines.items.length} capabilities · {machines.items.filter((i) => itemCaseStudies[i.id]).length} case studies
              </p>
            </div>

            <div className="md:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {machineTiles.map((tile) => {
                const cs = itemCaseStudies[tile.itemId];
                const card = (
                  <div className="group relative overflow-hidden">
                    <div className="relative aspect-video overflow-hidden bg-[#141432]">
                      <img
                        src={tile.image}
                        alt={tile.title}
                        loading="lazy"
                        decoding="async"
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-[900ms] ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a1a]/40 to-transparent" />
                    </div>
                    <div className="mt-5 flex items-start justify-between gap-4">
                      <div>
                        <span
                          className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#a5b4fc]"
                          style={FONT_HEAD}
                        >
                          {tile.eyebrow}
                        </span>
                        <h4 className="text-xl md:text-2xl font-bold mt-1" style={FONT_HEAD}>
                          {tile.title}
                        </h4>
                        {cs ? (
                          <p className="text-sm text-slate-400 mt-2">
                            Case study: {cs.client}
                          </p>
                        ) : null}
                      </div>
                      <div className="shrink-0 h-10 w-10 flex items-center justify-center border border-white/10 rounded-full group-hover:bg-[#4f46e5] group-hover:border-[#4f46e5] transition-all">
                        <span className="text-xs">↗</span>
                      </div>
                    </div>
                  </div>
                );
                return cs ? (
                  <Link key={tile.itemId} to={`/case-studies/${cs.id}`}>
                    {card}
                  </Link>
                ) : (
                  <div key={tile.itemId}>{card}</div>
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
            variants={fadeUp}
          >
            <div className="relative overflow-hidden bg-[#141432] border border-white/5 p-8 md:p-16">
              <div className="absolute right-0 top-0 w-full md:w-1/2 h-full opacity-50">
                <img
                  src={imgTraining}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#141432] via-[#141432]/70 md:via-transparent to-transparent" />
              </div>

              <div className="relative z-10 md:w-1/2">
                <span
                  className="text-[7rem] md:text-[9rem] font-black text-[#1e1e5a]/40 block leading-none -mb-8 select-none"
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
                  <span className="text-[#a5b4fc]">Training</span>
                </h2>
                <p className="text-slate-300 mb-10 leading-relaxed max-w-md">{training.blurb}</p>

                <ul className="space-y-3 mb-10 max-w-md">
                  {training.items.map((it) => (
                    <li
                      key={it.id}
                      className="flex items-center gap-3 text-sm text-slate-300"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#4f46e5]" />
                      <span style={FONT_HEAD} className="uppercase tracking-[0.12em] text-xs">
                        {it.name}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link
                  to="/case-studies"
                  className="inline-block bg-white text-[#0a0a1a] px-8 py-3 font-bold text-xs uppercase tracking-[0.2em] hover:bg-[#4f46e5] hover:text-white transition-all"
                  style={FONT_HEAD}
                >
                  Request Catalogue
                </Link>
              </div>
            </div>
          </motion.div>
        </section>

        <CtaStrip />
      </main>
      <Footer />
    </div>
  );
};

export default Solutions;
