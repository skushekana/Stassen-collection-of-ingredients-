import React, { useState, useMemo, useEffect } from 'react';
import {
  Sparkles,
  ChefHat,
  ArrowLeft,
  ArrowRight,
  SlidersHorizontal,
  Search,
  Grid,
  List,
  Compass,
  Layers,
  X,
  RotateCcw,
  Bookmark,
  Plus,
  Play
} from 'lucide-react';
import { Ingredient, CulinaryMasterclass, CategoryType } from '../types';
import { categoryRegistry } from '../content/categoryRegistry';
import { IngredientCard } from '../components/IngredientCard';
import { RecipeCard } from '../components/RecipeCard';
import { IngredientImage } from '../components/IngredientImage';
import { CulinaryImage } from '../components/CulinaryImage';
import { SeasonalBadge } from '../components/SeasonalIndicator';
import { SafeImage } from '../components/SafeImage';
import { setPageSeo } from '../utils/seo';
import { shoppingListService } from '../services/shoppingListService';
import { toggleRecipeBookmark } from '../services/recipeService';

interface CategoryDetailPageProps {
  categorySlug: string;
  categoryType?: CategoryType;
  savedIds: string[];
  onToggleSave: (id: string) => void;
  onSelectIngredient: (ingredient: Ingredient) => void;
  onSelectRecipe: (recipe: CulinaryMasterclass) => void;
  onCookRecipe: (recipe: CulinaryMasterclass) => void;
  onNavigateToCategory: (slug: string, type: CategoryType) => void;
  onNavigateToCategoriesHub: () => void;
}

