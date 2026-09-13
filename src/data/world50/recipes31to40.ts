import { CulinaryMasterclass } from '../../types';

import imgFeijoada from '../../assets/images/brazilian_feijoada_1788217360773.jpg';
import imgEmpanadas from '../../assets/images/argentina_empanadas_1788217375987.jpg';
import imgMoussaka from '../../assets/images/greek_moussaka_1788217390682.jpg';
import imgSouvlaki from '../../assets/images/greek_souvlaki_1788217474174.jpg';
import imgHummus from '../../assets/images/middleeast_hummus_1788217487727.jpg';
import imgFalafel from '../../assets/images/middleeast_falafel_1788301960182.jpg';
import imgShakshuka from '../../assets/images/shakshuka_skillet_1788301972424.jpg';
import imgTagine from '../../assets/images/moroccan_tagine_1788301983717.jpg';
import imgJollof from '../../assets/images/jollof_rice_1788217450198.jpg';
import imgBobotie from '../../assets/images/southafrican_bobotie_1788301996711.jpg';

export const RECIPES_31_TO_40: CulinaryMasterclass[] = [
  // 31. Feijoada — Brazil
  {
    id: 'feijoada-brazil',
    recipeNumber: 31,
    primaryIngredientId: 'black-beans-cured-pork',
    primaryIngredientName: 'Slow-Cooked Black Beans & Cured Pork Sausage',
    dishTitle: 'Feijoada',
    subtitle: 'Rich Brazilian black bean and cured pork stew served with toasted farofa, collard greens, and orange slices',
    cuisine: 'Brazilian',
    countryRegion: 'Brazil',
    tags: ['Stew', 'Feijoada', 'Brazilian', 'Black Beans', 'Farofa'],
    overview: 'The celebratory national dish of Brazil. A dark, deeply flavorful stew of black beans slow-simmered with smoked pork sausage, ribs, carne seca, and bacon, served with toasted cassava flour (farofa), garlicky collard greens, and fresh orange slices.',
    chefRationale: 'Slow simmering allows black bean starches to break down and meld with rendered smoked pork gelatin into a thick, glossy gravy.',
    difficulty: 'Intermediate',
    servings: 6,
    totalPrepTimeMinutes: 20,
    totalCookTimeMinutes: 60,
    overallDurationFormatted: '80 min',
    trendScore: 98.7,
    hotnessRank: 31,
    awardBadge: 'World Archive No. 31 • Brazilian National Feast',
    flavorAromaProfile: {
      umami: 98,
      acidity: 45,
      aromaticIntensity: 95,
      textureComplexity: 92,
      finishLength: 96
    },
    requiredTools: [
      {
        id: 'clay-pot-feijoada',
        name: 'Heavy Ceramic Earthenware Pot',
        category: 'Cookware',
        material: 'Glazed Clay',
        purpose: 'Provides long, slow, even heat retention for black bean stew'
      }
    ],
    ingredientsList: [
      { name: 'Black beans', amount: '400g dried black beans (feijão preto)', prepState: 'Soaked overnight', addedAtMinute: 0, isArchiveSpecialty: true },
      { name: 'Pork cuts', amount: '350g smoked pork ribs, bacon & carne seca', prepState: 'Cut into bite-sized pieces', addedAtMinute: 0, isArchiveSpecialty: false },
      { name: 'Sausage', amount: '200g smoked Calabresa / Paio sausage', prepState: 'Sliced thick', addedAtMinute: 15, isArchiveSpecialty: true },
      { name: 'Garlic and onion', amount: '1 large onion + 5 cloves garlic', prepState: 'Finely minced and sautéed', addedAtMinute: 25, isArchiveSpecialty: false },
      { name: 'Farofa (toasted cassava flour)', amount: '100g toasted farofa with butter', prepState: 'Toasted golden', addedAtMinute: 50, isArchiveSpecialty: true },
      { name: 'Orange slices and collard greens', amount: 'Fresh oranges and sliced couve', prepState: 'Fresh garnishes', addedAtMinute: 55, isArchiveSpecialty: false }
    ],
    timelineSteps: [
      {
        stepNumber: 1,
        timeOffsetFormatted: '00:00',
        timeOffsetSeconds: 0,
        title: 'Simmer Black Beans and Smoked Meats in a Large Pot',
        actionDescription: 'Simmer black beans and smoked meats in a large pot for several hours.',
        ingredientAdditions: [
          { ingredientName: 'Black beans', amount: '400g', technique: 'Simmered' },
          { ingredientName: 'Pork cuts', amount: '350g', technique: 'Simmered with beans' }
        ],
        toolsUsed: ['Heavy Ceramic Earthenware Pot'],
        criticalControlPoint: 'Keep water level 2 inches above beans; simmer gently.',
        sensoryCue: 'Deep, earthy black bean and smoky pork aroma.',
        soundscapeType: 'simmer',
        spokenNarration: 'Simmer black beans and smoked meats in a large pot for several hours.'
      },
      {
        stepNumber: 2,
        timeOffsetFormatted: '15:00',
        timeOffsetSeconds: 900,
        title: 'Add Sliced Calabresa Sausages',
        actionDescription: 'Add sliced Calabresa sausages.',
        ingredientAdditions: [{ ingredientName: 'Sausage', amount: '200g', technique: 'Added to pot' }],
        toolsUsed: [],
        criticalControlPoint: 'Sausage fat slowly infuses into the bean broth.',
        sensoryCue: 'Smoky spiced sausage aroma mingling with beans.',
        soundscapeType: 'simmer',
        spokenNarration: 'Add sliced Calabresa sausages to the simmering pot.'
      },
      {
        stepNumber: 3,
        timeOffsetFormatted: '25:00',
        timeOffsetSeconds: 1500,
        title: 'Saute Garlic and Onion in Oil, Add to Beans for Flavor',
        actionDescription: 'Saute garlic and onion in oil, add to beans for flavor (refogado).',
        ingredientAdditions: [{ ingredientName: 'Garlic and onion', amount: 'Minced', technique: 'Fried & stirred in' }],
        toolsUsed: ['Skillet'],
        criticalControlPoint: 'Mash a ladleful of beans with garlic before pouring back into pot to thicken.',
        sensoryCue: 'Golden browned garlic and onion sizzle.',
        soundscapeType: 'sizzle',
        spokenNarration: 'Saute garlic and onion, then stir into the beans to build flavor and body.'
      },
      {
        stepNumber: 4,
        timeOffsetFormatted: '35:00',
        timeOffsetSeconds: 2100,
        title: 'Simmer Until Stew is Thick and Meats are Very Tender',
        actionDescription: 'Simmer until stew is thick and meats are very tender.',
        ingredientAdditions: [],
        toolsUsed: ['Wooden Spoon'],
        criticalControlPoint: 'Stew should form a velvety, dark black gravy.',
        sensoryCue: 'Thick, glossy black stew bubbling slowly.',
        soundscapeType: 'simmer',
        spokenNarration: 'Simmer until the stew is thick and the meats are fork-tender.'
      },
      {
        stepNumber: 5,
        timeOffsetFormatted: '50:00',
        timeOffsetSeconds: 3000,
        title: 'Serve with White Rice, Collard Greens, Farofa & Orange Slices',
        actionDescription: 'Serve with white rice, sauteed collard greens, farofa, and orange slices.',
        ingredientAdditions: [
          { ingredientName: 'Farofa (toasted cassava flour)', amount: '100g', technique: 'Side dish' },
          { ingredientName: 'Orange slices and collard greens', amount: 'Fresh', technique: 'Side plate' }
        ],
        toolsUsed: ['Clay Serving Bowls'],
        criticalControlPoint: 'Orange slices provide fresh citric acid to cut through rich pork fat.',
        sensoryCue: 'Toasted cassava flour crunch, garlicky greens, and citrus brightness.',
        soundscapeType: 'plating',
        spokenNarration: 'Serve with white rice, collard greens, farofa, and orange slices.'
      }
    ],
    platingPresentation: 'Served in an authentic dark clay pot with side bowls of white rice, golden farofa, sauteed greens, and orange wedges.',
    sommelierPairing: {
      vintage: 'Traditional Brazilian Caipirinha (Cachaça & Lime)',
      terroir: 'Rio de Janeiro, Brazil',
      tastingNote: 'Bright lime acidity and sugarcane spirit cut through the heavy black bean stew.'
    },
    heroImageUrl: imgFeijoada,
    aiImagePrompt: 'Rich dark Brazilian feijoada stew in a clay pot: black beans, chunks of smoked sausage and pork, served alongside white rice, sauteed collard greens, toasted farofa, and orange slices.',
    createdAt: new Date().toISOString()
  },

  // 32. Empanadas — Argentina
  {
    id: 'empanadas-argentina',
    recipeNumber: 32,
    primaryIngredientId: 'flaky-dough-beef-cumin',
    primaryIngredientName: 'Flaky Repulgue Dough & Hand-Cut Beef Picadillo',
    dishTitle: 'Empanadas',
    subtitle: 'Golden, blistered Argentine baked empanadas stuffed with spiced beef, green olives, boiled eggs, and cumin',
    cuisine: 'Argentine',
    countryRegion: 'Argentina',
    tags: ['Empanadas', 'Argentine', 'Hand-Held', 'Baked', 'Pastry'],
    overview: 'The beloved pride of Argentina (Empanadas Mendocinas). Golden baked pastry crescents with decorative braided rope edges (repulgue), stuffed with a juicy spiced filling of hand-cut beef, sweet onions, green olives, hard-boiled eggs, and cumin.',
    chefRationale: 'Adding equal parts sliced onions to beef provides natural sweetness and abundant pan juices that stay trapped inside the sealed dough.',
    difficulty: 'Intermediate',
    servings: 4,
    totalPrepTimeMinutes: 25,
    totalCookTimeMinutes: 20,
    overallDurationFormatted: '45 min',
    trendScore: 98.6,
    hotnessRank: 32,
    awardBadge: 'World Archive No. 32 • Argentine Gaucho Heritage',
    flavorAromaProfile: {
      umami: 95,
      acidity: 40,
      aromaticIntensity: 96,
      textureComplexity: 94,
      finishLength: 92
    },
    requiredTools: [
      {
        id: 'empanada-tray',
        name: 'Heavy Perforated Baking Sheet',
        category: 'Cookware',
        material: 'Heavy Aluminum',
        purpose: 'Provides direct high bottom heat for golden blistered crust'
      }
    ],
    ingredientsList: [
      { name: 'Empanada dough discs', amount: '12 store-bought or homemade tapas', prepState: 'Round dough discs', addedAtMinute: 0, isArchiveSpecialty: false },
      { name: 'Ground or chopped beef', amount: '350g sirloin beef', prepState: 'Hand-diced finely', addedAtMinute: 0, isArchiveSpecialty: false },
      { name: 'Onions', amount: '2 large white onions', prepState: 'Finely chopped and softened', addedAtMinute: 0, isArchiveSpecialty: false },
      { name: 'Cumin and paprika', amount: '1.5 tsp cumin + 1 tbsp smoked paprika', prepState: 'Ground spices', addedAtMinute: 5, isArchiveSpecialty: true },
      { name: 'Green olives and hard-boiled eggs', amount: '1/2 cup pitted green olives + 2 boiled eggs', prepState: 'Chopped for filling', addedAtMinute: 10, isArchiveSpecialty: true }
    ],
    timelineSteps: [
      {
        stepNumber: 1,
        timeOffsetFormatted: '00:00',
        timeOffsetSeconds: 0,
        title: 'Cook Onions and Beef with Cumin and Paprika, Let Cool',
        actionDescription: 'Cook onions and beef with cumin and paprika, let cool completely.',
        ingredientAdditions: [
          { ingredientName: 'Onions', amount: '2 onions', technique: 'Sautéed' },
          { ingredientName: 'Ground or chopped beef', amount: '350g', technique: 'Cooked juicy' },
          { ingredientName: 'Cumin and paprika', amount: 'Spices', technique: 'Bloomed' }
        ],
        toolsUsed: ['Skillet'],
        criticalControlPoint: 'Filling must be fully chilled before assembling to avoid melting dough fat.',
        sensoryCue: 'Aromatic toasted cumin, sweet paprika, and savory beef aroma.',
        soundscapeType: 'sizzle',
        spokenNarration: 'Cook onions and beef with cumin and paprika, then let cool completely.'
      },
      {
        stepNumber: 2,
        timeOffsetFormatted: '10:00',
        timeOffsetSeconds: 600,
        title: 'Fold in Chopped Olives and Hard-Boiled Eggs',
        actionDescription: 'Fold in chopped green olives and hard-boiled eggs.',
        ingredientAdditions: [{ ingredientName: 'Green olives and hard-boiled eggs', amount: 'Chopped', technique: 'Folded in' }],
        toolsUsed: ['Mixing Bowl'],
        criticalControlPoint: 'Keep pieces distinct for textural contrast inside the filling.',
        sensoryCue: 'Savory brine from green olives and rich egg yolk.',
        soundscapeType: 'chop',
        spokenNarration: 'Fold in chopped green olives and hard-boiled eggs.'
      },
      {
        stepNumber: 3,
        timeOffsetFormatted: '14:00',
        timeOffsetSeconds: 840,
        title: 'Place a Spoonful of Filling on Each Dough Disc',
        actionDescription: 'Place a spoonful of filling on each dough disc.',
        ingredientAdditions: [{ ingredientName: 'Empanada dough discs', amount: '12 discs', technique: 'Filled' }],
        toolsUsed: ['Spoon'],
        criticalControlPoint: 'Moisten edges with a drop of water for a leakproof seal.',
        sensoryCue: 'Plump savory mounds on smooth dough discs.',
        soundscapeType: 'plating',
        spokenNarration: 'Place a spoonful of filling on each dough disc.'
      },
      {
        stepNumber: 4,
        timeOffsetFormatted: '18:00',
        timeOffsetSeconds: 1080,
        title: 'Fold in Half and Crimp Edges with a Fork or Repulgue',
        actionDescription: 'Fold in half and crimp edges with a fork or traditional repulgue twist.',
        ingredientAdditions: [],
        toolsUsed: ['Hands'],
        criticalControlPoint: 'Pleat tight braided folds along the curved seam to lock in juices.',
        sensoryCue: 'Beautiful braided rope edges on golden pastry crescents.',
        soundscapeType: 'plating',
        spokenNarration: 'Fold in half and crimp edges with a decorative repulgue braid.'
      },
      {
        stepNumber: 5,
        timeOffsetFormatted: '22:00',
        timeOffsetSeconds: 1320,
        title: 'Bake at 400F (200C) Until Golden and Blistered (15-20 Min)',
        actionDescription: 'Bake at 400F (200C) until golden and blistered (15-20 min).',
        ingredientAdditions: [],
        toolsUsed: ['Heavy Perforated Baking Sheet'],
        criticalControlPoint: 'Brush with egg wash for a glossy golden sheen.',
        sensoryCue: 'Flaky baked pastry and warm spiced beef aroma.',
        soundscapeType: 'sizzle',
        spokenNarration: 'Bake at 400 degrees until golden, blistered, and crisp.'
      },
      {
        stepNumber: 6,
        timeOffsetFormatted: '40:00',
        timeOffsetSeconds: 2400,
        title: 'Serve Warm with Chimichurri',
        actionDescription: 'Serve warm with chimichurri.',
        ingredientAdditions: [],
        toolsUsed: ['Wooden Board'],
        criticalControlPoint: 'Rest 5 minutes so juices reabsorb before biting.',
        sensoryCue: 'Crispy crackling pastry releasing aromatic steam.',
        soundscapeType: 'plating',
        spokenNarration: 'Serve warm with fresh herbal chimichurri.'
      }
    ],
    platingPresentation: 'Stacked on a rustic wooden board with blistered golden crusts, one cut in half showing juicy meat, olives, and egg.',
    sommelierPairing: {
      vintage: '2020 Malbec',
      terroir: 'Mendoza, Argentina',
      tastingNote: 'Plum, blackberry, and subtle spice harmonize with the cumin-spiced beef.'
    },
    heroImageUrl: imgEmpanadas,
    aiImagePrompt: 'Golden baked Argentine empanadas stacked on a wooden board: blistered pastry crust with decorative crimped edges (repulgue), one cut open showing juicy spiced ground beef, green olives, and egg, small bowl of chimichurri.',
    createdAt: new Date().toISOString()
  },

  // 33. Moussaka — Greece
  {
    id: 'moussaka-greece',
    recipeNumber: 33,
    primaryIngredientId: 'eggplant-lamb-bechamel',
    primaryIngredientName: 'Roasted Eggplant & Fluffy Golden Béchamel',
    dishTitle: 'Moussaka',
    subtitle: 'Layered Greek casserole with roasted eggplant, cinnamon-spiced lamb ragù, and thick golden béchamel',
    cuisine: 'Greek',
    countryRegion: 'Greece',
    tags: ['Casserole', 'Moussaka', 'Greek', 'Eggplant', 'Béchamel'],
    overview: 'The grand layered masterpiece of Greek dining. Sliced roasted eggplant and potatoes layered with a savory ground lamb sauce infused with cinnamon and allspice, crowned with a thick layer of creamy béchamel baked to golden perfection.',
    chefRationale: 'Roasting rather than frying eggplant avoids excess oiliness while browning the surface to hold the spiced meat ragù cleanly.',
    difficulty: 'Intermediate',
    servings: 6,
    totalPrepTimeMinutes: 30,
    totalCookTimeMinutes: 45,
    overallDurationFormatted: '75 min',
    trendScore: 98.8,
    hotnessRank: 33,
    awardBadge: 'World Archive No. 33 • Hellenic Grand Casserole',
    flavorAromaProfile: {
      umami: 96,
      acidity: 45,
      aromaticIntensity: 96,
      textureComplexity: 94,
      finishLength: 95
    },
    requiredTools: [
      {
        id: 'ceramic-baking-dish',
        name: 'Deep Ceramic Casserole Baking Dish',
        category: 'Cookware',
        material: 'Ceramic Stoneware',
        purpose: 'Bakes even layers and supports tall béchamel souffle crown'
      }
    ],
    ingredientsList: [
      { name: 'Eggplants', amount: '2 large eggplants', prepState: 'Sliced 1/2-inch thick and roasted', addedAtMinute: 0, isArchiveSpecialty: true },
      { name: 'Ground lamb or beef', amount: '450g ground lamb/beef', prepState: 'Cooked with tomatoes, red wine, cinnamon', addedAtMinute: 10, isArchiveSpecialty: false },
      { name: 'Béchamel sauce', amount: '400ml rich béchamel with egg yolks & nutmeg', prepState: 'Thick velvety sauce', addedAtMinute: 22, isArchiveSpecialty: true },
      { name: 'Cinnamon and allspice', amount: '1 tsp cinnamon + 1/2 tsp allspice', prepState: 'Ground spices', addedAtMinute: 10, isArchiveSpecialty: true },
      { name: 'Parmesan or Kefalotyri cheese', amount: '60g grated Greek cheese', prepState: 'Finely grated for golden crust', addedAtMinute: 25, isArchiveSpecialty: true }
    ],
    timelineSteps: [
      {
        stepNumber: 1,
        timeOffsetFormatted: '00:00',
        timeOffsetSeconds: 0,
        title: 'Slice and Roast Eggplants Until Tender and Lightly Browned',
        actionDescription: 'Slice and roast eggplants until tender and lightly browned.',
        ingredientAdditions: [{ ingredientName: 'Eggplants', amount: '2 sliced', technique: 'Oven-roasted' }],
        toolsUsed: ['Baking Sheets'],
        criticalControlPoint: 'Roast at 400°F with olive oil until golden and collapsed.',
        sensoryCue: 'Sweet, caramelized roasted eggplant aroma.',
        soundscapeType: 'sizzle',
        spokenNarration: 'Slice and roast eggplants until tender and lightly browned.'
      },
      {
        stepNumber: 2,
        timeOffsetFormatted: '10:00',
        timeOffsetSeconds: 600,
        title: 'Cook Spiced Meat Sauce with Tomato, Cinnamon, and Herbs',
        actionDescription: 'Cook spiced meat sauce with tomato, cinnamon, and herbs.',
        ingredientAdditions: [
          { ingredientName: 'Ground lamb or beef', amount: '450g', technique: 'Browned' },
          { ingredientName: 'Cinnamon and allspice', amount: 'Spices', technique: 'Simmered' }
        ],
        toolsUsed: ['Skillet'],
        criticalControlPoint: 'Simmer until thick so no excess liquid runs into layers.',
        sensoryCue: 'Rich aroma of sweet cinnamon, cloves, and savory lamb.',
        soundscapeType: 'simmer',
        spokenNarration: 'Cook spiced meat sauce with tomato, cinnamon, and herbs.'
      },
      {
        stepNumber: 3,
        timeOffsetFormatted: '18:00',
        timeOffsetSeconds: 1080,
        title: 'Make a Thick Bechemel Sauce with Butter, Flour, Milk, Nutmeg',
        actionDescription: 'Make a thick bechamel sauce with butter, flour, milk, and nutmeg.',
        ingredientAdditions: [{ ingredientName: 'Béchamel sauce', amount: '400ml', technique: 'Whisked with yolks' }],
        toolsUsed: ['Saucepan', 'Whisk'],
        criticalControlPoint: 'Whisk in egg yolks off heat for a fluffy, sliceable custard layer.',
        sensoryCue: 'Toasted butter, creamy milk, and warm nutmeg fragrance.',
        soundscapeType: 'whisk',
        spokenNarration: 'Make a thick bechamel sauce with butter, flour, milk, and nutmeg.'
      },
      {
        stepNumber: 4,
        timeOffsetFormatted: '22:00',
        timeOffsetSeconds: 1320,
        title: 'Layer Roasted Eggplant in Baking Dish, Top with Meat Sauce',
        actionDescription: 'Layer roasted eggplant in a baking dish, top with meat sauce.',
        ingredientAdditions: [],
        toolsUsed: ['Deep Ceramic Casserole Baking Dish'],
        criticalControlPoint: 'Form alternating even layers of eggplant and spiced meat.',
        sensoryCue: 'Beautiful layered strata building in the baking dish.',
        soundscapeType: 'plating',
        spokenNarration: 'Layer roasted eggplant in the baking dish and top with spiced meat sauce.'
      },
      {
        stepNumber: 5,
        timeOffsetFormatted: '25:00',
        timeOffsetSeconds: 1500,
        title: 'Spread Bechemel Over Top, Sprinkle with Cheese',
        actionDescription: 'Spread bechamel over the top, sprinkle with cheese.',
        ingredientAdditions: [{ ingredientName: 'Parmesan or Kefalotyri cheese', amount: '60g', technique: 'Grated top' }],
        toolsUsed: ['Spatula'],
        criticalControlPoint: 'Smooth béchamel from edge to edge into an unbroken seal.',
        sensoryCue: 'Velvety cream layer topped with salty cheese.',
        soundscapeType: 'plating',
        spokenNarration: 'Spread bechamel evenly over the top and sprinkle with cheese.'
      },
      {
        stepNumber: 6,
        timeOffsetFormatted: '28:00',
        timeOffsetSeconds: 1680,
        title: 'Bake at 375F (190C) for 40-45 Min Until Golden Brown Top',
        actionDescription: 'Bake at 375F (190C) for 40-45 min until top is deeply browned.',
        ingredientAdditions: [],
        toolsUsed: ['Oven'],
        criticalControlPoint: 'Bake until béchamel is puffed and spotted with golden brown blisters.',
        sensoryCue: 'Irresistible aroma of bubbling cheese and spiced ragù.',
        soundscapeType: 'sizzle',
        spokenNarration: 'Bake at 375 degrees until the top is puffed and golden brown.'
      },
      {
        stepNumber: 7,
        timeOffsetFormatted: '70:00',
        timeOffsetSeconds: 4200,
        title: 'Rest 20 Minutes Before Slicing',
        actionDescription: 'Rest 20 minutes before slicing into neat squares.',
        ingredientAdditions: [],
        toolsUsed: ['Chef Knife'],
        criticalControlPoint: 'Resting allows layers to set firmly for clean square cuts.',
        sensoryCue: 'Clean distinct layers of eggplant, meat, and golden béchamel.',
        soundscapeType: 'chop',
        spokenNarration: 'Rest for twenty minutes before slicing into neat squares.'
      }
    ],
    platingPresentation: 'A tall square slice showing clear distinct strata: roasted eggplant base, dark spiced lamb, and golden puffed béchamel cap.',
    sommelierPairing: {
      vintage: '2019 Xinomavro / Agiorgitiko',
      terroir: 'Nemea / Naoussa, Greece',
      tastingNote: 'Sun-dried tomato, dark cherry, and firm tannins cut through rich béchamel and spiced lamb.'
    },
    heroImageUrl: imgMoussaka,
    aiImagePrompt: 'Square cut of baked Greek moussaka on a plate: visible layers of roasted eggplant, rich spiced ground lamb sauce, and a thick golden-brown blistered bechamel topping, fresh oregano garnish.',
    createdAt: new Date().toISOString()
  },

  // 34. Souvlaki — Greece
  {
    id: 'souvlaki-greece',
    recipeNumber: 34,
    primaryIngredientId: 'charred-pork-tzatziki-pita',
    primaryIngredientName: 'Oregano-Marinated Skewers & Garlicky Tzatziki',
    dishTitle: 'Souvlaki',
    subtitle: 'Flame-grilled oregano-marinated chicken or pork skewers wrapped in warm fluffy pita with tzatziki, tomatoes, and red onion',
    cuisine: 'Greek',
    countryRegion: 'Greece',
    tags: ['Skewers', 'Souvlaki', 'Greek', 'Pita', 'Street Food'],
    overview: 'The quintessential street food of Athens. Skewered chunks of tender pork or chicken marinated in lemon, Greek oregano, garlic, and olive oil, charred over hot coals and wrapped inside fluffy grilled pita bread with garlic-cucumber tzatziki sauce, sliced tomatoes, red onions, and french fries.',
    chefRationale: 'High-heat open grilling develops smoky charred crust while keeping the interior succulent and tender.',
    difficulty: 'Easy',
    servings: 2,
    totalPrepTimeMinutes: 15,
    totalCookTimeMinutes: 10,
    overallDurationFormatted: '25 min',
    trendScore: 98.7,
    hotnessRank: 34,
    awardBadge: 'World Archive No. 34 • Athenian Grill House',
    flavorAromaProfile: {
      umami: 94,
      acidity: 75,
      aromaticIntensity: 96,
      textureComplexity: 92,
      finishLength: 92
    },
    requiredTools: [
      {
        id: 'cast-iron-grill',
        name: 'Cast Iron Grill Pan / Char Skewers',
        category: 'Cookware',
        material: 'Cast Iron & Bamboo Skewers',
        purpose: 'Imparts intense sear marks and smoky street grill aroma'
      }
    ],
    ingredientsList: [
      { name: 'Pork or chicken', amount: '400g pork shoulder or chicken breast', prepState: 'Cut into 1-inch cubes', addedAtMinute: 0, isArchiveSpecialty: false },
      { name: 'Tzatziki sauce', amount: '150g Greek yogurt, cucumber, garlic, dill', prepState: 'Chilled garlic sauce', addedAtMinute: 12, isArchiveSpecialty: true },
      { name: 'Pita bread', amount: '4 thick fluffy Greek pitas', prepState: 'Warmed and lightly charred', addedAtMinute: 10, isArchiveSpecialty: true },
      { name: 'Greek oregano and lemon', amount: '2 tbsp wild oregano + juice of 1 lemon + olive oil', prepState: 'Marinade', addedAtMinute: 0, isArchiveSpecialty: true },
      { name: 'Tomato and red onion', amount: '1 ripe tomato + 1/2 red onion', prepState: 'Sliced thin', addedAtMinute: 12, isArchiveSpecialty: false }
    ],
    timelineSteps: [
      {
        stepNumber: 1,
        timeOffsetFormatted: '00:00',
        timeOffsetSeconds: 0,
        title: 'Marinate Meat Cubes in Lemon, Olive Oil, Garlic, and Oregano',
        actionDescription: 'Marinate meat cubes in lemon, olive oil, garlic, and oregano for 30 min.',
        ingredientAdditions: [
          { ingredientName: 'Pork or chicken', amount: '400g', technique: 'Cubed' },
          { ingredientName: 'Greek oregano and lemon', amount: 'Marinade', technique: 'Massaged' }
        ],
        toolsUsed: ['Bowl'],
        criticalControlPoint: 'Allow lemon and wild oregano to permeate the meat.',
        sensoryCue: 'Pungent Greek oregano, fresh garlic, and zesty lemon aroma.',
        soundscapeType: 'chop',
        spokenNarration: 'Marinate meat cubes in lemon, olive oil, garlic, and oregano.'
      },
      {
        stepNumber: 2,
        timeOffsetFormatted: '05:00',
        timeOffsetSeconds: 300,
        title: 'Thread Meat Tightly onto Skewers',
        actionDescription: 'Thread meat tightly onto wooden or metal skewers.',
        ingredientAdditions: [],
        toolsUsed: ['Bamboo Skewers'],
        criticalControlPoint: 'Pack pieces close together to retain juices during searing.',
        sensoryCue: 'Uniform skewered meat ready for grilling.',
        soundscapeType: 'plating',
        spokenNarration: 'Thread meat tightly onto skewers.'
      },
      {
        stepNumber: 3,
        timeOffsetFormatted: '08:00',
        timeOffsetSeconds: 480,
        title: 'Grill on High Heat Until Charred and Cooked Through (8-10 Min)',
        actionDescription: 'Grill on high heat until charred and cooked through (8-10 min).',
        ingredientAdditions: [],
        toolsUsed: ['Cast Iron Grill Pan'],
        criticalControlPoint: 'Turn frequently to achieve dark charred grill marks without overcooking.',
        sensoryCue: 'Sizzling charred meat smoke and sizzling fat.',
        soundscapeType: 'flame',
        spokenNarration: 'Grill on high heat until charred and cooked through.'
      },
      {
        stepNumber: 4,
        timeOffsetFormatted: '12:00',
        timeOffsetSeconds: 720,
        title: 'Warm Pita Breads on the Grill with Olive Oil',
        actionDescription: 'Warm pita breads on the grill with a brush of olive oil.',
        ingredientAdditions: [{ ingredientName: 'Pita bread', amount: '4 pitas', technique: 'Grilled warm' }],
        toolsUsed: ['Grill Pan'],
        criticalControlPoint: 'Grill until soft, pliable, and lightly toasted.',
        sensoryCue: 'Warm toasted wheat aroma.',
        soundscapeType: 'sizzle',
        spokenNarration: 'Warm pita breads on the grill with a touch of olive oil.'
      },
      {
        stepNumber: 5,
        timeOffsetFormatted: '15:00',
        timeOffsetSeconds: 900,
        title: 'Spread Tzatziki on Pita, Add Grilled Meat, Tomato, and Onion',
        actionDescription: 'Spread tzatziki on warm pita, add grilled meat from skewers, tomato, and onion.',
        ingredientAdditions: [
          { ingredientName: 'Tzatziki sauce', amount: '150g', technique: 'Spread' },
          { ingredientName: 'Tomato and red onion', amount: 'Sliced', technique: 'Layered' }
        ],
        toolsUsed: ['Tongs'],
        criticalControlPoint: 'Slide meat off skewer directly into the pita wrap.',
        sensoryCue: 'Cool garlic tzatziki meeting hot charred meat and fresh tomatoes.',
        soundscapeType: 'plating',
        spokenNarration: 'Spread tzatziki on warm pita and add grilled meat, tomato, and red onion.'
      },
      {
        stepNumber: 6,
        timeOffsetFormatted: '18:00',
        timeOffsetSeconds: 1080,
        title: 'Wrap in Parchment and Serve Hot with Lemon Wedges',
        actionDescription: 'Wrap in parchment paper and serve hot with lemon wedges.',
        ingredientAdditions: [],
        toolsUsed: ['Parchment Wrap'],
        criticalControlPoint: 'Wrap tightly at base for easy hand-held eating.',
        sensoryCue: 'Piping hot street wrap ready to enjoy.',
        soundscapeType: 'plating',
        spokenNarration: 'Wrap in parchment paper and serve hot with fresh lemon wedges.'
      }
    ],
    platingPresentation: 'Skewers laid over warm grilled pita, served with dishes of cool tzatziki, sliced tomatoes, red onions, and lemon wedges.',
    sommelierPairing: {
      vintage: '2021 Assyrtiko',
      terroir: 'Santorini, Greece',
      tastingNote: 'Crisp volcanic minerality and intense lemon acidity pair with charred pork and garlic tzatziki.'
    },
    heroImageUrl: imgSouvlaki,
    aiImagePrompt: 'Greek souvlaki skewers: charred grilled pork and chicken skewers laid over warm pita bread, small bowl of creamy tzatziki sauce with a cucumber slice, sliced red onion and tomatoes, lemon wedges.',
    createdAt: new Date().toISOString()
  },

  // 35. Hummus with Pita — Middle East
  {
    id: 'hummus-pita-middle-east',
    recipeNumber: 35,
    primaryIngredientId: 'creamy-chickpeas-tahini-olive-oil',
    primaryIngredientName: 'Cooked Chickpeas & Nutty Sesame Tahini',
    dishTitle: 'Hummus with Warm Pita',
    subtitle: 'Silky smooth Middle Eastern hummus with rich tahini, garlic, lemon, pool of extra virgin olive oil, paprika, and warm pita',
    cuisine: 'Middle Eastern',
    countryRegion: 'Middle East',
    tags: ['Dip', 'Hummus', 'Middle Eastern', 'Tahini', 'Vegan'],
    overview: 'The beloved cornerstone of Middle Eastern hospitality. Ultra-velvety chickpea puree whipped with rich sesame tahini, fresh lemon juice, and garlic, served with a deep pool of olive oil, whole chickpeas, paprika, and warm puffed pita bread.',
    chefRationale: 'Boiling chickpeas with a pinch of baking soda softens chickpea skins, enabling high-speed blending into an impossibly smooth, cloud-like emulsion.',
    difficulty: 'Easy',
    servings: 4,
    totalPrepTimeMinutes: 15,
    totalCookTimeMinutes: 10,
    overallDurationFormatted: '25 min',
    trendScore: 98.8,
    hotnessRank: 35,
    awardBadge: 'World Archive No. 35 • Levantine Meze Standard',
    flavorAromaProfile: {
      umami: 88,
      acidity: 70,
      aromaticIntensity: 92,
      textureComplexity: 98,
      finishLength: 92
    },
    requiredTools: [
      {
        id: 'food-processor-hummus',
        name: 'High-Power Food Processor',
        category: 'Cookware',
        material: 'Stainless Steel Blades',
        purpose: 'Whips chickpeas and tahini with ice water into velvety cloud'
      }
    ],
    ingredientsList: [
      { name: 'Chickpeas', amount: '400g cooked chickpeas (garbanzo beans)', prepState: 'Warm and tender', addedAtMinute: 0, isArchiveSpecialty: false },
      { name: 'Tahini', amount: '120g pure roasted sesame paste', prepState: 'Smooth tahini', addedAtMinute: 5, isArchiveSpecialty: true },
      { name: 'Lemon juice', amount: '45ml freshly squeezed lemon juice', prepState: 'Freshly squeezed', addedAtMinute: 5, isArchiveSpecialty: false },
      { name: 'Garlic', amount: '2 cloves', prepState: 'Grated fine', addedAtMinute: 5, isArchiveSpecialty: false },
      { name: 'Olive oil', amount: '45ml premium extra virgin olive oil', prepState: 'First cold-pressed', addedAtMinute: 12, isArchiveSpecialty: true },
      { name: 'Pita bread', amount: '4 fresh pita breads', prepState: 'Warmed and puffed', addedAtMinute: 15, isArchiveSpecialty: false }
    ],
    timelineSteps: [
      {
        stepNumber: 1,
        timeOffsetFormatted: '00:00',
        timeOffsetSeconds: 0,
        title: 'Blend Tahini, Lemon Juice, and Garlic into a Whipped Paste',
        actionDescription: 'Blend tahini, lemon juice, and garlic into a light, whipped paste.',
        ingredientAdditions: [
          { ingredientName: 'Tahini', amount: '120g', technique: 'Blended' },
          { ingredientName: 'Lemon juice', amount: '45ml', technique: 'Whipped' },
          { ingredientName: 'Garlic', amount: '2 cloves', technique: 'Emulsified' }
        ],
        toolsUsed: ['High-Power Food Processor'],
        criticalControlPoint: 'Whip tahini and lemon juice first to create a pale fluffy emulsion.',
        sensoryCue: 'Nutty roasted sesame and bright lemon fragrance.',
        soundscapeType: 'whisk',
        spokenNarration: 'Blend tahini, lemon juice, and garlic into a light whipped paste.'
      },
      {
        stepNumber: 2,
        timeOffsetFormatted: '05:00',
        timeOffsetSeconds: 300,
        title: 'Add Chickpeas and Ice Water, Blend for Several Minutes',
        actionDescription: 'Add warm chickpeas and a splash of ice water, blend until completely smooth.',
        ingredientAdditions: [{ ingredientName: 'Chickpeas', amount: '400g', technique: 'Pureed' }],
        toolsUsed: ['Food Processor'],
        criticalControlPoint: 'Drizzle in ice water while running to create an ultra-creamy, light texture.',
        sensoryCue: 'Hummus turns silky, glossy, and satin smooth.',
        soundscapeType: 'whisk',
        spokenNarration: 'Add warm chickpeas and ice water, blending until completely smooth and velvety.'
      },
      {
        stepNumber: 3,
        timeOffsetFormatted: '10:00',
        timeOffsetSeconds: 600,
        title: 'Season to Taste with Salt and Cumin',
        actionDescription: 'Season to taste with salt and a pinch of ground cumin.',
        ingredientAdditions: [],
        toolsUsed: ['Tasting Spoon'],
        criticalControlPoint: 'Balance acidity, garlic sharpness, and salt to perfection.',
        sensoryCue: 'Harmonious nutty, savory, and tangy aroma.',
        soundscapeType: 'whisk',
        spokenNarration: 'Season to taste with salt and ground cumin.'
      },
      {
        stepNumber: 4,
        timeOffsetFormatted: '12:00',
        timeOffsetSeconds: 720,
        title: 'Spread in a Shallow Bowl with a Spiral Well in Center',
        actionDescription: 'Spread in a shallow bowl creating a decorative spiral well in center.',
        ingredientAdditions: [],
        toolsUsed: ['Back of a Spoon'],
        criticalControlPoint: 'Create deep ridges to hold generous pools of olive oil.',
        sensoryCue: 'Satin-smooth swirls catching the light.',
        soundscapeType: 'plating',
        spokenNarration: 'Spread in a shallow bowl, creating a decorative spiral well in the center.'
      },
      {
        stepNumber: 5,
        timeOffsetFormatted: '14:00',
        timeOffsetSeconds: 840,
        title: 'Pour Olive Oil into Well, Dust with Paprika and Whole Chickpeas',
        actionDescription: 'Pour extra virgin olive oil into well, dust with paprika and whole chickpeas.',
        ingredientAdditions: [{ ingredientName: 'Olive oil', amount: '45ml', technique: 'Pool drizzle' }],
        toolsUsed: [],
        criticalControlPoint: 'Garnish with a sprinkle of smoked paprika, cumin, and fresh parsley.',
        sensoryCue: 'Golden green olive oil pool glistening over pale ivory hummus.',
        soundscapeType: 'drizzle',
        spokenNarration: 'Pour extra virgin olive oil into the well and dust with paprika.'
      },
      {
        stepNumber: 6,
        timeOffsetFormatted: '16:00',
        timeOffsetSeconds: 960,
        title: 'Serve with Warm Puffy Pita Bread',
        actionDescription: 'Serve with warm puffy pita bread.',
        ingredientAdditions: [{ ingredientName: 'Pita bread', amount: '4 pitas', technique: 'Warm wedges' }],
        toolsUsed: ['Bread Basket'],
        criticalControlPoint: 'Serve immediately with warm pita for dipping.',
        sensoryCue: 'Warm bread steam and aromatic olive oil.',
        soundscapeType: 'plating',
        spokenNarration: 'Serve with warm, puffy pita bread.'
      }
    ],
    platingPresentation: 'Swirled in a shallow ceramic bowl with a pool of green olive oil, whole chickpeas, paprika dust, and warm pita wedges.',
    sommelierPairing: {
      vintage: '2021 Lebanese White (Château Musar Jeune White)',
      terroir: 'Bekaa Valley, Lebanon',
      tastingNote: 'Viognier and Chardonnay blend offering crisp stone fruit and minerality to pair with tahini.'
    },
    heroImageUrl: imgHummus,
    aiImagePrompt: 'Top-down shot of silky smooth hummus swirled in a shallow ceramic bowl: pool of golden extra virgin olive oil in center, whole chickpeas, dusting of red paprika, fresh parsley, warm fluffy pita triangles on side.',
    createdAt: new Date().toISOString()
  },

  // 36. Falafel — Middle East
  {
    id: 'falafel-middle-east',
    recipeNumber: 36,
    primaryIngredientId: 'herb-soaked-chickpeas-tahini',
    primaryIngredientName: 'Soaked Raw Chickpeas & Fresh Herb Falafel',
    dishTitle: 'Falafel',
    subtitle: 'Crispy deep-fried herb and chickpea falafel patties with bright green interior, tahini sauce, and pickled turnips',
    cuisine: 'Middle Eastern',
    countryRegion: 'Middle East',
    tags: ['Falafel', 'Middle Eastern', 'Crispy', 'Vegan', 'Street Food'],
    overview: 'The iconic vegetarian street food of the Levant and Egypt. Raw soaked chickpeas ground with fresh parsley, cilantro, garlic, cumin, and coriander, shaped into patties and fried to crunchy deep golden perfection with a bright emerald interior.',
    chefRationale: 'Using raw soaked (never canned or cooked) chickpeas gives falafel its essential light, airy texture and crunchy exterior without disintegrating in the oil.',
    difficulty: 'Intermediate',
    servings: 4,
    totalPrepTimeMinutes: 20,
    totalCookTimeMinutes: 15,
    overallDurationFormatted: '35 min',
    trendScore: 98.7,
    hotnessRank: 36,
    awardBadge: 'World Archive No. 36 • Levantine Street Legend',
    flavorAromaProfile: {
      umami: 90,
      acidity: 50,
      aromaticIntensity: 98,
      textureComplexity: 98,
      finishLength: 92
    },
    requiredTools: [
      {
        id: 'falafel-scoop',
        name: 'Falafel Mold Scoop / Deep Fryer',
        category: 'Cookware',
        material: 'Brass / Stainless Steel',
        purpose: 'Forms uniform falafel patties that release cleanly into oil'
      }
    ],
    ingredientsList: [
      { name: 'Chickpeas', amount: '350g dried chickpeas', prepState: 'Soaked 18 hours (never cooked)', addedAtMinute: 0, isArchiveSpecialty: true },
      { name: 'Fresh herbs (parsley & cilantro)', amount: '1 large bunch fresh parsley + 1 bunch cilantro', prepState: 'Washed and dried', addedAtMinute: 0, isArchiveSpecialty: true },
      { name: 'Garlic and onion', amount: '1 small onion + 4 garlic cloves', prepState: 'Coarsely chopped', addedAtMinute: 0, isArchiveSpecialty: false },
      { name: 'Spices (cumin & coriander)', amount: '1.5 tbsp cumin + 1 tbsp coriander + 1 tsp cardamon', prepState: 'Freshly ground', addedAtMinute: 5, isArchiveSpecialty: true },
      { name: 'Tahini sauce', amount: '100g tahini dressing with lemon & garlic', prepState: 'For dipping', addedAtMinute: 20, isArchiveSpecialty: false }
    ],
    timelineSteps: [
      {
        stepNumber: 1,
        timeOffsetFormatted: '00:00',
        timeOffsetSeconds: 0,
        title: 'Pulse Soaked Raw Chickpeas, Herbs, Onion, Garlic, and Spices',
        actionDescription: 'Pulse soaked raw chickpeas, herbs, onion, garlic, and spices in a food processor.',
        ingredientAdditions: [
          { ingredientName: 'Chickpeas', amount: '350g raw soaked', technique: 'Pulsed' },
          { ingredientName: 'Fresh herbs (parsley & cilantro)', amount: '2 bunches', technique: 'Ground' },
          { ingredientName: 'Spices (cumin & coriander)', amount: 'Spices', technique: 'Incorporated' }
        ],
        toolsUsed: ['Food Processor'],
        criticalControlPoint: 'Pulse until coarse meal consistency (like coarse sand); do not puree to paste.',
        sensoryCue: 'Vibrant emerald green mixture with explosive fresh herb and cumin aroma.',
        soundscapeType: 'chop',
        spokenNarration: 'Pulse soaked raw chickpeas, fresh herbs, onion, garlic, and spices in a food processor.'
      },
      {
        stepNumber: 2,
        timeOffsetFormatted: '08:00',
        timeOffsetSeconds: 480,
        title: 'Rest Mixture in Fridge for 30 Minutes',
        actionDescription: 'Rest mixture in fridge for 30 minutes, then stir in 1/2 tsp baking powder.',
        ingredientAdditions: [],
        toolsUsed: ['Covered Bowl'],
        criticalControlPoint: 'Baking powder creates light airy texture when fried.',
        sensoryCue: 'Chilled fragrant green falafel dough.',
        soundscapeType: 'plating',
        spokenNarration: 'Rest the mixture in the refrigerator, then stir in a pinch of baking powder.'
      },
      {
        stepNumber: 3,
        timeOffsetFormatted: '12:00',
        timeOffsetSeconds: 720,
        title: 'Shape into Small Balls or Patties',
        actionDescription: 'Shape into small balls or slightly flattened patties.',
        ingredientAdditions: [],
        toolsUsed: ['Falafel Mold Scoop'],
        criticalControlPoint: 'Press gently without over-compacting.',
        sensoryCue: 'Uniform green patties ready for frying.',
        soundscapeType: 'plating',
        spokenNarration: 'Shape into small balls or patties.'
      },
      {
        stepNumber: 4,
        timeOffsetFormatted: '15:00',
        timeOffsetSeconds: 900,
        title: 'Deep-Fry at 375F (190C) for 3-4 Minutes Until Deep Golden',
        actionDescription: 'Deep-fry at 375F (190C) for 3-4 minutes until deep golden brown and crispy.',
        ingredientAdditions: [],
        toolsUsed: ['Deep Fryer', 'Slotted Spoon'],
        criticalControlPoint: 'Fry in batches to maintain high oil temperature.',
        sensoryCue: 'Audible frying sizzle and nutty roasted aroma.',
        soundscapeType: 'sizzle',
        spokenNarration: 'Deep-fry at 375 degrees until deep golden brown and crisp.'
      },
      {
        stepNumber: 5,
        timeOffsetFormatted: '20:00',
        timeOffsetSeconds: 1200,
        title: 'Drain on Paper Towels and Serve Immediately',
        actionDescription: 'Drain on paper towels and serve immediately while hot and crunchy.',
        ingredientAdditions: [{ ingredientName: 'Tahini sauce', amount: '100g', technique: 'Dipping bowl' }],
        toolsUsed: ['Platter'],
        criticalControlPoint: 'Serve straight from fryer with creamy tahini sauce.',
        sensoryCue: 'Crispy crunch revealing vibrant green steaming interior.',
        soundscapeType: 'plating',
        spokenNarration: 'Drain on paper towels and serve immediately with tahini sauce.'
      }
    ],
    platingPresentation: 'Piled on a ceramic plate, one falafel broken open showing bright emerald green interior, surrounded by tahini, pickles, and pita.',
    sommelierPairing: {
      vintage: '2021 Greek Assyrtiko / Fresh Mint Lemonade',
      terroir: 'Aegean Islands',
      tastingNote: 'Bright citrus acidity cuts through deep-fried crunch and rich tahini.'
    },
    heroImageUrl: imgFalafel,
    aiImagePrompt: 'Golden-brown crispy falafel patties piled on a platter: one broken open showing a bright vibrant green herb-flecked interior, small bowl of creamy tahini sauce for dipping, pickled pink turnips, warm pita.',
    createdAt: new Date().toISOString()
  },

  // 37. Shakshuka — North Africa / Middle East
  {
    id: 'shakshuka-north-africa',
    recipeNumber: 37,
    primaryIngredientId: 'eggs-spiced-tomato-peppers',
    primaryIngredientName: 'Runny Poached Eggs & Spiced Tomato Pepper Ragù',
    dishTitle: 'Shakshuka',
    subtitle: 'Eggs gently poached in a sizzling skillet of spiced tomato, bell pepper, garlic, cumin, and fresh cilantro',
    cuisine: 'North African',
    countryRegion: 'North Africa / Middle East',
    tags: ['Breakfast', 'Shakshuka', 'North African', 'Eggs', 'Skillet'],
    overview: 'The vibrant morning skillet of North Africa and the Levant. Farm-fresh eggs gently poached in a simmering, rich sauce of crushed tomatoes, sweet bell peppers, onions, garlic, cumin, paprika, and chili, garnished with cilantro and feta cheese.',
    chefRationale: 'Simmering peppers and onions until soft and sweet before adding tomatoes builds a deep, rounded sauce base that cradles runny poached eggs.',
    difficulty: 'Easy',
    servings: 2,
    totalPrepTimeMinutes: 10,
    totalCookTimeMinutes: 20,
    overallDurationFormatted: '30 min',
    trendScore: 98.9,
    hotnessRank: 37,
    awardBadge: 'World Archive No. 37 • Maghrebi Skillet Classic',
    flavorAromaProfile: {
      umami: 94,
      acidity: 75,
      aromaticIntensity: 96,
      textureComplexity: 90,
      finishLength: 90
    },
    requiredTools: [
      {
        id: 'shakshuka-skillet',
        name: 'Heavy Cast Iron Skillet',
        category: 'Cookware',
        material: 'Cast Iron',
        purpose: 'Retains even bubbling heat and serves directly to table'
      }
    ],
    ingredientsList: [
      { name: 'Eggs', amount: '4 large farm fresh eggs', prepState: 'Room temperature', addedAtMinute: 12, isArchiveSpecialty: false },
      { name: 'Tomatoes', amount: '400g crushed San Marzano or ripe tomatoes', prepState: 'Crushed with juice', addedAtMinute: 5, isArchiveSpecialty: false },
      { name: 'Bell peppers', amount: '2 red and yellow bell peppers', prepState: 'Sliced into thin strips', addedAtMinute: 0, isArchiveSpecialty: false },
      { name: 'Cumin and paprika', amount: '1.5 tsp ground cumin + 1 tsp smoked paprika', prepState: 'Ground spices', addedAtMinute: 3, isArchiveSpecialty: true },
      { name: 'Cilantro and feta', amount: 'Fresh cilantro + 50g crumbled sheep feta', prepState: 'Fresh garnish', addedAtMinute: 18, isArchiveSpecialty: false }
    ],
    timelineSteps: [
      {
        stepNumber: 1,
        timeOffsetFormatted: '00:00',
        timeOffsetSeconds: 0,
        title: 'Saute Bell Peppers, Onions, and Garlic in Olive Oil',
        actionDescription: 'Saute bell peppers, onions, and garlic in olive oil until soft and caramelized.',
        ingredientAdditions: [{ ingredientName: 'Bell peppers', amount: '2 peppers', technique: 'Sautéed' }],
        toolsUsed: ['Heavy Cast Iron Skillet'],
        criticalControlPoint: 'Cook on medium heat for 6-8 minutes until tender and sweet.',
        sensoryCue: 'Sweet sizzling pepper and garlic aroma.',
        soundscapeType: 'sizzle',
        spokenNarration: 'Saute bell peppers, onions, and garlic in olive oil until soft.'
      },
      {
        stepNumber: 2,
        timeOffsetFormatted: '05:00',
        timeOffsetSeconds: 300,
        title: 'Add Spices and Crushed Tomatoes, Simmer 10 Minutes',
        actionDescription: 'Add cumin, paprika, chili, and crushed tomatoes; simmer until thick.',
        ingredientAdditions: [
          { ingredientName: 'Cumin and paprika', amount: 'Spices', technique: 'Bloomed' },
          { ingredientName: 'Tomatoes', amount: '400g', technique: 'Simmered' }
        ],
        toolsUsed: ['Wooden Spoon'],
        criticalControlPoint: 'Simmer until sauce thickens and oil begins to separate slightly.',
        sensoryCue: 'Vibrant crimson sauce bubbling with fragrant cumin steam.',
        soundscapeType: 'simmer',
        spokenNarration: 'Add cumin, paprika, and crushed tomatoes, then simmer until thick.'
      },
      {
        stepNumber: 3,
        timeOffsetFormatted: '12:00',
        timeOffsetSeconds: 720,
        title: 'Make Wells in the Sauce and Crack Eggs Inside',
        actionDescription: 'Make small wells in the sauce with a spoon and crack eggs directly into each well.',
        ingredientAdditions: [{ ingredientName: 'Eggs', amount: '4 eggs', technique: 'Cracked into wells' }],
        toolsUsed: ['Spoon'],
        criticalControlPoint: 'Keep yolks whole and centered within the red sauce.',
        sensoryCue: 'Bright yellow yolks resting in bubbling crimson sauce.',
        soundscapeType: 'plating',
        spokenNarration: 'Make wells in the sauce and gently crack the eggs inside.'
      },
      {
        stepNumber: 4,
        timeOffsetFormatted: '14:00',
        timeOffsetSeconds: 840,
        title: 'Cover and Cook on Low Heat Until Whites Set, Yolks Runny',
        actionDescription: 'Cover with lid and cook on low heat for 5-8 minutes until egg whites set and yolks remain runny.',
        ingredientAdditions: [],
        toolsUsed: ['Lid'],
        criticalControlPoint: 'Watch closely: whites must be opaque while yolks jiggle delicately.',
        sensoryCue: 'Gentle steam whispering under the skillet lid.',
        soundscapeType: 'simmer',
        spokenNarration: 'Cover and cook gently until egg whites are set and yolks remain runny.'
      },
      {
        stepNumber: 5,
        timeOffsetFormatted: '19:00',
        timeOffsetSeconds: 1140,
        title: 'Garnish with Crumbled Feta, Fresh Cilantro, and Serve with Crusty Bread',
        actionDescription: 'Garnish with crumbled feta, fresh cilantro, and serve piping hot with crusty bread.',
        ingredientAdditions: [{ ingredientName: 'Cilantro and feta', amount: 'Fresh', technique: 'Scattered' }],
        toolsUsed: ['Skillet'],
        criticalControlPoint: 'Serve straight in the hot skillet with toasted sourdough or challah bread.',
        sensoryCue: 'Sizzling red skillet with golden runny yolk breaking into spiced sauce.',
        soundscapeType: 'plating',
        spokenNarration: 'Garnish with crumbled feta and fresh cilantro, then serve piping hot.'
      }
    ],
    platingPresentation: 'Served bubbling directly in a black cast iron skillet with runny yellow yolks, fresh herbs, crumbled feta, and crusty bread.',
    sommelierPairing: {
      vintage: '2021 Bandol Rosé / Moroccan Mint Tea',
      terroir: 'Provence, France',
      tastingNote: 'Crisp red fruit, herbs, and minerality complement the sweet peppers and rich egg yolks.'
    },
    heroImageUrl: imgShakshuka,
    aiImagePrompt: 'Vibrant shakshuka bubbling in a cast iron skillet: bright red spiced tomato and bell pepper sauce, three whole poached eggs with runny golden yolks, scattered fresh cilantro leaves and crumbled feta cheese, crusty bread slices beside it.',
    createdAt: new Date().toISOString()
  },

  // 38. Tagine — Morocco
  {
    id: 'tagine-morocco',
    recipeNumber: 38,
    primaryIngredientId: 'lamb-preserved-lemon-olives',
    primaryIngredientName: 'Tender Lamb, Preserved Lemons & Green Olives',
    dishTitle: 'Moroccan Tagine',
    subtitle: 'Slow-simmered Moroccan lamb tagine with preserved lemons, green olives, ginger, saffron, and almonds',
    cuisine: 'Moroccan',
    countryRegion: 'Morocco',
    tags: ['Stew', 'Tagine', 'Moroccan', 'Preserved Lemon', 'Slow Cooked'],
    overview: 'The aromatic slow-cooked marvel of Morocco. Tender lamb shanks braised in a conical earthenware tagine with ginger, turmeric, saffron, sweet caramelized onions, briny green olives, and salted preserved lemon peel, topped with toasted almonds.',
    chefRationale: 'The conical tagine lid condenses rising steam and returns it to the base, self-basting the lamb into meltingly tender succulence.',
    difficulty: 'Intermediate',
    servings: 4,
    totalPrepTimeMinutes: 20,
    totalCookTimeMinutes: 60,
    overallDurationFormatted: '80 min',
    trendScore: 98.7,
    hotnessRank: 38,
    awardBadge: 'World Archive No. 38 • Maghrebi Imperial Tagine',
    flavorAromaProfile: {
      umami: 96,
      acidity: 65,
      aromaticIntensity: 99,
      textureComplexity: 94,
      finishLength: 98
    },
    requiredTools: [
      {
        id: 'moroccan-tagine-pot',
        name: 'Glazed Ceramic Conical Moroccan Tagine',
        category: 'Cookware',
        material: 'Glazed Terracotta',
        purpose: 'Circulates aromatic steam continuously for tender braising'
      }
    ],
    ingredientsList: [
      { name: 'Lamb or chicken', amount: '800g bone-in lamb shank or shoulder', prepState: 'Patted dry', addedAtMinute: 0, isArchiveSpecialty: false },
      { name: 'Preserved lemons', amount: '1 whole Moroccan preserved lemon', prepState: 'Pulp removed, peel julienned', addedAtMinute: 40, isArchiveSpecialty: true },
      { name: 'Green olives', amount: '100g cured Moroccan green olives', prepState: 'Pitted', addedAtMinute: 45, isArchiveSpecialty: true },
      { name: 'Ginger and saffron', amount: '1 tbsp fresh ginger + 0.3g saffron + turmeric', prepState: 'Spices infused', addedAtMinute: 0, isArchiveSpecialty: true },
      { name: 'Toasted almonds', amount: '40g whole blanched almonds', prepState: 'Toasted golden in butter', addedAtMinute: 55, isArchiveSpecialty: false }
    ],
    timelineSteps: [
      {
        stepNumber: 1,
        timeOffsetFormatted: '00:00',
        timeOffsetSeconds: 0,
        title: 'Sear Lamb with Onions, Ginger, Saffron, and Turmeric in Tagine',
        actionDescription: 'Sear lamb with onions, ginger, saffron, and turmeric in the tagine base.',
        ingredientAdditions: [
          { ingredientName: 'Lamb or chicken', amount: '800g', technique: 'Seared' },
          { ingredientName: 'Ginger and saffron', amount: 'Spices', technique: 'Bloomed' }
        ],
        toolsUsed: ['Glazed Ceramic Conical Moroccan Tagine'],
        criticalControlPoint: 'Sear gently over low flame with diffuser to protect ceramic.',
        sensoryCue: 'Golden saffron and warm ginger perfume rising in steam.',
        soundscapeType: 'sizzle',
        spokenNarration: 'Sear lamb with onions, ginger, saffron, and turmeric in the tagine base.'
      },
      {
        stepNumber: 2,
        timeOffsetFormatted: '10:00',
        timeOffsetSeconds: 600,
        title: 'Add Water or Broth, Cover with Conical Lid',
        actionDescription: 'Add water or broth, cover with the conical lid, and simmer on low heat.',
        ingredientAdditions: [],
        toolsUsed: ['Conical Lid'],
        criticalControlPoint: 'Maintain gentle simmer so steam condenses down conical walls.',
        sensoryCue: 'Aromatic steam condensing inside the cone.',
        soundscapeType: 'simmer',
        spokenNarration: 'Add broth, cover with the conical lid, and simmer slowly.'
      },
      {
        stepNumber: 3,
        timeOffsetFormatted: '40:00',
        timeOffsetSeconds: 2400,
        title: 'Add Preserved Lemon Peel and Green Olives',
        actionDescription: 'Add preserved lemon peel strips and green olives.',
        ingredientAdditions: [
          { ingredientName: 'Preserved lemons', amount: '1 lemon peel', technique: 'Added' },
          { ingredientName: 'Green olives', amount: '100g', technique: 'Folded in' }
        ],
        toolsUsed: [],
        criticalControlPoint: 'Preserved lemon rind imparts distinctive salty-floral brightness.',
        sensoryCue: 'Sharp citrus and briny olive aroma blooming in the sauce.',
        soundscapeType: 'simmer',
        spokenNarration: 'Add preserved lemon peel and green olives to the tagine.'
      },
      {
        stepNumber: 4,
        timeOffsetFormatted: '55:00',
        timeOffsetSeconds: 3300,
        title: 'Reduce Sauce Until Glossy, Garnish with Toasted Almonds & Cilantro',
        actionDescription: 'Reduce sauce until thick and glossy, garnish with toasted almonds and cilantro.',
        ingredientAdditions: [{ ingredientName: 'Toasted almonds', amount: '40g', technique: 'Scattered' }],
        toolsUsed: ['Tagine Base'],
        criticalControlPoint: 'Sauce should cling warmly to the tender lamb.',
        sensoryCue: 'Rich golden-amber sauce with toasted almond crunch.',
        soundscapeType: 'plating',
        spokenNarration: 'Reduce sauce until glossy, then garnish with toasted almonds and fresh cilantro.'
      },
      {
        stepNumber: 5,
        timeOffsetFormatted: '60:00',
        timeOffsetSeconds: 3600,
        title: 'Serve Warm Inside the Tagine with Moroccan Bread (Khobz)',
        actionDescription: 'Serve warm inside the tagine with Moroccan crusty bread (khobz) or fluffy couscous.',
        ingredientAdditions: [],
        toolsUsed: ['Tagine'],
        criticalControlPoint: 'Serve directly in the handcrafted tagine at center of table.',
        sensoryCue: 'Steaming theatrical presentation as conical lid is lifted.',
        soundscapeType: 'plating',
        spokenNarration: 'Serve directly in the tagine with crusty bread or fluffy couscous.'
      }
    ],
    platingPresentation: 'Served directly inside a decorative glazed conical tagine with golden saffron sauce, green olives, lemon rind, and toasted almonds.',
    sommelierPairing: {
      vintage: '2019 Moroccan Syrah (Domaine de Sahari)',
      terroir: 'Beni M\'Tir, Morocco',
      tastingNote: 'Dark berry fruit, black pepper, and leather notes complement the saffron lamb and olives.'
    },
    heroImageUrl: imgTagine,
    aiImagePrompt: 'Moroccan tagine in a traditional conical earthenware dish with lid lifted: fall-apart tender lamb pieces coated in rich golden saffron sauce, green olives, preserved lemon strips, toasted almonds on top, steam rising.',
    createdAt: new Date().toISOString()
  },

  // 39. Jollof Rice — West Africa
  {
    id: 'jollof-rice-west-africa',
    recipeNumber: 39,
    primaryIngredientId: 'smoky-tomato-scotch-bonnet-rice',
    primaryIngredientName: 'Smoky Blended Tomato-Pepper Base & Parboiled Rice',
    dishTitle: 'Jollof Rice',
    subtitle: 'Vibrant, smoky West African one-pot rice cooked in roasted tomato, bell pepper, and Scotch bonnet sauce with plantains',
    cuisine: 'West African',
    countryRegion: 'West Africa (Nigeria/Ghana)',
    tags: ['Rice', 'Jollof', 'West African', 'Smoky', 'Plantains'],
    overview: 'The beloved celebration centerpiece of West Africa. Long-grain rice cooked in a vibrant, rich puree of roasted tomatoes, red bell peppers, onions, and Scotch bonnet chilies, infused with curry powder, thyme, and a distinct smoky bottom aroma (party jollof flavor), served with fried sweet plantains (dodo).',
    chefRationale: 'Frying the blended tomato-pepper puree until deep red before adding rice and sealing with foil achieves the authentic smoky "party rice" flavor.',
    difficulty: 'Intermediate',
    servings: 4,
    totalPrepTimeMinutes: 20,
    totalCookTimeMinutes: 40,
    overallDurationFormatted: '60 min',
    trendScore: 99.1,
    hotnessRank: 39,
    awardBadge: 'World Archive No. 39 • West African Celebration Pot',
    flavorAromaProfile: {
      umami: 96,
      acidity: 65,
      aromaticIntensity: 99,
      textureComplexity: 92,
      finishLength: 96
    },
    requiredTools: [
      {
        id: 'heavy-jollof-pot',
        name: 'Heavy Base Cast Iron Pot & Aluminum Foil Seal',
        category: 'Cookware',
        material: 'Heavy Cast Iron',
        purpose: 'Distributes even heat and allows controlled bottom char for party smoke'
      }
    ],
    ingredientsList: [
      { name: 'Rice', amount: '400g parboiled long-grain rice or Jasmine', prepState: 'Rinsed until clear', addedAtMinute: 15, isArchiveSpecialty: false },
      { name: 'Tomato paste and fresh tomatoes', amount: '4 large plum tomatoes + 70g tomato paste', prepState: 'Blended with peppers', addedAtMinute: 0, isArchiveSpecialty: true },
      { name: 'Red bell peppers & Scotch bonnet', amount: '2 red bell peppers + 1-2 Scotch bonnets', prepState: 'Blended smooth', addedAtMinute: 0, isArchiveSpecialty: true },
      { name: 'Onions', amount: '2 large red onions', prepState: 'Diced & blended', addedAtMinute: 0, isArchiveSpecialty: false },
      { name: 'Fried sweet plantains (dodo)', amount: '2 ripe yellow plantains', prepState: 'Sliced and fried golden', addedAtMinute: 35, isArchiveSpecialty: true },
      { name: 'Curry powder, thyme, bay leaves', amount: '1 tbsp curry + 1 tsp thyme + 3 bay leaves', prepState: 'Seasoning blend', addedAtMinute: 8, isArchiveSpecialty: true }
    ],
    timelineSteps: [
      {
        stepNumber: 1,
        timeOffsetFormatted: '00:00',
        timeOffsetSeconds: 0,
        title: 'Blend Tomatoes, Bell Peppers, Scotch Bonnets, and Onions',
        actionDescription: 'Blend tomatoes, red bell peppers, Scotch bonnet chilies, and onions until smooth.',
        ingredientAdditions: [
          { ingredientName: 'Tomato paste and fresh tomatoes', amount: 'Blended base', technique: 'Pureed' },
          { ingredientName: 'Red bell peppers & Scotch bonnet', amount: 'Peppers', technique: 'Pureed' }
        ],
        toolsUsed: ['Blender'],
        criticalControlPoint: 'Puree into a smooth, bright red sauce.',
        sensoryCue: 'Fiery sweet pepper and Scotch bonnet aroma.',
        soundscapeType: 'chop',
        spokenNarration: 'Blend tomatoes, bell peppers, Scotch bonnet chilies, and onions until smooth.'
      },
      {
        stepNumber: 2,
        timeOffsetFormatted: '05:00',
        timeOffsetSeconds: 300,
        title: 'Fry Sliced Onions and Tomato Paste in Vegetable Oil',
        actionDescription: 'Fry sliced onions and tomato paste in vegetable oil until deep dark red.',
        ingredientAdditions: [{ ingredientName: 'Tomato paste and fresh tomatoes', amount: '70g paste', technique: 'Fried in oil' }],
        toolsUsed: ['Heavy Base Cast Iron Pot'],
        criticalControlPoint: 'Fry tomato paste until oil turns bright orange-red and acidity mellows.',
        sensoryCue: 'Caramelized tomato and sweet fried onion fragrance.',
        soundscapeType: 'sizzle',
        spokenNarration: 'Fry sliced onions and tomato paste in oil until deep dark red.'
      },
      {
        stepNumber: 3,
        timeOffsetFormatted: '10:00',
        timeOffsetSeconds: 600,
        title: 'Add Blended Pepper Puree, Curry Powder, Thyme, and Stock',
        actionDescription: 'Add blended pepper puree, curry powder, thyme, bay leaves, and rich chicken stock.',
        ingredientAdditions: [{ ingredientName: 'Curry powder, thyme, bay leaves', amount: 'Spices', technique: 'Bloomed' }],
        toolsUsed: ['Wooden Spoon'],
        criticalControlPoint: 'Reduce sauce for 10-15 minutes until oil floats on top (fried stew).',
        sensoryCue: 'Rich, spicy red steam billowing.',
        soundscapeType: 'simmer',
        spokenNarration: 'Add blended pepper puree, spices, and chicken stock, then simmer until reduced.'
      },
      {
        stepNumber: 4,
        timeOffsetFormatted: '20:00',
        timeOffsetSeconds: 1200,
        title: 'Add Rinsed Rice, Stir, Seal Tightly with Foil and Lid',
        actionDescription: 'Add rinsed rice, stir to coat, seal tightly with aluminum foil and pot lid.',
        ingredientAdditions: [{ ingredientName: 'Rice', amount: '400g', technique: 'Folded into sauce' }],
        toolsUsed: ['Aluminum Foil Seal', 'Lid'],
        criticalControlPoint: 'Steam cooks the rice; tight foil seal prevents steam escape.',
        sensoryCue: 'Rice grains turning fiery red in spiced sauce.',
        soundscapeType: 'plating',
        spokenNarration: 'Add rinsed rice, stir to coat, and seal tightly with foil and a heavy lid.'
      },
      {
        stepNumber: 5,
        timeOffsetFormatted: '25:00',
        timeOffsetSeconds: 1500,
        title: 'Cook on Low Heat for 30 Minutes Until Grains Are Tender & Smoky',
        actionDescription: 'Cook on low heat for 30 minutes, allowing bottom to catch slightly for authentic smoke.',
        ingredientAdditions: [],
        toolsUsed: ['Pot'],
        criticalControlPoint: 'Gentle bottom scorching imparts the iconic party jollof smokiness.',
        sensoryCue: 'Intoxicating smoky spiced tomato perfume.',
        soundscapeType: 'simmer',
        spokenNarration: 'Cook on low heat, allowing a gentle smoky sear on the bottom.'
      },
      {
        stepNumber: 6,
        timeOffsetFormatted: '55:00',
        timeOffsetSeconds: 3300,
        title: 'Gently Fluff Rice and Serve with Fried Sweet Plantains',
        actionDescription: 'Gently fluff rice and serve with golden fried sweet plantains (dodo) and grilled chicken.',
        ingredientAdditions: [{ ingredientName: 'Fried sweet plantains (dodo)', amount: 'Fried slices', technique: 'Plated beside' }],
        toolsUsed: ['Rice Paddle'],
        criticalControlPoint: 'Fluff from sides to keep long grains distinct and separate.',
        sensoryCue: 'Glistening red grains of rice alongside sweet caramelized plantains.',
        soundscapeType: 'plating',
        spokenNarration: 'Gently fluff the rice and serve with golden fried sweet plantains.'
      }
    ],
    platingPresentation: 'Served on a vibrant plate showing glowing reddish-orange long-grain rice alongside caramelized golden sweet plantains and grilled chicken.',
    sommelierPairing: {
      vintage: 'Cold Palm Wine / Nigerian Chapman Cocktail',
      terroir: 'Lagos, Nigeria',
      tastingNote: 'Fruity sweetness and effervescence balance Scotch bonnet heat and smoky tomato depth.'
    },
    heroImageUrl: imgJollof,
    aiImagePrompt: 'Top-down shot of vibrant reddish-orange West African jollof rice on a platter, garnished with sliced onions and tomatoes, served alongside golden-brown fried plantains (dodo) and grilled chicken, steam rising.',
    createdAt: new Date().toISOString()
  },

  // 40. Bobotie — South Africa
  {
    id: 'bobotie-south-africa',
    recipeNumber: 40,
    primaryIngredientId: 'curried-minced-meat-egg-custard',
    primaryIngredientName: 'Spiced Minced Meat & Savory Baked Egg Custard',
    dishTitle: 'Bobotie',
    subtitle: 'Classic South African spiced minced beef bake topped with golden savory egg custard, bay leaves, and yellow turmeric rice',
    cuisine: 'South African',
    countryRegion: 'South Africa',
    tags: ['Casserole', 'Bobotie', 'South African', 'Curry', 'Custard'],
    overview: 'The beloved national dish of South Africa (Cape Malay tradition). Ground beef or lamb spiced with mild curry, turmeric, dried apricots, raisins, and mango chutney, topped with a creamy savory egg custard baked to golden perfection, studded with bay leaves and served with yellow raisin rice.',
    chefRationale: 'The delicate egg-and-milk custard top seals in meat juices, balancing sweet-savory curry spices with velvety creaminess.',
    difficulty: 'Easy',
    servings: 4,
    totalPrepTimeMinutes: 20,
    totalCookTimeMinutes: 35,
    overallDurationFormatted: '55 min',
    trendScore: 98.4,
    hotnessRank: 40,
    awardBadge: 'World Archive No. 40 • Cape Malay Heritage Bake',
    flavorAromaProfile: {
      umami: 94,
      acidity: 45,
      aromaticIntensity: 96,
      textureComplexity: 92,
      finishLength: 92
    },
    requiredTools: [
      {
        id: 'ceramic-baking-bobotie',
        name: 'Rectangular Ceramic Casserole Dish',
        category: 'Cookware',
        material: 'Ceramic Stoneware',
        purpose: 'Bakes meat evenly and sets smooth golden egg custard top'
      }
    ],
    ingredientsList: [
      { name: 'Ground beef or lamb', amount: '500g lean ground beef/lamb', prepState: 'Sautéed with onions and curry', addedAtMinute: 0, isArchiveSpecialty: false },
      { name: 'Curry powder', amount: '2 tbsp mild Cape Malay curry powder', prepState: 'Spices blend with turmeric & ginger', addedAtMinute: 5, isArchiveSpecialty: true },
      { name: 'Raisins or sultanas', amount: '50g golden raisins', prepState: 'Plumped', addedAtMinute: 8, isArchiveSpecialty: false },
      { name: 'Chutney', amount: '2 tbsp sweet fruit chutney (Mrs. Ball\'s style)', prepState: 'Sweet fruit preserve', addedAtMinute: 8, isArchiveSpecialty: true },
      { name: 'Egg custard topping', amount: '2 eggs whisked with 150ml milk', prepState: 'Whisked custard with bay leaves', addedAtMinute: 15, isArchiveSpecialty: true },
      { name: 'Bay leaves', amount: '4 whole fresh bay leaves', prepState: 'Pressed into custard top', addedAtMinute: 16, isArchiveSpecialty: false }
    ],
    timelineSteps: [
      {
        stepNumber: 1,
        timeOffsetFormatted: '00:00',
        timeOffsetSeconds: 0,
        title: 'Saute Onions and Ground Meat with Curry Powder and Spices',
        actionDescription: 'Saute onions and ground meat with curry powder, turmeric, and spices.',
        ingredientAdditions: [
          { ingredientName: 'Ground beef or lamb', amount: '500g', technique: 'Browned' },
          { ingredientName: 'Curry powder', amount: '2 tbsp', technique: 'Bloomed' }
        ],
        toolsUsed: ['Skillet'],
        criticalControlPoint: 'Cook until meat is browned and spices are fragrant.',
        sensoryCue: 'Warm Cape Malay curry, turmeric, and onion fragrance.',
        soundscapeType: 'sizzle',
        spokenNarration: 'Saute onions and ground meat with curry powder and aromatic spices.'
      },
      {
        stepNumber: 2,
        timeOffsetFormatted: '08:00',
        timeOffsetSeconds: 480,
        title: 'Stir in Soaked Bread, Chutney, and Raisins',
        actionDescription: 'Stir in milk-soaked breadcrumbs, fruit chutney, and golden raisins.',
        ingredientAdditions: [
          { ingredientName: 'Raisins or sultanas', amount: '50g', technique: 'Folded in' },
          { ingredientName: 'Chutney', amount: '2 tbsp', technique: 'Blended' }
        ],
        toolsUsed: ['Wooden Spoon'],
        criticalControlPoint: 'Soaked bread keeps the meat tender and binds flavors.',
        sensoryCue: 'Sweet-savory curry, fruit, and raisin aroma.',
        soundscapeType: 'whisk',
        spokenNarration: 'Stir in milk-soaked bread, sweet chutney, and golden raisins.'
      },
      {
        stepNumber: 3,
        timeOffsetFormatted: '12:00',
        timeOffsetSeconds: 720,
        title: 'Transfer Meat Mixture into a Baking Dish and Smooth Flat',
        actionDescription: 'Transfer meat mixture into a greased baking dish and smooth flat.',
        ingredientAdditions: [],
        toolsUsed: ['Rectangular Ceramic Casserole Dish', 'Spatula'],
        criticalControlPoint: 'Pack down into an even, level surface.',
        sensoryCue: 'Even spiced meat layer filling the baking dish.',
        soundscapeType: 'plating',
        spokenNarration: 'Transfer meat mixture into a baking dish and smooth flat.'
      },
      {
        stepNumber: 4,
        timeOffsetFormatted: '15:00',
        timeOffsetSeconds: 900,
        title: 'Whisk Eggs with Milk and Pour Over Meat, Top with Bay Leaves',
        actionDescription: 'Whisk eggs with milk and pour custard over meat, press bay leaves on top.',
        ingredientAdditions: [
          { ingredientName: 'Egg custard topping', amount: '2 eggs + milk', technique: 'Poured over' },
          { ingredientName: 'Bay leaves', amount: '4 leaves', technique: 'Pressed into custard' }
        ],
        toolsUsed: ['Whisk', 'Mixing Bowl'],
        criticalControlPoint: 'Pour gently so custard floats evenly on top without disturbing meat layer.',
        sensoryCue: 'Pale golden custard layer with dark green bay leaves.',
        soundscapeType: 'drizzle',
        spokenNarration: 'Whisk eggs with milk and pour over meat, pressing bay leaves into the top.'
      },
      {
        stepNumber: 5,
        timeOffsetFormatted: '18:00',
        timeOffsetSeconds: 1080,
        title: 'Bake at 350F (175C) for 30-35 Minutes Until Custard Is Set and Golden',
        actionDescription: 'Bake at 350F (175C) for 30-35 minutes until custard is set and golden brown.',
        ingredientAdditions: [],
        toolsUsed: ['Oven'],
        criticalControlPoint: 'Bake until custard is lightly puffed and golden without browning too dark.',
        sensoryCue: 'Toasted egg custard, bay leaf, and warm curry scent filling the room.',
        soundscapeType: 'sizzle',
        spokenNarration: 'Bake at 350 degrees until the custard is set and golden brown.'
      },
      {
        stepNumber: 6,
        timeOffsetFormatted: '50:00',
        timeOffsetSeconds: 3000,
        title: 'Slice and Serve with Yellow Rice and Extra Chutney',
        actionDescription: 'Slice into portions and serve with yellow turmeric rice and fruit chutney.',
        ingredientAdditions: [],
        toolsUsed: ['Serving Spatula'],
        criticalControlPoint: 'Serve warm showing distinct meat and custard strata.',
        sensoryCue: 'Golden custard cap over rich spiced curry meat.',
        soundscapeType: 'plating',
        spokenNarration: 'Slice and serve with yellow turmeric rice and extra chutney.'
      }
    ],
    platingPresentation: 'Square portion showing golden baked egg custard top studded with a bay leaf over dark spiced minced beef, served with bright yellow turmeric rice.',
    sommelierPairing: {
      vintage: '2020 South African Pinotage / Chenin Blanc',
      terroir: 'Stellenbosch, South Africa',
      tastingNote: 'Smoky red berry notes and gentle spices match the Cape Malay curry and chutney.'
    },
    heroImageUrl: imgBobotie,
    aiImagePrompt: 'Baked South African bobotie in a ceramic dish: golden baked egg custard top studded with dried bay leaves, rich spiced minced meat beneath, served with yellow turmeric rice and mango chutney.',
    createdAt: new Date().toISOString()
  }
];
