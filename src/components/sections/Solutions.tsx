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

const caseAccentMap: Record<'blue' | 'teal', string> = {
  blue: 'hsl(var(--accent-blue))',
  teal: 'hsl(var(--accent-teal))',
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
  const currentCases = itemCaseStudies[activeItem.id] ?? [];

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

          {/* Right — case study panel */}
          <aside
            className="solutions-case-panel"
            style={{ borderLeftColor: currentAccent }}
          >
            <div className="solutions-case-eyebrow" style={{ color: currentAccent }}>
              — CASE STUDIES
            </div>
            <h4 id="solutions-case-heading" className="solutions-case-subtitle">
              {activeItem.name}
            </h4>

            <AnimatePresence mode="wait">
              <motion.div
                key={`${activeTab.id}-${activeItem.id}`}
                className="solutions-case-content"
                initial={reduce ? false : { opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0 }}
                transition={{ duration: reduce ? 0 : 0.2 }}
              >
                {currentCases.length === 0 ? (
                  <div className="solutions-case-empty">
                    <p className="solutions-case-empty-main">
                      Case studies coming soon.
                    </p>
                    <p className="solutions-case-empty-sub">
                      Want to be featured?{' '}
                      <a href="#contact" style={{ color: currentAccent }}>
                        Request an assessment →
                      </a>
                    </p>
                  </div>
                ) : (
                  <>
                    {currentCases.map((cs, idx) => {
                      const cardAccent = caseAccentMap[cs.accent];
                      const headingId = `solutions-case-${cs.id}`;
                      return (
                        <article
                          key={cs.id}
                          className="solutions-case-card"
                          aria-labelledby={headingId}
                          style={{ borderLeftColor: cardAccent }}
                        >
                          <h5 id={headingId} className="solutions-case-client">
                            {cs.client}
                          </h5>
                          <p className="solutions-case-desc">{cs.description}</p>
                          <div
                            className="solutions-case-metric"
                            style={{ color: cardAccent }}
                          >
                            {cs.metric}
                          </div>
                        </article>
                      );
                    })}
                    <a
                      href="#case-studies"
                      className="solutions-case-viewall"
                      style={{ color: currentAccent }}
                    >
                      View All {currentCases.length} Case{' '}
                      {currentCases.length === 1 ? 'Study' : 'Studies'} →
                    </a>
                  </>
                )}
              </motion.div>
            </AnimatePresence>
          </aside>
        </div>
      </div>
    </SectionShell>
  );
};

export default Solutions;
