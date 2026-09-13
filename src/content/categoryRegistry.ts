import { Ingredient, CulinaryMasterclass, CategoryDefinition, CategoryType } from '../types';
import { createSlug } from '../utils/slug';

/**
 * Predicate interface for data-driven categorization
 */
interface CategoryRule extends CategoryDefinition {
  matchIngredient?: (item: Ingredient) => boolean;
  matchRecipe?: (item: CulinaryMasterclass) => boolean;
}

/**
 * Standard normalized string helper
 */
function norm(str?: string): string {
  if (!str) return '';
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
}

/**
 * Canonical Category Definitions & Data-Driven Rules
 * Strictly derived from existing content and culinary taxonomy.
 */
const CANONICAL_CATEGORY_RULES: CategoryRule[] = [
  // ==========================================
  // INGREDIENT CATEGORIES & CULINARY GROUPS
  // ==========================================
  {
    id: 'spices',
    slug: 'spices',
    name: 'Rare Spices & Aromatics',
    shortName: 'Spices',
    type: 'ingredient',
    parentGroup: 'Botanical Specimens',
    description: 'Ancient culinary aromatics, volatile seedpods, sun-dried barks, and subterranean rhizomes gathered from historic trade routes.',
    seoTitle: 'Rare Spices & Aromatics | Terroir Botanical Archive',
    seoDescription: 'Discover our rare spice collection featuring single-estate saffron, wild-foraged peppercorns, cured vanilla pods, and artisanal cardamom.',
    accentColor: '#D97706',
    iconName: 'Sparkles',
    heroImageUrl: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=1200&auto=format&fit=crop',
    matchIngredient: (item: Ingredient) => {
      const cat = norm(item.category);
      if (cat.includes('spice')) return true;
      const notes = (item.flavorNotes || []).map(norm).join(' ');
      const name = norm(item.name);
      return name.includes('saffron') || name.includes('pepper') || name.includes('cardamom') || name.includes('vanilla') || name.includes('cinnamon') || notes.includes('piquant');
    }
  },
  {
    id: 'herbs-botanicals',
    slug: 'herbs-botanicals',
    name: 'Foraged Botanicals & Mountain Herbs',
    shortName: 'Herbs',
    type: 'ingredient',
    parentGroup: 'Botanical Specimens',
    description: 'Wild sub-alpine herbs, coastal sea succulents, fragrant blossoms, and hand-gathered botanical shoots bursting with ethereal aromatic terpenes.',
    seoTitle: 'Foraged Botanicals & Mountain Herbs | Terroir Botanical Archive',
    seoDescription: 'Explore wild mountain herbs, edible alpine blossoms, foraged greens, and botanical leaves with unique microclimate sensory signatures.',
    accentColor: '#10B981',
    iconName: 'Leaf',
    heroImageUrl: 'https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?q=80&w=1200&auto=format&fit=crop',
    matchIngredient: (item: Ingredient) => {
      const cat = norm(item.category);
      if (cat.includes('botanical') || cat.includes('herb')) return true;
      const name = norm(item.name);
      return name.includes('herb') || name.includes('blossom') || name.includes('pine') || name.includes('leaf') || name.includes('succulent');
    }
  },
  {
    id: 'wild-fungi-truffles',
    slug: 'wild-fungi-truffles',
    name: 'Wild Fungi & Hypogeous Truffles',
    shortName: 'Fungi & Truffles',
    type: 'ingredient',
    parentGroup: 'Botanical Specimens',
    description: 'Uncultivated hypogeous truffles and primeval forest mushrooms hand-foraged with ancestral lagotto hounds along shaded temperate riverbanks.',
    seoTitle: 'Wild Fungi & Truffles | Terroir Botanical Archive',
    seoDescription: 'A premier archive of Alba white truffles, Perigord black diamonds, wild Nagano matsutake, and honeycombed forest morels.',
    accentColor: '#8B5CF6',
    iconName: 'Flame',
    heroImageUrl: 'https://images.unsplash.com/photo-1541544741938-0af808871cc0?q=80&w=1200&auto=format&fit=crop',
    matchIngredient: (item: Ingredient) => {
      const cat = norm(item.category);
      if (cat.includes('fungi') || cat.includes('truffle') || cat.includes('mushroom')) return true;
      const name = norm(item.name);
      return name.includes('truffle') || name.includes('matsutake') || name.includes('mushroom') || name.includes('morel') || name.includes('porcini');
    }
  },
  {
    id: 'ancient-grains-seeds',
    slug: 'ancient-grains-seeds',
    name: 'Ancient Grains, Heirloom Rices & Seeds',
    shortName: 'Grains & Seeds',
    type: 'ingredient',
    parentGroup: 'Botanical Specimens',
    description: 'Ancestral hull-less grains, volcanic altitude pseudo-cereals, and heritage carnaroli rices cellared for optimal starch and amylose balance.',
    seoTitle: 'Ancient Grains & Heirloom Seeds | Terroir Botanical Archive',
    seoDescription: 'Explore aged Acquerello carnaroli rices, ancestral farro monococcum, wild river rices, and unhybridized heirloom seeds.',
    accentColor: '#F59E0B',
    iconName: 'Layers',
    heroImageUrl: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?q=80&w=1200&auto=format&fit=crop',
    matchIngredient: (item: Ingredient) => {
      const cat = norm(item.category);
      if (cat.includes('grain') || cat.includes('seed')) return true;
      const name = norm(item.name);
      return name.includes('rice') || name.includes('carnaroli') || name.includes('farro') || name.includes('grain') || name.includes('seed');
    }
  },
  {
    id: 'specialty-oils-fats',
    slug: 'specialty-oils-fats',
    name: 'Specialty Oils & Alpine Dairy Fats',
    shortName: 'Oils & Fats',
    type: 'ingredient',
    parentGroup: 'Botanical Specimens',
    description: 'Centenarian cold-pressed stone-milled olive oils, cultured mountain pasture butter, and pristine oleic lipid carriers of volatile culinary essence.',
    seoTitle: 'Specialty Oils & Artisanal Fats | Terroir Botanical Archive',
    seoDescription: 'Discover single-cultivar extra virgin olive oils, churned alpine pasture butter, and artisanal culinary fats.',
    accentColor: '#EAB308',
    iconName: 'Droplet',
    heroImageUrl: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?q=80&w=1200&auto=format&fit=crop',
    matchIngredient: (item: Ingredient) => {
      const cat = norm(item.category);
      if (cat.includes('oil') || cat.includes('fat')) return true;
      const name = norm(item.name);
      return name.includes('oil') || name.includes('butter') || name.includes('tallow') || name.includes('lard') || name.includes('ghee');
    }
  },
  {
    id: 'ferments-vinegars',
    slug: 'ferments-vinegars',
    name: 'Secular Ferments, Misos & Aged Vinegars',
    shortName: 'Ferments & Vinegars',
    type: 'ingredient',
    parentGroup: 'Botanical Specimens',
    description: 'Decades-aged solera balsamicos, cedar-aged artisan shoyu, ancestral koji ferments, and living probiotics developed over generations.',
    seoTitle: 'Secular Ferments & Aged Vinegars | Terroir Botanical Archive',
    seoDescription: 'Explore traditional Modena balsamic vinegars, cellar-aged soy sauces, wood-fermented misos, and historical garums.',
    accentColor: '#EC4899',
    iconName: 'RefreshCw',
    heroImageUrl: 'https://images.unsplash.com/photo-1589135233689-d56d11b22e18?q=80&w=1200&auto=format&fit=crop',
    matchIngredient: (item: Ingredient) => {
      const cat = norm(item.category);
      if (cat.includes('ferment') || cat.includes('vinegar')) return true;
      const name = norm(item.name);
      return name.includes('vinegar') || name.includes('aceto') || name.includes('balsamico') || name.includes('miso') || name.includes('shoyu') || name.includes('garum');
    }
  },
  {
    id: 'heritage-salts-minerals',
    slug: 'heritage-salts-minerals',
    name: 'Heritage Salts, Minerals & Caviar',
    shortName: 'Salts & Minerals',
    type: 'ingredient',
    parentGroup: 'Botanical Specimens',
    description: 'Hand-raked Atlantic fleur de sel, primeval mineral salt domes, and pristine royal sturgeon caviars harvested under ecological stewardship.',
    seoTitle: 'Heritage Salts, Minerals & Caviar | Terroir Botanical Archive',
    seoDescription: 'Archival salt pan crystals, hand-skimmed fleur de sel de Guérande, ancient pink mountain salts, and sustainable imperial caviars.',
    accentColor: '#3B82F6',
    iconName: 'Shield',
    heroImageUrl: 'https://images.unsplash.com/photo-1518110925495-5fe2fda0442c?q=80&w=1200&auto=format&fit=crop',
    matchIngredient: (item: Ingredient) => {
      const cat = norm(item.category);
      if (cat.includes('salt') || cat.includes('mineral')) return true;
      const name = norm(item.name);
      return name.includes('salt') || name.includes('sel') || name.includes('caviar') || name.includes('mineral');
    }
  },
  {
    id: 'cultivated-teas-beverages',
    slug: 'cultivated-teas-beverages',
    name: 'Cultivated Teas, Tisanes & Elixirs',
    shortName: 'Teas & Beverages',
    type: 'ingredient',
    parentGroup: 'Botanical Specimens',
    description: 'Ceremonial shade-grown stone-ground tencha matchas, high-mountain wild oolongs, and single-origin botanical infusions.',
    seoTitle: 'Cultivated Teas & Herbal Tisanes | Terroir Botanical Archive',
    seoDescription: 'Rare Kyoto ceremonial matcha, ancient tree pu-erhs, foraged mountain herbal teas, and single-harvest botanical infusions.',
    accentColor: '#14B8A6',
    iconName: 'Coffee',
    heroImageUrl: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?q=80&w=1200&auto=format&fit=crop',
    matchIngredient: (item: Ingredient) => {
      const cat = norm(item.category);
      if (cat.includes('tea') || cat.includes('tisane') || cat.includes('beverage')) return true;
      const name = norm(item.name);
      return name.includes('tea') || name.includes('matcha') || name.includes('tisane') || name.includes('infusion');
    }
  },
  {
    id: 'artisanal-nectars-sugars',
    slug: 'artisanal-nectars-sugars',
    name: 'Artisanal Nectars, Forest Honeys & Sugars',
    shortName: 'Sweeteners & Sugars',
    type: 'ingredient',
    parentGroup: 'Botanical Specimens',
    description: 'Single-source mountain forest honeys, ancestral unrefined cane sugars, and cold-extracted woodland tree saps.',
    seoTitle: 'Artisanal Nectars & Heritage Sugars | Terroir Botanical Archive',
    seoDescription: 'Discover monofloral wild forest honeys, traditional Japanese wasanbon sugars, and organic birch and maple nectars.',
    accentColor: '#F97316',
    iconName: 'Sparkles',
    heroImageUrl: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?q=80&w=1200&auto=format&fit=crop',
    matchIngredient: (item: Ingredient) => {
      const cat = norm(item.category);
      if (cat.includes('nectar') || cat.includes('sugar') || cat.includes('sweetener')) return true;
      const name = norm(item.name);
      return name.includes('honey') || name.includes('nectar') || name.includes('sugar') || name.includes('wasanbon') || name.includes('syrup');
    }
  },

  // ==========================================
  // RECIPE CATEGORIES (CULINARY MASTERCLASSES)
  // ==========================================
  {
    id: 'dinner',
    slug: 'dinner',
    name: 'Signature Dinners & Main Courses',
    shortName: 'Dinner & Mains',
    type: 'recipe',
    parentGroup: 'Culinary Masterclasses',
    description: 'Michelin-grade signature evening masterclasses featuring exquisite centerpieces, roasted game, slow-braised cuts, and delicate seafood compositions.',
    seoTitle: 'Signature Dinners & Haute Cuisine Mains | Recipe Archive',
    seoDescription: 'Master 3-star Michelin dinner recipes including 24k saffron risotto, butter chicken, Neapolitan pizzas, and dry-aged Wagyu beef.',
    accentColor: '#C5A059',
    iconName: 'ChefHat',
    heroImageUrl: 'https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?q=80&w=1200&auto=format&fit=crop',
    matchRecipe: (item: CulinaryMasterclass) => {
      const course = norm(item.courseCategory || item.category);
      if (course === 'main course' || course === 'dinner' || course === 'mains') return true;
      const tags = (item.tags || []).map(norm);
      const title = norm(item.dishTitle);
      return (
        tags.includes('risotto') ||
        tags.includes('pizza') ||
        tags.includes('pasta') ||
        tags.includes('curry') ||
        tags.includes('biryani') ||
        tags.includes('paella') ||
        tags.includes('wagyu') ||
        tags.includes('beef') ||
        tags.includes('chicken') ||
        title.includes('risotto') ||
        title.includes('curry') ||
        title.includes('pizza') ||
        title.includes('steak') ||
        title.includes('rendang') ||
        title.includes('goulash') ||
        title.includes('biryani')
      );
    }
  },
  {
    id: 'lunch',
    slug: 'lunch',
    name: 'Midday Savory Dishes & Noodle Bowls',
    shortName: 'Lunch',
    type: 'recipe',
    parentGroup: 'Culinary Masterclasses',
    description: 'Vibrant, restorative midday masterclasses ranging from slow-simmered artisanal noodle bowls to hand-pressed street specialties.',
    seoTitle: 'Savory Lunch Dishes & Noodle Bowls | Recipe Archive',
    seoDescription: 'Discover refined lunch masterclasses including traditional tonkotsu ramen, Vietnamese pho bo, artisanal tacos, and wok-seared Pad Thai.',
    accentColor: '#0EA5E9',
    iconName: 'Clock',
    heroImageUrl: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?q=80&w=1200&auto=format&fit=crop',
    matchRecipe: (item: CulinaryMasterclass) => {
      const course = norm(item.courseCategory || item.category);
      if (course === 'lunch') return true;
      const tags = (item.tags || []).map(norm);
      const title = norm(item.dishTitle);
      return (
        tags.includes('ramen') ||
        tags.includes('pho') ||
        tags.includes('tacos') ||
        tags.includes('pad thai') ||
        tags.includes('noodles') ||
        tags.includes('burger') ||
        title.includes('ramen') ||
        title.includes('pho') ||
        title.includes('pad thai') ||
        title.includes('taco') ||
        title.includes('burger') ||
        title.includes('sandwich')
      );
    }
  },
  {
    id: 'soup',
    slug: 'soup',
    name: 'Artisanal Soups, Broths & Consommés',
    shortName: 'Soups & Broths',
    type: 'recipe',
    parentGroup: 'Culinary Masterclasses',
    description: 'Deep-extraction bone broths, crystalline dashi consommés, and aromatic lemongrass infusions balancing acid and umami.',
    seoTitle: 'Artisanal Soups, Ramens & Consommés | Recipe Archive',
    seoDescription: 'Technique-driven soup masterclasses from French onion soup gratinée and Japanese ramen to Thai tom yum and Vietnamese pho.',
    accentColor: '#F59E0B',
    iconName: 'Flame',
    heroImageUrl: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=1200&auto=format&fit=crop',
    matchRecipe: (item: CulinaryMasterclass) => {
      const course = norm(item.courseCategory || item.category);
      if (course === 'soup' || course === 'broth') return true;
      const tags = (item.tags || []).map(norm);
      const title = norm(item.dishTitle);
      return (
        tags.includes('soup') ||
        tags.includes('ramen') ||
        tags.includes('pho') ||
        tags.includes('consomme') ||
        tags.includes('broth') ||
        title.includes('soup') ||
        title.includes('ramen') ||
        title.includes('pho') ||
        title.includes('consomme') ||
        title.includes('tom yum') ||
        title.includes('chowder') ||
        title.includes('broth')
      );
    }
  },
  {
    id: 'salad',
    slug: 'salad',
    name: 'Seasonal Salads & Refreshing Crudités',
    shortName: 'Salads',
    type: 'recipe',
    parentGroup: 'Culinary Masterclasses',
    description: 'Crisp seasonal botanicals, cold-pressed vinaigrettes, and textured vegetable compositions showcasing fresh harvest biodiversity.',
    seoTitle: 'Seasonal Salads & Botanical Crudités | Recipe Archive',
    seoDescription: 'Master crisp seasonal salads, authentic Greek horiatiki, Caesar salad with white anchovies, and green papaya som tum.',
    accentColor: '#10B981',
    iconName: 'Leaf',
    heroImageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1200&auto=format&fit=crop',
    matchRecipe: (item: CulinaryMasterclass) => {
      const course = norm(item.courseCategory || item.category);
      if (course === 'salad') return true;
      const tags = (item.tags || []).map(norm);
      const title = norm(item.dishTitle);
      return (
        tags.includes('salad') ||
        title.includes('salad') ||
        title.includes('horiatiki') ||
        title.includes('caesar') ||
        title.includes('som tum')
      );
    }
  },
  {
    id: 'dessert',
    slug: 'dessert',
    name: 'Haute Pâtisserie & Artisanal Desserts',
    shortName: 'Desserts',
    type: 'recipe',
    parentGroup: 'Culinary Masterclasses',
    description: 'Precision pastry masterclasses exploring French lamination, Italian mascarpone sabayons, Spanish churros, and Levantine filo syrups.',
    seoTitle: 'Haute Pâtisserie & Artisanal Desserts | Recipe Archive',
    seoDescription: 'Master classic desserts: authentic Italian Tiramisu, French Macarons, Turkish Baklava, Spanish Churros, and Mango Sticky Rice.',
    accentColor: '#EC4899',
    iconName: 'Sparkles',
    heroImageUrl: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?q=80&w=1200&auto=format&fit=crop',
    matchRecipe: (item: CulinaryMasterclass) => {
      const course = norm(item.courseCategory || item.category);
      if (course === 'dessert' || course === 'pastry') return true;
      const tags = (item.tags || []).map(norm);
      const title = norm(item.dishTitle);
      return (
        tags.includes('dessert') ||
        tags.includes('pastry') ||
        tags.includes('sweet') ||
        title.includes('tiramisu') ||
        title.includes('churros') ||
        title.includes('baklava') ||
        title.includes('macaron') ||
        title.includes('pavlova') ||
        title.includes('panna cotta') ||
        title.includes('dessert') ||
        title.includes('sticky rice')
      );
    }
  },
  {
    id: 'snack',
    slug: 'snack',
    name: 'Appetizers, Tapas & Heritage Starters',
    shortName: 'Starters & Snacks',
    type: 'recipe',
    parentGroup: 'Culinary Masterclasses',
    description: 'Bite-sized culinary preludes, Spanish coastal tapas, Levantine mezze spreads, and crisp Latin American starters designed to awaken the palate.',
    seoTitle: 'Gourmet Starters, Tapas & Appetizers | Recipe Archive',
    seoDescription: 'Elevate your entertaining with Peruvian ceviche, Spanish tapas, fresh guacamole, crisp bruschetta, and Vietnamese summer rolls.',
    accentColor: '#6366F1',
    iconName: 'Bookmark',
    heroImageUrl: 'https://images.unsplash.com/photo-1541529086526-db283c563270?q=80&w=1200&auto=format&fit=crop',
    matchRecipe: (item: CulinaryMasterclass) => {
      const course = norm(item.courseCategory || item.category);
      if (course === 'appetizer' || course === 'snack' || course === 'starter' || course === 'tapas') return true;
      const tags = (item.tags || []).map(norm);
      const title = norm(item.dishTitle);
      return (
        tags.includes('appetizer') ||
        tags.includes('snack') ||
        tags.includes('tapas') ||
        tags.includes('starter') ||
        title.includes('guacamole') ||
        title.includes('bruschetta') ||
        title.includes('ceviche') ||
        title.includes('spring roll') ||
        title.includes('falafel') ||
        title.includes('hummus') ||
        title.includes('tapas')
      );
    }
  },
  {
    id: 'sauce',
    slug: 'sauce',
    name: 'Essential Sauces, Pestos & Emulsions',
    shortName: 'Sauces & Condiments',
    type: 'recipe',
    parentGroup: 'Culinary Masterclasses',
    description: 'Foundational culinary building blocks: stone-ground pestos, warm fondutas, piquant chimichurris, and classic reduction sauces.',
    seoTitle: 'Essential Sauces, Pestos & Emulsions | Recipe Archive',
    seoDescription: 'Master world-class culinary sauces: mortar-pestle Pesto Genovese, Argentine Chimichurri, Hollaise, and reduction veloutés.',
    accentColor: '#84CC16',
    iconName: 'Droplet',
    heroImageUrl: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?q=80&w=1200&auto=format&fit=crop',
    matchRecipe: (item: CulinaryMasterclass) => {
      const course = norm(item.courseCategory || item.category);
      if (course === 'sauce' || course === 'condiment') return true;
      const tags = (item.tags || []).map(norm);
      const title = norm(item.dishTitle);
      return (
        tags.includes('sauce') ||
        tags.includes('pesto') ||
        tags.includes('condiment') ||
        title.includes('pesto') ||
        title.includes('sauce') ||
        title.includes('chimichurri') ||
        title.includes('fonduta')
      );
    }
  },
  {
    id: 'baking',
    slug: 'baking',
    name: 'Artisanal Baking, Flatbreads & Doughs',
    shortName: 'Baking & Doughs',
    type: 'recipe',
    parentGroup: 'Culinary Masterclasses',
    description: 'Long-fermentation sourdoughs, Neapolitan wood-fired doughs, French laminated viennoiserie, and tandoori naan masterclasses.',
    seoTitle: 'Artisanal Baking, Flatbreads & Crusts | Recipe Archive',
    seoDescription: 'Master wood-fired pizza doughs, traditional Indian naan, French croissants, and flaky laminated pastries.',
    accentColor: '#D97706',
    iconName: 'Layers',
    heroImageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=1200&auto=format&fit=crop',
    matchRecipe: (item: CulinaryMasterclass) => {
      const course = norm(item.courseCategory || item.category);
      if (course === 'baking' || course === 'bread') return true;
      const tags = (item.tags || []).map(norm);
      const title = norm(item.dishTitle);
      return (
        tags.includes('baking') ||
        tags.includes('bread') ||
        tags.includes('dough') ||
        title.includes('pizza') ||
        title.includes('naan') ||
        title.includes('bread') ||
        title.includes('croissant') ||
        title.includes('dough')
      );
    }
  },
  {
    id: 'breakfast',
    slug: 'breakfast',
    name: 'Morning Brunches & Awakening Dishes',
    shortName: 'Breakfast & Brunch',
    type: 'recipe',
    parentGroup: 'Culinary Masterclasses',
    description: 'Elevated morning gastronomy: cast-iron skillet shakshukas, Mexican chilaquiles, soft-scrambled French eggs, and breakfast elixirs.',
    seoTitle: 'Morning Brunches & Awakening Dishes | Recipe Archive',
    seoDescription: 'Master brunch favorites: Shakshuka with poached eggs, Chilaquiles Verdes, French Omelettes, and superfood bowls.',
    accentColor: '#F59E0B',
    iconName: 'Calendar',
    heroImageUrl: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?q=80&w=1200&auto=format&fit=crop',
    matchRecipe: (item: CulinaryMasterclass) => {
      const course = norm(item.courseCategory || item.category);
      if (course === 'breakfast' || course === 'brunch') return true;
      const tags = (item.tags || []).map(norm);
      const title = norm(item.dishTitle);
      return (
        tags.includes('breakfast') ||
        tags.includes('brunch') ||
        tags.includes('egg') ||
        title.includes('shakshuka') ||
        title.includes('chilaquiles') ||
        title.includes('omelette') ||
        title.includes('pancake') ||
        title.includes('breakfast')
      );
    }
  },
  {
    id: 'beverage',
    slug: 'beverage',
    name: 'Elixirs, Artisanal Teas & Infusions',
    shortName: 'Beverages',
    type: 'recipe',
    parentGroup: 'Culinary Masterclasses',
    description: 'Traditional ceremonial whisked matcha, slow cold-brewed tisanes, botanical shrubs, and gastronomic non-alcoholic pairings.',
    seoTitle: 'Elixirs, Ceremonial Teas & Infusions | Recipe Archive',
    seoDescription: 'Explore traditional Japanese matcha ceremonies, botanical tisanes, and artisanal refreshing drinks.',
    accentColor: '#14B8A6',
    iconName: 'Coffee',
    heroImageUrl: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?q=80&w=1200&auto=format&fit=crop',
    matchRecipe: (item: CulinaryMasterclass) => {
      const course = norm(item.courseCategory || item.category);
      if (course === 'beverage' || course === 'drink') return true;
      const tags = (item.tags || []).map(norm);
      const title = norm(item.dishTitle);
      return (
        tags.includes('beverage') ||
        tags.includes('tea') ||
        tags.includes('matcha') ||
        title.includes('matcha') ||
        title.includes('tea') ||
        title.includes('cocktail') ||
        title.includes('elixir')
      );
    }
  }
];

