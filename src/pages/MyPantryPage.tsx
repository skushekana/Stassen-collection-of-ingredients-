import React, { useState, useEffect } from 'react';
import { Ingredient, CulinaryMasterclass, PantryItemEntry } from '../types';
import {
  Bookmark,
  Sparkles,
  Trash2,
  ChefHat,
  Plus,
  ArrowRight,
  Package,
  Layers,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { pantryService } from '../services/pantryService';
import { recipeService } from '../services/recipeService';
import { shoppingListService } from '../services/shoppingListService';
import { IngredientImage } from '../components/IngredientImage';

interface MyPantryPageProps {
  allIngredients: Ingredient[];
  savedIds: string[];
  onToggleSave: (id: string) => void;
  onSelectIngredient: (ingredient: Ingredient) => void;
  onCookRecipe: (recipe: CulinaryMasterclass) => void;
  onNavigateToCollection: () => void;
}

export const MyPantryPage: React.FC<MyPantryPageProps> = ({
  allIngredients,
  savedIds,
  onToggleSave,
  onSelectIngredient,
  onCookRecipe,
  onNavigateToCollection
}) => {
  const [pantryMap, setPantryMap] = useState<Record<string, PantryItemEntry>>({});
  const [filterStockOnly, setFilterStockOnly] = useState(false);

  useEffect(() => {
    const unsub = pantryService.subscribe((p) => setPantryMap(p));
    return () => unsub();
  }, []);

  // Filtered saved ingredients in pantry
  const pantryIngredients = allIngredients.filter((ing) => savedIds.includes(ing.id));

  // Saved Recipes
  const [savedRecipes, setSavedRecipes] = useState<CulinaryMasterclass[]>([]);

  useEffect(() => {
    setSavedRecipes(recipeService.getBookmarkedRecipes());
  }, []);

  const handleRemoveSavedRecipe = (recipeId: string) => {
    recipeService.toggleRecipeBookmark(recipeId);
    setSavedRecipes(recipeService.getBookmarkedRecipes());
  };

  // Recipes that match your pantry (Pantry Matchmaker)
  const allRecipes = recipeService.getAllRecipes();
  const matchedRecipes = allRecipes
    .map((recipe) => ({
      recipe,
      match: pantryService.calculateRecipeMatch(recipe, savedIds)
    }))
    .filter((item) => item.match.matchedCount > 0)
    .sort((a, b) => b.match.matchPercentage - a.match.matchPercentage)
    .slice(0, 6);

  const handleUpdateStock = (ingredientId: string, inStock: boolean) => {
    pantryService.updatePantryEntry(ingredientId, { inStock });
  };

  const handleUpdateLevel = (ingredientId: string, stockLevel: any) => {
    pantryService.updatePantryEntry(ingredientId, { stockLevel });
  };

  return (
    <div id="my-pantry-page" className="min-h-screen bg-[#121212] text-[#F5F5F0] pt-24 pb-20 px-4 sm:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-6 border-b border-[#F5F5F0]/10">
          <div>
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A059] font-medium block mb-2">
              Visitor Cellar & Inventory
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#F5F5F0] tracking-tight">
              My Pantry & Rare Cellar
            </h1>
            <p className="text-xs sm:text-sm text-[#F5F5F0]/60 mt-1">
              Your personal inventory of archived specimens, reserve ingredients, and dynamic recipe pairings.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <span className="px-3.5 py-1.5 bg-[#1E1E1E] border border-[#C5A059]/30 text-[#C5A059] text-xs font-medium uppercase tracking-wider">
              {pantryIngredients.length} Saved Specimens
            </span>
            <button
              onClick={onNavigateToCollection}
              className="px-4 py-2 bg-[#C5A059] text-[#121212] hover:bg-[#d4b066] text-xs uppercase tracking-wider font-medium flex items-center space-x-1.5 transition-all"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Browse Archive</span>
            </button>
          </div>
        </div>

        {/* Section 1: Pantry Items Grid */}
        {pantryIngredients.length > 0 ? (
          <div className="mb-16">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-serif text-xl sm:text-2xl text-[#F5F5F0] flex items-center space-x-2">
                <Package className="w-5 h-5 text-[#C5A059]" />
                <span>Cellar Inventory ({pantryIngredients.length})</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pantryIngredients.map((ingredient) => {
                const entry = pantryMap[ingredient.id];
                const inStock = entry?.inStock ?? true;
                const level = entry?.stockLevel || 'Full';

                return (
                  <div
                    key={ingredient.id}
                    className="bg-[#1E1E1E] border border-[#F5F5F0]/10 hover:border-[#C5A059]/40 transition-all p-5 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => onSelectIngredient(ingredient)}>
                          <div className="w-14 h-14 shrink-0 bg-black/40 border border-white/10 overflow-hidden">
                            <IngredientImage
                              ingredient={ingredient}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <span className="text-[9px] uppercase tracking-wider text-[#C5A059] block">
                              {ingredient.category}
                            </span>
                            <h3 className="font-serif text-base sm:text-lg text-[#F5F5F0] hover:text-[#C5A059] transition-colors">
                              {ingredient.name}
                            </h3>
                            <span className="text-[10px] text-[#F5F5F0]/50">{ingredient.origin}</span>
                          </div>
                        </div>

                        <button
                          onClick={() => onToggleSave(ingredient.id)}
                          className="p-1.5 text-[#F5F5F0]/40 hover:text-red-400 transition-colors"
                          title="Remove from cellar"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Stock Level & Location Controls */}
                      <div className="p-3 bg-[#252525] border border-white/5 mb-3 text-xs flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleUpdateStock(ingredient.id, !inStock)}
                            className={`flex items-center space-x-1.5 px-2 py-0.5 text-[10px] uppercase tracking-wider border ${
                              inStock
                                ? 'bg-emerald-950/40 border-emerald-600/40 text-emerald-300'
                                : 'bg-amber-950/40 border-amber-600/40 text-amber-300'
                            }`}
                          >
                            <span className={`w-1.5 h-1.5 rounded-full ${inStock ? 'bg-emerald-400' : 'bg-amber-400'}`} />
                            <span>{inStock ? 'In Stock' : 'Replenish Soon'}</span>
                          </button>
                        </div>

                        <select
                          value={level}
                          onChange={(e) => handleUpdateLevel(ingredient.id, e.target.value)}
                          className="bg-[#1E1E1E] text-[10px] text-[#F5F5F0]/80 border border-white/10 px-2 py-0.5"
                        >
                          <option value="Full">Stock: Full</option>
                          <option value="Moderate">Stock: Moderate</option>
                          <option value="Low">Stock: Low</option>
                          <option value="Reserve Only">Stock: Reserve</option>
                        </select>
                      </div>

                      {/* Flavor Notes */}
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {ingredient.flavorNotes.slice(0, 3).map((note, idx) => (
                          <span key={idx} className="px-2 py-0.5 bg-[#181818] text-[9px] text-[#F5F5F0]/70">
                            {note}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Quick Action Footer */}
                    <div className="pt-3 border-t border-[#F5F5F0]/10 flex items-center justify-between text-xs">
                      <button
                        onClick={() => shoppingListService.addIngredient(ingredient)}
                        className="text-[#C5A059] hover:underline flex items-center space-x-1"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add to List</span>
                      </button>

                      <button
                        onClick={() => onSelectIngredient(ingredient)}
                        className="text-[#F5F5F0]/60 hover:text-white flex items-center space-x-1"
                      >
                        <span>View Dossier</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          /* Empty Cellar Zero State */
          <div className="p-12 text-center bg-[#181818] border border-[#F5F5F0]/10 max-w-xl mx-auto mb-16">
            <Bookmark className="w-10 h-10 text-[#C5A059]/40 mx-auto mb-4" />
            <h3 className="font-serif text-2xl text-[#F5F5F0] mb-2">Your Pantry is Currently Empty</h3>
            <p className="text-xs sm:text-sm text-[#F5F5F0]/60 mb-6 leading-relaxed">
              Bookmark ingredients across the archive using the save icon on any specimen card to track your stock, cellar storage, and unlocked recipes.
            </p>
            <button
              onClick={onNavigateToCollection}
              className="px-6 py-3 bg-[#C5A059] text-[#121212] font-medium text-xs uppercase tracking-widest hover:bg-[#d4b066] transition-all"
            >
              Explore Ingredient Archive
            </button>
          </div>
        )}

        {/* Section 2: "Pantry Matchmaker" (What You Can Cook Right Now) */}
        {/* Section 2: Saved Masterclasses from 1,000+ Archive */}
        <section id="saved-masterclasses-section" className="p-6 sm:p-8 bg-[#181818] border border-[#F5F5F0]/10 mb-8">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#F5F5F0]/10">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-[#C5A059]/10 text-[#C5A059] border border-[#C5A059]/30">
                <Bookmark className="w-5 h-5 fill-current" />
              </div>
              <div>
                <h2 className="font-serif text-xl sm:text-2xl text-[#F5F5F0]">
                  Saved Masterclasses ({savedRecipes.length})
                </h2>
                <p className="text-xs text-[#F5F5F0]/60 mt-0.5">
                  Bookmarked recipes saved from the 1,000+ culinary archive ready for cooking
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                if (typeof window !== 'undefined') {
                  window.location.hash = '#/recipes-archive';
                }
              }}
              className="text-xs text-[#C5A059] hover:underline uppercase tracking-wider flex items-center space-x-1"
            >
              <span>Explore 1,000+ Archive</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {savedRecipes.length === 0 ? (
            <div className="text-center py-10 border border-dashed border-[#F5F5F0]/10 bg-[#161616] p-6">
              <Bookmark className="w-8 h-8 text-[#C5A059]/40 mx-auto mb-3" />
              <p className="font-serif text-lg text-[#F5F5F0] mb-1">No Saved Recipes Yet</p>
              <p className="text-xs text-[#F5F5F0]/50 max-w-md mx-auto mb-4">
                Bookmark recipes across the 1,000+ archive using the save icon on any recipe card to build your personal cookbook.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedRecipes.map((recipe) => (
                <div
                  key={recipe.id}
                  className="bg-[#1E1E1E] border border-[#C5A059]/30 hover:border-[#C5A059] transition-all p-5 flex flex-col justify-between group shadow-lg"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs mb-2">
                      <span className="text-[10px] uppercase tracking-wider text-[#C5A059]">
                        {recipe.cuisine || 'Haute Cuisine'} • {recipe.overallDurationFormatted}
                      </span>
                      <button
                        onClick={() => handleRemoveSavedRecipe(recipe.id)}
                        className="text-[#F5F5F0]/40 hover:text-red-400 p-1 transition-colors"
                        title="Remove from saved recipes"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <h3 className="font-serif text-lg text-[#F5F5F0] group-hover:text-[#C5A059] transition-colors mb-2 leading-snug">
                      {recipe.dishTitle}
                    </h3>

                    <p className="text-xs text-[#F5F5F0]/70 line-clamp-2 mb-4">
                      {recipe.overview}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#F5F5F0]/10 flex items-center justify-between">
                    <button
                      onClick={() => shoppingListService.addRecipeIngredients(recipe)}
                      className="text-xs text-[#F5F5F0]/60 hover:text-[#C5A059] transition-colors"
                    >
                      + Provisions
                    </button>

                    <button
                      onClick={() => onCookRecipe(recipe)}
                      className="px-3.5 py-1.5 bg-[#C5A059] text-black hover:bg-[#d6b168] text-xs uppercase tracking-wider font-medium transition-all flex items-center space-x-1"
                    >
                      <span>Cook Masterclass</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Section 3: Pantry Matchmaker */}
        {matchedRecipes.length > 0 && (
          <section id="pantry-matchmaker-section" className="p-6 sm:p-8 bg-[#181818] border border-[#F5F5F0]/10">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#F5F5F0]/10">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-[#C5A059]/10 text-[#C5A059] rounded-none border border-[#C5A059]/30">
                  <ChefHat className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-serif text-xl sm:text-2xl text-[#F5F5F0]">
                    Pantry Matchmaker: Ready to Cook
                  </h2>
                  <p className="text-xs text-[#F5F5F0]/60 mt-0.5">
                    Haute gastronomy masterclasses calibrated with ingredients currently saved in your cellar
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {matchedRecipes.map(({ recipe, match }) => (
                <div
                  key={recipe.id}
                  className="bg-[#1E1E1E] border border-[#F5F5F0]/10 hover:border-[#C5A059]/40 transition-all p-5 flex flex-col justify-between"
                >
                  <div>
                    {/* Match Score Badge */}
                    <div className="flex items-center justify-between text-xs mb-2">
                      <span className="text-[10px] uppercase tracking-wider text-[#C5A059]">
                        {recipe.cuisine || 'Haute Cuisine'}
                      </span>
                      <span className="px-2 py-0.5 bg-emerald-950/60 border border-emerald-600/40 text-emerald-300 text-[10px] uppercase tracking-wider font-medium">
                        {match.matchPercentage}% Pantry Match
                      </span>
                    </div>

                    <h3 className="font-serif text-lg text-[#F5F5F0] mb-2 leading-snug">
                      {recipe.dishTitle}
                    </h3>

                    <p className="text-xs text-[#F5F5F0]/70 line-clamp-2 mb-4">
                      {recipe.overview}
                    </p>

                    {match.missingIngredients.length > 0 && (
                      <div className="mb-4 text-[11px] text-[#F5F5F0]/60">
                        <span className="text-amber-400/90 font-medium block mb-1">Missing for full recipe:</span>
                        <div className="flex flex-wrap gap-1">
                          {match.missingIngredients.slice(0, 2).map((m, idx) => (
                            <span key={idx} className="px-1.5 py-0.5 bg-[#252525] text-[10px] text-amber-200/80">
                              + {m}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="pt-4 border-t border-[#F5F5F0]/10 flex items-center justify-between">
                    <button
                      onClick={() => shoppingListService.addRecipeIngredients(recipe)}
                      className="text-xs text-[#F5F5F0]/60 hover:text-[#C5A059] transition-colors"
                    >
                      + Missing to List
                    </button>

                    <button
                      onClick={() => onCookRecipe(recipe)}
                      className="px-3 py-1.5 bg-[#C5A059] text-[#121212] hover:bg-[#d6b168] text-xs uppercase tracking-wider font-medium transition-all flex items-center space-x-1"
                    >
                      <span>Cook Dish</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
