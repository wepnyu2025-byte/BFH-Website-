import React, { useState } from 'react';

interface SmartImageProps {
  src: string;
  alt: string;
  aspectRatio?: '4:5' | '3:2' | '1:1' | '16:9';
  className?: string;
  eager?: boolean;
  arch?: boolean;
}

export const SmartImage: React.FC<SmartImageProps> = ({
  src,
  alt,
  aspectRatio = '3:2',
  className = '',
  eager = false,
  arch = false,
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const ratioClass =
    aspectRatio === '4:5'
      ? 'aspect-[4/5]'
      : aspectRatio === '1:1'
      ? 'aspect-square'
      : aspectRatio === '16:9'
      ? 'aspect-[16/9]'
      : 'aspect-[3/2]';

  const radiusClass = arch
    ? 'rounded-t-full rounded-b-[40px]'
    : 'rounded-[28px] md:rounded-[32px]';

  return (
    <div
      className={`relative overflow-hidden bg-teal-100 w-full ${ratioClass} ${radiusClass} ${className}`}
    >
      {/* Soft Teal Placeholder Graphic with brand heart */}
      <div
        className={`absolute inset-0 flex flex-col items-center justify-center p-6 text-center transition-opacity duration-500 ${
          isLoaded && !hasError ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        <div className="w-14 h-14 rounded-full bg-teal-50 flex items-center justify-center text-teal-600 mb-3">
          <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>
        <p className="font-body text-xs md:text-sm font-semibold text-teal-900/70 max-w-[240px] leading-snug">
          {alt}
        </p>
      </div>

      {!hasError && (
        <img
          src={src}
          alt={alt}
          loading={eager ? 'eager' : 'lazy'}
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          className={`w-full h-full object-cover transition-all duration-700 hover:scale-104 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      )}
    </div>
  );
};
