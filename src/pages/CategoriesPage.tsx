import React, { useState, useMemo, useEffect } from 'react';
import {
  Sparkles,
  ChefHat,
  Search,
  ArrowRight,
  Globe,
  Layers,
  Compass,
  Filter,
  X
} from 'lucide-react';
import { categoryRegistry, CuisineSummary } from '../content/categoryRegistry';
import { CategoryDefinition, CategoryType } from '../types';
import { SafeImage } from '../components/SafeImage';
import { setPageSeo } from '../utils/seo';

interface CategoriesPageProps {
  onNavigateToCategory: (slug: string, type: CategoryType) => void;
  onNavigateToCuisine?: (cuisine: string) => void;
  onNavigateToHome?: () => void;
}

export const CategoriesPage: React.FC<CategoriesPageProps> = ({
  onNavigateToCategory,
  onNavigateToCuisine
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'ingredient' | 'recipe' | 'cuisines'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setPageSeo(
      "Gastronomic Taxonomy & Culinary Categories | Stassen's Collection",
      "Explore the comprehensive gastronomic taxonomy of rare botanical specimens, wild-harvested spices, and haute cuisine masterclasses curated by global terroirs."
    );
  }, []);

  // Fetch active categories with real item counts (empty categories omitted automatically!)
  const activeIngredientCategories = useMemo(() => {
    return categoryRegistry.getActiveCategories('ingredient');
  }, []);

  const activeRecipeCategories = useMemo(() => {
    return categoryRegistry.getActiveCategories('recipe');
  }, []);

  const activeCuisines = useMemo(() => {
    return categoryRegistry.getActiveCuisines();
  }, []);

  // Filter categories by live search query
  const filteredIngredientCategories = useMemo(() => {
    if (!searchQuery.trim()) return activeIngredientCategories;
    const q = searchQuery.toLowerCase().trim();
    return activeIngredientCategories.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.shortName.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q)
    );
  }, [activeIngredientCategories, searchQuery]);

  const filteredRecipeCategories = useMemo(() => {
    if (!searchQuery.trim()) return activeRecipeCategories;
    const q = searchQuery.toLowerCase().trim();
    return activeRecipeCategories.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.shortName.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q)
    );
  }, [activeRecipeCategories, searchQuery]);

  const filteredCuisines = useMemo(() => {
    if (!searchQuery.trim()) return activeCuisines;
    const q = searchQuery.toLowerCase().trim();
    return activeCuisines.filter((c) => c.name.toLowerCase().includes(q));
  }, [activeCuisines, searchQuery]);

  const totalCategoriesCount = activeIngredientCategories.length + activeRecipeCategories.length;

  return (
    <div id="categories-page" className="min-h-screen bg-[#121212] text-[#F5F5F0] pt-24 pb-24 px-4 sm:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb Bar */}
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center space-x-2 text-xs font-mono text-[#F5F5F0]/50">
          <a href="/" className="hover:text-[#C5A059] transition-colors">
            Home
          </a>
          <span>/</span>
          <span className="text-[#C5A059]">Categories & Discovery Hub</span>
        </nav>

        {/* Page Header */}
        <div className="mb-10">
          <div className="flex items-center space-x-2 text-[10px] uppercase tracking-[0.3em] text-[#C5A059] font-semibold mb-2">
            <Layers className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>Living Gastronomic Architecture & Discovery Matrix</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#F5F5F0] tracking-tight">
            Culinary Taxonomy & Discovery Hub
          </h1>
          <p className="text-xs sm:text-sm text-[#F5F5F0]/60 mt-2.5 max-w-3xl leading-relaxed">
            A data-driven hierarchical discovery matrix connecting botanical specimens, rare foraged harvests,
            and Michelin-caliber recipe masterclasses across {totalCategoriesCount} curated culinary classifications and global terroirs.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-8">
          {/* Segmented Tab Navigation */}
          <div className="inline-flex p-1 bg-[#1A1A1A] border border-[#F5F5F0]/15 rounded-xl overflow-x-auto">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                activeTab === 'all'
                  ? 'bg-[#C5A059] text-[#121212] shadow-md font-semibold'
                  : 'text-[#F5F5F0]/70 hover:text-white'
              }`}
            >
              All Classifications ({totalCategoriesCount})
            </button>
            <button
              onClick={() => setActiveTab('ingredient')}
              className={`px-4 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all flex items-center space-x-1.5 ${
                activeTab === 'ingredient'
                  ? 'bg-[#C5A059] text-[#121212] shadow-md font-semibold'
                  : 'text-[#F5F5F0]/70 hover:text-white'
              }`}
            >
              <Sparkles className="w-3 h-3" />
              <span>Botanical Specimens ({activeIngredientCategories.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('recipe')}
              className={`px-4 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all flex items-center space-x-1.5 ${
                activeTab === 'recipe'
                  ? 'bg-[#C5A059] text-[#121212] shadow-md font-semibold'
                  : 'text-[#F5F5F0]/70 hover:text-white'
              }`}
            >
              <ChefHat className="w-3 h-3" />
              <span>Recipe Masterclasses ({activeRecipeCategories.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('cuisines')}
              className={`px-4 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all flex items-center space-x-1.5 ${
                activeTab === 'cuisines'
                  ? 'bg-[#C5A059] text-[#121212] shadow-md font-semibold'
                  : 'text-[#F5F5F0]/70 hover:text-white'
              }`}
            >
              <Globe className="w-3 h-3" />
              <span>Global Cuisines ({activeCuisines.length})</span>
            </button>
          </div>

          {/* Search Filter Box */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-[#C5A059] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter categories or groups..."
              className="w-full bg-[#1A1A1A] border border-[#F5F5F0]/15 rounded-xl pl-9 pr-8 py-2 text-xs text-[#F5F5F0] placeholder-[#F5F5F0]/40 focus:outline-none focus:border-[#C5A059] transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-[#F5F5F0]/40 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* SECTION 1: BOTANICAL SPECIMEN CATEGORIES */}
        {(activeTab === 'all' || activeTab === 'ingredient') && (
          <section className="mb-14">
            <div className="flex items-center justify-between mb-6 pb-2 border-b border-[#F5F5F0]/10">
              <div className="flex items-center space-x-2">
                <span className="p-1.5 rounded-lg bg-[#C5A059]/15 border border-[#C5A059]/30 text-[#C5A059]">
                  <Sparkles className="w-4 h-4" />
                </span>
                <h2 className="font-serif text-xl sm:text-2xl text-[#F5F5F0]">Botanical Specimen Categories</h2>
              </div>
              <span className="text-xs font-mono text-[#F5F5F0]/50">
                {filteredIngredientCategories.length} Categories
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredIngredientCategories.map((category) => (
                <a
                  key={category.id}
                  href={`/categories/ingredients/${category.slug}`}
                  onClick={(e) => {
                    if (!e.metaKey && !e.ctrlKey && !e.shiftKey) {
                      e.preventDefault();
                      onNavigateToCategory(category.slug, 'ingredient');
                    }
                  }}
                  className="group relative bg-[#181818] border border-[#F5F5F0]/10 hover:border-[#C5A059]/60 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl flex flex-col justify-between text-inherit no-underline"
                >
                  {/* Backdrop Thumbnail with Safe Fallbacks */}
                  <div className="relative h-44 w-full overflow-hidden bg-black/40">
                    <SafeImage
                      src={category.heroImageUrl}
                      alt={category.name}
                      category={category.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-[#181818]/40 to-transparent" />
                    <div className="absolute top-3 right-3">
                      <span className="px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-[10px] font-mono font-medium text-[#C5A059]">
                        {category.itemCount} Specimens
                      </span>
                    </div>
                  </div>

                  {/* Body Info */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-mono tracking-widest text-[#C5A059] block mb-1">
                        Botanical Specimen
                      </span>
                      <h3 className="font-serif text-lg text-[#F5F5F0] group-hover:text-[#C5A059] transition-colors leading-snug">
                        {category.name}
                      </h3>
                      <p className="text-xs text-[#F5F5F0]/65 mt-2 line-clamp-3 leading-relaxed font-sans font-light">
                        {category.description}
                      </p>
                    </div>

                    <div className="mt-5 pt-4 border-t border-[#F5F5F0]/10 flex items-center justify-between text-xs text-[#C5A059] group-hover:translate-x-1 transition-transform">
                      <span className="font-medium tracking-wide">Explore Specimen Archive</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </section>
        )}

        {/* SECTION 2: RECIPE MASTERCLASS CATEGORIES */}
        {(activeTab === 'all' || activeTab === 'recipe') && (
          <section className="mb-14">
            <div className="flex items-center justify-between mb-6 pb-2 border-b border-[#F5F5F0]/10">
              <div className="flex items-center space-x-2">
                <span className="p-1.5 rounded-lg bg-amber-500/15 border border-amber-500/30 text-amber-400">
                  <ChefHat className="w-4 h-4" />
                </span>
                <h2 className="font-serif text-xl sm:text-2xl text-[#F5F5F0]">Culinary Recipe Masterclasses</h2>
              </div>
              <span className="text-xs font-mono text-[#F5F5F0]/50">
                {filteredRecipeCategories.length} Categories
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRecipeCategories.map((category) => (
                <a
                  key={category.id}
                  href={`/categories/recipes/${category.slug}`}
                  onClick={(e) => {
                    if (!e.metaKey && !e.ctrlKey && !e.shiftKey) {
                      e.preventDefault();
                      onNavigateToCategory(category.slug, 'recipe');
                    }
                  }}
                  className="group relative bg-[#181818] border border-[#F5F5F0]/10 hover:border-amber-400/60 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl flex flex-col justify-between text-inherit no-underline"
                >
                  {/* Backdrop Thumbnail with Safe Fallbacks */}
                  <div className="relative h-44 w-full overflow-hidden bg-black/40">
                    <SafeImage
                      src={category.heroImageUrl}
                      alt={category.name}
                      category={category.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-[#181818]/40 to-transparent" />
                    <div className="absolute top-3 right-3">
                      <span className="px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-[10px] font-mono font-medium text-amber-400">
                        {category.itemCount} Masterclasses
                      </span>
                    </div>
                  </div>

                  {/* Body Info */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-mono tracking-widest text-amber-400 block mb-1">
                        Culinary Masterclass
                      </span>
                      <h3 className="font-serif text-lg text-[#F5F5F0] group-hover:text-amber-400 transition-colors leading-snug">
                        {category.name}
                      </h3>
                      <p className="text-xs text-[#F5F5F0]/65 mt-2 line-clamp-3 leading-relaxed font-sans font-light">
                        {category.description}
                      </p>
                    </div>

                    <div className="mt-5 pt-4 border-t border-[#F5F5F0]/10 flex items-center justify-between text-xs text-amber-400 group-hover:translate-x-1 transition-transform">
                      <span className="font-medium tracking-wide">Explore Masterclasses</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </section>
        )}

        {/* SECTION 3: GLOBAL CUISINES & TERROIR MAPPING */}
        {(activeTab === 'all' || activeTab === 'cuisines') && (
          <section>
            <div className="flex items-center justify-between mb-6 pb-2 border-b border-[#F5F5F0]/10">
              <div className="flex items-center space-x-2">
                <span className="p-1.5 rounded-lg bg-blue-500/15 border border-blue-500/30 text-blue-400">
                  <Globe className="w-4 h-4" />
                </span>
                <h2 className="font-serif text-xl sm:text-2xl text-[#F5F5F0]">Global Cuisines & Regional Gastronomy</h2>
              </div>
              <span className="text-xs font-mono text-[#F5F5F0]/50">
                {filteredCuisines.length} Culinary Traditions
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {filteredCuisines.map((cuisine) => (
                <a
                  key={cuisine.slug}
                  href={`/recipes?cuisine=${encodeURIComponent(cuisine.name)}`}
                  onClick={(e) => {
                    if (!e.metaKey && !e.ctrlKey && !e.shiftKey) {
                      e.preventDefault();
                      if (onNavigateToCuisine) {
                        onNavigateToCuisine(cuisine.name);
                      }
                    }
                  }}
                  className="p-4 bg-[#181818] border border-[#F5F5F0]/10 hover:border-[#C5A059]/50 rounded-xl transition-all group flex flex-col justify-between text-inherit no-underline"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-serif font-medium text-[#F5F5F0] group-hover:text-[#C5A059] transition-colors">
                      {cuisine.name}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-[#F5F5F0]/60">
                      {cuisine.recipeCount}
                    </span>
                  </div>
                  <span className="text-[10px] text-[#C5A059] group-hover:translate-x-0.5 transition-transform flex items-center space-x-1 mt-2">
                    <span>View recipes</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </a>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
