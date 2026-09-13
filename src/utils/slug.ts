/**
 * SEO-Optimized Slug Generation and Normalization Utility
 * Creates stable, URL-safe, lowercase slugs for ingredients and recipes.
 */

/**
 * Generate a clean, SEO-friendly URL slug from any title or name.
 * Handles diacritics, non-alphanumeric characters, and multiple spaces.
 */
export function createSlug(input: string): string {
  if (!input) return '';
  
  return input
    .toString()
    .normalize('NFD') // Decompose combined graphemes into base character + diacritical mark
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritical marks (accents)
    .toLowerCase()
    .trim()
    .replace(/['’]/g, '') // Remove apostrophes (e.g. Stassen's -> stassens)
    .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric characters with hyphens
    .replace(/^-+|-+$/g, '') // Remove leading & trailing hyphens
    .replace(/-{2,}/g, '-'); // Collapse multiple consecutive hyphens into one
}

/**
 * Ensures a slug is unique within a set of known slugs.
 * If collision occurs, appends -2, -3, etc.
 */
export function ensureUniqueSlug(baseSlug: string, existingSlugs: Set<string>): string {
  let slug = baseSlug || 'item';
  if (!existingSlugs.has(slug)) {
    existingSlugs.add(slug);
    return slug;
  }

  let counter = 2;
  while (existingSlugs.has(`${slug}-${counter}`)) {
    counter++;
  }

  const uniqueSlug = `${slug}-${counter}`;
  existingSlugs.add(uniqueSlug);
  return uniqueSlug;
}

/**
 * Safely resolves the slug for an ingredient, falling back to ID or generating from name.
 */
export function getIngredientSlug(ingredient: { slug?: string; id: string; name?: string }): string {
  if (ingredient.slug && ingredient.slug.trim()) {
    return ingredient.slug.trim();
  }
  if (ingredient.id && ingredient.id.trim()) {
    return createSlug(ingredient.id);
  }
  return createSlug(ingredient.name || 'ingredient');
}

/**
 * Safely resolves the slug for a recipe, falling back to ID or generating from dishTitle.
 */
export function getRecipeSlug(recipe: { slug?: string; id: string; dishTitle?: string }): string {
  if (recipe.slug && recipe.slug.trim()) {
    return recipe.slug.trim();
  }
  if (recipe.id && recipe.id.trim()) {
    return createSlug(recipe.id);
  }
  return createSlug(recipe.dishTitle || 'recipe');
}
