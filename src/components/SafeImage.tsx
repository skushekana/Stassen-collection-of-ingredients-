import React, { useState, useEffect, useMemo } from 'react';
import {
  getGenericFoodFallbackChain,
  isValidImageUrl,
  hasImageUrlFailed,
  markImageUrlFailed,
  getResponsiveSrcSet,
} from '../utils/imageFallback';

export interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src?: string | null;
  alt: string;
  fallbackSrc?: string;
  fallbackChain?: string[];
  containerClassName?: string;
  priority?: boolean;
  targetWidth?: number;
}

export const SafeImage: React.FC<SafeImageProps> = ({
  src,
  alt,
  fallbackSrc,
  fallbackChain,
  className = '',
  containerClassName = '',
  loading,
  priority = false,
  targetWidth,
  ...props
}) => {
  // Compute full chain of progressive fallbacks, skipping already failed URLs
  const chain = useMemo(() => {
    const list: string[] = [];
    if (isValidImageUrl(src) && !hasImageUrlFailed(src)) {
      list.push(src!);
    }
    if (fallbackSrc && isValidImageUrl(fallbackSrc) && !hasImageUrlFailed(fallbackSrc)) {
      list.push(fallbackSrc);
    }
    if (fallbackChain && fallbackChain.length > 0) {
      fallbackChain.forEach(url => {
        if (isValidImageUrl(url) && !hasImageUrlFailed(url)) {
          list.push(url);
        }
      });
    }
    list.push(...getGenericFoodFallbackChain(alt));
    return list;
  }, [src, fallbackSrc, fallbackChain, alt]);

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [hasLoaded, setHasLoaded] = useState<boolean>(false);

  useEffect(() => {
    setCurrentIndex(0);
    setHasLoaded(false);
  }, [src, fallbackSrc]);

  const currentSrc = chain[currentIndex] || chain[chain.length - 1];

  const handleError = () => {
    // Mark failed URL in session cache to prevent retry loops
    if (currentSrc) {
      markImageUrlFailed(currentSrc);
    }
    if (currentIndex < chain.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setHasLoaded(true); // Stop shimmering once at final SVG
    }
  };

  // Compute responsive srcSet only for network CDN URLs
  const srcSet = useMemo(() => {
    if (!currentSrc || currentSrc.startsWith('data:')) return undefined;
    return getResponsiveSrcSet(currentSrc);
  }, [currentSrc]);

  const descriptiveAlt = alt && alt.trim().length > 0 ? alt : 'Stassen Culinary Archive Specialty';

  return (
    <div className={`overflow-hidden relative bg-[#141414] ${containerClassName}`}>
      {/* Visual Shimmer Skeleton to eliminate blank containers or layout shifts */}
      {!hasLoaded && (
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-[#141414] via-[#202020] to-[#141414] animate-pulse z-0"
        />
      )}

      <img
        src={currentSrc}
        srcSet={srcSet}
        sizes={props.sizes || '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'}
        alt={descriptiveAlt}
        onError={handleError}
        onLoad={() => setHasLoaded(true)}
        loading={priority ? 'eager' : loading || 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        referrerPolicy="no-referrer"
        decoding="async"
        className={`w-full h-full object-cover transition-opacity duration-300 relative z-[1] ${
          hasLoaded ? 'opacity-100' : 'opacity-0'
        } ${className}`}
        {...props}
      />
    </div>
  );
};

