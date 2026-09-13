import { CulinaryMasterclass, Ingredient } from '../types';
import { INITIAL_RECIPES } from '../data/recipes';
import { INITIAL_INGREDIENTS } from '../data/ingredients';
import { ALL_50_WORLD_RECIPES } from '../data/world50';
import { createSlug, getRecipeSlug, ensureUniqueSlug } from '../utils/slug';
import { getRecipeFallbackChain, isValidImageUrl } from '../utils/imageFallback';
import { validateRecipe } from '../content/validator';
import { relationshipManager } from '../content/relationshipManager';
import { ValidationResult } from '../content/schema';
import { ingredientService } from './ingredientService';
import { contentRegistry } from '../content/contentRegistry';
import { searchEngine } from '../content/searchEngine';
import { internalLinkingEngine } from '../content/internalLinkingEngine';

const STORAGE_KEY = 'stassens_culinary_recipes_v4';
const BOOKMARKS_KEY = 'stassens_bookmarked_recipes_v4';

// World Cuisines for generative diversity and comprehensive regional filtering
export const CUISINE_REGIONS = [
  'All Cuisines',
  'Italian',
  'Japanese',
  'Thai',
  'Indian',
  'Mexican',
  'American',
  'French',
  'Spanish',
  'Chinese',
  'Vietnamese',
  'Greek',
  'Middle Eastern',
  'Moroccan',
  'Peruvian',
  'British',
  'Brazilian',
  'Argentine',
  'Austrian',
  'Hungarian',
  'West African',
  'South African',
  'Singaporean',
  'Indonesian',
  'Nordic & Boreal',
  'Modernist Gastronomy'
];

export const DIFFICULTY_LEVELS = [
  'All Difficulties',
  'Artisanal Selection',
  'Advanced',
  'Grand Master Atelier',
  'Haute Gastronomy'
];

const DISH_ARCHETYPES = [
  { archetype: 'Emulsified Hand-Cut Pasta Atelier', prep: 12, cook: 15, difficulty: 'Advanced' as const, course: 'Warm Entrée' as const },
  { archetype: 'Thermal Infused Velouté & Bone Broth', prep: 15, cook: 25, difficulty: 'Grand Master Atelier' as const, course: 'Amuse-Bouche' as const },
  { archetype: 'Wood-Fired Slow Braise & Glace Reduction', prep: 25, cook: 50, difficulty: 'Artisanal Selection' as const, course: 'Main Course' as const },
  { archetype: 'Cold-Extracted Crudo & Kobujime Curing', prep: 20, cook: 5, difficulty: 'Haute Gastronomy' as const, course: 'Cold Appetizer' as const },
  { archetype: 'Risottatura & Grain Mantecatura', prep: 15, cook: 22, difficulty: 'Advanced' as const, course: 'Warm Entrée' as const },
  { archetype: 'Botanical Confection & Sugar Glass Tuile', prep: 20, cook: 30, difficulty: 'Grand Master Atelier' as const, course: 'Botanical Dessert' as const },
  { archetype: 'Single-Estate Ferment & Glaze Glissade', prep: 15, cook: 20, difficulty: 'Artisanal Selection' as const, course: 'Main Course' as const },
  { archetype: 'Binchotan Smoked Terrine & Geleé Canopy', prep: 30, cook: 12, difficulty: 'Haute Gastronomy' as const, course: 'Cold Appetizer' as const },
  { archetype: 'Cryo-Concentrated Coulis & Herb Matrix', prep: 15, cook: 15, difficulty: 'Grand Master Atelier' as const, course: 'Intermezzo' as const },
  { archetype: 'Low-Temperature Sous-Vide Confit Ballotine', prep: 15, cook: 60, difficulty: 'Advanced' as const, course: 'Main Course' as const },
  { archetype: 'Seared Medallion with Pan-Deglazed Jus', prep: 10, cook: 18, difficulty: 'Artisanal Selection' as const, course: 'Main Course' as const },
  { archetype: 'Crispy Tartlet with Aerated Chiffon', prep: 20, cook: 15, difficulty: 'Grand Master Atelier' as const, course: 'Amuse-Bouche' as const },
  { archetype: 'Chilled Dashi Extraction & Citrus Gel', prep: 18, cook: 8, difficulty: 'Haute Gastronomy' as const, course: 'Cold Appetizer' as const },
  { archetype: 'Charcoal-Grilled Yakitori Skewer Glaze', prep: 15, cook: 12, difficulty: 'Artisanal Selection' as const, course: 'Warm Entrée' as const },
  { archetype: 'Steamed En Papillote with Wild Herb Vapor', prep: 10, cook: 20, difficulty: 'Advanced' as const, course: 'Main Course' as const },
  { archetype: 'Flambéed Reduction with Brown Butter Foam', prep: 12, cook: 16, difficulty: 'Grand Master Atelier' as const, course: 'Warm Entrée' as const },
  { archetype: 'Spiced Botanical Sabayon & Flaked Sea Salt', prep: 15, cook: 15, difficulty: 'Haute Gastronomy' as const, course: 'Botanical Dessert' as const },
  { archetype: 'Cold-Pressed Botanical Gazpacho Sphere', prep: 20, cook: 4, difficulty: 'Grand Master Atelier' as const, course: 'Intermezzo' as const },
  { archetype: 'Glazed Mille-Feuille of Crisp Botanical Shards', prep: 25, cook: 25, difficulty: 'Haute Gastronomy' as const, course: 'Botanical Dessert' as const },
  { archetype: 'Aromatic Salt-Crust Bake with Wild Thyme Emulsion', prep: 20, cook: 40, difficulty: 'Advanced' as const, course: 'Main Course' as const }
];

