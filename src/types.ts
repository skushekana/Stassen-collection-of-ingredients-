export type IngredientCategory =
  | 'Rare Spices'
  | 'Foraged Botanicals'
  | 'Heritage Salts & Minerals'
  | 'Ferments & Vinegars'
  | 'Ancient Grains & Seeds'
  | 'Wild Fungi & Truffles'
  | 'Specialty Oils & Fats'
  | 'Cultivated Teas & Tisanes'
  | 'Artisanal Nectars & Sugars';

export type WorldRegion =
  | 'East Asia'
  | 'Mediterranean & Southern Europe'
  | 'Nordic & Boreal'
  | 'South Asia & Indian Ocean'
  | 'Levant & North Africa'
  | 'The Americas'
  | 'Oceania & Highlands';

export type HarvestSeason =
  | 'Spring'
  | 'Summer'
  | 'Autumn'
  | 'Winter'
  | 'Perennial / Year-Round';

export type RarityLevel =
  | 'Heirloom Selection'
  | 'Regional Specialty'
  | 'Rare Seasonal Harvest'
  | 'Ultra Rare Reserve';

export interface FlavorProfile {
  umami: number;     // 0 - 100
  aroma: number;     // 0 - 100
  acidity: number;   // 0 - 100
  sweetness: number; // 0 - 100
  bitterness: number;// 0 - 100
  pungency: number;  // 0 - 100
  depth: number;     // 0 - 100
}

export interface ContentSEOInfo {
  title?: string;
  description?: string;
  keywords?: string[];
  canonicalUrl?: string;
  ogImage?: string;
  structuredData?: Record<string, any>;
}

export interface FlavorPairing {
  ingredient: string;
  harmony: string;
  note: string;
}

export interface Ingredient {
  id: string;
  slug?: string;
  name: string;
  scientificName?: string;
  category: IngredientCategory;
  origin: string;
  region: WorldRegion;
  country: string;
  season: HarvestSeason;
  harvestWindow: string;
  flavorNotes: string[];
  flavorProfile: FlavorProfile;
  imageUrl: string;
  image?: string; // Schema alias for imageUrl
  galleryImages?: string[];
  videoUrl?: string;
  overview?: string;
  description: string;
  terroir: string;
  culinaryApplications: string[];
  pairings: FlavorPairing[];
  relatedIngredientIds: string[];
  aliases?: string[]; // Botanical, regional, or multilingual aliases
  relatedRecipeIds?: string[]; // IDs of recipes featuring this specimen
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
  seo?: ContentSEOInfo;
  rarityIndex: RarityLevel;
  storageAdvice: string;
  curatorNotes?: string;
  harvestMethod?: string;
}

export interface RegionInfo {
  id: WorldRegion;
  name: string;
  subtitle: string;
  description: string;
  climate: string;
  coordinates: { x: number; y: number }; // percentage on stylized map
  featuredIngredientsCount?: number;
}

export type ToolCategory =
  | 'Cutlery'
  | 'Cookware'
  | 'Precision Gauge'
  | 'Extraction & Sieve'
  | 'Plating & Finishing';

export interface CulinaryTool {
  id: string;
  name: string;
  category: ToolCategory;
  material: string;
  purpose: string;
  proTip?: string;
}

export interface IngredientAddition {
  ingredientName: string;
  amount: string;
  technique: string;
  timingNote?: string;
}

export interface MasterclassStep {
  stepNumber: number;
  timeOffsetFormatted?: string;
  timeOffsetSeconds?: number;
  title: string;
  stepTitle?: string;
  actionDescription: string;
  durationMinutes?: number;
  techniqueTip?: string;
  ingredientAdditions?: IngredientAddition[];
  toolsUsed?: string[];
  criticalControlPoint?: string;
  sensoryCue?: string;
  sensoryCues?: string;
  soundscapeType?: 'sizzle' | 'chop' | 'simmer' | 'drizzle' | 'whisk' | 'flame' | 'plating';
  imageUrl?: string;
  videoDurationSeconds?: number;
  spokenNarration?: string;
}

