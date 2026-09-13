import { Ingredient, CulinaryMasterclass, AppView } from '../types';

export interface SEOConfig {
  title: string;
  description: string;
  canonicalPath?: string;
  ogType?: string;
  structuredData?: Record<string, any>;
}

export function updatePageSEO(
  viewOrIngredient: string | Ingredient,
  detailIngredient?: Ingredient | null,
  activeRecipe?: CulinaryMasterclass | null
): void {
  const baseUrl = window.location.origin;
  const currentPath = window.location.pathname;

  let view = typeof viewOrIngredient === 'string' ? viewOrIngredient : 'home';
  let activeIngredient = typeof viewOrIngredient === 'object' ? viewOrIngredient : detailIngredient;

  if (activeIngredient && view !== 'ingredient-detail') {
    view = 'ingredient-detail';
  }

  let config: SEOConfig = {
    title: "Stassen's Collection of Ingredients | Grand Culinary Archive",
    description: "A curated archive of rare botanical, artisanal, and wild-harvested culinary ingredients with master recipes and sensory guides.",
    canonicalPath: currentPath,
    ogType: "website",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Stassen's Collection of Ingredients",
      "url": baseUrl,
      "description": "A curated archive of rare botanical, artisanal, and wild-harvested culinary ingredients."
    }
  };

  if (view === 'home') {
    config = {
      title: "Stassen's Collection of Ingredients | Grand Culinary Archive & Terroir Mapping",
      description: "Explore rare botanical, artisanal, and wild-harvested ingredients curated from global gastronomic terroirs with master recipes and sensory guides.",
      canonicalPath: "/",
      ogType: "website",
      structuredData: {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "Stassen's Collection of Ingredients",
        "url": baseUrl,
        "description": "Explore rare botanical, artisanal, and wild-harvested ingredients curated from global gastronomic terroirs."
      }
    };
  } else if (view === 'collection') {
    config = {
      title: "Ingredient Collection Archive | Stassen's Gastronomy",
      description: "Browse our comprehensive taxonomy of rare truffles, spices, oils, and foraged botanicals with sensory tasting notes.",
      canonicalPath: "/collection",
      ogType: "website",
      structuredData: {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": "Ingredient Collection Archive",
        "url": `${baseUrl}/collection`,
        "description": "Comprehensive taxonomy of rare truffles, spices, oils, and foraged botanicals."
      }
    };
  } else if (view === 'locations') {
    config = {
      title: "Global Terroir & Origin Map | Stassen's Collection",
      description: "Discover the geographical origins, climate zones, and foraging microclimates behind our rare culinary ingredients across global terroirs.",
      canonicalPath: "/locations",
      ogType: "website",
      structuredData: {
        "@context": "https://schema.org",
        "@type": "Place",
        "name": "Global Terroir Regions",
        "description": "Geographical origins and microclimates of gourmet ingredients."
      }
    };
  } else if (view === 'categories-index') {
    config = {
      title: "Gastronomic Taxonomy & Culinary Categories | Stassen's Collection",
      description: "Explore the comprehensive gastronomic taxonomy of rare botanical specimens, wild-harvested spices, and haute cuisine masterclasses across global terroirs.",
      canonicalPath: "/categories",
      ogType: "website",
      structuredData: {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": "Gastronomic Taxonomy & Culinary Categories",
        "url": `${baseUrl}/categories`,
        "description": "Comprehensive gastronomic taxonomy of botanical specimens and recipe masterclasses."
      }
    };
  } else if (view === 'recipes-archive') {
    config = {
      title: "Haute Cuisine Recipes & Masterclasses | Stassen's Collection",
      description: "Step-by-step masterclass culinary guides crafted by Michelin-trained artisans using rare foraged ingredients.",
      canonicalPath: "/recipes",
      ogType: "website",
      structuredData: {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": "Stassen's Masterclass Recipe Collection",
        "url": `${baseUrl}/recipes`,
        "description": "Step-by-step masterclass culinary guides crafted by Michelin-trained artisans."
      }
    };
  } else if (view === 'recipe-detail' && activeRecipe) {
    const recipeSlug = activeRecipe.slug || activeRecipe.id;
    const recipeUrl = `${baseUrl}/recipes/${recipeSlug}`;
    const cleanOverview = activeRecipe.overview || `Master ${activeRecipe.dishTitle} with step-by-step masterclass techniques, sensory cues, and sommelier pairing featuring ${activeRecipe.primaryIngredientName}.`;
    
    // Unique SEO Title and Meta Description
    const defaultPageTitle = `${activeRecipe.dishTitle} Recipe — ${activeRecipe.cuisine || 'Haute Cuisine'} Masterclass | Stassen's Collection`;
    const defaultPageDescription = `${activeRecipe.dishTitle}: ${activeRecipe.subtitle ? `${activeRecipe.subtitle}. ` : ''}${cleanOverview.slice(0, 140)}... Step-by-step culinary instructions with ${activeRecipe.primaryIngredientName} and sommelier pairing.`;

    const pageTitle = activeRecipe.seoTitle || activeRecipe.seo?.title || defaultPageTitle;
    const pageDescription = activeRecipe.seoDescription || activeRecipe.seo?.description || defaultPageDescription;

    config = {
      title: pageTitle,
      description: pageDescription,
      canonicalPath: `/recipes/${recipeSlug}`,
      ogType: "article",
      structuredData: {
        "@context": "https://schema.org",
        "@type": "Recipe",
        "@id": `${recipeUrl}#recipe`,
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": recipeUrl
        },
        "name": activeRecipe.dishTitle,
        "headline": activeRecipe.subtitle || activeRecipe.dishTitle,
        "description": cleanOverview,
        "image": [
          activeRecipe.heroImageUrl || `${baseUrl}/og-image.jpg`,
          ...(activeRecipe.galleryImages || [])
        ].filter(Boolean),
        "url": recipeUrl,
        "author": {
          "@type": "Organization",
          "name": "Stassen's Collection Atelier",
          "url": baseUrl
        },
        "publisher": {
          "@type": "Organization",
          "name": "Stassen's Collection",
          "url": baseUrl,
          "logo": {
            "@type": "ImageObject",
            "url": `${baseUrl}/favicon.svg`
          }
        },
        "datePublished": activeRecipe.createdAt || "2025-01-01T00:00:00.000Z",
        "recipeCuisine": activeRecipe.cuisine || "Haute Cuisine",
        "recipeCategory": activeRecipe.courseCategory || "Main Course",
        "prepTime": `PT${activeRecipe.totalPrepTimeMinutes || 20}M`,
        "cookTime": `PT${activeRecipe.totalCookTimeMinutes || 30}M`,
        "totalTime": `PT${(activeRecipe.totalPrepTimeMinutes || 20) + (activeRecipe.totalCookTimeMinutes || 30)}M`,
        "recipeYield": `${activeRecipe.servings || 4} servings`,
        "keywords": [
          activeRecipe.primaryIngredientName,
          activeRecipe.cuisine,
          activeRecipe.courseCategory,
          ...(activeRecipe.tags || [])
        ].filter(Boolean).join(', '),
        "recipeIngredient": activeRecipe.ingredientsList?.map(i =>
          `${i.amount} ${i.name}${i.prepState ? ` (${i.prepState})` : ''}`.trim()
        ) || [],
        "recipeInstructions": activeRecipe.timelineSteps?.map((step, idx) => ({
          "@type": "HowToStep",
          "name": step.title || step.stepTitle || `Step ${step.stepNumber || idx + 1}`,
          "text": step.actionDescription,
          "url": `${recipeUrl}#step-${step.stepNumber || idx + 1}`,
          "position": idx + 1,
          ...(step.imageUrl ? { "image": step.imageUrl } : {})
        })) || [],
        ...(activeRecipe.nutritionalProfile ? {
          "nutrition": {
            "@type": "NutritionInformation",
            "calories": `${activeRecipe.nutritionalProfile.calories} calories`,
            "proteinContent": `${activeRecipe.nutritionalProfile.proteinGrams} g`,
            "carbohydrateContent": `${activeRecipe.nutritionalProfile.carbsGrams} g`,
            "fatContent": `${activeRecipe.nutritionalProfile.fatGrams} g`,
            "sodiumContent": `${activeRecipe.nutritionalProfile.artisanalSodiumMg} mg`
          }
        } : {}),
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "reviewCount": Math.max(18, Math.floor((activeRecipe.trendScore || 90) * 0.8)).toString(),
          "bestRating": "5",
          "worstRating": "1"
        }
      }
    };
  } else if (view === 'seasonal-calendar') {
    config = {
      title: "Seasonal Harvest & Foraging Calendar | Stassen's Collection",
      description: "Track peak harvesting windows for truffles, rare roots, blossoms, and wild-harvested botanicals across global hemispheres.",
      canonicalPath: "/calendar",
      ogType: "website"
    };
  } else if (view === 'my-pantry') {
    config = {
      title: "Personal Gourmet Pantry & Cellar | Stassen's Collection",
      description: "Manage your saved ingredients, tasting notes, and culinary wishlist in your personal digital cellar.",
      canonicalPath: "/my-pantry",
      ogType: "website"
    };
  } else if (view === 'shopping-list') {
    config = {
      title: "Artisanal Market & Shopping List | Stassen's Collection",
      description: "Compile and organize ingredients required for your upcoming masterclass recipes and seasonal dinner parties.",
      canonicalPath: "/shopping-list",
      ogType: "website"
    };
  } else if (view === 'what-can-i-cook') {
    config = {
      title: "What Can I Cook? Smart Recipe Finder & Ingredient Matcher | Stassen's",
      description: "Enter your on-hand ingredients to instantly match against 1,000+ haute cuisine recipes. Filter by cuisine, view missing items, and add missing ingredients to your shopping list.",
      canonicalPath: "/what-can-i-cook",
      ogType: "website",
      structuredData: {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "What Can I Cook? Recipe Finder",
        "url": `${baseUrl}/what-can-i-cook`,
        "description": "Smart ingredient matching and recipe finder tool."
      }
    };
  } else if (view === 'about') {
    config = {
      title: "About Stassen's Collection | Editorial Philosophy & Heritage",
      description: "Learn about our uncompromising commitment to sourcing gourmet ingredients and preserving ancient culinary traditions.",
      canonicalPath: "/about",
      ogType: "website",
      structuredData: {
        "@context": "https://schema.org",
        "@type": "AboutPage",
        "name": "About Stassen's Collection",
        "url": `${baseUrl}/about`
      }
    };
  } else if (view === 'contact') {
    config = {
      title: "Contact & Gourmet Concierge | Stassen's Collection",
      description: "Get in touch with our gourmet concierge and terroir curators for private allocations and partnership inquiries.",
      canonicalPath: "/contact",
      ogType: "contact"
    };
  } else if (view === 'privacy') {
    config = {
      title: "Privacy Policy & Data Security | Stassen's Collection",
      description: "Review our privacy practices, secure visitor tracking, and data protection standards.",
      canonicalPath: "/privacy",
      ogType: "website"
    };
  } else if (view === 'ingredient-detail' && activeIngredient) {
    const ingSlug = activeIngredient.slug || activeIngredient.id;
    const pageUrl = `${baseUrl}/ingredients/${ingSlug}`;
    const cleanOverview = (activeIngredient.overview || activeIngredient.description || '').replace(/\s+/g, ' ').trim();
    const truncatedOverview = cleanOverview.length > 130 ? cleanOverview.slice(0, 127) + '...' : cleanOverview;

    const defaultSeoTitle = `${activeIngredient.name}${activeIngredient.scientificName ? ` (${activeIngredient.scientificName})` : ''} — Terroir, Flavor & Culinary Guide | Stassen's Collection`;
    const defaultSeoDescription = `${truncatedOverview} Discover origin terroir in ${activeIngredient.origin}, sensory profile, storage guidelines, and masterclass recipes.`;

    const seoTitle = activeIngredient.seoTitle || activeIngredient.seo?.title || defaultSeoTitle;
    const seoDescription = activeIngredient.seoDescription || activeIngredient.seo?.description || defaultSeoDescription;

    config = {
      title: seoTitle,
      description: seoDescription,
      canonicalPath: `/ingredients/${ingSlug}`,
      ogType: "article",
      structuredData: {
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "ItemPage",
            "@id": `${pageUrl}#webpage`,
            "url": pageUrl,
            "name": seoTitle,
            "description": seoDescription,
            "isPartOf": {
              "@type": "WebSite",
              "name": "Stassen's Collection of Ingredients",
              "url": baseUrl
            },
            "breadcrumb": {
              "@id": `${pageUrl}#breadcrumb`
            },
            "mainEntity": {
              "@id": `${pageUrl}#specimen`
            }
          },
          {
            "@type": "Product",
            "@id": `${pageUrl}#specimen`,
            "name": activeIngredient.name,
            "alternateName": [
              activeIngredient.scientificName,
              ...(activeIngredient.aliases || [])
            ].filter(Boolean),
            "description": activeIngredient.description,
            "image": [
              activeIngredient.imageUrl,
              ...(activeIngredient.galleryImages || [])
            ].filter(Boolean),
            "category": activeIngredient.category,
            "countryOfOrigin": {
              "@type": "Country",
              "name": activeIngredient.country
            },
            "brand": {
              "@type": "Brand",
              "name": "Stassen's Collection"
            },
            "additionalProperty": [
              {
                "@type": "PropertyValue",
                "name": "Terroir Region",
                "value": activeIngredient.region
              },
              {
                "@type": "PropertyValue",
                "name": "Origin",
                "value": activeIngredient.origin
              },
              {
                "@type": "PropertyValue",
                "name": "Harvest Season",
                "value": activeIngredient.season
              },
              {
                "@type": "PropertyValue",
                "name": "Harvest Window",
                "value": activeIngredient.harvestWindow
              },
              {
                "@type": "PropertyValue",
                "name": "Rarity Tier",
                "value": activeIngredient.rarityIndex
              },
              ...(activeIngredient.flavorNotes && activeIngredient.flavorNotes.length > 0 ? [{
                "@type": "PropertyValue",
                "name": "Sensory Volatiles",
                "value": activeIngredient.flavorNotes.join(', ')
              }] : [])
            ]
          },
          {
            "@type": "BreadcrumbList",
            "@id": `${pageUrl}#breadcrumb`,
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": baseUrl
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Botanical Collection",
                "item": `${baseUrl}/collection`
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": activeIngredient.category,
                "item": `${baseUrl}/collection?category=${encodeURIComponent(activeIngredient.category)}`
              },
              {
                "@type": "ListItem",
                "position": 4,
                "name": activeIngredient.name,
                "item": pageUrl
              }
            ]
          }
        ]
      }
    };
  }

  // Update Document Title
  document.title = config.title;

  // Update Meta Description
  let metaDesc = document.querySelector('meta[name="description"]');
  if (!metaDesc) {
    metaDesc = document.createElement('meta');
    metaDesc.setAttribute('name', 'description');
    document.head.appendChild(metaDesc);
  }
  metaDesc.setAttribute('content', config.description);

  // Update OpenGraph Title
  let ogTitle = document.querySelector('meta[property="og:title"]');
  if (!ogTitle) {
    ogTitle = document.createElement('meta');
    ogTitle.setAttribute('property', 'og:title');
    document.head.appendChild(ogTitle);
  }
  ogTitle.setAttribute('content', config.title);

  // Update OpenGraph Description
  let ogDesc = document.querySelector('meta[property="og:description"]');
  if (!ogDesc) {
    ogDesc = document.createElement('meta');
    ogDesc.setAttribute('property', 'og:description');
    document.head.appendChild(ogDesc);
  }
  ogDesc.setAttribute('content', config.description);

  // Update Canonical URL
  let canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    document.head.appendChild(canonical);
  }
  const canonicalHref = config.canonicalPath ? `${baseUrl}${config.canonicalPath}` : window.location.href;
  canonical.setAttribute('href', canonicalHref);

  // Update Robots Meta Tag (Non-indexable utility views are flagged noindex)
  const isUtilityView = ['search-results', 'my-pantry', 'shopping-list', 'admin-ads'].includes(view);
  let robotsMeta = document.querySelector('meta[name="robots"]');
  if (!robotsMeta) {
    robotsMeta = document.createElement('meta');
    robotsMeta.setAttribute('name', 'robots');
    document.head.appendChild(robotsMeta);
  }
  robotsMeta.setAttribute('content', isUtilityView ? 'noindex, nofollow' : 'index, follow');

  // Update Schema.org JSON-LD Structured Data
  let ldJson = document.querySelector('script[id="dynamic-ld-json"]');
  if (!ldJson) {
    ldJson = document.createElement('script');
    ldJson.setAttribute('id', 'dynamic-ld-json');
    ldJson.setAttribute('type', 'application/ld+json');
    document.head.appendChild(ldJson);
  }
  if (config.structuredData) {
    ldJson.textContent = JSON.stringify(config.structuredData);
  } else {
    ldJson.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": config.title,
      "description": config.description
    });
  }
}

export function setPageSeo(titleOrView: string | Ingredient, descriptionOrDetail?: string | Ingredient | null): void {
  if (typeof titleOrView === 'string' && typeof descriptionOrDetail === 'string') {
    document.title = titleOrView;
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', descriptionOrDetail);

    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (!ogTitle) {
      ogTitle = document.createElement('meta');
      ogTitle.setAttribute('property', 'og:title');
      document.head.appendChild(ogTitle);
    }
    ogTitle.setAttribute('content', titleOrView);

    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (!ogDesc) {
      ogDesc = document.createElement('meta');
      ogDesc.setAttribute('property', 'og:description');
      document.head.appendChild(ogDesc);
    }
    ogDesc.setAttribute('content', descriptionOrDetail);
    return;
  }

  updatePageSEO(titleOrView, descriptionOrDetail as Ingredient | null);
}
