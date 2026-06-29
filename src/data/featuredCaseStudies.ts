import { FeaturedCaseStudy } from '@/types/content';

export const featuredCaseStudies: FeaturedCaseStudy[] = [
  {
    id: 'dmrc-line-3',
    slug: 'dmrc-metro-line-3',
    sectorEyebrow: 'Transportation · Delhi NCR',
    client: 'A major Indian metro rail operator',
    subtitle: 'NP SCADA · In Partnership with Siemens',
    description:
      'Non-Power/Telecom SCADA subsystem delivered across 22 stations spanning 31.5 kilometres of the Delhi Metro Line 3 extension. Completed successfully after prescribed acceptance tests, integrating with existing Siemens SCADA infrastructure and live metro operations.',
    metrics: [
      { value: '22', label: 'Stations' },
      { value: '31.5km', label: 'Line Length' },
      { value: '100%', label: 'On-Time Delivery' },
    ],
    queueMetric: '22 Stations · 31.5 km',
  },
  {
    id: 'hero-motocorp',
    slug: 'hero-motocorp-gurgaon',
    sectorEyebrow: 'Automotive · Gurgaon',
    client: "One of the world's largest two-wheeler OEMs",
    subtitle: 'IT-OT Integration · Paint Shops + Assembly',
    description:
      'Network-wide integration of 40+ Siemens PLCs across two paint shops, steel phase, engine rack, and assembly lines at a leading two-wheeler OEM’s Gurgaon plant. Fiber optic backbone with 24-port switches, OPC server bridge to MES, and unified data pipeline connecting previously-isolated production systems.',
    metrics: [
      { value: '40+', label: 'PLCs Networked' },
      { value: '8', label: 'Production Zones' },
      { value: 'Live', label: 'MES Integration' },
    ],
    queueMetric: '40+ PLCs Networked',
  },
  {
    id: 'motherson-mate',
    slug: 'motherson-mate-manesar',
    sectorEyebrow: 'Automotive · Manesar',
    client: 'A leading global auto-components supplier',
    subtitle: 'Track & Trace · SAP Integration',
    description:
      'End-to-end traceability system for the YSD door trim paint shop. Siemens S7-1500 master controller with 8 station-level PLCs, barcode and RFID tracking, SAP integration via SQL bridge. Live in production, tracking parts from raw material through paint application to final dispatch.',
    metrics: [
      { value: '8', label: 'Stations' },
      { value: 'S7-1500', label: 'Master PLC' },
      { value: 'SAP', label: 'ERP Integrated' },
    ],
    queueMetric: 'End-to-End Traceability',
  },
];
