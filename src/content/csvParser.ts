import { Ingredient, CulinaryMasterclass, IngredientCategory, WorldRegion, HarvestSeason, RarityLevel } from '../types';
import { IngredientInputSchema, RecipeInputSchema } from './schema';
import { sanitizeString, sanitizeStringArray } from './validator';

/**
 * RFC 4180-compliant CSV parser with delimiter auto-detection,
 * multi-line quoted field support, escaped quote handling, and BOM stripping.
 */
export function parseCsvRows(csvText: string): { headers: string[]; rows: Record<string, string>[] } {
  // Strip UTF-8 BOM if present
  let cleanText = csvText.replace(/^\uFEFF/, '').trim();
  if (!cleanText) {
    return { headers: [], rows: [] };
  }

  // Detect delimiter based on first line
  const firstLine = cleanText.split(/\r?\n/)[0] || '';
  let delimiter = ',';
  if ((firstLine.match(/;/g) || []).length > (firstLine.match(/,/g) || []).length) {
    delimiter = ';';
  } else if ((firstLine.match(/\t/g) || []).length > (firstLine.match(/,/g) || []).length) {
    delimiter = '\t';
  }

  const rawRows: string[][] = [];
  let currentRow: string[] = [];
  let currentField = '';
  let inQuotes = false;
  let i = 0;

  while (i < cleanText.length) {
    const char = cleanText[i];
    const nextChar = cleanText[i + 1];

    if (inQuotes) {
      if (char === '"') {
        if (nextChar === '"') {
          // Escaped quote
          currentField += '"';
          i += 2;
          continue;
        } else {
          // Closing quote
          inQuotes = false;
          i++;
          continue;
        }
      } else {
        currentField += char;
        i++;
        continue;
      }
    } else {
      if (char === '"') {
        inQuotes = true;
        i++;
        continue;
      } else if (char === delimiter) {
        currentRow.push(currentField.trim());
        currentField = '';
        i++;
        continue;
      } else if (char === '\r' && nextChar === '\n') {
        currentRow.push(currentField.trim());
        currentField = '';
        if (currentRow.some(f => f.length > 0)) {
          rawRows.push(currentRow);
        }
        currentRow = [];
        i += 2;
        continue;
      } else if (char === '\n' || char === '\r') {
        currentRow.push(currentField.trim());
        currentField = '';
        if (currentRow.some(f => f.length > 0)) {
          rawRows.push(currentRow);
        }
        currentRow = [];
        i++;
        continue;
      } else {
        currentField += char;
        i++;
        continue;
      }
    }
  }

  // Flush remaining field
  currentRow.push(currentField.trim());
  if (currentRow.some(f => f.length > 0)) {
    rawRows.push(currentRow);
  }

  if (rawRows.length === 0) {
    return { headers: [], rows: [] };
  }

  const rawHeaders = rawRows[0].map(h => h.trim());
  const normalizedHeaders = rawHeaders.map(h => h.toLowerCase().replace(/[^a-z0-9]/g, ''));
  const dataRows = rawRows.slice(1);

  const mappedRows: Record<string, string>[] = [];

  for (const row of dataRows) {
    const obj: Record<string, string> = {};
    for (let col = 0; col < rawHeaders.length; col++) {
      const headerKey = normalizedHeaders[col] || `col${col}`;
      obj[headerKey] = row[col] !== undefined ? row[col] : '';
    }
    mappedRows.push(obj);
  }

  return { headers: rawHeaders, rows: mappedRows };
}

/**
 * Parse ingredients from CSV text into partial IngredientInputSchema array
 */
