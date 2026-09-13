import React, { useState, useMemo, useEffect } from 'react';
import { Ingredient, IngredientCategory, WorldRegion, HarvestSeason } from '../types';
import { CATEGORIES_LIST, SEASONS_LIST, REGIONS_DATA, RARITY_LEVELS } from '../data/ingredients';
import { IngredientCard } from './IngredientCard';
import { TopPaginationControls } from './TopPaginationControls';
import { Search, SlidersHorizontal, X, ArrowUpDown, Grid, Sparkles, Filter, Flame, Compass, Award, Sun, Leaf, Calendar } from 'lucide-react';
import { motion } from 'motion/react';
import { getCurrentSeason, getCurrentMonthName, isIngredientInSeason } from '../utils/seasonality';
import { recipeService } from '../services/recipeService';
import { router } from '../services/router';

interface IngredientGridProps {
  ingredients: Ingredient[];
  savedIds: string[];
  onToggleSave: (id: string) => void;
  onSelectIngredient: (ingredient: Ingredient) => void;
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  selectedRegion: string;
  onSelectRegion: (region: string) => void;
  selectedSeason: string;
  onSelectSeason: (season: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const IngredientGrid: React.FC<IngredientGridProps> = ({
  ingredients,
  savedIds,
  onToggleSave,
  onSelectIngredient,
  selectedCategory,
  onSelectCategory,
  selectedRegion,
  onSelectRegion,
  selectedSeason,
  onSelectSeason,
  searchQuery,
  onSearchChange
}) => {
  const [selectedRarity, setSelectedRarity] = useState<string>('All Rarities');
  const [sortBy, setSortBy] = useState<'default' | 'name' | 'umami' | 'aroma' | 'region'>('default');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(12);

  const currentSeasonName = useMemo(() => getCurrentSeason(), []);
  const currentMonthName = useMemo(() => getCurrentMonthName(), []);

  const categoryRecipes = useMemo(() => {
    if (selectedCategory && selectedCategory !== 'All Categories') {
      return recipeService.getRecipesForCategory(selectedCategory, 3);
    }
    return [];
  }, [selectedCategory]);

  // Reset to page 1 whenever search, filter, or sorting changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, selectedRegion, selectedSeason, selectedRarity, searchQuery, sortBy]);

  // Filter and sort ingredients
  const filteredIngredients = useMemo(() => {
    return ingredients.filter((item) => {
      // Category filter
      if (selectedCategory !== 'All Categories' && item.category !== selectedCategory) {
        return false;
      }
      // Region filter
      if (selectedRegion !== 'All Terroirs' && item.region !== selectedRegion) {
        return false;
      }
      // Season filter (handles "In Season Now" as well as standard seasons)
      if (selectedSeason === 'In Season Now') {
        if (!isIngredientInSeason(item)) {
          return false;
        }
      } else if (selectedSeason !== 'All Seasons' && item.season !== selectedSeason) {
        return false;
      }
      // Rarity filter
      if (selectedRarity !== 'All Rarities' && item.rarityIndex !== selectedRarity) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(q);
        const matchesScientific = item.scientificName?.toLowerCase().includes(q);
        const matchesOrigin = item.origin.toLowerCase().includes(q);
        const matchesCountry = item.country.toLowerCase().includes(q);
        const matchesCategory = item.category.toLowerCase().includes(q);
        const matchesFlavor = item.flavorNotes.some((fn) => fn.toLowerCase().includes(q));
        const matchesDescription = item.description.toLowerCase().includes(q);
        const matchesPairings = item.pairings.some((p) => p.ingredient.toLowerCase().includes(q));

        if (!matchesName && !matchesScientific && !matchesOrigin && !matchesCountry && !matchesCategory && !matchesFlavor && !matchesDescription && !matchesPairings) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      }
      if (sortBy === 'umami') {
        return b.flavorProfile.umami - a.flavorProfile.umami;
      }
      if (sortBy === 'aroma') {
        return b.flavorProfile.aroma - a.flavorProfile.aroma;
      }
      if (sortBy === 'region') {
        return a.region.localeCompare(b.region);
      }
      return 0;
    });
  }, [ingredients, selectedCategory, selectedRegion, selectedSeason, selectedRarity, searchQuery, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filteredIngredients.length / itemsPerPage));

  // Slice for current page
  const paginatedIngredients = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredIngredients.slice(start, start + itemsPerPage);
  }, [filteredIngredients, currentPage, itemsPerPage]);

  const hasActiveFilters =
    selectedCategory !== 'All Categories' ||
    selectedRegion !== 'All Terroirs' ||
    selectedSeason !== 'All Seasons' ||
    selectedRarity !== 'All Rarities' ||
    searchQuery.trim().length > 0;

  const resetFilters = () => {
    onSelectCategory('All Categories');
    onSelectRegion('All Terroirs');
    onSelectSeason('All Seasons');
    setSelectedRarity('All Rarities');
    onSearchChange('');
    setCurrentPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    // Smooth scroll to top of collection
    const elem = document.getElementById('collection');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="collection" className="relative max-w-7xl mx-auto px-4 sm:px-8 lg:px-10 py-16 sm:py-24 bg-[#121212]">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-[#F5F5F0]/10">
        <div>
          <span className="text-[10px] uppercase tracking-[0.3em] opacity-60 text-[#C5A059] block mb-2 font-mono font-bold">
            The Living Archive • Gastronomy Collection
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#F5F5F0] tracking-tight">
            Curated Botanical & Luxury Ingredients
          </h2>
        </div>

        <div className="mt-4 md:mt-0 flex items-center space-x-4 text-xs">
          <span className="text-[11px] uppercase tracking-[0.2em] text-[#C5A059] font-mono font-bold bg-black/60 px-3 py-1 border border-[#C5A059]/40">
            {filteredIngredients.length} Specimen Catalogued
          </span>
          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="flex items-center space-x-1 px-3 py-1 text-[10px] uppercase tracking-widest text-[#C5A059] border border-[#C5A059]/40 rounded-full hover:bg-[#C5A059]/10 transition-colors"
            >
              <X className="w-3 h-3" />
              <span>Reset Filters</span>
            </button>
          )}
        </div>
      </div>

      {/* Filter and Control Bar */}
      <div className="bg-[#161616] border border-[#F5F5F0]/10 p-5 sm:p-6 mb-8 space-y-6 shadow-xl">
        {/* Search and Sort Toolbar */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
          {/* Search bar */}
          <div className="relative w-full md:max-w-md">
            <Search className="w-4 h-4 text-[#C5A059] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              id="ingredient-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search botanical names, flavor notes, origins, pairings..."
              className="w-full bg-[#121212] border border-[#F5F5F0]/15 text-[#F5F5F0] pl-10 pr-4 py-2.5 text-xs placeholder:text-[#F5F5F0]/30 focus:border-[#C5A059] focus:outline-none transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#F5F5F0]/40 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Quick Sort & Rarity Controls */}
          <div className="flex items-center space-x-3 w-full md:w-auto justify-end">
            <div className="flex items-center space-x-2 text-xs">
              <span className="text-[10px] uppercase tracking-[0.2em] opacity-40 hidden sm:inline">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-[#121212] border border-[#F5F5F0]/15 text-[#F5F5F0] text-[11px] uppercase tracking-wider px-3 py-2 focus:border-[#C5A059] outline-none cursor-pointer"
              >
                <option value="default">Curated (Hottest First)</option>
                <option value="name">Alphabetical (A-Z)</option>
                <option value="umami">Highest Umami Index</option>
                <option value="aroma">Aroma Intensity</option>
                <option value="region">Terroir / Region</option>
              </select>
            </div>

            <select
              value={selectedRarity}
              onChange={(e) => setSelectedRarity(e.target.value)}
              className="bg-[#121212] border border-[#F5F5F0]/15 text-[#F5F5F0] text-[11px] uppercase tracking-wider px-3 py-2 focus:border-[#C5A059] outline-none cursor-pointer"
            >
              <option value="All Rarities">All Reserves</option>
              {RARITY_LEVELS.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Category Filter Pills (Crawlable Semantic Links) */}
        <div>
          <div className="text-[10px] uppercase tracking-[0.2em] opacity-40 mb-2.5">
            Botanical & Culinary Classification
          </div>
          <div className="flex flex-wrap gap-2">
            <a
              href="/collection"
              onClick={(e) => {
                if (!e.metaKey && !e.ctrlKey) {
                  e.preventDefault();
                  onSelectCategory('All Categories');
                }
              }}
              className={`px-3.5 py-1.5 rounded-none text-[10px] uppercase tracking-wider transition-all no-underline ${
                selectedCategory === 'All Categories'
                  ? 'bg-[#C5A059] text-[#121212] font-bold border border-[#C5A059]'
                  : 'border border-[#F5F5F0]/20 text-[#F5F5F0] opacity-60 hover:opacity-100 hover:border-[#F5F5F0]/40'
              }`}
            >
              All Categories
            </a>
            {CATEGORIES_LIST.map((cat) => (
              <a
                key={cat}
                href={`/collection?category=${encodeURIComponent(cat)}`}
                onClick={(e) => {
                  if (!e.metaKey && !e.ctrlKey) {
                    e.preventDefault();
                    onSelectCategory(cat);
                  }
                }}
                className={`px-3.5 py-1.5 rounded-none text-[10px] uppercase tracking-wider transition-all no-underline ${
                  selectedCategory === cat
                    ? 'bg-[#C5A059] text-[#121212] font-bold border border-[#C5A059]'
                    : 'border border-[#F5F5F0]/20 text-[#F5F5F0] opacity-60 hover:opacity-100 hover:border-[#F5F5F0]/40'
                }`}
                title={`Filter collection by ${cat}`}
              >
                {cat}
              </a>
            ))}
          </div>
        </div>

        {/* Terroir & Season Sub-filters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-[#F5F5F0]/10">
          {/* Terroirs */}
          <div>
            <div className="text-[10px] uppercase tracking-[0.2em] opacity-40 mb-2">
              World Terroirs
            </div>
            <div className="flex flex-wrap gap-1.5">
              <button
                onClick={() => onSelectRegion('All Terroirs')}
                className={`px-3 py-1 text-[9px] uppercase tracking-widest transition-all ${
                  selectedRegion === 'All Terroirs'
                    ? 'bg-[#F5F5F0] text-[#121212] font-semibold'
                    : 'border border-[#F5F5F0]/15 text-[#F5F5F0] opacity-50 hover:opacity-90'
                }`}
              >
                All Terroirs
              </button>
              {REGIONS_DATA.map((reg) => (
                <button
                  key={reg.name}
                  onClick={() => onSelectRegion(reg.name)}
                  className={`px-3 py-1 text-[9px] uppercase tracking-widest transition-all ${
                    selectedRegion === reg.name
                      ? 'bg-[#F5F5F0] text-[#121212] font-semibold'
                      : 'border border-[#F5F5F0]/15 text-[#F5F5F0] opacity-50 hover:opacity-90'
                  }`}
                >
                  {reg.name}
                </button>
              ))}
            </div>
          </div>

          {/* Harvest Season */}
          <div>
            <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.2em] opacity-60 mb-2 font-mono">
              <span>Harvest Season</span>
              <span className="text-[#C5A059] flex items-center gap-1 font-semibold">
                <Sun className="w-3 h-3 text-emerald-400" />
                Current: {currentSeasonName} ({currentMonthName})
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              <button
                onClick={() => onSelectSeason('All Seasons')}
                className={`px-3 py-1 text-[9px] uppercase tracking-widest transition-all ${
                  selectedSeason === 'All Seasons'
                    ? 'bg-[#C5A059] text-[#121212] font-semibold'
                    : 'border border-[#F5F5F0]/15 text-[#F5F5F0] opacity-50 hover:opacity-90'
                }`}
              >
                All Seasons
              </button>

              {/* In Season Now Quick Filter */}
              <button
                onClick={() => onSelectSeason('In Season Now')}
                className={`px-3 py-1 text-[9px] uppercase tracking-widest transition-all flex items-center space-x-1.5 ${
                  selectedSeason === 'In Season Now'
                    ? 'bg-emerald-500 text-[#121212] font-bold border border-emerald-400 shadow-md shadow-emerald-950/50'
                    : 'border border-emerald-500/40 text-emerald-400 bg-emerald-950/20 hover:bg-emerald-950/50'
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>In Season Now</span>
              </button>

              {SEASONS_LIST.map((season) => (
                <button
                  key={season}
                  onClick={() => onSelectSeason(season)}
                  className={`px-3 py-1 text-[9px] uppercase tracking-widest transition-all ${
                    selectedSeason === season
                      ? 'bg-[#C5A059] text-[#121212] font-semibold'
                      : 'border border-[#F5F5F0]/15 text-[#F5F5F0] opacity-50 hover:opacity-90'
                  }`}
                >
                  {season}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* TOP PAGINATION CONTROLS - HIGH VISIBILITY AT THE TOP */}
      <TopPaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={filteredIngredients.length}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
        onItemsPerPageChange={(limit) => {
          setItemsPerPage(limit);
          setCurrentPage(1);
        }}
        position="top"
      />

      {/* Category Cross-Link Bridge to Masterclasses */}
      {selectedCategory !== 'All Categories' && categoryRecipes.length > 0 && (
        <div className="p-5 bg-gradient-to-r from-[#1E1E1E] to-[#161616] border border-[#C5A059]/30 mb-8 shadow-lg">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-white/10">
            <div className="flex items-center space-x-2.5">
              <Flame className="w-4 h-4 text-[#C5A059]" />
              <h3 className="font-serif text-base sm:text-lg text-white">
                Haute Cuisine Masterclasses Featuring {selectedCategory}
              </h3>
            </div>
            <a
              href="/recipes"
              onClick={(e) => {
                if (!e.metaKey && !e.ctrlKey) {
                  e.preventDefault();
                  router.navigate({ view: 'recipes-archive' });
                }
              }}
              className="text-xs uppercase tracking-widest text-[#C5A059] hover:underline flex items-center space-x-1 self-start sm:self-auto"
              title="Explore complete masterclass collection"
            >
              <span>All 1,000+ Recipes</span>
              <Sparkles className="w-3 h-3 ml-1" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {categoryRecipes.map((recipe) => {
              const recipeSlug = recipe.slug || recipe.id;
              return (
                <div
                  key={recipe.id}
                  className="bg-[#141414] border border-white/5 hover:border-[#C5A059]/40 p-3.5 flex flex-col justify-between transition-all"
                >
                  <div>
                    <div className="flex items-center justify-between text-[10px] text-[#C5A059] mb-1">
                      <span className="uppercase tracking-wider font-mono">{recipe.cuisine}</span>
                      <span className="text-[#F5F5F0]/50 font-mono">{recipe.overallDurationFormatted}</span>
                    </div>
                    <a
                      href={`/recipes/${recipeSlug}`}
                      onClick={(e) => {
                        if (!e.metaKey && !e.ctrlKey) {
                          e.preventDefault();
                          router.navigate({ view: 'recipe-detail', recipeSlug });
                        }
                      }}
                      className="font-serif text-sm sm:text-base text-white hover:text-[#C5A059] transition-colors line-clamp-1 block mb-1"
                      title={`View masterclass: ${recipe.dishTitle}`}
                    >
                      {recipe.dishTitle}
                    </a>
                    <p className="text-xs text-[#F5F5F0]/60 line-clamp-2 leading-relaxed">
                      {recipe.overview}
                    </p>
                  </div>
                  <div className="pt-3 mt-2 border-t border-white/5 flex items-center justify-between text-[11px]">
                    <a
                      href={`/recipes/${recipeSlug}`}
                      onClick={(e) => {
                        if (!e.metaKey && !e.ctrlKey) {
                          e.preventDefault();
                          router.navigate({ view: 'recipe-detail', recipeSlug });
                        }
                      }}
                      className="text-[#C5A059] hover:underline font-medium"
                      title={`Explore ${recipe.dishTitle} masterclass`}
                    >
                      Explore Recipe →
                    </a>
                    <span className="text-[10px] text-[#F5F5F0]/40 font-mono">{recipe.difficulty}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Grid of Ingredient Cards */}
      {filteredIngredients.length === 0 ? (
        <div className="py-20 text-center border border-dashed border-[#F5F5F0]/15 p-8 bg-[#161616]">
          <Filter className="w-8 h-8 text-[#C5A059] mx-auto mb-3 opacity-60" />
          <h3 className="font-serif text-2xl text-[#F5F5F0] mb-2">No matching specimen found</h3>
          <p className="text-xs text-[#F5F5F0]/60 max-w-md mx-auto mb-6">
            We couldn't find any ingredients matching your search query or filter criteria.
          </p>
          <button
            onClick={resetFilters}
            className="px-6 py-2.5 bg-[#C5A059] text-[#121212] text-xs uppercase tracking-[0.2em] font-semibold hover:bg-[#d6ba94] transition-colors"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="space-y-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {paginatedIngredients.map((item) => (
              <IngredientCard
                key={item.id}
                ingredient={item}
                isSaved={savedIds.includes(item.id)}
                onToggleSave={onToggleSave}
                onSelect={onSelectIngredient}
              />
            ))}
          </div>

          {/* BOTTOM PAGINATION CONTROLS */}
          {totalPages > 1 && (
            <TopPaginationControls
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={filteredIngredients.length}
              itemsPerPage={itemsPerPage}
              onPageChange={handlePageChange}
              position="bottom"
            />
          )}
        </div>
      )}
    </section>
  );
};

