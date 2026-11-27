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
        className={`flex flex-col items-center justify-center bg-[#EAE2D8]/50 text-[#202322] p-8 text-center border border-[#EAE2D8] ${className}`}
      >
        <p className="font-display text-xl font-medium tracking-tight text-[#202322]">
          {fallbackTitle}
        </p>
        <p className="mt-1 text-xs text-[#6E665E]">{fallbackSubtitle}</p>
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
