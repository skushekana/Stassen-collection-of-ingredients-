import { Ingredient, IngredientCategory, WorldRegion, HarvestSeason, RegionInfo } from '../types';

export const INITIAL_INGREDIENTS: Ingredient[] = [
  {
    id: 'truffle-alba',
    name: 'Alba White Winter Truffle',
    scientificName: 'Tuber magnatum pico',
    category: 'Wild Fungi & Truffles',
    origin: 'Langhe & Roero Hills, Piedmont',
    country: 'Italy',
    region: 'Mediterranean & Southern Europe',
    season: 'Autumn',
    harvestWindow: 'October through December',
    flavorNotes: ['Wild Garlic', 'Sweet Methane', 'Wet Oak Leaf', 'Matured Camembert', 'Hazelnut Skin'],
    flavorProfile: {
      umami: 96,
      aroma: 100,
      acidity: 10,
      sweetness: 20,
      bitterness: 15,
      pungency: 60,
      depth: 98
    },
    imageUrl: 'https://images.unsplash.com/photo-1541544741938-0af808871cc0?q=80&w=1200&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1541544741938-0af808871cc0?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1200&auto=format&fit=crop'
    ],
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-chef-shaving-truffle-on-a-gourmet-dish-42869-large.mp4',
    description: 'The supreme diamond of world gastronomy. Alba whites cannot be cultivated and are foraged in deep secrecy with lagotto romagnolo hounds along shaded oak, poplar, and willow riverbanks. Shaved raw at body temperature, its volatile perfumes envelop the palate in sheer ecstasy.',
    terroir: 'Calcareous marl and alkaline clay soils of the Tanaro river valley, humid temperate forest floors shrouded in dense autumn fog (la nebbia).',
    culinaryApplications: [
      'Shaved paper-thin raw over buttered Tajarin 40-yolk pasta',
      'Grated table-side over soft poached eggs and mountain fonduta',
      'Finishing touch over 7-year Acquerello carnaroli risotto'
    ],
    pairings: [
      { ingredient: 'Aged Grass-Fed Butter', harmony: 'Fat Carrier', note: 'Volatile dimethyl sulfide aroma binds instantly to warm milk fat.' },
      { ingredient: 'Egg Yolks (Rich Beta-Carotene)', harmony: 'Rich Emulsion', note: 'Custardy yolks highlight pungent fungal musk.' },
      { ingredient: 'Barolo DOCG', harmony: 'Regional Harmony', note: 'Nebbiolo tar and rose notes mirror forest floor aromas.' }
    ],
    relatedIngredientIds: ['aceto-modena', 'saffron-kozani', 'fleur-sel-guerande'],
    rarityIndex: 'Ultra Rare Reserve',
    storageAdvice: 'Wrapped in dry parchment paper inside a glass jar with fresh eggs; replace paper daily. Consume within 5 to 7 days.',
    curatorNotes: 'Never cook white truffles; heat destroys the delicate aromatic compounds. Serve exclusively at body temperature.',
    harvestMethod: 'Hand-dug with ancestral zappino spades following lagotto hound indications.'
  },
  {
    id: 'beluga-caviar-royal',
    name: 'Beluga Hybrid Imperial Sturgeon Caviar',
    scientificName: 'Huso huso × Acipenser ruthenus',
    category: 'Heritage Salts & Minerals',
    origin: 'Caspian Coastal Reserve, Northern Alps',
    country: 'Italy / Northern Waters',
    region: 'Mediterranean & Southern Europe',
    season: 'Perennial / Year-Round',
    harvestWindow: 'Spring & Autumn Malossol Selection',
    flavorNotes: ['Creamy Hazelnut', 'Clean Ocean Brine', 'Mineral Butter', 'Velvety Lipids', 'Sweet Crisp Pop'],
    flavorProfile: {
      umami: 98,
      aroma: 92,
      acidity: 15,
      sweetness: 40,
      bitterness: 10,
      pungency: 10,
      depth: 99
    },
    imageUrl: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?q=80&w=1200&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1200&auto=format&fit=crop'
    ],
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-chef-baking-chocolate-sweets-in-a-pan-42867-large.mp4',
    description: 'The pinnacle of maritime luxury. Huge 3.2mm slate-grey pearls cured strictly using the traditional Russian Malossol ("little salt") method (<3.5% salt). Each bead pops with sublime hazelnut cream and crisp oceanic sweetness without a trace of bitterness.',
    terroir: 'Glacial spring water basins fed by alpine runoffs, maintaining a constant 11°C oxygen-saturated habitat replicating the Caspian Sea currents.',
    culinaryApplications: [
      'Served pure off the back of the hand or with natural mother-of-pearl spoons',
      'Crowned over warm buckwheat blinis with cultured crême fraîche',
      'Draped over charcoal-grilled langoustine or cold-smoked bone marrow'
    ],
    pairings: [
      { ingredient: 'Crème Fraîche d’Isigny', harmony: 'Lactic Cushion', note: 'Cultured cream fat cushions iodine salinity and prolongs finish.' },
      { ingredient: 'Dom Pérignon P2 Vintage', harmony: 'Chalk & Bubble Cut', note: 'Vibrant brioche acidity cuts through caviar oil beads.' },
      { ingredient: 'Buckwheat Sourdough', harmony: 'Earthy Crisp', note: 'Nutty grain contrasts glossy pearl textures.' }
    ],
    relatedIngredientIds: ['fleur-sel-guerande', 'truffle-alba', 'kombu-rishiri'],
    rarityIndex: 'Ultra Rare Reserve',
    storageAdvice: 'Store at -2°C to 2°C in the coldest section of cellar ice baths. Consume within 24 hours of opening.',
    curatorNotes: 'Selected from mature 16-year sturgeons with glistening 3.2mm grade AAA diameter pearls.',
    harvestMethod: 'Single-fish malossol hand-sieve extraction under sterile temperature-regulated cold rooms.'
  },
  {
    id: 'wagyu-miyazaki-a5',
    name: 'Miyazaki Gyu A5 BMS 12 Champion Wagyu',
    scientificName: 'Bos taurus var. Kuroge Washu',
    category: 'Specialty Oils & Fats',
    origin: 'Miyazaki Prefecture, Kyushu',
    country: 'Japan',
    region: 'East Asia',
    season: 'Perennial / Year-Round',
    harvestWindow: 'Aged 30+ months on roasted barley & spring water',
    flavorNotes: ['Sweet Peach Oleic Fat', 'Toasted Hazelnut', 'Warm Dairy Lactones', 'Silky Marrow', 'Melt-in-Mouth Umami'],
    flavorProfile: {
      umami: 99,
      aroma: 95,
      acidity: 5,
      sweetness: 60,
      bitterness: 5,
      pungency: 10,
      depth: 98
    },
    imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1558030006-450675393462?q=80&w=1200&auto=format&fit=crop'
    ],
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-cooking-meat-in-a-pan-42866-large.mp4',
    description: 'Winner of the Prime Minister’s Award at the Wagyu Olympics for four consecutive iterations. Renowned for its intricate snowflake marbling (BMS 12) rich in oleic acid with a melting point of just 25°C—literally dissolving upon tongue contact into sweet, aromatic beef nectar.',
    terroir: 'Warm sun-drenched volcanic pastures of Kyushu, fresh spring water from the Kirishima mountain range, and a pristine diet of roasted barley, sweet potato, and rice straw.',
    culinaryApplications: [
      'Flash-seared over Kishu Binchotan white charcoal and seasoned with sea salt',
      'Micro-thin Shabu-Shabu dipped in 80°C Kombu dashi broth for 3 seconds',
      'Aburi nigiri torched with aged nikiri soy and freshly grated wasabi'
    ],
    pairings: [
      { ingredient: 'Fresh Shizuoka Wasabi', harmony: 'Sinigrin Balance', note: 'Spicy sinigrin cuts through dense oleic fat and unlocks sweet beef sugars.' },
      { ingredient: 'Aged Tamari Shoyu', harmony: 'Amino Acid Fusion', note: 'Concentrated soy glutamates fuse with beef inosinic acid.' },
      { ingredient: 'Red Mountain Wine', harmony: 'Tannin Structure', note: 'Dense tannins strip palate cleanly between bites.' }
    ],
    relatedIngredientIds: ['sansho-wakayama', 'matsutake-nagano', 'fleur-sel-guerande'],
    rarityIndex: 'Ultra Rare Reserve',
    storageAdvice: 'Keep sub-zero vacuum sealed at -1°C. Allow to temper to 15°C for 20 minutes before flash cooking.',
    curatorNotes: 'Certified BMS 12 grade with an extraordinary oleic acid index exceeding 58%.',
    harvestMethod: 'Artisanal single-lineage pedigree breeding with strict genealogical registration.'
  },
  {
    id: 'saffron-kozani',
    name: 'Krokos Kozanis PDO Red Saffron',
    scientificName: 'Crocus sativus',
    category: 'Rare Spices',
    origin: 'Kozani, Western Macedonia',
    country: 'Greece',
    region: 'Mediterranean & Southern Europe',
    season: 'Autumn',
    harvestWindow: 'Late October (20-day bloom window)',
    flavorNotes: ['Sun-dried Hay', 'Iodine Warmth', 'Metallic Sweetness', 'Smoky Honey', 'Earthy Floral'],
    flavorProfile: {
      umami: 30,
      aroma: 99,
      acidity: 20,
      sweetness: 40,
      bitterness: 55,
      pungency: 25,
      depth: 94
    },
    imageUrl: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?q=80&w=1200&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1509358271058-acd22cc93898?q=80&w=1200&auto=format&fit=crop'
    ],
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-spices-falling-into-a-wooden-bowl-41484-large.mp4',
    description: 'Widely regarded as the world’s most potent red saffron stigmas. Every individual filament is hand-plucked from lilac crocuses during a hyper-compressed sunrise harvesting season, then slowly toasted over natural silk sieves.',
    terroir: 'High plateau alluvial soils rich in calcium carbonate, baked under dry Mediterranean sun with cool mountain winds from the Pindus Range.',
    culinaryApplications: [
      'Infused at 40°C in mineral water or goat whey before folding into risotto',
      'Steeped in raw cream for pastry custards and brioches',
      'Gently ground into shellfish veloutés and bouillabaisse reductions'
    ],
    pairings: [
      { ingredient: 'Raw Milk Butter', harmony: 'Fat-Soluble Extraction', note: 'Lipids dissolve crocin and safranal molecules gently without scorched bitterness.' },
      { ingredient: 'Langoustine', harmony: 'Marine Sweetness', note: 'Sweet crustaceans balance iodine-hay aromatics.' },
      { ingredient: 'Bitter Almond', harmony: 'Nutty Resonances', note: 'Benzaldehyde notes intertwine with safranal.' }
    ],
    relatedIngredientIds: ['aceto-modena', 'fleur-sel-guerande', 'bergamot-calabria'],
    rarityIndex: 'Ultra Rare Reserve',
    storageAdvice: 'Store in opaque violet Miron glass at cellar temperature away from thermal fluctuations. Stigmas mature over 12 months.',
    curatorNotes: 'Over 85,000 crocus blossoms are required to yield 500 grams of dried red threads.',
    harvestMethod: 'Hand-picked flower-by-flower at dawn before petals open under direct sunlight.'
  },
  {
    id: 'uni-hokkaido-bafun',
    name: 'Hokkaido Ezo Bafun Sea Urchin (Uni)',
    scientificName: 'Strongylocentrotus intermedius',
    category: 'Foraged Botanicals',
    origin: 'Rishiri & Rebun Islands, Hokkaido',
    country: 'Japan',
    region: 'East Asia',
    season: 'Summer',
    harvestWindow: 'June through August',
    flavorNotes: ['Sweet Ocean Nectar', 'Kombu Kelp Essence', 'Silky Custard', 'Iodine Mineral', 'Golden Umami'],
    flavorProfile: {
      umami: 99,
      aroma: 90,
      acidity: 10,
      sweetness: 85,
      bitterness: 10,
      pungency: 5,
      depth: 97
    },
    imageUrl: 'https://images.unsplash.com/photo-1611143669185-af224c5e3252?q=80&w=1200&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1611143669185-af224c5e3252?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1200&auto=format&fit=crop'
    ],
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-chef-baking-chocolate-sweets-in-a-pan-42867-large.mp4',
    description: 'The golden crown of cold-water ocean foraging. Bafun sea urchins feed exclusively on wild Rishiri and Rausu kelp in the icy, mineral-rich Okhotsk currents. Their bright orange roe tongues have an unforgettable, melt-on-the-tongue creaminess brimming with sweet maritime sugars and deep umami.',
    terroir: 'Basalt ocean sea beds around sub-polar volcanic islands, where frigid Oyashio currents surge with nutrient-dense plankton and ancient kelp forests.',
    culinaryApplications: [
      'Served raw over warm hand-formed koshihikari sushi rice (Nigiri)',
      'Folded into hand-cut egg tagliolini with sea water emulsion and Kampot pepper',
      'Gently torched with binchotan and crowned on Wagyu carpaccio'
    ],
    pairings: [
      { ingredient: 'Hand-Cut Egg Pasta', harmony: 'Emulsion Vehicle', note: 'Egg pasta starches emulsify with raw uni into decadent golden sauce.' },
      { ingredient: 'Junmai Daiginjo Sake', harmony: 'Koji Sweetness', note: 'Polished rice aromatics elevate sweet glycine notes.' },
      { ingredient: 'Nori Seaweed Crisp', harmony: 'Texture Contrast', note: 'Crisp roasted seaweed cradles pillowy custard roe.' }
    ],
    relatedIngredientIds: ['kombu-rishiri', 'matsutake-nagano', 'yuzu-kochi'],
    rarityIndex: 'Ultra Rare Reserve',
    storageAdvice: 'Keep chilled in cedar wooden geta boxes at 1°C to 3°C on beds of shaved ice. Consume within 48 hours.',
    curatorNotes: 'Packed without chemical alum astringents (Ensu Sea Water Uni) preserving authentic ocean purity.',
    harvestMethod: 'Freedived by certified single-line divers using glass-bottomed look-boxes.'
  },
  {
    id: 'matsutake-nagano',
    name: 'Nagano Wild Matsutake',
    scientificName: 'Tricholoma matsutake',
    category: 'Wild Fungi & Truffles',
    origin: 'Kiso Valley, Nagano Prefecture',
    country: 'Japan',
    region: 'East Asia',
    season: 'Autumn',
    harvestWindow: 'Late September – Early November',
    flavorNotes: ['Red Pine Needle', 'Spicy Cinnamon', 'Deep Umami', 'Petrichor', 'Resinous Earth'],
    flavorProfile: {
      umami: 95,
      aroma: 98,
      acidity: 15,
      sweetness: 25,
      bitterness: 30,
      pungency: 45,
      depth: 92
    },
    imageUrl: 'https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?q=80&w=1200&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1200&auto=format&fit=crop'
    ],
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-mushrooms-in-a-forest-close-up-42868-large.mp4',
    description: 'Prized for millennia in Japanese court cuisine, wild Matsutake mushrooms thrive exclusively in mycorrhizal symbiosis with red pine (Pinus densiflora) roots on rugged alpine slopes. Their piercing, cedar-like aroma and robust, meaty texture command reverent minimalism in the kitchen.',
    terroir: 'Volcanic granitic slopes between 800m and 1,400m elevation. Heavy mist mornings and dramatic diurnal temperature shifts concentrate essential pinene terpenes in the fungal caps.',
    culinaryApplications: [
      'Charcoal-grilled over binchotan with sudachi citrus',
      'Steamed inside dobin mushi earthen pots with dashi broth',
      'Folded into freshly cooked shinmai autumn rice'
    ],
    pairings: [
      { ingredient: 'Kombu Dashi', harmony: 'Synergistic Umami', note: 'Glutamates bind with matsutake ribonucleotides for explosive savory depth.' },
      { ingredient: 'Sudachi Citrus', harmony: 'Contrast', note: 'Bright citric sharpness pierces dense pine resin notes.' },
      { ingredient: 'Duck Consommé', harmony: 'Warmth', note: 'Rich game fat cushions delicate woody aromatics.' }
    ],
    relatedIngredientIds: ['kombu-rishiri', 'sansho-wakayama', 'yuzu-kochi'],
    rarityIndex: 'Ultra Rare Reserve',
    storageAdvice: 'Wrap individually in unbleached porous paper and store at 3°C to 5°C. Consume within 72 hours of harvest to preserve fleeting aromatic oils.',
    curatorNotes: 'Harvested at daybreak before the cap breaks veil, retaining 100% of internal moisture and volatile pinene fractions.',
    harvestMethod: 'Hand-foraged with bamboo pry sticks to protect delicate subterranean mycelial nets.'
  },
  {
    id: 'aceto-modena',
    name: 'Aceto Balsamico Tradizionale di Modena Extravecchio 25yr',
    scientificName: 'Vitis vinifera must ferment',
    category: 'Ferments & Vinegars',
    origin: 'Castelvetro di Modena, Emilia-Romagna',
    country: 'Italy',
    region: 'Mediterranean & Southern Europe',
    season: 'Perennial / Year-Round',
    harvestWindow: 'Bottled annually in micro-lots from secular batteria barrels',
    flavorNotes: ['Caramelized Fig', 'Oak Tannin', 'Cherry Wood Resin', 'Molasses Glaze', 'Velvety Acetic Spark'],
    flavorProfile: {
      umami: 88,
      aroma: 92,
      acidity: 78,
      sweetness: 85,
      bitterness: 35,
      pungency: 40,
      depth: 99
    },
    imageUrl: 'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?q=80&w=1200&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1508746829417-e6f548d8d6ed?q=80&w=1200&auto=format&fit=crop'
    ],
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-pouring-olive-oil-into-a-bowl-41584-large.mp4',
    description: 'A dark, syrupy elixir produced exclusively from simmered Trebbiano and Lambrusco grape musts. Aged for a minimum of 25 years in descending batteries of oak, chestnut, cherry, ash, and juniper casks nestled in traditional attic acetaie exposed to winter freezes and scorching summers.',
    terroir: 'Po Valley plains characterized by damp, bone-chilling winters and torrid continental summers, driving hyper-concentration through attic barrel pores.',
    culinaryApplications: [
      'Drizzled drop-by-drop onto aged Parmigiano Reggiano Stravecchio',
      'Glazed over wild woodcock, roast quail, or seared squab',
      'Finishing drops on fresh mountain strawberries or fior di latte gelato'
    ],
    pairings: [
      { ingredient: 'Parmigiano-Reggiano 36M', harmony: 'Crystal Crystallization', note: 'Tyrosine salt crystals melt into sweet acid viscosity.' },
      { ingredient: 'Foie Gras Poêlé', harmony: 'Acid Balance', note: 'Pierces rich lipids with dark molasses complexities.' },
      { ingredient: 'Wild Raspberries', harmony: 'Berry Acidity', note: 'Amplifies wild floral esters in fresh stone fruits.' }
    ],
    relatedIngredientIds: ['saffron-kozani', 'truffle-alba', 'fleur-sel-guerande'],
    rarityIndex: 'Ultra Rare Reserve',
    storageAdvice: 'Room temperature in sealed glass bottle. Indefinite shelf life; never refrigerate.',
    curatorNotes: 'Certified by the Consorzio Produttori and packaged only in the iconic Giugiaro bulbous flacon.'
  },
  {
    id: 'matcha-ujitawara',
    name: 'Single Estate Gokou Ceremonial Uji Matcha',
    scientificName: 'Camellia sinensis var. Gokou',
    category: 'Cultivated Teas & Tisanes',
    origin: 'Ujitawara, Kyoto Prefecture',
    country: 'Japan',
    region: 'East Asia',
    season: 'Spring',
    harvestWindow: 'Early May (First Flush / Shincha)',
    flavorNotes: ['Silky Cream', 'Sweet White Grass', 'Oceanic Umami', 'Pistachio Blossom', 'Clean Mineral Finish'],
    flavorProfile: {
      umami: 94,
      aroma: 90,
      acidity: 10,
      sweetness: 65,
      bitterness: 35,
      pungency: 5,
      depth: 90
    },
    imageUrl: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?q=80&w=1200&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1576092768241-dec231879fc3?q=80&w=1200&auto=format&fit=crop'
    ],
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-pouring-green-tea-in-a-cup-41585-large.mp4',
    description: 'Cultivated under traditional straw reed canopies (Honzu shading) for 28 days before picking. Shading forces the tea bush to pump massive amounts of L-theanine amino acids into the tender leaves, milled stone by stone at 40g per hour on granite querns into luminous emerald foam.',
    terroir: 'River valley mists rising from the Uji River, acidic clay loam soil with supreme drainage, and deep autumn leaf compost.',
    culinaryApplications: [
      'Whisked traditionally with a bamboo chasen as ceremonial Usucha or dense Koicha',
      'Folded into French white chocolate ganache or opera mirror glaze entremets',
      'Infused into modern culinary broths with sea urchin or abalone'
    ],
    pairings: [
      { ingredient: 'Hokkaido Sea Urchin (Uni)', harmony: 'Umami Resonance', note: 'L-theanine and glycine create velvet maritime sweetness.' },
      { ingredient: 'Aged White Chocolate', harmony: 'Fat Carrier', note: 'Cocoa butter rounds out delicate grassy tannins.' },
      { ingredient: 'Adzuki Bean Paste', harmony: 'Historic Harmony', note: 'Earthy legume sugars balance tea astringency.' }
    ],
    relatedIngredientIds: ['kombu-rishiri', 'matsutake-nagano', 'yuzu-kochi'],
    rarityIndex: 'Ultra Rare Reserve',
    storageAdvice: 'Sealed vacuum can in freezer at -18°C. Once opened, store refrigerated and consume within 30 days.',
    curatorNotes: 'Single cultivar (Gokou) grown without chemical fertilizers on an 8th-generation family plot.'
  },
  {
    id: 'cloudberry-lapland',
    name: 'Wild Arctic Lapland Cloudberry',
    scientificName: 'Rubus chamaemorus',
    category: 'Foraged Botanicals',
    origin: 'Norrbotten & Lapland Bogs',
    country: 'Sweden / Finland',
    region: 'Nordic & Boreal',
    season: 'Summer',
    harvestWindow: 'Late July to Mid August (Midnight Sun harvest)',
    flavorNotes: ['Baked Apricot', 'Honeyed Apple', 'Wild Lingonberry Tart', 'Musky Amber', 'Crisp Pine Breeze'],
    flavorProfile: {
      umami: 10,
      aroma: 92,
      acidity: 80,
      sweetness: 70,
      bitterness: 20,
      pungency: 10,
      depth: 85
    },
    imageUrl: 'https://images.unsplash.com/photo-1509358271058-acd22cc93898?q=80&w=1200&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1509358271058-acd22cc93898?q=80&w=1200&auto=format&fit=crop'
    ],
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-strawberries-and-blackberries-in-a-bowl-42870-large.mp4',
    description: 'Often called the "Arctic Gold." Cloudberries grow individually on solitary stems amidst treacherous, knee-deep peat moss bogs under 24 hours of continuous Arctic midnight sun, distilling concentrated amber sweetness and tart berry esters.',
    terroir: 'Acidic, nutrient-scarce boreal peat bogs blanketed by snow 7 months a year, where permafrost melts into pristine glacier streams.',
    culinaryApplications: [
      'Warmed and served over traditional Finnish squeaky bread cheese (Leipäjuusto)',
      'Fermented into sparkling wild botanical vinegars and meads',
      'Infused into duck liver terrines or cured Arctic char dishes'
    ],
    pairings: [
      { ingredient: 'Warm Reindeer Milk / Finnish Bread Cheese', harmony: 'Warmth & Salt', note: 'Caramelized cheese curd melts into golden fruit acids.' },
      { ingredient: 'Smoked Juniper Bacon', harmony: 'Smoke vs Fruit', note: 'Wood smoke bridges sweet amber berry notes.' },
      { ingredient: 'Birch Bark Syrup', harmony: 'Boreal Harmony', note: 'Woodsy mineral sugars cradle delicate berry seeds.' }
    ],
    relatedIngredientIds: ['fleur-sel-guerande', 'matsutake-nagano', 'vanilla-pompona'],
    rarityIndex: 'Rare Seasonal Harvest',
    storageAdvice: 'Extremely delicate. Must be snap frozen immediately or preserved in natural pectin sugar within hours of harvest.',
    curatorNotes: 'Foragers guard their secret mire coordinates fiercely across generations.'
  },
  {
    id: 'yuzu-kochi',
    name: 'Kuma Village Highland Yuzu',
    scientificName: 'Citrus junos',
    category: 'Foraged Botanicals',
    origin: 'Kochi Prefecture, Shikoku',
    country: 'Japan',
    region: 'East Asia',
    season: 'Winter',
    harvestWindow: 'November through January',
    flavorNotes: ['Wild Mandarin', 'Floral Grapefruit', 'Pine Needle Zest', 'Green Thyme', 'Tart Blossom'],
    flavorProfile: {
      umami: 10,
      aroma: 96,
      acidity: 92,
      sweetness: 30,
      bitterness: 45,
      pungency: 25,
      depth: 70
    },
    imageUrl: 'https://images.unsplash.com/photo-1534856966150-c832f7e7a06a?q=80&w=1200&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1534856966150-c832f7e7a06a?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1518843875459-f738682238a6?q=80&w=1200&auto=format&fit=crop'
    ],
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-slicing-a-lemon-with-a-knife-41582-large.mp4',
    description: 'Grown on steep terraced hillsides along the pristine Niyodo River. Mountain-grown yuzu develops an exceptionally thick, bumpy rind saturated with unique terpenes (yuzunone and yuzulactone) that remain luminous even when heated.',
    terroir: 'Subtropical highlands with 2,500mm annual rainfall and crystal-clear mountain drainage over slate soils.',
    culinaryApplications: [
      'Micro-planed fresh zest over raw seabream or scallop crudo',
      'Fermented with green bird’s eye chilis and sea salt into artisanal Yuzukoshō',
      'Whisked into dashi ponzu or botanical cocktail infusions'
    ],
    pairings: [
      { ingredient: 'Raw Scallops', harmony: 'Citric Lift', note: 'Acids cut through scallop glycogen sweetness with electrifying vibrancy.' },
      { ingredient: 'White Sesame Paste', harmony: 'Bitter Sweetness', note: 'Nutty sesamin balances fragrant rind astringency.' },
      { ingredient: 'Rich Pork Broth', harmony: 'Clean Finish', note: 'Cuts fatty collagen cleanly on the finish.' }
    ],
    relatedIngredientIds: ['sansho-wakayama', 'kombu-rishiri', 'bergamot-calabria'],
    rarityIndex: 'Regional Specialty',
    storageAdvice: 'Refrigerate whole fruits at 4°C in sealed containers; freeze whole or extract essential rind oils.',
    curatorNotes: 'Old trees grown from seed (Mishō Yuzu) take 18 years to produce their first fruit, producing ten times the aromatic oil concentration of grafted trees.'
  },
  {
    id: 'vanilla-pompona',
    name: 'Wild Grand Cru Pompona Vanilla',
    scientificName: 'Vanilla pompona ssp. grandiflora',
    category: 'Rare Spices',
    origin: 'Papantla rainforest, Veracruz',
    country: 'Mexico',
    region: 'The Americas',
    season: 'Winter',
    harvestWindow: 'December through February',
    flavorNotes: ['Smoked Marshmallow', 'Prune Leather', 'Anise Blossom', 'Dark Cocoa Nib', 'Rum Molasses'],
    flavorProfile: {
      umami: 15,
      aroma: 97,
      acidity: 10,
      sweetness: 82,
      bitterness: 20,
      pungency: 15,
      depth: 95
    },
    imageUrl: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=1200&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1509358271058-acd22cc93898?q=80&w=1200&auto=format&fit=crop'
    ],
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-chef-baking-chocolate-sweets-in-a-pan-42867-large.mp4',
    description: 'The ancient indigenous wild orchid vanilla of the Totonac people. These giant, plump banana-shaped pods are three times thicker than standard Planifolia, containing colossal reserves of vanillin and coumaric balsam.',
    terroir: 'Shaded primary tropical rainforest canopy, humid limestone karst formations rich in decaying organic humus.',
    culinaryApplications: [
      'Split and steeped in double Jersey dairy cream or egg custards',
      'Used in savory game reductions like venison jus or wild boar sauces',
      'Scraped seeds infused into dark single-origin bean-to-bar chocolate'
    ],
    pairings: [
      { ingredient: 'Aged Mezcal', harmony: 'Agave Smoke', note: 'Agave terroir echoes vanilla bean sun-curing notes.' },
      { ingredient: 'Single Origin Criollo Cacao', harmony: 'Bittersweet Depth', note: 'Softens dry cocoa tannins into velvety roundness.' },
      { ingredient: 'Brown Butter', harmony: 'Maillard Resonance', note: 'Lactones harmonize in caramelized dairy.' }
    ],
    relatedIngredientIds: ['saffron-kozani', 'aceto-modena', 'urfa-biber'],
    rarityIndex: 'Rare Seasonal Harvest',
    storageAdvice: 'Store inside glass tubes wrapped in wax paper at 15°C–18°C. Do not refrigerate.',
    curatorNotes: 'Cured over nine months through cyclical solar sweat-boxes and nightly woolen blanket wraps.'
  },
  {
    id: 'kombu-rishiri',
    name: 'Rishiri Natural Two-Year Aged Kombu',
    scientificName: 'Saccharina ochotensis',
    category: 'Foraged Botanicals',
    origin: 'Rishiri Island, Hokkaido',
    country: 'Japan',
    region: 'East Asia',
    season: 'Summer',
    harvestWindow: 'July through August',
    flavorNotes: ['Clean Ocean Brine', 'Glutamic Sweetness', 'Mineral Kelp', 'Dried Shiitake', 'Crisp Salinity'],
    flavorProfile: {
      umami: 100,
      aroma: 75,
      acidity: 5,
      sweetness: 35,
      bitterness: 10,
      pungency: 5,
      depth: 96
    },
    imageUrl: 'https://images.unsplash.com/photo-1534483509719-3feaee7c30da?q=80&w=1200&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1534483509719-3feaee7c30da?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1200&auto=format&fit=crop'
    ],
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-vegetables-boiling-in-a-pot-41583-large.mp4',
    description: 'Harvested by single-operator long pole boats along the sub-Arctic volcanic shores of Mt. Rishiri. Aged in controlled cellar humidity (Kurakakoi) for two full years to eliminate fishy odors and crystallize pristine white mannitol umami dust on its surface.',
    terroir: 'Freezing Okhotsk sea currents packed with subpolar mineral runoff from the basalt cliffs of dormant volcano Rishiri-zan.',
    culinaryApplications: [
      'Infused at 60°C for 60 minutes for crystalline ichiban dashi broths',
      'Kobujime curing of delicate white fish such as sea bream or flounder',
      'Simmered slowly with mirin and tamari into tsukudani preserves'
    ],
    pairings: [
      { ingredient: 'Katsuobushi (Honkarebushi)', harmony: '5′-Ribonucleotide Synergy', note: 'Glutamic and inosinic acids create an umami multiplier of up to eight times.' },
      { ingredient: 'Shiro Shoyu (White Soy)', harmony: 'Clarity', note: 'Provides seasoning without darkening luminous broths.' },
      { ingredient: 'Spring Turnips (Kabura)', harmony: 'Mineral Balance', note: 'Sweet root vegetables absorb pure oceanic mineral depth.' }
    ],
    relatedIngredientIds: ['matsutake-nagano', 'sansho-wakayama', 'yuzu-kochi'],
    rarityIndex: 'Regional Specialty',
    storageAdvice: 'Store in bone-dry conditions with silica desiccants. The white powder on the surface is natural crystallized mannitol sugar and glutamates—do not wash off.',
    curatorNotes: 'Kyoto’s legendary 3-star kaiseki ryotei insist exclusively on Rishiri kelp for its transparent broth clarity.'
  },

  {
    id: 'fleur-sel-guerande',
    name: 'Fleur de Sel de Guérande Vintage Millésime',
    scientificName: 'Sodium chloride with natural sea minerals',
    category: 'Heritage Salts & Minerals',
    origin: 'Guérande Peninsula, Brittany',
    country: 'France',
    region: 'Mediterranean & Southern Europe',
    season: 'Summer',
    harvestWindow: 'Late afternoon on hot, dry July & August days',
    flavorNotes: ['Atlantic Breeze', 'Violet Blossom', 'Soft Grey Clay', 'Sweet Salinity', 'Crunchy Flake'],
    flavorProfile: {
      umami: 35,
      aroma: 40,
      acidity: 10,
      sweetness: 15,
      bitterness: 15,
      pungency: 50,
      depth: 80
    },
    imageUrl: 'https://images.unsplash.com/photo-1518843875459-f738682238a6?q=80&w=1200&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1518843875459-f738682238a6?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?q=80&w=1200&auto=format&fit=crop'
    ],
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-sprinkling-salt-on-a-table-41483-large.mp4',
    description: 'Skimmed by hand from the water surface of clay salterns using traditional wooden lousses by paludiers. The delicate flower crystals form only when offshore breezes and high summer heat align.',
    terroir: 'Atlantic tidal marshes lined with blue-grey marine clay that imparts magnesium, calcium, and faint violet aroma from Dunaliella salina microalgae.',
    culinaryApplications: [
      'Finishing salt scattered across rare ribeye steaks or duck breast',
      'Sprinkled on dark chocolate ganache tarts and salted caramels',
      'Cracked over fresh heirloom tomatoes and burrata'
    ],
    pairings: [
      { ingredient: 'Grass-fed Bordier Butter', harmony: 'Dairy Fat Contrast', note: 'Crisp salt crystals crunch softly against creamy butter.' },
      { ingredient: 'Summer Beefsteak Tomato', harmony: 'Acid-Sweet Enhancement', note: 'Unlocks volatile sweetness in vine-ripened nightshades.' },
      { ingredient: 'Grand Cru Dark Chocolate', harmony: 'Bitterness Suppression', note: 'Dulls bitter polyphenols while accentuating berry notes.' }
    ],
    relatedIngredientIds: ['saffron-kozani', 'aceto-modena', 'truffle-alba'],
    rarityIndex: 'Heirloom Selection',
    storageAdvice: 'Store in open terracotta cellars; never use metal grinders as moisture content is naturally 4–6%.',
    curatorNotes: 'Harvested exclusively by hand without any chemical washing or mechanical processing.'
  },
  {
    id: 'bergamot-calabria',
    name: 'Reggio Calabria Bergamot Grand Cru',
    scientificName: 'Citrus bergamia Risso',
    category: 'Foraged Botanicals',
    origin: 'Ionian Coast, Reggio Calabria',
    country: 'Italy',
    region: 'Mediterranean & Southern Europe',
    season: 'Winter',
    harvestWindow: 'November through February',
    flavorNotes: ['Earl Grey Blossom', 'Bitter Pine', 'Bitter Lime', 'Lavender Floral', 'Electrifying Zest'],
    flavorProfile: {
      umami: 5,
      aroma: 99,
      acidity: 90,
      sweetness: 15,
      bitterness: 65,
      pungency: 30,
      depth: 75
    },
    imageUrl: 'https://images.unsplash.com/photo-1534856966150-c832f7e7a06a?q=80&w=1200&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1534856966150-c832f7e7a06a?q=80&w=1200&auto=format&fit=crop'
    ],
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-slicing-a-lemon-with-a-knife-41582-large.mp4',
    description: 'Known as the "Green Gold of Calabria," this unique citrus thrives almost exclusively along a narrow 100-kilometer coastal strip facing the Strait of Messina. Its essential peel oil is the undisputed soul of Earl Grey tea and high perfumery.',
    terroir: 'Alluvial coastal soils with high micro-climatic humidity and shielding from harsh Apennine frosts by the Aspromonte massif.',
    culinaryApplications: [
      'Cold-pressed peel oil infused into raw fish carpaccios and crudos',
      'Subtle addition to lemon tarts, curd creams, and madeleines',
      'Artisanal amaro aperitifs and botanical gin distillation'
    ],
    pairings: [
      { ingredient: 'Cured Sea Trout', harmony: 'Marine Cut', note: 'Peel linalool and linalyl acetate cut oily omega fats.' },
      { ingredient: 'Wild Thyme Honey', harmony: 'Sweetness Tempering', note: 'Bittersweet citrus cuts unctuous floral honey.' },
      { ingredient: 'Dark Gin Botanicals', harmony: 'Terpene Bridge', note: 'Connects juniper berries with coriander seeds.' }
    ],
    relatedIngredientIds: ['yuzu-kochi', 'saffron-kozani', 'aceto-modena'],
    rarityIndex: 'Regional Specialty',
    storageAdvice: 'Keep in ventilated dark cool spot. Essential oils can be preserved by micro-planing and freezing in neutral grape seed oil.',
    curatorNotes: 'Contains over 350 distinct aromatic chemical compounds, unequaled by any other citrus cultivar.'
  },
  {
    id: 'sansho-wakayama',
    name: 'Wakayama Budo Sansho Pepper',
    scientificName: 'Zanthoxylum piperitum var. inerme',
    category: 'Rare Spices',
    origin: 'Aridagawa, Wakayama Prefecture',
    country: 'Japan',
    region: 'East Asia',
    season: 'Spring',
    harvestWindow: 'May (Green tender berries) & August (Ripe red husks)',
    flavorNotes: ['Electric Tingling', 'Lemongrass', 'Pine Forest', 'Grapefruit Peel', 'Numby Freshness'],
    flavorProfile: {
      umami: 20,
      aroma: 95,
      acidity: 40,
      sweetness: 10,
      bitterness: 30,
      pungency: 88,
      depth: 78
    },
    imageUrl: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=1200&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=1200&auto=format&fit=crop'
    ],
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-spices-falling-into-a-wooden-bowl-41484-large.mp4',
    description: 'Known as "Grape Sansho" because the berries hang in heavy, fragrant clusters like miniature wine grapes. Contains hydroxy-alpha-sanshool, an active compound that activates tactile touch and vibration receptors on the tongue with a refreshing 50Hz frequency sensation.',
    terroir: 'Terraced slopes along the crystal-clear Shimizu River under frequent mountain fogs and mineral-dense limestone drainage.',
    culinaryApplications: [
      'Fresh green berries pickled in soy and sake as a condiment for grilled eel (unagi)',
      'Ground dried green husks dusted over duck breast or wagyu beef',
      'Infused into cold-pressed rapeseed oil or creamy chocolate ganache'
    ],
    pairings: [
      { ingredient: 'Charcoal-Grilled Eel', harmony: 'Lipid Cleansing', note: 'Sanshool tingles and cleanses rich freshwater fish fat.' },
      { ingredient: 'Bittersweet Dark Chocolate', harmony: 'Electrifying Finish', note: 'Sparks surprising citrus brightness on rich cacao.' },
      { ingredient: 'Duck Breast', harmony: 'Game Balance', note: 'Aromatic citronellol accents iron-rich poultry.' }
    ],
    relatedIngredientIds: ['yuzu-kochi', 'matsutake-nagano', 'kombu-rishiri'],
    rarityIndex: 'Rare Seasonal Harvest',
    storageAdvice: 'Store whole pods frozen in vacuum-sealed bags to preserve bright green color and volatile sanshool.',
    curatorNotes: 'Wakayama accounts for over 70% of Japan’s artisanal Sansho production, cultivated by multi-generational family groves.'
  },
  {
    id: 'urfa-biber',
    name: 'Urfa Biber Sun-Swept Isot Pepper',
    scientificName: 'Capsicum annuum var. Urfa',
    category: 'Rare Spices',
    origin: 'Şanlıurfa, Southeastern Anatolia',
    country: 'Turkey',
    region: 'Levant & North Africa',
    season: 'Autumn',
    harvestWindow: 'September through October',
    flavorNotes: ['Dark Raisin', 'Smoky Chocolate', 'Tobacco Leaf', 'Earthy Warmth', 'Mellow Slow Burn'],
    flavorProfile: {
      umami: 50,
      aroma: 88,
      acidity: 25,
      sweetness: 55,
      bitterness: 30,
      pungency: 65,
      depth: 92
    },
    imageUrl: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=1200&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=1200&auto=format&fit=crop'
    ],
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-spices-falling-into-a-wooden-bowl-41484-large.mp4',
    description: 'A dark, brooding chili pepper with an extraordinary curing process: sundried on burlap during scorching Mesopotamian days, then tightly bundled in woolen tarps overnight to "sweat." This creates a glossy, almost black flake with natural essential oils intact.',
    terroir: 'Euphrates river basin plains with intense summer sun, mineral clay sediments, and cool desert nights.',
    culinaryApplications: [
      'Sprinkled over roasted eggplant, labneh, and slow-cooked lamb shanks',
      'Incorporated into chili crumbles with toasted pine nuts and cacao',
      'Infused into finishing olive oils for charred octopus and root vegetables'
    ],
    pairings: [
      { ingredient: 'Charred Eggplant & Tahini', harmony: 'Smoky Depth', note: 'Raisin and chocolate tones melt into roasted sesame.' },
      { ingredient: 'Slow Braised Lamb', harmony: 'Fat Balance', note: 'Low-heat burn and tobacco aroma cut through heavy fat.' },
      { ingredient: 'Sheep Milk Feta', harmony: 'Lactic Contrast', note: 'Bright salty curd lifts dark chili warmth.' }
    ],
    relatedIngredientIds: ['saffron-kozani', 'aceto-modena', 'vanilla-pompona'],
    rarityIndex: 'Regional Specialty',
    storageAdvice: 'Store in airtight jars away from humidity. Its natural moisture and oil give it a glistening, damp texture.',
    curatorNotes: 'Unlike standard red pepper flakes, Urfa builds slowly with a rounded, lingering warmth rather than sharp spike heat.'
  },
  {
    id: 'macadamia-hawaii',
    name: 'Artisanal Cold-Pressed Hamakua Macadamia Oil',
    scientificName: 'Macadamia integrifolia',
    category: 'Specialty Oils & Fats',
    origin: 'Hamakua Coast, Big Island',
    country: 'United States',
    region: 'Oceania & Highlands',
    season: 'Autumn',
    harvestWindow: 'September through December',
    flavorNotes: ['Toasted Coconut', 'Fresh Cream', 'Buttery Nut', 'Subtle Vanilla', 'Silky Velvet'],
    flavorProfile: {
      umami: 30,
      aroma: 85,
      acidity: 5,
      sweetness: 45,
      bitterness: 10,
      pungency: 5,
      depth: 88
    },
    imageUrl: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?q=80&w=1200&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1508746829417-e6f548d8d6ed?q=80&w=1200&auto=format&fit=crop'
    ],
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-pouring-olive-oil-into-a-bowl-41584-large.mp4',
    description: 'Extracted from hand-selected volcanic soil macadamias through mechanical hydraulic cold-pressing without temperature exceeding 35°C. Yields an astonishing 80%+ monounsaturated palmitoleic and oleic fatty acid profile, prized for its high smoke point and velvety finish.',
    terroir: 'Rich volcanic andisols on the windward slopes of Mauna Kea with 1,800mm tropical rainfall filtered through basalt volcanic rock.',
    culinaryApplications: [
      'Drizzled as a finishing oil over seared Hawaiian Ahi tuna or mahi mahi',
      'Emulsified with citrus into silky vinaigrettes for tropical greens',
      'Used in delicate pastry shortbreads in place of European butter'
    ],
    pairings: [
      { ingredient: 'Yellowfin Tuna Sashimi', harmony: 'Lipid Coating', note: 'Provides clean fat for lean deep-water pelagic fish.' },
      { ingredient: 'Passionfruit (Lilikoi)', harmony: 'Acid-Fat Contrast', note: 'Tropical acidity cuts through buttery mouthfeel.' },
      { ingredient: 'Smoked Sea Salt', harmony: 'Mineral Crunch', note: 'Accentuates nutty sweetness on palate.' }
    ],
    relatedIngredientIds: ['yuzu-kochi', 'vanilla-pompona', 'fleur-sel-guerande'],
    rarityIndex: 'Heirloom Selection',
    storageAdvice: 'Keep in dark amber glass at cool pantry temperatures; highly resistant to oxidation due to natural squalene and tocopherols.',
    curatorNotes: 'Single-estate pressed within 48 hours of hull cracking to guarantee low free fatty acidity (<0.2%).'
  },
  {
    id: 'quinoa-real-bolivia',
    name: 'Royal Quinoa Real Ancestral Grain',
    scientificName: 'Chenopodium quinoa var. Real',
    category: 'Ancient Grains & Seeds',
    origin: 'Salar de Uyuni Altiplano',
    country: 'Bolivia',
    region: 'The Americas',
    season: 'Autumn',
    harvestWindow: 'April through May',
    flavorNotes: ['Nutty Hazelnut', 'Warm Hay', 'Fluffy Sweetness', 'Toasted Sesame', 'Mineral Earth'],
    flavorProfile: {
      umami: 40,
      aroma: 70,
      acidity: 10,
      sweetness: 45,
      bitterness: 25,
      pungency: 5,
      depth: 82
    },
    imageUrl: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?q=80&w=1200&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1586201375761-83865001e31c?q=80&w=1200&auto=format&fit=crop'
    ],
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-vegetables-boiling-in-a-pot-41583-large.mp4',
    description: 'Grown strictly above 3,600 meters elevation in the harsh vicinity of the Uyuni and Coipasa salt flats. Quinoa Real is genetically distinct: its pearls are nearly double the diameter of common varieties, puffing into a distinct pop and nutty profile.',
    terroir: 'Arid Altiplano high desert with extreme sub-zero night freezes, blistering UV radiation, and saline soils rich in lithium and magnesium.',
    culinaryApplications: [
      'Toasted dry in copper pans before simmering in rich vegetable or bird stock',
      'Puffed into savory crispy garnish flakes for modern ceviches',
      'Ground into stone-milled ancestral flour for gluten-free rustic breads'
    ],
    pairings: [
      { ingredient: 'Altiplano Alpaca Cecina', harmony: 'Protein Warmth', note: 'Nutty grains balance cured highland cured meat salinity.' },
      { ingredient: 'Aji Amarillo Chili', harmony: 'Fruity Heat', note: 'Bright fruity capsaicin awakens earthy starch.' },
      { ingredient: 'Wild Andean Oregano', harmony: 'Herbal Lift', note: 'Alpine volatile carvacrol binds to grain aromatics.' }
    ],
    relatedIngredientIds: ['vanilla-pompona', 'fleur-sel-guerande', 'urfa-biber'],
    rarityIndex: 'Heirloom Selection',
    storageAdvice: 'Store in airtight linen sacks or glass jars in dry pantry conditions.',
    curatorNotes: 'Sown with traditional hand digging sticks (Taqulla) according to lunar cycles.'
  },
  {
    id: 'manuka-raw-nz',
    name: 'Wild Mānuka Reserve Monofloral Honey UMF 26+',
    scientificName: 'Leptospermum scoparium nectar',
    category: 'Artisanal Nectars & Sugars',
    origin: 'East Cape, North Island',
    country: 'New Zealand',
    region: 'Oceania & Highlands',
    season: 'Summer',
    harvestWindow: 'December to January (6-week flowering window)',
    flavorNotes: ['Damp Earth', 'Medicinal Eucalyptus', 'Caramelized Toffee', 'Wild Heather', 'Astringent Herbal Finish'],
    flavorProfile: {
      umami: 35,
      aroma: 92,
      acidity: 40,
      sweetness: 90,
      bitterness: 35,
      pungency: 20,
      depth: 96
    },
    imageUrl: 'https://images.unsplash.com/photo-1558818498-28c1e002b655?q=80&w=1200&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1558818498-28c1e002b655?q=80&w=1200&auto=format&fit=crop'
    ],
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-chef-baking-chocolate-sweets-in-a-pan-42867-large.mp4',
    description: 'Harvested from remote helicopter-accessed wild Mānuka tea tree forests on the rugged East Cape. Certified with ultra-high natural methylglyoxal (MGO 1280+ mg/kg), this dense, thixotropic nectar has a rich amber color and complex herbal depth.',
    terroir: 'Steep coastal mountain ravines of pristine native bush with high ultraviolet exposure and strong oceanic Pacific breezes.',
    culinaryApplications: [
      'Drizzled over raw goat milk chevre or aged sheep cheeses',
      'Whisked with barrel-aged vinegar into glazes for wild venison and duck',
      'Folded into burnt mountain honey gelato or sourdough dressings'
    ],
    pairings: [
      { ingredient: 'Aged Roquefort Cheese', harmony: 'Pungency Balance', note: 'Complex herbal sweetness tames blue mold pungency.' },
      { ingredient: 'Roasted Pigeon or Squab', harmony: 'Caramel Glaze', note: 'Phenolic nectar lacquers crispy poultry skin.' },
      { ingredient: 'Fresh Rosemary Sprigs', harmony: 'Terpene Echo', note: 'Resinous pine notes bridge herbal nectar properties.' }
    ],
    relatedIngredientIds: ['cloudberry-lapland', 'vanilla-pompona', 'aceto-modena'],
    rarityIndex: 'Ultra Rare Reserve',
    storageAdvice: 'Store at 18°C–22°C away from direct sunlight. Will naturally crystallize into velvety cream over time.',
    curatorNotes: 'Every single batch tested by third-party laboratories to verify unique leptosperin and MGO markers.'
  }
];

