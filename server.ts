import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, ThinkingLevel, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "15mb" }));

// Server-side Image Cache (in-memory persistent store during runtime)
const imageCache = new Map<string, string>();
const masterclassCache = new Map<string, any>();

// Fallback curated high-res CDN images by category/keywords
const CATEGORY_FALLBACK_IMAGES: Record<string, string> = {
  'Wild Fungi & Truffles': 'https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?q=80&w=1200&auto=format&fit=crop',
  'Rare Spices': 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?q=80&w=1200&auto=format&fit=crop',
  'Ferments & Vinegars': 'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?q=80&w=1200&auto=format&fit=crop',
  'Heritage Salts & Minerals': 'https://images.unsplash.com/photo-1518843875459-f738682238a6?q=80&w=1200&auto=format&fit=crop',
  'Foraged Botanicals': 'https://images.unsplash.com/photo-1534483509719-3feaee7c30da?q=80&w=1200&auto=format&fit=crop',
  'Specialty Oils & Fats': 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?q=80&w=1200&auto=format&fit=crop',
  'Single-Estate Oils': 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?q=80&w=1200&auto=format&fit=crop',
  'Cultivated Teas & Tisanes': 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?q=80&w=1200&auto=format&fit=crop',
  'Artisanal Nectars & Sugars': 'https://images.unsplash.com/photo-1558818498-28c1e002b655?q=80&w=1200&auto=format&fit=crop',
  'Ancient Grains & Seeds': 'https://images.unsplash.com/photo-1586201375761-83865001e31c?q=80&w=1200&auto=format&fit=crop',
  'Mountain Citrus': 'https://images.unsplash.com/photo-1582979512210-99b6a53386f9?q=80&w=1200&auto=format&fit=crop',
  'Rare Sweeteners': 'https://images.unsplash.com/photo-1587132137056-bfbf0166836e?q=80&w=1200&auto=format&fit=crop',
  'Botanical Peppers': 'https://images.unsplash.com/photo-1599940824399-b87987ceb72a?q=80&w=1200&auto=format&fit=crop',
  'Heirloom Alliums': 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?q=80&w=1200&auto=format&fit=crop',
  'default': 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1200&auto=format&fit=crop',
};

// High-definition culinary atelier technique visual library
const CULINARY_TECHNIQUE_IMAGES: Record<string, string> = {
  sizzle: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=1200&auto=format&fit=crop',
  chop: 'https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?q=80&w=1200&auto=format&fit=crop',
  simmer: 'https://images.unsplash.com/photo-1547592180-85f173990554?q=80&w=1200&auto=format&fit=crop',
  drizzle: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1200&auto=format&fit=crop',
  whisk: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?q=80&w=1200&auto=format&fit=crop',
  flame: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200&auto=format&fit=crop',
  plating: 'https://images.unsplash.com/photo-1578474846511-04ba529f0b88?q=80&w=1200&auto=format&fit=crop',
  default: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=1200&auto=format&fit=crop',
};

function getTechniqueStepFallback(stepTitle?: string, actionDesc?: string, soundscape?: string, category?: string): string {
  const text = `${stepTitle || ''} ${actionDesc || ''} ${soundscape || ''}`.toLowerCase();
  if (soundscape && CULINARY_TECHNIQUE_IMAGES[soundscape]) {
    return CULINARY_TECHNIQUE_IMAGES[soundscape];
  }
  if (text.includes('chop') || text.includes('slice') || text.includes('knife') || text.includes('julienne') || text.includes('dice') || text.includes('cut')) {
    return CULINARY_TECHNIQUE_IMAGES.chop;
  }
  if (text.includes('sear') || text.includes('sizzle') || text.includes('saut') || text.includes('pan') || text.includes('brown')) {
    return CULINARY_TECHNIQUE_IMAGES.sizzle;
  }
  if (text.includes('simmer') || text.includes('boil') || text.includes('poach') || text.includes('broth') || text.includes('dashi') || text.includes('stock')) {
    return CULINARY_TECHNIQUE_IMAGES.simmer;
  }
  if (text.includes('whisk') || text.includes('emulsif') || text.includes('blend') || text.includes('whip') || text.includes('foam')) {
    return CULINARY_TECHNIQUE_IMAGES.whisk;
  }
  if (text.includes('flame') || text.includes('char') || text.includes('roast') || text.includes('torch') || text.includes('flamb')) {
    return CULINARY_TECHNIQUE_IMAGES.flame;
  }
  if (text.includes('plate') || text.includes('finish') || text.includes('garnish') || text.includes('tweezer') || text.includes('present')) {
    return CULINARY_TECHNIQUE_IMAGES.plating;
  }
  if (text.includes('drizzle') || text.includes('glaze') || text.includes('sauce') || text.includes('pour')) {
    return CULINARY_TECHNIQUE_IMAGES.drizzle;
  }
  if (category && CATEGORY_FALLBACK_IMAGES[category]) {
    return CATEGORY_FALLBACK_IMAGES[category];
  }
  return CULINARY_TECHNIQUE_IMAGES.default;
}

