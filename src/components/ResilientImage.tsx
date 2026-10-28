import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  bgTone?: string;
  focusArea?: 'full' | 'label' | 'texture';
  priority?: boolean;
}

export const ResilientImage: React.FC<ResilientImageProps> = ({
  src,
  alt,
  className = '',
  containerClassName = '',
  bgTone = '#FDF6F7',
  focusArea = 'full',
  priority = false,
}) => {
  const [hasError, setHasError] = useState(false);

  const focusTransform =
    focusArea === 'label'
      ? 'scale-125 object-bottom'
      : focusArea === 'texture'
      ? 'scale-125 object-center'
      : 'object-center';

  if (hasError) {
    return (
      <div
        style={{ backgroundColor: bgTone }}
        className={`flex flex-col items-center justify-center p-6 text-center text-[#6E5D63] ${containerClassName}`}
      >
        <Sparkles className="w-8 h-8 text-[#B85D6F] mb-2 opacity-70" />
        <span className="font-serif-editorial text-sm text-[#2C2226] font-medium">
          Grace N Glow
        </span>
        <span className="text-xs text-[#6E5D63] mt-1 max-w-[20ch]">{alt}</span>
      </div>
    );
  }

  return (
    <div
      style={{ backgroundColor: bgTone }}
      className={`relative overflow-hidden ${containerClassName}`}
    >
      <img
        src={src}
        alt={alt}
        referrerPolicy="no-referrer"
        loading={priority ? 'eager' : 'lazy'}
        onError={() => setHasError(true)}
        className={`transition-transform duration-300 ease-out ${focusTransform} ${className}`}
      />
    </div>
  );
};
