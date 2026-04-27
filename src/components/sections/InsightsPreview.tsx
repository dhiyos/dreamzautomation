import { motion } from 'framer-motion';
import SectionShell from '@/components/shared/SectionShell';
import SectionHeader from '@/components/shared/SectionHeader';
import { insights } from '@/data/insights';
import { fadeUp, stagger, useEntrance } from '@/lib/motion';

const InsightsPreview = () => {
  const entrance = useEntrance();

  return (
    <SectionShell background="primary" headingId="insights-heading">
      <motion.div {...entrance} variants={fadeUp}>
        <SectionHeader
          eyebrow="Insights & Commentary"
          eyebrowVariant="blue"
          heading={
            <>
              Field notes,
              <br />
              authored by the founders.
            </>
          }
          headingId="insights-heading"
          descriptor="Long-form notes on automation, drives, and what happens between the spec sheet and the running plant. Three pillars, three voices — never ghost-written."
          layout="split"
          className="mb-14"
        />
      </motion.div>

      <motion.div className="insights-grid" {...entrance} variants={stagger(0.1)}>
        {insights.map((slot) => {
          const isPublished = slot.status === 'published';
          return (
            <motion.article
              key={slot.id}
              className="insight-card"
              data-accent={slot.accent}
              data-status={slot.status}
              variants={fadeUp}
            >
              <div className="insight-pillar">
                <span className="insight-pillar-line" aria-hidden="true" />
                <span>{slot.pillarLabel}</span>
              </div>

              <div className="insight-body">
                {isPublished ? (
                  <>
                    <h3 className="insight-title">{slot.title}</h3>
                    {slot.excerpt ? (
                      <p className="insight-excerpt">{slot.excerpt}</p>
                    ) : null}
                  </>
                ) : (
                  <p className="insight-empty">First essay in preparation.</p>
                )}
              </div>

              <footer className="insight-byline">
                <div className="insight-avatar" data-accent={slot.accent}>
                  {slot.authorPhotoPath ? (
                    <img
                      src={slot.authorPhotoPath}
                      alt={`${slot.authorName} portrait`}
                    />
                  ) : (
                    <span aria-hidden="true">{slot.authorInitials}</span>
                  )}
                </div>
                <div className="insight-author-text">
                  <div className="insight-author-name">{slot.authorName}</div>
                  <div className="insight-author-role">{slot.authorRole}</div>
                  <div className="insight-author-meta">
                    {isPublished
                      ? `${slot.date}${slot.readTime ? ` · ${slot.readTime}` : ''}`
                      : 'Forthcoming'}
                  </div>
                </div>
              </footer>

              {isPublished && slot.slug ? (
                <a
                  className="insight-read-link"
                  href={`/insights/${slot.slug}`}
                  aria-label={`Read article: ${slot.title}`}
                >
                  Read article →
                </a>
              ) : null}
            </motion.article>
          );
        })}
      </motion.div>

      <motion.div {...entrance} variants={fadeUp} className="insights-cta-row">
        <a className="insights-view-all" href="/insights">
          Browse all insights
          <span aria-hidden="true" className="insights-view-all-arrow">
            →
          </span>
        </a>
      </motion.div>
    </SectionShell>
  );
};

export default InsightsPreview;
