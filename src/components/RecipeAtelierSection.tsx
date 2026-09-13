import React, { useState, useEffect, useMemo } from 'react';
import {
  ChefHat,
  Search,
  Filter,
  Sparkles,
  RefreshCw,
  PlusCircle,
  Bookmark,
  Flame,
  Globe,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  Utensils,
  UtensilsCrossed,
  Layers,
  Award,
  Clock,
  RotateCcw
} from 'lucide-react';
import { CulinaryMasterclass, Ingredient } from '../types';
import { RecipeCard } from './RecipeCard';
import { TopPaginationControls } from './TopPaginationControls';
import { TastingMenuModal } from './TastingMenuModal';
import { recipeService, CUISINE_REGIONS, DIFFICULTY_LEVELS } from '../services/recipeService';
import { INITIAL_INGREDIENTS } from '../data/ingredients';

interface RecipeAtelierSectionProps {
  onCookRecipe: (recipe: CulinaryMasterclass) => void;
  onOpenRecipeDetails?: (recipe: CulinaryMasterclass) => void;
  onNavigateToArchive?: () => void;
}

const QUICK_INGREDIENT_TAGS = [
  'White Alba Truffle',
  'Matsutake',
  'Saffron',
  'A5 Wagyu',
  'Beluga Caviar',
  'Hokkaido Uni',
  'Yuzu',
  'Balsamic',
  'Morel',
  'Bottarga',
  'Risotto',
  'Velouté'
];

