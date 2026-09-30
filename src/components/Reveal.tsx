import React, { CSSProperties } from 'react';
import { useReveal } from '../hooks/useReveal';

interface RevealProps {
  children: React.ReactNode;
  type?: 'up' | 'left' | 'right' | 'pop';
  delay?: number;
  className?: string;
}

export const Reveal: React.FC<RevealProps> = ({
  children,
  type = 'up',
  delay = 0,
  className = '',
}) => {
  const ref = useReveal<HTMLDivElement>();

  const typeClass =
    type === 'up'
      ? 'reveal-up'
      : type === 'left'
      ? 'reveal-left'
      : type === 'right'
      ? 'reveal-right'
      : 'reveal-pop';

  const style: CSSProperties = delay
    ? ({ '--delay': `${delay}ms` } as CSSProperties)
    : {};

  return (
    <div ref={ref} className={`reveal ${typeClass} ${className}`} style={style}>
      {children}
    </div>
  );
};
