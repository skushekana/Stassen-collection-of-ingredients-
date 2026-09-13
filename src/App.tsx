import React, { useState, useEffect } from 'react';
import { Ingredient, CulinaryMasterclass, AppView, CategoryType } from './types';
import { INITIAL_INGREDIENTS, REGIONS_DATA } from './data/ingredients';
import { Navbar } from './components/Navbar';
import { TopAccessibilityBar } from './components/TopAccessibilityBar';
import { InteractiveCookModal } from './components/InteractiveCookModal';
import { SavedCellarDrawer } from './components/SavedCellarDrawer';
import { DataImportExportModal } from './components/DataImportExportModal';
import { AdminMilestoneModal } from './components/AdminMilestoneModal';
import { CulinaryMasterclassModal } from './components/CulinaryMasterclassModal';
import { FeaturePreviewDock } from './components/FeaturePreviewDock';
import { UserGuideModal } from './components/UserGuideModal';
import { QuickNavigatorHub } from './components/QuickNavigatorHub';
import { Footer } from './components/Footer';

// Dedicated Standalone Pages
import { HomePage } from './pages/HomePage';
import { CollectionPage } from './pages/CollectionPage';
import { CategoriesPage } from './pages/CategoriesPage';
import { CategoryDetailPage } from './pages/CategoryDetailPage';
import { LocationsPage } from './pages/LocationsPage';
import { IngredientDetailPage } from './pages/IngredientDetailPage';
import { SearchResultsPage } from './pages/SearchResultsPage';
import { MyPantryPage } from './pages/MyPantryPage';
import { SeasonalCalendarPage } from './pages/SeasonalCalendarPage';
import { ShoppingListPage } from './pages/ShoppingListPage';
import { RecipesArchivePage } from './pages/RecipesArchivePage';
import { RecipeDetailPage } from './pages/RecipeDetailPage';
import { WhatCanICookPage } from './pages/WhatCanICookPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { AdminAdsPage } from './pages/AdminAdsPage';
import { SocialBarAd } from './components/ads/SocialBarAd';
import { PopunderAdListener } from './components/ads/PopunderAdListener';
import { AdManager } from './services/adManager';
import { recipeService } from './services/recipeService';
import { ingredientService } from './services/ingredientService';
import { updatePageSEO } from './utils/seo';

import { router, RouteState } from './services/router';
import {
  trackSiteVisit,
  recordMilestoneLog,
  initAuth,
  isUserAdmin,
  getAccessToken,
  ADMIN_EMAIL
} from './services/firebase';
import { sendMilestoneNotificationEmail } from './services/gmail';
import { User } from 'firebase/auth';

