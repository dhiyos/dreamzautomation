import type { SolutionPillar, ItemCaseStudy } from '@/types/content';

export type { SolutionPillar };

export const solutions: SolutionPillar[] = [
  {
    id: 'process',
    number: '01',
    category: 'PROCESS',
    title: 'Process Industry Automation',
    blurb:
      'High-end DCS/PLC systems with Hot-Standby controllers, redundant I/Os and SIL-3 safety for mission-critical process environments.',
    accent: 'blue',
    items: [
      { id: 'pneumatic', name: 'Pneumatic Conveying Systems' },
      { id: 'hvac', name: 'HVAC Applications' },
      { id: 'bopp', name: 'BOPP / BOPET Film Plants' },
      { id: 'food-bev', name: 'Food & Beverage Industry' },
      { id: 'petrochem', name: 'Petrochemicals & Gas' },
      { id: 'bms', name: 'Building Management Systems' },
      { id: 'lift', name: 'Lift & Escalator Monitoring' },
      { id: 'water', name: 'Water Treatment & Monitoring' },
      { id: 'tunnel', name: 'Metro & Tunnel Automation' },
      { id: 'ceramic', name: 'Ceramic Industry' },
    ],
  },
  {
    id: 'machines',
    number: '02',
    category: 'MACHINES',
    title: 'Machine Automation',
    blurb:
      'Precision motion control and machine-level automation for OEMs and the converting industry — from concept to commissioning.',
    accent: 'teal',
    items: [
      { id: 'printing', name: 'Printing Machines' },
      { id: 'coating', name: 'Coating Machines' },
      { id: 'lamination', name: 'Lamination Machines' },
      { id: 'solventless', name: 'Solventless Machines' },
      { id: 'slitters', name: 'High-Speed Slitters' },
      { id: 'winders', name: 'Winders & Splicers' },
      { id: 'rotomoulding', name: 'Rotational Moulding Machines' },
      { id: 'robotics', name: 'Robotics — Pick & Place' },
      { id: 'conveyor-paint', name: 'Conveyor-Based Paint Shop' },
      { id: 'ed-ced', name: 'ED & CED Body Paint Shop' },
    ],
  },
  {
    id: 'training',
    number: '03',
    category: 'EDUCATION & TRAINING',
    title: 'Customised Training Kits',
    blurb:
      'Hands-on industrial training solutions for institutions and corporates — bridging the skills gap between classroom and plant floor.',
    accent: 'amber',
    items: [
      { id: 'bottle', name: 'Bottle Filling Model' },
      { id: 'parking', name: 'PLC-Based Car Parking System' },
      { id: 'power', name: 'Power Monitoring System' },
      { id: 'pneumatic-press', name: 'Pneumatic Press System' },
      { id: 'sorting', name: 'Sorting System — Pneumatic Conveyor' },
      { id: 'traffic', name: 'Traffic Control System' },
    ],
  },
];

export const itemCaseStudies: Record<string, ItemCaseStudy> = {
  bopp: {
    id: 'uflex-bopp',
    client: 'A leading flexible packaging manufacturer',
    sector: 'BOPP Film · Line-1 Upgradation',
    metricValue: 'S5 → S7',
    metricLabel: 'Hot-Standby PLC Migration',
    description:
      'End-to-end electronics upgrade of a Barmag extrusion and Dornier BOPP film line — Siemens S5 CPU-948 replaced with S7-400, legacy 6RA-24 DC drives swapped for new AC/DC drives, and a DOS-era black-box SCADA retired in favour of a modern stack. Hardware, software, drawings, and commissioning under one accountable team.',
    totalInCategory: 4,
  },
  tunnel: {
    id: 'dmrc-metro-line-3',
    client: 'A major Indian metro rail operator',
    sector: 'Tunnel Automation · 31.5 km',
    metricValue: '22',
    metricLabel: 'Stations · NP SCADA Subsystem',
    description:
      'NP SCADA subsystem delivered for a major Indian metro line extension, covering 22 stations across 31.5 kilometres. Completed successfully after prescribed acceptance tests, in partnership with Siemens Ltd.',
    totalInCategory: 1,
  },
  petrochem: {
    id: 'iocl-mathura',
    client: 'A major Indian oil refinery',
    sector: 'Petrochemicals · Legacy PLC Upgrade',
    metricValue: '0',
    metricLabel: 'Production Loss · S5 to S7 Upgrade',
    description:
      'SIEMENS PLC S-5 to S-7 upgrade at a major Indian oil refinery, delivered on time and completed to full customer satisfaction. Critical legacy system modernisation executed without halting refinery production.',
    totalInCategory: 2,
  },
  'food-bev': {
    id: 'bambino',
    client: 'A well-known packaged food manufacturer',
    sector: 'Food Processing · Concept to Commissioning',
    metricValue: 'S-5 → S-7',
    metricLabel: 'Full PLC System Conversion',
    description:
      'PLC system conversion from S-5 to S-7 for a leading packaged food manufacturer’s Gurgaon plant, delivered concept to commissioning. Professional competence demonstrated throughout the project lifecycle.',
    totalInCategory: 2,
  },
  pneumatic: {
    id: 'coperion',
    client: 'A leading petrochemicals producer (via an OEM partner)',
    sector: 'Pneumatic Conveying · Hot-Standby SIL-3',
    metricValue: 'SIL-3',
    metricLabel: 'Safety Integrity Level · Hot-Standby',
    description:
      'Hot-Standby PLC and SCADA system for a safety-critical pneumatic conveying application at one of India’s largest petrochemicals producers, delivered via an OEM partner. Redundant controllers with SIL-3 certified safety functions ensuring continuous operation.',
    totalInCategory: 3,
  },
  'conveyor-paint': {
    id: 'motherson-mate-manesar',
    client: 'A leading global auto-components supplier',
    sector: 'Automotive · Traceability System',
    metricValue: 'End-to-End',
    metricLabel: 'Traceability · YSD Door Trim',
    description:
      'Traceability system for the YSD door trim paint shop at a leading global auto-components supplier’s Manesar facility. Functioning successfully in production, tracking parts from raw material through paint application to final dispatch.',
    totalInCategory: 2,
  },
};
