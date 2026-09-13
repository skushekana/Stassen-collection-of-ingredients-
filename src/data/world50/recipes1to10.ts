import { CulinaryMasterclass } from '../../types';

import imgMargherita from '../../assets/images/margherita_pizza_1788216962561.jpg';
import imgCarbonara from '../../assets/images/spaghetti_carbonara_1788216977179.jpg';
import imgSushi from '../../assets/images/sushi_nigiri_1788216992310.jpg';
import imgRamen from '../../assets/images/ramen_bowl_1788217005272.jpg';
import imgPadThai from '../../assets/images/pad_thai_1788217017961.jpg';
import imgGreenCurry from '../../assets/images/thai_green_curry_1788217029790.jpg';
import imgButterChicken from '../../assets/images/butter_chicken_1788217042557.jpg';
import imgTikkaMasala from '../../assets/images/chicken_tikka_masala_1788217055992.jpg';
import imgBiryani from '../../assets/images/biryani_pot_1788217070899.jpg';
import imgPho from '../../assets/images/vietnamese_pho_1788217083172.jpg';

export const RECIPES_1_TO_10: CulinaryMasterclass[] = [
  // 1. Margherita Pizza — Italy
  {
    id: 'margherita-pizza-italy',
    recipeNumber: 1,
    primaryIngredientId: 'san-marzano-tomatoes',
    primaryIngredientName: 'San Marzano Tomatoes & Fresh Mozzarella',
    dishTitle: 'Margherita Pizza',
    subtitle: 'Classic Neapolitan wood-fired pizza with San Marzano tomatoes, fresh mozzarella, and aromatic basil',
    cuisine: 'Italian',
    countryRegion: 'Italy',
    tags: ['Pizza', 'Italian', 'Wood-Fired', 'Neapolitan', 'Vegetarian'],
    overview: 'The quintessential symbol of Italian gastronomy. A light, airy, blistered crust topped with crushed San Marzano tomatoes, melted pools of fresh mozzarella, fragrant sweet basil, and a generous drizzle of extra virgin olive oil.',
    chefRationale: 'High heat (450-500°F) quickly sets the crust, creating crisp leopard spotting while keeping the crumb tender and the cheese moist.',
    difficulty: 'Intermediate',
    servings: 2,
    totalPrepTimeMinutes: 20,
    totalCookTimeMinutes: 10,
    overallDurationFormatted: '30 min',
    trendScore: 99.4,
    hotnessRank: 1,
    isHottest: true,
    awardBadge: 'World Archive No. 1 • Neapolitan Classic',
    flavorAromaProfile: {
      umami: 88,
      acidity: 75,
      aromaticIntensity: 92,
      textureComplexity: 90,
      finishLength: 85
    },
    requiredTools: [
      {
        id: 'pizza-stone',
        name: 'Cordierite Pizza Baking Stone or Steel',
        category: 'Cookware',
        material: 'Refractory Ceramic Stone',
        purpose: 'Transfers immediate bottom heat for blistered leopard-spotted crust'
      }
    ],
    ingredientsList: [
      { name: 'Pizza dough', amount: '250g fermented dough ball', prepState: 'Room temperature', addedAtMinute: 0, isArchiveSpecialty: false },
      { name: 'San Marzano tomatoes', amount: '120g', prepState: 'Hand-crushed with sea salt', addedAtMinute: 2, isArchiveSpecialty: true },
      { name: 'Fresh mozzarella', amount: '100g (fior di latte)', prepState: 'Torn into bite-sized pieces and drained', addedAtMinute: 4, isArchiveSpecialty: true },
      { name: 'Fresh Basil', amount: '6-8 fresh leaves', prepState: 'Gently torn', addedAtMinute: 9, isArchiveSpecialty: false },
      { name: 'Olive oil', amount: '15ml extra virgin', prepState: 'First cold-pressed', addedAtMinute: 9, isArchiveSpecialty: true }
    ],
    timelineSteps: [
      {
        stepNumber: 1,
        timeOffsetFormatted: '00:00',
        timeOffsetSeconds: 0,
        title: 'Stretch the Dough',
        actionDescription: 'Stretch dough into a round.',
        ingredientAdditions: [{ ingredientName: 'Pizza dough', amount: '250g', technique: 'Hand stretched from center outward' }],
        toolsUsed: ['Pizza Stone'],
        criticalControlPoint: 'Preserve natural gas bubbles in the crust border for airy cornicione.',
        sensoryCue: 'Dough feels supple, elastic, and delicately airy under fingertips.',
        soundscapeType: 'chop',
        spokenNarration: 'Gently stretch the dough into a round.'
      },
      {
        stepNumber: 2,
        timeOffsetFormatted: '02:00',
        timeOffsetSeconds: 120,
        title: 'Spread Crushed Tomatoes',
        actionDescription: 'Spread crushed tomatoes evenly.',
        ingredientAdditions: [{ ingredientName: 'San Marzano tomatoes', amount: '120g', technique: 'Spiral ladle spread' }],
        toolsUsed: ['Ladle'],
        criticalControlPoint: 'Spread evenly leaving a 1-inch border.',
        sensoryCue: 'Sweet, bright aroma of crushed tomatoes blooms.',
        soundscapeType: 'drizzle',
        spokenNarration: 'Spread crushed tomatoes evenly across the dough.'
      },
      {
        stepNumber: 3,
        timeOffsetFormatted: '04:00',
        timeOffsetSeconds: 240,
        title: 'Add Torn Mozzarella Pieces',
        actionDescription: 'Add torn mozzarella pieces.',
        ingredientAdditions: [{ ingredientName: 'Fresh mozzarella', amount: '100g', technique: 'Hand-scattered' }],
        toolsUsed: [],
        criticalControlPoint: 'Ensure mozzarella is well drained.',
        sensoryCue: 'Milky fresh curd fragrance blends with tomato.',
        soundscapeType: 'plating',
        spokenNarration: 'Add torn mozzarella pieces across the sauce.'
      },
      {
        stepNumber: 4,
        timeOffsetFormatted: '05:00',
        timeOffsetSeconds: 300,
        title: 'Bake at 450-500F for 8-10 Minutes',
        actionDescription: 'Bake at 450-500F for 8-10 minutes.',
        ingredientAdditions: [],
        toolsUsed: ['Cordierite Pizza Baking Stone or Steel'],
        criticalControlPoint: 'Bake until crust is blistered and cheese is bubbly.',
        sensoryCue: 'Intense aroma of caramelized crust and bubbling mozzarella.',
        soundscapeType: 'sizzle',
        spokenNarration: 'Bake at high heat until blistered and golden.'
      },
      {
        stepNumber: 5,
        timeOffsetFormatted: '09:00',
        timeOffsetSeconds: 540,
        title: 'Top with Fresh Basil & Olive Oil',
        actionDescription: 'Top with fresh basil and a drizzle of olive oil.',
        ingredientAdditions: [
          { ingredientName: 'Fresh Basil', amount: '6-8 leaves', technique: 'Placed fresh on hot cheese' },
          { ingredientName: 'Olive oil', amount: '15ml', technique: 'Spiral drizzle' }
        ],
        toolsUsed: [],
        criticalControlPoint: 'Add fresh basil right out of the oven to release essential oils.',
        sensoryCue: 'Explosive burst of peppery anise and herbal basil aroma.',
        soundscapeType: 'drizzle',
        spokenNarration: 'Top with fresh basil and a drizzle of olive oil.'
      }
    ],
    platingPresentation: 'Served whole on a rustic wooden board, sliced into triangular wedges.',
    sommelierPairing: {
      vintage: '2021 Aglianico del Vulture DOC',
      terroir: 'Basilicata, Italy',
      tastingNote: 'Crisp red berry acidity pairs effortlessly with sweet tomatoes and melted mozzarella.'
    },
    heroImageUrl: imgMargherita,
    aiImagePrompt: 'Overhead shot of a wood-fired Margherita pizza: blistered leopard-spotted crust, pools of melted fresh mozzarella, bright red crushed tomato sauce, torn basil leaves, glossy olive oil sheen, on a rustic wooden board, warm natural light.',
    createdAt: new Date().toISOString()
  },

  // 2. Spaghetti Carbonara — Italy
  {
    id: 'spaghetti-carbonara-italy',
    recipeNumber: 2,
    primaryIngredientId: 'guanciale-pecorino',
    primaryIngredientName: 'Guanciale & Pecorino Romano',
    dishTitle: 'Spaghetti Carbonara',
    subtitle: 'Silky Roman pasta emulsified with crispy guanciale, eggs, Pecorino Romano, and cracked black pepper',
    cuisine: 'Italian',
    countryRegion: 'Italy',
    tags: ['Pasta', 'Italian', 'Roman', 'Classic', 'Guanciale'],
    overview: 'An iconic masterwork of Roman culinary technique. Al dente spaghetti bound in a luxurious emulsion of eggs, rendered guanciale fat, freshly grated Pecorino cheese, and black pepper.',
    chefRationale: 'Off-heat emulsion using residual pan heat and starchy pasta water creates a velvet-smooth sauce without scrambling.',
    difficulty: 'Intermediate',
    servings: 2,
    totalPrepTimeMinutes: 10,
    totalCookTimeMinutes: 15,
    overallDurationFormatted: '25 min',
    trendScore: 98.9,
    hotnessRank: 2,
    awardBadge: 'World Archive No. 2 • Roman Masterpiece',
    flavorAromaProfile: {
      umami: 96,
      acidity: 30,
      aromaticIntensity: 90,
      textureComplexity: 94,
      finishLength: 92
    },
    requiredTools: [
      {
        id: 'skillet',
        name: 'Heavy-Gauge Skillet',
        category: 'Cookware',
        material: 'Carbon Steel',
        purpose: 'Renders guanciale fat slowly'
      }
    ],
    ingredientsList: [
      { name: 'Spaghetti', amount: '200g', prepState: 'Dry', addedAtMinute: 0, isArchiveSpecialty: false },
      { name: 'Eggs', amount: '2 whole eggs + 2 egg yolks', prepState: 'Whisked', addedAtMinute: 8, isArchiveSpecialty: false },
      { name: 'Pecorino cheese', amount: '60g', prepState: 'Finely grated', addedAtMinute: 8, isArchiveSpecialty: true },
      { name: 'Guanciale or pancetta', amount: '120g', prepState: 'Cut into strips', addedAtMinute: 2, isArchiveSpecialty: true },
      { name: 'Black pepper', amount: '2 tsp', prepState: 'Coarsely cracked', addedAtMinute: 8, isArchiveSpecialty: false }
    ],
    timelineSteps: [
      {
        stepNumber: 1,
        timeOffsetFormatted: '00:00',
        timeOffsetSeconds: 0,
        title: 'Cook Pasta in Salted Boiling Water',
        actionDescription: 'Cook pasta in salted boiling water.',
        ingredientAdditions: [{ ingredientName: 'Spaghetti', amount: '200g', technique: 'Boiled al dente' }],
        toolsUsed: ['Pasta Pot'],
        criticalControlPoint: 'Reserve 1 cup starchy water before draining.',
        sensoryCue: 'Aroma of wheaty pasta in steam.',
        soundscapeType: 'simmer',
        spokenNarration: 'Cook pasta in salted boiling water.'
      },
      {
        stepNumber: 2,
        timeOffsetFormatted: '03:00',
        timeOffsetSeconds: 180,
        title: 'Crisp Guanciale in a Dry Pan',
        actionDescription: 'Crisp guanciale in a dry pan.',
        ingredientAdditions: [{ ingredientName: 'Guanciale or pancetta', amount: '120g', technique: 'Rendered crisp' }],
        toolsUsed: ['Heavy-Gauge Skillet'],
        criticalControlPoint: 'Render on medium-low heat until golden and crispy.',
        sensoryCue: 'Sizzling cured pork fat filling the room.',
        soundscapeType: 'sizzle',
        spokenNarration: 'Crisp guanciale in a dry pan.'
      },
      {
        stepNumber: 3,
        timeOffsetFormatted: '08:00',
        timeOffsetSeconds: 480,
        title: 'Whisk Eggs with Cheese and Pepper',
        actionDescription: 'Whisk eggs with grated cheese and pepper.',
        ingredientAdditions: [
          { ingredientName: 'Eggs', amount: '2 eggs + 2 yolks', technique: 'Whisked' },
          { ingredientName: 'Pecorino cheese', amount: '60g', technique: 'Blended' },
          { ingredientName: 'Black pepper', amount: '2 tsp', technique: 'Cracked' }
        ],
        toolsUsed: ['Whisk', 'Mixing Bowl'],
        criticalControlPoint: 'Create a smooth, creamy golden paste.',
        sensoryCue: 'Sharp aged cheese and peppery aroma.',
        soundscapeType: 'whisk',
        spokenNarration: 'Whisk eggs with grated cheese and pepper.'
      },
      {
        stepNumber: 4,
        timeOffsetFormatted: '11:00',
        timeOffsetSeconds: 660,
        title: 'Toss Hot Pasta with Guanciale',
        actionDescription: 'Toss hot pasta with guanciale.',
        ingredientAdditions: [],
        toolsUsed: ['Tongs'],
        criticalControlPoint: 'Coat pasta in the warm rendered fat.',
        sensoryCue: 'Glossy spaghetti sizzling gently.',
        soundscapeType: 'sizzle',
        spokenNarration: 'Toss hot pasta with guanciale.'
      },
      {
        stepNumber: 5,
        timeOffsetFormatted: '12:00',
        timeOffsetSeconds: 720,
        title: 'Mix in Egg Mixture Until Creamy',
        actionDescription: 'Remove from heat, mix in egg mixture until creamy.',
        ingredientAdditions: [],
        toolsUsed: ['Tongs'],
        criticalControlPoint: 'Work strictly off-heat with pasta water to prevent scrambling.',
        sensoryCue: 'Sauce transforms instantly into a velvety glaze.',
        soundscapeType: 'whisk',
        spokenNarration: 'Remove from heat, mix in egg mixture until creamy.'
      },
      {
        stepNumber: 6,
        timeOffsetFormatted: '14:00',
        timeOffsetSeconds: 840,
        title: 'Serve with Extra Cheese and Pepper',
        actionDescription: 'Serve immediately with extra cheese and pepper.',
        ingredientAdditions: [],
        toolsUsed: ['Plating Tongs'],
        criticalControlPoint: 'Serve piping hot right away.',
        sensoryCue: 'Steam carrying rich pecorino and toasted pepper.',
        soundscapeType: 'plating',
        spokenNarration: 'Serve immediately with extra cheese and pepper.'
      }
    ],
    platingPresentation: 'Twirled into a glossy nest on a white plate with black pepper flecks.',
    sommelierPairing: {
      vintage: '2020 Frascati Superiore DOCG',
      terroir: 'Lazio, Italy',
      tastingNote: 'Crisp minerality cuts through rich egg yolk and savory pork fat.'
    },
    heroImageUrl: imgCarbonara,
    aiImagePrompt: 'Close-up of glossy spaghetti carbonara twirled on a white plate, flecks of black pepper and crisp golden guanciale, creamy egg-cheese coating, grated pecorino on top, soft side lighting.',
    createdAt: new Date().toISOString()
  },

  // 3. Sushi (Nigiri) — Japan
  {
    id: 'sushi-nigiri-japan',
    recipeNumber: 3,
    primaryIngredientId: 'sashimi-grade-fish',
    primaryIngredientName: 'Fresh Sashimi-Grade Fish & Shari Rice',
    dishTitle: 'Sushi (Nigiri)',
    subtitle: 'Hand-pressed vinegared sushi rice draped with fresh sashimi-grade fish, wasabi, and soy sauce',
    cuisine: 'Japanese',
    countryRegion: 'Japan',
    tags: ['Sushi', 'Nigiri', 'Japanese', 'Raw Fish', 'Classic'],
    overview: 'The pinnacle of Japanese sushi craft. Masterfully seasoned vinegared sushi rice pressed into delicate cushions by hand, dabbed with wasabi, and topped with thin sashimi-grade fish.',
    chefRationale: 'Gentle hand pressing ensures air pockets remain within the rice for an ethereal texture.',
    difficulty: 'Master',
    servings: 2,
    totalPrepTimeMinutes: 30,
    totalCookTimeMinutes: 20,
    overallDurationFormatted: '50 min',
    trendScore: 99.1,
    hotnessRank: 3,
    awardBadge: 'World Archive No. 3 • Tokyo Nigiri Atelier',
    flavorAromaProfile: {
      umami: 98,
      acidity: 60,
      aromaticIntensity: 85,
      textureComplexity: 96,
      finishLength: 95
    },
    requiredTools: [
      {
        id: 'sushi-knife',
        name: 'Single-Bevel Yanagiba Knife',
        category: 'Cutlery',
        material: 'High-Carbon Steel',
        purpose: 'Slices fish in single continuous stroke'
      }
    ],
    ingredientsList: [
      { name: 'Sushi rice', amount: '300g', prepState: 'Cooked short-grain rice', addedAtMinute: 0, isArchiveSpecialty: true },
      { name: 'Rice vinegar', amount: '45ml (seasoned with sugar, salt)', prepState: 'Blended', addedAtMinute: 15, isArchiveSpecialty: true },
      { name: 'Fresh sashimi-grade fish', amount: '200g (Tuna / Salmon)', prepState: 'Chilled fillets', addedAtMinute: 25, isArchiveSpecialty: true },
      { name: 'Wasabi', amount: '10g', prepState: 'Grated paste', addedAtMinute: 30, isArchiveSpecialty: true },
      { name: 'Soy sauce', amount: '30ml', prepState: 'Artisanal shoyu', addedAtMinute: 35, isArchiveSpecialty: false }
    ],
    timelineSteps: [
      {
        stepNumber: 1,
        timeOffsetFormatted: '00:00',
        timeOffsetSeconds: 0,
        title: 'Cook Rice & Season with Vinegar, Sugar, Salt',
        actionDescription: 'Cook rice and season with vinegar, sugar, salt.',
        ingredientAdditions: [
          { ingredientName: 'Sushi rice', amount: '300g', technique: 'Cooked' },
          { ingredientName: 'Rice vinegar', amount: '45ml', technique: 'Folded in' }
        ],
        toolsUsed: ['Rice Cooker', 'Hangiri'],
        criticalControlPoint: 'Slice in seasoning with cutting motion while fanning.',
        sensoryCue: 'Bright, sweet vinegar steam rising.',
        soundscapeType: 'simmer',
        spokenNarration: 'Cook rice and season with vinegar, sugar, and salt.'
      },
      {
        stepNumber: 2,
        timeOffsetFormatted: '15:00',
        timeOffsetSeconds: 900,
        title: 'Let Rice Cool to Room Temperature',
        actionDescription: 'Let rice cool to room temperature.',
        ingredientAdditions: [],
        toolsUsed: [],
        criticalControlPoint: 'Keep covered with a damp cloth; do not refrigerate.',
        sensoryCue: 'Gleaming, pearl-like rice grains.',
        soundscapeType: 'plating',
        spokenNarration: 'Let rice cool to room temperature.'
      },
      {
        stepNumber: 3,
        timeOffsetFormatted: '25:00',
        timeOffsetSeconds: 1500,
        title: 'Slice Fish into Thin Even Pieces',
        actionDescription: 'Slice fish into thin even pieces.',
        ingredientAdditions: [{ ingredientName: 'Fresh sashimi-grade fish', amount: '200g', technique: 'Slices cut' }],
        toolsUsed: ['Single-Bevel Yanagiba Knife'],
        criticalControlPoint: 'Slice in a single smooth pull.',
        sensoryCue: 'Mirror-like clean fish cuts.',
        soundscapeType: 'chop',
        spokenNarration: 'Slice fish into thin even pieces.'
      },
      {
        stepNumber: 4,
        timeOffsetFormatted: '30:00',
        timeOffsetSeconds: 1800,
        title: 'Shape Rice into Small Ovals by Hand',
        actionDescription: 'Shape rice into small ovals by hand.',
        ingredientAdditions: [],
        toolsUsed: [],
        criticalControlPoint: 'Use gentle two-finger pressure.',
        sensoryCue: 'Supple rice pillow holding shape.',
        soundscapeType: 'plating',
        spokenNarration: 'Shape rice into small ovals by hand.'
      },
      {
        stepNumber: 5,
        timeOffsetFormatted: '32:00',
        timeOffsetSeconds: 1920,
        title: 'Press a Dab of Wasabi onto Rice',
        actionDescription: 'Press a dab of wasabi onto rice.',
        ingredientAdditions: [{ ingredientName: 'Wasabi', amount: 'Dab', technique: 'Applied' }],
        toolsUsed: [],
        criticalControlPoint: 'Keep dab centered on the rice.',
        sensoryCue: 'Sharp herbal wasabi fragrance.',
        soundscapeType: 'plating',
        spokenNarration: 'Press a dab of wasabi onto rice.'
      },
      {
        stepNumber: 6,
        timeOffsetFormatted: '34:00',
        timeOffsetSeconds: 2040,
        title: 'Lay Fish Over Rice and Press Gently',
        actionDescription: 'Lay fish over rice and press gently.',
        ingredientAdditions: [],
        toolsUsed: [],
        criticalControlPoint: 'Mold fish and rice into a seamless unit.',
        sensoryCue: 'Glossy raw fish draped over white rice.',
        soundscapeType: 'plating',
        spokenNarration: 'Lay fish over rice and press gently.'
      },
      {
        stepNumber: 7,
        timeOffsetFormatted: '36:00',
        timeOffsetSeconds: 2160,
        title: 'Serve with Soy Sauce for Dipping',
        actionDescription: 'Serve with soy sauce for dipping.',
        ingredientAdditions: [{ ingredientName: 'Soy sauce', amount: 'For dipping', technique: 'Table-side' }],
        toolsUsed: [],
        criticalControlPoint: 'Dip fish side into soy sauce.',
        sensoryCue: 'Savory aroma of aged soy.',
        soundscapeType: 'plating',
        spokenNarration: 'Serve with soy sauce for dipping.'
      }
    ],
    platingPresentation: 'Arranged in a line on a dark wooden sushi board with pickled ginger.',
    sommelierPairing: {
      vintage: 'Dassai 23 Junmai Daiginjo Sake',
      terroir: 'Yamaguchi, Japan',
      tastingNote: 'Delicate floral and melon notes elevate raw fish sweetness.'
    },
    heroImageUrl: imgSushi,
    aiImagePrompt: 'Macro shot of nigiri sushi pieces in a row: glossy raw tuna and salmon draped over hand-pressed vinegared rice, tiny dab of wasabi, dark wooden sushi board, small dish of soy sauce beside it.',
    createdAt: new Date().toISOString()
  },

  // 4. Ramen — Japan
  {
    id: 'ramen-japan',
    recipeNumber: 4,
    primaryIngredientId: 'ramen-broth-tare',
    primaryIngredientName: 'Rich Broth & Alkaline Noodles',
    dishTitle: 'Ramen',
    subtitle: 'Steaming bowl of ramen noodles coiled in rich broth with jammy soft-boiled egg, scallions, and nori',
    cuisine: 'Japanese',
    countryRegion: 'Japan',
    tags: ['Noodles', 'Ramen', 'Japanese', 'Soup', 'Comfort'],
    overview: 'A deeply satisfying Japanese noodle classic. Rich broth seasoned with soy sauce or miso tare, holding curly noodles, halved soft-boiled eggs, sliced scallions, and crisp nori.',
    chefRationale: 'Simmering aromatics deeply into broth pairs with chewy alkaline noodles for quintessential comfort.',
    difficulty: 'Intermediate',
    servings: 2,
    totalPrepTimeMinutes: 20,
    totalCookTimeMinutes: 40,
    overallDurationFormatted: '60 min',
    trendScore: 99.3,
    hotnessRank: 4,
    awardBadge: 'World Archive No. 4 • Tokyo Ramen',
    flavorAromaProfile: {
      umami: 100,
      acidity: 35,
      aromaticIntensity: 96,
      textureComplexity: 92,
      finishLength: 98
    },
    requiredTools: [
      {
        id: 'ramen-basket',
        name: 'Noodle Strainer Basket',
        category: 'Cookware',
        material: 'Stainless Steel Mesh',
        purpose: 'Drains noodles thoroughly'
      }
    ],
    ingredientsList: [
      { name: 'Ramen noodles', amount: '2 portions', prepState: 'Fresh alkaline noodles', addedAtMinute: 25, isArchiveSpecialty: true },
      { name: 'Pork or chicken broth', amount: '800ml', prepState: 'Simmering hot', addedAtMinute: 0, isArchiveSpecialty: false },
      { name: 'Soy sauce or miso', amount: '45ml tare', prepState: 'Concentrated', addedAtMinute: 20, isArchiveSpecialty: true },
      { name: 'Soft-boiled egg', amount: '2 eggs', prepState: 'Halved jammy eggs', addedAtMinute: 30, isArchiveSpecialty: true },
      { name: 'Scallions', amount: '2 stalks', prepState: 'Sliced', addedAtMinute: 30, isArchiveSpecialty: false },
      { name: 'Nori', amount: '2 sheets', prepState: 'Dried seaweed', addedAtMinute: 30, isArchiveSpecialty: false }
    ],
    timelineSteps: [
      {
        stepNumber: 1,
        timeOffsetFormatted: '00:00',
        timeOffsetSeconds: 0,
        title: 'Simmer Broth with Aromatics for Several Hours',
        actionDescription: 'Simmer broth with aromatics for several hours.',
        ingredientAdditions: [{ ingredientName: 'Pork or chicken broth', amount: '800ml', technique: 'Simmered' }],
        toolsUsed: ['Stock Pot'],
        criticalControlPoint: 'Keep at gentle simmer to build rich body.',
        sensoryCue: 'Savory broth steam filling the kitchen.',
        soundscapeType: 'simmer',
        spokenNarration: 'Simmer broth with aromatics for several hours.'
      },
      {
        stepNumber: 2,
        timeOffsetFormatted: '20:00',
        timeOffsetSeconds: 1200,
        title: 'Season Broth with Soy Sauce or Miso Tare',
        actionDescription: 'Season broth with soy sauce or miso tare.',
        ingredientAdditions: [{ ingredientName: 'Soy sauce or miso', amount: '45ml', technique: 'Dissolved in bowl' }],
        toolsUsed: ['Ladle'],
        criticalControlPoint: 'Add tare into bowl first for even flavor.',
        sensoryCue: 'Toasted soy and fermented miso aromatics.',
        soundscapeType: 'drizzle',
        spokenNarration: 'Season broth with soy sauce or miso tare.'
      },
      {
        stepNumber: 3,
        timeOffsetFormatted: '25:00',
        timeOffsetSeconds: 1500,
        title: 'Cook Noodles Separately Until Just Done',
        actionDescription: 'Cook noodles separately until just done.',
        ingredientAdditions: [{ ingredientName: 'Ramen noodles', amount: '2 portions', technique: 'Boiled' }],
        toolsUsed: ['Noodle Strainer Basket'],
        criticalControlPoint: 'Boil vigorously and drain completely.',
        sensoryCue: 'Springy noodle texture.',
        soundscapeType: 'simmer',
        spokenNarration: 'Cook noodles separately until just done.'
      },
      {
        stepNumber: 4,
        timeOffsetFormatted: '27:00',
        timeOffsetSeconds: 1620,
        title: 'Place Noodles in a Bowl',
        actionDescription: 'Place noodles in a bowl.',
        ingredientAdditions: [],
        toolsUsed: [],
        criticalControlPoint: 'Fold neatly into bowl base.',
        sensoryCue: 'Curly noodles glistening.',
        soundscapeType: 'plating',
        spokenNarration: 'Place noodles in a bowl.'
      },
      {
        stepNumber: 5,
        timeOffsetFormatted: '28:00',
        timeOffsetSeconds: 1680,
        title: 'Ladle Hot Broth Over Noodles',
        actionDescription: 'Ladle hot broth over noodles.',
        ingredientAdditions: [],
        toolsUsed: ['Ladle'],
        criticalControlPoint: 'Ladle boiling broth so everything is steaming.',
        sensoryCue: 'Aromatic steam rising.',
        soundscapeType: 'simmer',
        spokenNarration: 'Ladle hot broth over noodles.'
      },
      {
        stepNumber: 6,
        timeOffsetFormatted: '30:00',
        timeOffsetSeconds: 1800,
        title: 'Top with Egg, Scallions, and Nori',
        actionDescription: 'Top with egg, scallions, and nori.',
        ingredientAdditions: [
          { ingredientName: 'Soft-boiled egg', amount: '2 halves', technique: 'Placed on top' },
          { ingredientName: 'Scallions', amount: 'Sliced', technique: 'Scattered' },
          { ingredientName: 'Nori', amount: '2 sheets', technique: 'Propped on side' }
        ],
        toolsUsed: ['Chopsticks'],
        criticalControlPoint: 'Keep nori crisp until eating.',
        sensoryCue: 'Vibrant golden egg yolk and scallion brightness.',
        soundscapeType: 'plating',
        spokenNarration: 'Top with egg, scallions, and nori.'
      },
      {
        stepNumber: 7,
        timeOffsetFormatted: '32:00',
        timeOffsetSeconds: 1920,
        title: 'Serve Immediately While Hot',
        actionDescription: 'Serve immediately while hot.',
        ingredientAdditions: [],
        toolsUsed: [],
        criticalControlPoint: 'Enjoy immediately.',
        sensoryCue: 'Piping hot steam.',
        soundscapeType: 'plating',
        spokenNarration: 'Serve immediately while hot.'
      }
    ],
    platingPresentation: 'Served in a ceramic donburi bowl with chopsticks propped across the rim.',
    sommelierPairing: {
      vintage: 'Japanese Lager Beer',
      terroir: 'Tokyo, Japan',
      tastingNote: 'Crisp dry effervescence clears rich pork broth.'
    },
    heroImageUrl: imgRamen,
    aiImagePrompt: 'Steamy bowl of ramen shot from above: curly noodles coiled in rich brown broth, a jammy soft-boiled egg halved on top, sheets of nori, sliced scallions, chashu pork slices, chopsticks resting on the bowl.',
    createdAt: new Date().toISOString()
  },

  // 5. Pad Thai — Thailand
  {
    id: 'pad-thai-thailand',
    recipeNumber: 5,
    primaryIngredientId: 'tamarind-rice-noodles',
    primaryIngredientName: 'Tamarind Paste & Rice Noodles',
    dishTitle: 'Pad Thai',
    subtitle: 'Vibrant stir-fried rice noodles with shrimp, egg ribbons, bean sprouts, crushed peanuts, and lime',
    cuisine: 'Thai',
    countryRegion: 'Thailand',
    tags: ['Noodles', 'Pad Thai', 'Thai', 'Wok-Fried', 'Street Food'],
    overview: 'Thailand’s legendary street food dish. Flat rice noodles stir-fried with shrimp or chicken, tamarind paste, fish sauce, eggs, crunchy bean sprouts, and roasted crushed peanuts.',
    chefRationale: 'Stir-frying on high wok heat produces intense aroma and sweet-tangy caramelization.',
    difficulty: 'Intermediate',
    servings: 2,
    totalPrepTimeMinutes: 15,
    totalCookTimeMinutes: 10,
    overallDurationFormatted: '25 min',
    trendScore: 98.7,
    hotnessRank: 5,
    awardBadge: 'World Archive No. 5 • Bangkok Wok',
    flavorAromaProfile: {
      umami: 92,
      acidity: 85,
      aromaticIntensity: 94,
      textureComplexity: 95,
      finishLength: 90
    },
    requiredTools: [
      {
        id: 'wok',
        name: 'Carbon Steel Wok',
        category: 'Cookware',
        material: 'Carbon Steel',
        purpose: 'Imparts quick wok sear'
      }
    ],
    ingredientsList: [
      { name: 'Rice noodles', amount: '180g', prepState: 'Soaked pliable', addedAtMinute: 4, isArchiveSpecialty: false },
      { name: 'Shrimp or chicken', amount: '150g', prepState: 'Peeled shrimp', addedAtMinute: 2, isArchiveSpecialty: false },
      { name: 'Eggs', amount: '2 eggs', prepState: 'Lightly beaten', addedAtMinute: 3, isArchiveSpecialty: false },
      { name: 'Tamarind paste', amount: '3 tbsp', prepState: 'Pulp extract', addedAtMinute: 5, isArchiveSpecialty: true },
      { name: 'Fish sauce', amount: '2 tbsp', prepState: 'Authentic Thai sauce', addedAtMinute: 5, isArchiveSpecialty: true },
      { name: 'Bean sprouts', amount: '100g', prepState: 'Fresh', addedAtMinute: 7, isArchiveSpecialty: false },
      { name: 'Peanuts', amount: '40g', prepState: 'Roasted and crushed', addedAtMinute: 8, isArchiveSpecialty: false }
    ],
    timelineSteps: [
      {
        stepNumber: 1,
        timeOffsetFormatted: '00:00',
        timeOffsetSeconds: 0,
        title: 'Soak Rice Noodles Until Pliable',
        actionDescription: 'Soak rice noodles until pliable.',
        ingredientAdditions: [{ ingredientName: 'Rice noodles', amount: '180g', technique: 'Soaked' }],
        toolsUsed: ['Bowl'],
        criticalControlPoint: 'Soak in warm water until flexible but firm.',
        sensoryCue: 'Noodles turn white and pliable.',
        soundscapeType: 'plating',
        spokenNarration: 'Soak rice noodles until pliable.'
      },
      {
        stepNumber: 2,
        timeOffsetFormatted: '02:00',
        timeOffsetSeconds: 120,
        title: 'Stir-Fry Protein Until Cooked',
        actionDescription: 'Stir-fry protein until cooked.',
        ingredientAdditions: [{ ingredientName: 'Shrimp or chicken', amount: '150g', technique: 'Wok seared' }],
        toolsUsed: ['Carbon Steel Wok'],
        criticalControlPoint: 'Sear on high heat until pink and firm.',
        sensoryCue: 'Sweet shellfish sizzle.',
        soundscapeType: 'sizzle',
        spokenNarration: 'Stir-fry protein until cooked.'
      },
      {
        stepNumber: 3,
        timeOffsetFormatted: '03:30',
        timeOffsetSeconds: 210,
        title: 'Push Aside, Scramble Egg in the Pan',
        actionDescription: 'Push aside, scramble egg in the pan.',
        ingredientAdditions: [{ ingredientName: 'Eggs', amount: '2 eggs', technique: 'Scrambled' }],
        toolsUsed: ['Wok Spatula'],
        criticalControlPoint: 'Form soft golden ribbons.',
        sensoryCue: 'Egg clouds puffing in hot oil.',
        soundscapeType: 'sizzle',
        spokenNarration: 'Push aside, scramble egg in the pan.'
      },
      {
        stepNumber: 4,
        timeOffsetFormatted: '05:00',
        timeOffsetSeconds: 300,
        title: 'Add Noodles and Sauce (Tamarind, Fish Sauce, Sugar)',
        actionDescription: 'Add noodles and sauce (tamarind, fish sauce, sugar).',
        ingredientAdditions: [
          { ingredientName: 'Tamarind paste', amount: '3 tbsp', technique: 'Tossed' },
          { ingredientName: 'Fish sauce', amount: '2 tbsp', technique: 'Tossed' }
        ],
        toolsUsed: ['Wok Spatula'],
        criticalControlPoint: 'Coat noodles thoroughly under high heat.',
        sensoryCue: 'Sweet-tangy tamarind vapor.',
        soundscapeType: 'flame',
        spokenNarration: 'Add noodles and sauce, tossing rapidly.'
      },
      {
        stepNumber: 5,
        timeOffsetFormatted: '07:30',
        timeOffsetSeconds: 450,
        title: 'Toss Everything with Bean Sprouts',
        actionDescription: 'Toss everything with bean sprouts.',
        ingredientAdditions: [{ ingredientName: 'Bean sprouts', amount: '100g', technique: 'Folded' }],
        toolsUsed: ['Wok Spatula'],
        criticalControlPoint: 'Keep cooking brief to retain bean sprout crunch.',
        sensoryCue: 'Crisp vegetable freshness.',
        soundscapeType: 'sizzle',
        spokenNarration: 'Toss everything with bean sprouts.'
      },
      {
        stepNumber: 6,
        timeOffsetFormatted: '08:30',
        timeOffsetSeconds: 510,
        title: 'Top with Crushed Peanuts and a Lime Wedge',
        actionDescription: 'Top with crushed peanuts and a lime wedge.',
        ingredientAdditions: [{ ingredientName: 'Peanuts', amount: '40g', technique: 'Scattered' }],
        toolsUsed: ['Plating Tongs'],
        criticalControlPoint: 'Garnish with chili flakes and lime.',
        sensoryCue: 'Roasted peanut fragrance and citrus zest.',
        soundscapeType: 'plating',
        spokenNarration: 'Top with crushed peanuts and a lime wedge.'
      }
    ],
    platingPresentation: 'Served on a vibrant plate with crushed peanuts, lime wedge, and chili flakes on the side.',
    sommelierPairing: {
      vintage: '2021 Riesling Kabinett',
      terroir: 'Mosel, Germany',
      tastingNote: 'Crisp sweetness pairs with tamarind tang and roasted peanuts.'
    },
    heroImageUrl: imgPadThai,
    aiImagePrompt: 'Vibrant plate of pad thai stir-fried noodles glistening with sauce, pink shrimp, scrambled egg ribbons, bean sprouts, crushed peanuts scattered on top, lime wedge and chili flakes on the side.',
    createdAt: new Date().toISOString()
  },

  // 6. Green Curry — Thailand
  {
    id: 'green-curry-thailand',
    recipeNumber: 6,
    primaryIngredientId: 'green-curry-coconut',
    primaryIngredientName: 'Green Curry Paste & Coconut Milk',
    dishTitle: 'Green Curry',
    subtitle: 'Vivid green Thai coconut curry with chicken, purple eggplant, and torn Thai basil',
    cuisine: 'Thai',
    countryRegion: 'Thailand',
    tags: ['Curry', 'Thai', 'Green Curry', 'Coconut', 'Spicy'],
    overview: 'A fragrant emerald jewel of Thai cooking. Green curry paste simmered in creamy coconut milk with chicken, purple eggplant, fish sauce, and sweet Thai basil leaves.',
    chefRationale: 'Blooming the paste in coconut cream extracts deep herbal terpenes for aroma and color.',
    difficulty: 'Intermediate',
    servings: 2,
    totalPrepTimeMinutes: 15,
    totalCookTimeMinutes: 20,
    overallDurationFormatted: '35 min',
    trendScore: 98.4,
    hotnessRank: 6,
    awardBadge: 'World Archive No. 6 • Royal Thai',
    flavorAromaProfile: {
      umami: 90,
      acidity: 50,
      aromaticIntensity: 98,
      textureComplexity: 88,
      finishLength: 94
    },
    requiredTools: [
      {
        id: 'curry-pot',
        name: 'Heavy Base Pot',
        category: 'Cookware',
        material: 'Stainless Steel',
        purpose: 'Simmers coconut milk evenly'
      }
    ],
    ingredientsList: [
      { name: 'Green curry paste', amount: '3 tbsp', prepState: 'Pounded paste', addedAtMinute: 0, isArchiveSpecialty: true },
      { name: 'Coconut milk', amount: '400ml', prepState: 'Rich coconut milk', addedAtMinute: 0, isArchiveSpecialty: false },
      { name: 'Chicken', amount: '250g', prepState: 'Bite-sized pieces', addedAtMinute: 5, isArchiveSpecialty: false },
      { name: 'Thai basil', amount: '1 cup', prepState: 'Fresh leaves', addedAtMinute: 18, isArchiveSpecialty: true },
      { name: 'Eggplant', amount: '100g', prepState: 'Quartered', addedAtMinute: 10, isArchiveSpecialty: true },
      { name: 'Fish sauce', amount: '2 tbsp', prepState: 'Seasoned', addedAtMinute: 12, isArchiveSpecialty: true }
    ],
    timelineSteps: [
      {
        stepNumber: 1,
        timeOffsetFormatted: '00:00',
        timeOffsetSeconds: 0,
        title: 'Fry Curry Paste in Oil Until Fragrant',
        actionDescription: 'Fry curry paste in oil until fragrant.',
        ingredientAdditions: [{ ingredientName: 'Green curry paste', amount: '3 tbsp', technique: 'Fried in oil' }],
        toolsUsed: ['Curry Pot'],
        criticalControlPoint: 'Bloom paste on medium heat without scorching.',
        sensoryCue: 'Intense aroma of lemongrass, green chilies, and galangal.',
        soundscapeType: 'sizzle',
        spokenNarration: 'Fry curry paste in oil until fragrant.'
      },
      {
        stepNumber: 2,
        timeOffsetFormatted: '04:00',
        timeOffsetSeconds: 240,
        title: 'Add Thick Coconut Milk and Stir to Combine',
        actionDescription: 'Add thick coconut milk and stir to combine.',
        ingredientAdditions: [{ ingredientName: 'Coconut milk', amount: '200ml', technique: 'Stirred in' }],
        toolsUsed: ['Wooden Spoon'],
        criticalControlPoint: 'Emulsify into a smooth emerald sauce.',
        sensoryCue: 'Creamy green broth shimmering.',
        soundscapeType: 'simmer',
        spokenNarration: 'Add thick coconut milk and stir to combine.'
      },
      {
        stepNumber: 3,
        timeOffsetFormatted: '06:00',
        timeOffsetSeconds: 360,
        title: 'Add Chicken and Simmer Until Cooked',
        actionDescription: 'Add chicken and simmer until cooked.',
        ingredientAdditions: [{ ingredientName: 'Chicken', amount: '250g', technique: 'Simmered' }],
        toolsUsed: [],
        criticalControlPoint: 'Keep at gentle simmer for tender chicken.',
        sensoryCue: 'Sweet coconut and savory chicken steam.',
        soundscapeType: 'simmer',
        spokenNarration: 'Add chicken and simmer until cooked.'
      },
      {
        stepNumber: 4,
        timeOffsetFormatted: '12:00',
        timeOffsetSeconds: 720,
        title: 'Add Eggplant and Remaining Coconut Milk',
        actionDescription: 'Add eggplant and remaining coconut milk.',
        ingredientAdditions: [
          { ingredientName: 'Eggplant', amount: '100g', technique: 'Added' },
          { ingredientName: 'Coconut milk', amount: '200ml', technique: 'Added' }
        ],
        toolsUsed: [],
        criticalControlPoint: 'Simmer until eggplant is tender.',
        sensoryCue: 'Eggplant softening in green curry.',
        soundscapeType: 'simmer',
        spokenNarration: 'Add eggplant and remaining coconut milk.'
      },
      {
        stepNumber: 5,
        timeOffsetFormatted: '16:00',
        timeOffsetSeconds: 960,
        title: 'Season with Fish Sauce and a Little Sugar',
        actionDescription: 'Season with fish sauce and a little sugar.',
        ingredientAdditions: [{ ingredientName: 'Fish sauce', amount: '2 tbsp', technique: 'Balanced' }],
        toolsUsed: ['Tasting Spoon'],
        criticalControlPoint: 'Balance salty, sweet, and spicy flavors.',
        sensoryCue: 'Harmonious spicy-sweet aroma.',
        soundscapeType: 'simmer',
        spokenNarration: 'Season with fish sauce and a little sugar.'
      },
      {
        stepNumber: 6,
        timeOffsetFormatted: '18:00',
        timeOffsetSeconds: 1080,
        title: 'Stir in Basil Leaves Just Before Serving',
        actionDescription: 'Stir in basil leaves just before serving.',
        ingredientAdditions: [{ ingredientName: 'Thai basil', amount: '1 cup', technique: 'Wilted off-heat' }],
        toolsUsed: [],
        criticalControlPoint: 'Fold in off-heat to preserve aroma and vibrant green.',
        sensoryCue: 'Fragrant sweet anise herbal burst.',
        soundscapeType: 'plating',
        spokenNarration: 'Stir in basil leaves just before serving.'
      }
    ],
    platingPresentation: 'Served in a bowl with white jasmine rice on the side.',
    sommelierPairing: {
      vintage: '2020 Vouvray Demi-Sec',
      terroir: 'Loire, France',
      tastingNote: 'Honeyed fruit balances spicy green chilies and creamy coconut.'
    },
    heroImageUrl: imgGreenCurry,
    aiImagePrompt: 'Bowl of vivid green Thai curry with chicken pieces and purple eggplant floating in a creamy coconut sauce, torn Thai basil leaves on top, steam rising, served beside a mound of white rice.',
    createdAt: new Date().toISOString()
  },

  // 7. Butter Chicken — India
  {
    id: 'butter-chicken-india',
    recipeNumber: 7,
    primaryIngredientId: 'butter-chicken-makhani',
    primaryIngredientName: 'Tandoori Chicken & Butter Makhani Sauce',
    dishTitle: 'Butter Chicken',
    subtitle: 'Charred tandoori chicken simmered in a rich tomato, butter, and cream sauce with cilantro and naan',
    cuisine: 'Indian',
    countryRegion: 'India',
    tags: ['Curry', 'Indian', 'Butter Chicken', 'Makhani', 'Tandoori'],
    overview: 'A world-beloved classic of North Indian cuisine. Charred spiced chicken pieces simmered in a glossy orange-red sauce of tomato puree, butter, cream, and garam masala, garnished with fresh cilantro.',
    chefRationale: 'High-heat charring on chicken combined with smooth tomato-butter sauce delivers balanced smokiness and velvet richness.',
    difficulty: 'Intermediate',
    servings: 2,
    totalPrepTimeMinutes: 20,
    totalCookTimeMinutes: 30,
    overallDurationFormatted: '50 min',
    trendScore: 99.0,
    hotnessRank: 7,
    awardBadge: 'World Archive No. 7 • Delhi Makhani',
    flavorAromaProfile: {
      umami: 96,
      acidity: 65,
      aromaticIntensity: 98,
      textureComplexity: 92,
      finishLength: 96
    },
    requiredTools: [
      {
        id: 'blender',
        name: 'Immersion Blender',
        category: 'Cookware',
        material: 'Stainless Steel',
        purpose: 'Blends tomato sauce into satin consistency'
      }
    ],
    ingredientsList: [
      { name: 'Chicken', amount: '350g', prepState: 'Bite-sized chunks', addedAtMinute: 0, isArchiveSpecialty: false },
      { name: 'Yogurt', amount: '100g', prepState: 'Spiced yogurt marinade', addedAtMinute: 0, isArchiveSpecialty: false },
      { name: 'Tomato puree', amount: '300g', prepState: 'Smooth puree', addedAtMinute: 15, isArchiveSpecialty: true },
      { name: 'Butter', amount: '50g', prepState: 'Cold cubes', addedAtMinute: 18, isArchiveSpecialty: true },
      { name: 'Cream', amount: '60ml', prepState: 'Heavy cream', addedAtMinute: 25, isArchiveSpecialty: false },
      { name: 'Garam masala', amount: '1.5 tsp', prepState: 'Ground spice blend', addedAtMinute: 22, isArchiveSpecialty: true }
    ],
    timelineSteps: [
      {
        stepNumber: 1,
        timeOffsetFormatted: '00:00',
        timeOffsetSeconds: 0,
        title: 'Marinate Chicken in Yogurt & Spices',
        actionDescription: 'Marinate chicken in yogurt and spices for at least 1 hour.',
        ingredientAdditions: [
          { ingredientName: 'Chicken', amount: '350g', technique: 'Marinated' },
          { ingredientName: 'Yogurt', amount: '100g', technique: 'Mixed with spices' }
        ],
        toolsUsed: ['Bowl'],
        criticalControlPoint: 'Allow spices and yogurt enzymes to tenderize.',
        sensoryCue: 'Warm clove and cardamom fragrance.',
        soundscapeType: 'chop',
        spokenNarration: 'Marinate chicken in yogurt and spices for at least one hour.'
      },
      {
        stepNumber: 2,
        timeOffsetFormatted: '10:00',
        timeOffsetSeconds: 600,
        title: 'Grill or Pan-Sear Chicken Until Charred',
        actionDescription: 'Grill or pan-sear chicken until charred.',
        ingredientAdditions: [],
        toolsUsed: ['Grill Pan'],
        criticalControlPoint: 'Sear on high heat to create smoky charred edges.',
        sensoryCue: 'Sizzling tandoori spiced aroma.',
        soundscapeType: 'flame',
        spokenNarration: 'Grill or pan-sear chicken until charred.'
      },
      {
        stepNumber: 3,
        timeOffsetFormatted: '15:00',
        timeOffsetSeconds: 900,
        title: 'Simmer Tomato Puree with Butter and Spices',
        actionDescription: 'Simmer tomato puree with butter and spices.',
        ingredientAdditions: [
          { ingredientName: 'Tomato puree', amount: '300g', technique: 'Simmered' },
          { ingredientName: 'Butter', amount: '25g', technique: 'Melted' }
        ],
        toolsUsed: ['Pot'],
        criticalControlPoint: 'Cook until tomato acidity mellows.',
        sensoryCue: 'Sweet spiced tomato aroma.',
        soundscapeType: 'simmer',
        spokenNarration: 'Simmer tomato puree with butter and spices.'
      },
      {
        stepNumber: 4,
        timeOffsetFormatted: '22:00',
        timeOffsetSeconds: 1320,
        title: 'Blend Sauce Until Smooth If Desired',
        actionDescription: 'Blend sauce until smooth if desired.',
        ingredientAdditions: [{ ingredientName: 'Garam masala', amount: '1.5 tsp', technique: 'Blended' }],
        toolsUsed: ['Immersion Blender'],
        criticalControlPoint: 'Achieve smooth satin texture.',
        sensoryCue: 'Lustrous orange-red sauce.',
        soundscapeType: 'whisk',
        spokenNarration: 'Blend sauce until smooth.'
      },
      {
        stepNumber: 5,
        timeOffsetFormatted: '25:00',
        timeOffsetSeconds: 1500,
        title: 'Stir in Cream',
        actionDescription: 'Stir in cream.',
        ingredientAdditions: [{ ingredientName: 'Cream', amount: '60ml', technique: 'Swirled in' }],
        toolsUsed: ['Whisk'],
        criticalControlPoint: 'Gently incorporate into warm sauce.',
        sensoryCue: 'Velvety cream swirling into red sauce.',
        soundscapeType: 'drizzle',
        spokenNarration: 'Stir in cream.'
      },
      {
        stepNumber: 6,
        timeOffsetFormatted: '28:00',
        timeOffsetSeconds: 1680,
        title: 'Add Cooked Chicken and Simmer 10 Minutes',
        actionDescription: 'Add cooked chicken and simmer 10 minutes.',
        ingredientAdditions: [],
        toolsUsed: [],
        criticalControlPoint: 'Allow chicken to absorb the makhani sauce.',
        sensoryCue: 'Rich sauce bubbling with chicken.',
        soundscapeType: 'simmer',
        spokenNarration: 'Add cooked chicken and simmer 10 minutes.'
      },
      {
        stepNumber: 7,
        timeOffsetFormatted: '38:00',
        timeOffsetSeconds: 2280,
        title: 'Garnish with Cilantro and Serve with Rice or Naan',
        actionDescription: 'Garnish with cilantro and serve with rice or naan.',
        ingredientAdditions: [],
        toolsUsed: ['Serving Bowl'],
        criticalControlPoint: 'Serve hot with warm naan bread.',
        sensoryCue: 'Fresh cilantro and butter aroma.',
        soundscapeType: 'plating',
        spokenNarration: 'Garnish with cilantro and serve with rice or naan.'
      }
    ],
    platingPresentation: 'Served in a bowl with cream swirl, fresh cilantro, and torn naan bread beside it.',
    sommelierPairing: {
      vintage: '2019 Gewürztraminer',
      terroir: 'Alsace, France',
      tastingNote: 'Lychee and rose notes complement garam masala and buttery richness.'
    },
    heroImageUrl: imgButterChicken,
    aiImagePrompt: 'Close-up bowl of butter chicken: charred tandoori chicken pieces submerged in a glossy orange-red creamy tomato sauce, swirl of cream on top, fresh cilantro leaves, naan bread torn beside the bowl.',
    createdAt: new Date().toISOString()
  },

  // 8. Chicken Tikka Masala — India
  {
    id: 'chicken-tikka-masala-india',
    recipeNumber: 8,
    primaryIngredientId: 'chicken-tikka-curry',
    primaryIngredientName: 'Charred Chicken Tikka & Masala Sauce',
    dishTitle: 'Chicken Tikka Masala',
    subtitle: 'Charred marinated chicken chunks in a rich, creamy red-orange sauce with ginger-garlic and basmati rice',
    cuisine: 'Indian',
    countryRegion: 'India',
    tags: ['Curry', 'Indian', 'Tikka Masala', 'Tandoori', 'Classic'],
    overview: 'A globally celebrated curry classic. Marinated charred chicken tikka folded into a fragrant, spiced tomato and cream gravy with ginger-garlic paste and garam masala, served with basmati rice.',
    chefRationale: 'Slowly softening onions and roasting spices before adding cream creates deep aromatic intensity.',
    difficulty: 'Intermediate',
    servings: 2,
    totalPrepTimeMinutes: 20,
    totalCookTimeMinutes: 30,
    overallDurationFormatted: '50 min',
    trendScore: 98.8,
    hotnessRank: 8,
    awardBadge: 'World Archive No. 8 • Classic Masala',
    flavorAromaProfile: {
      umami: 94,
      acidity: 60,
      aromaticIntensity: 96,
      textureComplexity: 90,
      finishLength: 94
    },
    requiredTools: [
      {
        id: 'skillet-saucepan',
        name: 'Deep Sauté Skillet',
        category: 'Cookware',
        material: 'Stainless Steel',
        purpose: 'Sautés aromatics and simmers sauce'
      }
    ],
    ingredientsList: [
      { name: 'Chicken', amount: '350g boneless', prepState: 'Cubed', addedAtMinute: 0, isArchiveSpecialty: false },
      { name: 'Yogurt', amount: '100g', prepState: 'Plain yogurt', addedAtMinute: 0, isArchiveSpecialty: false },
      { name: 'Tomato sauce', amount: '250g', prepState: 'Crushed tomato sauce', addedAtMinute: 15, isArchiveSpecialty: true },
      { name: 'Cream', amount: '60ml', prepState: 'Heavy cream', addedAtMinute: 22, isArchiveSpecialty: false },
      { name: 'Garam masala', amount: '1.5 tsp', prepState: 'Ground spice', addedAtMinute: 18, isArchiveSpecialty: true },
      { name: 'Ginger-garlic paste', amount: '2 tbsp', prepState: 'Freshly minced paste', addedAtMinute: 0, isArchiveSpecialty: true }
    ],
    timelineSteps: [
      {
        stepNumber: 1,
        timeOffsetFormatted: '00:00',
        timeOffsetSeconds: 0,
        title: 'Marinate Chicken in Yogurt, Ginger-Garlic and Spices',
        actionDescription: 'Marinate chicken in yogurt, ginger-garlic and spices.',
        ingredientAdditions: [
          { ingredientName: 'Chicken', amount: '350g', technique: 'Marinated' },
          { ingredientName: 'Yogurt', amount: '100g', technique: 'Mixed' },
          { ingredientName: 'Ginger-garlic paste', amount: '1 tbsp', technique: 'Mixed' }
        ],
        toolsUsed: ['Bowl'],
        criticalControlPoint: 'Ensure chicken is evenly coated.',
        sensoryCue: 'Pungent ginger, garlic, and spice aroma.',
        soundscapeType: 'chop',
        spokenNarration: 'Marinate chicken in yogurt, ginger-garlic, and spices.'
      },
      {
        stepNumber: 2,
        timeOffsetFormatted: '10:00',
        timeOffsetSeconds: 600,
        title: 'Grill Chicken Until Lightly Charred',
        actionDescription: 'Grill chicken until lightly charred.',
        ingredientAdditions: [],
        toolsUsed: ['Grill Pan'],
        criticalControlPoint: 'Sear quickly to develop char marks.',
        sensoryCue: 'Sizzling tandoori aroma.',
        soundscapeType: 'flame',
        spokenNarration: 'Grill chicken until lightly charred.'
      },
      {
        stepNumber: 3,
        timeOffsetFormatted: '14:00',
        timeOffsetSeconds: 840,
        title: 'Saute Onions Until Soft, Add Tomato Sauce',
        actionDescription: 'Saute onions until soft, add tomato sauce.',
        ingredientAdditions: [{ ingredientName: 'Tomato sauce', amount: '250g', technique: 'Simmered' }],
        toolsUsed: ['Deep Sauté Skillet'],
        criticalControlPoint: 'Cook onions until translucent and golden.',
        sensoryCue: 'Sweet sautéed onion and tomato aroma.',
        soundscapeType: 'sizzle',
        spokenNarration: 'Saute onions until soft, then add tomato sauce.'
      },
      {
        stepNumber: 4,
        timeOffsetFormatted: '18:00',
        timeOffsetSeconds: 1080,
        title: 'Add Garam Masala and Simmer',
        actionDescription: 'Add garam masala and simmer.',
        ingredientAdditions: [{ ingredientName: 'Garam masala', amount: '1.5 tsp', technique: 'Bloomed' }],
        toolsUsed: [],
        criticalControlPoint: 'Simmer spices into the tomato base.',
        sensoryCue: 'Warm aromatic spice cloud.',
        soundscapeType: 'simmer',
        spokenNarration: 'Add garam masala and simmer.'
      },
      {
        stepNumber: 5,
        timeOffsetFormatted: '22:00',
        timeOffsetSeconds: 1320,
        title: 'Stir in Cream',
        actionDescription: 'Stir in cream.',
        ingredientAdditions: [{ ingredientName: 'Cream', amount: '60ml', technique: 'Swirled' }],
        toolsUsed: ['Whisk'],
        criticalControlPoint: 'Incorporate smoothly into the red sauce.',
        sensoryCue: 'Sauce turns into a luminous orange-red.',
        soundscapeType: 'drizzle',
        spokenNarration: 'Stir in cream.'
      },
      {
        stepNumber: 6,
        timeOffsetFormatted: '24:00',
        timeOffsetSeconds: 1440,
        title: 'Add Grilled Chicken to the Sauce',
        actionDescription: 'Add grilled chicken to the sauce.',
        ingredientAdditions: [],
        toolsUsed: [],
        criticalControlPoint: 'Fold chicken into simmering sauce.',
        sensoryCue: 'Rich sauce bubbling around chicken.',
        soundscapeType: 'simmer',
        spokenNarration: 'Add grilled chicken to the sauce.'
      },
      {
        stepNumber: 7,
        timeOffsetFormatted: '26:00',
        timeOffsetSeconds: 1560,
        title: 'Simmer Until Thickened',
        actionDescription: 'Simmer until thickened.',
        ingredientAdditions: [],
        toolsUsed: [],
        criticalControlPoint: 'Reduce until gravy clings to chicken pieces.',
        sensoryCue: 'Glistening thick sauce.',
        soundscapeType: 'simmer',
        spokenNarration: 'Simmer until thickened.'
      },
      {
        stepNumber: 8,
        timeOffsetFormatted: '30:00',
        timeOffsetSeconds: 1800,
        title: 'Serve with Rice or Naan',
        actionDescription: 'Serve with rice or naan.',
        ingredientAdditions: [],
        toolsUsed: ['Serving Dish'],
        criticalControlPoint: 'Garnish with cream swirl and fresh cilantro.',
        sensoryCue: 'Fragrant basmati rice and curry steam.',
        soundscapeType: 'plating',
        spokenNarration: 'Serve with basmati rice or naan.'
      }
    ],
    platingPresentation: 'Presented in a dark bowl with a cream swirl, fresh cilantro, and basmati rice.',
    sommelierPairing: {
      vintage: '2020 Syrah / Shiraz',
      terroir: 'Barossa Valley, Australia',
      tastingNote: 'Juicy dark plum and peppery spice handle the creamy masala sauce.'
    },
    heroImageUrl: imgTikkaMasala,
    aiImagePrompt: 'Overhead shot of chicken tikka masala in a dark bowl, charred marinated chicken chunks coated in a rich creamy red-orange sauce, drizzle of cream swirl, chopped cilantro on top, basmati rice beside it.',
    createdAt: new Date().toISOString()
  },

  // 9. Biryani — India
  {
    id: 'biryani-india',
    recipeNumber: 9,
    primaryIngredientId: 'saffron-basmati-rice',
    primaryIngredientName: 'Aged Basmati Rice & Saffron Dum',
    dishTitle: 'Biryani',
    subtitle: 'Fragrant layered dum biryani with saffron-streaked basmati rice, spiced chicken, golden fried onions, and mint',
    cuisine: 'Indian',
    countryRegion: 'India',
    tags: ['Rice', 'Biryani', 'Indian', 'Dum', 'Celebration'],
    overview: 'The royal celebration dish of the subcontinent. Long-grain basmati rice layered with yogurt-marinated spiced chicken, infused with saffron milk, caramelized fried onions (birista), fresh mint, and slow-cooked under tight steam (dum).',
    chefRationale: 'Dum steam cooking allows meat juices and whole spice aromas to permeate every individual grain of fluffy rice.',
    difficulty: 'Grand Master Atelier',
    servings: 4,
    totalPrepTimeMinutes: 30,
    totalCookTimeMinutes: 45,
    overallDurationFormatted: '75 min',
    trendScore: 99.2,
    hotnessRank: 9,
    awardBadge: 'World Archive No. 9 • Royal Dum Heritage',
    flavorAromaProfile: {
      umami: 96,
      acidity: 40,
      aromaticIntensity: 100,
      textureComplexity: 94,
      finishLength: 98
    },
    requiredTools: [
      {
        id: 'biryani-handi',
        name: 'Heavy Base Copper Handi / Dutch Oven',
        category: 'Cookware',
        material: 'Heavy Copper / Cast Iron',
        purpose: 'Provides gentle sealed heat distribution for dum cooking'
      }
    ],
    ingredientsList: [
      { name: 'Basmati rice', amount: '350g extra-long grain', prepState: 'Rinsed and soaked', addedAtMinute: 15, isArchiveSpecialty: true },
      { name: 'Chicken or lamb', amount: '500g', prepState: 'Bone-in or boneless cuts', addedAtMinute: 0, isArchiveSpecialty: false },
      { name: 'Yogurt', amount: '150g', prepState: 'Whisked with spices', addedAtMinute: 0, isArchiveSpecialty: false },
      { name: 'Saffron', amount: '0.5g', prepState: 'Steeped in warm milk', addedAtMinute: 25, isArchiveSpecialty: true },
      { name: 'Fried onions', amount: '100g (birista)', prepState: 'Crisp golden brown', addedAtMinute: 25, isArchiveSpecialty: true },
      { name: 'Biryani spice mix', amount: '2 tbsp', prepState: 'Ground whole spices', addedAtMinute: 0, isArchiveSpecialty: true }
    ],
    timelineSteps: [
      {
        stepNumber: 1,
        timeOffsetFormatted: '00:00',
        timeOffsetSeconds: 0,
        title: 'Marinate Meat in Yogurt & Spices',
        actionDescription: 'Marinate meat in yogurt and spices for 1-2 hours.',
        ingredientAdditions: [
          { ingredientName: 'Chicken or lamb', amount: '500g', technique: 'Marinated' },
          { ingredientName: 'Yogurt', amount: '150g', technique: 'Whisked with spices' },
          { ingredientName: 'Biryani spice mix', amount: '2 tbsp', technique: 'Blended' }
        ],
        toolsUsed: ['Bowl'],
        criticalControlPoint: 'Allow whole spices and yogurt to penetrate the meat.',
        sensoryCue: 'Intense saffron, cardamom, and clove perfume.',
        soundscapeType: 'chop',
        spokenNarration: 'Marinate meat in yogurt and aromatic spices for one to two hours.'
      },
      {
        stepNumber: 2,
        timeOffsetFormatted: '15:00',
        timeOffsetSeconds: 900,
        title: 'Parboil Rice Until 70% Cooked',
        actionDescription: 'Parboil rice until 70% cooked.',
        ingredientAdditions: [{ ingredientName: 'Basmati rice', amount: '350g', technique: 'Parboiled with whole spices' }],
        toolsUsed: ['Stock Pot'],
        criticalControlPoint: 'Grains should have a firm core to finish during dum.',
        sensoryCue: 'Aromatic basmati steam.',
        soundscapeType: 'simmer',
        spokenNarration: 'Parboil rice until seventy percent cooked.'
      },
      {
        stepNumber: 3,
        timeOffsetFormatted: '20:00',
        timeOffsetSeconds: 1200,
        title: 'Layer Marinated Meat in Heavy Pot',
        actionDescription: 'Layer marinated meat in a heavy pot.',
        ingredientAdditions: [],
        toolsUsed: ['Heavy Base Copper Handi'],
        criticalControlPoint: 'Distribute meat evenly on the bottom.',
        sensoryCue: 'Spiced marinade settling into the pot.',
        soundscapeType: 'plating',
        spokenNarration: 'Layer marinated meat in a heavy pot.'
      },
      {
        stepNumber: 4,
        timeOffsetFormatted: '23:00',
        timeOffsetSeconds: 1380,
        title: 'Layer Partly Cooked Rice on Top',
        actionDescription: 'Layer partly cooked rice on top.',
        ingredientAdditions: [],
        toolsUsed: ['Slotted Spoon'],
        criticalControlPoint: 'Spread rice gently without pressing down.',
        sensoryCue: 'Fluffy white rice grains creating a soft blanket.',
        soundscapeType: 'plating',
        spokenNarration: 'Layer partly cooked rice on top.'
      },
      {
        stepNumber: 5,
        timeOffsetFormatted: '25:00',
        timeOffsetSeconds: 1500,
        title: 'Top with Saffron Milk & Fried Onions',
        actionDescription: 'Top with saffron milk and fried onions.',
        ingredientAdditions: [
          { ingredientName: 'Saffron', amount: 'Steeped milk', technique: 'Drizzled' },
          { ingredientName: 'Fried onions', amount: '100g', technique: 'Scattered' }
        ],
        toolsUsed: [],
        criticalControlPoint: 'Drizzle saffron milk in streaks for two-tone yellow and white rice.',
        sensoryCue: 'Golden saffron color and sweet caramelized onion aroma.',
        soundscapeType: 'drizzle',
        spokenNarration: 'Top with saffron milk and golden fried onions.'
      },
      {
        stepNumber: 6,
        timeOffsetFormatted: '28:00',
        timeOffsetSeconds: 1680,
        title: 'Cover Tightly and Cook on Low Heat (Dum) 25-30 Minutes',
        actionDescription: 'Cover tightly and cook on low heat (dum) 25-30 minutes.',
        ingredientAdditions: [],
        toolsUsed: ['Tight-Fitting Lid'],
        criticalControlPoint: 'Seal lid tightly to trap steam completely.',
        sensoryCue: 'Gentle steam whispering under the lid.',
        soundscapeType: 'simmer',
        spokenNarration: 'Cover tightly and cook on low heat for twenty-five to thirty minutes.'
      },
      {
        stepNumber: 7,
        timeOffsetFormatted: '58:00',
        timeOffsetSeconds: 3480,
        title: 'Rest 10 Minutes, Then Gently Fluff and Serve',
        actionDescription: 'Rest 10 minutes, then gently fluff and serve.',
        ingredientAdditions: [],
        toolsUsed: ['Rice Paddle'],
        criticalControlPoint: 'Fluff gently from the side to keep grains unbroken.',
        sensoryCue: 'A majestic cloud of saffron, spice, and tender meat steam.',
        soundscapeType: 'plating',
        spokenNarration: 'Rest for ten minutes, then gently fluff and serve.'
      }
    ],
    platingPresentation: 'Served in a copper pot with saffron-streaked rice, fried onions, mint, and tender chicken.',
    sommelierPairing: {
      vintage: '2018 Châteauneuf-du-Pape',
      terroir: 'Rhône, France',
      tastingNote: 'Rich spices and dark berries harmonize with saffron dum aromatics.'
    },
    heroImageUrl: imgBiryani,
    aiImagePrompt: 'Top-down shot of a layered biryani in a copper pot: golden fried onions, saffron-streaked rice, tender spiced chicken pieces peeking through, fresh mint and cilantro scattered, steam rising.',
    createdAt: new Date().toISOString()
  },

  // 10. Pho — Vietnam
  {
    id: 'pho-vietnam',
    recipeNumber: 10,
    primaryIngredientId: 'star-anise-beef-broth',
    primaryIngredientName: 'Charred Spiced Beef Broth & Rice Noodles',
    dishTitle: 'Pho',
    subtitle: 'Steaming Vietnamese beef noodle soup with fragrant star anise broth, thin beef slices, herbs, and bean sprouts',
    cuisine: 'Vietnamese',
    countryRegion: 'Vietnam',
    tags: ['Soup', 'Pho', 'Vietnamese', 'Noodles', 'Beef Broth'],
    overview: 'The national treasure of Vietnamese culinary culture (Phở Bò). A crystal-clear aromatic broth brewed from beef bones, charred ginger, star anise, and cinnamon, poured over flat rice noodles and thin raw beef slices that gently cook in the bowl.',
    chefRationale: 'Charring ginger and onions before simmering releases caramelized sugars and smoky sweetness into the clear bone broth.',
    difficulty: 'Master',
    servings: 2,
    totalPrepTimeMinutes: 20,
    totalCookTimeMinutes: 60,
    overallDurationFormatted: '80 min',
    trendScore: 99.0,
    hotnessRank: 10,
    awardBadge: 'World Archive No. 10 • Hanoi Master Broth',
    flavorAromaProfile: {
      umami: 98,
      acidity: 45,
      aromaticIntensity: 99,
      textureComplexity: 90,
      finishLength: 98
    },
    requiredTools: [
      {
        id: 'fine-broth-strainer',
        name: 'Double-Layer Broth Flannel Strainer',
        category: 'Cookware',
        material: 'Fine Mesh & Flannel',
        purpose: 'Ensures crystal-clear broth without turbidity'
      }
    ],
    ingredientsList: [
      { name: 'Rice noodles', amount: '200g banh pho noodles', prepState: 'Blanched fresh', addedAtMinute: 40, isArchiveSpecialty: false },
      { name: 'Beef bones', amount: '1kg marrow & knuckle bones', prepState: 'Parboiled and rinsed clean', addedAtMinute: 0, isArchiveSpecialty: false },
      { name: 'Star anise', amount: '3 whole pods', prepState: 'Lightly toasted', addedAtMinute: 5, isArchiveSpecialty: true },
      { name: 'Cinnamon stick', amount: '1 stick Saigon cinnamon', prepState: 'Toasted', addedAtMinute: 5, isArchiveSpecialty: true },
      { name: 'Thin beef slices', amount: '180g beef tenderloin / sirloin', prepState: 'Shaved paper-thin', addedAtMinute: 42, isArchiveSpecialty: true },
      { name: 'Herbs', amount: 'Thai basil, cilantro, culantro', prepState: 'Fresh sprigs', addedAtMinute: 45, isArchiveSpecialty: false },
      { name: 'Bean sprouts', amount: '100g', prepState: 'Washed and crisp', addedAtMinute: 45, isArchiveSpecialty: false }
    ],
    timelineSteps: [
      {
        stepNumber: 1,
        timeOffsetFormatted: '00:00',
        timeOffsetSeconds: 0,
        title: 'Simmer Beef Bones with Charred Aromatics',
        actionDescription: 'Simmer beef bones with charred onion, ginger, star anise, cinnamon for several hours.',
        ingredientAdditions: [
          { ingredientName: 'Beef bones', amount: '1kg', technique: 'Simmered' },
          { ingredientName: 'Star anise', amount: '3 pods', technique: 'Toasted & simmered' },
          { ingredientName: 'Cinnamon stick', amount: '1 stick', technique: 'Simmered' }
        ],
        toolsUsed: ['Stock Pot'],
        criticalControlPoint: 'Keep broth at a gentle simmer below boil to maintain crystal clarity.',
        sensoryCue: 'Sweet aroma of star anise, roasted ginger, and rich beef marrow.',
        soundscapeType: 'simmer',
        spokenNarration: 'Simmer beef bones with charred onion, ginger, star anise, and cinnamon.'
      },
      {
        stepNumber: 2,
        timeOffsetFormatted: '35:00',
        timeOffsetSeconds: 2100,
        title: 'Strain Broth and Season with Fish Sauce',
        actionDescription: 'Strain broth and season with fish sauce.',
        ingredientAdditions: [],
        toolsUsed: ['Double-Layer Broth Flannel Strainer'],
        criticalControlPoint: 'Season with fish sauce and rock sugar for pristine savory-sweet balance.',
        sensoryCue: 'Golden amber crystal-clear broth.',
        soundscapeType: 'drizzle',
        spokenNarration: 'Strain the broth until clear and season with fish sauce.'
      },
      {
        stepNumber: 3,
        timeOffsetFormatted: '40:00',
        timeOffsetSeconds: 2400,
        title: 'Cook Rice Noodles and Place in a Bowl',
        actionDescription: 'Cook rice noodles and place in a bowl.',
        ingredientAdditions: [{ ingredientName: 'Rice noodles', amount: '200g', technique: 'Blanched' }],
        toolsUsed: ['Noodle Strainer'],
        criticalControlPoint: 'Quick blanch for 10-15 seconds; do not overcook.',
        sensoryCue: 'Soft silky white noodles.',
        soundscapeType: 'simmer',
        spokenNarration: 'Cook rice noodles and place in a bowl.'
      },
      {
        stepNumber: 4,
        timeOffsetFormatted: '42:00',
        timeOffsetSeconds: 2520,
        title: 'Lay Thin Raw Beef Slices on Top of Noodles',
        actionDescription: 'Lay thin raw beef slices on top of noodles.',
        ingredientAdditions: [{ ingredientName: 'Thin beef slices', amount: '180g', technique: 'Arranged raw' }],
        toolsUsed: ['Tongs'],
        criticalControlPoint: 'Slice beef paper-thin so boiling broth cooks it instantly.',
        sensoryCue: 'Ruby red beef draped over warm noodles.',
        soundscapeType: 'plating',
        spokenNarration: 'Lay thin raw beef slices on top of noodles.'
      },
      {
        stepNumber: 5,
        timeOffsetFormatted: '43:00',
        timeOffsetSeconds: 2580,
        title: 'Ladle Boiling Broth Over to Cook the Beef',
        actionDescription: 'Ladle boiling broth over to cook the beef.',
        ingredientAdditions: [],
        toolsUsed: ['Ladle'],
        criticalControlPoint: 'Pour boiling broth directly over beef slices to turn them tender pink.',
        sensoryCue: 'Beef turns delicately pink as fragrant steam rises.',
        soundscapeType: 'simmer',
        spokenNarration: 'Ladle boiling broth over to gently cook the beef.'
      },
      {
        stepNumber: 6,
        timeOffsetFormatted: '45:00',
        timeOffsetSeconds: 2700,
        title: 'Serve with Herbs, Bean Sprouts, and Lime on the Side',
        actionDescription: 'Serve with herbs, bean sprouts, and lime on the side.',
        ingredientAdditions: [
          { ingredientName: 'Herbs', amount: 'Fresh sprigs', technique: 'Side plate' },
          { ingredientName: 'Bean sprouts', amount: '100g', technique: 'Side plate' }
        ],
        toolsUsed: ['Side Plate'],
        criticalControlPoint: 'Allow diners to customize herbs and lime juice to their taste.',
        sensoryCue: 'Crisp herbal freshness of Thai basil and culantro.',
        soundscapeType: 'plating',
        spokenNarration: 'Serve with fresh herbs, bean sprouts, and lime on the side.'
      }
    ],
    platingPresentation: 'Served in a large porcelain bowl with chopsticks resting across, and fresh herb platter on the side.',
    sommelierPairing: {
      vintage: '2021 Grüner Veltliner',
      terroir: 'Wachau, Austria',
      tastingNote: 'Crisp white pepper, green herbs, and bright citrus complement star anise and fresh basil.'
    },
    heroImageUrl: imgPho,
    aiImagePrompt: 'Steaming bowl of pho with thin raw beef slices turning pink in hot clear broth, rice noodles beneath, fresh herbs, bean sprouts and lime wedges arranged on a side plate, chopsticks resting across the bowl.',
    createdAt: new Date().toISOString()
  }
];
