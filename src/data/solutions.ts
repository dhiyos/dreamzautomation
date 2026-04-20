export interface SolutionPillar {
  id: string;
  number: string;
  category: string;
  title: string;
  blurb: string;
  accent: 'blue' | 'teal' | 'amber';
  items: string[];
}

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
      'Pneumatic Conveying Systems',
      'HVAC Applications',
      'Food & Beverage Industry',
      'Ceramic Industry',
      'Petrochemicals & Gas',
      'Building Management Systems',
      'Lift & Escalator Monitoring',
      'Water Treatment & Monitoring',
      'Metro & Road Tunnel Automation',
      'BOPP / BOPET Film Plants',
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
      'Printing Machines',
      'Coating Machines',
      'Lamination Machines',
      'Solventless Machines',
      'High-Speed Slitters (Primary / Secondary)',
      'Winders & Splicers',
      'Rotational Moulding Machines',
      'Robotics — Pick & Place',
      'Conveyor-Based Paint Shop',
      'ED & CED Body Paint Shop',
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
      'Bottle Filling Model',
      'PLC-Based Car Parking System',
      'Power Monitoring System',
      'Pneumatic Press System',
      'Sorting System — Pneumatic Conveyor',
      'Traffic Control System',
    ],
  },
];
