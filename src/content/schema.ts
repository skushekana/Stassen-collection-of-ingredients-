import {
  Ingredient,
  IngredientCategory,
  WorldRegion,
  HarvestSeason,
  RarityLevel,
  FlavorProfile,
  FlavorPairing,
  CulinaryMasterclass,
  MasterclassStep,
  CulinaryTool,
  ContentSEOInfo
} from '../types';

/**
 * Permitted taxonomy constants for validation
 */
export const VALID_INGREDIENT_CATEGORIES: ReadonlyArray<IngredientCategory> = [
  'Rare Spices',
  'Foraged Botanicals',
  'Heritage Salts & Minerals',
  'Ferments & Vinegars',
  'Ancient Grains & Seeds',
  'Wild Fungi & Truffles',
  'Specialty Oils & Fats',
  'Cultivated Teas & Tisanes',
  'Artisanal Nectars & Sugars'
] as const;

export const VALID_WORLD_REGIONS: ReadonlyArray<WorldRegion> = [
  'East Asia',
  'Mediterranean & Southern Europe',
  'Nordic & Boreal',
  'South Asia & Indian Ocean',
  'Levant & North Africa',
  'The Americas',
  'Oceania & Highlands'
] as const;

export const VALID_HARVEST_SEASONS: ReadonlyArray<HarvestSeason> = [
  'Spring',
  'Summer',
  'Autumn',
  'Winter',
  'Perennial / Year-Round'
] as const;

export const VALID_RARITY_LEVELS: ReadonlyArray<RarityLevel> = [
  'Heirloom Selection',
  'Regional Specialty',
  'Rare Seasonal Harvest',
  'Ultra Rare Reserve'
] as const;

export const VALID_RECIPE_DIFFICULTIES: ReadonlyArray<CulinaryMasterclass['difficulty']> = [
  'Easy',
  'Intermediate',
  'Advanced',
  'Master',
  'Artisanal Selection',
  'Grand Master Atelier',
  'Haute Gastronomy'
] as const;

/**
 * Permissive Input Schema for Ingredients (supports both official names and convenience aliases)
 */
export interface IngredientInputSchema {
  id?: string;
  slug?: string;
  name: string;
  scientificName?: string;
  category: IngredientCategory | string;
  origin?: string;
  region?: WorldRegion | string;
  country?: string;
  season?: HarvestSeason | string;
  harvestWindow?: string;
  flavorNotes?: string[];
  flavorProfile?: Partial<FlavorProfile>;
  imageUrl?: string;
  image?: string; // Schema alias
  galleryImages?: string[];
  videoUrl?: string;
  overview?: string;
  description: string;
  terroir?: string;
  culinaryApplications?: string[];
  pairings?: FlavorPairing[];
  relatedIngredientIds?: string[];
  aliases?: string[];
  relatedRecipeIds?: string[];
  rarityIndex?: RarityLevel | string;
  storageAdvice?: string;
  curatorNotes?: string;
  harvestMethod?: string;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
  seo?: ContentSEOInfo;
}

/**
 * Permissive Input Schema for Recipes (supports both official names and convenience aliases)
 */
export interface RecipeInputSchema {
  id?: string;
  slug?: string;
  dishTitle?: string;
  name?: string; // Schema alias
  subtitle?: string;
  overview?: string;
  description?: string; // Schema alias
  chefRationale?: string;
  cuisine?: string;
  countryRegion?: string;
  category?: string; // Course category or cuisine alias
  courseCategory?: CulinaryMasterclass['courseCategory'];
  recipeNumber?: number;
  difficulty?: CulinaryMasterclass['difficulty'] | string;
  servings?: number;
  totalPrepTimeMinutes?: number;
  totalCookTimeMinutes?: number;
  overallDurationFormatted?: string;
  flavorAromaProfile?: Partial<CulinaryMasterclass['flavorAromaProfile']>;
  requiredTools?: CulinaryTool[];
  ingredientsList?: Array<{
    name: string;
    amount: string;
    prepState?: string;
    addedAtMinute?: number;
    isArchiveSpecialty?: boolean;
    ingredientId?: string;
    ingredientSlug?: string;
  }>;
  ingredients?: any[]; // Schema alias
  timelineSteps?: MasterclassStep[];
  instructions?: Array<MasterclassStep | string>; // Schema alias
  platingPresentation?: string;
  sommelierPairing?: {
    vintage: string;
    terroir: string;
    tastingNote: string;
  };
  nutritionalProfile?: CulinaryMasterclass['nutritionalProfile'];
  heroImageUrl?: string;
  imageUrl?: string; // Schema alias
  image?: string; // Schema alias
  galleryImages?: string[];
  videoReelUrl?: string;
  tags?: string[];
  trendScore?: number;
  hotnessRank?: number;
  isHottest?: boolean;
  awardBadge?: string;
  primaryIngredientId?: string;
  primaryIngredientSlug?: string;
  primaryIngredientName?: string;
  relatedRecipeIds?: string[];
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
  seo?: ContentSEOInfo;
  createdAt?: string;
}

