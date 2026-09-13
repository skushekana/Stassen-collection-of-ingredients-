import React, { useState } from 'react';
import {
  Sparkles,
  Bookmark,
  Eye,
  ChevronLeft,
  ChevronRight,
  ArrowDown,
  Check,
  Camera,
  Maximize2
} from 'lucide-react';
import { Ingredient } from '../types';
import { IngredientImage } from './IngredientImage';

interface HeroSectionProps {
  onExploreClick: () => void;
  totalIngredients: number;
  totalRegions: number;
  ingredients: Ingredient[];
  onSelectIngredient: (ingredient: Ingredient) => void;
  savedIds: string[];
  onToggleSave: (id: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreClick,
  totalIngredients,
  totalRegions,
  ingredients,
  onSelectIngredient,
  savedIds,
  onToggleSave
}) => {
  // Highlighted Featured Specimens
  const featuredIds = ['truffle-alba', 'matsutake-nagano', 'saffron-kozani', 'aceto-modena', 'kombu-rishiri'];

  const featuredList = featuredIds
    .map((id) => ingredients.find((i) => i.id === id))
    .filter(Boolean) as Ingredient[];

  // Fallback if not loaded
  const fallbackItem: Ingredient = {
    id: 'truffle-alba',
    name: 'Alba White Winter Truffle',
    scientificName: 'Tuber magnatum pico',
    category: 'Wild Fungi & Truffles',
    origin: 'Langhe & Roero Hills, Piedmont',
    country: 'Italy',
    region: 'Mediterranean & Southern Europe',
    season: 'Autumn',
    harvestWindow: 'October through December',
    flavorNotes: ['Wild Garlic', 'Sweet Methane', 'Wet Oak Leaf', 'Matured Camembert', 'Hazelnut Skin'],
    flavorProfile: {
      umami: 96,
      aroma: 100,
      acidity: 10,
      sweetness: 20,
      bitterness: 15,
      pungency: 60,
      depth: 98
    },
    imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1200&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1200&auto=format&fit=crop'
    ],
    description: 'Harvested in the Piedmont region during the misty autumn nights. Prized for its volatile bis(methylthio)methane aromatics and intoxicating earthy depth.',
    terroir: 'Calcareous marl soils under ancient oak and hazel canopies in the Tanaro river valley.',
    culinaryApplications: ['Shaved raw over 30-yolk tajarin pasta', 'Folded into fonduta with fontina val d’aosta'],
    pairings: [{ ingredient: 'Egg Yolk Tajarin', harmony: 'Lipid Binding', note: 'Warm fat extracts volatile sulfur aromatics.' }],
    relatedIngredientIds: ['aceto-modena', 'saffron-kozani'],
    rarityIndex: 'Ultra Rare Reserve',
    storageAdvice: 'Wrap in breathable rice paper, store in cold cellar at 4°C.',
    curatorNotes: 'Nocturnal foraging exclusively with trained Lagotto Romagnolo hounds.'
  };

  const activeFeatured = featuredList.length > 0 ? featuredList : [fallbackItem];

  const [activeIndex, setActiveIndex] = useState(0);
  const currentItem = activeFeatured[activeIndex] || fallbackItem;

  const isCurrentSaved = savedIds.includes(currentItem.id);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % activeFeatured.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + activeFeatured.length) % activeFeatured.length);
  };

  return (
    <section
      id="hero-section"
      className="relative min-h-screen w-full bg-[#121212] flex flex-col justify-between pt-20 sm:pt-24 pb-12 border-b border-[#F5F5F0]/10 overflow-hidden"
    >
      {/* Left side vertical spine rail from Design screenshot */}
      <div className="hidden md:flex absolute left-0 top-20 bottom-0 w-12 sm:w-16 border-r border-[#F5F5F0]/10 flex-col items-center justify-center z-20 pointer-events-none select-none">
        <span className="rotate-[-90deg] whitespace-nowrap text-[9px] tracking-[0.45em] uppercase opacity-40 origin-center text-[#F5F5F0]">
          CURATED BY HUMAN EDITORS
        </span>
      </div>

      {/* Right side vertical spine rail */}
      <div className="hidden md:flex absolute right-0 top-20 bottom-0 w-12 sm:w-16 border-l border-[#F5F5F0]/10 flex-col items-center justify-center z-20 pointer-events-none select-none">
        <span className="rotate-[90deg] whitespace-nowrap text-[9px] tracking-[0.45em] uppercase opacity-40 origin-center text-[#C5A059]">
          CURATED BOTANICAL ARCHIVE
        </span>
      </div>

      {/* Main Container */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-10 md:px-20 lg:px-24 flex-1 flex flex-col justify-center">
        {/* Top Editorial Eyebrow Strip */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-[#F5F5F0]/10">
          <div className="flex items-center space-x-3">
            <span className="w-2 h-2 rounded-full bg-[#C5A059] animate-pulse" />
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A059] font-bold">
              Archive No. 042 • Terroir Specimen Spotlight
            </span>
          </div>

          <div className="flex items-center space-x-4 text-[10px] uppercase tracking-widest text-[#F5F5F0]/50">
            <span>{totalIngredients} Curated Entries</span>
            <span>•</span>
            <span>{totalRegions} Terroir Regions</span>
            <span>•</span>
            <span className="text-[#C5A059] font-semibold flex items-center space-x-1">
              <Camera className="w-3 h-3" />
              <span>AI Terroir Imagery</span>
            </span>
          </div>
        </div>

        {/* Central Master Spotlight Frame (With Still Image + Hover Zoom & Shimmer) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center bg-[#161616] border border-[#F5F5F0]/15 p-4 sm:p-8 shadow-2xl relative">
          {/* Left Column: GENERATED STILL IMAGE WITH HOVER ZOOM & SHIMMER */}
          <div
            onClick={() => onSelectIngredient(currentItem)}
            className="lg:col-span-7 relative group overflow-hidden bg-[#0A0A0A] border border-[#F5F5F0]/10 aspect-[16/10] sm:aspect-[16/9] cursor-pointer"
          >
            {/* Generated Still Image with Smooth Hover Zoom */}
            <div className="w-full h-full transform transition-transform duration-700 ease-out group-hover:scale-105">
              <IngredientImage
                key={currentItem.id}
                ingredient={currentItem}
                alt={`${currentItem.name} — Curated ${currentItem.category} specimen from ${currentItem.origin || 'sustainable terroir'}`}
                priority={true}
                className="w-full h-full object-cover filter brightness-[0.95] contrast-[1.05]"
              />
            </div>

            {/* Subtle Gradient Scrim on Image */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

            {/* Shimmer Light Sweep on Hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />

            {/* Top Status Badges */}
            <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
              <div className="flex items-center space-x-2 px-2.5 py-1 bg-black/70 backdrop-blur-md border border-[#F5F5F0]/20 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059] animate-pulse" />
                <span className="text-[9px] uppercase tracking-wider text-[#F5F5F0] font-mono">
                  TERROIR SPECIMEN
                </span>
              </div>

              <div className="px-2.5 py-1 bg-black/70 backdrop-blur-md border border-[#C5A059]/40 text-[#C5A059] text-[9px] uppercase tracking-widest font-mono">
                {currentItem.origin.split(',')[0]}
              </div>
            </div>

            {/* Bottom Caption Strip */}
            <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/90 to-transparent flex items-center justify-between">
              <div className="flex items-center space-x-2 text-[10px] text-[#F5F5F0]/80 font-mono">
                <span>{currentItem.name}</span>
                <span>•</span>
                <span>{currentItem.season} Peak</span>
              </div>

              <div className="flex items-center space-x-1 text-[10px] text-[#C5A059] font-semibold uppercase tracking-wider group-hover:translate-x-1 transition-transform">
                <span>Examine</span>
                <Maximize2 className="w-3 h-3 ml-1" />
              </div>
            </div>
          </div>

          {/* Right Column: FEATURED INGREDIENT EDITORIAL DOSSIER */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div>
              {/* Featured Eyebrow */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A059] font-bold">
                  FEATURED INGREDIENT
                </span>
                <span className="text-[9px] uppercase tracking-wider px-2 py-0.5 bg-[#C5A059]/10 text-[#C5A059] border border-[#C5A059]/30">
                  {currentItem.category}
                </span>
              </div>

              {/* Scientific Name & Title */}
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#F5F5F0] tracking-tight leading-[1.08]">
                {currentItem.scientificName || currentItem.name}
              </h2>

              <span className="font-serif italic text-xl sm:text-2xl text-[#F5F5F0]/60 block mt-1 mb-4">
                {currentItem.name}
              </span>

              {/* Editorial Description */}
              <p className="text-xs sm:text-sm text-[#F5F5F0]/80 font-light leading-relaxed mb-6">
                {currentItem.description}
              </p>

              {/* Terroir & Origin Tag */}
              <div className="p-3 bg-[#1A1A1A] border border-[#F5F5F0]/10 mb-6 space-y-1">
                <div className="text-[9px] uppercase tracking-widest text-[#C5A059] font-semibold">
                  Terroir & Harvest Window
                </div>
                <div className="text-xs text-[#F5F5F0]">
                  {currentItem.origin} ({currentItem.country}) • {currentItem.harvestWindow || currentItem.season}
                </div>
              </div>

              {/* Flavor Profile Tags */}
              <div className="flex flex-wrap gap-1.5 mb-6">
                {currentItem.flavorNotes.slice(0, 4).map((note, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 bg-[#1E1E1E] border border-[#F5F5F0]/10 text-[10px] uppercase tracking-wider text-[#F5F5F0]/70"
                  >
                    {note}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons & Specimen Cycler */}
            <div className="space-y-4 pt-4 border-t border-[#F5F5F0]/10">
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <button
                  onClick={() => onSelectIngredient(currentItem)}
                  className="w-full sm:w-auto flex-1 flex items-center justify-center space-x-2 px-6 py-3.5 bg-[#C5A059] text-[#121212] text-xs uppercase tracking-[0.2em] font-semibold hover:bg-[#d6ba94] transition-all shadow-xl"
                >
                  <Eye className="w-4 h-4" />
                  <span>Examine Specimen Archive</span>
                </button>

                <button
                  onClick={() => onToggleSave(currentItem.id)}
                  className={`w-full sm:w-auto px-4 py-3.5 border transition-all text-xs uppercase tracking-wider flex items-center justify-center space-x-2 ${
                    isCurrentSaved
                      ? 'bg-[#C5A059]/20 border-[#C5A059] text-[#C5A059]'
                      : 'border-[#F5F5F0]/20 bg-[#1A1A1A] text-[#F5F5F0] hover:border-[#C5A059]'
                  }`}
                  title={isCurrentSaved ? 'Saved in Cellar' : 'Save to Cellar'}
                >
                  {isCurrentSaved ? <Check className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                  <span>{isCurrentSaved ? 'In Cellar' : 'Save'}</span>
                </button>
              </div>

              {/* Featured Specimen Carousel Switcher */}
              <div className="flex items-center justify-between pt-2 text-xs">
                <div className="flex items-center space-x-2">
                  <span className="text-[10px] uppercase tracking-wider opacity-40">
                    Curated Spotlights:
                  </span>
                  <div className="flex items-center space-x-1.5">
                    {activeFeatured.map((item, idx) => (
                      <button
                        key={item.id}
                        onClick={() => setActiveIndex(idx)}
                        className={`w-2.5 h-2.5 rounded-full transition-all ${
                          idx === activeIndex
                            ? 'bg-[#C5A059] w-6'
                            : 'bg-[#F5F5F0]/20 hover:bg-[#F5F5F0]/50'
                        }`}
                        title={item.name}
                      />
                    ))}
                  </div>
                </div>

                <div className="flex items-center space-x-1">
                  <button
                    onClick={handlePrev}
                    className="p-1.5 bg-[#1E1E1E] hover:bg-[#252525] border border-[#F5F5F0]/10 text-[#F5F5F0] transition-colors"
                    aria-label="Previous Featured Specimen"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={handleNext}
                    className="p-1.5 bg-[#1E1E1E] hover:bg-[#252525] border border-[#F5F5F0]/10 text-[#F5F5F0] transition-colors"
                    aria-label="Next Featured Specimen"
                  >
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Quick-Jump Strip to Collection */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            onClick={onExploreClick}
            className="group flex items-center space-x-3 text-xs uppercase tracking-[0.25em] text-[#F5F5F0]/60 hover:text-[#C5A059] transition-colors"
          >
            <span>Explore Full Catalog ({totalIngredients}+ Ingredients)</span>
            <ArrowDown className="w-4 h-4 transform group-hover:translate-y-1 transition-transform" />
          </button>

          <div className="flex items-center space-x-6 text-[10px] uppercase tracking-widest text-[#F5F5F0]/40">
            <span>Langhe Alba</span>
            <span>•</span>
            <span>Nagano Kiso</span>
            <span>•</span>
            <span>Kozani Macedonia</span>
            <span>•</span>
            <span>Modena Emilia</span>
          </div>
        </div>
      </div>
    </section>
  );
};