// Seed masterclasses for instant exploration
const SEED_MASTERCLASSES: any[] = [
  {
    id: "matsutake-veloute-reserve",
    primaryIngredientId: "matsutake-nagano",
    primaryIngredientName: "Nagano Highland Wild Matsutake",
    dishTitle: "Nagano Matsutake Velouté with Charred Pine Infusion & Cedar Smoke",
    subtitle: "A master study in thermal extraction of volatile matsutakenol and umami balance",
    overview: "This masterclass showcases the delicate temperature-critical handling of wild autumn matsutake. Shaved raw at the finishing threshold, the mushrooms release potent spicy-cinnamon and earthy pine notes into a silken dashi-velouté emulsified with single-estate hazelnut oil.",
    chefRationale: "Matsutake volatile aromatics evaporate above 72°C. By searing only 30% of the harvest for Maillard depth and folding the remaining 70% in at exactly 65°C, we capture the full spectrum from raw forest floor to caramelized umami.",
    difficulty: "Grand Master Atelier",
    servings: 4,
    totalPrepTimeMinutes: 20,
    totalCookTimeMinutes: 25,
    overallDurationFormatted: "45 min",
    flavorAromaProfile: {
      umami: 96,
      acidity: 42,
      aromaticIntensity: 98,
      textureComplexity: 88,
      finishLength: 94
    },
    requiredTools: [
      {
        id: "knife-yanagiba",
        name: "Aogami Super 270mm Yanagiba Knife",
        category: "Cutlery",
        material: "Blue Paper Super Carbon Steel",
        purpose: "Single-bevel razor slices through matsutake fibers without bruising delicate cellular walls",
        proTip: "Never wash with water; wipe blade with camellia oil before and after cutting"
      },
      {
        id: "pan-copper-saucier",
        name: "Solid Copper 2.5mm Saucier Pan",
        category: "Cookware",
        material: "Hammered French Copper with Hand-Wiped Tin Lining",
        purpose: "Provides instant thermal conductivity for rapid sauce reductions without hot spots",
        proTip: "Keep heat on medium-low; tin lining softens above 230°C"
      },
      {
        id: "gauge-digital-probe",
        name: "High-Precision Thermocouple Probe (0.1°C)",
        category: "Precision Gauge",
        material: "Stainless Steel Needle Probe",
        purpose: "Monitors broth bath to ensure temperature remains between 64°C and 66°C during mushroom steep",
        proTip: "Insert probe at 45-degree angle in center of saucier"
      },
      {
        id: "sieve-chinois",
        name: "Ultra-Fine Conical Chinois Sieve",
        category: "Extraction & Sieve",
        material: "18/10 Surgical Mesh Stainless Steel",
        purpose: "Filters broth to pure mirror clarity, removing sediment while preserving suspended oils",
        proTip: "Pass liquid through without pressing solids to avoid cloudiness"
      },
      {
        id: "tweezers-plating",
        name: "Titanium Offset Plating Tweezers 20cm",
        category: "Plating & Finishing",
        material: "Matte Black Titanium Alloy",
        purpose: "Precise placement of paper-thin mushroom caps and micro-botanicals onto the velouté surface",
        proTip: "Gently pinch only by the stem base to prevent cap tearing"
      }
    ],
    ingredientsList: [
      {
        name: "Nagano Highland Wild Matsutake",
        amount: "180g (3 whole prime buttons)",
        prepState: "Gently brushed with damp linen, sliced 1.5mm thick",
        addedAtMinute: 5,
        isArchiveSpecialty: true
      },
      {
        name: "Aged Rishiri Kelp Ichiban Dashi",
        amount: "600ml",
        prepState: "Cold-steeped 12 hours, heated to 65°C",
        addedAtMinute: 0,
        isArchiveSpecialty: false
      },
      {
        name: "Cold-Pressed Hazelnut Oil",
        amount: "30ml",
        prepState: "Room temperature single-estate reserve",
        addedAtMinute: 18,
        isArchiveSpecialty: false
      },
      {
        name: "Salted French Cultured Butter",
        amount: "25g",
        prepState: "Chilled cubes (84% butterfat)",
        addedAtMinute: 15,
        isArchiveSpecialty: false
      },
      {
        name: "Red Shiso Micro-Blossoms",
        amount: "8 delicate florets",
        prepState: "Freshly harvested, chilled",
        addedAtMinute: 22,
        isArchiveSpecialty: false
      }
    ],
    timelineSteps: [
      {
        stepNumber: 1,
        timeOffsetFormatted: "00:00",
        timeOffsetSeconds: 0,
        title: "Dashi Base Tempering & Copper Saucier Warm-up",
        actionDescription: "Pour the clarified Rishiri kelp dashi into the copper saucier over gentle flame. Set induction heat to 65°C. Observe the fine convective ripples forming across the surface.",
        ingredientAdditions: [
          {
            ingredientName: "Aged Rishiri Kelp Ichiban Dashi",
            amount: "600ml",
            technique: "Poured gently along the interior copper wall",
            timingNote: "At 00:00 baseline"
          }
        ],
        toolsUsed: ["Solid Copper 2.5mm Saucier Pan", "High-Precision Thermocouple Probe (0.1°C)"],
        criticalControlPoint: "Liquid must never exceed 68°C to prevent harsh iodine extraction from kelp notes.",
        sensoryCue: "Clean sea breeze aroma with subtle warm salinity rising from the pot.",
        soundscapeType: "simmer",
        spokenNarration: "Welcome to the atelier. We begin by gently warming our aged Rishiri kelp dashi in the copper saucier, holding precisely at sixty-five degrees Celsius to protect the delicate marine glutamates."
      },
      {
        stepNumber: 2,
        timeOffsetFormatted: "04:30",
        timeOffsetSeconds: 270,
        title: "Artisanal Matsutake Slicing & Fiber Alignment",
        actionDescription: "Using the single-bevel Yanagiba knife, slice the stem of the matsutake into 1.5mm rounds on the bias, and segment the cap into clean quarters. Reserve caps for raw finish.",
        ingredientAdditions: [
          {
            ingredientName: "Nagano Highland Wild Matsutake (Stems)",
            amount: "100g",
            technique: "Single long slicing motion on 45° angle",
            timingNote: "At 04:30 into cutting board"
          }
        ],
        toolsUsed: ["Aogami Super 270mm Yanagiba Knife"],
        criticalControlPoint: "Execute single continuous pull strokes; sawing shears the mushroom pore walls and releases aroma prematurely.",
        sensoryCue: "Immediate burst of damp red pine needles, cedar resin, and peppery cinnamon spice.",
        soundscapeType: "chop",
        spokenNarration: "With a single smooth draw of the carbon steel blade, we slice the matsutake stems. The cellular aroma of wild Japanese cedar immediately fills the kitchen."
      },
      {
        stepNumber: 3,
        timeOffsetFormatted: "09:15",
        timeOffsetSeconds: 555,
        title: "Slow Botanical Infusion & Volatile Extraction",
        actionDescription: "Lower the sliced matsutake stems into the warm dashi. Cover with a breathable parchment drop-lid (otoshibuta). Allow gentle infusion while maintaining 65°C.",
        ingredientAdditions: [
          {
            ingredientName: "Nagano Highland Wild Matsutake (Stems)",
            amount: "100g",
            technique: "Submerged beneath parchment circle",
            timingNote: "At 09:15 into dashi"
          }
        ],
        toolsUsed: ["Solid Copper 2.5mm Saucier Pan", "High-Precision Thermocouple Probe (0.1°C)"],
        criticalControlPoint: "Maintain steady liquid movement without boiling bubbles.",
        sensoryCue: "The broth turns from pale gold to luminous amber with glistening fungal esters.",
        soundscapeType: "simmer",
        spokenNarration: "We immerse the stems into the broth under a parchment lid. Over ten minutes, the hot liquor pulls the water-soluble matsutakenol into a fragrant, amber nectar."
      },
      {
        stepNumber: 4,
        timeOffsetFormatted: "16:00",
        timeOffsetSeconds: 960,
        title: "Monte au Beurre & Hazelnut Oil Emulsification",
        actionDescription: "Strain broth through the ultra-fine chinois. Return liquor to pan. Whisk in cold cultured butter cubes one by one, followed by a steady drizzle of cold-pressed hazelnut oil until a velvety velouté forms.",
        ingredientAdditions: [
          {
            ingredientName: "Salted French Cultured Butter",
            amount: "25g",
            technique: "Vigorously whisked off-heat in small dice",
            timingNote: "At 16:00"
          },
          {
            ingredientName: "Cold-Pressed Hazelnut Oil",
            amount: "30ml",
            technique: "Slow emulsified stream",
            timingNote: "At 18:00"
          }
        ],
        toolsUsed: ["Ultra-Fine Conical Chinois Sieve", "Solid Copper 2.5mm Saucier Pan"],
        criticalControlPoint: "Whisk briskly at 55°C to create a stable micro-emulsion without oil separation.",
        sensoryCue: "Glossy, opaque sheen with toasted praline and earthy forest undertones.",
        soundscapeType: "whisk",
        spokenNarration: "Now we mount the strained essence with chilled cultured butter and artisanal hazelnut oil. The mechanical shear creates an airy, mirror-gloss emulsion."
      },
      {
        stepNumber: 5,
        timeOffsetFormatted: "21:30",
        timeOffsetSeconds: 1290,
        title: "Final Plating, Shaved Caps & Shiso Blossom Architecture",
        actionDescription: "Ladle 120ml of hot velouté into shallow heated porcelain bowls. Using titanium tweezers, float raw matsutake cap shavings and delicate red shiso micro-blossoms across the surface.",
        ingredientAdditions: [
          {
            ingredientName: "Nagano Highland Wild Matsutake (Raw Caps)",
            amount: "80g",
            technique: "Arranged in overlapping fan pattern",
            timingNote: "At 21:30"
          },
          {
            ingredientName: "Red Shiso Micro-Blossoms",
            amount: "8 florets",
            technique: "Placed gently with tweezers",
            timingNote: "At 22:15"
          }
        ],
        toolsUsed: ["Titanium Offset Plating Tweezers 20cm"],
        criticalControlPoint: "Serve within 60 seconds so the steam from the broth gently warms and volatilizes the raw caps table-side.",
        sensoryCue: "Aromatic cloud rises immediately upon contact between raw cap and warm velouté.",
        soundscapeType: "plating",
        spokenNarration: "To finish, we ladle the velouté into warm porcelain, floating raw sliced caps that bloom in the rising steam. The dish is complete."
      }
    ],
    platingPresentation: "Served in matte black volcanic stoneware shallow bowls. The golden velouté forms a reflective pool accented by the clean geometry of raw matsutake gills and vibrant ruby shiso blossoms.",
    sommelierPairing: {
      vintage: "2018 Domaine Leflaive Puligny-Montrachet 1er Cru",
      terroir: "Burgundy, France (Chalky limestone terroir with deep mineral tension)",
      tastingNote: "The crisp citrus flint and hazelnut breadth cut through the rich butter velouté while mirroring the woodland matsutake aroma."
    },
    heroImageUrl: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1200&auto=format&fit=crop",
    createdAt: new Date().toISOString()
  }
];

