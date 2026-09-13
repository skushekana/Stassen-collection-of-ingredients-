import { Ingredient, CulinaryMasterclass } from '../types';
import { createSlug } from '../utils/slug';

/**
 * Normalizes strings for robust fuzzy and case-insensitive matching
 */
function normalizeMatchKey(str: string): string {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // remove diacritics (e.g. café -> cafe)
    .replace(/[^a-z0-9]/g, '');
}

/**
 * Bi-directional Relational Content Index
 * Maintains high-speed indexed relations between 1,000+ botanical ingredients
 * and thousands of culinary recipes.
 */
export class RelationshipManager {
  // Ingredient -> Recipes
  private ingredientToRecipes: Map<string, Set<string>> = new Map();
  // Recipe -> Ingredients
  private recipeToIngredients: Map<string, Set<string>> = new Map();
  // Alias / Name Normalized Key -> Ingredient ID
  private nameAndAliasIndex: Map<string, string> = new Map();

  /**
   * Reset or clear indexed graph
   */
  public clear(): void {
    this.ingredientToRecipes.clear();
    this.recipeToIngredients.clear();
    this.nameAndAliasIndex.clear();
  }

  /**
   * Index an ingredient and all its aliases into the relationship graph
   */
  public indexIngredient(ingredient: Ingredient): void {
    const ingId = ingredient.id;
    const ingSlug = ingredient.slug || createSlug(ingredient.name);

    // Register name
    this.nameAndAliasIndex.set(normalizeMatchKey(ingredient.name), ingId);
    if (ingredient.scientificName) {
      this.nameAndAliasIndex.set(normalizeMatchKey(ingredient.scientificName), ingId);
    }

    // Register all aliases
    if (ingredient.aliases && Array.isArray(ingredient.aliases)) {
      for (const alias of ingredient.aliases) {
        if (alias) {
          this.nameAndAliasIndex.set(normalizeMatchKey(alias), ingId);
        }
      }
    }

    // Ensure map entry exists
    if (!this.ingredientToRecipes.has(ingId)) {
      this.ingredientToRecipes.set(ingId, new Set());
    }
    if (ingSlug && !this.ingredientToRecipes.has(ingSlug)) {
      this.ingredientToRecipes.set(ingSlug, new Set());
    }

    // If ingredient has explicitly designated relatedRecipeIds, register them
    if (ingredient.relatedRecipeIds && Array.isArray(ingredient.relatedRecipeIds)) {
      for (const recId of ingredient.relatedRecipeIds) {
        this.addRelationship(ingId, recId);
        if (ingSlug) this.addRelationship(ingSlug, recId);
      }
    }
  }

  /**
   * Index a recipe and connect it to all referenced ingredients
   */
  public indexRecipe(
    recipe: CulinaryMasterclass,
    allIngredientsById: Map<string, Ingredient>
  ): void {
    const recId = recipe.id;
    const recSlug = recipe.slug || createSlug(recipe.dishTitle);

    if (!this.recipeToIngredients.has(recId)) {
      this.recipeToIngredients.set(recId, new Set());
    }

    // 1. Link Primary Ingredient by ID, Slug, or Name
    let matchedPrimaryId: string | undefined = undefined;

    if (recipe.primaryIngredientId && allIngredientsById.has(recipe.primaryIngredientId)) {
      matchedPrimaryId = recipe.primaryIngredientId;
    } else if (recipe.primaryIngredientSlug) {
      const found = Array.from(allIngredientsById.values()).find(
        i => i.slug === recipe.primaryIngredientSlug || i.id === recipe.primaryIngredientSlug
      );
      if (found) matchedPrimaryId = found.id;
    }

    if (!matchedPrimaryId && recipe.primaryIngredientName) {
      matchedPrimaryId = this.findIngredientIdByNameOrAlias(recipe.primaryIngredientName);
    }

    if (matchedPrimaryId) {
      this.addRelationship(matchedPrimaryId, recId);
      if (recSlug) this.addRelationship(matchedPrimaryId, recSlug);
      
      const ing = allIngredientsById.get(matchedPrimaryId);
      if (ing?.slug) {
        this.addRelationship(ing.slug, recId);
      }
    }

    // 2. Link Ingredients in Ingredients List
    if (recipe.ingredientsList && Array.isArray(recipe.ingredientsList)) {
      for (const item of recipe.ingredientsList) {
        let itemId = item.ingredientId;
        if (!itemId && item.ingredientSlug) {
          const found = Array.from(allIngredientsById.values()).find(
            i => i.slug === item.ingredientSlug || i.id === item.ingredientSlug
          );
          if (found) itemId = found.id;
        }
        if (!itemId && item.name) {
          itemId = this.findIngredientIdByNameOrAlias(item.name);
        }

        if (itemId) {
          this.addRelationship(itemId, recId);
          if (recSlug) this.addRelationship(itemId, recSlug);
          const ing = allIngredientsById.get(itemId);
          if (ing?.slug) {
            this.addRelationship(ing.slug, recId);
          }
        }
      }
    }
  }

  /**
   * Add a bi-directional edge between ingredient and recipe
   */
  public addRelationship(ingredientIdentifier: string, recipeIdentifier: string): void {
    // Ing -> Rec
    let recSet = this.ingredientToRecipes.get(ingredientIdentifier);
    if (!recSet) {
      recSet = new Set();
      this.ingredientToRecipes.set(ingredientIdentifier, recSet);
    }
    recSet.add(recipeIdentifier);

    // Rec -> Ing
    let ingSet = this.recipeToIngredients.get(recipeIdentifier);
    if (!ingSet) {
      ingSet = new Set();
      this.recipeToIngredients.set(recipeIdentifier, ingSet);
    }
    ingSet.add(ingredientIdentifier);
  }

  /**
   * Resolve an ingredient ID by exact name, fuzzy name, or registered alias
   */
  public findIngredientIdByNameOrAlias(name: string): string | undefined {
    if (!name) return undefined;
    return this.nameAndAliasIndex.get(normalizeMatchKey(name));
  }

  /**
   * Get all recipe IDs or slugs linked to an ingredient
   */
  public getRecipeIdsForIngredient(ingredientIdentifier: string): string[] {
    const set = this.ingredientToRecipes.get(ingredientIdentifier);
    return set ? Array.from(set) : [];
  }

  /**
   * Get all ingredient IDs or slugs linked to a recipe
   */
  public getIngredientIdsForRecipe(recipeIdentifier: string): string[] {
    const set = this.recipeToIngredients.get(recipeIdentifier);
    return set ? Array.from(set) : [];
  }

  /**
   * Check if a recipe and ingredient are linked
   */
  public isLinked(ingredientIdentifier: string, recipeIdentifier: string): boolean {
    const recSet = this.ingredientToRecipes.get(ingredientIdentifier);
    return Boolean(recSet?.has(recipeIdentifier));
  }
}

export const relationshipManager = new RelationshipManager();
