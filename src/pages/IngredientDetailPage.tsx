import React, { useState, useEffect } from 'react';
import { Ingredient, CulinaryMasterclass } from '../types';
import { setPageSeo } from '../utils/seo';
import {
  ArrowLeft,
  Bookmark,
  Plus,
  Share2,
  Calendar,
  MapPin,
  Sparkles,
  Layers,
  ChefHat,
  Scale,
  RefreshCw,
  Compass,
  Check,
  ChevronRight,
  ExternalLink,
  Flame,
  Search,
  BookOpen
} from 'lucide-react';
import { IngredientImage } from '../components/IngredientImage';
import { SafeImage } from '../components/SafeImage';
import { SeasonalDetailHero, SeasonalBadge } from '../components/SeasonalIndicator';
import { getSubstitutionsForIngredient } from '../data/substitutions';
import { shoppingListService } from '../services/shoppingListService';
import { ingredientService } from '../services/ingredientService';
import { categoryRegistry } from '../content/categoryRegistry';
import { router } from '../services/router';

interface IngredientDetailPageProps {
  ingredient: Ingredient | null;
  allIngredients: Ingredient[];
  isSaved: boolean;
  onToggleSave: (id: string) => void;
  onNavigateToIngredient: (slug: string) => void;
  onBack: () => void;
  onCookRecipe: (recipe: CulinaryMasterclass) => void;
  onOpenMasterclass: (ingredient: Ingredient) => void;
}

