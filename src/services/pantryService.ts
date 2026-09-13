import { PantryItemEntry, Ingredient, CulinaryMasterclass } from '../types';

const PANTRY_STORAGE_KEY = 'stassens_visitor_pantry_v1';

type PantryListener = (items: Record<string, PantryItemEntry>) => void;
const pantryListeners: Set<PantryListener> = new Set();

function getStoredPantry(): Record<string, PantryItemEntry> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(PANTRY_STORAGE_KEY);
    if (!raw) {
      // Seed default cellar items
      const initial: Record<string, PantryItemEntry> = {
        'matsutake-nagano': {
          ingredientId: 'matsutake-nagano',
          inStock: true,
          stockLevel: 'Moderate',
          storageLocation: 'Cold Room',
          customNotes: 'Autumn harvest batch — keep in cedar wrap at 4°C',
          dateAdded: new Date().toISOString()
        },
        'saffron-kozani': {
          ingredientId: 'saffron-kozani',
          inStock: true,
          stockLevel: 'Full',
          storageLocation: 'Spice Vault',
          customNotes: 'Stigmas kept in dark amber miron glass',
          dateAdded: new Date().toISOString()
        },
        'aceto-modena': {
          ingredientId: 'aceto-modena',
          inStock: true,
          stockLevel: 'Reserve Only',
          storageLocation: 'Dry Cellar',
          customNotes: 'Aged in juniper and oak battery',
          dateAdded: new Date().toISOString()
        }
      };
      localStorage.setItem(PANTRY_STORAGE_KEY, JSON.stringify(initial));
      return initial;
    }
    const parsed = JSON.parse(raw);
    return typeof parsed === 'object' && parsed !== null ? parsed : {};
  } catch (e) {
    console.error('Error loading visitor pantry:', e);
    return {};
  }
}

function persistPantry(pantry: Record<string, PantryItemEntry>): void {
  try {
    localStorage.setItem(PANTRY_STORAGE_KEY, JSON.stringify(pantry));
    pantryListeners.forEach((listener) => listener(pantry));
  } catch (e) {
    console.error('Error persisting pantry:', e);
  }
}

export const pantryService = {
  getPantry(): Record<string, PantryItemEntry> {
    return getStoredPantry();
  },

  subscribe(listener: PantryListener): () => void {
    pantryListeners.add(listener);
    listener(getStoredPantry());
    return () => {
      pantryListeners.delete(listener);
    };
  },

  isFavorited(ingredientId: string): boolean {
    const pantry = getStoredPantry();
    return Boolean(pantry[ingredientId]);
  },

  toggleFavorite(ingredientId: string, defaultInStock: boolean = true): boolean {
    const pantry = { ...getStoredPantry() };
    let nowFavorited = false;
    if (pantry[ingredientId]) {
      delete pantry[ingredientId];
      nowFavorited = false;
    } else {
      pantry[ingredientId] = {
        ingredientId,
        inStock: defaultInStock,
        stockLevel: 'Full',
        storageLocation: 'Dry Cellar',
        dateAdded: new Date().toISOString()
      };
      nowFavorited = true;
    }
    persistPantry(pantry);
    return nowFavorited;
  },

  updatePantryEntry(ingredientId: string, updates: Partial<PantryItemEntry>): void {
    const pantry = { ...getStoredPantry() };
    if (pantry[ingredientId]) {
      pantry[ingredientId] = {
        ...pantry[ingredientId],
        ...updates
      };
      persistPantry(pantry);
    }
  },

  removePantryEntry(ingredientId: string): void {
    const pantry = { ...getStoredPantry() };
    if (pantry[ingredientId]) {
      delete pantry[ingredientId];
      persistPantry(pantry);
    }
  },

  /**
   * Calculates recipe match percentage based on available in-stock pantry ingredients
   */
  calculateRecipeMatch(recipe: CulinaryMasterclass, pantryIds: string[]): {
    matchedCount: number;
    totalRequired: number;
    matchPercentage: number;
    missingIngredients: string[];
  } {
    const primaryMatched = pantryIds.includes(recipe.primaryIngredientId);
    let matched = primaryMatched ? 1 : 0;
    const missing: string[] = [];

    if (!primaryMatched) {
      missing.push(recipe.primaryIngredientName);
    }

    recipe.ingredientsList.forEach((item) => {
      // Check if specialty
      if (item.isArchiveSpecialty) {
        // approximate match
        const found = pantryIds.some(
          (id) => id.toLowerCase().includes(item.name.toLowerCase().split(' ')[0])
        );
        if (found) {
          matched++;
        } else if (!missing.includes(item.name)) {
          missing.push(item.name);
        }
      }
    });

    const totalKeyIngredients = Math.max(recipe.ingredientsList.filter(i => i.isArchiveSpecialty).length + 1, 2);
    const pct = Math.min(Math.round((matched / totalKeyIngredients) * 100), 100);

    return {
      matchedCount: matched,
      totalRequired: totalKeyIngredients,
      matchPercentage: pct,
      missingIngredients: missing
    };
  }
};