// Seed map initialization
SEED_MASTERCLASSES.forEach(mc => {
  masterclassCache.set(mc.primaryIngredientId, mc);
  masterclassCache.set(mc.id, mc);
});

// Lazy initialization of GoogleGenAI
function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// Health check endpoint
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Curated Masterclasses endpoint
app.get("/api/curated-masterclasses", (_req, res) => {
  const list = Array.from(new Set(Array.from(masterclassCache.values())));
  res.json({ masterclasses: list });
});

// Fast timeout helper promise
function timeoutPromise<T>(ms: number, fallbackValue: T): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(fallbackValue), ms));
}

// Generate Masterclass endpoint using high-speed Gemini 2.5 Flash
app.post("/api/generate-culinary-masterclass", async (req, res) => {
  try {
    const { ingredient, customPrompt, secondaryIngredients } = req.body;

    if (!ingredient || !ingredient.name) {
      return res.status(400).json({ error: "Primary ingredient data is required" });
    }

    const cacheKey = `mc_${ingredient.id || ingredient.name.toLowerCase().replace(/\s+/g, '-')}_${(secondaryIngredients || []).join('_')}`;

    if (masterclassCache.has(cacheKey)) {
      return res.json({
        masterclass: masterclassCache.get(cacheKey),
        cached: true
      });
    }

    const ai = getGeminiClient();

    if (!ai) {
      // Return a generated realistic deterministic fallback masterclass instantly
      const fallback = generateArtisanalFallbackMasterclass(ingredient, secondaryIngredients);
      masterclassCache.set(cacheKey, fallback);
      return res.json({ masterclass: fallback, cached: false, source: 'fallback_engine' });
    }

    const systemPrompt = `You are a 3-Star Michelin Executive Chef, Culinary Physicist, and Master Archivist.
Your duty is to produce a definitive, hyper-authentic, professional culinary masterclass for the given ingredient: ${ingredient.name} (${ingredient.scientificName || ''}), Category: ${ingredient.category}, Origin: ${ingredient.origin}, Terroir: ${ingredient.terroir}.
Secondary ingredients to harmonize with: ${Array.isArray(secondaryIngredients) ? secondaryIngredients.join(', ') : 'None'}.
${customPrompt ? `Special Chef Directive: ${customPrompt}` : ''}

CRITICAL RULES:
1. Speak with supreme culinary authority, elegance, and precision.
2. NEVER mention AI, algorithms, models, or computational generation.
3. Provide exact chronological timeline with step numbers, formatted timestamps (e.g. "00:00", "03:15", "08:45"), seconds offsets, tools used, and exact minute/second ingredient additions.
4. Detail 4 to 6 required artisanal tools with specific materials, purposes, and pro-tips.
5. In each step, include Critical Control Points (CCP), Sensory Cues, and Soundscape ('sizzle' | 'chop' | 'simmer' | 'drizzle' | 'whisk' | 'flame' | 'plating').
6. Provide spokenNarration for each step written in authentic, warm chef voiceover.
7. Return strictly valid JSON adhering to the specified schema.`;

    // Multi-model resilience: Try gemini-3.7-flash, then fallback to gemini-3.1-flash-lite if 503/busy
    const modelsToTry = [
      { name: "gemini-3.7-flash", thinking: true },
      { name: "gemini-3.1-flash-lite", thinking: false },
      { name: "gemini-flash-latest", thinking: false }
    ];

    let response: any = null;

    for (const modelConfig of modelsToTry) {
      try {
        const config: any = {
          systemInstruction: systemPrompt,
          responseMimeType: "application/json",
          temperature: 0.6,
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              dishTitle: { type: Type.STRING, description: "Haute gastronomy dish title" },
              subtitle: { type: Type.STRING, description: "Poetic and technical culinary subtitle" },
              overview: { type: Type.STRING, description: "Comprehensive culinary and sensory narrative" },
              chefRationale: { type: Type.STRING, description: "Scientific and gastronomic rationale behind the technique" },
              difficulty: { type: Type.STRING, enum: ["Artisanal Selection", "Grand Master Atelier", "Haute Gastronomy"] },
              servings: { type: Type.NUMBER },
              totalPrepTimeMinutes: { type: Type.NUMBER },
              totalCookTimeMinutes: { type: Type.NUMBER },
              overallDurationFormatted: { type: Type.STRING },
              flavorAromaProfile: {
                type: Type.OBJECT,
                properties: {
                  umami: { type: Type.NUMBER },
                  acidity: { type: Type.NUMBER },
                  aromaticIntensity: { type: Type.NUMBER },
                  textureComplexity: { type: Type.NUMBER },
                  finishLength: { type: Type.NUMBER },
                },
                required: ["umami", "acidity", "aromaticIntensity", "textureComplexity", "finishLength"],
              },
              requiredTools: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    id: { type: Type.STRING },
                    name: { type: Type.STRING },
                    category: { type: Type.STRING, enum: ["Cutlery", "Cookware", "Precision Gauge", "Extraction & Sieve", "Plating & Finishing"] },
                    material: { type: Type.STRING },
                    purpose: { type: Type.STRING },
                    proTip: { type: Type.STRING },
                  },
                  required: ["id", "name", "category", "material", "purpose", "proTip"],
                },
              },
              ingredientsList: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    name: { type: Type.STRING },
                    amount: { type: Type.STRING },
                    prepState: { type: Type.STRING },
                    addedAtMinute: { type: Type.NUMBER },
                    isArchiveSpecialty: { type: Type.BOOLEAN },
                  },
                  required: ["name", "amount", "prepState", "addedAtMinute", "isArchiveSpecialty"],
                },
              },
              timelineSteps: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    stepNumber: { type: Type.NUMBER },
                    timeOffsetFormatted: { type: Type.STRING },
                    timeOffsetSeconds: { type: Type.NUMBER },
                    title: { type: Type.STRING },
                    actionDescription: { type: Type.STRING },
                    ingredientAdditions: {
                      type: Type.ARRAY,
                      items: {
                        type: Type.OBJECT,
                        properties: {
                          ingredientName: { type: Type.STRING },
                          amount: { type: Type.STRING },
                          technique: { type: Type.STRING },
                          timingNote: { type: Type.STRING },
                        },
                        required: ["ingredientName", "amount", "technique", "timingNote"],
                      },
                    },
                    toolsUsed: { type: Type.ARRAY, items: { type: Type.STRING } },
                    criticalControlPoint: { type: Type.STRING },
                    sensoryCue: { type: Type.STRING },
                    soundscapeType: { type: Type.STRING, enum: ["sizzle", "chop", "simmer", "drizzle", "whisk", "flame", "plating"] },
                    spokenNarration: { type: Type.STRING },
                  },
                  required: [
                    "stepNumber",
                    "timeOffsetFormatted",
                    "timeOffsetSeconds",
                    "title",
                    "actionDescription",
                    "ingredientAdditions",
                    "toolsUsed",
                    "criticalControlPoint",
                    "sensoryCue",
                    "soundscapeType",
                    "spokenNarration",
                  ],
                },
              },
              platingPresentation: { type: Type.STRING },
              sommelierPairing: {
                type: Type.OBJECT,
                properties: {
                  vintage: { type: Type.STRING },
                  terroir: { type: Type.STRING },
                  tastingNote: { type: Type.STRING },
                },
                required: ["vintage", "terroir", "tastingNote"],
              },
            },
            required: [
              "dishTitle",
              "subtitle",
              "overview",
              "chefRationale",
              "difficulty",
              "servings",
              "totalPrepTimeMinutes",
              "totalCookTimeMinutes",
              "overallDurationFormatted",
              "flavorAromaProfile",
              "requiredTools",
              "ingredientsList",
              "timelineSteps",
              "platingPresentation",
              "sommelierPairing",
            ],
          },
        };

        if (modelConfig.thinking) {
          config.thinkingConfig = { thinkingLevel: ThinkingLevel.LOW };
        }

        const genPromise = ai.models.generateContent({
          model: modelConfig.name,
          contents: `Produce the complete haute cuisine masterclass recipe and timeline for: ${ingredient.name}`,
          config,
        });

        const genResult: any = await Promise.race([
          genPromise,
          timeoutPromise(4000, null)
        ]);

        if (genResult && genResult.text) {
          response = genResult;
          break; // Successfully obtained response
        }
      } catch (tierError: any) {
        console.warn(`Tier fallback notice for model ${modelConfig.name}:`, tierError.message || tierError);
      }
    }

    if (response && response.text) {
      const parsedJson = JSON.parse(response.text || "{}");
      const masterclass = {
        id: `mc-${ingredient.id || 'custom'}-${Date.now()}`,
        primaryIngredientId: ingredient.id,
        primaryIngredientName: ingredient.name,
        ...parsedJson,
        heroImageUrl: ingredient.imageUrl || CATEGORY_FALLBACK_IMAGES[ingredient.category] || CATEGORY_FALLBACK_IMAGES.default,
        createdAt: new Date().toISOString(),
      };

      masterclassCache.set(cacheKey, masterclass);
      masterclassCache.set(masterclass.id, masterclass);

      return res.json({ masterclass, cached: false, source: "gemini_fast" });
    }

    // Instant fallback if timeout hit
    const fallback = generateArtisanalFallbackMasterclass(ingredient, secondaryIngredients);
    masterclassCache.set(cacheKey, fallback);
    return res.json({ masterclass: fallback, cached: false, source: "instant_resilience" });
  } catch (error: any) {
    console.error("Error generating culinary masterclass:", error);
    const { ingredient, secondaryIngredients } = req.body;
    const fallback = generateArtisanalFallbackMasterclass(ingredient || { name: "Specimen" }, secondaryIngredients);
    return res.json({ masterclass: fallback, cached: false, source: "fallback_rescue" });
  }
});

