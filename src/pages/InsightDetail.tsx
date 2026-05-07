import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import Nav from '@/components/Nav';
import Footer from '@/components/sections/Footer';
import CtaStrip from '@/components/sections/CtaStrip';
import SectionShell from '@/components/shared/SectionShell';
import NotFound from './NotFound';
import { insights } from '@/data/insights';
import { fadeUp, useEntrance } from '@/lib/motion';

const InsightDetail = () => {
  const { slug = '' } = useParams();
  const article = insights.find(
    (i) => i.slug === slug && i.status === 'published',
  );
  const entrance = useEntrance();

  if (!article) {
    return <NotFound />;
  }

  const related = insights
    .filter(
      (i) =>
        i.slug && i.slug !== article.slug && i.status === 'published',
    )
    .slice(0, 2);

  return (
    <div className="min-h-screen bg-bg-primary">
      <Nav />
      <main>
        <section className="article-hero" aria-labelledby="article-heading">
          <div className="page-container article-hero-inner">
            <Link to="/insights" className="article-back">
              ← All insights
            </Link>

            <div
              className={`article-pillar-tag article-pillar-tag-${article.accent}`}
            >
              {article.pillarLabel}
            </div>

            <h1 id="article-heading" className="article-heading">
              {article.title}
            </h1>

            <div className="article-byline">
              {article.authorPhotoPath ? (
                <img
                  src={article.authorPhotoPath}
                  alt=""
                  aria-hidden="true"
                  className="article-byline-avatar"
                />
              ) : (
                <span aria-hidden="true" className="article-byline-initials">
                  {article.authorInitials}
                </span>
              )}
              <div className="article-byline-text">
                <span className="article-byline-name">{article.authorName}</span>
                <span className="article-byline-role">{article.authorRole}</span>
              </div>
              <div className="article-byline-meta">
                <span>{article.date}</span>
                <span aria-hidden="true">·</span>
                <span>{article.readTime}</span>
              </div>
            </div>
          </div>
        </section>

        <SectionShell background="primary" headingId="article-body-heading">
          <h2 id="article-body-heading" className="sr-only">
            Article
          </h2>
          <motion.article
            className="article-body"
            {...entrance}
            variants={fadeUp}
          >
            <p className="article-lead">{article.excerpt}</p>
            <p className="article-placeholder-note">
              The full piece is in editorial review with the founders. We are
              publishing the abstract now and the full article will land on this page
              shortly. If you would like the engineering detail in the meantime,{' '}
              <a href="#contact" className="article-inline-link">
                request the working draft
              </a>
              .
            </p>
          </motion.article>
        </SectionShell>

        {related.length > 0 ? (
          <SectionShell background="secondary" headingId="article-related-heading">
            <h2 id="article-related-heading" className="heading-h2 mb-10">
              More from the founders
            </h2>
            <ul className="insights-list-grid insights-list-grid-2">
              {related.map((i) => (
                <li
                  key={i.id}
                  className={`insight-card insight-card-${i.accent}`}
                >
                  <Link
                    to={`/insights/${i.slug}`}
                    className="insight-card-link"
                  >
                    <div className="insight-card-eyebrow">{i.pillarLabel}</div>
                    <h3 className="insight-card-title">{i.title}</h3>
                    <p className="insight-card-excerpt">{i.excerpt}</p>
                    <div className="insight-card-meta">
                      <span>{i.authorName}</span>
                      <span aria-hidden="true">·</span>
                      <span>{i.date}</span>
                      <span className="insight-card-readmore">Read →</span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </SectionShell>
        ) : null}

        <CtaStrip />
      </main>
      <Footer />
    </div>
  );
};

export default InsightDetail;
