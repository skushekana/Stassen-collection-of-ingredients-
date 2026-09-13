import React from 'react';
import { Ingredient, HarvestSeason } from '../types';
import { getSeasonalityInfo, getSeasonIcon } from '../utils/seasonality';
import { Sparkles, Calendar, CheckCircle2, Clock, Leaf, Sun, CloudRain, Snowflake } from 'lucide-react';

interface SeasonalBadgeProps {
  ingredient: Ingredient;
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
  className?: string;
}

/**
 * Compact subtle visual cue for ingredient cards in grid galleries
 */
export const SeasonalBadge: React.FC<SeasonalBadgeProps> = ({
  ingredient,
  size = 'sm',
  showIcon = true,
  className = ''
}) => {
  const seasonality = getSeasonalityInfo(ingredient);
  const Icon = getSeasonIcon(ingredient.season);

  if (seasonality.isPeakNow) {
    return (
      <span
        id={`seasonal-badge-${ingredient.id}`}
        title={`Currently in prime harvest season (${seasonality.currentMonthName} ${seasonality.currentYear})`}
        className={`inline-flex items-center space-x-1.5 px-2 py-0.5 rounded-full font-mono text-[9px] uppercase tracking-wider font-semibold bg-emerald-950/85 border border-emerald-500/50 text-emerald-300 shadow-md backdrop-blur-md transition-all ${className}`}
      >
        <span className="relative flex h-1.5 w-1.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400"></span>
        </span>
        {showIcon && <Icon className="w-2.5 h-2.5 text-emerald-400" />}
        <span>In Season</span>
      </span>
    );
  }

  if (seasonality.isYearRound) {
    return (
      <span
        id={`seasonal-badge-${ingredient.id}`}
        title="Continuous perennial & cellar-aged availability year-round"
        className={`inline-flex items-center space-x-1.5 px-2 py-0.5 rounded-full font-mono text-[9px] uppercase tracking-wider font-semibold bg-[#1a1814]/90 border border-[#C5A059]/40 text-[#C5A059] shadow-md backdrop-blur-md transition-all ${className}`}
      >
        {showIcon && <Sparkles className="w-2.5 h-2.5 text-[#C5A059]" />}
        <span>Year-Round</span>
      </span>
    );
  }

  // Off Season subtle indicator
  return (
    <span
      id={`seasonal-badge-${ingredient.id}`}
      title={`Harvests during ${ingredient.season} (${ingredient.harvestWindow})`}
      className={`inline-flex items-center space-x-1.5 px-2 py-0.5 rounded-full font-mono text-[9px] uppercase tracking-wider font-medium bg-black/60 border border-white/10 text-[#F5F5F0]/50 backdrop-blur-md transition-all ${className}`}
    >
      {showIcon && <Clock className="w-2.5 h-2.5 text-[#F5F5F0]/40" />}
      <span>{ingredient.season}</span>
    </span>
  );
};

interface SeasonalDetailHeroProps {
  ingredient: Ingredient;
}

/**
 * Prominent seasonal display for the ingredient detail page
 */