// Step Image Generation Endpoint
app.post("/api/generate-step-image", async (req, res) => {
  try {
    const { dishTitle, stepTitle, actionDescription, category, soundscapeType } = req.body;
    const cacheKey = `step_${(dishTitle || '').slice(0, 20)}_${(stepTitle || '').slice(0, 20)}`.toLowerCase().replace(/\s+/g, '-');

    if (imageCache.has(cacheKey)) {
      return res.json({ imageUrl: imageCache.get(cacheKey), cached: true });
    }

    const fallback = getTechniqueStepFallback(stepTitle, actionDescription, soundscapeType, category);

    const ai = getGeminiClient();
    let generatedBase64: string | null = null;

    if (ai) {
      try {
        const prompt = `Close-up macro culinary photography: ${actionDescription || stepTitle} for dish ${dishTitle}. Atmospheric studio kitchen lighting, professional chef hands in action, copper pans, dark wood, steam rising, ultra-sharp focus, 8k resolution, Michelin kitchen atmosphere. Strictly no text.`;
        const response = await ai.models.generateContent({
          model: 'imagen-3.0-generate-002',
          contents: { parts: [{ text: prompt }] },
          config: { imageConfig: { aspectRatio: "16:9" } }
        });

        if (response?.candidates?.[0]?.content?.parts) {
          for (const part of response.candidates[0].content.parts) {
            if (part.inlineData && part.inlineData.data) {
              const mime = part.inlineData.mimeType || 'image/png';
              generatedBase64 = `data:${mime};base64,${part.inlineData.data}`;
              break;
            }
          }
        }
      } catch (err: any) {
        // Quota exhaustion or free-tier limitation gracefully handled via curated technique imagery
      }
    }

    if (generatedBase64) {
      imageCache.set(cacheKey, generatedBase64);
      return res.json({ imageUrl: generatedBase64, cached: false, source: 'gemini' });
    }

    imageCache.set(cacheKey, fallback);
    return res.json({ imageUrl: fallback, cached: false, source: 'curated_technique' });
  } catch (error) {
    const fallback = CULINARY_TECHNIQUE_IMAGES.default;
    return res.json({ imageUrl: fallback, cached: false });
  }
});

