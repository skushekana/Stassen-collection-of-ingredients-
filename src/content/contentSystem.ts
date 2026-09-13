import { Ingredient, CulinaryMasterclass } from '../types';
import {
  IngredientInputSchema,
  RecipeInputSchema,
  ValidationResult,
  BatchImportResult,
  BatchImportOptions,
  ContentIntegrityReport,
  UnifiedBatchImportResult,
  ImportRecordResult
} from './schema';
import { validateIngredient, validateRecipe, ValidationContext } from './validator';
import { relationshipManager } from './relationshipManager';
import { ingredientService } from '../services/ingredientService';
import { recipeService } from '../services/recipeService';
import {
  parseIngredientsFromCsv,
  parseRecipesFromCsv,
  ingredientsToCsv,
  recipesToCsv,
  generateSampleIngredientCsv,
  generateSampleRecipeCsv
} from './csvParser';
import {
  extractSubstantiveWords,
  analyzeKeywordStuffing,
  ScalableSimilarityIndex
} from './qualityValidator';

/**
 * Scalable Content-Data System Coordinator
 * Orchestrates validation, deduplication, indexing, and bidirectional relationships
 * for expanding Stassen's Collection to 1,000+ ingredients and thousands of recipes.
 */
export class ContentSystem {
  /**
   * Validate a single ingredient record
   */
  public static validateIngredientRecord(
    input: unknown,
    options: { allowUpdates?: boolean; resolveCollisions?: boolean } = {}
  ): ValidationResult<Ingredient> {
    const allIngredients = ingredientService.getAllIngredients();
    const existingIds = new Set(allIngredients.map(i => i.id));
    const existingSlugs = new Set(allIngredients.map(i => i.slug || i.id));
    const slugOwnerMap = new Map(allIngredients.map(i => [i.slug || i.id, i.id]));

    const context: ValidationContext = {
      existingIngredientIds: existingIds,
      existingIngredientSlugs: existingSlugs,
      ingredientSlugOwnerMap: slugOwnerMap,
      allowUpdates: options.allowUpdates ?? false,
      resolveCollisions: options.resolveCollisions ?? true
    };

    return validateIngredient(input, context);
  }

  /**
   * Validate a single recipe record
   */
  public static validateRecipeRecord(
    input: unknown,
    options: { allowUpdates?: boolean; resolveCollisions?: boolean } = {}
  ): ValidationResult<CulinaryMasterclass> {
    const allRecipes = recipeService.getAllRecipes();
    const existingIds = new Set(allRecipes.map(r => r.id));
    const existingSlugs = new Set(allRecipes.map(r => r.slug || r.id));
    const slugOwnerMap = new Map(allRecipes.map(r => [r.slug || r.id, r.id]));

    const context: ValidationContext = {
      existingRecipeIds: existingIds,
      existingRecipeSlugs: existingSlugs,
      recipeSlugOwnerMap: slugOwnerMap,
      allowUpdates: options.allowUpdates ?? false,
      resolveCollisions: options.resolveCollisions ?? true
    };

    return validateRecipe(input, context);
  }

  /**
   * Batch import ingredients with safety validation, collision prevention,
   * and automatic indexing.
   */
  public static importIngredients(
    items: unknown[],
    options: BatchImportOptions = {}
  ): BatchImportResult<Ingredient> {
    const startTime = Date.now();
    const successfulItems: Ingredient[] = [];
    const failedItems: BatchImportResult<Ingredient>['failedItems'] = [];
    const warnings: string[] = [];

    if (!Array.isArray(items)) {
      return {
        totalSubmitted: 0,
        totalImported: 0,
        totalSkipped: 0,
        totalFailed: 1,
        successfulItems: [],
        failedItems: [{ index: 0, input: items, errors: ['Items must be provided as a JSON array.'] }],
        warnings: ['Input was not an array.'],
        durationMs: Date.now() - startTime
      };
    }

    const allIngredients = ingredientService.getAllIngredients();
    const existingIds = new Set(allIngredients.map(i => i.id));
    const existingSlugs = new Set(allIngredients.map(i => i.slug || i.id));
    const slugOwnerMap = new Map(allIngredients.map(i => [i.slug || i.id, i.id]));

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const context: ValidationContext = {
        existingIngredientIds: existingIds,
        existingIngredientSlugs: existingSlugs,
        ingredientSlugOwnerMap: slugOwnerMap,
        allowUpdates: options.allowUpdates ?? false,
        resolveCollisions: options.resolveSlugCollisions ?? true
      };

      const result = validateIngredient(item, context);

      if (result.isValid && result.data) {
        // Collect warnings
        if (result.warnings.length > 0) {
          warnings.push(`Item #${i + 1} (${result.data.name}): ${result.warnings.join('; ')}`);
        }

        // Register in transient sets to prevent intra-batch collision
        existingIds.add(result.data.id);
        if (result.data.slug) {
          existingSlugs.add(result.data.slug);
          slugOwnerMap.set(result.data.slug, result.data.id);
        }

        successfulItems.push(result.data);

        // Commit to live service unless dry run
        if (!options.dryRun) {
          ingredientService.registerIngredient(result.data);
          relationshipManager.indexIngredient(result.data);
        }
      } else {
        failedItems.push({
          index: i,
          input: item,
          errors: result.errors
        });
      }
    }

