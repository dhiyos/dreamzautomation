import type { ProcessStage } from '@/types/content';

export const processStages: ProcessStage[] = [
  {
    id: 'engineer-brief',
    number: '01',
    eyebrow: 'Stage One',
    title: 'Engineer\nthe Brief',
    description: 'Understanding before quoting.',
    colour: 'deep-blue',
    bullets: [
      { title: 'Discovery Workshop', context: 'with plant stakeholders and operations teams' },
      { title: 'Existing System Audit', context: 'PLCs, drives, SCADA, networks' },
      { title: 'Scope, Budget & Roadmap', context: 'clear, phased, Siemens-backed' },
      { title: 'Feasibility Assessment', context: 'honest technical go/no-go' },
    ],
  },
  {
    id: 'design-build',
    number: '02',
    eyebrow: 'Stage Two',
    title: 'Design\n& Build',
    description: 'Concept to factory-ready solution.',
    colour: 'electric-blue',
    bullets: [
      { title: 'Detailed Engineering', context: 'AutoCAD · EPLAN schematics' },
      { title: 'Panel Fabrication', context: 'in-house · 10,000 sq. ft. facility' },
      { title: 'PLC Programming', context: 'TIA Portal · SIMATIC Manager' },
      { title: 'Factory Acceptance Testing', context: 'FAT before anything ships' },
    ],
  },
  {
    id: 'commission-site',
    number: '03',
    eyebrow: 'Stage Three',
    title: 'Commission\nOn-Site',
    description: 'From factory to production-ready.',
    colour: 'teal',
    bullets: [
      { title: 'Site Installation', context: 'with minimal production downtime' },
      { title: 'Site Acceptance Testing', context: 'SAT against agreed spec' },
      { title: 'Operator Training', context: 'hands-on with maintenance team' },
      { title: 'Validation & Documentation', context: 'handover package, as-built drawings' },
    ],
  },
  {
    id: 'partner-life',
    number: '04',
    eyebrow: 'Stage Four',
    title: 'Partner\nfor Life',
    description: 'Two decades of long-term relationships.',
    colour: 'muted-teal',
    bullets: [
      { title: 'Remote Support', context: 'diagnostics and quick response' },
      { title: 'Legacy Modernisation', context: 'S5→S7 · DC drives → Sinamics' },
      { title: 'Retrofits & Upgrades', context: 'evolving with your plant' },
      { title: 'Hardware & Spares', context: 'third-party supply support' },
    ],
  },
];