export function parseIngredientsFromCsv(csvText: string): unknown[] {
  const { rows } = parseCsvRows(csvText);

  return rows.map(r => {
    // Helper to get value matching possible alias keys
    const get = (...keys: string[]): string => {
      for (const k of keys) {
        const norm = k.toLowerCase().replace(/[^a-z0-9]/g, '');
        if (r[norm] !== undefined && r[norm] !== '') {
          return r[norm];
        }
      }
      return '';
    };

    // Parse list from comma or pipe delimited string or JSON
    const parseList = (val: string): string[] => {
      if (!val) return [];
      if (val.startsWith('[') && val.endsWith(']')) {
        try {
          const parsed = JSON.parse(val);
          if (Array.isArray(parsed)) return parsed.map(String);
        } catch {
          // fallback
        }
      }
      return val.split(/[|;]/).map(s => s.trim()).filter(Boolean);
    };

    const ingredient: Partial<IngredientInputSchema> = {
      id: get('id', 'ingredientid') || undefined,
      slug: get('slug') || undefined,
      name: get('name', 'title', 'ingredientname', 'botanicalname'),
      scientificName: get('scientificname', 'latinname', 'taxonomicname') || undefined,
      category: get('category', 'type', 'group') as IngredientCategory,
      origin: get('origin', 'terroirname', 'provenance') || undefined,
      region: get('region', 'worldregion') as WorldRegion || undefined,
      country: get('country', 'nation') || undefined,
      season: get('season', 'harvestseason') as HarvestSeason || undefined,
      harvestWindow: get('harvestwindow', 'peakwindow', 'harvestperiod') || undefined,
      flavorNotes: parseList(get('flavornotes', 'tastingnotes', 'notes')),
      imageUrl: get('imageurl', 'image', 'photo', 'photoimage', 'heroimage') || undefined,
      overview: get('overview', 'summary') || undefined,
      description: get('description', 'desc', 'details', 'editorial') || get('overview'),
      terroir: get('terroir', 'terroirdescription', 'soilgeography') || undefined,
      culinaryApplications: parseList(get('culinaryapplications', 'applications', 'uses', 'pairingssuggestions')),
      aliases: parseList(get('aliases', 'alternativenames', 'synonyms', 'commonnames')),
      relatedRecipeIds: parseList(get('relatedrecipeids', 'recipes', 'recipeids')),
      rarityIndex: get('rarityindex', 'rarity', 'heritageindex') as RarityLevel || undefined,
      storageAdvice: get('storageadvice', 'conservation', 'storage') || undefined,
      curatorNotes: get('curatornotes', 'editorialnotes') || undefined,
      seoTitle: get('seotitle') || undefined,
      seoDescription: get('seodescription') || undefined,
      seoKeywords: parseList(get('seokeywords', 'keywords'))
    };

    // If specific numeric flavor scores are present
    const umami = parseFloat(get('umami'));
    const aroma = parseFloat(get('aroma'));
    const acidity = parseFloat(get('acidity'));
    const sweetness = parseFloat(get('sweetness'));
    const bitterness = parseFloat(get('bitterness'));
    const pungency = parseFloat(get('pungency'));
    const depth = parseFloat(get('depth'));

    if (!isNaN(umami) || !isNaN(aroma) || !isNaN(acidity)) {
      ingredient.flavorProfile = {
        ...(isNaN(umami) ? {} : { umami }),
        ...(isNaN(aroma) ? {} : { aroma }),
        ...(isNaN(acidity) ? {} : { acidity }),
        ...(isNaN(sweetness) ? {} : { sweetness }),
        ...(isNaN(bitterness) ? {} : { bitterness }),
        ...(isNaN(pungency) ? {} : { pungency }),
        ...(isNaN(depth) ? {} : { depth }),
      };
    }

    return ingredient;
  });
}

/**
 * Parse recipes from CSV text into partial RecipeInputSchema array
 */