// Helper deterministic generator for fallback masterclass
function generateArtisanalFallbackMasterclass(ingredient: any, secondary: any[] = []): any {
  const name = ingredient.name || 'Specimen';
  return {
    id: `mc-resilience-${Date.now()}`,
    primaryIngredientId: ingredient.id || 'custom-id',
    primaryIngredientName: name,
    dishTitle: `Artisanal Study of ${name} with Emulsified Infusion`,
    subtitle: "Chronological extraction and temperature-curated thermal application",
    overview: `This masterclass explores the chemical and aromatic profile of ${name}. By calibrating gentle heat and targeted lipid binding, the full spectrum of ${ingredient.origin || 'earth'} terroir is captured on the plate.`,
    chefRationale: `The natural volatiles in ${name} demand progressive heat stratification to avoid enzymatic breakdown while unlocking deep savory harmonies.`,
    difficulty: "Grand Master Atelier",
    servings: 4,
    totalPrepTimeMinutes: 15,
    totalCookTimeMinutes: 20,
    overallDurationFormatted: "35 min",
    flavorAromaProfile: {
      umami: 92,
      acidity: 55,
      aromaticIntensity: 90,
      textureComplexity: 85,
      finishLength: 88,
    },
    requiredTools: [
      {
        id: "tool-knife",
        name: "Japanese High-Carbon Gyuto 210mm",
        category: "Cutlery",
        material: "Hand-forged Shirogami White Steel",
        purpose: "Clean geometric incisions preserving delicate botanical moisture",
        proTip: "Keep whetstone lubricated at 15-degree edge angle"
      },
      {
        id: "tool-pan",
        name: "Heavy-Gauge 2.5mm Copper Saucier",
        category: "Cookware",
        material: "Solid French Copper with Pure Tin Interior",
        purpose: "Provides instantaneous heat responsiveness across the reduction curve",
        proTip: "Pre-heat gently over low flame before introducing lipid base"
      },
      {
        id: "tool-probe",
        name: "Digital Calibrated Immersion Thermometer",
        category: "Precision Gauge",
        material: "Food-Grade Stainless Steel Probe",
        purpose: "Ensures lipid bath maintains precisely 62°C to prevent thermal scorching",
        proTip: "Check reading every 90 seconds during initial steep"
      },
      {
        id: "tool-tweezers",
        name: "Curved Titanium Plating Tweezers",
        category: "Plating & Finishing",
        material: "Matte Anodized Titanium",
        purpose: "Micro-manipulation of delicate petals and finishing elements",
        proTip: "Grip only by structural stems"
      }
    ],
    ingredientsList: [
      {
        name,
        amount: "150g prime selection",
        prepState: "Precision sliced on the bias",
        addedAtMinute: 4,
        isArchiveSpecialty: true
      },
      {
        name: "Clarified Brown Butter (Beurre Noisette)",
        amount: "45g",
        prepState: "Toasted to hazelnut aroma at 135°C",
        addedAtMinute: 0,
        isArchiveSpecialty: false
      },
      {
        name: "Aged Shiro Dashi Reduction",
        amount: "200ml",
        prepState: "Concentrated by 30%",
        addedAtMinute: 8,
        isArchiveSpecialty: false
      }
    ],
    timelineSteps: [
      {
        stepNumber: 1,
        timeOffsetFormatted: "00:00",
        timeOffsetSeconds: 0,
        title: "Thermal Base Setup & Pan Tempering",
        actionDescription: `Place the copper saucier over gentle flame and melt the clarified butter base until gentle hazelnut aroma fills the station.`,
        ingredientAdditions: [
          {
            ingredientName: "Clarified Brown Butter",
            amount: "45g",
            technique: "Swirled evenly across copper surface",
            timingNote: "At 00:00 initial melt"
          }
        ],
        toolsUsed: ["Heavy-Gauge 2.5mm Copper Saucier", "Digital Calibrated Immersion Thermometer"],
        criticalControlPoint: "Hold temperature below 120°C to preserve clean milk fat clarity.",
        sensoryCue: "Warm nutty fragrance with sweet brioche notes.",
        soundscapeType: "sizzle",
        spokenNarration: `We begin our masterclass with ${name} by gently melting clarified brown butter in our copper saucier, establishing a rich lipid baseline.`
      },
      {
        stepNumber: 2,
        timeOffsetFormatted: "03:45",
        timeOffsetSeconds: 225,
        title: `Introduction of ${name} & Gentle Poach`,
        actionDescription: `Gently lower the sliced ${name} into the foaming butter. Sauté for 90 seconds to allow the surface to caramelize without losing moisture.`,
        ingredientAdditions: [
          {
            ingredientName: name,
            amount: "150g",
            technique: "Distributed in a single uncrowded layer",
            timingNote: "At 03:45"
          }
        ],
        toolsUsed: ["Japanese High-Carbon Gyuto 210mm", "Heavy-Gauge 2.5mm Copper Saucier"],
        criticalControlPoint: "Do not overcrowd the pan; keep pieces spaced for even contact.",
        sensoryCue: "Intense aroma bloom releasing authentic terroir fragrance.",
        soundscapeType: "sizzle",
        spokenNarration: `Now we fold in the ${name}. Listen to the gentle sizzle as the natural sugars interact with the foaming butter.`
      },
      {
        stepNumber: 3,
        timeOffsetFormatted: "08:30",
        timeOffsetSeconds: 510,
        title: "Dashi Deglaze & Velvety Emulsion",
        actionDescription: `Deglaze the pan with warm dashi reduction. Swirl continuously as the sauce tightens into a glossy glaze coating each piece.`,
        ingredientAdditions: [
          {
            ingredientName: "Aged Shiro Dashi Reduction",
            amount: "200ml",
            technique: "Poured around perimeter in steady stream",
            timingNote: "At 08:30"
          }
        ],
        toolsUsed: ["Heavy-Gauge 2.5mm Copper Saucier"],
        criticalControlPoint: "Swirl the pan off-heat to emulsify the fat and broth into a stable emulsion.",
        sensoryCue: "Deep amber glaze coating the back of a spoon with mirror sheen.",
        soundscapeType: "whisk",
        spokenNarration: `We deglaze with aged dashi, swirling to form a luxurious, spoon-coating emulsion that binds every volatile aroma.`
      },
      {
        stepNumber: 4,
        timeOffsetFormatted: "14:00",
        timeOffsetSeconds: 840,
        title: "Artisanal Plating & Botanical Presentation",
        actionDescription: `Transfer to warm ceramic plates. Spoon the reduction over the top and arrange micro herbs with precision tweezers.`,
        ingredientAdditions: [],
        toolsUsed: ["Curved Titanium Plating Tweezers"],
        criticalControlPoint: "Serve immediately while warm to capture peak aromatic lift.",
        sensoryCue: "Steaming, aromatic masterpiece ready for degustation.",
        soundscapeType: "plating",
        spokenNarration: `Plate with precision on warm ceramics. The dish captures the purest essence of ${name}.`
      }
    ],
    platingPresentation: `Arranged with architectural restraint on warm handcrafted ceramic plates, accented with mirror glaze reduction.`,
    sommelierPairing: {
      vintage: "2019 Premier Cru Reserve",
      terroir: "Old Vine Heritage Terroir",
      tastingNote: "Bright mineral spine with rich texture that echoes the dish's savory depth."
    },
    heroImageUrl: ingredient.imageUrl || CATEGORY_FALLBACK_IMAGES[ingredient.category] || CATEGORY_FALLBACK_IMAGES.default,
    createdAt: new Date().toISOString()
  };
}

