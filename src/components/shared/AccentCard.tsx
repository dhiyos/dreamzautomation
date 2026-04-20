import * as React from 'react';
import { cn } from '@/lib/utils';

interface AccentCardProps {
  accent?: 'blue' | 'teal' | 'amber' | 'none';
  topRule?: boolean;
  hover?: 'none' | 'lift' | 'surface';
  padding?: 'sm' | 'md' | 'lg';
  as?: 'div' | 'article' | 'a';
  href?: string;
  className?: string;
  children: React.ReactNode;
}

const accentBorder = {
  blue: 'border-t-accent-blue',
  teal: 'border-t-accent-teal',
  amber: 'border-t-accent-amber',
  none: '',
} as const;

const padMap = {
  sm: 'p-6',
  md: 'p-8',
  lg: 'p-10',
} as const;

const hoverMap = {
  none: '',
  lift: 'transition-transform duration-150 ease-out hover:-translate-y-[2px]',
  surface: 'transition-colors duration-150 ease-out hover:bg-bg-card-hover',
} as const;

export const AccentCard: React.FC<AccentCardProps> = ({
  accent = 'blue',
  topRule,
  hover = 'none',
  padding = 'md',
  as = 'div',
  href,
  className,
  children,
}) => {
  const showRule = topRule ?? accent !== 'none';
  const Comp: React.ElementType = as;
  const baseClass = cn(
    'block bg-bg-tertiary rounded-none no-underline',
    showRule && accent !== 'none' ? `border-t-[3px] ${accentBorder[accent]}` : '',
    padMap[padding],
    hoverMap[hover],
    className,
  );

  const props: Record<string, unknown> = { className: baseClass };
  if (as === 'a' && href) {
    props.href = href;
  }

  return <Comp {...props}>{children}</Comp>;
};

export default AccentCard;