export const SeasonalDetailHero: React.FC<SeasonalDetailHeroProps> = ({ ingredient }) => {
  const seasonality = getSeasonalityInfo(ingredient);
  const CurrentIcon = getSeasonIcon(seasonality.currentSeason);
  const HarvestIcon = getSeasonIcon(ingredient.season);

  return (
    <div
      id="ingredient-seasonal-hero-panel"
      className="p-5 sm:p-6 bg-gradient-to-br from-[#1A1A1A] via-[#161616] to-[#121212] border border-[#F5F5F0]/15 shadow-2xl relative overflow-hidden mb-8"
    >
      {/* Background Accent Ambient Glow */}
      <div
        className={`absolute -right-20 -top-20 w-64 h-64 rounded-full blur-3xl pointer-events-none opacity-15 ${
          seasonality.isPeakNow
            ? 'bg-emerald-500'
            : seasonality.isYearRound
            ? 'bg-[#C5A059]'
            : 'bg-amber-700'
        }`}
      />

      {/* Top Banner Status Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5 pb-4 border-b border-[#F5F5F0]/10">
        <div className="flex items-center space-x-3">
          <div
            className={`p-2 rounded-lg border flex items-center justify-center ${
              seasonality.isPeakNow
                ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-400'
                : seasonality.isYearRound
                ? 'bg-[#C5A059]/10 border-[#C5A059]/30 text-[#C5A059]'
                : 'bg-[#222] border-white/10 text-[#F5F5F0]/60'
            }`}
          >
            <HarvestIcon className="w-5 h-5" />
          </div>

          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#C5A059]">
                Phenological Seasonality
              </span>
              <span className="text-neutral-500">•</span>
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#F5F5F0]/60 flex items-center gap-1">
                <CurrentIcon className="w-3 h-3 text-[#C5A059]" />
                Today: {seasonality.currentMonthName} {seasonality.currentYear} ({seasonality.currentSeason})
              </span>
            </div>
            <h3 className="font-serif text-xl sm:text-2xl text-[#F5F5F0] mt-0.5 flex items-center gap-2.5">
              <span>{seasonality.statusHeadline}</span>
            </h3>
          </div>
        </div>

        {/* Season Status Badge */}
        <div className="flex items-center">
          {seasonality.isPeakNow ? (
            <div className="px-3.5 py-1.5 bg-emerald-950/90 border border-emerald-500/60 text-emerald-300 font-mono text-xs uppercase tracking-widest flex items-center space-x-2 shadow-lg shadow-emerald-950/50">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
              </span>
              <span className="font-semibold">In Peak Season Right Now</span>
            </div>
          ) : seasonality.isYearRound ? (
            <div className="px-3.5 py-1.5 bg-[#C5A059]/15 border border-[#C5A059]/50 text-[#C5A059] font-mono text-xs uppercase tracking-widest flex items-center space-x-2 shadow-lg shadow-black/40">
              <Sparkles className="w-3.5 h-3.5" />
              <span className="font-semibold">Year-Round Cellar Reserve</span>
            </div>
          ) : (
            <div className="px-3.5 py-1.5 bg-[#202020] border border-[#F5F5F0]/20 text-[#F5F5F0]/80 font-mono text-xs uppercase tracking-widest flex items-center space-x-2">
              <Clock className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Upcoming: {ingredient.season}</span>
            </div>
          )}
        </div>
      </div>

      {/* Description of seasonality */}
      <p className="text-xs sm:text-sm text-[#F5F5F0]/85 font-light leading-relaxed mb-6 max-w-3xl">
        {seasonality.detailedStatusText}
      </p>

      {/* 4-Season Phenological Track / Timeline */}
      <div>
        <div className="text-[10px] uppercase font-mono tracking-[0.2em] text-[#F5F5F0]/50 mb-3 flex items-center justify-between">
          <span>Astronomical Harvest Cycle</span>
          <span className="text-[#C5A059]">Active Window: {seasonality.harvestWindow}</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {seasonality.seasonsTrack.map((st) => {
            const SeasonIconComp = getSeasonIcon(st.id);
            const isHarvest = st.isHarvestSeason;
            const isCurrent = st.isCurrent;

            return (
              <div
                key={st.id}
                className={`p-3 border transition-all relative ${
                  isHarvest && isCurrent
                    ? 'bg-emerald-950/40 border-emerald-500/60 shadow-lg'
                    : isHarvest
                    ? 'bg-[#1E1C18] border-[#C5A059]/50'
                    : isCurrent
                    ? 'bg-[#222] border-[#F5F5F0]/30'
                    : 'bg-[#151515] border-[#F5F5F0]/10 opacity-60'
                }`}
              >
                {/* Active Current Month Marker */}
                {isCurrent && (
                  <span className="absolute -top-2 right-2 px-1.5 py-0.2 bg-[#C5A059] text-black font-mono text-[8px] uppercase tracking-widest font-bold">
                    Today
                  </span>
                )}

                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center space-x-1.5">
                    <SeasonIconComp
                      className={`w-3.5 h-3.5 ${
                        isHarvest && isCurrent
                          ? 'text-emerald-400'
                          : isHarvest
                          ? 'text-[#C5A059]'
                          : 'text-[#F5F5F0]/50'
                      }`}
                    />
                    <span className="font-serif text-sm text-[#F5F5F0] font-medium">{st.name}</span>
                  </div>
                  {isHarvest && (
                    <span
                      className={`text-[8px] uppercase font-mono px-1.5 py-0.2 ${
                        isCurrent
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : 'bg-[#C5A059]/20 text-[#C5A059] border border-[#C5A059]/30'
                      }`}
                    >
                      Harvest
                    </span>
                  )}
                </div>

                <div className="text-[10px] font-mono text-[#F5F5F0]/50">
                  {st.months}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
