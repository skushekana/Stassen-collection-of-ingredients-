import { CulinaryMasterclass } from '../../types';

import imgFishAndChips from '../../assets/images/fish_and_chips_1788302011027.jpg';
import imgShepherdsPie from '../../assets/images/shepherds_pie_1788302026205.jpg';
import imgSchnitzel from '../../assets/images/wiener_schnitzel_1788302038598.jpg';
import imgGoulash from '../../assets/images/hungarian_goulash_1788302050532.jpg';
import imgPaella from '../../assets/images/paella_valenciana_1788302062201.jpg';
import imgCeviche from '../../assets/images/peruvian_ceviche_1788302076127.jpg';
import imgLomoSaltado from '../../assets/images/lomo_saltado_1788302089863.jpg';
import imgTomYum from '../../assets/images/tom_yum_goong_1788302103167.jpg';
import imgChickenRice from '../../assets/images/hainanese_chicken_rice_1788302115772.jpg';
import imgBeefRendang from '../../assets/images/beef_rendang_1788302129385.jpg';

export const RECIPES_41_TO_50: CulinaryMasterclass[] = [
  // 41. Fish and Chips — United Kingdom
  {
    id: 'fish-and-chips-uk',
    recipeNumber: 41,
    primaryIngredientId: 'beer-battered-cod-chips',
    primaryIngredientName: 'Crispy Beer-Battered Cod & Thick-Cut Chips',
    dishTitle: 'Fish and Chips',
    subtitle: 'Golden, extra-crispy beer-battered fresh cod with thick-cut chips, mushy peas, and tartar sauce',
    cuisine: 'British',
    countryRegion: 'United Kingdom',
    tags: ['Fish and Chips', 'British', 'Crispy', 'Beer Batter', 'Seafood'],
    overview: 'The beloved seaside and pub classic of Great Britain. Thick fillets of fresh Atlantic cod coated in a cold, bubbly beer batter, fried to golden, lace-crisp perfection, served alongside thick-cut fluffy potato chips, bright green mushy peas, and homemade tartar sauce.',
    chefRationale: 'Carbonation in ice-cold beer expands rapidly upon contact with 375°F oil, creating micro-bubbles for an ultra-crisp, light, non-greasy crust.',
    difficulty: 'Easy',
    servings: 2,
    totalPrepTimeMinutes: 15,
    totalCookTimeMinutes: 15,
    overallDurationFormatted: '30 min',
    trendScore: 98.8,
    hotnessRank: 41,
    awardBadge: 'World Archive No. 41 • British Coastal Standard',
    flavorAromaProfile: {
      umami: 92,
      acidity: 60,
      aromaticIntensity: 90,
      textureComplexity: 98,
      finishLength: 90
    },
    requiredTools: [
      {
        id: 'deep-fryer-fish',
        name: 'Deep Fryer / Heavy Dutch Oven & Slotted Spider',
        category: 'Cookware',
        material: 'Stainless Steel',
        purpose: 'Maintains steady frying temperature for crisp lacy crust'
      }
    ],
    ingredientsList: [
      { name: 'Cod or haddock fillets', amount: '2 large fresh fillets (180g each)', prepState: 'Patted dry and lightly floured', addedAtMinute: 5, isArchiveSpecialty: true },
      { name: 'Potatoes (chips)', amount: '3 large Russet or Maris Piper potatoes', prepState: 'Cut into thick batons', addedAtMinute: 0, isArchiveSpecialty: false },
      { name: 'Beer batter (flour, beer, baking powder)', amount: '150g flour + 200ml cold ale + 1 tsp baking powder', prepState: 'Whisked cold', addedAtMinute: 5, isArchiveSpecialty: true },
      { name: 'Mushy peas', amount: '150g marrowfat peas simmered with mint & butter', prepState: 'Crushed warm', addedAtMinute: 12, isArchiveSpecialty: true },
      { name: 'Tartar sauce & malt vinegar', amount: 'Homemade caper-dill tartar sauce + malt vinegar', prepState: 'Chilled sauce', addedAtMinute: 14, isArchiveSpecialty: false }
    ],
    timelineSteps: [
      {
        stepNumber: 1,
        timeOffsetFormatted: '00:00',
        timeOffsetSeconds: 0,
        title: 'Par-Fry Thick-Cut Potato Chips at 320F (160C)',
        actionDescription: 'Par-fry thick-cut potato chips at 320F (160C) until tender, then drain.',
        ingredientAdditions: [{ ingredientName: 'Potatoes (chips)', amount: '3 potatoes', technique: 'First fry' }],
        toolsUsed: ['Deep Fryer'],
        criticalControlPoint: 'Cook through without browning, then rest before second crisping fry.',
        sensoryCue: 'Soft pale golden potato chips steaming on paper towels.',
        soundscapeType: 'sizzle',
        spokenNarration: 'Par-fry thick-cut potato chips until tender inside, then set aside.'
      },
      {
        stepNumber: 2,
        timeOffsetFormatted: '05:00',
        timeOffsetSeconds: 300,
        title: 'Whisk Flour, Baking Powder, and Ice-Cold Beer into Batter',
        actionDescription: 'Whisk flour, baking powder, and ice-cold beer into a smooth batter.',
        ingredientAdditions: [{ ingredientName: 'Beer batter (flour, beer, baking powder)', amount: 'Batter', technique: 'Whisked cold' }],
        toolsUsed: ['Mixing Bowl', 'Whisk'],
        criticalControlPoint: 'Keep batter ice-cold; do not overmix to preserve bubbles.',
        sensoryCue: 'Effervescent beer foam and yeasty malt aroma.',
        soundscapeType: 'whisk',
        spokenNarration: 'Whisk flour, baking powder, and ice-cold beer into a light bubbly batter.'
      },
      {
        stepNumber: 3,
        timeOffsetFormatted: '08:00',
        timeOffsetSeconds: 480,
        title: 'Dredge Fish in Flour, Dip in Batter, Lower into 375F (190C) Oil',
        actionDescription: 'Dredge fish in flour, dip in batter, and lower gently into hot oil.',
        ingredientAdditions: [{ ingredientName: 'Cod or haddock fillets', amount: '2 fillets', technique: 'Battered & fried' }],
        toolsUsed: ['Tongs', 'Slotted Spider'],
        criticalControlPoint: 'Hold tail in oil for 3 seconds before releasing to prevent sticking to basket.',
        sensoryCue: 'Vigorous sizzling roar as golden lace bubbles form instantly.',
        soundscapeType: 'sizzle',
        spokenNarration: 'Dredge fish in flour, dip in batter, and lower into hot oil.'
      },
      {
        stepNumber: 4,
        timeOffsetFormatted: '12:00',
        timeOffsetSeconds: 720,
        title: 'Fry Fish 5-6 Minutes Until Deep Golden and Shatteringly Crisp',
        actionDescription: 'Fry fish 5-6 minutes until deep golden and shatteringly crisp, then drain.',
        ingredientAdditions: [],
        toolsUsed: ['Slotted Spider'],
        criticalControlPoint: 'Crust should be firm and audibly crunchy when tapped with tongs.',
        sensoryCue: 'Golden bubbly crust gleaming with crispy ridges.',
        soundscapeType: 'sizzle',
        spokenNarration: 'Fry fish until deep golden brown and shatteringly crisp.'
      },
      {
        stepNumber: 5,
        timeOffsetFormatted: '14:00',
        timeOffsetSeconds: 840,
        title: 'Flash-Fry Chips at 375F (190C) for 2-3 Minutes Until Golden Crisp',
        actionDescription: 'Flash-fry chips at 375F (190C) for 2-3 minutes until golden and crunchy.',
        ingredientAdditions: [],
        toolsUsed: ['Deep Fryer Basket'],
        criticalControlPoint: 'Toss immediately with sea salt and malt vinegar.',
        sensoryCue: 'Audible crackle of hot golden potato chips.',
        soundscapeType: 'sizzle',
        spokenNarration: 'Flash-fry chips until golden and crunchy on the outside, fluffy inside.'
      },
      {
        stepNumber: 6,
        timeOffsetFormatted: '16:00',
        timeOffsetSeconds: 960,
        title: 'Serve with Mushy Peas, Tartar Sauce, and Lemon Wedges',
        actionDescription: 'Serve with warm mushy peas, tartar sauce, and lemon wedges on newspaper-style paper.',
        ingredientAdditions: [
          { ingredientName: 'Mushy peas', amount: '150g', technique: 'Side dish' },
          { ingredientName: 'Tartar sauce & malt vinegar', amount: 'Sauce', technique: 'Dipping bowl' }
        ],
        toolsUsed: ['Serving Platter'],
        criticalControlPoint: 'Serve piping hot right out of the fryer.',
        sensoryCue: 'Steaming flaky white fish inside golden crisp batter.',
        soundscapeType: 'plating',
        spokenNarration: 'Serve with warm mushy peas, tartar sauce, and lemon wedges.'
      }
    ],
    platingPresentation: 'Golden beer-battered cod laid across a pile of thick-cut chips on parchment paper, beside a pot of bright green mushy peas and lemon wedge.',
    sommelierPairing: {
      vintage: 'Traditional British Pale Ale / Vintage Cider',
      terroir: 'Yorkshire, United Kingdom',
      tastingNote: 'Crisp malt sweetness and snappy carbonation slice through rich fried batter.'
    },
    heroImageUrl: imgFishAndChips,
    aiImagePrompt: 'Golden beer-battered cod fillet with crisp bubbly crust laid across a pile of thick-cut chips on newspaper-style parchment paper, small pot of green mushy peas, ramekin of creamy tartar sauce, lemon wedge.',
    createdAt: new Date().toISOString()
  },

  // 42. Shepherd's Pie — United Kingdom
  {
    id: 'shepherds-pie-uk',
    recipeNumber: 42,
    primaryIngredientId: 'minced-lamb-mashed-potato-crust',
    primaryIngredientName: 'Savory Minced Lamb & Golden Fork-Ridged Mash',
    dishTitle: 'Shepherd\'s Pie',
    subtitle: 'Hearty British baked pie with savory minced lamb, peas, carrots, and a golden fork-ridged mashed potato crust',
    cuisine: 'British',
    countryRegion: 'United Kingdom',
    tags: ['Pie', 'Shepherds Pie', 'British', 'Lamb', 'Comfort'],
    overview: 'The quintessential British comfort classic. Minced lamb simmered in rich gravy with carrots, sweet peas, Worcestershire sauce, and rosemary, topped with a thick blanket of buttery mashed potatoes scored with fork ridges and baked until golden crisp.',
    chefRationale: 'Roughing the top of the mashed potatoes with fork tines creates peaks that caramelize deeply under broiler heat for crunchy texture.',
    difficulty: 'Easy',
    servings: 4,
    totalPrepTimeMinutes: 20,
    totalCookTimeMinutes: 35,
    overallDurationFormatted: '55 min',
    trendScore: 98.6,
    hotnessRank: 42,
    awardBadge: 'World Archive No. 42 • British Countryside Classic',
    flavorAromaProfile: {
      umami: 96,
      acidity: 40,
      aromaticIntensity: 92,
      textureComplexity: 94,
      finishLength: 92
    },
    requiredTools: [
      {
        id: 'ceramic-pie-dish',
        name: 'Deep Ceramic Casserole / Pie Dish',
        category: 'Cookware',
        material: 'Ceramic Stoneware',
        purpose: 'Provides even baking and beautiful table presentation'
      }
    ],
    ingredientsList: [
      { name: 'Ground lamb', amount: '500g minced lamb shoulder', prepState: 'Browned with aromatics', addedAtMinute: 0, isArchiveSpecialty: false },
      { name: 'Mashed potatoes', amount: '600g Yukon gold potatoes mashed with butter, cream, egg yolk', prepState: 'Fluffy warm mash', addedAtMinute: 18, isArchiveSpecialty: true },
      { name: 'Peas and carrots', amount: '1 cup diced carrots + 1 cup sweet garden peas', prepState: 'Diced & tender', addedAtMinute: 8, isArchiveSpecialty: false },
      { name: 'Onion and garlic', amount: '1 yellow onion + 3 cloves garlic', prepState: 'Finely diced', addedAtMinute: 0, isArchiveSpecialty: false },
      { name: 'Beef/lamb broth & Worcestershire', amount: '250ml broth + 2 tbsp Worcestershire sauce + tomato paste', prepState: 'Simmered gravy', addedAtMinute: 8, isArchiveSpecialty: true }
    ],
    timelineSteps: [
      {
        stepNumber: 1,
        timeOffsetFormatted: '00:00',
        timeOffsetSeconds: 0,
        title: 'Brown Minced Lamb with Onions, Garlic, and Tomato Paste',
        actionDescription: 'Brown minced lamb with onions, garlic, and tomato paste.',
        ingredientAdditions: [
          { ingredientName: 'Ground lamb', amount: '500g', technique: 'Browned' },
          { ingredientName: 'Onion and garlic', amount: 'Diced', technique: 'Sautéed' }
        ],
        toolsUsed: ['Skillet'],
        criticalControlPoint: 'Cook until meat is nicely browned and aromatics are fragrant.',
        sensoryCue: 'Sizzling savory lamb and sweet onion aroma.',
        soundscapeType: 'sizzle',
        spokenNarration: 'Brown minced lamb with onions, garlic, and tomato paste.'
      },
      {
        stepNumber: 2,
        timeOffsetFormatted: '08:00',
        timeOffsetSeconds: 480,
        title: 'Add Broth, Worcestershire Sauce, Carrots, Peas, and Thyme',
        actionDescription: 'Add broth, Worcestershire sauce, carrots, peas, and fresh thyme; simmer 10 minutes.',
        ingredientAdditions: [
          { ingredientName: 'Beef/lamb broth & Worcestershire', amount: '250ml', technique: 'Simmered' },
          { ingredientName: 'Peas and carrots', amount: '2 cups', technique: 'Cooked tender' }
        ],
        toolsUsed: ['Wooden Spoon'],
        criticalControlPoint: 'Gravy should be thick and coat the back of a spoon.',
        sensoryCue: 'Rich, savory Worcestershire and rosemary steam.',
        soundscapeType: 'simmer',
        spokenNarration: 'Add broth, Worcestershire sauce, carrots, and peas, then simmer until thick.'
      },
      {
        stepNumber: 3,
        timeOffsetFormatted: '18:00',
        timeOffsetSeconds: 1080,
        title: 'Transfer Meat Filling into Baking Dish',
        actionDescription: 'Transfer meat filling into a ceramic baking dish and level the surface.',
        ingredientAdditions: [],
        toolsUsed: ['Deep Ceramic Casserole Dish'],
        criticalControlPoint: 'Spread evenly so the mash layer sits level on top.',
        sensoryCue: 'Glossy dark savory lamb base ready for topping.',
        soundscapeType: 'plating',
        spokenNarration: 'Transfer meat filling into the baking dish and level the surface.'
      },
      {
        stepNumber: 4,
        timeOffsetFormatted: '20:00',
        timeOffsetSeconds: 1200,
        title: 'Spread Buttery Mashed Potatoes Over Top and Rake with a Fork',
        actionDescription: 'Spread buttery mashed potatoes over top and rake with a fork to create ridges.',
        ingredientAdditions: [{ ingredientName: 'Mashed potatoes', amount: '600g', technique: 'Fork-ridged' }],
        toolsUsed: ['Offset Spatula', 'Fork'],
        criticalControlPoint: 'Seal edges to prevent gravy bubbling over; create distinct peaks with fork.',
        sensoryCue: 'Creamy golden ridges covering the savory base.',
        soundscapeType: 'plating',
        spokenNarration: 'Spread mashed potatoes over the top and score with a fork to create peaks.'
      },
      {
        stepNumber: 5,
        timeOffsetFormatted: '25:00',
        timeOffsetSeconds: 1500,
        title: 'Bake at 400F (200C) for 25-30 Min Until Golden Peaks Form',
        actionDescription: 'Bake at 400F (200C) for 25-30 minutes until potato peaks are crispy and golden.',
        ingredientAdditions: [],
        toolsUsed: ['Oven'],
        criticalControlPoint: 'Broil the last 2-3 minutes for deep toasted potato crust.',
        sensoryCue: 'Caramelized butter and toasted potato aroma filling the oven.',
        soundscapeType: 'sizzle',
        spokenNarration: 'Bake until the potato peaks are deeply browned and crispy.'
      },
      {
        stepNumber: 6,
        timeOffsetFormatted: '50:00',
        timeOffsetSeconds: 3000,
        title: 'Rest 10 Minutes, Scoop into Warm Portions',
        actionDescription: 'Rest 10 minutes, scoop into warm portions showing rich meat filling beneath golden mash.',
        ingredientAdditions: [],
        toolsUsed: ['Serving Spoon'],
        criticalControlPoint: 'Resting lets gravy settle so it doesn\'t run excessively when scooped.',
        sensoryCue: 'Steaming savory pie with creamy potato top.',
        soundscapeType: 'plating',
        spokenNarration: 'Rest for ten minutes, then scoop into warm, comforting portions.'
      }
    ],
    platingPresentation: 'Baked ceramic baking dish with golden-brown toasted potato ridges, showing a scoop with rich dark lamb gravy, carrots, and peas.',
    sommelierPairing: {
      vintage: '2019 Côtes du Rhône / English Bitter',
      terroir: 'Rhône, France',
      tastingNote: 'Earthy herbs, blackberry fruit, and pepper match the savory lamb and Worcestershire sauce.'
    },
    heroImageUrl: imgShepherdsPie,
    aiImagePrompt: 'Baked Shepherd’s pie in a rustic baking dish: golden-brown crispy ridges of mashed potatoes on top, a scoop removed showing rich dark minced lamb gravy with peas and carrots beneath, fresh parsley garnish.',
    createdAt: new Date().toISOString()
  },

  // 43. Wiener Schnitzel — Austria
  {
    id: 'wiener-schnitzel-austria',
    recipeNumber: 43,
    primaryIngredientId: 'veal-cutlet-breading-butter',
    primaryIngredientName: 'Tender Veal Cutlet & Souffléed Golden Crust',
    dishTitle: 'Wiener Schnitzel',
    subtitle: 'Classic Austrian pan-fried veal cutlet with delicate, wavy golden breadcrumb crust, lemon, and potato salad',
    cuisine: 'Austrian',
    countryRegion: 'Austria',
    tags: ['Schnitzel', 'Austrian', 'Vienna', 'Veal', 'Crispy'],
    overview: 'The legendary culinary icon of Vienna. Butterfly veal cutlet pounded paper-thin, lightly breaded in flour, whisked egg, and fresh breadcrumbs, pan-fried in foaming clarified butter so the breading inflates like a delicate wavy golden soufflé, served with lemon wedges and Austrian warm potato salad (Erdäpfelsalat).',
    chefRationale: 'Continuously swirling the pan while frying in clarified butter allows hot fat to wash over the cutlet, causing steam to puff the breadcrumb coating into signature wavy ripples.',
    difficulty: 'Intermediate',
    servings: 2,
    totalPrepTimeMinutes: 15,
    totalCookTimeMinutes: 10,
    overallDurationFormatted: '25 min',
    trendScore: 98.7,
    hotnessRank: 43,
    awardBadge: 'World Archive No. 43 • Imperial Viennese Atelier',
    flavorAromaProfile: {
      umami: 94,
      acidity: 65,
      aromaticIntensity: 90,
      textureComplexity: 98,
      finishLength: 90
    },
    requiredTools: [
      {
        id: 'large-skillet-schnitzel',
        name: 'Wide Skillet & Meat Mallet',
        category: 'Cookware',
        material: 'Carbon Steel / Stainless Steel',
        purpose: 'Provides room for continuous pan swirling and butter bathing'
      }
    ],
    ingredientsList: [
      { name: 'Veal cutlets', amount: '2 veal topside cutlets (150g each)', prepState: 'Pounded to 4mm thickness', addedAtMinute: 0, isArchiveSpecialty: true },
      { name: 'Breadcrumbs', amount: '120g fresh fine breadcrumbs (Semmelbrösel)', prepState: 'Fine dry crumbs', addedAtMinute: 5, isArchiveSpecialty: true },
      { name: 'Flour and eggs', amount: '60g flour + 2 eggs lightly whisked with cream', prepState: 'Standard breading station', addedAtMinute: 5, isArchiveSpecialty: false },
      { name: 'Clarified butter (Ghee/Schmalz)', amount: '150g clarified butter', prepState: 'Melted for shallow frying', addedAtMinute: 8, isArchiveSpecialty: true },
      { name: 'Lemon wedges and parsley', amount: 'Fresh lemon wedges + parsley', prepState: 'For serving', addedAtMinute: 12, isArchiveSpecialty: false }
    ],
    timelineSteps: [
      {
        stepNumber: 1,
        timeOffsetFormatted: '00:00',
        timeOffsetSeconds: 0,
        title: 'Pound Veal Cutlets Between Plastic Wrap to 4mm Thin',
        actionDescription: 'Pound veal cutlets evenly between plastic wrap to 4mm thin.',
        ingredientAdditions: [{ ingredientName: 'Veal cutlets', amount: '2 cutlets', technique: 'Pounded thin' }],
        toolsUsed: ['Meat Mallet'],
        criticalControlPoint: 'Pound with flat side of mallet from center outward for uniform thinness.',
        sensoryCue: 'Uniform paper-thin tender cutlets.',
        soundscapeType: 'chop',
        spokenNarration: 'Pound veal cutlets evenly to four millimeters thickness.'
      },
      {
        stepNumber: 2,
        timeOffsetFormatted: '05:00',
        timeOffsetSeconds: 300,
        title: 'Dredge in Flour, Dip in Whisked Egg, Coat in Breadcrumbs',
        actionDescription: 'Dredge in flour, dip in whisked egg, and gently coat in breadcrumbs without pressing down.',
        ingredientAdditions: [
          { ingredientName: 'Flour and eggs', amount: 'Flour & egg dip', technique: 'Light dredge' },
          { ingredientName: 'Breadcrumbs', amount: '120g', technique: 'Gentle coating' }
        ],
        toolsUsed: ['Shallow Dishes'],
        criticalControlPoint: 'Do not press breadcrumbs into meat so coating can puff freely while frying.',
        sensoryCue: 'Light, airy golden crumb coating.',
        soundscapeType: 'plating',
        spokenNarration: 'Dredge in flour, dip in egg, and coat lightly in breadcrumbs without pressing.'
      },
      {
        stepNumber: 3,
        timeOffsetFormatted: '08:00',
        timeOffsetSeconds: 480,
        title: 'Heat Clarified Butter to 340F (170C) in a Wide Skillet',
        actionDescription: 'Heat clarified butter in a wide skillet until shimmering.',
        ingredientAdditions: [{ ingredientName: 'Clarified butter (Ghee/Schmalz)', amount: '150g', technique: 'Heated' }],
        toolsUsed: ['Wide Skillet'],
        criticalControlPoint: 'Cutlet must float freely in the hot fat.',
        sensoryCue: 'Sweet aroma of foaming clarified butter.',
        soundscapeType: 'sizzle',
        spokenNarration: 'Heat clarified butter in a wide skillet until shimmering.'
      },
      {
        stepNumber: 4,
        timeOffsetFormatted: '09:00',
        timeOffsetSeconds: 540,
        title: 'Fry Cutlet 2 Min Per Side, Swirling the Pan Continuously',
        actionDescription: 'Fry cutlet 2 min per side, swirling the pan continuously so hot butter washes over the top.',
        ingredientAdditions: [],
        toolsUsed: ['Tongs'],
        criticalControlPoint: 'Continuous swirling causes the delicate breading to puff into wavy ripples.',
        sensoryCue: 'Loud sizzle and breadcrumbs puffing into golden waves.',
        soundscapeType: 'sizzle',
        spokenNarration: 'Fry cutlet while swirling the pan continuously so butter washes over the top.'
      },
      {
        stepNumber: 5,
        timeOffsetFormatted: '13:00',
        timeOffsetSeconds: 780,
        title: 'Drain on Paper Towels, Season with Sea Salt',
        actionDescription: 'Drain on paper towels, season lightly with fine sea salt.',
        ingredientAdditions: [],
        toolsUsed: ['Slotted Spatula'],
        criticalControlPoint: 'Drain immediately so crust stays light and crisp.',
        sensoryCue: 'Delicate, golden undulating ripples on the cutlet surface.',
        soundscapeType: 'plating',
        spokenNarration: 'Drain on paper towels and season with fine sea salt.'
      },
      {
        stepNumber: 6,
        timeOffsetFormatted: '14:00',
        timeOffsetSeconds: 840,
        title: 'Serve Immediately with Lemon Wedges and Austrian Potato Salad',
        actionDescription: 'Serve immediately with fresh lemon wedges, parsley, and lingonberry jam.',
        ingredientAdditions: [{ ingredientName: 'Lemon wedges and parsley', amount: 'Fresh', technique: 'Garnish' }],
        toolsUsed: ['Platter'],
        criticalControlPoint: 'Squeeze fresh lemon right before eating for crispy citrus bite.',
        sensoryCue: 'Crispy crackle breaking into tender veal with fresh lemon fragrance.',
        soundscapeType: 'plating',
        spokenNarration: 'Serve immediately with lemon wedges and lingonberry jam.'
      }
    ],
    platingPresentation: 'Large golden wavy schnitzel covering the plate, garnished with a lemon wheel with parsley and lingonberries on the side.',
    sommelierPairing: {
      vintage: '2021 Grüner Veltliner Federspiel',
      terroir: 'Wachau, Austria',
      tastingNote: 'Crisp green apple, white pepper, and zesty citrus cut through golden butter-fried crust.'
    },
    heroImageUrl: imgSchnitzel,
    aiImagePrompt: 'Classic golden Wiener Schnitzel on a white porcelain plate: thin veal cutlet with delicate wavy crispy golden-brown breadcrumb crust, lemon wedge, small bowl of lingonberry jam, fresh parsley garnish.',
    createdAt: new Date().toISOString()
  },

  // 44. Goulash — Hungary
  {
    id: 'goulash-hungary',
    recipeNumber: 44,
    primaryIngredientId: 'hungarian-paprika-beef-shank',
    primaryIngredientName: 'Sweet Hungarian Paprika & Slow-Braised Beef',
    dishTitle: 'Hungarian Goulash (Gulyás)',
    subtitle: 'Rich, warming Hungarian beef stew simmered with sweet noble paprika, caraway seeds, potatoes, and csipetke noodles',
    cuisine: 'Hungarian',
    countryRegion: 'Hungary',
    tags: ['Stew', 'Goulash', 'Hungarian', 'Paprika', 'Beef'],
    overview: 'The world-renowned national dish of Hungary (Bográcsgulyás). Beef shank slow-braised with abundant onions caramelized in lard, infused with vibrant sweet Hungarian paprika, caraway seeds, garlic, tender potatoes, carrots, and pinched egg noodles (csipetke).',
    chefRationale: 'Blooming authentic sweet paprika off the direct flame prevents scorching its delicate sugars while producing an intensely deep ruby broth.',
    difficulty: 'Intermediate',
    servings: 4,
    totalPrepTimeMinutes: 20,
    totalCookTimeMinutes: 60,
    overallDurationFormatted: '80 min',
    trendScore: 98.6,
    hotnessRank: 44,
    awardBadge: 'World Archive No. 44 • Hungarian Puszta Heritage',
    flavorAromaProfile: {
      umami: 96,
      acidity: 45,
      aromaticIntensity: 98,
      textureComplexity: 92,
      finishLength: 96
    },
    requiredTools: [
      {
        id: 'heavy-goulash-kettle',
        name: 'Heavy Base Dutch Oven / Cast Iron Pot',
        category: 'Cookware',
        material: 'Enameled Cast Iron',
        purpose: 'Provides slow, even heat distribution for tender meat and velvety paprika sauce'
      }
    ],
    ingredientsList: [
      { name: 'Beef chuck or shank', amount: '600g beef chuck/shank', prepState: 'Cut into 1-inch cubes', addedAtMinute: 0, isArchiveSpecialty: false },
      { name: 'Hungarian sweet paprika', amount: '3 tbsp authentic Szeged sweet paprika', prepState: 'Fresh ruby red spice', addedAtMinute: 10, isArchiveSpecialty: true },
      { name: 'Onions', amount: '3 large yellow onions', prepState: 'Finely chopped and slowly sweated', addedAtMinute: 0, isArchiveSpecialty: false },
      { name: 'Potatoes and carrots', amount: '3 medium potatoes + 2 carrots', prepState: 'Chunky diced', addedAtMinute: 40, isArchiveSpecialty: false },
      { name: 'Caraway seeds and garlic', amount: '1 tsp whole caraway crushed + 4 garlic cloves', prepState: 'Crushed into paste', addedAtMinute: 10, isArchiveSpecialty: true }
    ],
    timelineSteps: [
      {
        stepNumber: 1,
        timeOffsetFormatted: '00:00',
        timeOffsetSeconds: 0,
        title: 'Slowly Sweat Chopped Onions in Lard/Oil Until Soft and Golden',
        actionDescription: 'Slowly sweat chopped onions in lard or oil until soft and translucent.',
        ingredientAdditions: [{ ingredientName: 'Onions', amount: '3 onions', technique: 'Slow sautéed' }],
        toolsUsed: ['Heavy Base Dutch Oven'],
        criticalControlPoint: 'Do not brown onions dark; slow sweating builds sweet foundational body.',
        sensoryCue: 'Sweet, buttery caramelized onion fragrance.',
        soundscapeType: 'sizzle',
        spokenNarration: 'Slowly sweat chopped onions in lard or oil until soft and translucent.'
      },
      {
        stepNumber: 2,
        timeOffsetFormatted: '10:00',
        timeOffsetSeconds: 600,
        title: 'Remove from Heat, Stir in Sweet Paprika, Caraway, and Garlic',
        actionDescription: 'Remove pot from heat, stir in sweet paprika, caraway, and garlic.',
        ingredientAdditions: [
          { ingredientName: 'Hungarian sweet paprika', amount: '3 tbsp', technique: 'Bloomed off heat' },
          { ingredientName: 'Caraway seeds and garlic', amount: 'Spices', technique: 'Blended' }
        ],
        toolsUsed: ['Wooden Spoon'],
        criticalControlPoint: 'Always add paprika off heat to prevent burning, which turns it bitter.',
        sensoryCue: 'Explosive blooming aroma of sweet red paprika and herbal caraway.',
        soundscapeType: 'whisk',
        spokenNarration: 'Remove from heat and stir in sweet paprika, caraway, and garlic.'
      },
      {
        stepNumber: 3,
        timeOffsetFormatted: '12:00',
        timeOffsetSeconds: 720,
        title: 'Add Beef Cubes and Return to Heat, Searing Meat in Paprika Base',
        actionDescription: 'Add beef cubes and return to heat, tossing until coated and seared.',
        ingredientAdditions: [{ ingredientName: 'Beef chuck or shank', amount: '600g', technique: 'Coated in paprika' }],
        toolsUsed: ['Dutch Oven'],
        criticalControlPoint: 'Let beef release its natural juices into the ruby paprika paste.',
        sensoryCue: 'Sizzling beef enveloped in deep crimson paste.',
        soundscapeType: 'sizzle',
        spokenNarration: 'Add beef cubes, tossing until thoroughly coated in the fragrant paprika base.'
      },
      {
        stepNumber: 4,
        timeOffsetFormatted: '18:00',
        timeOffsetSeconds: 1080,
        title: 'Add Water or Broth, Cover and Simmer on Low Heat for 40 Minutes',
        actionDescription: 'Add water or beef broth, cover with lid and simmer gently for 40 minutes.',
        ingredientAdditions: [],
        toolsUsed: ['Lid'],
        criticalControlPoint: 'Keep at gentle simmer until beef is nearly tender.',
        sensoryCue: 'Deep ruby red broth simmering with rich beef aroma.',
        soundscapeType: 'simmer',
        spokenNarration: 'Add broth, cover, and simmer gently on low heat.'
      },
      {
        stepNumber: 5,
        timeOffsetFormatted: '45:00',
        timeOffsetSeconds: 2700,
        title: 'Add Diced Potatoes and Carrots, Simmer Until Tender',
        actionDescription: 'Add diced potatoes and carrots, simmer 20 minutes until fork-tender.',
        ingredientAdditions: [{ ingredientName: 'Potatoes and carrots', amount: 'Vegetables', technique: 'Simmered' }],
        toolsUsed: ['Dutch Oven'],
        criticalControlPoint: 'Potato starches thicken the paprika broth into a velvety soup-stew.',
        sensoryCue: 'Sweet potato and earthy carrot aroma blending into rich broth.',
        soundscapeType: 'simmer',
        spokenNarration: 'Add diced potatoes and carrots, simmering until tender.'
      },
      {
        stepNumber: 6,
        timeOffsetFormatted: '65:00',
        timeOffsetSeconds: 3900,
        title: 'Ladle into Rustic Bowls with Crusty Bread and Sliced Hot Wax Pepper',
        actionDescription: 'Ladle into rustic bowls and serve hot with crusty rye bread and sliced wax pepper.',
        ingredientAdditions: [],
        toolsUsed: ['Ladle', 'Serving Bowls'],
        criticalControlPoint: 'Serve piping hot with a dollop of sour cream if desired.',
        sensoryCue: 'Glowing red broth with tender beef and vegetables steaming.',
        soundscapeType: 'plating',
        spokenNarration: 'Ladle into rustic bowls and serve with crusty bread and sliced wax peppers.'
      }
    ],
    platingPresentation: 'Served in an enamel or earthenware kettle with vibrant red broth, chunks of beef, potatoes, and sliced green hot pepper rings.',
    sommelierPairing: {
      vintage: '2018 Egri Bikavér (Bull\'s Blood)',
      terroir: 'Eger, Hungary',
      tastingNote: 'Rich dark fruit, spice, and balanced acidity match sweet paprika and braised beef.'
    },
    heroImageUrl: imgGoulash,
    aiImagePrompt: 'Rich red Hungarian goulash stew in a rustic earthenware pot: tender chunks of beef, potatoes, and carrots submerged in vibrant ruby-red paprika broth, sliced green pepper on top, crusty bread beside it.',
    createdAt: new Date().toISOString()
  },

  // 45. Paella Valenciana — Spain
  {
    id: 'paella-valenciana-spain',
    recipeNumber: 45,
    primaryIngredientId: 'bomba-rice-saffron-socarrat',
    primaryIngredientName: 'Bomba Rice, Saffron Threads & Crispy Socarrat',
    dishTitle: 'Paella Valenciana',
    subtitle: 'Traditional Valencian saffron rice pan with chicken, rabbit, green beans, garrofó, and crispy bottom socarrat',
    cuisine: 'Spanish',
    countryRegion: 'Spain',
    tags: ['Rice', 'Paella', 'Spanish', 'Valencia', 'Saffron'],
    overview: 'The authentic original paella of Valencia. Short-grain Bomba rice simmered in rich saffron broth with chicken, rabbit, green beans (bajoqueta), lima beans (garrofó), and rosemary, cooked over an open flame until a prized crunchy caramelized crust (socarrat) forms on the bottom.',
    chefRationale: 'Never stirring the rice once the broth is added allows starch to settle and form the legendary golden crunchy socarrat crust on the pan bottom.',
    difficulty: 'Master',
    servings: 4,
    totalPrepTimeMinutes: 20,
    totalCookTimeMinutes: 35,
    overallDurationFormatted: '55 min',
    trendScore: 99.2,
    hotnessRank: 45,
    awardBadge: 'World Archive No. 45 • Valencian Open-Fire Atelier',
    flavorAromaProfile: {
      umami: 96,
      acidity: 45,
      aromaticIntensity: 99,
      textureComplexity: 98,
      finishLength: 98
    },
    requiredTools: [
      {
        id: 'paella-pan-wide',
        name: 'Authentic 15-inch Carbon Steel Paellera Pan',
        category: 'Cookware',
        material: 'Polished Carbon Steel',
        purpose: 'Provides broad, shallow surface area for even evaporation and socarrat formation'
      }
    ],
    ingredientsList: [
      { name: 'Bomba rice', amount: '350g authentic Valencian Bomba rice', prepState: 'Unrinsed short grain', addedAtMinute: 15, isArchiveSpecialty: true },
      { name: 'Chicken and rabbit', amount: '400g chicken thighs + 200g rabbit cuts', prepState: 'Cut into small bone-in pieces', addedAtMinute: 0, isArchiveSpecialty: true },
      { name: 'Green beans and garrofó', amount: '150g flat green beans + 100g white lima beans', prepState: 'Trimmed and rinsed', addedAtMinute: 5, isArchiveSpecialty: true },
      { name: 'Saffron threads', amount: '0.5g Spanish La Mancha saffron', prepState: 'Crushed and bloomed in broth', addedAtMinute: 12, isArchiveSpecialty: true },
      { name: 'Rosemary sprig & lemon', amount: '1 fresh rosemary sprig + lemon wedges', prepState: 'Fresh garnishes', addedAtMinute: 28, isArchiveSpecialty: false }
    ],
    timelineSteps: [
      {
        stepNumber: 1,
        timeOffsetFormatted: '00:00',
        timeOffsetSeconds: 0,
        title: 'Brown Chicken and Rabbit in Olive Oil with Salt in Paella Pan',
        actionDescription: 'Brown chicken and rabbit in olive oil with salt in the paella pan until deep golden.',
        ingredientAdditions: [{ ingredientName: 'Chicken and rabbit', amount: '600g', technique: 'Seared golden' }],
        toolsUsed: ['Authentic Carbon Steel Paellera Pan'],
        criticalControlPoint: 'Sear thoroughly to create rich fond on the pan bottom.',
        sensoryCue: 'Sizzling olive oil and deeply seared meat aroma.',
        soundscapeType: 'sizzle',
        spokenNarration: 'Brown chicken and rabbit in olive oil until deeply golden and caramelized.'
      },
      {
        stepNumber: 2,
        timeOffsetFormatted: '05:00',
        timeOffsetSeconds: 300,
        title: 'Add Green Beans, Garrofo, and Grated Tomato, Sauté 5 Min',
        actionDescription: 'Add green beans, garrofó beans, and grated tomato; sauté until tomato juices reduce.',
        ingredientAdditions: [{ ingredientName: 'Green beans and garrofó', amount: 'Beans', technique: 'Sautéed' }],
        toolsUsed: ['Paella Spatula'],
        criticalControlPoint: 'Caramelize tomato into a thick sofrito paste.',
        sensoryCue: 'Sweet tomato, green bean, and garlic aroma.',
        soundscapeType: 'sizzle',
        spokenNarration: 'Add green beans, garrofó, and grated tomato, cooking until juices reduce.'
      },
      {
        stepNumber: 3,
        timeOffsetFormatted: '12:00',
        timeOffsetSeconds: 720,
        title: 'Pour in Water/Stock and Saffron, Bring to Rolling Boil',
        actionDescription: 'Pour in rich chicken broth and bloomed saffron, bring to a rolling boil.',
        ingredientAdditions: [{ ingredientName: 'Saffron threads', amount: '0.5g', technique: 'Infused' }],
        toolsUsed: ['Paellera Pan'],
        criticalControlPoint: 'Broth should turn brilliant golden yellow.',
        sensoryCue: 'Fragrant saffron and rosemary perfume rising with steam.',
        soundscapeType: 'simmer',
        spokenNarration: 'Pour in broth and saffron, bringing everything to a vigorous rolling boil.'
      },
      {
        stepNumber: 4,
        timeOffsetFormatted: '15:00',
        timeOffsetSeconds: 900,
        title: 'Add Bomba Rice in a Diagonal Cross, Distribute Evenly',
        actionDescription: 'Add Bomba rice in a diagonal line (caballón), distribute evenly with spatula, then do NOT stir again.',
        ingredientAdditions: [{ ingredientName: 'Bomba rice', amount: '350g', technique: 'Distributed evenly' }],
        toolsUsed: ['Paella Spatula'],
        criticalControlPoint: 'Strict rule: do not stir the rice again to allow starches to set socarrat.',
        sensoryCue: 'Grains absorbing golden saffron broth evenly across the wide pan.',
        soundscapeType: 'simmer',
        spokenNarration: 'Add Bomba rice, distribute evenly across the pan, and do not stir again.'
      },
      {
        stepNumber: 5,
        timeOffsetFormatted: '25:00',
        timeOffsetSeconds: 1500,
        title: 'Cook on High 8 Min, Then Low 10 Min, Lay Rosemary on Top',
        actionDescription: 'Cook on high heat for 8 minutes, then reduce to low for 10 minutes; lay fresh rosemary sprig on top.',
        ingredientAdditions: [{ ingredientName: 'Rosemary sprig & lemon', amount: '1 sprig', technique: 'Aromatic top' }],
        toolsUsed: [],
        criticalControlPoint: 'Listen for crackling sound at the bottom signaling socarrat formation.',
        sensoryCue: 'Distinct toasted rice crackle and sweet herbal rosemary aroma.',
        soundscapeType: 'flame',
        spokenNarration: 'Simmer until liquid is absorbed and listen for the crackle of the socarrat.'
      },
      {
        stepNumber: 6,
        timeOffsetFormatted: '35:00',
        timeOffsetSeconds: 2100,
        title: 'Rest 5 Minutes Covered with Cloth, Serve Directly from Pan',
        actionDescription: 'Rest 5 minutes covered with a clean kitchen towel, serve directly from the paella pan.',
        ingredientAdditions: [],
        toolsUsed: ['Paellera Pan'],
        criticalControlPoint: 'Scrape bottom to reveal crunchy, golden-caramelized socarrat.',
        sensoryCue: 'Golden saffron grains with crunchy socarrat crackle.',
        soundscapeType: 'plating',
        spokenNarration: 'Rest covered for five minutes and serve directly from the paella pan with lemon wedges.'
      }
    ],
    platingPresentation: 'Served directly inside a large carbon steel paellera pan with lemon wedges around the rim, showing golden saffron grains and green beans.',
    sommelierPairing: {
      vintage: '2020 Spanish Monastrell / Rosado',
      terroir: 'Alicante / Utiel-Requena, Spain',
      tastingNote: 'Crisp red berry acidity, herbs, and minerality match the saffron and savory socarrat.'
    },
    heroImageUrl: imgPaella,
    aiImagePrompt: 'Authentic Valencian paella in a large carbon steel pan: vibrant golden-yellow saffron rice, pieces of browned chicken and rabbit, flat green beans and large white beans, fresh rosemary sprig on top, lemon wedges on rim.',
    createdAt: new Date().toISOString()
  },

  // 46. Ceviche — Peru
  {
    id: 'ceviche-peru',
    recipeNumber: 46,
    primaryIngredientId: 'fresh-sea-bass-leche-de-tigre',
    primaryIngredientName: 'Fresh Sea Bass & Citrus Leche de Tigre',
    dishTitle: 'Peruvian Ceviche (Cebiche)',
    subtitle: 'Ultra-fresh cured sea bass in vibrant lime leche de tigre with red onions, ají limo chilies, glazed sweet potato, and giant corn',
    cuisine: 'Peruvian',
    countryRegion: 'Peru',
    tags: ['Ceviche', 'Peruvian', 'Seafood', 'Citrus', 'Raw Fish'],
    overview: 'The national cultural treasure of Peru. Pristine cubes of fresh white sea bass flash-cured in freshly squeezed lime juice, tossed with red onions, fiery ají limo chilies, cilantro, and creamy leche de tigre (tiger\'s milk), served with glazed sweet potato (camote) and giant Andean corn (choclo).',
    chefRationale: 'Curing for just 1-2 minutes preserves the silky sashimi-grade texture of the fish while enveloping it in a tingling, zesty marinade.',
    difficulty: 'Easy',
    servings: 2,
    totalPrepTimeMinutes: 15,
    totalCookTimeMinutes: 0,
    overallDurationFormatted: '15 min',
    trendScore: 99.0,
    hotnessRank: 46,
    awardBadge: 'World Archive No. 46 • Limeña Coastal Masterpiece',
    flavorAromaProfile: {
      umami: 96,
      acidity: 98,
      aromaticIntensity: 98,
      textureComplexity: 96,
      finishLength: 95
    },
    requiredTools: [
      {
        id: 'chilled-glass-bowl',
        name: 'Chilled Glass Mixing Bowl & Citrus Squeezer',
        category: 'Cookware',
        material: 'Borosilicate Glass',
        purpose: 'Maintains ice-cold temperature during rapid flash cure'
      }
    ],
    ingredientsList: [
      { name: 'Fresh white fish', amount: '300g pristine sea bass / corvina', prepState: 'Cut into 3/4-inch cubes', addedAtMinute: 0, isArchiveSpecialty: true },
      { name: 'Lime juice (leche de tigre)', amount: 'Juice of 6 key limes gently squeezed', prepState: 'Freshly squeezed', addedAtMinute: 2, isArchiveSpecialty: true },
      { name: 'Red onion', amount: '1 red onion', prepState: 'Thinly julienned and rinsed in ice water', addedAtMinute: 4, isArchiveSpecialty: false },
      { name: 'Ají limo chili & cilantro', amount: '1 fresh ají limo finely minced + fresh cilantro', prepState: 'Minced fresh', addedAtMinute: 2, isArchiveSpecialty: true },
      { name: 'Sweet potato and choclo corn', amount: '1 boiled sweet potato + 1 cup boiled Andean choclo', prepState: 'Chilled side garnishes', addedAtMinute: 6, isArchiveSpecialty: true }
    ],
    timelineSteps: [
      {
        stepNumber: 1,
        timeOffsetFormatted: '00:00',
        timeOffsetSeconds: 0,
        title: 'Place Cubed Cold Fish in a Chilled Bowl, Season with Sea Salt',
        actionDescription: 'Place cubed cold fish in a chilled bowl, season with fine sea salt.',
        ingredientAdditions: [{ ingredientName: 'Fresh white fish', amount: '300g', technique: 'Chilled cubes' }],
        toolsUsed: ['Chilled Glass Mixing Bowl'],
        criticalControlPoint: 'Toss with salt first to tighten fish proteins before adding acid.',
        sensoryCue: 'Pristine ocean-fresh fish glistening.',
        soundscapeType: 'chop',
        spokenNarration: 'Place cold cubed fish in a chilled bowl and season with sea salt.'
      },
      {
        stepNumber: 2,
        timeOffsetFormatted: '02:00',
        timeOffsetSeconds: 120,
        title: 'Add Minced Aji Limo Chili and Cilantro',
        actionDescription: 'Add minced ají limo chili and chopped fresh cilantro.',
        ingredientAdditions: [{ ingredientName: 'Ají limo chili & cilantro', amount: 'Chili & herbs', technique: 'Tossed' }],
        toolsUsed: ['Spoon'],
        criticalControlPoint: 'Rub chili against bowl edge to release aromatic oils.',
        sensoryCue: 'Intense fresh citrus-chili perfume.',
        soundscapeType: 'chop',
        spokenNarration: 'Add minced ají limo chili and fresh cilantro.'
      },
      {
        stepNumber: 3,
        timeOffsetFormatted: '04:00',
        timeOffsetSeconds: 240,
        title: 'Squeeze Fresh Lime Juice Over Fish, Toss for 1 Minute (Leche de Tigre)',
        actionDescription: 'Squeeze fresh lime juice gently over fish, toss for 1 minute to form milky leche de tigre.',
        ingredientAdditions: [{ ingredientName: 'Lime juice (leche de tigre)', amount: '6 limes', technique: 'Gently squeezed' }],
        toolsUsed: ['Citrus Squeezer'],
        criticalControlPoint: 'Do not squeeze limes to the bitter white pith; gently squeeze for sweet juice.',
        sensoryCue: 'Juices turn opaque milky white (leche de tigre).',
        soundscapeType: 'drizzle',
        spokenNarration: 'Squeeze fresh lime juice over the fish and toss gently for one minute.'
      },
      {
        stepNumber: 4,
        timeOffsetFormatted: '06:00',
        timeOffsetSeconds: 360,
        title: 'Fold in Crisp Julienned Red Onions',
        actionDescription: 'Fold in crisp julienned red onions.',
        ingredientAdditions: [{ ingredientName: 'Red onion', amount: '1 julienned onion', technique: 'Folded in' }],
        toolsUsed: ['Spoon'],
        criticalControlPoint: 'Keep onions crisp and crunchy.',
        sensoryCue: 'Ruby red onion strands contrasting with white fish.',
        soundscapeType: 'plating',
        spokenNarration: 'Fold in crisp julienned red onions.'
      },
      {
        stepNumber: 5,
        timeOffsetFormatted: '08:00',
        timeOffsetSeconds: 480,
        title: 'Plate Immediately with Glazed Sweet Potato & Giant Choclo Corn',
        actionDescription: 'Plate immediately with slices of sweet potato and giant Andean choclo corn.',
        ingredientAdditions: [{ ingredientName: 'Sweet potato and choclo corn', amount: 'Sides', technique: 'Arranged beside' }],
        toolsUsed: ['Serving Platter'],
        criticalControlPoint: 'Serve immediately ice-cold while fish is tender and lime is sharp.',
        sensoryCue: 'Vibrant colors, electric acidity, and succulent tender fish.',
        soundscapeType: 'plating',
        spokenNarration: 'Plate immediately with sweet potato slices and giant choclo corn.'
      }
    ],
    platingPresentation: 'Arranged in a shallow blue ceramic dish with milky leche de tigre, purple onion rings, ají limo slices, orange sweet potato rounds, and white giant corn kernels.',
    sommelierPairing: {
      vintage: 'Peruvian Pisco Sour / Crisp Albariño',
      terroir: 'Ica, Peru / Rías Baixas, Spain',
      tastingNote: 'Bright lime zest, mineral freshness, and foam cut through electric citrus leche de tigre.'
    },
    heroImageUrl: imgCeviche,
    aiImagePrompt: 'Vibrant Peruvian ceviche in a shallow bowl: glossy white fish cubes cured in milky lime juice (leche de tigre), thin red onion ribbons, red aji limo slices, fresh cilantro, served with a round of orange sweet potato and giant white choclo corn.',
    createdAt: new Date().toISOString()
  },

  // 47. Lomo Saltado — Peru
  {
    id: 'lomo-saltado-peru',
    recipeNumber: 47,
    primaryIngredientId: 'beef-tenderloin-chifa-wok',
    primaryIngredientName: 'Seared Beef Tenderloin & Crisp Fries',
    dishTitle: 'Lomo Saltado',
    subtitle: 'Sizzling Peruvian-Chinese wok-fried beef tenderloin strips with red onions, tomatoes, ají amarillo, soy, and crisp french fries',
    cuisine: 'Peruvian',
    countryRegion: 'Peru',
    tags: ['Stir-Fry', 'Lomo Saltado', 'Peruvian', 'Chifa', 'Beef'],
    overview: 'The quintessential fusion triumph of Peru and China (Chifa cuisine). Prime beef tenderloin strips stir-fried over blazing wok flame, flambéed with pisco or vinegar, tossed with red onions, ripe tomatoes, ají amarillo chilies, soy sauce, and thick crispy french fries, served with white rice.',
    chefRationale: 'Intense high-heat wok tossing imparts authentic "wok hei" (breath of the wok) char while keeping the beef juicy and onions crisp-tender.',
    difficulty: 'Intermediate',
    servings: 2,
    totalPrepTimeMinutes: 15,
    totalCookTimeMinutes: 8,
    overallDurationFormatted: '25 min',
    trendScore: 98.9,
    hotnessRank: 47,
    awardBadge: 'World Archive No. 47 • Peruvian Chifa Fusion',
    flavorAromaProfile: {
      umami: 98,
      acidity: 75,
      aromaticIntensity: 98,
      textureComplexity: 96,
      finishLength: 94
    },
    requiredTools: [
      {
        id: 'carbon-wok-lomo',
        name: 'Carbon Steel Wok',
        category: 'Cookware',
        material: 'Carbon Steel',
        purpose: 'Imparts intense flame sear and wok hei'
      }
    ],
    ingredientsList: [
      { name: 'Beef tenderloin', amount: '350g prime beef tenderloin', prepState: 'Cut into thick strips', addedAtMinute: 0, isArchiveSpecialty: true },
      { name: 'Red onion and tomatoes', amount: '1 red onion + 2 firm plum tomatoes', prepState: 'Cut into thick wedges', addedAtMinute: 3, isArchiveSpecialty: false },
      { name: 'French fries', amount: '200g thick-cut french fries', prepState: 'Crispy fried', addedAtMinute: 6, isArchiveSpecialty: false },
      { name: 'Soy sauce and vinegar', amount: '2 tbsp soy sauce + 1.5 tbsp red wine vinegar', prepState: 'Seasoning sauce', addedAtMinute: 4, isArchiveSpecialty: true },
      { name: 'Ají amarillo & cilantro', amount: '1 ají amarillo chili seeded + fresh cilantro', prepState: 'Julienned & chopped', addedAtMinute: 4, isArchiveSpecialty: true }
    ],
    timelineSteps: [
      {
        stepNumber: 1,
        timeOffsetFormatted: '00:00',
        timeOffsetSeconds: 0,
        title: 'Heat Wok Until Smoking Hot, Sear Beef Strips Rapidly',
        actionDescription: 'Heat wok until smoking hot with oil, sear beef strips rapidly for 1-2 minutes.',
        ingredientAdditions: [{ ingredientName: 'Beef tenderloin', amount: '350g', technique: 'Wok seared' }],
        toolsUsed: ['Carbon Steel Wok'],
        criticalControlPoint: 'Sear in a single layer on maximum flame for dark caramelization.',
        sensoryCue: 'Intense sizzling roar and charred beef aroma.',
        soundscapeType: 'flame',
        spokenNarration: 'Heat wok until smoking hot, then sear beef strips rapidly.'
      },
      {
        stepNumber: 2,
        timeOffsetFormatted: '02:00',
        timeOffsetSeconds: 120,
        title: 'Remove Beef, Add Red Onion Wedges and Aji Amarillo',
        actionDescription: 'Remove beef briefly, add red onion wedges and ají amarillo; toss 1 minute.',
        ingredientAdditions: [{ ingredientName: 'Red onion and tomatoes', amount: 'Onion wedges', technique: 'Wok tossed' }],
        toolsUsed: ['Wok Spatula'],
        criticalControlPoint: 'Keep onions crunchy and slightly charred at edges.',
        sensoryCue: 'Sweet caramelized onion and spicy chili sizzle.',
        soundscapeType: 'sizzle',
        spokenNarration: 'Add red onion wedges and ají amarillo, tossing rapidly.'
      },
      {
        stepNumber: 3,
        timeOffsetFormatted: '04:00',
        timeOffsetSeconds: 240,
        title: 'Return Beef to Wok with Tomato Wedges, Soy Sauce, and Vinegar',
        actionDescription: 'Return beef to wok with tomato wedges, soy sauce, and red wine vinegar; toss vigorously.',
        ingredientAdditions: [
          { ingredientName: 'Soy sauce and vinegar', amount: 'Sauce', technique: 'Glazed' },
          { ingredientName: 'Ají amarillo & cilantro', amount: 'Chili', technique: 'Folded' }
        ],
        toolsUsed: ['Wok Spatula'],
        criticalControlPoint: 'Searing vinegar against hot metal creates signature tangy smoky pan sauce.',
        sensoryCue: 'Burst of smoky, savory, and tangy soy-vinegar steam.',
        soundscapeType: 'flame',
        spokenNarration: 'Return beef with tomatoes, soy sauce, and vinegar, tossing vigorously.'
      },
      {
        stepNumber: 4,
        timeOffsetFormatted: '06:00',
        timeOffsetSeconds: 360,
        title: 'Toss in Crispy French Fries and Chopped Cilantro',
        actionDescription: 'Toss in crispy french fries and chopped cilantro for 30 seconds.',
        ingredientAdditions: [{ ingredientName: 'French fries', amount: '200g', technique: 'Folded into stir-fry' }],
        toolsUsed: ['Wok Spatula'],
        criticalControlPoint: 'Toss just enough to coat fries in pan juices without losing crunch.',
        sensoryCue: 'Fries glistening with dark savory pan sauce.',
        soundscapeType: 'sizzle',
        spokenNarration: 'Toss in crispy french fries and fresh cilantro.'
      },
      {
        stepNumber: 5,
        timeOffsetFormatted: '07:00',
        timeOffsetSeconds: 420,
        title: 'Serve Immediately with a Mound of Steamed White Rice',
        actionDescription: 'Serve immediately with a mound of steamed white rice.',
        ingredientAdditions: [],
        toolsUsed: ['Serving Platter'],
        criticalControlPoint: 'Serve straight from the blazing wok.',
        sensoryCue: 'Steaming savory stir-fry with glistening beef, crunchy fries, and rice.',
        soundscapeType: 'plating',
        spokenNarration: 'Serve immediately with a mound of steamed white rice.'
      }
    ],
    platingPresentation: 'Piled high on a plate showing charred beef strips, purple onion wedges, red tomatoes, and glossy coated french fries beside a mound of white rice.',
    sommelierPairing: {
      vintage: '2020 Argentine Malbec / Peruvian Cusqueña Beer',
      terroir: 'Mendoza / Cusco',
      tastingNote: 'Plum fruit, smoke, and crisp malt match the wok hei char and savory soy-vinegar glaze.'
    },
    heroImageUrl: imgLomoSaltado,
    aiImagePrompt: 'Peruvian lomo saltado stir-fry: seared beef tenderloin strips, red onion wedges, tomato chunks, and thick french fries tossed in glossy brown soy sauce glaze, fresh cilantro, served with a dome of white rice.',
    createdAt: new Date().toISOString()
  },

  // 48. Tom Yum Goong — Thailand
  {
    id: 'tom-yum-goong-thailand',
    recipeNumber: 48,
    primaryIngredientId: 'lemongrass-galangal-shrimp-broth',
    primaryIngredientName: 'Lemongrass, Kaffir Lime & Jumbo River Prawns',
    dishTitle: 'Tom Yum Goong',
    subtitle: 'Fiery, aromatic Thai hot and sour soup with jumbo prawns, lemongrass, galangal, kaffir lime, and straw mushrooms',
    cuisine: 'Thai',
    countryRegion: 'Thailand',
    tags: ['Soup', 'Tom Yum', 'Thai', 'Spicy and Sour', 'Prawns'],
    overview: 'The world-celebrated hot and sour soup of Thailand. A fiery, aromatic clear or creamy broth infused with bruised lemongrass stalks, sliced galangal, torn kaffir lime leaves, and bird\'s eye chilies, holding succulent jumbo prawns and straw mushrooms, finished with lime juice and roasted chili paste (nam prik pao).',
    chefRationale: 'Bruising rather than chopping lemongrass and kaffir lime leaves crushes their essential oil cells, releasing bright aromatic terpenes into the boiling broth.',
    difficulty: 'Easy',
    servings: 2,
    totalPrepTimeMinutes: 10,
    totalCookTimeMinutes: 10,
    overallDurationFormatted: '20 min',
    trendScore: 99.2,
    hotnessRank: 48,
    awardBadge: 'World Archive No. 48 • Royal Siamese Herb Pot',
    flavorAromaProfile: {
      umami: 96,
      acidity: 95,
      aromaticIntensity: 100,
      textureComplexity: 90,
      finishLength: 98
    },
    requiredTools: [
      {
        id: 'thai-soup-pot',
        name: 'Thai Hot Pot / Clay Soup Pot',
        category: 'Cookware',
        material: 'Stainless Steel / Ceramic',
        purpose: 'Maintains simmering heat and blooms citrus aromatics'
      }
    ],
    ingredientsList: [
      { name: 'Shrimp or prawns', amount: '8 large head-on tiger prawns', prepState: 'Peeled with tails on, heads for stock', addedAtMinute: 6, isArchiveSpecialty: true },
      { name: 'Lemongrass, galangal, kaffir lime', amount: '2 stalks lemongrass + 5 slices galangal + 4 lime leaves', prepState: 'Bruised and sliced', addedAtMinute: 0, isArchiveSpecialty: true },
      { name: 'Mushrooms', amount: '150g straw mushrooms or oyster mushrooms', prepState: 'Halved', addedAtMinute: 4, isArchiveSpecialty: false },
      { name: 'Fish sauce and lime juice', amount: '3 tbsp fish sauce + 3 tbsp fresh lime juice', prepState: 'Seasoning blend', addedAtMinute: 8, isArchiveSpecialty: true },
      { name: 'Thai roasted chili paste & chilies', amount: '1.5 tbsp nam prik pao + 4 bruised Thai bird chilies', prepState: 'Spicy chili paste', addedAtMinute: 2, isArchiveSpecialty: true }
    ],
    timelineSteps: [
      {
        stepNumber: 1,
        timeOffsetFormatted: '00:00',
        timeOffsetSeconds: 0,
        title: 'Boil Prawn Stock with Lemongrass, Galangal, and Kaffir Lime',
        actionDescription: 'Boil prawn stock with bruised lemongrass, galangal, and kaffir lime leaves for 4 minutes.',
        ingredientAdditions: [{ ingredientName: 'Lemongrass, galangal, kaffir lime', amount: 'Herbs', technique: 'Bruised & boiled' }],
        toolsUsed: ['Thai Hot Pot'],
        criticalControlPoint: 'Boil vigorously to extract fragrant essential oils.',
        sensoryCue: 'Intoxicating burst of citrusy lemongrass and peppery galangal steam.',
        soundscapeType: 'simmer',
        spokenNarration: 'Boil prawn stock with bruised lemongrass, galangal, and kaffir lime leaves.'
      },
      {
        stepNumber: 2,
        timeOffsetFormatted: '03:00',
        timeOffsetSeconds: 180,
        title: 'Stir in Thai Roasted Chili Paste and Mushrooms',
        actionDescription: 'Stir in Thai roasted chili paste (nam prik pao) and mushrooms.',
        ingredientAdditions: [
          { ingredientName: 'Thai roasted chili paste & chilies', amount: 'Chili paste', technique: 'Dissolved' },
          { ingredientName: 'Mushrooms', amount: '150g', technique: 'Added' }
        ],
        toolsUsed: ['Ladle'],
        criticalControlPoint: 'Chili paste turns broth a rich glowing reddish-orange.',
        sensoryCue: 'Smoky, sweet chili and earthy mushroom aroma.',
        soundscapeType: 'simmer',
        spokenNarration: 'Stir in roasted chili paste and mushrooms.'
      },
      {
        stepNumber: 3,
        timeOffsetFormatted: '06:00',
        timeOffsetSeconds: 360,
        title: 'Add Fresh Prawns, Simmer 2-3 Minutes Until Pink and Tender',
        actionDescription: 'Add fresh prawns, simmer 2-3 minutes just until pink and curled.',
        ingredientAdditions: [{ ingredientName: 'Shrimp or prawns', amount: '8 prawns', technique: 'Simmered gentle' }],
        toolsUsed: [],
        criticalControlPoint: 'Do not overcook prawns; cook just until opaque and succulent.',
        sensoryCue: 'Prawns turning bright coral pink in simmering broth.',
        soundscapeType: 'simmer',
        spokenNarration: 'Add fresh prawns and simmer gently until pink and tender.'
      },
      {
        stepNumber: 4,
        timeOffsetFormatted: '08:30',
        timeOffsetSeconds: 510,
        title: 'Turn Off Heat, Stir in Fish Sauce, Fresh Lime Juice, and Cilantro',
        actionDescription: 'Turn off heat, stir in fish sauce, freshly squeezed lime juice, and cilantro.',
        ingredientAdditions: [{ ingredientName: 'Fish sauce and lime juice', amount: 'Seasoning', technique: 'Off-heat stir' }],
        toolsUsed: ['Tasting Spoon'],
        criticalControlPoint: 'Always add lime juice off heat so it retains pristine bright acidity.',
        sensoryCue: 'Electrifying aroma of fresh lime, savory fish sauce, and herbs.',
        soundscapeType: 'plating',
        spokenNarration: 'Turn off heat and stir in fish sauce, fresh lime juice, and cilantro.'
      },
      {
        stepNumber: 5,
        timeOffsetFormatted: '10:00',
        timeOffsetSeconds: 600,
        title: 'Serve Steaming in Bowls with White Jasmine Rice',
        actionDescription: 'Serve steaming in bowls garnished with red chilies and cilantro leaves.',
        ingredientAdditions: [],
        toolsUsed: ['Serving Bowl'],
        criticalControlPoint: 'Serve boiling hot.',
        sensoryCue: 'Glowing red-orange broth with succulent prawns and aromatic herbs.',
        soundscapeType: 'plating',
        spokenNarration: 'Serve steaming hot with jasmine rice on the side.'
      }
    ],
    platingPresentation: 'Served in a traditional Thai hot pot with glowing orange-red broth, plump pink prawns, straw mushrooms, lemongrass stalks, and fresh cilantro leaves.',
    sommelierPairing: {
      vintage: '2021 Mosel Riesling Spätlese / Thai Singha Beer',
      terroir: 'Mosel, Germany / Bangkok, Thailand',
      tastingNote: 'Crisp residual sugar and bright acidity tame fiery bird chilies and enhance lemongrass.'
    },
    heroImageUrl: imgTomYum,
    aiImagePrompt: 'Steaming bowl of Thai tom yum goong soup: glowing reddish-orange broth with whole pink tiger prawns, straw mushrooms, sliced red chilies, lemongrass stalk, torn kaffir lime leaves, fresh cilantro garnish.',
    createdAt: new Date().toISOString()
  },

  // 49. Hainanese Chicken Rice — Singapore / Malaysia
  {
    id: 'hainanese-chicken-rice-singapore',
    recipeNumber: 49,
    primaryIngredientId: 'poached-chicken-fat-rice-chili',
    primaryIngredientName: 'Silky Poached Chicken & Aromatic Fat-Cooked Rice',
    dishTitle: 'Hainanese Chicken Rice',
    subtitle: 'Silky, tender poached chicken over fragrant chicken-fat jasmine rice, spicy chili sauce, and ginger-scallion oil',
    cuisine: 'Singaporean',
    countryRegion: 'Singapore / Malaysia',
    tags: ['Chicken Rice', 'Singaporean', 'Hainanese', 'Poached', 'Street Food'],
    overview: 'The undisputed national dish of Singapore and Malaysia. Whole chicken gently poached in master broth with ginger and scallions, shocked in an ice bath for gelatinous skin and silky meat, served over fragrant jasmine rice sautéed in rendered chicken fat and poached in broth, accompanied by fiery garlic-chili sauce, dark soy sauce, and ginger oil.',
    chefRationale: 'Ice-bathing poached chicken immediately halts cooking and congeals collagen into a delicate, melt-in-the-mouth gelatin layer under the skin.',
    difficulty: 'Intermediate',
    servings: 4,
    totalPrepTimeMinutes: 20,
    totalCookTimeMinutes: 40,
    overallDurationFormatted: '60 min',
    trendScore: 99.3,
    hotnessRank: 49,
    awardBadge: 'World Archive No. 49 • Singapore Hawker Masterpiece',
    flavorAromaProfile: {
      umami: 98,
      acidity: 65,
      aromaticIntensity: 98,
      textureComplexity: 96,
      finishLength: 96
    },
    requiredTools: [
      {
        id: 'poaching-stockpot',
        name: 'Deep Stockpot & Large Ice Bath Bowl',
        category: 'Cookware',
        material: 'Stainless Steel',
        purpose: 'Gentle sub-boil poaching and rapid ice shock for silky gelatinous skin'
      }
    ],
    ingredientsList: [
      { name: 'Whole chicken', amount: '1.5kg free-range whole chicken', prepState: 'Cleaned, with fat trimmings reserved', addedAtMinute: 0, isArchiveSpecialty: true },
      { name: 'Jasmine rice', amount: '350g Thai jasmine rice', prepState: 'Sautéed in chicken fat with garlic & ginger', addedAtMinute: 20, isArchiveSpecialty: true },
      { name: 'Ginger and scallions', amount: 'Large knob ginger + 4 scallions + pandan leaves', prepState: 'Smashed aromatics', addedAtMinute: 0, isArchiveSpecialty: true },
      { name: 'Chili sauce & ginger dip', amount: 'Fresh red chili, garlic, ginger, lime blend + ginger scallion oil', prepState: 'Artisanal condiments', addedAtMinute: 35, isArchiveSpecialty: true },
      { name: 'Dark soy sauce & cucumber', amount: 'Thick sweet dark soy sauce + sliced cucumber', prepState: 'Serving condiments', addedAtMinute: 38, isArchiveSpecialty: false }
    ],
    timelineSteps: [
      {
        stepNumber: 1,
        timeOffsetFormatted: '00:00',
        timeOffsetSeconds: 0,
        title: 'Poach Chicken in Water with Ginger, Scallions, and Pandan for 35 Min',
        actionDescription: 'Poach chicken in water with ginger, scallions, and pandan leaves at gentle simmer for 35 minutes.',
        ingredientAdditions: [
          { ingredientName: 'Whole chicken', amount: '1.5kg', technique: 'Poached' },
          { ingredientName: 'Ginger and scallions', amount: 'Aromatics', technique: 'Steeped' }
        ],
        toolsUsed: ['Deep Stockpot'],
        criticalControlPoint: 'Keep water just below simmer (180°F/82°C) to prevent meat drying out.',
        sensoryCue: 'Sweet ginger, scallion, and pandan leaf steam.',
        soundscapeType: 'simmer',
        spokenNarration: 'Poach chicken gently with ginger, scallions, and pandan leaves.'
      },
      {
        stepNumber: 2,
        timeOffsetFormatted: '35:00',
        timeOffsetSeconds: 2100,
        title: 'Plunge Chicken into Ice Bath for 10 Minutes, Rub with Sesame Oil',
        actionDescription: 'Plunge cooked chicken into an ice bath for 10 minutes, drain and rub skin with sesame oil.',
        ingredientAdditions: [],
        toolsUsed: ['Large Ice Bath Bowl'],
        criticalControlPoint: 'Ice bath shocks skin into a silky gelatinous texture.',
        sensoryCue: 'Glossy, taut chicken skin shining with toasted sesame oil.',
        soundscapeType: 'plating',
        spokenNarration: 'Plunge chicken into an ice bath, then brush with fragrant sesame oil.'
      },
      {
        stepNumber: 3,
        timeOffsetFormatted: '40:00',
        timeOffsetSeconds: 2400,
        title: 'Fry Rice in Rendered Chicken Fat with Garlic, Cook in Poaching Broth',
        actionDescription: 'Fry raw rice in rendered chicken fat with garlic and ginger, then cook in hot chicken broth.',
        ingredientAdditions: [{ ingredientName: 'Jasmine rice', amount: '350g', technique: 'Fat fried & cooked' }],
        toolsUsed: ['Rice Cooker / Pot'],
        criticalControlPoint: 'Grains absorb savory chicken essence and pandan fragrance.',
        sensoryCue: 'Rich, savory garlic and chicken fat rice aroma filling the kitchen.',
        soundscapeType: 'simmer',
        spokenNarration: 'Fry rice in rendered chicken fat with garlic, then cook in the rich poaching broth.'
      },
      {
        stepNumber: 4,
        timeOffsetFormatted: '50:00',
        timeOffsetSeconds: 3000,
        title: 'Carve Chicken into Tender Slices',
        actionDescription: 'Carve chicken into tender bone-in or boneless slices.',
        ingredientAdditions: [],
        toolsUsed: ['Chinese Cleaver', 'Chopping Block'],
        criticalControlPoint: 'Slice cleanly with sharp cleaver into even presentation pieces.',
        sensoryCue: 'Tender juicy meat with glistening gelatinous skin.',
        soundscapeType: 'chop',
        spokenNarration: 'Carve chicken into tender, uniform slices.'
      },
      {
        stepNumber: 5,
        timeOffsetFormatted: '55:00',
        timeOffsetSeconds: 3300,
        title: 'Serve Over Sliced Cucumber with Aromatic Rice and 3 Sauces',
        actionDescription: 'Serve sliced chicken over cucumber with aromatic rice, clear broth bowl, and three sauces (chili, dark soy, ginger oil).',
        ingredientAdditions: [
          { ingredientName: 'Chili sauce & ginger dip', amount: 'Sauces', technique: 'Condiment trio' },
          { ingredientName: 'Dark soy sauce & cucumber', amount: 'Garnish', technique: 'Plated' }
        ],
        toolsUsed: ['Hawker Platter'],
        criticalControlPoint: 'Serve with small bowls of fiery red chili, dark caramel soy, and ginger puree.',
        sensoryCue: 'Aromatic chicken rice steam, fiery chili, and savory sesame soy.',
        soundscapeType: 'plating',
        spokenNarration: 'Serve sliced chicken over cucumber with fragrant rice, hot broth, and the sauce trio.'
      }
    ],
    platingPresentation: 'Sliced silky chicken arranged over crisp cucumber slices, served with a dome of glossy aromatic rice, a bowl of clear chicken broth, and trio of dipping sauces.',
    sommelierPairing: {
      vintage: '2021 Dry Riesling / Fresh Calamansi Juice',
      terroir: 'Eden Valley, Australia / Singapore',
      tastingNote: 'Crisp lime zest, green apple, and bright minerality pair with ginger oil and garlic chili.'
    },
    heroImageUrl: imgChickenRice,
    aiImagePrompt: 'Platter of Singapore Hainanese chicken rice: sliced tender poached chicken with glossy skin laid over sliced cucumber, mound of glistening yellowish chicken-fat rice, small bowls of fiery red chili sauce, dark soy sauce, and ginger oil, bowl of clear broth.',
    createdAt: new Date().toISOString()
  },

  // 50. Beef Rendang — Indonesia / Malaysia
  {
    id: 'beef-rendang-indonesia',
    recipeNumber: 50,
    primaryIngredientId: 'coconut-milk-kerisik-rempah',
    primaryIngredientName: 'Toasted Coconut Kerisik & Spiced Coconut Rendang',
    dishTitle: 'Beef Rendang',
    subtitle: 'Rich, caramelized Indonesian dry beef curry slow-cooked in spiced coconut milk and toasted coconut kerisik',
    cuisine: 'Indonesian',
    countryRegion: 'Indonesia / Malaysia',
    tags: ['Curry', 'Rendang', 'Indonesian', 'Slow Cooked', 'Toasted Coconut'],
    overview: 'Voted one of the most delicious foods in the world. Beef shank slow-cooked for hours in coconut milk and a complex rempah spice paste (lemongrass, galangal, chilies, turmeric), then slowly fried in its own rendered coconut oil and toasted grated coconut (kerisik) until dark brown, intensely caramelized, and meltingly tender.',
    chefRationale: 'The three stages of Rendang (gulai -> kalio -> rendang) evaporate all water, allowing the meat to slowly fry in rich coconut oil for dark, complex caramelization and deep preservation.',
    difficulty: 'Grand Master Atelier',
    servings: 4,
    totalPrepTimeMinutes: 25,
    totalCookTimeMinutes: 65,
    overallDurationFormatted: '90 min',
    trendScore: 99.5,
    hotnessRank: 50,
    awardBadge: 'World Archive No. 50 • Minangkabau Royal Culinary Crown',
    flavorAromaProfile: {
      umami: 100,
      acidity: 40,
      aromaticIntensity: 100,
      textureComplexity: 98,
      finishLength: 100
    },
    requiredTools: [
      {
        id: 'heavy-rendang-wok',
        name: 'Heavy Wok / Dutch Oven & Kerisik Pan',
        category: 'Cookware',
        material: 'Heavy Cast Iron',
        purpose: 'Provides even low heat for reduction from wet curry to dry caramelized rendang'
      }
    ],
    ingredientsList: [
      { name: 'Beef chuck or shank', amount: '800g beef chuck/shank', prepState: 'Cut into 1.5-inch thick cubes', addedAtMinute: 0, isArchiveSpecialty: false },
      { name: 'Coconut milk', amount: '600ml rich thick coconut milk + 200ml coconut cream', prepState: 'Fresh coconut milk', addedAtMinute: 0, isArchiveSpecialty: true },
      { name: 'Rempah spice paste', amount: 'Shallots, garlic, galangal, ginger, lemongrass, chilies', prepState: 'Pounded into fine paste', addedAtMinute: 0, isArchiveSpecialty: true },
      { name: 'Toasted coconut (kerisik)', amount: '60g fresh grated coconut toasted dark golden and pounded into paste', prepState: 'Aromatic kerisik paste', addedAtMinute: 45, isArchiveSpecialty: true },
      { name: 'Turmeric leaves & kaffir lime', amount: '1 fresh turmeric leaf tied in knot + 4 kaffir lime leaves', prepState: 'Bruised fresh aromatics', addedAtMinute: 0, isArchiveSpecialty: true }
    ],
    timelineSteps: [
      {
        stepNumber: 1,
        timeOffsetFormatted: '00:00',
        timeOffsetSeconds: 0,
        title: 'Combine Beef, Coconut Milk, Rempah Paste, and Aromatics in Wok',
        actionDescription: 'Combine beef cubes, rich coconut milk, blended rempah spice paste, and turmeric leaves in a heavy wok.',
        ingredientAdditions: [
          { ingredientName: 'Beef chuck or shank', amount: '800g', technique: 'Combined' },
          { ingredientName: 'Coconut milk', amount: '800ml', technique: 'Poured in' },
          { ingredientName: 'Rempah spice paste', amount: 'Spice paste', technique: 'Stirred' },
          { ingredientName: 'Turmeric leaves & kaffir lime', amount: 'Leaves', technique: 'Infused' }
        ],
        toolsUsed: ['Heavy Wok'],
        criticalControlPoint: 'Bring to boil while stirring occasionally to prevent coconut milk splitting.',
        sensoryCue: 'Intense aroma of galangal, lemongrass, coconut cream, and spices.',
        soundscapeType: 'simmer',
        spokenNarration: 'Combine beef cubes, rich coconut milk, rempah spice paste, and aromatics in a heavy wok.'
      },
      {
        stepNumber: 2,
        timeOffsetFormatted: '15:00',
        timeOffsetSeconds: 900,
        title: 'Simmer Rapidly to Reduce Liquid (Gulai Stage)',
        actionDescription: 'Simmer rapidly to reduce liquid into a thick yellow curry sauce (gulai stage).',
        ingredientAdditions: [],
        toolsUsed: ['Wooden Spatula'],
        criticalControlPoint: 'Stir bottom periodically to prevent sticking as sauce thickens.',
        sensoryCue: 'Rich yellow curry bubbling vigorously.',
        soundscapeType: 'simmer',
        spokenNarration: 'Simmer rapidly to reduce liquid into a rich curry sauce.'
      },
      {
        stepNumber: 3,
        timeOffsetFormatted: '35:00',
        timeOffsetSeconds: 2100,
        title: 'Cook Down Further as Sauce Turns Brown and Oily (Kalio Stage)',
        actionDescription: 'Cook down further as coconut oil separates and sauce turns deep brown (kalio stage).',
        ingredientAdditions: [],
        toolsUsed: ['Wooden Spatula'],
        criticalControlPoint: 'Lower heat as oil separates to avoid scorching meat.',
        sensoryCue: 'Sauce darkens to caramel brown; rich coconut oil glistens.',
        soundscapeType: 'sizzle',
        spokenNarration: 'Cook down until coconut oil separates and the sauce turns deep brown.'
      },
      {
        stepNumber: 4,
        timeOffsetFormatted: '45:00',
        timeOffsetSeconds: 2700,
        title: 'Stir in Toasted Coconut Kerisik Paste',
        actionDescription: 'Stir in dark toasted coconut kerisik paste and tamarind slice.',
        ingredientAdditions: [{ ingredientName: 'Toasted coconut (kerisik)', amount: '60g paste', technique: 'Stirred in' }],
        toolsUsed: ['Wooden Spatula'],
        criticalControlPoint: 'Kerisik provides deep nutty aroma, dark color, and velvety coating.',
        sensoryCue: 'Nutty toasted coconut aroma infusing the dark sauce.',
        soundscapeType: 'whisk',
        spokenNarration: 'Stir in dark toasted coconut kerisik paste.'
      },
      {
        stepNumber: 5,
        timeOffsetFormatted: '55:00',
        timeOffsetSeconds: 3300,
        title: 'Slowly Fry Beef in Rendered Coconut Oil on Low Heat (Rendang Stage)',
        actionDescription: 'Slowly fry beef in rendered coconut oil on low heat, stirring constantly until dark and dry.',
        ingredientAdditions: [],
        toolsUsed: ['Wooden Spatula'],
        criticalControlPoint: 'Stir continuously on low heat until sauce is nearly dry and clings as a dark caramelized crust to meat.',
        sensoryCue: 'Deep mahogany caramelized crust coating meltingly tender beef.',
        soundscapeType: 'sizzle',
        spokenNarration: 'Slowly fry the beef in its rendered coconut oil until dark, dry, and richly caramelized.'
      },
      {
        stepNumber: 6,
        timeOffsetFormatted: '75:00',
        timeOffsetSeconds: 4500,
        title: 'Rest and Serve with Steamed Jasmine Rice and Sambal',
        actionDescription: 'Rest and serve with steamed jasmine rice, cucumber slices, and sambal.',
        ingredientAdditions: [],
        toolsUsed: ['Platter'],
        criticalControlPoint: 'Rendang tastes even richer the next day as spices deepen.',
        sensoryCue: 'Unbelievably rich, dark caramelized beef tender to the fork.',
        soundscapeType: 'plating',
        spokenNarration: 'Rest and serve with steamed jasmine rice and fresh cucumber slices.'
      }
    ],
    platingPresentation: 'Served on a banana leaf on a dark wooden platter: dark mahogany caramelized beef chunks glistening with toasted spices, alongside white steamed rice and red chili sambal.',
    sommelierPairing: {
      vintage: '2018 Australian Shiraz / Indonesian Bintang Beer',
      terroir: 'Barossa Valley / Bali',
      tastingNote: 'Rich dark blackberry, black pepper, and toasted vanilla oak complement the caramelized coconut rendang.'
    },
    heroImageUrl: imgBeefRendang,
    aiImagePrompt: 'Dark caramelized Indonesian beef rendang on a banana leaf platter: fall-apart tender beef chunks coated in rich dark-brown toasted coconut and spice paste, sliced red chilies on top, mound of white rice beside it.',
    createdAt: new Date().toISOString()
  }
];
