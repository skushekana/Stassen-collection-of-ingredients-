import React, { useState } from 'react';
import { Ingredient, WorldRegion } from '../types';
import { REGIONS_DATA } from '../data/ingredients';
import { MapPin, Compass, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { IngredientImage } from './IngredientImage';

interface LocationsSectionProps {
  ingredients: Ingredient[];
  onSelectIngredient: (ingredient: Ingredient) => void;
  onFilterByRegion: (regionName: string) => void;
}

export const LocationsSection: React.FC<LocationsSectionProps> = ({
  ingredients,
  onSelectIngredient,
  onFilterByRegion
}) => {
  const [selectedRegionIndex, setSelectedRegionIndex] = useState<number>(0);
  const activeRegion = REGIONS_DATA[selectedRegionIndex] || REGIONS_DATA[0];

  const regionIngredients = ingredients.filter(
    (i) => i.region === activeRegion.id || i.region === activeRegion.name
  );

  return (
    <section id="locations" className="py-20 sm:py-28 bg-[#0F0F0F] relative border-b border-[#F5F5F0]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-10">
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-[#F5F5F0]/10">
          <div>
            <span className="text-[10px] uppercase tracking-[0.3em] opacity-60 text-[#F5F5F0] block mb-2">
              Geological & Climatic Provenance
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#F5F5F0] tracking-tight">
              Terroirs & Origins
            </h2>
          </div>
          <p className="text-xs text-[#F5F5F0]/60 max-w-md mt-4 md:mt-0 font-light leading-relaxed">
            Ingredients are living expressions of microclimates, volcanic mineral strata, sub-polar ocean currents, and high-altitude sunlight.
          </p>
        </div>

        {/* Region Selector Pills */}
        <div className="flex items-center gap-3 overflow-x-auto pb-4 mb-8 no-scrollbar">
          <span className="text-[10px] uppercase tracking-[0.2em] opacity-40 shrink-0 hidden sm:inline">
            World Region:
          </span>
          {REGIONS_DATA.map((region, idx) => (
            <button
              key={region.id}
              onClick={() => setSelectedRegionIndex(idx)}
              className={`px-4 py-2 text-[10px] uppercase tracking-[0.2em] rounded-full transition-all shrink-0 ${
                selectedRegionIndex === idx
                  ? 'bg-[#C5A059] text-[#121212] font-semibold border border-[#C5A059]'
                  : 'border border-[#F5F5F0]/20 text-[#F5F5F0] opacity-50 hover:opacity-100 hover:border-[#F5F5F0]/40'
              }`}
            >
              {region.name}
            </button>
          ))}
        </div>

        {/* Region Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Region Dossier (5 Cols) */}
          <div className="lg:col-span-5 bg-[#161616] p-6 sm:p-8 border border-[#F5F5F0]/10 flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center justify-between text-xs mb-4">
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A059] font-medium">
                  {activeRegion.subtitle}
                </span>
                <span className="text-[10px] font-mono text-[#F5F5F0]/40">
                  {activeRegion.climate}
                </span>
              </div>

              <h3 className="font-serif text-3xl sm:text-4xl text-[#F5F5F0] mb-3">
                {activeRegion.name}
              </h3>

              <p className="text-xs text-[#F5F5F0]/70 font-light leading-relaxed mb-6">
                {activeRegion.description}
              </p>

              {/* Terroir Matrix */}
              <div className="space-y-2.5 pt-4 border-t border-[#F5F5F0]/10 text-xs">
                <div className="flex justify-between py-1.5 border-b border-[#F5F5F0]/5">
                  <span className="text-[10px] uppercase tracking-wider opacity-40">Terroir Climate</span>
                  <span className="text-[#F5F5F0]">{activeRegion.climate}</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-[10px] uppercase tracking-wider opacity-40">Catalogued In Region</span>
                  <span className="text-[#C5A059]">{regionIngredients.length} Specimen</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onFilterByRegion(activeRegion.name)}
              className="w-full flex items-center justify-center space-x-2 py-3 bg-[#1E1E1E] hover:bg-[#C5A059] hover:text-[#121212] text-[#F5F5F0] border border-[#F5F5F0]/15 text-[10px] uppercase tracking-[0.2em] font-semibold transition-all duration-300"
            >
              <span>Filter Showcase to {activeRegion.name}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Right Region Ingredients Showcase (7 Cols) */}
          <div className="lg:col-span-7 bg-[#161616] p-6 sm:p-8 border border-[#F5F5F0]/10 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6 pb-3 border-b border-[#F5F5F0]/10">
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#C5A059] font-bold">
                  Catalogued Specimen in this Terroir
                </span>
                <span className="text-[10px] uppercase tracking-widest opacity-40">
                  {regionIngredients.length} Specimen Recorded
                </span>
              </div>

              {regionIngredients.length === 0 ? (
                <div className="py-16 text-center text-xs opacity-50">
                  No specimen recorded yet for this region in the current filtered view.
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {regionIngredients.slice(0, 4).map((item) => (
                    <div
                      key={item.id}
                      onClick={() => onSelectIngredient(item)}
                      className="group bg-[#1E1E1E] p-4 border border-[#F5F5F0]/5 hover:border-[#C5A059]/40 transition-all cursor-pointer flex flex-col justify-between"
                    >
                      <div className="w-full aspect-[16/10] bg-[#252525] overflow-hidden mb-3 relative">
                        <IngredientImage
                          ingredient={item}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div>
                        <span className="text-[9px] uppercase tracking-widest text-[#C5A059] block mb-1">
                          {item.category}
                        </span>
                        <h4 className="font-serif text-lg text-[#F5F5F0] group-hover:text-[#C5A059] transition-colors leading-snug">
                          {item.name}
                        </h4>
                        <span className="text-[10px] opacity-40 block mt-1">
                          {item.origin} • {item.season}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Microclimatic Sensory Footnote */}
            <div className="mt-6 pt-4 border-t border-[#F5F5F0]/10 flex items-center justify-between text-[11px] opacity-60">
              <span className="italic font-serif">"Terroir is the soil's handwriting across flavor chemistry."</span>
              <span className="text-[9px] uppercase tracking-widest text-[#C5A059]">Stassen Archive</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