const SOMMELIER_PAIRING_LIBRARY = [
  { vintage: '2016 Domaine de la Romanée-Conti Grand Cru', terroir: 'Burgundy Côte de Nuits, France', tastingNote: 'Silken tannins with wild forest floor, dark cherry aromatics, and structured minerality.' },
  { vintage: '2018 Giacomo Conterno Barolo Riserva Monfortino', terroir: 'Piedmont Langhe, Italy', tastingNote: 'Notes of tar, crushed rose petals, iron minerality, and vibrant natural acidity.' },
  { vintage: '2019 Domaine Leflaive Chevalier-Montrachet Grand Cru', terroir: 'Puligny-Montrachet, France', tastingNote: 'Chiseled limestone tension, hazelnut brioche, and crystalline citrus precision.' },
  { vintage: 'Juyondai Ryusen Junmai Daiginjo Sake', terroir: 'Yamagata Prefecture, Japan', tastingNote: 'Velvety floral perfume with ripe melon, pristine soft spring water finish, and delicate umami.' },
  { vintage: '2015 Vega Sicilia Único Gran Reserva', terroir: 'Ribera del Duero, Spain', tastingNote: 'Complex cedarwood, ripe dark berries, roasted spices, and profound lingering finish.' },
  { vintage: '2020 Egon Müller Scharzhofberger Riesling Auslese', terroir: 'Mosel Saar Ruwer, Germany', tastingNote: 'Slate-driven electric acidity balanced by honeycomb richness and white orchard blossom.' },
  { vintage: '2014 Dom Pérignon P2 Plénitude Vintage Champagne', terroir: 'Épernay, Champagne, France', tastingNote: 'Toasted brioche, smoky flint minerality, energized bubbles, and saline lift.' },
  { vintage: '2017 Biondi-Santi Brunello di Montalcino Riserva', terroir: 'Tuscany, Italy', tastingNote: 'Austere elegance with savory balsamic notes, blood orange zest, and refined tannins.' },
  { vintage: '2019 Domaine Jean-Louis Chave Hermitage Blanc', terroir: 'Northern Rhône, France', tastingNote: 'Lush golden stonefruit, waxy marzipan, verbena, and rich palate-coating texture.' },
  { vintage: 'Aged 30-Year Bodegas Tradición Oloroso VORS', terroir: 'Jerez de la Frontera, Spain', tastingNote: 'Roasted walnut, dried fig, sea breeze iodine, and infinite dry rancio finish.' }
];

const CURATED_FOOD_IMAGES = [
  'https://images.unsplash.com/photo-1621996346565-e3d5d6281691?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1551183053-bf91a1d81141?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1514944298352-78d1283c7dc5?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1576092768241-dec231879fc3?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1587314168485-3236d6710814?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1541544741938-0af808871cc0?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1547592180-85f173990554?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1551218808-94e220e084d2?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1578474846511-04ba529f0b88?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1507048331197-7d4ac70811cf?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1546549032-9571cd6b27df?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=1200&auto=format&fit=crop'
];

// Curated step visual images categorized by cooking phase
export const STEP_PREP_IMAGES = [
  'https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=1200&auto=format&fit=crop', // Knife & cutting board prep
  'https://images.unsplash.com/photo-1507048331197-7d4ac70811cf?q=80&w=1200&auto=format&fit=crop', // Fresh botanical mise en place
  'https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=1200&auto=format&fit=crop', // Herb cleansing & seasoning
  'https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?q=80&w=1200&auto=format&fit=crop', // Precision vegetable incision
  'https://images.unsplash.com/photo-1547592180-85f173990554?q=80&w=1200&auto=format&fit=crop', // Chef prep workspace
  'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=1200&auto=format&fit=crop', // Whole spice mortar & pestle
];

export const STEP_COOK_IMAGES = [
  'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=1200&auto=format&fit=crop', // Sauté pan flame searing
  'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200&auto=format&fit=crop', // Simmering copper saucier
  'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1200&auto=format&fit=crop', // Binchotan grill caramelization
  'https://images.unsplash.com/photo-1574484284002-952d92456975?q=80&w=1200&auto=format&fit=crop', // Direct thermal conduction
  'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?q=80&w=1200&auto=format&fit=crop', // Slow broth extraction
  'https://images.unsplash.com/photo-1514944298352-78d1283c7dc5?q=80&w=1200&auto=format&fit=crop', // Gentle lipid poaching
];

export const STEP_REDUCTION_IMAGES = [
  'https://images.unsplash.com/photo-1621996346565-e3d5d6281691?q=80&w=1200&auto=format&fit=crop', // Emulsified saucing
  'https://images.unsplash.com/photo-1551183053-bf91a1d81141?q=80&w=1200&auto=format&fit=crop', // Truffle butter mantle
  'https://images.unsplash.com/photo-1546549032-9571cd6b27df?q=80&w=1200&auto=format&fit=crop', // Velvet emulsion reduction
  'https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?q=80&w=1200&auto=format&fit=crop', // Saffron risotto mantecatura
  'https://images.unsplash.com/photo-1576092768241-dec231879fc3?q=80&w=1200&auto=format&fit=crop', // Velouté reduction swirl
  'https://images.unsplash.com/photo-1551218808-94e220e084d2?q=80&w=1200&auto=format&fit=crop', // Glaze deglazing
];

export const STEP_PLATING_IMAGES = [
  'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1200&auto=format&fit=crop', // Architectural Michelin plating
  'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?q=80&w=1200&auto=format&fit=crop', // Titanium tweezers finish
  'https://images.unsplash.com/photo-1587314168485-3236d6710814?q=80&w=1200&auto=format&fit=crop', // Haute gastronomy botanical presentation
  'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1200&auto=format&fit=crop', // Kaiseki symmetry plating
  'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=1200&auto=format&fit=crop', // Mineral salt finish
  'https://images.unsplash.com/photo-1578474846511-04ba529f0b88?q=80&w=1200&auto=format&fit=crop', // Final table presentation
];

