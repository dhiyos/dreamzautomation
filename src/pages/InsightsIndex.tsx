import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Nav from '@/components/Nav';
import Footer from '@/components/sections/Footer';
import CtaStrip from '@/components/sections/CtaStrip';
import PageHero from '@/components/shared/PageHero';
import SectionShell from '@/components/shared/SectionShell';
import SectionHeader from '@/components/shared/SectionHeader';
import { insights } from '@/data/insights';
import { fadeUp, stagger, useEntrance } from '@/lib/motion';
import SEO from '@/components/shared/SEO';

const PILLAR_ORDER: Array<{
  pillar: 'technical' | 'market' | 'founder';
  label: string;
  descriptor: string;
}> = [
  {
    pillar: 'technical',
    label: 'Technical Knowledge',
    descriptor:
      'Engineering deep-dives from Piyush and Tapeshwer — SCADA architecture, IT-OT integration, and Siemens-stack migration patterns drawn from real plant work.',
  },
  {
    pillar: 'market',
    label: 'Market & Machine Dynamics',
    descriptor:
      'How verticals are actually digitalising on the plant floor — written from inside the converting, automotive, and process installed base, not from a desk.',
  },
  {
    pillar: 'founder',
    label: 'Founder Commentary',
    descriptor:
      'Vinod on where the industry is actually moving — what plants buy, what they refuse, and what changes when the machine starts producing data the maintenance team can act on.',
  },
];

const InsightsIndex = () => {
  const entrance = useEntrance();
  const published = insights.filter((i) => i.status === 'published' && i.slug);

  return (
    <div className="min-h-screen bg-bg-primary">
      <Nav />
      <main>
        <PageHero
          eyebrow="Insights"
          headingId="insights-page-heading"
          heading={
            <>
              Notes from the people{' '}
              <span className="page-hero-heading-accent">
                doing the work.
              </span>
            </>
          }
          descriptor="Founder-authored — every piece. No ghostwriting, no agency copy. Technical knowledge, market dynamics, and commentary that comes out of running an installed base, not building decks."
        />

        {PILLAR_ORDER.map((p, sectionIdx) => {
          const items = published.filter((i) => i.pillar === p.pillar);
          if (items.length === 0) return null;
          const headingId = `insights-pillar-${p.pillar}-heading`;
          return (
            <SectionShell
              key={p.pillar}
              background={sectionIdx % 2 === 0 ? 'primary' : 'secondary'}
              headingId={headingId}
            >
              <motion.div {...entrance} variants={fadeUp}>
                <SectionHeader
                  eyebrow={p.label}
                  eyebrowVariant={items[0]?.accent ?? 'blue'}
                  heading={p.label}
                  headingId={headingId}
                  descriptor={p.descriptor}
                  layout="split"
                  className="mb-14"
                />
              </motion.div>

              <motion.ul
                className="insights-list-grid"
                {...entrance}
                variants={stagger(0.08)}
              >
                {items.map((i) => (
                  <motion.li
                    key={i.id}
                    className={`insight-card insight-card-${i.accent}`}
                    variants={fadeUp}
                  >
                    <Link to={`/insights/${i.slug}`} className="insight-card-link">
                      <div className="insight-card-eyebrow">{i.pillarLabel}</div>
                      <h3 className="insight-card-title">{i.title}</h3>
                      <p className="insight-card-excerpt">{i.excerpt}</p>
                      <div className="insight-card-byline">
                        {i.authorPhotoPath ? (
                          <img
                            src={i.authorPhotoPath}
                            alt=""
                            aria-hidden="true"
                            className="insight-card-byline-avatar"
                          />
                        ) : (
                          <span
                            aria-hidden="true"
                            className="insight-card-byline-initials"
                          >
                            {i.authorInitials}
                          </span>
                        )}
                        <div className="insight-card-byline-text">
                          <span className="insight-card-byline-name">
                            {i.authorName}
                          </span>
                          <span className="insight-card-byline-role">
                            {i.authorRole}
                          </span>
                        </div>
                      </div>
                      <div className="insight-card-meta">
                        <span>{i.date}</span>
                        <span aria-hidden="true">·</span>
                        <span>{i.readTime}</span>
                        <span className="insight-card-readmore">Read article →</span>
                      </div>
                    </Link>
                  </motion.li>
                ))}
              </motion.ul>
            </SectionShell>
          );
        })}

        <CtaStrip />
      </main>
      <Footer />
    </div>
  );
};

export default InsightsIndex;