export function parseRecipesFromCsv(csvText: string): unknown[] {
  const { rows } = parseCsvRows(csvText);

  return rows.map(r => {
    const get = (...keys: string[]): string => {
      for (const k of keys) {
        const norm = k.toLowerCase().replace(/[^a-z0-9]/g, '');
        if (r[norm] !== undefined && r[norm] !== '') {
          return r[norm];
        }
      }
      return '';
    };

    const parseList = (val: string): string[] => {
      if (!val) return [];
      if (val.startsWith('[') && val.endsWith(']')) {
        try {
          const parsed = JSON.parse(val);
          if (Array.isArray(parsed)) return parsed.map(String);
        } catch {
          // fallback
        }
      }
      return val.split(/[|;]/).map(s => s.trim()).filter(Boolean);
    };

    // Parse ingredients list: support JSON array OR pipe-delimited list: "Amount Name [id:xxx]"
    const rawIngString = get('ingredients', 'ingredientslist', 'components');
    let ingredientsList: RecipeInputSchema['ingredientsList'] = [];

    if (rawIngString.startsWith('[') && rawIngString.endsWith(']')) {
      try {
        const parsed = JSON.parse(rawIngString);
        if (Array.isArray(parsed)) {
          ingredientsList = parsed;
        }
      } catch {
        // Fall back to text parsing
      }
    }

    if (ingredientsList.length === 0 && rawIngString) {
      const items = rawIngString.split(/[|;\n]/).map(s => s.trim()).filter(Boolean);
      for (const item of items) {
        // Try to extract ID in [id:xxx]
        const idMatch = item.match(/\[id:([^\]]+)\]/i);
        const refId = idMatch ? idMatch[1].trim() : undefined;
        const cleanItem = item.replace(/\[id:[^\]]+\]/i, '').trim();

        // Try to split "Amount Name" or "Name: Amount"
        if (cleanItem.includes(':')) {
          const parts = cleanItem.split(':');
          ingredientsList.push({
            name: parts[0].trim(),
            amount: parts[1]?.trim() || 'To taste',
            ingredientId: refId,
            isArchiveSpecialty: Boolean(refId)
          });
        } else {
          // Match leading amount like "200g Fresh Matsutake" or "2 whole Yuzu"
          const match = cleanItem.match(/^([\d/.]+\s*[a-zA-Z%]+|\d+)\s+(.+)$/);
          if (match) {
            ingredientsList.push({
              name: match[2].trim(),
              amount: match[1].trim(),
              ingredientId: refId,
              isArchiveSpecialty: Boolean(refId)
            });
          } else {
            ingredientsList.push({
              name: cleanItem,
              amount: 'As needed',
              ingredientId: refId,
              isArchiveSpecialty: Boolean(refId)
            });
          }
        }
      }
    }

    // Parse instructions / steps: support JSON array OR pipe/newline delimited strings
    const rawStepsString = get('instructions', 'timelinesteps', 'steps', 'preparationsteps');
    let timelineSteps: any[] = [];

    if (rawStepsString.startsWith('[') && rawStepsString.endsWith(']')) {
      try {
        const parsed = JSON.parse(rawStepsString);
        if (Array.isArray(parsed)) {
          timelineSteps = parsed;
        }
      } catch {
        // Fall back
      }
    }

    if (timelineSteps.length === 0 && rawStepsString) {
      const steps = rawStepsString.split(/[|\n]/).map(s => s.trim()).filter(Boolean);
      let stepNum = 1;
      for (const step of steps) {
        // Look for "Step X: Title - Description" or simple text
        const titleMatch = step.match(/^Step\s*\d+:\s*([^–—\-:]+)[–—\-:]\s*(.+)$/i);
        if (titleMatch) {
          timelineSteps.push({
            stepNumber: stepNum,
            title: titleMatch[1].trim(),
            actionDescription: titleMatch[2].trim()
          });
        } else {
          timelineSteps.push({
            stepNumber: stepNum,
            title: `Step ${stepNum}`,
            actionDescription: step
          });
        }
        stepNum++;
      }
    }

    const prep = parseInt(get('totalpreptimeminutes', 'preptime', 'preptimeminutes'), 10);
    const cook = parseInt(get('totalcooktimeminutes', 'cooktime', 'cooktimeminutes'), 10);
    const servings = parseInt(get('servings', 'yield', 'portions'), 10);

    const recipe: Partial<RecipeInputSchema> = {
      id: get('id', 'recipeid') || undefined,
      slug: get('slug') || undefined,
      dishTitle: get('dishtitle', 'name', 'title', 'recipename'),
      subtitle: get('subtitle', 'tagline') || undefined,
      overview: get('overview', 'summary', 'description'),
      description: get('description', 'overview'),
      cuisine: get('cuisine', 'culinarytradition') || undefined,
      courseCategory: get('coursecategory', 'course', 'category') as any || undefined,
      difficulty: get('difficulty', 'skilllevel') as any || undefined,
      servings: !isNaN(servings) ? servings : undefined,
      totalPrepTimeMinutes: !isNaN(prep) ? prep : undefined,
      totalCookTimeMinutes: !isNaN(cook) ? cook : undefined,
      primaryIngredientId: get('primaryingredientid', 'primaryingredient') || undefined,
      primaryIngredientName: get('primaryingredientname') || undefined,
      heroImageUrl: get('heroimageurl', 'imageurl', 'image', 'photo') || undefined,
      ingredientsList,
      timelineSteps,
      tags: parseList(get('tags', 'cuisinetags')),
      seoTitle: get('seotitle') || undefined,
      seoDescription: get('seodescription') || undefined,
      seoKeywords: parseList(get('seokeywords', 'keywords'))
    };

    return recipe;
  });
}

