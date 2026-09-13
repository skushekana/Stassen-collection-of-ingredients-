import React, { useState, useEffect, useMemo } from 'react';
import { CulinaryMasterclass, Ingredient } from '../types';
import {
  ChefHat,
  Search,
  SlidersHorizontal,
  Flame,
  Sparkles,
  RefreshCw,
  Plus,
  Play,
  Clock,
  Check,
  Bookmark,
  ChevronRight,
  Filter,
  Activity,
  Volume2,
  Award,
  ArrowUpRight,
  UtensilsCrossed
} from 'lucide-react';
import { recipeService, CUISINE_REGIONS, DIFFICULTY_LEVELS } from '../services/recipeService';
import { shoppingListService } from '../services/shoppingListService';
import { TopPaginationControls } from '../components/TopPaginationControls';
import { SafeImage } from '../components/SafeImage';
import { CulinaryImage } from '../components/CulinaryImage';
import { accessibilityService } from '../services/accessibilityService';
import { TastingMenuModal } from '../components/TastingMenuModal';
import { router } from '../services/router';
import { searchEngine } from '../content/searchEngine';

interface RecipesArchivePageProps {
  allIngredients: Ingredient[];
  onCookRecipe: (recipe: CulinaryMasterclass) => void;
  onOpenMasterclass: (ingredient?: Ingredient) => void;
  onSelectIngredient: (ingredient: Ingredient) => void;
  onSelectRecipe?: (recipe: CulinaryMasterclass) => void;
}

