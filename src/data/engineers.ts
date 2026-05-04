import { Engineer } from '@/types/content';
import vinodPandey from '@/assets/engineers/vinod-pandey.jpg';
import piyushPathak from '@/assets/engineers/piyush-pathak.jpg';
import tapeshwerTyagi from '@/assets/engineers/tapeshwer-tyagi.jpg';

export const engineers: Engineer[] = [
  {
    id: 'vinod-pandey',
    name: 'Vinod Pandey',
    title: 'Director & CEO · Strategy & Commercial',
    roleTag: 'Lead Voice',
    accent: 'teal',
    bio: 'Primary voice for Dreamz on customer engagements and industry commentary. Over three decades in automation across petrochemicals, process industry, and transportation.',
    initials: 'VP',
    photoPath: vinodPandey,
  },
  {
    id: 'piyush-pathak',
    name: 'Piyush Pathak',
    title: 'Director Technical · Automation & Digitalization',
    roleTag: 'Technical Authority',
    accent: 'blue',
    bio: "Leads Dreamz's automation and digitalization engineering. Authors technical deep-dives on SCADA architecture, IT-OT integration, and Siemens ecosystem migrations.",
    initials: 'PP',
    photoPath: piyushPathak,
  },
  {
    id: 'tapeshwer-tyagi',
    name: 'Tapeshwer Tyagi',
    title: 'Director Technical · Motion & Drive Technology',
    roleTag: 'Technical Authority',
    accent: 'blue',
    bio: 'Leads motion control and drive engineering. Deep expertise in Sinamics drive migrations, servo systems, and precision motion for the converting and automotive verticals.',
    initials: 'TT',
    photoPath: tapeshwerTyagi,
  },
];