export const RecipeAtelierSection: React.FC<RecipeAtelierSectionProps> = ({
  onCookRecipe,
  onOpenRecipeDetails,
  onNavigateToArchive
}) => {
  const [recipes, setRecipes] = useState<CulinaryMasterclass[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCuisine, setSelectedCuisine] = useState<string>('All Cuisines');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All Levels');
  const [sortBy, setSortBy] = useState<'hottest' | 'time' | 'alpha' | 'difficulty'>('hottest');
  const [onlyBookmarked, setOnlyBookmarked] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(12);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [isContinuousActive, setIsContinuousActive] = useState<boolean>(false);
  const [customDishPrompt, setCustomDishPrompt] = useState<string>('');
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
  const [isTastingMenuOpen, setIsTastingMenuOpen] = useState<boolean>(false);

  // Load all recipes directly from the master registry
  useEffect(() => {
    const list = recipeService.getAllRecipes(sortBy);
    setRecipes(list);
  }, [sortBy]);

  // Continuous background auto-expansion worker if toggled
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isContinuousActive) {
      interval = setInterval(() => {
        const randomCuisines = ['Italian', 'Japanese Kaiseki', 'French Haute Cuisine', 'Nordic & Boreal', 'Iberian & Basque'];
        const randomCuisine = randomCuisines[Math.floor(Math.random() * randomCuisines.length)];
        const ing = INITIAL_INGREDIENTS[Math.floor(Math.random() * INITIAL_INGREDIENTS.length)] || INITIAL_INGREDIENTS[0];
        recipeService.generateBespokeRecipe(ing, randomCuisine).then(newRecipe => {
          setRecipes(prev => [newRecipe, ...prev]);
        });
      }, 8000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isContinuousActive]);

  // Escape key listener for create modal
  useEffect(() => {
    if (!showCreateModal) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowCreateModal(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showCreateModal]);

  // Cuisine counts dictionary across the entire archive
  const cuisineCounts = useMemo(() => {
    const counts: Record<string, number> = { 'All Cuisines': recipes.length };
    recipes.forEach(r => {
      if (r.cuisine) {
        counts[r.cuisine] = (counts[r.cuisine] || 0) + 1;
      }
    });
    return counts;
  }, [recipes]);

  // Filter recipes strictly with non-repeating results
  const filteredRecipes = useMemo(() => {
    return recipes.filter(recipe => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        q === '' ||
        recipe.dishTitle.toLowerCase().includes(q) ||
        recipe.subtitle.toLowerCase().includes(q) ||
        recipe.primaryIngredientName.toLowerCase().includes(q) ||
        recipe.cuisine?.toLowerCase().includes(q) ||
        recipe.countryRegion?.toLowerCase().includes(q) ||
        recipe.tags?.some(t => t.toLowerCase().includes(q)) ||
        recipe.ingredientsList?.some(ing => ing.name.toLowerCase().includes(q)) ||
        recipe.overview?.toLowerCase().includes(q);

      const matchesCuisine =
        selectedCuisine === 'All Cuisines' ||
        recipe.cuisine?.toLowerCase() === selectedCuisine.toLowerCase() ||
        recipe.countryRegion?.toLowerCase() === selectedCuisine.toLowerCase() ||
        recipe.cuisine?.toLowerCase().includes(selectedCuisine.toLowerCase());

      const matchesDifficulty =
        selectedDifficulty === 'All Levels' ||
        recipe.difficulty?.toLowerCase().includes(selectedDifficulty.toLowerCase());

      const matchesBookmark = !onlyBookmarked || !!recipe.isBookmarked;

      return matchesSearch && matchesCuisine && matchesDifficulty && matchesBookmark;
    });
  }, [recipes, searchQuery, selectedCuisine, selectedDifficulty, onlyBookmarked]);

  // Pagination calculation
  const totalPages = Math.max(1, Math.ceil(filteredRecipes.length / itemsPerPage));
  const paginatedRecipes = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredRecipes.slice(start, start + itemsPerPage);
  }, [filteredRecipes, currentPage, itemsPerPage]);

  const handleGenerateCustom = async () => {
    if (isGenerating) return;
    setIsGenerating(true);
    try {
      const cuisine = selectedCuisine === 'All Cuisines' ? 'Italian' : selectedCuisine;
      const matchedIng = INITIAL_INGREDIENTS.find(i => 
        customDishPrompt.toLowerCase().includes(i.name.toLowerCase()) || 
        i.name.toLowerCase().includes(customDishPrompt.toLowerCase())
      ) || INITIAL_INGREDIENTS[0];

      const newRecipe = await recipeService.generateBespokeRecipe(
        matchedIng,
        cuisine,
        customDishPrompt
      );
      setRecipes(prev => [newRecipe, ...prev]);
      setShowCreateModal(false);
      setCustomDishPrompt('');
      setCurrentPage(1);
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePageChange = (p: number) => {
    setCurrentPage(p);
    const el = document.getElementById('recipe-atelier');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="recipe-atelier" className="py-16 sm:py-24 bg-[#121212] relative border-t border-[#F5F5F0]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-10 space-y-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#F5F5F0]/10">
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-[#C5A059] text-xs font-mono tracking-[0.25em] uppercase font-bold">
              <ChefHat className="w-4 h-4 text-[#C5A059]" />
              <span>Complete Haute Gastronomy Recipe Vault</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#F5F5F0] tracking-tight">
              All Culinary Masterclasses <span className="opacity-40 italic">& Interactive Atelier</span>
            </h2>
            <p className="text-sm text-[#F5F5F0]/70 max-w-3xl font-sans leading-relaxed">
              Explore and cook all <strong className="text-[#C5A059] font-mono">{recipes.length}+</strong> chef-calibrated recipes right here on the home page. Every dish features step-by-step guidance, temperature targets, nutritional macros, and sommelier vintage pairings with zero repetition.
            </p>
          </div>

          {/* Action Buttons: Degustation Tasting Menu, Auto-Expand & AI Creator */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Degustation Tasting Menu Generator Button */}
            <button
              id="curate-tasting-menu-home-btn"
              onClick={() => setIsTastingMenuOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#D97706] to-[#B45309] hover:from-[#F59E0B] hover:to-[#D97706] text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center space-x-2 shadow-lg shadow-amber-900/30 transition-transform active:scale-95 cursor-pointer"
            >
              <UtensilsCrossed className="w-3.5 h-3.5" />
              <span>Curate Tasting Menu</span>
            </button>

            {/* Continuous Autonomous Background Generator */}
            <button
              onClick={() => setIsContinuousActive(!isContinuousActive)}
              className={`px-4 py-2.5 rounded-xl border text-xs font-mono uppercase tracking-wider flex items-center space-x-2 transition-all cursor-pointer ${
                isContinuousActive
                  ? 'bg-amber-500/20 border-amber-500 text-amber-400 animate-pulse'
                  : 'bg-[#1A1A1A] border-[#F5F5F0]/15 text-[#F5F5F0]/80 hover:border-[#C5A059]/50'
              }`}
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isContinuousActive ? 'animate-spin' : ''}`} />
              <span>{isContinuousActive ? 'Auto-Expanding' : 'Auto Expand'}</span>
            </button>

            {/* AI Custom Dish Generator */}
            <button
              onClick={() => setShowCreateModal(true)}
              className="px-4 py-2.5 rounded-xl bg-[#C5A059] hover:bg-[#d6b168] text-black font-mono text-xs font-bold uppercase tracking-wider shadow-lg shadow-[#C5A059]/20 transition-all flex items-center space-x-1.5 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>AI Create Dish</span>
            </button>
          </div>
        </div>

        {/* Filters & Search Toolbar */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3">
            {/* Search Input */}
            <div className="lg:col-span-5 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#C5A059]" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Search all recipes (e.g. Risotto, Truffle, Wagyu, Confit)..."
                className="w-full pl-11 pr-4 py-2.5 rounded-xl bg-[#1A1A1A] border border-[#F5F5F0]/15 focus:border-[#C5A059] text-xs font-mono text-[#F5F5F0] placeholder-[#F5F5F0]/40 outline-none transition-colors"
              />
            </div>

            {/* Difficulty Selector */}
            <div className="lg:col-span-3">
              <select
                value={selectedDifficulty}
                onChange={e => {
                  setSelectedDifficulty(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#1A1A1A] border border-[#F5F5F0]/15 focus:border-[#C5A059] text-xs font-mono uppercase text-[#F5F5F0] outline-none"
              >
                {DIFFICULTY_LEVELS.map(d => (
                  <option key={d} value={d} className="bg-[#1A1A1A]">
                    {d}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Order Selector */}
            <div className="lg:col-span-2">
              <select
                value={sortBy}
                onChange={e => {
                  setSortBy(e.target.value as any);
                  setCurrentPage(1);
                }}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#1A1A1A] border border-[#F5F5F0]/15 focus:border-[#C5A059] text-xs font-mono uppercase text-[#F5F5F0] outline-none"
              >
                <option value="hottest" className="bg-[#1A1A1A]">🔥 Hottest Trending</option>
                <option value="time" className="bg-[#1A1A1A]">⏱️ Fastest Cook Time</option>
                <option value="alpha" className="bg-[#1A1A1A]">🔤 Alphabetical (A-Z)</option>
              </select>
            </div>

            {/* Bookmarked Filter */}
            <div className="lg:col-span-2">
              <button
                onClick={() => {
                  setOnlyBookmarked(!onlyBookmarked);
                  setCurrentPage(1);
                }}
                className={`w-full py-2.5 px-3 rounded-xl border text-xs font-mono uppercase tracking-wider flex items-center justify-center space-x-1.5 transition-all cursor-pointer ${
                  onlyBookmarked
                    ? 'bg-[#C5A059] text-black border-[#C5A059] font-bold'
                    : 'bg-[#1A1A1A] border-[#F5F5F0]/15 text-[#F5F5F0]/80 hover:border-[#C5A059]/50'
                }`}
              >
                <Bookmark className={`w-3.5 h-3.5 ${onlyBookmarked ? 'fill-black' : ''}`} />
                <span>Saved Bookmarks</span>
              </button>
            </div>
          </div>

          {/* Quick Ingredient Tags */}
          <div className="flex items-center gap-1.5 flex-wrap pt-1">
            <span className="text-[10px] uppercase font-mono text-[#F5F5F0]/40 tracking-wider mr-1">Quick Terroirs:</span>
            {QUICK_INGREDIENT_TAGS.map(tag => (
              <button
                key={tag}
                onClick={() => {
                  setSearchQuery(tag === searchQuery ? '' : tag);
                  setCurrentPage(1);
                }}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-mono transition-all border cursor-pointer ${
                  searchQuery === tag
                    ? 'bg-[#C5A059] text-black border-[#C5A059] font-semibold'
                    : 'bg-[#181818] border-[#F5F5F0]/10 text-[#F5F5F0]/70 hover:text-[#C5A059] hover:border-[#C5A059]/40'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Cuisine Pill Tabs with Counts */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none pt-1">
            {CUISINE_REGIONS.map(c => {
              const count = cuisineCounts[c] || 0;
              return (
                <button
                  key={c}
                  onClick={() => {
                    setSelectedCuisine(c);
                    setCurrentPage(1);
                  }}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-mono whitespace-nowrap transition-all uppercase tracking-wider flex items-center space-x-1.5 cursor-pointer ${
                    selectedCuisine === c
                      ? 'bg-[#C5A059]/20 border border-[#C5A059] text-[#C5A059] font-bold shadow-md'
                      : 'bg-[#181818] border border-[#F5F5F0]/10 text-[#F5F5F0]/60 hover:text-[#F5F5F0]'
                  }`}
                >
                  <span>{c}</span>
                  {count > 0 && (
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-md ${
                      selectedCuisine === c ? 'bg-[#C5A059] text-black font-bold' : 'bg-[#252525] text-[#F5F5F0]/50'
                    }`}>
                      {count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* PROMINENT TOP-ONLY PAGINATION CONTROLS (Single Control Bar) */}
        <TopPaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={filteredRecipes.length}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
          onItemsPerPageChange={(limit) => {
            setItemsPerPage(limit);
            setCurrentPage(1);
          }}
          position="top"
        />

        {/* Recipe Cards Grid */}
        {paginatedRecipes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {paginatedRecipes.map(recipe => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                onCook={onCookRecipe}
                onSelect={onOpenRecipeDetails}
              />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center space-y-4 bg-[#181818] rounded-3xl border border-[#F5F5F0]/10">
            <Utensils className="w-12 h-12 text-[#C5A059]/40 mx-auto" />
            <h3 className="text-xl font-serif text-[#F5F5F0]">No recipes found matching your filters</h3>
            <p className="text-xs text-[#F5F5F0]/60 max-w-md mx-auto font-mono">
              Try adjusting your search query or reset your filters to explore all recipes.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCuisine('All Cuisines');
                setSelectedDifficulty('All Levels');
                setOnlyBookmarked(false);
              }}
              className="px-5 py-2.5 rounded-xl bg-[#252525] hover:bg-[#333] border border-white/10 text-xs font-mono uppercase text-[#C5A059] cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </div>

      {/* AI Create Dish Modal */}
      {showCreateModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
          onClick={() => setShowCreateModal(false)}
        >
          <div
            className="w-full max-w-lg bg-[#181818] border border-[#C5A059]/40 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <button
                onClick={() => setShowCreateModal(false)}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-[#222] hover:bg-[#2e2e2e] border border-[#F5F5F0]/15 text-[#F5F5F0] hover:text-[#C5A059] text-xs font-mono transition-all group"
                title="Back (Esc)"
              >
                <ArrowLeft className="w-3.5 h-3.5 text-[#C5A059] group-hover:-translate-x-0.5 transition-transform" />
                <span>Back</span>
              </button>
              <div className="flex items-center space-x-2 text-[#C5A059] text-xs font-mono uppercase tracking-widest">
                <Sparkles className="w-4 h-4" />
                <span>Generative Haute Cuisine</span>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-serif text-[#F5F5F0]">
                Generate Bespoke Recipe & Masterclass
              </h3>
              <p className="text-xs text-[#F5F5F0]/70 font-sans leading-relaxed">
                Direct the AI Executive Chef to synthesize a full step-by-step masterclass with timeline offsets, Critical Control Points, and sommelier pairing.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase text-[#F5F5F0]/60 mb-2">
                  Dish or Ingredient Concept
                </label>
                <input
                  type="text"
                  value={customDishPrompt}
                  onChange={e => setCustomDishPrompt(e.target.value)}
                  placeholder="e.g. Cacio e Pepe with Truffle Caviar, Yuzu Glazed Duck..."
                  className="w-full px-4 py-3 rounded-2xl bg-[#121212] border border-[#F5F5F0]/15 focus:border-[#C5A059] text-sm text-[#F5F5F0] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#F5F5F0]/60 mb-2">
                  Cuisine Discipline
                </label>
                <select
                  value={selectedCuisine === 'All Cuisines' ? 'Italian' : selectedCuisine}
                  onChange={e => setSelectedCuisine(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-[#121212] border border-[#F5F5F0]/15 focus:border-[#C5A059] text-xs font-mono uppercase text-[#F5F5F0] outline-none"
                >
                  {CUISINE_REGIONS.filter(c => c !== 'All Cuisines').map(c => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-3 pt-4 border-t border-[#F5F5F0]/10">
              <button
                onClick={() => setShowCreateModal(false)}
                className="px-5 py-2.5 rounded-full bg-[#252525] text-xs font-mono uppercase text-[#F5F5F0]/80"
              >
                Cancel
              </button>
              <button
                onClick={handleGenerateCustom}
                disabled={isGenerating}
                className="px-6 py-2.5 rounded-full bg-[#C5A059] hover:bg-[#d6b168] text-black font-mono text-xs font-bold uppercase tracking-wider flex items-center space-x-2 disabled:opacity-50"
              >
                <Sparkles className={`w-3.5 h-3.5 ${isGenerating ? 'animate-spin' : ''}`} />
                <span>{isGenerating ? 'Synthesizing...' : 'Synthesize Masterclass'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Degustation Tasting Menu Modal */}
      <TastingMenuModal
        isOpen={isTastingMenuOpen}
        onClose={() => setIsTastingMenuOpen(false)}
        onCookRecipe={onCookRecipe}
      />
    </section>
  );
};
