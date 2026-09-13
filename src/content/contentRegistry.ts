import { Ingredient, CulinaryMasterclass, IngredientCategory, WorldRegion, HarvestSeason, FlavorProfile } from '../types';
import { createSlug, getIngredientSlug, getRecipeSlug, ensureUniqueSlug } from '../utils/slug';
import { isValidImageUrl, getIngredientFallbackChain, getRecipeFallbackChain } from '../utils/imageFallback';
import { relationshipManager } from './relationshipManager';
import { categoryRegistry } from './categoryRegistry';
import { internalLinkingEngine } from './internalLinkingEngine';
import { validateIngredient, validateRecipe } from './validator';
import { INITIAL_INGREDIENTS } from '../data/ingredients';
import { INITIAL_RECIPES } from '../data/recipes';
import { ALL_50_WORLD_RECIPES } from '../data/world50';

/**
 * Lightweight projected summary for high-performance home feed and grid rendering.
 * Avoids loading massive nested instruction steps or deep galleries on initial load.
 */
export interface IngredientSummary {
  id: string;
  slug: string;
  name: string;
  scientificName?: string;
  category: IngredientCategory;
  origin: string;
  region: WorldRegion;
  country: string;
  season: HarvestSeason;
  rarityIndex: string;
  imageUrl: string;
  flavorNotes: string[];
  flavorProfile: FlavorProfile;
  shortDescription: string;
}

export interface RecipeSummary {
  id: string;
  slug: string;
  dishTitle: string;
  subtitle: string;
  cuisine: string;
  courseCategory: string;
  difficulty: string;
  servings: number;
  overallDurationFormatted: string;
  heroImageUrl: string;
  primaryIngredientId: string;
  primaryIngredientName: string;
  primaryIngredientSlug?: string;
  tags: string[];
  trendScore?: number;
  hotnessRank?: number;
}

/**
 * Dataset manifest for modular content loading.
 * Allows adding new ingredient batches or recipe collections without editing UI components.
 */
export interface DatasetManifest<T> {
  id: string;
  name: string;
  description?: string;
  type: 'ingredient' | 'recipe';
  version?: string;
  load: () => T[] | Promise<T[]>;
  isLoaded?: boolean;
}

/**
 * Broken relationship record for diagnostic audits
 */
export interface BrokenRelationshipNotice {
  sourceType: 'ingredient' | 'recipe';
  sourceId: string;
  sourceTitle: string;
  targetType: 'ingredient' | 'recipe';
  referencedTargetId: string;
  resolvedViaAlias?: string;
  isResolved: boolean;
}

/**
 * LRU Cache for memoized filter results
 */
class QueryCache<V> {
  private capacity: number;
  private cache: Map<string, V> = new Map();

  constructor(capacity = 250) {
    this.capacity = capacity;
  }

  get(key: string): V | undefined {
    if (!this.cache.has(key)) return undefined;
    const value = this.cache.get(key)!;
    // Refresh position
    this.cache.delete(key);
    this.cache.set(key, value);
    return value;
  }

  set(key: string, value: V): void {
    if (this.cache.has(key)) {
      this.cache.delete(key);
    } else if (this.cache.size >= this.capacity) {
      const oldestKey = this.cache.keys().next().value;
      if (oldestKey !== undefined) {
        this.cache.delete(oldestKey);
      }
    }
    this.cache.set(key, value);
  }

  clear(): void {
    this.cache.clear();
  }
}

/**
 * Scalable Content Registry & Modular Loader
 * Designed to seamlessly expand from current baseline to 1,000+ ingredients
 * and thousands of culinary masterclass recipes.
 */
export class ContentRegistry {
  // Datasets
  private ingredientDatasets: Map<string, DatasetManifest<Ingredient>> = new Map();
  private recipeDatasets: Map<string, DatasetManifest<CulinaryMasterclass>> = new Map();

  // Ingredient Repositories & Inverted Indices
  private ingredients: Ingredient[] = [];
  private ingredientIdMap: Map<string, Ingredient> = new Map();
  private ingredientSlugMap: Map<string, Ingredient> = new Map();
  private ingredientsByCategory: Map<string, Set<string>> = new Map();
  private ingredientsByRegion: Map<string, Set<string>> = new Map();
  private ingredientsBySeason: Map<string, Set<string>> = new Map();
  private knownIngredientSlugs: Set<string> = new Set();