const DISH_TITLE_TEMPLATES = [
  (ing: string, arch: string, cui: string, num: number) => `${cui} ${arch} of ${ing} with Brown Butter Emulsion • No. ${num}`,
  (ing: string, arch: string, cui: string, num: number) => `Steamed ${ing} with ${cui} Aromatic Reduction & Crispy Shallot Tuile • No. ${num}`,
  (ing: string, _arch: string, cui: string, num: number) => `Slow-Roasted ${ing} Glazed in ${cui} Terroir Demi-Glace • Atelier No. ${num}`,
  (ing: string, _arch: string, cui: string, num: number) => `Cryo-Extracted Essence of ${ing} with Aerated ${cui} Velouté • No. ${num}`,
  (ing: string, _arch: string, cui: string, num: number) => `Wood-Charred ${ing} Tartlet with ${cui} Crystalline Sea Salt • No. ${num}`,
  (ing: string, _arch: string, cui: string, num: number) => `Cold-Smoked ${ing} Carpaccio with Fermented Citrus Glaze • No. ${num}`,
  (ing: string, arch: string, cui: string, num: number) => `Hand-Cut ${cui} ${arch} Infused with ${ing} & DOP Aged Emulsion • No. ${num}`,
  (ing: string, _arch: string, cui: string, num: number) => `Binchotan-Seared ${ing} with ${cui} Sweet Dashi Broth • No. ${num}`,
  (ing: string, _arch: string, cui: string, num: number) => `Confit of ${ing} in Single-Estate Cold-Pressed Olive Oil • No. ${num}`,
  (ing: string, _arch: string, cui: string, num: number) => `${cui} Cured ${ing} with Wild Herb Geleé & Sourdough Shards • No. ${num}`,
  (ing: string, _arch: string, cui: string, num: number) => `Pan-Roasted ${ing} Medallion with Saffron Sabayon • No. ${num}`,
  (ing: string, _arch: string, cui: string, num: number) => `Velveteen ${cui} Soup of ${ing} with Herb Infusion • No. ${num}`,
  (ing: string, _arch: string, cui: string, num: number) => `Crisp Botanical Mille-Feuille Layered with ${ing} Cream • No. ${num}`,
  (ing: string, _arch: string, cui: string, num: number) => `Sous-Vide ${ing} Ballotine with ${cui} Truffle Glaze • No. ${num}`,
  (ing: string, _arch: string, cui: string, num: number) => `Charcoal-Roasted ${ing} with Aromatic Bone Broth Reduction • No. ${num}`,
  (ing: string, _arch: string, cui: string, num: number) => `Chilled ${cui} Gazpacho with ${ing} & Botanical Tuile • No. ${num}`,
  (ing: string, _arch: string, cui: string, num: number) => `Caramelized ${ing} with Aged Balsamic Pearls & Micro-Basil • No. ${num}`,
  (ing: string, _arch: string, cui: string, num: number) => `Flambéed ${ing} over Hand-Rolled ${cui} Gnocchi • No. ${num}`,
  (ing: string, _arch: string, cui: string, num: number) => `Salt-Crusted ${ing} Baked with Wild Mountain Thyme • No. ${num}`,
  (ing: string, _arch: string, cui: string, num: number) => `Artisanal ${cui} Brioche Toast with Whipped ${ing} Butter • No. ${num}`,
  (ing: string, _arch: string, cui: string, num: number) => `Poached ${ing} in Champagne Broth with Morel Reduction • No. ${num}`,
  (ing: string, _arch: string, cui: string, num: number) => `Torched ${ing} Nigiri with ${cui} Umami Tare Glaze • No. ${num}`,
  (ing: string, _arch: string, cui: string, num: number) => `Crispy Skin ${ing} with Sweet Parsnip Purée • No. ${num}`,
  (ing: string, _arch: string, cui: string, num: number) => `${cui} Braised ${ing} en Cocotte with Winter Root Aromatics • No. ${num}`
];

/**
 * Generate a procedural haute gastronomy recipe for continuous non-repeating expansion
 */
