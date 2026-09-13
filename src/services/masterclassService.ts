import { CulinaryMasterclass, Ingredient } from '../types';

const LOCAL_STORAGE_MASTERCLASSES = 'stassens_culinary_masterclasses_v3';

// High-speed In-memory cache for instant zero-latency retrieval (< 1ms)
const inMemoryMasterclasses = new Map<string, CulinaryMasterclass>();
const inMemoryStepVisuals = new Map<string, string>();

// Local storage helper with memory synchronization
export function getSavedMasterclasses(): CulinaryMasterclass[] {
  if (inMemoryMasterclasses.size > 0) {
    return Array.from(inMemoryMasterclasses.values());
  }
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_MASTERCLASSES);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        parsed.forEach((m) => {
          if (m && m.id) {
            inMemoryMasterclasses.set(m.id, m);
            if (m.primaryIngredientId) inMemoryMasterclasses.set(m.primaryIngredientId, m);
          }
        });
        return parsed;
      }
    }
  } catch (e) {
    console.error('Error loading stored masterclasses:', e);
  }
  return [];
}

export function saveMasterclassLocally(masterclass: CulinaryMasterclass) {
  try {
    inMemoryMasterclasses.set(masterclass.id, masterclass);
    if (masterclass.primaryIngredientId) {
      inMemoryMasterclasses.set(masterclass.primaryIngredientId, masterclass);
    }
    const current = getSavedMasterclasses();
    const updated = [masterclass, ...current.filter((m) => m.id !== masterclass.id)];
    localStorage.setItem(LOCAL_STORAGE_MASTERCLASSES, JSON.stringify(updated.slice(0, 100)));
  } catch (e) {
    console.error('Error saving masterclass locally:', e);
  }
}

// Initial populate of memory cache on module load
try {
  getSavedMasterclasses();
} catch (_) {}

/**
 * Fetch initial curated masterclasses from server
 */
export async function fetchCuratedMasterclasses(): Promise<CulinaryMasterclass[]> {
  try {
    const res = await fetch('/api/curated-masterclasses');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    const list: CulinaryMasterclass[] = data.masterclasses || [];
    list.forEach(m => {
      inMemoryMasterclasses.set(m.id, m);
      if (m.primaryIngredientId) inMemoryMasterclasses.set(m.primaryIngredientId, m);
    });
    return list;
  } catch (err) {
    console.warn('Could not fetch server curated masterclasses:', err);
    return Array.from(inMemoryMasterclasses.values());
  }
}

/**
 * Pre-warm / prefetch masterclass in background for instant launch
 */
export function prefetchMasterclass(ingredient: Ingredient) {
  if (inMemoryMasterclasses.has(ingredient.id)) return;
  // Non-blocking background prefetch
  setTimeout(() => {
    generateMasterclassForIngredient(ingredient).catch(() => {});
  }, 100);
}

/**
 * Generate a comprehensive culinary masterclass with timeline, tools, additions, and sensory cues (Ultra-Fast)
 */
export async function generateMasterclassForIngredient(
  ingredient: Ingredient,
  options?: {
    customPrompt?: string;
    secondaryIngredients?: string[];
  }
): Promise<CulinaryMasterclass> {
  const isDefaultRequest = !options?.customPrompt && (!options?.secondaryIngredients || options.secondaryIngredients.length === 0);

  // 1. Instant check memory cache (0ms)
  if (isDefaultRequest && inMemoryMasterclasses.has(ingredient.id)) {
    return inMemoryMasterclasses.get(ingredient.id)!;
  }

  // 2. Instant check local storage cache (< 2ms)
  const saved = getSavedMasterclasses();
  const existing = saved.find(
    (m) =>
      m.primaryIngredientId === ingredient.id &&
      (!options?.secondaryIngredients || options.secondaryIngredients.length === 0)
  );

  if (existing && !options?.customPrompt) {
    inMemoryMasterclasses.set(ingredient.id, existing);
    return existing;
  }

  try {
    const res = await fetch('/api/generate-culinary-masterclass', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ingredient,
        customPrompt: options?.customPrompt,
        secondaryIngredients: options?.secondaryIngredients,
      }),
    });

    if (res.ok) {
      const data = await res.json();
      if (data.masterclass) {
        saveMasterclassLocally(data.masterclass);
        return data.masterclass;
      }
    }
  } catch (err) {
    console.warn('Notice calling /api/generate-culinary-masterclass:', err);
  }

  // Resilient fallback masterclass if network or remote generation encounters issues
  const fallback = generateClientFallbackMasterclass(ingredient, options?.secondaryIngredients);
  saveMasterclassLocally(fallback);
  return fallback;
}

