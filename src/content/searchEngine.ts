import { Ingredient, CulinaryMasterclass } from '../types';
import { contentRegistry } from './contentRegistry';
import { isIngredientInSeason } from '../utils/seasonality';

/**
 * Stopwords to ignore in inverted index to keep token maps fast and lean
 */
const SEARCH_STOPWORDS = new Set([
  'a', 'an', 'and', 'are', 'as', 'at', 'be', 'by', 'for', 'from',
  'has', 'he', 'in', 'is', 'it', 'its', 'of', 'on', 'that', 'the',
  'to', 'was', 'were', 'will', 'with', 'the', 'this', 'but', 'they',
  'have', 'had', 'what', 'when', 'where', 'who', 'which', 'why', 'how',
  'our', 'your', 'their', 'very', 'just', 'more', 'some', 'also'
]);

/**
 * Common culinary spelling variants & phonetic alternatives
 * Allows visitors to find items regardless of British/American/Italian spelling or minor typos
 */
const SPELLING_VARIANTS: Record<string, string> = {
  safran: 'saffron',
  saffran: 'saffron',
  zafferano: 'saffron',
  chilli: 'chili',
  chile: 'chili',
  chilles: 'chili',
  chillies: 'chili',
  yoghurt: 'yogurt',
  flavour: 'flavor',
  flavours: 'flavor',
  flavors: 'flavor',
  barbeque: 'barbecue',
  bbq: 'barbecue',
  balsamico: 'balsamic',
  aceto: 'balsamic',
  parmesan: 'parmigiano',
  parmigiana: 'parmigiano',
  whisky: 'whiskey',
  mozzarela: 'mozzarella',
  matsutaki: 'matsutake',
  vanila: 'vanilla',
  cacao: 'cocoa',
  risoto: 'risotto',
  spagetti: 'spaghetti',
  tagliatele: 'tagliatelle',
  porcini: 'porcino',
  shiitake: 'shitake',
  wazabi: 'wasabi',
  sousvide: 'sous-vide',
  cacioepepe: 'cacio e pepe'
};

/**
 * Calculate fast Levenshtein distance for fuzzy spelling variation matching
 */
function fastLevenshtein(a: string, b: string): number {
  if (a === b) return 0;
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;
  if (Math.abs(a.length - b.length) > 2) return 99;

  const v0 = new Int32Array(b.length + 1);
  const v1 = new Int32Array(b.length + 1);

  for (let i = 0; i <= b.length; i++) {
    v0[i] = i;
  }

  for (let i = 0; i < a.length; i++) {
    v1[0] = i + 1;
    for (let j = 0; j < b.length; j++) {
      const cost = a[i] === b[j] ? 0 : 1;
      v1[j + 1] = Math.min(v1[j] + 1, v0[j + 1] + 1, v0[j] + cost);
    }
    for (let j = 0; j <= b.length; j++) {
      v0[j] = v1[j];
    }
  }

  return v0[b.length];
}

/**
 * Clean and normalize text: strip diacritics, lowercase, remove punctuation
 */
