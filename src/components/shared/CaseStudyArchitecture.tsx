import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import type {
  ArchitectureDiagram,
  ArchitectureLayer,
  ArchitectureNode,
} from '@/types/content';

const LAYER_ORDER: ArchitectureLayer[] = [
  'enterprise',
  'supervisory',
  'control',
  'field',
];

const LAYER_LABEL: Record<ArchitectureLayer, string> = {
  enterprise: 'Enterprise',
  supervisory: 'Supervisory',
  control: 'Control',
  field: 'Field',
};

const WIDTH = 1100;
const V_PADDING = 60;
const H_PADDING = 120;
const ROW_HEIGHT = 150;
const NODE_W = 200;
const NODE_H = 72;

interface Placed {
  node: ArchitectureNode;
  x: number;
  y: number;
}

const layout = (diagram: ArchitectureDiagram) => {
  const usedLayers = LAYER_ORDER.filter((l) =>
    diagram.nodes.some((n) => n.layer === l),
  );
  const height = V_PADDING * 2 + usedLayers.length * NODE_H +
    (usedLayers.length - 1) * (ROW_HEIGHT - NODE_H);
  const positions = new Map<string, Placed>();
  usedLayers.forEach((layer, li) => {
    const layerNodes = diagram.nodes.filter((n) => n.layer === layer);
    const y = V_PADDING + li * ROW_HEIGHT;
    const inner = WIDTH - 2 * H_PADDING;
    if (layerNodes.length === 1) {
      positions.set(layerNodes[0].id, {
        node: layerNodes[0],
        x: WIDTH / 2 - NODE_W / 2,
        y,
      });
    } else {
      const step = inner / (layerNodes.length - 1);
      layerNodes.forEach((n, ni) => {
        positions.set(n.id, {
          node: n,
          x: H_PADDING + ni * step - NODE_W / 2,
          y,
        });
      });
    }
  });
  return { positions, height, usedLayers };
};

const edgePath = (from: Placed, to: Placed): string => {
  const fx = from.x + NODE_W / 2;
  const fy = from.y + NODE_H;
  const tx = to.x + NODE_W / 2;
  const ty = to.y;
  const midY = fy + (ty - fy) / 2;
  return `M ${fx} ${fy} L ${fx} ${midY} L ${tx} ${midY} L ${tx} ${ty}`;
};

interface Props {
  diagram: ArchitectureDiagram;
}

const CaseStudyArchitecture = ({ diagram }: Props) => {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const { positions, height, usedLayers } = layout(diagram);
  const placedList = [...positions.values()];

  return (
    <div ref={ref} className="cs-arch-figure">
      <div className="cs-arch-svg-wrap">
        <svg
          viewBox={`0 0 ${WIDTH} ${height}`}
          className="cs-arch-svg"
          role="img"
          aria-label="System architecture diagram"
        >
          {usedLayers.map((layer, li) => {
            const rowY = V_PADDING + li * ROW_HEIGHT + NODE_H / 2;
            return (
              <g key={layer} className="cs-arch-layer">
                <line
                  x1={0}
                  x2={WIDTH}
                  y1={rowY}
                  y2={rowY}
                  className="cs-arch-layer-rule"
                />
                <text
                  x={16}
                  y={rowY - NODE_H / 2 - 8}
                  className="cs-arch-layer-label"
                >
                  {LAYER_LABEL[layer]}
                </text>
              </g>
            );
          })}

          {diagram.edges.map((e, idx) => {
            const f = positions.get(e.from);
            const t = positions.get(e.to);
            if (!f || !t) return null;
            const d = edgePath(f, t);
            const midX = (f.x + NODE_W / 2 + t.x + NODE_W / 2) / 2;
            const midY = (f.y + NODE_H + t.y) / 2;
            const tagWidth = Math.max(56, (e.protocol?.length ?? 0) * 7 + 16);
            return (
              <g key={`${e.from}-${e.to}-${idx}`} className="cs-arch-edge">
                <motion.path
                  d={d}
                  className="cs-arch-edge-line"
                  fill="none"
                  initial={reduce ? false : { pathLength: 0, opacity: 0 }}
                  animate={
                    inView ? { pathLength: 1, opacity: 1 } : undefined
                  }
                  transition={{
                    duration: 0.9,
                    delay: 0.4 + idx * 0.06,
                    ease: 'easeOut',
                  }}
                />
                <motion.path
                  d={d}
                  className="cs-arch-edge-flow"
                  fill="none"
                  initial={reduce ? false : { opacity: 0 }}
                  animate={inView ? { opacity: 1 } : undefined}
                  transition={{
                    duration: 0.5,
                    delay: 1.1 + idx * 0.06,
                    ease: 'easeOut',
                  }}
                />
                {e.protocol ? (
                  <motion.g
                    initial={reduce ? false : { opacity: 0, y: 4 }}
                    animate={inView ? { opacity: 1, y: 0 } : undefined}
                    transition={{
                      duration: 0.4,
                      delay: 1.2 + idx * 0.06,
                    }}
                  >
                    <rect
                      x={midX - tagWidth / 2}
                      y={midY - 11}
                      width={tagWidth}
                      height={22}
                      rx={3}
                      className="cs-arch-edge-tag-bg"
                    />
                    <text
                      x={midX}
                      y={midY + 4}
                      className="cs-arch-edge-tag"
                      textAnchor="middle"
                    >
                      {e.protocol}
                    </text>
                  </motion.g>
                ) : null}
              </g>
            );
          })}

          {placedList.map((p, idx) => {
            const accent = p.node.accent ?? 'blue';
            return (
              <motion.g
                key={p.node.id}
                initial={reduce ? false : { opacity: 0, y: 10 }}
                animate={inView ? { opacity: 1, y: 0 } : undefined}
                transition={{
                  duration: 0.45,
                  delay: idx * 0.05,
                  ease: 'easeOut',
                }}
                className={`cs-arch-node cs-arch-node-${accent}`}
              >
                <rect
                  x={p.x}
                  y={p.y}
                  width={NODE_W}
                  height={NODE_H}
                  rx={4}
                  className="cs-arch-node-bg"
                />
                <rect
                  x={p.x}
                  y={p.y}
                  width={4}
                  height={NODE_H}
                  className="cs-arch-node-accent"
                />
                <text
                  x={p.x + NODE_W / 2 + 2}
                  y={p.y + (p.node.sublabel ? 30 : 42)}
                  textAnchor="middle"
                  className="cs-arch-node-label"
                >
                  {p.node.label}
                </text>
                {p.node.sublabel ? (
                  <text
                    x={p.x + NODE_W / 2 + 2}
                    y={p.y + 50}
                    textAnchor="middle"
                    className="cs-arch-node-sublabel"
                  >
                    {p.node.sublabel}
                  </text>
                ) : null}
              </motion.g>
            );
          })}
        </svg>
      </div>
      {diagram.caption ? (
        <p className="cs-arch-caption">{diagram.caption}</p>
      ) : null}
    </div>
  );
};

export default CaseStudyArchitecture;
