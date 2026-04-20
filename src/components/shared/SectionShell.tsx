import * as React from 'react';
import { cn } from '@/lib/utils';

interface SectionShellProps {
  children: React.ReactNode;
  headingId?: string;
  background?: 'primary' | 'secondary' | 'tertiary';
  fullBleedBg?: boolean;
  className?: string;
  as?: 'section' | 'div';
  ariaLabel?: string;
}

const bgMap = {
  primary: 'bg-bg-primary',
  secondary: 'bg-bg-secondary',
  tertiary: 'bg-bg-tertiary',
} as const;

export const SectionShell: React.FC<SectionShellProps> = ({
  children,
  headingId,
  background = 'primary',
  fullBleedBg = false,
  className,
  as: Comp = 'section',
  ariaLabel,
}) => {
  return (
    <Comp
      aria-labelledby={headingId}
      aria-label={ariaLabel}
      className={cn('w-full', fullBleedBg ? bgMap[background] : bgMap[background], className)}
    >
      <div className="page-container section-y">{children}</div>
    </Comp>
  );
};

export default SectionShell;
