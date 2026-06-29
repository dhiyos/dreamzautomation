import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import SectionShell from '@/components/shared/SectionShell';
import SectionHeader from '@/components/shared/SectionHeader';
import { testimonials } from '@/data/testimonials';
import { fadeUp, useEntrance } from '@/lib/motion';

const AUTO_ADVANCE_MS = 7000;
const REPEATS = 3;

const Testimonials = () => {
  const entrance = useEntrance();
  const trackRef = useRef<HTMLDivElement>(null);
  const isReCenteringRef = useRef(false);
  const scrollEndTimeoutRef = useRef<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const N = testimonials.length;
  const loop = Array.from({ length: REPEATS }, () => testimonials).flat();

  const getItems = () => {
    const track = trackRef.current;
    if (!track) return [] as HTMLElement[];
    return Array.from(track.querySelectorAll<HTMLElement>('.testimonial-item'));
  };

  const getCurrentLoopIdx = () => {
    const track = trackRef.current;
    if (!track) return N;
    const items = getItems();
    if (items.length === 0) return N;
    const trackLeft = track.getBoundingClientRect().left;
    let bestIdx = 0;
    let bestDist = Infinity;
    items.forEach((item, idx) => {
      const dist = Math.abs(item.getBoundingClientRect().left - trackLeft);
      if (dist < bestDist) {
        bestDist = dist;
        bestIdx = idx;
      }
    });
    return bestIdx;
  };

  const scrollToLoopIdx = (loopIdx: number, smooth = true) => {
    const track = trackRef.current;
    if (!track) return;
    const items = getItems();
    const item = items[loopIdx];
    if (!item) return;
    const targetLeft =
      item.getBoundingClientRect().left -
      track.getBoundingClientRect().left +
      track.scrollLeft;
    if (smooth) {
      track.scrollTo({ left: targetLeft, behavior: 'smooth' });
    } else {
      track.scrollLeft = targetLeft;
    }
  };

  const goNext = () => {
    const cur = getCurrentLoopIdx();
    scrollToLoopIdx(cur + 1);
  };

  const goPrev = () => {
    const cur = getCurrentLoopIdx();
    scrollToLoopIdx(cur - 1);
  };

  useEffect(() => {
    scrollToLoopIdx(N, false);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const onScroll = () => {
      if (isReCenteringRef.current) return;
      const cur = getCurrentLoopIdx();
      setActiveIndex(cur % N);
      if (scrollEndTimeoutRef.current !== null) {
        window.clearTimeout(scrollEndTimeoutRef.current);
      }
      scrollEndTimeoutRef.current = window.setTimeout(() => {
        const settled = getCurrentLoopIdx();
        if (settled < N || settled >= 2 * N) {
          isReCenteringRef.current = true;
          const target = settled < N ? settled + N : settled - N;
          scrollToLoopIdx(target, false);
          requestAnimationFrame(() => {
            isReCenteringRef.current = false;
          });
        }
      }, 180);
    };
    track.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      track.removeEventListener('scroll', onScroll);
      if (scrollEndTimeoutRef.current !== null) {
        window.clearTimeout(scrollEndTimeoutRef.current);
      }
    };
  }, [N]);

  useEffect(() => {
    if (paused) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;
    const interval = window.setInterval(() => {
      goNext();
    }, AUTO_ADVANCE_MS);
    return () => window.clearInterval(interval);
  }, [paused]);

  return (
    <SectionShell background="primary" headingId="testimonials-heading">
      <motion.div {...entrance} variants={fadeUp} className="testimonial-head-row">
        <SectionHeader
          eyebrow="In their own words"
          eyebrowVariant="teal"
          heading={
            <>
              Twenty years of plants
              <br />
              still running.
            </>
          }
          headingId="testimonials-heading"
          descriptor="From a major Indian refinery in 2011 to NSTI Dehradun in 2025 — the same standard, signed off by the people who run the plants."
          layout="split"
          className="testimonial-head"
        />

        <div className="testimonial-nav-arrows" aria-label="Testimonial navigation">
          <button
            type="button"
            className="testimonial-nav-arrow"
            aria-label="Previous testimonial"
            onClick={goPrev}
          >
            ←
          </button>
          <button
            type="button"
            className="testimonial-nav-arrow"
            aria-label="Next testimonial"
            onClick={goNext}
          >
            →
          </button>
        </div>
      </motion.div>

      <motion.div
        {...entrance}
        variants={fadeUp}
        className="testimonial-track-wrap"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
      >
        <div
          ref={trackRef}
          className="testimonial-track"
          role="region"
          aria-roledescription="carousel"
          aria-label="Client testimonials"
        >
          {loop.map((t, idx) => (
            <article
              key={`${t.id}-${idx}`}
              className="testimonial-item"
              data-accent={t.accent}
              aria-hidden={idx % N !== activeIndex ? 'true' : undefined}
              aria-label={`Testimonial ${(idx % N) + 1} of ${N}`}
            >
              <div className="testimonial-inner">
                <div className="testimonial-logo">
                  {t.logoPath ? (
                    <img src={t.logoPath} alt={`${t.clientName} logo`} />
                  ) : (
                    <span className="testimonial-logo-placeholder">
                      {t.clientName}
                    </span>
                  )}
                </div>

                <blockquote className="testimonial-quote">
                  <span aria-hidden="true" className="testimonial-quote-mark">
                    &ldquo;
                  </span>
                  <p>{t.quote}</p>
                </blockquote>

                <footer className="testimonial-attribution">
                  <div className="testimonial-author">{t.authorName}</div>
                  <div className="testimonial-role">{t.authorRole}</div>
                  <div className="testimonial-meta">
                    {t.projectContext} · {t.date}
                  </div>
                </footer>
              </div>
            </article>
          ))}
        </div>

        <div className="testimonial-dots" role="tablist" aria-label="Select testimonial">
          {testimonials.map((t, idx) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={idx === activeIndex}
              aria-label={`Go to testimonial ${idx + 1}`}
              className="testimonial-dot"
              data-active={idx === activeIndex ? 'true' : undefined}
              onClick={() => scrollToLoopIdx(N + idx)}
            />
          ))}
        </div>
      </motion.div>
    </SectionShell>
  );
};

export default Testimonials;
