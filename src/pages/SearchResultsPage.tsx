import React, { useState, useMemo, useEffect } from 'react';
import { Ingredient, CulinaryMasterclass } from '../types';
import {
  Search,
  SlidersHorizontal,
  X,
  MapPin,
  Calendar,
  Sparkles,
  ArrowRight,
  Grid,
  List,
  Bookmark,
  ChefHat,
  Clock,
  Plus,
  Play,
  Flame,
  ChevronLeft,
  ChevronRight,
  RotateCcw
} from 'lucide-react';
import { IngredientCard } from '../components/IngredientCard';
import { RecipeCard } from '../components/RecipeCard';
import { IngredientImage } from '../components/IngredientImage';
import { CulinaryImage } from '../components/CulinaryImage';
import { SeasonalBadge } from '../components/SeasonalIndicator';
import { searchEngine, UnifiedSearchResult } from '../content/searchEngine';
import { contentRegistry } from '../content/contentRegistry';
import { CATEGORIES_LIST, SEASONS_LIST, RARITY_LEVELS } from '../data/ingredients';
import { shoppingListService } from '../services/shoppingListService';
import { toggleRecipeBookmark } from '../services/recipeService';
import { router } from '../services/router';

interface SearchResultsPageProps {
  ingredients: Ingredient[];
  savedIds: string[];
  onToggleSave: (id: string) => void;
  onSelectIngredient: (ingredient: Ingredient) => void;
  onSelectRecipe?: (recipe: CulinaryMasterclass) => void;
  onCookRecipe?: (recipe: CulinaryMasterclass) => void;
  initialQuery?: string;
}

const ITEMS_PER_PAGE = 24;

