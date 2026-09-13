import React, { useEffect } from 'react';
import { Ingredient, CulinaryMasterclass } from '../types';
import { HeroSection } from '../components/HeroSection';
import { RecipeAtelierSection } from '../components/RecipeAtelierSection';
import { REGIONS_DATA } from '../data/ingredients';
import { setPageSeo } from '../utils/seo';
import { Compass, Sparkles, Layers, ArrowRight, Bookmark, Flame, MapPin, Calendar, ShoppingBag, ChefHat, HelpCircle } from 'lucide-react';
import { IngredientImage } from '../components/IngredientImage';

interface HomePageProps {
  ingredients: Ingredient[];
  savedIds: string[];
  onToggleSave: (id: string) => void;
  onSelectIngredient: (ingredient: Ingredient) => void;
  onNavigateToCollection: () => void;
  onNavigateToLocations: () => void;
  onNavigate?: (section: string) => void;
  onOpenGuide?: () => void;
  onCookRecipe?: (recipe: CulinaryMasterclass) => void;
  onOpenRecipeDetails?: (recipe: CulinaryMasterclass) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  ingredients,
  savedIds,
  onToggleSave,
  onSelectIngredient,
  onNavigateToCollection,
  onNavigateToLocations,
  onNavigate,
  onOpenGuide,
  onCookRecipe,
  onOpenRecipeDetails
}) => {
  useEffect(() => {
    setPageSeo(
      "Stassen's Collection of Ingredients | Rare & Foraged Culinary Archive",
      "Discover rare botanical cultivars, wild foraged fungi, ancient ferments, and exquisite culinary terroir from around the globe. A living gastronomic archive."
    );
  }, []);

  const handleNav = (sec: string) => {
    if (onNavigate) {
      onNavigate(sec);
    } else if (sec === 'collection') {
      onNavigateToCollection();
    } else if (sec === 'locations') {
      onNavigateToLocations();
    }
  };

  // Featured spotlight ingredient (e.g. Kyoto Matsutake or first item)
  const featuredIngredient = ingredients.find((i) => i.id === 'matsutake-nagano') || ingredients[0];
  const isFeaturedSaved = featuredIngredient ? savedIds.includes(featuredIngredient.id) : false;

  return (
    <div id="home-page" className="w-full">
      {/* 1. Hero Section with Site Intro & Exploration Trigger */}
      <HeroSection
        onExploreClick={onNavigateToCollection}
        totalIngredients={ingredients.length}
        totalRegions={REGIONS_DATA.length}
        ingredients={ingredients}
        onSelectIngredient={onSelectIngredient}
        savedIds={savedIds}
        onToggleSave={onToggleSave}
      />

      {/* 2. Primary Featured Ingredient Spotlight */}
      {featuredIngredient && (
        <section id="home-featured-spotlight" className="py-16 sm:py-24 px-4 sm:px-8 lg:px-12 bg-gradient-to-b from-[#121212] via-[#171717] to-[#121212] border-t border-[#F5F5F0]/10">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#F5F5F0]/10">
              <div>
                <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A059] font-medium block mb-1">
                  Curator's Spotlight Specimen
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#F5F5F0] tracking-tight">
                  Featured Terroir Ingredient
                </h2>
              </div>
              <button
                onClick={onNavigateToCollection}
                className="hidden sm:flex items-center space-x-2 text-xs uppercase tracking-widest text-[#C5A059] hover:text-[#e0ba6c] transition-colors"
              >
                <span>View All {ingredients.length} In Collection</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="bg-[#181818] border border-[#F5F5F0]/10 grid grid-cols-1 lg:grid-cols-12 overflow-hidden shadow-2xl">
              {/* Left Column: Image with aspect ratio */}
              <div className="lg:col-span-5 relative aspect-square lg:aspect-auto min-h-[300px] sm:min-h-[400px] overflow-hidden group">
                <IngredientImage
                  ingredient={featuredIngredient}
                  alt={`${featuredIngredient.name} — Curated Specimen Spotlight (${featuredIngredient.category})`}
                  priority={true}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-transparent to-black/20" />
                <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md px-3 py-1 text-[10px] uppercase tracking-widest text-[#C5A059] border border-[#C5A059]/30">
                  {featuredIngredient.rarityIndex}
                </div>
              </div>

              {/* Right Column: Specimen Details & CTAs */}
              <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[11px] uppercase tracking-[0.2em] text-[#F5F5F0]/60">
                      {featuredIngredient.category}
                    </span>
                    <button
                      onClick={() => onToggleSave(featuredIngredient.id)}
                      className={`p-2 rounded-full border transition-all ${
                        isFeaturedSaved
                          ? 'border-[#C5A059] bg-[#C5A059] text-[#121212]'
                          : 'border-[#F5F5F0]/20 bg-black/40 text-[#F5F5F0]/70 hover:text-[#C5A059] hover:border-[#C5A059]'
                      }`}
                      title={isFeaturedSaved ? 'Saved in Cellar' : 'Save to Cellar'}
                    >
                      <Bookmark className="w-4 h-4" />
                    </button>
                  </div>

                  <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#F5F5F0] mb-1">
                    {featuredIngredient.name}
                  </h3>
                  {featuredIngredient.scientificName && (
                    <p className="font-serif italic text-xs sm:text-sm text-[#C5A059] mb-4">
                      {featuredIngredient.scientificName}
                    </p>
                  )}

                  <p className="text-xs sm:text-sm text-[#F5F5F0]/80 font-light leading-relaxed mb-6">
                    {featuredIngredient.description}
                  </p>

                  <div className="grid grid-cols-2 gap-4 py-4 border-y border-[#F5F5F0]/10 mb-6 text-xs text-[#F5F5F0]/70">
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-[#C5A059] shrink-0" />
                      <span className="truncate"><strong>Origin:</strong> {featuredIngredient.origin}, {featuredIngredient.country}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-[#C5A059] shrink-0" />
                      <span className="truncate"><strong>Season:</strong> {featuredIngredient.season} ({featuredIngredient.harvestWindow})</span>
                    </div>
                  </div>

                  {/* Flavor Notes Pills */}
                  <div className="mb-6">
                    <span className="text-[10px] uppercase tracking-wider text-[#F5F5F0]/50 block mb-2">
                      Primary Volatile Flavor Notes:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {featuredIngredient.flavorNotes.map((note, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 text-[11px] bg-[#222] border border-[#F5F5F0]/10 text-[#F5F5F0]/90"
                        >
                          {note}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Direct Navigation Action Buttons */}
                <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-[#F5F5F0]/10">
                  <button
                    id="home-view-ingredient-btn"
                    onClick={() => onSelectIngredient(featuredIngredient)}
                    className="px-6 py-3 bg-[#C5A059] text-[#121212] hover:bg-[#d8b368] text-xs uppercase tracking-widest font-semibold transition-all flex items-center space-x-2"
                  >
                    <span>View Ingredient Dossier</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    id="home-explore-collection-btn"
                    onClick={onNavigateToCollection}
                    className="px-6 py-3 bg-[#242424] hover:bg-[#303030] text-[#F5F5F0] text-xs uppercase tracking-widest font-medium border border-[#F5F5F0]/15 transition-all"
                  >
                    Browse Full Collection
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 3. Embedded Haute Gastronomy Recipe Vault & Interactive Atelier */}
      {onCookRecipe && (
        <RecipeAtelierSection
          onCookRecipe={onCookRecipe}
          onOpenRecipeDetails={onOpenRecipeDetails}
          onNavigateToArchive={() => handleNav('recipes-archive')}
        />
      )}

      {/* 4. Comprehensive Portal & Page Directory Cards */}
      <section className="py-16 px-4 sm:px-8 lg:px-12 max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A059] font-medium block mb-2">
            Interactive Gastronomy Suite
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#F5F5F0]">
            Explore All Archive Sections
          </h2>
          <p className="text-xs text-[#F5F5F0]/60 mt-2">
            Access rare botanical dossiers, cook over 1,000+ Michelin-caliber recipes with step photography, or tour harvest micro-climates.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1: 19+ Botanical Collection */}
          <div
            id="home-card-collection"
            onClick={() => handleNav('collection')}
            className="p-6 bg-[#181818] border border-[#F5F5F0]/10 hover:border-[#C5A059]/50 transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <Layers className="w-6 h-6 text-[#C5A059] group-hover:scale-110 transition-transform" />
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 bg-[#222] text-[#C5A059] border border-white/5">
                  19+ Specimen Cards
                </span>
              </div>
              <h3 className="font-serif text-xl text-[#F5F5F0] mb-2 group-hover:text-[#C5A059] transition-colors">
                Botanical Specimen Vault
              </h3>
              <p className="text-xs text-[#F5F5F0]/70 font-light leading-relaxed mb-4">
                Explore rare foraged fungi, ancient ferments, heirloom alliums, and culinary botanicals with interactive flavor radar charts.
              </p>
            </div>
            <span className="text-[11px] uppercase tracking-widest text-[#C5A059] font-medium flex items-center space-x-1 pt-3 border-t border-white/5">
              <span>Open Collection</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </span>
          </div>

          {/* Card 2: 1,000+ Recipes Matrix */}
          <div
            id="home-card-recipes"
            onClick={() => handleNav('recipes-archive')}
            className="p-6 bg-[#181818] border border-[#C5A059]/30 hover:border-[#C5A059] transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <ChefHat className="w-6 h-6 text-amber-400 group-hover:scale-110 transition-transform" />
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 bg-amber-950/80 text-amber-300 border border-amber-500/30">
                  1,000+ Recipes
                </span>
              </div>
              <h3 className="font-serif text-xl text-[#F5F5F0] mb-2 group-hover:text-[#C5A059] transition-colors">
                1,000+ Haute Recipes Matrix
              </h3>
              <p className="text-xs text-[#F5F5F0]/70 font-light leading-relaxed mb-4">
                Cook through over a thousand chef-calibrated recipes featuring visible step-by-step photography, thermal control alerts, and wine pairings.
              </p>
            </div>
            <span className="text-[11px] uppercase tracking-widest text-amber-400 font-medium flex items-center space-x-1 pt-3 border-t border-white/5">
              <span>Browse 1,000+ Recipes</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </span>
          </div>

          {/* Card 3: 7 Terroirs */}
          <div
            id="home-card-locations"
            onClick={() => handleNav('locations')}
            className="p-6 bg-[#181818] border border-[#F5F5F0]/10 hover:border-[#C5A059]/50 transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <Compass className="w-6 h-6 text-blue-400 group-hover:scale-110 transition-transform" />
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 bg-[#222] text-blue-300 border border-white/5">
                  7 Global Terroirs
                </span>
              </div>
              <h3 className="font-serif text-xl text-[#F5F5F0] mb-2 group-hover:text-[#C5A059] transition-colors">
                Global Terroirs & Origins
              </h3>
              <p className="text-xs text-[#F5F5F0]/70 font-light leading-relaxed mb-4">
                Trace specimens by regional soil chemistry, elevation, and climate from Kyoto to Sicily and Oaxaca.
              </p>
            </div>
            <span className="text-[11px] uppercase tracking-widest text-blue-400 font-medium flex items-center space-x-1 pt-3 border-t border-white/5">
              <span>Explore Locations</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </span>
          </div>

          {/* Card 4: Seasonal Harvest Calendar */}
          <div
            id="home-card-calendar"
            onClick={() => handleNav('seasonal-calendar')}
            className="p-6 bg-[#181818] border border-[#F5F5F0]/10 hover:border-[#C5A059]/50 transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <Calendar className="w-6 h-6 text-rose-400 group-hover:scale-110 transition-transform" />
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 bg-[#222] text-rose-300 border border-white/5">
                  12-Month Calendar
                </span>
              </div>
              <h3 className="font-serif text-xl text-[#F5F5F0] mb-2 group-hover:text-[#C5A059] transition-colors">
                Seasonal Harvest Calendar
              </h3>
              <p className="text-xs text-[#F5F5F0]/70 font-light leading-relaxed mb-4">
                Find out which rare wild ingredients and botanicals are currently in peak season right now across the Northern and Southern hemispheres.
              </p>
            </div>
            <span className="text-[11px] uppercase tracking-widest text-rose-400 font-medium flex items-center space-x-1 pt-3 border-t border-white/5">
              <span>View Harvest Cycle</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </span>
          </div>

          {/* Card 5: Provisions Shopping List */}
          <div
            id="home-card-shopping"
            onClick={() => handleNav('shopping-list')}
            className="p-6 bg-[#181818] border border-[#F5F5F0]/10 hover:border-[#C5A059]/50 transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <ShoppingBag className="w-6 h-6 text-emerald-400 group-hover:scale-110 transition-transform" />
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 bg-[#222] text-emerald-300 border border-white/5">
                  Interactive Cart
                </span>
              </div>
              <h3 className="font-serif text-xl text-[#F5F5F0] mb-2 group-hover:text-[#C5A059] transition-colors">
                Provisions Shopping List
              </h3>
              <p className="text-xs text-[#F5F5F0]/70 font-light leading-relaxed mb-4">
                Add culinary ingredients and masterclass recipe components directly to an exportable, checkable shopping list.
              </p>
            </div>
            <span className="text-[11px] uppercase tracking-widest text-emerald-400 font-medium flex items-center space-x-1 pt-3 border-t border-white/5">
              <span>Manage Provisions</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </span>
          </div>

          {/* Card 6: User Guide & Tour */}
          <div
            id="home-card-guide"
            onClick={() => {
              if (onOpenGuide) onOpenGuide();
            }}
            className="p-6 bg-[#181818] border border-[#C5A059]/40 hover:border-[#C5A059] transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <HelpCircle className="w-6 h-6 text-[#C5A059] group-hover:scale-110 transition-transform" />
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 bg-[#C5A059]/20 text-[#C5A059] border border-[#C5A059]/40">
                  New Visitor Tour
                </span>
              </div>
              <h3 className="font-serif text-xl text-[#F5F5F0] mb-2 group-hover:text-[#C5A059] transition-colors">
                Site Guide & Directory
              </h3>
              <p className="text-xs text-[#F5F5F0]/70 font-light leading-relaxed mb-4">
                Learn how to search botanicals, use the culinary masterclass cook timer, customize portions, and access every page easily.
              </p>
            </div>
            <span className="text-[11px] uppercase tracking-widest text-[#C5A059] font-medium flex items-center space-x-1 pt-3 border-t border-white/5">
              <span>Launch Guide Tour</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </span>
          </div>
        </div>
      </section>
    </div>
  );
};
