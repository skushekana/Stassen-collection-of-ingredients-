import React, { useState, useEffect, useMemo } from 'react';
import { RefreshCw, ChefHat } from 'lucide-react';
import { CulinaryMasterclass } from '../types';
import {
  getRecipeFallbackChain,
  isValidImageUrl,
  hasImageUrlFailed,
  markImageUrlFailed,
  getResponsiveSrcSet,
} from '../utils/imageFallback';

export interface CulinaryImageProps {
  recipe?: CulinaryMasterclass;
  src?: string;
  alt?: string;
  className?: string;
  containerClassName?: string;
  category?: string;
  cuisine?: string;
  aspectRatio?: string;
  priority?: boolean;
  allowRegeneration?: boolean;
  onRegenerate?: () => void;
  isRegenerating?: boolean;
  sizes?: string;
}

export const CulinaryImage: React.FC<CulinaryImageProps> = ({
  recipe,
  src,
  alt,
  className = 'w-full h-full object-cover',
  containerClassName = 'w-full h-full relative overflow-hidden',
  category,
  cuisine,
  priority = false,
  allowRegeneration = false,
  onRegenerate,
  isRegenerating = false,
  sizes,
}) => {
  const fallbackChain = useMemo(() => {
    const list: string[] = [];
    const primarySrc = src || recipe?.heroImageUrl;
    if (isValidImageUrl(primarySrc) && !hasImageUrlFailed(primarySrc)) {
      list.push(primarySrc!);
    }

    const derived = getRecipeFallbackChain(
      recipe || {
        dishTitle: alt || 'Haute Cuisine Masterclass',
        cuisine: cuisine || recipe?.cuisine,
        courseCategory: (category || recipe?.courseCategory) as any,
        primaryIngredientName: recipe?.primaryIngredientName,
      }
    );
    list.push(...derived);
    return list;
  }, [src, recipe, alt, cuisine, category]);

  const [chainIndex, setChainIndex] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setChainIndex(0);
    setIsLoading(true);
  }, [src, recipe?.id, recipe?.heroImageUrl, cuisine, category, alt]);

  const currentImg = fallbackChain[chainIndex] || fallbackChain[fallbackChain.length - 1];

  const handleImageError = () => {
    if (currentImg) {
      markImageUrlFailed(currentImg);
    }
    if (chainIndex < fallbackChain.length - 1) {
      setChainIndex(prev => prev + 1);
    } else {
      setIsLoading(false);
    }
  };

  const srcSet = useMemo(() => {
    if (!currentImg || currentImg.startsWith('data:')) return undefined;
    return getResponsiveSrcSet(currentImg);
  }, [currentImg]);

  // Meaningful alt text derived from recipe details
  const descriptiveAlt = alt && alt.trim().length > 0
    ? alt
    : recipe
    ? `${recipe.dishTitle} — Haute ${recipe.cuisine} gastronomy${recipe.primaryIngredientName ? ` featuring ${recipe.primaryIngredientName}` : ''}`
    : 'Stassen haute gastronomy masterclass';

  return (
    <div className={`relative bg-[#161616] group ${containerClassName}`}>
      {/* Loading Skeleton / Shimmer */}
      {isLoading && (
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-[#141414] via-[#222222] to-[#141414] animate-pulse flex items-center justify-center z-10"
        >
          <div className="flex flex-col items-center gap-2">
            <ChefHat className="w-8 h-8 text-[#C5A059]/40 animate-bounce" />
            <span className="text-[10px] font-mono text-[#C5A059]/60 tracking-wider uppercase">
              Rendering Haute Gastronomy Visual...
            </span>
          </div>
        </div>
      )}

      {/* Primary Image with seamless fallback and referrer safety */}
      <img
        src={currentImg}
        srcSet={srcSet}
        sizes={sizes || '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'}
        alt={descriptiveAlt}
        referrerPolicy="no-referrer"
        onError={handleImageError}
        onLoad={() => {
          setIsLoading(false);
        }}
        decoding="async"
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        className={`${className} transition-opacity duration-500 ease-in-out relative z-[1] ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
      />

      {/* Atmospheric culinary vignette overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none z-[2]" />

      {/* AI Image Regeneration Action Badge (if enabled) */}
      {allowRegeneration && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            if (onRegenerate) onRegenerate();
          }}
          disabled={isRegenerating}
          title="Regenerate high-definition culinary image with AI"
          className="absolute top-3 right-3 z-20 px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md border border-[#C5A059]/50 text-[#C5A059] text-[10px] font-mono hover:bg-[#C5A059] hover:text-black transition-all flex items-center gap-1 shadow-lg opacity-0 group-hover:opacity-100 disabled:opacity-50"
        >
          <RefreshCw className={`w-3 h-3 ${isRegenerating ? 'animate-spin text-[#C5A059]' : ''}`} />
          <span>{isRegenerating ? 'Generating...' : 'AI Regenerate'}</span>
        </button>
      )}
    </div>
  );
};

