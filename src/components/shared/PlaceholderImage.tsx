import * as React from 'react';
import { cn } from '@/lib/utils';

interface PlaceholderImageProps {
  label: string;
  aspectRatio?: '16/9' | '16/10' | '4/3' | '1/1' | 'auto';
  height?: string;
  small?: boolean;
  className?: string;
}

export const PlaceholderImage: React.FC<PlaceholderImageProps> = ({
  label,
  aspectRatio = '16/9',
  height,
  small = false,
  className,
}) => {
  const style: React.CSSProperties = {};
  if (small) {
    style.width = 80;
    style.height = 80;
  } else if (height) {
    style.height = height;
  } else if (aspectRatio !== 'auto') {
    style.aspectRatio = aspectRatio.replace('/', ' / ');
  }

  return (
    <div
      style={style}
      className={cn(
        'flex w-full items-center justify-center rounded-none bg-bg-tertiary',
        small ? 'w-20' : '',
        className,
      )}
    >
      <span
        className={cn(
          'font-medium uppercase text-text-dim text-center px-2',
          small ? 'text-[10px]' : 'text-[11px]',
        )}
        style={{ letterSpacing: '0.08em' }}
      >
        {label}
      </span>
    </div>
  );
};

export default PlaceholderImage;
