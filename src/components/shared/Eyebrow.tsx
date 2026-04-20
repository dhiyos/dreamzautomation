import * as React from 'react';
import { cn } from '@/lib/utils';

interface EyebrowProps {
  text: string;
  variant?: 'blue' | 'teal' | 'amber';
  className?: string;
}

const lineBg = {
  blue: 'bg-accent-blue',
  teal: 'bg-accent-teal',
  amber: 'bg-accent-amber',
} as const;

const textColor = {
  blue: 'text-accent-blue',
  teal: 'text-accent-teal',
  amber: 'text-accent-amber',
} as const;

export const Eyebrow: React.FC<EyebrowProps> = ({ text, variant = 'blue', className }) => {
  return (
    <div className={cn('flex items-center gap-3', className)}>
      <span
        aria-hidden="true"
        className={cn('block shrink-0 rounded-none', lineBg[variant])}
        style={{ width: 32, height: 1 }}
      />
      <span className={cn('text-eyebrow', textColor[variant])}>{text}</span>
    </div>
  );
};

export default Eyebrow;
