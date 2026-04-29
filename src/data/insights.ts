import { InsightSlot } from '@/types/content';
import vinodPandey from '@/assets/engineers/vinod-pandey.jpg';
import piyushPathak from '@/assets/engineers/piyush-pathak.jpg';

export const insights: InsightSlot[] = [
  {
    id: 'technical-pillar',
    pillar: 'technical',
    pillarLabel: 'Technical Knowledge',
    accent: 'blue',
    authorName: 'Piyush Pathak',
    authorRole: 'Director Technical · Automation & Digitalization',
    authorInitials: 'PP',
    authorPhotoPath: piyushPathak,
    status: 'published',
    title: 'Retrofitting a brownfield coating line into an IoT machine without rewriting PLC code',
    excerpt:
      'On a three-station dual-side UV coating machine, the S7 Connector subscribes to the existing CPU 1504D over Profinet, pushes tags into IIH Essentials, and surfaces them through Performance Insight and Machine Monitor. The production logic stays untouched. A pattern that scales across the converting installed base — no rip-and-replace, no requalification.',
    date: 'April 2026',
    readTime: '7 min read',
    slug: 'retrofitting-brownfield-coating-iot',
  },
  {
    id: 'market-pillar',
    pillar: 'market',
    pillarLabel: 'Market & Machine Dynamics',
    accent: 'teal',
    authorName: 'Tapeshwer Tyagi',
    authorRole: 'Director Technical · Motion & Drive Technology',
    authorInitials: 'TT',
    authorPhotoPath: null,
    status: 'published',
    title: 'Eleven signals that turn a coating machine into a measurable asset',
    excerpt:
      'Motor current, motor temperature, drive vibration, film tension, UV lamp runtime, line-speed deviation, downtime codes — most of these already live on the drive bus. Routed through the edge, they collapse into Availability × Performance × Quality. OEE stops being a monthly spreadsheet and becomes a live dashboard the maintenance team can act on shift by shift.',
    date: 'March 2026',
    readTime: '6 min read',
    slug: 'oee-signals-coating-machine',
  },
  {
    id: 'founder-pillar',
    pillar: 'founder',
    pillarLabel: 'Founder Commentary',
    accent: 'teal',
    authorName: 'Vinod Pandey',
    authorRole: 'Director & CEO',
    authorInitials: 'VP',
    authorPhotoPath: vinodPandey,
    status: 'published',
    title: 'The biggest fear in our industry is data on the cloud. Edge changes the math.',
    excerpt:
      'In converting and printing, end-users will not sign off on uploading machine data to a public cloud — and they are right to push back. Edge devices flip the equation: real-time OEE, predictive maintenance, and IT-OT visibility, with all the data staying inside the plant. That is the unlock for smart automation in this segment, and it is the bridge from being an automation company to being a digitalization partner.',
    date: 'February 2026',
    readTime: '5 min read',
    slug: 'edge-vs-cloud-converting-industry',
  },
];
