import {
  Ingredient,
  IngredientCategory,
  WorldRegion,
  HarvestSeason,
  RarityLevel,
  FlavorProfile,
  CulinaryMasterclass,
  MasterclassStep,
  CulinaryTool,
  ContentSEOInfo
} from '../types';
import {
  IngredientInputSchema,
  RecipeInputSchema,
  ValidationResult,
  VALID_INGREDIENT_CATEGORIES,
  VALID_WORLD_REGIONS,
  VALID_HARVEST_SEASONS,
  VALID_RARITY_LEVELS,
  VALID_RECIPE_DIFFICULTIES
} from './schema';
import { createSlug } from '../utils/slug';
import { isValidImageUrl, getIngredientFallbackChain, getRecipeFallbackChain } from '../utils/imageFallback';
import {
  extractSubstantiveWords,
  analyzeKeywordStuffing,
  generateCanonicalSeoTitle,
  generateCanonicalMetaDescription,
  generateStructuredDataForIngredient,
  generateStructuredDataForRecipe,
  globalSimilarityIndex,
  ScalableSimilarityIndex
} from './qualityValidator';

/**
 * Default Category Flavor Profiles for automated normalization
 */
const DEFAULT_CATEGORY_PROFILES: Record<IngredientCategory, FlavorProfile> = {
  'Wild Fungi & Truffles': { umami: 95, aroma: 92, acidity: 15, sweetness: 18, bitterness: 20, pungency: 55, depth: 96 },
  'Rare Spices': { umami: 40, aroma: 98, acidity: 35, sweetness: 45, bitterness: 40, pungency: 85, depth: 88 },
  'Foraged Botanicals': { umami: 45, aroma: 85, acidity: 40, sweetness: 30, bitterness: 50, pungency: 35, depth: 75 },
  'Heritage Salts & Minerals': { umami: 70, aroma: 30, acidity: 25, sweetness: 10, bitterness: 15, pungency: 20, depth: 90 },
  'Ferments & Vinegars': { umami: 90, aroma: 80, acidity: 95, sweetness: 40, bitterness: 25, pungency: 50, depth: 92 },
  'Ancient Grains & Seeds': { umami: 50, aroma: 60, acidity: 15, sweetness: 35, bitterness: 25, pungency: 15, depth: 70 },
  'Specialty Oils & Fats': { umami: 65, aroma: 85, acidity: 20, sweetness: 25, bitterness: 30, pungency: 40, depth: 85 },
  'Cultivated Teas & Tisanes': { umami: 60, aroma: 95, acidity: 30, sweetness: 45, bitterness: 65, pungency: 20, depth: 80 },
  'Artisanal Nectars & Sugars': { umami: 20, aroma: 85, acidity: 25, sweetness: 98, bitterness: 15, pungency: 10, depth: 75 },
};

/**
 * Category-calibrated conservation advice
 */
const DEFAULT_STORAGE_ADVICE: Record<IngredientCategory, string> = {
  'Wild Fungi & Truffles': 'Wrap individually in breathable unbleached paper towels inside an airtight glass container at 2–4°C. Consume within 5–7 days.',
  'Rare Spices': 'Store whole in UV-resistant amber glass jars away from direct heat and light at 14–18°C. Mill or grind immediately prior to finishing.',
  'Foraged Botanicals': 'Keep stems wrapped in slightly dampened linen cloth in the chilled crisper at 4°C, or dry in a dark, ventilated room for infusions.',
  'Heritage Salts & Minerals': 'Keep in a non-reactive ceramic or hardwood salt cellar with a tight lid in a low-humidity pantry.',
  'Ferments & Vinegars': 'Store in original glass cruets away from direct sunlight at cellar temperature (12–16°C). Refrigerate unpasteurized ferments after opening.',
  'Ancient Grains & Seeds': 'Store in airtight containers in a cool, dark, dry pantry. For prolonged longevity over 6 months, store in cellar conditions under 15°C.',
  'Specialty Oils & Fats': 'Store strictly in dark glass bottles away from oxygen, UV rays, and stovetop heat at 12–15°C to prevent lipid peroxidation.',
  'Cultivated Teas & Tisanes': 'Store in double-lidded airtight tin canisters in a cool, scent-free dark environment. Avoid refrigerator condensation.',
  'Artisanal Nectars & Sugars': 'Store at room temperature in a dry pantry away from direct sunlight. Do not refrigerate raw unheated honey.',
};

/**
 * Clean & sanitize text input
 */
export function sanitizeString(input?: unknown, defaultVal = ''): string {
  if (typeof input !== 'string') return defaultVal;
  return input.replace(/[\u0000-\u0008\u000B-\u000C\u000E-\u001F]/g, '').trim();
}

/**
 * Sanitize string array (e.g. aliases, tags, flavorNotes)
 */
export function sanitizeStringArray(input?: unknown): string[] {
  if (!Array.isArray(input)) return [];
  const set = new Set<string>();
  for (const item of input) {
    if (typeof item === 'string') {
      const clean = sanitizeString(item);
      if (clean) set.add(clean);
    }
  }
  return Array.from(set);
}

/**
 * Generate a unique slug by checking against a collision set
 */
export function resolveUniqueSlug(
  baseCandidate: string,
  existingSlugs: Set<string>,
  allowSlugForId?: string,
  slugOwnerMap?: Map<string, string>
): string {
  const cleanBase = createSlug(baseCandidate) || 'specimen';
  
  // If slug is already owned by this exact entity ID, it's not a collision
  if (allowSlugForId && slugOwnerMap?.get(cleanBase) === allowSlugForId) {
    return cleanBase;
  }

  if (!existingSlugs.has(cleanBase)) {
    return cleanBase;
  }

  let counter = 2;
  while (true) {
    const candidate = `${cleanBase}-${counter}`;
    if (allowSlugForId && slugOwnerMap?.get(candidate) === allowSlugForId) {
      return candidate;
    }
    if (!existingSlugs.has(candidate)) {
      return candidate;
    }
    counter++;
  }
}

