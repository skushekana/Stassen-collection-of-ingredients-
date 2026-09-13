import React, { useState, useEffect, useMemo } from 'react';
import { Ingredient, WorldRegion } from '../types';
import { REGIONS_DATA } from '../data/ingredients';
import { setPageSeo } from '../utils/seo';
import { MapPin, Compass, ArrowRight, ArrowLeft, Layers, Globe, Calendar, Bookmark, Search } from 'lucide-react';
import { IngredientImage } from '../components/IngredientImage';

interface LocationsPageProps {
  ingredients: Ingredient[];
  savedIds: string[];
  onToggleSave: (id: string) => void;
  onSelectIngredient: (ingredient: Ingredient) => void;
  onNavigateToCollection: (regionFilter?: string) => void;
}

export const LocationsPage: React.FC<LocationsPageProps> = ({
  ingredients,
  savedIds,
  onToggleSave,
  onSelectIngredient,
  onNavigateToCollection
}) => {
  const [selectedRegionId, setSelectedRegionId] = useState<string>('all');
  const [localSearch, setLocalSearch] = useState<string>('');

  useEffect(() => {
    setPageSeo(
      "World Harvest Locations & Terroirs | Stassen's Culinary Archive",
      "Browse rare culinary botanicals, spices, and foraged ingredients grouped by geographic regions, indigenous climates, and world terroir origins."
    );
  }, []);

  // Filter regions based on selection or search
  const displayedRegions = useMemo(() => {
    if (selectedRegionId === 'all') {
      return REGIONS_DATA;
    }
    return REGIONS_DATA.filter((r) => r.id === selectedRegionId || r.name === selectedRegionId);
  }, [selectedRegionId]);

  return (
    <div id="locations-page" className="min-h-screen bg-[#121212] text-[#F5F5F0] pt-24 pb-20 px-4 sm:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Top Breadcrumb */}
        <div className="flex items-center justify-between gap-4 mb-8 pb-4 border-b border-[#F5F5F0]/10">
          <button
            onClick={() => onNavigateToCollection()}
            className="flex items-center space-x-1.5 text-xs uppercase tracking-widest text-[#F5F5F0]/60 hover:text-[#C5A059] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Collection</span>
          </button>
          <span className="text-[10px] uppercase tracking-widest text-[#C5A059] font-mono">
            {REGIONS_DATA.length} Global Terroir Zones
          </span>
        </div>

        {/* Header Title */}
        <div className="mb-10">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A059] font-medium block mb-2">
            Geographic Provenance & Indigenous Terroirs
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#F5F5F0] tracking-tight">
            World Harvest Locations
          </h1>
          <p className="text-xs sm:text-sm text-[#F5F5F0]/70 font-light mt-2 max-w-2xl leading-relaxed">
            Ingredients are living expressions of their microclimates, volcanic mineral strata, sub-polar ocean currents, and high-altitude diurnal sunlight. Browse the catalog grouped by origin.
          </p>
        </div>

        {/* Region Filter Selector Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          <button
            id="region-pill-all"
            onClick={() => setSelectedRegionId('all')}
            className={`px-4 py-2 text-xs uppercase tracking-wider rounded-none border transition-all shrink-0 font-medium ${
              selectedRegionId === 'all'
                ? 'bg-[#C5A059] text-[#121212] border-[#C5A059]'
                : 'bg-[#181818] border-[#F5F5F0]/15 text-[#F5F5F0]/70 hover:border-[#C5A059]/50 hover:text-white'
            }`}
          >
            All Regions ({ingredients.length})
          </button>

          {REGIONS_DATA.map((region) => {
            const count = ingredients.filter(
              (i) => i.region === region.id || i.region === region.name
            ).length;
            const isSelected = selectedRegionId === region.id || selectedRegionId === region.name;

            return (
              <button
                key={region.id}
                id={`region-pill-${region.id.toLowerCase().replace(/\s+/g, '-')}`}
                onClick={() => setSelectedRegionId(region.id)}
                className={`px-4 py-2 text-xs uppercase tracking-wider rounded-none border transition-all shrink-0 flex items-center space-x-2 font-medium ${
                  isSelected
                    ? 'bg-[#C5A059] text-[#121212] border-[#C5A059]'
                    : 'bg-[#181818] border-[#F5F5F0]/15 text-[#F5F5F0]/70 hover:border-[#C5A059]/50 hover:text-white'
                }`}
              >
                <span>{region.name}</span>
                <span className={`text-[10px] font-mono px-1.5 py-0.2 ${isSelected ? 'bg-black/30 text-[#121212]' : 'bg-black/40 text-[#C5A059]'}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Regions Grouped Grid */}
        <div className="space-y-16">
          {displayedRegions.map((region) => {
            const regionItems = ingredients.filter((i) => {
              const matchesRegion = i.region === region.id || i.region === region.name;
              if (!matchesRegion) return false;
              if (localSearch.trim()) {
                const q = localSearch.toLowerCase();
                return (
                  i.name.toLowerCase().includes(q) ||
                  i.origin.toLowerCase().includes(q) ||
                  i.country.toLowerCase().includes(q) ||
                  i.flavorNotes.some((n) => n.toLowerCase().includes(q))
                );
              }
              return true;
            });

            return (
              <section
                key={region.id}
                id={`location-section-${region.id.toLowerCase().replace(/\s+/g, '-')}`}
                className="bg-[#181818] border border-[#F5F5F0]/10 p-6 sm:p-8 lg:p-10 shadow-xl"
              >
                {/* Region Header Dossier */}
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-[#F5F5F0]/10 mb-8">
                  <div>
                    <div className="flex items-center space-x-2 text-xs text-[#C5A059] uppercase tracking-widest font-medium mb-1">
                      <Compass className="w-3.5 h-3.5" />
                      <span>{region.subtitle}</span>
                      <span className="text-[#F5F5F0]/30">•</span>
                      <span className="text-[#F5F5F0]/60 font-mono">{region.climate}</span>
                    </div>
                    <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#F5F5F0]">
                      {region.name}
                    </h2>
                    <p className="text-xs sm:text-sm text-[#F5F5F0]/70 font-light mt-2 max-w-3xl leading-relaxed">
                      {region.description}
                    </p>
                  </div>

                  <div className="flex items-center space-x-3 shrink-0">
                    <button
                      onClick={() => onNavigateToCollection(region.name)}
                      className="px-4 py-2.5 bg-[#222] hover:bg-[#C5A059] hover:text-[#121212] text-xs uppercase tracking-wider text-[#F5F5F0] border border-[#F5F5F0]/15 transition-all flex items-center space-x-2 font-medium"
                    >
                      <span>Explore {regionItems.length} in Catalog</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Region Ingredients Grid */}
                {regionItems.length === 0 ? (
                  <div className="py-12 text-center text-xs text-[#F5F5F0]/50 font-light">
                    No ingredients recorded matching the current filter in this region.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                    {regionItems.map((item) => {
                      const isSaved = savedIds.includes(item.id);
                      return (
                        <div
                          key={item.id}
                          id={`location-card-${item.id}`}
                          onClick={() => onSelectIngredient(item)}
                          className="group bg-[#202020] border border-[#F5F5F0]/10 hover:border-[#C5A059]/50 transition-all duration-300 overflow-hidden cursor-pointer flex flex-col justify-between shadow-lg"
                        >
                          {/* Image Box */}
                          <div className="relative aspect-[16/10] overflow-hidden bg-[#282828]">
                            <IngredientImage
                              ingredient={item}
                              alt={item.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#202020] via-transparent to-black/20" />
                            <div className="absolute top-2 left-2 px-2 py-0.5 bg-black/80 text-[9px] uppercase tracking-wider text-[#C5A059] border border-[#C5A059]/30">
                              {item.category}
                            </div>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                onToggleSave(item.id);
                              }}
                              className={`absolute top-2 right-2 p-1.5 rounded-full transition-all ${
                                isSaved
                                  ? 'bg-[#C5A059] text-[#121212]'
                                  : 'bg-black/60 text-[#F5F5F0]/70 hover:text-white'
                              }`}
                              title={isSaved ? 'In Cellar' : 'Save to Cellar'}
                            >
                              <Bookmark className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          {/* Details */}
                          <div className="p-4 flex-1 flex flex-col justify-between">
                            <div>
                              <div className="flex items-center space-x-1.5 text-[10px] text-[#C5A059] mb-1">
                                <MapPin className="w-3 h-3 shrink-0" />
                                <span className="truncate">{item.origin}, {item.country}</span>
                              </div>
                              <h3 className="font-serif text-base sm:text-lg text-[#F5F5F0] group-hover:text-[#C5A059] transition-colors line-clamp-1 mb-1">
                                {item.name}
                              </h3>
                              {item.scientificName && (
                                <p className="font-serif italic text-[11px] text-[#F5F5F0]/50 mb-2 truncate">
                                  {item.scientificName}
                                </p>
                              )}
                              <p className="text-xs text-[#F5F5F0]/70 font-light line-clamp-2 mb-3">
                                {item.description}
                              </p>
                            </div>

                            {/* Flavor Pills & Season */}
                            <div className="pt-3 border-t border-[#F5F5F0]/10 flex items-center justify-between text-[10px]">
                              <span className="text-[#F5F5F0]/60 flex items-center space-x-1">
                                <Calendar className="w-3 h-3 text-[#C5A059]" />
                                <span>{item.season}</span>
                              </span>
                              <span className="text-[#C5A059] font-medium flex items-center space-x-1 group-hover:translate-x-0.5 transition-transform">
                                <span>Dossier</span>
                                <ArrowRight className="w-3 h-3" />
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
};