  // Recipe Repositories & Inverted Indices
  private recipes: CulinaryMasterclass[] = [];
  private recipeIdMap: Map<string, CulinaryMasterclass> = new Map();
  private recipeSlugMap: Map<string, CulinaryMasterclass> = new Map();
  private recipesByCuisine: Map<string, Set<string>> = new Map();
  private recipesByDifficulty: Map<string, Set<string>> = new Map();
  private recipesByCourse: Map<string, Set<string>> = new Map();
  private recipesByIngredientId: Map<string, Set<string>> = new Map();
  private knownRecipeSlugs: Set<string> = new Set();

  // Memoized Summaries
  private memoizedIngredientSummaries: IngredientSummary[] | null = null;
  private memoizedRecipeSummaries: RecipeSummary[] | null = null;

  // Query Caching
  private queryCache = new QueryCache<string[]>(300);

  // Diagnostic Safeguards
  private brokenRelationships: BrokenRelationshipNotice[] = [];
  private collisionNotices: string[] = [];

  private isInitialized = false;

  constructor() {
    this.bootstrapBaselineDatasets();
  }

  /**
   * Initialize and register default baseline datasets
   */
  private bootstrapBaselineDatasets(): void {
    if (this.isInitialized) return;

    // 1. Core Botanical Ingredients Dataset
    this.registerIngredientDataset({
      id: 'core-botanical-ingredients',
      name: 'Stassen Core Botanical Specimens',
      description: 'The foundational curated terroir collection of rare botanicals, fungi, salts, and ferments.',
      type: 'ingredient',
      version: '1.0.0',
      load: () => INITIAL_INGREDIENTS
    });

    // 2. Core Masterclass Recipes Dataset
    this.registerRecipeDataset({
      id: 'core-culinary-masterclasses',
      name: 'Stassen Core Masterclasses',
      description: 'The foundational haute gastronomy recipes paired with botanical specimens.',
      type: 'recipe',
      version: '1.0.0',
      load: () => INITIAL_RECIPES
    });

    // 3. World 50 Culinary Recipes Dataset
    this.registerRecipeDataset({
      id: 'world-50-gastronomy-recipes',
      name: 'World 50 Gastronomy Masterclasses',
      description: 'Haute gastronomy masterclass recipes spanning international cuisines.',
      type: 'recipe',
      version: '1.0.0',
      load: () => ALL_50_WORLD_RECIPES
    });

    // Load initial datasets synchronously
    this.loadAllDatasetsSync();

    // Hydrate locally stored custom additions
    this.hydrateLocalStorage();

    // Initialize Category Registry & Internal Linking Engine
    categoryRegistry.initialize(this.ingredients, this.recipes);
    internalLinkingEngine.initialize(this.ingredients, this.recipes);

    this.isInitialized = true;
  }

  /**
   * Register a new ingredient dataset module.
   * New content packages can be plugged in without touching any UI component!
   */
  public registerIngredientDataset(dataset: DatasetManifest<Ingredient>): void {
    this.ingredientDatasets.set(dataset.id, dataset);
  }

  /**
   * Register a new recipe dataset module.
   */
  public registerRecipeDataset(dataset: DatasetManifest<CulinaryMasterclass>): void {
    this.recipeDatasets.set(dataset.id, dataset);
  }

  /**
   * Synchronously load and index all registered datasets
   */
  private loadAllDatasetsSync(): void {
    for (const dataset of this.ingredientDatasets.values()) {
      if (!dataset.isLoaded) {
        const loaded = dataset.load();
        if (Array.isArray(loaded)) {
          this.indexIngredientBatch(loaded);
          dataset.isLoaded = true;
        }
      }
    }

    for (const dataset of this.recipeDatasets.values()) {
      if (!dataset.isLoaded) {
        const loaded = dataset.load();
        if (Array.isArray(loaded)) {
          this.indexRecipeBatch(loaded);
          dataset.isLoaded = true;
        }
      }
    }
  }

