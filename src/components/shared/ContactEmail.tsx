import * as React from 'react';
import { cn } from '@/lib/utils';

interface ContactEmailProps {
  email: string;
  size?: 'sm' | 'md';
  className?: string;
}

export const ContactEmail: React.FC<ContactEmailProps> = ({
  email,
  size = 'md',
  className,
}) => {
  return (
    <a
      href={`mailto:${email}`}
      className={cn(
        'inline-block font-medium text-accent-blue no-underline transition-colors duration-150 hover:underline hover:text-accent-blue-hover',
        size === 'sm' ? 'text-[12px]' : 'text-[14px]',
        className,
      )}
    >
      {email}
    </a>
  );
};

export default ContactEmail;
