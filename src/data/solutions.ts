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

export const itemCaseStudies: Record<string, ItemCaseStudy[]> = {
  bopp: [
    {
      id: 'jindal-bopp',
      client: 'Jindal Polyfilms',
      description:
        'BOPP line automation — 10,000 tpa capacity, Siemens S7-1500 with integrated MES.',
      metric: '+18% OEE · 12 Months',
      accent: 'teal',
    },
    {
      id: 'srf-bopet',
      client: 'SRF Limited',
      description:
        'BOPET line modernisation — legacy S5 to S7 migration with zero production loss.',
      metric: '3-Day Cutover',
      accent: 'blue',
    },
    {
      id: 'polyplex',
      client: 'Polyplex Corporation',
      description:
        'Plant-wide SCADA with real-time quality monitoring across 3 film lines.',
      metric: '40% Fewer Reject Rolls',
      accent: 'teal',
    },
  ],
  tunnel: [
    {
      id: 'dmrc-l3',
      client: 'DMRC Metro Line 3',
      description:
        'NP SCADA subsystem for 22 stations across 31.5 km. Completed successfully after prescribed tests.',
      metric: '22 Stations · 31.5 km',
      accent: 'blue',
    },
  ],
  petrochem: [
    {
      id: 'iocl-mathura',
      client: 'IOCL Mathura Refinery',
      description:
        'SIEMENS PLC S-5 to S-7 upgrade. Delivered on time, completed to customer satisfaction.',
      metric: 'Zero Production Loss',
      accent: 'blue',
    },
  ],
  'food-bev': [
    {
      id: 'bambino',
      client: 'Bambino Agro Industries',
      description:
        'PLC system conversion S-5 to S-7 for Gurgaon plant — concept to commissioning.',
      metric: 'On-Time Delivery',
      accent: 'teal',
    },
  ],
  pneumatic: [
    {
      id: 'coperion',
      client: 'Coperion Ideal / Reliance',
      description:
        'Hot-Standby PLC & SCADA for pneumatic conveying system — safety-critical process.',
      metric: 'Hot-Standby SIL-3',
      accent: 'blue',
    },
  ],
  'conveyor-paint': [
    {
      id: 'motherson-mate',
      client: 'Motherson MATE Manesar',
      description:
        'Traceability system for YSD door trim paint shop. Functioning successfully in production.',
      metric: 'End-to-End Traceability',
      accent: 'teal',
    },
  ],
};