  /**
   * Load any locally persisted custom items
   */
  private hydrateLocalStorage(): void {
    if (typeof window === 'undefined') return;
    try {
      // Ingredients
      const storedIngs = localStorage.getItem('stassens_custom_ingredients');
      if (storedIngs) {
        const parsed = JSON.parse(storedIngs);
        if (Array.isArray(parsed)) {
          this.indexIngredientBatch(parsed);
        }
      }

      // Recipes
      const storedRecs = localStorage.getItem('stassens_culinary_recipes_v4');
      if (storedRecs) {
        const parsed = JSON.parse(storedRecs);
        if (Array.isArray(parsed)) {
          this.indexRecipeBatch(parsed);
        }
      }
    } catch {
      // Storage safety
    }
  }

  /**
   * Clear query caches when data mutates
   */
  private invalidateCaches(): void {
    this.memoizedIngredientSummaries = null;
    this.memoizedRecipeSummaries = null;
    this.queryCache.clear();
    categoryRegistry.initialize(this.ingredients, this.recipes);
  }

  // =========================================================================
  // INGREDIENT INDEXING & SAFEGUARDS
  // =========================================================================

  /**
   * Index a single ingredient with deduplication and collision safeguards
   */
  public indexIngredient(raw: Partial<Ingredient>): Ingredient {
    const existingIndex = this.ingredients.findIndex(i => i.id === raw.id || (raw.slug && i.slug === raw.slug));
    const isUpdate = existingIndex >= 0;

    // Validate with collision context
    const validated = validateIngredient(raw, {
      existingIngredientIds: this.ingredientIdMap.has(raw.id || '') ? new Set([raw.id!]) : new Set(),
      existingIngredientSlugs: this.knownIngredientSlugs,
      ingredientSlugOwnerMap: new Map(Array.from(this.ingredientSlugMap.entries()).map(([slug, ing]) => [slug, ing.id])),
      allowUpdates: isUpdate,
      resolveCollisions: true
    });

    const ingredient: Ingredient = validated.isValid && validated.data ? validated.data : (raw as Ingredient);

    // Safeguard: Ensure unique slug
    if (!ingredient.slug) {
      ingredient.slug = ensureUniqueSlug(createSlug(ingredient.id || ingredient.name), this.knownIngredientSlugs);
    }

    // Safeguard: Fallback image
    if (!isValidImageUrl(ingredient.imageUrl)) {
      const fallbackChain = getIngredientFallbackChain({
        name: ingredient.name,
        category: ingredient.category,
        imageUrl: ingredient.imageUrl
      });
      ingredient.imageUrl = fallbackChain[0];
    }

    // Store in primary list
    if (isUpdate) {
      this.ingredients[existingIndex] = ingredient;
    } else {
      this.ingredients.push(ingredient);
    }

    // Inverted mappings
    this.ingredientIdMap.set(ingredient.id, ingredient);
    this.ingredientSlugMap.set(ingredient.slug, ingredient);
    this.knownIngredientSlugs.add(ingredient.slug);

    // Index by Category
    let catSet = this.ingredientsByCategory.get(ingredient.category);
    if (!catSet) {
      catSet = new Set();
      this.ingredientsByCategory.set(ingredient.category, catSet);
    }
    catSet.add(ingredient.id);

    // Index by Region
    let regSet = this.ingredientsByRegion.get(ingredient.region);
    if (!regSet) {
      regSet = new Set();
      this.ingredientsByRegion.set(ingredient.region, regSet);
    }
    regSet.add(ingredient.id);

    // Index by Season
    let seasonSet = this.ingredientsBySeason.get(ingredient.season);
    if (!seasonSet) {
      seasonSet = new Set();
      this.ingredientsBySeason.set(ingredient.season, seasonSet);
    }
    seasonSet.add(ingredient.id);

    // Register with Bi-directional Relationship Manager & Internal Linking Engine
    relationshipManager.indexIngredient(ingredient);
    try {
      internalLinkingEngine.notifyNewIngredient(ingredient);
    } catch {
      // Safe internal linking update
    }

    this.invalidateCaches();
    return ingredient;
  }