// Image Generation Endpoint using Gemini with robust fallback and caching
app.post("/api/generate-ingredient-image", async (req, res) => {
  try {
    const { id, name, scientificName, category, origin, flavorNotes, terroir } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Ingredient name is required" });
    }

    const cacheKey = id || name.toLowerCase().replace(/\s+/g, '-');

    // 1. Check if cached in server memory
    if (imageCache.has(cacheKey)) {
      return res.json({
        imageUrl: imageCache.get(cacheKey),
        cached: true,
        source: 'server_cache'
      });
    }

    const ai = getGeminiClient();
    let generatedBase64: string | null = null;

    if (ai) {
      try {
        const prompt = `Photorealistic, award-winning editorial food photography of raw culinary ingredient: ${name} (${scientificName || ''}). Category: ${category || 'Culinary Ingredient'}. Origin: ${origin || 'Earth'}. Terroir essence: ${terroir || ''}. Sensory notes: ${Array.isArray(flavorNotes) ? flavorNotes.join(', ') : flavorNotes || ''}. Dark moody cinematic lighting, Michelin dining presentation, rustic matte dark slate surface, natural organic textures, 8k resolution, macro depth of field, pure subject, strictly no text or watermark.`;

        const response = await ai.models.generateContent({
          model: 'imagen-3.0-generate-002',
          contents: { parts: [{ text: prompt }] },
          config: { imageConfig: { aspectRatio: "4:3" } }
        });

        if (response?.candidates?.[0]?.content?.parts) {
          for (const part of response.candidates[0].content.parts) {
            if (part.inlineData && part.inlineData.data) {
              const mime = part.inlineData.mimeType || 'image/png';
              generatedBase64 = `data:${mime};base64,${part.inlineData.data}`;
              break;
            }
          }
        }
      } catch (geminiError: any) {
        // Quota exhaustion or free-tier limitation gracefully handled via curated fallback
      }
    }

    // 2. If Gemini successfully generated the image, cache and return it
    if (generatedBase64) {
      imageCache.set(cacheKey, generatedBase64);
      return res.json({
        imageUrl: generatedBase64,
        cached: false,
        source: 'gemini_generated'
      });
    }

    // 3. Graceful fallback: return category-specific CDN image and cache
    const fallbackImage = CATEGORY_FALLBACK_IMAGES[category] || CATEGORY_FALLBACK_IMAGES.default;
    imageCache.set(cacheKey, fallbackImage);

    return res.json({
      imageUrl: fallbackImage,
      cached: false,
      source: 'curated_fallback'
    });

  } catch (error: any) {
    console.error("Error in /api/generate-ingredient-image:", error);
    const category = req.body?.category || 'default';
    const fallback = CATEGORY_FALLBACK_IMAGES[category] || CATEGORY_FALLBACK_IMAGES.default;
    return res.json({
      imageUrl: fallback,
      cached: false,
      source: 'error_fallback'
    });
  }
});