export default function App() {
  // Primary Ingredients State (supports dynamic 100+ items import)
  const [ingredients, setIngredients] = useState<Ingredient[]>(() => {
    const saved = localStorage.getItem('stassens_custom_ingredients');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch (e) {
        console.error('Error loading saved ingredients:', e);
      }
    }
    return INITIAL_INGREDIENTS;
  });

  // Saved / Bookmarked ingredients in Cellar
  const [savedIds, setSavedIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('stassens_cellar_saved');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error loading saved IDs:', e);
      }
    }
    return ['matsutake-nagano', 'saffron-kozani', 'aceto-modena'];
  });

  // Routing State
  const [currentRoute, setCurrentRoute] = useState<RouteState>(() => router.getCurrentRoute());

  // Modals & Overlays
  const [selectedIngredientModal, setSelectedIngredientModal] = useState<Ingredient | null>(null);
  const [ingredientHistory, setIngredientHistory] = useState<Ingredient[]>([]);
  const [activeCookingRecipe, setActiveCookingRecipe] = useState<CulinaryMasterclass | null>(null);
  const [isSavedCellarOpen, setIsSavedCellarOpen] = useState(false);
  const [isDataModalOpen, setIsDataModalOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [isMasterclassOpen, setIsMasterclassOpen] = useState(false);
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [masterclassInitialIngredient, setMasterclassInitialIngredient] = useState<Ingredient | undefined>(undefined);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // Filter States for Home grid
  const [selectedCategory, setSelectedCategory] = useState(() => router.getCurrentRoute().categoryFilter || 'All Categories');
  const [selectedRegion, setSelectedRegion] = useState(() => router.getCurrentRoute().regionFilter || 'All Terroirs');
  const [selectedSeason, setSelectedSeason] = useState(() => router.getCurrentRoute().seasonFilter || 'All Seasons');
  const [searchQuery, setSearchQuery] = useState('');

  // Subscribe to Router Changes
  useEffect(() => {
    const cleanupRouter = router.init();
    const unsub = router.subscribe((route) => {
      setCurrentRoute(route);
      if (route.categoryFilter !== undefined) {
        setSelectedCategory(route.categoryFilter);
      }
      if (route.regionFilter !== undefined) {
        setSelectedRegion(route.regionFilter);
      }
      if (route.seasonFilter !== undefined) {
        setSelectedSeason(route.seasonFilter);
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    return () => {
      cleanupRouter();
      unsub();
    };
  }, []);

  // Persist Saved IDs
  useEffect(() => {
    localStorage.setItem('stassens_cellar_saved', JSON.stringify(savedIds));
  }, [savedIds]);

  // Auth Listener
  useEffect(() => {
    const unsubscribe = initAuth(
      (user) => setCurrentUser(user),
      () => setCurrentUser(null)
    );
    return () => unsubscribe();
  }, []);

  // Visitor Tracking in Firestore & 50-visit Milestone Notification Dispatch
  useEffect(() => {
    let isRun = false;
    const recordVisit = async () => {
      if (isRun) return;
      isRun = true;
      try {
        const { totalVisits, crossedMilestone } = await trackSiteVisit();
        if (crossedMilestone) {
          const token = await getAccessToken();
          const dateStr = new Date().toLocaleString();
          if (token) {
            const emailRes = await sendMilestoneNotificationEmail({
              totalVisits: crossedMilestone,
              dateStr,
              recipientEmail: ADMIN_EMAIL,
              accessToken: token,
            });
            await recordMilestoneLog(
              crossedMilestone,
              emailRes.success ? 'sent' : 'failed',
              emailRes.success
                ? `Milestone alert automatically dispatched to ${ADMIN_EMAIL}`
                : `Attempted auto-dispatch: ${emailRes.error}`
            );
          } else {
            await recordMilestoneLog(
              crossedMilestone,
              'pending_auth',
              `Milestone ${crossedMilestone} visits reached; awaiting administrator sync`
            );
          }
        }
      } catch (err) {
        console.error('Visitor tracking initialization notice:', err);
      }
    };
    recordVisit();
  }, []);

  // Navigation dispatcher
  const handleNavigate = (target: string) => {
    switch (target) {
      case 'home':
      case 'hero':
        router.navigate({ view: 'home' });
        break;
      case 'collection':
        router.navigate({ view: 'collection' });
        break;
      case 'locations':
        router.navigate({ view: 'locations' });
        break;
      case 'about':
        router.navigate({ view: 'about' });
        break;
      case 'contact':
        router.navigate({ view: 'contact' });
        break;
      case 'privacy':
        router.navigate({ view: 'privacy' });
        break;
      case 'search-results':
        router.navigate({ view: 'search-results' });
        break;
      case 'my-pantry':
      case 'pantry':
        router.navigate({ view: 'my-pantry' });
        break;
      case 'recipes-archive':
      case 'recipes':
        router.navigate({ view: 'recipes-archive' });
        break;
      case 'seasonal-calendar':
      case 'calendar':
        router.navigate({ view: 'seasonal-calendar' });
        break;
      case 'shopping-list':
        router.navigate({ view: 'shopping-list' });
        break;
      case 'admin-ads':
      case 'ads':
      case 'ad-manager':
        router.navigate({ view: 'admin-ads' });
        break;
      default:
        router.navigate({ view: 'home' });
        break;
    }
  };

  const handleOpenIngredientDetail = (ingredient: Ingredient) => {
    router.navigate({ view: 'ingredient-detail', ingredientSlug: ingredient.slug || ingredient.id });
  };

  const handleOpenRecipeDetail = (recipe: CulinaryMasterclass) => {
    router.navigate({ view: 'recipe-detail', recipeSlug: recipe.slug || recipe.id });
  };

  const handleOpenMasterclass = (ing?: Ingredient) => {
    setMasterclassInitialIngredient(ing || ingredients[0]);
    setIsMasterclassOpen(true);
  };

  const handleCookRecipe = (recipe: CulinaryMasterclass) => {
    // Check if Popunder / In-Website Interstitial is eligible on this route
    const check = AdManager.canShowPopunder(currentRoute.view);
    if (check.allowed) {
      // Trigger the 5-second in-website modal, then open the recipe on close
      AdManager.triggerPopunder(currentRoute.view, undefined, () => {
        setActiveCookingRecipe(recipe);
      });
    } else {
      setActiveCookingRecipe(recipe);
    }
  };

  const handleImportIngredients = (newIngredients: Ingredient[]) => {
    // Sync React state with active ingredientService catalog
    const allIngredients = ingredientService.getAllIngredients();
    setIngredients(allIngredients);
    localStorage.setItem('stassens_custom_ingredients', JSON.stringify(allIngredients));
  };

  const handleResetDefault = () => {
    ingredientService.resetToDefaults();
    recipeService.resetToDefaults();
    setIngredients(ingredientService.getAllIngredients());
  };

  const handleToggleSave = (id: string) => {
    setSavedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleFilterByRegion = (region: string) => {
    setSelectedRegion(region);
    handleNavigate('collection');
  };

  const handleFilterBySeason = (season: string) => {
    setSelectedSeason(season);
    handleNavigate('collection');
  };

  const handleNavigateToCategory = (slug: string, type: CategoryType) => {
    router.navigate({ view: 'category-detail', categorySlug: slug, categoryType: type });
  };

  const handleNavigateToCuisine = (cuisine: string) => {
    router.navigate({ view: 'recipes-archive' });
  };

  // Keyboard shortcut for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (currentRoute.view === 'search-results') {
          document.getElementById('search-page-input')?.focus();
        } else {
          router.navigate({ view: 'search-results' });
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentRoute.view]);

  const savedIngredientsList = ingredients.filter((i) => savedIds.includes(i.id));
  const isCuratorAdmin = isUserAdmin(currentUser);

  // Match ingredient for `/ingredients/:slug` route
  const currentIngredientDetail = currentRoute.view === 'ingredient-detail' && currentRoute.ingredientSlug
    ? ingredientService.getIngredientByIdOrSlug(currentRoute.ingredientSlug) || ingredients.find((i) => i.id === currentRoute.ingredientSlug || i.slug === currentRoute.ingredientSlug || i.name.toLowerCase().replace(/\s+/g, '-') === currentRoute.ingredientSlug?.toLowerCase()) || ingredients[0]
    : null;

  // Match recipe for `/recipes/:slug` route
  const currentRecipeDetail = currentRoute.view === 'recipe-detail' && currentRoute.recipeSlug
    ? recipeService.getRecipeByIdOrSlug(currentRoute.recipeSlug) || null
    : null;

  // Update SEO metadata and structured data whenever view, detail ingredient, or recipe changes
  useEffect(() => {
    updatePageSEO(currentRoute.view, currentIngredientDetail, currentRecipeDetail);
  }, [currentRoute, currentIngredientDetail, currentRecipeDetail]);

  return (
    <div className="min-h-screen bg-[#121212] text-[#F5F5F0] selection:bg-[#C5A059] selection:text-[#121212] font-sans antialiased overflow-x-hidden">
      {/* Topmost Accessibility & Global Page Navigation Toolbar */}
      <TopAccessibilityBar
        currentPageTitle={
          currentRoute.view === 'categories-index'
            ? 'Gastronomic Categories & Discovery Hub'
            : currentRoute.view === 'category-detail'
            ? 'Culinary Category Archive'
            : currentRoute.view === 'collection'
            ? 'Complete Ingredient Collection'
            : currentRoute.view === 'locations'
            ? 'World Terroir Locations'
            : currentRoute.view === 'about'
            ? 'About Our Mission'
            : currentRoute.view === 'contact'
            ? 'Contact Atelier'
            : currentRoute.view === 'privacy'
            ? 'Privacy Policy'
            : currentRoute.view === 'recipes-archive'
            ? '500+ Masterclass Archive'
            : currentRoute.view === 'recipe-detail' && currentRecipeDetail
            ? currentRecipeDetail.dishTitle
            : currentRoute.view === 'ingredient-detail' && currentIngredientDetail
            ? currentIngredientDetail.name
            : currentRoute.view === 'search-results'
            ? 'Dedicated Search Results'
            : currentRoute.view === 'my-pantry'
            ? 'My Cellar & Pantry'
            : currentRoute.view === 'seasonal-calendar'
            ? 'Seasonal Terroir Calendar'
            : currentRoute.view === 'shopping-list'
            ? 'Culinary Provisioning'
            : currentRoute.view === 'what-can-i-cook'
            ? 'What Can I Cook? Recipe Matcher'
            : "Stassen's Collection of Ingredients"
        }
      />

      {/* Top Fixed Header */}
      <Navbar
        savedCount={savedIds.length}
        onOpenSaved={() => router.navigate({ view: 'my-pantry' })}
        onOpenDataModal={() => setIsDataModalOpen(true)}
        onOpenAdminModal={() => setIsAdminModalOpen(true)}
        onOpenMasterclass={() => handleOpenMasterclass()}
        onOpenGuide={() => setIsGuideOpen(true)}
        onSearchClick={() => router.navigate({ view: 'search-results' })}
        activeSection={currentRoute.view}
        onNavigate={handleNavigate}
        isAdminUser={isCuratorAdmin}
      />

      {/* Persistent Quick Navigator Hub with 1-Click Discoverability */}
      <QuickNavigatorHub
        activeSection={currentRoute.view}
        onNavigate={handleNavigate}
        onOpenGuide={() => setIsGuideOpen(true)}
        savedCount={savedIds.length}
        shoppingListCount={0}
      />

      {/* Main View Router Content */}
      <main id="main-content">
        {currentRoute.view === 'ingredient-detail' && currentIngredientDetail ? (
          <IngredientDetailPage
            ingredient={currentIngredientDetail}
            allIngredients={ingredients}
            isSaved={savedIds.includes(currentIngredientDetail.id)}
            onToggleSave={handleToggleSave}
            onNavigateToIngredient={(slug) => router.navigate({ view: 'ingredient-detail', ingredientSlug: slug })}
            onBack={() => router.navigate({ view: 'collection' })}
            onCookRecipe={(recipe) => handleCookRecipe(recipe)}
            onOpenMasterclass={(ing) => handleOpenMasterclass(ing)}
          />
        ) : currentRoute.view === 'ingredient-detail' && !currentIngredientDetail ? (
          <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 pt-28">
            <h2 className="font-serif text-3xl text-[#F5F5F0] mb-3">Specimen Dossier Not Found</h2>
            <p className="text-sm text-[#F5F5F0]/60 max-w-md mb-6 font-light">
              The requested botanical specimen could not be located in the current archival records.
            </p>
            <button
              onClick={() => router.navigate({ view: 'collection' })}
              className="px-6 py-3 bg-[#C5A059] text-[#121212] text-xs uppercase tracking-widest font-semibold hover:bg-[#d4b065] transition-all"
            >
              Browse Complete Collection
            </button>
          </div>
        ) : currentRoute.view === 'categories-index' ? (
          <CategoriesPage
            onNavigateToCategory={handleNavigateToCategory}
            onNavigateToCuisine={handleNavigateToCuisine}
            onNavigateToHome={() => router.navigate({ view: 'home' })}
          />
        ) : currentRoute.view === 'category-detail' ? (
          <CategoryDetailPage
            categorySlug={currentRoute.categorySlug || ''}
            categoryType={currentRoute.categoryType}
            savedIds={savedIds}
            onToggleSave={handleToggleSave}
            onSelectIngredient={handleOpenIngredientDetail}
            onSelectRecipe={handleOpenRecipeDetail}
            onCookRecipe={handleCookRecipe}
            onNavigateToCategory={handleNavigateToCategory}
            onNavigateToCategoriesHub={() => router.navigate({ view: 'categories-index' })}
          />
        ) : currentRoute.view === 'collection' ? (
          <CollectionPage
            ingredients={ingredients}
            savedIds={savedIds}
            onToggleSave={handleToggleSave}
            onSelectIngredient={handleOpenIngredientDetail}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            selectedRegion={selectedRegion}
            onSelectRegion={setSelectedRegion}
            selectedSeason={selectedSeason}
            onSelectSeason={setSelectedSeason}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
        ) : currentRoute.view === 'locations' ? (
          <LocationsPage
            ingredients={ingredients}
            savedIds={savedIds}
            onToggleSave={handleToggleSave}
            onSelectIngredient={handleOpenIngredientDetail}
            onNavigateToCollection={(regionFilter) => {
              if (regionFilter) setSelectedRegion(regionFilter);
              router.navigate({ view: 'collection' });
            }}
          />
        ) : currentRoute.view === 'about' ? (
          <AboutPage
            onNavigateToCollection={() => router.navigate({ view: 'collection' })}
          />
        ) : currentRoute.view === 'contact' ? (
          <ContactPage
            onNavigateToCollection={() => router.navigate({ view: 'collection' })}
          />
        ) : currentRoute.view === 'privacy' ? (
          <PrivacyPage
            onNavigateToCollection={() => router.navigate({ view: 'collection' })}
          />
        ) : currentRoute.view === 'search-results' ? (
          <SearchResultsPage
            ingredients={ingredients}
            savedIds={savedIds}
            onToggleSave={handleToggleSave}
            onSelectIngredient={handleOpenIngredientDetail}
            onSelectRecipe={handleOpenRecipeDetail}
            onCookRecipe={handleCookRecipe}
            initialQuery={currentRoute.searchQuery || ''}
          />
        ) : currentRoute.view === 'my-pantry' ? (
          <MyPantryPage
            allIngredients={ingredients}
            savedIds={savedIds}
            onToggleSave={handleToggleSave}
            onSelectIngredient={handleOpenIngredientDetail}
            onCookRecipe={(recipe) => handleCookRecipe(recipe)}
            onNavigateToCollection={() => router.navigate({ view: 'collection' })}
          />
        ) : currentRoute.view === 'seasonal-calendar' ? (
          <SeasonalCalendarPage
            ingredients={ingredients}
            savedIds={savedIds}
            onToggleSave={handleToggleSave}
            onSelectIngredient={handleOpenIngredientDetail}
          />
        ) : currentRoute.view === 'shopping-list' ? (
          <ShoppingListPage
            onNavigateToIngredient={(slug) => router.navigate({ view: 'ingredient-detail', ingredientSlug: slug })}
            onNavigateToCollection={() => router.navigate({ view: 'collection' })}
          />
        ) : currentRoute.view === 'recipe-detail' ? (
          <RecipeDetailPage
            recipe={currentRecipeDetail}
            allIngredients={ingredients}
            onCookRecipe={(recipe) => handleCookRecipe(recipe)}
            onNavigateToIngredient={(slug) => router.navigate({ view: 'ingredient-detail', ingredientSlug: slug })}
            onBack={() => router.navigate({ view: 'recipes-archive' })}
          />
        ) : currentRoute.view === 'recipes-archive' ? (
          <RecipesArchivePage
            allIngredients={ingredients}
            onCookRecipe={(recipe) => handleCookRecipe(recipe)}
            onOpenMasterclass={(ing) => handleOpenMasterclass(ing)}
            onSelectIngredient={handleOpenIngredientDetail}
            onSelectRecipe={handleOpenRecipeDetail}
          />
        ) : currentRoute.view === 'what-can-i-cook' ? (
          <WhatCanICookPage
            allIngredients={ingredients}
            onCookRecipe={(recipe) => handleCookRecipe(recipe)}
            onOpenMasterclass={(ing) => handleOpenMasterclass(ing)}
            onNavigateToCollection={() => router.navigate({ view: 'collection' })}
          />
        ) : currentRoute.view === 'admin-ads' ? (
          <AdminAdsPage
            currentUser={currentUser}
            onNavigateHome={() => router.navigate({ view: 'home' })}
          />
        ) : (
          /* Default Root Home Page (/) */
          <HomePage
            ingredients={ingredients}
            savedIds={savedIds}
            onToggleSave={handleToggleSave}
            onSelectIngredient={handleOpenIngredientDetail}
            onNavigateToCollection={() => router.navigate({ view: 'collection' })}
            onNavigateToLocations={() => router.navigate({ view: 'locations' })}
            onNavigate={handleNavigate}
            onOpenGuide={() => setIsGuideOpen(true)}
            onCookRecipe={(recipe) => handleCookRecipe(recipe)}
            onOpenRecipeDetails={(recipe) => handleOpenRecipeDetail(recipe)}
          />
        )}
      </main>

      {/* Footer Colophon */}
      <Footer
        onNavigate={handleNavigate}
        onOpenDataModal={() => setIsDataModalOpen(true)}
        onOpenAdminModal={() => setIsAdminModalOpen(true)}
      />

      {/* User Onboarding & Interactive Guide Modal */}
      <UserGuideModal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
        onNavigate={handleNavigate}
      />

      {/* Haute Cuisine Masterclasses Atelier Cinema Modal */}
      <CulinaryMasterclassModal
        isOpen={isMasterclassOpen}
        onClose={() => setIsMasterclassOpen(false)}
        initialIngredient={masterclassInitialIngredient}
        allIngredients={ingredients}
      />

      {/* Interactive Step-by-Step Cook Mode Modal */}
      <InteractiveCookModal
        recipe={activeCookingRecipe}
        onClose={() => setActiveCookingRecipe(null)}
      />

      {/* Personal Saved Cellar Drawer */}
      <SavedCellarDrawer
        isOpen={isSavedCellarOpen}
        onClose={() => setIsSavedCellarOpen(false)}
        savedIngredients={savedIngredientsList}
        savedRecipes={recipeService.getBookmarkedRecipes()}
        onRemove={(id) => handleToggleSave(id)}
        onRemoveRecipe={(recipeId) => {
          recipeService.toggleRecipeBookmark(recipeId);
          // Trigger re-render
          setSavedIds([...savedIds]);
        }}
        onSelect={(ingredient) => handleOpenIngredientDetail(ingredient)}
        onCookRecipe={(recipe) => {
          setIsSavedCellarOpen(false);
          handleCookRecipe(recipe);
        }}
        onNavigateToRecipesArchive={() => router.navigate({ view: 'recipes-archive' })}
        onClearAll={() => {
          setSavedIds([]);
          recipeService.clearAllBookmarks();
        }}
      />

      {/* Dataset Import/Export Modal (Plug in 100+ items) */}
      <DataImportExportModal
        isOpen={isDataModalOpen}
        onClose={() => setIsDataModalOpen(false)}
        currentIngredients={ingredients}
        onImportIngredients={handleImportIngredients}
        onResetDefault={handleResetDefault}
      />

      {/* Administrator Telemetry & 50-Visit Milestone Log Modal */}
      <AdminMilestoneModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
        currentUser={currentUser}
        onAuthSuccess={(user) => setCurrentUser(user)}
      />

      {/* Floating Interactive Feature Preview Hub */}
      <FeaturePreviewDock
        onNavigate={handleNavigate}
        onOpenSpecimen={handleOpenIngredientDetail}
        sampleIngredient={ingredients[0]}
        onOpenSavedCellar={() => router.navigate({ view: 'my-pantry' })}
        onOpenDataModal={() => setIsDataModalOpen(true)}
        onOpenAdminModal={() => setIsAdminModalOpen(true)}
        onOpenMasterclass={(ing) => handleOpenMasterclass(ing)}
        onFocusSearch={() => router.navigate({ view: 'search-results' })}
        onFilterCategory={setSelectedCategory}
        onFilterSeason={setSelectedSeason}
      />

      {/* Adsterra Smart Ads Global Components */}
      <SocialBarAd currentView={currentRoute.view} />
      <PopunderAdListener currentView={currentRoute.view} />
    </div>
  );
}
