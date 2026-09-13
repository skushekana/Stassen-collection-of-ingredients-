import React, { useState } from 'react';
import { Bookmark, Clock, ChefHat, Play, Flame, Sparkles } from 'lucide-react';
import { CulinaryMasterclass } from '../types';
import { CulinaryImage } from './CulinaryImage';
import { toggleRecipeBookmark } from '../services/recipeService';

interface RecipeCardProps {
  recipe: CulinaryMasterclass;
  onCook: (recipe: CulinaryMasterclass) => void;
  onSelect?: (recipe: CulinaryMasterclass) => void;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({
  recipe,
  onCook,
  onSelect,
}) => {
  const [isBookmarked, setIsBookmarked] = useState<boolean>(!!recipe.isBookmarked);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const handleBookmarkToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newState = toggleRecipeBookmark(recipe.id);
    setIsBookmarked(newState);
  };

  const stepsCount = recipe.timelineSteps?.length || 4;
  const cookTime = recipe.totalCookTimeMinutes || 15;
  const prepTime = recipe.totalPrepTimeMinutes || 5;
  const totalTime = cookTime + prepTime;
  const cuisine = recipe.cuisine || 'Italian';
  const difficulty = recipe.difficulty?.toUpperCase() || 'ADVANCED';

  const slug = recipe.slug || recipe.id;

  return (
    <a
      id={`recipe-card-${recipe.id}`}
      href={`/recipes/${slug}`}
      onClick={(e) => {
        if (!e.metaKey && !e.ctrlKey && !e.shiftKey) {
          e.preventDefault();
          if (onSelect) onSelect(recipe);
          else onCook(recipe);
        }
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative bg-[#181818] border border-[#F5F5F0]/10 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl hover:border-[#C5A059]/50 transition-all duration-300 flex flex-col cursor-pointer transform hover:-translate-y-1 block text-inherit no-underline"
    >
      {/* Top Image Container with High-Res Gastronomy and Safe Fallbacks */}
      <div className="relative aspect-[16/10] w-full bg-[#121212] overflow-hidden">
        <CulinaryImage
          src={recipe.heroImageUrl}
          alt={recipe.dishTitle}
          cuisine={cuisine}
          category={recipe.primaryIngredientName}
          className={`w-full h-full object-cover transition-transform duration-700 ease-out ${
            isHovered ? 'scale-105' : 'scale-100'
          }`}
          priority={false}
        />

        {/* Ambient Dark Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-black/20 to-transparent pointer-events-none" />

        {/* Top Badges: Cuisine & Bookmark */}
        <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between z-10">
          <div className="flex items-center space-x-1.5 flex-wrap gap-y-1">
            <span className="px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-[#C5A059]/40 text-[#C5A059] text-[10px] font-mono tracking-widest uppercase font-semibold shadow-md">
              {recipe.countryRegion ? `${recipe.countryRegion}` : cuisine}
            </span>
            {recipe.recipeNumber && (
              <span className="px-2 py-1 rounded-full bg-[#C5A059]/20 backdrop-blur-md border border-[#C5A059]/40 text-[#C5A059] text-[9px] font-mono tracking-wider font-bold shadow-md">
                No. {recipe.recipeNumber}
              </span>
            )}
            {recipe.isHottest && (
              <span className="px-2.5 py-1 rounded-full bg-amber-500 text-black text-[9px] font-mono tracking-wider uppercase font-bold shadow-md flex items-center space-x-1">
                <Flame className="w-2.5 h-2.5 fill-current" />
                <span>#{recipe.hotnessRank || 1} HOTTEST</span>
              </span>
            )}
          </div>

          <button
            onClick={handleBookmarkToggle}
            aria-label={isBookmarked ? 'Remove bookmark' : 'Bookmark recipe'}
            className={`p-2 rounded-full backdrop-blur-md border transition-all duration-200 shadow-md ${
              isBookmarked
                ? 'bg-[#C5A059] border-[#C5A059] text-black'
                : 'bg-black/70 border-white/10 text-white/80 hover:text-[#C5A059] hover:border-[#C5A059]/50'
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-black' : ''}`} />
          </button>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          {/* Metadata Row: Time, Difficulty & Calories */}
          <div className="flex items-center space-x-2 text-[11px] font-mono text-[#F5F5F0]/60 tracking-wider uppercase mb-2">
            <span className="flex items-center text-[#C5A059] font-medium">
              <Clock className="w-3.5 h-3.5 mr-1" />
              {totalTime} MINS
            </span>
            <span className="text-[#F5F5F0]/30">•</span>
            <span className="tracking-widest">{difficulty}</span>
            {recipe.nutritionalProfile?.calories && (
              <>
                <span className="text-[#F5F5F0]/30">•</span>
                <span className="text-emerald-400 font-semibold">{recipe.nutritionalProfile.calories} KCAL</span>
              </>
            )}
          </div>

          {/* Dish Title (Italic Serifs) */}
          <h3 className="font-serif italic text-xl sm:text-2xl text-[#F5F5F0] group-hover:text-[#C5A059] transition-colors line-clamp-1 leading-snug">
            {recipe.dishTitle}
          </h3>

          {/* Subtitle / Description */}
          <p className="text-xs text-[#F5F5F0]/70 font-sans leading-relaxed line-clamp-2 mt-1.5">
            {recipe.subtitle || recipe.overview}
          </p>
        </div>

        {/* Card Footer: Step Count & Orange COOK Action Button */}
        <div className="pt-3 border-t border-[#F5F5F0]/10 flex items-center justify-between">
          <div className="flex items-center space-x-1.5 text-xs text-[#F5F5F0]/60 font-mono">
            <ChefHat className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>{stepsCount} Steps</span>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onCook(recipe);
            }}
            id={`cook-btn-${recipe.id}`}
            className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-[#D97706] to-[#B45309] hover:from-[#F59E0B] hover:to-[#D97706] text-white font-mono text-xs font-bold uppercase tracking-wider shadow-lg shadow-amber-900/30 transform active:scale-95 transition-all duration-200"
          >
            <Play className="w-3 h-3 fill-white" />
            <span>COOK</span>
          </button>
        </div>
      </div>
    </a>
  );
};
