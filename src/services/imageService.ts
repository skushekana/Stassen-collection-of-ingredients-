import { Ingredient } from '../types';
import { isValidImageUrl, GLOBAL_INGREDIENT_FALLBACK } from '../utils/imageFallback';

const STORAGE_KEY = 'stassens_image_cache_v4';

// In-memory cache
const memoryCache: Record<string, string> = {};

// Load cache from localStorage
function getLocalCache(): Record<string, string> {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      // Sanitize any legacy incorrect image URLs
      Object.keys(parsed).forEach(k => {
        if (parsed[k] && parsed[k].includes('1471864190281')) {
          delete parsed[k];
        }
      });
      return parsed;
    }
  } catch (e) {
    console.warn('Error reading image cache:', e);
  }
  return {};
}

// Save to localStorage
function saveToLocalCache(cache: Record<string, string>) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cache));
  } catch (e) {
    console.warn('Error persisting image cache:', e);
  }
}

// Initial populate
const initialCache = getLocalCache();
Object.assign(memoryCache, initialCache);

/**
 * Gets cached image URL for an ingredient or fetches/generates one via the Gemini image generation API
 */
export async function getOrGenerateIngredientImage(ingredient: Ingredient): Promise<string> {
  const cacheKey = ingredient.id || ingredient.name.toLowerCase().replace(/\s+/g, '-');

  // 1. Return from memory or local cache if available
  if (memoryCache[cacheKey]) {
    return memoryCache[cacheKey];
  }

  // 2. If ingredient already has a valid non-local image URL, cache and return it
  if (isValidImageUrl(ingredient.imageUrl) && !ingredient.imageUrl!.startsWith('file://')) {
    memoryCache[cacheKey] = ingredient.imageUrl!;
    const local = getLocalCache();
    local[cacheKey] = ingredient.imageUrl!;
    saveToLocalCache(local);
    return ingredient.imageUrl!;
  }

  // 3. Request Gemini-generated image from server
  try {
    const response = await fetch('/api/generate-ingredient-image', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: ingredient.id,
        name: ingredient.name,
        scientificName: ingredient.scientificName,
        category: ingredient.category,
        origin: ingredient.origin,
        flavorNotes: ingredient.flavorNotes,
        terroir: ingredient.terroir
      })
    });

    if (response.ok) {
      const data = await response.json();
      if (data.imageUrl) {
        memoryCache[cacheKey] = data.imageUrl;
        const local = getLocalCache();
        local[cacheKey] = data.imageUrl;
        saveToLocalCache(local);
        return data.imageUrl;
      }
    }
  } catch (err) {
    console.warn(`Error generating image for ${ingredient.name}:`, err);
  }

  // 4. Default fallback image
  const defaultUrl = GLOBAL_INGREDIENT_FALLBACK;
  memoryCache[cacheKey] = defaultUrl;
  return defaultUrl;
}

/**
 * Synchronous check if image exists in cache
 */
export function getCachedImageUrl(id: string): string | null {
  return memoryCache[id] || null;
}

/**
 * Explicitly cache an image for an ingredient
 */
export function cacheIngredientImage(id: string, url: string) {
  memoryCache[id] = url;
  const local = getLocalCache();
  local[id] = url;
  saveToLocalCache(local);
}
