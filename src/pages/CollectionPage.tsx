import React, { useEffect } from 'react';
import { Ingredient } from '../types';
import { IngredientGrid } from '../components/IngredientGrid';
import { setPageSeo } from '../utils/seo';
import { Layers, Sparkles, Filter } from 'lucide-react';

interface CollectionPageProps {
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

export const CollectionPage: React.FC<CollectionPageProps> = ({
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
  useEffect(() => {
    setPageSeo(
      "Ingredient Collection & Catalog | Stassen's Culinary Archive",
      "Search, filter, and discover the complete catalog of rare spices, foraged botanicals, heritage salts, and wild aromatics from around the globe."
    );
  }, []);

  return (
    <div id="collection-page" className="min-h-screen bg-[#121212] text-[#F5F5F0] pt-24 pb-20">
      {/* Dedicated Collection Page Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 mb-8">
        <div className="border-b border-[#F5F5F0]/10 pb-8">
          <div className="flex items-center space-x-2 text-[10px] uppercase tracking-[0.3em] text-[#C5A059] font-medium mb-2">
            <Layers className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>Living Gastronomic Matrix</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#F5F5F0] tracking-tight">
                The Complete Ingredient Collection
              </h1>
              <p className="text-xs sm:text-sm text-[#F5F5F0]/70 font-light mt-2 max-w-2xl leading-relaxed">
                Filter and browse all {ingredients.length} documented specimens by culinary category, indigenous world terroir, harvest season, or volatile sensory flavor notes.
              </p>
            </div>
            <div className="flex items-center space-x-3 text-xs text-[#F5F5F0]/60 font-mono">
              <span className="px-3 py-1.5 bg-[#181818] border border-[#F5F5F0]/15 text-[#C5A059]">
                {ingredients.length} Specimens Cataloged
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Full Interactive Searchable & Filterable Grid */}
      <IngredientGrid
        ingredients={ingredients}
        savedIds={savedIds}
        onToggleSave={onToggleSave}
        onSelectIngredient={onSelectIngredient}
        selectedCategory={selectedCategory}
        onSelectCategory={onSelectCategory}
        selectedRegion={selectedRegion}
        onSelectRegion={onSelectRegion}
        selectedSeason={selectedSeason}
        onSelectSeason={onSelectSeason}
        searchQuery={searchQuery}
        onSearchChange={onSearchChange}
      />
    </div>
  );
};