  /**
   * Batch index an array of ingredients
   */
  public indexIngredientBatch(batch: Partial<Ingredient>[]): void {
    for (const item of batch) {
      if (item && (item.id || item.name)) {
        this.indexIngredient(item);
      }
    }
  }

  // =========================================================================
  // RECIPE INDEXING & SAFEGUARDS
  // =========================================================================

  /**
   * Index a single recipe with deduplication and relationship safeguards
   */
  public indexRecipe(raw: Partial<CulinaryMasterclass>): CulinaryMasterclass {
    const existingIndex = this.recipes.findIndex(r => r.id === raw.id || (raw.slug && r.slug === raw.slug));
    const isUpdate = existingIndex >= 0;

    // Validate with collision context
    const validated = validateRecipe(raw, {
      existingRecipeIds: this.recipeIdMap.has(raw.id || '') ? new Set([raw.id!]) : new Set(),
      existingRecipeSlugs: this.knownRecipeSlugs,
      recipeSlugOwnerMap: new Map(Array.from(this.recipeSlugMap.entries()).map(([slug, r]) => [slug, r.id])),
      allowUpdates: isUpdate,
      resolveCollisions: true
    });

    const recipe: CulinaryMasterclass = validated.isValid && validated.data ? validated.data : (raw as CulinaryMasterclass);

    // Safeguard: Ensure unique slug
    if (!recipe.slug) {
      recipe.slug = ensureUniqueSlug(getRecipeSlug(recipe), this.knownRecipeSlugs);
    }

    // Safeguard: Fallback image
    if (!isValidImageUrl(recipe.heroImageUrl)) {
      const fallbackChain = getRecipeFallbackChain(recipe);
      recipe.heroImageUrl = fallbackChain[0];
    }

    // Store in primary list
    if (isUpdate) {
      this.recipes[existingIndex] = recipe;
    } else {
      this.recipes.push(recipe);
    }

    // Inverted mappings
    this.recipeIdMap.set(recipe.id, recipe);
    this.recipeSlugMap.set(recipe.slug, recipe);
    this.knownRecipeSlugs.add(recipe.slug);

    // Index by Cuisine
    if (recipe.cuisine) {
      let cuisineSet = this.recipesByCuisine.get(recipe.cuisine);
      if (!cuisineSet) {
        cuisineSet = new Set();
        this.recipesByCuisine.set(recipe.cuisine, cuisineSet);
      }
      cuisineSet.add(recipe.id);
    }

    // Index by Difficulty
    if (recipe.difficulty) {
      let diffSet = this.recipesByDifficulty.get(recipe.difficulty);
      if (!diffSet) {
        diffSet = new Set();
        this.recipesByDifficulty.set(recipe.difficulty, diffSet);
      }
      diffSet.add(recipe.id);
    }

    // Index by Course
    if (recipe.courseCategory) {
      let courseSet = this.recipesByCourse.get(recipe.courseCategory);
      if (!courseSet) {
        courseSet = new Set();
        this.recipesByCourse.set(recipe.courseCategory, courseSet);
      }
      courseSet.add(recipe.id);
    }

    // Index by Primary Ingredient (ID or Slug)
    if (recipe.primaryIngredientId) {
      let ingRecSet = this.recipesByIngredientId.get(recipe.primaryIngredientId);
      if (!ingRecSet) {
        ingRecSet = new Set();
        this.recipesByIngredientId.set(recipe.primaryIngredientId, ingRecSet);
      }
      ingRecSet.add(recipe.id);
    }

    if (recipe.primaryIngredientSlug && recipe.primaryIngredientSlug !== recipe.primaryIngredientId) {
      let ingSlugSet = this.recipesByIngredientId.get(recipe.primaryIngredientSlug);
      if (!ingSlugSet) {
        ingSlugSet = new Set();
        this.recipesByIngredientId.set(recipe.primaryIngredientSlug, ingSlugSet);
      }
      ingSlugSet.add(recipe.id);
    }

    // Check relationship integrity against known ingredients
    this.auditRecipeRelationships(recipe);

    // Register with relationship manager & internal linking engine
    try {
      relationshipManager.indexRecipe(recipe, this.ingredientIdMap);
      internalLinkingEngine.notifyNewRecipe(recipe);
    } catch {
      // Safe relationship registration
    }

    this.invalidateCaches();
    return recipe;
  }

