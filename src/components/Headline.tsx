import React from 'react';

interface HeadlineProps {
  as?: 'h1' | 'h2' | 'h3';
  children: string;
  theme?: 'light' | 'dark';
  align?: 'auto' | 'left' | 'center';
  className?: string;
  isHero?: boolean;
}

export const Headline: React.FC<HeadlineProps> = ({
  as = 'h2',
  children,
  theme = 'light',
  align = 'auto',
  className = '',
  isHero = false,
}) => {
  const isDark = theme === 'dark';

  const baseTextColor = isDark ? 'text-white' : 'text-teal-900';
  const highlightColor = isDark ? 'text-orange-400' : 'text-orange-600';

  const alignClasses =
    align === 'auto'
      ? 'text-left md:text-center'
      : align === 'left'
      ? 'text-left'
      : 'text-center';

  // Parse {{highlight}} pattern
  const parts = children.split(/(\{\{.*?\}\})/g);

  const renderedContent = parts.map((part, index) => {
    if (part.startsWith('{{') && part.endsWith('}}')) {
      const keyword = part.slice(2, -2);
      return (
        <span
          key={index}
          className={`${highlightColor} font-extrabold ${isHero ? 'hero-highlight-word' : ''}`}
        >
          {keyword}
        </span>
      );
    }
    return <span key={index}>{part}</span>;
  });

  const Tag = as;

  if (as === 'h1') {
    return (
      <Tag
        className={`font-headline font-extrabold text-[clamp(2.75rem,7vw,5.25rem)] leading-[1.05] tracking-[-0.03em] ${baseTextColor} ${alignClasses} [text-wrap:balance] ${className}`}
      >
        {renderedContent}
      </Tag>
    );
  }

  if (as === 'h2') {
    return (
      <Tag
        className={`font-headline font-extrabold text-[clamp(2.15rem,5vw,3.75rem)] leading-[1.08] tracking-[-0.03em] ${baseTextColor} ${alignClasses} [text-wrap:balance] ${className}`}
      >
        {renderedContent}
      </Tag>
    );
  }

  return (
    <Tag
      className={`font-body font-semibold text-[clamp(1.25rem,2vw,1.5rem)] leading-snug ${baseTextColor} ${alignClasses} [text-wrap:balance] ${className}`}
    >
      {renderedContent}
    </Tag>
  );
};
