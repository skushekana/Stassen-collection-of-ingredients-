/**
 * Reliable Multi-Tier Image Fallback Utility
 * Guarantees that every ingredient and recipe always has an image and never renders a blank space.
 */

// Global session registry for tracking failed image URLs to avoid repeated failing requests
const failedUrls = new Set<string>();

/**
 * Marks an image URL as failed for the current session.
 */
export function markImageUrlFailed(url?: string | null): void {
  if (url && typeof url === 'string') {
    const trimmed = url.trim();
    if (trimmed.length > 0 && !trimmed.startsWith('data:')) {
      failedUrls.add(trimmed);
      // Also add without search parameters if it has any
      try {
        const urlObj = new URL(trimmed, 'https://placeholder.local');
        failedUrls.add(urlObj.origin + urlObj.pathname);
      } catch {
        // Ignore invalid URL parse
      }
    }
  }
}

/**
 * Checks if an image URL has already failed in this session.
 */
export function hasImageUrlFailed(url?: string | null): boolean {
  if (!url || typeof url !== 'string') return true;
  const trimmed = url.trim();
  if (trimmed.length === 0) return true;
  if (trimmed.startsWith('data:')) return false; // Data URIs are self-contained

  if (failedUrls.has(trimmed)) return true;

  try {
    const urlObj = new URL(trimmed, 'https://placeholder.local');
    if (failedUrls.has(urlObj.origin + urlObj.pathname)) return true;
  } catch {
    // Ignore invalid URL parse
  }

  return false;
}

/**
 * Clears the failed URLs registry (useful for testing or cache refresh).
 */
export function clearFailedUrls(): void {
  failedUrls.clear();
}

// Tier 2: Curated Category CDN Photography
export const CATEGORY_CDN_FALLBACKS: Record<string, string> = {
  'Wild Fungi & Truffles': 'https://images.unsplash.com/photo-1541544741938-0af808871cc0?q=80&w=1200&auto=format&fit=crop',
  'Rare Spices': 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?q=80&w=1200&auto=format&fit=crop',
  'Foraged Botanicals': 'https://images.unsplash.com/photo-1611143669185-af224c5e3252?q=80&w=1200&auto=format&fit=crop',
  'Ferments & Vinegars': 'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?q=80&w=1200&auto=format&fit=crop',
  'Artisanal Ferments & Vinegars': 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=1200&auto=format&fit=crop',
  'Heritage Salts & Minerals': 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?q=80&w=1200&auto=format&fit=crop',
  'Specialty Oils & Fats': 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200&auto=format&fit=crop',
  'Ancient Grains & Seeds': 'https://images.unsplash.com/photo-1586201375761-83865001e31c?q=80&w=1200&auto=format&fit=crop',
  'Ancient Grains & Flours': 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=1200&auto=format&fit=crop',
  'Cultivated Teas & Tisanes': 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?q=80&w=1200&auto=format&fit=crop',
  'Rare Teas & Infusions': 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?q=80&w=1200&auto=format&fit=crop',
  'Artisanal Nectars & Sugars': 'https://images.unsplash.com/photo-1558818498-28c1e002b655?q=80&w=1200&auto=format&fit=crop',
  'Mountain Citrus': 'https://images.unsplash.com/photo-1582979512210-99b6a53386f9?q=80&w=1200&auto=format&fit=crop',
  'Heirloom Cultivars': 'https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=1200&auto=format&fit=crop',
};

// Tier 2: Curated Cuisine CDN Photography
export const CUISINE_CDN_FALLBACKS: Record<string, string> = {
  italian: 'https://images.unsplash.com/photo-1621996346565-e3d5d6281691?q=80&w=1200&auto=format&fit=crop',
  japanese: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1200&auto=format&fit=crop',
  french: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1200&auto=format&fit=crop',
  nordic: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=1200&auto=format&fit=crop',
  spanish: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?q=80&w=1200&auto=format&fit=crop',
  middleeastern: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200&auto=format&fit=crop',
  levant: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200&auto=format&fit=crop',
  thai: 'https://images.unsplash.com/photo-155939594-58d7cb561ad1?q=80&w=1200&auto=format&fit=crop',
  indian: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=1200&auto=format&fit=crop',
  chinese: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?q=80&w=1200&auto=format&fit=crop',
  mexican: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?q=80&w=1200&auto=format&fit=crop',
  american: 'https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1200&auto=format&fit=crop',
  vietnamese: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?q=80&w=1200&auto=format&fit=crop',
  greek: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=1200&auto=format&fit=crop',
  peruvian: 'https://images.unsplash.com/photo-1535400255456-984241443b29?q=80&w=1200&auto=format&fit=crop',
  korean: 'https://images.unsplash.com/photo-1583032015879-79a0d84a7791?q=80&w=1200&auto=format&fit=crop',
};