export const CategoryDetailPage: React.FC<CategoryDetailPageProps> = ({
  categorySlug,
  categoryType,
  savedIds,
  onToggleSave,
  onSelectIngredient,
  onSelectRecipe,
  onCookRecipe,
  onNavigateToCategory,
  onNavigateToCategoriesHub
}) => {
  const [searchFilter, setSearchFilter] = useState('');
  const [subFilter, setSubFilter] = useState('All');
  const [sortBy, setSortBy] = useState<'relevance' | 'name' | 'time'>('relevance');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Resolve category definition
  const category = useMemo(() => {
    return categoryRegistry.getCategoryBySlug(categorySlug, categoryType);
  }, [categorySlug, categoryType]);

  // Fetch items for this category
  const { ingredients, recipes } = useMemo(() => {
    if (!category) return { ingredients: [], recipes: [] };
    return categoryRegistry.getItemsForCategory(category.id, category.type);
  }, [category]);

  const isIngredient = category?.type === 'ingredient';
  const isRecipe = category?.type === 'recipe';

  // Dynamic SEO Setup with Canonical URL, Meta Tags, and JSON-LD Structured Data
  useEffect(() => {
    if (category) {
      const pageTitle = category.seoTitle || `${category.name} | Stassen's Gastronomy Archive`;
      const pageDesc = category.seoDescription || category.description;
      const canonicalPath = `/categories/${category.type === 'ingredient' ? 'ingredients' : 'recipes'}/${category.slug}`;

      // Update SEO
      setPageSeo(pageTitle, pageDesc);

      // Update Canonical Link tag
      let canonical = document.querySelector('link[rel="canonical"]');
      if (!canonical) {
        canonical = document.createElement('link');
        canonical.setAttribute('rel', 'canonical');
        document.head.appendChild(canonical);
      }
      canonical.setAttribute('href', `${window.location.origin}${canonicalPath}`);

      // Inject Schema.org CollectionPage + ItemList structured data
      let ldJson = document.querySelector('script[id="category-ld-json"]');
      if (!ldJson) {
        ldJson = document.createElement('script');
        ldJson.setAttribute('id', 'category-ld-json');
        ldJson.setAttribute('type', 'application/ld+json');
        document.head.appendChild(ldJson);
      }

      const itemsList = isIngredient
        ? ingredients.map((item, idx) => ({
            '@type': 'ListItem',
            position: idx + 1,
            name: item.name,
            url: `${window.location.origin}/ingredients/${item.slug || item.id}`
          }))
        : recipes.map((item, idx) => ({
            '@type': 'ListItem',
            position: idx + 1,
            name: item.dishTitle,
            url: `${window.location.origin}/recipes/${item.slug || item.id}`
          }));

      const schema = {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: category.name,
        description: category.description,
        url: `${window.location.origin}${canonicalPath}`,
        mainEntity: {
          '@type': 'ItemList',
          numberOfItems: itemsList.length,
          itemListElement: itemsList
        },
        breadcrumb: {
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Home',
              item: window.location.origin
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: 'Categories',
              item: `${window.location.origin}/categories`
            },
            {
              '@type': 'ListItem',
              position: 3,
              name: category.name,
              item: `${window.location.origin}${canonicalPath}`
            }
          ]
        }
      };

      ldJson.textContent = JSON.stringify(schema);
    }
  }, [category, ingredients, recipes, isIngredient]);

  // Extract unique regions or cuisines for sub-filtering
  const subFilterOptions = useMemo(() => {
    if (isIngredient) {
      const regions = new Set<string>();
      ingredients.forEach((i) => {
        if (i.region) regions.add(i.region);
      });
      return ['All', ...Array.from(regions).sort()];
    } else {
      const cuisines = new Set<string>();
      recipes.forEach((r) => {
        if (r.cuisine) cuisines.add(r.cuisine);
      });
      return ['All', ...Array.from(cuisines).sort()];
    }
  }, [isIngredient, ingredients, recipes]);

  // Filter and sort items
  const filteredItems = useMemo(() => {
    const q = searchFilter.toLowerCase().trim();

    if (isIngredient) {
      let list = [...ingredients];
      if (q) {
        list = list.filter(
          (i) =>
            i.name.toLowerCase().includes(q) ||
            (i.scientificName && i.scientificName.toLowerCase().includes(q)) ||
            i.origin.toLowerCase().includes(q) ||
            (i.flavorNotes && i.flavorNotes.some((n) => n.toLowerCase().includes(q)))
        );
      }
      if (subFilter !== 'All') {
        list = list.filter((i) => i.region === subFilter);
      }
      if (sortBy === 'name') {
        list.sort((a, b) => a.name.localeCompare(b.name));
      }
      return list;
    } else {
      let list = [...recipes];
      if (q) {
        list = list.filter(
          (r) =>
            r.dishTitle.toLowerCase().includes(q) ||
            r.cuisine.toLowerCase().includes(q) ||
            (r.tags && r.tags.some((t) => t.toLowerCase().includes(q)))
        );
      }
      if (subFilter !== 'All') {
        list = list.filter((r) => r.cuisine === subFilter);
      }
      if (sortBy === 'name') {
        list.sort((a, b) => a.dishTitle.localeCompare(b.dishTitle));
      } else if (sortBy === 'time') {
        list.sort((a, b) => (a.totalCookTimeMinutes || 30) - (b.totalCookTimeMinutes || 30));
      }
      return list;
    }
  }, [isIngredient, ingredients, recipes, searchFilter, subFilter, sortBy]);

  // Related categories for circular cross-linking
  const relatedCategories = useMemo(() => {
    if (!category) return [];
    return categoryRegistry.getRelatedCategories(category, 4);
  }, [category]);

  // Handle Missing / Invalid Category
  if (!category) {
    return (
      <div className="min-h-screen bg-[#121212] text-[#F5F5F0] pt-28 pb-24 px-4 sm:px-8 max-w-4xl mx-auto text-center">
        <div className="p-12 bg-[#181818] border border-[#F5F5F0]/10 rounded-2xl">
          <Layers className="w-12 h-12 text-[#C5A059]/40 mx-auto mb-4" />
          <h2 className="font-serif text-2xl text-[#F5F5F0] mb-2">Category Not Found</h2>
          <p className="text-xs sm:text-sm text-[#F5F5F0]/60 mb-6 leading-relaxed">
            The requested culinary classification does not exist or has been relocated to preserve content validity.
          </p>
          <a
            href="/categories"
            onClick={(e) => {
              e.preventDefault();
              onNavigateToCategoriesHub();
            }}
            className="inline-flex items-center space-x-2 px-6 py-3 bg-[#C5A059] text-[#121212] font-semibold text-xs uppercase tracking-widest rounded-xl hover:bg-[#d4b066] transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Categories Hub</span>
          </a>
        </div>
      </div>
    );
  }

  const count = isIngredient ? ingredients.length : recipes.length;

  return (
    <div id="category-detail-page" className="min-h-screen bg-[#121212] text-[#F5F5F0] pt-24 pb-24 px-4 sm:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb Navigation with crawlable links */}
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center space-x-2 text-xs font-mono text-[#F5F5F0]/50">
          <a href="/" className="hover:text-[#C5A059] transition-colors">
            Home
          </a>
          <span>/</span>
          <a
            href="/categories"
            onClick={(e) => {
              if (!e.metaKey && !e.ctrlKey && !e.shiftKey) {
                e.preventDefault();
                onNavigateToCategoriesHub();
              }
            }}
            className="hover:text-[#C5A059] transition-colors"
          >
            Categories
          </a>
          <span>/</span>
          <span className="text-[#C5A059] font-medium">{category.name}</span>
        </nav>

        {/* Hero Header */}
        <div className="relative mb-10 p-6 sm:p-10 rounded-3xl bg-gradient-to-br from-[#1A1A1A] via-[#161616] to-[#121212] border border-[#F5F5F0]/10 overflow-hidden shadow-2xl">
          {category.heroImageUrl && (
            <div className="absolute right-0 top-0 bottom-0 w-full sm:w-1/2 opacity-20 pointer-events-none overflow-hidden">
              <SafeImage
                src={category.heroImageUrl}
                alt={category.name}
                category={category.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A1A] via-[#1A1A1A]/80 to-transparent" />
            </div>
          )}

          <div className="relative z-10 max-w-3xl">
            <div className="flex items-center space-x-2 mb-3">
              <span
                className={`px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-widest font-semibold flex items-center space-x-1 border ${
                  isIngredient
                    ? 'bg-[#C5A059]/15 border-[#C5A059]/40 text-[#C5A059]'
                    : 'bg-amber-500/15 border-amber-500/40 text-amber-400'
                }`}
              >
                {isIngredient ? <Sparkles className="w-3 h-3" /> : <ChefHat className="w-3 h-3" />}
                <span>{isIngredient ? 'Botanical Specimen Category' : 'Culinary Recipe Masterclasses'}</span>
              </span>
              <span className="text-xs font-mono text-[#F5F5F0]/50">•</span>
              <span className="text-xs font-mono text-[#F5F5F0]/60">
                {count} {isIngredient ? 'Specimens' : 'Recipes'}
              </span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#F5F5F0] tracking-tight">
              {category.name}
            </h1>

            <p className="text-xs sm:text-sm text-[#F5F5F0]/70 mt-3 leading-relaxed font-sans font-light">
              {category.description}
            </p>
          </div>
        </div>

        {/* Filter and View Controls Bar */}
        <div className="p-4 bg-[#181818] border border-[#F5F5F0]/10 rounded-2xl mb-8 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            {/* Search within category */}
            <div className="relative w-full sm:w-64">
              <Search className="w-3.5 h-3.5 text-[#C5A059] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                placeholder={`Search within ${category.shortName}...`}
                className="w-full bg-[#222] border border-[#F5F5F0]/15 rounded-lg pl-8 pr-7 py-2 text-xs text-[#F5F5F0] placeholder-[#F5F5F0]/40 focus:outline-none focus:border-[#C5A059]"
              />
              {searchFilter && (
                <button
                  onClick={() => setSearchFilter('')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-[#F5F5F0]/40 hover:text-white"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            {/* Sub-filter by Region or Cuisine */}
            <div className="flex items-center space-x-2 text-xs">
              <span className="text-[#F5F5F0]/50 text-[10px] uppercase tracking-wider">
                {isIngredient ? 'Region:' : 'Cuisine:'}
              </span>
              <select
                value={subFilter}
                onChange={(e) => setSubFilter(e.target.value)}
                className="bg-[#222] border border-[#F5F5F0]/15 text-xs text-[#F5F5F0] px-3 py-2 rounded-lg focus:outline-none focus:border-[#C5A059]"
              >
                {subFilterOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            {/* Reset Filters */}
            {(searchFilter || subFilter !== 'All') && (
              <button
                onClick={() => {
                  setSearchFilter('');
                  setSubFilter('All');
                }}
                className="text-xs text-[#C5A059] hover:underline flex items-center space-x-1"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            )}
          </div>

          <div className="flex items-center justify-between md:justify-end space-x-4">
            {/* Sort Dropdown */}
            <div className="flex items-center space-x-2 text-xs">
              <span className="text-[#F5F5F0]/50 text-[10px] uppercase tracking-wider">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-[#222] border border-[#F5F5F0]/15 text-xs text-[#F5F5F0] px-3 py-2 rounded-lg focus:outline-none focus:border-[#C5A059]"
              >
                <option value="relevance">Default Order</option>
                <option value="name">Name (A-Z)</option>
                {isRecipe && <option value="time">Cook Time</option>}
              </select>
            </div>

            {/* View Mode Toggle: Grid / List */}
            <div className="flex items-center border border-[#F5F5F0]/15 rounded-xl overflow-hidden bg-[#222]">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 transition-all ${
                  viewMode === 'grid' ? 'bg-[#C5A059] text-[#121212]' : 'text-[#F5F5F0]/60 hover:text-white'
                }`}
                aria-label="Grid view"
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 transition-all ${
                  viewMode === 'list' ? 'bg-[#C5A059] text-[#121212]' : 'text-[#F5F5F0]/60 hover:text-white'
                }`}
                aria-label="List view"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Results Grid / List */}
        {filteredItems.length > 0 ? (
          viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredItems.map((item) => {
                if (isIngredient) {
                  const ing = item as Ingredient;
                  return (
                    <IngredientCard
                      key={ing.id}
                      ingredient={ing}
                      isSaved={savedIds.includes(ing.id)}
                      onToggleSave={onToggleSave}
                      onSelect={onSelectIngredient}
                    />
                  );
                } else {
                  const rec = item as CulinaryMasterclass;
                  return (
                    <RecipeCard
                      key={rec.id}
                      recipe={rec}
                      onCook={onCookRecipe}
                      onSelect={onSelectRecipe}
                    />
                  );
                }
              })}
            </div>
          ) : (
            /* Crawlable List View */
            <div className="space-y-3">
              {filteredItems.map((item) => {
                if (isIngredient) {
                  const ing = item as Ingredient;
                  const itemUrl = `/ingredients/${ing.slug || ing.id}`;
                  return (
                    <a
                      key={ing.id}
                      href={itemUrl}
                      onClick={(e) => {
                        if (!e.metaKey && !e.ctrlKey && !e.shiftKey) {
                          e.preventDefault();
                          onSelectIngredient(ing);
                        }
                      }}
                      className="p-4 sm:p-5 bg-[#1E1E1E] border border-[#F5F5F0]/10 hover:border-[#C5A059]/50 rounded-2xl transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 cursor-pointer group block text-inherit no-underline shadow-md hover:shadow-xl"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-20 h-20 shrink-0 bg-black/40 rounded-xl border border-white/5 overflow-hidden">
                          <IngredientImage
                            ingredient={ing}
                            className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-300"
                          />
                        </div>
                        <div>
                          <div className="flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-wider mb-1">
                            <span className="text-[#C5A059] font-medium">{ing.country}</span>
                            <span className="text-[#F5F5F0]/30">•</span>
                            <span className="text-[#F5F5F0]/60">{ing.region}</span>
                            <span className="text-[#F5F5F0]/30">•</span>
                            <SeasonalBadge ingredient={ing} size="sm" />
                          </div>
                          <h3 className="font-serif text-lg text-[#F5F5F0] group-hover:text-[#C5A059] transition-colors leading-snug">
                            {ing.name}
                          </h3>
                          {ing.scientificName && (
                            <p className="text-xs italic text-[#F5F5F0]/50 font-serif">
                              {ing.scientificName}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 w-full sm:w-auto justify-between sm:justify-end">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            shoppingListService.addIngredient(ing);
                          }}
                          className="p-2.5 bg-[#252525] hover:bg-[#C5A059] hover:text-[#121212] text-[#C5A059] rounded-xl border border-[#C5A059]/30 transition-all"
                          title="Add to shopping list"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onToggleSave(ing.id);
                          }}
                          className={`p-2.5 rounded-xl transition-all ${
                            savedIds.includes(ing.id)
                              ? 'bg-[#C5A059] text-[#121212]'
                              : 'bg-[#252525] text-[#F5F5F0]/70 hover:text-white'
                          }`}
                        >
                          <Bookmark className="w-4 h-4 fill-current" />
                        </button>
                        <div className="p-2 text-[#C5A059] group-hover:translate-x-1 transition-transform">
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </a>
                  );
                } else {
                  const rec = item as CulinaryMasterclass;
                  const itemUrl = `/recipes/${rec.slug || rec.id}`;
                  return (
                    <a
                      key={rec.id}
                      href={itemUrl}
                      onClick={(e) => {
                        if (!e.metaKey && !e.ctrlKey && !e.shiftKey) {
                          e.preventDefault();
                          onSelectRecipe(rec);
                        }
                      }}
                      className="p-4 sm:p-5 bg-[#1E1E1E] border border-[#F5F5F0]/10 hover:border-amber-400/50 rounded-2xl transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 cursor-pointer group block text-inherit no-underline shadow-md hover:shadow-xl"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-20 h-20 shrink-0 bg-black/40 rounded-xl border border-white/5 overflow-hidden">
                          <CulinaryImage
                            src={rec.heroImageUrl}
                            alt={rec.dishTitle}
                            cuisine={rec.cuisine}
                            className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-300"
                          />
                        </div>
                        <div>
                          <div className="flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-wider mb-1">
                            <span className="text-amber-400 font-medium">{rec.cuisine}</span>
                            <span className="text-[#F5F5F0]/30">•</span>
                            <span className="text-[#F5F5F0]/60">{rec.overallDurationFormatted || '30 min'}</span>
                            <span className="text-[#F5F5F0]/30">•</span>
                            <span className="text-[#F5F5F0]/60">{rec.difficulty}</span>
                          </div>
                          <h3 className="font-serif text-lg text-[#F5F5F0] group-hover:text-amber-400 transition-colors leading-snug">
                            {rec.dishTitle}
                          </h3>
                          {rec.subtitle && (
                            <p className="text-xs text-[#F5F5F0]/60 mt-0.5 line-clamp-1 font-sans">
                              {rec.subtitle}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 w-full sm:w-auto justify-between sm:justify-end">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleRecipeBookmark(rec.id);
                          }}
                          className="p-2.5 bg-[#252525] text-[#F5F5F0]/70 hover:text-amber-400 rounded-xl border border-white/5 transition-all"
                        >
                          <Bookmark className="w-4 h-4" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onCookRecipe(rec);
                          }}
                          className="flex items-center space-x-1.5 px-3.5 py-2 bg-gradient-to-r from-[#D97706] to-[#B45309] text-white rounded-xl text-xs font-mono font-bold tracking-wider uppercase shadow-md transition-all"
                        >
                          <Play className="w-3 h-3 fill-white" />
                          <span>COOK</span>
                        </button>
                        <div className="p-2 text-amber-400 group-hover:translate-x-1 transition-transform">
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </a>
                  );
                }
              })}
            </div>
          )
        ) : (
          /* Empty Search / Filter Notice */
          <div className="p-12 text-center bg-[#181818] border border-[#F5F5F0]/10 rounded-2xl">
            <Search className="w-10 h-10 text-[#C5A059]/40 mx-auto mb-3" />
            <h3 className="font-serif text-xl text-[#F5F5F0] mb-2">No Matching Items Found</h3>
            <p className="text-xs text-[#F5F5F0]/60 mb-5">
              No items in this classification match your current search &quot;{searchFilter}&quot; or region filter.
            </p>
            <button
              onClick={() => {
                setSearchFilter('');
                setSubFilter('All');
              }}
              className="px-5 py-2.5 bg-[#C5A059] text-[#121212] font-semibold text-xs rounded-xl hover:bg-[#d4b066] transition-all"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* RELATED CATEGORIES SECTION FOR CIRCULAR DISCOVERY */}
        {relatedCategories.length > 0 && (
          <section className="mt-16 pt-10 border-t border-[#F5F5F0]/10">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                <Compass className="w-4 h-4 text-[#C5A059]" />
                <h2 className="font-serif text-xl text-[#F5F5F0]">
                  Explore Neighboring {isIngredient ? 'Specimen' : 'Recipe'} Categories
                </h2>
              </div>
              <a
                href="/categories"
                onClick={(e) => {
                  if (!e.metaKey && !e.ctrlKey && !e.shiftKey) {
                    e.preventDefault();
                    onNavigateToCategoriesHub();
                  }
                }}
                className="text-xs text-[#C5A059] hover:underline flex items-center space-x-1"
              >
                <span>View All Categories</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {relatedCategories.map((relCat) => (
                <a
                  key={relCat.id}
                  href={`/categories/${relCat.type === 'ingredient' ? 'ingredients' : 'recipes'}/${relCat.slug}`}
                  onClick={(e) => {
                    if (!e.metaKey && !e.ctrlKey && !e.shiftKey) {
                      e.preventDefault();
                      onNavigateToCategory(relCat.slug, relCat.type);
                    }
                  }}
                  className="p-4 bg-[#181818] border border-[#F5F5F0]/10 hover:border-[#C5A059]/50 rounded-xl transition-all group flex flex-col justify-between text-inherit no-underline"
                >
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[9px] uppercase font-mono tracking-widest text-[#C5A059]">
                        {relCat.shortName}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-[#F5F5F0]/60">
                        {relCat.itemCount} items
                      </span>
                    </div>
                    <h4 className="font-serif text-sm text-[#F5F5F0] group-hover:text-[#C5A059] transition-colors leading-snug">
                      {relCat.name}
                    </h4>
                  </div>
                  <div className="mt-3 pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-[#C5A059]">
                    <span>Browse Category</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </a>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
