import facilityIndia1 from '@/assets/facility-india-1.jpg';
import facilityIndia2 from '@/assets/facility-india-2.jpg';
import facilityIndia3 from '@/assets/facility-india-3.jpg';
import profileFacility from '@/assets/profile-facility.jpg';

export interface AboutStat {
  value: string;
  label: string;
  sublabel?: string;
}

export const aboutStats: AboutStat[] = [
  { value: '21', label: 'Years operating', sublabel: 'Founded 2005' },
  { value: '50', label: 'Professionals', sublabel: 'Across engineering, production & service' },
  { value: '20', label: 'Engineering team', sublabel: 'Electrical, Electronics, CS, Mechanical' },
  { value: '10,000', label: 'Sq. ft. facility', sublabel: 'Ghaziabad, Uttar Pradesh' },
  // TODO: confirm or replace with real numbers
  { value: '200+', label: 'Projects delivered', sublabel: 'Across the installed base' },
  { value: '8', label: 'Industry verticals', sublabel: 'Process, converting, automotive & more' },
];

export interface AboutMilestone {
  year: string;
  title: string;
  body: string;
  draft?: boolean;
}

export const aboutTimeline: AboutMilestone[] = [
  {
    year: '2005',
    title: 'Founded in Delhi NCR',
    body: 'Vinod Pandey, Tapeshwar Tyagi, and Piyush Pathak start Dreamz Automation — three engineers with three decades of combined experience across petrochemicals, motion control, and digitalization, building a system integrator they would have wanted to work with.',
  },
  {
    year: '2007',
    title: 'Siemens Authorized System House',
    body: 'Certified by Siemens Digital Industries as an Authorized System House for the complete Automation & Drives portfolio across Delhi NCR — a partnership now in its second decade.',
  },
  // TODO: confirm year and short story
  {
    year: '2012',
    title: 'Ghaziabad facility comes online',
    body: '10,000 sq. ft. integration and panel fabrication facility commissioned in Ghaziabad, Uttar Pradesh — bringing design, assembly, FAT, and software development under one roof.',
    draft: true,
  },
  // TODO: confirm year and project specifics
  {
    year: '2018',
    title: 'First IT–OT retrofit projects',
    body: 'Begin retrofitting brownfield converting and process lines with edge connectivity — laying the groundwork for the IIH and Industrial Edge work that defines our current capability.',
    draft: true,
  },
  {
    year: '2023',
    title: 'CE Marking declared',
    body: 'Panel products formally CE Marked under the EU Low Voltage Directive 2014/35/EU, certified by TÜV India against EN 61439-1 / EN 61439-2.',
  },
  // TODO: confirm exact year of ISO issuance (validity through Nov 2027)
  {
    year: '2024',
    title: 'ISO 9001:2015 certified',
    body: 'Quality Management System certified by WRG Certifications across engineering, production, and service. Valid through November 2027.',
    draft: true,
  },
];

export interface FacilityImage {
  src: string;
  alt: string;
  caption: string;
  // TODO: confirm caption matches what each photo actually shows
  draft?: boolean;
}

export const facilityImages: FacilityImage[] = [
  {
    src: facilityIndia1,
    alt: 'Dreamz Automation Ghaziabad facility — production floor',
    caption: 'Panel fabrication floor',
    draft: true,
  },
  {
    src: facilityIndia2,
    alt: 'Dreamz Automation Ghaziabad facility — FAT bay',
    caption: 'Factory Acceptance Testing (FAT) bay',
    draft: true,
  },
  {
    src: facilityIndia3,
    alt: 'Dreamz Automation Ghaziabad facility — engineering operations',
    caption: 'Engineering & control desk operations',
    draft: true,
  },
  {
    src: profileFacility,
    alt: 'Dreamz Automation Ghaziabad facility — software & integration',
    caption: 'Software development & systems integration',
    draft: true,
  },
];

export const aboutStoryParagraphs: string[] = [
  'Dreamz Automation was founded in Delhi NCR in 2005 by three engineers — Vinod Pandey, Tapeshwar Tyagi, and Piyush Pathak — who had spent the prior two decades inside the petrochemical, process, and motion-control industries. They started the company on a single conviction: that the automation industry under-serves the people actually responsible for keeping plants running.',
  'Two decades later, that posture still defines the firm. We are a Siemens Authorized System House — one of the longest-tenured in the Delhi NCR region — and we deliver complete projects under one accountable team: design, panel fabrication, software development, factory acceptance testing, commissioning, and post-handover service.',
  'Today, the same three founders still review every technical brief and sign off on every project that leaves our 10,000 sq. ft. integration facility in Ghaziabad. The team around them — fifty professionals strong, with a twenty-member engineering division spanning electrical, electronics, computer science, and mechanical disciplines — does the work the founders themselves did at the start of their careers, with the same standards.',
  'We are not interested in being the largest system integrator. We are interested in being the one a plant manager calls when the project actually has to work — on time, against spec, and inside the constraints of an operating facility that cannot afford to be wrong.',
];
