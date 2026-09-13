import React, { useState, useMemo } from 'react';
import { Ingredient, HarvestSeason } from '../types';
import {
  Calendar as CalendarIcon,
  Sun,
  CloudRain,
  Leaf,
  Snowflake,
  Clock,
  Sparkles,
  MapPin,
  ChevronRight,
  Plus,
  Bookmark
} from 'lucide-react';
import { SeasonalBadge } from '../components/SeasonalIndicator';
import { IngredientImage } from '../components/IngredientImage';
import { shoppingListService } from '../services/shoppingListService';

interface SeasonalCalendarPageProps {
  ingredients: Ingredient[];
  savedIds: string[];
  onToggleSave: (id: string) => void;
  onSelectIngredient: (ingredient: Ingredient) => void;
}

const MONTHS = [
  { id: 1, name: 'January', season: 'Winter' as HarvestSeason },
  { id: 2, name: 'February', season: 'Winter' as HarvestSeason },
  { id: 3, name: 'March', season: 'Spring' as HarvestSeason },
  { id: 4, name: 'April', season: 'Spring' as HarvestSeason },
  { id: 5, name: 'May', season: 'Spring' as HarvestSeason },
  { id: 6, name: 'June', season: 'Summer' as HarvestSeason },
  { id: 7, name: 'July', season: 'Summer' as HarvestSeason },
  { id: 8, name: 'August', season: 'Summer' as HarvestSeason },
  { id: 9, name: 'September', season: 'Autumn' as HarvestSeason },
  { id: 10, name: 'October', season: 'Autumn' as HarvestSeason },
  { id: 11, name: 'November', season: 'Autumn' as HarvestSeason },
  { id: 12, name: 'December', season: 'Winter' as HarvestSeason },
];

const SEASONS_META = [
  {
    id: 'All' as const,
    label: 'All Harvests',
    icon: Clock,
    color: 'text-[#F5F5F0]',
    desc: 'Full phenological astronomical calendar'
  },
  {
    id: 'Spring' as HarvestSeason,
    label: 'Spring Awakenings',
    icon: Leaf,
    color: 'text-emerald-400',
    desc: 'Tender botanical shoots, wild alliums, early sap, and alpine flushes'
  },
  {
    id: 'Summer' as HarvestSeason,
    label: 'Summer Peak Solar',
    icon: Sun,
    color: 'text-amber-400',
    desc: 'Intense resinous peppercorns, nightshades, sun-dried barks, and floral nectars'
  },
  {
    id: 'Autumn' as HarvestSeason,
    label: 'Autumn Abundance',
    icon: CloudRain,
    color: 'text-orange-400',
    desc: 'Mycorrhizal wild fungi, saffron blooms, heritage must reductions, and ripe citrus'
  },
  {
    id: 'Winter' as HarvestSeason,
    label: 'Winter Dormancy',
    icon: Snowflake,
    color: 'text-sky-300',
    desc: 'Cold-pressed single estate oils, sea salts, aged ferments, and cellar reserves'
  },
  {
    id: 'Perennial / Year-Round' as HarvestSeason,
    label: 'Perennial & Cellared',
    icon: Sparkles,
    color: 'text-[#C5A059]',
    desc: 'Solera vinegars, mineral crystal salts, and ancient preserved grains'
  }
];