    return {
      totalSubmitted: items.length,
      totalImported: successfulItems.length,
      totalSkipped: 0,
      totalFailed: failedItems.length,
      successfulItems,
      failedItems,
      warnings,
      durationMs: Date.now() - startTime
    };
  }

  /**
   * Batch import recipes with safety validation, collision prevention,
   * and automatic bidirectional relationship linking.
   */
  public static importRecipes(
    items: unknown[],
    options: BatchImportOptions = {}
  ): BatchImportResult<CulinaryMasterclass> {
    const startTime = Date.now();
    const successfulItems: CulinaryMasterclass[] = [];
    const failedItems: BatchImportResult<CulinaryMasterclass>['failedItems'] = [];
    const warnings: string[] = [];

    if (!Array.isArray(items)) {
      return {
        totalSubmitted: 0,
        totalImported: 0,
        totalSkipped: 0,
        totalFailed: 1,
        successfulItems: [],
        failedItems: [{ index: 0, input: items, errors: ['Items must be provided as a JSON array.'] }],
        warnings: ['Input was not an array.'],
        durationMs: Date.now() - startTime
      };
    }

    const allRecipes = recipeService.getAllRecipes();
    const existingIds = new Set(allRecipes.map(r => r.id));
    const existingSlugs = new Set(allRecipes.map(r => r.slug || r.id));
    const slugOwnerMap = new Map(allRecipes.map(r => [r.slug || r.id, r.id]));

    const allIngredients = ingredientService.getAllIngredients();
    const ingredientsMap = new Map(allIngredients.map(i => [i.id, i]));

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const context: ValidationContext = {
        existingRecipeIds: existingIds,
        existingRecipeSlugs: existingSlugs,
        recipeSlugOwnerMap: slugOwnerMap,
        allowUpdates: options.allowUpdates ?? false,
        resolveCollisions: options.resolveSlugCollisions ?? true
      };

      const result = validateRecipe(item, context);

      if (result.isValid && result.data) {
        if (result.warnings.length > 0) {
          warnings.push(`Recipe #${i + 1} (${result.data.dishTitle}): ${result.warnings.join('; ')}`);
        }

        // Intra-batch collision tracking
        existingIds.add(result.data.id);
        if (result.data.slug) {
          existingSlugs.add(result.data.slug);
          slugOwnerMap.set(result.data.slug, result.data.id);
        }

        successfulItems.push(result.data);

        // Commit to live service unless dry run
        if (!options.dryRun) {
          recipeService.registerRecipe(result.data);
          relationshipManager.indexRecipe(result.data, ingredientsMap);
        }
      } else {
        failedItems.push({
          index: i,
          input: item,
          errors: result.errors
        });
      }
    }

    return {
      totalSubmitted: items.length,
      totalImported: successfulItems.length,
      totalSkipped: 0,
      totalFailed: failedItems.length,
      successfulItems,
      failedItems,
      warnings,
      durationMs: Date.now() - startTime
    };
  }

  /**
   * Unified safe batch importer supporting JSON or CSV strings, arrays, or combined datasets.
   * Features:
   * - Format auto-detection (JSON array, JSON combined catalog, or standard RFC 4180 CSV)
   * - Strict field validation, collision prevention, and intra-batch deduplication
   * - Safe mode: rejects duplicate IDs by default unless allowUpdates is explicitly true
   * - Auto-resolves slug collisions to prevent URL routing conflicts
   * - Auto-connects recipe-to-ingredient bidirectional links using stable IDs
   * - Granular per-record audit results with exact validation error breakdowns
   * - Zero-crash guarantee: bad records are quarantined without affecting valid items
   */
  public static importDataset(
    rawInput: unknown,
    options: BatchImportOptions & { targetType?: 'auto' | 'ingredients' | 'recipes' | 'combined' } = {}
  ): UnifiedBatchImportResult {
    const startTime = Date.now();
    const records: ImportRecordResult[] = [];
    const failedRecords: ImportRecordResult[] = [];
    const allWarnings: string[] = [];
    const successfulIngredients: Ingredient[] = [];
    const successfulRecipes: CulinaryMasterclass[] = [];

    const isDryRun = Boolean(options.dryRun);
    const allowUpdates = Boolean(options.allowUpdates);
    const resolveCollisions = options.resolveSlugCollisions !== false;

    // Step 1: Parse and normalize input into discrete ingredient and recipe raw items
    let rawIngredientsList: unknown[] = [];
    let rawRecipesList: unknown[] = [];
    const targetType = options.targetType || 'auto';

    if (typeof rawInput === 'string') {
      const trimmed = rawInput.trim();
      if (!trimmed) {
        return {
          totalSubmitted: 0,
          totalImported: 0,
          totalIngredientsImported: 0,
          totalRecipesImported: 0,
          totalSkipped: 0,
          totalFailed: 1,
          successfulIngredients: [],
          successfulRecipes: [],
          records: [{
            index: 0,
            type: 'unknown',
            name: 'Empty Input',
            status: 'rejected',
            errors: ['The provided input data is empty.'],
            warnings: []
          }],
          failedRecords: [{
            index: 0,
            type: 'unknown',
            name: 'Empty Input',
            status: 'rejected',
            errors: ['The provided input data is empty.'],
            warnings: []
          }],
          allWarnings: [],
          durationMs: Date.now() - startTime,
          isDryRun
        };
      }

      // Check if JSON
      if (trimmed.startsWith('{') || trimmed.startsWith('[')) {
        try {
          const parsed = JSON.parse(trimmed);
          if (Array.isArray(parsed)) {
            if (targetType === 'recipes') {
              rawRecipesList = parsed;
            } else if (targetType === 'ingredients') {
              rawIngredientsList = parsed;
            } else {
              // Auto-classify items
              for (const item of parsed) {
                if (item && typeof item === 'object' && ('dishTitle' in item || 'timelineSteps' in item || 'cuisine' in item || 'courseCategory' in item)) {
                  rawRecipesList.push(item);
                } else {
                  rawIngredientsList.push(item);
                }
              }
            }
          } else if (parsed && typeof parsed === 'object') {
            const obj = parsed as Record<string, any>;
            if (Array.isArray(obj.ingredients)) {
              rawIngredientsList = obj.ingredients;
            }
            if (Array.isArray(obj.recipes)) {
              rawRecipesList = obj.recipes;
            }
            if (!Array.isArray(obj.ingredients) && !Array.isArray(obj.recipes)) {
              // Single item object
              if ('dishTitle' in obj || 'timelineSteps' in obj || 'cuisine' in obj) {
                rawRecipesList = [obj];
              } else {
                rawIngredientsList = [obj];
              }
            }
          }
        } catch (jsonErr: any) {
          return {
            totalSubmitted: 0,
            totalImported: 0,
            totalIngredientsImported: 0,
            totalRecipesImported: 0,
            totalSkipped: 0,
            totalFailed: 1,
            successfulIngredients: [],
            successfulRecipes: [],
            records: [{
              index: 0,
              type: 'unknown',
              name: 'Malformed JSON',
              status: 'rejected',
              errors: [`Invalid JSON syntax: ${jsonErr?.message || 'Parse error'}`],
              warnings: []
            }],
            failedRecords: [{
              index: 0,
              type: 'unknown',
              name: 'Malformed JSON',
              status: 'rejected',
              errors: [`Invalid JSON syntax: ${jsonErr?.message || 'Parse error'}`],
              warnings: []
            }],
            allWarnings: [],
            durationMs: Date.now() - startTime,
            isDryRun
          };
        }
      } else {
        // Treat as CSV data
        const firstLine = trimmed.split(/\r?\n/)[0].toLowerCase();
        const looksLikeRecipeCsv = targetType === 'recipes' ||
          (targetType === 'auto' && (
            firstLine.includes('dishtitle') ||
            firstLine.includes('cuisine') ||
            firstLine.includes('instructions') ||
            firstLine.includes('cooktime') ||
            firstLine.includes('preptime')
          ));

        if (looksLikeRecipeCsv) {
          rawRecipesList = parseRecipesFromCsv(trimmed);
        } else {
          rawIngredientsList = parseIngredientsFromCsv(trimmed);
        }
      }
    } else if (Array.isArray(rawInput)) {
      if (targetType === 'recipes') {
        rawRecipesList = rawInput;
      } else if (targetType === 'ingredients') {
        rawIngredientsList = rawInput;
      } else {
        for (const item of rawInput) {
          if (item && typeof item === 'object' && ('dishTitle' in item || 'timelineSteps' in item || 'cuisine' in item || 'courseCategory' in item)) {
            rawRecipesList.push(item);
          } else {
            rawIngredientsList.push(item);
          }
        }
      }
    } else if (rawInput && typeof rawInput === 'object') {
      const obj = rawInput as Record<string, any>;
      if (Array.isArray(obj.ingredients)) rawIngredientsList = obj.ingredients;
      if (Array.isArray(obj.recipes)) rawRecipesList = obj.recipes;
      if (!Array.isArray(obj.ingredients) && !Array.isArray(obj.recipes)) {
        if ('dishTitle' in obj || 'timelineSteps' in obj) {
          rawRecipesList = [obj];
        } else {
          rawIngredientsList = [obj];
        }
      }
    }

    // Step 2: Validate and Ingest Ingredients First
    const allExistingIngredients = ingredientService.getAllIngredients();
    const existingIngIds = new Set(allExistingIngredients.map(i => i.id));
    const existingIngSlugs = new Set(allExistingIngredients.map(i => i.slug || i.id));
    const ingSlugOwnerMap = new Map(allExistingIngredients.map(i => [i.slug || i.id, i.id]));

    // Batch tracking sets to detect intra-batch duplicates
    const batchIngredientIds = new Set<string>();
    const batchIngredientSlugs = new Set<string>();
    const batchRecipeIds = new Set<string>();
    const batchRecipeSlugs = new Set<string>();

    // Similarity index for near-duplicate detection across catalog + batch
    const batchSimilarityIndex = new ScalableSimilarityIndex();
    for (const ing of allExistingIngredients) {
      batchSimilarityIndex.addItem(ing.id, ing.name, ing.description || ing.overview);
    }
    const allExistingRecipesForIndex = recipeService.getAllRecipes();
    for (const rec of allExistingRecipesForIndex) {
      batchSimilarityIndex.addItem(rec.id, rec.dishTitle, rec.overview || rec.description);
    }

    let globalRowCounter = 1;

    for (const rawIng of rawIngredientsList) {
      const rowIndex = globalRowCounter++;
      const ingName = typeof rawIng === 'object' && rawIng !== null ? (rawIng as any).name || (rawIng as any).title || `Specimen #${rowIndex}` : `Specimen #${rowIndex}`;

      const ingContext: ValidationContext = {
        existingIngredientIds: existingIngIds,
        existingIngredientSlugs: existingIngSlugs,
        ingredientSlugOwnerMap: ingSlugOwnerMap,
        batchIngredientIds,
        batchIngredientSlugs,
        batchRecipeIds,
        batchRecipeSlugs,
        allowUpdates,
        resolveCollisions,
        checkNearDuplicates: options.checkNearDuplicates !== false,
        similarityIndex: batchSimilarityIndex
      };

      const result = validateIngredient(rawIng, ingContext);

      if (result.isValid && result.data) {
        const item = result.data;
        const isUpdate = existingIngIds.has(item.id);

        // Update tracking to prevent intra-batch collision
        existingIngIds.add(item.id);
        batchIngredientIds.add(item.id);
        if (item.slug) {
          existingIngSlugs.add(item.slug);
          batchIngredientSlugs.add(item.slug);
          ingSlugOwnerMap.set(item.slug, item.id);
        }

        // Register in similarity index so subsequent items in batch can be checked
        batchSimilarityIndex.addItem(item.id, item.name, item.description || item.overview);

        successfulIngredients.push(item);
        if (result.warnings.length > 0) {
          allWarnings.push(`Ingredient "${item.name}": ${result.warnings.join('; ')}`);
        }

        if (!isDryRun) {
          ingredientService.registerIngredient(item);
          relationshipManager.indexIngredient(item);
        }

        const recordResult: ImportRecordResult = {
          index: rowIndex,
          type: 'ingredient',
          id: item.id,
          slug: item.slug,
          name: item.name,
          status: isDryRun ? 'dry_run' : (isUpdate ? 'updated' : 'imported'),
          errors: [],
          warnings: result.warnings,
          rawInput: rawIng,
          qualityScore: result.qualityScore,
          seoScore: result.seoScore,
          nearDuplicateMatch: result.nearDuplicateMatch
        };
        records.push(recordResult);
      } else {
        const recordResult: ImportRecordResult = {
          index: rowIndex,
          type: 'ingredient',
          name: ingName,
          status: 'rejected',
          errors: result.errors,
          warnings: result.warnings,
          rawInput: rawIng,
          qualityScore: result.qualityScore,
          seoScore: result.seoScore,
          nearDuplicateMatch: result.nearDuplicateMatch
        };
        records.push(recordResult);
        failedRecords.push(recordResult);
      }
    }

    // Step 3: Validate and Ingest Recipes Second
    const allExistingRecipes = recipeService.getAllRecipes();
    const existingRecIds = new Set(allExistingRecipes.map(r => r.id));
    const existingRecSlugs = new Set(allExistingRecipes.map(r => r.slug || r.id));
    const recSlugOwnerMap = new Map(allExistingRecipes.map(r => [r.slug || r.id, r.id]));

    // Updated ingredient catalog maps for reliable bi-directional linking
    const activeIngredients = ingredientService.getAllIngredients();
    const activeIngredientsMap = new Map(activeIngredients.map(i => [i.id, i]));
    const knownIngredientIds = new Set([
      ...activeIngredients.map(i => i.id),
      ...batchIngredientIds
    ]);
    const knownIngredientSlugs = new Set([
      ...activeIngredients.map(i => i.slug || i.id),
      ...batchIngredientSlugs
    ]);

    for (const rawRec of rawRecipesList) {
      const rowIndex = globalRowCounter++;
      const dishTitle = typeof rawRec === 'object' && rawRec !== null ? (rawRec as any).dishTitle || (rawRec as any).name || `Recipe #${rowIndex}` : `Recipe #${rowIndex}`;

      const recContext: ValidationContext = {
        existingRecipeIds: existingRecIds,
        existingRecipeSlugs: existingRecSlugs,
        recipeSlugOwnerMap: recSlugOwnerMap,
        knownIngredientIds,
        knownIngredientSlugs,
        batchIngredientIds,
        batchIngredientSlugs,
        batchRecipeIds,
        batchRecipeSlugs,
        allowUpdates,
        resolveCollisions,
        checkNearDuplicates: options.checkNearDuplicates !== false,
        similarityIndex: batchSimilarityIndex
      };

      const result = validateRecipe(rawRec, recContext);

      if (result.isValid && result.data) {
        const recipe = result.data;
        const isUpdate = existingRecIds.has(recipe.id);

        // Update tracking to prevent intra-batch collisions
        existingRecIds.add(recipe.id);
        batchRecipeIds.add(recipe.id);
        if (recipe.slug) {
          existingRecSlugs.add(recipe.slug);
          batchRecipeSlugs.add(recipe.slug);
          recSlugOwnerMap.set(recipe.slug, recipe.id);
        }

        // Register in similarity index for subsequent records
        batchSimilarityIndex.addItem(recipe.id, recipe.dishTitle, recipe.overview || recipe.description);

        successfulRecipes.push(recipe);
        if (result.warnings.length > 0) {
          allWarnings.push(`Recipe "${recipe.dishTitle}": ${result.warnings.join('; ')}`);
        }

        if (!isDryRun) {
          recipeService.registerRecipe(recipe);
          relationshipManager.indexRecipe(recipe, activeIngredientsMap);
        }

        const recordResult: ImportRecordResult = {
          index: rowIndex,
          type: 'recipe',
          id: recipe.id,
          slug: recipe.slug,
          name: recipe.dishTitle,
          status: isDryRun ? 'dry_run' : (isUpdate ? 'updated' : 'imported'),
          errors: [],
          warnings: result.warnings,
          rawInput: rawRec,
          qualityScore: result.qualityScore,
          seoScore: result.seoScore,
          nearDuplicateMatch: result.nearDuplicateMatch
        };
        records.push(recordResult);
      } else {
        const recordResult: ImportRecordResult = {
          index: rowIndex,
          type: 'recipe',
          name: dishTitle,
          status: 'rejected',
          errors: result.errors,
          warnings: result.warnings,
          rawInput: rawRec,
          qualityScore: result.qualityScore,
          seoScore: result.seoScore,
          nearDuplicateMatch: result.nearDuplicateMatch
        };
        records.push(recordResult);
        failedRecords.push(recordResult);
      }
    }

    const totalSubmitted = rawIngredientsList.length + rawRecipesList.length;
    const totalImported = successfulIngredients.length + successfulRecipes.length;

    // Calculate aggregated quality and SEO averages
    const qualityScores = records
      .map(r => r.qualityScore)
      .filter((s): s is number => typeof s === 'number');
    const averageQualityScore = qualityScores.length > 0
      ? Math.round(qualityScores.reduce((a, b) => a + b, 0) / qualityScores.length)
      : undefined;

    const seoScores = records
      .map(r => r.seoScore)
      .filter((s): s is number => typeof s === 'number');
    const averageSeoScore = seoScores.length > 0
      ? Math.round(seoScores.reduce((a, b) => a + b, 0) / seoScores.length)
      : undefined;

    return {
      totalSubmitted,
      totalImported,
      totalIngredientsImported: successfulIngredients.length,
      totalRecipesImported: successfulRecipes.length,
      totalSkipped: 0,
      totalFailed: failedRecords.length,
      successfulIngredients,
      successfulRecipes,
      records,
      failedRecords,
      allWarnings,
      durationMs: Date.now() - startTime,
      isDryRun,
      averageQualityScore,
      averageSeoScore
    };
  }

  /**
   * Export all ingredients as formatted CSV
   */
  public static exportIngredientsCsv(): string {
    return ingredientsToCsv(ingredientService.getAllIngredients());
  }

  /**
   * Export all recipes as formatted CSV
   */
  public static exportRecipesCsv(): string {
    return recipesToCsv(recipeService.getAllRecipes());
  }

  /**
   * Generate sample CSV starter templates
   */
  public static generateSampleCsvs(): {
    ingredientCsv: string;
    recipeCsv: string;
  } {
    return {
      ingredientCsv: generateSampleIngredientCsv(),
      recipeCsv: generateSampleRecipeCsv()
    };
  }

  /**
   * Comprehensive content integrity audit
   * Scans entire database for duplicate IDs, duplicate slugs, broken links,
   * missing images, and missing SEO parameters.
   */
  public static verifyIntegrity(): ContentIntegrityReport {
    const ingredients = ingredientService.getAllIngredients();
    const recipes = recipeService.getAllRecipes();

    // Check duplicate ingredient IDs
    const ingIdCount = new Map<string, number>();
    const dupIngIds: string[] = [];
    for (const ing of ingredients) {
      const count = (ingIdCount.get(ing.id) || 0) + 1;
      ingIdCount.set(ing.id, count);
      if (count === 2) dupIngIds.push(ing.id);
    }

    // Check duplicate ingredient Slugs
    const ingSlugCount = new Map<string, number>();
    const dupIngSlugs: string[] = [];
    for (const ing of ingredients) {
      const slug = ing.slug || ing.id;
      const count = (ingSlugCount.get(slug) || 0) + 1;
      ingSlugCount.set(slug, count);
      if (count === 2) dupIngSlugs.push(slug);
    }

    // Check duplicate recipe IDs
    const recIdCount = new Map<string, number>();
    const dupRecIds: string[] = [];
    for (const rec of recipes) {
      const count = (recIdCount.get(rec.id) || 0) + 1;
      recIdCount.set(rec.id, count);
      if (count === 2) dupRecIds.push(rec.id);
    }

    // Check duplicate recipe Slugs
    const recSlugCount = new Map<string, number>();
    const dupRecSlugs: string[] = [];
    for (const rec of recipes) {
      const slug = rec.slug || rec.id;
      const count = (recSlugCount.get(slug) || 0) + 1;
      recSlugCount.set(slug, count);
      if (count === 2) dupRecSlugs.push(slug);
    }

    // Missing images
    const missingIngImages = ingredients.filter(i => !i.imageUrl || i.imageUrl.trim() === '').map(i => i.id);
    const missingRecImages = recipes.filter(r => !r.heroImageUrl || r.heroImageUrl.trim() === '').map(r => r.id);

    // Missing SEO info
    const missingIngSeo = ingredients.filter(i => !i.seoTitle && !i.seo?.title).map(i => i.id);
    const missingRecSeo = recipes.filter(r => !r.seoTitle && !r.seo?.title).map(r => r.id);

    // Broken links / orphan references
    const ingredientIdSet = new Set(ingredients.map(i => i.id));
    const ingredientSlugSet = new Set(ingredients.map(i => i.slug || i.id));
    const orphanPrimary: Array<{ recipeId: string; missingIngredientId: string }> = [];

    for (const rec of recipes) {
      if (
        rec.primaryIngredientId &&
        !ingredientIdSet.has(rec.primaryIngredientId) &&
        !ingredientSlugSet.has(rec.primaryIngredientId)
      ) {
        orphanPrimary.push({
          recipeId: rec.id,
          missingIngredientId: rec.primaryIngredientId
        });
      }
    }

    // Unresolved recipe links from ingredient side
    const recipeIdSet = new Set(recipes.map(r => r.id));
    const recipeSlugSet = new Set(recipes.map(r => r.slug || r.id));
    const unresolvedRecipeLinks: Array<{ ingredientId: string; missingRecipeId: string }> = [];

    for (const ing of ingredients) {
      if (ing.relatedRecipeIds && Array.isArray(ing.relatedRecipeIds)) {
        for (const relRec of ing.relatedRecipeIds) {
          if (!recipeIdSet.has(relRec) && !recipeSlugSet.has(relRec)) {
            unresolvedRecipeLinks.push({
              ingredientId: ing.id,
              missingRecipeId: relRec
            });
          }
        }
      }
    }

    // Unlinked recipes (recipes that do not connect to any ingredient)
    const unlinkedRecipes = recipes
      .filter(r => !r.primaryIngredientId && (!r.ingredientsList || r.ingredientsList.length === 0))
      .map(r => r.id);

    // Content Quality: Thin or short descriptions detection
    const thinIngDescriptions: string[] = [];
    for (const ing of ingredients) {
      const text = (ing.description || ing.overview || '').trim();
      if (text.length < 40 || extractSubstantiveWords(text).length < 8) {
        thinIngDescriptions.push(ing.id);
      }
    }

    const thinRecDescriptions: string[] = [];
    for (const rec of recipes) {
      const text = (rec.overview || rec.description || '').trim();
      if (text.length < 50 || extractSubstantiveWords(text).length < 10) {
        thinRecDescriptions.push(rec.id);
      }
    }

    // Near-duplicate content detection across catalog
    const auditSimIndex = new ScalableSimilarityIndex();
    const nearDuplicateContent: ContentIntegrityReport['nearDuplicateContent'] = [];

    for (const ing of ingredients) {
      const text = (ing.description || ing.overview || '').trim();
      if (text.length >= 40) {
        const match = auditSimIndex.findNearDuplicate(text, ing.id, 0.82);
        if (match) {
          nearDuplicateContent.push({
            type: 'ingredient',
            id: ing.id,
            matchingId: match.matchedId,
            similarity: Math.round(match.similarity * 100) / 100
          });
        }
        auditSimIndex.addItem(ing.id, ing.name, text);
      }
    }

    for (const rec of recipes) {
      const text = (rec.overview || rec.description || '').trim();
      if (text.length >= 50) {
        const match = auditSimIndex.findNearDuplicate(text, rec.id, 0.82);
        if (match) {
          nearDuplicateContent.push({
            type: 'recipe',
            id: rec.id,
            matchingId: match.matchedId,
            similarity: Math.round(match.similarity * 100) / 100
          });
        }
        auditSimIndex.addItem(rec.id, rec.dishTitle, text);
      }
    }

    // Keyword stuffing audit
    const keywordStuffingIssues: ContentIntegrityReport['keywordStuffingIssues'] = [];
    for (const ing of ingredients) {
      const text = `${ing.name} ${ing.description || ''} ${ing.terroir || ''}`;
      const analysis = analyzeKeywordStuffing(text);
      if (analysis.hasKeywordStuffing) {
        for (const issue of analysis.issues) {
          keywordStuffingIssues.push({
            id: ing.id,
            type: 'ingredient',
            word: issue.word,
            densityPercent: issue.densityPercent
          });
        }
      }
    }

    for (const rec of recipes) {
      const text = `${rec.dishTitle} ${rec.overview || ''} ${rec.chefRationale || ''}`;
      const analysis = analyzeKeywordStuffing(text);
      if (analysis.hasKeywordStuffing) {
        for (const issue of analysis.issues) {
          keywordStuffingIssues.push({
            id: rec.id,
            type: 'recipe',
            word: issue.word,
            densityPercent: issue.densityPercent
          });
        }
      }
    }

    // Invalid timing or servings audit in recipes
    const invalidTimingOrServings: ContentIntegrityReport['invalidTimingOrServings'] = [];
    for (const rec of recipes) {
      if (rec.servings === undefined || rec.servings === null || typeof rec.servings !== 'number' || rec.servings < 1 || !Number.isInteger(rec.servings)) {
        invalidTimingOrServings.push({
          recipeId: rec.id,
          issue: `Invalid servings count: ${rec.servings} (must be a positive whole number >= 1).`
        });
      }
      if (typeof rec.totalPrepTimeMinutes !== 'number' || rec.totalPrepTimeMinutes < 0) {
        invalidTimingOrServings.push({
          recipeId: rec.id,
          issue: `Invalid prep time: ${rec.totalPrepTimeMinutes} minutes (must be >= 0).`
        });
      }
      if (typeof rec.totalCookTimeMinutes !== 'number' || rec.totalCookTimeMinutes < 0) {
        invalidTimingOrServings.push({
          recipeId: rec.id,
          issue: `Invalid cook time: ${rec.totalCookTimeMinutes} minutes (must be >= 0).`
        });
      }
    }

    // Broken ingredient references in recipes list
    const brokenIngredientReferences: ContentIntegrityReport['brokenIngredientReferences'] = [];
    for (const rec of recipes) {
      if (Array.isArray(rec.ingredientsList)) {
        for (const ingItem of rec.ingredientsList) {
          if (ingItem.ingredientId && !ingredientIdSet.has(ingItem.ingredientId)) {
            brokenIngredientReferences.push({
              recipeId: rec.id,
              ingredientRef: `${ingItem.name} (${ingItem.ingredientId})`
            });
          }
        }
      }
    }

    // Calculate content quality score (0 - 100)
    let qualityDeductions = 0;
    qualityDeductions += thinIngDescriptions.length * 10;
    qualityDeductions += thinRecDescriptions.length * 10;
    qualityDeductions += nearDuplicateContent.length * 12;
    qualityDeductions += keywordStuffingIssues.length * 8;
    qualityDeductions += invalidTimingOrServings.length * 10;
    const contentQualityScore = Math.max(0, Math.min(100, 100 - qualityDeductions));

    // Calculate SEO health score (0 - 100)
    let seoDeductions = 0;
    seoDeductions += missingIngSeo.length * 10;
    seoDeductions += missingRecSeo.length * 10;
    seoDeductions += missingIngImages.length * 8;
    seoDeductions += missingRecImages.length * 6;
    seoDeductions += nearDuplicateContent.length * 10;
    const seoHealthScore = Math.max(0, Math.min(100, 100 - seoDeductions));

    // Calculate overall composite health score (0 - 100)
    let deductions = 0;
    deductions += dupIngIds.length * 15;
    deductions += dupIngSlugs.length * 10;
    deductions += dupRecIds.length * 15;
    deductions += dupRecSlugs.length * 10;
    deductions += missingIngImages.length * 2;
    deductions += missingRecImages.length * 1;
    deductions += orphanPrimary.length * 1;
    deductions += brokenIngredientReferences.length * 1;
    deductions += thinIngDescriptions.length * 2;
    deductions += thinRecDescriptions.length * 2;
    deductions += nearDuplicateContent.length * 4;

    const overallHealthScore = Math.max(0, Math.min(100, 100 - deductions));

    return {
      timestamp: new Date().toISOString(),
      totalIngredients: ingredients.length,
      totalRecipes: recipes.length,
      duplicateIngredientIds: dupIngIds,
      duplicateIngredientSlugs: dupIngSlugs,
      duplicateRecipeIds: dupRecIds,
      duplicateRecipeSlugs: dupRecSlugs,
      orphanRecipePrimaryIngredients: orphanPrimary,
      unresolvedIngredientRecipeLinks: unresolvedRecipeLinks,
      unlinkedRecipes,
      missingImages: {
        ingredients: missingIngImages,
        recipes: missingRecImages
      },
      missingSeoInformation: {
        ingredients: missingIngSeo,
        recipes: missingRecSeo
      },
      thinOrShortDescriptions: {
        ingredients: thinIngDescriptions,
        recipes: thinRecDescriptions
      },
      nearDuplicateContent,
      keywordStuffingIssues,
      invalidTimingOrServings,
      brokenIngredientReferences,
      contentQualityScore: Math.round(contentQualityScore),
      seoHealthScore: Math.round(seoHealthScore),
      overallHealthScore: Math.round(overallHealthScore)
    };
  }

  /**
   * Generate canonical sample schema templates for external imports
   */
  public static generateSampleSchemas(): {
    ingredient: IngredientInputSchema;
    recipe: RecipeInputSchema;
  } {
    return {
      ingredient: {
        id: 'yuzu-kochi-reserve',
        slug: 'yuzu-kochi-reserve',
        name: 'Kōchi Mountain Wild Yuzu',
        scientificName: 'Citrus junos',
        category: 'Foraged Botanicals',
        origin: 'Shikoku Mountains, Kōchi Prefecture',
        country: 'Japan',
        region: 'East Asia',
        season: 'Autumn',
        harvestWindow: 'October through December',
        flavorNotes: ['Crystalline Citric Acidity', 'White Blossom Flora', 'Resinous Pine Terpene'],
        flavorProfile: {
          umami: 20,
          aroma: 98,
          acidity: 95,
          sweetness: 35,
          bitterness: 45,
          pungency: 40,
          depth: 82
        },
        imageUrl: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=1200&auto=format&fit=crop',
        overview: 'Revered mountain citrus grown on steep terrace groves overlooking the Pacific Ocean.',
        description: 'Harvested in freezing autumn dawn breezes, this wild yuzu displays concentrated zest oils packed with volatile terpenes.',
        terroir: 'Mineral-rich slate soils on 45-degree slope mountain terraces with dramatic day-night temperature swings.',
        culinaryApplications: [
          'Micro-planed fresh zest over sashimi and crudo ateliers',
          'Aged ponzu fermentation with single-origin soy',
          'Aromatic butter emulsion finishing for seafood'
        ],
        aliases: ['Japanese Mountain Yuzu', 'Shikoku Citrus Junos', 'Kōchi Yuzu'],
        relatedRecipeIds: ['rec-yuzu-hamachi-crudo'],
        rarityIndex: 'Rare Seasonal Harvest',
        storageAdvice: 'Wrap in breathable unbleached paper inside a sealed container at 4°C. Consume within 10 days.',
        seoTitle: "Kōchi Mountain Wild Yuzu — Flavor & Terroir Guide | Stassen's",
        seoDescription: 'Discover authentic wild Japanese yuzu from Shikoku, tasting notes, and haute masterclass pairings.',
        seoKeywords: ['wild yuzu', 'kochi citrus', 'japanese culinary ingredients', 'haute gastronomy']
      },
      recipe: {
        id: 'rec-yuzu-hamachi-crudo',
        slug: 'yuzu-hamachi-crudo',
        dishTitle: 'Cured Wild Hamachi with Kōchi Yuzu Pearls & Finger Lime',
        name: 'Cured Wild Hamachi with Kōchi Yuzu Pearls',
        subtitle: 'Cold-Extracted Crudo Atelier with Mountain Terpenes',
        overview: 'A pristine sashimi-grade hamachi crudo elevated with crystalline mountain yuzu extraction.',
        description: 'Sashimi-grade yellowtail lightly salted with fleur de sel, sliced on the bias, and dressed with freshly emulsified mountain yuzu and cold-pressed camellia seed oil.',
        cuisine: 'Japanese',
        courseCategory: 'Cold Appetizer',
        difficulty: 'Advanced',
        servings: 4,
        totalPrepTimeMinutes: 15,
        totalCookTimeMinutes: 5,
        primaryIngredientId: 'yuzu-kochi-reserve',
        primaryIngredientName: 'Kōchi Mountain Wild Yuzu',
        heroImageUrl: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?q=80&w=1200&auto=format&fit=crop',
        ingredientsList: [
          { name: 'Sashimi-Grade Wild Hamachi', amount: '280g', prepState: 'Skinned and chilled', addedAtMinute: 0, isArchiveSpecialty: false },
          { name: 'Kōchi Mountain Wild Yuzu', amount: '2 whole fruits', prepState: 'Zested and juiced', addedAtMinute: 1, isArchiveSpecialty: true, ingredientId: 'yuzu-kochi-reserve' },
          { name: 'Cold-Pressed Camellia Seed Oil', amount: '25ml', prepState: 'Chilled', addedAtMinute: 2, isArchiveSpecialty: false },
          { name: 'Crystalline Mineral Flake Salt', amount: 'Pinch', prepState: 'Crushed overhead', addedAtMinute: 4, isArchiveSpecialty: true }
        ],
        timelineSteps: [
          {
            stepNumber: 1,
            title: 'Precision Bias Slicing & Plate Conditioning',
            actionDescription: 'Slice the cold hamachi into 4mm ribbons using a single drawing stroke. Arrange onto chilled slate ceramics.'
          },
          {
            stepNumber: 2,
            title: 'Cold Emulsion & Botanical Dressing',
            actionDescription: 'Whisk fresh wild yuzu juice with cold camellia oil until emulsified. Drizzle gently over fish.'
          },
          {
            stepNumber: 3,
            title: 'Finishing Zest & Mineral Texture',
            actionDescription: 'Micro-plane fresh yuzu zest directly overhead to release aromatic mist. Scatter mineral flake salt and serve immediately.'
          }
        ],
        seoTitle: "Cured Wild Hamachi with Kōchi Yuzu Recipe | Stassen's Masterclass",
        seoDescription: 'Master the art of cold-extracted wild hamachi crudo featuring mountain yuzu and camellia oil.',
        seoKeywords: ['hamachi crudo', 'yuzu recipe', 'japanese masterclass', 'haute gastronomy']
      }
    };
  }

  /**
   * Export entire dataset in clean JSON format
   */
  public static exportAll(): {
    ingredients: Ingredient[];
    recipes: CulinaryMasterclass[];
    metadata: {
      exportedAt: string;
      ingredientCount: number;
      recipeCount: number;
      version: string;
    };
  } {
    const ingredients = ingredientService.getAllIngredients();
    const recipes = recipeService.getAllRecipes();
    return {
      ingredients,
      recipes,
      metadata: {
        exportedAt: new Date().toISOString(),
        ingredientCount: ingredients.length,
        recipeCount: recipes.length,
        version: '4.0.0-scalable-content-system'
      }
    };
  }
}
