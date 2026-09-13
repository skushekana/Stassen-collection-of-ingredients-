import React, { useState, useMemo } from 'react';
import { ChefHat, Search, CheckCircle2, AlertCircle, ShoppingBag, Clock, Sparkles, Filter, X, ArrowRight, BookOpen, Plus, Flame, RefreshCw } from 'lucide-react';
import { CulinaryMasterclass, Ingredient } from '../types';
import { recipeService, CUISINE_REGIONS, DIFFICULTY_LEVELS } from '../services/recipeService';
import { shoppingListService } from '../services/shoppingListService';
import { CulinaryImage } from '../components/CulinaryImage';

interface WhatCanICookPageProps {
  allIngredients: Ingredient[];
  onCookRecipe: (recipe: CulinaryMasterclass) => void;
  onOpenMasterclass: (ingredient?: Ingredient) => void;
  onNavigateToCollection: () => void;
}

export const WhatCanICookPage: React.FC<WhatCanICookPageProps> = ({
  allIngredients,
  onCookRecipe,
  onOpenMasterclass,
  onNavigateToCollection,
}) => {
  // User's on-hand ingredients state (store ingredient names or IDs)
  const [selectedOnHand, setSelectedOnHand] = useState<string[]>([
    'Saffron',
    'Truffle',
    'Single-Estate Olive Oil',
    'Maldon Flake Salt'
  ]);
  const [customInput, setCustomInput] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState('All Cuisines');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All Difficulties');
  const [maxTime, setMaxTime] = useState<number>(0); // 0 = any
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Pre-populated quick pantry baskets for 1-click convenience
  const pantryPresets = [
    { label: 'Truffle & Saffron Reserve', items: ['Saffron', 'Truffle', 'Single-Estate Olive Oil', 'Maldon Flake Salt'] },
    { label: 'Japanese Kaiseki Basket', items: ['Matcha', 'Yuzu', 'Dashi Broth', 'Shiitake', 'Miso'] },
    { label: 'Mediterranean Botanical', items: ['Rosemary', 'Thyme', 'Extra Virgin Olive Oil', 'Garlic', 'Sea Salt'] },
    { label: 'Spiced Artisanal Vault', items: ['Cardamom', 'Vanilla Bean', 'Cinnamon', 'Star Anise', 'Honey'] }
  ];

  // All available recipe masterclasses
  const allRecipes = useMemo(() => recipeService.getAllRecipes(), []);

  // Add ingredient to on-hand list
  const handleAddIngredient = (name: string) => {
    const trimmed = name.trim();
    if (!trimmed) return;
    if (!selectedOnHand.some(i => i.toLowerCase() === trimmed.toLowerCase())) {
      setSelectedOnHand([...selectedOnHand, trimmed]);
    }
    setCustomInput('');
  };

  // Remove ingredient from on-hand list
  const handleRemoveIngredient = (name: string) => {
    setSelectedOnHand(selectedOnHand.filter(i => i !== name));
  };

  // Match recipes against on-hand ingredients
  const matchedRecipes = useMemo(() => {
    const userIngredientsLower = selectedOnHand.map(i => i.toLowerCase());

    return allRecipes.map(recipe => {
      // Extract recipe ingredients list names
      const recipeIngNames = recipe.ingredientsList.map(i => i.name.toLowerCase());
      const primaryName = recipe.primaryIngredientName.toLowerCase();
      
      const totalCount = Math.max(recipe.ingredientsList.length, 1);
      
      let matchedCount = 0;
      const matchedItems: string[] = [];
      const missingItems: string[] = [];

      recipe.ingredientsList.forEach(ing => {
        const ingLower = ing.name.toLowerCase();
        const hasIt = userIngredientsLower.some(userIng => 
          ingLower.includes(userIng) || userIng.includes(ingLower)
        );
        if (hasIt) {
          matchedCount++;
          matchedItems.push(ing.name);
        } else {
          missingItems.push(ing.name);
        }
      });

      // Also check primary ingredient
      const primaryHasIt = userIngredientsLower.some(userIng => 
        primaryName.includes(userIng) || userIng.includes(primaryName)
      );

      const matchPercentage = Math.round((matchedCount / totalCount) * 100);

      return {
        recipe,
        matchPercentage,
        matchedCount,
        matchedItems,
        missingItems,
        primaryHasIt
      };
    }).filter(item => {
      // Apply filters
      const recipe = item.recipe;

      if (selectedCuisine !== 'All Cuisines') {
        if (recipe.cuisine?.toLowerCase() !== selectedCuisine.toLowerCase()) {
          return false;
        }
      }

      if (selectedDifficulty !== 'All Difficulties') {
        if (recipe.difficulty?.toLowerCase() !== selectedDifficulty.toLowerCase()) {
          return false;
        }
      }

      if (maxTime > 0) {
        const total = (recipe.totalPrepTimeMinutes || 0) + (recipe.totalCookTimeMinutes || 0);
        if (total > maxTime) return false;
      }

      return true;
    }).sort((a, b) => {
      // Sort primarily by match percentage descending, then trend score
      if (b.matchPercentage !== a.matchPercentage) {
        return b.matchPercentage - a.matchPercentage;
      }
      return (b.recipe.trendScore || 0) - (a.recipe.trendScore || 0);
    });
  }, [allRecipes, selectedOnHand, selectedCuisine, selectedDifficulty, maxTime]);

  // Add missing ingredients for a recipe to shopping list
  const handleAddMissingToShoppingList = (recipe: CulinaryMasterclass, missingItems: string[]) => {
    if (missingItems.length === 0) {
      showToast(`You already have all ingredients for "${recipe.dishTitle}"!`);
      return;
    }

    missingItems.forEach(item => {
      shoppingListService.addCustomItem(item, 'Missing Recipe Ingredient', 'As needed', `Recipe: ${recipe.dishTitle}`);
    });

    showToast(`Added ${missingItems.length} missing ingredients to your Shopping List!`);
  };

  return (
    <div className="min-h-screen bg-[#121212] text-[#F5F5F0] pt-28 pb-20 px-4 sm:px-8 lg:px-12">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#C5A059] text-black px-5 py-3 rounded-xl shadow-2xl font-mono text-xs font-bold uppercase tracking-wider flex items-center space-x-2 animate-bounce">
          <Sparkles className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto space-y-10">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#C5A059]/10 border border-[#C5A059]/30 text-[#C5A059] text-[11px] font-mono tracking-widest uppercase">
            <ChefHat className="w-3.5 h-3.5" />
            <span>Smart Culinary Matcher</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl tracking-tight text-[#F5F5F0]">
            What Can I Cook?
          </h1>
          <p className="text-sm sm:text-base text-[#F5F5F0]/70 font-light leading-relaxed">
            Select or enter the rare botanicals, spices, and ingredients you currently have on hand. Our archive will instantly match and rank over 1,000+ haute cuisine masterclasses.
          </p>
        </div>

        {/* Ingredient Input & Pantry Selection Box */}
        <div className="bg-[#181818] border border-[#F5F5F0]/10 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-sm font-mono tracking-wider uppercase text-[#C5A059] font-bold">
                1. Your On-Hand Ingredients ({selectedOnHand.length})
              </h2>
              <p className="text-xs text-white/60 font-light">
                Add your available ingredients below or choose a curated pantry preset.
              </p>
            </div>

            {selectedOnHand.length > 0 && (
              <button
                onClick={() => setSelectedOnHand([])}
                className="text-[11px] font-mono uppercase tracking-wider text-rose-400 hover:text-rose-300 transition-colors flex items-center space-x-1"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Clear All</span>
              </button>
            )}
          </div>

          {/* Quick Pantry Presets */}
          <div className="space-y-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-white/40 block">Quick Pantry Baskets:</span>
            <div className="flex flex-wrap gap-2">
              {pantryPresets.map((preset, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    const merged = Array.from(new Set([...selectedOnHand, ...preset.items]));
                    setSelectedOnHand(merged);
                    showToast(`Loaded ${preset.label}!`);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-[#C5A059]/20 border border-white/10 hover:border-[#C5A059]/50 text-xs text-[#F5F5F0] transition-all flex items-center space-x-1.5"
                >
                  <Sparkles className="w-3 h-3 text-[#C5A059]" />
                  <span>{preset.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Custom Input & Add */}
          <div className="flex items-center space-x-2">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              <input
                type="text"
                value={customInput}
                onChange={(e) => setCustomInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleAddIngredient(customInput);
                  }
                }}
                placeholder="Type ingredient (e.g., Saffron, Truffle, Wagyu, Rosemary)..."
                className="w-full bg-black/40 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-xs sm:text-sm text-[#F5F5F0] placeholder-white/30 focus:outline-none focus:border-[#C5A059] transition-all"
              />
            </div>
            <button
              onClick={() => handleAddIngredient(customInput)}
              className="px-5 py-3 bg-[#C5A059] hover:bg-[#d6b168] text-black text-xs font-mono font-bold uppercase tracking-wider rounded-xl transition-all shrink-0 flex items-center space-x-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Add</span>
            </button>
          </div>

          {/* Selected Tags Cloud */}
          {selectedOnHand.length > 0 ? (
            <div className="flex flex-wrap gap-2 pt-2">
              {selectedOnHand.map((item, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-[#C5A059]/15 border border-[#C5A059]/40 text-[#F5F5F0] text-xs font-medium"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>{item}</span>
                  <button
                    onClick={() => handleRemoveIngredient(item)}
                    className="hover:text-rose-400 transition-colors ml-1"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </span>
              ))}
            </div>
          ) : (
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>No ingredients selected. Add items above or click a quick basket to find matching recipes.</span>
            </div>
          )}

          {/* Available Archive Ingredient Quick Suggestions */}
          <div className="space-y-2 pt-2 border-t border-white/10">
            <span className="text-[10px] font-mono uppercase tracking-widest text-white/40 block">Popular Archive Specimens to Add:</span>
            <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto pr-2">
              {allIngredients.slice(0, 18).map((ing) => {
                const isSelected = selectedOnHand.some(i => i.toLowerCase() === ing.name.toLowerCase());
                return (
                  <button
                    key={ing.id}
                    onClick={() => {
                      if (!isSelected) handleAddIngredient(ing.name);
                    }}
                    disabled={isSelected}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-light transition-all flex items-center space-x-1 ${
                      isSelected
                        ? 'bg-[#C5A059]/20 text-[#C5A059] border border-[#C5A059]/40 opacity-60 cursor-default'
                        : 'bg-white/5 hover:bg-white/10 text-white/80 border border-white/5'
                    }`}
                  >
                    <span>{ing.name}</span>
                    {!isSelected && <Plus className="w-3 h-3 opacity-60" />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Filters Bar */}
        <div className="bg-[#181818] border border-[#F5F5F0]/10 rounded-2xl p-4 sm:p-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-2 text-xs font-mono uppercase text-[#C5A059]">
            <Filter className="w-4 h-4" />
            <span>Refine Results ({matchedRecipes.length} Matched)</span>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
            {/* Cuisine Filter */}
            <select
              value={selectedCuisine}
              onChange={(e) => setSelectedCuisine(e.target.value)}
              className="bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-xs text-[#F5F5F0] focus:outline-none focus:border-[#C5A059]"
            >
              {CUISINE_REGIONS.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>

            {/* Difficulty Filter */}
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-xs text-[#F5F5F0] focus:outline-none focus:border-[#C5A059]"
            >
              {DIFFICULTY_LEVELS.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>

            {/* Max Time Filter */}
            <select
              value={maxTime}
              onChange={(e) => setMaxTime(Number(e.target.value))}
              className="bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-xs text-[#F5F5F0] focus:outline-none focus:border-[#C5A059]"
            >
              <option value={0}>Any Cooking Time</option>
              <option value={20}>Under 20 Minutes</option>
              <option value={35}>Under 35 Minutes</option>
              <option value={60}>Under 60 Minutes</option>
            </select>
          </div>
        </div>

        {/* Results Grid */}
        {matchedRecipes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {matchedRecipes.map(({ recipe, matchPercentage, matchedItems, missingItems }, idx) => {
              const totalTime = (recipe.totalPrepTimeMinutes || 0) + (recipe.totalCookTimeMinutes || 0);

              return (
                <div
                  key={recipe.id}
                  className="bg-[#181818] border border-white/10 hover:border-[#C5A059]/50 rounded-2xl overflow-hidden shadow-2xl flex flex-col transition-all duration-300 group"
                >
                  {/* Card Header Image */}
                  <div className="relative h-48 sm:h-52 overflow-hidden bg-black/50">
                    <CulinaryImage
                      recipe={recipe}
                      src={recipe.heroImageUrl}
                      alt={`${recipe.dishTitle} — ${recipe.cuisine} recipe`}
                      priority={idx < 3}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      containerClassName="w-full h-full"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-transparent to-black/40 pointer-events-none z-10" />

                    {/* Match Badge */}
                    <div className="absolute top-3 left-3 bg-[#C5A059] text-black px-3 py-1 rounded-full text-[11px] font-mono font-bold uppercase tracking-wider shadow-lg flex items-center space-x-1">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{matchPercentage}% Match</span>
                    </div>

                    {/* Cuisine Tag */}
                    {recipe.cuisine && (
                      <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-md text-[#F5F5F0] px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-widest border border-white/10">
                        {recipe.cuisine}
                      </div>
                    )}

                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white/80 font-mono">
                      <div className="flex items-center space-x-1 bg-black/60 px-2.5 py-1 rounded-lg">
                        <Clock className="w-3.5 h-3.5 text-[#C5A059]" />
                        <span>{totalTime} mins</span>
                      </div>
                      <div className="bg-black/60 px-2.5 py-1 rounded-lg text-[#C5A059]">
                        {recipe.difficulty}
                      </div>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                    <div className="space-y-2">
                      <h3 className="font-serif text-lg text-[#F5F5F0] group-hover:text-[#C5A059] transition-colors line-clamp-2">
                        {recipe.dishTitle}
                      </h3>
                      <p className="text-xs text-white/60 font-light line-clamp-2">
                        {recipe.subtitle}
                      </p>
                    </div>

                    {/* Ingredients Match Breakdown */}
                    <div className="space-y-3 pt-3 border-t border-white/10 text-xs">
                      {/* Have */}
                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 block mb-1">
                          Ingredients You Have ({matchedItems.length}):
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {matchedItems.slice(0, 5).map((item, idx) => (
                            <span key={idx} className="px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-300 text-[10px] font-medium">
                              ✓ {item}
                            </span>
                          ))}
                          {matchedItems.length > 5 && (
                            <span className="px-1.5 py-0.5 text-[10px] text-white/40">+{matchedItems.length - 5} more</span>
                          )}
                        </div>
                      </div>

                      {/* Missing */}
                      {missingItems.length > 0 ? (
                        <div>
                          <span className="text-[10px] font-mono uppercase tracking-wider text-rose-400 block mb-1">
                            Missing Items ({missingItems.length}):
                          </span>
                          <div className="flex flex-wrap gap-1">
                            {missingItems.slice(0, 4).map((item, idx) => (
                              <span key={idx} className="px-2 py-0.5 rounded bg-rose-500/15 text-rose-300 text-[10px] font-medium">
                                • {item}
                              </span>
                            ))}
                            {missingItems.length > 4 && (
                              <span className="px-1.5 py-0.5 text-[10px] text-white/40">+{missingItems.length - 4} more</span>
                            )}
                          </div>
                        </div>
                      ) : (
                        <div className="text-emerald-400 font-mono text-[11px] font-bold">
                          ✨ Complete Match! You have all ingredients.
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="space-y-2 pt-3 border-t border-white/10">
                      {missingItems.length > 0 && (
                        <button
                          onClick={() => handleAddMissingToShoppingList(recipe, missingItems)}
                          className="w-full py-2.5 px-4 bg-white/5 hover:bg-[#C5A059]/20 border border-white/10 hover:border-[#C5A059]/50 text-[#F5F5F0] text-xs font-mono uppercase tracking-wider rounded-xl transition-all flex items-center justify-center space-x-2"
                        >
                          <ShoppingBag className="w-3.5 h-3.5 text-[#C5A059]" />
                          <span>Add Missing to Shopping List</span>
                        </button>
                      )}

                      <button
                        onClick={() => onCookRecipe(recipe)}
                        className="w-full py-3 px-4 bg-[#C5A059] hover:bg-[#d6b168] text-black text-xs font-mono font-bold uppercase tracking-wider rounded-xl transition-all flex items-center justify-center space-x-2 shadow-lg"
                      >
                        <ChefHat className="w-4 h-4" />
                        <span>Start Masterclass Recipe</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-[#181818] border border-white/10 rounded-2xl p-12 text-center space-y-6 max-w-xl mx-auto">
            <div className="w-16 h-16 rounded-full bg-[#C5A059]/10 border border-[#C5A059]/30 flex items-center justify-center mx-auto text-[#C5A059]">
              <Flame className="w-8 h-8" />
            </div>
            <div className="space-y-2">
              <h3 className="font-serif text-2xl text-[#F5F5F0]">No Exact Recipe Matches Found</h3>
              <p className="text-xs sm:text-sm text-white/60 font-light leading-relaxed">
                Your current ingredient combination didn't yield a matching masterclass under the active filters. Try adding more pantry basics like olive oil, salt, or broth, or reset your filters.
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => {
                  setSelectedOnHand(['Saffron', 'Truffle', 'Single-Estate Olive Oil', 'Maldon Flake Salt']);
                  setSelectedCuisine('All Cuisines');
                  setSelectedDifficulty('All Difficulties');
                  setMaxTime(0);
                }}
                className="px-5 py-2.5 bg-[#C5A059] text-black text-xs font-mono font-bold uppercase tracking-wider rounded-xl hover:bg-[#d6b168] transition-all"
              >
                Reset Pantry & Filters
              </button>
              <button
                onClick={onNavigateToCollection}
                className="px-5 py-2.5 bg-white/5 hover:bg-white/10 text-[#F5F5F0] border border-white/10 text-xs font-mono uppercase tracking-wider rounded-xl transition-all"
              >
                Browse All Ingredients
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