export const REGIONS_DATA: RegionInfo[] = [
  {
    id: 'East Asia',
    name: 'East Asian Highland & Archipelago',
    subtitle: 'Japan, Korea, Taiwan & Ancient Mountains',
    description: 'Mist-shrouded volcanic ranges, primordial pine forests, and subpolar sea currents creating unmatched umami depth and delicate aromatic terpenes.',
    climate: 'Temperate oceanic to sub-arctic alpine with dramatic seasonal shifts and monsoonal humidity.',
    coordinates: { x: 78, y: 38 }
  },
  {
    id: 'Mediterranean & Southern Europe',
    name: 'Mediterranean Basin & Ancient Terroirs',
    subtitle: 'Italy, Greece, Spain, Southern France',
    description: 'Sun-baked limestone plateaus, alluvial clay valleys, and salty sea breezes yielding aged vinegars, rare truffles, and golden saffron.',
    climate: 'Hot, dry summers with mild, wet winters and intense solar irradiation.',
    coordinates: { x: 48, y: 35 }
  },
  {
    id: 'Nordic & Boreal',
    name: 'Nordic Boreal & Sub-Arctic Tundra',
    subtitle: 'Scandinavia, Lapland & Iceland',
    description: 'Vast peat mires and birch forests under 24-hour midnight sun, distilling concentrated acids, wild berries, and resilient resinous plants.',
    climate: 'Sub-polar continental with long permafrost winters and brief intense summer daylight.',
    coordinates: { x: 50, y: 20 }
  },
  {
    id: 'Levant & North Africa',
    name: 'Levant, Mesopotamia & Saharan Oases',
    subtitle: 'Anatolia, Syria, Morocco, Lebanon',
    description: 'Cradle of ancient trade routes, where extreme diurnal temperature swings and sun-sweating techniques unlock complex smoke, dried fruit, and spice aromatics.',
    climate: 'Arid to semi-arid Mediterranean desert with high daytime heat and rapid night cooling.',
    coordinates: { x: 56, y: 44 }
  },
  {
    id: 'South Asia & Indian Ocean',
    name: 'South Asian Spice Ghats & Ceylon',
    subtitle: 'Kerala, Sri Lanka, Malabar Coast',
    description: 'Ancient rainforested mountain ranges laden with tropical monsoons, cultivating the world’s most potent true cinnamons, cardamoms, and black peppercorns.',
    climate: 'Tropical wet monsoon with perpetual warmth and rich laterite soils.',
    coordinates: { x: 67, y: 52 }
  },
  {
    id: 'The Americas',
    name: 'Andean Altitudes & Mesoamerican Rainforests',
    subtitle: 'Mexico, Peru, Bolivia & Amazon Basin',
    description: 'From 4,000-meter Altiplano salt deserts to shaded humid rainforest canopies—the birthplace of ancestral grains, sacred vanilla orchids, and wild cacaos.',
    climate: 'Extreme elevation alpine tundra to humid tropical rainforest micro-climates.',
    coordinates: { x: 25, y: 58 }
  },
  {
    id: 'Oceania & Highlands',
    name: 'Oceanic Islands & Ancient Gondwana',
    subtitle: 'New Zealand, Australia, Hawaii, Polynesia',
    description: 'Isolated volcanic islands and primeval native forests producing wild mono-floral nectars, macadamia oils, and ancient botanical wonders.',
    climate: 'Maritime temperate to volcanic tropical windward slopes.',
    coordinates: { x: 88, y: 72 }
  }
];

export const CATEGORIES_LIST: IngredientCategory[] = [
  'Rare Spices',
  'Foraged Botanicals',
  'Heritage Salts & Minerals',
  'Ferments & Vinegars',
  'Ancient Grains & Seeds',
  'Wild Fungi & Truffles',
  'Specialty Oils & Fats',
  'Cultivated Teas & Tisanes',
  'Artisanal Nectars & Sugars'
];

export const SEASONS_LIST: HarvestSeason[] = [
  'Spring',
  'Summer',
  'Autumn',
  'Winter',
  'Perennial / Year-Round'
];

export const RARITY_LEVELS: string[] = [
  'All Rarities',
  'Heirloom Selection',
  'Regional Specialty',
  'Rare Seasonal Harvest',
  'Ultra Rare Reserve'
];