export function generateProceduralRecipe(index: number, customIngredients: Ingredient[] = INITIAL_INGREDIENTS): CulinaryMasterclass {
  const pool = customIngredients.length > 0 ? customIngredients : INITIAL_INGREDIENTS;
  const ing = pool[index % pool.length];
  const cuisinesList = CUISINE_REGIONS.filter(c => c !== 'All Cuisines');
  const cuisine = cuisinesList[index % cuisinesList.length];
  const archetype = DISH_ARCHETYPES[index % DISH_ARCHETYPES.length];
  const heroImage = CURATED_FOOD_IMAGES[index % CURATED_FOOD_IMAGES.length];
  const titleFn = DISH_TITLE_TEMPLATES[index % DISH_TITLE_TEMPLATES.length];

  const dishTitle = titleFn(ing.name, archetype.archetype, cuisine, index + 1);
  const subtitle = `A haute culinary masterwork investigating the sensory and thermal properties of ${ing.origin}`;

  const step1Img = STEP_PREP_IMAGES[(index + 0) % STEP_PREP_IMAGES.length];
  const step2Img = STEP_COOK_IMAGES[(index + 1) % STEP_COOK_IMAGES.length];
  const step3Img = STEP_REDUCTION_IMAGES[(index + 2) % STEP_REDUCTION_IMAGES.length];
  const step4Img = STEP_PLATING_IMAGES[(index + 3) % STEP_PLATING_IMAGES.length];

  const pairingTemplate = SOMMELIER_PAIRING_LIBRARY[index % SOMMELIER_PAIRING_LIBRARY.length];
  const sommelierPairing = {
    vintage: pairingTemplate.vintage,
    terroir: pairingTemplate.terroir,
    tastingNote: `${pairingTemplate.tastingNote} Complements ${ing.name}'s natural volatile terpenes.`
  };

  // Calculate realistic gastronomic macro profiles
  const baseCalories = archetype.course === 'Botanical Dessert' 
    ? 380 + (index % 120) 
    : archetype.course === 'Main Course'
    ? 520 + (index % 240)
    : archetype.course === 'Warm Entrée'
    ? 410 + (index % 150)
    : 190 + (index % 90);

  const nutritionalProfile = {
    calories: baseCalories,
    proteinGrams: archetype.course === 'Main Course' ? 34 + (index % 18) : 12 + (index % 10),
    carbsGrams: archetype.course === 'Warm Entrée' ? 42 + (index % 25) : 18 + (index % 14),
    fatGrams: 16 + (index % 14),
    artisanalSodiumMg: 320 + (index % 260)
  };

  const recipeSlug = createSlug(`${dishTitle}-${ing.id}`);

  return {
    id: `recipe-archive-${index + 1}-${ing.id}`,
    slug: recipeSlug,
    primaryIngredientId: ing.id,
    primaryIngredientSlug: ing.slug || ing.id,
    primaryIngredientName: ing.name,
    dishTitle,
    subtitle,
    cuisine,
    courseCategory: archetype.course,
    nutritionalProfile,
    tags: [cuisine, ing.category, archetype.difficulty, archetype.course, 'Artisanal Atelier'],
    overview: `This culinary masterclass investigates the sensory boundaries of ${ing.name} through ${cuisine} gastronomic philosophy. By utilizing ${archetype.archetype}, we amplify natural terroir notes of ${ing.flavorNotes.slice(0, 3).join(', ')} while preserving delicate essential aroma compounds.`,
    chefRationale: `The volatile oils in ${ing.name} require precise thermal management. By layering acidity and lipids at sub-68°C thresholds, the aromatic expression is magnified on the palate without scorched bitterness.`,
    difficulty: archetype.difficulty,
    servings: 2 + (index % 4),
    totalPrepTimeMinutes: archetype.prep,
    totalCookTimeMinutes: archetype.cook,
    overallDurationFormatted: `${archetype.prep + archetype.cook} min`,
    flavorAromaProfile: {
      umami: 70 + ((index * 7) % 30),
      acidity: 40 + ((index * 11) % 50),
      aromaticIntensity: 75 + ((index * 5) % 25),
      textureComplexity: 80 + ((index * 3) % 20),
      finishLength: 85 + ((index * 4) % 15),
    },
    requiredTools: [
      {
        id: `tool-${index}-1`,
        name: 'Hand-Forged High-Carbon Steel Slicing Knife',
        category: 'Cutlery',
        material: 'High-Carbon Shirogami Steel',
        purpose: 'Provides laser-accurate incisions without bruising delicate botanical fibers',
        proTip: 'Wipe blade clean after every slice to prevent flavor carryover'
      },
      {
        id: `tool-${index}-2`,
        name: 'Solid French Copper Saucier 2.5mm',
        category: 'Cookware',
        material: 'Heavy Copper with Pure Tin Lining',
        purpose: 'Enables micro-temperature control across the sauce reduction curve',
        proTip: 'Maintain medium-low flame for homogeneous heat dispersion'
      },
      {
        id: `tool-${index}-3`,
        name: 'Curved Titanium Plating Tweezers',
        category: 'Plating & Finishing',
        material: 'Titanium Matte Anodized',
        purpose: 'Architectural placement of delicate botanical garnishes and micro-greens',
        proTip: 'Grip botanicals only at stem nodes'
      }
    ],
    ingredientsList: [
      {
        name: ing.name,
        amount: '120g prime reserve harvest',
        prepState: 'Selected at peak harvest, gently cleaned and tempered',
        addedAtMinute: 2,
        isArchiveSpecialty: true,
        ingredientId: ing.id,
        ingredientSlug: ing.slug || ing.id
      },
      {
        name: 'Single-Estate Finishing Lipid (Olive Oil or Clarified Butter)',
        amount: '40ml',
        prepState: 'Warm emulsion baseline',
        addedAtMinute: 0,
        isArchiveSpecialty: false
      },
      {
        name: 'Artisanal Aged Reduction Broth',
        amount: '150ml',
        prepState: 'Simmering at 75°C',
        addedAtMinute: 6,
        isArchiveSpecialty: false
      },
      {
        name: 'Crystalline Mineral Flake Salt',
        amount: '3g',
        prepState: 'Crushed by hand at finish',
        addedAtMinute: Math.max(archetype.cook - 1, 1),
        isArchiveSpecialty: true
      }
    ],
    timelineSteps: [
      {
        stepNumber: 1,
        timeOffsetFormatted: '00:00',
        timeOffsetSeconds: 0,
        title: 'Thermal Foundation & Pan Conditioning',
        actionDescription: `Gently warm the copper cookware and introduce the single-estate lipid base to coat the surface evenly without reaching smoke point.`,
        imageUrl: step1Img,
        ingredientAdditions: [
          {
            ingredientName: 'Single-Estate Finishing Lipid',
            amount: '40ml',
            technique: 'Swirled across surface',
            timingNote: 'At 00:00'
          }
        ],
        toolsUsed: ['Solid French Copper Saucier 2.5mm'],
        criticalControlPoint: 'Keep temperature below 120°C to preserve unoxidized lipid fragrance.',
        sensoryCue: 'Gentle shimmer on surface with nutty aroma release.',
        soundscapeType: 'sizzle',
        spokenNarration: `We begin our masterclass with ${ing.name} by setting our thermal foundation, warming our lipid base to create an aromatic carrier.`
      },
      {
        stepNumber: 2,
        timeOffsetFormatted: '04:00',
        timeOffsetSeconds: 240,
        title: `Introduction of ${ing.name} & Volatile Blooming`,
        actionDescription: `Introduce the prepared ${ing.name}. Sauté with gentle agitation to unlock deep Maillard sugars and terroir fragrance without scorching.`,
        imageUrl: step2Img,
        ingredientAdditions: [
          {
            ingredientName: ing.name,
            amount: '120g',
            technique: 'Folded in with wooden paddle',
            timingNote: 'At 04:00'
          }
        ],
        toolsUsed: ['Hand-Forged High-Carbon Steel Slicing Knife', 'Solid French Copper Saucier 2.5mm'],
        criticalControlPoint: 'Keep pan moving to avoid scorching delicate botanical edges.',
        sensoryCue: 'Immense aromatic bloom of natural sweetness and earthiness fills the kitchen.',
        soundscapeType: 'sizzle',
        spokenNarration: `Now we fold in the ${ing.name}. Listen to the gentle sizzle as natural sugars caramelize, releasing an intoxicating wave of terroir.`
      },
      {
        stepNumber: 3,
        timeOffsetFormatted: '09:00',
        timeOffsetSeconds: 540,
        title: 'Broth Reduction & Emulsified Glaze',
        actionDescription: `Deglaze with warm reduction broth, swirling continuously to bind pan juices into a luxurious, spoon-coating glossy glaze.`,
        imageUrl: step3Img,
        ingredientAdditions: [
          {
            ingredientName: 'Artisanal Aged Reduction Broth',
            amount: '150ml',
            technique: 'Streamed in around edges',
            timingNote: 'At 09:00'
          }
        ],
        toolsUsed: ['Solid French Copper Saucier 2.5mm'],
        criticalControlPoint: 'Swirl vigorously off-flame to homogenize starch and lipids into a velvet sheen.',
        sensoryCue: 'Sauce thickens into mirror-gloss emulsion coating the spoon back.',
        soundscapeType: 'whisk',
        spokenNarration: `We introduce our broth, swirling steadily as the sauce tightens into a luxurious glaze that clings to every morsel.`
      },
      {
        stepNumber: 4,
        timeOffsetFormatted: `${String(archetype.cook).padStart(2, '0')}:00`,
        timeOffsetSeconds: archetype.cook * 60,
        title: 'Haute Plating & Botanical Finishing',
        actionDescription: `Carefully arrange the dish onto warm artisanal ceramic plates. Finish with crystalline mineral salt and delicate micro-botanicals with titanium tweezers.`,
        imageUrl: step4Img,
        ingredientAdditions: [
          {
            ingredientName: 'Crystalline Mineral Flake Salt',
            amount: 'Pinch',
            technique: 'Crushed overhead',
            timingNote: 'At finish'
          }
        ],
        toolsUsed: ['Curved Titanium Plating Tweezers'],
        criticalControlPoint: 'Serve immediately on pre-warmed plates to capture optimal aromatic dispersion.',
        sensoryCue: 'Steaming, vibrant, jewel-toned presentation with multi-layered aroma.',
        soundscapeType: 'plating',
        spokenNarration: `We finish with precision on warm ceramics. The dish captures the purest essence of ${ing.name}. Serve with reverence.`
      }
    ],
    platingPresentation: `Composed with architectural balance on dark artisanal stone plate, finished with mirror glaze drizzle and botanical micro-herbs.`,
    sommelierPairing,
    heroImageUrl: heroImage,
    createdAt: new Date().toISOString()
  };
}

// In-memory master recipe repository initialized with 1,050+ recipes
let inMemoryRecipes: CulinaryMasterclass[] | null = null;
const recipeIdMap: Map<string, CulinaryMasterclass> = new Map();
const recipeSlugMap: Map<string, CulinaryMasterclass> = new Map();
const recipesByIngredientMap: Map<string, CulinaryMasterclass[]> = new Map();
const knownRecipeSlugs: Set<string> = new Set();

