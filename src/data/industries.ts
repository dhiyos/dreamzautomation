export interface IndustryEntry {
  id: string;
  name: string;
  pillarLabel: string;
  pillarAccent: 'blue' | 'teal' | 'amber';
  blurb: string;
  caseStudySlug?: string;
  caseStudyLabel?: string;
}

// Derived from solutions.ts items + featuredCaseStudies + itemCaseStudies. Hand-grouped
// so the verticals read as industries (where Dreamz operates), not as a feature list.
// TODO: founders to confirm grouping and case-study attributions before launch.
export const industries: IndustryEntry[] = [
  {
    id: 'petrochemicals',
    name: 'Petrochemicals & Refining',
    pillarLabel: 'Process',
    pillarAccent: 'blue',
    blurb:
      'Hot-Standby PLC and SCADA work in safety-critical process environments. SIL-3 functions, redundant controllers, brownfield S5-to-S7 migrations executed without halting production.',
    caseStudySlug: 'iocl-mathura',
    caseStudyLabel: 'IOCL Mathura · S5 to S7 with zero production loss',
  },
  {
    id: 'converting-films',
    name: 'Converting & Film Plants',
    pillarLabel: 'Process / Machines',
    pillarAccent: 'teal',
    blurb:
      'BOPP and BOPET line automation and the entire converting machine stack — printing, coating, lamination, slitting, winding. Edge-connected retrofits that surface line health without rewriting PLC code.',
    caseStudySlug: 'jindal-bopp',
    caseStudyLabel: 'Jindal Polyfilms · 10,000 tpa BOPP line · +18% OEE',
  },
  {
    id: 'automotive',
    name: 'Automotive',
    pillarLabel: 'Machines',
    pillarAccent: 'teal',
    blurb:
      'Paint shop conveyors, ED/CED body lines, and end-to-end traceability for the tier-1 automotive supply base. Forty-plus PLCs networked into MES with OPC-bridged data on the line side.',
    caseStudySlug: 'hero-motocorp-gurgaon',
    caseStudyLabel: 'Hero MotoCorp · 40+ PLCs networked into MES',
  },
  {
    id: 'food-beverage',
    name: 'Food & Beverage',
    pillarLabel: 'Process',
    pillarAccent: 'blue',
    blurb:
      'Concept-to-commissioning automation for food processing plants. Legacy PLC migrations, batch and recipe management, and panel work designed to live on a wash-down floor.',
    caseStudySlug: 'bambino',
    caseStudyLabel: 'Bambino Agro · S5 to S7 conversion · concept to commissioning',
  },
  {
    id: 'transportation',
    name: 'Transportation & Metro',
    pillarLabel: 'Process',
    pillarAccent: 'blue',
    blurb:
      'NP SCADA subsystems, tunnel and station automation, and integration with public-infrastructure delivery partners. Acceptance-tested against transit-grade specifications.',
    caseStudySlug: 'dmrc-metro-line-3',
    caseStudyLabel: 'DMRC Line 3 · 22 stations · 31.5 km · in partnership with Siemens',
  },
  {
    id: 'building-services',
    name: 'Building Management & HVAC',
    pillarLabel: 'Process',
    pillarAccent: 'blue',
    blurb:
      'BMS, HVAC, and lift / escalator monitoring solutions for institutional and commercial sites. Centralised supervision with Siemens-backed control logic.',
  },
  {
    id: 'water',
    name: 'Water Treatment',
    pillarLabel: 'Process',
    pillarAccent: 'blue',
    blurb:
      'Treatment plant automation and remote monitoring — pump houses, dosing systems, telemetry feeding into SCADA / historian for compliance reporting.',
  },
  {
    id: 'ceramics',
    name: 'Ceramics',
    pillarLabel: 'Process',
    pillarAccent: 'blue',
    blurb:
      'Kiln and dryer automation, raw-material handling, and PLC-grade controls tuned to the thermal and dust-loaded conditions of a ceramics line.',
  },
  {
    id: 'education',
    name: 'Education & Skills',
    pillarLabel: 'Training',
    pillarAccent: 'amber',
    blurb:
      'Customised hands-on training kits for engineering institutions and corporate L&D — bottle filling, car parking, sorting, traffic, pneumatic press. Built around the same Siemens controllers students will see on real plant floors.',
  },
];
