import React, { useState, useMemo } from 'react';
import { Ingredient, HarvestSeason } from '../types';
import { SEASONAL_STORIES, SeasonalNarrative } from '../data/seasonalStories';
import { Sparkles, Calendar, BookOpen, ArrowRight, Quote, Compass, Eye, Flame, Beaker } from 'lucide-react';
import { motion } from 'motion/react';
import { IngredientImage } from './IngredientImage';
import { SafeImage } from './SafeImage';
import { GLOBAL_CULINARY_FALLBACK } from '../utils/imageFallback';

interface SeasonalStorySectionProps {
  allIngredients: Ingredient[];
  onSelectIngredient: (ingredient: Ingredient) => void;
}

export const SeasonalStorySection: React.FC<SeasonalStorySectionProps> = ({
  allIngredients,
  onSelectIngredient,
}) => {
  // Determine current calendar season dynamically
  const currentRealSeason: HarvestSeason = useMemo(() => {
    const month = new Date().getMonth(); // 0-11
    if (month >= 2 && month <= 4) return 'Spring';
    if (month >= 5 && month <= 7) return 'Summer';
    if (month >= 8 && month <= 10) return 'Autumn';
    return 'Winter';
  }, []);

  const [selectedSeason, setSelectedSeason] = useState<HarvestSeason>(currentRealSeason);
  const [selectedChapterIdx, setSelectedChapterIdx] = useState<number>(0);

  const activeStory: SeasonalNarrative = useMemo(() => {
    return SEASONAL_STORIES.find((s) => s.season === selectedSeason) || SEASONAL_STORIES[0];
  }, [selectedSeason]);

  const activeChapter = activeStory.chapters[selectedChapterIdx] || activeStory.chapters[0];

  const linkedIngredient = useMemo(() => {
    return allIngredients.find((i) => i.id === activeChapter.ingredientId);
  }, [allIngredients, activeChapter]);

  const handleSeasonChange = (season: HarvestSeason) => {
    setSelectedSeason(season);
    setSelectedChapterIdx(0);
  };

  return (
    <section id="seasonal-storytelling" className="py-20 sm:py-28 bg-[#121212] relative border-b border-[#F5F5F0]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-10">
        {/* Section Editorial Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-[#F5F5F0]/10">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A059] font-bold">
                Seasonal Storytelling & Harvest Chronicles
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-[#C5A059]/15 border border-[#C5A059]/40 text-[9px] uppercase tracking-widest text-[#C5A059]">
                Currently In Season: {currentRealSeason}
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#F5F5F0] tracking-tight">
              The Harvest Almanac
            </h2>
          </div>
          <p className="text-xs text-[#F5F5F0]/60 max-w-md mt-4 md:mt-0 font-light leading-relaxed">
            In-depth culinary narratives exploring the folklore, chemistry, and culinary alchemy of ingredients at their phenological peak.
          </p>
        </div>

        {/* Seasonal Selector Tabs */}
        <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto pb-4 mb-10 no-scrollbar">
          <span className="text-[10px] uppercase tracking-[0.2em] opacity-40 shrink-0 hidden sm:inline">
            Harvest Epoch:
          </span>
          {(['Summer', 'Autumn', 'Winter', 'Spring'] as HarvestSeason[]).map((season) => {
            const isCurrent = season === currentRealSeason;
            const isSelected = season === selectedSeason;
            return (
              <button
                key={season}
                onClick={() => handleSeasonChange(season)}
                className={`relative px-4 sm:px-5 py-2.5 rounded-full text-xs uppercase tracking-wider transition-all shrink-0 flex items-center space-x-2 ${
                  isSelected
                    ? 'bg-[#C5A059] text-[#121212] font-semibold border border-[#C5A059]'
                    : 'border border-[#F5F5F0]/15 text-[#F5F5F0] opacity-60 hover:opacity-100 hover:border-[#F5F5F0]/40'
                }`}
              >
                <span>{season}</span>
                {isCurrent && (
                  <span
                    className={`text-[9px] px-1.5 py-0.2 rounded-full uppercase tracking-tighter ${
                      isSelected ? 'bg-[#121212] text-[#C5A059]' : 'bg-[#C5A059] text-[#121212]'
                    }`}
                  >
                    Current Peak
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Featured Story Master Editorial Canvas */}
        <div className="bg-[#161616] border border-[#F5F5F0]/10 overflow-hidden shadow-2xl">
          {/* Story Banner Hero */}
          <div className="relative w-full aspect-[21/9] sm:aspect-[24/8] min-h-[260px] overflow-hidden bg-[#1E1E1E]">
            <SafeImage
              src={activeStory.heroImage}
              alt={`${activeStory.title} — Seasonal Editorial Gastronomy`}
              priority={true}
              fallbackSrc={GLOBAL_CULINARY_FALLBACK}
              className="w-full h-full object-cover"
              containerClassName="w-full h-full absolute inset-0"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#161616] via-[#161616]/60 to-transparent" />

            <div className="absolute inset-0 p-6 sm:p-10 flex flex-col justify-end">
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A059] font-bold mb-2">
                {activeStory.curatorTag} • {activeStory.dateWindow}
              </span>
              <h3 className="font-serif text-2xl sm:text-4xl lg:text-5xl text-[#F5F5F0] max-w-3xl leading-tight">
                {activeStory.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#F5F5F0]/80 font-light mt-2 max-w-2xl">
                {activeStory.subtitle}
              </p>
            </div>
          </div>

          {/* Lead Quote Callout */}
          <div className="p-6 sm:p-8 bg-[#181818] border-b border-[#F5F5F0]/10 flex items-start space-x-4">
            <Quote className="w-8 h-8 text-[#C5A059] shrink-0 opacity-60 mt-1" />
            <div>
              <p className="font-serif italic text-base sm:text-lg text-[#F5F5F0] leading-relaxed">
                "{activeStory.leadQuote}"
              </p>
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#C5A059] block mt-2">
                — {activeStory.quoteAuthor}
              </span>
            </div>
          </div>

          {/* Story Chapters Navigation & Active Reading Pane */}
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Left Chapter Index (4 Cols) */}
            <div className="lg:col-span-4 border-b lg:border-b-0 lg:border-r border-[#F5F5F0]/10 p-6 space-y-3 bg-[#141414]">
              <span className="text-[10px] uppercase tracking-[0.2em] opacity-40 block mb-3">
                Story Chapters in this Anthology
              </span>

              {activeStory.chapters.map((chap, idx) => {
                const isSelected = idx === selectedChapterIdx;
                return (
                  <div
                    key={idx}
                    onClick={() => setSelectedChapterIdx(idx)}
                    className={`p-4 border transition-all cursor-pointer text-left flex flex-col justify-between ${
                      isSelected
                        ? 'bg-[#1E1E1E] border-[#C5A059]'
                        : 'bg-[#161616] border-[#F5F5F0]/5 hover:border-[#F5F5F0]/20'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span
                        className={`text-[9px] uppercase tracking-widest font-mono ${
                          isSelected ? 'text-[#C5A059]' : 'opacity-40'
                        }`}
                      >
                        Chapter 0{idx + 1}
                      </span>
                      {isSelected && (
                        <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
                      )}
                    </div>
                    <h4 className="font-serif text-sm text-[#F5F5F0] leading-snug">
                      {chap.heading}
                    </h4>
                  </div>
                );
              })}
            </div>

            {/* Right Active Chapter In-Depth Essay (8 Cols) */}
            <div className="lg:col-span-8 p-6 sm:p-10 space-y-8 bg-[#161616]">
              {/* Chapter Header */}
              <div>
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A059] font-bold block mb-1">
                  {activeChapter.subheading}
                </span>
                <h4 className="font-serif text-2xl sm:text-3xl text-[#F5F5F0] leading-snug">
                  {activeChapter.heading}
                </h4>
              </div>

              {/* Main Narrative Prose */}
              <div className="text-xs sm:text-sm text-[#F5F5F0]/80 font-light leading-relaxed space-y-4">
                <p>{activeChapter.narrative}</p>
              </div>

              {/* Flavor Chemistry & Technique Breakout Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                {/* Flavor Chemistry */}
                <div className="p-4 bg-[#1C1C1C] border border-[#F5F5F0]/5">
                  <div className="flex items-center space-x-2 text-[#C5A059] mb-2">
                    <Beaker className="w-3.5 h-3.5" />
                    <span className="text-[9px] uppercase tracking-[0.2em] font-bold">
                      Phenological Chemistry
                    </span>
                  </div>
                  <p className="text-xs text-[#F5F5F0]/70 font-light leading-relaxed">
                    {activeChapter.flavorChemistryNote}
                  </p>
                </div>

                {/* Culinary Technique */}
                <div className="p-4 bg-[#1C1C1C] border border-[#F5F5F0]/5">
                  <div className="flex items-center space-x-2 text-[#C5A059] mb-2">
                    <Flame className="w-3.5 h-3.5" />
                    <span className="text-[9px] uppercase tracking-[0.2em] font-bold">
                      Peak Culinary Technique
                    </span>
                  </div>
                  <p className="text-xs text-[#F5F5F0]/70 font-light leading-relaxed">
                    {activeChapter.culinaryTechnique}
                  </p>
                </div>
              </div>

              {/* Featured Linked Specimen Card */}
              {linkedIngredient && (
                <div className="pt-6 border-t border-[#F5F5F0]/10 flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#1A1A1A] p-4 border border-[#F5F5F0]/10">
                  <div className="flex items-center space-x-4 w-full sm:w-auto">
                    <div className="w-14 h-14 shrink-0 border border-[#F5F5F0]/10 overflow-hidden relative">
                      <IngredientImage
                        ingredient={linkedIngredient}
                        alt={linkedIngredient.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <span className="text-[9px] uppercase tracking-wider text-[#C5A059] block">
                        Featured Specimen
                      </span>
                      <h5 className="font-serif text-lg text-[#F5F5F0]">
                        {linkedIngredient.name}
                      </h5>
                      <span className="text-[10px] opacity-40">
                        {linkedIngredient.origin} • {linkedIngredient.season}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => onSelectIngredient(linkedIngredient)}
                    className="w-full sm:w-auto flex items-center justify-center space-x-2 px-4 py-2.5 bg-[#C5A059] text-[#121212] text-xs uppercase tracking-wider font-semibold hover:bg-[#d6ba94] transition-colors shrink-0"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Examine Specimen</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
