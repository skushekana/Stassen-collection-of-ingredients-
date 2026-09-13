import React, { useState } from 'react';
import { Ingredient, HarvestSeason } from '../types';
import { SEASONS_LIST } from '../data/ingredients';
import { Calendar, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { IngredientImage } from './IngredientImage';

interface SeasonalCalendarSectionProps {
  ingredients: Ingredient[];
  onSelectIngredient: (ingredient: Ingredient) => void;
  onFilterBySeason: (season: string) => void;
}

export const SeasonalCalendarSection: React.FC<SeasonalCalendarSectionProps> = ({
  ingredients,
  onSelectIngredient,
  onFilterBySeason
}) => {
  const [activeSeason, setActiveSeason] = useState<HarvestSeason>('Autumn');

  const seasonIngredients = ingredients.filter(
    (i) => i.season === activeSeason || i.season === 'Perennial / Year-Round'
  );

  const getSeasonDescription = (season: HarvestSeason) => {
    switch (season) {
      case 'Spring':
        return 'Tender shoots, first-flush alpine teas, cold-pressed sap oils, and bitter wild greens rising with melting snowpack.';
      case 'Summer':
        return 'Solar-ripened berries, volcanic nightshade honeys, marine kelp harvesting under midnight suns, and equatorial peppercorns.';
      case 'Autumn':
        return 'The zenith of fungal aromatics — white truffles, matsutake caps, fermented heirloom vinegars, and crimson saffron stigmas.';
      case 'Winter':
        return 'Sub-polar cold-cured salts, cellar-aged soy pastes, preserved citrus peel, and dormant root extracts.';
      case 'Perennial / Year-Round':
        return 'Geological brine evaporation pools and century-old solera vinegar casks untouched by weather transitions.';
    }
  };

  return (
    <section id="seasons" className="py-20 sm:py-28 bg-[#121212] relative border-b border-[#F5F5F0]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-[#F5F5F0]/10">
          <div>
            <span className="text-[10px] uppercase tracking-[0.3em] opacity-60 text-[#F5F5F0] block mb-2">
              Phenological Astronomy & Harvest Clock
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#F5F5F0] tracking-tight">
              Seasonal Harvest Wheel
            </h2>
          </div>
          <p className="text-xs text-[#F5F5F0]/60 max-w-md mt-4 md:mt-0 font-light leading-relaxed">
            Botanical potency peaks within narrow astrological and ecological windows of hours, days, or lunar weeks.
          </p>
        </div>

        {/* Season Navigation Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-8">
          {SEASONS_LIST.map((season) => (
            <button
              key={season}
              onClick={() => setActiveSeason(season)}
              className={`p-4 border transition-all text-left flex flex-col justify-between ${
                activeSeason === season
                  ? 'bg-[#1E1E1E] border-[#C5A059] shadow-xl'
                  : 'bg-[#161616] border-[#F5F5F0]/10 hover:border-[#F5F5F0]/30'
              }`}
            >
              <span className={`text-[10px] uppercase tracking-[0.2em] font-medium block mb-1 ${
                activeSeason === season ? 'text-[#C5A059]' : 'opacity-40'
              }`}>
                Harvest Window
              </span>
              <span className="font-serif text-xl sm:text-2xl text-[#F5F5F0]">
                {season}
              </span>
            </button>
          ))}
        </div>

        {/* Active Season Overview Card */}
        <div className="bg-[#161616] p-6 sm:p-8 border border-[#F5F5F0]/10 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#F5F5F0]/10">
            <div>
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#C5A059] block font-bold mb-1">
                Phenological Peak • {activeSeason}
              </span>
              <p className="text-xs text-[#F5F5F0]/80 font-light max-w-2xl leading-relaxed">
                {getSeasonDescription(activeSeason)}
              </p>
            </div>

            <button
              onClick={() => onFilterBySeason(activeSeason)}
              className="px-5 py-2.5 bg-[#C5A059] text-[#121212] text-[10px] uppercase tracking-[0.2em] font-semibold hover:bg-[#d6ba94] transition-colors self-start md:self-auto shrink-0"
            >
              Filter Showcase to {activeSeason}
            </button>
          </div>

          {/* Active Season Specimen Carousel / Grid */}
          <div className="pt-6">
            <div className="text-[10px] uppercase tracking-[0.2em] opacity-40 mb-4">
              Specimen Harvested during {activeSeason} ({seasonIngredients.length})
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {seasonIngredients.map((item) => (
                <div
                  key={item.id}
                  onClick={() => onSelectIngredient(item)}
                  className="group bg-[#1E1E1E] p-4 border border-[#F5F5F0]/5 hover:border-[#C5A059]/50 transition-all cursor-pointer"
                >
                  <div className="w-full aspect-[4/3] bg-[#252525] overflow-hidden mb-3 relative">
                    <IngredientImage
                      ingredient={item}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <span className="text-[9px] uppercase tracking-wider text-[#C5A059] block mb-1">
                    {item.category}
                  </span>
                  <h4 className="font-serif text-base text-[#F5F5F0] group-hover:text-[#C5A059] transition-colors leading-snug">
                    {item.name}
                  </h4>
                  <span className="text-[10px] opacity-40 block mt-1">
                    {item.origin}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
