import * as React from 'react';
import { cn } from '@/lib/utils';

interface CtaButtonProps {
  variant?: 'primary' | 'ghost' | 'white';
  icon?: string;
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  type?: 'button' | 'submit';
}

const baseClass =
  'inline-flex items-center justify-center font-montserrat uppercase rounded-none transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary';

const variantClass = {
  primary:
    'bg-accent-blue text-white font-bold hover:bg-accent-blue-hover px-7 py-[14px]',
  ghost:
    'border border-line-strong bg-transparent text-white font-semibold hover:border-accent-blue px-7 py-[13px]',
  white:
    'bg-white text-accent-blue font-bold hover:bg-surface-light px-7 py-[14px]',
} as const;

const sizing = 'text-[12px] tracking-[0.02em]';

export const CtaButton: React.FC<CtaButtonProps> = ({
  variant = 'primary',
  icon = '→',
  href,
  onClick,
  children,
  className,
  type = 'button',
}) => {
  const cls = cn(baseClass, sizing, variantClass[variant], className);
  const content = (
    <>
      <span>{children}</span>
      {icon ? <span className="ml-2 inline-block">{icon}</span> : null}
    </>
  );

  if (href) {
    return (
      <a href={href} className={cls} onClick={onClick}>
        {content}
      </a>
    );
  }
  return (
    <button type={type} className={cls} onClick={onClick}>
      {content}
    </button>
  );
};

export default CtaButton;
