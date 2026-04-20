export interface ProfileCard {
  id: string;
  title: string;
  body: string;
  accent: 'blue' | 'teal';
}

export const companyProfile: ProfileCard[] = [
  {
    id: 'who-we-are',
    title: 'Who We Are',
    body: 'Founded in 2005 by a team of professionals with 30+ years of industry expertise. A leading System Integrator delivering end-to-end Industrial Automation solutions — from concept to commissioning.',
    accent: 'blue'
  },
  {
    id: 'our-capability',
    title: 'Our Capability',
    body: '50 professionals including a 20-member Engineering Division spanning Electrical, Electronics, Computer Science and Mechanical Engineering. In-house design, assembly, software development and commissioning — all under one roof.',
    accent: 'teal'
  },
  {
    id: 'our-facility',
    title: 'Our Facility',
    body: '10,000 sq. ft. manufacturing and integration facility in Ghaziabad, UP. Equipped for panel fabrication, system assembly, factory acceptance testing (FAT), and software development for complex automation projects.',
    accent: 'blue'
  },
  {
    id: 'siemens-partnership',
    title: 'Siemens Partnership',
    body: 'Certified Siemens Authorized System House for Automation & Drives — Delhi NCR since 2007. ISO 9001:2015 certified. CE Marked products confirmed by TÜV India under the EU Low Voltage Directive.',
    accent: 'teal'
  }
];