/**
 * ContentValidator Context
 */
export interface ValidationContext {
  existingIngredientIds?: Set<string>;
  existingIngredientSlugs?: Set<string>;
  ingredientSlugOwnerMap?: Map<string, string>;
  existingRecipeIds?: Set<string>;
  existingRecipeSlugs?: Set<string>;
  recipeSlugOwnerMap?: Map<string, string>;
  knownIngredientIds?: Set<string>;
  knownIngredientSlugs?: Set<string>;
  knownRecipeIds?: Set<string>;
  knownRecipeSlugs?: Set<string>;
  batchIngredientIds?: Set<string>;
  batchIngredientSlugs?: Set<string>;
  batchRecipeIds?: Set<string>;
  batchRecipeSlugs?: Set<string>;
  allowUpdates?: boolean;
  resolveCollisions?: boolean;
  strictMode?: boolean;
  checkNearDuplicates?: boolean;
  similarityIndex?: ScalableSimilarityIndex;
  baseUrl?: string;
}

/**
 * Core Ingredient Validator & Normalizer
 * Validates required fields, checks content quality (short descriptions, thin content, keyword stuffing),
 * detects near-duplicates, enforces unique IDs/slugs, validates references, and generates rich SEO metadata.
 */
export function validateIngredient(
  rawInput: unknown,
  context: ValidationContext = {}
): ValidationResult<Ingredient> {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!rawInput || typeof rawInput !== 'object') {
    return {
      isValid: false,
      errors: ['Input must be a valid non-null object.'],
      warnings: [],
      originalInput: rawInput,
      qualityScore: 0,
      seoScore: 0
    };
  }

  const raw = rawInput as Partial<IngredientInputSchema>;

  // 1. Required field: Name
  const name = sanitizeString(raw.name);
  if (!name) {
    errors.push('Required field "name" is missing or empty.');
  }

  // 2. Content Quality: Description or Overview validation
  const rawDesc = sanitizeString(raw.description);
  const rawOverview = sanitizeString(raw.overview);
  const effectiveText = rawDesc || rawOverview;

  if (!effectiveText) {
    errors.push('Required field "description" (or "overview") is missing or empty.');
  } else {
    // Check for extremely short or thin descriptions
    if (effectiveText.length < 40) {
      errors.push(
        `Content quality failure: Description is too short (${effectiveText.length} characters, minimum 40 characters required). Substantial editorial descriptions are necessary to describe sensory and culinary qualities and avoid thin content.`
      );
    } else if (effectiveText.length < 75) {
      warnings.push(
        `Description is somewhat brief (${effectiveText.length} characters). Consider expanding sensory notes and culinary applications for optimal visitor and search performance.`
      );
    }

    // Substantive word count evaluation (excluding single characters and common stopwords)
    const substantiveWords = extractSubstantiveWords(effectiveText);
    if (substantiveWords.length < 8) {
      errors.push(
        `Thin content failure: Description contains only ${substantiveWords.length} substantive words (minimum 8 required). Editorial descriptions must offer meaningful culinary context.`
      );
    }

    // Keyword stuffing and unnatural repetition check
    const fullTextForKw = `${name} ${effectiveText} ${sanitizeString(raw.terroir)} ${sanitizeString(raw.seoDescription)}`;
    const kwAnalysis = analyzeKeywordStuffing(fullTextForKw);
    if (kwAnalysis.hasKeywordStuffing) {
      for (const issue of kwAnalysis.issues) {
        warnings.push(issue.message);
      }
    }
  }

  const description = rawDesc || rawOverview || `${name} is an exquisite culinary specimen treasured for its distinct aroma and terroir complexity.`;
  const overview = rawOverview || description;

  // 3. Category Validation & Fallback
  let category: IngredientCategory = 'Foraged Botanicals';
  if (raw.category && VALID_INGREDIENT_CATEGORIES.includes(raw.category as IngredientCategory)) {
    category = raw.category as IngredientCategory;
  } else if (raw.category) {
    // Attempt fuzzy match
    const cleanCat = sanitizeString(raw.category).toLowerCase();
    const matched = VALID_INGREDIENT_CATEGORIES.find(c => c.toLowerCase().includes(cleanCat) || cleanCat.includes(c.toLowerCase()));
    if (matched) {
      category = matched;
      warnings.push(`Category "${raw.category}" was normalized to standard "${matched}".`);
    } else {
      warnings.push(`Unrecognized category "${raw.category}". Defaulting to "Foraged Botanicals".`);
    }
  } else {
    warnings.push('Category missing. Defaulting to "Foraged Botanicals".');
  }

  // 4. ID Validation, Collision, and Intra-Batch Deduplication
  let id = sanitizeString(raw.id);
  if (!id) {
    id = createSlug(name) || `ing-${Date.now()}`;
    warnings.push(`ID was missing. Generated ID "${id}".`);
  }

  // Check duplicate ID against catalog
  if (context.existingIngredientIds?.has(id) && !context.allowUpdates) {
    errors.push(`Duplicate ingredient ID "${id}". An ingredient with this ID already exists in the catalog.`);
  }

  // Check duplicate ID within batch
  if (context.batchIngredientIds?.has(id)) {
    errors.push(`Duplicate ingredient ID "${id}" detected within the same import batch.`);
  }

  // 5. Slug Validation, Deduplication, and Collision Handling
  const baseSlugCandidate = sanitizeString(raw.slug) || createSlug(name) || id;
  let finalSlug: string;

  // Combine existing slugs and batch slugs for comprehensive collision prevention
  const allExistingSlugs = new Set<string>([
    ...(context.existingIngredientSlugs || []),
    ...(context.batchIngredientSlugs || [])
  ]);

  if (context.resolveCollisions !== false && allExistingSlugs.size > 0) {
    finalSlug = resolveUniqueSlug(
      baseSlugCandidate,
      allExistingSlugs,
      id,
      context.ingredientSlugOwnerMap
    );
    if (finalSlug !== baseSlugCandidate) {
      warnings.push(`Slug "${baseSlugCandidate}" collided with an existing entry. Resolved to "${finalSlug}".`);
    }
  } else {
    finalSlug = createSlug(baseSlugCandidate);
    const isOwnedBySameId = context.ingredientSlugOwnerMap?.get(finalSlug) === id;
    if (allExistingSlugs.has(finalSlug) && !isOwnedBySameId) {
      errors.push(`Duplicate ingredient slug "${finalSlug}". An ingredient with this slug already exists.`);
    }
  }

  // 6. Image & Reliable Fallback
  const candidateImage = sanitizeString(raw.imageUrl || raw.image);
  let reliableImageUrl: string;
  if (isValidImageUrl(candidateImage)) {
    reliableImageUrl = candidateImage;
  } else {
    const chain = getIngredientFallbackChain({ name, category, imageUrl: candidateImage });
    reliableImageUrl = chain[0];
    if (candidateImage) {
      warnings.push(`Invalid image URL "${candidateImage}". Using category-calibrated fallback.`);
    } else {
      warnings.push('Image URL missing. Using category-calibrated fallback.');
    }
  }

  // 7. Broken References Verification: Related Recipes and Related Ingredients
  const relatedRecipeIds = sanitizeStringArray(raw.relatedRecipeIds);
  if (context.knownRecipeIds) {
    for (const recId of relatedRecipeIds) {
      if (!context.knownRecipeIds.has(recId) && !context.batchRecipeIds?.has(recId)) {
        warnings.push(`Referenced recipe ID "${recId}" was not found in catalog or import batch.`);
      }
    }
  }

  const relatedIngredientIds = sanitizeStringArray(raw.relatedIngredientIds);
  if (context.knownIngredientIds) {
    for (const relIngId of relatedIngredientIds) {
      if (!context.knownIngredientIds.has(relIngId) && !context.batchIngredientIds?.has(relIngId)) {
        warnings.push(`Referenced related ingredient ID "${relIngId}" was not found in catalog or import batch.`);
      }
    }
  }

  // 8. Near-Duplicate Content Detection
  let nearDuplicateMatch: { matchedId: string; matchedTitle: string; similarity: number } | undefined;
  if (context.checkNearDuplicates !== false && effectiveText.length >= 40) {
    const simIndex = context.similarityIndex || globalSimilarityIndex;
    const match = simIndex.findNearDuplicate(effectiveText, id, 0.82);
    if (match) {
      nearDuplicateMatch = match;
      warnings.push(
        `Potential near-duplicate content detected: description is ${Math.round(match.similarity * 100)}% similar to existing item "${match.matchedId}" ("${match.matchedTitle}"). Unique editorial content is required to prevent search engine duplicate content penalties.`
      );
    }
  }

  // 9. SEO Metadata Validation & Automated Enhancement
  if (raw.seoTitle) {
    if (raw.seoTitle.length < 15) {
      warnings.push(`Custom SEO title is too short (${raw.seoTitle.length} chars). Recommend 45–65 characters for optimal search visibility.`);
    }
  }
  if (raw.seoDescription) {
    if (raw.seoDescription.length < 50) {
      warnings.push(`Custom SEO description is too short (${raw.seoDescription.length} chars). Recommend 120–160 characters for complete search snippets.`);
    } else if (raw.seoDescription.length > 200) {
      warnings.push(`Custom SEO description is excessively long (${raw.seoDescription.length} chars). Search engines truncate snippets over 160 characters.`);
    }
  }

  const aliases = sanitizeStringArray(raw.aliases);
  const scientificName = sanitizeString(raw.scientificName) || undefined;

  const seoTitle = sanitizeString(raw.seoTitle || raw.seo?.title) ||
    generateCanonicalSeoTitle('ingredient', name, { scientificName });

  const flavorNotes = sanitizeStringArray(raw.flavorNotes);
  if (flavorNotes.length === 0) {
    flavorNotes.push('Terroir Minerality', 'Aromatic Volatiles', 'Complex Finish');
  }

  const origin = sanitizeString(raw.origin) || 'Global Curated Terroir';
  const country = sanitizeString(raw.country) || 'International Heritage';

  const seoDescription = sanitizeString(raw.seoDescription || raw.seo?.description) ||
    generateCanonicalMetaDescription('ingredient', {
      nameOrTitle: name,
      overviewOrDescription: description,
      originOrCuisine: origin,
      flavorNotesOrPrimaryIng: flavorNotes
    });

  const seoKeywords = sanitizeStringArray([
    ...(raw.seoKeywords || []),
    ...(raw.seo?.keywords || []),
    name,
    category,
    origin,
    ...(aliases || []),
    ...(flavorNotes || [])
  ]);

  // 10. Flavor Profile & Defaults
  const baseProfile = DEFAULT_CATEGORY_PROFILES[category] || DEFAULT_CATEGORY_PROFILES['Foraged Botanicals'];
  const flavorProfile: FlavorProfile = {
    umami: typeof raw.flavorProfile?.umami === 'number' ? Math.max(0, Math.min(100, raw.flavorProfile.umami)) : baseProfile.umami,
    aroma: typeof raw.flavorProfile?.aroma === 'number' ? Math.max(0, Math.min(100, raw.flavorProfile.aroma)) : baseProfile.aroma,
    acidity: typeof raw.flavorProfile?.acidity === 'number' ? Math.max(0, Math.min(100, raw.flavorProfile.acidity)) : baseProfile.acidity,
    sweetness: typeof raw.flavorProfile?.sweetness === 'number' ? Math.max(0, Math.min(100, raw.flavorProfile.sweetness)) : baseProfile.sweetness,
    bitterness: typeof raw.flavorProfile?.bitterness === 'number' ? Math.max(0, Math.min(100, raw.flavorProfile.bitterness)) : baseProfile.bitterness,
    pungency: typeof raw.flavorProfile?.pungency === 'number' ? Math.max(0, Math.min(100, raw.flavorProfile.pungency)) : baseProfile.pungency,
    depth: typeof raw.flavorProfile?.depth === 'number' ? Math.max(0, Math.min(100, raw.flavorProfile.depth)) : baseProfile.depth,
  };

  // 11. Region & Origin
  let region: WorldRegion = 'Mediterranean & Southern Europe';
  if (raw.region && VALID_WORLD_REGIONS.includes(raw.region as WorldRegion)) {
    region = raw.region as WorldRegion;
  }

  // 12. Season & Harvesting
  let season: HarvestSeason = 'Perennial / Year-Round';
  if (raw.season && VALID_HARVEST_SEASONS.includes(raw.season as HarvestSeason)) {
    season = raw.season as HarvestSeason;
  }
  const harvestWindow = sanitizeString(raw.harvestWindow) || 'Peak seasonal availability';

  // 13. Rarity
  let rarityIndex: RarityLevel = 'Heirloom Selection';
  if (raw.rarityIndex && VALID_RARITY_LEVELS.includes(raw.rarityIndex as RarityLevel)) {
    rarityIndex = raw.rarityIndex as RarityLevel;
  }

  // 14. Pairings & Applications
  const culinaryApplications = sanitizeStringArray(raw.culinaryApplications);
  if (culinaryApplications.length === 0) {
    culinaryApplications.push(
      `Finishing accent over warm pasta, risotto, or protein compositions`,
      `Gentle infusion into cold-pressed oils or emulsions`,
      `Harmonizing element in multi-course tasting menus`
    );
  }

  const pairings = Array.isArray(raw.pairings) && raw.pairings.length > 0
    ? raw.pairings.map(p => ({
        ingredient: sanitizeString(p.ingredient, 'Extra Virgin Olive Oil'),
        harmony: sanitizeString(p.harmony, 'Complementary Harmonic'),
        note: sanitizeString(p.note, 'Enhances volatile aromatic dispersion on the palate.')
      }))
    : [
        { ingredient: 'Cold-Pressed Extra Virgin Olive Oil', harmony: 'Lipid Base', note: 'Absorbs and suspends volatile aroma compounds.' },
        { ingredient: 'Aged Parmigiano-Reggiano', harmony: 'Umami Resonance', note: 'Glutamate crystals accentuate sensory finish.' }
      ];

  const storageAdvice = sanitizeString(raw.storageAdvice) || DEFAULT_STORAGE_ADVICE[category] ||
    'Store in a cool, dry, dark environment away from direct light and moisture.';

  const galleryImages = sanitizeStringArray(raw.galleryImages);
  if (galleryImages.length === 0) {
    galleryImages.push(reliableImageUrl);
  }

  const normalizedIngredient: Ingredient = {
    id,
    slug: finalSlug,
    name,
    scientificName,
    category,
    origin,
    region,
    country,
    season,
    harvestWindow,
    flavorNotes,
    flavorProfile,
    imageUrl: reliableImageUrl,
    image: reliableImageUrl,
    galleryImages,
    videoUrl: sanitizeString(raw.videoUrl) || undefined,
    overview,
    description,
    terroir: sanitizeString(raw.terroir) || `Cultivated in microclimate soils of ${origin}, adhering to generational harvesting practices.`,
    culinaryApplications,
    pairings,
    relatedIngredientIds,
    aliases,
    relatedRecipeIds,
    rarityIndex,
    storageAdvice,
    curatorNotes: sanitizeString(raw.curatorNotes) || undefined,
    harvestMethod: sanitizeString(raw.harvestMethod) || undefined,
    seoTitle,
    seoDescription,
    seoKeywords
  };

  // Generate automated Schema.org structured data
  const structuredData = raw.seo?.structuredData || generateStructuredDataForIngredient(normalizedIngredient, context.baseUrl);

  const seo: ContentSEOInfo = {
    title: seoTitle,
    description: seoDescription,
    keywords: seoKeywords,
    canonicalUrl: raw.seo?.canonicalUrl || `/ingredients/${finalSlug}`,
    ogImage: reliableImageUrl,
    structuredData
  };

  normalizedIngredient.seo = seo;

  // Calculate algorithmic Content Quality & SEO Health Scores (0-100)
  const qualityScore = Math.max(0, Math.min(100, Math.round(
    100 - (errors.length * 35) - (warnings.length * 8) + (effectiveText.length > 100 ? 5 : 0)
  )));

  const seoScore = Math.max(0, Math.min(100, Math.round(
    100 - (candidateImage ? 0 : 15) - (raw.seoTitle ? 0 : 5) - (raw.seoDescription ? 0 : 5)
  )));

  return {
    isValid: errors.length === 0,
    data: errors.length === 0 ? normalizedIngredient : undefined,
    errors,
    warnings,
    originalInput: rawInput,
    qualityScore,
    seoScore,
    nearDuplicateMatch
  };
}

