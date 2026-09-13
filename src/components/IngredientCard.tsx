import React from 'react';
import { Ingredient } from '../types';
import { Bookmark, MapPin, Calendar, ArrowRight, Sparkles } from 'lucide-react';
import { IngredientImage } from './IngredientImage';
import { SeasonalBadge } from './SeasonalIndicator';
import { getSeasonalityInfo } from '../utils/seasonality';

interface IngredientCardProps {
  ingredient: Ingredient;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
  onSelect: (ingredient: Ingredient) => void;
  onQuickPeek?: (ingredient: Ingredient) => void;
}

export const IngredientCard: React.FC<IngredientCardProps> = ({
  ingredient,
  isSaved,
  onToggleSave,
  onSelect
}) => {
  const seasonality = getSeasonalityInfo(ingredient);
  const slug = ingredient.slug || ingredient.id;

  return (
    <a
      id={`ingredient-card-${ingredient.id}`}
      href={`/ingredients/${slug}`}
      className={`group relative flex flex-col bg-[#1E1E1E] rounded-none border transition-all duration-500 overflow-hidden cursor-pointer shadow-xl hover:shadow-2xl hover:shadow-black/80 block text-inherit no-underline ${
        seasonality.isPeakNow
          ? 'border-[#F5F5F0]/15 hover:border-emerald-500/60'
          : 'border-[#F5F5F0]/10 hover:border-[#C5A059]/50'
      }`}
      onClick={(e) => {
        // Allow ctrl/cmd+click to open new tab, otherwise perform SPA transition
        if (!e.metaKey && !e.ctrlKey && !e.shiftKey) {
          e.preventDefault();
          onSelect(ingredient);
        }
      }}
    >
      {/* Media Box with Generated Still Image & Hover Zoom/Shimmer */}
      <div className="relative w-full aspect-[4/3] bg-[#252525] overflow-hidden">
        {/* Generated / Cached Still Image with Smooth Hover Zoom */}
        <div className="w-full h-full transform transition-transform duration-700 ease-out group-hover:scale-108">
          <IngredientImage
            ingredient={ingredient}
            alt={ingredient.name}
            className="w-full h-full object-cover transition-all duration-700 filter brightness-95 group-hover:brightness-105"
          />
        </div>

        {/* Ambient Dark Scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1E1E1E] via-transparent to-black/30 pointer-events-none" />

        {/* Subtle Shimmer Light Sweep on Hover */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />

        {/* Top Badges: Botanical Specimen & Subtle Seasonal Availability Cue */}
        <div className="absolute top-3 left-3 flex flex-wrap items-center gap-1.5 z-10">
          <div className="px-2.5 py-1 text-[9px] uppercase tracking-[0.2em] bg-black/75 backdrop-blur-md text-[#F5F5F0]/80 border border-[#F5F5F0]/10 flex items-center space-x-1.5 opacity-90 group-hover:opacity-100 group-hover:border-[#C5A059]/40 transition-all">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
            <span>Specimen</span>
          </div>

          {/* Subtle Seasonal Availability Visual Cue */}
          <SeasonalBadge ingredient={ingredient} size="sm" />
        </div>

        {/* Bookmark Button */}
        <button
          id={`save-btn-${ingredient.id}`}
          onClick={(e) => {
            e.stopPropagation();
            onToggleSave(ingredient.id);
          }}
          aria-label={isSaved ? "Remove from cellar" : "Save to cellar"}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all duration-300 z-10 ${
            isSaved
              ? 'bg-[#C5A059] text-[#121212]'
              : 'bg-black/60 text-[#F5F5F0]/70 hover:text-white hover:bg-black/90'
          }`}
        >
          <Bookmark className="w-3.5 h-3.5 fill-current" />
        </button>

        {/* Reserve Badge */}
        {ingredient.rarityIndex === 'Ultra Rare Reserve' && (
          <div className="absolute bottom-3 left-3 px-2 py-0.5 bg-[#121212]/90 border border-[#C5A059]/40 text-[#C5A059] text-[9px] uppercase tracking-[0.2em] backdrop-blur-sm flex items-center space-x-1">
            <Sparkles className="w-2.5 h-2.5" />
            <span>Reserve</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between bg-[#1E1E1E]">
        <div>
          {/* Category & Season Strip with Seasonal Color Accent Cue */}
          <div className="flex items-center justify-between text-xs mb-3">
            <span className="text-[9px] uppercase tracking-[0.2em] text-[#C5A059] font-medium">
              {ingredient.category}
            </span>
            <span
              className={`text-[10px] uppercase tracking-widest flex items-center space-x-1.5 ${
                seasonality.isPeakNow
                  ? 'text-emerald-400 font-semibold'
                  : seasonality.isYearRound
                  ? 'text-[#C5A059]'
                  : 'text-[#F5F5F0]/50'
              }`}
              title={seasonality.detailedStatusText}
            >
              <Calendar className={`w-3 h-3 ${seasonality.isPeakNow ? 'text-emerald-400' : 'text-[#C5A059]'}`} />
              <span>{ingredient.season}</span>
              {seasonality.isPeakNow && (
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              )}
            </span>
          </div>

          {/* Master Name */}
          <h3 className="font-serif text-xl sm:text-2xl text-[#F5F5F0] group-hover:text-[#C5A059] transition-colors leading-snug mb-1">
            {ingredient.name}
          </h3>

          {/* Scientific Nomenclature */}
          {ingredient.scientificName && (
            <p className="font-serif italic text-xs text-[#F5F5F0]/50 tracking-wide mb-3">
              {ingredient.scientificName}
            </p>
          )}

          {/* Origin */}
          <div className="flex items-center text-xs text-[#F5F5F0]/60 mb-4">
            <MapPin className="w-3.5 h-3.5 text-[#C5A059] mr-1.5 shrink-0" />
            <span className="truncate text-[11px] tracking-wide">{ingredient.origin}</span>
          </div>

          {/* Flavor Notes */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {ingredient.flavorNotes.slice(0, 3).map((note, index) => (
              <span
                key={index}
                className="px-2 py-0.5 bg-[#252525] text-[#F5F5F0]/80 text-[10px] tracking-wider uppercase border border-[#F5F5F0]/5"
              >
                {note}
              </span>
            ))}
            {ingredient.flavorNotes.length > 3 && (
              <span className="px-1.5 py-0.5 text-[#F5F5F0]/40 text-[9px] self-center">
                +{ingredient.flavorNotes.length - 3}
              </span>
            )}
          </div>
        </div>

        {/* Footer info link */}
        <div className="pt-3 border-t border-[#F5F5F0]/10 flex items-center justify-between text-xs">
          <span className="text-[10px] uppercase tracking-[0.2em] text-[#F5F5F0]/50 group-hover:text-[#F5F5F0] transition-colors">
            View Terroir Profile
          </span>
          <span className="p-1 text-[#C5A059] transform group-hover:translate-x-1 transition-transform">
            <ArrowRight className="w-4 h-4" />
          </span>
        </div>
      </div>
    </a>
  );
};