/**
 * Detailed validation result container
 */
export interface ValidationResult<T> {
  isValid: boolean;
  data?: T;
  errors: string[];
  warnings: string[];
  originalInput: unknown;
  qualityScore?: number; // 0 - 100
  seoScore?: number; // 0 - 100
  nearDuplicateMatch?: {
    matchedId: string;
    matchedTitle: string;
    similarity: number;
  };
  keywordStuffingDetected?: boolean;
}

/**
 * Batch import results container
 */
export interface BatchImportResult<T> {
  totalSubmitted: number;
  totalImported: number;
  totalSkipped: number;
  totalFailed: number;
  successfulItems: T[];
  failedItems: Array<{
    index: number;
    input: unknown;
    errors: string[];
  }>;
  warnings: string[];
  durationMs: number;
}

/**
 * Single record import audit result
 */
export interface ImportRecordResult {
  index: number;
  type: 'ingredient' | 'recipe' | 'unknown';
  id?: string;
  slug?: string;
  name: string;
  status: 'imported' | 'updated' | 'rejected' | 'dry_run';
  errors: string[];
  warnings: string[];
  rawInput?: unknown;
  qualityScore?: number;
  seoScore?: number;
  nearDuplicateMatch?: {
    matchedId: string;
    matchedTitle: string;
    similarity: number;
  };
}

/**
 * Unified batch import results container for single or combined datasets
 */
export interface UnifiedBatchImportResult {
  totalSubmitted: number;
  totalImported: number;
  totalIngredientsImported: number;
  totalRecipesImported: number;
  totalSkipped: number;
  totalFailed: number;
  successfulIngredients: Ingredient[];
  successfulRecipes: CulinaryMasterclass[];
  records: ImportRecordResult[];
  failedRecords: ImportRecordResult[];
  allWarnings: string[];
  durationMs: number;
  isDryRun?: boolean;
  averageQualityScore?: number;
  averageSeoScore?: number;
}

/**
 * Options for batch imports
 */
export interface BatchImportOptions {
  allowUpdates?: boolean; // Overwrite existing records with same ID (default: false for safety)
  resolveSlugCollisions?: boolean; // If true, auto-appends -2, -3 to duplicate slugs (default: true)
  strictMode?: boolean; // If true, warnings become failures
  dryRun?: boolean; // Validate only, do not commit to in-memory/storage registry
  checkNearDuplicates?: boolean; // If true, checks for near-duplicate text similarity (default: true)
}

/**
 * System-wide content integrity and quality report
 */
export interface ContentIntegrityReport {
  timestamp: string;
  totalIngredients: number;
  totalRecipes: number;
  duplicateIngredientIds: string[];
  duplicateIngredientSlugs: string[];
  duplicateRecipeIds: string[];
  duplicateRecipeSlugs: string[];
  orphanRecipePrimaryIngredients: Array<{ recipeId: string; missingIngredientId: string }>;
  unresolvedIngredientRecipeLinks: Array<{ ingredientId: string; missingRecipeId: string }>;
  unlinkedRecipes: string[]; // Recipes with no matched ingredients
  missingImages: {
    ingredients: string[];
    recipes: string[];
  };
  missingSeoInformation: {
    ingredients: string[];
    recipes: string[];
  };
  thinOrShortDescriptions: {
    ingredients: string[];
    recipes: string[];
  };
  nearDuplicateContent: Array<{
    type: 'ingredient' | 'recipe';
    id: string;
    matchingId: string;
    similarity: number;
  }>;
  keywordStuffingIssues: Array<{
    id: string;
    type: 'ingredient' | 'recipe';
    word: string;
    densityPercent: number;
  }>;
  invalidTimingOrServings: Array<{
    recipeId: string;
    issue: string;
  }>;
  brokenIngredientReferences: Array<{
    recipeId: string;
    ingredientRef: string;
  }>;
  contentQualityScore: number; // 0 - 100
  seoHealthScore: number; // 0 - 100
  overallHealthScore: number; // 0 - 100
}