// Batch Image Cache endpoint
app.post("/api/batch-cache-images", (req, res) => {
  const { images } = req.body;
  if (images && typeof images === 'object') {
    for (const [key, value] of Object.entries(images)) {
      if (typeof value === 'string') {
        imageCache.set(key, value);
      }
    }
  }
  res.json({ status: "ok", totalCached: imageCache.size });
});

// Google Search Console verification endpoint
app.get("/googlee75da3e6b3b89b02.html", (_req, res) => {
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.status(200).send("google-site-verification: googlee75da3e6b3b89b02.html\n");
});

// Production-ready XML Sitemap endpoint
app.get("/sitemap.xml", (_req, res) => {
  const publicSitemap = path.join(process.cwd(), "public", "sitemap.xml");
  const distSitemap = path.join(process.cwd(), "dist", "sitemap.xml");
  const filePath = fs.existsSync(distSitemap) ? distSitemap : publicSitemap;

  if (fs.existsSync(filePath)) {
    res.setHeader("Content-Type", "application/xml; charset=utf-8");
    res.setHeader("Cache-Control", "public, max-age=3600");
    res.status(200).sendFile(filePath);
  } else {
    res.status(404).send("Sitemap not found");
  }
});

// Production-ready Robots.txt endpoint
app.get("/robots.txt", (_req, res) => {
  const publicRobots = path.join(process.cwd(), "public", "robots.txt");
  const distRobots = path.join(process.cwd(), "dist", "robots.txt");
  const filePath = fs.existsSync(distRobots) ? distRobots : publicRobots;

  if (fs.existsSync(filePath)) {
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.setHeader("Cache-Control", "public, max-age=3600");
    res.status(200).sendFile(filePath);
  } else {
    res.status(404).send("Robots.txt not found");
  }
});