  /**
   * Batch index an array of recipes
   */
  public indexRecipeBatch(batch: Partial<CulinaryMasterclass>[]): void {
    for (const item of batch) {
      if (item && (item.id || item.dishTitle)) {
        this.indexRecipe(item);
      }
    }
  }

  /**
   * Safeguard audit: Verify that referenced ingredients exist or resolve via aliases
   */
  private auditRecipeRelationships(recipe: CulinaryMasterclass): void {
    // 1. Primary Ingredient
    if (recipe.primaryIngredientId) {
      const exists = this.ingredientIdMap.has(recipe.primaryIngredientId);
      if (!exists) {
        const resolvedAliasId = relationshipManager.findIngredientIdByNameOrAlias(recipe.primaryIngredientName || recipe.primaryIngredientId);
        if (resolvedAliasId && this.ingredientIdMap.has(resolvedAliasId)) {
          recipe.primaryIngredientId = resolvedAliasId;
        } else {
          this.brokenRelationships.push({
            sourceType: 'recipe',
            sourceId: recipe.id,
            sourceTitle: recipe.dishTitle,
            targetType: 'ingredient',
            referencedTargetId: recipe.primaryIngredientId,
            isResolved: false
          });
        }
      }
    }

    // 2. Ingredients List items
    if (recipe.ingredientsList && Array.isArray(recipe.ingredientsList)) {
      for (const item of recipe.ingredientsList) {
        if (item.ingredientId && !this.ingredientIdMap.has(item.ingredientId)) {
          const resolved = relationshipManager.findIngredientIdByNameOrAlias(item.name || item.ingredientId);
          if (resolved) {
            item.ingredientId = resolved;
          }
        }
      }
    }
  }

  // =========================================================================
  // PUBLIC ACCESSORS & PERFORMANCE PROJECTIONS
  // =========================================================================

  /**
   * Retrieve all ingredients (full objects)
   */
  public getAllIngredients(): Ingredient[] {
    return this.ingredients;
  }

  /**
   * Retrieve lightweight projected summaries for home grid and cards.
   * Significantly reduces memory and initial render overhead.
   */
  public getIngredientSummaries(): IngredientSummary[] {
    if (this.memoizedIngredientSummaries) {
      return this.memoizedIngredientSummaries;
    }

    this.memoizedIngredientSummaries = this.ingredients.map(ing => ({
      id: ing.id,
      slug: ing.slug || ing.id,
      name: ing.name,
      scientificName: ing.scientificName,
      category: ing.category,
      origin: ing.origin,
      region: ing.region,
      country: ing.country,
      season: ing.season,
      rarityIndex: ing.rarityIndex,
      imageUrl: ing.imageUrl,
      flavorNotes: ing.flavorNotes,
      flavorProfile: ing.flavorProfile,
      shortDescription: ing.description.length > 120 ? ing.description.slice(0, 117) + '...' : ing.description
    }));

    return this.memoizedIngredientSummaries;
  }

  /**
   * Retrieve all recipes (full objects)
   */
  public getAllRecipes(): CulinaryMasterclass[] {
    return this.recipes;
  }

  /**
   * Retrieve lightweight projected recipe summaries
   */
  public getRecipeSummaries(): RecipeSummary[] {
    if (this.memoizedRecipeSummaries) {
      return this.memoizedRecipeSummaries;
    }

    this.memoizedRecipeSummaries = this.recipes.map(rec => ({
      id: rec.id,
      slug: rec.slug || rec.id,
      dishTitle: rec.dishTitle,
      subtitle: rec.subtitle,
      cuisine: rec.cuisine,
      courseCategory: rec.courseCategory,
      difficulty: rec.difficulty,
      servings: rec.servings,
      overallDurationFormatted: rec.overallDurationFormatted,
      heroImageUrl: rec.heroImageUrl,
      primaryIngredientId: rec.primaryIngredientId,
      primaryIngredientName: rec.primaryIngredientName,
      primaryIngredientSlug: rec.primaryIngredientSlug,
      tags: rec.tags,
      trendScore: rec.trendScore,
      hotnessRank: rec.hotnessRank
    }));

    return this.memoizedRecipeSummaries;
  }