export const SeasonalCalendarPage: React.FC<SeasonalCalendarPageProps> = ({
  ingredients,
  savedIds,
  onToggleSave,
  onSelectIngredient
}) => {
  const currentMonthIdx = new Date().getMonth(); // 0 to 11
  const [selectedMonth, setSelectedMonth] = useState<number>(currentMonthIdx + 1);
  const [selectedSeasonTab, setSelectedSeasonTab] = useState<string>('All');

  const activeMonthObj = MONTHS.find((m) => m.id === selectedMonth) || MONTHS[0];

  // Ingredients in peak harvest for the selected month/season
  const displayedIngredients = useMemo(() => {
    return ingredients.filter((ing) => {
      // If season tab is selected and not 'All'
      if (selectedSeasonTab !== 'All') {
        if (selectedSeasonTab === 'Perennial / Year-Round') {
          return ing.season === 'Perennial / Year-Round';
        }
        return ing.season === selectedSeasonTab || ing.season === 'Perennial / Year-Round';
      }

      // If viewing by month:
      const targetSeason = activeMonthObj.season;
      const matchSeason = ing.season === targetSeason || ing.season === 'Perennial / Year-Round';
      const matchMonthText = ing.harvestWindow.toLowerCase().includes(activeMonthObj.name.toLowerCase().slice(0, 4));

      return matchSeason || matchMonthText;
    });
  }, [ingredients, selectedMonth, selectedSeasonTab, activeMonthObj]);

  return (
    <div id="seasonal-calendar-page" className="min-h-screen bg-[#121212] text-[#F5F5F0] pt-24 pb-20 px-4 sm:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 pb-6 border-b border-[#F5F5F0]/10">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A059] font-medium block mb-2">
            Phenological Astronomy & Terroir Cycles
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#F5F5F0] tracking-tight">
            Seasonal Harvest Calendar
          </h1>
          <p className="text-xs sm:text-sm text-[#F5F5F0]/60 mt-1">
            Track peak micro-seasons, ephemeral bloom windows, and annual foraging cycles across the globe.
          </p>
        </div>

        {/* 12-Month Timeline Navigation */}
        <div className="mb-8">
          <div className="text-xs uppercase tracking-wider text-[#F5F5F0]/50 mb-3 flex items-center justify-between">
            <span>Browse by Calendar Month</span>
            <span className="text-[#C5A059] text-[11px]">Current Month: {MONTHS[currentMonthIdx].name}</span>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-6 lg:grid-cols-12 gap-2">
            {MONTHS.map((m) => {
              const isSelected = selectedMonth === m.id && selectedSeasonTab === 'All';
              const isCurrent = m.id === currentMonthIdx + 1;

              return (
                <button
                  key={m.id}
                  onClick={() => {
                    setSelectedMonth(m.id);
                    setSelectedSeasonTab('All');
                  }}
                  className={`p-3 text-center border transition-all relative ${
                    isSelected
                      ? 'bg-[#C5A059] text-[#121212] border-[#C5A059] font-medium shadow-lg'
                      : 'bg-[#1E1E1E] text-[#F5F5F0]/80 border-[#F5F5F0]/10 hover:border-[#C5A059]/40 hover:text-white'
                  }`}
                >
                  <span className="block text-xs font-mono font-bold mb-0.5">
                    {String(m.id).padStart(2, '0')}
                  </span>
                  <span className="block text-[11px] uppercase tracking-wider truncate">
                    {m.name.slice(0, 3)}
                  </span>

                  {isCurrent && (
                    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-[#121212]" title="Current Month" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Season Filter Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-10">
          {SEASONS_META.map((s) => {
            const Icon = s.icon;
            const isSelected = selectedSeasonTab === s.id;

            return (
              <button
                key={s.id}
                onClick={() => setSelectedSeasonTab(s.id)}
                className={`p-3.5 text-left border transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'bg-[#222] border-[#C5A059] text-white shadow-md'
                    : 'bg-[#181818] border-[#F5F5F0]/10 hover:border-white/20 text-[#F5F5F0]/70'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <Icon className={`w-4 h-4 ${s.color}`} />
                  {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />}
                </div>
                <span className="text-xs font-medium uppercase tracking-wider block mb-1">
                  {s.label}
                </span>
                <span className="text-[10px] text-[#F5F5F0]/50 line-clamp-2 leading-tight">
                  {s.desc}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Horizon Banner */}
        <div className="p-4 sm:p-5 bg-[#181818] border border-[#C5A059]/30 mb-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <CalendarIcon className="w-5 h-5 text-[#C5A059]" />
            <div>
              <h3 className="font-serif text-lg text-[#F5F5F0]">
                {selectedSeasonTab === 'All'
                  ? `Peak Terroir Harvests in ${activeMonthObj.name} (${activeMonthObj.season})`
                  : `Specimens in ${selectedSeasonTab}`}
              </h3>
              <p className="text-xs text-[#F5F5F0]/60">
                Displaying {displayedIngredients.length} botanical specimens harvested during this climatic phase
              </p>
            </div>
          </div>
        </div>

        {/* Harvest Specimens Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedIngredients.map((ingredient) => (
            <div
              key={ingredient.id}
              onClick={() => onSelectIngredient(ingredient)}
              className="bg-[#1E1E1E] border border-[#F5F5F0]/10 hover:border-[#C5A059]/50 transition-all p-5 flex flex-col justify-between cursor-pointer group shadow-xl"
            >
              <div>
                <div className="relative aspect-[16/9] mb-4 bg-black/40 overflow-hidden border border-white/5">
                  <IngredientImage
                    ingredient={ingredient}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2 left-2 flex items-center gap-1.5 z-20">
                    <SeasonalBadge ingredient={ingredient} size="sm" />
                  </div>
                  <div className="absolute bottom-2 left-2 right-2 px-2 py-1 bg-black/70 backdrop-blur-sm text-[10px] text-[#F5F5F0]/80 truncate z-20">
                    Window: {ingredient.harvestWindow}
                  </div>
                </div>

                <div className="flex items-center space-x-2 text-[10px] uppercase tracking-wider text-[#C5A059] mb-1">
                  <span>{ingredient.category}</span>
                  <span className="text-[#F5F5F0]/30">•</span>
                  <span>{ingredient.country}</span>
                </div>

                <h3 className="font-serif text-xl text-[#F5F5F0] group-hover:text-[#C5A059] transition-colors mb-2 leading-snug">
                  {ingredient.name}
                </h3>

                <p className="text-xs text-[#F5F5F0]/70 line-clamp-2 mb-4 leading-relaxed">
                  {ingredient.description}
                </p>

                {/* Flavor Notes */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {ingredient.flavorNotes.slice(0, 3).map((note, idx) => (
                    <span key={idx} className="px-2 py-0.5 bg-[#252525] text-[10px] text-[#F5F5F0]/70 border border-white/5">
                      {note}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Footer */}
              <div className="pt-4 border-t border-[#F5F5F0]/10 flex items-center justify-between text-xs">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    shoppingListService.addIngredient(ingredient);
                  }}
                  className="text-[#C5A059] hover:underline flex items-center space-x-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add to List</span>
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleSave(ingredient.id);
                  }}
                  className={`p-1.5 rounded-none transition-colors ${
                    savedIds.includes(ingredient.id)
                      ? 'text-[#C5A059]'
                      : 'text-[#F5F5F0]/40 hover:text-white'
                  }`}
                  title={savedIds.includes(ingredient.id) ? 'Saved in Cellar' : 'Save to Cellar'}
                >
                  <Bookmark className="w-4 h-4 fill-current" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