export interface CuisineSummary {
  name: string;
  slug: string;
  recipeCount: number;
  country?: string;
  heroImageUrl?: string;
}

/**
 * High-performance, data-driven Category Registry
 */
export class CategoryRegistry {
  private categories: Map<string, CategoryRule> = new Map();
  private slugToIdMap: Map<string, string> = new Map();

  // Cached item mappings: Category ID -> Set of item IDs
  private ingredientCategoryCache: Map<string, Set<string>> = new Map();
  private recipeCategoryCache: Map<string, Set<string>> = new Map();

  // Reference storage
  private allIngredients: Ingredient[] = [];
  private allRecipes: CulinaryMasterclass[] = [];
  private isInitialized = false;

  constructor() {
    CANONICAL_CATEGORY_RULES.forEach((rule) => {
      this.categories.set(rule.id, rule);
      this.slugToIdMap.set(rule.slug.toLowerCase(), rule.id);
    });
  }

  /**
   * Initialize or update dataset references and build high-speed lookup indices
   */
  public initialize(ingredients: Ingredient[], recipes: CulinaryMasterclass[]): void {
    this.allIngredients = ingredients;
    this.allRecipes = recipes;
    this.rebuildIndices();
    this.isInitialized = true;
  }

  /**
   * Rebuild the item-to-category associations in O(N) time
   */
  public rebuildIndices(): void {
    this.ingredientCategoryCache.clear();
    this.recipeCategoryCache.clear();

    // Initialize empty sets for each category
    this.categories.forEach((cat, id) => {
      if (cat.type === 'ingredient') {
        this.ingredientCategoryCache.set(id, new Set<string>());
      } else {
        this.recipeCategoryCache.set(id, new Set<string>());
      }
    });

    // 1. Index Ingredients
    for (const ing of this.allIngredients) {
      let matched = false;
      for (const [id, rule] of this.categories.entries()) {
        if (rule.type === 'ingredient' && rule.matchIngredient && rule.matchIngredient(ing)) {
          this.ingredientCategoryCache.get(id)?.add(ing.id);
          matched = true;
          // Assign to primary match to prevent duplicate conflicting assignments
          break;
        }
      }
      // Safe fallback to 'spices' or 'herbs-botanicals' if unassigned
      if (!matched) {
        this.ingredientCategoryCache.get('herbs-botanicals')?.add(ing.id);
      }
    }

    // 2. Index Recipes
    for (const rec of this.allRecipes) {
      let matched = false;
      for (const [id, rule] of this.categories.entries()) {
        if (rule.type === 'recipe' && rule.matchRecipe && rule.matchRecipe(rec)) {
          this.recipeCategoryCache.get(id)?.add(rec.id);
          matched = true;
          // Assign to primary canonical match
          break;
        }
      }
      // Safe fallback to dinner/mains if unassigned
      if (!matched) {
        this.recipeCategoryCache.get('dinner')?.add(rec.id);
      }
    }
  }

