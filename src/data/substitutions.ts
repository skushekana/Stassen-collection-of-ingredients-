import { SubstitutionOption, Ingredient } from '../types';

/**
 * Curated Haute Gastronomy Substitution Matrix
 * Maps ingredient ID to 2-3 precise culinary alternatives
 * with substitution ratios, sensory deltas, application guides, and culinary adjustment tips.
 */
export const INGREDIENT_SUBSTITUTIONS: Record<string, SubstitutionOption[]> = {
  'matsutake-nagano': [
    {
      name: 'Wild Yellow Morels (Morchella esculenta)',
      scientificName: 'Morchella esculenta',
      ratio: '1:1 by fresh weight (or 15g dried per 100g fresh matsutake)',
      flavorDelta: 'Deeper honeycomb nuttiness and wood smoke; lacks the distinct pine-cinnamon camphor notes of matsutake.',
      bestUsedFor: 'Veloutés, rich poultry reductions, rice pilafs, and butter emulsions.',
      culinaryAdjustmentTip: 'Add a single drop of cedar leaf hydrosol or a pinch of ground cassia bark to emulate the characteristic resinous finish.',
      matchingIngredientId: 'morels-patagonia'
    },
    {
      name: 'Shiitake + King Oyster Mushroom (Steamed with Cedar)',
      scientificName: 'Lentinula edodes & Pleurotus eryngii',
      ratio: '70% King Oyster (for texture) + 30% Shiitake (for guanylate umami)',
      flavorDelta: 'Comparable dense fibrous bite; lower volatile pinene aromatics.',
      bestUsedFor: 'Dobin mushi, sukiyaki, and clear dashi consommés.',
      culinaryAdjustmentTip: 'Briefly torch with binchotan charcoal or steep with a piece of hinoki cypress wood in the broth.',
    },
    {
      name: 'Black Winter Perigord Truffle (Tuber melanosporum)',
      scientificName: 'Tuber melanosporum',
      ratio: '15g shaved truffle per 50g fresh matsutake',
      flavorDelta: 'Earthy damp loam and cacao tones rather than bright cedar-cinnamon.',
      bestUsedFor: 'Egg dishes, fresh pasta, risottos, and clarified butter emulsifications.',
      culinaryAdjustmentTip: 'Pair with high-grade dashi to match the fungal umami balance.',
      matchingIngredientId: 'truffle-perigord'
    }
  ],
  'saffron-kozani': [
    {
      name: 'Spanish Saffron Coupe / Super Negin Persian Saffron',
      scientificName: 'Crocus sativus',
      ratio: '1:1 by weight',
      flavorDelta: 'Slightly sweeter and more honeyed, with slightly less metallic-iodine sharpness than Greek Kozani.',
      bestUsedFor: 'Paellas, bouillabaisse, risottos, and saffron brioche doughs.',
      culinaryAdjustmentTip: 'Grind with a pinch of coarse sea salt and bloom in warm mineral water at 45°C for 20 minutes before use.',
      matchingIngredientId: 'saffron-kozani'
    },
    {
      name: 'Wild Safflower Petals (False Saffron) + Turmeric Root',
      scientificName: 'Carthamus tinctorius & Curcuma longa',
      ratio: '2 tsp safflower petals + 1/8 tsp grated fresh turmeric per 0.5g saffron',
      flavorDelta: 'Replicates the vibrant gold-orange pigment; lacks safranal aroma and picrocrocin bitterness.',
      bestUsedFor: 'Rice coloration, decorative broths, and grain dishes.',
      culinaryAdjustmentTip: 'Add 2 drops of bitter orange blossom water to reintroduce botanical floral complexity.',
    },
    {
      name: 'Ground Annatto Seeds (Achiote)',
      scientificName: 'Bixa orellana',
      ratio: '1/2 tsp ground annatto infused in oil per saffron pinch',
      flavorDelta: 'Earthy, peppery, and slightly nutty with deep crimson-gold color.',
      bestUsedFor: 'Stews, seafood marinades, and infused finishing oils.',
      culinaryAdjustmentTip: 'Combine with a touch of crushed cardamom and smoked salt for aromatic lift.',
    }
  ],
  'aceto-modena': [
    {
      name: 'Aged Pedro Ximénez Sherry Vinegar (Solera 25yr)',
      scientificName: 'Vinagre de Jerez Gran Reserva',
      ratio: '1:1 by volume',
      flavorDelta: 'More intense raisin, dried fig, and oak barrel tannins with crisp acetic brightness.',
      bestUsedFor: 'Glazes, carpaccio, Parmigiano-Reggiano drizzling, and roasted fig desserts.',
      culinaryAdjustmentTip: 'Simmer gently with a spoonful of Saba (cooked grape must) to reach balsamic syrup density.',
      matchingIngredientId: 'aceto-modena'
    },
    {
      name: 'Aged Black Truffle Glaze with Cooked Mosto Cotto',
      scientificName: 'Vitis vinifera must reduction',
      ratio: '1:1 by volume',
      flavorDelta: 'Thick and viscous with deep caramelized prune notes, slightly sweeter profile.',
      bestUsedFor: 'Seared scallops, roasted squab, vanilla gelato, and aged goat cheeses.',
      culinaryAdjustmentTip: 'Whisk in a dash of red wine vinegar to restore lively acidity.',
    },
    {
      name: 'Japanese Black Vinegar (Kurozu 5yr Reserve)',
      scientificName: 'Fermented unpolished brown rice vinegar',
      ratio: '3/4 part Kurozu + 1/4 part raw wildflower honey',
      flavorDelta: 'Rich malty amino acid depth with toasted cereal notes rather than fruit must.',
      bestUsedFor: 'Braised pork belly, grilled duck breast, and umami reductions.',
      culinaryAdjustmentTip: 'Warm gently with reduced date molasses for Italian pairing balance.',
    }
  ],
  'fleur-sel-guerande': [
    {
      name: 'Maldon Flake Sea Salt (Essex Coast)',
      scientificName: 'Sodium chloride pyramid crystal',
      ratio: '1:1 by volume (crush lightly between fingers)',
      flavorDelta: 'Crisper, cleaner salinity without the distinct gray-clay mineral moisture of Guérande.',
      bestUsedFor: 'Finishing grilled prime cuts, dark chocolate tartlets, and fresh summer tomatoes.',
      culinaryAdjustmentTip: 'Use slightly less since flake salt has zero residual brine moisture.',
    },
    {
      name: 'Hawaiian Alaea Red Volcanic Salt',
      scientificName: 'Natural marine salt with volcanic red clay',
      ratio: '1:1 by weight',
      flavorDelta: 'Earthier mineral tone with pleasant iron undertones and striking terra cotta color.',
      bestUsedFor: 'Roast meats, poke, ceviche, and grilled root vegetables.',
      culinaryAdjustmentTip: 'Sprinkle only at the exact moment of plating to maintain crunchy crystal structure.',
    },
    {
      name: 'Korean 3-Year Aged Solar Sea Salt (Sinan-gun)',
      scientificName: 'Sun-dried aged halite',
      ratio: '1:1 by weight',
      flavorDelta: 'Smooth, mellow sweetness with low bitterness due to drained bitterns (nigari).',
      bestUsedFor: 'Fermentation, high-end finishing, sashimi, and broth seasoning.',
      culinaryAdjustmentTip: 'Grind in a ceramic mortar for delicate dispersion.',
    }
  ],
  'yuzu-kochi': [
    {
      name: 'Sudachi + Meyer Lemon Zest with Tangerine',
      scientificName: 'Citrus sudachi & Citrus x meyeri',
      ratio: '1:1 by volume of fresh zest and juice',
      flavorDelta: 'Shares high citric tartness; lacks the resinous floral bergamot-mandarin top notes of true Yuzu.',
      bestUsedFor: 'Ponzu sauces, raw fish marinades, ceviches, and botanical cocktails.',
      culinaryAdjustmentTip: 'Microplane 1 leaf of kaffir lime along with the lemon to replicate yuzu’s exotic terpene profile.',
    },
    {
      name: 'Calabrian Bergamot Citrus',
      scientificName: 'Citrus bergamia',
      ratio: '1/2 part Bergamot juice + 1/2 part Mandarin juice',
      flavorDelta: 'Highly aromatic, perfumed floral complexity with a subtle bitter tea-like edge.',
      bestUsedFor: 'Sorbets, seafood glazes, crudos, and pastry ganaches.',
      culinaryAdjustmentTip: 'Use sparingly as the essential oils in bergamot peel are extraordinarily potent.',
      matchingIngredientId: 'bergamot-calabria'
    },
    {
      name: 'Calamansi Lime (Philippine Golden Lime)',
      scientificName: 'Citrofortunella microcarpa',
      ratio: '1:1 by volume of juice',
      flavorDelta: 'Hybrid flavor between key lime and sour mandarin with tropical vibrancy.',
      bestUsedFor: 'Soy dipping sauces, grilled skewers, crudo, and dressings.',
      culinaryAdjustmentTip: 'Add a drop of grapefruit bitters to heighten the floral aromatic nose.',
    }
  ],
  'kombu-rishiri': [
    {
      name: 'Hidaka Kombu or Rausu Kombu',
      scientificName: 'Saccharina angustata / japonica',
      ratio: '1:1 by dried weight',
      flavorDelta: 'Rausu yields a richer, slightly amber broth with higher sweetness; Hidaka is slightly milder.',
      bestUsedFor: 'Kaiseki dashi, clear soups, simmered dishes (nimono), and shabu-shabu.',
      culinaryAdjustmentTip: 'Cold-steep in soft spring water for 6 hours below 60°C for crystal clarity.',
    },
    {
      name: 'Atlantic Sugar Kelp (Saccharina latissima)',
      scientificName: 'Saccharina latissima',
      ratio: '1:1 by dried weight',
      flavorDelta: 'Mild maritime sweetness and clean iodine with slightly lighter glutamic acid content.',
      bestUsedFor: 'Nordic broths, fish poaching liquids, and vegetable marinades.',
      culinaryAdjustmentTip: 'Pair with dried shiitake mushroom caps to boost glutamates and ribonucleotides.',
    },
    {
      name: 'Toasted Nori Sheet + Dried Porcini Powder Infusion',
      scientificName: 'Pyropia yezoensis & Boletus edulis',
      ratio: '1 large toasted nori sheet + 5g porcini per 500ml water',
      flavorDelta: 'Delivers earthy umami and marine aroma with a darker visual broth.',
      bestUsedFor: 'Quick savory stocks, grain broths, and noodle bases.',
      culinaryAdjustmentTip: 'Strain through ultra-fine cheesecloth to keep stock clear.',
    }
  ],
  'urfa-biber': [
    {
      name: 'Maras Biber (Aleppo Pepper)',
      scientificName: 'Capsicum annuum var. Maras',
      ratio: '1:1 by weight',
      flavorDelta: 'Brighter, fruitier, with notes of sun-dried tomato; less chocolate-tobacco smokiness.',
      bestUsedFor: 'Grilled lamb, roasted eggplant, labneh dips, and pasta dishes.',
      culinaryAdjustmentTip: 'Combine with 1/4 tsp smoked Spanish paprika and a pinch of unsweetened dark cocoa powder.',
    },
    {
      name: 'Mexican Ancho Chile (Toasted & Flaked)',
      scientificName: 'Capsicum annuum (Poblano dried)',
      ratio: '1:1 by volume of coarse flakes',
      flavorDelta: 'Deep raisin, molasses, and prune notes with comparable mild warmth.',
      bestUsedFor: 'Braising liquids, bean dishes, mole sauces, and spiced butter finishes.',
      culinaryAdjustmentTip: 'Brush with olive oil and a pinch of sea salt before toasting in a dry pan.',
    },
    {
      name: 'Korean Gochugaru (Sun-Dried Coarse Flakes)',
      scientificName: 'Capsicum annuum Korean cultivar',
      ratio: '1:1 by weight',
      flavorDelta: 'Vibrant sweet heat with bright red color; lacks the fermented cured profile of Urfa.',
      bestUsedFor: 'Stir-fries, seasoning rubs, dressings, and broths.',
      culinaryAdjustmentTip: 'Bloom in warm olive oil with a drop of blackstrap molasses.',
    }
  ],
  'tonka-bean-amazon': [
    {
      name: 'Tahitian Vanilla Bean + Microplaned Nutmeg',
      scientificName: 'Vanilla tahitensis & Myristica fragrans',
      ratio: '1 vanilla bean + 1/8 tsp freshly grated nutmeg per 1 tonka bean',
      flavorDelta: 'Provides sweet floral vanillin and spicy warmth; lacks coumarin’s cherry-almond aroma.',
      bestUsedFor: 'Pastry creams, ganaches, ice creams, and sweet sauces.',
      culinaryAdjustmentTip: 'Add 1 drop of pure bitter almond extract to achieve authentic coumarinic notes.',
      matchingIngredientId: 'vanilla-madagascar'
    },
    {
      name: 'Mahlab (St. Lucie Cherry Pit Kernels)',
      scientificName: 'Prunus mahaleb',
      ratio: '1/2 tsp ground mahlab per 1/2 grated tonka bean',
      flavorDelta: 'Subtle sweet-sour cherry almond notes with woody spice.',
      bestUsedFor: 'Breads, brioches, custard tarts, and milk reductions.',
      culinaryAdjustmentTip: 'Toast whole seeds gently before grinding for optimum essential oil release.',
    },
    {
      name: 'Sweet Woodruff (Galium odoratum)',
      scientificName: 'Galium odoratum',
      ratio: '3g dried sweet woodruff steeped in cream per tonka bean',
      flavorDelta: 'Naturally rich in coumarin with notes of fresh hay and meadowsweet.',
      bestUsedFor: 'Panna cotta, syrups, cocktails, and dairy infusions.',
      culinaryAdjustmentTip: 'Steep cold in milk or cream for 12 hours for elegant aroma extraction.',
    }
  ]
};

