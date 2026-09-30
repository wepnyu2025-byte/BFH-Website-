import React from 'react';

interface PanelProps {
  children: React.ReactNode;
  bg?: 'teal-700' | 'teal-800';
  className?: string;
  id?: string;
}

export const Panel: React.FC<PanelProps> = ({
  children,
  bg = 'teal-700',
  className = '',
  id,
}) => {
  const bgClass = bg === 'teal-700' ? 'bg-teal-700' : 'bg-teal-800';

  return (
    <div
      id={id}
      className={`mx-4 md:mx-6 my-6 md:my-10 rounded-[32px] md:rounded-[48px] ${bgClass} text-white py-[85px] md:py-[100px] lg:py-[120px] relative overflow-hidden ${className}`}
    >
      {children}
    </div>
  );
};
