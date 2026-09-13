import { HarvestSeason } from '../types';

export interface SeasonalNarrative {
  id: string;
  season: HarvestSeason;
  title: string;
  subtitle: string;
  curatorTag: string;
  dateWindow: string;
  heroImage: string;
  videoUrl?: string;
  leadQuote: string;
  quoteAuthor: string;
  featuredIngredientIds: string[];
  chapters: {
    heading: string;
    subheading: string;
    narrative: string;
    flavorChemistryNote: string;
    culinaryTechnique: string;
    ingredientId: string;
  }[];
}

export const SEASONAL_STORIES: SeasonalNarrative[] = [
  {
    id: 'story-summer-zenith',
    season: 'Summer',
    title: 'The Solar Crucible & Coastal Seaweed Solstice',
    subtitle: 'From Lofoten Arctic midnight tides to Andalusian saffron suns: the height of solar extraction.',
    curatorTag: 'Summer Solstice Anthology • August Dispatch',
    dateWindow: 'July — September',
    heroImage: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1600&q=85',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-close-up-of-herbs-and-spices-on-a-table-41551-large.mp4',
    leadQuote: 'Under eighteen hours of relentless summer sunlight, volatile essential oils hyper-concentrate in the plant cuticle before the dew can even condense.',
    quoteAuthor: 'Dr. Henrik Vang, Nordic Foraging Botanist',
    featuredIngredientIds: ['sea-tangle', 'yuzu-rind', 'safran-kozani'],
    chapters: [
      {
        heading: 'Sub-Polar Ocean Harvests: Arctic Kombu in Midnight Sun',
        subheading: 'Cold Water Depth & Free-Glutamate Hyper-Saturation',
        narrative: 'In the jagged fjords of northern Norway, diving harvesters wade into six-degree glacial currents during the brief August warmth. Laminaria digitata, nourished by relentless 24-hour sub-polar sunlight, produces crystalline coatings of natural mannitol and glutamic salts. Unlike dried commercial kelps, fresh summer-cut Arctic kombu releases an ethereal ocean perfume that transforms clear dashi broths into silk without imparting a bitter iodine residue.',
        flavorChemistryNote: 'Natural glutamic acid levels spike 42% higher during the summer solstice due to continuous photosynthesis.',
        culinaryTechnique: 'Infuse into mountain spring water at exactly 60°C for 45 minutes; finish with two drops of raw smoked wood vinegar.',
        ingredientId: 'sea-tangle',
      },
      {
        heading: 'Shikoku Mountain Terraces: Green Yuzu & Solar Heat',
        subheading: 'High-Altitude Citrus Terroir on Kami Mountain Slopes',
        narrative: 'High along the mist-draped river valleys of Tokushima, the green summer yuzu fruit reaches its sharpest aromatic zenith in late August. Long before the skin turns winter gold, the unripe emerald peel is gathered by hand. The green rind harbors hyper-volatile pinene and yuzunone terpenes that deliver an electric, resinous citrus jolt—the secret soul of traditional freshly pounded Yuzukoshō paste.',
        flavorChemistryNote: 'Early harvest terpene profiles contain elevated limonene and volatile esters that evaporate within 48 hours of picking if not flash-cured in coarse sea salt.',
        culinaryTechnique: 'Microplane green peel directly over raw scallop carpaccio or emulsify into cold-pressed Tsubaki camellia seed oil.',
        ingredientId: 'yuzu-rind',
      },
      {
        heading: 'The Crimson Threads: Autumn Crocus Germination Watch',
        subheading: 'Late Summer Heat Storing in Kozani Calcareous Soil',
        narrative: 'In northern Greece, August marks the critical subterranean swelling of the Crocus sativus corms. The baking summer Mediterranean sun superheats the alkaline limestone clay, driving picrocrocin synthesis deep inside the dormant root bulb before the October lilac flowering begins.',
        flavorChemistryNote: 'Soil temperatures exceeding 35°C during late summer catalyze the chemical conversion of carotenoids into intense safranal precursors.',
        culinaryTechnique: 'Pre-steep dried saffron threads in lukewarm raw goat milk for 30 minutes before gently folding into risotto.',
        ingredientId: 'safran-kozani',
      },
    ],
  },
  {
    id: 'story-autumn-mycelium',
    season: 'Autumn',
    title: 'The Great Mycelium Awakening & Truffle Mists',
    subtitle: 'Hunting Alba’s subterranean diamonds and oak-shadowed matsutake beneath misty canopies.',
    curatorTag: 'Autumnal Equinox • October — November',
    dateWindow: 'October — November',
    heroImage: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1600&q=85',
    leadQuote: 'The true truffle dog does not bark; she pauses with a trembling paw over damp calcareous marl under ancient hazel roots.',
    quoteAuthor: 'Matteo Rinaldi, Langhe Trifolao Master',
    featuredIngredientIds: ['alba-truffle', 'aceto-tradizionale', 'safran-kozani'],
    chapters: [
      {
        heading: 'Midnight in Piedmont: The Elusive White Truffle',
        subheading: 'Volatile Bis(methylthio)methane in Autumn Rain',
        narrative: 'Between 3:00 and 5:00 AM in the dripping oak groves of Monferrato, temperature inversions trap heavy ground mist against the forest floor. Tuber magnatum pico cannot be cultivated; it only surrenders to nocturnal hounds trained across three human generations. Its aroma—a startling fusion of damp garlic, raw honeycomb, aged parmigiano rind, and wet clay—melts upon tongue contact with warm fat.',
        flavorChemistryNote: 'Over 200 volatile sulfur-containing organic aldehydes evaporate rapidly at temperatures over 40°C, mandating raw tableside shaving.',
        culinaryTechnique: 'Shave paper-thin petals directly over rich farm-fresh 30-yolk tajarin pasta swirled with raw cultured butter.',
        ingredientId: 'alba-truffle',
      },
      {
        heading: 'The Solera Attic: Century Wood and Autumn Trebbiano Must',
        subheading: 'Modena Battery Casks & Evaporative Concentration',
        narrative: 'In October, the harvested Trebbiano and Lambrusco grape must is simmered over direct wood flames for thirty-six continuous hours. The reduced dark syrup enters the attic batteria—progressing across oak, chestnut, cherry, ash, and juniper barrels over a span of 25 to 100 years. The autumn chill slows fermentation, allowing the secular wood resins to marry the sweet-sour balsamic core.',
        flavorChemistryNote: 'Decades of wood evaporation elevate natural fructose and glucose concentration past 70° Brix without adding sugar.',
        culinaryTechnique: 'Drop three droplets from a glass pipette directly onto 36-month Parmigiano-Reggiano or warm vanilla bean gelato.',
        ingredientId: 'aceto-tradizionale',
      },
    ],
  },
  {
    id: 'story-spring-awakening',
    season: 'Spring',
    title: 'The Vernal First Flush & Melting Alpine Sap',
    subtitle: 'Wild mountain fiddleheads, shadow-grown gyokuro buds, and cold-pressed pine resins.',
    curatorTag: 'Spring Equinox • March — May',
    dateWindow: 'March — May',
    heroImage: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1600&q=85',
    leadQuote: 'Spring is the season of invigorating bitterness and amino-acid rush; the mountain woods shed their snow and yield their purest chlorophyll.',
    quoteAuthor: 'Hiroshi Tanaka, Uji Tea Master',
    featuredIngredientIds: ['matcha-ceremonial', 'sea-tangle', 'yuzu-rind'],
    chapters: [
      {
        heading: 'Uji Mist & Rice Straw Straw Mats: The Gyokuro Veil',
        subheading: 'Theanine Preservation through 20 Days of Complete Darkness',
        narrative: 'In early April, tea fields across the hills of Kyoto are shielded under woven black reed mats (honzu). Denied direct sunlight, the Camellia sinensis bush converts stored root starch into pristine L-theanine rather than astringent catechins. When stone-milled between granite disks turning at just sixty revolutions per minute, the resulting emerald powder coats the palate with an intoxicating oceanic sweetness.',
        flavorChemistryNote: 'Shading suppresses the conversion of theanine into polyphenols, boosting velvety broth-like amino acid umami.',
        culinaryTechnique: 'Whisk with bamboo chasen in 70°C mineral spring water until a micro-foam layer of creamy emerald bubbles forms.',
        ingredientId: 'matcha-ceremonial',
      },
    ],
  },
  {
    id: 'story-winter-dormancy',
    season: 'Winter',
    title: 'Sub-Polar Salt Crystals & Ancient Cured Ferments',
    subtitle: 'Preserved citrus rind, smoked sea salt evaporation, and cellar-cured soy pastes.',
    curatorTag: 'Winter Solstice • December — February',
    dateWindow: 'December — February',
    heroImage: 'https://images.unsplash.com/photo-1518843875459-f738682238a6?auto=format&fit=crop&w=1600&q=85',
    leadQuote: 'In deep winter, the chef turns inward toward slow cellar transformations, crystalline mineral brines, and woodsmoke preservation.',
    quoteAuthor: 'Astrid Lindholm, Swedish Heritage Chef',
    featuredIngredientIds: ['sea-tangle', 'aceto-tradizionale', 'alba-truffle'],
    chapters: [
      {
        heading: 'Arctic Sea Smoke & Mineral Crystal Formations',
        subheading: 'Slow Geothermal Brine Crystallization',
        narrative: 'In Iceland’s Westfjords, geothermal steam drives deep-sea ocean brine to gentle crystallization over wooden troughs. The resulting flake salt retains rare trace minerals—magnesium, calcium, potassium—that melt on the tongue with delicate crunch rather than harsh sodium sharpness.',
        flavorChemistryNote: 'Hollow pyramid crystal structures increase surface area dissolution rate on the palate by 300%.',
        culinaryTechnique: 'Crush gently between fingertips over prime seared venison or rich dark chocolate ganache as a finishing fleur de sel.',
        ingredientId: 'sea-tangle',
      },
    ],
  },
];
