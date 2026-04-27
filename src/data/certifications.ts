import { Certification } from '@/types/content';

export const certifications: Certification[] = [
  {
    id: 'siemens-authorized',
    categoryTag: 'Partnership',
    accent: 'teal',
    title: 'Siemens Authorized System House',
    statement:
      'Authorised System Integrator for the complete Siemens Automation & Drives portfolio.',
    details: [
      { label: 'Issuer', value: 'Siemens Digital Industries' },
      { label: 'Coverage', value: 'Delhi NCR · Since 2007' },
      { label: 'Status', value: 'Active' },
    ],
    logoPath: null,
    markInitials: 'SI',
  },
  {
    id: 'iso-9001-2015',
    categoryTag: 'Quality',
    accent: 'blue',
    title: 'ISO 9001:2015',
    statement:
      'Certified Quality Management System across engineering, production, and service.',
    details: [
      { label: 'Issuer', value: 'WRG Certifications' },
      { label: 'Scope', value: 'Manufacture & trading of automation solutions' },
      { label: 'Validity', value: 'Through November 2027' },
    ],
    logoPath: null,
    markInitials: 'ISO',
  },
  {
    id: 'ce-marking',
    categoryTag: 'Compliance',
    accent: 'blue',
    title: 'CE Marking',
    statement:
      'Panel products compliant with EN 61439-1 / EN 61439-2 harmonised standards.',
    details: [
      { label: 'Issuer', value: 'TÜV India' },
      { label: 'Directive', value: 'EU Low Voltage 2014/35/EU' },
      { label: 'Declared', value: 'September 2023' },
    ],
    logoPath: null,
    markInitials: 'CE',
  },
];
