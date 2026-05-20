import { useMemo, useState, type CSSProperties } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { SectionShell } from '@/components/shared/SectionShell';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { useEntrance } from '@/lib/motion';
import { solutions, itemCaseStudies } from '@/data/solutions';
import type { SolutionPillar } from '@/types/content';

const accentVarMap: Record<SolutionPillar['accent'], string> = {
  blue: 'hsl(var(--accent-blue))',
  teal: 'hsl(var(--accent-teal))',
  amber: 'hsl(var(--accent-amber))',
};

export const Solutions = () => {
  const reduce = useReducedMotion();
  const entranceProps = useEntrance();

  const [activeTabId, setActiveTabId] = useState<string>(solutions[0].id);
  const [activeItemId, setActiveItemId] = useState<string>(solutions[0].items[0].id);

  const activeTab = useMemo(
    () => solutions.find((s) => s.id === activeTabId) ?? solutions[0],
    [activeTabId],
  );

  const activeItem = useMemo(
    () => activeTab.items.find((i) => i.id === activeItemId) ?? activeTab.items[0],
    [activeTab, activeItemId],
  );

  const currentAccent = accentVarMap[activeTab.accent];
  const currentCaseStudy = itemCaseStudies[activeItem.id] ?? null;

  const handleTabChange = (tabId: string) => {
    const tab = solutions.find((s) => s.id === tabId);
    if (!tab) return;
    setActiveTabId(tabId);
    setActiveItemId(tab.items[0].id);
  };

  const handleTabKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    e.preventDefault();
    const dir = e.key === 'ArrowRight' ? 1 : -1;
    const next = solutions[(index + dir + solutions.length) % solutions.length];
    handleTabChange(next.id);
    const btn = document.getElementById(`solutions-tab-${next.id}`);
    btn?.focus();
  };

  const wrapperStyle = { ['--tab-accent' as string]: currentAccent } as CSSProperties;

  return (
    <SectionShell
      headingId="solutions-heading"
      background="secondary"
      ariaLabel="Solutions"
    >
      <motion.div {...entranceProps}>
        <SectionHeader
          eyebrow="SOLUTIONS"
          heading={<>What We Deliver.</>}
          headingId="solutions-heading"
          descriptor="Three capability pillars. One accountable team. From high-end DCS for mission-critical process plants to precision machine automation for OEMs and customised training kits for the next generation of automation engineers."
          layout="split"
          className="mb-[56px]"
        />
      </motion.div>

      <div style={wrapperStyle}>
        {/* Tab bar */}
        <div className="solutions-tabs" role="tablist" aria-label="Solution pillars">
          {solutions.map((tab, idx) => {
            const isActive = tab.id === activeTabId;
            return (
              <button
                key={tab.id}
                id={`solutions-tab-${tab.id}`}
                role="tab"
                type="button"
                aria-selected={isActive}
                aria-controls={`solutions-panel-${tab.id}`}
                tabIndex={isActive ? 0 : -1}
                onClick={() => handleTabChange(tab.id)}
                onKeyDown={(e) => handleTabKeyDown(e, idx)}
                className="solutions-tab"
                data-active={isActive}
                style={{
                  borderBottomColor: isActive ? accentVarMap[tab.accent] : 'transparent',
                }}
              >
                <span
                  className="solutions-tab-num"
                  style={{ color: isActive ? accentVarMap[tab.accent] : undefined }}
                >
                  {tab.number}
                </span>
                <span className="solutions-tab-label">{tab.title}</span>
              </button>
            );
          })}
        </div>

        {/* Body */}
        <div
          className="solutions-body"
          id={`solutions-panel-${activeTab.id}`}
          role="tabpanel"
          aria-labelledby={`solutions-tab-${activeTab.id}`}
        >
          {/* Left — items list */}
          <AnimatePresence mode="wait">
            <motion.ul
              key={activeTab.id}
              className="solutions-items"
              initial={reduce ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -4 }}
              transition={{ duration: reduce ? 0 : 0.2 }}
            >
              {activeTab.items.map((item, idx) => {
                const isActive = item.id === activeItemId;
                return (
                  <motion.li
                    key={item.id}
                    initial={reduce ? false : { opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: reduce ? 0 : 0.25,
                      delay: reduce ? 0 : idx * 0.05,
                    }}
                  >
                    <button
                      type="button"
                      className="solutions-item"
                      data-active={isActive}
                      aria-describedby="solutions-case-heading"
                      onMouseEnter={() => setActiveItemId(item.id)}
                      onFocus={() => setActiveItemId(item.id)}
                      onClick={() => setActiveItemId(item.id)}
                    >
                      <span className="solutions-item-name">{item.name}</span>
                      <span className="solutions-item-arrow" aria-hidden="true">
                        →
                      </span>
                    </button>
                  </motion.li>
                );
              })}
            </motion.ul>
          </AnimatePresence>

          {/* Right — featured case study panel */}
          <AnimatePresence mode="wait">
            <motion.aside
              key={activeItem.id}
              className={`case-panel${currentCaseStudy ? '' : ' case-panel-empty'}`}
              aria-labelledby="solutions-case-heading"
              initial={reduce ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: reduce ? 0 : 0.25, ease: 'easeOut' }}
            >
              <span className="case-panel-corner" aria-hidden="true" />

              {currentCaseStudy ? (
                <>
                  <div className="case-eyebrow">Featured Case Study</div>
                  <p className="case-context">
                    A representative deployment from Dreamz's work in{' '}
                    {activeItem.name}.
                  </p>

                  <div className="case-metric-hero">
                    <div className="case-metric-value">
                      {currentCaseStudy.metricValue}
                    </div>
                    <div className="case-metric-label">
                      {currentCaseStudy.metricLabel}
                    </div>
                  </div>

                  <div className="case-client-block">
                    <h4 id="solutions-case-heading" className="case-client-name">
                      {currentCaseStudy.client}
                    </h4>
                    <div className="case-client-sector">
                      {currentCaseStudy.sector}
                    </div>
                  </div>

                  <p className="case-description">{currentCaseStudy.description}</p>

                  <div className="case-footer">
                    <a href="/case-studies" className="case-cta">
                      <span>Read the Full Case Study</span>
                      <span className="case-cta-arrow" aria-hidden="true">
                        →
                      </span>
                    </a>
                    {currentCaseStudy.totalInCategory &&
                      currentCaseStudy.totalInCategory > 1 && (
                        <div className="case-count-badge">
                          {currentCaseStudy.totalInCategory - 1} More ·{' '}
                          {activeTab.category}
                        </div>
                      )}
                  </div>
                </>
              ) : (
                <>
                  <div className="case-eyebrow">Featured Case Study</div>
                  <h4 id="solutions-case-heading" className="case-client-name">
                    Coming Soon
                  </h4>
                  <p className="case-empty-text">
                    A case study from this area is being prepared.
                  </p>
                  <a href="/contact" className="case-cta">
                    <span>Request an Assessment</span>
                    <span className="case-cta-arrow" aria-hidden="true">
                      →
                    </span>
                  </a>
                </>
              )}
            </motion.aside>
          </AnimatePresence>
        </div>
      </div>
    </SectionShell>
  );
};

export default Solutions;
