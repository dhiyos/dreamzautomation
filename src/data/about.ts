import facilityIndia1 from '@/assets/facility-india-1.jpg?w=1000&format=webp';
import facilityIndia2 from '@/assets/facility-india-2.jpg?w=1000&format=webp';
import facilityIndia3 from '@/assets/facility-india-3.jpg?w=1000&format=webp';
import profileFacility from '@/assets/profile-facility.jpg?w=1000&format=webp';

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
    body: 'Vinod Pandey, Tapeshwer Tyagi, and Piyush Pathak start Dreamz Automation — three engineers with three decades of combined experience across petrochemicals, process plants, and motion control, building the system integrator they themselves would have wanted to work with.',
  },
  {
    year: '2007',
    title: 'Siemens Authorized System House',
    body: 'Certified by Siemens Digital Industries as an Authorized System House for the complete Automation & Drives portfolio across Delhi NCR. The credential that defines the next two decades of work — and one of the longest-tenured Siemens System Houses in the region.',
  },
  // TODO: confirm year of facility commissioning
  {
    year: '2012',
    title: 'Ghaziabad facility online',
    body: '10,000 sq. ft. integration and panel fabrication facility commissioned in Ghaziabad, Uttar Pradesh. Design, assembly, factory acceptance testing, and software development under one roof — and under one accountable team.',
    draft: true,
  },
  // TODO: confirm year and lead project for IT-OT retrofit work
  {
    year: '2018',
    title: 'IT-OT retrofit work begins',
    body: 'The inflection point. Brownfield converting and process lines retrofitted with edge connectivity, OPC UA, and structured data flow into MES and historian — the work that turns a Siemens System House into an IT-OT integrator. Industrial Edge and Industrial Information Hub become standard tools in the engineering brief.',
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
  // TODO: confirm framing — this is the present-day capability statement, not a discrete event
  {
    year: '2026',
    title: 'IT-OT ready, plant-floor proven',
    body: 'Today, the same three founders still sign off every brief. The installed base spans process, machine, and motion-control plants across eight industry verticals — many now running with edge connectivity and IT-OT data integration alongside the classic Siemens automation that has run the floor for years.',
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
  'Dreamz Automation was founded in Delhi NCR in 2005 by three engineers — Vinod Pandey, Tapeshwer Tyagi, and Piyush Pathak — who had spent the prior two decades inside petrochemical, process, and motion-control industries. They started the firm on one conviction: that the automation industry under-serves the people actually responsible for keeping plants running.',
  'Twenty-one years later, the same three founders still review every technical brief. Around them, a fifty-person team — including a twenty-engineer division spanning electrical, electronics, computer science, and mechanical disciplines — runs design, panel fabrication, software development, factory acceptance testing, and commissioning out of a single 10,000 sq. ft. facility in Ghaziabad.',
  'Dreamz started as a classic Siemens System House and is now the kind of integrator that has to be both — comfortable with PLC, DCS, and SCADA work that was current twenty years ago, and equally comfortable retrofitting the same lines today with edge connectivity and IT-OT data integration. We are not interested in being the largest integrator in the region. We are interested in being the one a plant manager calls when the project actually has to work.',
];
