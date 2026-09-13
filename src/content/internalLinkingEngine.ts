import { Ingredient, CulinaryMasterclass, CategoryDefinition, CategoryType } from '../types';
import { categoryRegistry } from './categoryRegistry';
import { createSlug } from '../utils/slug';

/**
 * Normalized string helper for accurate, accent-insensitive graph matching
 */
function norm(str?: string): string {
  if (!str) return '';
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
}

/**
 * Rich, crawlable anchor metadata for semantic SEO links
 */
export interface LinkMetadata {
  href: string;
  anchorText: string;
  title: string;
  ariaLabel: string;
  secondaryHref?: string;
  secondaryText?: string;
}

/**
 * Scored relationship match
 */
interface ScoredItem<T> {
  item: T;
  score: number;
  reasons: string[];
}

/**
 * High-performance, scalable internal linking and related-content engine.
 * Designed to seamlessly connect 1,000+ ingredients and thousands of recipes
 * with zero broken links, no circular dependencies, and strict data-backed integrity.
 */
export class InternalLinkingEngine {
  // Inverted graph indices
  private ingredientToRecipes: Map<string, Set<string>> = new Map();
  private recipeToIngredients: Map<string, Set<string>> = new Map();
  private ingredientAliases: Map<string, string> = new Map(); // clean name/alias -> ingredientId
  private ingredientsById: Map<string, Ingredient> = new Map();
  private ingredientsBySlug: Map<string, Ingredient> = new Map();
  private recipesById: Map<string, CulinaryMasterclass> = new Map();
  private recipesBySlug: Map<string, CulinaryMasterclass> = new Map();

  // Co-occurrence matrix: ingredientId -> Map<otherIngredientId, coOccurrenceCount>
  private coOccurrenceMap: Map<string, Map<string, number>> = new Map();

  // Cross-category indices
  private ingredientCategoryToRecipeCategories: Map<string, Map<string, number>> = new Map();
  private recipeCategoryToIngredientCategories: Map<string, Map<string, number>> = new Map();

  // Region / Cuisine mappings
  private regionToCuisines: Map<string, Set<string>> = new Map();
  private cuisineToRegions: Map<string, Set<string>> = new Map();

  // Query caches for instantaneous O(1) response times
  private relatedRecipesCache: Map<string, CulinaryMasterclass[]> = new Map();
  private relatedIngredientsCache: Map<string, Ingredient[]> = new Map();
  private connectedIngredientsCache: Map<string, Ingredient[]> = new Map();
  private matchingRecipesCache: Map<string, CulinaryMasterclass[]> = new Map();

  // Change listeners for reactive UI updates
  private listeners: Set<() => void> = new Set();
  private isInitialized = false;

  constructor() {
    this.initRegionCuisineMappings();
  }

  /**
   * Pre-map natural geographic and cultural terroir overlaps between regions and cuisines
   */
  private initRegionCuisineMappings() {
    const mappings: Array<[string, string[]]> = [
      ['Mediterranean Basin', ['Italian', 'French', 'Spanish', 'Greek', 'Mediterranean']],
      ['East Asia', ['Japanese', 'Chinese', 'Korean']],
      ['South Asia', ['Indian', 'Sri Lankan', 'Nepalese']],
      ['Southeast Asia', ['Thai', 'Vietnamese', 'Indonesian', 'Malaysian']],
      ['Middle East', ['Persian', 'Lebanese', 'Turkish', 'Middle Eastern', 'Moroccan']],
      ['Central & South America', ['Mexican', 'Peruvian', 'Brazilian', 'Colombian']],
      ['Nordic & Boreal', ['Nordic', 'Scandinavian']],
      ['Sub-Saharan Africa', ['Ethiopian', 'North African', 'Senegalese', 'West African']],
      ['North America', ['American', 'Cajun', 'Creole', 'Indigenous American']]
    ];

    mappings.forEach(([region, cuisines]) => {
      const regKey = norm(region);
      const cuisineSet = this.regionToCuisines.get(regKey) || new Set<string>();
      cuisines.forEach(c => cuisineSet.add(c));
      this.regionToCuisines.set(regKey, cuisineSet);

      cuisines.forEach(c => {
        const cKey = norm(c);
        const regSet = this.cuisineToRegions.get(cKey) || new Set<string>();
        regSet.add(region);
        this.cuisineToRegions.set(cKey, regSet);
      });
    });
  }