  /**
   * Get all registered category definitions
   */
  public getAllCategories(type?: CategoryType): CategoryDefinition[] {
    const list = Array.from(this.categories.values());
    if (type) {
      return list.filter((c) => c.type === type);
    }
    return list;
  }

  /**
   * Get only ACTIVE categories (those that contain at least 1 verified item)
   * This strictly enforces the requirement:
   * "Ensure empty categories do not create useless indexable pages."
   */
  public getActiveCategories(type?: CategoryType): Array<CategoryDefinition & { itemCount: number }> {
    const all = this.getAllCategories(type);
    const active: Array<CategoryDefinition & { itemCount: number }> = [];

    for (const cat of all) {
      const count = this.getItemCount(cat.id, cat.type);
      if (count > 0) {
        active.push({ ...cat, itemCount: count });
      }
    }

    return active;
  }

  /**
   * Get category by slug or id
   */
  public getCategoryBySlug(slug: string, type?: CategoryType): CategoryDefinition | undefined {
    const clean = norm(slug);
    const id = this.slugToIdMap.get(clean) || clean;
    const cat = this.categories.get(id);
    if (!cat) return undefined;
    if (type && cat.type !== type) return undefined;
    return cat;
  }

  public getCategoryById(id: string): CategoryDefinition | undefined {
    return this.categories.get(id);
  }

