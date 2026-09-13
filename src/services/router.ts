import { AppView, CategoryType } from '../types';
import { categoryRegistry } from '../content/categoryRegistry';

export interface RouteState {
  view: AppView;
  ingredientSlug?: string;
  recipeSlug?: string;
  searchQuery?: string;
  categoryFilter?: string;
  seasonFilter?: string;
  regionFilter?: string;
  categoryType?: CategoryType;
  categorySlug?: string;
}

type RouteListener = (route: RouteState) => void;
const listeners: Set<RouteListener> = new Set();

function parseCurrentRoute(): RouteState {
  if (typeof window === 'undefined') {
    return { view: 'home' };
  }

  // Check both pathname and hash for maximum compatibility
  const pathname = window.location.pathname;
  const hash = window.location.hash.replace(/^#\/?/, '');
  const urlParams = new URLSearchParams(window.location.search);

  // 1. Ingredients collection or detail
  if (pathname === '/ingredients' || pathname === '/ingredients/' || hash === 'ingredients' || hash === 'ingredients/') {
    const category = urlParams.get('category') || undefined;
    const season = urlParams.get('season') || undefined;
    const region = urlParams.get('region') || undefined;
    return {
      view: 'collection',
      categoryFilter: category ? decodeURIComponent(category) : undefined,
      seasonFilter: season ? decodeURIComponent(season) : undefined,
      regionFilter: region ? decodeURIComponent(region) : undefined,
    };
  }
  if (pathname.startsWith('/ingredients/')) {
    const slug = pathname.replace('/ingredients/', '').split('/')[0].split('?')[0].trim();
    if (slug) return { view: 'ingredient-detail', ingredientSlug: decodeURIComponent(slug) };
  }
  if (pathname.startsWith('/ingredient/')) {
    const slug = pathname.replace('/ingredient/', '').split('/')[0].split('?')[0].trim();
    if (slug) return { view: 'ingredient-detail', ingredientSlug: decodeURIComponent(slug) };
  }
  if (hash.startsWith('ingredients/')) {
    const slug = hash.replace('ingredients/', '').split('/')[0].split('?')[0].trim();
    if (slug) return { view: 'ingredient-detail', ingredientSlug: decodeURIComponent(slug) };
  }
  if (hash.startsWith('ingredient/')) {
    const slug = hash.replace('ingredient/', '').split('/')[0].split('?')[0].trim();
    if (slug) return { view: 'ingredient-detail', ingredientSlug: decodeURIComponent(slug) };
  }

  // 1b. Recipes index or individual recipe detail route: /recipes/:slug, /recipe/:slug
  if (
    pathname === '/recipes' ||
    pathname === '/recipes/' ||
    hash === 'recipes' ||
    hash === 'recipes/' ||
    pathname === '/recipe' ||
    hash === 'recipe'
  ) {
    return { view: 'recipes-archive' };
  }
  if (pathname.startsWith('/recipes/')) {
    const slug = pathname.replace('/recipes/', '').split('/')[0].split('?')[0].trim();
    if (slug) return { view: 'recipe-detail', recipeSlug: decodeURIComponent(slug) };
  }
  if (pathname.startsWith('/recipe/')) {
    const slug = pathname.replace('/recipe/', '').split('/')[0].split('?')[0].trim();
    if (slug) return { view: 'recipe-detail', recipeSlug: decodeURIComponent(slug) };
  }
  if (hash.startsWith('recipes/')) {
    const slug = hash.replace('recipes/', '').split('/')[0].split('?')[0].trim();
    if (slug) return { view: 'recipe-detail', recipeSlug: decodeURIComponent(slug) };
  }
  if (hash.startsWith('recipe/')) {
    const slug = hash.replace('recipe/', '').split('/')[0].split('?')[0].trim();
    if (slug) return { view: 'recipe-detail', recipeSlug: decodeURIComponent(slug) };
  }

  // 2. Dedicated Categories & Discovery Taxonomy routes
  if (
    pathname === '/categories' ||
    pathname === '/categories/' ||
    hash === 'categories' ||
    hash === 'categories/'
  ) {
    return { view: 'categories-index' };
  }

  if (pathname.startsWith('/categories/ingredients/')) {
    const slug = pathname.replace('/categories/ingredients/', '').split('/')[0].split('?')[0].trim();
    if (slug) return { view: 'category-detail', categoryType: 'ingredient', categorySlug: decodeURIComponent(slug) };
  }
  if (hash.startsWith('categories/ingredients/')) {
    const slug = hash.replace('categories/ingredients/', '').split('/')[0].split('?')[0].trim();
    if (slug) return { view: 'category-detail', categoryType: 'ingredient', categorySlug: decodeURIComponent(slug) };
  }

  if (pathname.startsWith('/categories/recipes/')) {
    const slug = pathname.replace('/categories/recipes/', '').split('/')[0].split('?')[0].trim();
    if (slug) return { view: 'category-detail', categoryType: 'recipe', categorySlug: decodeURIComponent(slug) };
  }
  if (hash.startsWith('categories/recipes/')) {
    const slug = hash.replace('categories/recipes/', '').split('/')[0].split('?')[0].trim();
    if (slug) return { view: 'category-detail', categoryType: 'recipe', categorySlug: decodeURIComponent(slug) };
  }

  if (pathname.startsWith('/category/') || pathname.startsWith('/categories/')) {
    const raw = pathname.replace(/^\/categor(?:y|ies)\//, '').split('/')[0].split('?')[0].trim();
    if (raw) {
      const decoded = decodeURIComponent(raw);
      const catDef = categoryRegistry.getCategoryBySlug(decoded);
      if (catDef) {
        return { view: 'category-detail', categoryType: catDef.type, categorySlug: catDef.slug };
      }
      return { view: 'collection', categoryFilter: decoded.replace(/-/g, ' ') };
    }
  }
  if (hash.startsWith('category/') || hash.startsWith('categories/')) {
    const raw = hash.replace(/^categor(?:y|ies)\//, '').split('/')[0].split('?')[0].trim();
    if (raw) {
      const decoded = decodeURIComponent(raw);
      const catDef = categoryRegistry.getCategoryBySlug(decoded);
      if (catDef) {
        return { view: 'category-detail', categoryType: catDef.type, categorySlug: catDef.slug };
      }
      return { view: 'collection', categoryFilter: decoded.replace(/-/g, ' ') };
    }
  }

  // 2b. Collection route: /collection
  if (
    pathname === '/collection' ||
    pathname === '/collection/' ||
    hash === 'collection' ||
    hash === 'collection/'
  ) {
    const category = urlParams.get('category') || undefined;
    const season = urlParams.get('season') || undefined;
    const region = urlParams.get('region') || undefined;
    return {
      view: 'collection',
      categoryFilter: category ? decodeURIComponent(category) : undefined,
      seasonFilter: season ? decodeURIComponent(season) : undefined,
      regionFilter: region ? decodeURIComponent(region) : undefined,
    };
  }

  // 3. Locations route: /locations or #/locations
  if (pathname === '/locations' || hash === 'locations') {
    return { view: 'locations' };
  }

  // 4. Search route: /search or #/search
  if (pathname === '/search' || hash.startsWith('search')) {
    const q = urlParams.get('q') || (hash.includes('?q=') ? hash.split('?q=')[1] : '');
    return { view: 'search-results', searchQuery: q ? decodeURIComponent(q) : '' };
  }

  // 5. My Pantry route: /pantry or #/pantry
  if (pathname === '/pantry' || hash === 'pantry' || hash === 'my-pantry') {
    return { view: 'my-pantry' };
  }

  // 6. Recipes 500+ archive: /recipes or #/recipes
  if (pathname === '/recipes' || hash === 'recipes') {
    return { view: 'recipes-archive' };
  }

  // 7. Seasonal Calendar: /calendar or #/calendar or /seasonal-calendar
  if (pathname === '/calendar' || pathname === '/seasonal-calendar' || hash === 'calendar' || hash === 'seasonal-calendar') {
    return { view: 'seasonal-calendar' };
  }

  // 8. Shopping List: /shopping-list or #/shopping-list
  if (pathname === '/shopping-list' || hash === 'shopping-list') {
    return { view: 'shopping-list' };
  }

  // 8.5 What Can I Cook: /what-can-i-cook or #/what-can-i-cook
  if (pathname === '/what-can-i-cook' || hash === 'what-can-i-cook' || hash === 'whatcanicook') {
    return { view: 'what-can-i-cook' };
  }

  // 9. Editorial About: /about or #/about
  if (pathname === '/about' || hash === 'about') {
    return { view: 'about' };
  }

  // 10. Contact Atelier: /contact or #/contact
  if (pathname === '/contact' || hash === 'contact') {
    return { view: 'contact' };
  }

  // 11. Privacy Policy: /privacy or #/privacy
  if (pathname === '/privacy' || hash === 'privacy') {
    return { view: 'privacy' };
  }

  // 12. Admin Smart Ads Control Center: /admin/ads, #/admin/ads, /admin
  if (
    pathname === '/admin/ads' ||
    hash === 'admin/ads' ||
    pathname === '/admin' ||
    hash === 'admin' ||
    hash === 'ad-manager'
  ) {
    return { view: 'admin-ads' };
  }

  return { view: 'home' };
}

export const router = {
  getCurrentRoute(): RouteState {
    return parseCurrentRoute();
  },

  subscribe(listener: RouteListener): () => void {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  },

  navigate(to: {
    view: AppView;
    ingredientSlug?: string;
    recipeSlug?: string;
    searchQuery?: string;
    sectionId?: string;
    categoryFilter?: string;
    regionFilter?: string;
    seasonFilter?: string;
    categoryType?: CategoryType;
    categorySlug?: string;
  }): void {
    let newPath = '/';

    switch (to.view) {
      case 'categories-index':
        newPath = '/categories';
        break;
      case 'category-detail':
        if (to.categorySlug) {
          const typePrefix = to.categoryType === 'recipe' ? 'recipes' : 'ingredients';
          newPath = `/categories/${typePrefix}/${encodeURIComponent(to.categorySlug)}`;
        } else {
          newPath = '/categories';
        }
        break;
      case 'admin-ads':
        newPath = '/admin/ads';
        break;
      case 'ingredient-detail':
        if (to.ingredientSlug) {
          newPath = `/ingredients/${encodeURIComponent(to.ingredientSlug)}`;
        }
        break;
      case 'recipe-detail':
        if (to.recipeSlug) {
          newPath = `/recipes/${encodeURIComponent(to.recipeSlug)}`;
        } else {
          newPath = '/recipes';
        }
        break;
      case 'collection': {
        const params = new URLSearchParams();
        if (to.categoryFilter && to.categoryFilter !== 'All Categories') {
          params.set('category', to.categoryFilter);
        }
        if (to.regionFilter && to.regionFilter !== 'All Terroirs') {
          params.set('region', to.regionFilter);
        }
        if (to.seasonFilter && to.seasonFilter !== 'All Seasons') {
          params.set('season', to.seasonFilter);
        }
        const qs = params.toString();
        newPath = qs ? `/collection?${qs}` : '/collection';
        break;
      }
      case 'locations':
        newPath = '/locations';
        break;
      case 'search-results':
        newPath = to.searchQuery ? `/search?q=${encodeURIComponent(to.searchQuery)}` : '/search';
        break;
      case 'my-pantry':
        newPath = '/pantry';
        break;
      case 'recipes-archive':
        newPath = '/recipes';
        break;
      case 'seasonal-calendar':
        newPath = '/calendar';
        break;
      case 'shopping-list':
        newPath = '/shopping-list';
        break;
      case 'what-can-i-cook':
        newPath = '/what-can-i-cook';
        break;
      case 'about':
        newPath = '/about';
        break;
      case 'contact':
        newPath = '/contact';
        break;
      case 'privacy':
        newPath = '/privacy';
        break;
      case 'home':
      default:
        newPath = '/';
        break;
    }

    try {
      window.history.pushState({}, '', newPath);
    } catch {
      // Fallback for sandboxed iframe
      window.location.hash = newPath;
    }

    const route = parseCurrentRoute();
    listeners.forEach((l) => l(route));

    // Scroll to top or specific section
    if (to.sectionId) {
      setTimeout(() => {
        const elem = document.getElementById(to.sectionId!);
        if (elem) elem.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  },

  init(): () => void {
    const handlePopState = () => {
      const route = parseCurrentRoute();
      listeners.forEach((l) => l(route));
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
    };
  }
};