// Tier 3: Global High-Definition Verified Gastronomic Photography
export const GLOBAL_CULINARY_FALLBACK = 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1200&auto=format&fit=crop';
export const GLOBAL_INGREDIENT_FALLBACK = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1200&auto=format&fit=crop';

/**
 * Validates if an image URL string is plausible and not a broken placeholder or null string.
 */
export function isValidImageUrl(url?: string | null): boolean {
  if (!url || typeof url !== 'string') return false;
  const trimmed = url.trim();
  if (
    trimmed === '' ||
    trimmed === 'undefined' ||
    trimmed === 'null' ||
    trimmed === 'NaN' ||
    trimmed === 'about:blank' ||
    trimmed === '/assets/' ||
    trimmed === '/assets' ||
    trimmed.startsWith('blob:null') ||
    trimmed.startsWith('file://')
  ) {
    return false;
  }
  return true;
}

/**
 * Optimizes an Unsplash or CDN URL for target dimensions and compression.
 */
export function getOptimizedImageUrl(url?: string | null, targetWidth: number = 800, quality: number = 80): string {
  if (!url || !isValidImageUrl(url)) return '';
  if (url.includes('images.unsplash.com')) {
    try {
      const parsed = new URL(url);
      parsed.searchParams.set('w', String(targetWidth));
      parsed.searchParams.set('q', String(quality));
      parsed.searchParams.set('auto', 'format');
      parsed.searchParams.set('fit', 'crop');
      return parsed.toString();
    } catch {
      return url;
    }
  }
  return url;
}

/**
 * Generates responsive srcset for CDN images to prevent downloading oversized files on mobile/grid.
 */
export function getResponsiveSrcSet(url?: string | null, widths: number[] = [400, 800, 1200]): string | undefined {
  if (!url || !isValidImageUrl(url)) return undefined;
  if (url.includes('images.unsplash.com')) {
    try {
      return widths
        .map(w => `${getOptimizedImageUrl(url, w)} ${w}w`)
        .join(', ');
    } catch {
      return undefined;
    }
  }
  return undefined;
}

/**
 * Generate a luxury styled SVG data URI fallback for when network images fail or are blocked.
 * Zero network dependencies; guaranteed to render 100% of the time.
 */