/**
 * Universal fallback generator for any ingredient (including dynamically uploaded ones)
 */
export function getSubstitutionsForIngredient(ingredient: Ingredient, allIngredients: Ingredient[] = []): SubstitutionOption[] {
  if (INGREDIENT_SUBSTITUTIONS[ingredient.id]) {
    return INGREDIENT_SUBSTITUTIONS[ingredient.id];
  }

  // Find archive ingredients with similar category or flavor notes
  const relatedSameCategory = allIngredients.filter(
    (i) => i.id !== ingredient.id && i.category === ingredient.category
  );

  const options: SubstitutionOption[] = [];

  if (relatedSameCategory.length > 0) {
    const matched = relatedSameCategory[0];
    options.push({
      name: matched.name,
      scientificName: matched.scientificName,
      ratio: '1:1 ratio adjusted by taste',
      flavorDelta: `Shares similar ${matched.category.toLowerCase()} characteristics with terroir notes of ${matched.origin}.`,
      bestUsedFor: matched.culinaryApplications[0] || 'Culinary reductions and seasoning infusions',
      culinaryAdjustmentTip: `Balance acidity and aroma according to the dish's flavor profile.`,
      matchingIngredientId: matched.id
    });
  }

  // Generic culinary atelier substitutions based on category
  switch (ingredient.category) {
    case 'Rare Spices':
      options.push({
        name: 'Whole Toasted Coriander & Tellicherry Pepper Blend',
        ratio: '1:1 ratio ground fresh in stone mortar',
        flavorDelta: 'Bright citrus warmth with peppery spice; robust aromatic backbone.',
        bestUsedFor: 'Dry rubs, marinades, and spiced butter finishes.',
        culinaryAdjustmentTip: 'Toast whole seeds for 90 seconds over low flame to unlock volatile essential oils.'
      });
      options.push({
        name: 'Single-Origin Smoked Paprika & Sumac',
        ratio: '1/2 tsp each per standard spice pinch',
        flavorDelta: 'Fruity tartness combined with gentle oak smoke.',
        bestUsedFor: 'Finishing oils, roasted vegetables, and grilled proteins.',
        culinaryAdjustmentTip: 'Whisk into extra virgin olive oil before drizzling over warm dishes.'
      });
      break;

    case 'Wild Fungi & Truffles':
      options.push({
        name: 'Dried Porcini & Chanterelle Fungal Reduction',
        ratio: '20g dried soaked in warm water per 100g fresh mushroom',
        flavorDelta: 'Concentrated forest floor umami with apricot and earthy undertones.',
        bestUsedFor: 'Risottos, pan reductions, veloutés, and braised grains.',
        culinaryAdjustmentTip: 'Use both the rehydrated mushroom caps and the strained soaking liquor.'
      });
      options.push({
        name: 'Maitake (Hen of the Wood) Roasted with Clarified Butter',
        ratio: '1:1 by fresh weight',
        flavorDelta: 'Crispy caramelized fronds with deep savory savoriness.',
        bestUsedFor: 'Pan-seared presentations, yakitori, and pasta dishes.',
        culinaryAdjustmentTip: 'Sear in a screaming-hot cast iron skillet without moving for 3 minutes to develop crust.'
      });
      break;

    case 'Ferments & Vinegars':
      options.push({
        name: 'Aged Cider Vinegar with Reduced Apple Must',
        ratio: '1:1 ratio with touch of raw honey',
        flavorDelta: 'Fruity malic acid backbone with gentle sweetness.',
        bestUsedFor: 'Emulsions, deglazing pans, marinades, and vinaigrettes.',
        culinaryAdjustmentTip: 'Simmer gently by 25% to concentrate viscosity and round off sharp ethanol notes.'
      });
      options.push({
        name: 'Aged Rice Ferment / Shio Koji Glaze',
        ratio: '1:1 ratio for savory umami marination',
        flavorDelta: 'Protease enzyme power with natural amino acid richness.',
        bestUsedFor: 'Curing seafood, glazing meats, and dressing vegetables.',
        culinaryAdjustmentTip: 'Wipe off excess before high-heat cooking to prevent burning.'
      });
      break;

    default:
      options.push({
        name: `High-Grade Artisanal ${ingredient.category} Alternative`,
        ratio: '1:1 by volume or weight',
        flavorDelta: `Calibrated to match the ${ingredient.flavorNotes.slice(0, 2).join(' and ')} characteristics.`,
        bestUsedFor: ingredient.culinaryApplications[0] || 'Atelier gastronomy recipes and finishing touches.',
        culinaryAdjustmentTip: 'Taste incrementally at 60°C to adjust seasoning balance.'
      });
      options.push({
        name: 'Cold-Pressed Botanical Infusion',
        ratio: '1-2 tsp to finish',
        flavorDelta: 'Clean lipid-bound aromatic expression without overpowering heat.',
        bestUsedFor: 'Finishing drops, emulsified broths, and crudo presentations.',
        culinaryAdjustmentTip: 'Always add off-heat immediately before presentation.'
      });
      break;
  }

  return options.slice(0, 3);
}