function indexRecipe(r: CulinaryMasterclass) {
  // Guarantee unique SEO slug
  if (!r.slug) {
    const baseSlug = getRecipeSlug(r);
    r.slug = ensureUniqueSlug(baseSlug, knownRecipeSlugs);
  } else {
    knownRecipeSlugs.add(r.slug);
  }

  // Guarantee primaryIngredientSlug
  if (!r.primaryIngredientSlug) {
    r.primaryIngredientSlug = createSlug(r.primaryIngredientId || r.primaryIngredientName);
  }

  // Guarantee reliable image fallback
  if (!isValidImageUrl(r.heroImageUrl)) {
    const fallbacks = getRecipeFallbackChain(r);
    r.heroImageUrl = fallbacks[0];
  }

  recipeIdMap.set(r.id, r);
  recipeSlugMap.set(r.slug, r);

  // Index by primary ingredient
  if (r.primaryIngredientId) {
    const list = recipesByIngredientMap.get(r.primaryIngredientId) || [];
    if (!list.some(item => item.id === r.id)) {
      list.push(r);
      recipesByIngredientMap.set(r.primaryIngredientId, list);
    }
  }
  if (r.primaryIngredientSlug && r.primaryIngredientSlug !== r.primaryIngredientId) {
    const list = recipesByIngredientMap.get(r.primaryIngredientSlug) || [];
    if (!list.some(item => item.id === r.id)) {
      list.push(r);
      recipesByIngredientMap.set(r.primaryIngredientSlug, list);
    }
  }

  // Register with bi-directional relationship manager
  try {
    const allIngs = ingredientService.getAllIngredients();
    const ingMap = new Map(allIngs.map(i => [i.id, i]));
    relationshipManager.indexRecipe(r, ingMap);
  } catch {
    // Relationship manager safe indexing
  }
}

function initialize1000Recipes(): CulinaryMasterclass[] {
  if (inMemoryRecipes && inMemoryRecipes.length >= 1050) {
    return inMemoryRecipes;
  }

  const recipes: CulinaryMasterclass[] = [...ALL_50_WORLD_RECIPES, ...INITIAL_RECIPES];
  const ids = new Set(recipes.map(r => r.id));

  // Load custom imported recipes from localStorage
  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem('stassens_culinary_recipes_v4');
      if (stored) {
        const customList: CulinaryMasterclass[] = JSON.parse(stored);
        if (Array.isArray(customList)) {
          for (const customRecipe of customList) {
            if (!ids.has(customRecipe.id)) {
              recipes.unshift(customRecipe);
              ids.add(customRecipe.id);
            }
          }
        }
      }
    } catch {
      // Storage safety
    }
  }

  // Index seed and custom recipes first
  for (const r of recipes) {
    indexRecipe(r);
  }

  // Generate procedural recipes up to 1,050+ entries
  for (let i = 0; i < 1050; i++) {
    const r = generateProceduralRecipe(i);
    r.trendScore = parseFloat((95.0 - (i * 0.03) % 15).toFixed(1));
    r.hotnessRank = i + 59;
    if (!ids.has(r.id)) {
      indexRecipe(r);
      recipes.push(r);
      ids.add(r.id);
    }
  }

  inMemoryRecipes = recipes;
  try {
    const allIngs = ingredientService.getAllIngredients();
    internalLinkingEngine.initialize(allIngs, recipes);
  } catch {
    // Safe initialization
  }
  return recipes;
}