/**
 * Serialize an array of Ingredients to standard CSV format
 */
export function ingredientsToCsv(ingredients: Ingredient[]): string {
  const headers = [
    'id',
    'slug',
    'name',
    'scientificName',
    'category',
    'origin',
    'region',
    'country',
    'season',
    'harvestWindow',
    'flavorNotes',
    'imageUrl',
    'overview',
    'description',
    'terroir',
    'culinaryApplications',
    'aliases',
    'relatedRecipeIds',
    'rarityIndex',
    'storageAdvice',
    'seoTitle',
    'seoDescription'
  ];

  const escapeCsv = (val: unknown): string => {
    if (val === undefined || val === null) return '""';
    let str: string;
    if (Array.isArray(val)) {
      str = val.join(' | ');
    } else if (typeof val === 'object') {
      str = JSON.stringify(val);
    } else {
      str = String(val);
    }
    return `"${str.replace(/"/g, '""')}"`;
  };

  const rows = ingredients.map(i => [
    escapeCsv(i.id),
    escapeCsv(i.slug),
    escapeCsv(i.name),
    escapeCsv(i.scientificName),
    escapeCsv(i.category),
    escapeCsv(i.origin),
    escapeCsv(i.region),
    escapeCsv(i.country),
    escapeCsv(i.season),
    escapeCsv(i.harvestWindow),
    escapeCsv(i.flavorNotes),
    escapeCsv(i.imageUrl),
    escapeCsv(i.overview),
    escapeCsv(i.description),
    escapeCsv(i.terroir),
    escapeCsv(i.culinaryApplications),
    escapeCsv(i.aliases),
    escapeCsv(i.relatedRecipeIds),
    escapeCsv(i.rarityIndex),
    escapeCsv(i.storageAdvice),
    escapeCsv(i.seoTitle),
    escapeCsv(i.seoDescription)
  ].join(','));

  return [headers.join(','), ...rows].join('\r\n');
}

/**
 * Serialize an array of Recipes to standard CSV format
 */
export function recipesToCsv(recipes: CulinaryMasterclass[]): string {
  const headers = [
    'id',
    'slug',
    'dishTitle',
    'subtitle',
    'cuisine',
    'courseCategory',
    'difficulty',
    'servings',
    'totalPrepTimeMinutes',
    'totalCookTimeMinutes',
    'primaryIngredientId',
    'primaryIngredientName',
    'heroImageUrl',
    'overview',
    'ingredients',
    'instructions',
    'seoTitle',
    'seoDescription'
  ];

  const escapeCsv = (val: unknown): string => {
    if (val === undefined || val === null) return '""';
    let str: string;
    if (Array.isArray(val)) {
      str = val.join(' | ');
    } else {
      str = String(val);
    }
    return `"${str.replace(/"/g, '""')}"`;
  };

  const rows = recipes.map(r => {
    const formattedIngredients = r.ingredientsList
      ? r.ingredientsList.map(item => `${item.amount} ${item.name}${item.ingredientId ? ` [id:${item.ingredientId}]` : ''}`).join(' | ')
      : '';

    const formattedSteps = r.timelineSteps
      ? r.timelineSteps.map(step => `${step.title}: ${step.actionDescription}`).join(' | ')
      : '';

    return [
      escapeCsv(r.id),
      escapeCsv(r.slug),
      escapeCsv(r.dishTitle),
      escapeCsv(r.subtitle),
      escapeCsv(r.cuisine),
      escapeCsv(r.courseCategory),
      escapeCsv(r.difficulty),
      escapeCsv(r.servings),
      escapeCsv(r.totalPrepTimeMinutes),
      escapeCsv(r.totalCookTimeMinutes),
      escapeCsv(r.primaryIngredientId),
      escapeCsv(r.primaryIngredientName),
      escapeCsv(r.heroImageUrl),
      escapeCsv(r.overview),
      escapeCsv(formattedIngredients),
      escapeCsv(formattedSteps),
      escapeCsv(r.seoTitle),
      escapeCsv(r.seoDescription)
    ].join(',');
  });

  return [headers.join(','), ...rows].join('\r\n');
}

