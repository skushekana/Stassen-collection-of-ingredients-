import { CulinaryMasterclass } from '../types';

export const INITIAL_RECIPES: CulinaryMasterclass[] = [
  {
    id: 'saffron-gold-risotto-alba',
    primaryIngredientId: 'saffron-kozani',
    primaryIngredientName: 'Krokos Kozanis PDO Saffron & White Alba Truffle',
    dishTitle: '24k Saffron Gold-Leaf Risotto Mantecato with White Alba Truffle & 25-Year Modena Solera',
    subtitle: '7-Year Acquerello carnaroli rice with crimson Kozani stigmas, 24k gold leaf, and shaved Alba white truffles',
    cuisine: 'Italian',
    tags: ['Risotto', '3-Star Michelin Signature', 'Saffron', 'Alba Truffle', '24k Gold Leaf'],
    overview: 'The zenith of haute Italian gastronomy. Seven-year aged Carnaroli rice toasted in roasted marrow fat, gently infused with crimson Greek Krokos Kozanis saffron essence until radiant liquid gold. Mounted all’onda with cultured alpine butter and 36-month Vacche Rosse Parmigiano, draped with hand-applied 24-karat edible gold leaf, crowned with shaved paper-thin Alba white truffles and drops of 25-year aged Modena balsamic nectar.',
    chefRationale: 'Saffron crocin pigments are water-soluble while safranal aromatics are fat-soluble. Steeping in warm capon broth and mounting with cold cultured butter captures both dimensions. Shaving raw Alba truffles table-side over steaming risotto volatilizes fragile bis(methylthio)methane esters into an intoxicating cloud.',
    difficulty: 'Haute Gastronomy',
    servings: 2,
    totalPrepTimeMinutes: 15,
    totalCookTimeMinutes: 25,
    overallDurationFormatted: '40 min',
    trendScore: 99.9,
    hotnessRank: 1,
    isHottest: true,
    awardBadge: '🔥 Trending No. 1 • 3-Star Michelin Grand Masterpiece',
    flavorAromaProfile: {
      umami: 99,
      acidity: 42,
      aromaticIntensity: 100,
      textureComplexity: 98,
      finishLength: 99
    },
    requiredTools: [
      {
        id: 'pan-risotto-rame-hammered',
        name: 'Solid French Copper Risotto Saucier 26cm',
        category: 'Cookware',
        material: 'Solid 2.5mm Hammered French Copper with Pure Tin Lining',
        purpose: 'Provides instantaneous temperature responsiveness for precision mantecatura emulsion',
        proTip: 'Maintain a rolling wave (all’onda) with rhythmic wrist motion'
      },
      {
        id: 'truffle-shaver-rosewood',
        name: 'Adjustable Razor Truffle Shaver',
        category: 'Cutlery',
        material: 'Forged Surgical Stainless Steel with Rosewood Handle',
        purpose: 'Shaves truffles into paper-thin 0.2mm translucent ribbons that maximize surface area for volatile emission',
        proTip: 'Hold at 30-degree angle directly over steaming hot risotto'
      },
      {
        id: 'gold-gilding-bamboo-tweezer',
        name: 'Artisanal Bamboo Gold Leaf Gilding Tweezers',
        category: 'Plating & Finishing',
        material: 'Natural Kyoto Bamboo',
        purpose: 'Static-free transfer of ultra-fragile 24k gold leaf sheets onto the surface of the risotto',
        proTip: 'Breath gently away from the plate to avoid blowing the gold leaf'
      }
    ],
    ingredientsList: [
      {
        name: 'Aged Acquerello Carnaroli Rice (7-Year Reserve)',
        amount: '200g',
        prepState: 'Aged dry grains',
        addedAtMinute: 2,
        isArchiveSpecialty: false
      },
      {
        name: 'Krokos Kozanis PDO Saffron Filaments',
        amount: '0.6g (approx. 50 stigmas)',
        prepState: 'Steeped in 120ml warm capon broth for 2 hours',
        addedAtMinute: 16,
        isArchiveSpecialty: true
      },
      {
        name: 'Fresh Alba White Winter Truffle (Tuber Magnatum)',
        amount: '15g prime bulb',
        prepState: 'Gently brushed, shaved raw at table',
        addedAtMinute: 24,
        isArchiveSpecialty: true
      },
      {
        name: 'Aceto Balsamico Tradizionale di Modena DOP (25-Year Extravecchio)',
        amount: '12 drops',
        prepState: 'Dense syrupy solera nectar',
        addedAtMinute: 25,
        isArchiveSpecialty: true
      },
      {
        name: 'Edible 24-Karat Pure Gold Leaf Sheets',
        amount: '2 full sheets',
        prepState: 'Hand-burnished',
        addedAtMinute: 23,
        isArchiveSpecialty: false
      },
      {
        name: 'Cultured Grass-Fed Mountain Butter (Beurre de Baratte)',
        amount: '50g',
        prepState: 'Ice-cold cubes',
        addedAtMinute: 20,
        isArchiveSpecialty: false
      }
    ],
    timelineSteps: [
      {
        stepNumber: 1,
        timeOffsetFormatted: '00:00',
        timeOffsetSeconds: 0,
        title: 'Tostatura of 7-Year Acquerello in Roasted Marrow',
        actionDescription: 'Melt poached veal bone marrow in the heavy copper saucier. Add the 7-year aged Carnaroli rice dry and toast over medium flame for 3 minutes until translucent and pearlescent.',
        imageUrl: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=1200&auto=format&fit=crop',
        ingredientAdditions: [
          {
            ingredientName: 'Acquerello Carnaroli Rice',
            amount: '200g',
            technique: 'Toasted dry in marrow fat',
            timingNote: 'At 01:00'
          }
        ],
        toolsUsed: ['Solid French Copper Risotto Saucier 26cm'],
        criticalControlPoint: 'Never let grains brown; the objective is sealing exterior amylose starches.',
        sensoryCue: 'Warm toasted hazelnut and roasted grain aroma fills the room.',
        soundscapeType: 'sizzle',
        spokenNarration: 'We begin by toasting our seven-year aged Carnaroli grains in rich marrow until pearlescent and hot to the touch.'
      },
      {
        stepNumber: 2,
        timeOffsetFormatted: '05:00',
        timeOffsetSeconds: 300,
        title: 'Capon Broth Nourishment & Saffron Gold Infusion',
        actionDescription: 'Ladle in simmering capon broth in rhythmic intervals. At minute 16, pour in the steeped crimson Krokos Kozanis saffron essence. The rice transforms into brilliant radiant gold.',
        imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200&auto=format&fit=crop',
        ingredientAdditions: [
          {
            ingredientName: 'Krokos Kozanis PDO Saffron',
            amount: '0.6g steeped infusion',
            technique: 'Folded in with broth',
            timingNote: 'At 16:00'
          }
        ],
        toolsUsed: ['Solid French Copper Risotto Saucier 26cm'],
        criticalControlPoint: 'Maintain constant gentle simmer; never let rice dry out.',
        sensoryCue: 'Intense saffron aroma blooms with warm honey and floral musk.',
        soundscapeType: 'simmer',
        spokenNarration: 'We nourish the rice with simmering broth, then introduce our steeped Kozani saffron, turning the pan into liquid gold.'
      },
      {
        stepNumber: 3,
        timeOffsetFormatted: '20:00',
        timeOffsetSeconds: 1200,
        title: 'Mantecatura all’Onda & 24k Gold Leaf Drape',
        actionDescription: 'Remove pan from flame. Rest 60 seconds. Vigorously beat in ice-cold cultured butter and aged cheese until it forms a creamy rolling wave. Pour into warm plates and drape with 24k gold leaf.',
        imageUrl: 'https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?q=80&w=1200&auto=format&fit=crop',
        ingredientAdditions: [
          {
            ingredientName: 'Cultured Grass-Fed Mountain Butter',
            amount: '50g ice-cold',
            technique: 'Mounted off-heat',
            timingNote: 'At 20:00'
          }
        ],
        toolsUsed: ['Solid French Copper Risotto Saucier 26cm', 'Artisanal Bamboo Gold Leaf Gilding Tweezers'],
        criticalControlPoint: 'Emulsify strictly off-heat to prevent fat separation.',
        sensoryCue: 'Risotto ripples like liquid silk when the pan is shaken.',
        soundscapeType: 'whisk',
        spokenNarration: 'Off the heat, we mount with chilled butter and aged Parmigiano until a rolling wave forms, then drape with 24-karat gold leaf.'
      },
      {
        stepNumber: 4,
        timeOffsetFormatted: '24:00',
        timeOffsetSeconds: 1440,
        title: 'Alba White Truffle Shaving & 25-Year Modena Balsamic Finish',
        actionDescription: 'Using the razor truffle shaver, shower paper-thin flakes of wild Alba white truffle over the shimmering gold surface. Finish with 12 precious drops of 25-year Modena extravecchio balsamic.',
        imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1200&auto=format&fit=crop',
        ingredientAdditions: [
          {
            ingredientName: 'Fresh Alba White Winter Truffle',
            amount: '15g',
            technique: 'Shaved raw table-side',
            timingNote: 'At 24:00'
          },
          {
            ingredientName: 'Aceto Balsamico Tradizionale di Modena DOP',
            amount: '12 drops',
            technique: 'Dotted around truffle crown',
            timingNote: 'At 25:00'
          }
        ],
        toolsUsed: ['Adjustable Razor Truffle Shaver'],
        criticalControlPoint: 'Shave immediately while the risotto is steaming to volatilize truffle perfume.',
        sensoryCue: 'Intoxicating wave of forest musk, garlic esters, and sweet barrel-aged balsamic wood.',
        soundscapeType: 'plating',
        spokenNarration: 'To crown this masterpiece, we shave wild Alba white truffle table-side and dot with twenty-five-year solera balsamic nectar.'
      }
    ],
    platingPresentation: 'Served on mirror-finish Bernardaud porcelain with wide rims. The luminous golden risotto gleams with 24k gold leaf and a mountain of translucent white truffle ribbons.',
    sommelierPairing: {
      vintage: '2015 Ca’ del Bosco Franciacorta Cuvée Annamaria Clementi Riserva',
      terroir: 'Lombardy, Italy',
      tastingNote: 'Crisp brioche, toasted almond, and fine chalky effervescence cut through the butter fat while elevating saffron florals and Alba truffle musk.'
    },
    heroImageUrl: 'https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?q=80&w=1200&auto=format&fit=crop',
    createdAt: new Date().toISOString()
  },
  {
    id: 'charred-matsutake-otoro-kobujime',
    primaryIngredientId: 'matsutake-nagano',
    primaryIngredientName: 'Nagano Wild Matsutake & Bluefin O-Toro',
    dishTitle: 'Charred Wild Nagano Matsutake & Bluefin O-Toro in Smoked Rishiri Kombu Kobujime Consommé',
    subtitle: 'Binchotan-grilled wild pine mushrooms with kelp-cured bluefin tuna belly and sudachi pearls',
    cuisine: 'Japanese Kaiseki',
    tags: ['Kaiseki', 'Matsutake', 'O-Toro', 'Binchotan', 'Grand Master'],
    overview: 'An exquisite expression of Japanese autumnal terroir. Prime Nagano wild matsutake mushrooms scored and lightly kissed over Kishu Binchotan white charcoal, served alongside kelp-cured bluefin o-toro in a golden dashi brewed from 3-year cellar aged Rishiri kombu and wood-smoked honkarebushi shavings, accented with fresh mountain sudachi citrus.',
    chefRationale: 'Matsutake-ol and methyl cinnamate aromatics peak when briefly exposed to intense dry infrared heat without boiling. The kombu kobujime cures the bluefin tuna with natural glutamates, creating an explosive synergistic umami resonance.',
    difficulty: 'Haute Gastronomy',
    servings: 2,
    totalPrepTimeMinutes: 25,
    totalCookTimeMinutes: 10,
    overallDurationFormatted: '35 min',
    trendScore: 99.7,
    hotnessRank: 2,
    isHottest: true,
    awardBadge: '🔥 Trending No. 2 • Kyoto Kaiseki 3-Star Atelier Choice',
    flavorAromaProfile: {
      umami: 100,
      acidity: 50,
      aromaticIntensity: 99,
      textureComplexity: 95,
      finishLength: 98
    },
    requiredTools: [
      {
        id: 'binchotan-konro-grill',
        name: 'Diatomite Konro Charcoal Grill with Kishu Binchotan',
        category: 'Cookware',
        material: 'Natural Diatomaceous Earth Brick',
        purpose: 'Emits pure smokeless infrared heat that caramelizes mushroom sugars without imparting sulfur',
        proTip: 'Grill mushrooms only until glistening drops of sap bead on the cap'
      },
      {
        id: 'yanagiba-knife',
        name: 'Single-Bevel Honyaki Yanagiba 300mm',
        category: 'Cutlery',
        material: 'White Paper Steel #1 (Shirogami)',
        purpose: 'Laser incisions through delicate o-toro fibers with zero cellular compression',
        proTip: 'Pull blade in a single continuous stroke from heel to tip'
      }
    ],
    ingredientsList: [
      {
        name: 'Wild Nagano Matsutake Mushrooms (Grade A Open Cap)',
        amount: '2 prime specimens (approx. 140g)',
        prepState: 'Gently brushed with horsehair brush, split in half',
        addedAtMinute: 4,
        isArchiveSpecialty: true
      },
      {
        name: 'Wild Bluefin O-Toro Tuna Belly',
        amount: '120g sashimi block',
        prepState: 'Cured between Rishiri kelp sheets for 3 hours',
        addedAtMinute: 0,
        isArchiveSpecialty: true
      },
      {
        name: '3-Year Cellar Aged Rishiri Kombu',
        amount: '20g',
        prepState: 'Steeped cold in soft spring water for 12 hours',
        addedAtMinute: 0,
        isArchiveSpecialty: true
      },
      {
        name: 'Fresh Tokushima Sudachi Citrus',
        amount: '2 fruits',
        prepState: 'Zested and juiced',
        addedAtMinute: 8,
        isArchiveSpecialty: false
      }
    ],
    timelineSteps: [
      {
        stepNumber: 1,
        timeOffsetFormatted: '00:00',
        timeOffsetSeconds: 0,
        title: 'Clarity Dashi Extraction at 62°C',
        actionDescription: 'Heat soft water with cellar-aged Rishiri kombu to exactly 62°C for 45 minutes. Remove kelp, bring to 85°C, and fold in aged katsuobushi shavings. Strain immediately through double flannel.',
        ingredientAdditions: [
          {
            ingredientName: '3-Year Cellar Aged Rishiri Kombu',
            amount: '20g',
            technique: 'Cold steeped then warmed to 62°C',
            timingNote: 'At 00:00'
          }
        ],
        toolsUsed: ['Solid French Copper Risotto Saucier 26cm'],
        criticalControlPoint: 'Never boil the kelp; boiling extracts bitter mucilaginous alginates.',
        sensoryCue: 'Brilliant crystal-clear golden amber broth with deep marine aroma.',
        soundscapeType: 'simmer',
        spokenNarration: 'We brew our master dashi from three-year aged Rishiri kelp at sixty-two degrees to extract pure sea sweetness without bitterness.'
      },
      {
        stepNumber: 2,
        timeOffsetFormatted: '04:00',
        timeOffsetSeconds: 240,
        title: 'Binchotan Charcoal Kiss of Nagano Matsutake',
        actionDescription: 'Place the split matsutake mushrooms over glowing Binchotan coals. Grill for 90 seconds per side until natural aromatic sap beads on the caps. Brush with aged shoyu drop.',
        ingredientAdditions: [
          {
            ingredientName: 'Wild Nagano Matsutake Mushrooms',
            amount: '2 specimens',
            technique: 'Direct high infrared charring',
            timingNote: 'At 04:00'
          }
        ],
        toolsUsed: ['Diatomite Konro Charcoal Grill with Kishu Binchotan'],
        criticalControlPoint: 'Remove as soon as fragrant steam puffs from the stem.',
        sensoryCue: 'Intense, piney, cinnamon-earth perfume rises from the glowing embers.',
        soundscapeType: 'flame',
        spokenNarration: 'We kiss the wild Nagano matsutake over glowing binchotan coals until its resinous pine and cinnamon oils vaporize.'
      },
      {
        stepNumber: 3,
        timeOffsetFormatted: '08:00',
        timeOffsetSeconds: 480,
        title: 'Kobujime O-Toro Slicing & Broth Assembly',
        actionDescription: 'Slice the kelp-cured bluefin o-toro into paper-thin ribbons. Arrange in heated handmade lacquer bowls with charred matsutake and pour the piping hot golden dashi table-side.',
        ingredientAdditions: [
          {
            ingredientName: 'Wild Bluefin O-Toro Tuna Belly',
            amount: '120g sliced',
            technique: 'Arranged over hot broth',
            timingNote: 'At 08:00'
          }
        ],
        toolsUsed: ['Single-Bevel Honyaki Yanagiba 300mm'],
        criticalControlPoint: 'Broth warmth gently renders tuna fat without cooking flesh.',
        sensoryCue: 'Tuna fat turns translucent and melts into the fragrant dashi broth.',
        soundscapeType: 'plating',
        spokenNarration: 'We arrange the kelp-cured o-toro and charred matsutake, then pour the piping hot dashi to gently render the precious tuna fat.'
      }
    ],
    platingPresentation: 'Presented in Wajima black-and-gold lacquer bowls. Slices of charred matsutake and pink o-toro float in crystal dashi crowned with paper-thin sudachi wheels.',
    sommelierPairing: {
      vintage: 'Kokuryu "Ishidaya" Junmai Daiginjo (Aged 3 Years at 0°C)',
      terroir: 'Fukui Prefecture, Japan',
      tastingNote: 'Velvety melon, cold spring water purity, and whisper of cedar wood mirror the matsutake and cleanse the rich o-toro fat.'
    },
    heroImageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1200&auto=format&fit=crop',
    createdAt: new Date().toISOString()
  },
  {
    id: 'tajarin-tartufo-alba',
    primaryIngredientId: 'truffle-alba',
    primaryIngredientName: 'Alba White Winter Truffle & 40-Yolk Tajarin',
    dishTitle: 'Tajarin al Tartufo Bianco d’Alba con 40 Tuorli e Burro di Montagna',
    subtitle: '40-yolk golden egg ribbons with cultured alpine butter and shaved white truffles',
    cuisine: 'Italian',
    tags: ['Pasta', 'Piedmontese Haute Cuisine', 'Alba Truffle', 'Grand Master'],
    overview: 'The legendary pinnacle of Langhe gastronomy: hand-cut tajarin pasta made with 40 farm egg yolks per kilo of flour, tossed in sweet mountain butter and water emulsion, then crowned table-side with translucent sheets of wild Alba white truffle.',
    chefRationale: 'White truffles must never be cooked. Heat above body temperature evaporates volatile bis(methylthio)methane. The hot buttered pasta serves solely as a thermal diffuser to volatilize the raw truffle perfume.',
    difficulty: 'Haute Gastronomy',
    servings: 2,
    totalPrepTimeMinutes: 20,
    totalCookTimeMinutes: 10,
    overallDurationFormatted: '30 min',
    trendScore: 99.5,
    hotnessRank: 3,
    isHottest: true,
    awardBadge: '🔥 Trending No. 3 • Piedmont Grand Cru Reserve',
    flavorAromaProfile: {
      umami: 98,
      acidity: 20,
      aromaticIntensity: 100,
      textureComplexity: 92,
      finishLength: 99
    },
    requiredTools: [
      {
        id: 'truffle-shaver-rosewood-2',
        name: 'Adjustable Razor Truffle Shaver',
        category: 'Cutlery',
        material: 'Forged Surgical Stainless Steel with Rosewood Handle',
        purpose: 'Shaves truffles into paper-thin 0.2mm translucent ribbons that maximize surface area for volatile emission',
        proTip: 'Hold at 30-degree angle directly over steaming pasta'
      }
    ],
    ingredientsList: [
      {
        name: 'Hand-Cut 40-Yolk Tajarin Pasta',
        amount: '180g',
        prepState: 'Freshly rolled and sliced 1mm thin',
        addedAtMinute: 0,
        isArchiveSpecialty: true
      },
      {
        name: 'Fresh Alba White Winter Truffle (Tuber Magnatum)',
        amount: '18g prime bulb',
        prepState: 'Brushed gently, shaved raw at table-side',
        addedAtMinute: 8,
        isArchiveSpecialty: true
      },
      {
        name: 'Cultured Alpine Grass-Fed Butter (Beurre de Baratte)',
        amount: '60g',
        prepState: 'Chilled cubes',
        addedAtMinute: 4,
        isArchiveSpecialty: false
      }
    ],
    timelineSteps: [
      {
        stepNumber: 1,
        timeOffsetFormatted: '00:00',
        timeOffsetSeconds: 0,
        title: 'Flash Boil 40-Yolk Tajarin',
        actionDescription: 'Drop fresh tajarin ribbons into rapidly boiling salted water for exactly 90 seconds. Their razor-thin cut cooks almost instantaneously.',
        ingredientAdditions: [
          {
            ingredientName: 'Hand-Cut Tajarin Pasta',
            amount: '180g',
            technique: 'Fanned into boiling water',
            timingNote: 'At 00:00'
          }
        ],
        toolsUsed: ['Solid French Copper Skillet 24cm'],
        criticalControlPoint: 'Do not overcook; fresh 40-yolk dough turns mushy in seconds.',
        sensoryCue: 'Golden ribbons float to surface within 45 seconds.',
        soundscapeType: 'simmer',
        spokenNarration: 'We gently drop our fresh forty-yolk tajarin into boiling water. In just ninety seconds, the golden ribbons achieve delicate tenderness.'
      },
      {
        stepNumber: 2,
        timeOffsetFormatted: '02:00',
        timeOffsetSeconds: 120,
        title: 'Alpine Butter Monte & Starch Emulsion',
        actionDescription: 'Melt cultured mountain butter with 4 tablespoons of hot pasta water in the copper skillet. Toss the drained tajarin directly into the butter, swirling until a golden sheen forms.',
        ingredientAdditions: [
          {
            ingredientName: 'Cultured Alpine Grass-Fed Butter',
            amount: '60g',
            technique: 'Emulsified with pasta water off direct high flame',
            timingNote: 'At 02:00'
          }
        ],
        toolsUsed: ['Solid French Copper Skillet 24cm'],
        criticalControlPoint: 'Maintain gentle heat so the butter stays creamy and sweet without separating into oil.',
        sensoryCue: 'Rich sweet dairy aroma with golden glossy sheen.',
        soundscapeType: 'whisk',
        spokenNarration: 'We toss the tajarin in sweet alpine butter and pasta water, creating a light emulsion that will carry our truffle aromatics.'
      },
      {
        stepNumber: 3,
        timeOffsetFormatted: '05:00',
        timeOffsetSeconds: 300,
        title: 'Plating & Alba Truffle Shaving Ceremony',
        actionDescription: 'Swirl the tajarin into heated porcelain plates. Using the razor truffle shaver, shave paper-thin translucent flakes of Alba white truffle directly over the hot steaming pasta.',
        ingredientAdditions: [
          {
            ingredientName: 'Fresh Alba White Winter Truffle',
            amount: '18g',
            technique: 'Shaved raw in continuous falling ribbons',
            timingNote: 'At 05:00'
          }
        ],
        toolsUsed: ['Adjustable Razor Truffle Shaver'],
        criticalControlPoint: 'Shave immediately while the pasta is hot so rising steam activates the fragile truffle esters.',
        sensoryCue: 'Immense, intoxicating wave of wild garlic, damp oak, and sweet forest musk fills the entire room.',
        soundscapeType: 'plating',
        spokenNarration: 'To finish, we shave the wild Alba white truffle table-side. The rising steam instantly volatilizes the complex forest musk and wild garlic esters.'
      }
    ],
    platingPresentation: 'Served on warm off-white Bernardaud porcelain with wide rims. The glistening golden nest of pasta is buried beneath paper-thin, marbled white truffle shavings.',
    sommelierPairing: {
      vintage: '2016 Giacomo Conterno Barolo Francia DOCG',
      terroir: 'Serralunga d’Alba, Piedmont',
      tastingNote: 'Earthy forest floor, dried rose petals, and refined tannins echo the Alba truffle while cutting through the rich 40-yolk butter.'
    },
    heroImageUrl: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?q=80&w=1200&auto=format&fit=crop',
    createdAt: new Date().toISOString()
  },
  {
    id: 'modena-balsamic-glazed-squab',
    primaryIngredientId: 'aceto-modena',
    primaryIngredientName: '25-Year Modena Extravecchio & Wild Morels',
    dishTitle: '25-Year Modena Balsamic Glazed Squab Breast with Wild Morels & Smoked Bone Marrow Emulsion',
    subtitle: 'Anjou pigeon breast glazed with solera balsamic reduction, butter-poached morels, and crispy herb glass',
    cuisine: 'French Haute Cuisine',
    tags: ['French Classic', 'Squab', 'Balsamic Extravecchio', 'Morels', 'Grand Master'],
    overview: 'A French haute cuisine tour-de-force. Plump Anjou squab breasts pan-roasted on the bone and basted in juniper foam, glazed in a glossy mahogany reduction of 25-year Aceto Balsamico Tradizionale di Modena, accompanied by hand-foraged spring morel caps stuffed with poultry mousseline and smoked marrow emulsion.',
    chefRationale: 'The intense 12-wood complex acids in Extravecchio balsamic dissolve squab gamey undertones into rich sweet dried plum and cedar notes.',
    difficulty: 'Haute Gastronomy',
    servings: 2,
    totalPrepTimeMinutes: 30,
    totalCookTimeMinutes: 20,
    overallDurationFormatted: '50 min',
    trendScore: 99.4,
    hotnessRank: 4,
    isHottest: true,
    awardBadge: '🔥 Trending No. 4 • Paris 3-Star Atelier Masterwork',
    flavorAromaProfile: {
      umami: 96,
      acidity: 75,
      aromaticIntensity: 97,
      textureComplexity: 96,
      finishLength: 97
    },
    requiredTools: [
      {
        id: 'copper-skillet-debuyer',
        name: 'Solid French Copper Round Skillet 28cm',
        category: 'Cookware',
        material: 'Solid 2.5mm French Copper with Cast Iron Handle',
        purpose: 'Provides laser-uniform searing of delicate game skin without scorching meat',
        proTip: 'Baste continuously with foamed butter'
      }
    ],
    ingredientsList: [
      {
        name: 'Prime French Anjou Squab Breasts',
        amount: '2 whole pigeons on crown',
        prepState: 'Aged 5 days, bone-in',
        addedAtMinute: 0,
        isArchiveSpecialty: false
      },
      {
        name: 'Aceto Balsamico Tradizionale di Modena DOP (25-Year Extravecchio)',
        amount: '45ml reduction glaze',
        prepState: 'Solera cask aged',
        addedAtMinute: 12,
        isArchiveSpecialty: true
      },
      {
        name: 'Wild Foraged Spring Morel Mushrooms',
        amount: '100g fresh prime caps',
        prepState: 'Cleaned, hollowed and stuffed',
        addedAtMinute: 6,
        isArchiveSpecialty: true
      }
    ],
    timelineSteps: [
      {
        stepNumber: 1,
        timeOffsetFormatted: '00:00',
        timeOffsetSeconds: 0,
        title: 'Crown Searing & Juniper Foaming',
        actionDescription: 'Sear the squab crowns skin-down in foaming cultured butter infused with bruised juniper berries and thyme until deep golden amber.',
        ingredientAdditions: [],
        toolsUsed: ['Solid French Copper Round Skillet 28cm'],
        criticalControlPoint: 'Internal breast core must not exceed 52°C for delicate rosy pink doneness.',
        sensoryCue: 'Crispy skin crackle with deep buttery woodland herbal aromas.',
        soundscapeType: 'sizzle',
        spokenNarration: 'We sear our squab crowns in foaming butter with wild juniper until the skin is shatteringly crisp.'
      },
      {
        stepNumber: 2,
        timeOffsetFormatted: '12:00',
        timeOffsetSeconds: 720,
        title: 'Solera Balsamic Glissade & Lacquer',
        actionDescription: 'Brush the resting squab breasts in warm 25-year Modena balsamic reduction. The natural sugars form a mirror-gloss mahogany lacquer.',
        ingredientAdditions: [],
        toolsUsed: ['Solid French Copper Round Skillet 28cm'],
        criticalControlPoint: 'Apply glaze off-flame to preserve delicate cherry and oak wood esters.',
        sensoryCue: 'Dark, syrupy glaze reflects like polished obsidian under station lights.',
        soundscapeType: 'drizzle',
        spokenNarration: 'We lacquer the rosy squab in solera-aged Modena balsamic until it shines like polished obsidian.'
      }
    ],
    platingPresentation: 'Plated on matte slate gray dishes with lacquered squab breasts sliced to reveal ruby pink meat, surrounded by butter-poached morels and drops of smoked marrow reduction.',
    sommelierPairing: {
      vintage: '2012 Domaine de la Romanée-Conti Grands Échézeaux',
      terroir: 'Burgundy, France',
      tastingNote: 'Vibrant sour cherries, forest floor, and silky tannins intertwine seamlessly with aged balsamic acidity.'
    },
    heroImageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200&auto=format&fit=crop',
    createdAt: new Date().toISOString()
  },
  {
    id: 'hokkaido-uni-kampot-pepper-tagliolini',
    primaryIngredientId: 'kampot-pepper',
    primaryIngredientName: 'Kampot White Pepper & Hokkaido Bafun Uni',
    dishTitle: 'Hokkaido Bafun Uni & Kampot White Pepper Hand-Cut Tagliolini with Sea Water Emulsion',
    subtitle: 'Silk egg tagliolini with fresh sea urchin tongues, freshly crushed floral white Kampot pepper, and finger lime',
    cuisine: 'Modernist Gastronomy',
    tags: ['Pasta', 'Uni', 'Kampot Pepper', 'Modernist', 'Grand Master'],
    overview: 'A breathtaking maritime creation uniting Japanese deep ocean sweetness and Cambodian grand cru terroir. Silk hand-rolled tagliolini tossed in sea-water butter emulsion, layered with golden-orange Hokkaido Bafun Uni tongues that melt into the steaming pasta, crowned with freshly cracked floral-citrus Kampot white peppercorns and Australian finger lime caviar.',
    chefRationale: 'Kampot white pepper contains unique floral monoterpenes and sharp piperine that cut through rich sea urchin lipids while amplifying the natural sweetness of marine iodine.',
    difficulty: 'Haute Gastronomy',
    servings: 2,
    totalPrepTimeMinutes: 15,
    totalCookTimeMinutes: 10,
    overallDurationFormatted: '25 min',
    trendScore: 99.2,
    hotnessRank: 5,
    isHottest: true,
    awardBadge: '🔥 Trending No. 5 • Tokyo Modernist Innovation Award',
    flavorAromaProfile: {
      umami: 98,
      acidity: 48,
      aromaticIntensity: 96,
      textureComplexity: 95,
      finishLength: 97
    },
    requiredTools: [
      {
        id: 'copper-pasta-tossing-pan',
        name: 'Italian Copper Sauté Pan with Brass Handle',
        category: 'Cookware',
        material: 'Solid Copper',
        purpose: 'Rapid emulsion blending without overheating delicate sea urchin proteins',
        proTip: 'Fold sea urchin gently at the very last moment'
      }
    ],
    ingredientsList: [
      {
        name: 'Fresh Grade AAA Hokkaido Bafun Uni',
        amount: '80g (approx. 10 whole tongues)',
        prepState: 'Chilled in sea water brine',
        addedAtMinute: 7,
        isArchiveSpecialty: true
      },
      {
        name: 'Whole Kampot White Peppercorns PGI',
        amount: '8g',
        prepState: 'Dry toasted, coarsely hand-crushed in stone mortar',
        addedAtMinute: 5,
        isArchiveSpecialty: true
      },
      {
        name: 'Hand-Cut Egg Tagliolini Pasta',
        amount: '180g',
        prepState: 'Fresh rolled',
        addedAtMinute: 0,
        isArchiveSpecialty: false
      }
    ],
    timelineSteps: [
      {
        stepNumber: 1,
        timeOffsetFormatted: '00:00',
        timeOffsetSeconds: 0,
        title: 'Flash Cooking Tagliolini & Pepper Starch Emulsion',
        actionDescription: 'Boil tagliolini for 2 minutes in salted ocean water. Toast crushed Kampot white peppercorns dry in copper pan, quench with hot pasta water, and emulsify with chilled seaweed butter.',
        ingredientAdditions: [],
        toolsUsed: ['Italian Copper Sauté Pan with Brass Handle'],
        criticalControlPoint: 'Keep temperature below 60°C before adding uni.',
        sensoryCue: 'Spicy citrus, eucalyptus, and toasted floral pepper perfume blossoms.',
        soundscapeType: 'simmer',
        spokenNarration: 'We emulsify our tagliolini with seaweed butter and freshly cracked floral Kampot white pepper.'
      },
      {
        stepNumber: 2,
        timeOffsetFormatted: '07:00',
        timeOffsetSeconds: 420,
        title: 'Bafun Uni Melting & Plating',
        actionDescription: 'Fold half the uni directly into the hot pasta off-heat until it melts into a golden oceanic crema. Twirl into hot bowls and crown with whole chilled uni tongues and finger lime caviar.',
        ingredientAdditions: [],
        toolsUsed: ['Italian Copper Sauté Pan with Brass Handle'],
        criticalControlPoint: 'Do not stir violently; preserve pristine shape of topping uni tongues.',
        sensoryCue: 'Creamy orange sauce coats every strand like liquid velvet.',
        soundscapeType: 'plating',
        spokenNarration: 'Off the heat, we fold in fresh Hokkaido sea urchin until it melts into silky liquid gold, then top with whole chilled uni.'
      }
    ],
    platingPresentation: 'Served in matte black ceramic bowls. Golden egg tagliolini glistening with uni crema, topped with bright orange whole uni lobes, crushed Kampot pepper crystals, and translucent citrus pearls.',
    sommelierPairing: {
      vintage: '2018 Domaine Leflaive Puligny-Montrachet 1er Cru Les Pucelles',
      terroir: 'Burgundy, France',
      tastingNote: 'Crystalline minerality, white peach, and subtle flinty reduction heighten sea urchin sweetness while matching Kampot pepper florals.'
    },
    heroImageUrl: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?q=80&w=1200&auto=format&fit=crop',
    createdAt: new Date().toISOString()
  },
  {
    id: 'kyoto-matcha-cloudberry-mirror-tart',
    primaryIngredientId: 'matcha-uji',
    primaryIngredientName: 'Ceremonial Uji Matcha & Arctic Cloudberries',
    dishTitle: 'Kyoto Ceremonial Uji Matcha & Golden Arctic Cloudberry Mirror Glaze Entremet',
    subtitle: 'Single-estate matcha mousse with wild Lapland cloudberry jewel insert and roasted buckwheat crisp',
    cuisine: 'Modernist Gastronomy',
    tags: ['Pastry & Confection', 'Matcha', 'Cloudberries', 'Mirror Glaze', 'Grand Master'],
    overview: 'A visually hypnotic botanical confectionery masterpiece. An emerald-green mirror glaze crafted from first-flush stoneground Uji matcha encasing an aerated ceremonial matcha white chocolate mousse, centered around a luminous tart amber wild Lapland cloudberry gelée, resting on a toasted soba buckwheat sablé Breton crust.',
    chefRationale: 'The astringent L-theanine and chlorophyll compounds in ceremonial Uji matcha form a harmonious contrast with the tart honey-apricot benzoic acidity of wild Arctic cloudberries.',
    difficulty: 'Grand Master Atelier',
    servings: 4,
    totalPrepTimeMinutes: 40,
    totalCookTimeMinutes: 30,
    overallDurationFormatted: '70 min',
    trendScore: 99.0,
    hotnessRank: 6,
    isHottest: true,
    awardBadge: '🔥 Trending No. 6 • World Pastry Grand Atelier Award',
    flavorAromaProfile: {
      umami: 82,
      acidity: 65,
      aromaticIntensity: 98,
      textureComplexity: 98,
      finishLength: 95
    },
    requiredTools: [
      {
        id: 'bamboo-chasen-whisk',
        name: 'Hand-Carved 100-Prong Bamboo Chasen Whisk',
        category: 'Extraction & Sieve',
        material: 'Single-Stem Kyoto Bamboo',
        purpose: 'Micro-aerates matcha liquor into velvety microfoam without metallic oxidation',
        proTip: 'Whisk in rapid W-strokes from the wrist'
      }
    ],
    ingredientsList: [
      {
        name: 'First-Flush Ceremonial Uji Matcha (Stoneground)',
        amount: '25g',
        prepState: 'Sifted twice through silk mesh',
        addedAtMinute: 10,
        isArchiveSpecialty: true
      },
      {
        name: 'Wild Lapland Arctic Cloudberries',
        amount: '150g prime whole berries',
        prepState: 'Gentle cryo-concentrated coulis',
        addedAtMinute: 0,
        isArchiveSpecialty: true
      }
    ],
    timelineSteps: [
      {
        stepNumber: 1,
        timeOffsetFormatted: '00:00',
        timeOffsetSeconds: 0,
        title: 'Cloudberry Coulis Heart Extraction',
        actionDescription: 'Gently simmer wild Lapland cloudberries with organic cane sugar and pectin NH to preserve natural amber jewel transparency. Freeze in silicone insert molds.',
        ingredientAdditions: [],
        toolsUsed: ['Solid French Copper Saucier 2.5mm'],
        criticalControlPoint: 'Keep temperature below 85°C to preserve radiant orange carotenoids.',
        sensoryCue: 'Exotic aroma of wild mountain apricot, honey, and pine sap.',
        soundscapeType: 'simmer',
        spokenNarration: 'We simmer our wild Lapland cloudberries gently to capture their radiant amber color and honey-apricot aroma.'
      },
      {
        stepNumber: 2,
        timeOffsetFormatted: '25:00',
        timeOffsetSeconds: 1500,
        title: 'Mirror Glaze Pour & Emerald Presentation',
        actionDescription: 'Whisk first-flush Uji matcha into mirror glaze at exactly 32°C. Pour smoothly over the frozen mousse spheres in a single sweeping motion.',
        ingredientAdditions: [],
        toolsUsed: ['Hand-Carved 100-Prong Bamboo Chasen Whisk'],
        criticalControlPoint: 'Glaze temperature must be precisely 31°C–32°C for mirror shine.',
        sensoryCue: 'Mirror-like emerald green glass reflects ambient candlelight flawlessly.',
        soundscapeType: 'drizzle',
        spokenNarration: 'We pour our emerald matcha mirror glaze at thirty-two degrees, coating the spheres in flawless liquid glass.'
      }
    ],
    platingPresentation: 'Presented on handcrafted Japanese black Raku ware ceramics. The glowing emerald mirror dome reflects candlelight, garnished with a single amber cloudberry and gold leaf.',
    sommelierPairing: {
      vintage: '2017 Château d’Yquem Sauternes 1er Cru Supérieur',
      terroir: 'Bordeaux, France',
      tastingNote: 'Candied citrus, honeyed saffron, and botrytis elegance balance the green tea tannins and elevate the golden cloudberries.'
    },
    heroImageUrl: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?q=80&w=1200&auto=format&fit=crop',
    createdAt: new Date().toISOString()
  },
  {
    id: 'cacio-e-pepe-autentico',
    primaryIngredientId: 'urfa-biber',
    primaryIngredientName: 'Tellicherry Black Peppercorn & Pecorino Romano',
    dishTitle: 'Cacio e Pepe Autentico con Pepe Tellicherry Tostato e Pecorino DOP',
    subtitle: 'Tonnarelli pasta emulsified with Pecorino Romano DOP and toasted Tellicherry pepper',
    cuisine: 'Italian',
    tags: ['Pasta', 'Roman Classic', 'Emulsion Physics', 'Comfort Gastronomy'],
    overview: 'The Roman culinary masterpiece defined by thermal starch-lipid micro-emulsion. Coarsely cracked black tellicherry peppercorns toasted in bronze dry skillets create piperine blooming, whisked with hot pasta water starch and 24-month Pecorino Romano DOP into a glossy, lump-free crema.',
    chefRationale: 'The phase boundary of Pecorino proteins coagulates above 65°C into rubbery strands. By keeping pasta cooking water at exactly 60°C to 62°C, the cheese forms a velvety continuous emulsion.',
    difficulty: 'Advanced',
    servings: 2,
    totalPrepTimeMinutes: 5,
    totalCookTimeMinutes: 15,
    overallDurationFormatted: '20 min',
    trendScore: 98.8,
    hotnessRank: 7,
    isHottest: true,
    awardBadge: '🔥 Trending No. 7 • Roman Trastevere Master Classic',
    flavorAromaProfile: {
      umami: 88,
      acidity: 45,
      aromaticIntensity: 94,
      textureComplexity: 90,
      finishLength: 92
    },
    requiredTools: [
      {
        id: 'pan-padella-alluminio-2',
        name: 'Heavy-Gauge Italian Aluminum Skillet 28cm',
        category: 'Cookware',
        material: 'Raw Food-Grade Aluminum (3mm)',
        purpose: 'Provides instantaneous temperature drop when removing from heat to prevent cheese curdling',
        proTip: 'Toss pasta with vigorous wrist flick to aerate and bind sauce'
      }
    ],
    ingredientsList: [
      {
        name: 'Artisanal Bronze-Die Tonnarelli Pasta',
        amount: '200g',
        prepState: 'High-protein durum semolina pasta',
        addedAtMinute: 0,
        isArchiveSpecialty: false
      },
      {
        name: 'Pecorino Romano DOP Stagionato (24 Months)',
        amount: '120g',
        prepState: 'Finely grated into cloud-like powder at room temp',
        addedAtMinute: 12,
        isArchiveSpecialty: true
      },
      {
        name: 'Whole Tellicherry Black Peppercorns',
        amount: '12g (approx. 2 tbsp)',
        prepState: 'Coarsely cracked in granite mortar',
        addedAtMinute: 6,
        isArchiveSpecialty: true
      }
    ],
    timelineSteps: [
      {
        stepNumber: 1,
        timeOffsetFormatted: '00:00',
        timeOffsetSeconds: 0,
        title: 'Pasta Water Calibration & Tonnarelli Drop',
        actionDescription: 'Bring 2.5 liters of water to a rolling boil with 10g sea salt. Drop the tonnarelli pasta. Cook for 7 minutes to ensure high starch extraction in minimal water volume.',
        ingredientAdditions: [],
        toolsUsed: ['Heavy-Gauge Italian Aluminum Skillet 28cm'],
        criticalControlPoint: 'Keep water volume lower than usual to concentrate released amylose starch molecules.',
        sensoryCue: 'Water transforms into a cloudy, shimmering, starch-rich liquor.',
        soundscapeType: 'simmer',
        spokenNarration: 'We drop our tonnarelli into minimal boiling water to produce a dense starch broth.'
      },
      {
        stepNumber: 2,
        timeOffsetFormatted: '06:00',
        timeOffsetSeconds: 360,
        title: 'Piperine Bloom & Peppercorn Toasting',
        actionDescription: 'Toast cracked peppercorns in dry skillet until fragrant. Deglaze with hot pasta water, then toss tonnarelli until coated in starch cream.',
        ingredientAdditions: [],
        toolsUsed: ['Heavy-Gauge Italian Aluminum Skillet 28cm'],
        criticalControlPoint: 'Pull pan off-heat before folding grated cheese under 63°C.',
        sensoryCue: 'Luxurious creamy sheen wraps every strand with zero separation.',
        soundscapeType: 'whisk',
        spokenNarration: 'We toast the pepper, emulsify with pasta starch, and fold in aged Pecorino off the heat.'
      }
    ],
    platingPresentation: 'Spun into a high architectural pasta nest in deep matte graphite bowls. Finished with freshly cracked toasted pepper.',
    sommelierPairing: {
      vintage: '2020 Frascati Superiore Riserva DOCG',
      terroir: 'Lazio, Italy',
      tastingNote: 'Crisp minerality and vibrant malic acidity slice through sheep milk fat.'
    },
    heroImageUrl: 'https://images.unsplash.com/photo-1621996346565-e3d5d6281691?q=80&w=1200&auto=format&fit=crop',
    createdAt: new Date().toISOString()
  },
  {
    id: 'venison-carpaccio-kalamata-truffle',
    primaryIngredientId: 'kalamata-oil',
    primaryIngredientName: 'Estate Kalamata EVOO & Alpine Red Venison',
    dishTitle: 'Cold-Smoked Alpine Red Venison Carpaccio with Organic Kalamata EVOO, Juniper Ash & Black Truffle Caviar',
    subtitle: 'Paper-thin wild venison loin cured with wild mountain juniper, cold-pressed Greek olive oil, and sphereized truffle pearls',
    cuisine: 'Nordic & Boreal',
    tags: ['Crudo & Carpaccio', 'Venison', 'Kalamata EVOO', 'Truffle Caviar', 'Advanced'],
    overview: 'An alpine forest symphony. Wild red venison loin lightly cold-smoked over dried juniper branches and crusted in pine ash, sliced into translucent ruby ribbons, bathed in single-estate Kalamata EVOO, and adorned with black truffle caviar pearls and pickled lingonberries.',
    chefRationale: 'The rich polyphenol content of early-harvest Kalamata EVOO coats wild venison game proteins, harmonizing with natural iron minerality.',
    difficulty: 'Haute Gastronomy',
    servings: 2,
    totalPrepTimeMinutes: 20,
    totalCookTimeMinutes: 5,
    overallDurationFormatted: '25 min',
    trendScore: 98.6,
    hotnessRank: 8,
    isHottest: true,
    awardBadge: '🔥 Trending No. 8 • Nordic Michelin Atelier Selection',
    flavorAromaProfile: {
      umami: 94,
      acidity: 55,
      aromaticIntensity: 95,
      textureComplexity: 92,
      finishLength: 94
    },
    requiredTools: [
      {
        id: 'slicing-knife-damascus',
        name: 'Razor-Sharp Damascus Slicing Knife 240mm',
        category: 'Cutlery',
        material: '67-Layer Damascus Steel',
        purpose: 'Achieves paper-thin translucent carpaccio slices without tearing game grain',
        proTip: 'Partially chill meat for 30 minutes before slicing'
      }
    ],
    ingredientsList: [
      {
        name: 'Wild Alpine Red Venison Loin',
        amount: '160g',
        prepState: 'Trimmed and lightly smoked',
        addedAtMinute: 0,
        isArchiveSpecialty: false
      },
      {
        name: 'Organic Estate Kalamata Extra Virgin Olive Oil',
        amount: '40ml',
        prepState: 'Cold-pressed, unfiltered',
        addedAtMinute: 5,
        isArchiveSpecialty: true
      },
      {
        name: 'Black Truffle Sphereized Caviar',
        amount: '20g',
        prepState: 'Suspended in truffle essence',
        addedAtMinute: 6,
        isArchiveSpecialty: true
      }
    ],
    timelineSteps: [
      {
        stepNumber: 1,
        timeOffsetFormatted: '00:00',
        timeOffsetSeconds: 0,
        title: 'Translucent Slicing & Cold Drizzle',
        actionDescription: 'Slice the cold-smoked venison into 0.5mm translucent ribbons. Arrange in circular waves on chilled plates. Drizzle generously with Kalamata EVOO and sphereized truffle caviar.',
        ingredientAdditions: [],
        toolsUsed: ['Razor-Sharp Damascus Slicing Knife 240mm'],
        criticalControlPoint: 'Keep plates chilled at 4°C so fat remains delicate.',
        sensoryCue: 'Crisp pine needles, peppery green olive oil, and earthy truffle fragrance.',
        soundscapeType: 'plating',
        spokenNarration: 'We arrange the translucent ruby venison and bathe it in peppery Kalamata olive oil and truffle caviar.'
      }
    ],
    platingPresentation: 'Arranged in concentric ruby ribbons on chilled slate, topped with glistening black truffle pearls, micro mountain sorrel, and golden olive oil droplets.',
    sommelierPairing: {
      vintage: '2017 Tenuta San Guido Sassicaia Bolgheri DOC',
      terroir: 'Tuscany, Italy',
      tastingNote: 'Dark cassis, cedar wood, and fine savory herbs enhance the juniper smoke and venison depth.'
    },
    heroImageUrl: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=1200&auto=format&fit=crop',
    createdAt: new Date().toISOString()
  }
];
