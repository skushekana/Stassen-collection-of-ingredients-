import { Ingredient, HarvestSeason } from '../types';
import { Sun, Leaf, CloudRain, Snowflake, Sparkles, Clock, Calendar } from 'lucide-react';

export interface SeasonalityInfo {
  isInSeason: boolean;
  isPeakNow: boolean;
  isYearRound: boolean;
  currentSeason: HarvestSeason;
  currentMonthName: string;
  currentMonthIndex: number; // 0-11
  currentYear: number;
  badgeLabel: string;
  statusHeadline: string;
  detailedStatusText: string;
  harvestWindow: string;
  accentColor: string; // Tailwind color class e.g. text-emerald-400
  badgeBgColor: string;
  badgeBorderColor: string;
  badgeTextColor: string;
  seasonsTrack: Array<{
    id: HarvestSeason;
    name: string;
    months: string;
    isCurrent: boolean;
    isHarvestSeason: boolean;
  }>;
}

const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

/**
 * Returns the astronomical/culinary season for a given date.
 */
export function getCurrentSeason(date: Date = new Date()): HarvestSeason {
  const month = date.getMonth(); // 0-11
  // March (2), April (3), May (4) -> Spring
  if (month >= 2 && month <= 4) {
    return 'Spring';
  }
  // June (5), July (6), August (7) -> Summer
  if (month >= 5 && month <= 7) {
    return 'Summer';
  }
  // September (8), October (9), November (10) -> Autumn
  if (month >= 8 && month <= 10) {
    return 'Autumn';
  }
  // December (11), January (0), February (1) -> Winter
  return 'Winter';
}

/**
 * Returns the current month name.
 */
export function getCurrentMonthName(date: Date = new Date()): string {
  return MONTH_NAMES[date.getMonth()];
}

/**
 * Checks if a specific ingredient is in season given the current or specified date.
 */
export function isIngredientInSeason(ingredient: Ingredient, date: Date = new Date()): boolean {
  if (ingredient.season === 'Perennial / Year-Round') {
    return true;
  }

  const currentSeason = getCurrentSeason(date);
  if (ingredient.season === currentSeason) {
    return true;
  }

  // Also check harvest window text (e.g. "August through October", "Late Summer", etc.)
  const windowLower = (ingredient.harvestWindow || '').toLowerCase();
  const currentMonthLower = getCurrentMonthName(date).toLowerCase();
  const currentMonthShort = currentMonthLower.slice(0, 3);
  const currentSeasonLower = currentSeason.toLowerCase();

  if (
    windowLower.includes(currentMonthLower) ||
    windowLower.includes(currentMonthShort) ||
    windowLower.includes(currentSeasonLower) ||
    windowLower.includes('year-round') ||
    windowLower.includes('perennial')
  ) {
    return true;
  }

  return false;
}

/**
 * Returns rich seasonal metadata and display properties for an ingredient.
 */
export function getSeasonalityInfo(ingredient: Ingredient, date: Date = new Date()): SeasonalityInfo {
  const currentMonthIndex = date.getMonth();
  const currentMonthName = MONTH_NAMES[currentMonthIndex];
  const currentYear = date.getFullYear();
  const currentSeason = getCurrentSeason(date);

  const isYearRound = ingredient.season === 'Perennial / Year-Round';
  const isInSeason = isIngredientInSeason(ingredient, date);
  const isPeakNow = !isYearRound && isInSeason;

  let badgeLabel = 'Off Season';
  let statusHeadline = `Harvests in ${ingredient.season}`;
  let detailedStatusText = `Currently in dormant/off-peak cycle. Prime harvest occurs in ${ingredient.season} (${ingredient.harvestWindow}).`;
  let accentColor = 'text-[#F5F5F0]/60';
  let badgeBgColor = 'bg-[#1E1E1E]/80';
  let badgeBorderColor = 'border-[#F5F5F0]/15';
  let badgeTextColor = 'text-[#F5F5F0]/60';

  if (isPeakNow) {
    badgeLabel = 'In Season Now';
    statusHeadline = `Peak ${currentSeason} Harvest`;
    detailedStatusText = `Currently in prime harvest season right now in ${currentMonthName} ${currentYear} (${ingredient.harvestWindow}). Maximum volatile aromatics and potency.`;
    accentColor = 'text-emerald-400';
    badgeBgColor = 'bg-emerald-950/80';
    badgeBorderColor = 'border-emerald-500/50';
    badgeTextColor = 'text-emerald-300';
  } else if (isYearRound) {
    badgeLabel = 'Year-Round';
    statusHeadline = 'Available Year-Round';
    detailedStatusText = `Continuous year-round cellar maturation and perennial harvest (${ingredient.harvestWindow}). Consistently available at peak standard.`;
    accentColor = 'text-[#C5A059]';
    badgeBgColor = 'bg-[#C5A059]/15';
    badgeBorderColor = 'border-[#C5A059]/40';
    badgeTextColor = 'text-[#C5A059]';
  }

  const seasonsTrack: SeasonalityInfo['seasonsTrack'] = [
    {
      id: 'Spring',
      name: 'Spring',
      months: 'Mar – May',
      isCurrent: currentSeason === 'Spring',
      isHarvestSeason: ingredient.season === 'Spring' || isYearRound,
    },
    {
      id: 'Summer',
      name: 'Summer',
      months: 'Jun – Aug',
      isCurrent: currentSeason === 'Summer',
      isHarvestSeason: ingredient.season === 'Summer' || isYearRound,
    },
    {
      id: 'Autumn',
      name: 'Autumn',
      months: 'Sep – Nov',
      isCurrent: currentSeason === 'Autumn',
      isHarvestSeason: ingredient.season === 'Autumn' || isYearRound,
    },
    {
      id: 'Winter',
      name: 'Winter',
      months: 'Dec – Feb',
      isCurrent: currentSeason === 'Winter',
      isHarvestSeason: ingredient.season === 'Winter' || isYearRound,
    },
  ];

  return {
    isInSeason,
    isPeakNow,
    isYearRound,
    currentSeason,
    currentMonthName,
    currentMonthIndex,
    currentYear,
    badgeLabel,
    statusHeadline,
    detailedStatusText,
    harvestWindow: ingredient.harvestWindow || `${ingredient.season} cycle`,
    accentColor,
    badgeBgColor,
    badgeBorderColor,
    badgeTextColor,
    seasonsTrack,
  };
}

/**
 * Returns the season icon component for a harvest season
 */
export function getSeasonIcon(season: HarvestSeason) {
  switch (season) {
    case 'Spring':
      return Leaf;
    case 'Summer':
      return Sun;
    case 'Autumn':
      return CloudRain;
    case 'Winter':
      return Snowflake;
    case 'Perennial / Year-Round':
      return Sparkles;
    default:
      return Calendar;
  }
}