/**
 * Generate starter downloadable sample CSV template for ingredients
 */
export function generateSampleIngredientCsv(): string {
  return [
    'id,slug,name,scientificName,category,origin,region,country,season,harvestWindow,flavorNotes,imageUrl,overview,description,terroir,culinaryApplications,aliases,relatedRecipeIds,rarityIndex,storageAdvice,seoTitle,seoDescription',
    '"yuzu-kochi-reserve","yuzu-kochi-reserve","Kōchi Mountain Wild Yuzu","Citrus junos","Foraged Botanicals","Shikoku Mountains, Kōchi Prefecture","East Asia","Japan","Autumn","October through December","Crystalline Citric Acidity | White Blossom Flora | Resinous Pine Terpene","https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=1200","Revered mountain citrus grown on steep terrace groves overlooking the Pacific Ocean.","Harvested in freezing autumn dawn breezes, this wild yuzu displays concentrated zest oils packed with volatile terpenes.","Mineral-rich slate soils on 45-degree slope mountain terraces with dramatic day-night temperature swings.","Micro-planed fresh zest over sashimi | Aged ponzu fermentation with single-origin soy | Aromatic butter emulsion","Japanese Mountain Yuzu | Shikoku Citrus Junos","rec-yuzu-hamachi-crudo","Rare Seasonal Harvest","Wrap in breathable unbleached paper inside a sealed container at 4°C. Consume within 10 days.","Kōchi Mountain Wild Yuzu — Flavor & Terroir Guide | Stassen\'s","Discover authentic wild Japanese yuzu from Shikoku, tasting notes, and haute masterclass pairings."'
  ].join('\r\n');
}

/**
 * Generate starter downloadable sample CSV template for recipes
 */
export function generateSampleRecipeCsv(): string {
  return [
    'id,slug,dishTitle,subtitle,cuisine,courseCategory,difficulty,servings,totalPrepTimeMinutes,totalCookTimeMinutes,primaryIngredientId,primaryIngredientName,heroImageUrl,overview,ingredients,instructions,seoTitle,seoDescription',
    '"rec-yuzu-hamachi-crudo","yuzu-hamachi-crudo","Cured Wild Hamachi with Kōchi Yuzu Pearls","Cold-Extracted Crudo Atelier with Mountain Terpenes","Japanese","Cold Appetizer","Advanced",4,15,5,"yuzu-kochi-reserve","Kōchi Mountain Wild Yuzu","https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?q=80&w=1200","A pristine sashimi-grade hamachi crudo elevated with crystalline mountain yuzu extraction.","280g Sashimi-Grade Wild Hamachi | 2 whole Kōchi Mountain Wild Yuzu [id:yuzu-kochi-reserve] | 25ml Cold-Pressed Camellia Seed Oil | Pinch Crystalline Mineral Flake Salt","Step 1 - Precision Bias Slicing: Slice cold hamachi into 4mm ribbons and arrange on chilled slate. | Step 2 - Cold Emulsion Dressing: Whisk fresh wild yuzu juice with cold camellia oil until emulsified. Drizzle gently over fish. | Step 3 - Finishing Aromatics: Micro-plane fresh yuzu zest overhead to release mist. Scatter mineral flake salt and serve immediately.","Cured Wild Hamachi with Kōchi Yuzu Recipe | Stassen\'s Masterclass","Master the art of cold-extracted wild hamachi crudo featuring mountain yuzu and camellia oil."'
  ].join('\r\n');
}