/**
 * Core Recipe Validator & Normalizer
 * Validates required fields, checks content quality (short overviews, thin content, keyword stuffing),
 * validates servings and prep/cook times, checks instructions/ingredients, verifies references,
 * detects near-duplicates, and generates rich SEO metadata.
 */
export function validateRecipe(
  rawInput: unknown,
  context: ValidationContext = {}
): ValidationResult<CulinaryMasterclass> {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!rawInput || typeof rawInput !== 'object') {
    return {
      isValid: false,
      errors: ['Input must be a valid non-null object.'],
      warnings: [],
      originalInput: rawInput,
      qualityScore: 0,
      seoScore: 0
    };
  }

  const raw = rawInput as Partial<RecipeInputSchema>;

  // 1. Required field: dishTitle (or name)
  const dishTitle = sanitizeString(raw.dishTitle || raw.name);
  if (!dishTitle) {
    errors.push('Required field "dishTitle" (or "name") is missing or empty.');
  }

  // 2. Content Quality: Recipe Overview or Description
  const rawOverview = sanitizeString(raw.overview);
  const rawDesc = sanitizeString(raw.description);
  const effectiveOverview = rawOverview || rawDesc;

  if (!effectiveOverview) {
    errors.push('Required field "overview" (or "description") is missing or empty.');
  } else {
    // Check for extremely short or thin recipe overviews
    if (effectiveOverview.length < 50) {
      errors.push(
        `Content quality failure: Recipe overview is too short (${effectiveOverview.length} characters, minimum 50 characters required). Substantial culinary descriptions are required to guide cooking techniques and avoid thin content.`
      );
    } else if (effectiveOverview.length < 90) {
      warnings.push(
        `Recipe overview is somewhat brief (${effectiveOverview.length} characters). Consider expanding culinary technique context and gastronomic philosophy.`
      );
    }

    // Substantive word count evaluation
    const substantiveWords = extractSubstantiveWords(effectiveOverview);
    if (substantiveWords.length < 10) {
      errors.push(
        `Thin content failure: Recipe overview contains only ${substantiveWords.length} substantive words (minimum 10 required). High culinary value requires detailed technique rationale.`
      );
    }

    // Keyword stuffing and unnatural repetition check
    const fullRecipeText = `${dishTitle} ${effectiveOverview} ${sanitizeString(raw.chefRationale)} ${sanitizeString(raw.cuisine)}`;
    const kwAnalysis = analyzeKeywordStuffing(fullRecipeText);
    if (kwAnalysis.hasKeywordStuffing) {
      for (const issue of kwAnalysis.issues) {
        warnings.push(issue.message);
      }
    }
  }

  const overview = effectiveOverview || `A masterclass culinary presentation of ${dishTitle}, exploring classical and modernist gastronomic techniques.`;
  const subtitle = sanitizeString(raw.subtitle) || `Haute Cuisine Masterclass featuring artisanal ingredients`;

  // 3. ID Validation, Deduplication & Intra-Batch Verification
  let id = sanitizeString(raw.id);
  if (!id) {
    id = createSlug(dishTitle) || `recipe-${Date.now()}`;
    warnings.push(`Recipe ID was missing. Generated ID "${id}".`);
  }

  if (context.existingRecipeIds?.has(id) && !context.allowUpdates) {
    errors.push(`Duplicate recipe ID "${id}". A recipe with this ID already exists in the catalog.`);
  }

  if (context.batchRecipeIds?.has(id)) {
    errors.push(`Duplicate recipe ID "${id}" detected within the same import batch.`);
  }

  // 4. Slug Validation, Deduplication & Collision Handling
  const baseSlugCandidate = sanitizeString(raw.slug) || createSlug(dishTitle) || id;
  let finalSlug: string;

  const allExistingRecipeSlugs = new Set<string>([
    ...(context.existingRecipeSlugs || []),
    ...(context.batchRecipeSlugs || [])
  ]);

  if (context.resolveCollisions !== false && allExistingRecipeSlugs.size > 0) {
    finalSlug = resolveUniqueSlug(
      baseSlugCandidate,
      allExistingRecipeSlugs,
      id,
      context.recipeSlugOwnerMap
    );
    if (finalSlug !== baseSlugCandidate) {
      warnings.push(`Recipe slug "${baseSlugCandidate}" collided with existing entry. Resolved to "${finalSlug}".`);
    }
  } else {
    finalSlug = createSlug(baseSlugCandidate);
    const isOwnedBySameId = context.recipeSlugOwnerMap?.get(finalSlug) === id;
    if (allExistingRecipeSlugs.has(finalSlug) && !isOwnedBySameId) {
      errors.push(`Duplicate recipe slug "${finalSlug}". A recipe with this slug already exists.`);
    }
  }

  // 5. Servings Validation
  let servings = 4;
  if (raw.servings !== undefined && raw.servings !== null) {
    if (
      typeof raw.servings !== 'number' ||
      isNaN(raw.servings) ||
      raw.servings <= 0 ||
      !Number.isInteger(raw.servings)
    ) {
      errors.push(`Invalid servings value (${raw.servings}). Servings must be a positive integer greater than or equal to 1.`);
    } else {
      servings = Math.floor(raw.servings);
    }
  }

  // 6. Preparation / Cooking Information & Times Validation
  let prepMinutes = 15;
  if (raw.totalPrepTimeMinutes !== undefined && raw.totalPrepTimeMinutes !== null) {
    if (typeof raw.totalPrepTimeMinutes !== 'number' || isNaN(raw.totalPrepTimeMinutes) || raw.totalPrepTimeMinutes < 0) {
      errors.push(`Invalid preparation time (${raw.totalPrepTimeMinutes}). Prep time must be a non-negative number in minutes.`);
    } else {
      prepMinutes = Math.floor(raw.totalPrepTimeMinutes);
      if (raw.totalPrepTimeMinutes > 720) {
        warnings.push(`Unusually long preparation time (${raw.totalPrepTimeMinutes} minutes). Verify timing values.`);
      }
    }
  }

  let cookMinutes = 25;
  if (raw.totalCookTimeMinutes !== undefined && raw.totalCookTimeMinutes !== null) {
    if (typeof raw.totalCookTimeMinutes !== 'number' || isNaN(raw.totalCookTimeMinutes) || raw.totalCookTimeMinutes < 0) {
      errors.push(`Invalid cooking time (${raw.totalCookTimeMinutes}). Cook time must be a non-negative number in minutes.`);
    } else {
      cookMinutes = Math.floor(raw.totalCookTimeMinutes);
      if (raw.totalCookTimeMinutes > 1440) {
        warnings.push(`Unusually long cooking time (${raw.totalCookTimeMinutes} minutes). Verify timing values.`);
      }
    }
  }

  const totalMinutes = prepMinutes + cookMinutes;
  const durationFormatted = sanitizeString(raw.overallDurationFormatted) ||
    (totalMinutes >= 60
      ? `${Math.floor(totalMinutes / 60)}h ${totalMinutes % 60}m`
      : `${totalMinutes} mins`);

  let difficulty: CulinaryMasterclass['difficulty'] = 'Advanced';
  if (raw.difficulty && VALID_RECIPE_DIFFICULTIES.includes(raw.difficulty as CulinaryMasterclass['difficulty'])) {
    difficulty = raw.difficulty as CulinaryMasterclass['difficulty'];
  }

  // 7. Ingredients List Validation & Broken Reference Detection
  const rawIngs = raw.ingredientsList || raw.ingredients;
  const ingredientsList: CulinaryMasterclass['ingredientsList'] = [];

  if (!rawIngs || !Array.isArray(rawIngs) || rawIngs.length === 0) {
    errors.push('Recipe has no ingredients listed. At least 1 valid ingredient with a non-empty name is required.');
  } else {
    for (let idx = 0; idx < rawIngs.length; idx++) {
      const item = rawIngs[idx];
      if (typeof item === 'string') {
        const clean = sanitizeString(item);
        if (clean) {
          ingredientsList.push({
            name: clean,
            amount: 'To taste',
            prepState: 'Prepared as needed',
            addedAtMinute: 0,
            isArchiveSpecialty: false
          });
        } else {
          errors.push(`Recipe ingredient at index ${idx + 1} has an empty or missing name.`);
        }
      } else if (typeof item === 'object' && item !== null) {
        const name = sanitizeString(item.name || item.ingredient);
        if (name) {
          const itemRefId = sanitizeString(item.ingredientId) || undefined;
          if (
            itemRefId &&
            context.knownIngredientIds &&
            !context.knownIngredientIds.has(itemRefId) &&
            !context.batchIngredientIds?.has(itemRefId)
          ) {
            warnings.push(
              `Recipe ingredient "${name}" specifies ingredientId "${itemRefId}", which was not found in the active catalog or import batch.`
            );
          }
          ingredientsList.push({
            name,
            amount: sanitizeString(item.amount, 'As required'),
            prepState: sanitizeString(item.prepState, 'Freshly prepared'),
            addedAtMinute: typeof item.addedAtMinute === 'number' ? item.addedAtMinute : 0,
            isArchiveSpecialty: Boolean(item.isArchiveSpecialty) || Boolean(itemRefId),
            ingredientId: itemRefId,
            ingredientSlug: sanitizeString(item.ingredientSlug) || undefined,
          });
        } else {
          errors.push(`Recipe ingredient at index ${idx + 1} has an empty or missing name.`);
        }
      } else {
        errors.push(`Invalid recipe ingredient at index ${idx + 1}: malformed ingredient entry.`);
      }
    }
  }

  if (ingredientsList.length === 0 && !errors.some(e => e.includes('ingredients'))) {
    errors.push('Required field "ingredientsList" (or "ingredients") must contain at least 1 valid ingredient with a non-empty name.');
  }

  // 8. Timeline Steps (Instructions) Validation
  const rawSteps = raw.timelineSteps || raw.instructions;
  const timelineSteps: MasterclassStep[] = [];

  if (!rawSteps || !Array.isArray(rawSteps) || rawSteps.length === 0) {
    errors.push('Recipe has no instructions listed. At least 1 step with actionable culinary instructions is required.');
  } else {
    let stepNum = 1;
    for (let sIdx = 0; sIdx < rawSteps.length; sIdx++) {
      const s = rawSteps[sIdx];
      if (typeof s === 'string') {
        const clean = sanitizeString(s);
        if (clean.length < 15) {
          errors.push(
            `Step ${stepNum} instruction is too brief (${clean.length} chars, minimum 15 chars required). Actionable culinary instructions are required for masterclass certification.`
          );
        } else {
          timelineSteps.push({
            stepNumber: stepNum,
            title: `Step ${stepNum}`,
            actionDescription: clean,
            timeOffsetFormatted: `${String(stepNum * 4).padStart(2, '0')}:00`,
            timeOffsetSeconds: stepNum * 240,
            soundscapeType: 'sizzle'
          });
          stepNum++;
        }
      } else if (typeof s === 'object' && s !== null) {
        const stepObj = s as Record<string, any>;
        const desc = sanitizeString(stepObj.actionDescription || stepObj.description || stepObj.text);
        if (desc.length < 15) {
          errors.push(
            `Step ${stepNum} instruction is too brief (${desc.length} chars, minimum 15 chars required). Actionable culinary instructions are required for masterclass certification.`
          );
        } else {
          timelineSteps.push({
            stepNumber: typeof stepObj.stepNumber === 'number' ? stepObj.stepNumber : stepNum,
            title: sanitizeString(stepObj.title || stepObj.stepTitle, `Step ${stepNum}`),
            actionDescription: desc,
            timeOffsetFormatted: sanitizeString(stepObj.timeOffsetFormatted, `${String(stepNum * 4).padStart(2, '0')}:00`),
            timeOffsetSeconds: typeof stepObj.timeOffsetSeconds === 'number' ? stepObj.timeOffsetSeconds : stepNum * 240,
            imageUrl: sanitizeString(stepObj.imageUrl) || undefined,
            techniqueTip: sanitizeString(stepObj.techniqueTip) || undefined,
            toolsUsed: sanitizeStringArray(stepObj.toolsUsed),
            criticalControlPoint: sanitizeString(stepObj.criticalControlPoint) || undefined,
            sensoryCue: sanitizeString(stepObj.sensoryCue || stepObj.sensoryCues) || undefined,
            soundscapeType: stepObj.soundscapeType || 'sizzle',
            spokenNarration: sanitizeString(stepObj.spokenNarration) || undefined,
            ingredientAdditions: Array.isArray(stepObj.ingredientAdditions) ? stepObj.ingredientAdditions : []
          });
          stepNum++;
        }
      } else {
        errors.push(`Invalid instruction entry at step ${stepNum}.`);
      }
    }
  }

  if (timelineSteps.length === 0 && !errors.some(e => e.includes('timelineSteps') || e.includes('instructions'))) {
    errors.push('Required field "timelineSteps" (or "instructions") must contain at least 1 valid preparation step.');
  }

  // 9. Category & Cuisine
  const cuisine = sanitizeString(raw.cuisine, 'Haute Gastronomy');
  const countryRegion = sanitizeString(raw.countryRegion, 'Global Atelier');
  const courseCategory = (raw.courseCategory || 'Main Course') as CulinaryMasterclass['courseCategory'];

  // 10. Primary Ingredient Connection & Reference Validation
  const primaryIngredientName = sanitizeString(raw.primaryIngredientName) ||
    (ingredientsList[0] ? ingredientsList[0].name : 'Artisanal Specimen');
  const primaryIngredientId = sanitizeString(raw.primaryIngredientId) ||
    createSlug(primaryIngredientName);
  const primaryIngredientSlug = sanitizeString(raw.primaryIngredientSlug) ||
    createSlug(primaryIngredientName);

  if (
    context.knownIngredientIds &&
    primaryIngredientId &&
    !context.knownIngredientIds.has(primaryIngredientId) &&
    !context.batchIngredientIds?.has(primaryIngredientId)
  ) {
    warnings.push(
      `Referenced primary ingredient ID "${primaryIngredientId}" was not found in catalog or import batch. Dynamic fallback linking will activate.`
    );
  }

  // 11. Image & Fallback
  const candidateImage = sanitizeString(raw.heroImageUrl || raw.imageUrl || raw.image);
  let heroImageUrl: string;
  if (isValidImageUrl(candidateImage)) {
    heroImageUrl = candidateImage;
  } else {
    const chain = getRecipeFallbackChain({
      dishTitle,
      cuisine,
      heroImageUrl: candidateImage,
      primaryIngredientName
    });
    heroImageUrl = chain[0];
    if (candidateImage) {
      warnings.push(`Invalid recipe hero image URL "${candidateImage}". Using culinary fallback.`);
    } else {
      warnings.push('Recipe hero image URL missing. Using culinary fallback.');
    }
  }

  // 12. Near-Duplicate Recipe Detection
  let nearDuplicateMatch: { matchedId: string; matchedTitle: string; similarity: number } | undefined;
  if (context.checkNearDuplicates !== false && effectiveOverview.length >= 50) {
    const simIndex = context.similarityIndex || globalSimilarityIndex;
    const match = simIndex.findNearDuplicate(effectiveOverview, id, 0.82);
    if (match) {
      nearDuplicateMatch = match;
      warnings.push(
        `Potential near-duplicate content detected: recipe narrative is ${Math.round(match.similarity * 100)}% similar to existing item "${match.matchedId}" ("${match.matchedTitle}"). Unique culinary narrative is required to prevent search engine duplicate content penalties.`
      );
    }
  }

  // 13. SEO Metadata Validation & Automated Enhancement
  if (raw.seoTitle) {
    if (raw.seoTitle.length < 15) {
      warnings.push(`Custom SEO title is too short (${raw.seoTitle.length} chars). Recommend 45–65 characters for optimal search visibility.`);
    }
  }
  if (raw.seoDescription) {
    if (raw.seoDescription.length < 50) {
      warnings.push(`Custom SEO description is too short (${raw.seoDescription.length} chars). Recommend 120–160 characters for complete search snippets.`);
    } else if (raw.seoDescription.length > 200) {
      warnings.push(`Custom SEO description is excessively long (${raw.seoDescription.length} chars). Search engines truncate snippets over 160 characters.`);
    }
  }

  const seoTitle = sanitizeString(raw.seoTitle || raw.seo?.title) ||
    generateCanonicalSeoTitle('recipe', dishTitle, { cuisine });

  const seoDescription = sanitizeString(raw.seoDescription || raw.seo?.description) ||
    generateCanonicalMetaDescription('recipe', {
      nameOrTitle: dishTitle,
      overviewOrDescription: overview,
      originOrCuisine: cuisine,
      flavorNotesOrPrimaryIng: primaryIngredientName
    });

  const seoKeywords = sanitizeStringArray([
    ...(raw.seoKeywords || []),
    ...(raw.seo?.keywords || []),
    dishTitle,
    cuisine,
    primaryIngredientName,
    ...(raw.tags || [])
  ]);

  const tools: CulinaryTool[] = Array.isArray(raw.requiredTools) && raw.requiredTools.length > 0
    ? raw.requiredTools
    : [
        { id: 'copper-saucier', name: 'Solid French Copper Saucier 2.5mm', category: 'Cookware', material: 'Copper & Stainless Lining', purpose: 'Uniform heat distribution for glossy emulsified sauces.' },
        { id: 'chef-knife', name: 'Hand-Forged High-Carbon Steel Slicing Knife', category: 'Cutlery', material: 'Aogami Super Carbon Steel', purpose: 'Clean cell incisions preserving natural moisture.' }
      ];

  const sommelierPairing = raw.sommelierPairing || {
    vintage: 'Domaine de la Romanée-Conti Grand Cru',
    terroir: 'Burgundy Côte de Nuits, France',
    tastingNote: 'Silken tannins with wild forest floor, dark cherry aromatics, and structured minerality.'
  };

  const normalizedRecipe: CulinaryMasterclass = {
    id,
    slug: finalSlug,
    primaryIngredientId,
    primaryIngredientSlug,
    primaryIngredientName,
    dishTitle,
    name: dishTitle,
    subtitle,
    cuisine,
    countryRegion,
    category: courseCategory,
    courseCategory,
    recipeNumber: typeof raw.recipeNumber === 'number' ? raw.recipeNumber : undefined,
    overview,
    description: overview,
    chefRationale: sanitizeString(raw.chefRationale, `Balancing the volatile terroir aromas of ${primaryIngredientName} with precise thermal technique.`),
    difficulty,
    servings,
    totalPrepTimeMinutes: prepMinutes,
    totalCookTimeMinutes: cookMinutes,
    overallDurationFormatted: durationFormatted,
    flavorAromaProfile: {
      umami: typeof raw.flavorAromaProfile?.umami === 'number' ? raw.flavorAromaProfile.umami : 85,
      acidity: typeof raw.flavorAromaProfile?.acidity === 'number' ? raw.flavorAromaProfile.acidity : 40,
      aromaticIntensity: typeof raw.flavorAromaProfile?.aromaticIntensity === 'number' ? raw.flavorAromaProfile.aromaticIntensity : 90,
      textureComplexity: typeof raw.flavorAromaProfile?.textureComplexity === 'number' ? raw.flavorAromaProfile.textureComplexity : 80,
      finishLength: typeof raw.flavorAromaProfile?.finishLength === 'number' ? raw.flavorAromaProfile.finishLength : 88,
    },
    requiredTools: tools,
    ingredientsList,
    ingredients: ingredientsList,
    timelineSteps,
    instructions: timelineSteps,
    platingPresentation: sanitizeString(raw.platingPresentation, 'Composed with architectural balance on dark artisanal stone ceramics.'),
    sommelierPairing,
    heroImageUrl,
    imageUrl: heroImageUrl,
    image: heroImageUrl,
    galleryImages: sanitizeStringArray(raw.galleryImages).length > 0 ? sanitizeStringArray(raw.galleryImages) : [heroImageUrl],
    videoReelUrl: sanitizeString(raw.videoReelUrl) || undefined,
    tags: sanitizeStringArray(raw.tags),
    trendScore: typeof raw.trendScore === 'number' ? raw.trendScore : 95.0,
    hotnessRank: typeof raw.hotnessRank === 'number' ? raw.hotnessRank : undefined,
    isHottest: Boolean(raw.isHottest),
    awardBadge: sanitizeString(raw.awardBadge) || undefined,
    createdAt: sanitizeString(raw.createdAt) || new Date().toISOString(),
    seoTitle,
    seoDescription,
    seoKeywords
  };

  // Generate automated Schema.org structured data
  const structuredData = raw.seo?.structuredData || generateStructuredDataForRecipe(normalizedRecipe, context.baseUrl);

  const seo: ContentSEOInfo = {
    title: seoTitle,
    description: seoDescription,
    keywords: seoKeywords,
    canonicalUrl: raw.seo?.canonicalUrl || `/recipes/${finalSlug}`,
    ogImage: heroImageUrl,
    structuredData
  };

  normalizedRecipe.seo = seo;

  // Calculate algorithmic Content Quality & SEO Health Scores (0-100)
  const qualityScore = Math.max(0, Math.min(100, Math.round(
    100 - (errors.length * 35) - (warnings.length * 8) + (effectiveOverview.length > 120 ? 5 : 0)
  )));

  const seoScore = Math.max(0, Math.min(100, Math.round(
    100 - (candidateImage ? 0 : 15) - (raw.seoTitle ? 0 : 5) - (raw.seoDescription ? 0 : 5)
  )));

  return {
    isValid: errors.length === 0,
    data: errors.length === 0 ? normalizedRecipe : undefined,
    errors,
    warnings,
    originalInput: rawInput,
    qualityScore,
    seoScore,
    nearDuplicateMatch
  };
}