export interface CulinaryMasterclass {
  id: string;
  slug?: string;
  primaryIngredientId: string;
  primaryIngredientSlug?: string;
  primaryIngredientName: string;
  dishTitle: string;
  name?: string; // Schema alias for dishTitle
  subtitle: string;
  cuisine?: string;
  countryRegion?: string;
  category?: string; // Schema alias for courseCategory or general category
  recipeNumber?: number;
  aiImagePrompt?: string;
  tags?: string[];
  overview: string;
  description?: string; // Schema alias for overview
  chefRationale: string;
  difficulty: 'Easy' | 'Intermediate' | 'Advanced' | 'Master' | 'Artisanal Selection' | 'Grand Master Atelier' | 'Haute Gastronomy';
  servings: number;
  totalPrepTimeMinutes: number;
  totalCookTimeMinutes: number;
  overallDurationFormatted: string;
  flavorAromaProfile: {
    umami: number;
    acidity: number;
    aromaticIntensity: number;
    textureComplexity: number;
    finishLength: number;
  };
  requiredTools: CulinaryTool[];
  ingredientsList: {
    name: string;
    amount: string;
    prepState: string;
    addedAtMinute: number;
    isArchiveSpecialty: boolean;
    ingredientId?: string;
    ingredientSlug?: string;
  }[];
  ingredients?: any[]; // Schema alias for ingredientsList
  timelineSteps: MasterclassStep[];
  instructions?: (MasterclassStep | string)[]; // Schema alias for timelineSteps
  platingPresentation: string;
  sommelierPairing: {
    vintage: string;
    terroir: string;
    tastingNote: string;
  };
  courseCategory?: 'Amuse-Bouche' | 'Cold Appetizer' | 'Warm Entrée' | 'Intermezzo' | 'Main Course' | 'Botanical Dessert';
  nutritionalProfile?: {
    calories: number;
    proteinGrams: number;
    carbsGrams: number;
    fatGrams: number;
    artisanalSodiumMg: number;
  };
  heroImageUrl?: string;
  imageUrl?: string; // Schema alias for heroImageUrl
  image?: string; // Schema alias for heroImageUrl
  galleryImages?: string[];
  videoReelUrl?: string;
  trendScore?: number; // e.g. 99.9 / 100
  hotnessRank?: number; // e.g. 1 (Page 1 top showcase)
  isHottest?: boolean;
  awardBadge?: string; // e.g. "Trending No. 1 • 3-Star Michelin Masterpiece"
  relatedIngredientIds?: string[];
  relatedRecipeIds?: string[];
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
  seo?: ContentSEOInfo;
  createdAt: string;
  isBookmarked?: boolean;
}

export interface SubstitutionOption {
  name: string;
  scientificName?: string;
  ratio: string; // e.g. "1:1 by volume" or "1 tsp per saffron pinch"
  flavorDelta: string; // e.g. "Earthy and herbaceous; slightly less metallic-floral"
  bestUsedFor: string; // e.g. "Paellas, broths, grain pilafs"
  culinaryAdjustmentTip: string; // e.g. "Add a drop of lemon juice and a pinch of ground sumac"
  matchingIngredientId?: string; // If in the archive
}

export interface ShoppingListItem {
  id: string;
  name: string;
  amount?: string;
  category: string;
  ingredientId?: string;
  isArchiveSpecialty?: boolean;
  completed: boolean;
  notes?: string;
  recipeSource?: string;
  addedAt: string;
}

export interface PantryItemEntry {
  ingredientId: string;
  inStock: boolean;
  stockLevel?: 'Full' | 'Moderate' | 'Low' | 'Reserve Only';
  customNotes?: string;
  dateAdded: string;
  lastUsed?: string;
  storageLocation?: 'Dry Cellar' | 'Spice Vault' | 'Cold Room' | 'Fermentation Cabinet';
}