  /**
   * Get total item count for category
   */
  public getItemCount(categoryIdOrSlug: string, type?: CategoryType): number {
    const cat = this.getCategoryBySlug(categoryIdOrSlug, type);
    if (!cat) return 0;
    if (cat.type === 'ingredient') {
      return this.ingredientCategoryCache.get(cat.id)?.size || 0;
    } else {
      return this.recipeCategoryCache.get(cat.id)?.size || 0;
    }
  }

  /**
   * Retrieve all items belonging to a category
   */
  public getItemsForCategory(
    categorySlugOrId: string,
    type?: CategoryType
  ): { ingredients: Ingredient[]; recipes: CulinaryMasterclass[]; category: CategoryDefinition | undefined } {
    const cat = this.getCategoryBySlug(categorySlugOrId, type);
    if (!cat) {
      return { ingredients: [], recipes: [], category: undefined };
    }

    if (cat.type === 'ingredient') {
      const idSet = this.ingredientCategoryCache.get(cat.id) || new Set<string>();
      const ingredients = this.allIngredients.filter((i) => idSet.has(i.id));
      return { ingredients, recipes: [], category: cat };
    } else {
      const idSet = this.recipeCategoryCache.get(cat.id) || new Set<string>();
      const recipes = this.allRecipes.filter((r) => idSet.has(r.id));
      return { ingredients: [], recipes, category: cat };
    }
  }

