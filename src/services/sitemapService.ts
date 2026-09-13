import { ingredientService } from './ingredientService';
import { recipeService } from './recipeService';
import { categoryRegistry } from '../content/categoryRegistry';

export const CANONICAL_BASE_URL = 'https://stassen-collection-of-ingredients.skushekana.workers.dev';

export interface SitemapEntry {
  loc: string;
  lastmod: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: string;
  type: 'static' | 'ingredient' | 'recipe' | 'category';
}

export interface SitemapStats {
  totalUrls: number;
  staticCount: number;
  ingredientCount: number;
  recipeCount: number;
  categoryCount?: number;
  generatedAt: string;
  canonicalBaseUrl: string;
}

/**
 * Static indexable routes configuration.
 * Note: Non-indexable utility routes (such as /search, /pantry, /shopping-list, /admin)
 * are strictly omitted.
 */
export const STATIC_INDEXABLE_ROUTES: Array<{
  path: string;
  changefreq: SitemapEntry['changefreq'];
  priority: string;
}> = [
  { path: '/', changefreq: 'daily', priority: '1.0' },
  { path: '/categories', changefreq: 'daily', priority: '0.9' },
  { path: '/collection', changefreq: 'daily', priority: '0.9' },
  { path: '/recipes', changefreq: 'daily', priority: '0.9' },
  { path: '/locations', changefreq: 'weekly', priority: '0.8' },
  { path: '/calendar', changefreq: 'weekly', priority: '0.8' },
  { path: '/what-can-i-cook', changefreq: 'weekly', priority: '0.8' },
  { path: '/about', changefreq: 'monthly', priority: '0.7' },
  { path: '/contact', changefreq: 'monthly', priority: '0.6' },
  { path: '/privacy', changefreq: 'monthly', priority: '0.5' },
];

/**
 * Clean and escape strings for XML safety
 */
function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/**
 * Format date to YYYY-MM-DD
 */
function formatDate(dateInput?: string | number | Date | null): string {
  if (!dateInput) return new Date().toISOString().split('T')[0];
  try {
    const d = new Date(dateInput);
    if (isNaN(d.getTime())) return new Date().toISOString().split('T')[0];
    return d.toISOString().split('T')[0];
  } catch {
    return new Date().toISOString().split('T')[0];
  }
}

/**
 * Robust sitemap generation service that dynamically reflects actual live data
 * for all static pages, botanical specimens, and culinary recipes.
 */
export class SitemapService {
  private baseUrl: string;

  constructor(baseUrl?: string) {
    this.baseUrl = baseUrl || (typeof process !== 'undefined' && (process.env?.SITE_URL || process.env?.BASE_URL)) || CANONICAL_BASE_URL;
  }

  /**
   * Resolve the active canonical base URL (ensures no trailing slash)
   */
  public getBaseUrl(): string {
    return this.baseUrl.replace(/\/+$/, '');
  }

  /**
   * Set or override base URL
   */
  public setBaseUrl(url: string): void {
    if (url) {
      this.baseUrl = url.replace(/\/+$/, '');
    }
  }

  /**
   * Collect all valid sitemap entries from live services with strict deduplication
   */
  public generateEntries(): SitemapEntry[] {
    const base = this.getBaseUrl();
    const entries: SitemapEntry[] = [];
    const seenUrls = new Set<string>();
    const today = new Date().toISOString().split('T')[0];

    // 1. Static Indexable Routes
    for (const route of STATIC_INDEXABLE_ROUTES) {
      const canonicalUrl = route.path === '/' ? `${base}/` : `${base}${route.path}`;
      if (!seenUrls.has(canonicalUrl)) {
        seenUrls.add(canonicalUrl);
        entries.push({
          loc: canonicalUrl,
          lastmod: today,
          changefreq: route.changefreq,
          priority: route.priority,
          type: 'static'
        });
      }
    }

    // 2. Dynamic Botanical Ingredients from live archive
    const ingredients = ingredientService.getAllIngredients();
    for (const ing of ingredients) {
      // Validate existence
      if (!ing || (!ing.id && !ing.name)) continue;

      const slug = (ing.slug || ing.id || '').trim();
      if (!slug || slug === 'undefined' || slug === 'null') continue;

      // Canonical URL follows plural /ingredients/:slug
      const canonicalUrl = `${base}/ingredients/${encodeURIComponent(slug)}`;
      if (!seenUrls.has(canonicalUrl)) {
        seenUrls.add(canonicalUrl);
        entries.push({
          loc: canonicalUrl,
          lastmod: today,
          changefreq: 'weekly',
          priority: '0.8',
          type: 'ingredient'
        });
      }
    }

    // 3. Dynamic Culinary Recipes from live masterclass library (1000+ entries)
    const recipes = recipeService.getAllRecipes();
    for (const rec of recipes) {
      // Validate existence
      if (!rec || (!rec.id && !rec.dishTitle)) continue;

      const slug = (rec.slug || rec.id || '').trim();
      if (!slug || slug === 'undefined' || slug === 'null') continue;

      // Canonical URL follows plural /recipes/:slug
      const canonicalUrl = `${base}/recipes/${encodeURIComponent(slug)}`;
      if (!seenUrls.has(canonicalUrl)) {
        seenUrls.add(canonicalUrl);
        entries.push({
          loc: canonicalUrl,
          lastmod: formatDate(rec.createdAt),
          changefreq: 'weekly',
          priority: '0.8',
          type: 'recipe'
        });
      }
    }

    // 4. Dynamic Categories (Strictly active categories with >0 items to avoid thin pages)
    const activeCategories = categoryRegistry.getActiveCategories();
    for (const cat of activeCategories) {
      const typePrefix = cat.type === 'recipe' ? 'recipes' : 'ingredients';
      const canonicalUrl = `${base}/categories/${typePrefix}/${encodeURIComponent(cat.slug)}`;
      if (!seenUrls.has(canonicalUrl)) {
        seenUrls.add(canonicalUrl);
        entries.push({
          loc: canonicalUrl,
          lastmod: today,
          changefreq: 'weekly',
          priority: '0.8',
          type: 'category'
        });
      }
    }

    return entries;
  }

  /**
   * Generate standard XML sitemap compliant with http://www.sitemaps.org/schemas/sitemap/0.9
   */
  public generateXml(): string {
    const entries = this.generateEntries();

    const xmlLines: string[] = [
      '<?xml version="1.0" encoding="UTF-8"?>',
      '<!-- Generated dynamically by Stassen Collection Sitemap Engine -->',
      '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'
    ];

    for (const entry of entries) {
      xmlLines.push('  <url>');
      xmlLines.push(`    <loc>${escapeXml(entry.loc)}</loc>`);
      xmlLines.push(`    <lastmod>${entry.lastmod}</lastmod>`);
      xmlLines.push(`    <changefreq>${entry.changefreq}</changefreq>`);
      xmlLines.push(`    <priority>${entry.priority}</priority>`);
      xmlLines.push('  </url>');
    }

    xmlLines.push('</urlset>');
    return xmlLines.join('\n');
  }

  /**
   * Inspect current sitemap statistics
   */
  public getStats(): SitemapStats {
    const entries = this.generateEntries();
    return {
      totalUrls: entries.length,
      staticCount: entries.filter(e => e.type === 'static').length,
      ingredientCount: entries.filter(e => e.type === 'ingredient').length,
      recipeCount: entries.filter(e => e.type === 'recipe').length,
      categoryCount: entries.filter(e => e.type === 'category').length,
      generatedAt: new Date().toISOString(),
      canonicalBaseUrl: this.getBaseUrl()
    };
  }
}

export const sitemapService = new SitemapService();