export const RecipesArchivePage: React.FC<RecipesArchivePageProps> = ({
  allIngredients,
  onCookRecipe,
  onOpenMasterclass,
  onSelectIngredient,
  onSelectRecipe
}) => {
  const [recipes, setRecipes] = useState<CulinaryMasterclass[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState('All Cuisines');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All Difficulties');
  const [sortBy, setSortBy] = useState<'hottest' | 'time' | 'alpha'>('hottest');
  const [filterSavedOnly, setFilterSavedOnly] = useState(false);
  const [isGeneratingContinuous, setIsGeneratingContinuous] = useState(false);
  const [generationCount, setGenerationCount] = useState(0);
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(new Set());
  const [jumpPageInput, setJumpPageInput] = useState('');
  const [isTastingMenuOpen, setIsTastingMenuOpen] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);

  // Common quick-search tags for instant discovery
  const QUICK_TAGS = ['Truffle', 'Saffron', 'Matsutake', 'Wagyu', 'Caviar', 'Uni', 'Yuzu', 'Balsamic', 'Risotto', 'Velouté', 'Confit', 'Pasta'];

  // Load recipes initially with hottest first
  useEffect(() => {
    const list = recipeService.getAllRecipes(sortBy);
    setRecipes(list);
    setBookmarkedIds(recipeService.getBookmarkedRecipeIds());
  }, [sortBy]);

  // Continuous recipe generation stream ticker
  useEffect(() => {
    let interval: any = null;
    if (isGeneratingContinuous) {
      interval = setInterval(() => {
        const newBatch = recipeService.generateBatchContinuous(3);
        setRecipes(recipeService.getAllRecipes(sortBy));
        setGenerationCount((prev) => prev + newBatch.length);
      }, 4000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isGeneratingContinuous, sortBy]);

  const handleToggleBookmark = (recipeId: string) => {
    recipeService.toggleRecipeBookmark(recipeId);
    const updated = new Set(recipeService.getBookmarkedRecipeIds());
    setBookmarkedIds(updated);
    if (updated.has(recipeId)) {
      accessibilityService.speakText('Recipe saved to your cellar collection');
    } else {
      accessibilityService.speakText('Recipe removed from saved collection');
    }
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 120, behavior: 'smooth' });
    accessibilityService.speakText(`Navigated to page ${newPage}`);
  };

  const handleItemsPerPageChange = (newLimit: number) => {
    setItemsPerPage(newLimit);
    setCurrentPage(1);
  };

  // Filter recipes via SearchEngine inverted index
  const filteredRecipes = useMemo(() => {
    return searchEngine.searchRecipes(searchQuery, {
      cuisine: selectedCuisine,
      difficulty: selectedDifficulty,
      savedOnly: filterSavedOnly,
      bookmarkedIds
    }, sortBy);
  }, [searchQuery, selectedCuisine, selectedDifficulty, filterSavedOnly, bookmarkedIds, sortBy, recipes]);

  const totalPages = Math.max(1, Math.ceil(filteredRecipes.length / itemsPerPage));
  const paginatedRecipes = filteredRecipes.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const hottestShowcase = recipeService.getHottestMasterclasses();

  const handleJumpPage = (e: React.FormEvent) => {
    e.preventDefault();
    const pageNum = parseInt(jumpPageInput, 10);
    if (!isNaN(pageNum) && pageNum >= 1 && pageNum <= totalPages) {
      handlePageChange(pageNum);
      setJumpPageInput('');
    }
  };

  const handleSaveTrendingSeed = () => {
    hottestShowcase.slice(0, 3).forEach(r => {
      if (!bookmarkedIds.has(r.id)) {
        recipeService.toggleRecipeBookmark(r.id);
      }
    });
    setBookmarkedIds(new Set(recipeService.getBookmarkedRecipeIds()));
    accessibilityService.speakText('Saved 3 trending masterclass recipes to your cellar');
  };

  return (
    <div id="recipes-archive-page" className="min-h-screen bg-[#121212] text-[#F5F5F0] pt-24 pb-20 px-4 sm:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-6 border-b border-[#F5F5F0]/10">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A059] font-medium block">
                Haute Gastronomy Matrix & Culinary Atelier
              </span>
              <span className="px-2 py-0.5 bg-amber-950/80 border border-amber-500/40 text-amber-300 text-[9px] uppercase tracking-wider font-semibold rounded-sm flex items-center space-x-1">
                <Flame className="w-2.5 h-2.5 fill-current text-amber-400" />
                <span>1,000+ Masterclasses Active</span>
              </span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#F5F5F0] tracking-tight">
              1,000+ Masterclass Recipe Archive
            </h1>
            <p className="text-xs sm:text-sm text-[#F5F5F0]/60 mt-1">
              Explore over 1,000+ chef-calibrated recipes with complete step-by-step photography, thermal control points, audio soundscapes, and sommelier pairings.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Continuous Engine Toggle */}
            <button
              id="continuous-gen-toggle-btn"
              onClick={() => setIsGeneratingContinuous(!isGeneratingContinuous)}
              className={`px-4 py-2.5 text-xs uppercase tracking-wider font-medium flex items-center space-x-2 border transition-all ${
                isGeneratingContinuous
                  ? 'bg-emerald-950/80 border-emerald-500 text-emerald-300'
                  : 'bg-[#1C1C1C] border-[#F5F5F0]/15 text-[#F5F5F0]/80 hover:text-white'
              }`}
            >
              <Activity className={`w-3.5 h-3.5 ${isGeneratingContinuous ? 'animate-spin text-emerald-400' : ''}`} />
              <span>
                {isGeneratingContinuous ? 'Stream Active (Generating)' : 'Live Synthesis Engine'}
              </span>
            </button>

            {/* Degustation Tasting Menu Generator Button */}
            <button
              id="curate-tasting-menu-btn"
              onClick={() => setIsTastingMenuOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#D97706] to-[#B45309] hover:from-[#F59E0B] hover:to-[#D97706] text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center space-x-2 shadow-lg shadow-amber-900/30 transition-transform active:scale-95"
            >
              <UtensilsCrossed className="w-3.5 h-3.5" />
              <span>Curate Tasting Menu</span>
            </button>

            {/* Synthesize Next Batch */}
            <button
              id="generate-batch-btn"
              onClick={() => {
                const batch = recipeService.generateBatchContinuous(6);
                setRecipes(recipeService.getAllRecipes(sortBy));
                setGenerationCount((prev) => prev + batch.length);
                accessibilityService.speakText(`Synthesized 6 new haute masterclasses`);
              }}
              className="px-4 py-2.5 bg-[#C5A059] text-black font-semibold hover:bg-[#d8b46a] text-xs uppercase tracking-wider flex items-center space-x-1.5 transition-all shadow-md"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Synthesize Batch (+6)</span>
            </button>
          </div>
        </div>

        {/* Quick Navigation / Help Guide Banner for Users */}
        <div className="p-4 rounded-2xl bg-[#181818] border border-[#C5A059]/30 mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-[#C5A059]/10 text-[#C5A059] shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="text-xs">
              <span className="font-semibold text-white block">
                How to navigate 1,000+ recipes:
              </span>
              <span className="text-[#F5F5F0]/70">
                Use the search bar and cuisine filters below to narrow recipes by origin or difficulty. Click <strong>"Cook Mode"</strong> on any dish to view complete step-by-step photography and timers.
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-2 text-xs font-mono text-[#C5A059]">
            <span>Total Available: {filteredRecipes.length} dishes</span>
          </div>
        </div>

        {/* Live Generation Ticker Banner */}
        <div className="p-4 bg-[#181818] border border-[#F5F5F0]/10 mb-6 flex flex-wrap items-center justify-between gap-3 shadow-inner">
          <div className="flex items-center space-x-3 text-xs">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <span>
              Index Capacity: <strong className="text-[#C5A059] font-mono text-sm">{recipes.length}</strong> Masterclass Recipes
            </span>
            {generationCount > 0 && (
              <span className="text-emerald-400 text-[11px] bg-emerald-950/60 px-2 py-0.5 border border-emerald-700/30">
                +{generationCount} new in this session
              </span>
            )}
          </div>

          <div className="text-[11px] text-[#F5F5F0]/60 flex items-center space-x-2">
            <span className="text-amber-400 font-mono font-bold">🔥 Page 1:</span>
            <span>Surfacing the most beautiful, coveted & award-winning recipes first</span>
          </div>
        </div>

        {/* TOP PAGINATION CONTROLS (VISIBLE DIRECTLY AT THE TOP OF THE PAGE) */}
        <TopPaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={filteredRecipes.length}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
          onItemsPerPageChange={handleItemsPerPageChange}
          position="top"
        />

        {/* PAGE 1 EXCLUSIVE FEATURE: HOTTEST RECIPES SPOTLIGHT */}
        {currentPage === 1 && !searchQuery && selectedCuisine === 'All Cuisines' && (
          <section id="page-one-hottest-spotlight" className="mb-10 p-6 sm:p-8 bg-gradient-to-br from-[#1E1E1E] to-[#161616] border-2 border-[#C5A059]/40 shadow-2xl relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#C5A059]/5 rounded-full blur-3xl pointer-events-none" />

            <div className="flex flex-wrap items-center justify-between gap-4 mb-6 relative z-10">
              <div>
                <div className="flex items-center space-x-2 text-[#C5A059] text-xs uppercase tracking-widest font-mono font-bold mb-1">
                  <Flame className="w-4 h-4 text-amber-400 fill-current animate-bounce" />
                  <span>Page 1 Showcase • Most Attractive & Hottest Masterpieces</span>
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl text-white">
                  Haute Gastronomy Coveted Index (Rankings #1–#3)
                </h2>
                <p className="text-xs text-[#F5F5F0]/70 mt-1 max-w-2xl">
                  Curated signature compositions exhibiting rare ingredients, 24k gold leaf, white Alba truffles, and solera-aged nectars.
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-[11px] uppercase tracking-wider text-amber-300 bg-amber-950/80 border border-amber-500/50 px-3 py-1 font-mono font-bold">
                  HOTTEST TREND SCORE: 99.9 / 100
                </span>
              </div>
            </div>

            {/* Top 3 Featured Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative z-10">
              {hottestShowcase.slice(0, 3).map((recipe, idx) => (
                <div
                  key={recipe.id}
                  className="bg-[#141414] border border-[#C5A059]/30 hover:border-[#C5A059] transition-all p-5 flex flex-col justify-between group shadow-2xl relative"
                >
                  {/* Hotness Badge */}
                  <div className="absolute -top-3 left-4 z-20 px-3 py-0.5 bg-gradient-to-r from-amber-500 to-[#C5A059] text-black font-mono font-bold text-[10px] uppercase tracking-wider shadow-lg flex items-center space-x-1">
                    <Flame className="w-3 h-3 fill-current" />
                    <span>RANK #{idx + 1} • HOTTEST</span>
                  </div>

                  <div
                    className="cursor-pointer"
                    onClick={() => {
                      if (onSelectRecipe) {
                        onSelectRecipe(recipe);
                      } else {
                        onCookRecipe(recipe);
                      }
                    }}
                  >
                    <div className="relative aspect-[16/10] mb-4 bg-black/60 overflow-hidden border border-[#C5A059]/20 mt-1">
                      <CulinaryImage
                        recipe={recipe}
                        src={recipe.heroImageUrl}
                        alt={`${recipe.dishTitle} — ${recipe.cuisine} recipe`}
                        priority={idx < 4}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                        containerClassName="w-full h-full"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none z-10" />
                      <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[10px]">
                        <span className="text-[#C5A059] font-mono font-bold bg-black/80 px-2 py-0.5 border border-[#C5A059]/30">
                          {recipe.awardBadge || '3-Star Michelin Atelier'}
                        </span>
                        <span className="text-white font-mono bg-black/80 px-2 py-0.5">
                          {recipe.overallDurationFormatted}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 text-[10px] uppercase tracking-wider text-[#C5A059] mb-1 font-mono">
                      {recipe.primaryIngredientSlug ? (
                        <a
                          href={`/ingredients/${recipe.primaryIngredientSlug}`}
                          onClick={(e) => {
                            if (!e.metaKey && !e.ctrlKey) {
                              e.preventDefault();
                              e.stopPropagation();
                              router.navigate({
                                view: 'ingredient-detail',
                                ingredientSlug: recipe.primaryIngredientSlug
                              });
                            }
                          }}
                          className="hover:underline text-[#C5A059] font-medium"
                          title={`Explore ${recipe.primaryIngredientName} terroir profile`}
                        >
                          {recipe.primaryIngredientName}
                        </a>
                      ) : (
                        <span>{recipe.primaryIngredientName}</span>
                      )}
                    </div>

                    <h3 className="font-serif text-lg text-[#F5F5F0] group-hover:text-[#C5A059] transition-colors mb-2 leading-snug flex items-center justify-between">
                      <a
                        href={`/recipes/${recipe.slug || recipe.id}`}
                        onClick={(e) => {
                          if (!e.metaKey && !e.ctrlKey) {
                            e.preventDefault();
                            if (onSelectRecipe) {
                              onSelectRecipe(recipe);
                            } else {
                              onCookRecipe(recipe);
                            }
                          }
                        }}
                        className="text-inherit hover:text-[#C5A059] transition-colors"
                        title={`View masterclass recipe: ${recipe.dishTitle}`}
                      >
                        {recipe.dishTitle}
                      </a>
                      <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-[#C5A059]" />
                    </h3>

                    <p className="text-xs text-[#F5F5F0]/75 line-clamp-3 mb-4 leading-relaxed">
                      {recipe.overview}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#F5F5F0]/10 flex items-center justify-between gap-2 text-xs">
                    <button
                      onClick={() => {
                        accessibilityService.speakText(
                          `${recipe.dishTitle}. Primary ingredient: ${recipe.primaryIngredientName}. ${recipe.overview}`
                        );
                      }}
                      className="p-1.5 bg-[#202020] hover:bg-[#2c2c2c] text-[#C5A059] border border-[#F5F5F0]/10 flex items-center space-x-1"
                      title="Audio Narration"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span className="text-[10px] uppercase tracking-wider hidden sm:inline">Listen</span>
                    </button>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => shoppingListService.addRecipeIngredients(recipe)}
                        className="p-1.5 bg-[#202020] hover:bg-[#2c2c2c] text-[#F5F5F0]/80 hover:text-white border border-[#F5F5F0]/10"
                        title="Add to Provision List"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => onCookRecipe(recipe)}
                        className="px-3.5 py-1.5 bg-[#C5A059] text-black font-semibold hover:bg-[#d8b46a] text-xs uppercase tracking-wider flex items-center space-x-1 shadow-md"
                      >
                        <Play className="w-3 h-3 fill-current" />
                        <span>Cook Masterclass</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Primary View Filters & Saved Recipes Switcher */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="flex flex-wrap items-center gap-2">
            <button
              id="filter-all-recipes-tab"
              onClick={() => {
                setFilterSavedOnly(false);
                setCurrentPage(1);
              }}
              className={`px-4 py-2 text-xs uppercase tracking-wider font-semibold rounded transition-all flex items-center space-x-2 border ${
                !filterSavedOnly
                  ? 'bg-[#C5A059] text-black border-[#C5A059] shadow-md'
                  : 'bg-[#181818] border-[#F5F5F0]/15 text-[#F5F5F0]/70 hover:text-white'
              }`}
            >
              <ChefHat className="w-3.5 h-3.5" />
              <span>All 1,000+ Masterclasses ({recipes.length})</span>
            </button>

            <button
              id="filter-saved-recipes-tab"
              onClick={() => {
                setFilterSavedOnly(true);
                setCurrentPage(1);
              }}
              className={`px-4 py-2 text-xs uppercase tracking-wider font-semibold rounded transition-all flex items-center space-x-2 border ${
                filterSavedOnly
                  ? 'bg-[#C5A059] text-black border-[#C5A059] shadow-md'
                  : 'bg-[#181818] border-[#C5A059]/40 text-[#C5A059] hover:bg-[#C5A059]/10'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${filterSavedOnly ? 'fill-current' : ''}`} />
              <span>⭐ Saved Recipes ({bookmarkedIds.size})</span>
            </button>
          </div>

          {/* Quick Page Jump Control */}
          <form onSubmit={handleJumpPage} className="flex items-center space-x-2 text-xs">
            <span className="text-[11px] text-[#F5F5F0]/60 font-mono">Jump Page:</span>
            <input
              type="number"
              min={1}
              max={totalPages}
              value={jumpPageInput}
              onChange={(e) => setJumpPageInput(e.target.value)}
              placeholder={`${currentPage}/${totalPages}`}
              className="w-16 bg-[#181818] border border-[#F5F5F0]/20 px-2 py-1 text-center text-xs text-[#C5A059] focus:outline-none focus:border-[#C5A059]"
            />
            <button
              type="submit"
              className="px-2.5 py-1 bg-[#252525] hover:bg-[#333] border border-[#F5F5F0]/20 text-[#F5F5F0] text-xs font-mono uppercase"
            >
              Go
            </button>
          </form>
        </div>

        {/* Quick Tag Search Filter Chips */}
        <div className="flex flex-wrap items-center gap-1.5 mb-6">
          <span className="text-[10px] uppercase tracking-wider text-[#F5F5F0]/40 mr-1 font-mono">Quick Tags:</span>
          {QUICK_TAGS.map((tag) => {
            const isActive = searchQuery.toLowerCase() === tag.toLowerCase();
            return (
              <button
                key={tag}
                onClick={() => {
                  if (isActive) {
                    setSearchQuery('');
                  } else {
                    setSearchQuery(tag);
                  }
                  setCurrentPage(1);
                }}
                className={`px-2.5 py-1 rounded text-[10px] tracking-wider uppercase font-medium border transition-all ${
                  isActive
                    ? 'bg-[#C5A059] text-black border-[#C5A059]'
                    : 'bg-[#181818] border-[#F5F5F0]/10 text-[#F5F5F0]/70 hover:border-[#C5A059]/40 hover:text-[#C5A059]'
                }`}
              >
                #{tag}
              </button>
            );
          })}
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="px-2 py-0.5 text-[10px] text-red-400 hover:underline"
            >
              Clear Filter
            </button>
          )}
        </div>

        {/* Search & Filter Controls */}
        <div className="p-4 sm:p-5 bg-[#1E1E1E] border border-[#F5F5F0]/10 mb-8 flex flex-wrap items-center justify-between gap-4">
          <div className="relative flex-1 min-w-[240px]">
            <Search className="w-4 h-4 text-[#C5A059] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search 1,000+ recipes by ingredient, dish title, technique..."
              className="w-full bg-[#181818] border border-[#F5F5F0]/15 pl-9 pr-4 py-2 text-xs sm:text-sm text-[#F5F5F0] placeholder-[#F5F5F0]/40 focus:outline-none focus:border-[#C5A059]"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Sort Selector */}
            <div className="flex items-center space-x-1.5 text-xs">
              <span className="text-[10px] uppercase text-[#F5F5F0]/50 font-mono">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value as any);
                  setCurrentPage(1);
                }}
                className="bg-[#181818] border border-[#F5F5F0]/15 text-xs text-[#C5A059] font-medium px-3 py-2 focus:outline-none focus:border-[#C5A059]"
              >
                <option value="hottest">🔥 Hottest & Most Coveted First</option>
                <option value="time">⏱️ Fastest Prep Time</option>
                <option value="alpha">🔤 Alphabetical (A-Z)</option>
              </select>
            </div>

            <select
              value={selectedCuisine}
              onChange={(e) => {
                setSelectedCuisine(e.target.value);
                setCurrentPage(1);
              }}
              className="bg-[#181818] border border-[#F5F5F0]/15 text-xs text-[#F5F5F0] px-3 py-2 focus:outline-none focus:border-[#C5A059]"
            >
              {CUISINE_REGIONS.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>

            <select
              value={selectedDifficulty}
              onChange={(e) => {
                setSelectedDifficulty(e.target.value);
                setCurrentPage(1);
              }}
              className="bg-[#181818] border border-[#F5F5F0]/15 text-xs text-[#F5F5F0] px-3 py-2 focus:outline-none focus:border-[#C5A059]"
            >
              {DIFFICULTY_LEVELS.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>
        </div>

        {/* PROMINENT TOP-ONLY PAGINATION CONTROLS */}
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

        {/* Recipe Grid or Zero State */}
        {filteredRecipes.length === 0 ? (
          <div className="p-12 text-center bg-[#181818] border border-[#F5F5F0]/10 max-w-xl mx-auto my-12">
            <Bookmark className="w-10 h-10 text-[#C5A059]/40 mx-auto mb-4" />
            <h3 className="font-serif text-2xl text-[#F5F5F0] mb-2">
              {filterSavedOnly ? 'No Saved Recipes Yet' : 'No Recipes Match Your Filter'}
            </h3>
            <p className="text-xs sm:text-sm text-[#F5F5F0]/60 mb-6 leading-relaxed">
              {filterSavedOnly
                ? 'Bookmark recipes across the 1,000+ archive using the save icon on any recipe card to build your personal cookbook.'
                : 'Try clearing your search query or selecting "All Cuisines" to browse the full catalog.'}
            </p>
            {filterSavedOnly ? (
              <div className="flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={handleSaveTrendingSeed}
                  className="px-5 py-2.5 bg-[#C5A059] text-black font-semibold text-xs uppercase tracking-wider hover:bg-[#d8b46a] transition-all"
                >
                  Save 3 Trending Masterclasses
                </button>
                <button
                  onClick={() => setFilterSavedOnly(false)}
                  className="px-5 py-2.5 bg-[#252525] text-[#F5F5F0] border border-[#F5F5F0]/20 text-xs uppercase tracking-wider hover:bg-[#333] transition-all"
                >
                  Explore All 1,000+ Recipes
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCuisine('All Cuisines');
                  setSelectedDifficulty('All Difficulties');
                }}
                className="px-6 py-2.5 bg-[#C5A059] text-black font-semibold text-xs uppercase tracking-wider hover:bg-[#d8b46a] transition-all"
              >
                Reset All Filters
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedRecipes.map((recipe) => {
              const isBookmarked = bookmarkedIds.has(recipe.id);

              return (
                <div
                  key={recipe.id}
                  className={`bg-[#1E1E1E] border transition-all p-5 flex flex-col justify-between group shadow-xl relative ${
                    recipe.isHottest
                      ? 'border-[#C5A059]/40 hover:border-[#C5A059]'
                      : 'border-[#F5F5F0]/10 hover:border-[#C5A059]/50'
                  }`}
                >
                  {/* Hotness Badge on card */}
                  {recipe.isHottest && (
                    <div className="absolute top-2 left-2 z-20 px-2 py-0.5 bg-amber-500 text-black font-mono font-bold text-[9px] uppercase tracking-wider shadow">
                      🔥 HOTTEST #{recipe.hotnessRank || 1}
                    </div>
                  )}

                  <div
                    className="cursor-pointer"
                    onClick={() => {
                      if (onSelectRecipe) {
                        onSelectRecipe(recipe);
                      } else {
                        onCookRecipe(recipe);
                      }
                    }}
                  >
                    <div className="relative aspect-[16/9] mb-4 bg-black/40 overflow-hidden border border-white/5">
                      <CulinaryImage
                        recipe={recipe}
                        src={recipe.heroImageUrl}
                        alt={`${recipe.dishTitle} — ${recipe.cuisine} culinary atelier`}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                        containerClassName="w-full h-full"
                      />
                      <div className="absolute top-2 right-2 px-2 py-0.5 bg-black/80 backdrop-blur-md text-[9px] uppercase tracking-wider text-[#C5A059] border border-white/10 z-20">
                        {recipe.cuisine || 'Haute Cuisine'}
                      </div>
                      <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-black/80 backdrop-blur-md text-[9px] text-[#F5F5F0]/80 z-20">
                        {recipe.overallDurationFormatted}
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 text-[10px] uppercase tracking-wider text-[#C5A059] mb-1">
                      {recipe.primaryIngredientSlug ? (
                        <a
                          href={`/ingredients/${recipe.primaryIngredientSlug}`}
                          onClick={(e) => {
                            if (!e.metaKey && !e.ctrlKey) {
                              e.preventDefault();
                              e.stopPropagation();
                              router.navigate({
                                view: 'ingredient-detail',
                                ingredientSlug: recipe.primaryIngredientSlug
                              });
                            }
                          }}
                          className="hover:underline text-[#C5A059] font-medium"
                          title={`Explore ${recipe.primaryIngredientName} terroir profile`}
                        >
                          {recipe.primaryIngredientName}
                        </a>
                      ) : (
                        <span>{recipe.primaryIngredientName}</span>
                      )}
                      <span className="text-[#F5F5F0]/30">•</span>
                      <span>{recipe.difficulty}</span>
                    </div>

                    <h3 className="font-serif text-xl text-[#F5F5F0] group-hover:text-[#C5A059] transition-colors mb-2 leading-snug flex items-center justify-between">
                      <a
                        href={`/recipes/${recipe.slug || recipe.id}`}
                        onClick={(e) => {
                          if (!e.metaKey && !e.ctrlKey) {
                            e.preventDefault();
                            if (onSelectRecipe) {
                              onSelectRecipe(recipe);
                            } else {
                              onCookRecipe(recipe);
                            }
                          }
                        }}
                        className="text-inherit hover:text-[#C5A059] transition-colors"
                        title={`View masterclass recipe: ${recipe.dishTitle}`}
                      >
                        {recipe.dishTitle}
                      </a>
                      <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-[#C5A059]" />
                    </h3>

                    <p className="text-xs text-[#F5F5F0]/70 line-clamp-2 mb-4 leading-relaxed">
                      {recipe.overview}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {recipe.tags?.slice(0, 3).map((tag, idx) => (
                        <span key={idx} className="px-2 py-0.5 bg-[#252525] text-[10px] text-[#F5F5F0]/70 border border-white/5">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Footer Controls */}
                  <div className="pt-4 border-t border-[#F5F5F0]/10 flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => shoppingListService.addRecipeIngredients(recipe)}
                        className="text-[#F5F5F0]/60 hover:text-[#C5A059] transition-colors flex items-center space-x-1"
                        title="Add ingredients to list"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span className="text-[11px]">Provisions</span>
                      </button>

                      {/* Explicit Save Recipe Action Button */}
                      <button
                        onClick={() => handleToggleBookmark(recipe.id)}
                        className={`px-2 py-1 rounded text-[10px] font-mono flex items-center space-x-1 border transition-all ${
                          isBookmarked
                            ? 'bg-[#C5A059]/20 border-[#C5A059] text-[#C5A059]'
                            : 'bg-[#222] border-[#F5F5F0]/15 text-[#F5F5F0]/60 hover:text-white hover:border-[#C5A059]/40'
                        }`}
                        title={isBookmarked ? 'Saved to Cellar (Click to remove)' : 'Save recipe to cellar'}
                      >
                        <Bookmark className={`w-3 h-3 ${isBookmarked ? 'fill-current text-[#C5A059]' : ''}`} />
                        <span>{isBookmarked ? 'Saved' : 'Save'}</span>
                      </button>

                      <button
                        onClick={() => {
                          accessibilityService.speakText(
                            `${recipe.dishTitle}. ${recipe.overview}`
                          );
                        }}
                        className="p-1 text-[#F5F5F0]/40 hover:text-[#C5A059] transition-colors"
                        title="Audio Read"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <button
                      onClick={() => onCookRecipe(recipe)}
                      className="px-3.5 py-1.5 bg-[#C5A059] text-[#121212] hover:bg-[#d6b168] text-xs uppercase tracking-wider font-medium flex items-center space-x-1 transition-all shadow"
                    >
                      <Play className="w-3 h-3 fill-current" />
                      <span>Cook Mode</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Degustation Tasting Menu Modal */}
        <TastingMenuModal
          isOpen={isTastingMenuOpen}
          onClose={() => setIsTastingMenuOpen(false)}
          onCookRecipe={onCookRecipe}
        />
      </div>
    </div>
  );
};