export function normalizeSearchString(text: string): string {
  if (!text) return '';
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // strip accents (e.g. crème -> creme, jamón -> jamon)
    .replace(/['"’`]/g, '') // remove quotes/apostrophes (e.g. d'Alba -> dalba)
    .replace(/[^a-z0-9\s-]/g, ' ')
    .trim();
}

/**
 * Normalize and tokenize string for search index
 */
export function tokenizeForSearch(text: string): string[] {
  if (!text) return [];
  const normalized = normalizeSearchString(text);
  const rawTokens = normalized
    .replace(/[-_/]/g, ' ')
    .split(/\s+/)
    .filter(t => t.length >= 2 && !SEARCH_STOPWORDS.has(t));

  const result: string[] = [];
  for (const t of rawTokens) {
    result.push(t);
    const variant = SPELLING_VARIANTS[t];
    if (variant && variant !== t) {
      result.push(variant);
    }
  }

  // Also include compound versions for hyphenated phrases (e.g. "cacio e pepe" -> "cacioepepe")
  if (normalized.includes('-')) {
    const fused = normalized.replace(/[^a-z0-9]/g, '');
    if (fused.length >= 3 && fused.length <= 25 && !result.includes(fused)) {
      result.push(fused);
    }
  }

  return Array.from(new Set(result));
}

export type SearchResultType = 'ingredient' | 'recipe';

export interface UnifiedSearchResult {
  id: string;
  type: SearchResultType;
  slug: string;
  title: string;
  subtitle?: string;
  categoryOrCuisine: string;
  courseOrSeason?: string;
  secondaryInfo?: string;
  badges: string[];
  imageUrl?: string | null;
  score: number;
  url: string;
  matchReasons?: string[];
  rawIngredient?: Ingredient;
  rawRecipe?: CulinaryMasterclass;
}

export interface UnifiedSearchFilters {
  type?: 'all' | 'ingredient' | 'recipe';
  category?: string;
  cuisine?: string;
  course?: string;
  season?: string;
  region?: string;
  country?: string;
  rarity?: string;
  difficulty?: string;
  savedOnly?: boolean;
  bookmarkedIds?: Set<string>;
}

export interface IngredientSearchFilters {
  category?: string;
  region?: string;
  season?: string;
  rarity?: string;
  country?: string;
}

export interface RecipeSearchFilters {
  cuisine?: string;
  difficulty?: string;
  course?: string;
  savedOnly?: boolean;
  bookmarkedIds?: Set<string>;
}

export class SearchEngine {
  // Inverted Indices: Token -> Map<ItemId, Weight>
  private ingredientIndex: Map<string, Map<string, number>> = new Map();
  private recipeIndex: Map<string, Map<string, number>> = new Map();

  // All indexed unique tokens for fast lookup
  private ingredientTokens: string[] = [];
  private recipeTokens: string[] = [];

  // Query LRU Cache
  private queryCache: Map<string, any> = new Map();
  private isIndexed = false;

  constructor() {
    this.rebuildIndex();
  }

  /**
   * Rebuild or update the search index from the content registry
   */
  public rebuildIndex(): void {
    this.ingredientIndex.clear();
    this.recipeIndex.clear();
    this.queryCache.clear();

    const allIngredients = contentRegistry.getAllIngredients();
    const allRecipes = contentRegistry.getAllRecipes();

    // 1. Index Ingredients
    for (const ing of allIngredients) {
      this.indexIngredientRecord(ing);
    }
    this.ingredientTokens = Array.from(this.ingredientIndex.keys());

    // 2. Index Recipes
    for (const rec of allRecipes) {
      this.indexRecipeRecord(rec);
    }
    this.recipeTokens = Array.from(this.recipeIndex.keys());

    this.isIndexed = true;
  }

  /**
   * Index single ingredient with weighted fields
   */
  private indexIngredientRecord(ing: Ingredient): void {
    const addTokens = (text: string | undefined, weight: number) => {
      if (!text) return;
      const tokens = tokenizeForSearch(text);
      for (const token of tokens) {
        let postMap = this.ingredientIndex.get(token);
        if (!postMap) {
          postMap = new Map();
          this.ingredientIndex.set(token, postMap);
        }
        postMap.set(ing.id, (postMap.get(ing.id) || 0) + weight);
      }
    };

    // Primary exact fields (highest weight)
    addTokens(ing.name, 120);
    addTokens(ing.scientificName, 90);
    if (ing.aliases && Array.isArray(ing.aliases)) {
      addTokens(ing.aliases.join(' '), 90);
    }

    // Facet & sensory tags
    addTokens(ing.category, 55);
    if (ing.flavorNotes && Array.isArray(ing.flavorNotes)) {
      addTokens(ing.flavorNotes.join(' '), 45);
    }
    addTokens(ing.rarityIndex, 30);

    // Geographical & terroir attributes
    addTokens(ing.origin, 45);
    addTokens(ing.region, 40);
    addTokens(ing.country, 40);
    addTokens(ing.terroir, 25);

    // Seasonality
    addTokens(ing.season, 35);
    addTokens(ing.harvestWindow, 30);

    // Descriptive prose
    addTokens(ing.description, 15);
    addTokens(ing.overview, 15);
    if (ing.seoKeywords && Array.isArray(ing.seoKeywords)) {
      addTokens(ing.seoKeywords.join(' '), 35);
    }
  }

  /**
   * Index single recipe with weighted fields
   */
  private indexRecipeRecord(rec: CulinaryMasterclass): void {
    const addTokens = (text: string | undefined, weight: number) => {
      if (!text) return;
      const tokens = tokenizeForSearch(text);
      for (const token of tokens) {
        let postMap = this.recipeIndex.get(token);
        if (!postMap) {
          postMap = new Map();
          this.recipeIndex.set(token, postMap);
        }
        postMap.set(rec.id, (postMap.get(rec.id) || 0) + weight);
      }
    };

    // Title and primary ingredient
    addTokens(rec.dishTitle, 120);
    addTokens(rec.primaryIngredientName, 90);
    addTokens(rec.subtitle, 60);

    // Culinary taxonomy & tags
    addTokens(rec.cuisine, 55);
    addTokens(rec.courseCategory, 50);
    addTokens(rec.category, 45);
    addTokens(rec.difficulty, 30);
    if (rec.tags && Array.isArray(rec.tags)) {
      addTokens(rec.tags.join(' '), 50);
    }

    // Ingredients in list
    if (rec.ingredientsList && Array.isArray(rec.ingredientsList)) {
      const ingNames = rec.ingredientsList.map(i => i.name).join(' ');
      addTokens(ingNames, 40);
    }

    // Descriptive prose
    addTokens(rec.overview, 15);
    addTokens(rec.chefRationale, 15);
    addTokens(rec.countryRegion, 35);
  }

  /**
   * Find matching tokens in the index using exact match, prefix match, and fuzzy Levenshtein match
   */
  private findMatchingTokens(queryToken: string, isIngredient: boolean): Array<{ token: string; multiplier: number }> {
    const tokensList = isIngredient ? this.ingredientTokens : this.recipeTokens;
    const matches: Array<{ token: string; multiplier: number }> = [];
    const seen = new Set<string>();

    // 1. Direct exact match
    if (tokensList.includes(queryToken)) {
      matches.push({ token: queryToken, multiplier: 1.0 });
      seen.add(queryToken);
    }

    // 2. Direct variant mapping match
    const mappedVariant = SPELLING_VARIANTS[queryToken];
    if (mappedVariant && tokensList.includes(mappedVariant) && !seen.has(mappedVariant)) {
      matches.push({ token: mappedVariant, multiplier: 0.95 });
      seen.add(mappedVariant);
    }

    // 3. Prefix matching (e.g. "truf" matches "truffle")
    if (queryToken.length >= 3) {
      for (const t of tokensList) {
        if (!seen.has(t)) {
          if (t.startsWith(queryToken)) {
            matches.push({ token: t, multiplier: 0.75 });
            seen.add(t);
          } else if (queryToken.startsWith(t) && t.length >= 4) {
            matches.push({ token: t, multiplier: 0.7 });
            seen.add(t);
          }
        }
      }
    }

    // 4. Fuzzy Levenshtein matching for spelling variations & typos
    // Only applied when queryToken is at least 4 characters
    if (queryToken.length >= 4) {
      const maxDist = queryToken.length >= 7 ? 2 : 1;
      for (const t of tokensList) {
        if (!seen.has(t) && Math.abs(t.length - queryToken.length) <= maxDist) {
          const dist = fastLevenshtein(queryToken, t);
          if (dist <= maxDist) {
            const mult = dist === 1 ? 0.55 : 0.35;
            matches.push({ token: t, multiplier: mult });
            seen.add(t);
          }
        }
      }
    }

    return matches;
  }

  /**
   * Unified search across BOTH ingredients and recipes.
   * Ranks the most relevant items first, supports exact/partial names, aliases, categories, cuisines, types, tags,
   * and handles spelling variations cleanly.
   */
  public searchUnified(
    rawQuery: string,
    filters: UnifiedSearchFilters = {},
    sortBy: 'relevance' | 'name' | 'time' | 'umami' | 'aroma' = 'relevance'
  ): UnifiedSearchResult[] {
    // Safe query sanitization: truncate to prevent abuse, clean invalid characters
    const query = (rawQuery || '').slice(0, 150);
    const cleanQuery = normalizeSearchString(query);
    const queryTokens = tokenizeForSearch(cleanQuery);

    const cacheKey = `unified_${cleanQuery}_${JSON.stringify(filters)}_${sortBy}`;
    if (this.queryCache.has(cacheKey)) {
      return this.queryCache.get(cacheKey);
    }

    const typeFilter = filters.type || 'all';
    const searchIngredients = typeFilter === 'all' || typeFilter === 'ingredient';
    const searchRecipes = typeFilter === 'all' || typeFilter === 'recipe';

    const ingredientScores = new Map<string, number>();
    const recipeScores = new Map<string, number>();
    const ingredientReasons = new Map<string, string[]>();
    const recipeReasons = new Map<string, string[]>();

    // -------------------------------------------------------------
    // 1. INGREDIENTS SEARCH & SCORING
    // -------------------------------------------------------------
    if (searchIngredients) {
      const allIngs = contentRegistry.getAllIngredients();

      if (cleanQuery) {
        for (const token of queryTokens) {
          const matched = this.findMatchingTokens(token, true);
          for (const { token: idxToken, multiplier } of matched) {
            const postings = this.ingredientIndex.get(idxToken);
            if (postings) {
              for (const [id, weight] of postings.entries()) {
                const current = ingredientScores.get(id) || 0;
                ingredientScores.set(id, current + weight * multiplier);
              }
            }
          }
        }

        // Apply Exact Match & Semantic Phrase Boosts
        for (const ing of allIngs) {
          const id = ing.id;
          let currentScore = ingredientScores.get(id) || 0;
          const reasons: string[] = [];

          const ingNameNorm = normalizeSearchString(ing.name);
          const sciNameNorm = normalizeSearchString(ing.scientificName || '');
          const catNorm = normalizeSearchString(ing.category);
          const countryNorm = normalizeSearchString(ing.country);
          const regionNorm = normalizeSearchString(ing.region);
          const originNorm = normalizeSearchString(ing.origin);

          // Exact Name Match (+1500)
          if (ingNameNorm === cleanQuery) {
            currentScore += 1500;
            reasons.push('Exact Name Match');
          } else if (ingNameNorm.startsWith(cleanQuery)) {
            currentScore += 500;
            reasons.push('Name Prefix');
          } else if (ingNameNorm.includes(cleanQuery)) {
            currentScore += 350;
            reasons.push('Name Substring');
          }

          // Exact Scientific Name (+900)
          if (sciNameNorm && sciNameNorm === cleanQuery) {
            currentScore += 900;
            reasons.push('Scientific Name');
          }

          // Exact Alias Match (+1000)
          if (ing.aliases && Array.isArray(ing.aliases)) {
            for (const alias of ing.aliases) {
              const aNorm = normalizeSearchString(alias);
              if (aNorm === cleanQuery) {
                currentScore += 1000;
                reasons.push(`Alias: ${alias}`);
                break;
              } else if (cleanQuery.length >= 3 && aNorm.includes(cleanQuery)) {
                currentScore += 300;
                reasons.push(`Alias: ${alias}`);
                break;
              }
            }
          }

          // Exact Category Match (+450)
          if (catNorm === cleanQuery) {
            currentScore += 450;
            reasons.push('Category Match');
          }

          // Terroir / Origin Match (+350)
          if (countryNorm === cleanQuery || regionNorm === cleanQuery || originNorm.includes(cleanQuery)) {
            currentScore += 350;
            reasons.push('Terroir Origin Match');
          }

          // Flavor Notes Match (+250)
          if (ing.flavorNotes && Array.isArray(ing.flavorNotes)) {
            for (const note of ing.flavorNotes) {
              if (normalizeSearchString(note).includes(cleanQuery)) {
                currentScore += 250;
                reasons.push(`Flavor Note: ${note}`);
                break;
              }
            }
          }

          // Multi-token Coverage Multiplier
          if (queryTokens.length > 1 && currentScore > 0) {
            let matchedTokensCount = 0;
            const fullTextNorm = `${ingNameNorm} ${sciNameNorm} ${catNorm} ${originNorm} ${countryNorm} ${(ing.aliases || []).join(' ')} ${(ing.flavorNotes || []).join(' ')}`;
            for (const qt of queryTokens) {
              if (fullTextNorm.includes(qt)) {
                matchedTokensCount++;
              }
            }
            if (matchedTokensCount === queryTokens.length) {
              currentScore *= 2.2; // All query words present!
              reasons.push('All Search Terms Matched');
            } else if (matchedTokensCount > 1) {
              currentScore *= (1 + 0.4 * (matchedTokensCount / queryTokens.length));
            }
          }

          if (currentScore > 0) {
            ingredientScores.set(id, currentScore);
            ingredientReasons.set(id, reasons);
          }
        }
      } else {
        // Empty query: all ingredients eligible with baseline score
        for (const ing of allIngs) {
          ingredientScores.set(ing.id, (ing.flavorProfile?.umami || 50));
        }
      }
    }

    // -------------------------------------------------------------
    // 2. RECIPES SEARCH & SCORING
    // -------------------------------------------------------------
    if (searchRecipes) {
      const allRecs = contentRegistry.getAllRecipes();

      if (cleanQuery) {
        for (const token of queryTokens) {
          const matched = this.findMatchingTokens(token, false);
          for (const { token: idxToken, multiplier } of matched) {
            const postings = this.recipeIndex.get(idxToken);
            if (postings) {
              for (const [id, weight] of postings.entries()) {
                const current = recipeScores.get(id) || 0;
                recipeScores.set(id, current + weight * multiplier);
              }
            }
          }
        }

        // Apply Exact Match & Semantic Phrase Boosts
        for (const rec of allRecs) {
          const id = rec.id;
          let currentScore = recipeScores.get(id) || 0;
          const reasons: string[] = [];

          const titleNorm = normalizeSearchString(rec.dishTitle);
          const primIngNorm = normalizeSearchString(rec.primaryIngredientName);
          const cuisineNorm = normalizeSearchString(rec.cuisine || '');
          const courseNorm = normalizeSearchString(rec.courseCategory || rec.category || '');
          const subNorm = normalizeSearchString(rec.subtitle || '');

          // Exact Dish Title (+1500)
          if (titleNorm === cleanQuery) {
            currentScore += 1500;
            reasons.push('Exact Dish Title');
          } else if (titleNorm.startsWith(cleanQuery)) {
            currentScore += 500;
            reasons.push('Dish Title Prefix');
          } else if (titleNorm.includes(cleanQuery)) {
            currentScore += 350;
            reasons.push('Dish Title Substring');
          }

          // Exact Primary Ingredient (+800)
          if (primIngNorm === cleanQuery) {
            currentScore += 800;
            reasons.push(`Primary Ingredient: ${rec.primaryIngredientName}`);
          } else if (primIngNorm.includes(cleanQuery)) {
            currentScore += 350;
            reasons.push(`Primary Ingredient: ${rec.primaryIngredientName}`);
          }

          // Exact Cuisine Match (+450)
          if (cuisineNorm === cleanQuery) {
            currentScore += 450;
            reasons.push(`Cuisine: ${rec.cuisine}`);
          }

          // Exact Recipe Type / Course Category (+450)
          if (courseNorm === cleanQuery) {
            currentScore += 450;
            reasons.push(`Course Type: ${rec.courseCategory || rec.category}`);
          }

          // Tag Match (+300)
          if (rec.tags && Array.isArray(rec.tags)) {
            for (const tag of rec.tags) {
              if (normalizeSearchString(tag).includes(cleanQuery)) {
                currentScore += 300;
                reasons.push(`Tag: ${tag}`);
                break;
              }
            }
          }

          // Subtitle / Overview Match (+150)
          if (subNorm.includes(cleanQuery)) {
            currentScore += 150;
            reasons.push('Recipe Overview');
          }

          // Sub-ingredients list match (+200)
          if (rec.ingredientsList && Array.isArray(rec.ingredientsList)) {
            for (const item of rec.ingredientsList) {
              if (normalizeSearchString(item.name).includes(cleanQuery)) {
                currentScore += 200;
                reasons.push(`Ingredient: ${item.name}`);
                break;
              }
            }
          }

          // Multi-token Coverage Multiplier
          if (queryTokens.length > 1 && currentScore > 0) {
            let matchedTokensCount = 0;
            const fullTextNorm = `${titleNorm} ${primIngNorm} ${cuisineNorm} ${courseNorm} ${subNorm} ${(rec.tags || []).join(' ')}`;
            for (const qt of queryTokens) {
              if (fullTextNorm.includes(qt)) {
                matchedTokensCount++;
              }
            }
            if (matchedTokensCount === queryTokens.length) {
              currentScore *= 2.2; // All query words present!
              reasons.push('All Search Terms Matched');
            } else if (matchedTokensCount > 1) {
              currentScore *= (1 + 0.4 * (matchedTokensCount / queryTokens.length));
            }
          }

          // Hotness subtle tiebreaker
          if (rec.isHottest || rec.hotnessRank) {
            currentScore += Math.max(0, 15 - (rec.hotnessRank || 15));
          }

          if (currentScore > 0) {
            recipeScores.set(id, currentScore);
            recipeReasons.set(id, reasons);
          }
        }
      } else {
        // Empty query: all recipes eligible with baseline hotness score
        for (const rec of allRecs) {
          recipeScores.set(rec.id, 100 - (rec.hotnessRank || 50));
        }
      }
    }

    // -------------------------------------------------------------
    // 3. COMBINE & APPLY FILTERS
    // -------------------------------------------------------------
    const results: UnifiedSearchResult[] = [];

    // Filter & convert Ingredients
    for (const [id, score] of ingredientScores.entries()) {
      const ing = contentRegistry.getIngredient(id);
      if (!ing) continue;

      if (filters.category && filters.category !== 'All Categories' && ing.category !== filters.category) {
        continue;
      }
      if (filters.region && filters.region !== 'All Terroirs' && filters.region !== 'All Regions' && ing.region !== filters.region) {
        continue;
      }
      if (filters.season) {
        if (filters.season === 'In Season Now') {
          if (!isIngredientInSeason(ing)) continue;
        } else if (filters.season !== 'All Seasons' && ing.season !== filters.season) {
          continue;
        }
      }
      if (filters.rarity && filters.rarity !== 'All Rarities' && ing.rarityIndex !== filters.rarity) {
        continue;
      }
      if (filters.country && filters.country !== 'All Origins' && ing.country !== filters.country) {
        continue;
      }
      if (filters.savedOnly && filters.bookmarkedIds && !filters.bookmarkedIds.has(ing.id)) {
        continue;
      }

      const slug = ing.slug || ing.id;
      results.push({
        id: ing.id,
        type: 'ingredient',
        slug,
        title: ing.name,
        subtitle: ing.scientificName || `${ing.origin}, ${ing.country}`,
        categoryOrCuisine: ing.category,
        courseOrSeason: ing.season,
        secondaryInfo: `${ing.origin}, ${ing.country}`,
        badges: [
          'SPECIMEN',
          ing.category,
          ing.season,
          ing.rarityIndex
        ].filter(Boolean),
        imageUrl: ing.imageUrl,
        score,
        url: `/ingredients/${slug}`,
        matchReasons: ingredientReasons.get(id) || [],
        rawIngredient: ing
      });
    }

    // Filter & convert Recipes
    for (const [id, score] of recipeScores.entries()) {
      const rec = contentRegistry.getRecipe(id);
      if (!rec) continue;

      if (filters.cuisine && filters.cuisine !== 'All Cuisines' && rec.cuisine !== filters.cuisine) {
        continue;
      }
      if (filters.difficulty && filters.difficulty !== 'All Difficulties' && rec.difficulty !== filters.difficulty) {
        continue;
      }
      if (filters.course && filters.course !== 'All Courses' && (rec.courseCategory !== filters.course && rec.category !== filters.course)) {
        continue;
      }
      if (filters.savedOnly && filters.bookmarkedIds && !filters.bookmarkedIds.has(rec.id)) {
        continue;
      }

      const slug = rec.slug || rec.id;
      const totalTime = (rec.totalPrepTimeMinutes || 0) + (rec.totalCookTimeMinutes || 0);

      results.push({
        id: rec.id,
        type: 'recipe',
        slug,
        title: rec.dishTitle,
        subtitle: rec.subtitle || `Featuring ${rec.primaryIngredientName}`,
        categoryOrCuisine: rec.cuisine || 'Haute Gastronomy',
        courseOrSeason: rec.courseCategory || 'Masterclass',
        secondaryInfo: `${totalTime} MINS • ${rec.difficulty?.toUpperCase()}`,
        badges: [
          'RECIPE',
          rec.cuisine || 'World Cuisine',
          rec.courseCategory || 'Main Course',
          rec.difficulty || 'Advanced'
        ].filter(Boolean),
        imageUrl: rec.heroImageUrl,
        score,
        url: `/recipes/${slug}`,
        matchReasons: recipeReasons.get(id) || [],
        rawRecipe: rec
      });
    }

    // -------------------------------------------------------------
    // 4. SORT RESULTS
    // -------------------------------------------------------------
    if (sortBy === 'name') {
      results.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === 'time') {
      results.sort((a, b) => {
        const timeA = a.rawRecipe ? (a.rawRecipe.totalPrepTimeMinutes + a.rawRecipe.totalCookTimeMinutes) : 9999;
        const timeB = b.rawRecipe ? (b.rawRecipe.totalPrepTimeMinutes + b.rawRecipe.totalCookTimeMinutes) : 9999;
        return timeA - timeB;
      });
    } else if (sortBy === 'umami') {
      results.sort((a, b) => {
        const umamiA = a.rawIngredient?.flavorProfile?.umami || a.rawRecipe?.flavorAromaProfile?.umami || 0;
        const umamiB = b.rawIngredient?.flavorProfile?.umami || b.rawRecipe?.flavorAromaProfile?.umami || 0;
        return umamiB - umamiA;
      });
    } else if (sortBy === 'aroma') {
      results.sort((a, b) => {
        const aromaA = a.rawIngredient?.flavorProfile?.aroma || a.rawRecipe?.flavorAromaProfile?.aromaticIntensity || 0;
        const aromaB = b.rawIngredient?.flavorProfile?.aroma || b.rawRecipe?.flavorAromaProfile?.aromaticIntensity || 0;
        return aromaB - aromaA;
      });
    } else {
      // Relevance Score
      results.sort((a, b) => b.score - a.score);
    }

    // Save to Cache
    this.queryCache.set(cacheKey, results);

    return results;
  }

  /**
   * Facet counts helper for search page filters
   */
  public getSearchFacets(query: string): {
    total: number;
    ingredientsCount: number;
    recipesCount: number;
  } {
    const all = this.searchUnified(query, { type: 'all' }, 'relevance');
    const ingredientsCount = all.filter(r => r.type === 'ingredient').length;
    const recipesCount = all.filter(r => r.type === 'recipe').length;
    return {
      total: all.length,
      ingredientsCount,
      recipesCount
    };
  }

  /**
   * Search ingredients using inverted index and faceted filters (backward compatible)
   */
  public searchIngredients(
    query: string,
    filters: IngredientSearchFilters = {},
    sortBy: 'relevance' | 'name' | 'umami' | 'aroma' = 'relevance'
  ): Ingredient[] {
    const unified = this.searchUnified(
      query,
      {
        type: 'ingredient',
        category: filters.category,
        region: filters.region,
        season: filters.season,
        rarity: filters.rarity,
        country: filters.country
      },
      sortBy
    );

    return unified
      .map(r => r.rawIngredient)
      .filter((item): item is Ingredient => item !== undefined);
  }

  /**
   * Search recipes using inverted index and faceted filters (backward compatible)
   */
  public searchRecipes(
    query: string,
    filters: RecipeSearchFilters = {},
    sortBy: 'hottest' | 'time' | 'alpha' = 'hottest'
  ): CulinaryMasterclass[] {
    const unifiedSort = sortBy === 'alpha' ? 'name' : sortBy === 'time' ? 'time' : 'relevance';
    const unified = this.searchUnified(
      query,
      {
        type: 'recipe',
        cuisine: filters.cuisine,
        difficulty: filters.difficulty,
        course: filters.course,
        savedOnly: filters.savedOnly,
        bookmarkedIds: filters.bookmarkedIds
      },
      unifiedSort
    );

    return unified
      .map(r => r.rawRecipe)
      .filter((item): item is CulinaryMasterclass => item !== undefined);
  }
}

export const searchEngine = new SearchEngine();
