import { useEffect, useRef, useState } from 'react';
import { animate, motion, useInView, useReducedMotion } from 'framer-motion';

interface AnimatedMetricProps {
  value: string;
  label: string;
}

interface Parsed {
  prefix: string;
  numeric: number;
  suffix: string;
  hasCommas: boolean;
  decimals: number;
}

const parseNumeric = (raw: string): Parsed | null => {
  const match = raw.match(/^([^\d-]*)(-?[\d,]+(?:\.\d+)?)(.*)$/);
  if (!match) return null;
  const [, prefix, numStr, suffix] = match;
  const numeric = parseFloat(numStr.replace(/,/g, ''));
  if (Number.isNaN(numeric)) return null;
  return {
    prefix,
    numeric,
    suffix,
    hasCommas: numStr.includes(','),
    decimals: (numStr.split('.')[1] ?? '').length,
  };
};

const formatDisplay = (raw: number, parsed: Parsed): string => {
  const fixed = raw.toFixed(parsed.decimals);
  if (!parsed.hasCommas) return fixed;
  const [intPart, decPart] = fixed.split('.');
  const withCommas = Number(intPart).toLocaleString('en-IN');
  return decPart ? `${withCommas}.${decPart}` : withCommas;
};

const AnimatedMetric = ({ value, label }: AnimatedMetricProps) => {
  const reduce = useReducedMotion();
  const parsed = parseNumeric(value);
  const ref = useRef<HTMLLIElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const [display, setDisplay] = useState<string>(() => {
    if (!parsed) return value;
    if (reduce) return formatDisplay(parsed.numeric, parsed);
    return formatDisplay(0, parsed);
  });

  useEffect(() => {
    if (!parsed || reduce || !inView) return;
    const controls = animate(0, parsed.numeric, {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(formatDisplay(v, parsed)),
    });
    return () => controls.stop();
  }, [inView, parsed, reduce]);

  if (!parsed) {
    return (
      <li ref={ref} className="cs-detail-metric">
        <motion.span
          className="cs-detail-metric-value"
          initial={reduce ? false : { opacity: 0, y: 8 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          {value}
        </motion.span>
        <span className="cs-detail-metric-label">{label}</span>
      </li>
    );
  }

  const trimmedSuffix = parsed.suffix.trim();
  const isPct = trimmedSuffix === '%';

  if (isPct) {
    const pct = Math.max(0, Math.min(100, parsed.numeric));
    const R = 38;
    const C = 2 * Math.PI * R;
    return (
      <li ref={ref} className="cs-detail-metric cs-detail-metric-radial">
        <div className="cs-detail-metric-radial-wrap">
          <svg
            viewBox="0 0 100 100"
            className="cs-detail-metric-radial-svg"
            aria-hidden="true"
          >
            <circle
              cx="50"
              cy="50"
              r={R}
              className="cs-detail-metric-radial-track"
            />
            <motion.circle
              cx="50"
              cy="50"
              r={R}
              className="cs-detail-metric-radial-ring"
              strokeDasharray={C}
              initial={reduce ? false : { strokeDashoffset: C }}
              animate={
                inView ? { strokeDashoffset: C * (1 - pct / 100) } : undefined
              }
              transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
            />
          </svg>
          <span className="cs-detail-metric-value cs-detail-metric-value-radial">
            {parsed.prefix}
            {display}
            {parsed.suffix}
          </span>
        </div>
        <span className="cs-detail-metric-label">{label}</span>
      </li>
    );
  }

  return (
    <li ref={ref} className="cs-detail-metric">
      <span className="cs-detail-metric-value">
        {parsed.prefix}
        {display}
        {parsed.suffix}
      </span>
      <span className="cs-detail-metric-label">{label}</span>
    </li>
  );
};

export default AnimatedMetric;