// SEO & Sitemap Health Diagnostics Endpoint
app.get("/api/sitemap-stats", (_req, res) => {
  const distSitemap = path.join(process.cwd(), "dist", "sitemap.xml");
  const publicSitemap = path.join(process.cwd(), "public", "sitemap.xml");
  const filePath = fs.existsSync(distSitemap) ? distSitemap : publicSitemap;

  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, "utf8");
    const urlMatches = content.match(/<loc>(.*?)<\/loc>/g) || [];
    const ingredientMatches = content.match(/<loc>.*?\/ingredients\/.*?<\/loc>/g) || [];
    const recipeMatches = content.match(/<loc>.*?\/recipes\/.*?<\/loc>/g) || [];
    const stats = fs.statSync(filePath);

    res.json({
      status: "ok",
      totalUrls: urlMatches.length,
      ingredientsCount: ingredientMatches.length,
      recipesCount: recipeMatches.length,
      staticCount: urlMatches.length - ingredientMatches.length - recipeMatches.length,
      fileSizeKb: (stats.size / 1024).toFixed(1),
      lastModified: stats.mtime.toISOString(),
      sitemapPath: "/sitemap.xml",
      canonicalHost: "https://stassen-collection-of-ingredients.skushekana.workers.dev"
    });
  } else {
    res.status(404).json({ error: "Sitemap not found" });
  }
});

async function startServer() {
  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();

