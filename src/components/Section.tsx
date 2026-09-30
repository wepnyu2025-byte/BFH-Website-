import React from 'react';

export type SectionBg = 'white' | 'teal-50' | 'teal-700' | 'teal-800';

interface SectionProps {
  children: React.ReactNode;
  bg?: SectionBg;
  className?: string;
  id?: string;
}

export const Section: React.FC<SectionProps> = ({
  children,
  bg = 'white',
  className = '',
  id,
}) => {
  const bgClasses: Record<SectionBg, string> = {
    white: 'bg-white text-teal-950',
    'teal-50': 'bg-teal-50 text-teal-950',
    'teal-700': 'bg-teal-700 text-white',
    'teal-800': 'bg-teal-800 text-white',
  };

  return (
    <section
      id={id}
      className={`py-[85px] md:py-[100px] lg:py-[120px] ${bgClasses[bg]} ${className}`}
    >
      {children}
    </section>
  );
};