export const recipeService = {
  /**
   * Validate raw recipe payload against schema
   */
  validate(raw: unknown, allowUpdates = true): ValidationResult<CulinaryMasterclass> {
    initialize1000Recipes();
    const existingIds = new Set(Array.from(recipeIdMap.keys()));
    const existingSlugs = new Set(Array.from(recipeSlugMap.keys()));
    const slugOwnerMap = new Map(Array.from(recipeSlugMap.entries()).map(([slug, rec]) => [slug, rec.id]));

    return validateRecipe(raw, {
      existingRecipeIds: existingIds,
      existingRecipeSlugs: existingSlugs,
      recipeSlugOwnerMap: slugOwnerMap,
      allowUpdates,
      resolveCollisions: true
    });
  },

  getRecipeById(id: string): CulinaryMasterclass | undefined {
    initialize1000Recipes();
    return recipeIdMap.get(id);
  },

  getRecipeBySlug(slug: string): CulinaryMasterclass | undefined {
    initialize1000Recipes();
    const cleanSlug = createSlug(slug);
    return recipeSlugMap.get(cleanSlug) || recipeSlugMap.get(slug);
  },

  getRecipeByIdOrSlug(idOrSlug: string): CulinaryMasterclass | undefined {
    if (!idOrSlug) return undefined;
    initialize1000Recipes();
    return this.getRecipeBySlug(idOrSlug) || this.getRecipeById(idOrSlug);
  },

  registerRecipe(recipe: CulinaryMasterclass): CulinaryMasterclass {
    initialize1000Recipes();
    const existingIds = new Set(Array.from(recipeIdMap.keys()));
    const existingSlugs = new Set(Array.from(recipeSlugMap.keys()));
    const slugOwnerMap = new Map(Array.from(recipeSlugMap.entries()).map(([slug, rec]) => [slug, rec.id]));

    const validated = validateRecipe(recipe, {
      existingRecipeIds: existingIds,
      existingRecipeSlugs: existingSlugs,
      recipeSlugOwnerMap: slugOwnerMap,
      allowUpdates: true,
      resolveCollisions: true
    });

    const finalRecipe = validated.isValid && validated.data ? validated.data : recipe;
    indexRecipe(finalRecipe);
    contentRegistry.indexRecipe(finalRecipe);

    if (inMemoryRecipes) {
      const existingIndex = inMemoryRecipes.findIndex(r => r.id === finalRecipe.id || r.slug === finalRecipe.slug);
      if (existingIndex >= 0) {
        inMemoryRecipes[existingIndex] = finalRecipe;
      } else {
        inMemoryRecipes.unshift(finalRecipe);
      }
    }

    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('stassens_culinary_recipes_v4');
        const list: CulinaryMasterclass[] = stored ? JSON.parse(stored) : [];
        const existingIdx = list.findIndex(r => r.id === finalRecipe.id);
        if (existingIdx >= 0) {
          list[existingIdx] = finalRecipe;
        } else {
          list.push(finalRecipe);
        }
        localStorage.setItem('stassens_culinary_recipes_v4', JSON.stringify(list));
      } catch {
        // Storage safety
      }
    }

    return finalRecipe;
  },

  resetToDefaults(): void {
    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem('stassens_culinary_recipes_v4');
      } catch {
        // Storage safety
      }
    }
    inMemoryRecipes = null;
    recipeIdMap.clear();
    recipeSlugMap.clear();
    initialize1000Recipes();
    searchEngine.rebuildIndex();
  },

  registerRecipes(batch: CulinaryMasterclass[]): void {
    for (const r of batch) {
      this.registerRecipe(r);
    }
    searchEngine.rebuildIndex();
  },

  getAllRecipes(sortBy: 'hottest' | 'time' | 'alpha' | 'difficulty' = 'hottest'): CulinaryMasterclass[] {
    const list = initialize1000Recipes();
    const bookmarks = this.getBookmarkedRecipeIds();
    
    const mapped = list.map(r => ({
      ...r,
      isBookmarked: bookmarks.has(r.id)
    }));

    if (sortBy === 'hottest') {
      return [...mapped].sort((a, b) => {
        if (a.isHottest && !b.isHottest) return -1;
        if (!a.isHottest && b.isHottest) return 1;
        return (b.trendScore || 0) - (a.trendScore || 0);
      });
    } else if (sortBy === 'time') {
      return [...mapped].sort((a, b) => {
        const timeA = (a.totalPrepTimeMinutes || 0) + (a.totalCookTimeMinutes || 0);
        const timeB = (b.totalPrepTimeMinutes || 0) + (b.totalCookTimeMinutes || 0);
        return timeA - timeB;
      });
    } else if (sortBy === 'alpha') {
      return [...mapped].sort((a, b) => a.dishTitle.localeCompare(b.dishTitle));
    }

    return mapped;
  },

  getHottestMasterclasses(): CulinaryMasterclass[] {
    const all = this.getAllRecipes('hottest');
    return all.filter(r => r.isHottest || (r.trendScore && r.trendScore >= 98)).slice(0, 8);
  },

  getTotalCount(): number {
    return this.getAllRecipes().length;
  },

  getBookmarkedRecipeIds(): Set<string> {
    if (typeof window === 'undefined') return new Set();
    try {
      const raw = localStorage.getItem(BOOKMARKS_KEY);
      if (!raw) return new Set();
      return new Set(JSON.parse(raw));
    } catch {
      return new Set();
    }
  },

  getBookmarkedRecipes(): CulinaryMasterclass[] {
    const bookmarks = this.getBookmarkedRecipeIds();
    if (bookmarks.size === 0) return [];
    const all = this.getAllRecipes();
    return all.filter(r => bookmarks.has(r.id));
  },

  toggleRecipeBookmark(recipeId: string): boolean {
    try {
      const bookmarks = this.getBookmarkedRecipeIds();
      const isSaved = bookmarks.has(recipeId);
      if (isSaved) {
        bookmarks.delete(recipeId);
      } else {
        bookmarks.add(recipeId);
      }
      localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(Array.from(bookmarks)));
      return !isSaved;
    } catch {
      return false;
    }
  },

  clearAllBookmarks(): void {
    try {
      localStorage.removeItem(BOOKMARKS_KEY);
    } catch (e) {
      console.warn('Error clearing bookmarks:', e);
    }
  },

  getRecipesForIngredient(ingredientIdOrSlug: string, limit: number = 4): CulinaryMasterclass[] {
    initialize1000Recipes();
    if (!ingredientIdOrSlug) return [];

    const engineResults = internalLinkingEngine.getRecipesForIngredient(ingredientIdOrSlug, limit);
    if (engineResults.length > 0) return engineResults;

    const results: CulinaryMasterclass[] = [];
    const seenIds = new Set<string>();

    // 1. Check relationshipManager indexed graph
    const linkedRecipeIds = relationshipManager.getRecipeIdsForIngredient(ingredientIdOrSlug);
    for (const recId of linkedRecipeIds) {
      const rec = this.getRecipeByIdOrSlug(recId);
      if (rec && !seenIds.has(rec.id)) {
        results.push(rec);
        seenIds.add(rec.id);
      }
    }
    
    // 2. Check direct indexed map
    const direct = recipesByIngredientMap.get(ingredientIdOrSlug);
    if (direct && direct.length > 0) {
      for (const r of direct) {
        if (!seenIds.has(r.id)) {
          results.push(r);
          seenIds.add(r.id);
        }
      }
    }

    return results.slice(0, limit);
  },

  getConnectedIngredients(recipe: CulinaryMasterclass, allIngredients?: Ingredient[], limit: number = 8): Ingredient[] {
    const engineConnected = internalLinkingEngine.getConnectedIngredientsForRecipe(recipe, limit);
    if (engineConnected.length > 0) return engineConnected;

    const registryIngredients = contentRegistry.getConnectedIngredientsForRecipe(recipe.id, limit);
    if (registryIngredients.length > 0) return registryIngredients;

    const archive = allIngredients || ingredientService.getAllIngredients();
    const connected: Ingredient[] = [];
    const seenIds = new Set<string>();

    // 1. Query relationshipManager
    const linkedIngIds = [
      ...relationshipManager.getIngredientIdsForRecipe(recipe.id),
      ...(recipe.slug ? relationshipManager.getIngredientIdsForRecipe(recipe.slug) : [])
    ];
    for (const ingId of linkedIngIds) {
      const ing = ingredientService.getIngredientByIdOrSlug(ingId);
      if (ing && !seenIds.has(ing.id)) {
        connected.push(ing);
        seenIds.add(ing.id);
      }
    }

    // 2. Check primary ingredient
    if (recipe.primaryIngredientId || recipe.primaryIngredientSlug) {
      const primary = archive.find(i => 
        i.id === recipe.primaryIngredientId || 
        i.slug === recipe.primaryIngredientSlug ||
        i.id === recipe.primaryIngredientSlug
      );
      if (primary && !seenIds.has(primary.id)) {
        connected.push(primary);
        seenIds.add(primary.id);
      }
    }

    // 3. Connect line items to archive ingredients
    for (const item of recipe.ingredientsList) {
      if (item.ingredientId && !seenIds.has(item.ingredientId)) {
        const found = archive.find(i => i.id === item.ingredientId);
        if (found) {
          connected.push(found);
          seenIds.add(found.id);
          continue;
        }
      }
      if (item.ingredientSlug && !seenIds.has(item.ingredientSlug)) {
        const found = archive.find(i => i.slug === item.ingredientSlug);
        if (found) {
          connected.push(found);
          seenIds.add(found.id);
          continue;
        }
      }
      // Name substring or alias match against archive
      const cleanName = item.name.toLowerCase();
      const match = archive.find(i => {
        if (seenIds.has(i.id)) return false;
        if (cleanName.includes(i.name.toLowerCase()) || i.name.toLowerCase().includes(cleanName)) return true;
        if (i.aliases && i.aliases.some(a => cleanName.includes(a.toLowerCase()))) return true;
        return false;
      });
      if (match) {
        connected.push(match);
        seenIds.add(match.id);
      }
    }

    return connected;
  },

  /**
   * Resolve an ingredient line item from a recipe to an archive specimen
   */
  findIngredientForRecipeItem(
    item: { name: string; ingredientId?: string; ingredientSlug?: string },
    allIngredients?: Ingredient[]
  ): Ingredient | undefined {
    const archive = allIngredients || ingredientService.getAllIngredients();
    if (item.ingredientId) {
      const byId = archive.find(i => i.id === item.ingredientId);
      if (byId) return byId;
    }
    if (item.ingredientSlug) {
      const bySlug = archive.find(i => i.slug === item.ingredientSlug || i.id === item.ingredientSlug);
      if (bySlug) return bySlug;
    }
    const cleanItemName = item.name.toLowerCase().trim();
    // Direct match or substring match
    return archive.find(i => {
      const name = i.name.toLowerCase();
      return name === cleanItemName || cleanItemName.includes(name) || name.includes(cleanItemName);
    });
  },

  /**
   * Intelligent related recipes for a given recipe:
   * 1. Other masterclasses sharing primary or connected ingredients
   * 2. Recipes in the same cuisine or course category
   * 3. Deduplicated, excluding the current recipe
   */
  getRelatedRecipes(recipe: CulinaryMasterclass, limit: number = 4): CulinaryMasterclass[] {
    initialize1000Recipes();
    const engineResults = internalLinkingEngine.getRelatedRecipes(recipe, limit);
    if (engineResults.length > 0) return engineResults;

    const all = this.getAllRecipes();
    const related: CulinaryMasterclass[] = [];
    const seenIds = new Set<string>([recipe.id]);
    if (recipe.slug) seenIds.add(recipe.slug);

    // 1. Same primary ingredient
    if (recipe.primaryIngredientId || recipe.primaryIngredientSlug) {
      for (const r of all) {
        if (!seenIds.has(r.id)) {
          if (
            (recipe.primaryIngredientId && r.primaryIngredientId === recipe.primaryIngredientId) ||
            (recipe.primaryIngredientSlug && r.primaryIngredientSlug === recipe.primaryIngredientSlug)
          ) {
            related.push(r);
            seenIds.add(r.id);
            if (r.slug) seenIds.add(r.slug);
            if (related.length >= limit) return related;
          }
        }
      }
    }

    // 2. Same cuisine and course category
    for (const r of all) {
      if (!seenIds.has(r.id)) {
        if (
          r.cuisine?.toLowerCase() === recipe.cuisine?.toLowerCase() &&
          r.courseCategory?.toLowerCase() === recipe.courseCategory?.toLowerCase()
        ) {
          related.push(r);
          seenIds.add(r.id);
          if (r.slug) seenIds.add(r.slug);
          if (related.length >= limit) return related;
        }
      }
    }

    // 3. Same cuisine
    for (const r of all) {
      if (!seenIds.has(r.id)) {
        if (r.cuisine?.toLowerCase() === recipe.cuisine?.toLowerCase()) {
          related.push(r);
          seenIds.add(r.id);
          if (r.slug) seenIds.add(r.slug);
          if (related.length >= limit) return related;
        }
      }
    }

    // 4. Same course category
    for (const r of all) {
      if (!seenIds.has(r.id)) {
        if (r.courseCategory?.toLowerCase() === recipe.courseCategory?.toLowerCase()) {
          related.push(r);
          seenIds.add(r.id);
          if (r.slug) seenIds.add(r.slug);
          if (related.length >= limit) return related;
        }
      }
    }

    // 5. Fallback pool
    for (const r of all) {
      if (!seenIds.has(r.id)) {
        related.push(r);
        seenIds.add(r.id);
        if (r.slug) seenIds.add(r.slug);
        if (related.length >= limit) break;
      }
    }

    return related;
  },

  /**
   * Get recipes that feature ingredients from a specific botanical/culinary category
   */
  getRecipesForCategory(categoryName: string, limit: number = 6): CulinaryMasterclass[] {
    initialize1000Recipes();
    const all = this.getAllRecipes();
    const cleanCategory = categoryName.toLowerCase().trim();
    const matchingIngredients = ingredientService
      .getAllIngredients()
      .filter(i => i.category.toLowerCase() === cleanCategory);
    const ingredientIds = new Set(matchingIngredients.map(i => i.id));
    const ingredientSlugs = new Set(matchingIngredients.map(i => i.slug).filter(Boolean));
    const ingredientNames = matchingIngredients.map(i => i.name.toLowerCase());

    const results: CulinaryMasterclass[] = [];
    const seenIds = new Set<string>();

    for (const r of all) {
      if (seenIds.has(r.id)) continue;

      const matchPrimary =
        (r.primaryIngredientId && ingredientIds.has(r.primaryIngredientId)) ||
        (r.primaryIngredientSlug && ingredientSlugs.has(r.primaryIngredientSlug)) ||
        ingredientNames.some(name => r.primaryIngredientName.toLowerCase().includes(name));

      const matchItems = r.ingredientsList.some(item =>
        (item.ingredientId && ingredientIds.has(item.ingredientId)) ||
        (item.ingredientSlug && ingredientSlugs.has(item.ingredientSlug)) ||
        ingredientNames.some(name => item.name.toLowerCase().includes(name))
      );

      if (matchPrimary || matchItems) {
        results.push(r);
        seenIds.add(r.id);
        if (results.length >= limit) break;
      }
    }

    return results;
  },

  searchRecipes(
    query: string,
    cuisineFilter?: string,
    difficultyFilter?: string,
    maxTimeMinutes?: number
  ): CulinaryMasterclass[] {
    const results = searchEngine.searchRecipes(query, {
      cuisine: cuisineFilter,
      difficulty: difficultyFilter
    });

    if (maxTimeMinutes && maxTimeMinutes > 0) {
      return results.filter(recipe => {
        const total = (recipe.totalPrepTimeMinutes || 0) + (recipe.totalCookTimeMinutes || 0);
        return total <= maxTimeMinutes;
      });
    }

    return results;
  },

  /**
   * Continuous AI Recipe Synthesis Stream:
   * Generates a new batch of bespoke recipes and appends them to the live index
   */
  generateBatchContinuous(count: number = 5): CulinaryMasterclass[] {
    const current = this.getAllRecipes();
    const startIndex = current.length;
    const newBatch: CulinaryMasterclass[] = [];

    for (let i = 0; i < count; i++) {
      const recipe = generateProceduralRecipe(startIndex + i);
      recipe.id = `recipe-continuous-${Date.now()}-${i}`;
      newBatch.push(recipe);
      if (inMemoryRecipes) {
        inMemoryRecipes.unshift(recipe);
      }
    }

    return newBatch;
  },

  async generateBespokeRecipe(
    primaryIngredient: Ingredient,
    cuisine: string = 'Italian',
    customDirective?: string
  ): Promise<CulinaryMasterclass> {
    try {
      const response = await fetch('/api/generate-culinary-masterclass', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ingredient: primaryIngredient,
          customPrompt: `Cuisine style: ${cuisine}. ${customDirective || ''}`,
        })
      });

      if (response.ok) {
        const data = await response.json();
        if (data.masterclass) {
          const fullRecipe: CulinaryMasterclass = {
            ...data.masterclass,
            cuisine,
            tags: [cuisine, primaryIngredient.category, data.masterclass.difficulty || 'Advanced'],
            heroImageUrl: data.masterclass.heroImageUrl || CURATED_FOOD_IMAGES[0]
          };
          if (inMemoryRecipes) {
            inMemoryRecipes.unshift(fullRecipe);
          }
          return fullRecipe;
        }
      }
    } catch (err) {
      console.warn('AI recipe generation fallback:', err);
    }

    // Resilient fallback
    const fallback = generateProceduralRecipe(Date.now() % 500);
    fallback.dishTitle = `${cuisine} Atelier of ${primaryIngredient.name}`;
    fallback.cuisine = cuisine;
    fallback.primaryIngredientId = primaryIngredient.id;
    fallback.primaryIngredientName = primaryIngredient.name;
    if (inMemoryRecipes) {
      inMemoryRecipes.unshift(fallback);
    }
    return fallback;
  },

  buildTastingMenu(courseCount: 3 | 5 | 7 = 5, cuisineFilter?: string): {
    title: string;
    description: string;
    cuisine: string;
    courses: {
      courseName: string;
      recipe: CulinaryMasterclass;
      winePairing: string;
    }[];
    totalCalories: number;
    consolidatedIngredients: { name: string; amount: string }[];
  } {
    const all = this.getAllRecipes();
    const filtered = (cuisineFilter && cuisineFilter !== 'All Cuisines')
      ? all.filter(r => r.cuisine?.toLowerCase() === cuisineFilter.toLowerCase())
      : all;

    const pool = filtered.length >= 7 ? filtered : all;

    let targetCourses: { name: string; type: string }[] = [];
    if (courseCount === 3) {
      targetCourses = [
        { name: '1st Course • Amuse & Botanical Crudo', type: 'Cold Appetizer' },
        { name: '2nd Course • Haute Gastronomy Main', type: 'Main Course' },
        { name: '3rd Course • Sweet Finale • Botanical Confection', type: 'Botanical Dessert' }
      ];
    } else if (courseCount === 5) {
      targetCourses = [
        { name: '1st Course • Velouté & Infusion Amuse', type: 'Amuse-Bouche' },
        { name: '2nd Course • Cold-Cured Terroir Crudo', type: 'Cold Appetizer' },
        { name: '3rd Course • Hand-Rolled Artisan Pasta', type: 'Warm Entrée' },
        { name: '4th Course • Wood-Fired Masterpiece', type: 'Main Course' },
        { name: '5th Course • Botanical Sugar Glass & Mousse', type: 'Botanical Dessert' }
      ];
    } else {
      targetCourses = [
        { name: '1st Course • Welcome Amuse-Bouche', type: 'Amuse-Bouche' },
        { name: '2nd Course • Artisanal Cold Crudo', type: 'Cold Appetizer' },
        { name: '3rd Course • Hand-Crafted Pasta / Noodle Atelier', type: 'Warm Entrée' },
        { name: '4th Course • Chilled Citrus Intermezzo', type: 'Intermezzo' },
        { name: '5th Course • Grand Reserve Roasted Main', type: 'Main Course' },
        { name: '6th Course • Aged Cheese & Single-Estate Honey', type: 'Warm Entrée' },
        { name: '7th Course • Haute Botanical Confection', type: 'Botanical Dessert' }
      ];
    }

    const usedIds = new Set<string>();
    const courses = targetCourses.map((tc, idx) => {
      const match = pool.find(r => r.courseCategory === tc.type && !usedIds.has(r.id)) ||
                    pool.find(r => !usedIds.has(r.id)) ||
                    pool[idx % pool.length];
      usedIds.add(match.id);

      return {
        courseName: tc.name,
        recipe: match,
        winePairing: `${match.sommelierPairing.vintage} (${match.sommelierPairing.terroir})`
      };
    });

    const totalCalories = courses.reduce((acc, c) => acc + (c.recipe.nutritionalProfile?.calories || 400), 0);
    
    const ingMap = new Map<string, string>();
    courses.forEach(c => {
      c.recipe.ingredientsList.forEach(i => {
        if (!ingMap.has(i.name)) {
          ingMap.set(i.name, i.amount);
        }
      });
    });

    const consolidatedIngredients = Array.from(ingMap.entries()).map(([name, amount]) => ({ name, amount }));

    return {
      title: `${cuisineFilter && cuisineFilter !== 'All Cuisines' ? cuisineFilter : 'Global Haute Gastronomy'} ${courseCount}-Course Degustation`,
      description: `A master symphony of ${courseCount} courses harmonized around peak terroir, volatile aromatics, and Grand Cru cellar pairings.`,
      cuisine: cuisineFilter || 'Multi-Regional',
      courses,
      totalCalories,
      consolidatedIngredients
    };
  }
};

// Convenience top-level exports for backwards compatibility across existing components
export const getAllRecipes = () => recipeService.getAllRecipes();
export const getBookmarkedRecipeIds = () => recipeService.getBookmarkedRecipeIds();
export const getBookmarkedRecipes = () => recipeService.getBookmarkedRecipes();
export const toggleRecipeBookmark = (recipeId: string) => recipeService.toggleRecipeBookmark(recipeId);
export const saveRecipeToPlatform = (recipe: CulinaryMasterclass) => {
  if (inMemoryRecipes) {
    const idx = inMemoryRecipes.findIndex(r => r.id === recipe.id);
    if (idx >= 0) inMemoryRecipes[idx] = recipe;
    else inMemoryRecipes.unshift(recipe);
  }
};
export const generateBespokeRecipe = (
  primaryIngredient: string | Ingredient,
  cuisine: string = 'Italian',
  customDirective?: string
) => {
  const ing = typeof primaryIngredient === 'string'
    ? INITIAL_INGREDIENTS.find(i => i.name.toLowerCase().includes(primaryIngredient.toLowerCase())) || INITIAL_INGREDIENTS[0]
    : primaryIngredient;
  return recipeService.generateBespokeRecipe(ing, cuisine, customDirective);
};

