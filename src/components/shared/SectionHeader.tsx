import * as React from 'react';
import { cn } from '@/lib/utils';
import { Eyebrow } from './Eyebrow';

interface SectionHeaderProps {
  eyebrow: string;
  heading: React.ReactNode;
  headingId: string;
  descriptor?: string;
  layout?: 'stacked' | 'split';
  eyebrowVariant?: 'blue' | 'teal' | 'amber';
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  eyebrow,
  heading,
  headingId,
  descriptor,
  layout = 'stacked',
  eyebrowVariant = 'blue',
  className,
}) => {
  if (layout === 'split') {
    return (
      <div
        className={cn(
          'grid grid-cols-1 gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-end lg:gap-20',
          className,
        )}
      >
        <div>
          <Eyebrow text={eyebrow} variant={eyebrowVariant} />
          <h2 id={headingId} className="heading-h2 mt-5">
            {heading}
          </h2>
        </div>
        {descriptor ? <p className="text-body-default">{descriptor}</p> : null}
      </div>
    );
  }

  return (
    <div className={className}>
      <Eyebrow text={eyebrow} variant={eyebrowVariant} />
      <h2 id={headingId} className="heading-h2 mt-5">
        {heading}
      </h2>
      {descriptor ? (
        <p className="text-body-default mt-4 max-w-[680px]">{descriptor}</p>
      ) : null}
    </div>
  );
};

export default SectionHeader;
