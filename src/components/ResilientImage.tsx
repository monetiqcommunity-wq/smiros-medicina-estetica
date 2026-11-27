import { useState } from 'react';

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackTitle?: string;
  fallbackSubtitle?: string;
}

export function ResilientImage({
  src,
  alt,
  className = '',
  fallbackTitle = 'SMIROS Medicina Estetica',
  fallbackSubtitle = 'Corso Vittorio Emanuele II, 310 · Pescara',
}: ResilientImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center bg-[#E6D8C9]/50 text-[#1C1C1C] p-8 text-center border border-[#E6D8C9] ${className}`}
      >
        <p className="font-display text-xl font-medium tracking-tight text-[#1C1C1C]">
          {fallbackTitle}
        </p>
        <p className="mt-1 text-xs text-[#6B6056]">{fallbackSubtitle}</p>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      loading="eager"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
