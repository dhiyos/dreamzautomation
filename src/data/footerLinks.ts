import { FooterColumn } from '@/types/content';

export const footerColumns: FooterColumn[] = [
  {
    title: 'Solutions',
    links: [
      { label: 'Process Automation', href: '/solutions#process' },
      { label: 'Machine Automation', href: '/solutions#machines' },
      { label: 'Training Kits', href: '/solutions#training' },
      { label: 'All Solutions →', href: '/solutions' },
    ],
  },
  {
    title: 'Case Studies',
    links: [
      { label: 'By Industry', href: '/industries' },
      { label: 'Featured Projects', href: '/case-studies' },
      { label: 'All Case Studies →', href: '/case-studies' },
    ],
  },
  {
    title: 'Insights',
    links: [
      { label: 'Technical Knowledge', href: '/insights' },
      { label: 'Market Dynamics', href: '/insights' },
      { label: 'Founder Posts', href: '/insights' },
      { label: 'All Insights →', href: '/insights' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Dreamz', href: '/about' },
      { label: 'Meet the Founders', href: '/about#about-pedigree-heading' },
      { label: 'Certifications', href: '/about#certifications' },
      { label: 'Careers', href: '/contact' },
      { label: 'Contact', href: '/contact' },
    ],
  },
];