function generateClientFallbackMasterclass(ingredient: Ingredient, secondaryIngredients?: string[]): CulinaryMasterclass {
  const name = ingredient.name;
  const harmony = secondaryIngredients && secondaryIngredients.length > 0
    ? `harmonized with ${secondaryIngredients.join(', ')}`
    : `accentuated with cultured brown butter and aged dashi`;

  return {
    id: `mc-${ingredient.id}-${Date.now()}`,
    dishTitle: `Artisanal Study: ${name}`,
    subtitle: `Haute culinary examination of ${name} ${harmony}`,
    primaryIngredientId: ingredient.id,
    primaryIngredientName: name,
    overview: `This masterclass explores the nuanced lipid-soluble aromatics and volatile compounds of ${name}. Through temperature control and progressive emulsification, we extract the purest expression of terroir.`,
    chefRationale: `The delicate cell structure requires precise thermal calibration to prevent volatilization of aromatic terpenes while achieving optimal caramelization.`,
    difficulty: 'Artisanal Selection',
    servings: 2,
    totalPrepTimeMinutes: 15,
    totalCookTimeMinutes: 20,
    overallDurationFormatted: '35 mins',
    flavorAromaProfile: {
      umami: ingredient.flavorProfile?.depth || 85,
      acidity: ingredient.flavorProfile?.pungency || 40,
      aromaticIntensity: ingredient.flavorProfile?.aroma || 90,
      textureComplexity: 88,
      finishLength: 92
    },
    requiredTools: [
      {
        id: 'tool-saucier',
        name: 'Heavy-Gauge 2.5mm Copper Saucier',
        category: 'Cookware',
        material: 'Solid French Copper with Tin Lining',
        purpose: 'Provides uniform thermal conduction preventing hot spots',
        proTip: 'Preheat slowly over low heat to protect the hand-wiped tin lining.'
      },
      {
        id: 'tool-knife',
        name: 'Japanese High-Carbon Gyuto 210mm',
        category: 'Cutlery',
        material: 'Shirogami #2 White Paper Steel with Magnolia Handle',
        purpose: 'Achieves pristine, cell-preserving push-cuts across delicate fibers',
        proTip: 'Slice in a single continuous forward motion to preserve cellular integrity.'
      },
      {
        id: 'tool-tweezers',
        name: 'Curved Titanium Plating Tweezers',
        category: 'Plating & Finishing',
        material: 'Matte Anodized Titanium Alloy',
        purpose: 'Provides surgical precision during delicate botanical garnish placement',
        proTip: 'Grasp micro-herbs gently at the stem base to prevent bruising leaves.'
      }
    ],
    ingredientsList: [
      {
        name: name,
        amount: '150g',
        prepState: 'Gently cleaned and shaved into 3mm carpaccio slices',
        addedAtMinute: 4,
        isArchiveSpecialty: true
      },
      {
        name: 'Normandy Cultured Beurre Noisette',
        amount: '45g',
        prepState: 'Clarified to amber nuttiness',
        addedAtMinute: 0,
        isArchiveSpecialty: false
      },
      {
        name: 'Aged Shiro Dashi Reduction',
        amount: '200ml',
        prepState: 'Simmered with Rishiri kombu to golden viscosity',
        addedAtMinute: 8,
        isArchiveSpecialty: false
      }
    ],
    timelineSteps: [
      {
        stepNumber: 1,
        timeOffsetFormatted: '00:00',
        timeOffsetSeconds: 0,
        title: 'Thermal Foundation & Lipid Melting',
        actionDescription: `Place copper saucier over gentle flame (95°C). Melt clarified brown butter until foaming quietly with warm brioche aroma.`,
        ingredientAdditions: [
          {
            ingredientName: 'Normandy Cultured Beurre Noisette',
            amount: '45g',
            technique: 'Swirled evenly across copper surface',
            timingNote: 'At 00:00'
          }
        ],
        toolsUsed: ['Heavy-Gauge 2.5mm Copper Saucier'],
        criticalControlPoint: 'Hold temperature below 120°C to preserve clean milk fat clarity.',
        sensoryCue: 'Warm nutty fragrance with sweet brioche notes.',
        soundscapeType: 'sizzle',
        spokenNarration: `We begin our masterclass with ${name} by gently melting clarified brown butter in our copper saucier.`
      },
      {
        stepNumber: 2,
        timeOffsetFormatted: '04:00',
        timeOffsetSeconds: 240,
        title: `Introduction of ${name} & Gentle Poach`,
        actionDescription: `Gently lower the sliced ${name} into the foaming butter. Sauté for 90 seconds to allow surface caramelization without moisture loss.`,
        ingredientAdditions: [
          {
            ingredientName: name,
            amount: '150g',
            technique: 'Distributed in single uncrowded layer',
            timingNote: 'At 04:00'
          }
        ],
        toolsUsed: ['Japanese High-Carbon Gyuto 210mm', 'Heavy-Gauge 2.5mm Copper Saucier'],
        criticalControlPoint: 'Do not overcrowd the pan; keep pieces spaced for even contact.',
        sensoryCue: 'Intense aroma bloom releasing authentic terroir fragrance.',
        soundscapeType: 'sizzle',
        spokenNarration: `Now we fold in the ${name}. Listen to the gentle sizzle as natural sugars interact with the foaming butter.`
      },
      {
        stepNumber: 3,
        timeOffsetFormatted: '08:30',
        timeOffsetSeconds: 510,
        title: 'Dashi Deglaze & Velvety Emulsion',
        actionDescription: `Deglaze with warm dashi reduction. Swirl continuously as the sauce tightens into a glossy glaze coating each piece.`,
        ingredientAdditions: [
          {
            ingredientName: 'Aged Shiro Dashi Reduction',
            amount: '200ml',
            technique: 'Poured around perimeter in steady stream',
            timingNote: 'At 08:30'
          }
        ],
        toolsUsed: ['Heavy-Gauge 2.5mm Copper Saucier'],
        criticalControlPoint: 'Swirl the pan off-heat to emulsify fat and broth into a stable emulsion.',
        sensoryCue: 'Deep amber glaze coating the back of a spoon with mirror sheen.',
        soundscapeType: 'whisk',
        spokenNarration: `We deglaze with aged dashi, swirling to form a luxurious, spoon-coating emulsion that binds every aroma.`
      },
      {
        stepNumber: 4,
        timeOffsetFormatted: '14:00',
        timeOffsetSeconds: 840,
        title: 'Artisanal Plating & Botanical Presentation',
        actionDescription: `Transfer to warm ceramic plates. Spoon the reduction over the top and arrange micro herbs with precision tweezers.`,
        ingredientAdditions: [],
        toolsUsed: ['Curved Titanium Plating Tweezers'],
        criticalControlPoint: 'Serve immediately while warm to capture peak aromatic lift.',
        sensoryCue: 'Steaming, aromatic masterpiece ready for degustation.',
        soundscapeType: 'plating',
        spokenNarration: `Plate with precision on warm ceramics. The dish captures the purest essence of ${name}.`
      }
    ],
    platingPresentation: `Arranged with architectural restraint on warm handcrafted ceramic plates, accented with mirror glaze reduction.`,
    sommelierPairing: {
      vintage: '2019 Premier Cru Reserve',
      terroir: 'Old Vine Heritage Terroir',
      tastingNote: "Bright mineral spine with rich texture that echoes the dish's savory depth."
    },
    heroImageUrl: ingredient.imageUrl || 'https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?q=80&w=1200&auto=format&fit=crop',
    createdAt: new Date().toISOString()
  };
}

/**
 * Generate step macro photography visual (Instant cache hit)
 */
export async function generateStepVisual(
  dishTitle: string,
  stepTitle: string,
  actionDescription: string,
  category: string,
  soundscapeType?: string
): Promise<string> {
  const key = `${dishTitle}_${stepTitle}`.toLowerCase().replace(/\s+/g, '-');
  if (inMemoryStepVisuals.has(key)) {
    return inMemoryStepVisuals.get(key)!;
  }

  try {
    const res = await fetch('/api/generate-step-image', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        dishTitle,
        stepTitle,
        actionDescription,
        category,
        soundscapeType,
      }),
    });

    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    const url = data.imageUrl || '';
    if (url) {
      inMemoryStepVisuals.set(key, url);
    }
    return url;
  } catch (err) {
    return '';
  }
}

