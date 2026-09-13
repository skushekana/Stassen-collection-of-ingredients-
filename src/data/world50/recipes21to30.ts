import { CulinaryMasterclass } from '../../types';

import imgSwedishMeatballs from '../../assets/images/swedish_meatballs_1788217228831.jpg';
import imgPoutine from '../../assets/images/canadian_poutine_1788217242116.jpg';
import imgClamChowder from '../../assets/images/clam_chowder_1788217254678.jpg';
import imgBbqPork from '../../assets/images/bbq_pulled_pork_1788217266850.jpg';
import imgNyCheesecake from '../../assets/images/ny_cheesecake_1788217280581.jpg';
import imgChurros from '../../assets/images/spanish_churros_1788217291998.jpg';
import imgTiramisu from '../../assets/images/italian_tiramisu_1788217306169.jpg';
import imgBaklava from '../../assets/images/pistachio_baklava_1788217320887.jpg';
import imgMochi from '../../assets/images/japanese_mochi_1788217334157.jpg';
import imgChilesNogada from '../../assets/images/chiles_en_nogada_1788217347396.jpg';

export const RECIPES_21_TO_30: CulinaryMasterclass[] = [
  // 21. Swedish Meatballs — Sweden
  {
    id: 'swedish-meatballs-sweden',
    recipeNumber: 21,
    primaryIngredientId: 'allspice-meatballs-lingonberry',
    primaryIngredientName: 'Spiced Meatballs & Lingonberry Jam',
    dishTitle: 'Swedish Meatballs (Köttbullar)',
    subtitle: 'Tender spiced Swedish meatballs coated in velvety cream gravy with lingonberry jam and buttery mashed potatoes',
    cuisine: 'Nordic',
    countryRegion: 'Sweden',
    tags: ['Meatballs', 'Nordic', 'Swedish', 'Comfort', 'Lingonberry'],
    overview: 'The beloved crown jewel of Swedish home cooking (Köttbullar). Spiced ground beef and pork meatballs scented with allspice and nutmeg, browned in butter and smothered in a rich cream gravy, served alongside tart lingonberry jam and creamy mashed potatoes.',
    chefRationale: 'Soaking fresh breadcrumbs in milk (panade) ensures the meatballs remain moist and tender during browning.',
    difficulty: 'Intermediate',
    servings: 4,
    totalPrepTimeMinutes: 20,
    totalCookTimeMinutes: 25,
    overallDurationFormatted: '45 min',
    trendScore: 98.6,
    hotnessRank: 21,
    awardBadge: 'World Archive No. 21 • Nordic Comfort Classic',
    flavorAromaProfile: {
      umami: 95,
      acidity: 65,
      aromaticIntensity: 90,
      textureComplexity: 92,
      finishLength: 92
    },
    requiredTools: [
      {
        id: 'cast-iron-meatball',
        name: 'Large Cast Iron Skillet',
        category: 'Cookware',
        material: 'Cast Iron',
        purpose: 'Provides even browning and pan drippings for the cream roux gravy'
      }
    ],
    ingredientsList: [
      { name: 'Ground meat', amount: '400g 50/50 beef and pork blend', prepState: 'Chilled', addedAtMinute: 0, isArchiveSpecialty: false },
      { name: 'Cream gravy', amount: '250ml beef broth, heavy cream, butter, flour', prepState: 'Simmered roux gravy', addedAtMinute: 15, isArchiveSpecialty: true },
      { name: 'Lingonberry jam', amount: '100g wild Swedish lingonberry jam', prepState: 'Chilled tart preserve', addedAtMinute: 22, isArchiveSpecialty: true },
      { name: 'Breadcrumbs', amount: '50g fresh breadcrumbs soaked in 60ml milk', prepState: 'Panade paste', addedAtMinute: 0, isArchiveSpecialty: false },
      { name: 'Allspice and nutmeg', amount: '1/2 tsp allspice + 1/4 tsp nutmeg', prepState: 'Freshly grated', addedAtMinute: 0, isArchiveSpecialty: true }
    ],
    timelineSteps: [
      {
        stepNumber: 1,
        timeOffsetFormatted: '00:00',
        timeOffsetSeconds: 0,
        title: 'Mix Ground Meat with Breadcrumbs, Onion, and Spices',
        actionDescription: 'Mix ground meat with breadcrumbs, onion, and spices.',
        ingredientAdditions: [
          { ingredientName: 'Ground meat', amount: '400g', technique: 'Mixed' },
          { ingredientName: 'Breadcrumbs', amount: '50g panade', technique: 'Folded' },
          { ingredientName: 'Allspice and nutmeg', amount: 'Ground spices', technique: 'Blended' }
        ],
        toolsUsed: ['Mixing Bowl'],
        criticalControlPoint: 'Mix gently until combined without overworking meat.',
        sensoryCue: 'Warm holiday spice aroma of allspice and nutmeg.',
        soundscapeType: 'chop',
        spokenNarration: 'Mix ground meat with breadcrumbs, onion, and spices.'
      },
      {
        stepNumber: 2,
        timeOffsetFormatted: '08:00',
        timeOffsetSeconds: 480,
        title: 'Shape into Small Even Meatballs',
        actionDescription: 'Shape into small even meatballs.',
        ingredientAdditions: [],
        toolsUsed: ['Small Scoop'],
        criticalControlPoint: 'Form into 1-inch balls with wet hands for a smooth surface.',
        sensoryCue: 'Uniform round meatballs lined up.',
        soundscapeType: 'plating',
        spokenNarration: 'Shape into small even meatballs.'
      },
      {
        stepNumber: 3,
        timeOffsetFormatted: '12:00',
        timeOffsetSeconds: 720,
        title: 'Brown Meatballs in Butter Until Cooked Through',
        actionDescription: 'Brown meatballs in butter until cooked through.',
        ingredientAdditions: [],
        toolsUsed: ['Large Cast Iron Skillet'],
        criticalControlPoint: 'Roll gently in foaming butter to brown on all sides.',
        sensoryCue: 'Sizzling foaming butter and caramelized meat crust.',
        soundscapeType: 'sizzle',
        spokenNarration: 'Brown meatballs in butter until cooked through.'
      },
      {
        stepNumber: 4,
        timeOffsetFormatted: '18:00',
        timeOffsetSeconds: 1080,
        title: 'Make Cream Gravy in the Pan Drippings',
        actionDescription: 'Make cream gravy in the pan drippings with broth, cream, and flour.',
        ingredientAdditions: [{ ingredientName: 'Cream gravy', amount: '250ml', technique: 'Whisked roux' }],
        toolsUsed: ['Whisk'],
        criticalControlPoint: 'Whisk flour into pan drippings, then stream in beef broth and cream.',
        sensoryCue: 'Velvety golden brown gravy simmering smoothly.',
        soundscapeType: 'whisk',
        spokenNarration: 'Make cream gravy in the pan drippings with broth, cream, and flour.'
      },
      {
        stepNumber: 5,
        timeOffsetFormatted: '22:00',
        timeOffsetSeconds: 1320,
        title: 'Coat Meatballs in Gravy and Serve with Lingonberry Jam & Mash',
        actionDescription: 'Coat meatballs in gravy and serve with lingonberry jam and mashed potatoes.',
        ingredientAdditions: [{ ingredientName: 'Lingonberry jam', amount: '100g', technique: 'Table-side' }],
        toolsUsed: ['Platter'],
        criticalControlPoint: 'Serve hot with tart red lingonberries for flavor contrast.',
        sensoryCue: 'Glossy cream gravy over tender meatballs beside ruby lingonberries.',
        soundscapeType: 'plating',
        spokenNarration: 'Coat meatballs in gravy and serve with lingonberry jam and mashed potatoes.'
      }
    ],
    platingPresentation: 'Arranged on a white plate: meatballs coated in cream gravy beside buttery mashed potatoes and ruby lingonberry jam.',
    sommelierPairing: {
      vintage: '2020 Spätburgunder (Pinot Noir)',
      terroir: 'Pfalz, Germany',
      tastingNote: 'Bright red cherry acidity matches tart lingonberries and cuts through rich cream gravy.'
    },
    heroImageUrl: imgSwedishMeatballs,
    aiImagePrompt: 'Plate of Swedish meatballs coated in velvety brown cream gravy, served alongside creamy mashed potatoes and a spoonful of bright red lingonberry jam, fresh parsley garnish.',
    createdAt: new Date().toISOString()
  },

  // 22. Poutine — Canada
  {
    id: 'poutine-canada',
    recipeNumber: 22,
    primaryIngredientId: 'cheese-curds-brown-gravy',
    primaryIngredientName: 'Fresh Squeaky Cheese Curds & Rich Brown Gravy',
    dishTitle: 'Poutine',
    subtitle: 'Crisp golden french fries loaded with squeaky white cheddar cheese curds and smothered in piping-hot brown gravy',
    cuisine: 'Canadian',
    countryRegion: 'Canada',
    tags: ['Poutine', 'Canadian', 'Quebec', 'Cheese Curds', 'Comfort'],
    overview: 'The quintessential comfort food of Quebec, Canada. A mountain of freshly fried, crispy golden russet fries topped with room-temperature squeaky white cheddar cheese curds, smothered in piping-hot savory brown gravy that melts the curds into gooey pockets.',
    chefRationale: 'Using room-temperature curds and boiling-hot gravy creates the exact balance of soft, stringy melt with squeaky interior texture.',
    difficulty: 'Easy',
    servings: 2,
    totalPrepTimeMinutes: 15,
    totalCookTimeMinutes: 15,
    overallDurationFormatted: '30 min',
    trendScore: 98.7,
    hotnessRank: 22,
    awardBadge: 'World Archive No. 22 • Quebecois Classic',
    flavorAromaProfile: {
      umami: 96,
      acidity: 40,
      aromaticIntensity: 90,
      textureComplexity: 96,
      finishLength: 90
    },
    requiredTools: [
      {
        id: 'fryer-poutine',
        name: 'Deep Fryer & Gravy Ladle',
        category: 'Cookware',
        material: 'Stainless Steel',
        purpose: 'Fries potatoes to maximum crispness and pours boiling gravy'
      }
    ],
    ingredientsList: [
      { name: 'French fries', amount: '400g Russet potatoes', prepState: 'Double-fried until crisp and golden', addedAtMinute: 0, isArchiveSpecialty: false },
      { name: 'Cheese curds', amount: '150g fresh white cheddar curds', prepState: 'Room temperature squeaky curds', addedAtMinute: 10, isArchiveSpecialty: true },
      { name: 'Brown gravy', amount: '250ml rich beef & chicken velouté gravy', prepState: 'Piping hot', addedAtMinute: 12, isArchiveSpecialty: true }
    ],
    timelineSteps: [
      {
        stepNumber: 1,
        timeOffsetFormatted: '00:00',
        timeOffsetSeconds: 0,
        title: 'Deep-Fry Fries Until Crisp and Golden',
        actionDescription: 'Deep-fry fries until crisp and golden.',
        ingredientAdditions: [{ ingredientName: 'French fries', amount: '400g', technique: 'Double-fried' }],
        toolsUsed: ['Deep Fryer'],
        criticalControlPoint: 'Double fry at 325°F then 375°F for maximum crunch.',
        sensoryCue: 'Audible crackle and golden crispy potato aroma.',
        soundscapeType: 'sizzle',
        spokenNarration: 'Deep-fry fries until crisp and golden.'
      },
      {
        stepNumber: 2,
        timeOffsetFormatted: '08:00',
        timeOffsetSeconds: 480,
        title: 'Heat Brown Gravy Until Piping Hot',
        actionDescription: 'Heat brown gravy until piping hot.',
        ingredientAdditions: [{ ingredientName: 'Brown gravy', amount: '250ml', technique: 'Simmered' }],
        toolsUsed: ['Saucepan'],
        criticalControlPoint: 'Gravy must be near boiling to melt cheese curds on contact.',
        sensoryCue: 'Rich savory peppery beef gravy aroma.',
        soundscapeType: 'simmer',
        spokenNarration: 'Heat brown gravy until piping hot.'
      },
      {
        stepNumber: 3,
        timeOffsetFormatted: '10:00',
        timeOffsetSeconds: 600,
        title: 'Place Hot Fries in a Bowl',
        actionDescription: 'Place hot fries in a bowl.',
        ingredientAdditions: [],
        toolsUsed: ['Serving Bowl'],
        criticalControlPoint: 'Layer while blazing hot straight from the oil.',
        sensoryCue: 'Steaming golden fries piled high.',
        soundscapeType: 'plating',
        spokenNarration: 'Place hot fries in a bowl.'
      },
      {
        stepNumber: 4,
        timeOffsetFormatted: '11:00',
        timeOffsetSeconds: 660,
        title: 'Scatter Fresh Cheese Curds Throughout the Fries',
        actionDescription: 'Scatter fresh cheese curds throughout the fries.',
        ingredientAdditions: [{ ingredientName: 'Cheese curds', amount: '150g', technique: 'Evenly scattered' }],
        toolsUsed: [],
        criticalControlPoint: 'Tuck curds in between fries for even distribution.',
        sensoryCue: 'Squeaky fresh white curds nestled into hot fries.',
        soundscapeType: 'plating',
        spokenNarration: 'Scatter fresh cheese curds throughout the fries.'
      },
      {
        stepNumber: 5,
        timeOffsetFormatted: '12:00',
        timeOffsetSeconds: 720,
        title: 'Pour Hot Gravy Over Top to Melt the Cheese',
        actionDescription: 'Pour hot gravy over the top to partially melt the cheese.',
        ingredientAdditions: [],
        toolsUsed: ['Gravy Ladle'],
        criticalControlPoint: 'Pour in a generous circular cascade over every section.',
        sensoryCue: 'Hissing steam as boiling gravy softens the cheese curds.',
        soundscapeType: 'drizzle',
        spokenNarration: 'Pour hot gravy over the top to melt the cheese.'
      },
      {
        stepNumber: 6,
        timeOffsetFormatted: '14:00',
        timeOffsetSeconds: 840,
        title: 'Serve Immediately While Steaming',
        actionDescription: 'Serve immediately while steaming.',
        ingredientAdditions: [],
        toolsUsed: [],
        criticalControlPoint: 'Eat immediately while fries are crisp and cheese is stretchy.',
        sensoryCue: 'Steaming savory poutine with gooey melted cheese strands.',
        soundscapeType: 'plating',
        spokenNarration: 'Serve immediately while steaming.'
      }
    ],
    platingPresentation: 'Piled in a shallow bowl showing crispy fries, partially melted white curds, and cascading dark gravy.',
    sommelierPairing: {
      vintage: 'Unibroue Blanche de Chambly / Amber Ale',
      terroir: 'Quebec, Canada',
      tastingNote: 'Spiced wheat and orange peel notes cut through savory gravy and rich cheese curds.'
    },
    heroImageUrl: imgPoutine,
    aiImagePrompt: 'Close-up of Canadian poutine: crispy golden french fries topped with fresh white cheese curds, smothered in glossy brown gravy, melted cheese pulling away, served in a shallow bowl, steam rising.',
    createdAt: new Date().toISOString()
  },

  // 23. Clam Chowder — USA
  {
    id: 'clam-chowder-usa',
    recipeNumber: 23,
    primaryIngredientId: 'tender-clams-heavy-cream',
    primaryIngredientName: 'Sweet Ocean Clams & Creamy Potato Broth',
    dishTitle: 'Clam Chowder',
    subtitle: 'Creamy New England clam chowder loaded with sweet tender clams, diced potatoes, salt pork, and oyster crackers',
    cuisine: 'American',
    countryRegion: 'USA (New England)',
    tags: ['Soup', 'Clam Chowder', 'American', 'Seafood', 'Comfort'],
    overview: 'The iconic coastal classic of New England. Tender chopped sea clams simmered with sweet clam broth, rendered salt pork or bacon, buttery sautéed onions, celery, and tender diced potatoes in a rich heavy cream base, served with oyster crackers.',
    chefRationale: 'Starchy diced potatoes break down slightly to naturally thicken the clam nectar and cream base into a velvety chowder.',
    difficulty: 'Intermediate',
    servings: 4,
    totalPrepTimeMinutes: 20,
    totalCookTimeMinutes: 25,
    overallDurationFormatted: '45 min',
    trendScore: 98.4,
    hotnessRank: 23,
    awardBadge: 'World Archive No. 23 • New England Coastal Legend',
    flavorAromaProfile: {
      umami: 96,
      acidity: 30,
      aromaticIntensity: 90,
      textureComplexity: 94,
      finishLength: 92
    },
    requiredTools: [
      {
        id: 'dutch-oven-chowder',
        name: 'Heavy Base Dutch Oven',
        category: 'Cookware',
        material: 'Enameled Cast Iron',
        purpose: 'Provides gentle simmer preventing cream scorching'
      }
    ],
    ingredientsList: [
      { name: 'Clams', amount: '350g tender chopped sea clams in nectar', prepState: 'Clams chopped, nectar reserved', addedAtMinute: 15, isArchiveSpecialty: true },
      { name: 'Potatoes', amount: '3 medium Russet potatoes', prepState: 'Diced into 1/2-inch cubes', addedAtMinute: 5, isArchiveSpecialty: false },
      { name: 'Heavy cream', amount: '250ml heavy whipping cream', prepState: 'Chilled', addedAtMinute: 18, isArchiveSpecialty: false },
      { name: 'Bacon', amount: '100g smoked bacon or salt pork', prepState: 'Diced small', addedAtMinute: 0, isArchiveSpecialty: false },
      { name: 'Butter', amount: '30g unsalted butter', prepState: 'Cubed', addedAtMinute: 0, isArchiveSpecialty: false },
      { name: 'Oyster crackers', amount: '1 bowl', prepState: 'Crisp crackers for topping', addedAtMinute: 22, isArchiveSpecialty: false }
    ],
    timelineSteps: [
      {
        stepNumber: 1,
        timeOffsetFormatted: '00:00',
        timeOffsetSeconds: 0,
        title: 'Cook Bacon in a Pot Until Crisp, Remove',
        actionDescription: 'Cook bacon in a pot until crisp, remove.',
        ingredientAdditions: [{ ingredientName: 'Bacon', amount: '100g', technique: 'Rendered crisp' }],
        toolsUsed: ['Heavy Base Dutch Oven'],
        criticalControlPoint: 'Render out savory fat without burning.',
        sensoryCue: 'Smoky sizzling bacon aroma.',
        soundscapeType: 'sizzle',
        spokenNarration: 'Cook bacon in a pot until crisp, then set aside.'
      },
      {
        stepNumber: 2,
        timeOffsetFormatted: '04:00',
        timeOffsetSeconds: 240,
        title: 'Saute Onion and Celery in the Bacon Fat',
        actionDescription: 'Saute onion and celery in the bacon fat.',
        ingredientAdditions: [{ ingredientName: 'Butter', amount: '30g', technique: 'Melted with veg' }],
        toolsUsed: ['Wooden Spoon'],
        criticalControlPoint: 'Cook until vegetables are soft and translucent.',
        sensoryCue: 'Sweet onion and celery fragrance blooming.',
        soundscapeType: 'sizzle',
        spokenNarration: 'Saute onion and celery in the bacon fat and butter.'
      },
      {
        stepNumber: 3,
        timeOffsetFormatted: '08:00',
        timeOffsetSeconds: 480,
        title: 'Add Clam Broth and Diced Potatoes, Simmer Until Tender',
        actionDescription: 'Add clam broth and diced potatoes, simmer until tender.',
        ingredientAdditions: [{ ingredientName: 'Potatoes', amount: '3 diced', technique: 'Simmered' }],
        toolsUsed: ['Dutch Oven'],
        criticalControlPoint: 'Simmer until potatoes are fork-tender.',
        sensoryCue: 'Briny ocean clam nectar steam.',
        soundscapeType: 'simmer',
        spokenNarration: 'Add clam broth and diced potatoes, then simmer until tender.'
      },
      {
        stepNumber: 4,
        timeOffsetFormatted: '16:00',
        timeOffsetSeconds: 960,
        title: 'Stir in Heavy Cream and Clams',
        actionDescription: 'Stir in heavy cream and clams.',
        ingredientAdditions: [
          { ingredientName: 'Heavy cream', amount: '250ml', technique: 'Streamed in' },
          { ingredientName: 'Clams', amount: '350g', technique: 'Folded in' }
        ],
        toolsUsed: ['Ladle'],
        criticalControlPoint: 'Keep heat low; do not boil rapidly to keep clams tender.',
        sensoryCue: 'Broth transforms into rich, velvety white chowder.',
        soundscapeType: 'simmer',
        spokenNarration: 'Stir in heavy cream and clams.'
      },
      {
        stepNumber: 5,
        timeOffsetFormatted: '20:00',
        timeOffsetSeconds: 1200,
        title: 'Simmer Gently Until Thickened',
        actionDescription: 'Simmer gently until thickened.',
        ingredientAdditions: [],
        toolsUsed: [],
        criticalControlPoint: 'Season with cracked black pepper and a pinch of thyme.',
        sensoryCue: 'Thick, creamy chowder bubbling gently.',
        soundscapeType: 'simmer',
        spokenNarration: 'Simmer gently until thickened.'
      },
      {
        stepNumber: 6,
        timeOffsetFormatted: '23:00',
        timeOffsetSeconds: 1380,
        title: 'Serve with Crisp Bacon and Oyster Crackers',
        actionDescription: 'Serve with crisp bacon and oyster crackers.',
        ingredientAdditions: [{ ingredientName: 'Oyster crackers', amount: 'Crackers', technique: 'Topped' }],
        toolsUsed: ['Chowder Bowl'],
        criticalControlPoint: 'Serve in a wide rimmed bowl or toasted sourdough bread bowl.',
        sensoryCue: 'Sweet cream, smoky bacon, and ocean clam aroma.',
        soundscapeType: 'plating',
        spokenNarration: 'Serve with crisp bacon and oyster crackers.'
      }
    ],
    platingPresentation: 'Served in a deep bowl with crispy bacon bits, chopped chives, and oyster crackers scattered on top.',
    sommelierPairing: {
      vintage: '2021 Chablis / Unoaked Chardonnay',
      terroir: 'Burgundy, France',
      tastingNote: 'Crisp green apple, flinty minerality, and salinity complement rich cream and clams.'
    },
    heroImageUrl: imgClamChowder,
    aiImagePrompt: 'Thick creamy New England clam chowder in a rustic bowl, chunks of potato and tender clams, crispy bacon bits on top, oyster crackers floating, sprig of parsley, warm light.',
    createdAt: new Date().toISOString()
  },

  // 24. BBQ Pulled Pork — USA
  {
    id: 'bbq-pulled-pork-usa',
    recipeNumber: 24,
    primaryIngredientId: 'smoked-pork-shoulder-rub',
    primaryIngredientName: 'Slow-Smoked Pork Shoulder & Tangy BBQ Sauce',
    dishTitle: 'BBQ Pulled Pork',
    subtitle: 'Smoky, fall-apart tender pulled pork piled high on a toasted brioche bun with creamy coleslaw and pickle chips',
    cuisine: 'American',
    countryRegion: 'USA (South)',
    tags: ['BBQ', 'Pulled Pork', 'American', 'Smoked', 'Sandwich'],
    overview: 'The definitive pride of Southern American barbecue. Pork shoulder coated in a brown sugar and paprika spice rub, slow-smoked or roasted for hours until meltingly tender, shredded by hand and tossed in a tangy-sweet barbecue sauce.',
    chefRationale: 'Low and slow cooking at 225°F-250°F renders intramuscular collagen into gelatin, creating juicy strands that pull effortlessly.',
    difficulty: 'Intermediate',
    servings: 6,
    totalPrepTimeMinutes: 20,
    totalCookTimeMinutes: 60,
    overallDurationFormatted: '80 min',
    trendScore: 98.8,
    hotnessRank: 24,
    awardBadge: 'World Archive No. 24 • Southern BBQ Master',
    flavorAromaProfile: {
      umami: 96,
      acidity: 70,
      aromaticIntensity: 98,
      textureComplexity: 92,
      finishLength: 94
    },
    requiredTools: [
      {
        id: 'bbq-claws',
        name: 'Meat Shredding Claws / Smoker Pan',
        category: 'Cookware',
        material: 'Stainless Steel',
        purpose: 'Shreds tender smoked pork into long juicy strands'
      }
    ],
    ingredientsList: [
      { name: 'Pork shoulder', amount: '1.2kg boneless pork butt', prepState: 'Trimmed and rubbed', addedAtMinute: 0, isArchiveSpecialty: false },
      { name: 'BBQ sauce', amount: '200ml tangy-sweet Southern BBQ sauce', prepState: 'Warm sauce', addedAtMinute: 50, isArchiveSpecialty: true },
      { name: 'Coleslaw', amount: '150g crisp cabbage slaw', prepState: 'Tossed in creamy dressing', addedAtMinute: 55, isArchiveSpecialty: false },
      { name: 'Buns', amount: '4 brioche burger buns', prepState: 'Toasted in butter', addedAtMinute: 55, isArchiveSpecialty: false },
      { name: 'Spice rub', amount: '3 tbsp brown sugar, paprika, garlic, cumin', prepState: 'Dry spice blend', addedAtMinute: 0, isArchiveSpecialty: true }
    ],
    timelineSteps: [
      {
        stepNumber: 1,
        timeOffsetFormatted: '00:00',
        timeOffsetSeconds: 0,
        title: 'Rub Pork Shoulder Generously with Spices',
        actionDescription: 'Rub pork shoulder generously with spices.',
        ingredientAdditions: [
          { ingredientName: 'Pork shoulder', amount: '1.2kg', technique: 'Rubbed' },
          { ingredientName: 'Spice rub', amount: '3 tbsp', technique: 'Massaged' }
        ],
        toolsUsed: ['Roasting Pan'],
        criticalControlPoint: 'Coat all sides completely with the brown sugar spice rub.',
        sensoryCue: 'Smoky paprika, garlic, and caramelized sugar aroma.',
        soundscapeType: 'chop',
        spokenNarration: 'Rub pork shoulder generously with aromatic spices.'
      },
      {
        stepNumber: 2,
        timeOffsetFormatted: '10:00',
        timeOffsetSeconds: 600,
        title: 'Slow-Cook or Smoke at Low Heat for Several Hours',
        actionDescription: 'Slow-cook or smoke at low heat for several hours until fall-apart tender.',
        ingredientAdditions: [],
        toolsUsed: ['Dutch Oven / Smoker'],
        criticalControlPoint: 'Cook until internal temperature reaches 203°F (95°C).',
        sensoryCue: 'Rich barbecue smoke and rendered pork fat aroma.',
        soundscapeType: 'simmer',
        spokenNarration: 'Slow-cook or smoke at low heat until fall-apart tender.'
      },
      {
        stepNumber: 3,
        timeOffsetFormatted: '45:00',
        timeOffsetSeconds: 2700,
        title: 'Rest the Meat for 15 Minutes',
        actionDescription: 'Rest the meat for 15 minutes.',
        ingredientAdditions: [],
        toolsUsed: ['Cutting Board'],
        criticalControlPoint: 'Allow juices to redistribute through the muscle fibers.',
        sensoryCue: 'Dark mahogany caramelized bark glistening.',
        soundscapeType: 'plating',
        spokenNarration: 'Rest the meat for fifteen minutes.'
      },
      {
        stepNumber: 4,
        timeOffsetFormatted: '50:00',
        timeOffsetSeconds: 3000,
        title: 'Shred Pork with Two Forks into Tender Strands',
        actionDescription: 'Shred pork with two forks into tender strands.',
        ingredientAdditions: [],
        toolsUsed: ['Meat Shredding Claws'],
        criticalControlPoint: 'Pull along grain into juicy, succulent strands.',
        sensoryCue: 'Steam escapes as tender pork pulls apart easily.',
        soundscapeType: 'chop',
        spokenNarration: 'Shred pork with two forks into tender strands.'
      },
      {
        stepNumber: 5,
        timeOffsetFormatted: '53:00',
        timeOffsetSeconds: 3180,
        title: 'Toss with BBQ Sauce',
        actionDescription: 'Toss with BBQ sauce.',
        ingredientAdditions: [{ ingredientName: 'BBQ sauce', amount: '200ml', technique: 'Folded in' }],
        toolsUsed: ['Tongs'],
        criticalControlPoint: 'Coat every shredded strand in glossy tangy sauce.',
        sensoryCue: 'Sweet, smoky, vinegar-tinged glaze coating the meat.',
        soundscapeType: 'whisk',
        spokenNarration: 'Toss with tangy-sweet BBQ sauce.'
      },
      {
        stepNumber: 6,
        timeOffsetFormatted: '56:00',
        timeOffsetSeconds: 3360,
        title: 'Serve on Toasted Buns with Coleslaw and Pickles',
        actionDescription: 'Serve piled high on toasted buns with coleslaw and pickles.',
        ingredientAdditions: [
          { ingredientName: 'Coleslaw', amount: '150g', technique: 'Layered' },
          { ingredientName: 'Buns', amount: '4 buns', technique: 'Toasted' }
        ],
        toolsUsed: ['Platter'],
        criticalControlPoint: 'Top warm savory pork with cold crunchy slaw for textural harmony.',
        sensoryCue: 'Buttery brioche, savory smoked pork, and tangy slaw crunch.',
        soundscapeType: 'plating',
        spokenNarration: 'Serve piled high on toasted buns with coleslaw and pickles.'
      }
    ],
    platingPresentation: 'Piled high on a toasted brioche bun with dripping BBQ sauce, topped with creamy slaw and pickle chips.',
    sommelierPairing: {
      vintage: 'American Bourbon Barrel-Aged Stout / Zinfandel',
      terroir: 'California / Kentucky, USA',
      tastingNote: 'Bold blackberry jam, oak vanilla, and smoky sweetness complement the barbecue bark.'
    },
    heroImageUrl: imgBbqPork,
    aiImagePrompt: 'Juicy BBQ pulled pork sandwich on a toasted brioche bun: shredded tender pork dripping with shiny dark BBQ sauce, creamy coleslaw layered on top, pickle chips, parchment paper basket.',
    createdAt: new Date().toISOString()
  },

  // 25. New York Cheesecake — USA
  {
    id: 'ny-cheesecake-usa',
    recipeNumber: 25,
    primaryIngredientId: 'cream-cheese-graham-crust',
    primaryIngredientName: 'Dense Cream Cheese & Graham Cracker Crust',
    dishTitle: 'New York Cheesecake',
    subtitle: 'Classic dense, velvety New York cheesecake on a buttery graham cracker crust with strawberry coulis',
    cuisine: 'American',
    countryRegion: 'USA',
    tags: ['Dessert', 'Cheesecake', 'Baking', 'New York', 'Graham Cracker'],
    overview: 'The definitive American dessert classic. Ultra-creamy, rich, and dense cream cheese filling accented with vanilla and lemon zest, baked over a buttery graham cracker crust and chilled to velvet perfection, served with fresh strawberry coulis.',
    chefRationale: 'Gentle water bath (bain-marie) baking and slow oven cooling prevents the cheesecake surface from cracking.',
    difficulty: 'Intermediate',
    servings: 8,
    totalPrepTimeMinutes: 25,
    totalCookTimeMinutes: 55,
    overallDurationFormatted: '80 min',
    trendScore: 99.0,
    hotnessRank: 25,
    awardBadge: 'World Archive No. 25 • New York Bakery Standard',
    flavorAromaProfile: {
      umami: 70,
      acidity: 50,
      aromaticIntensity: 92,
      textureComplexity: 98,
      finishLength: 95
    },
    requiredTools: [
      {
        id: 'springform-pan',
        name: '9-inch Leakproof Springform Pan',
        category: 'Cookware',
        material: 'Heavy-Gauge Aluminum',
        purpose: 'Releases cheesecake cleanly without damaging edges'
      }
    ],
    ingredientsList: [
      { name: 'Cream cheese', amount: '600g full-fat Philadelphia cream cheese', prepState: 'Room temperature soft', addedAtMinute: 10, isArchiveSpecialty: true },
      { name: 'Graham cracker crumbs', amount: '180g finely crushed', prepState: 'Mixed with 60g melted butter', addedAtMinute: 0, isArchiveSpecialty: false },
      { name: 'Sugar', amount: '150g granulated sugar', prepState: 'Fine', addedAtMinute: 10, isArchiveSpecialty: false },
      { name: 'Eggs', amount: '3 large whole eggs + 1 yolk', prepState: 'Room temperature', addedAtMinute: 15, isArchiveSpecialty: false },
      { name: 'Sour cream', amount: '120g sour cream or heavy cream', prepState: 'Room temperature', addedAtMinute: 18, isArchiveSpecialty: false },
      { name: 'Vanilla extract', amount: '2 tsp pure Madagascar vanilla', prepState: 'Pure extract with lemon zest', addedAtMinute: 18, isArchiveSpecialty: false }
    ],
    timelineSteps: [
      {
        stepNumber: 1,
        timeOffsetFormatted: '00:00',
        timeOffsetSeconds: 0,
        title: 'Mix Graham Cracker Crumbs with Melted Butter',
        actionDescription: 'Mix graham cracker crumbs with melted butter.',
        ingredientAdditions: [{ ingredientName: 'Graham cracker crumbs', amount: '180g', technique: 'Mixed with butter' }],
        toolsUsed: ['Mixing Bowl'],
        criticalControlPoint: 'Evenly moisten all crumbs like wet sand.',
        sensoryCue: 'Toasted cinnamon and sweet graham aroma.',
        soundscapeType: 'chop',
        spokenNarration: 'Mix graham cracker crumbs with melted butter.'
      },
      {
        stepNumber: 2,
        timeOffsetFormatted: '05:00',
        timeOffsetSeconds: 300,
        title: 'Press Crumbs into Springform Pan Bottom and Pre-Bake 10 Min',
        actionDescription: 'Press crumbs into springform pan bottom and pre-bake 10 min.',
        ingredientAdditions: [],
        toolsUsed: ['9-inch Leakproof Springform Pan'],
        criticalControlPoint: 'Pack down firmly with flat-bottom glass.',
        sensoryCue: 'Golden toasted crust fragrance.',
        soundscapeType: 'sizzle',
        spokenNarration: 'Press crumbs into springform pan bottom and pre-bake for ten minutes.'
      },
      {
        stepNumber: 3,
        timeOffsetFormatted: '12:00',
        timeOffsetSeconds: 720,
        title: 'Beat Cream Cheese and Sugar Until Completely Smooth',
        actionDescription: 'Beat cream cheese and sugar until completely smooth.',
        ingredientAdditions: [
          { ingredientName: 'Cream cheese', amount: '600g', technique: 'Beaten smooth' },
          { ingredientName: 'Sugar', amount: '150g', technique: 'Incorporated' }
        ],
        toolsUsed: ['Stand Mixer / Paddle'],
        criticalControlPoint: 'Beat on low speed to avoid incorporating excess air.',
        sensoryCue: 'Satin-smooth velvety white batter.',
        soundscapeType: 'whisk',
        spokenNarration: 'Beat cream cheese and sugar on low speed until smooth.'
      },
      {
        stepNumber: 4,
        timeOffsetFormatted: '18:00',
        timeOffsetSeconds: 1080,
        title: 'Add Eggs One at a Time, Then Sour Cream and Vanilla',
        actionDescription: 'Add eggs one at a time, then sour cream and vanilla.',
        ingredientAdditions: [
          { ingredientName: 'Eggs', amount: '3 eggs + 1 yolk', technique: 'Added one by one' },
          { ingredientName: 'Sour cream', amount: '120g', technique: 'Folded' },
          { ingredientName: 'Vanilla extract', amount: '2 tsp', technique: 'Blended' }
        ],
        toolsUsed: ['Spatula'],
        criticalControlPoint: 'Gently mix after each egg just until incorporated.',
        sensoryCue: 'Rich vanilla bean and tangy cream aroma.',
        soundscapeType: 'whisk',
        spokenNarration: 'Add eggs one at a time, then gently fold in sour cream and vanilla.'
      },
      {
        stepNumber: 5,
        timeOffsetFormatted: '24:00',
        timeOffsetSeconds: 1440,
        title: 'Pour Over Crust, Bake in Water Bath at 325F (160C)',
        actionDescription: 'Pour over crust, bake in a water bath at 325F (160C) for 50-60 min.',
        ingredientAdditions: [],
        toolsUsed: ['Water Bath Pan'],
        criticalControlPoint: 'Bake until edges are set and center has a gentle jiggle.',
        sensoryCue: 'Sweet baked cream and vanilla scent filling room.',
        soundscapeType: 'sizzle',
        spokenNarration: 'Pour over crust and bake in a water bath until edges are set.'
      },
      {
        stepNumber: 6,
        timeOffsetFormatted: '75:00',
        timeOffsetSeconds: 4500,
        title: 'Cool in Oven with Door Ajar 1 Hour, Then Chill Overnight',
        actionDescription: 'Cool in the oven with the door ajar for 1 hour, then chill overnight.',
        ingredientAdditions: [],
        toolsUsed: ['Oven'],
        criticalControlPoint: 'Gradual temperature decrease prevents surface cracking.',
        sensoryCue: 'Smooth ivory satin surface sets firmly.',
        soundscapeType: 'plating',
        spokenNarration: 'Cool slowly, then chill in the refrigerator overnight.'
      },
      {
        stepNumber: 7,
        timeOffsetFormatted: '80:00',
        timeOffsetSeconds: 4800,
        title: 'Slice and Serve with Fruit Coulis',
        actionDescription: 'Slice and serve with fruit coulis.',
        ingredientAdditions: [],
        toolsUsed: ['Warm Chef Knife'],
        criticalControlPoint: 'Wipe knife with hot towel between each clean slice.',
        sensoryCue: 'Pristine sharp slice showing dense velvety interior.',
        soundscapeType: 'plating',
        spokenNarration: 'Slice cleanly and serve with fresh strawberry coulis.'
      }
    ],
    platingPresentation: 'A clean triangular slice on a dessert plate with graham crust base and glossy red strawberry coulis drizzle.',
    sommelierPairing: {
      vintage: '2019 Late Harvest Tokaji Aszú 5 Puttonyos',
      terroir: 'Tokaj, Hungary',
      tastingNote: 'Honeyed apricot, orange blossom, and bright acidity balance the dense cream cheese richness.'
    },
    heroImageUrl: imgNyCheesecake,
    aiImagePrompt: 'Slice of classic New York cheesecake on a dessert plate: golden graham cracker crust, dense smooth ivory filling, glossy strawberry coulis drizzle down the side, fresh strawberry on top, soft cafe lighting.',
    createdAt: new Date().toISOString()
  },

  // 26. Churros con Chocolate — Spain
  {
    id: 'churros-con-chocolate-spain',
    recipeNumber: 26,
    primaryIngredientId: 'choux-pastry-cinnamon-chocolate',
    primaryIngredientName: 'Crisp Star-Piped Dough & Thick Spiced Dark Chocolate',
    dishTitle: 'Churros con Chocolate',
    subtitle: 'Golden, crispy fluted Spanish churros dusted in cinnamon sugar with thick, glossy dark dipping chocolate',
    cuisine: 'Spanish',
    countryRegion: 'Spain',
    tags: ['Dessert', 'Churros', 'Spanish', 'Fried Dough', 'Chocolate'],
    overview: 'The beloved breakfast and midnight treat of Madrid (Churrería style). Star-fluted choux dough piped directly into hot oil and fried to crispy golden perfection, rolled in cinnamon sugar, and served with a cup of thick, velvet-dark dipping chocolate.',
    chefRationale: 'Piping through a closed star tip creates deep ridges that crisp up shatteringly while providing channels to hold rich chocolate.',
    difficulty: 'Easy',
    servings: 4,
    totalPrepTimeMinutes: 15,
    totalCookTimeMinutes: 15,
    overallDurationFormatted: '30 min',
    trendScore: 98.6,
    hotnessRank: 26,
    awardBadge: 'World Archive No. 26 • Madrid Chocolatería',
    flavorAromaProfile: {
      umami: 60,
      acidity: 20,
      aromaticIntensity: 96,
      textureComplexity: 98,
      finishLength: 95
    },
    requiredTools: [
      {
        id: 'churro-piper',
        name: 'Churrera / Heavy Piping Bag with Closed Star Tip',
        category: 'Cookware',
        material: 'Stainless Steel / Heavy Canvas',
        purpose: 'Pipes distinct fluted ridges that crisp under high heat'
      }
    ],
    ingredientsList: [
      { name: 'Churro dough', amount: 'Flour, water, butter, salt boiled dough', prepState: 'Choux style dough', addedAtMinute: 0, isArchiveSpecialty: false },
      { name: 'Dark chocolate', amount: '150g dark Spanish chocolate (70%)', prepState: 'Chopped for thick dipping cup', addedAtMinute: 10, isArchiveSpecialty: true },
      { name: 'Milk', amount: '200ml whole milk with cornstarch', prepState: 'Heated into thick velvet chocolate', addedAtMinute: 10, isArchiveSpecialty: false },
      { name: 'Sugar', amount: '80g granulated sugar', prepState: 'Blended with 1 tsp cinnamon', addedAtMinute: 8, isArchiveSpecialty: false },
      { name: 'Cinnamon', amount: '1 tsp ground Ceylon cinnamon', prepState: 'Mixed with sugar', addedAtMinute: 8, isArchiveSpecialty: false }
    ],
    timelineSteps: [
      {
        stepNumber: 1,
        timeOffsetFormatted: '00:00',
        timeOffsetSeconds: 0,
        title: 'Boil Water, Butter, and Salt, Stir in Flour for Dough',
        actionDescription: 'Boil water, butter, and salt, stir in flour until dough pulls away from pot.',
        ingredientAdditions: [{ ingredientName: 'Churro dough', amount: 'Flour & water dough', technique: 'Cooked on stove' }],
        toolsUsed: ['Saucepan', 'Wooden Spoon'],
        criticalControlPoint: 'Cook dough 1-2 minutes on heat until a film forms on the bottom.',
        sensoryCue: 'Warm cooked wheat and butter aroma.',
        soundscapeType: 'whisk',
        spokenNarration: 'Boil water, butter, and salt, then stir in flour until dough pulls away from the pot.'
      },
      {
        stepNumber: 2,
        timeOffsetFormatted: '05:00',
        timeOffsetSeconds: 300,
        title: 'Load Dough into Piping Bag with Star Tip',
        actionDescription: 'Load dough into piping bag fitted with a star tip.',
        ingredientAdditions: [],
        toolsUsed: ['Heavy Piping Bag with Closed Star Tip'],
        criticalControlPoint: 'Press out air bubbles to ensure smooth continuous ridges.',
        sensoryCue: 'Pliable warm dough filling piping bag.',
        soundscapeType: 'plating',
        spokenNarration: 'Load dough into a piping bag fitted with a star tip.'
      },
      {
        stepNumber: 3,
        timeOffsetFormatted: '08:00',
        timeOffsetSeconds: 480,
        title: 'Pipe Strips into Hot Oil (375F/190C), Fry Until Golden',
        actionDescription: 'Pipe strips into hot oil (375F/190C), fry until golden.',
        ingredientAdditions: [],
        toolsUsed: ['Deep Fryer', 'Kitchen Scissors'],
        criticalControlPoint: 'Snip dough cleanly with scissors directly over hot oil.',
        sensoryCue: 'Sizzling oil bubbling around star-ridged dough.',
        soundscapeType: 'sizzle',
        spokenNarration: 'Pipe strips into hot oil and fry until crisp and golden.'
      },
      {
        stepNumber: 4,
        timeOffsetFormatted: '12:00',
        timeOffsetSeconds: 720,
        title: 'Drain on Paper Towels and Roll in Cinnamon Sugar',
        actionDescription: 'Drain on paper towels and roll in cinnamon sugar.',
        ingredientAdditions: [
          { ingredientName: 'Sugar', amount: '80g', technique: 'Rolled' },
          { ingredientName: 'Cinnamon', amount: '1 tsp', technique: 'Coated' }
        ],
        toolsUsed: ['Shallow Dish', 'Tongs'],
        criticalControlPoint: 'Roll while warm so cinnamon sugar adheres evenly.',
        sensoryCue: 'Sweet warm cinnamon perfume.',
        soundscapeType: 'chop',
        spokenNarration: 'Drain on paper towels and roll generously in cinnamon sugar.'
      },
      {
        stepNumber: 5,
        timeOffsetFormatted: '15:00',
        timeOffsetSeconds: 900,
        title: 'Melt Dark Chocolate with Milk for Thick Dipping Sauce',
        actionDescription: 'Melt dark chocolate with milk for a thick dipping sauce.',
        ingredientAdditions: [
          { ingredientName: 'Dark chocolate', amount: '150g', technique: 'Melted' },
          { ingredientName: 'Milk', amount: '200ml', technique: 'Simmered thick' }
        ],
        toolsUsed: ['Small Saucepan', 'Whisk'],
        criticalControlPoint: 'Whisk gently until chocolate is thick and glossy enough to coat a spoon.',
        sensoryCue: 'Intense roasted cacao aroma.',
        soundscapeType: 'whisk',
        spokenNarration: 'Melt dark chocolate with milk for thick dipping chocolate.'
      },
      {
        stepNumber: 6,
        timeOffsetFormatted: '18:00',
        timeOffsetSeconds: 1080,
        title: 'Serve Warm Churros with Hot Chocolate Cup',
        actionDescription: 'Serve warm churros with hot dipping chocolate.',
        ingredientAdditions: [],
        toolsUsed: ['Serving Cup'],
        criticalControlPoint: 'Dip hot crispy churro directly into thick chocolate.',
        sensoryCue: 'Crispy crackle dipping into glossy dark chocolate.',
        soundscapeType: 'plating',
        spokenNarration: 'Serve warm churros with hot dipping chocolate.'
      }
    ],
    platingPresentation: 'Piled in a basket wrapped in parchment paper beside a small ceramic cup of thick dark dipping chocolate.',
    sommelierPairing: {
      vintage: 'Pedro Ximénez Sherry',
      terroir: 'Jerez, Spain',
      tastingNote: 'Luscious fig, raisin, and caramel notes pair with dark chocolate and cinnamon.'
    },
    heroImageUrl: imgChurros,
    aiImagePrompt: 'Golden ridged churros dusted in cinnamon sugar piled in a parchment-lined basket, a small ceramic cup of thick glossy dark chocolate dipping sauce beside it, one churro dipped in.',
    createdAt: new Date().toISOString()
  },

  // 27. Tiramisu — Italy
  {
    id: 'tiramisu-italy',
    recipeNumber: 27,
    primaryIngredientId: 'espresso-mascarpone-savoiardi',
    primaryIngredientName: 'Italian Espresso, Savoiardi & Mascarpone',
    dishTitle: 'Tiramisu',
    subtitle: 'Classic Venetian layered dessert with espresso-soaked ladyfingers, velvety mascarpone cream, and dark cocoa',
    cuisine: 'Italian',
    countryRegion: 'Italy',
    tags: ['Dessert', 'Tiramisu', 'Italian', 'Espresso', 'Mascarpone'],
    overview: 'The world-famous Italian dessert of Veneto (meaning "pick me up"). Crisp ladyfinger cookies (savoiardi) delicately dipped in dark espresso and Marsala wine, layered with a cloud of whipped egg yolks, sugar, and rich mascarpone, dusted with bitter cocoa powder.',
    chefRationale: 'Quickly dipping the ladyfingers for only 1 second prevents sogginess while allowing them to soften into cake-like layers.',
    difficulty: 'Intermediate',
    servings: 6,
    totalPrepTimeMinutes: 25,
    totalCookTimeMinutes: 0,
    overallDurationFormatted: '25 min (chill 4h)',
    trendScore: 99.3,
    hotnessRank: 27,
    awardBadge: 'World Archive No. 27 • Venetian Dolce Vita',
    flavorAromaProfile: {
      umami: 75,
      acidity: 30,
      aromaticIntensity: 98,
      textureComplexity: 96,
      finishLength: 98
    },
    requiredTools: [
      {
        id: 'glass-tiramisu-dish',
        name: 'Rectangular Glass Baking Dish',
        category: 'Cookware',
        material: 'Borosilicate Glass',
        purpose: 'Displays beautiful, distinct layers of espresso cookies and mascarpone'
      }
    ],
    ingredientsList: [
      { name: 'Ladyfingers', amount: '24 Italian Savoiardi cookies', prepState: 'Crisp dry ladyfingers', addedAtMinute: 10, isArchiveSpecialty: true },
      { name: 'Espresso', amount: '250ml freshly brewed strong espresso', prepState: 'Cooled, with 30ml Marsala wine', addedAtMinute: 10, isArchiveSpecialty: true },
      { name: 'Mascarpone cheese', amount: '450g Italian mascarpone', prepState: 'Chilled', addedAtMinute: 0, isArchiveSpecialty: true },
      { name: 'Eggs', amount: '4 large eggs (separated into yolks & whites)', prepState: 'Fresh room temp', addedAtMinute: 0, isArchiveSpecialty: false },
      { name: 'Sugar', amount: '100g superfine sugar', prepState: 'Fine', addedAtMinute: 0, isArchiveSpecialty: false },
      { name: 'Cocoa powder', amount: '30g unsweetened Dutch-process cocoa', prepState: 'Sifted for dusting', addedAtMinute: 20, isArchiveSpecialty: false }
    ],
    timelineSteps: [
      {
        stepNumber: 1,
        timeOffsetFormatted: '00:00',
        timeOffsetSeconds: 0,
        title: 'Whisk Egg Yolks with Sugar, Fold in Mascarpone',
        actionDescription: 'Whisk egg yolks with sugar until pale, fold in mascarpone.',
        ingredientAdditions: [
          { ingredientName: 'Eggs', amount: '4 yolks', technique: 'Whisked pale' },
          { ingredientName: 'Sugar', amount: '100g', technique: 'Dissolved' },
          { ingredientName: 'Mascarpone cheese', amount: '450g', technique: 'Folded in' }
        ],
        toolsUsed: ['Whisk', 'Mixing Bowl'],
        criticalControlPoint: 'Whisk until thick and ribbon-like, then gently incorporate mascarpone.',
        sensoryCue: 'Creamy pale yellow velvety zabaglione cream.',
        soundscapeType: 'whisk',
        spokenNarration: 'Whisk egg yolks with sugar until pale, then fold in creamy mascarpone.'
      },
      {
        stepNumber: 2,
        timeOffsetFormatted: '06:00',
        timeOffsetSeconds: 360,
        title: 'Whip Egg Whites to Stiff Peaks and Fold into Cream',
        actionDescription: 'Whip egg whites to stiff peaks and gently fold into the mascarpone cream.',
        ingredientAdditions: [],
        toolsUsed: ['Hand Mixer', 'Silicone Spatula'],
        criticalControlPoint: 'Fold in three additions to keep the mousse airy and light.',
        sensoryCue: 'Cloud-like billowy mascarpone cream.',
        soundscapeType: 'whisk',
        spokenNarration: 'Whip egg whites to stiff peaks and gently fold into the mascarpone cream.'
      },
      {
        stepNumber: 3,
        timeOffsetFormatted: '10:00',
        timeOffsetSeconds: 600,
        title: 'Dip Ladyfingers Briefly in Cooled Espresso',
        actionDescription: 'Dip ladyfingers briefly in cooled espresso.',
        ingredientAdditions: [
          { ingredientName: 'Ladyfingers', amount: '12 cookies', technique: '1-second dip' },
          { ingredientName: 'Espresso', amount: '250ml', technique: 'Espresso soak' }
        ],
        toolsUsed: ['Shallow Bowl'],
        criticalControlPoint: 'Quick 1-second dip on each side; do not oversaturate.',
        sensoryCue: 'Dark roasted coffee fragrance blooms.',
        soundscapeType: 'plating',
        spokenNarration: 'Dip ladyfingers briefly in cooled espresso.'
      },
      {
        stepNumber: 4,
        timeOffsetFormatted: '12:00',
        timeOffsetSeconds: 720,
        title: 'Layer Ladyfingers in Dish, Spread Half the Cream',
        actionDescription: 'Layer dipped ladyfingers in the dish, spread half the cream over top.',
        ingredientAdditions: [],
        toolsUsed: ['Rectangular Glass Baking Dish', 'Offset Spatula'],
        criticalControlPoint: 'Form a snug single layer of cookies, then smooth cream evenly.',
        sensoryCue: 'Smooth velvety layer over coffee-soaked biscuits.',
        soundscapeType: 'plating',
        spokenNarration: 'Layer ladyfingers in the dish and spread half the cream over top.'
      },
      {
        stepNumber: 5,
        timeOffsetFormatted: '16:00',
        timeOffsetSeconds: 960,
        title: 'Repeat with a Second Layer of Dipped Ladyfingers and Cream',
        actionDescription: 'Repeat with a second layer of dipped ladyfingers and cream.',
        ingredientAdditions: [{ ingredientName: 'Ladyfingers', amount: '12 cookies', technique: 'Second layer' }],
        toolsUsed: ['Offset Spatula'],
        criticalControlPoint: 'Smooth the top layer of mascarpone cream into an even finish.',
        sensoryCue: 'Pristine top cream layer gleaming.',
        soundscapeType: 'plating',
        spokenNarration: 'Repeat with a second layer of dipped ladyfingers and cream.'
      },
      {
        stepNumber: 6,
        timeOffsetFormatted: '20:00',
        timeOffsetSeconds: 1200,
        title: 'Dust Top Generously with Cocoa Powder',
        actionDescription: 'Dust top generously with cocoa powder.',
        ingredientAdditions: [{ ingredientName: 'Cocoa powder', amount: '30g', technique: 'Sifted dusting' }],
        toolsUsed: ['Fine Mesh Sieve'],
        criticalControlPoint: 'Sift an even matte brown layer covering all cream.',
        sensoryCue: 'Rich bittersweet cocoa dust aroma.',
        soundscapeType: 'plating',
        spokenNarration: 'Dust top generously with cocoa powder.'
      },
      {
        stepNumber: 7,
        timeOffsetFormatted: '22:00',
        timeOffsetSeconds: 1320,
        title: 'Chill at Least 4 Hours Before Serving',
        actionDescription: 'Chill at least 4 hours before serving.',
        ingredientAdditions: [],
        toolsUsed: ['Refrigerator'],
        criticalControlPoint: 'Allow biscuits to soften into cake and mascarpone cream to set.',
        sensoryCue: 'Chilled, perfectly set layered masterpiece.',
        soundscapeType: 'plating',
        spokenNarration: 'Chill for at least four hours before slicing and serving.'
      }
    ],
    platingPresentation: 'Square portion lifted onto a plate showing distinct layers of espresso-soaked biscuit and creamy mascarpone.',
    sommelierPairing: {
      vintage: '2018 Vin Santo del Chianti',
      terroir: 'Tuscany, Italy',
      tastingNote: 'Toasted walnut, dried fig, and honey notes pair with dark espresso and cocoa.'
    },
    heroImageUrl: imgTiramisu,
    aiImagePrompt: 'Square slice of classic tiramisu on a ceramic plate: distinct layers of espresso-soaked ladyfingers and creamy mascarpone, top dusted with dark cocoa powder, chocolate curls, soft overhead light.',
    createdAt: new Date().toISOString()
  },

  // 28. Baklava — Turkey/Middle East
  {
    id: 'baklava-turkey-middle-east',
    recipeNumber: 28,
    primaryIngredientId: 'phyllo-pistachio-honey-syrup',
    primaryIngredientName: 'Crisp Phyllo Layers & Crushed Pistachios',
    dishTitle: 'Baklava',
    subtitle: 'Golden diamond-cut layered phyllo pastry stuffed with crushed pistachios and drenched in fragrant orange blossom honey syrup',
    cuisine: 'Middle Eastern',
    countryRegion: 'Turkey / Middle East',
    tags: ['Dessert', 'Baklava', 'Turkish', 'Phyllo', 'Pistachio'],
    overview: 'The imperial sweet pastry of the Ottoman palace. Micro-thin sheets of phyllo dough brushed with clarified butter, layered with emerald green chopped pistachios, baked diamond-crisp and drenched in fragrant honey syrup scented with cardamom and lemon.',
    chefRationale: 'Pouring cool syrup over blazing-hot baked baklava creates explosive sizzling that drives sweetness deep into every layer while keeping the pastry crisp.',
    difficulty: 'Intermediate',
    servings: 8,
    totalPrepTimeMinutes: 30,
    totalCookTimeMinutes: 35,
    overallDurationFormatted: '65 min',
    trendScore: 98.9,
    hotnessRank: 28,
    awardBadge: 'World Archive No. 28 • Gaziantep Pistachio Atelier',
    flavorAromaProfile: {
      umami: 70,
      acidity: 30,
      aromaticIntensity: 99,
      textureComplexity: 100,
      finishLength: 98
    },
    requiredTools: [
      {
        id: 'baklava-baking-tray',
        name: 'Rectangular Heavy Baking Pan & Pastry Brush',
        category: 'Cookware',
        material: 'Anodized Aluminum',
        purpose: 'Conducts even heat to crisp microscopic phyllo layers'
      }
    ],
    ingredientsList: [
      { name: 'Phyllo dough', amount: '1 pack (400g) paper-thin phyllo sheets', prepState: 'Thawed under damp towel', addedAtMinute: 0, isArchiveSpecialty: true },
      { name: 'Pistachios or walnuts', amount: '250g Antep pistachios', prepState: 'Finely chopped', addedAtMinute: 15, isArchiveSpecialty: true },
      { name: 'Butter', amount: '200g clarified butter (ghee)', prepState: 'Melted warm', addedAtMinute: 0, isArchiveSpecialty: true },
      { name: 'Honey or sugar syrup', amount: '250ml honey syrup with lemon & cardamom', prepState: 'Cooled syrup', addedAtMinute: 35, isArchiveSpecialty: true }
    ],
    timelineSteps: [
      {
        stepNumber: 1,
        timeOffsetFormatted: '00:00',
        timeOffsetSeconds: 0,
        title: 'Layer Phyllo Sheets in a Pan, Brushing Each with Melted Butter',
        actionDescription: 'Layer phyllo sheets in a pan, brushing each with melted butter.',
        ingredientAdditions: [
          { ingredientName: 'Phyllo dough', amount: '12 sheets base', technique: 'Layered' },
          { ingredientName: 'Butter', amount: 'Melted', technique: 'Brushed' }
        ],
        toolsUsed: ['Rectangular Heavy Baking Pan', 'Pastry Brush'],
        criticalControlPoint: 'Brush clarified butter evenly to separate individual sheets.',
        sensoryCue: 'Golden butter gloss on delicate paper-thin dough.',
        soundscapeType: 'drizzle',
        spokenNarration: 'Layer phyllo sheets in a pan, brushing each with melted butter.'
      },
      {
        stepNumber: 2,
        timeOffsetFormatted: '12:00',
        timeOffsetSeconds: 720,
        title: 'Add a Layer of Finely Chopped Nuts',
        actionDescription: 'Add a layer of finely chopped nuts.',
        ingredientAdditions: [{ ingredientName: 'Pistachios or walnuts', amount: '250g', technique: 'Even spread' }],
        toolsUsed: [],
        criticalControlPoint: 'Distribute nuts in an even level blanket.',
        sensoryCue: 'Vibrant green pistachio blanket and nutty aroma.',
        soundscapeType: 'plating',
        spokenNarration: 'Add an even layer of finely chopped pistachios.'
      },
      {
        stepNumber: 3,
        timeOffsetFormatted: '16:00',
        timeOffsetSeconds: 960,
        title: 'Top with More Buttered Phyllo Sheets',
        actionDescription: 'Top with more buttered phyllo sheets.',
        ingredientAdditions: [{ ingredientName: 'Phyllo dough', amount: '12 top sheets', technique: 'Layered with butter' }],
        toolsUsed: ['Pastry Brush'],
        criticalControlPoint: 'Tuck edges neatly into sides of pan.',
        sensoryCue: 'Smooth layered golden top.',
        soundscapeType: 'drizzle',
        spokenNarration: 'Top with more buttered phyllo sheets.'
      },
      {
        stepNumber: 4,
        timeOffsetFormatted: '22:00',
        timeOffsetSeconds: 1320,
        title: 'Cut into Diamond or Square Shapes Before Baking',
        actionDescription: 'Cut into diamond or square shapes before baking.',
        ingredientAdditions: [],
        toolsUsed: ['Sharp Chef Knife'],
        criticalControlPoint: 'Cut all the way through to the bottom before baking.',
        sensoryCue: 'Clean geometric diamond incisions.',
        soundscapeType: 'chop',
        spokenNarration: 'Cut into diamond or square shapes before baking.'
      },
      {
        stepNumber: 5,
        timeOffsetFormatted: '26:00',
        timeOffsetSeconds: 1560,
        title: 'Bake at 350F (175C) Until Golden and Crisp',
        actionDescription: 'Bake at 350F (175C) for 35-40 minutes until golden and crisp.',
        ingredientAdditions: [],
        toolsUsed: ['Oven'],
        criticalControlPoint: 'Bake until sheets are puffed, flaky, and deep golden.',
        sensoryCue: 'Caramelized butter and toasted pistachio aroma.',
        soundscapeType: 'sizzle',
        spokenNarration: 'Bake until golden, flaky, and crisp.'
      },
      {
        stepNumber: 6,
        timeOffsetFormatted: '60:00',
        timeOffsetSeconds: 3600,
        title: 'Pour Cooled Honey Syrup Over Hot Baklava',
        actionDescription: 'Pour cooled honey syrup over hot baklava immediately.',
        ingredientAdditions: [{ ingredientName: 'Honey or sugar syrup', amount: '250ml', technique: 'Poured over hot pastry' }],
        toolsUsed: ['Ladle'],
        criticalControlPoint: 'Loud sizzle indicates syrup absorption throughout all layers.',
        sensoryCue: 'Audible sizzle and burst of warm honey-cardamom steam.',
        soundscapeType: 'sizzle',
        spokenNarration: 'Pour cooled honey syrup over hot baklava immediately.'
      },
      {
        stepNumber: 7,
        timeOffsetFormatted: '65:00',
        timeOffsetSeconds: 3900,
        title: 'Let Cool and Soak Completely Before Serving',
        actionDescription: 'Let cool and soak completely before serving.',
        ingredientAdditions: [],
        toolsUsed: ['Serving Platter'],
        criticalControlPoint: 'Rest 4-6 hours for maximum syrup absorption.',
        sensoryCue: 'Glistening diamond pastries with vibrant green pistachio dust.',
        soundscapeType: 'plating',
        spokenNarration: 'Let cool and soak completely before serving.'
      }
    ],
    platingPresentation: 'Diamond-cut baklava pieces arranged on a decorative plate with crushed green pistachios scattered on top.',
    sommelierPairing: {
      vintage: 'Turkish Black Tea / Cardamom Coffee',
      terroir: 'Rize, Turkey',
      tastingNote: 'Tannic, bold black tea balances rich honey syrup and buttery pistachio crispness.'
    },
    heroImageUrl: imgBaklava,
    aiImagePrompt: 'Diamond-cut pieces of golden baklava stacked on a decorative platter: visible thin crispy phyllo layers, green crushed pistachios between layers, glistening honey syrup sheen, garnished with whole pistachios.',
    createdAt: new Date().toISOString()
  },

  // 29. Mochi — Japan
  {
    id: 'mochi-japan',
    recipeNumber: 29,
    primaryIngredientId: 'glutinous-rice-sweet-bean',
    primaryIngredientName: 'Sweet Mochigome Rice & Sweet Red Bean Paste',
    dishTitle: 'Mochi (Daifuku)',
    subtitle: 'Soft, pillowy, chewy Japanese rice cakes filled with sweet red bean paste (anko) and dusted in kinako',
    cuisine: 'Japanese',
    countryRegion: 'Japan',
    tags: ['Dessert', 'Mochi', 'Japanese', 'Daifuku', 'Sweet Bean'],
    overview: 'The beloved traditional confectionery of Japan (Wagashi). Chewy, pillowy-soft steamed mochigome rice dough dusted with potato starch, wrapped around a smooth sweet red adzuki bean paste (anko) center.',
    chefRationale: 'Steaming glutinous rice flour with sugar keeps the mochi tender, soft, and elastic even after cooling.',
    difficulty: 'Easy',
    servings: 4,
    totalPrepTimeMinutes: 15,
    totalCookTimeMinutes: 10,
    overallDurationFormatted: '25 min',
    trendScore: 98.5,
    hotnessRank: 29,
    awardBadge: 'World Archive No. 29 • Kyoto Wagashi Heritage',
    flavorAromaProfile: {
      umami: 50,
      acidity: 10,
      aromaticIntensity: 85,
      textureComplexity: 100,
      finishLength: 90
    },
    requiredTools: [
      {
        id: 'microwave-steamer',
        name: 'Glass Steaming Bowl & Silicone Spatula',
        category: 'Cookware',
        material: 'Heatproof Glass',
        purpose: 'Steams glutinous rice flour into translucent stretchy dough'
      }
    ],
    ingredientsList: [
      { name: 'Mochiko (glutinous rice flour)', amount: '120g sweet rice flour (shiratamako)', prepState: 'Fine powder', addedAtMinute: 0, isArchiveSpecialty: true },
      { name: 'Sugar', amount: '50g', prepState: 'Fine granulated', addedAtMinute: 0, isArchiveSpecialty: false },
      { name: 'Water', amount: '150ml water', prepState: 'Filtered', addedAtMinute: 0, isArchiveSpecialty: false },
      { name: 'Sweet red bean paste (anko)', amount: '150g smooth anko paste', prepState: 'Divided into 6 small balls', addedAtMinute: 8, isArchiveSpecialty: true },
      { name: 'Cornstarch or potato starch', amount: '60g katakuriko for dusting', prepState: 'Fine starch', addedAtMinute: 6, isArchiveSpecialty: false }
    ],
    timelineSteps: [
      {
        stepNumber: 1,
        timeOffsetFormatted: '00:00',
        timeOffsetSeconds: 0,
        title: 'Mix Glutinous Rice Flour, Sugar, and Water into a Smooth Batter',
        actionDescription: 'Mix glutinous rice flour, sugar, and water into a smooth batter.',
        ingredientAdditions: [
          { ingredientName: 'Mochiko (glutinous rice flour)', amount: '120g', technique: 'Whisked' },
          { ingredientName: 'Sugar', amount: '50g', technique: 'Blended' },
          { ingredientName: 'Water', amount: '150ml', technique: 'Mixed' }
        ],
        toolsUsed: ['Glass Steaming Bowl', 'Whisk'],
        criticalControlPoint: 'Whisk until completely lump-free.',
        sensoryCue: 'Silky smooth milky white batter.',
        soundscapeType: 'whisk',
        spokenNarration: 'Mix glutinous rice flour, sugar, and water into a smooth batter.'
      },
      {
        stepNumber: 2,
        timeOffsetFormatted: '03:00',
        timeOffsetSeconds: 180,
        title: 'Steam or Microwave Until Dough Is Translucent and Stretchy',
        actionDescription: 'Steam or microwave until dough is translucent and stretchy.',
        ingredientAdditions: [],
        toolsUsed: ['Microwave / Steamer'],
        criticalControlPoint: 'Cook in 1-minute bursts, stirring with wet spatula until glossy and elastic.',
        sensoryCue: 'Dough turns translucent, glossy, and elastic.',
        soundscapeType: 'simmer',
        spokenNarration: 'Steam or microwave until dough is translucent and stretchy.'
      },
      {
        stepNumber: 3,
        timeOffsetFormatted: '06:00',
        timeOffsetSeconds: 360,
        title: 'Turn Out Onto Surface Dusted with Cornstarch',
        actionDescription: 'Turn out onto a surface dusted generously with cornstarch.',
        ingredientAdditions: [{ ingredientName: 'Cornstarch or potato starch', amount: '60g', technique: 'Dusted surface' }],
        toolsUsed: ['Pastry Board'],
        criticalControlPoint: 'Dust hands and surface thoroughly to prevent sticking.',
        sensoryCue: 'Soft pillowy warm mochi dough.',
        soundscapeType: 'plating',
        spokenNarration: 'Turn out onto a surface dusted generously with cornstarch.'
      },
      {
        stepNumber: 4,
        timeOffsetFormatted: '08:00',
        timeOffsetSeconds: 480,
        title: 'Divide into Small Pieces and Flatten into Discs',
        actionDescription: 'Divide into small pieces and flatten into discs.',
        ingredientAdditions: [],
        toolsUsed: ['Bench Scraper'],
        criticalControlPoint: 'Roll edges thinner than the center.',
        sensoryCue: 'Smooth supple rounds of soft mochi.',
        soundscapeType: 'chop',
        spokenNarration: 'Divide into small pieces and flatten into discs.'
      },
      {
        stepNumber: 5,
        timeOffsetFormatted: '12:00',
        timeOffsetSeconds: 720,
        title: 'Wrap Each Disc Around a Ball of Sweet Bean Paste and Pinch Closed',
        actionDescription: 'Wrap each disc around a ball of sweet bean paste and pinch closed.',
        ingredientAdditions: [{ ingredientName: 'Sweet red bean paste (anko)', amount: '6 balls', technique: 'Enclosed' }],
        toolsUsed: [],
        criticalControlPoint: 'Pinch seam tightly and roll gently between palms into smooth ball.',
        sensoryCue: 'Pillowy plump round mochi cake.',
        soundscapeType: 'plating',
        spokenNarration: 'Wrap each disc around a ball of sweet bean paste and pinch closed.'
      },
      {
        stepNumber: 6,
        timeOffsetFormatted: '15:00',
        timeOffsetSeconds: 900,
        title: 'Dust Off Excess Starch and Serve at Room Temperature',
        actionDescription: 'Dust off excess starch and serve at room temperature.',
        ingredientAdditions: [],
        toolsUsed: ['Ceramic Plate'],
        criticalControlPoint: 'Serve fresh on the day of making.',
        sensoryCue: 'Soft, stretchy, pillowy texture with sweet red bean aroma.',
        soundscapeType: 'plating',
        spokenNarration: 'Dust off excess starch and serve at room temperature.'
      }
    ],
    platingPresentation: 'Plump round mochi arranged on a minimalist ceramic plate beside a green matcha whisk bowl.',
    sommelierPairing: {
      vintage: 'Ceremonial Uji Matcha Green Tea',
      terroir: 'Kyoto, Japan',
      tastingNote: 'Rich vegetal umami and clean bitterness balance the sweet red bean paste.'
    },
    heroImageUrl: imgMochi,
    aiImagePrompt: 'Plump pastel-colored mochi rice cakes arranged on a minimalist ceramic plate: soft powdery surface dusted in starch, one cut in half showing smooth sweet red bean filling, green matcha tea cup beside it.',
    createdAt: new Date().toISOString()
  },

  // 30. Chiles en Nogada — Mexico
  {
    id: 'chiles-en-nogada-mexico',
    recipeNumber: 30,
    primaryIngredientId: 'poblano-picadillo-walnut-nogada',
    primaryIngredientName: 'Roasted Poblano Chiles & Creamy Walnut Nogada Sauce',
    dishTitle: 'Chiles en Nogada',
    subtitle: 'Roasted poblano peppers stuffed with savory-sweet fruit picadillo, draped in creamy walnut nogada sauce, ruby pomegranate, and parsley',
    cuisine: 'Mexican',
    countryRegion: 'Mexico',
    tags: ['Mexican', 'Chiles en Nogada', 'Puebla', 'Poblano', 'Heritage'],
    overview: 'The patriotic national masterpiece of Puebla, Mexico. Charred poblano chiles stuffed with a savory-sweet picadillo of pork, fruits, nuts, and spices, bathed in a velvety white walnut sauce (nogada), and garnished with ruby red pomegranate seeds and green parsley representing the Mexican flag.',
    chefRationale: 'Skinning fresh Castilla walnuts removes bitter tannins, resulting in an impeccably white, velvety, and delicately sweet nogada sauce.',
    difficulty: 'Master',
    servings: 4,
    totalPrepTimeMinutes: 30,
    totalCookTimeMinutes: 30,
    overallDurationFormatted: '60 min',
    trendScore: 98.7,
    hotnessRank: 30,
    awardBadge: 'World Archive No. 30 • Poblano Patriotic Masterpiece',
    flavorAromaProfile: {
      umami: 94,
      acidity: 50,
      aromaticIntensity: 98,
      textureComplexity: 98,
      finishLength: 96
    },
    requiredTools: [
      {
        id: 'blender-nogada',
        name: 'High-Speed Blender & Comal',
        category: 'Cookware',
        material: 'Cast Iron & High-Power Motor',
        purpose: 'Chars chiles blistered and purees walnuts into velvet white sauce'
      }
    ],
    ingredientsList: [
      { name: 'Poblano peppers', amount: '4 large fresh poblano chiles', prepState: 'Charred, peeled, and seeded', addedAtMinute: 0, isArchiveSpecialty: true },
      { name: 'Picadillo filling (pork, fruit, nuts)', amount: '350g ground pork with apples, pears, raisins, pine nuts', prepState: 'Sautéed with warm spices', addedAtMinute: 10, isArchiveSpecialty: true },
      { name: 'Walnut sauce (nogada)', amount: '200ml peeled walnuts, goat cheese/crema, milk, cinnamon', prepState: 'Pureed silky smooth', addedAtMinute: 22, isArchiveSpecialty: true },
      { name: 'Pomegranate seeds', amount: '1/2 cup fresh ruby pomegranate arils', prepState: 'Fresh arils', addedAtMinute: 25, isArchiveSpecialty: false },
      { name: 'Parsley', amount: 'Fresh flat-leaf parsley leaves', prepState: 'Finely chopped', addedAtMinute: 25, isArchiveSpecialty: false }
    ],
    timelineSteps: [
      {
        stepNumber: 1,
        timeOffsetFormatted: '00:00',
        timeOffsetSeconds: 0,
        title: 'Roast Poblano Peppers Over Open Flame, Peel, and Slit Open',
        actionDescription: 'Roast poblano peppers over an open flame, peel, and slit open.',
        ingredientAdditions: [{ ingredientName: 'Poblano peppers', amount: '4 chiles', technique: 'Charred and peeled' }],
        toolsUsed: ['Comal / Open Flame', 'Covered Bowl'],
        criticalControlPoint: 'Char until black, sweat in a bag 10 min, peel skin and seed carefully.',
        sensoryCue: 'Smoky sweet roasted chile fragrance.',
        soundscapeType: 'flame',
        spokenNarration: 'Roast poblano peppers over an open flame, peel, and slit open.'
      },
      {
        stepNumber: 2,
        timeOffsetFormatted: '10:00',
        timeOffsetSeconds: 600,
        title: 'Cook Picadillo: Pork with Fruits, Nuts, and Spices',
        actionDescription: 'Cook picadillo: ground pork with apples, pears, raisins, nuts, and warm spices.',
        ingredientAdditions: [{ ingredientName: 'Picadillo filling (pork, fruit, nuts)', amount: '350g', technique: 'Sautéed' }],
        toolsUsed: ['Skillet'],
        criticalControlPoint: 'Simmer until fruits are soft and pork is savory and aromatic.',
        sensoryCue: 'Sweet cinnamon, clove, roasted pork, and caramelized fruit aroma.',
        soundscapeType: 'sizzle',
        spokenNarration: 'Cook picadillo filling with pork, fruits, nuts, and spices.'
      },
      {
        stepNumber: 3,
        timeOffsetFormatted: '18:00',
        timeOffsetSeconds: 1080,
        title: 'Stuff Poblano Peppers with the Picadillo',
        actionDescription: 'Stuff each poblano pepper generously with the warm picadillo.',
        ingredientAdditions: [],
        toolsUsed: ['Spoon'],
        criticalControlPoint: 'Fill plumply while keeping the chile wrapper intact.',
        sensoryCue: 'Plump stuffed dark green chiles.',
        soundscapeType: 'plating',
        spokenNarration: 'Stuff each poblano pepper with the warm picadillo.'
      },
      {
        stepNumber: 4,
        timeOffsetFormatted: '22:00',
        timeOffsetSeconds: 1320,
        title: 'Blend Walnut Sauce (Nogada) Until Creamy Smooth',
        actionDescription: 'Blend walnut sauce (nogada) with walnuts, cheese, milk, and a touch of sherry.',
        ingredientAdditions: [{ ingredientName: 'Walnut sauce (nogada)', amount: '200ml', technique: 'Pureed' }],
        toolsUsed: ['High-Speed Blender'],
        criticalControlPoint: 'Puree until velvet white and lump-free.',
        sensoryCue: 'Rich walnut and fresh goat cheese aroma.',
        soundscapeType: 'whisk',
        spokenNarration: 'Blend walnut sauce until creamy and satin smooth.'
      },
      {
        stepNumber: 5,
        timeOffsetFormatted: '25:00',
        timeOffsetSeconds: 1500,
        title: 'Spoon Nogada Sauce Over Chiles',
        actionDescription: 'Spoon nogada sauce generously over the stuffed chiles.',
        ingredientAdditions: [],
        toolsUsed: ['Ladle'],
        criticalControlPoint: 'Blanket the stuffed chile completely in pristine white walnut cream.',
        sensoryCue: 'Velvety ivory sauce cascading over roasted chile.',
        soundscapeType: 'drizzle',
        spokenNarration: 'Spoon nogada sauce over the stuffed chiles.'
      },
      {
        stepNumber: 6,
        timeOffsetFormatted: '27:00',
        timeOffsetSeconds: 1620,
        title: 'Garnish with Pomegranate Seeds and Parsley (Mexican Flag Colors)',
        actionDescription: 'Garnish with pomegranate seeds and parsley (colors of the Mexican flag).',
        ingredientAdditions: [
          { ingredientName: 'Pomegranate seeds', amount: '1/2 cup', technique: 'Scattered' },
          { ingredientName: 'Parsley', amount: 'Leaves', technique: 'Scattered' }
        ],
        toolsUsed: ['Serving Platter'],
        criticalControlPoint: 'Serve at room temperature or cool for authentic flavor balance.',
        sensoryCue: 'Vibrant green, white, and ruby red visual harmony.',
        soundscapeType: 'plating',
        spokenNarration: 'Garnish with pomegranate seeds and parsley to complete the flag colors.'
      }
    ],
    platingPresentation: 'Stuffed green poblano smothered in white walnut nogada sauce, scattered with ruby red pomegranate seeds and green parsley.',
    sommelierPairing: {
      vintage: 'Mexican Sparkling Wine / Rosé',
      terroir: 'Valle de Guadalupe, Mexico',
      tastingNote: 'Crisp effervescence and red berry notes match pomegranate seeds and walnut cream.'
    },
    heroImageUrl: imgChilesNogada,
    aiImagePrompt: 'Roasted poblano pepper stuffed with picadillo, smothered in thick white walnut cream sauce (nogada), garnished with bright red pomegranate seeds and fresh green parsley (colors of Mexican flag), white ceramic plate.',
    createdAt: new Date().toISOString()
  }
];