export const SearchResultsPage: React.FC<SearchResultsPageProps> = ({
  ingredients,
  savedIds,
  onToggleSave,
  onSelectIngredient,
  onSelectRecipe,
  onCookRecipe,
  initialQuery = ''
}) => {
  const [searchQuery, setSearchQuery] = useState<string>(initialQuery);
  const [contentType, setContentType] = useState<'all' | 'ingredient' | 'recipe'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('All Categories');
  const [selectedCuisine, setSelectedCuisine] = useState<string>('All Cuisines');
  const [selectedCourse, setSelectedCourse] = useState<string>('All Courses');
  const [selectedSeason, setSelectedSeason] = useState<string>('All Seasons');
  const [selectedRarity, setSelectedRarity] = useState<string>('All Rarities');
  const [selectedOrigin, setSelectedOrigin] = useState<string>('All Origins');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All Difficulties');
  const [sortBy, setSortBy] = useState<'relevance' | 'name' | 'time' | 'umami' | 'aroma'>('relevance');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState<boolean>(false);

  // Sync initial query if prop changes
  useEffect(() => {
    if (initialQuery !== undefined && initialQuery !== searchQuery) {
      setSearchQuery(initialQuery);
      setCurrentPage(1);
    }
  }, [initialQuery]);

  // Reset pagination when search query or filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [
    searchQuery,
    contentType,
    selectedCategory,
    selectedCuisine,
    selectedCourse,
    selectedSeason,
    selectedRarity,
    selectedOrigin,
    selectedDifficulty,
    sortBy
  ]);

  // Extract unique origins from all ingredients
  const uniqueOrigins = useMemo(() => {
    const origins = new Set<string>();
    const allIngs = contentRegistry.getAllIngredients();
    allIngs.forEach((i) => {
      if (i.country) origins.add(i.country);
    });
    return ['All Origins', ...Array.from(origins).sort()];
  }, []);

  // Extract unique cuisines from all recipes
  const uniqueCuisines = useMemo(() => {
    const cuisines = new Set<string>();
    const allRecs = contentRegistry.getAllRecipes();
    allRecs.forEach((r) => {
      if (r.cuisine) cuisines.add(r.cuisine);
    });
    return ['All Cuisines', ...Array.from(cuisines).sort()];
  }, []);

  // Extract unique course categories from all recipes
  const uniqueCourses = useMemo(() => {
    const courses = new Set<string>();
    const allRecs = contentRegistry.getAllRecipes();
    allRecs.forEach((r) => {
      const course = r.courseCategory || r.category;
      if (course) courses.add(course);
    });
    return ['All Courses', ...Array.from(courses).sort()];
  }, []);

  // Compute facet counts for tabs (All, Ingredients, Recipes)
  const facetCounts = useMemo(() => {
    return searchEngine.getSearchFacets(searchQuery);
  }, [searchQuery]);

  // Execute unified search via SearchEngine
  const searchResults: UnifiedSearchResult[] = useMemo(() => {
    return searchEngine.searchUnified(
      searchQuery,
      {
        type: contentType,
        category: selectedCategory,
        cuisine: selectedCuisine,
        course: selectedCourse,
        season: selectedSeason,
        rarity: selectedRarity,
        country: selectedOrigin,
        difficulty: selectedDifficulty
      },
      sortBy
    );
  }, [
    searchQuery,
    contentType,
    selectedCategory,
    selectedCuisine,
    selectedCourse,
    selectedSeason,
    selectedRarity,
    selectedOrigin,
    selectedDifficulty,
    sortBy
  ]);

  // Paginated slice for high performance with thousands of items
  const totalResults = searchResults.length;
  const totalPages = Math.max(1, Math.ceil(totalResults / ITEMS_PER_PAGE));
  const paginatedResults = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return searchResults.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [searchResults, currentPage]);

  const activeFiltersCount =
    (selectedCategory !== 'All Categories' ? 1 : 0) +
    (selectedCuisine !== 'All Cuisines' ? 1 : 0) +
    (selectedCourse !== 'All Courses' ? 1 : 0) +
    (selectedSeason !== 'All Seasons' ? 1 : 0) +
    (selectedRarity !== 'All Rarities' ? 1 : 0) +
    (selectedOrigin !== 'All Origins' ? 1 : 0) +
    (selectedDifficulty !== 'All Difficulties' ? 1 : 0);

  const handleResetFilters = () => {
    setSelectedCategory('All Categories');
    setSelectedCuisine('All Cuisines');
    setSelectedCourse('All Courses');
    setSelectedSeason('All Seasons');
    setSelectedRarity('All Rarities');
    setSelectedOrigin('All Origins');
    setSelectedDifficulty('All Difficulties');
    setSearchQuery('');
    setContentType('all');
    setCurrentPage(1);
  };

  const handleRecipeSelect = (recipe: CulinaryMasterclass) => {
    if (onSelectRecipe) {
      onSelectRecipe(recipe);
    } else {
      router.navigate({ view: 'recipe-detail', recipeSlug: recipe.slug || recipe.id });
    }
  };

  const handleRecipeCook = (recipe: CulinaryMasterclass) => {
    if (onCookRecipe) {
      onCookRecipe(recipe);
    } else {
      router.navigate({ view: 'recipe-detail', recipeSlug: recipe.slug || recipe.id });
    }
  };

  return (
    <div id="search-results-page" className="min-h-screen bg-[#121212] text-[#F5F5F0] pt-24 pb-24 px-4 sm:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-2 text-[10px] uppercase tracking-[0.3em] text-[#C5A059] font-medium mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>Curated Archival Index & Global Search Engine</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#F5F5F0] tracking-tight">
            Search Ingredients & Recipes
          </h1>
          <p className="text-xs sm:text-sm text-[#F5F5F0]/60 mt-2 max-w-3xl leading-relaxed">
            Instant multi-attribute search across 1,000+ botanical specimens and haute gastronomy masterclasses by exact name,
            partial term, culinary aliases, course categories, global cuisines, and aromatic volatile profiles.
          </p>
        </div>

        {/* Live Search Bar Box */}
        <div className="relative mb-4">
          <div className="relative flex items-center bg-[#1E1E1E] border border-[#F5F5F0]/15 focus-within:border-[#C5A059] transition-all shadow-2xl rounded-xl overflow-hidden">
            <Search className="w-5 h-5 text-[#C5A059] ml-4 sm:ml-5 flex-shrink-0" />
            <input
              id="search-page-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by ingredient, dish title, cuisine (e.g. Japanese, Italian), course, alias, or flavor..."
              className="w-full bg-transparent px-4 py-4 text-sm sm:text-base text-[#F5F5F0] placeholder-[#F5F5F0]/40 focus:outline-none font-sans"
              autoComplete="off"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="p-2 mr-3 text-[#F5F5F0]/50 hover:text-white transition-colors"
                aria-label="Clear search input"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Popular / Suggested Query Chips */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-6 text-xs">
          <span className="text-[#F5F5F0]/40 text-[11px] uppercase tracking-wider mr-1">Curated Queries:</span>
          {[
            'Alba Truffle',
            'Matsutake',
            'Saffron',
            'Cacio e Pepe',
            'Japanese',
            'Italian',
            'Balsamico',
            'Wagyu',
            'Main Course',
            'Wild Fungi'
          ].map((tag) => (
            <button
              key={tag}
              onClick={() => setSearchQuery(tag)}
              className={`px-2.5 py-1 text-[11px] font-sans border rounded-lg transition-all ${
                searchQuery.toLowerCase() === tag.toLowerCase()
                  ? 'bg-[#C5A059] text-[#121212] border-[#C5A059] font-medium'
                  : 'bg-[#1A1A1A] hover:bg-[#252525] border-[#F5F5F0]/10 hover:border-[#C5A059]/40 text-[#F5F5F0]/80 hover:text-[#C5A059]'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Content Type Segmented Tabs Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-[#F5F5F0]/10">
          <div className="inline-flex p-1 bg-[#1A1A1A] border border-[#F5F5F0]/15 rounded-xl">
            <button
              id="search-tab-all"
              onClick={() => setContentType('all')}
              className={`px-4 py-2 rounded-lg text-xs font-medium transition-all ${
                contentType === 'all'
                  ? 'bg-[#C5A059] text-[#121212] shadow-md'
                  : 'text-[#F5F5F0]/70 hover:text-white hover:bg-white/5'
              }`}
            >
              All Results <span className="text-[10px] ml-1 opacity-80">({facetCounts.total})</span>
            </button>

            <button
              id="search-tab-ingredients"
              onClick={() => setContentType('ingredient')}
              className={`px-4 py-2 rounded-lg text-xs font-medium transition-all flex items-center space-x-1.5 ${
                contentType === 'ingredient'
                  ? 'bg-[#C5A059] text-[#121212] shadow-md'
                  : 'text-[#F5F5F0]/70 hover:text-white hover:bg-white/5'
              }`}
            >
              <Sparkles className="w-3 h-3" />
              <span>Ingredients</span>
              <span className="text-[10px] ml-1 opacity-80">({facetCounts.ingredientsCount})</span>
            </button>

            <button
              id="search-tab-recipes"
              onClick={() => setContentType('recipe')}
              className={`px-4 py-2 rounded-lg text-xs font-medium transition-all flex items-center space-x-1.5 ${
                contentType === 'recipe'
                  ? 'bg-[#C5A059] text-[#121212] shadow-md'
                  : 'text-[#F5F5F0]/70 hover:text-white hover:bg-white/5'
              }`}
            >
              <ChefHat className="w-3 h-3" />
              <span>Recipes</span>
              <span className="text-[10px] ml-1 opacity-80">({facetCounts.recipesCount})</span>
            </button>
          </div>

          {/* Quick Filters Toggle Button for Mobile / Compact */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
              className={`px-3 py-2 text-xs rounded-xl border flex items-center space-x-1.5 transition-all ${
                showAdvancedFilters || activeFiltersCount > 0
                  ? 'border-[#C5A059] text-[#C5A059] bg-[#C5A059]/10'
                  : 'border-[#F5F5F0]/15 text-[#F5F5F0]/70 hover:text-white bg-[#1A1A1A]'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filters {activeFiltersCount > 0 ? `(${activeFiltersCount})` : ''}</span>
            </button>

            {/* View Mode Toggle: Grid / List */}
            <div className="flex items-center border border-[#F5F5F0]/15 rounded-xl overflow-hidden bg-[#1A1A1A]">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 transition-all ${
                  viewMode === 'grid' ? 'bg-[#C5A059] text-[#121212]' : 'text-[#F5F5F0]/60 hover:text-white'
                }`}
                aria-label="Grid view"
                title="Grid View"
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 transition-all ${
                  viewMode === 'list' ? 'bg-[#C5A059] text-[#121212]' : 'text-[#F5F5F0]/60 hover:text-white'
                }`}
                aria-label="List view"
                title="List View"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Faceted Filter Bar (Always visible or toggled) */}
        <div className={`p-4 sm:p-5 bg-[#181818] border border-[#F5F5F0]/10 rounded-2xl mb-8 space-y-4 ${showAdvancedFilters ? 'block' : 'block sm:block'}`}>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
              {/* Ingredient Specific Filters: Category & Season */}
              {(contentType === 'all' || contentType === 'ingredient') && (
                <>
                  {/* Category */}
                  <select
                    id="filter-category"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="bg-[#222] border border-[#F5F5F0]/15 text-xs text-[#F5F5F0] px-3 py-2 rounded-lg focus:outline-none focus:border-[#C5A059]"
                  >
                    <option value="All Categories">All Categories</option>
                    {CATEGORIES_LIST.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>

                  {/* Season */}
                  <select
                    id="filter-season"
                    value={selectedSeason}
                    onChange={(e) => setSelectedSeason(e.target.value)}
                    className="bg-[#222] border border-[#F5F5F0]/15 text-xs text-[#F5F5F0] px-3 py-2 rounded-lg focus:outline-none focus:border-[#C5A059]"
                  >
                    <option value="All Seasons">All Seasons</option>
                    <option value="In Season Now">🌿 In Season Now</option>
                    {SEASONS_LIST.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>

                  {/* Origin */}
                  <select
                    id="filter-origin"
                    value={selectedOrigin}
                    onChange={(e) => setSelectedOrigin(e.target.value)}
                    className="bg-[#222] border border-[#F5F5F0]/15 text-xs text-[#F5F5F0] px-3 py-2 rounded-lg focus:outline-none focus:border-[#C5A059]"
                  >
                    {uniqueOrigins.map((o) => (
                      <option key={o} value={o}>{o}</option>
                    ))}
                  </select>
                </>
              )}

              {/* Recipe Specific Filters: Cuisine, Course, Difficulty */}
              {(contentType === 'all' || contentType === 'recipe') && (
                <>
                  {/* Cuisine */}
                  <select
                    id="filter-cuisine"
                    value={selectedCuisine}
                    onChange={(e) => setSelectedCuisine(e.target.value)}
                    className="bg-[#222] border border-[#F5F5F0]/15 text-xs text-[#F5F5F0] px-3 py-2 rounded-lg focus:outline-none focus:border-[#C5A059]"
                  >
                    {uniqueCuisines.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>

                  {/* Course Category */}
                  <select
                    id="filter-course"
                    value={selectedCourse}
                    onChange={(e) => setSelectedCourse(e.target.value)}
                    className="bg-[#222] border border-[#F5F5F0]/15 text-xs text-[#F5F5F0] px-3 py-2 rounded-lg focus:outline-none focus:border-[#C5A059]"
                  >
                    {uniqueCourses.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>

                  {/* Difficulty */}
                  <select
                    id="filter-difficulty"
                    value={selectedDifficulty}
                    onChange={(e) => setSelectedDifficulty(e.target.value)}
                    className="bg-[#222] border border-[#F5F5F0]/15 text-xs text-[#F5F5F0] px-3 py-2 rounded-lg focus:outline-none focus:border-[#C5A059]"
                  >
                    <option value="All Difficulties">All Difficulties</option>
                    <option value="Easy">Easy</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                    <option value="Master">Master</option>
                  </select>
                </>
              )}

              {activeFiltersCount > 0 && (
                <button
                  onClick={handleResetFilters}
                  className="text-xs text-[#C5A059] hover:underline flex items-center space-x-1 px-2 py-1"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>Reset ({activeFiltersCount})</span>
                </button>
              )}
            </div>

            {/* Sorting Dropdown */}
            <div className="flex items-center space-x-2 text-xs">
              <span className="text-[#F5F5F0]/50 uppercase tracking-wider text-[10px]">Sort:</span>
              <select
                id="search-sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-[#222] border border-[#F5F5F0]/15 text-xs text-[#F5F5F0] px-3 py-2 rounded-lg focus:outline-none focus:border-[#C5A059]"
              >
                <option value="relevance">Most Relevant First</option>
                <option value="name">Name (A-Z)</option>
                <option value="time">Cook Time (Quickest)</option>
                <option value="umami">Highest Umami</option>
                <option value="aroma">Aromatic Intensity</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Metadata Summary */}
        <div className="flex items-center justify-between text-xs text-[#F5F5F0]/60 mb-6">
          <span>
            Displaying <strong className="text-[#C5A059]">{totalResults}</strong> matching results
            {searchQuery ? (
              <span>
                {' for "'}
                <span className="text-[#F5F5F0] font-medium">{searchQuery}</span>
                {'"'}
              </span>
            ) : null}
            {totalResults > 0 && totalPages > 1 ? (
              <span className="ml-2 text-[#F5F5F0]/40">
                (Page {currentPage} of {totalPages})
              </span>
            ) : null}
          </span>
        </div>

        {/* Results Container: Grid vs List */}
        {totalResults > 0 ? (
          viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {paginatedResults.map((item) => {
                if (item.type === 'ingredient' && item.rawIngredient) {
                  return (
                    <div key={`ing-${item.id}`} className="flex flex-col">
                      <div className="mb-2 flex items-center justify-between">
                        <span className="px-2 py-0.5 rounded bg-[#C5A059]/15 border border-[#C5A059]/40 text-[#C5A059] text-[9px] font-mono tracking-widest uppercase font-semibold flex items-center space-x-1">
                          <Sparkles className="w-2.5 h-2.5" />
                          <span>SPECIMEN</span>
                        </span>
                        <span className="text-[10px] text-[#F5F5F0]/50 font-mono">
                          {item.rawIngredient.country}
                        </span>
                      </div>
                      <IngredientCard
                        ingredient={item.rawIngredient}
                        isSaved={savedIds.includes(item.rawIngredient.id)}
                        onToggleSave={onToggleSave}
                        onSelect={onSelectIngredient}
                      />
                    </div>
                  );
                } else if (item.type === 'recipe' && item.rawRecipe) {
                  return (
                    <div key={`rec-${item.id}`} className="flex flex-col">
                      <div className="mb-2 flex items-center justify-between">
                        <span className="px-2 py-0.5 rounded bg-amber-500/15 border border-amber-500/40 text-amber-400 text-[9px] font-mono tracking-widest uppercase font-semibold flex items-center space-x-1">
                          <ChefHat className="w-2.5 h-2.5" />
                          <span>RECIPE</span>
                        </span>
                        <span className="text-[10px] text-[#F5F5F0]/50 font-mono">
                          {item.rawRecipe.cuisine}
                        </span>
                      </div>
                      <RecipeCard
                        recipe={item.rawRecipe}
                        onCook={handleRecipeCook}
                        onSelect={handleRecipeSelect}
                      />
                    </div>
                  );
                }
                return null;
              })}
            </div>
          ) : (
            /* List View with Full Crawlable Links */
            <div className="space-y-3">
              {paginatedResults.map((item) => {
                const isIngredient = item.type === 'ingredient';
                const isRecipe = item.type === 'recipe';
                const rawIng = item.rawIngredient;
                const rawRec = item.rawRecipe;

                return (
                  <a
                    key={`${item.type}-${item.id}`}
                    href={item.url}
                    onClick={(e) => {
                      if (!e.metaKey && !e.ctrlKey && !e.shiftKey) {
                        e.preventDefault();
                        if (isIngredient && rawIng) {
                          onSelectIngredient(rawIng);
                        } else if (isRecipe && rawRec) {
                          handleRecipeSelect(rawRec);
                        }
                      }
                    }}
                    className="p-4 sm:p-5 bg-[#1E1E1E] border border-[#F5F5F0]/10 hover:border-[#C5A059]/50 rounded-2xl transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 cursor-pointer group block text-inherit no-underline shadow-md hover:shadow-xl"
                  >
                    <div className="flex items-center space-x-4">
                      {/* Image Thumbnail with Safe Fallbacks */}
                      <div className="w-20 h-20 shrink-0 bg-black/40 rounded-xl border border-white/5 overflow-hidden">
                        {isIngredient && rawIng ? (
                          <IngredientImage
                            ingredient={rawIng}
                            className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-300"
                          />
                        ) : isRecipe && rawRec ? (
                          <CulinaryImage
                            src={rawRec.heroImageUrl}
                            alt={rawRec.dishTitle}
                            cuisine={rawRec.cuisine}
                            className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-300"
                          />
                        ) : (
                          <div className="w-full h-full bg-[#252525] flex items-center justify-center text-[#C5A059]">
                            <Sparkles className="w-6 h-6" />
                          </div>
                        )}
                      </div>

                      {/* Content Metadata */}
                      <div>
                        <div className="flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-wider mb-1">
                          {/* Item Type Badge */}
                          {isIngredient ? (
                            <span className="px-2 py-0.5 rounded bg-[#C5A059]/15 border border-[#C5A059]/40 text-[#C5A059] font-mono font-bold flex items-center space-x-1">
                              <Sparkles className="w-2.5 h-2.5" />
                              <span>SPECIMEN</span>
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded bg-amber-500/15 border border-amber-500/40 text-amber-400 font-mono font-bold flex items-center space-x-1">
                              <ChefHat className="w-2.5 h-2.5" />
                              <span>RECIPE</span>
                            </span>
                          )}

                          <span className="text-[#C5A059] font-medium">{item.categoryOrCuisine}</span>
                          <span className="text-[#F5F5F0]/30">•</span>
                          <span className="text-[#F5F5F0]/60">{item.secondaryInfo}</span>

                          {isIngredient && rawIng && (
                            <>
                              <span className="text-[#F5F5F0]/30">•</span>
                              <SeasonalBadge ingredient={rawIng} size="sm" />
                            </>
                          )}
                        </div>

                        {/* Title */}
                        <h3 className="font-serif text-lg sm:text-xl text-[#F5F5F0] group-hover:text-[#C5A059] transition-colors leading-snug">
                          {item.title}
                        </h3>

                        {/* Subtitle */}
                        {item.subtitle && (
                          <p className="text-xs text-[#F5F5F0]/60 mt-0.5 line-clamp-1 font-sans">
                            {item.subtitle}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Right Action Buttons */}
                    <div className="flex items-center space-x-2.5 w-full sm:w-auto justify-between sm:justify-end">
                      {isIngredient && rawIng && (
                        <>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              shoppingListService.addIngredient(rawIng);
                            }}
                            className="p-2.5 bg-[#252525] hover:bg-[#C5A059] hover:text-[#121212] text-[#C5A059] rounded-xl border border-[#C5A059]/30 transition-all"
                            title="Add to shopping list"
                          >
                            <Plus className="w-4 h-4" />
                          </button>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onToggleSave(rawIng.id);
                            }}
                            className={`p-2.5 rounded-xl transition-all ${
                              savedIds.includes(rawIng.id)
                                ? 'bg-[#C5A059] text-[#121212]'
                                : 'bg-[#252525] text-[#F5F5F0]/70 hover:text-white'
                            }`}
                            title={savedIds.includes(rawIng.id) ? 'Saved in Cellar' : 'Save to Cellar'}
                          >
                            <Bookmark className="w-4 h-4 fill-current" />
                          </button>
                        </>
                      )}

                      {isRecipe && rawRec && (
                        <>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleRecipeBookmark(rawRec.id);
                            }}
                            className="p-2.5 bg-[#252525] text-[#F5F5F0]/70 hover:text-[#C5A059] rounded-xl border border-white/5 transition-all"
                            title="Bookmark recipe"
                          >
                            <Bookmark className="w-4 h-4" />
                          </button>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRecipeCook(rawRec);
                            }}
                            className="flex items-center space-x-1.5 px-3.5 py-2 bg-gradient-to-r from-[#D97706] to-[#B45309] hover:from-[#F59E0B] hover:to-[#D97706] text-white rounded-xl text-xs font-mono font-bold tracking-wider uppercase shadow-md transition-all"
                          >
                            <Play className="w-3 h-3 fill-white" />
                            <span>COOK</span>
                          </button>
                        </>
                      )}

                      <div className="p-2 text-[#C5A059] group-hover:translate-x-1 transition-transform">
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>
          )
        ) : (
          /* Zero Results State */
          <div className="p-12 text-center bg-[#181818] border border-[#F5F5F0]/10 rounded-2xl max-w-xl mx-auto my-8">
            <Search className="w-12 h-12 text-[#C5A059]/40 mx-auto mb-4" />
            <h3 className="font-serif text-2xl text-[#F5F5F0] mb-2">No Matching Results Found</h3>
            <p className="text-xs sm:text-sm text-[#F5F5F0]/60 mb-6 leading-relaxed">
              {searchQuery ? (
                <>
                  We could not find any botanical specimens or culinary masterclasses matching &quot;{searchQuery}&quot;.
                  Try checking your spelling or using broader terms like &quot;truffle&quot;, &quot;Japan&quot;, or &quot;pasta&quot;.
                </>
              ) : (
                <>There are no items matching the selected combination of filters.</>
              )}
            </p>
            <button
              onClick={handleResetFilters}
              className="inline-flex items-center space-x-2 px-6 py-3 bg-[#C5A059] text-[#121212] font-semibold text-xs uppercase tracking-widest rounded-xl hover:bg-[#d4b066] transition-all shadow-lg"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset All Filters</span>
            </button>
          </div>
        )}

        {/* Pagination Controls */}
        {totalResults > ITEMS_PER_PAGE && (
          <div className="mt-12 pt-6 border-t border-[#F5F5F0]/10 flex flex-wrap items-center justify-between gap-4">
            <div className="text-xs text-[#F5F5F0]/60 font-mono">
              Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1}–{Math.min(currentPage * ITEMS_PER_PAGE, totalResults)} of {totalResults} items
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => {
                  setCurrentPage((p) => Math.max(1, p - 1));
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                disabled={currentPage === 1}
                className="p-2 rounded-lg border border-[#F5F5F0]/15 bg-[#1A1A1A] text-xs disabled:opacity-30 hover:border-[#C5A059] hover:text-[#C5A059] transition-all"
                aria-label="Previous page"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {/* Page Number Chips */}
              <div className="flex items-center space-x-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  // Center active page window
                  let pageNum = i + 1;
                  if (totalPages > 5) {
                    if (currentPage > 3 && currentPage < totalPages - 2) {
                      pageNum = currentPage - 2 + i;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    }
                  }
                  return (
                    <button
                      key={pageNum}
                      onClick={() => {
                        setCurrentPage(pageNum);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className={`w-8 h-8 rounded-lg text-xs font-mono transition-all ${
                        currentPage === pageNum
                          ? 'bg-[#C5A059] text-[#121212] font-bold shadow'
                          : 'bg-[#1A1A1A] text-[#F5F5F0]/70 hover:bg-[#252525] border border-[#F5F5F0]/10'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() => {
                  setCurrentPage((p) => Math.min(totalPages, p + 1));
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg border border-[#F5F5F0]/15 bg-[#1A1A1A] text-xs disabled:opacity-30 hover:border-[#C5A059] hover:text-[#C5A059] transition-all"
                aria-label="Next page"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