  /**
   * Deterministically find the canonical category for any given ingredient
   */
  public getCategoryForIngredient(ingredient: Ingredient): CategoryDefinition {
    for (const [id, rule] of this.categories.entries()) {
      if (rule.type === 'ingredient' && rule.matchIngredient && rule.matchIngredient(ingredient)) {
        return rule;
      }
    }
    return this.categories.get('herbs-botanicals')!;
  }

  /**
   * Deterministically find the canonical category for any given recipe
   */
  public getCategoryForRecipe(recipe: CulinaryMasterclass): CategoryDefinition {
    for (const [id, rule] of this.categories.entries()) {
      if (rule.type === 'recipe' && rule.matchRecipe && rule.matchRecipe(recipe)) {
        return rule;
      }
    }
    return this.categories.get('dinner')!;
  }

  /**
   * Get related categories for contextual cross-linking and circular discovery
   */
  public getRelatedCategories(category: CategoryDefinition, limit = 4): CategoryDefinition[] {
    const active = this.getActiveCategories(category.type);
    return active.filter((c) => c.id !== category.id).slice(0, limit);
  }

  /**
   * Extract all active global cuisines with real counts
   */
  public getActiveCuisines(): CuisineSummary[] {
    const cuisineMap = new Map<string, number>();

    for (const recipe of this.allRecipes) {
      if (recipe.cuisine) {
        const clean = recipe.cuisine.trim();
        cuisineMap.set(clean, (cuisineMap.get(clean) || 0) + 1);
      }
    }

    const list: CuisineSummary[] = [];
    cuisineMap.forEach((count, name) => {
      const slug = createSlug(name);
      list.push({
        name,
        slug,
        recipeCount: count
      });
    });

    return list.sort((a, b) => b.recipeCount - a.recipeCount);
  }
}

export const categoryRegistry = new CategoryRegistry();