export function generateSvgDataUriFallback(
  label: string,
  sublabel: string = "Stassen's Collection",
  type: 'ingredient' | 'recipe' | 'generic' = 'generic'
): string {
  const cleanLabel = (label || 'Gastronomic Specialty').replace(/[<>&"]/g, '').slice(0, 38);
  const cleanSub = (sublabel || 'Culinary Archive').replace(/[<>&"]/g, '').slice(0, 42);

  // Elegant luxury emblem based on type
  const iconGraphic = type === 'recipe'
    ? `<path d="M380 230 C380 215 420 215 420 230 L420 260 L380 260 Z M370 265 L430 265 M360 275 L440 275" stroke="#C5A059" stroke-width="2" fill="none" stroke-linecap="round"/>
       <circle cx="400" cy="210" r="4" fill="#E5C378"/>`
    : `<path d="M400 210 C420 235 435 255 425 275 C415 295 385 295 375 275 C365 255 380 235 400 210 Z" fill="none" stroke="#C5A059" stroke-width="2"/>
       <line x1="400" y1="230" x2="400" y2="280" stroke="#C5A059" stroke-width="1.5" opacity="0.6"/>
       <path d="M385 250 Q400 260 415 250" stroke="#C5A059" stroke-width="1" fill="none" opacity="0.5"/>`;

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
    <defs>
      <radialGradient id="bg-rad" cx="50%" cy="45%" r="65%">
        <stop offset="0%" stop-color="#22201C"/>
        <stop offset="60%" stop-color="#141311"/>
        <stop offset="100%" stop-color="#0A0A09"/>
      </radialGradient>
      <linearGradient id="gold-stroke" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#E5C378"/>
        <stop offset="50%" stop-color="#C5A059"/>
        <stop offset="100%" stop-color="#9C7B38"/>
      </linearGradient>
      <pattern id="terroir-mesh" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M 40 0 L 0 40 M 0 0 L 40 40" fill="none" stroke="#C5A059" stroke-width="0.3" opacity="0.08"/>
      </pattern>
    </defs>
    <rect width="800" height="600" fill="url(#bg-rad)"/>
    <rect width="800" height="600" fill="url(#terroir-mesh)"/>
    <rect x="24" y="24" width="752" height="552" fill="none" stroke="#C5A059" stroke-width="1" opacity="0.25"/>
    <rect x="32" y="32" width="736" height="536" fill="none" stroke="#C5A059" stroke-width="0.5" stroke-dasharray="6 4" opacity="0.15"/>
    <circle cx="400" cy="250" r="68" fill="#181714" stroke="url(#gold-stroke)" stroke-width="1.5"/>
    <circle cx="400" cy="250" r="76" fill="none" stroke="#C5A059" stroke-width="0.5" stroke-dasharray="3 3" opacity="0.4"/>
    ${iconGraphic}
    <text x="400" y="375" font-family="Georgia, 'Times New Roman', serif" font-size="23" font-style="italic" fill="#F5F5F0" text-anchor="middle" letter-spacing="0.5">${cleanLabel}</text>
    <text x="400" y="410" font-family="'Courier New', monospace" font-size="11" font-weight="600" text-transform="uppercase" fill="#C5A059" text-anchor="middle" letter-spacing="3.5">${cleanSub}</text>
    <text x="400" y="535" font-family="'Courier New', monospace" font-size="9" text-transform="uppercase" fill="#888880" text-anchor="middle" letter-spacing="2">STASSEN ARCHIVE • BOTANICAL &amp; CULINARY REFERENCE</text>
  </svg>`;

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

/**
 * Returns a prioritized list of fallback image URLs for an ingredient.
 */
export function getIngredientFallbackChain(ingredient?: {
  name?: string;
  category?: string;
  imageUrl?: string;
}): string[] {
  const chain: string[] = [];

  // Tier 1: Real ingredient image if valid and hasn't failed
  if (ingredient && isValidImageUrl(ingredient.imageUrl) && !hasImageUrlFailed(ingredient.imageUrl)) {
    chain.push(ingredient.imageUrl!);
  }

  // Tier 2: Category specific curated image
  if (ingredient?.category && CATEGORY_CDN_FALLBACKS[ingredient.category]) {
    const catUrl = CATEGORY_CDN_FALLBACKS[ingredient.category];
    if (!hasImageUrlFailed(catUrl)) {
      chain.push(catUrl);
    }
  }

  // Tier 3: Global high-res food fallback
  if (!hasImageUrlFailed(GLOBAL_INGREDIENT_FALLBACK)) {
    chain.push(GLOBAL_INGREDIENT_FALLBACK);
  }

  // Tier 4: Zero-network SVG graphic fallback
  chain.push(
    generateSvgDataUriFallback(
      ingredient?.name || 'Botanical Specimen',
      ingredient?.category || 'Terroir Selection',
      'ingredient'
    )
  );

  return chain;
}

/**
 * Returns a prioritized list of fallback image URLs for a recipe.
 */
export function getRecipeFallbackChain(recipe?: {
  dishTitle?: string;
  cuisine?: string;
  primaryIngredientName?: string;
  heroImageUrl?: string;
  courseCategory?: string;
}): string[] {
  const chain: string[] = [];

  // Tier 1: Hero image if valid and hasn't failed
  if (recipe && isValidImageUrl(recipe.heroImageUrl) && !hasImageUrlFailed(recipe.heroImageUrl)) {
    chain.push(recipe.heroImageUrl!);
  }

  // Tier 2: Cuisine-specific curated image
  const normCuisine = (recipe?.cuisine || '').toLowerCase().replace(/[^a-z]/g, '');
  for (const [key, url] of Object.entries(CUISINE_CDN_FALLBACKS)) {
    if (normCuisine.includes(key) && !hasImageUrlFailed(url)) {
      chain.push(url);
      break;
    }
  }

  // Tier 3: Global culinary fallback
  if (!hasImageUrlFailed(GLOBAL_CULINARY_FALLBACK)) {
    chain.push(GLOBAL_CULINARY_FALLBACK);
  }

  // Tier 4: Zero-network SVG graphic fallback
  chain.push(
    generateSvgDataUriFallback(
      recipe?.dishTitle || 'Haute Cuisine Masterclass',
      `${recipe?.cuisine || 'Gourmet'} Atelier`,
      'recipe'
    )
  );

  return chain;
}

/**
 * Returns generic culinary fallback chain for general food imagery.
 */
export function getGenericFoodFallbackChain(altText: string = 'Culinary Specialty', sublabel?: string): string[] {
  const chain: string[] = [];

  if (!hasImageUrlFailed(GLOBAL_CULINARY_FALLBACK)) {
    chain.push(GLOBAL_CULINARY_FALLBACK);
  }
  if (!hasImageUrlFailed(GLOBAL_INGREDIENT_FALLBACK)) {
    chain.push(GLOBAL_INGREDIENT_FALLBACK);
  }
  chain.push(generateSvgDataUriFallback(altText, sublabel || "Stassen's Collection", 'generic'));

  return chain;
}


