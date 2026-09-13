import React, { useState } from 'react';
import { CulinaryMasterclass, Ingredient } from '../types';
import {
  ArrowLeft,
  Play,
  Bookmark,
  Plus,
  Share2,
  Clock,
  ChefHat,
  Flame,
  Award,
  Sparkles,
  Layers,
  Utensils,
  Wine,
  Scale,
  Check,
  ChevronRight,
  ExternalLink,
  Printer,
  Minus,
  CheckSquare,
  Square,
  Search,
  Activity
} from 'lucide-react';
import { CulinaryImage } from '../components/CulinaryImage';
import { SafeImage } from '../components/SafeImage';
import { shoppingListService } from '../services/shoppingListService';
import { recipeService } from '../services/recipeService';
import { categoryRegistry } from '../content/categoryRegistry';
import { router } from '../services/router';

interface RecipeDetailPageProps {
  recipe?: CulinaryMasterclass | null;
  allIngredients: Ingredient[];
  onCookRecipe: (recipe: CulinaryMasterclass) => void;
  onNavigateToIngredient: (slug: string) => void;
  onBack: () => void;
}

export const RecipeDetailPage: React.FC<RecipeDetailPageProps> = ({
  recipe,
  allIngredients,
  onCookRecipe,
  onNavigateToIngredient,
  onBack
}) => {
  // Graceful fallback if recipe is not found
  if (!recipe) {
    return (
      <div className="min-h-[75vh] flex flex-col items-center justify-center text-center px-4 pt-28 pb-16 max-w-2xl mx-auto font-sans antialiased text-[#F5F5F0]">
        <div className="w-16 h-16 rounded-full bg-[#C5A059]/10 border border-[#C5A059]/30 flex items-center justify-center mb-6 text-[#C5A059]">
          <ChefHat className="w-8 h-8" />
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl text-white mb-3">
          Masterclass Recipe Not Found
        </h1>
        <p className="text-sm text-[#F5F5F0]/70 leading-relaxed mb-8 max-w-md">
          The requested haute cuisine masterclass recipe could not be located in our active culinary index. It may have been updated or moved to a new terroir allocation.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => router.navigate({ view: 'recipes-archive' })}
            className="py-3 px-6 bg-[#C5A059] hover:bg-[#d6b168] text-black font-semibold text-xs uppercase tracking-widest transition-all shadow-lg flex items-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Browse Complete 1,000+ Recipes</span>
          </button>
          <button
            onClick={() => router.navigate({ view: 'home' })}
            className="py-3 px-6 bg-[#1E1E1E] hover:bg-[#252525] border border-[#F5F5F0]/15 text-[#F5F5F0] text-xs uppercase tracking-widest transition-all"
          >
            <span>Return to Atelier Home</span>
          </button>
        </div>
      </div>
    );
  }

  const [isBookmarked, setIsBookmarked] = useState<boolean>(() => {
    return recipeService.getBookmarkedRecipeIds().has(recipe.id);
  });
  const [hasCopiedShare, setHasCopiedShare] = useState(false);
  const [addedProvisions, setAddedProvisions] = useState(false);
  const [checkedIngredients, setCheckedIngredients] = useState<Set<number>>(new Set());
  const [servingsMultiplier, setServingsMultiplier] = useState<number>(1);

  const connectedIngredients = recipeService.getConnectedIngredients(recipe, allIngredients);
  const relatedRecipes = recipeService.getRelatedRecipes(recipe, 3);

  const handleToggleSave = () => {
    const nextState = recipeService.toggleRecipeBookmark(recipe.id);
    setIsBookmarked(nextState);
  };

  const handleShare = async () => {
    const shareUrl = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${recipe.dishTitle} | Stassen's Collection`,
          text: recipe.overview,
          url: shareUrl,
        });
        return;
      } catch {
        // Fallback to clipboard
      }
    }

    try {
      await navigator.clipboard.writeText(shareUrl);
      setHasCopiedShare(true);
      setTimeout(() => setHasCopiedShare(false), 2500);
    } catch {
      // Clipboard fallback
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleAddAllIngredients = () => {
    shoppingListService.addRecipeIngredients(recipe);
    setAddedProvisions(true);
    setTimeout(() => setAddedProvisions(false), 2500);
  };

  const toggleIngredientCheck = (idx: number) => {
    setCheckedIngredients((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) {
        next.delete(idx);
      } else {
        next.add(idx);
      }
      return next;
    });
  };

  const totalTime = (recipe.totalPrepTimeMinutes || 0) + (recipe.totalCookTimeMinutes || 0);
  const scaledServings = Math.round((recipe.servings || 4) * servingsMultiplier);

  // Parse and scale ingredient amounts dynamically
  const formatScaledAmount = (rawAmount: string, multiplier: number): string => {
    if (multiplier === 1) return rawAmount;
    // Replace leading number or fraction if present
    const match = rawAmount.match(/^([\d\.\/]+)\s*(.*)$/);
    if (!match) return rawAmount;
    const numPart = parseFloat(match[1]);
    if (isNaN(numPart)) return rawAmount;
    const scaled = Math.round(numPart * multiplier * 10) / 10;
    return `${scaled} ${match[2]}`.trim();
  };

  return (
    <article className="min-h-screen bg-[#121212] text-[#F5F5F0] pt-24 pb-20 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto font-sans antialiased print:pt-4 print:pb-4">
      {/* Top Breadcrumbs & Utility Navigation */}
      <nav aria-label="Breadcrumb" className="flex flex-wrap items-center justify-between gap-4 mb-6 text-xs text-[#F5F5F0]/60 print:hidden">
        <ol className="flex items-center space-x-2 flex-wrap">
          <li>
            <button
              onClick={() => router.navigate({ view: 'home' })}
              className="text-[#F5F5F0]/60 hover:text-[#C5A059] transition-colors"
            >
              Atelier Home
            </button>
          </li>
          <li aria-hidden="true" className="text-[#F5F5F0]/30">/</li>
          <li>
            <button
              onClick={onBack}
              className="text-[#C5A059] hover:text-[#d6b168] transition-colors font-medium flex items-center space-x-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Recipes Archive</span>
            </button>
          </li>
          <li aria-hidden="true" className="text-[#F5F5F0]/30">/</li>
          <li>
            <a
              href={`/categories/recipes/${categoryRegistry.getCategoryForRecipe(recipe)?.slug || 'dinner'}`}
              onClick={(e) => {
                if (!e.metaKey && !e.ctrlKey && !e.shiftKey) {
                  const catDef = categoryRegistry.getCategoryForRecipe(recipe);
                  if (catDef) {
                    e.preventDefault();
                    router.navigate({ view: 'category-detail', categorySlug: catDef.slug, categoryType: 'recipe' });
                  }
                }
              }}
              className="text-[#C5A059] hover:underline"
            >
              {categoryRegistry.getCategoryForRecipe(recipe)?.name || recipe.courseCategory || 'Haute Cuisine'}
            </a>
          </li>
          <li aria-hidden="true" className="text-[#F5F5F0]/30">/</li>
          <li className="text-[#F5F5F0]/40 uppercase tracking-wider">
            {recipe.cuisine || 'Haute Gastronomy'}
          </li>
          <li aria-hidden="true" className="text-[#F5F5F0]/30">/</li>
          <li className="text-[#F5F5F0] font-medium truncate max-w-[180px] sm:max-w-xs" aria-current="page">
            {recipe.dishTitle}
          </li>
        </ol>

        {/* Action Buttons: Print, Share, Save */}
        <div className="flex items-center space-x-2.5">
          <button
            onClick={handlePrint}
            className="flex items-center space-x-1.5 px-3 py-1.5 bg-[#1E1E1E] border border-[#F5F5F0]/15 hover:border-[#C5A059]/40 hover:text-[#C5A059] text-xs transition-all"
            title="Print Masterclass Recipe"
          >
            <Printer className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Print</span>
          </button>

          <button
            onClick={handleShare}
            className="flex items-center space-x-1.5 px-3 py-1.5 bg-[#1E1E1E] border border-[#F5F5F0]/15 hover:border-[#C5A059]/40 hover:text-[#C5A059] text-xs transition-all"
            title="Share Recipe Link"
          >
            {hasCopiedShare ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
            <span>{hasCopiedShare ? 'Link Copied!' : 'Share'}</span>
          </button>

          <button
            onClick={handleToggleSave}
            className={`flex items-center space-x-1.5 px-3 py-1.5 text-xs transition-all border ${
              isBookmarked
                ? 'bg-[#C5A059]/20 border-[#C5A059] text-[#C5A059]'
                : 'bg-[#1E1E1E] border-[#F5F5F0]/15 hover:border-[#C5A059]/40 text-[#F5F5F0]/80'
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-current text-[#C5A059]' : ''}`} />
            <span>{isBookmarked ? 'Saved in Cellar' : 'Save Recipe'}</span>
          </button>
        </div>
      </nav>

      {/* Hero Header Section */}
      <header className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12 items-start">
        {/* Visual Hero */}
        <div className="lg:col-span-7">
          <div className="relative aspect-[16/10] bg-black/60 overflow-hidden border border-[#C5A059]/30 shadow-2xl">
            <CulinaryImage
              src={recipe.heroImageUrl}
              alt={recipe.dishTitle}
              cuisine={recipe.cuisine}
              category={recipe.courseCategory}
              priority={true}
              className="w-full h-full object-cover"
            />
            {recipe.isHottest && (
              <div className="absolute top-4 left-4 z-20 px-3 py-1 bg-amber-500 text-black font-mono font-bold text-xs uppercase tracking-wider shadow-xl flex items-center space-x-1">
                <Flame className="w-3.5 h-3.5 fill-current" />
                <span>🔥 RANK #{recipe.hotnessRank || 1} • HOTTEST MASTERCLASS</span>
              </div>
            )}
            <div className="absolute bottom-4 left-4 z-20 px-3 py-1 bg-black/80 backdrop-blur-md border border-white/10 text-xs text-[#C5A059] font-mono">
              {recipe.courseCategory || 'Main Course'} • {recipe.overallDurationFormatted || `${totalTime} min`}
            </div>
          </div>
        </div>

        {/* Masterclass Meta & Primary Controls */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
          <div>
            <div className="flex items-center space-x-2 text-xs uppercase tracking-widest text-[#C5A059] font-mono font-bold mb-2">
              <span>{recipe.cuisine || 'Haute Cuisine'}</span>
              <span>•</span>
              <span>{recipe.difficulty}</span>
              {recipe.trendScore && (
                <>
                  <span>•</span>
                  <span>Trend Score: {recipe.trendScore}/100</span>
                </>
              )}
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl text-white leading-tight mb-3">
              {recipe.dishTitle}
            </h1>

            {recipe.subtitle && (
              <p className="text-sm text-[#C5A059]/90 font-serif italic mb-4">
                "{recipe.subtitle}"
              </p>
            )}

            <p className="text-xs sm:text-sm text-[#F5F5F0]/80 leading-relaxed mb-6">
              {recipe.overview}
            </p>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-3 gap-3 p-3 bg-[#181818] border border-[#F5F5F0]/10 mb-6 text-center">
              <div>
                <div className="text-[10px] uppercase text-[#F5F5F0]/50 font-mono">Prep Time</div>
                <div className="text-sm font-mono text-[#C5A059] font-bold">{recipe.totalPrepTimeMinutes || 15}m</div>
              </div>
              <div>
                <div className="text-[10px] uppercase text-[#F5F5F0]/50 font-mono">Cook Time</div>
                <div className="text-sm font-mono text-[#C5A059] font-bold">{recipe.totalCookTimeMinutes || 25}m</div>
              </div>
              <div>
                <div className="text-[10px] uppercase text-[#F5F5F0]/50 font-mono">Yield</div>
                <div className="text-sm font-mono text-[#C5A059] font-bold">{scaledServings} servings</div>
              </div>
            </div>

            {/* Prominent Cook Mode Button */}
            <button
              onClick={() => onCookRecipe(recipe)}
              className="w-full py-3.5 px-6 bg-gradient-to-r from-amber-500 to-[#C5A059] hover:from-amber-400 hover:to-[#d6b168] text-black font-semibold text-sm uppercase tracking-widest flex items-center justify-center space-x-2 transition-all shadow-xl hover:shadow-[#C5A059]/20"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Start Cooking (Interactive Step Studio)</span>
            </button>
          </div>

          {/* Primary Terroir Botanical Connection */}
          <div className="p-4 bg-[#181818] border border-[#C5A059]/30 flex items-center justify-between">
            <div>
              <div className="text-[10px] uppercase text-[#F5F5F0]/50 font-mono">Hero Terroir Ingredient</div>
              <div className="text-sm font-serif text-[#C5A059] font-medium">{recipe.primaryIngredientName}</div>
            </div>
            {recipe.primaryIngredientSlug && (
              <a
                href={`/ingredients/${recipe.primaryIngredientSlug}`}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigateToIngredient(recipe.primaryIngredientSlug || recipe.primaryIngredientId);
                }}
                className="text-xs text-[#C5A059] hover:underline flex items-center space-x-1"
              >
                <span>View Terroir Profile</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
        </div>
      </header>

      {/* Main Grid: Ingredients & Timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        {/* Left Column: Ingredients List & Connected Terroirs */}
        <div className="lg:col-span-5 space-y-6">
          {/* Mise en Place Section */}
          <section className="p-6 bg-[#181818] border border-[#F5F5F0]/10">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#F5F5F0]/10">
              <div className="flex items-center space-x-2 text-[#C5A059]">
                <Utensils className="w-4 h-4" />
                <h2 className="font-serif text-lg text-white">Mise en Place</h2>
              </div>
              <button
                onClick={handleAddAllIngredients}
                className="text-xs text-[#C5A059] hover:underline flex items-center space-x-1 font-mono"
              >
                {addedProvisions ? <Check className="w-3 h-3 text-emerald-400" /> : <Plus className="w-3 h-3" />}
                <span>{addedProvisions ? 'Added to List!' : 'Add All to List'}</span>
              </button>
            </div>

            {/* Servings Scaler */}
            <div className="flex items-center justify-between bg-[#141414] p-3 border border-white/5 mb-4 text-xs">
              <span className="text-[#F5F5F0]/70 font-mono">Portion Scaler:</span>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setServingsMultiplier((prev) => Math.max(0.5, prev - 0.5))}
                  className="p-1 bg-[#1E1E1E] hover:bg-[#C5A059] hover:text-black border border-white/10 transition-colors"
                  aria-label="Decrease servings"
                >
                  <Minus className="w-3 h-3" />
                </button>
                <span className="font-mono text-[#C5A059] font-bold px-2">{scaledServings} covers</span>
                <button
                  onClick={() => setServingsMultiplier((prev) => Math.min(3, prev + 0.5))}
                  className="p-1 bg-[#1E1E1E] hover:bg-[#C5A059] hover:text-black border border-white/10 transition-colors"
                  aria-label="Increase servings"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>
            </div>

            <ul className="divide-y divide-[#F5F5F0]/5">
              {recipe.ingredientsList?.map((item, idx) => {
                const isChecked = checkedIngredients.has(idx);
                const matchedIngredient = recipeService.findIngredientForRecipeItem(item, allIngredients);
                const ingSlug = matchedIngredient ? (matchedIngredient.slug || matchedIngredient.id) : null;

                return (
                  <li
                    key={idx}
                    onClick={() => toggleIngredientCheck(idx)}
                    className="py-3 flex items-start justify-between text-xs sm:text-sm cursor-pointer hover:bg-white/[0.02] px-1 transition-colors select-none"
                  >
                    <div className="flex items-start space-x-2.5">
                      <button
                        type="button"
                        aria-checked={isChecked}
                        role="checkbox"
                        className="mt-0.5 text-[#C5A059] focus:outline-none"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleIngredientCheck(idx);
                        }}
                      >
                        {isChecked ? (
                          <CheckSquare className="w-4 h-4 text-emerald-400" />
                        ) : (
                          <Square className="w-4 h-4 text-[#F5F5F0]/40" />
                        )}
                      </button>
                      <div>
                        {matchedIngredient && ingSlug ? (
                          <a
                            href={`/ingredients/${ingSlug}`}
                            onClick={(e) => {
                              if (!e.metaKey && !e.ctrlKey) {
                                e.preventDefault();
                                e.stopPropagation();
                                onNavigateToIngredient(ingSlug);
                              }
                            }}
                            className={`font-medium underline decoration-[#C5A059]/40 hover:decoration-[#C5A059] transition-all hover:text-[#C5A059] ${
                              isChecked ? 'line-through text-[#F5F5F0]/40' : 'text-[#F5F5F0]'
                            }`}
                            title={`Inspect ${matchedIngredient.name} terroir specimen and organoleptic profile`}
                          >
                            {item.name}
                          </a>
                        ) : (
                          <span
                            className={`font-medium transition-all ${
                              isChecked ? 'line-through text-[#F5F5F0]/40' : 'text-[#F5F5F0]'
                            }`}
                          >
                            {item.name}
                          </span>
                        )}
                        {item.prepState && (
                          <span className="text-[#F5F5F0]/50 block text-[11px] mt-0.5">({item.prepState})</span>
                        )}
                      </div>
                    </div>
                    <span
                      className={`font-mono ml-4 shrink-0 text-right ${
                        isChecked ? 'text-[#F5F5F0]/30' : 'text-[#C5A059]'
                      }`}
                    >
                      {formatScaledAmount(item.amount, servingsMultiplier)}
                    </span>
                  </li>
                );
              })}
            </ul>
          </section>

          {/* Connected Archive Terroir Ingredients */}
          {connectedIngredients.length > 0 && (
            <section className="p-6 bg-[#181818] border border-[#F5F5F0]/10">
              <div className="flex items-center space-x-2 text-[#C5A059] mb-4">
                <Sparkles className="w-4 h-4" />
                <h3 className="font-serif text-base text-white">Connected Terroir Ingredients ({connectedIngredients.length})</h3>
              </div>
              <div className="space-y-3">
                {connectedIngredients.map((ing) => {
                  const ingSlug = ing.slug || ing.id;
                  return (
                    <a
                      key={ing.id}
                      href={`/ingredients/${ingSlug}`}
                      onClick={(e) => {
                        e.preventDefault();
                        onNavigateToIngredient(ingSlug);
                      }}
                      className="p-3 bg-[#141414] border border-white/5 hover:border-[#C5A059]/50 cursor-pointer flex items-center justify-between transition-all group block text-inherit no-underline"
                    >
                      <div>
                        <div className="text-xs font-serif text-[#F5F5F0] group-hover:text-[#C5A059] transition-colors">
                          {ing.name}
                        </div>
                        <div className="text-[10px] text-[#F5F5F0]/50">
                          {ing.origin} • {ing.category}
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-[#C5A059]/60 group-hover:text-[#C5A059] transform group-hover:translate-x-1 transition-all" />
                    </a>
                  );
                })}
              </div>
            </section>
          )}

          {/* Sommelier Wine Pairing */}
          {recipe.sommelierPairing && (
            <section className="p-6 bg-gradient-to-br from-[#1C1A14] to-[#141414] border border-[#C5A059]/40 shadow-lg">
              <div className="flex items-center space-x-2 text-[#C5A059] mb-3">
                <Wine className="w-4 h-4" />
                <h3 className="font-serif text-base text-white">Sommelier Cellar Pairing</h3>
              </div>
              <div className="text-sm font-serif text-[#C5A059] font-medium mb-1">
                {recipe.sommelierPairing.vintage}
              </div>
              <div className="text-[11px] font-mono text-[#F5F5F0]/60 uppercase tracking-wider mb-2">
                Terroir: {recipe.sommelierPairing.terroir}
              </div>
              <p className="text-xs text-[#F5F5F0]/80 italic leading-relaxed">
                "{recipe.sommelierPairing.tastingNote}"
              </p>
            </section>
          )}

          {/* Nutritional Profile */}
          {recipe.nutritionalProfile && (
            <section className="p-6 bg-[#181818] border border-[#F5F5F0]/10">
              <div className="flex items-center space-x-2 text-[#C5A059] mb-4">
                <Activity className="w-4 h-4" />
                <h3 className="font-serif text-base text-white">Nutritional Profile (Per Serving)</h3>
              </div>
              <div className="grid grid-cols-4 gap-2 text-center">
                <div className="p-2 bg-[#141414] border border-white/5">
                  <div className="text-[10px] text-[#F5F5F0]/50 font-mono uppercase">Energy</div>
                  <div className="text-sm font-mono text-[#C5A059] font-bold">{recipe.nutritionalProfile.calories} kcal</div>
                </div>
                <div className="p-2 bg-[#141414] border border-white/5">
                  <div className="text-[10px] text-[#F5F5F0]/50 font-mono uppercase">Protein</div>
                  <div className="text-sm font-mono text-[#F5F5F0] font-bold">{recipe.nutritionalProfile.proteinGrams}g</div>
                </div>
                <div className="p-2 bg-[#141414] border border-white/5">
                  <div className="text-[10px] text-[#F5F5F0]/50 font-mono uppercase">Carbs</div>
                  <div className="text-sm font-mono text-[#F5F5F0] font-bold">{recipe.nutritionalProfile.carbsGrams}g</div>
                </div>
                <div className="p-2 bg-[#141414] border border-white/5">
                  <div className="text-[10px] text-[#F5F5F0]/50 font-mono uppercase">Lipids</div>
                  <div className="text-sm font-mono text-[#F5F5F0] font-bold">{recipe.nutritionalProfile.fatGrams}g</div>
                </div>
              </div>
            </section>
          )}

          {/* Flavor & Aroma Profile */}
          {recipe.flavorAromaProfile && (
            <section className="p-6 bg-[#181818] border border-[#F5F5F0]/10">
              <div className="flex items-center space-x-2 text-[#C5A059] mb-4">
                <Sparkles className="w-4 h-4" />
                <h3 className="font-serif text-base text-white">Flavor & Aroma Architecture</h3>
              </div>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-[#F5F5F0]/70">Umami Richness</span>
                    <span className="font-mono text-[#C5A059]">{recipe.flavorAromaProfile.umami}%</span>
                  </div>
                  <div className="w-full bg-[#141414] h-1.5 overflow-hidden">
                    <div className="bg-[#C5A059] h-full" style={{ width: `${recipe.flavorAromaProfile.umami}%` }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-[#F5F5F0]/70">Aromatic Intensity</span>
                    <span className="font-mono text-[#C5A059]">{recipe.flavorAromaProfile.aromaticIntensity}%</span>
                  </div>
                  <div className="w-full bg-[#141414] h-1.5 overflow-hidden">
                    <div className="bg-[#C5A059] h-full" style={{ width: `${recipe.flavorAromaProfile.aromaticIntensity}%` }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-[#F5F5F0]/70">Texture Complexity</span>
                    <span className="font-mono text-[#C5A059]">{recipe.flavorAromaProfile.textureComplexity}%</span>
                  </div>
                  <div className="w-full bg-[#141414] h-1.5 overflow-hidden">
                    <div className="bg-[#C5A059] h-full" style={{ width: `${recipe.flavorAromaProfile.textureComplexity}%` }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-[#F5F5F0]/70">Finish Length</span>
                    <span className="font-mono text-[#C5A059]">{recipe.flavorAromaProfile.finishLength}%</span>
                  </div>
                  <div className="w-full bg-[#141414] h-1.5 overflow-hidden">
                    <div className="bg-[#C5A059] h-full" style={{ width: `${recipe.flavorAromaProfile.finishLength}%` }} />
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Required Culinary Tools */}
          {recipe.requiredTools && recipe.requiredTools.length > 0 && (
            <section className="p-6 bg-[#181818] border border-[#F5F5F0]/10">
              <div className="flex items-center space-x-2 text-[#C5A059] mb-4">
                <Utensils className="w-4 h-4" />
                <h3 className="font-serif text-base text-white">Required Atelier Tools</h3>
              </div>
              <ul className="space-y-2.5">
                {recipe.requiredTools.map((tool, idx) => (
                  <li key={idx} className="text-xs p-2.5 bg-[#141414] border border-white/5">
                    <div className="font-medium text-[#F5F5F0] mb-0.5">{tool.name}</div>
                    <div className="text-[#F5F5F0]/50 text-[11px]">{tool.purpose}</div>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        {/* Right Column: Step-by-Step Cooking Timeline */}
        <div className="lg:col-span-7 space-y-6">
          <section className="p-6 sm:p-8 bg-[#181818] border border-[#F5F5F0]/10">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#F5F5F0]/10">
              <div className="flex items-center space-x-2 text-[#C5A059]">
                <ChefHat className="w-5 h-5" />
                <h2 className="font-serif text-xl text-white">Chronological Gastronomy Steps</h2>
              </div>
              <span className="text-xs font-mono text-[#F5F5F0]/60">
                {recipe.timelineSteps?.length || 0} Steps
              </span>
            </div>

            <div className="space-y-6">
              {recipe.timelineSteps?.map((step, idx) => (
                <div
                  key={idx}
                  id={`step-${step.stepNumber || idx + 1}`}
                  className="p-5 bg-[#141414] border border-white/5 relative pl-12 transition-all hover:border-[#C5A059]/30"
                >
                  {/* Step Number Circle */}
                  <div className="absolute left-3 top-5 w-6 h-6 rounded-full bg-[#C5A059]/20 border border-[#C5A059] text-[#C5A059] flex items-center justify-center font-mono text-xs font-bold">
                    {step.stepNumber || idx + 1}
                  </div>

                  <div className="flex items-center justify-between gap-2 mb-2">
                    <h3 className="font-serif text-base text-[#F5F5F0]">
                      {step.title || step.stepTitle || `Step ${idx + 1}`}
                    </h3>
                    {(step.durationMinutes || step.timeOffsetFormatted) && (
                      <span className="text-[10px] font-mono text-[#C5A059] bg-[#C5A059]/10 px-2 py-0.5 border border-[#C5A059]/30 flex items-center space-x-1 shrink-0">
                        <Clock className="w-2.5 h-2.5" />
                        <span>{step.durationMinutes ? `${step.durationMinutes} min` : step.timeOffsetFormatted}</span>
                      </span>
                    )}
                  </div>

                  <p className="text-xs sm:text-sm text-[#F5F5F0]/80 leading-relaxed mb-3">
                    {step.actionDescription}
                  </p>

                  {step.techniqueTip && (
                    <div className="text-xs text-[#C5A059]/90 bg-black/40 p-2.5 border-l-2 border-[#C5A059] italic mb-2">
                      💡 <strong>Artisan Technique:</strong> {step.techniqueTip}
                    </div>
                  )}

                  {step.criticalControlPoint && (
                    <div className="text-xs text-amber-300/90 bg-amber-950/20 p-2.5 border-l-2 border-amber-500/50 mb-2">
                      ⚠️ <strong>Critical Control Point:</strong> {step.criticalControlPoint}
                    </div>
                  )}

                  {(step.sensoryCue || step.sensoryCues) && (
                    <div className="text-[11px] text-[#F5F5F0]/60 flex items-center space-x-1.5">
                      <span className="text-[#C5A059]">👁️ Sensory Cue:</span>
                      <span>{step.sensoryCue || step.sensoryCues}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Chef's Rationale & Plating Presentation */}
            {(recipe.chefRationale || recipe.platingPresentation) && (
              <div className="mt-8 pt-6 border-t border-[#F5F5F0]/10 space-y-4">
                {recipe.chefRationale && (
                  <div>
                    <h4 className="font-serif text-sm text-[#C5A059] mb-1">Chef's Gastronomic Rationale</h4>
                    <p className="text-xs text-[#F5F5F0]/70 leading-relaxed italic">
                      "{recipe.chefRationale}"
                    </p>
                  </div>
                )}
                {recipe.platingPresentation && (
                  <div>
                    <h4 className="font-serif text-sm text-[#C5A059] mb-1">Plating & Aesthetic Balance</h4>
                    <p className="text-xs text-[#F5F5F0]/70 leading-relaxed">
                      {recipe.platingPresentation}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Bottom CTA to trigger Cook Mode */}
            <div className="mt-8 pt-6 border-t border-[#F5F5F0]/10 flex flex-wrap items-center justify-between gap-4 print:hidden">
              <div>
                <h4 className="font-serif text-sm text-white">Ready to prepare this masterclass in your kitchen?</h4>
                <p className="text-xs text-[#F5F5F0]/60">Launch distraction-free Cooking Mode with interactive step timers.</p>
              </div>
              <button
                onClick={() => onCookRecipe(recipe)}
                className="py-2.5 px-5 bg-[#C5A059] hover:bg-[#d6b168] text-black font-semibold text-xs uppercase tracking-wider flex items-center space-x-2 transition-all shadow"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Launch Cook Mode</span>
              </button>
            </div>
          </section>
        </div>

        {/* Section: Related Culinary Masterclasses (Crawlable Internal Architecture) */}
        {relatedRecipes.length > 0 && (
          <section id="related-recipes-section" className="mt-16 pt-12 border-t border-[#F5F5F0]/15 print:hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-[#F5F5F0]/10">
              <div className="flex items-center space-x-3">
                <div className="p-2.5 bg-[#C5A059]/10 text-[#C5A059] border border-[#C5A059]/30">
                  <Flame className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-xl sm:text-2xl text-[#F5F5F0]">
                    Related Culinary Masterclasses
                  </h3>
                  <p className="text-xs text-[#F5F5F0]/60 mt-0.5">
                    Haute creations sharing culinary affinities with {recipe.primaryIngredientName} and {recipe.cuisine} traditions
                  </p>
                </div>
              </div>
              <a
                href="/recipes"
                onClick={(e) => {
                  if (!e.metaKey && !e.ctrlKey) {
                    e.preventDefault();
                    router.navigate({ view: 'recipes-archive' });
                  }
                }}
                className="text-xs uppercase tracking-widest text-[#C5A059] hover:underline flex items-center space-x-1.5 self-start sm:self-auto"
                title="Browse complete index of 1,000+ culinary masterclass recipes"
              >
                <span>View Complete Index</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedRecipes.map((rel) => {
                const relSlug = rel.slug || rel.id;
                return (
                  <div
                    key={rel.id}
                    className="bg-[#181818] border border-[#F5F5F0]/10 hover:border-[#C5A059]/50 transition-all flex flex-col justify-between group shadow-lg"
                  >
                    <div>
                      <div className="relative aspect-[16/10] bg-black/40 overflow-hidden border-b border-white/5">
                        <CulinaryImage
                          recipe={rel}
                          src={rel.heroImageUrl}
                          alt={`${rel.dishTitle} — ${rel.cuisine} culinary masterclass`}
                          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                          containerClassName="w-full h-full"
                        />
                        <div className="absolute top-2 left-2 px-2 py-0.5 bg-black/80 backdrop-blur-md text-[9px] uppercase tracking-wider text-[#C5A059] border border-white/10">
                          {rel.cuisine}
                        </div>
                        <div className="absolute bottom-2 right-2 px-2 py-0.5 bg-black/80 backdrop-blur-md text-[10px] font-mono text-[#F5F5F0]/80 border border-white/10">
                          {rel.overallDurationFormatted}
                        </div>
                      </div>

                      <div className="p-5">
                        <div className="text-[10px] uppercase tracking-widest text-[#C5A059] mb-1.5 font-mono">
                          Featuring: {rel.primaryIngredientName}
                        </div>

                        <a
                          href={`/recipes/${relSlug}`}
                          onClick={(e) => {
                            if (!e.metaKey && !e.ctrlKey) {
                              e.preventDefault();
                              router.navigate({ view: 'recipe-detail', recipeSlug: relSlug });
                            }
                          }}
                          className="font-serif text-lg text-[#F5F5F0] group-hover:text-[#C5A059] transition-colors line-clamp-1 mb-2 block"
                          title={`Masterclass: ${rel.dishTitle} (${rel.cuisine} cuisine)`}
                        >
                          {rel.dishTitle}
                        </a>

                        <p className="text-xs text-[#F5F5F0]/70 line-clamp-2 leading-relaxed mb-4">
                          {rel.overview}
                        </p>

                        <div className="flex flex-wrap gap-1.5">
                          {rel.tags?.slice(0, 2).map((tag, tIdx) => (
                            <span
                              key={tIdx}
                              className="px-2 py-0.5 bg-[#222] text-[9px] text-[#F5F5F0]/60 border border-white/5"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="p-4 border-t border-[#F5F5F0]/10 bg-[#141414] flex items-center justify-between">
                      <a
                        href={`/recipes/${relSlug}`}
                        onClick={(e) => {
                          if (!e.metaKey && !e.ctrlKey) {
                            e.preventDefault();
                            router.navigate({ view: 'recipe-detail', recipeSlug: relSlug });
                          }
                        }}
                        className="text-xs text-[#C5A059] hover:underline flex items-center space-x-1"
                        title={`View masterclass recipe: ${rel.dishTitle}`}
                      >
                        <span>View Masterclass</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </a>

                      <button
                        onClick={() => onCookRecipe(rel)}
                        className="p-2 bg-[#C5A059]/10 hover:bg-[#C5A059] text-[#C5A059] hover:text-black border border-[#C5A059]/30 text-xs transition-colors"
                        title="Cook this recipe now"
                        aria-label={`Start cooking ${rel.dishTitle}`}
                      >
                        <Play className="w-3.5 h-3.5 fill-current" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </article>
  );
};
