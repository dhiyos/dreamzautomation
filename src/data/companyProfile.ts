import profileCapability from '@/assets/profile-capability.jpg';
import profileFacility from '@/assets/profile-facility.jpg';
import profileSiemens from '@/assets/profile-siemens.jpg';

export interface ProfileCard {
  id: string;
  title: string;
  body: string;
  accent: 'blue' | 'teal';
  imagePath: string | null;
  imageHint: string;
}

export const companyProfile: ProfileCard[] = [
  {
    id: 'who-we-are',
    title: 'Who We Are',
    body: 'Founded in 2005 by a team of professionals with 30+ years of industry expertise. A leading System Integrator delivering end-to-end Industrial Automation solutions — from concept to commissioning.',
    accent: 'blue',
    imagePath: null,
    imageHint: 'Founders / leadership team — wide indoor portrait at HQ',
  },
  {
    id: 'our-capability',
    title: 'Our Capability',
    body: '50 professionals including a 20-member Engineering Division spanning Electrical, Electronics, Computer Science and Mechanical Engineering. In-house design, assembly, software development and commissioning — all under one roof.',
    accent: 'teal',
    imagePath: profileCapability,
    imageHint: 'Engineers at workstations / control desk in operation',
  },
  {
    id: 'our-facility',
    title: 'Our Facility',
    body: '10,000 sq. ft. manufacturing and integration facility in Ghaziabad, UP. Equipped for panel fabrication, system assembly, factory acceptance testing (FAT), and software development for complex automation projects.',
    accent: 'blue',
    imagePath: profileFacility,
    imageHint: 'Panel fabrication floor / FAT bay — wide environmental shot',
  },
  {
    id: 'siemens-partnership',
    title: 'Siemens Partnership',
    body: 'Certified Siemens Authorized System House for Automation & Drives — Delhi NCR since 2007. ISO 9001:2015 certified. CE Marked products confirmed by TÜV India under the EU Low Voltage Directive.',
    accent: 'teal',
    imagePath: profileSiemens,
    imageHint: 'Siemens-branded equipment in commissioning / S7 PLC rack closeup',
  },
];
