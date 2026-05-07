import vinodPandey from '@/assets/engineers/vinod-pandey.jpg';
import piyushPathak from '@/assets/engineers/piyush-pathak.jpg';
import tapeshwerTyagi from '@/assets/engineers/tapeshwer-tyagi.jpg';

export interface FounderPedigree {
  id: string;
  name: string;
  initials: string;
  title: string;
  roleTag: string;
  accent: 'blue' | 'teal';
  yearsLabel: string;
  yearsSubLabel: string;
  pedigreeLabel: string;
  pedigree: string;
  ownsLabel: string;
  owns: string[];
  photoPath: string;
  draft?: boolean;
}

// TODO: founders to confirm pre-Dreamz employer history, year ranges, and signature
// projects. Copy below is drafted from existing engineers.ts + companyProfile.ts and
// should be redlined by Vinod / Piyush / Tapeshwer before launch.
export const founderPedigrees: FounderPedigree[] = [
  {
    id: 'vinod-pandey',
    name: 'Vinod Pandey',
    initials: 'VP',
    title: 'Director & CEO · Strategy & Commercial',
    roleTag: 'Lead Voice',
    accent: 'teal',
    yearsLabel: '30+ years',
    yearsSubLabel: 'In automation since the mid-1990s',
    pedigreeLabel: 'Before Dreamz',
    pedigree:
      'Two decades inside petrochemicals, process industry, and transportation automation — operating roles where the cost of a wrong commissioning call is measured in shifts, not hours.',
    ownsLabel: 'Leads at Dreamz',
    owns: [
      'Strategy and commercial direction',
      'Primary customer voice on enterprise accounts',
      'Final sign-off on every project that leaves the facility',
    ],
    photoPath: vinodPandey,
    draft: true,
  },
  {
    id: 'piyush-pathak',
    name: 'Piyush Pathak',
    initials: 'PP',
    title: 'Director Technical · Automation & Digitalization',
    roleTag: 'Technical Authority',
    accent: 'blue',
    yearsLabel: '30+ years',
    yearsSubLabel: 'In automation engineering since the mid-1990s',
    pedigreeLabel: 'Before Dreamz',
    pedigree:
      'Built his career inside the Siemens automation stack — SCADA architecture, distributed control, and the kind of plant-floor digitalization work that bridges the controls room to the corporate network.',
    ownsLabel: 'Leads at Dreamz',
    owns: [
      'Automation and digitalization engineering',
      'IT-OT integration architecture (Industrial Edge, IIH, OPC UA)',
      'Siemens ecosystem migrations — S5 to S7, PCS 7, WinCC',
    ],
    photoPath: piyushPathak,
    draft: true,
  },
  {
    id: 'tapeshwer-tyagi',
    name: 'Tapeshwer Tyagi',
    initials: 'TT',
    title: 'Director Technical · Motion & Drive Technology',
    roleTag: 'Technical Authority',
    accent: 'blue',
    yearsLabel: '30+ years',
    yearsSubLabel: 'In motion and drives since the mid-1990s',
    pedigreeLabel: 'Before Dreamz',
    pedigree:
      'Motion control and drive engineering across the converting and automotive industries — high-precision servo systems, large drive-train commissioning, and the discipline that comes from lines that cannot tolerate jitter.',
    ownsLabel: 'Leads at Dreamz',
    owns: [
      'Motion control and drive engineering',
      'Sinamics drive migrations and servo systems',
      'Drive architecture for converting and automotive lines',
    ],
    photoPath: tapeshwerTyagi,
    draft: true,
  },
];
