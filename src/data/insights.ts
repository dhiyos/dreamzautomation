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
    status: 'coming-soon',
  },
  {
    id: 'market-pillar',
    pillar: 'market',
    pillarLabel: 'Market & Machine Dynamics',
    accent: 'teal',
    authorName: 'Vinod Pandey',
    authorRole: 'Director & CEO · Strategy & Commercial',
    authorInitials: 'VP',
    authorPhotoPath: vinodPandey,
    status: 'coming-soon',
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
    status: 'coming-soon',
  },
];