export type AppView =
  | 'home'
  | 'collection'
  | 'ingredient-detail'
  | 'recipes-archive'
  | 'recipe-detail'
  | 'categories-index'
  | 'category-detail'
  | 'locations'
  | 'about'
  | 'contact'
  | 'privacy'
  | 'search-results'
  | 'my-pantry'
  | 'seasonal-calendar'
  | 'shopping-list'
  | 'what-can-i-cook'
  | 'admin-ads';

export type CategoryType = 'ingredient' | 'recipe';

export interface CategoryDefinition {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  type: CategoryType;
  description: string;
  seoTitle: string;
  seoDescription: string;
  iconName?: string;
  heroImageUrl?: string;
  accentColor?: string;
  parentGroup?: string;
}

export type DeviceCategory = 'desktop' | 'tablet' | 'mobile';

export type AdFrequencyMode =
  | 'once_per_session'
  | 'once_per_x_minutes'
  | 'once_per_x_hours'
  | 'once_per_day'
  | 'custom';

export type CooldownUnit = 'minutes' | 'hours' | 'days';

export type SocialBarPosition = 'top' | 'bottom';

export interface AdSettings {
  // Master switches
  enabled: boolean;
  emergencyDisabled: boolean;
  testMode: boolean;

  // Format switches
  popunderEnabled: boolean;
  socialBarEnabled: boolean;
  nativeBannerEnabled: boolean;

  // Device targeting
  desktopEnabled: boolean;
  tabletEnabled: boolean;
  mobileEnabled: boolean;

  // Popunder-specific device overrides
  popunderDesktop: boolean;
  popunderTablet: boolean;
  popunderMobile: boolean;

  // Social Bar-specific device overrides
  socialBarDesktop: boolean;
  socialBarTablet: boolean;
  socialBarMobile: boolean;

  // Popunder Frequency & Limits
  popunderFrequencyMode: AdFrequencyMode;
  popunderCooldownValue: number; // e.g., 60
  popunderCooldownUnit: CooldownUnit; // 'minutes'
  popunderSessionMax: number; // e.g., 2
  popunderDailyMax: number; // e.g., 5

  // Social Bar Frequency & Limits
  socialBarPosition: SocialBarPosition;
  socialBarFrequencyMode: AdFrequencyMode;
  socialBarCooldownMinutes: number; // e.g., 30
  socialBarSessionMax: number; // e.g., 3
  socialBarDailyMax: number; // e.g., 8

  // Page Targeting: Allowed vs Blocked routes
  publicPagesEnabled: boolean;
  dashboardPagesEnabled: boolean; // default false (keep SaaS/app clean)
  allowedPages: string[]; // e.g. ['home', 'collection', 'recipes-archive', 'locations', 'about', 'contact', 'privacy', 'seasonal-calendar', 'shopping-list', 'search-results', 'ingredient-detail']
  blockedPages: string[]; // e.g. ['admin', 'admin-ads', 'app', 'dashboard', 'settings', 'billing', 'auth', 'checkout', 'cook-modal']

  // Adsterra Real Scripts (inserted via configuration fields)
  popunderScript: string;
  socialBarScript: string;
  nativeBannerScript: string;
  
  // Custom Direct Script URL (fallback / alternative)
  popunderDirectUrl?: string;
  socialBarDirectUrl?: string;

  // Metadata
  lastUpdated: string;
  updatedBy?: string;
}

export interface AdFrequencyState {
  lastPopunderTimestamp: number;
  lastSocialBarTimestamp: number;
  sessionPopunderCount: number;
  sessionSocialBarCount: number;
  dailyPopunderCount: number;
  dailySocialBarCount: number;
  lastActiveDay: string; // YYYY-MM-DD
}

export interface AdsterraAnalyticsMetric {
  impressions: number;
  clicks: number;
  cpm: number;
  ctr: number;
  estimatedRevenue: number;
  page: string;
  device: DeviceCategory;
  date: string;
  adFormat: 'popunder' | 'social_bar' | 'native_banner';
}


