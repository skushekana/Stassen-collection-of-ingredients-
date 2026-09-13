import { CulinaryMasterclass } from '../../types';

import imgPekingDuck from '../../assets/images/peking_duck_1788217097767.jpg';
import imgKungPao from '../../assets/images/kung_pao_chicken_1788217109664.jpg';
import imgHarGow from '../../assets/images/dimsum_har_gow_1788217123287.jpg';
import imgKimchiJjigae from '../../assets/images/kimchi_jjigae_1788217136238.jpg';
import imgBibimbap from '../../assets/images/korean_bibimbap_1788217148414.jpg';
import imgKoreanFriedChicken from '../../assets/images/korean_fried_chicken_1788217161131.jpg';
import imgCroissant from '../../assets/images/french_croissant_1788217175905.jpg';
import imgCoqAuVin from '../../assets/images/coq_au_vin_1788217188916.jpg';
import imgPierogi from '../../assets/images/polish_pierogi_1788217200848.jpg';
import imgBorscht from '../../assets/images/borscht_soup_1788217215416.jpg';

export const RECIPES_11_TO_20: CulinaryMasterclass[] = [
  // 11. Peking Duck — China
  {
    id: 'peking-duck-china',
    recipeNumber: 11,
    primaryIngredientId: 'peking-roast-duck',
    primaryIngredientName: 'Crisp Glazed Duck & Thin Mandarin Pancakes',
    dishTitle: 'Peking Duck',
    subtitle: 'Glossy roasted Peking duck with mahogany crispy skin, thin mandarin pancakes, scallions, and hoisin sauce',
    cuisine: 'Chinese',
    countryRegion: 'China',
    tags: ['Roast Duck', 'Chinese', 'Beijing', 'Pancakes', 'Crispy Skin'],
    overview: 'The imperial banquet masterpiece of Beijing. Whole duck air-dried, glazed with maltose, roasted until deep mahogany and shatteringly crisp, carved into delicate slices and wrapped in paper-thin pancakes with hoisin sauce, cucumber, and scallions.',
    chefRationale: 'Air-drying separates the skin from subcutaneous fat, ensuring all fat renders during roasting for legendary glass-like crispness.',
    difficulty: 'Grand Master Atelier',
    servings: 4,
    totalPrepTimeMinutes: 40,
    totalCookTimeMinutes: 70,
    overallDurationFormatted: '110 min',
    trendScore: 99.3,
    hotnessRank: 11,
    awardBadge: 'World Archive No. 11 • Imperial Beijing Atelier',
    flavorAromaProfile: {
      umami: 99,
      acidity: 40,
      aromaticIntensity: 98,
      textureComplexity: 99,
      finishLength: 97
    },
    requiredTools: [
      {
        id: 'duck-roaster',
        name: 'Vertical Roasting Rack & Basting Brush',
        category: 'Cookware',
        material: 'Stainless Steel',
        purpose: 'Allows all fat to render freely while circulating dry heat'
      }
    ],
    ingredientsList: [
      { name: 'Whole duck', amount: '2kg prime Pekin duck', prepState: 'Cleaned and dried', addedAtMinute: 0, isArchiveSpecialty: true },
      { name: 'Hoisin sauce', amount: '80ml', prepState: 'Sweet-savory fermented bean sauce', addedAtMinute: 60, isArchiveSpecialty: true },
      { name: 'Scallions', amount: '4 stalks', prepState: 'Julienned finely', addedAtMinute: 60, isArchiveSpecialty: false },
      { name: 'Cucumber', amount: '1 English cucumber', prepState: 'Julienned into matchsticks', addedAtMinute: 60, isArchiveSpecialty: false },
      { name: 'Thin pancakes', amount: '16 handmade mandarin pancakes', prepState: 'Steamed warm', addedAtMinute: 60, isArchiveSpecialty: true }
    ],
    timelineSteps: [
      {
        stepNumber: 1,
        timeOffsetFormatted: '00:00',
        timeOffsetSeconds: 0,
        title: 'Air-Dry Duck Skin Uncovered in Fridge Overnight',
        actionDescription: 'Air-dry duck skin uncovered in the fridge overnight.',
        ingredientAdditions: [{ ingredientName: 'Whole duck', amount: '2kg', technique: 'Air-dried' }],
        toolsUsed: ['Roasting Rack'],
        criticalControlPoint: 'Skin must feel completely parchment-dry to the touch.',
        sensoryCue: 'Parchment-like taut skin texture.',
        soundscapeType: 'plating',
        spokenNarration: 'Air-dry the duck skin in the refrigerator overnight.'
      },
      {
        stepNumber: 2,
        timeOffsetFormatted: '10:00',
        timeOffsetSeconds: 600,
        title: 'Glaze Skin with Maltose or Honey Mixture',
        actionDescription: 'Glaze skin with a maltose or honey mixture.',
        ingredientAdditions: [],
        toolsUsed: ['Basting Brush'],
        criticalControlPoint: 'Apply glaze evenly over every contour.',
        sensoryCue: 'Glossy golden sheen coating the duck.',
        soundscapeType: 'drizzle',
        spokenNarration: 'Glaze skin with a maltose or honey mixture.'
      },
      {
        stepNumber: 3,
        timeOffsetFormatted: '15:00',
        timeOffsetSeconds: 900,
        title: 'Roast Duck Until Skin Is Deeply Crisp and Browned',
        actionDescription: 'Roast duck until skin is deeply crisp and browned.',
        ingredientAdditions: [],
        toolsUsed: ['Vertical Roasting Rack'],
        criticalControlPoint: 'Roast at 375°F until the skin turns mahogany.',
        sensoryCue: 'Aromatic roasting duck fat sizzle.',
        soundscapeType: 'sizzle',
        spokenNarration: 'Roast duck until skin is deeply crisp and mahogany.'
      },
      {
        stepNumber: 4,
        timeOffsetFormatted: '65:00',
        timeOffsetSeconds: 3900,
        title: 'Rest the Duck for 10 Minutes',
        actionDescription: 'Rest the duck for 10 minutes.',
        ingredientAdditions: [],
        toolsUsed: ['Carving Board'],
        criticalControlPoint: 'Resting locks in juices while keeping the skin crisp.',
        sensoryCue: 'Glistening amber skin settling.',
        soundscapeType: 'plating',
        spokenNarration: 'Rest the duck for ten minutes.'
      },
      {
        stepNumber: 5,
        timeOffsetFormatted: '75:00',
        timeOffsetSeconds: 4500,
        title: 'Carve into Thin Slices',
        actionDescription: 'Carve into thin slices.',
        ingredientAdditions: [],
        toolsUsed: ['Carving Cleaver'],
        criticalControlPoint: 'Carve with audible crackle, serving skin and tender meat.',
        sensoryCue: 'Crispy crackle sound under sharp blade.',
        soundscapeType: 'chop',
        spokenNarration: 'Carve into thin, crisp slices.'
      },
      {
        stepNumber: 6,
        timeOffsetFormatted: '80:00',
        timeOffsetSeconds: 4800,
        title: 'Serve with Pancakes, Hoisin, Scallion, and Cucumber',
        actionDescription: 'Serve with pancakes, hoisin sauce, scallion, and cucumber.',
        ingredientAdditions: [
          { ingredientName: 'Hoisin sauce', amount: '80ml', technique: 'Table-side' },
          { ingredientName: 'Scallions', amount: 'Julienned', technique: 'Table-side' },
          { ingredientName: 'Cucumber', amount: 'Julienned', technique: 'Table-side' },
          { ingredientName: 'Thin pancakes', amount: '16 warm', technique: 'Steamed' }
        ],
        toolsUsed: ['Serving Platter'],
        criticalControlPoint: 'Serve pancakes piping hot inside a bamboo steamer.',
        sensoryCue: 'Warm wheat pancake steam and sweet hoisin fragrance.',
        soundscapeType: 'plating',
        spokenNarration: 'Serve with warm pancakes, hoisin sauce, scallions, and cucumber.'
      }
    ],
    platingPresentation: 'Carved skin and meat arranged on an imperial platter with steamed pancakes and condiment dishes.',
    sommelierPairing: {
      vintage: '2019 Pinot Noir',
      terroir: 'Burgundy / Oregon',
      tastingNote: 'Silky red cherry and earthy forest notes complement sweet roasted duck fat and hoisin.'
    },
    heroImageUrl: imgPekingDuck,
    aiImagePrompt: 'Glossy roasted Peking duck with deep mahogany crispy skin being carved into thin slices, served alongside small folded pancakes, julienned scallion and cucumber, and a small dish of hoisin sauce.',
    createdAt: new Date().toISOString()
  },

  // 12. Kung Pao Chicken — China
  {
    id: 'kung-pao-chicken-china',
    recipeNumber: 12,
    primaryIngredientId: 'sichuan-peppercorns-peanuts',
    primaryIngredientName: 'Sichuan Peppercorns & Roasted Peanuts',
    dishTitle: 'Kung Pao Chicken',
    subtitle: 'Sizzling Sichuan wok-fried diced chicken with dried red chilies, numbing peppercorns, and crunchy roasted peanuts',
    cuisine: 'Chinese',
    countryRegion: 'China',
    tags: ['Sichuan', 'Kung Pao', 'Chinese', 'Wok-Fried', 'Spicy'],
    overview: 'A legendary Sichuan classic (Gong Bao Ji Ding). Velvety diced chicken stir-fried with fragrant Sichuan peppercorns, facing-heaven dried red chilies, scallions, and crunchy peanuts in a glossy sweet-sour-savory sauce.',
    chefRationale: 'Blooming dried chilies and Sichuan peppercorns in hot oil releases the distinctive mala (numbing and spicy) and smoky fragrance.',
    difficulty: 'Intermediate',
    servings: 2,
    totalPrepTimeMinutes: 15,
    totalCookTimeMinutes: 10,
    overallDurationFormatted: '25 min',
    trendScore: 98.6,
    hotnessRank: 12,
    awardBadge: 'World Archive No. 12 • Sichuan Wok Fire',
    flavorAromaProfile: {
      umami: 94,
      acidity: 70,
      aromaticIntensity: 98,
      textureComplexity: 94,
      finishLength: 92
    },
    requiredTools: [
      {
        id: 'carbon-wok',
        name: 'High-Heat Carbon Steel Wok',
        category: 'Cookware',
        material: 'Carbon Steel',
        purpose: 'Imparts quick wok sear and mala aroma'
      }
    ],
    ingredientsList: [
      { name: 'Chicken', amount: '300g chicken thigh', prepState: 'Diced into 1/2-inch cubes', addedAtMinute: 0, isArchiveSpecialty: false },
      { name: 'Peanuts', amount: '60g roasted peanuts', prepState: 'Skinless and crunchy', addedAtMinute: 8, isArchiveSpecialty: false },
      { name: 'Dried chilies', amount: '12 whole Sichuan chilies', prepState: 'Snipped and seeded', addedAtMinute: 4, isArchiveSpecialty: true },
      { name: 'Sichuan peppercorns', amount: '1 tsp whole peppercorns', prepState: 'Lightly crushed', addedAtMinute: 4, isArchiveSpecialty: true },
      { name: 'Soy sauce', amount: '2 tbsp', prepState: 'Light and dark blend', addedAtMinute: 0, isArchiveSpecialty: false },
      { name: 'Vinegar', amount: '1.5 tbsp Chinkiang black vinegar', prepState: 'With sugar and starch', addedAtMinute: 7, isArchiveSpecialty: true }
    ],
    timelineSteps: [
      {
        stepNumber: 1,
        timeOffsetFormatted: '00:00',
        timeOffsetSeconds: 0,
        title: 'Marinate Diced Chicken in Soy Sauce and Cornstarch',
        actionDescription: 'Marinate diced chicken briefly in soy sauce and cornstarch.',
        ingredientAdditions: [
          { ingredientName: 'Chicken', amount: '300g', technique: 'Velveted' },
          { ingredientName: 'Soy sauce', amount: '1 tbsp', technique: 'Marinated' }
        ],
        toolsUsed: ['Bowl'],
        criticalControlPoint: 'Cornstarch velveting locks moisture into chicken cubes.',
        sensoryCue: 'Glossy chicken cubes coated evenly.',
        soundscapeType: 'chop',
        spokenNarration: 'Marinate diced chicken briefly in soy sauce and cornstarch.'
      },
      {
        stepNumber: 2,
        timeOffsetFormatted: '04:00',
        timeOffsetSeconds: 240,
        title: 'Stir-Fry Dried Chilies and Peppercorns in Hot Oil',
        actionDescription: 'Stir-fry dried chilies and peppercorns in hot oil until fragrant.',
        ingredientAdditions: [
          { ingredientName: 'Dried chilies', amount: '12 chilies', technique: 'Bloomed' },
          { ingredientName: 'Sichuan peppercorns', amount: '1 tsp', technique: 'Bloomed' }
        ],
        toolsUsed: ['High-Heat Carbon Steel Wok'],
        criticalControlPoint: 'Fry until chilies darken to ruby; do not burn.',
        sensoryCue: 'Pungent numbing mala fragrance filling the air.',
        soundscapeType: 'sizzle',
        spokenNarration: 'Stir-fry dried chilies and peppercorns in hot oil until fragrant.'
      },
      {
        stepNumber: 3,
        timeOffsetFormatted: '05:30',
        timeOffsetSeconds: 330,
        title: 'Add Chicken and Stir-Fry Until Cooked Through',
        actionDescription: 'Add chicken and stir-fry until cooked through.',
        ingredientAdditions: [],
        toolsUsed: ['Wok Spatula'],
        criticalControlPoint: 'Toss over high flame to separate chicken cubes.',
        sensoryCue: 'Loud wok sizzle with seared chicken aroma.',
        soundscapeType: 'flame',
        spokenNarration: 'Add chicken and stir-fry until cooked through.'
      },
      {
        stepNumber: 4,
        timeOffsetFormatted: '07:00',
        timeOffsetSeconds: 420,
        title: 'Add Sauce Made of Soy Sauce, Vinegar, and Sugar',
        actionDescription: 'Add sauce made of soy sauce, vinegar, and sugar.',
        ingredientAdditions: [{ ingredientName: 'Vinegar', amount: '1.5 tbsp Chinkiang blend', technique: 'Glazed' }],
        toolsUsed: ['Wok Spatula'],
        criticalControlPoint: 'Stir vigorously as sauce thickens into a glossy glaze.',
        sensoryCue: 'Sweet-sour black vinegar steam rising.',
        soundscapeType: 'sizzle',
        spokenNarration: 'Add sauce made of soy sauce, vinegar, and sugar.'
      },
      {
        stepNumber: 5,
        timeOffsetFormatted: '08:00',
        timeOffsetSeconds: 480,
        title: 'Toss in Roasted Peanuts',
        actionDescription: 'Toss in roasted peanuts.',
        ingredientAdditions: [{ ingredientName: 'Peanuts', amount: '60g', technique: 'Folded in' }],
        toolsUsed: ['Wok Spatula'],
        criticalControlPoint: 'Add peanuts at the very end to preserve crunchiness.',
        sensoryCue: 'Roasted nut fragrance bursting.',
        soundscapeType: 'sizzle',
        spokenNarration: 'Toss in roasted peanuts.'
      },
      {
        stepNumber: 6,
        timeOffsetFormatted: '09:00',
        timeOffsetSeconds: 540,
        title: 'Serve Hot with Steamed Rice',
        actionDescription: 'Serve hot with steamed rice.',
        ingredientAdditions: [],
        toolsUsed: ['Serving Skillet'],
        criticalControlPoint: 'Serve immediately while sizzling.',
        sensoryCue: 'Glossy red-brown glazed chicken with roasted peanuts.',
        soundscapeType: 'plating',
        spokenNarration: 'Serve hot with steamed rice.'
      }
    ],
    platingPresentation: 'Served sizzling in a dark skillet with whole dried chilies, scallions, and glossy peanuts.',
    sommelierPairing: {
      vintage: '2021 Off-Dry Chenin Blanc',
      terroir: 'Vouvray, France',
      tastingNote: 'Bright acidity and subtle sweetness balance Sichuan peppercorn tingling.'
    },
    heroImageUrl: imgKungPao,
    aiImagePrompt: 'Sizzling wok-fried kung pao chicken in a dark skillet: glossy diced chicken, dried red chilies, roasted peanuts, and scallion pieces coated in a shiny brown-red sauce.',
    createdAt: new Date().toISOString()
  },

  // 13. Dim Sum (Har Gow) — China
  {
    id: 'dim-sum-har-gow-china',
    recipeNumber: 13,
    primaryIngredientId: 'translucent-shrimp-dumplings',
    primaryIngredientName: 'Crystal Wheat Starch & Plump Shrimp',
    dishTitle: 'Dim Sum (Har Gow)',
    subtitle: 'Translucent pleated crystal shrimp dumplings steamed in bamboo baskets with sesame oil and chili dip',
    cuisine: 'Chinese',
    countryRegion: 'China',
    tags: ['Dim Sum', 'Dumplings', 'Har Gow', 'Cantonese', 'Steamed'],
    overview: 'The benchmark of Cantonese dim sum craftsmanship. Pleated translucent dumplings holding succulent whole shrimp seasoned with bamboo shoots and sesame oil, steamed inside bamboo baskets.',
    chefRationale: 'Scalding wheat starch with boiling water gelatinizes the starches, yielding a crystal-clear, delicate, yet elastic wrapper.',
    difficulty: 'Grand Master Atelier',
    servings: 2,
    totalPrepTimeMinutes: 30,
    totalCookTimeMinutes: 8,
    overallDurationFormatted: '38 min',
    trendScore: 98.9,
    hotnessRank: 13,
    awardBadge: 'World Archive No. 13 • Cantonese Dim Sum Art',
    flavorAromaProfile: {
      umami: 96,
      acidity: 25,
      aromaticIntensity: 90,
      textureComplexity: 98,
      finishLength: 92
    },
    requiredTools: [
      {
        id: 'bamboo-steamer',
        name: 'Handwoven Bamboo Steamer Basket',
        category: 'Cookware',
        material: 'Natural Bamboo',
        purpose: 'Circulates moist steam while absorbing condensation'
      }
    ],
    ingredientsList: [
      { name: 'Shrimp', amount: '250g fresh tiger shrimp', prepState: 'Peeled, deveined, chopped chunky', addedAtMinute: 15, isArchiveSpecialty: false },
      { name: 'Wheat starch', amount: '100g', prepState: 'Sifted', addedAtMinute: 0, isArchiveSpecialty: true },
      { name: 'Tapioca starch', amount: '30g', prepState: 'Blended for elasticity', addedAtMinute: 0, isArchiveSpecialty: true },
      { name: 'Bamboo shoots', amount: '40g', prepState: 'Finely minced', addedAtMinute: 15, isArchiveSpecialty: true },
      { name: 'Sesame oil', amount: '1 tsp with white pepper & salt', prepState: 'Seasoning', addedAtMinute: 15, isArchiveSpecialty: false }
    ],
    timelineSteps: [
      {
        stepNumber: 1,
        timeOffsetFormatted: '00:00',
        timeOffsetSeconds: 0,
        title: 'Make Dough from Wheat Starch, Tapioca Starch & Boiling Water',
        actionDescription: 'Make dough from wheat starch, tapioca starch, and boiling water.',
        ingredientAdditions: [
          { ingredientName: 'Wheat starch', amount: '100g', technique: 'Scalded' },
          { ingredientName: 'Tapioca starch', amount: '30g', technique: 'Kneaded' }
        ],
        toolsUsed: ['Mixing Bowl'],
        criticalControlPoint: 'Use vigorously boiling water to gelatinize the starch properly.',
        sensoryCue: 'Translucent dough ball coming together.',
        soundscapeType: 'simmer',
        spokenNarration: 'Make dough from wheat starch, tapioca starch, and boiling water.'
      },
      {
        stepNumber: 2,
        timeOffsetFormatted: '10:00',
        timeOffsetSeconds: 600,
        title: 'Rest Dough, Then Roll into Thin Rounds',
        actionDescription: 'Rest dough, then roll into thin rounds.',
        ingredientAdditions: [],
        toolsUsed: ['Dumpling Cleaver / Rolling Pin'],
        criticalControlPoint: 'Smear and press into translucent paper-thin circles.',
        sensoryCue: 'Glassy smooth thin dough discs.',
        soundscapeType: 'chop',
        spokenNarration: 'Rest dough, then roll into thin translucent rounds.'
      },
      {
        stepNumber: 3,
        timeOffsetFormatted: '15:00',
        timeOffsetSeconds: 900,
        title: 'Mix Shrimp Filling with Bamboo Shoots and Sesame Oil',
        actionDescription: 'Mix shrimp filling with bamboo shoots and sesame oil.',
        ingredientAdditions: [
          { ingredientName: 'Shrimp', amount: '250g', technique: 'Chunky chop' },
          { ingredientName: 'Bamboo shoots', amount: '40g', technique: 'Folded' },
          { ingredientName: 'Sesame oil', amount: '1 tsp', technique: 'Blended' }
        ],
        toolsUsed: ['Bowl'],
        criticalControlPoint: 'Stir shrimp in one direction until springy and bouncy.',
        sensoryCue: 'Toasted sesame and sweet fresh shrimp aroma.',
        soundscapeType: 'whisk',
        spokenNarration: 'Mix shrimp filling with bamboo shoots and sesame oil.'
      },
      {
        stepNumber: 4,
        timeOffsetFormatted: '20:00',
        timeOffsetSeconds: 1200,
        title: 'Fill Each Wrapper and Pleat Closed',
        actionDescription: 'Fill each wrapper and pleat closed.',
        ingredientAdditions: [],
        toolsUsed: [],
        criticalControlPoint: 'Form 7-9 neat pleats while sealing tightly.',
        sensoryCue: 'Delicate crescent shape with pink shrimp visible.',
        soundscapeType: 'plating',
        spokenNarration: 'Fill each wrapper and pleat closed.'
      },
      {
        stepNumber: 5,
        timeOffsetFormatted: '28:00',
        timeOffsetSeconds: 1680,
        title: 'Steam Dumplings for 6-8 Minutes',
        actionDescription: 'Steam dumplings for 6-8 minutes.',
        ingredientAdditions: [],
        toolsUsed: ['Bamboo Steamer Basket'],
        criticalControlPoint: 'Steam over high heat; do not over-steam to keep skin crystal clear.',
        sensoryCue: 'Steaming bamboo aroma and translucent wrappers.',
        soundscapeType: 'simmer',
        spokenNarration: 'Steam dumplings for six to eight minutes.'
      },
      {
        stepNumber: 6,
        timeOffsetFormatted: '36:00',
        timeOffsetSeconds: 2160,
        title: 'Serve Hot with Soy Sauce or Chili Oil',
        actionDescription: 'Serve hot with soy sauce or chili oil.',
        ingredientAdditions: [],
        toolsUsed: ['Serving Basket'],
        criticalControlPoint: 'Serve straight in the bamboo steamer.',
        sensoryCue: 'Steaming crystal dumplings glistening.',
        soundscapeType: 'plating',
        spokenNarration: 'Serve hot with soy sauce or chili oil.'
      }
    ],
    platingPresentation: 'Served directly in woven bamboo steamers with dishes of soy sauce and chili oil.',
    sommelierPairing: {
      vintage: 'Imperial Jasmine Pearl Green Tea',
      terroir: 'Fujian, China',
      tastingNote: 'Floral jasmine fragrance and delicate tannin cleanse the palate between bites.'
    },
    heroImageUrl: imgHarGow,
    aiImagePrompt: 'Close-up of translucent pleated har gow dumplings in a bamboo steamer, pink shrimp visible through the thin wrapper, steam rising, small dish of soy sauce and chili oil beside them.',
    createdAt: new Date().toISOString()
  },

  // 14. Kimchi Jjigae — Korea
  {
    id: 'kimchi-jjigae-korea',
    recipeNumber: 14,
    primaryIngredientId: 'aged-kimchi-pork',
    primaryIngredientName: 'Fermented Kimchi & Silken Tofu',
    dishTitle: 'Kimchi Jjigae',
    subtitle: 'Bubbling spicy Korean kimchi stew in a dolsot stone pot with pork belly, tofu, and gochugaru',
    cuisine: 'Korean',
    countryRegion: 'Korea',
    tags: ['Stew', 'Korean', 'Kimchi', 'Jjigae', 'Spicy'],
    overview: 'The beloved soul food of Korea. Well-fermented aged kimchi sautéed with pork belly, simmered in savory anchovy broth with gochugaru chili flakes, scallions, and soft tofu in a bubbling hot earthenware dolsot pot.',
    chefRationale: 'Sautéing sour aged kimchi in pork fat before adding broth deepens flavor and balances sharp fermentation acids.',
    difficulty: 'Intermediate',
    servings: 2,
    totalPrepTimeMinutes: 10,
    totalCookTimeMinutes: 25,
    overallDurationFormatted: '35 min',
    trendScore: 98.5,
    hotnessRank: 14,
    awardBadge: 'World Archive No. 14 • Korean Soul Stew',
    flavorAromaProfile: {
      umami: 96,
      acidity: 85,
      aromaticIntensity: 95,
      textureComplexity: 90,
      finishLength: 94
    },
    requiredTools: [
      {
        id: 'ttukbaegi',
        name: 'Korean Ttukbaegi Earthenware Stone Pot',
        category: 'Cookware',
        material: 'Glazed Ceramic Clay',
        purpose: 'Retains bubbling heat throughout the meal'
      }
    ],
    ingredientsList: [
      { name: 'Kimchi', amount: '300g aged sour kimchi', prepState: 'Coarsely chopped with juice', addedAtMinute: 0, isArchiveSpecialty: true },
      { name: 'Pork or tofu', amount: '150g pork belly', prepState: 'Sliced bite-sized', addedAtMinute: 0, isArchiveSpecialty: false },
      { name: 'Gochugaru (chili flakes)', amount: '1.5 tbsp Korean chili powder', prepState: 'Flakes', addedAtMinute: 5, isArchiveSpecialty: true },
      { name: 'Scallions', amount: '2 stalks', prepState: 'Sliced diagonally', addedAtMinute: 20, isArchiveSpecialty: false },
      { name: 'Tofu', amount: '200g firm or medium tofu', prepState: 'Sliced into 1/2-inch slabs', addedAtMinute: 18, isArchiveSpecialty: false }
    ],
    timelineSteps: [
      {
        stepNumber: 1,
        timeOffsetFormatted: '00:00',
        timeOffsetSeconds: 0,
        title: 'Saute Kimchi and Pork in a Pot Until Fragrant',
        actionDescription: 'Saute kimchi and pork in a pot until fragrant.',
        ingredientAdditions: [
          { ingredientName: 'Kimchi', amount: '300g', technique: 'Sautéed' },
          { ingredientName: 'Pork or tofu', amount: '150g', technique: 'Sautéed in pot' }
        ],
        toolsUsed: ['Korean Ttukbaegi Stone Pot'],
        criticalControlPoint: 'Sauté until kimchi turns translucent and pork fat renders.',
        sensoryCue: 'Sizzling aged kimchi with rich savory pork aroma.',
        soundscapeType: 'sizzle',
        spokenNarration: 'Saute kimchi and pork in a pot until fragrant.'
      },
      {
        stepNumber: 2,
        timeOffsetFormatted: '05:00',
        timeOffsetSeconds: 300,
        title: 'Add Water or Broth and Gochugaru',
        actionDescription: 'Add water or broth and gochugaru.',
        ingredientAdditions: [{ ingredientName: 'Gochugaru (chili flakes)', amount: '1.5 tbsp', technique: 'Stirred in' }],
        toolsUsed: [],
        criticalControlPoint: 'Bring to a vigorous rolling boil.',
        sensoryCue: 'Vibrant crimson broth bubbling.',
        soundscapeType: 'simmer',
        spokenNarration: 'Add broth and gochugaru chili flakes.'
      },
      {
        stepNumber: 3,
        timeOffsetFormatted: '08:00',
        timeOffsetSeconds: 480,
        title: 'Simmer 15-20 Minutes to Develop Flavor',
        actionDescription: 'Simmer 15-20 minutes to develop flavor.',
        ingredientAdditions: [],
        toolsUsed: [],
        criticalControlPoint: 'Allow kimchi and pork to meld deeply with the broth.',
        sensoryCue: 'Deep, rich, spicy-tangy steam rising.',
        soundscapeType: 'simmer',
        spokenNarration: 'Simmer for fifteen to twenty minutes to develop flavor.'
      },
      {
        stepNumber: 4,
        timeOffsetFormatted: '22:00',
        timeOffsetSeconds: 1320,
        title: 'Add Tofu and Simmer a Few More Minutes',
        actionDescription: 'Add tofu and simmer a few more minutes.',
        ingredientAdditions: [{ ingredientName: 'Tofu', amount: '200g', technique: 'Arranged on top' }],
        toolsUsed: [],
        criticalControlPoint: 'Tofu absorbs savory broth while remaining tender.',
        sensoryCue: 'White tofu simmering in crimson stew.',
        soundscapeType: 'simmer',
        spokenNarration: 'Add tofu and simmer for a few more minutes.'
      },
      {
        stepNumber: 5,
        timeOffsetFormatted: '25:00',
        timeOffsetSeconds: 1500,
        title: 'Top with Scallions and Serve with Rice',
        actionDescription: 'Top with scallions and serve with rice.',
        ingredientAdditions: [{ ingredientName: 'Scallions', amount: '2 stalks', technique: 'Scattered' }],
        toolsUsed: ['Stone Pot'],
        criticalControlPoint: 'Serve bubbling hot straight in the dolsot earthenware pot.',
        sensoryCue: 'Bubbling stew with fresh scallion sharpness.',
        soundscapeType: 'plating',
        spokenNarration: 'Top with scallions and serve with white rice.'
      }
    ],
    platingPresentation: 'Served bubbling in a dark stone pot with a bowl of steamed white rice.',
    sommelierPairing: {
      vintage: 'Korean Makgeolli (Sparkling Rice Wine)',
      terroir: 'Seoul, Korea',
      tastingNote: 'Creamy, sweet effervescence softens the pungent kimchi tang and chili heat.'
    },
    heroImageUrl: imgKimchiJjigae,
    aiImagePrompt: 'Bubbling red kimchi stew in a dark stone pot (dolsot), chunks of tofu and pork, fermented kimchi visible in the broth, scallions on top, steam rising, served with a small bowl of white rice.',
    createdAt: new Date().toISOString()
  },

  // 15. Bibimbap — Korea
  {
    id: 'bibimbap-korea',
    recipeNumber: 15,
    primaryIngredientId: 'gochujang-namul-rice',
    primaryIngredientName: 'Seasoned Namul Vegetables & Gochujang',
    dishTitle: 'Bibimbap',
    subtitle: 'Colorful Korean rice bowl topped with sautéed namul vegetables, seasoned beef, sunny egg, and spicy gochujang',
    cuisine: 'Korean',
    countryRegion: 'Korea',
    tags: ['Bibimbap', 'Korean', 'Rice Bowl', 'Gochujang', 'Namul'],
    overview: 'A vibrant masterpiece of Korean culinary balance. A warm bed of rice crowned with a pinwheel of seasoned vegetables (spinach, carrots, mushrooms, bean sprouts), bulgogi beef, a sunny fried egg, and sweet-spicy gochujang paste.',
    chefRationale: 'Cooking and seasoning each vegetable separately preserves individual colors, textures, and pure aromas before final mixing.',
    difficulty: 'Intermediate',
    servings: 2,
    totalPrepTimeMinutes: 25,
    totalCookTimeMinutes: 15,
    overallDurationFormatted: '40 min',
    trendScore: 98.7,
    hotnessRank: 15,
    awardBadge: 'World Archive No. 15 • Jeonju Bibimbap',
    flavorAromaProfile: {
      umami: 94,
      acidity: 50,
      aromaticIntensity: 95,
      textureComplexity: 98,
      finishLength: 92
    },
    requiredTools: [
      {
        id: 'stone-bowl-dolsot',
        name: 'Granite Dolsot Stone Bowl',
        category: 'Cookware',
        material: 'Granite Stone',
        purpose: 'Crisps bottom rice into golden nurungji'
      }
    ],
    ingredientsList: [
      { name: 'Rice', amount: '300g cooked short-grain rice', prepState: 'Steamed warm', addedAtMinute: 10, isArchiveSpecialty: false },
      { name: 'Assorted vegetables', amount: 'Carrots, spinach, bean sprouts, shiitake', prepState: 'Blanched and sautéed', addedAtMinute: 0, isArchiveSpecialty: false },
      { name: 'Beef', amount: '150g beef ribeye / sirloin', prepState: 'Thinly sliced and marinated with soy & sesame', addedAtMinute: 8, isArchiveSpecialty: false },
      { name: 'Fried egg', amount: '2 eggs', prepState: 'Sunny-side up', addedAtMinute: 12, isArchiveSpecialty: false },
      { name: 'Gochujang', amount: '2 tbsp Korean red pepper paste', prepState: 'Seasoned with sesame oil', addedAtMinute: 14, isArchiveSpecialty: true }
    ],
    timelineSteps: [
      {
        stepNumber: 1,
        timeOffsetFormatted: '00:00',
        timeOffsetSeconds: 0,
        title: 'Cook Rice',
        actionDescription: 'Cook rice.',
        ingredientAdditions: [{ ingredientName: 'Rice', amount: '300g', technique: 'Steamed' }],
        toolsUsed: ['Rice Cooker'],
        criticalControlPoint: 'Cook until plump and fluffy.',
        sensoryCue: 'Sweet steaming rice aroma.',
        soundscapeType: 'simmer',
        spokenNarration: 'Cook rice until tender and fluffy.'
      },
      {
        stepNumber: 2,
        timeOffsetFormatted: '05:00',
        timeOffsetSeconds: 300,
        title: 'Saute Each Vegetable Separately with Seasoning',
        actionDescription: 'Saute each vegetable separately with seasoning.',
        ingredientAdditions: [{ ingredientName: 'Assorted vegetables', amount: 'Assorted', technique: 'Sautéed namul' }],
        toolsUsed: ['Skillet'],
        criticalControlPoint: 'Keep colors vibrant and textures crisp-tender.',
        sensoryCue: 'Toasted sesame oil and garlic fragrance.',
        soundscapeType: 'sizzle',
        spokenNarration: 'Saute each vegetable separately with seasoning.'
      },
      {
        stepNumber: 3,
        timeOffsetFormatted: '12:00',
        timeOffsetSeconds: 720,
        title: 'Cook Seasoned Beef in a Hot Pan',
        actionDescription: 'Cook seasoned beef in a hot pan.',
        ingredientAdditions: [{ ingredientName: 'Beef', amount: '150g', technique: 'Pan-seared' }],
        toolsUsed: ['Skillet'],
        criticalControlPoint: 'Sear quickly on high heat.',
        sensoryCue: 'Savory sweet-soy beef sizzle.',
        soundscapeType: 'sizzle',
        spokenNarration: 'Cook seasoned beef in a hot pan.'
      },
      {
        stepNumber: 4,
        timeOffsetFormatted: '15:00',
        timeOffsetSeconds: 900,
        title: 'Fry an Egg Sunny-Side Up',
        actionDescription: 'Fry an egg sunny-side up.',
        ingredientAdditions: [{ ingredientName: 'Fried egg', amount: '2 eggs', technique: 'Fried sunny-side' }],
        toolsUsed: ['Egg Pan'],
        criticalControlPoint: 'Keep yolk runny and edges delicately crisp.',
        sensoryCue: 'Golden yolk with glistening whites.',
        soundscapeType: 'sizzle',
        spokenNarration: 'Fry an egg sunny-side up.'
      },
      {
        stepNumber: 5,
        timeOffsetFormatted: '18:00',
        timeOffsetSeconds: 1080,
        title: 'Arrange Rice in a Bowl, Top with Vegetables & Beef',
        actionDescription: 'Arrange rice in a bowl, top with vegetables and beef in sections.',
        ingredientAdditions: [],
        toolsUsed: ['Granite Dolsot Stone Bowl'],
        criticalControlPoint: 'Arrange in contrasting color pinwheel.',
        sensoryCue: 'Stunning geometric array of colors.',
        soundscapeType: 'plating',
        spokenNarration: 'Arrange rice in a bowl and top with vegetables and beef in sections.'
      },
      {
        stepNumber: 6,
        timeOffsetFormatted: '20:00',
        timeOffsetSeconds: 1200,
        title: 'Place Egg on Top and Add Gochujang',
        actionDescription: 'Place egg on top and add a spoonful of gochujang.',
        ingredientAdditions: [{ ingredientName: 'Gochujang', amount: '2 tbsp', technique: 'Dollop' }],
        toolsUsed: [],
        criticalControlPoint: 'Top centrally with bright yolk and ruby red sauce.',
        sensoryCue: 'Toasted sesame seeds over ruby gochujang.',
        soundscapeType: 'plating',
        spokenNarration: 'Place egg on top and add a spoonful of gochujang.'
      },
      {
        stepNumber: 7,
        timeOffsetFormatted: '22:00',
        timeOffsetSeconds: 1320,
        title: 'Mix Well Before Eating',
        actionDescription: 'Mix well before eating.',
        ingredientAdditions: [],
        toolsUsed: ['Spoon'],
        criticalControlPoint: 'Mix thoroughly so egg yolk and gochujang coat every grain.',
        sensoryCue: 'Savory aroma as ingredients harmonize.',
        soundscapeType: 'whisk',
        spokenNarration: 'Mix well before eating.'
      }
    ],
    platingPresentation: 'Served in a stone bowl with vegetables arranged in a colorful pinwheel topped with egg yolk and gochujang.',
    sommelierPairing: {
      vintage: '2021 Gamay / Beaujolais-Villages',
      terroir: 'Beaujolais, France',
      tastingNote: 'Bright juicy red fruit and soft tannins complement the savory sesame and gochujang heat.'
    },
    heroImageUrl: imgBibimbap,
    aiImagePrompt: 'Colorful bibimbap in a stone bowl: mound of white rice topped with a fan of sauteed carrots, spinach, bean sprouts, mushrooms, seasoned beef, and a bright orange fried egg yolk, dollop of red gochujang on top.',
    createdAt: new Date().toISOString()
  },

  // 16. Korean Fried Chicken — Korea
  {
    id: 'korean-fried-chicken-korea',
    recipeNumber: 16,
    primaryIngredientId: 'double-fried-chicken',
    primaryIngredientName: 'Crispy Double-Fried Chicken & Gochujang Glaze',
    dishTitle: 'Korean Fried Chicken',
    subtitle: 'Extra-crispy double-fried chicken coated in a sweet-spicy garlic gochujang glaze with sesame seeds',
    cuisine: 'Korean',
    countryRegion: 'Korea',
    tags: ['Fried Chicken', 'Korean', 'Crispy', 'Gochujang', 'Street Food'],
    overview: 'The global benchmark for crispy chicken (Chimaek). Ultra-light potato starch coated chicken double-fried to shatteringly crispy perfection, tossed in a glossy sweet-spicy gochujang, garlic, and honey glaze.',
    chefRationale: 'Double-frying evaporates residual surface moisture on the second fry, yielding a glass-like crunch that stays crisp under sticky glaze.',
    difficulty: 'Intermediate',
    servings: 2,
    totalPrepTimeMinutes: 15,
    totalCookTimeMinutes: 20,
    overallDurationFormatted: '35 min',
    trendScore: 99.1,
    hotnessRank: 16,
    awardBadge: 'World Archive No. 16 • Seoul Chimaek Master',
    flavorAromaProfile: {
      umami: 96,
      acidity: 50,
      aromaticIntensity: 98,
      textureComplexity: 100,
      finishLength: 94
    },
    requiredTools: [
      {
        id: 'deep-fry-thermometer',
        name: 'Deep Fryer & Precision Thermometer',
        category: 'Cookware',
        material: 'Stainless Steel',
        purpose: 'Monitors exact frying temperatures for two-stage crisping'
      }
    ],
    ingredientsList: [
      { name: 'Chicken pieces', amount: '500g wings / drumettes', prepState: 'Seasoned with salt & ginger', addedAtMinute: 0, isArchiveSpecialty: false },
      { name: 'Potato starch', amount: '80g', prepState: 'Dry starch coating', addedAtMinute: 5, isArchiveSpecialty: true },
      { name: 'Gochujang', amount: '2 tbsp', prepState: 'Korean chili paste', addedAtMinute: 15, isArchiveSpecialty: true },
      { name: 'Garlic', amount: '4 cloves', prepState: 'Finely minced', addedAtMinute: 15, isArchiveSpecialty: false },
      { name: 'Soy sauce', amount: '1.5 tbsp', prepState: 'Light soy sauce', addedAtMinute: 15, isArchiveSpecialty: false },
      { name: 'Honey', amount: '2 tbsp', prepState: 'Pure honey or rice syrup', addedAtMinute: 15, isArchiveSpecialty: false }
    ],
    timelineSteps: [
      {
        stepNumber: 1,
        timeOffsetFormatted: '00:00',
        timeOffsetSeconds: 0,
        title: 'Coat Chicken Pieces in Potato Starch',
        actionDescription: 'Coat chicken pieces in potato starch.',
        ingredientAdditions: [
          { ingredientName: 'Chicken pieces', amount: '500g', technique: 'Dusted' },
          { ingredientName: 'Potato starch', amount: '80g', technique: 'Evenly coated' }
        ],
        toolsUsed: ['Bowl'],
        criticalControlPoint: 'Dust thoroughly and shake off excess starch.',
        sensoryCue: 'Uniform white powdery coating.',
        soundscapeType: 'chop',
        spokenNarration: 'Coat chicken pieces in potato starch.'
      },
      {
        stepNumber: 2,
        timeOffsetFormatted: '05:00',
        timeOffsetSeconds: 300,
        title: 'Fry Once at Medium Heat Until Cooked Through',
        actionDescription: 'Fry once at medium heat until cooked through.',
        ingredientAdditions: [],
        toolsUsed: ['Deep Fryer'],
        criticalControlPoint: 'Fry at 325°F (165°C) for 8-10 minutes.',
        sensoryCue: 'Gentle bubbling and pale golden crust.',
        soundscapeType: 'sizzle',
        spokenNarration: 'Fry once at medium heat until cooked through.'
      },
      {
        stepNumber: 3,
        timeOffsetFormatted: '15:00',
        timeOffsetSeconds: 900,
        title: 'Fry a Second Time at High Heat Until Extra Crispy',
        actionDescription: 'Fry a second time at high heat until extra crispy.',
        ingredientAdditions: [],
        toolsUsed: ['Deep Fryer'],
        criticalControlPoint: 'Flash fry at 375°F (190°C) for 2-3 minutes until golden brown.',
        sensoryCue: 'Vigorous bubbling and audible crackle.',
        soundscapeType: 'sizzle',
        spokenNarration: 'Fry a second time at high heat until extra crispy.'
      },
      {
        stepNumber: 4,
        timeOffsetFormatted: '18:00',
        timeOffsetSeconds: 1080,
        title: 'Make Glaze from Gochujang, Garlic, Soy Sauce, and Honey',
        actionDescription: 'Make glaze from gochujang, garlic, soy sauce, and honey.',
        ingredientAdditions: [
          { ingredientName: 'Gochujang', amount: '2 tbsp', technique: 'Simmered' },
          { ingredientName: 'Garlic', amount: '4 cloves', technique: 'Simmered' },
          { ingredientName: 'Soy sauce', amount: '1.5 tbsp', technique: 'Simmered' },
          { ingredientName: 'Honey', amount: '2 tbsp', technique: 'Simmered' }
        ],
        toolsUsed: ['Saucepan'],
        criticalControlPoint: 'Simmer until glossy and slightly bubbly.',
        sensoryCue: 'Sweet spicy garlic and caramel aroma.',
        soundscapeType: 'simmer',
        spokenNarration: 'Make glaze from gochujang, garlic, soy sauce, and honey.'
      },
      {
        stepNumber: 5,
        timeOffsetFormatted: '21:00',
        timeOffsetSeconds: 1260,
        title: 'Toss Hot Fried Chicken in the Glaze',
        actionDescription: 'Toss hot fried chicken in the glaze.',
        ingredientAdditions: [],
        toolsUsed: ['Tossing Bowl'],
        criticalControlPoint: 'Toss quickly while chicken is blazing hot.',
        sensoryCue: 'Glaze coats the crackling crispy crust in a shiny glaze.',
        soundscapeType: 'whisk',
        spokenNarration: 'Toss hot fried chicken in the glaze.'
      },
      {
        stepNumber: 6,
        timeOffsetFormatted: '23:00',
        timeOffsetSeconds: 1380,
        title: 'Sprinkle with Sesame Seeds and Scallions',
        actionDescription: 'Sprinkle with sesame seeds and scallions.',
        ingredientAdditions: [],
        toolsUsed: ['Platter'],
        criticalControlPoint: 'Serve immediately with pickled radish.',
        sensoryCue: 'Toasted sesame and fresh scallion aroma.',
        soundscapeType: 'plating',
        spokenNarration: 'Sprinkle with sesame seeds and scallions.'
      }
    ],
    platingPresentation: 'Piled high on a plate showing crunchy coating, glossy red glaze, and white sesame seeds.',
    sommelierPairing: {
      vintage: 'Cold Craft Pilsner',
      terroir: 'Seoul, Korea',
      tastingNote: 'Icy crisp carbonation cuts through sweet-spicy glaze and fried richness.'
    },
    heroImageUrl: imgKoreanFriedChicken,
    aiImagePrompt: 'Extra-crispy Korean fried chicken pieces glazed in glossy red-orange sauce, sprinkled with sesame seeds and sliced scallions, piled on a plate, close-up showing shiny crunchy coating.',
    createdAt: new Date().toISOString()
  },

  // 17. Croissant — France
  {
    id: 'croissant-france',
    recipeNumber: 17,
    primaryIngredientId: 'laminated-french-butter',
    primaryIngredientName: 'High-Fat Tournage Butter & Yeasted Dough',
    dishTitle: 'Croissant',
    subtitle: 'Golden, flaky French croissants with buttery laminated layers and airy honeycomb interior',
    cuisine: 'French',
    countryRegion: 'France',
    tags: ['Pastry', 'French', 'Croissant', 'Baking', 'Laminated'],
    overview: 'The undisputed icon of French viennoiserie. Layer upon layer of butter and yeasted dough laminated through precise turns, baked to a deep golden flaky crust with an open honeycomb crumb.',
    chefRationale: 'Alternating chilled butter sheets and dough creates steam between microscopic layers during baking, causing the pastry to puff into crisp honeycomb chambers.',
    difficulty: 'Grand Master Atelier',
    servings: 6,
    totalPrepTimeMinutes: 45,
    totalCookTimeMinutes: 20,
    overallDurationFormatted: '65 min',
    trendScore: 99.4,
    hotnessRank: 17,
    awardBadge: 'World Archive No. 17 • Parisian Viennoiserie',
    flavorAromaProfile: {
      umami: 70,
      acidity: 20,
      aromaticIntensity: 98,
      textureComplexity: 100,
      finishLength: 95
    },
    requiredTools: [
      {
        id: 'rolling-pin-marble',
        name: 'Heavy French Tapered Rolling Pin',
        category: 'Cookware',
        material: 'Hardwood / Marble',
        purpose: 'Maintains even thickness during delicate lamination turns'
      }
    ],
    ingredientsList: [
      { name: 'Flour', amount: '300g French T55 or bread flour', prepState: 'Sifted', addedAtMinute: 0, isArchiveSpecialty: true },
      { name: 'Butter', amount: '180g European dry butter (84% fat)', prepState: 'Formed into cold butter block', addedAtMinute: 10, isArchiveSpecialty: true },
      { name: 'Yeast', amount: '7g instant dry yeast', prepState: 'Active', addedAtMinute: 0, isArchiveSpecialty: false },
      { name: 'Milk', amount: '140ml whole milk', prepState: 'Chilled', addedAtMinute: 0, isArchiveSpecialty: false },
      { name: 'Sugar', amount: '35g', prepState: 'Fine granulated', addedAtMinute: 0, isArchiveSpecialty: false },
      { name: 'Salt', amount: '6g fine sea salt', prepState: 'Fine', addedAtMinute: 0, isArchiveSpecialty: false }
    ],
    timelineSteps: [
      {
        stepNumber: 1,
        timeOffsetFormatted: '00:00',
        timeOffsetSeconds: 0,
        title: 'Make a Yeasted Dough and Chill',
        actionDescription: 'Make a yeasted dough and chill.',
        ingredientAdditions: [
          { ingredientName: 'Flour', amount: '300g', technique: 'Kneaded' },
          { ingredientName: 'Yeast', amount: '7g', technique: 'Dissolved' },
          { ingredientName: 'Milk', amount: '140ml', technique: 'Incorporated' },
          { ingredientName: 'Sugar', amount: '35g', technique: 'Mixed' },
          { ingredientName: 'Salt', amount: '6g', technique: 'Mixed' }
        ],
        toolsUsed: ['Mixing Bowl'],
        criticalControlPoint: 'Knead to develop moderate gluten, then chill at 4°C.',
        sensoryCue: 'Smooth supple dough aroma with gentle yeast note.',
        soundscapeType: 'chop',
        spokenNarration: 'Make a yeasted dough and chill.'
      },
      {
        stepNumber: 2,
        timeOffsetFormatted: '15:00',
        timeOffsetSeconds: 900,
        title: 'Encase a Butter Block in the Dough',
        actionDescription: 'Encase a butter block in the dough.',
        ingredientAdditions: [{ ingredientName: 'Butter', amount: '180g block', technique: 'Enclosed' }],
        toolsUsed: ['Rolling Pin'],
        criticalControlPoint: 'Ensure butter and dough have identical pliability.',
        sensoryCue: 'Smooth cold butter envelope.',
        soundscapeType: 'plating',
        spokenNarration: 'Encase a cold butter block in the dough.'
      },
      {
        stepNumber: 3,
        timeOffsetFormatted: '20:00',
        timeOffsetSeconds: 1200,
        title: 'Perform a Series of Folds and Rolls to Laminate',
        actionDescription: 'Perform a series of folds and rolls to laminate.',
        ingredientAdditions: [],
        toolsUsed: ['French Rolling Pin'],
        criticalControlPoint: 'Roll evenly without rupturing butter layers.',
        sensoryCue: 'Floured surface and clean geometric dough edges.',
        soundscapeType: 'chop',
        spokenNarration: 'Perform a series of folds and rolls to laminate.'
      },
      {
        stepNumber: 4,
        timeOffsetFormatted: '25:00',
        timeOffsetSeconds: 1500,
        title: 'Chill Between Folds',
        actionDescription: 'Chill between folds.',
        ingredientAdditions: [],
        toolsUsed: [],
        criticalControlPoint: 'Keep butter firm so layers do not blend into dough.',
        sensoryCue: 'Chilled dough firming up.',
        soundscapeType: 'plating',
        spokenNarration: 'Chill between folds.'
      },
      {
        stepNumber: 5,
        timeOffsetFormatted: '35:00',
        timeOffsetSeconds: 2100,
        title: 'Roll Out, Cut Triangles, Shape into Crescents',
        actionDescription: 'Roll out and cut into triangles, shape into crescents.',
        ingredientAdditions: [],
        toolsUsed: ['Pastry Wheel'],
        criticalControlPoint: 'Roll gently from base to tip without squashing edges.',
        sensoryCue: 'Neat layered crescent shapes.',
        soundscapeType: 'chop',
        spokenNarration: 'Roll out, cut into triangles, and shape into crescents.'
      },
      {
        stepNumber: 6,
        timeOffsetFormatted: '42:00',
        timeOffsetSeconds: 2520,
        title: 'Proof Until Puffy',
        actionDescription: 'Proof until puffy.',
        ingredientAdditions: [],
        toolsUsed: ['Baking Sheet'],
        criticalControlPoint: 'Proof at 26-27°C until jiggling delicately.',
        sensoryCue: 'Pastries double in size with visible honeycomb edges.',
        soundscapeType: 'plating',
        spokenNarration: 'Proof until puffy.'
      },
      {
        stepNumber: 7,
        timeOffsetFormatted: '50:00',
        timeOffsetSeconds: 3000,
        title: 'Bake Until Deep Golden and Flaky',
        actionDescription: 'Bake until deep golden and flaky.',
        ingredientAdditions: [],
        toolsUsed: ['Oven'],
        criticalControlPoint: 'Bake at 390°F (200°C) until deep amber.',
        sensoryCue: 'Intoxicating sweet caramelized butter and toasted pastry aroma.',
        soundscapeType: 'sizzle',
        spokenNarration: 'Bake until deep golden and flaky.'
      }
    ],
    platingPresentation: 'Arranged on a wooden board showing visible honeycomb layers and deep golden sheen.',
    sommelierPairing: {
      vintage: 'Café au Lait / Champagne Brut',
      terroir: 'Épernay, France',
      tastingNote: 'Rich brioche and toasted hazelnut notes mirror the caramelized butter layers.'
    },
    heroImageUrl: imgCroissant,
    aiImagePrompt: 'Golden flaky croissants on a wooden board, visible honeycomb layers where one is torn open, buttery sheen, light dusting of flour, soft morning light from a cafe window.',
    createdAt: new Date().toISOString()
  },

  // 18. Coq au Vin — France
  {
    id: 'coq-au-vin-france',
    recipeNumber: 18,
    primaryIngredientId: 'braised-chicken-burgundy',
    primaryIngredientName: 'French Chicken & Old Burgundy Red Wine',
    dishTitle: 'Coq au Vin',
    subtitle: 'Rustic French braised chicken in rich Burgundy red wine with bacon lardons, mushrooms, and pearl onions',
    cuisine: 'French',
    countryRegion: 'France',
    tags: ['Braised', 'French', 'Coq au Vin', 'Burgundy', 'Comfort'],
    overview: 'A timeless French bistro masterpiece. Tender chicken pieces braised in deep red Burgundy wine with smoked bacon lardons, earthy cremini mushrooms, sweet glazed pearl onions, and fresh thyme in a heavy cast-iron cocotte.',
    chefRationale: 'Slow braising in tannin-rich red wine breaks down poultry collagen into a velvety, glossy sauce with deep savory complexity.',
    difficulty: 'Intermediate',
    servings: 4,
    totalPrepTimeMinutes: 20,
    totalCookTimeMinutes: 50,
    overallDurationFormatted: '70 min',
    trendScore: 98.8,
    hotnessRank: 18,
    awardBadge: 'World Archive No. 18 • Burgundian Bistro Classic',
    flavorAromaProfile: {
      umami: 96,
      acidity: 65,
      aromaticIntensity: 98,
      textureComplexity: 92,
      finishLength: 96
    },
    requiredTools: [
      {
        id: 'cast-iron-cocotte',
        name: 'Enameled Cast Iron Dutch Oven (Cocotte)',
        category: 'Cookware',
        material: 'Enameled Cast Iron',
        purpose: 'Provides even, gentle radiant heat for slow wine braising'
      }
    ],
    ingredientsList: [
      { name: 'Chicken', amount: '1kg bone-in chicken thighs & drumsticks', prepState: 'Patted dry', addedAtMinute: 0, isArchiveSpecialty: false },
      { name: 'Red wine', amount: '500ml dry Burgundy / Pinot Noir', prepState: 'Full-bodied red wine', addedAtMinute: 15, isArchiveSpecialty: true },
      { name: 'Bacon lardons', amount: '120g smoked bacon', prepState: 'Cut into thick matchsticks', addedAtMinute: 0, isArchiveSpecialty: false },
      { name: 'Mushrooms', amount: '200g brown button mushrooms', prepState: 'Quartered', addedAtMinute: 8, isArchiveSpecialty: false },
      { name: 'Pearl onions', amount: '150g fresh pearl onions', prepState: 'Peeled whole', addedAtMinute: 8, isArchiveSpecialty: false }
    ],
    timelineSteps: [
      {
        stepNumber: 1,
        timeOffsetFormatted: '00:00',
        timeOffsetSeconds: 0,
        title: 'Brown Chicken Pieces and Bacon in a Pot',
        actionDescription: 'Brown chicken pieces and bacon in a pot.',
        ingredientAdditions: [
          { ingredientName: 'Bacon lardons', amount: '120g', technique: 'Rendered' },
          { ingredientName: 'Chicken', amount: '1kg', technique: 'Seared golden' }
        ],
        toolsUsed: ['Enameled Cast Iron Cocotte'],
        criticalControlPoint: 'Sear chicken on high heat until deeply browned on all sides.',
        sensoryCue: 'Sizzling bacon fat and seared poultry aroma.',
        soundscapeType: 'sizzle',
        spokenNarration: 'Brown chicken pieces and bacon in a pot.'
      },
      {
        stepNumber: 2,
        timeOffsetFormatted: '08:00',
        timeOffsetSeconds: 480,
        title: 'Remove and Saute Mushrooms and Pearl Onions',
        actionDescription: 'Remove and saute mushrooms and pearl onions.',
        ingredientAdditions: [
          { ingredientName: 'Mushrooms', amount: '200g', technique: 'Sautéed' },
          { ingredientName: 'Pearl onions', amount: '150g', technique: 'Glazed' }
        ],
        toolsUsed: ['Cocotte'],
        criticalControlPoint: 'Sauté until onions are golden and mushrooms release moisture.',
        sensoryCue: 'Earthy mushroom and caramelized sweet onion aroma.',
        soundscapeType: 'sizzle',
        spokenNarration: 'Remove chicken and saute mushrooms and pearl onions in the drippings.'
      },
      {
        stepNumber: 3,
        timeOffsetFormatted: '15:00',
        timeOffsetSeconds: 900,
        title: 'Deglaze Pot with Red Wine',
        actionDescription: 'Deglaze pot with red wine.',
        ingredientAdditions: [{ ingredientName: 'Red wine', amount: '500ml', technique: 'Deglazed' }],
        toolsUsed: ['Wooden Spoon'],
        criticalControlPoint: 'Scrape all caramelized brown bits (fond) from bottom of pot.',
        sensoryCue: 'Intense burst of warm red wine steam.',
        soundscapeType: 'simmer',
        spokenNarration: 'Deglaze pot with dry red wine.'
      },
      {
        stepNumber: 4,
        timeOffsetFormatted: '18:00',
        timeOffsetSeconds: 1080,
        title: 'Return Chicken and Bacon to the Pot',
        actionDescription: 'Return chicken and bacon to the pot.',
        ingredientAdditions: [],
        toolsUsed: [],
        criticalControlPoint: 'Submerge chicken in red wine broth with thyme and bay leaf.',
        sensoryCue: 'Deep ruby wine sauce simmering around chicken.',
        soundscapeType: 'simmer',
        spokenNarration: 'Return chicken and bacon to the pot.'
      },
      {
        stepNumber: 5,
        timeOffsetFormatted: '20:00',
        timeOffsetSeconds: 1200,
        title: 'Cover and Braise Slowly Until Tender',
        actionDescription: 'Cover and braise slowly until chicken is tender.',
        ingredientAdditions: [],
        toolsUsed: ['Tight-Fitting Lid'],
        criticalControlPoint: 'Braise at gentle simmer for 35-40 minutes.',
        sensoryCue: 'Rich stew aroma filling the kitchen.',
        soundscapeType: 'simmer',
        spokenNarration: 'Cover and braise slowly until the chicken is meltingly tender.'
      },
      {
        stepNumber: 6,
        timeOffsetFormatted: '55:00',
        timeOffsetSeconds: 3300,
        title: 'Reduce Sauce If Needed and Serve',
        actionDescription: 'Reduce sauce if needed and serve.',
        ingredientAdditions: [],
        toolsUsed: ['Cocotte'],
        criticalControlPoint: 'Reduce sauce until it coats the back of a spoon in a glossy glaze.',
        sensoryCue: 'Glossy dark mahogany sauce glistening over tender meat.',
        soundscapeType: 'plating',
        spokenNarration: 'Reduce sauce until velvety and serve.'
      }
    ],
    platingPresentation: 'Served in a rustic cast iron pot with fresh thyme sprigs and crusty sourdough bread.',
    sommelierPairing: {
      vintage: '2018 Bourgogne Pinot Noir',
      terroir: 'Burgundy, France',
      tastingNote: 'Earthy forest floor, black cherry, and gentle spice elevate the rich wine braise.'
    },
    heroImageUrl: imgCoqAuVin,
    aiImagePrompt: 'Rustic pot of coq au vin: chicken pieces braised in deep red wine sauce with pearl onions, mushrooms, and bacon lardons, garnished with fresh thyme, rising steam, cast iron pot on a wooden table.',
    createdAt: new Date().toISOString()
  },

  // 19. Pierogi — Poland
  {
    id: 'pierogi-poland',
    recipeNumber: 19,
    primaryIngredientId: 'potato-cheese-dough',
    primaryIngredientName: 'Tender Dough & Potato-Cheese Curd',
    dishTitle: 'Pierogi',
    subtitle: 'Golden pan-fried Polish dumplings stuffed with whipped potato and cheese, caramelized onions, and sour cream',
    cuisine: 'Polish',
    countryRegion: 'Poland',
    tags: ['Dumplings', 'Polish', 'Pierogi', 'Comfort', 'Caramelized Onions'],
    overview: 'The beloved national comfort food of Poland (Pierogi Ruskie). Tender flour dough wrapped around a filling of fluffy whipped potatoes, farmer cheese (twaróg), and caramelized onions, boiled then pan-fried in butter until golden crisp.',
    chefRationale: 'Resting the soft flour dough allows gluten to relax completely, making it easy to roll paper-thin without tearing.',
    difficulty: 'Intermediate',
    servings: 4,
    totalPrepTimeMinutes: 30,
    totalCookTimeMinutes: 15,
    overallDurationFormatted: '45 min',
    trendScore: 98.4,
    hotnessRank: 19,
    awardBadge: 'World Archive No. 19 • Polish Heritage Dumpling',
    flavorAromaProfile: {
      umami: 88,
      acidity: 40,
      aromaticIntensity: 90,
      textureComplexity: 94,
      finishLength: 90
    },
    requiredTools: [
      {
        id: 'skillet-butter',
        name: 'Cast Iron Skillet',
        category: 'Cookware',
        material: 'Cast Iron',
        purpose: 'Imparts golden, crispy butter sear on boiled dumplings'
      }
    ],
    ingredientsList: [
      { name: 'Flour dough', amount: '300g soft flour dough', prepState: 'Rested 30 min', addedAtMinute: 0, isArchiveSpecialty: false },
      { name: 'Potato', amount: '350g Russet potatoes', prepState: 'Boiled and mashed', addedAtMinute: 5, isArchiveSpecialty: false },
      { name: 'Cheese', amount: '150g farmer cheese or cheddar', prepState: 'Crumbled', addedAtMinute: 5, isArchiveSpecialty: true },
      { name: 'Onion', amount: '2 large yellow onions', prepState: 'Slowly caramelized in butter', addedAtMinute: 20, isArchiveSpecialty: false },
      { name: 'Sour cream', amount: '100g Polish sour cream (śmietana)', prepState: 'Chilled', addedAtMinute: 30, isArchiveSpecialty: false }
    ],
    timelineSteps: [
      {
        stepNumber: 1,
        timeOffsetFormatted: '00:00',
        timeOffsetSeconds: 0,
        title: 'Make Dough and Let It Rest',
        actionDescription: 'Make dough and let it rest.',
        ingredientAdditions: [{ ingredientName: 'Flour dough', amount: '300g', technique: 'Kneaded and rested' }],
        toolsUsed: ['Bowl'],
        criticalControlPoint: 'Rest covered for 30 minutes to relax gluten.',
        sensoryCue: 'Soft, elastic dough surface.',
        soundscapeType: 'chop',
        spokenNarration: 'Make dough and let it rest.'
      },
      {
        stepNumber: 2,
        timeOffsetFormatted: '10:00',
        timeOffsetSeconds: 600,
        title: 'Roll Dough Thin and Cut into Rounds',
        actionDescription: 'Roll dough thin and cut into rounds.',
        ingredientAdditions: [],
        toolsUsed: ['Rolling Pin', 'Round Pastry Cutter'],
        criticalControlPoint: 'Roll to 1/8-inch thickness.',
        sensoryCue: 'Smooth rounds of tender dough.',
        soundscapeType: 'chop',
        spokenNarration: 'Roll dough thin and cut into rounds.'
      },
      {
        stepNumber: 3,
        timeOffsetFormatted: '15:00',
        timeOffsetSeconds: 900,
        title: 'Mix Mashed Potato with Cheese for the Filling',
        actionDescription: 'Mix mashed potato with cheese for the filling.',
        ingredientAdditions: [
          { ingredientName: 'Potato', amount: '350g', technique: 'Mashed' },
          { ingredientName: 'Cheese', amount: '150g', technique: 'Folded in' }
        ],
        toolsUsed: ['Bowl', 'Potato Masher'],
        criticalControlPoint: 'Season with salt and plenty of cracked black pepper.',
        sensoryCue: 'Creamy, savory potato-cheese aroma.',
        soundscapeType: 'whisk',
        spokenNarration: 'Mix mashed potato with cheese for the filling.'
      },
      {
        stepNumber: 4,
        timeOffsetFormatted: '20:00',
        timeOffsetSeconds: 1200,
        title: 'Fill Each Round, Fold, and Seal the Edges',
        actionDescription: 'Fill each round, fold, and seal the edges.',
        ingredientAdditions: [],
        toolsUsed: [],
        criticalControlPoint: 'Pinch edges tightly with fingers or fork tines to prevent opening.',
        sensoryCue: 'Neat half-moon filled dumplings.',
        soundscapeType: 'plating',
        spokenNarration: 'Fill each round, fold, and seal the edges.'
      },
      {
        stepNumber: 5,
        timeOffsetFormatted: '26:00',
        timeOffsetSeconds: 1560,
        title: 'Boil Pierogi Until They Float',
        actionDescription: 'Boil pierogi until they float.',
        ingredientAdditions: [],
        toolsUsed: ['Stock Pot', 'Slotted Spoon'],
        criticalControlPoint: 'Cook 2-3 minutes once they float to the surface.',
        sensoryCue: 'Dumplings bobbing in salted boiling water.',
        soundscapeType: 'simmer',
        spokenNarration: 'Boil pierogi until they float.'
      },
      {
        stepNumber: 6,
        timeOffsetFormatted: '30:00',
        timeOffsetSeconds: 1800,
        title: 'Optionally Pan-Fry in Butter Until Golden',
        actionDescription: 'Optionally pan-fry in butter until golden.',
        ingredientAdditions: [{ ingredientName: 'Onion', amount: 'Caramelized', technique: 'Pan-fried' }],
        toolsUsed: ['Cast Iron Skillet'],
        criticalControlPoint: 'Sear in foaming butter until edges are crisp and golden.',
        sensoryCue: 'Sizzling foaming butter and sweet caramelized onions.',
        soundscapeType: 'sizzle',
        spokenNarration: 'Pan-fry in butter until golden and crisp.'
      },
      {
        stepNumber: 7,
        timeOffsetFormatted: '35:00',
        timeOffsetSeconds: 2100,
        title: 'Serve with Sour Cream and Caramelized Onions',
        actionDescription: 'Serve with sour cream and caramelized onions.',
        ingredientAdditions: [{ ingredientName: 'Sour cream', amount: '100g', technique: 'Dollop' }],
        toolsUsed: ['Platter'],
        criticalControlPoint: 'Serve hot with cool sour cream alongside.',
        sensoryCue: 'Rich caramelized onion sweetness and tangy cream.',
        soundscapeType: 'plating',
        spokenNarration: 'Serve with sour cream and caramelized onions.'
      }
    ],
    platingPresentation: 'Arranged on a rustic ceramic plate topped with golden caramelized onions and a dollop of sour cream.',
    sommelierPairing: {
      vintage: 'Polish Złote Lwy Amber Lager',
      terroir: 'Gdańsk, Poland',
      tastingNote: 'Malty sweetness and clean hop bitterness balance butter, potato, and sweet onions.'
    },
    heroImageUrl: imgPierogi,
    aiImagePrompt: 'Plate of golden pan-fried pierogi dumplings with crispy edges, topped with caramelized onions and a dollop of sour cream, rustic wooden table.',
    createdAt: new Date().toISOString()
  },

  // 20. Borscht — Ukraine/Russia
  {
    id: 'borscht-ukraine-russia',
    recipeNumber: 20,
    primaryIngredientId: 'beet-beef-broth',
    primaryIngredientName: 'Ruby Red Beets & Smetana Dill',
    dishTitle: 'Borscht',
    subtitle: 'Vivid magenta beet soup with tender beef, shredded cabbage, carrots, dill, and a swirl of sour cream',
    cuisine: 'Eastern European',
    countryRegion: 'Ukraine/Russia',
    tags: ['Soup', 'Borscht', 'Eastern European', 'Beetroot', 'Comfort'],
    overview: 'The iconic ruby-red soup of Eastern Europe. Earthy sweet beets simmered with cabbage, potatoes, carrots, and beef broth, accented with a touch of vinegar or lemon, topped with fresh dill and a cloud of rich sour cream (smetana).',
    chefRationale: 'Adding a splash of acid (vinegar or lemon juice) while cooking preserves the vivid magenta betalain pigments of the beets.',
    difficulty: 'Intermediate',
    servings: 4,
    totalPrepTimeMinutes: 20,
    totalCookTimeMinutes: 40,
    overallDurationFormatted: '60 min',
    trendScore: 98.3,
    hotnessRank: 20,
    awardBadge: 'World Archive No. 20 • Slavic Heritage Broth',
    flavorAromaProfile: {
      umami: 92,
      acidity: 75,
      aromaticIntensity: 90,
      textureComplexity: 92,
      finishLength: 92
    },
    requiredTools: [
      {
        id: 'soup-kettle',
        name: 'Heavy Stainless Soup Pot',
        category: 'Cookware',
        material: 'Tri-Ply Stainless Steel',
        purpose: 'Simmers vegetables evenly without scorching'
      }
    ],
    ingredientsList: [
      { name: 'Beets', amount: '3 medium fresh beets', prepState: 'Peeled and grated or julienned', addedAtMinute: 0, isArchiveSpecialty: true },
      { name: 'Cabbage', amount: '200g green cabbage', prepState: 'Finely shredded', addedAtMinute: 15, isArchiveSpecialty: false },
      { name: 'Potatoes', amount: '2 medium potatoes', prepState: 'Diced', addedAtMinute: 10, isArchiveSpecialty: false },
      { name: 'Carrots', amount: '2 carrots', prepState: 'Grated', addedAtMinute: 5, isArchiveSpecialty: false },
      { name: 'Beef broth', amount: '1 liter rich beef stock', prepState: 'Hot stock', addedAtMinute: 0, isArchiveSpecialty: false },
      { name: 'Sour cream', amount: '80g smetana or sour cream', prepState: 'Chilled for topping', addedAtMinute: 38, isArchiveSpecialty: false }
    ],
    timelineSteps: [
      {
        stepNumber: 1,
        timeOffsetFormatted: '00:00',
        timeOffsetSeconds: 0,
        title: 'Simmer Beef Broth with Beets, Cabbage, and Vegetables',
        actionDescription: 'Simmer beef broth with beets, cabbage, and vegetables.',
        ingredientAdditions: [
          { ingredientName: 'Beef broth', amount: '1 liter', technique: 'Simmered' },
          { ingredientName: 'Beets', amount: '3 beets', technique: 'Simmered' },
          { ingredientName: 'Carrots', amount: '2 carrots', technique: 'Simmered' },
          { ingredientName: 'Potatoes', amount: '2 potatoes', technique: 'Simmered' },
          { ingredientName: 'Cabbage', amount: '200g', technique: 'Simmered' }
        ],
        toolsUsed: ['Heavy Stainless Soup Pot'],
        criticalControlPoint: 'Maintain gentle simmer to release deep beet sweetness.',
        sensoryCue: 'Broth transforms into a glowing vivid magenta.',
        soundscapeType: 'simmer',
        spokenNarration: 'Simmer beef broth with beets, cabbage, and vegetables.'
      },
      {
        stepNumber: 2,
        timeOffsetFormatted: '25:00',
        timeOffsetSeconds: 1500,
        title: 'Cook Until Vegetables Are Tender',
        actionDescription: 'Cook until vegetables are tender.',
        ingredientAdditions: [],
        toolsUsed: [],
        criticalControlPoint: 'Vegetables should be soft and translucent with slight tooth.',
        sensoryCue: 'Sweet earthy root vegetable aroma.',
        soundscapeType: 'simmer',
        spokenNarration: 'Cook until vegetables are tender.'
      },
      {
        stepNumber: 3,
        timeOffsetFormatted: '30:00',
        timeOffsetSeconds: 1800,
        title: 'Season with Salt, Pepper, and a Touch of Vinegar',
        actionDescription: 'Season with salt, pepper, and a touch of vinegar.',
        ingredientAdditions: [],
        toolsUsed: ['Tasting Spoon'],
        criticalControlPoint: 'Acid balances beet sweetness and fixes bright magenta color.',
        sensoryCue: 'Bright, sweet-sour aromatic steam.',
        soundscapeType: 'simmer',
        spokenNarration: 'Season with salt, pepper, and a touch of vinegar.'
      },
      {
        stepNumber: 4,
        timeOffsetFormatted: '35:00',
        timeOffsetSeconds: 2100,
        title: 'Ladle into Bowls',
        actionDescription: 'Ladle into bowls.',
        ingredientAdditions: [],
        toolsUsed: ['Ladle'],
        criticalControlPoint: 'Ensure each bowl receives a generous portion of broth and vegetables.',
        sensoryCue: 'Deep magenta soup gleaming in ceramic bowls.',
        soundscapeType: 'plating',
        spokenNarration: 'Ladle into bowls.'
      },
      {
        stepNumber: 5,
        timeOffsetFormatted: '38:00',
        timeOffsetSeconds: 2280,
        title: 'Top with a Dollop of Sour Cream and Fresh Dill',
        actionDescription: 'Top each bowl with a dollop of sour cream and fresh dill.',
        ingredientAdditions: [{ ingredientName: 'Sour cream', amount: 'Dollop', technique: 'Garnish' }],
        toolsUsed: ['Spoon'],
        criticalControlPoint: 'Serve with fresh feathery dill sprigs and dark rye pumpernickel bread.',
        sensoryCue: 'White sour cream marbling into vivid magenta broth with fresh herbal dill.',
        soundscapeType: 'plating',
        spokenNarration: 'Top each bowl with a dollop of sour cream and fresh dill.'
      }
    ],
    platingPresentation: 'Served in a rustic ceramic bowl on a linen napkin with a white sour cream swirl and fresh dill.',
    sommelierPairing: {
      vintage: '2020 Pinot Noir / Rye Bread kvass',
      terroir: 'Baden, Germany',
      tastingNote: 'Tart red berry acidity complements the earthy sweet beets and creamy smetana.'
    },
    heroImageUrl: imgBorscht,
    aiImagePrompt: 'Vivid magenta bowl of borscht soup with visible chunks of beet, cabbage, and carrot, a white swirl of sour cream on top, fresh dill garnish, rustic bowl on a linen napkin.',
    createdAt: new Date().toISOString()
  }
];