  /**
   * Register a listener for graph updates
   */
  public subscribe(callback: () => void): () => void {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  private notifyUpdate() {
    this.clearCaches();
    this.listeners.forEach(cb => {
      try {
        cb();
      } catch (err) {
        console.warn('Error executing linking engine subscriber:', err);
      }
    });
  }

  /**
   * Invalidate query caches
   */
  public clearCaches(): void {
    this.relatedRecipesCache.clear();
    this.relatedIngredientsCache.clear();
    this.connectedIngredientsCache.clear();
    this.matchingRecipesCache.clear();
  }

  /**
   * Full initialization of dataset
   */
  public initialize(ingredients: Ingredient[], recipes: CulinaryMasterclass[]): void {
    this.ingredientsById.clear();
    this.ingredientsBySlug.clear();
    this.ingredientAliases.clear();
    this.recipesById.clear();
    this.recipesBySlug.clear();
    this.ingredientToRecipes.clear();
    this.recipeToIngredients.clear();
    this.coOccurrenceMap.clear();
    this.ingredientCategoryToRecipeCategories.clear();
    this.recipeCategoryToIngredientCategories.clear();

    // 1. Index ingredients first
    for (const ing of ingredients) {
      this.registerIngredientInternal(ing);
    }

    // 2. Index recipes and construct graph
    for (const rec of recipes) {
      this.registerRecipeInternal(rec);
    }

    // 3. Build co-occurrence and cross-category graphs
    this.buildGraphMatrices();

    this.clearCaches();
    this.isInitialized = true;
  }

  /**
   * Internal indexing of a single ingredient
   */
  private registerIngredientInternal(ing: Ingredient): void {
    this.ingredientsById.set(ing.id, ing);
    if (ing.slug) {
      this.ingredientsBySlug.set(ing.slug.toLowerCase(), ing);
    }

    const cleanName = norm(ing.name);
    this.ingredientAliases.set(cleanName, ing.id);

    if (ing.aliases && Array.isArray(ing.aliases)) {
      ing.aliases.forEach(alias => {
        const cleanAlias = norm(alias);
        if (cleanAlias && !this.ingredientAliases.has(cleanAlias)) {
          this.ingredientAliases.set(cleanAlias, ing.id);
        }
      });
    }

    if (!this.ingredientToRecipes.has(ing.id)) {
      this.ingredientToRecipes.set(ing.id, new Set<string>());
    }
  }

  /**
   * Internal indexing of a single recipe and linking to existing ingredients
   */
  private registerRecipeInternal(rec: CulinaryMasterclass): void {
    this.recipesById.set(rec.id, rec);
    if (rec.slug) {
      this.recipesBySlug.set(rec.slug.toLowerCase(), rec);
    }

    const connectedIngIds = new Set<string>();

    // A. Connect primary ingredient
    if (rec.primaryIngredientId && this.ingredientsById.has(rec.primaryIngredientId)) {
      connectedIngIds.add(rec.primaryIngredientId);
    } else if (rec.primaryIngredientSlug) {
      const ing = this.ingredientsBySlug.get(rec.primaryIngredientSlug.toLowerCase());
      if (ing) connectedIngIds.add(ing.id);
    } else if (rec.primaryIngredientName) {
      const matchId = this.findIngredientIdByName(rec.primaryIngredientName);
      if (matchId) connectedIngIds.add(matchId);
    }

    // B. Connect line items from ingredientsList
    if (Array.isArray(rec.ingredientsList)) {
      for (const item of rec.ingredientsList) {
        if (item.ingredientId && this.ingredientsById.has(item.ingredientId)) {
          connectedIngIds.add(item.ingredientId);
          continue;
        }
        if (item.ingredientSlug) {
          const ing = this.ingredientsBySlug.get(item.ingredientSlug.toLowerCase());
          if (ing) {
            connectedIngIds.add(ing.id);
            continue;
          }
        }
        if (item.name) {
          const matchId = this.findIngredientIdByName(item.name);
          if (matchId) {
            connectedIngIds.add(matchId);
          }
        }
      }
    }

    // C. Connect explicit relatedIngredientIds
    if (Array.isArray(rec.relatedIngredientIds)) {
      for (const relId of rec.relatedIngredientIds) {
        if (this.ingredientsById.has(relId)) {
          connectedIngIds.add(relId);
        } else {
          const bySlug = this.ingredientsBySlug.get(norm(relId));
          if (bySlug) connectedIngIds.add(bySlug.id);
        }
      }
    }

    // Update recipe-to-ingredients map
    this.recipeToIngredients.set(rec.id, connectedIngIds);

    // Update ingredient-to-recipes inverted map
    for (const ingId of connectedIngIds) {
      let recSet = this.ingredientToRecipes.get(ingId);
      if (!recSet) {
        recSet = new Set<string>();
        this.ingredientToRecipes.set(ingId, recSet);
      }
      recSet.add(rec.id);
    }
  }

  /**
   * Fast resolution of ingredient ID from a name or alias string
   */
  public findIngredientIdByName(rawName: string): string | undefined {
    const clean = norm(rawName);
    if (!clean) return undefined;

    // Direct match in alias map
    const direct = this.ingredientAliases.get(clean);
    if (direct) return direct;

    // Partial substring match against indexed ingredients
    for (const [alias, id] of this.ingredientAliases.entries()) {
      if (alias.length >= 4 && (clean.includes(alias) || alias.includes(clean))) {
        return id;
      }
    }

    return undefined;
  }

  /**
   * Build co-occurrence matrix and cross-category associations in O(N)
   */
  private buildGraphMatrices(): void {
    this.coOccurrenceMap.clear();
    this.ingredientCategoryToRecipeCategories.clear();
    this.recipeCategoryToIngredientCategories.clear();

    for (const [recipeId, ingIds] of this.recipeToIngredients.entries()) {
      const rec = this.recipesById.get(recipeId);
      const recCategory = norm(rec?.courseCategory || rec?.category || 'general');

      const ingIdList = Array.from(ingIds);

      // Co-occurrence across ingredients in the same recipe
      for (let i = 0; i < ingIdList.length; i++) {
        const idA = ingIdList[i];
        const ingA = this.ingredientsById.get(idA);
        const ingACategory = norm(ingA?.category || 'general');

        let coOccurA = this.coOccurrenceMap.get(idA);
        if (!coOccurA) {
          coOccurA = new Map<string, number>();
          this.coOccurrenceMap.set(idA, coOccurA);
        }

        // Cross-category linking: ingredient category -> recipe category
        let ingToRecMap = this.ingredientCategoryToRecipeCategories.get(ingACategory);
        if (!ingToRecMap) {
          ingToRecMap = new Map<string, number>();
          this.ingredientCategoryToRecipeCategories.set(ingACategory, ingToRecMap);
        }
        ingToRecMap.set(recCategory, (ingToRecMap.get(recCategory) || 0) + 1);

        // Recipe category -> ingredient category
        let recToIngMap = this.recipeCategoryToIngredientCategories.get(recCategory);
        if (!recToIngMap) {
          recToIngMap = new Map<string, number>();
          this.recipeCategoryToIngredientCategories.set(recCategory, recToIngMap);
        }
        recToIngMap.set(ingACategory, (recToIngMap.get(ingACategory) || 0) + 1);

        for (let j = i + 1; j < ingIdList.length; j++) {
          const idB = ingIdList[j];
          coOccurA.set(idB, (coOccurA.get(idB) || 0) + 1);

          let coOccurB = this.coOccurrenceMap.get(idB);
          if (!coOccurB) {
            coOccurB = new Map<string, number>();
            this.coOccurrenceMap.set(idB, coOccurB);
          }
          coOccurB.set(idA, (coOccurB.get(idA) || 0) + 1);
        }
      }
    }
  }

  /**
   * Automatically update the graph when a new ingredient is added or imported.
   * Immediately scans all existing recipes for occurrences of the new ingredient.
   */
  public notifyNewIngredient(ingredient: Ingredient): void {
    this.registerIngredientInternal(ingredient);

    // Scan all existing recipes to see if any recipe mentions this new ingredient
    const cleanName = norm(ingredient.name);
    for (const [recId, rec] of this.recipesById.entries()) {
      let matches = false;
      if (
        rec.primaryIngredientId === ingredient.id ||
        (rec.primaryIngredientSlug && norm(rec.primaryIngredientSlug) === norm(ingredient.slug)) ||
        (rec.primaryIngredientName && norm(rec.primaryIngredientName).includes(cleanName))
      ) {
        matches = true;
      } else if (Array.isArray(rec.ingredientsList)) {
        matches = rec.ingredientsList.some(item => {
          if (item.ingredientId === ingredient.id) return true;
          if (item.ingredientSlug && norm(item.ingredientSlug) === norm(ingredient.slug)) return true;
          const itemName = norm(item.name);
          return itemName.includes(cleanName) || cleanName.includes(itemName);
        });
      }

      if (matches) {
        const ingSet = this.recipeToIngredients.get(recId) || new Set<string>();
        ingSet.add(ingredient.id);
        this.recipeToIngredients.set(recId, ingSet);

        const recSet = this.ingredientToRecipes.get(ingredient.id) || new Set<string>();
        recSet.add(recId);
        this.ingredientToRecipes.set(ingredient.id, recSet);
      }
    }

    this.buildGraphMatrices();
    this.notifyUpdate();
  }

  /**
   * Automatically update the graph when a new recipe is added or imported.
   */
  public notifyNewRecipe(recipe: CulinaryMasterclass): void {
    this.registerRecipeInternal(recipe);
    this.buildGraphMatrices();
    this.notifyUpdate();
  }

  /**
   * Batch update when multiple ingredients and/or recipes are imported
   */
  public notifyBatchImported(newIngredients: Ingredient[], newRecipes: CulinaryMasterclass[]): void {
    for (const ing of newIngredients) {
      this.registerIngredientInternal(ing);
    }
    for (const rec of newRecipes) {
      this.registerRecipeInternal(rec);
    }
    this.buildGraphMatrices();
    this.notifyUpdate();
  }

  // =========================================================================
  // CORE QUERY APIS: RELEVANT RECIPES FOR INGREDIENTS
  // =========================================================================

  /**
   * Get verified culinary recipes that feature a specific ingredient.
   * Relevance scored:
   * - Primary ingredient: +100
   * - Explicit relatedRecipeIds: +80
   * - In recipe ingredient line item: +60
   * - Shared cuisine/terroir synergy: +20
   */
  public getRecipesForIngredient(
    ingredient: Ingredient | string,
    limit: number = 4
  ): CulinaryMasterclass[] {
    const ingId = typeof ingredient === 'string' ? ingredient : ingredient.id;
    const ing = typeof ingredient === 'string' ? (this.ingredientsById.get(ingId) || this.ingredientsBySlug.get(norm(ingId))) : ingredient;

    if (!ing) return [];

    const cacheKey = `${ing.id}_${limit}`;
    if (this.matchingRecipesCache.has(cacheKey)) {
      return this.matchingRecipesCache.get(cacheKey)!;
    }

    const scoredRecipes: ScoredItem<CulinaryMasterclass>[] = [];
    const seenRecipeIds = new Set<string>();

    const linkedRecipeIds = this.ingredientToRecipes.get(ing.id) || new Set<string>();
    const ingSlug = ing.slug ? norm(ing.slug) : '';
    const ingName = norm(ing.name);

    // 1. Evaluate all recipes in the system
    for (const rec of this.recipesById.values()) {
      if (seenRecipeIds.has(rec.id)) continue;

      let score = 0;
      const reasons: string[] = [];

      // Is primary ingredient
      if (
        rec.primaryIngredientId === ing.id ||
        (rec.primaryIngredientSlug && norm(rec.primaryIngredientSlug) === ingSlug) ||
        (rec.primaryIngredientName && norm(rec.primaryIngredientName).includes(ingName))
      ) {
        score += 100;
        reasons.push('Primary Specimen');
      }

      // Is linked via indexed graph
      if (linkedRecipeIds.has(rec.id)) {
        score += 70;
        reasons.push('Key Culinary Component');
      }

      // Explicit related recipe IDs on ingredient
      if (Array.isArray(ing.relatedRecipeIds)) {
        if (ing.relatedRecipeIds.includes(rec.id) || (rec.slug && ing.relatedRecipeIds.includes(rec.slug))) {
          score += 80;
          reasons.push('Curated Association');
        }
      }

      // Line item match
      if (Array.isArray(rec.ingredientsList)) {
        const itemMatch = rec.ingredientsList.some(item => {
          if (item.ingredientId === ing.id) return true;
          if (item.ingredientSlug && norm(item.ingredientSlug) === ingSlug) return true;
          const cleanItem = norm(item.name);
          return cleanItem === ingName || cleanItem.includes(ingName) || ingName.includes(cleanItem);
        });
        if (itemMatch && score < 70) {
          score += 60;
          reasons.push('Line Item Component');
        }
      }

      if (score > 0) {
        scoredRecipes.push({ item: rec, score, reasons });
        seenRecipeIds.add(rec.id);
      }
    }

    // Sort descending by score
    scoredRecipes.sort((a, b) => b.score - a.score);

    const results = scoredRecipes.slice(0, limit).map(s => s.item);
    this.matchingRecipesCache.set(cacheKey, results);
    return results;
  }

  // =========================================================================
  // CORE QUERY APIS: CONNECTED INGREDIENTS FOR RECIPES
  // =========================================================================

  /**
   * Get all verified archive ingredients featured in a given recipe.
   * Guarantees zero fake specimens and crawlable links for every main ingredient.
   */
  public getConnectedIngredientsForRecipe(
    recipe: CulinaryMasterclass | string,
    limit: number = 8
  ): Ingredient[] {
    const recId = typeof recipe === 'string' ? recipe : recipe.id;
    const rec = typeof recipe === 'string' ? (this.recipesById.get(recId) || this.recipesBySlug.get(norm(recId))) : recipe;

    if (!rec) return [];

    const cacheKey = `${rec.id}_${limit}`;
    if (this.connectedIngredientsCache.has(cacheKey)) {
      return this.connectedIngredientsCache.get(cacheKey)!;
    }

    const connected: Ingredient[] = [];
    const seenIngIds = new Set<string>();

    // 1. Primary ingredient first
    if (rec.primaryIngredientId && this.ingredientsById.has(rec.primaryIngredientId)) {
      const primary = this.ingredientsById.get(rec.primaryIngredientId)!;
      connected.push(primary);
      seenIngIds.add(primary.id);
    } else if (rec.primaryIngredientSlug) {
      const primary = this.ingredientsBySlug.get(norm(rec.primaryIngredientSlug));
      if (primary && !seenIngIds.has(primary.id)) {
        connected.push(primary);
        seenIngIds.add(primary.id);
      }
    } else if (rec.primaryIngredientName) {
      const matchId = this.findIngredientIdByName(rec.primaryIngredientName);
      if (matchId && this.ingredientsById.has(matchId)) {
        const primary = this.ingredientsById.get(matchId)!;
        if (!seenIngIds.has(primary.id)) {
          connected.push(primary);
          seenIngIds.add(primary.id);
        }
      }
    }

    // 2. Query indexed recipe-to-ingredients map
    const linkedIds = this.recipeToIngredients.get(rec.id) || new Set<string>();
    for (const ingId of linkedIds) {
      if (seenIngIds.has(ingId)) continue;
      const ing = this.ingredientsById.get(ingId);
      if (ing) {
        connected.push(ing);
        seenIngIds.add(ing.id);
        if (connected.length >= limit) break;
      }
    }

    // 3. Check ingredientsList line items against archive
    if (connected.length < limit && Array.isArray(rec.ingredientsList)) {
      for (const item of rec.ingredientsList) {
        if (connected.length >= limit) break;
        if (item.ingredientId && !seenIngIds.has(item.ingredientId) && this.ingredientsById.has(item.ingredientId)) {
          const ing = this.ingredientsById.get(item.ingredientId)!;
          connected.push(ing);
          seenIngIds.add(ing.id);
          continue;
        }
        if (item.ingredientSlug) {
          const ing = this.ingredientsBySlug.get(norm(item.ingredientSlug));
          if (ing && !seenIngIds.has(ing.id)) {
            connected.push(ing);
            seenIngIds.add(ing.id);
            continue;
          }
        }
        const matchId = this.findIngredientIdByName(item.name);
        if (matchId && !seenIngIds.has(matchId) && this.ingredientsById.has(matchId)) {
          const ing = this.ingredientsById.get(matchId)!;
          connected.push(ing);
          seenIngIds.add(ing.id);
        }
      }
    }

    this.connectedIngredientsCache.set(cacheKey, connected);
    return connected;
  }

  // =========================================================================
  // CORE QUERY APIS: RELATED INGREDIENTS
  // =========================================================================

  /**
   * Get intelligent related ingredients for a botanical specimen.
   * Scoring factors:
   * 1. Explicit relatedIngredientIds (+100)
   * 2. Recipe co-occurrence (+40 per shared recipe)
   * 3. Sibling category (+30)
   * 4. Geographic terroir region (+25)
   * 5. Harmonic organoleptic profile proximity (+15)
   *
   * STRICT SAFETY:
   * - Excludes itself (NO circular self-links)
   * - Deduplicated
   * - Capped at limit (3-4 items, optimal for mobile)
   */
  public getRelatedIngredients(
    ingredient: Ingredient | string,
    limit: number = 4
  ): Ingredient[] {
    const ingId = typeof ingredient === 'string' ? ingredient : ingredient.id;
    const ing = typeof ingredient === 'string' ? (this.ingredientsById.get(ingId) || this.ingredientsBySlug.get(norm(ingId))) : ingredient;

    if (!ing) return [];

    const cacheKey = `${ing.id}_${limit}`;
    if (this.relatedIngredientsCache.has(cacheKey)) {
      return this.relatedIngredientsCache.get(cacheKey)!;
    }

    const scored: ScoredItem<Ingredient>[] = [];
    const coOccurMap = this.coOccurrenceMap.get(ing.id);
    const explicitIds = new Set(ing.relatedIngredientIds || []);

    const ingCat = norm(ing.category);
    const ingRegion = norm(ing.region);

    for (const cand of this.ingredientsById.values()) {
      // Never link an ingredient to itself
      if (cand.id === ing.id || (ing.slug && cand.slug === ing.slug)) continue;

      let score = 0;
      const reasons: string[] = [];

      // 1. Explicit related ID
      if (explicitIds.has(cand.id) || (cand.slug && explicitIds.has(cand.slug))) {
        score += 100;
        reasons.push('Curated Affinity');
      }

      // 2. Real recipe co-occurrence
      if (coOccurMap && coOccurMap.has(cand.id)) {
        const count = coOccurMap.get(cand.id)!;
        score += Math.min(60, count * 20);
        reasons.push(`Shared in ${count} Masterclass${count > 1 ? 'es' : ''}`);
      }

      // 3. Sibling category
      if (norm(cand.category) === ingCat) {
        score += 30;
        reasons.push(`Same Botanical Category: ${cand.category}`);
      }

      // 4. Same terroir region
      if (norm(cand.region) === ingRegion) {
        score += 25;
        reasons.push(`Terroir Region: ${cand.region}`);
      }

      // 5. Flavor profile proximity
      if (cand.flavorProfile && ing.flavorProfile) {
        const deltaUmami = Math.abs((cand.flavorProfile.umami || 0) - (ing.flavorProfile.umami || 0));
        const deltaAroma = Math.abs((cand.flavorProfile.aroma || 0) - (ing.flavorProfile.aroma || 0));
        if (deltaUmami < 25 && deltaAroma < 25) {
          score += 15;
          reasons.push('Sensory Flavor Harmony');
        }
      }

      if (score > 0) {
        scored.push({ item: cand, score, reasons });
      }
    }

    scored.sort((a, b) => b.score - a.score);

    const results = scored.slice(0, limit).map(s => s.item);
    this.relatedIngredientsCache.set(cacheKey, results);
    return results;
  }

  // =========================================================================
  // CORE QUERY APIS: RELATED RECIPES
  // =========================================================================

  /**
   * Get intelligent related masterclasses for a recipe.
   * Scoring factors:
   * 1. Same primary ingredient (+100)
   * 2. Shared connected ingredients (+30 per shared ingredient)
   * 3. Same cuisine AND course category (+50)
   * 4. Same cuisine (+30)
   * 5. Same course category (+20)
   *
   * STRICT SAFETY:
   * - Excludes itself (NO circular self-links)
   * - Deduplicated
   * - Capped at limit (3 items, optimal for mobile)
   */
  public getRelatedRecipes(
    recipe: CulinaryMasterclass | string,
    limit: number = 3
  ): CulinaryMasterclass[] {
    const recId = typeof recipe === 'string' ? recipe : recipe.id;
    const rec = typeof recipe === 'string' ? (this.recipesById.get(recId) || this.recipesBySlug.get(norm(recId))) : recipe;

    if (!rec) return [];

    const cacheKey = `${rec.id}_${limit}`;
    if (this.relatedRecipesCache.has(cacheKey)) {
      return this.relatedRecipesCache.get(cacheKey)!;
    }

    const scored: ScoredItem<CulinaryMasterclass>[] = [];
    const myIngredients = this.recipeToIngredients.get(rec.id) || new Set<string>();

    const myCuisine = norm(rec.cuisine);
    const myCourse = norm(rec.courseCategory || rec.category);
    const myPrimaryId = rec.primaryIngredientId;
    const myPrimarySlug = rec.primaryIngredientSlug ? norm(rec.primaryIngredientSlug) : '';

    for (const cand of this.recipesById.values()) {
      // Exclude current recipe
      if (cand.id === rec.id || (rec.slug && cand.slug === rec.slug)) continue;

      let score = 0;
      const reasons: string[] = [];

      // 1. Same primary ingredient
      if (
        (myPrimaryId && cand.primaryIngredientId === myPrimaryId) ||
        (myPrimarySlug && cand.primaryIngredientSlug && norm(cand.primaryIngredientSlug) === myPrimarySlug)
      ) {
        score += 100;
        reasons.push('Shared Primary Specimen');
      }

      // 2. Shared ingredient overlap (Jaccard-like co-occurrence)
      const candIngredients = this.recipeToIngredients.get(cand.id) || new Set<string>();
      let sharedCount = 0;
      for (const ingId of myIngredients) {
        if (candIngredients.has(ingId)) sharedCount++;
      }
      if (sharedCount > 0) {
        score += Math.min(60, sharedCount * 25);
        reasons.push(`${sharedCount} Shared Key Ingredient${sharedCount > 1 ? 's' : ''}`);
      }

      // 3. Same cuisine and course
      const candCuisine = norm(cand.cuisine);
      const candCourse = norm(cand.courseCategory || cand.category);

      if (candCuisine === myCuisine && candCourse === myCourse && candCuisine !== '') {
        score += 50;
        reasons.push(`Same Cuisine & Course: ${cand.cuisine} ${cand.courseCategory}`);
      } else if (candCuisine === myCuisine && candCuisine !== '') {
        score += 30;
        reasons.push(`Shared Gastronomy: ${cand.cuisine}`);
      } else if (candCourse === myCourse && candCourse !== '') {
        score += 20;
        reasons.push(`Same Course Category: ${cand.courseCategory}`);
      }

      if (score > 0) {
        scored.push({ item: cand, score, reasons });
      }
    }

    scored.sort((a, b) => b.score - a.score);

    const results = scored.slice(0, limit).map(s => s.item);
    this.relatedRecipesCache.set(cacheKey, results);
    return results;
  }

  // =========================================================================
  // CROSS-TAXONOMY & CATEGORY INTER-LINKING
  // =========================================================================

  /**
   * For an ingredient category, find the top recipe categories and cuisines featuring it
   */
  public getCrossTaxonomyForIngredientCategory(
    categorySlugOrId: string,
    limit: number = 4
  ): {
    recipeCategories: Array<{ slug: string; name: string; recipeCount: number }>;
    cuisines: Array<{ name: string; count: number }>;
  } {
    const cleanKey = norm(categorySlugOrId);

    // 1. Gather all ingredients in this category
    const catIngredients: Ingredient[] = [];
    for (const ing of this.ingredientsById.values()) {
      if (norm(ing.category).includes(cleanKey) || norm(createSlug(ing.category)).includes(cleanKey)) {
        catIngredients.push(ing);
      }
    }

    // 2. Gather all recipes that feature these ingredients
    const recipeCategoryCounts = new Map<string, number>();
    const cuisineCounts = new Map<string, number>();

    for (const ing of catIngredients) {
      const recIds = this.ingredientToRecipes.get(ing.id) || new Set<string>();
      for (const recId of recIds) {
        const rec = this.recipesById.get(recId);
        if (rec) {
          const course = rec.courseCategory || rec.category || 'Mains';
          recipeCategoryCounts.set(course, (recipeCategoryCounts.get(course) || 0) + 1);
          if (rec.cuisine) {
            cuisineCounts.set(rec.cuisine, (cuisineCounts.get(rec.cuisine) || 0) + 1);
          }
        }
      }
    }

    const recipeCategories = Array.from(recipeCategoryCounts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, limit)
      .map(([name, count]) => {
        const slug = createSlug(name);
        return { slug, name, recipeCount: count };
      });

    const cuisines = Array.from(cuisineCounts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, limit)
      .map(([name, count]) => ({ name, count }));

    return { recipeCategories, cuisines };
  }

  /**
   * For a recipe category, find the top ingredient categories and terroir regions featured in it
   */
  public getCrossTaxonomyForRecipeCategory(
    categorySlugOrId: string,
    limit: number = 4
  ): {
    ingredientCategories: Array<{ slug: string; name: string; count: number }>;
    regions: Array<{ name: string; count: number }>;
  } {
    const cleanKey = norm(categorySlugOrId);

    // 1. Gather recipes matching this category
    const catRecipes: CulinaryMasterclass[] = [];
    for (const rec of this.recipesById.values()) {
      const course = norm(rec.courseCategory || rec.category || '');
      if (course.includes(cleanKey) || norm(createSlug(course)).includes(cleanKey)) {
        catRecipes.push(rec);
      }
    }

    const ingredientCategoryCounts = new Map<string, number>();
    const regionCounts = new Map<string, number>();

    for (const rec of catRecipes) {
      const ingIds = this.recipeToIngredients.get(rec.id) || new Set<string>();
      for (const ingId of ingIds) {
        const ing = this.ingredientsById.get(ingId);
        if (ing) {
          ingredientCategoryCounts.set(ing.category, (ingredientCategoryCounts.get(ing.category) || 0) + 1);
          if (ing.region) {
            regionCounts.set(ing.region, (regionCounts.get(ing.region) || 0) + 1);
          }
        }
      }
    }

    const ingredientCategories = Array.from(ingredientCategoryCounts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, limit)
      .map(([name, count]) => {
        const slug = createSlug(name);
        return { slug, name, count };
      });

    const regions = Array.from(regionCounts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, limit)
      .map(([name, count]) => ({ name, count }));

    return { ingredientCategories, regions };
  }

  // =========================================================================
  // SEMANTIC ANCHOR LINK & SEO METADATA HELPERS
  // =========================================================================

  /**
   * Generate canonical, descriptive anchor metadata for an ingredient
   */
  public getIngredientLink(ingredient: Ingredient): LinkMetadata {
    const slug = ingredient.slug || ingredient.id;
    return {
      href: `/ingredients/${slug}`,
      anchorText: ingredient.name,
      title: `Explore ${ingredient.name} — ${ingredient.category} from ${ingredient.region || ingredient.origin}`,
      ariaLabel: `View botanical dossier for ${ingredient.name}`,
      secondaryHref: `/categories/ingredients/${createSlug(ingredient.category)}`,
      secondaryText: ingredient.category
    };
  }

  /**
   * Generate canonical, descriptive anchor metadata for a recipe
   */
  public getRecipeLink(recipe: CulinaryMasterclass): LinkMetadata {
    const slug = recipe.slug || recipe.id;
    return {
      href: `/recipes/${slug}`,
      anchorText: recipe.dishTitle,
      title: `Masterclass: ${recipe.dishTitle} (${recipe.cuisine} • ${recipe.courseCategory || recipe.category})`,
      ariaLabel: `View culinary masterclass for ${recipe.dishTitle}`,
      secondaryHref: `/recipes?cuisine=${encodeURIComponent(recipe.cuisine)}`,
      secondaryText: recipe.cuisine
    };
  }

  /**
   * Generate canonical, descriptive anchor metadata for a category
   */
  public getCategoryLink(category: CategoryDefinition): LinkMetadata {
    const typePath = category.type === 'ingredient' ? 'ingredients' : 'recipes';
    return {
      href: `/categories/${typePath}/${category.slug}`,
      anchorText: category.name,
      title: `Browse all ${category.name} in Stassen's Gastronomic Archive`,
      ariaLabel: `Explore ${category.name} category`
    };
  }
}

export const internalLinkingEngine = new InternalLinkingEngine();
