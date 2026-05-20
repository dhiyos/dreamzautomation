import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import type {
  ArchitectureDiagram,
  ArchitectureLayer,
} from '@/types/content';

const LAYER_ORDER: ArchitectureLayer[] = [
  'enterprise',
  'supervisory',
  'control',
  'field',
];

const W = 320;
const H = 180;
const NODE_R = 6;

interface Placed {
  id: string;
  x: number;
  y: number;
  accent: 'blue' | 'teal' | 'amber';
}

const layout = (diagram: ArchitectureDiagram): Map<string, Placed> => {
  const usedLayers = LAYER_ORDER.filter((l) =>
    diagram.nodes.some((n) => n.layer === l),
  );
  const positions = new Map<string, Placed>();
  const padX = 28;
  const padY = 22;
  const innerW = W - 2 * padX;
  const innerH = H - 2 * padY;
  const rowStep = usedLayers.length > 1 ? innerH / (usedLayers.length - 1) : 0;

  usedLayers.forEach((layer, li) => {
    const nodes = diagram.nodes.filter((n) => n.layer === layer);
    const y = padY + li * rowStep;
    if (nodes.length === 1) {
      positions.set(nodes[0].id, {
        id: nodes[0].id,
        x: W / 2,
        y,
        accent: nodes[0].accent ?? 'blue',
      });
    } else {
      const step = innerW / (nodes.length - 1);
      nodes.forEach((n, ni) => {
        positions.set(n.id, {
          id: n.id,
          x: padX + ni * step,
          y,
          accent: n.accent ?? 'blue',
        });
      });
    }
  });
  return positions;
};

const edgePath = (from: Placed, to: Placed): string => {
  const midY = (from.y + to.y) / 2;
  return `M ${from.x} ${from.y} L ${from.x} ${midY} L ${to.x} ${midY} L ${to.x} ${to.y}`;
};

interface Props {
  diagram: ArchitectureDiagram;
  className?: string;
}

const MiniArchitecture = ({ diagram, className }: Props) => {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const positions = layout(diagram);
  const placed = [...positions.values()];

  return (
    <div ref={ref} className={`cs-mini-arch ${className ?? ''}`} aria-hidden="true">
      <svg viewBox={`0 0 ${W} ${H}`} className="cs-mini-arch-svg">
        {diagram.edges.map((e, idx) => {
          const f = positions.get(e.from);
          const t = positions.get(e.to);
          if (!f || !t) return null;
          const d = edgePath(f, t);
          return (
            <g key={`${e.from}-${e.to}-${idx}`}>
              <motion.path
                d={d}
                className="cs-mini-arch-edge"
                fill="none"
                initial={reduce ? false : { pathLength: 0, opacity: 0 }}
                animate={inView ? { pathLength: 1, opacity: 1 } : undefined}
                transition={{ duration: 0.8, delay: 0.2 + idx * 0.04, ease: 'easeOut' }}
              />
              <motion.path
                d={d}
                className="cs-mini-arch-edge-flow"
                fill="none"
                initial={reduce ? false : { opacity: 0 }}
                animate={inView ? { opacity: 1 } : undefined}
                transition={{ duration: 0.4, delay: 0.9 + idx * 0.04 }}
              />
            </g>
          );
        })}
        {placed.map((p, idx) => (
          <motion.circle
            key={p.id}
            cx={p.x}
            cy={p.y}
            r={NODE_R}
            className={`cs-mini-arch-node cs-mini-arch-node-${p.accent}`}
            initial={reduce ? false : { opacity: 0, scale: 0 }}
            animate={inView ? { opacity: 1, scale: 1 } : undefined}
            transition={{ duration: 0.4, delay: idx * 0.04, ease: 'easeOut' }}
          />
        ))}
      </svg>
    </div>
  );
};

export default MiniArchitecture;
