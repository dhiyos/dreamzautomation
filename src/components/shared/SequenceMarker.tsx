import * as React from 'react';

interface SequenceMarkerProps {
  current: number;
  total: number;
}

const pad = (n: number) => n.toString().padStart(2, '0');

export const SequenceMarker: React.FC<SequenceMarkerProps> = ({ current, total }) => {
  return (
    <div className="flex items-baseline">
      <span
        className="font-extrabold text-accent-teal"
        style={{ fontSize: 54, letterSpacing: '-0.03em', lineHeight: 0.85 }}
      >
        {pad(current)}
      </span>
      <span
        className="ml-1 font-medium text-text-muted"
        style={{ fontSize: 14 }}
      >
        {' '}/ {pad(total)}
      </span>
    </div>
  );
};

export default SequenceMarker;