export const IngredientDetailPage: React.FC<IngredientDetailPageProps> = ({
  ingredient,
  allIngredients,
  isSaved,
  onToggleSave,
  onNavigateToIngredient,
  onBack,
  onCookRecipe,
  onOpenMasterclass
}) => {
  const [selectedGalleryIdx, setSelectedGalleryIdx] = useState(0);
  const [copiedLink, setCopiedLink] = useState(false);
  const [addedToShoppingList, setAddedToShoppingList] = useState(false);

  // Dynamic SEO metadata based on current ingredient
  useEffect(() => {
    if (ingredient) {
      const ingSlug = ingredient.slug || ingredient.id;
      const cleanOverview = (ingredient.overview || ingredient.description || '').replace(/\s+/g, ' ').trim();
      const truncatedOverview = cleanOverview.length > 130 ? cleanOverview.slice(0, 127) + '...' : cleanOverview;
      const seoTitle = `${ingredient.name}${ingredient.scientificName ? ` (${ingredient.scientificName})` : ''} — Terroir, Flavor & Culinary Guide | Stassen's Collection`;
      const seoDesc = `${truncatedOverview} Discover terroir in ${ingredient.origin}, sensory profile, storage protocols, and masterclass recipes.`;
      setPageSeo(seoTitle, seoDesc);
    } else {
      setPageSeo("Botanical Specimen Not Found | Stassen's Collection", "The requested culinary specimen could not be found in the archive index.");
    }
  }, [ingredient]);

  // If ingredient is not found, render a graceful not found state
  if (!ingredient) {
    return (
      <div id="ingredient-not-found" className="min-h-screen bg-[#121212] text-[#F5F5F0] pt-32 pb-24 px-4 sm:px-8 text-center flex flex-col items-center justify-center">
        <div className="max-w-md mx-auto p-8 bg-[#181818] border border-[#F5F5F0]/10 shadow-2xl">
          <div className="w-14 h-14 mx-auto mb-5 rounded-full bg-[#C5A059]/10 border border-[#C5A059]/30 flex items-center justify-center text-[#C5A059]">
            <Search className="w-6 h-6" />
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl text-white mb-2">Specimen Not Located</h1>
          <p className="text-xs sm:text-sm text-[#F5F5F0]/70 mb-6 leading-relaxed">
            The botanical dossier you requested is not currently registered in Stassen's archival index, or may have been reorganized.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="/collection"
              onClick={(e) => {
                e.preventDefault();
                onBack();
              }}
              className="w-full sm:w-auto px-5 py-3 bg-[#C5A059] text-black text-xs uppercase tracking-widest font-semibold hover:bg-[#d4b066] transition-all flex items-center justify-center space-x-2"
            >
              <BookOpen className="w-4 h-4" />
              <span>Explore Collection</span>
            </a>
            <a
              href="/recipes"
              className="w-full sm:w-auto px-5 py-3 bg-[#242424] text-[#F5F5F0] border border-white/10 hover:border-white/30 text-xs uppercase tracking-widest font-semibold transition-all"
            >
              Recipe Index
            </a>
          </div>
        </div>
      </div>
    );
  }

  // Substitutions for this ingredient
  const substitutions = getSubstitutionsForIngredient(ingredient, allIngredients);

  // Recipes using this ingredient (from 500+ masterclass index)
  const matchingRecipes = ingredientService.getRelatedRecipes(ingredient, 4);

  // Intelligent related ingredients (same category, terroir region, or explicit links)
  const relatedIngredients = ingredientService.getRelatedIngredients(ingredient, 4);

  const handleCopyShareLink = () => {
    const ingSlug = ingredient.slug || ingredient.id;
    const url = `${window.location.origin}/ingredients/${ingSlug}`;
    navigator.clipboard?.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleAddToShoppingList = () => {
    shoppingListService.addIngredient(ingredient);
    setAddedToShoppingList(true);
    setTimeout(() => setAddedToShoppingList(false), 2500);
  };

  const galleryList = ingredient.galleryImages && ingredient.galleryImages.length > 0
    ? ingredient.galleryImages
    : [ingredient.imageUrl];

  // Organoleptic Sensory Profile Metrics (0 - 100)
  const sensoryProfile = ingredient.flavorProfile;

  return (
    <div id="ingredient-detail-page" className="min-h-screen bg-[#121212] text-[#F5F5F0] pt-24 pb-20 px-4 sm:px-8 lg:px-12">
      <div className="max-w-6xl mx-auto">
        {/* Top Breadcrumbs & Action Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-6 border-b border-[#F5F5F0]/10">
          <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-xs uppercase tracking-widest text-[#F5F5F0]/60">
            <a
              href="/collection"
              onClick={(e) => {
                e.preventDefault();
                onBack();
              }}
              className="flex items-center space-x-1.5 hover:text-[#C5A059] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Collection</span>
            </a>
            <ChevronRight className="w-3.5 h-3.5 opacity-40" />
            <a
              href={`/categories/ingredients/${categoryRegistry.getCategoryForIngredient(ingredient)?.slug || 'spices'}`}
              onClick={(e) => {
                if (!e.metaKey && !e.ctrlKey && !e.shiftKey) {
                  const catDef = categoryRegistry.getCategoryForIngredient(ingredient);
                  if (catDef) {
                    e.preventDefault();
                    router.navigate({ view: 'category-detail', categorySlug: catDef.slug, categoryType: 'ingredient' });
                  }
                }
              }}
              className="text-[#C5A059] hover:underline"
            >
              {categoryRegistry.getCategoryForIngredient(ingredient)?.name || ingredient.category}
            </a>
            <ChevronRight className="w-3.5 h-3.5 opacity-40" />
            <span className="text-[#F5F5F0] truncate max-w-[200px]" aria-current="page">
              {ingredient.name}
            </span>
          </nav>

          <div className="flex items-center space-x-3">
            {/* Share Page Button */}
            <button
              id="share-ingredient-btn"
              onClick={handleCopyShareLink}
              className="px-3.5 py-2 text-xs uppercase tracking-wider bg-[#1E1E1E] border border-[#F5F5F0]/15 hover:border-[#C5A059]/50 transition-all flex items-center space-x-2 text-[#F5F5F0]/80 hover:text-white"
            >
              {copiedLink ? (
                <span className="flex items-center space-x-2 text-emerald-400">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>URL Copied</span>
                </span>
              ) : (
                <span className="flex items-center space-x-2">
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share Page</span>
                </span>
              )}
            </button>

            {/* Add to Shopping List Button */}
            <button
              id="detail-add-shopping-btn"
              onClick={handleAddToShoppingList}
              className={`px-4 py-2 text-xs uppercase tracking-wider transition-all flex items-center space-x-2 font-medium ${
                addedToShoppingList
                  ? 'bg-emerald-600 text-white'
                  : 'bg-[#1E1E1E] border border-[#C5A059]/40 hover:bg-[#C5A059] hover:text-[#121212] text-[#C5A059]'
              }`}
            >
              {addedToShoppingList ? (
                <span className="flex items-center space-x-2">
                  <Check className="w-3.5 h-3.5" />
                  <span>In Shopping List</span>
                </span>
              ) : (
                <span className="flex items-center space-x-2">
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add to List</span>
                </span>
              )}
            </button>

            {/* Favorite / Cellar Save Button */}
            <button
              id="detail-toggle-pantry-btn"
              onClick={() => onToggleSave(ingredient.id)}
              className={`px-4 py-2 text-xs uppercase tracking-wider transition-all flex items-center space-x-2 font-medium ${
                isSaved
                  ? 'bg-[#C5A059] text-[#121212]'
                  : 'bg-[#2A2A2A] hover:bg-[#333] text-[#F5F5F0]'
              }`}
            >
              <Bookmark className="w-3.5 h-3.5 fill-current" />
              <span>{isSaved ? 'In My Pantry' : 'Save to Pantry'}</span>
            </button>
          </div>
        </div>

        {/* Hero Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-16">
          {/* Left: Media & Gallery View */}
          <div className="lg:col-span-6 flex flex-col space-y-4">
            <div className="relative aspect-[4/3] bg-[#1E1E1E] border border-[#F5F5F0]/10 overflow-hidden shadow-2xl">
              <IngredientImage
                ingredient={ingredient}
                src={galleryList[selectedGalleryIdx]}
                alt={`${ingredient.name} — ${ingredient.category} terroir specimen from ${ingredient.origin}, ${ingredient.country}`}
                priority={true}
                className="w-full h-full object-cover transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none z-10" />

              {ingredient.rarityIndex === 'Ultra Rare Reserve' && (
                <div className="absolute top-4 left-4 px-3 py-1 bg-black/80 backdrop-blur-md border border-[#C5A059]/40 text-[#C5A059] text-[10px] uppercase tracking-[0.2em] flex items-center space-x-1.5 z-20">
                  <Sparkles className="w-3 h-3" />
                  <span>Ultra Rare Reserve</span>
                </div>
              )}

              {/* Bottom Image Overlay with Location and Seasonal Status */}
              <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-2 text-xs text-[#F5F5F0]/85 backdrop-blur-md bg-black/70 p-3 px-4 border border-white/10 z-20">
                <span className="flex items-center space-x-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>{ingredient.origin}, {ingredient.country}</span>
                </span>
                <div className="flex items-center space-x-2">
                  <SeasonalBadge ingredient={ingredient} size="md" />
                  <span className="hidden sm:inline-flex items-center space-x-1 text-xs text-[#F5F5F0]/80">
                    <Calendar className="w-3.5 h-3.5 text-[#C5A059]" />
                    <span>{ingredient.season}</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Thumbnail Gallery Strip */}
            {galleryList.length > 1 && (
              <div className="flex space-x-3 overflow-x-auto pb-2">
                {galleryList.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedGalleryIdx(idx)}
                    className={`relative w-20 h-16 flex-shrink-0 border-2 overflow-hidden transition-all ${
                      selectedGalleryIdx === idx
                        ? 'border-[#C5A059] opacity-100 scale-105'
                        : 'border-transparent opacity-50 hover:opacity-80'
                    }`}
                  >
                    <SafeImage
                      src={img}
                      alt={`${ingredient.name} — view ${idx + 1}`}
                      fallbackSrc={ingredient.imageUrl}
                      className="w-full h-full object-cover"
                      containerClassName="w-full h-full"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Botanical Nomenclature & Terroir Overview */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-2.5 mb-2">
                <a
                  href={`/categories/ingredients/${categoryRegistry.getCategoryForIngredient(ingredient)?.slug || 'spices'}`}
                  onClick={(e) => {
                    if (!e.metaKey && !e.ctrlKey && !e.shiftKey) {
                      const catDef = categoryRegistry.getCategoryForIngredient(ingredient);
                      if (catDef) {
                        e.preventDefault();
                        router.navigate({ view: 'category-detail', categorySlug: catDef.slug, categoryType: 'ingredient' });
                      }
                    }
                  }}
                  className="text-[10px] uppercase tracking-[0.25em] text-[#C5A059] font-medium hover:underline cursor-pointer"
                  title={`Browse all ${ingredient.category} botanical specimens`}
                >
                  {ingredient.category}
                </a>
                <span className="text-[#F5F5F0]/30">•</span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#F5F5F0]/60">
                  {ingredient.region}
                </span>
                <span className="text-[#F5F5F0]/30">•</span>
                <SeasonalBadge ingredient={ingredient} size="sm" />
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#F5F5F0] tracking-tight mb-2 leading-tight">
                {ingredient.name}
              </h1>

              {ingredient.scientificName && (
                <p className="font-serif italic text-base sm:text-lg text-[#C5A059]/90 mb-4 tracking-wide">
                  {ingredient.scientificName}
                </p>
              )}

              {/* Overview (Lead Summary) */}
              {ingredient.overview && (
                <div className="p-4 bg-[#181818] border-l-2 border-[#C5A059] mb-4 text-xs sm:text-sm text-[#F5F5F0]/90 leading-relaxed font-normal">
                  {ingredient.overview}
                </div>
              )}

              {/* Full Narrative Description */}
              <p className="text-xs sm:text-sm text-[#F5F5F0]/80 leading-relaxed font-light mb-6">
                {ingredient.description}
              </p>

              {/* Terroir & Origin Card */}
              <div className="p-5 bg-[#1E1E1E] border border-[#F5F5F0]/10 mb-6">
                <div className="text-[10px] uppercase tracking-[0.2em] text-[#C5A059] mb-2 font-medium flex items-center space-x-1.5">
                  <Compass className="w-3.5 h-3.5" />
                  <span>Terroir & Ecological Habitat</span>
                </div>
                <p className="text-xs sm:text-sm text-[#F5F5F0]/75 leading-relaxed">
                  {ingredient.terroir}
                </p>
              </div>

              {/* Sensory Notes Pills */}
              <div className="mb-6">
                <div className="text-[10px] uppercase tracking-[0.2em] text-[#F5F5F0]/50 mb-3 font-medium">
                  Primary Sensory Notes & Volatiles
                </div>
                <div className="flex flex-wrap gap-2">
                  {ingredient.flavorNotes.map((note, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 bg-[#252525] border border-[#F5F5F0]/10 text-xs text-[#F5F5F0]/90 tracking-wide"
                    >
                      {note}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Launch Cinema Masterclass CTA */}
            <div className="pt-4 border-t border-[#F5F5F0]/10 flex flex-wrap gap-3">
              <button
                onClick={() => onOpenMasterclass(ingredient)}
                className="flex-1 py-3.5 px-6 bg-[#C5A059] text-[#121212] hover:bg-[#d4b066] font-medium text-xs uppercase tracking-[0.2em] transition-all flex items-center justify-center space-x-2 shadow-lg"
              >
                <ChefHat className="w-4 h-4" />
                <span>Launch Masterclass Cinema</span>
              </button>
            </div>
          </div>
        </div>

        {/* Sensory Flavor Profile Section (Calibrated Organoleptic Analysis) */}
        {sensoryProfile && (
          <section id="sensory-profile-section" className="mb-16 p-6 sm:p-8 bg-[#181818] border border-[#F5F5F0]/10 shadow-xl">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#F5F5F0]/10">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-[#C5A059]/10 text-[#C5A059] border border-[#C5A059]/30">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-serif text-xl sm:text-2xl text-[#F5F5F0]">
                    Sensory & Flavor Profile
                  </h2>
                  <p className="text-xs text-[#F5F5F0]/60 mt-0.5">
                    Quantitative organoleptic calibration across primary taste receptors and aromatic volatiles
                  </p>
                </div>
              </div>
              <span className="hidden sm:inline-block text-[10px] uppercase tracking-[0.2em] text-[#C5A059] font-mono">
                Terroir Scale (0–100)
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { label: 'Umami Resonance', val: sensoryProfile.umami, desc: 'Glutamate & savory depth' },
                { label: 'Aromatic Volatiles', val: sensoryProfile.aroma, desc: 'Monoterpene diffusion' },
                { label: 'Acidity & Brightness', val: sensoryProfile.acidity, desc: 'Crisp organic acids' },
                { label: 'Natural Sweetness', val: sensoryProfile.sweetness, desc: 'Carbohydrate profile' },
                { label: 'Bitterness & Grip', val: sensoryProfile.bitterness, desc: 'Polyphenols & tannins' },
                { label: 'Pungency & Warmth', val: sensoryProfile.pungency, desc: 'Capsaicin & piperine' },
                { label: 'Sensory Finish Depth', val: sensoryProfile.depth, desc: 'Persistence on palate' }
              ].map((metric, i) => (
                <div key={i} className="p-4 bg-[#1E1E1E] border border-white/5 flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-serif text-[#F5F5F0]">{metric.label}</span>
                    <span className="font-mono text-xs text-[#C5A059] font-bold">{metric.val}/100</span>
                  </div>
                  <div className="w-full bg-[#121212] h-2 rounded-none overflow-hidden mb-2 border border-white/5">
                    <div
                      className="bg-gradient-to-r from-amber-600 to-[#C5A059] h-full transition-all duration-1000"
                      style={{ width: `${Math.max(5, Math.min(100, metric.val))}%` }}
                    />
                  </div>
                  <span className="text-[10px] text-[#F5F5F0]/50 italic">{metric.desc}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Prominent Seasonal Availability & Phenological Harvest Section */}
        <SeasonalDetailHero ingredient={ingredient} />

        {/* Section: Recommended Culinary Uses & Storage Protocol */}
        <section id="uses-and-storage-section" className="mb-16 grid grid-cols-1 md:grid-cols-2 gap-8 p-6 sm:p-8 bg-[#181818] border border-[#F5F5F0]/10 shadow-xl">
          <div>
            <h2 className="font-serif text-xl text-[#F5F5F0] mb-4 flex items-center space-x-2.5">
              <ChefHat className="w-5 h-5 text-[#C5A059]" />
              <span>Recommended Common Uses</span>
            </h2>
            <p className="text-xs text-[#F5F5F0]/60 mb-4">
              Culinary techniques and atelier preparations calibrated to maximize flavor volatile extraction
            </p>
            <ul className="space-y-3">
              {ingredient.culinaryApplications.map((app, idx) => (
                <li key={idx} className="flex items-start space-x-2.5 text-xs sm:text-sm text-[#F5F5F0]/85 p-3 bg-[#1E1E1E] border border-white/5">
                  <span className="text-[#C5A059] font-bold font-mono text-xs mt-0.5">0{idx + 1}</span>
                  <span className="leading-relaxed">{app}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-serif text-xl text-[#F5F5F0] mb-4 flex items-center space-x-2.5">
              <Compass className="w-5 h-5 text-[#C5A059]" />
              <span>Storage & Preservation Protocols</span>
            </h2>
            <p className="text-xs text-[#F5F5F0]/60 mb-4">
              Preserving peak aromatic potency and preventing enzymatic deterioration
            </p>
            <div className="p-4 bg-[#1E1E1E] border border-white/5 mb-4 text-xs sm:text-sm text-[#F5F5F0]/85 leading-relaxed">
              {ingredient.storageAdvice}
            </div>
            {ingredient.harvestMethod && (
              <div className="p-3 bg-[#1E1E1E] border-l-2 border-[#C5A059] text-xs text-[#F5F5F0]/75 mb-3">
                <span className="text-[#C5A059] font-medium block text-[10px] uppercase tracking-wider mb-0.5">Harvest Method</span>
                <span>{ingredient.harvestMethod}</span>
              </div>
            )}
            {ingredient.curatorNotes && (
              <div className="p-3 bg-[#1E1E1E] border-l-2 border-[#C5A059] text-xs text-[#F5F5F0]/70 italic">
                <span className="text-[#C5A059] not-italic font-medium block text-[10px] uppercase tracking-wider mb-0.5">Curator's Tasting Note</span>
                "{ingredient.curatorNotes}"
              </div>
            )}
          </div>
        </section>

        {/* Section: Substitution Finder (2-3 Alternatives with Crawlable Links) */}
        {substitutions.length > 0 && (
          <section id="substitution-finder-section" className="mb-16 p-6 sm:p-8 bg-[#181818] border border-[#F5F5F0]/10">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#F5F5F0]/10">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-[#C5A059]/10 text-[#C5A059] border border-[#C5A059]/30">
                  <Scale className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-serif text-xl sm:text-2xl text-[#F5F5F0]">
                    Substitution Finder
                  </h2>
                  <p className="text-xs text-[#F5F5F0]/60 mt-0.5">
                    Culinary-calibrated alternatives when {ingredient.name} is out of harvest or cellar stock
                  </p>
                </div>
              </div>
              <span className="hidden sm:inline-block text-[10px] uppercase tracking-[0.2em] text-[#C5A059] bg-[#C5A059]/10 px-3 py-1 border border-[#C5A059]/20">
                {substitutions.length} Precise Options
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {substitutions.map((sub, idx) => (
                <div
                  key={idx}
                  className="bg-[#1E1E1E] p-5 border border-[#F5F5F0]/10 flex flex-col justify-between hover:border-[#C5A059]/40 transition-all"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] uppercase tracking-[0.2em] text-[#C5A059] font-medium">
                        Alternative #{idx + 1}
                      </span>
                      {sub.matchingIngredientId && (
                        <a
                          href={`/ingredients/${sub.matchingIngredientId}`}
                          onClick={(e) => {
                            e.preventDefault();
                            onNavigateToIngredient(sub.matchingIngredientId!);
                          }}
                          className="text-[10px] text-[#C5A059] hover:underline flex items-center space-x-1"
                        >
                          <span>In Archive</span>
                          <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      )}
                    </div>

                    <h3 className="font-serif text-lg text-[#F5F5F0] mb-1">
                      {sub.name}
                    </h3>

                    {sub.scientificName && (
                      <p className="font-serif italic text-xs text-[#F5F5F0]/50 mb-3">
                        {sub.scientificName}
                      </p>
                    )}

                    {/* Substitution Ratio */}
                    <div className="mb-3 p-2.5 bg-[#252525] border-l-2 border-[#C5A059] text-xs">
                      <span className="text-[#C5A059] font-medium block text-[10px] uppercase tracking-wider mb-0.5">
                        Conversion Ratio
                      </span>
                      <span className="text-[#F5F5F0]/90">{sub.ratio}</span>
                    </div>

                    {/* Flavor Delta */}
                    <div className="mb-3">
                      <span className="text-[10px] uppercase tracking-wider text-[#F5F5F0]/50 block mb-1">
                        Flavor & Aromatic Variance
                      </span>
                      <p className="text-xs text-[#F5F5F0]/75 leading-relaxed">
                        {sub.flavorDelta}
                      </p>
                    </div>
                  </div>

                  {/* Culinary Adjustment Tip */}
                  <div className="mt-4 pt-3 border-t border-[#F5F5F0]/10 text-xs text-[#F5F5F0]/70 bg-black/20 p-2.5">
                    <span className="text-[#C5A059] font-medium block text-[10px] uppercase tracking-wider mb-1">
                      Chef's Calibration Tip
                    </span>
                    <p className="text-[11px] leading-normal">{sub.culinaryAdjustmentTip}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Section: "Pairs Well With" Harmonic Pairings */}
        {ingredient.pairings && ingredient.pairings.length > 0 && (
          <section id="pairs-well-with-section" className="mb-16">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#F5F5F0]/10">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-[#C5A059]/10 text-[#C5A059] border border-[#C5A059]/30">
                  <Layers className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-serif text-xl sm:text-2xl text-[#F5F5F0]">
                    Pairs Well With
                  </h2>
                  <p className="text-xs text-[#F5F5F0]/60 mt-0.5">
                    Aromatic resonance, molecular affinities, and complementary terroirs
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {ingredient.pairings.map((pairing, idx) => {
                const matchedArchive = allIngredients.find((i) =>
                  i.name.toLowerCase().includes(pairing.ingredient.toLowerCase()) ||
                  pairing.ingredient.toLowerCase().includes(i.name.toLowerCase())
                );
                const matchedSlug = matchedArchive ? (matchedArchive.slug || matchedArchive.id) : null;

                return (
                  <div
                    key={idx}
                    className="p-5 bg-[#1E1E1E] border border-[#F5F5F0]/10 hover:border-[#C5A059]/40 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] uppercase tracking-[0.2em] text-[#C5A059] font-medium">
                          {pairing.harmony}
                        </span>
                        {matchedSlug && (
                          <a
                            href={`/ingredients/${matchedSlug}`}
                            onClick={(e) => {
                              e.preventDefault();
                              onNavigateToIngredient(matchedSlug);
                            }}
                            className="text-[10px] uppercase tracking-wider text-[#C5A059] hover:underline flex items-center space-x-1"
                          >
                            <span>Explore Specimen</span>
                            <ChevronRight className="w-3 h-3" />
                          </a>
                        )}
                      </div>

                      <h3 className="font-serif text-lg text-[#F5F5F0] mb-2">
                        {pairing.ingredient}
                      </h3>

                      <p className="text-xs text-[#F5F5F0]/75 leading-relaxed">
                        {pairing.note}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-[#F5F5F0]/10 flex items-center justify-between text-xs text-[#F5F5F0]/50">
                      <span>Harmonic Affinity</span>
                      <div className="flex space-x-1">
                        {[...Array(5)].map((_, starIdx) => (
                          <span key={starIdx} className="text-[#C5A059]">★</span>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Section: Related Ingredients in Botanical Archive */}
        {relatedIngredients.length > 0 && (
          <section id="related-ingredients-section" className="mb-16">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#F5F5F0]/10">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-[#C5A059]/10 text-[#C5A059] border border-[#C5A059]/30">
                  <Compass className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-serif text-xl sm:text-2xl text-[#F5F5F0]">
                    Related Botanical & Terroir Specimens
                  </h2>
                  <p className="text-xs text-[#F5F5F0]/60 mt-0.5">
                    Complementary terroirs, taxonomic siblings, and aromatic affinities
                  </p>
                </div>
              </div>
              <a
                href={`/collection?category=${encodeURIComponent(ingredient.category)}`}
                onClick={(e) => {
                  if (!e.metaKey && !e.ctrlKey) {
                    e.preventDefault();
                    router.navigate({ view: 'collection', categoryFilter: ingredient.category });
                  }
                }}
                className="text-xs uppercase tracking-widest text-[#C5A059] hover:underline flex items-center space-x-1"
                title={`Browse all ${ingredient.category} botanical specimens`}
              >
                <span>Browse {ingredient.category}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {relatedIngredients.map((rel) => {
                const relSlug = rel.slug || rel.id;
                return (
                  <div
                    key={rel.id}
                    className="bg-[#181818] border border-[#F5F5F0]/10 hover:border-[#C5A059]/50 transition-all flex flex-col justify-between group shadow-lg"
                  >
                    <a
                      href={`/ingredients/${relSlug}`}
                      onClick={(e) => {
                        if (!e.metaKey && !e.ctrlKey) {
                          e.preventDefault();
                          onNavigateToIngredient(relSlug);
                        }
                      }}
                      className="block p-4 text-inherit no-underline"
                      title={`Explore ${rel.name} (${rel.category} from ${rel.origin})`}
                    >
                      <div className="relative aspect-[4/3] bg-black/40 mb-3 overflow-hidden border border-white/5">
                        <IngredientImage
                          ingredient={rel}
                          src={rel.imageUrl}
                          alt={rel.name}
                          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-2 right-2 px-2 py-0.5 bg-black/80 backdrop-blur-md text-[9px] uppercase tracking-wider text-[#C5A059] border border-white/10">
                          {rel.category}
                        </div>
                      </div>

                      <div className="text-[10px] uppercase tracking-wider text-[#C5A059] mb-1">
                        {rel.origin}
                      </div>

                      <h3 className="font-serif text-base text-[#F5F5F0] group-hover:text-[#C5A059] transition-colors mb-1.5 leading-snug">
                        {rel.name}
                      </h3>

                      <p className="text-xs text-[#F5F5F0]/70 line-clamp-2 leading-relaxed mb-3">
                        {rel.overview || rel.description}
                      </p>

                      <div className="flex flex-wrap gap-1">
                        {rel.flavorNotes?.slice(0, 2).map((note, nIdx) => (
                          <span
                            key={nIdx}
                            className="px-1.5 py-0.5 bg-[#222] text-[9px] text-[#F5F5F0]/60 border border-white/5"
                          >
                            {note}
                          </span>
                        ))}
                      </div>
                    </a>

                    <div className="p-3 border-t border-[#F5F5F0]/10 bg-[#141414] flex items-center justify-between">
                      <a
                        href={`/ingredients/${relSlug}`}
                        onClick={(e) => {
                          if (!e.metaKey && !e.ctrlKey) {
                            e.preventDefault();
                            onNavigateToIngredient(relSlug);
                          }
                        }}
                        className="text-[11px] uppercase tracking-wider text-[#C5A059] hover:underline flex items-center space-x-1"
                      >
                        <span>Explore Specimen</span>
                        <ChevronRight className="w-3 h-3" />
                      </a>
                      <span className="text-[10px] text-[#F5F5F0]/40 font-mono">{rel.season}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Section: Recipes Using This Ingredient (Crawlable Internal Links) */}
        {matchingRecipes.length > 0 && (
          <section id="matching-recipes-section" className="mb-16">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#F5F5F0]/10">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-[#C5A059]/10 text-[#C5A059] border border-[#C5A059]/30">
                  <Flame className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-serif text-xl sm:text-2xl text-[#F5F5F0]">
                    Masterclasses Featuring {ingredient.name}
                  </h2>
                  <p className="text-xs text-[#F5F5F0]/60 mt-0.5">
                    Haute gastronomy timelines with live culinary orchestration
                  </p>
                </div>
              </div>
              <a
                href="/recipes"
                onClick={(e) => {
                  if (!e.metaKey && !e.ctrlKey) {
                    e.preventDefault();
                    router.navigate({ view: 'recipes-archive' });
                  }
                }}
                className="text-xs uppercase tracking-widest text-[#C5A059] hover:underline flex items-center space-x-1"
                title="Browse complete index of 1,000+ culinary masterclass recipes"
              >
                <span>All Recipes</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {matchingRecipes.map((recipe) => {
                const recipeSlug = recipe.slug || recipe.id;
                return (
                  <div
                    key={recipe.id}
                    className="bg-[#1E1E1E] border border-[#F5F5F0]/10 hover:border-[#C5A059]/50 transition-all p-5 flex flex-col justify-between shadow-lg"
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs text-[#C5A059] mb-2">
                        <span className="uppercase tracking-widest text-[10px] font-mono">{recipe.cuisine || 'Haute Cuisine'}</span>
                        <span className="text-[#F5F5F0]/50 font-mono">{recipe.overallDurationFormatted}</span>
                      </div>

                      <a
                        href={`/recipes/${recipeSlug}`}
                        onClick={(e) => {
                          if (!e.metaKey && !e.ctrlKey) {
                            e.preventDefault();
                            router.navigate({ view: 'recipe-detail', recipeSlug });
                          }
                        }}
                        className="font-serif text-xl text-[#F5F5F0] hover:text-[#C5A059] transition-colors mb-2 block"
                        title={`View masterclass recipe: ${recipe.dishTitle} featuring ${ingredient.name}`}
                      >
                        {recipe.dishTitle}
                      </a>

                      <p className="text-xs text-[#F5F5F0]/75 line-clamp-2 mb-4 leading-relaxed">
                        {recipe.overview}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {recipe.tags?.slice(0, 3).map((tag, idx) => (
                          <span key={idx} className="px-2 py-0.5 bg-[#252525] text-[10px] text-[#F5F5F0]/70 border border-white/5">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-[#F5F5F0]/10 flex items-center justify-between">
                      <a
                        href={`/recipes/${recipeSlug}`}
                        onClick={(e) => {
                          if (!e.metaKey && !e.ctrlKey) {
                            e.preventDefault();
                            router.navigate({ view: 'recipe-detail', recipeSlug });
                          }
                        }}
                        className="text-xs text-[#C5A059] hover:underline flex items-center space-x-1"
                        title={`Read complete step-by-step masterclass for ${recipe.dishTitle}`}
                      >
                        <span>View Recipe: {recipe.dishTitle}</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>

                      <button
                        onClick={() => onCookRecipe(recipe)}
                        className="px-4 py-2 bg-[#C5A059] text-[#121212] hover:bg-[#d6b168] text-xs uppercase tracking-wider font-semibold flex items-center space-x-1.5 transition-all"
                      >
                        <span>Start Cook Studio</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