  /**
   * Fast O(1) lookup of ingredient by ID or Slug
   */
  public getIngredient(idOrSlug: string): Ingredient | undefined {
    if (!idOrSlug) return undefined;
    return this.ingredientSlugMap.get(idOrSlug) || this.ingredientIdMap.get(idOrSlug);
  }

  /**
   * Fast O(1) lookup of recipe by ID or Slug
   */
  public getRecipe(idOrSlug: string): CulinaryMasterclass | undefined {
    if (!idOrSlug) return undefined;
    return this.recipeSlugMap.get(idOrSlug) || this.recipeIdMap.get(idOrSlug);
  }

  /**
   * Get all recipes connected to an ingredient (instant O(1) retrieval via InternalLinkingEngine)
   */
  public getRelatedRecipesForIngredient(ingredientIdOrSlug: string, limit = 4): CulinaryMasterclass[] {
    return internalLinkingEngine.getRecipesForIngredient(ingredientIdOrSlug, limit);
  }

  /**
   * Get all ingredients connected to a recipe (instant O(1) retrieval via InternalLinkingEngine)
   */
  public getConnectedIngredientsForRecipe(recipeIdOrSlug: string, limit = 8): Ingredient[] {
    return internalLinkingEngine.getConnectedIngredientsForRecipe(recipeIdOrSlug, limit);
  }

  /**
   * Get related ingredients based on multi-factor graph scoring (via InternalLinkingEngine)
   */
  public getRelatedIngredients(ingredientIdOrSlug: string, limit = 4): Ingredient[] {
    return internalLinkingEngine.getRelatedIngredients(ingredientIdOrSlug, limit);
  }

  /**
   * Filter ingredients with memoized caching
   */
  public filterIngredients(options: {
    category?: string;
    region?: string;
    season?: string;
    rarity?: string;
    origin?: string;
  }): Ingredient[] {
    const cacheKey = `filt_ing_${options.category || ''}_${options.region || ''}_${options.season || ''}_${options.rarity || ''}_${options.origin || ''}`;
    const cached = this.queryCache.get(cacheKey);
    if (cached) {
      return cached.map(id => this.ingredientIdMap.get(id)!).filter(Boolean);
    }

    let candidates: Ingredient[] = this.ingredients;

    if (options.category && options.category !== 'All Categories') {
      const ids = this.ingredientsByCategory.get(options.category);
      if (ids) {
        candidates = candidates.filter(i => ids.has(i.id));
      } else {
        return [];
      }
    }

    if (options.region && options.region !== 'All Terroirs' && options.region !== 'All Regions') {
      const ids = this.ingredientsByRegion.get(options.region);
      if (ids) {
        candidates = candidates.filter(i => ids.has(i.id));
      } else {
        return [];
      }
    }

    if (options.season && options.season !== 'All Seasons') {
      candidates = candidates.filter(i => i.season === options.season);
    }

    if (options.rarity && options.rarity !== 'All Rarities') {
      candidates = candidates.filter(i => i.rarityIndex === options.rarity);
    }

    if (options.origin && options.origin !== 'All Origins') {
      candidates = candidates.filter(i => i.country === options.origin);
    }

    this.queryCache.set(cacheKey, candidates.map(i => i.id));
    return candidates;
  }

  /**
   * Get diagnostic report of broken relationships or collisions
   */
  public getIntegrityStatus(): {
    totalIngredients: number;
    totalRecipes: number;
    brokenRelationshipCount: number;
    brokenRelationships: BrokenRelationshipNotice[];
  } {
    return {
      totalIngredients: this.ingredients.length,
      totalRecipes: this.recipes.length,
      brokenRelationshipCount: this.brokenRelationships.length,
      brokenRelationships: this.brokenRelationships
    };
  }
}

// Global Content Registry Instance
export const contentRegistry = new ContentRegistry();
