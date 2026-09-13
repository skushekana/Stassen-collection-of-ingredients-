import React, { useState, useEffect, useMemo } from 'react';
import {
  Sparkles,
  Leaf,
  Droplets,
  Flame,
  Waves,
  Sun,
  Compass,
  FlaskConical,
  Trees,
  Apple
} from 'lucide-react';
import { Ingredient, IngredientCategory } from '../types';
import {
  getIngredientFallbackChain,
  isValidImageUrl,
  hasImageUrlFailed,
  markImageUrlFailed,
  getResponsiveSrcSet,
} from '../utils/imageFallback';

export interface IngredientImageProps {
  ingredient?: Ingredient;
  src?: string;
  alt?: string;
  className?: string;
  containerClassName?: string;
  aspectRatio?: string;
  priority?: boolean;
  targetWidth?: number;
  sizes?: string;
}

// Map category to aesthetic botanical icons
function getCategoryIcon(category?: IngredientCategory | string) {
  switch (category) {
    case 'Wild Fungi & Truffles':
      return Trees;
    case 'Rare Spices':
      return Sparkles;
    case 'Ferments & Vinegars':
    case 'Artisanal Ferments & Vinegars':
      return FlaskConical;
    case 'Heritage Salts & Minerals':
      return Waves;
    case 'Foraged Botanicals':
      return Leaf;
    case 'Specialty Oils & Fats':
      return Droplets;
    case 'Cultivated Teas & Tisanes':
    case 'Rare Teas & Infusions':
      return Sun;
    case 'Artisanal Nectars & Sugars':
      return Apple;
    case 'Ancient Grains & Seeds':
    case 'Ancient Grains & Flours':
      return Flame;
    default:
      return Compass;
  }
}

export const IngredientImage: React.FC<IngredientImageProps> = ({
  ingredient,
  src,
  alt,
  className = 'w-full h-full object-cover',
  containerClassName = 'w-full h-full relative overflow-hidden',
  priority = false,
  sizes,
}) => {
  const fallbackChain = useMemo(() => {
    const list: string[] = [];
    if (isValidImageUrl(src) && !hasImageUrlFailed(src)) {
      list.push(src!);
    }
    if (ingredient) {
      list.push(...getIngredientFallbackChain(ingredient));
    } else {
      list.push(...getIngredientFallbackChain({ name: alt || 'Ingredient' }));
    }
    return list;
  }, [src, ingredient, alt]);

  const [chainIndex, setChainIndex] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setChainIndex(0);
    setIsLoading(true);
  }, [src, ingredient?.id, ingredient?.imageUrl, ingredient?.category]);

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

  const Icon = getCategoryIcon(ingredient?.category);

  // High quality specific alt text derived from specimen data
  const descriptiveAlt = alt && alt.trim().length > 0
    ? alt
    : ingredient
    ? `${ingredient.name} — ${ingredient.category} harvested from ${ingredient.origin || 'sustainable terroir'}`
    : 'Stassen botanical specimen';

  return (
    <div className={`relative bg-[#161616] ${containerClassName}`}>
      {/* Soft Shimmer Skeleton during Loading */}
      {isLoading && (
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-[#161616] via-[#222222] to-[#161616] animate-pulse flex items-center justify-center z-10"
        >
          <Icon className="w-8 h-8 text-[#C5A059]/30 animate-pulse" />
        </div>
      )}

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
        className={`${className} transition-opacity duration-500 relative z-[1] ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
      />

      {/* Subtle Dark Ambient Vignette Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#121212]/80 via-transparent to-transparent pointer-events-none z-[2]" />
    </div>
  );
};

