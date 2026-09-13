import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, ExternalLink, ShieldCheck, Flame, Star, Gift, ArrowRight } from 'lucide-react';
import { AppView } from '../types';
import { SafeImage } from './SafeImage';
import { GLOBAL_CULINARY_FALLBACK } from '../utils/imageFallback';

interface PageAdConfig {
  id: string;
  sponsorName: string;
  badge: string;
  title: string;
  headline: string;
  description: string;
  offerText: string;
  ctaText: string;
  smartlinkUrl: string;
  imageUrl: string;
  accentColor: string;
}

const PAGE_ADS: Record<string, PageAdConfig> = {
  home: {
    id: 'ad-home-pass',
    sponsorName: 'Haute Terroirs Syndicate',
    badge: '★ VIP Welcome Access',
    title: 'Global Gastronomy Grand Pass 2026',
    headline: 'Unlock Direct Cellar & Forager Access',
    description: 'Gain priority allocations of 3-Star Michelin seasonal truffles, Japanese A5 Kagoshima Wagyu, and rare solera-aged vinegars with guaranteed temperature-controlled express transit.',
    offerText: 'Complimentary First-Allocation Terroir Tasting Kit with enrollment',
    ctaText: 'Claim VIP Epicurean Pass',
    smartlinkUrl: 'https://pl31110471.profitableratecpmnetwork.com/7d/46/8e/7d468e21cc1f5c305e280080c5ea4fe0.js',
    imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1000&auto=format&fit=crop',
    accentColor: '#C5A059'
  },
  'recipes-archive': {
    id: 'ad-recipes-knives',
    sponsorName: 'Sakai Damascus Guild',
    badge: '★ Master Atelier Selection',
    title: 'Hand-Forged 100-Layer Damascus Master Blades',
    headline: 'Precision Cutlery for Haute Gastronomy',
    description: 'Forged in Sakai, Japan with high-carbon VG-10 core steel. Engineered for micron-thin truffles, sashimi kobujime slicing, and effortless fine culinary prep.',
    offerText: 'Includes custom walnut saya sheath & whetstone kit',
    ctaText: 'Explore Master Knife Atelier',
    smartlinkUrl: 'https://pl31110474.profitableratecpmnetwork.com/8a/6b/71/8a6b7143334202e20dea4259df7595da.js',
    imageUrl: 'https://images.unsplash.com/photo-1593618998160-e34014e67546?q=80&w=1000&auto=format&fit=crop',
    accentColor: '#E6A15C'
  },
  collection: {
    id: 'ad-collection-truffle',
    sponsorName: 'Alba Tartufi Heritage',
    badge: '★ Direct Forest Forager',
    title: 'Piedmont White Alba Truffle Private Reserve',
    headline: 'Certified Fresh Italian Winter Harvest',
    description: 'Direct shipment within 36 hours of excavation from the Langhe hills. Certified ISO-authenticated Tuber Magnatum Pico with full terroir origin traceability.',
    offerText: 'Direct truffle hunting dispatch & wooden storage box',
    ctaText: 'Access Alba Truffle Harvest',
    smartlinkUrl: 'https://pl31110471.profitableratecpmnetwork.com/7d/46/8e/7d468e21cc1f5c305e280080c5ea4fe0.js',
    imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1000&auto=format&fit=crop',
    accentColor: '#D4AF37'
  },
  locations: {
    id: 'ad-locations-residency',
    sponsorName: 'Terroir Expeditions Ltd',
    badge: '★ Culinary Travel Guild',
    title: 'Kyoto & Modena Masterclass Culinary Residency',
    headline: 'Immersion in Ancient Gastronomic Capitals',
    description: 'Join master chefs for a 7-day culinary expedition through Nagano pine forests, Kyoto Kaiseki teahouses, and Modena 100-year balsamic acetaie cellars.',
    offerText: 'Limited to 12 guest artisans per seasonal expedition',
    ctaText: 'Reserve Residency Portfolio',
    smartlinkUrl: 'https://pl31110474.profitableratecpmnetwork.com/8a/6b/71/8a6b7143334202e20dea4259df7595da.js',
    imageUrl: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=1000&auto=format&fit=crop',
    accentColor: '#C5A059'
  },
  calendar: {
    id: 'ad-calendar-solstice',
    sponsorName: 'Solstice Botanical Guild',
    badge: '★ Seasonal Harvest Vault',
    title: 'First-Cold Extraction Greek & Iberian Harvest',
    headline: 'Single-Estate Early Crop EVOO & Saffron Guild',
    description: 'Secure your share of ultra-high polyphenol (800+ mg/kg) Kalamata and Andalusian olive oils, pressed within 4 hours of picking during October harvest.',
    offerText: 'Delivered in UV-protected obsidian glass amphoras',
    ctaText: 'Join Seasonal Harvest Club',
    smartlinkUrl: 'https://pl31110471.profitableratecpmnetwork.com/7d/46/8e/7d468e21cc1f5c305e280080c5ea4fe0.js',
    imageUrl: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?q=80&w=1000&auto=format&fit=crop',
    accentColor: '#84CC16'
  },
  pantry: {
    id: 'ad-pantry-cellar',
    sponsorName: 'Sommelier Vault Systems',
    badge: '★ Grand Cru Cellar Tech',
    title: 'Smart Precision Cellar & Terroir Locker',
    headline: 'Preserve Fragile Volatiles & Vintage Vintages',
    description: 'Precision temperature, ultrasonic humidity, and nitrogen preservation systems designed for high-value botanical ingredients and rare Grand Cru wines.',
    offerText: 'Complimentary Sommelier AI Cellar Audit included',
    ctaText: 'Upgrade Cellar Storage',
    smartlinkUrl: 'https://pl31110474.profitableratecpmnetwork.com/8a/6b/71/8a6b7143334202e20dea4259df7595da.js',
    imageUrl: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=1000&auto=format&fit=crop',
    accentColor: '#A855F7'
  },
  'shopping-list': {
    id: 'ad-shopping-express',
    sponsorName: 'Epicurean Express Direct',
    badge: '★ Farm-To-Table Dispatch',
    title: 'Single-Source Artisanal Pantry Express',
    headline: 'Get 100% of Your Recipe Ingredients Delivered',
    description: 'Eliminate middlemen. One-click fulfillment of your curated shopping list with authentic PDO cheeses, single-origin saffron, and fresh botanicals.',
    offerText: 'Free refrigerated courier delivery on all first orders',
    ctaText: 'Fulfill My Pantry List',
    smartlinkUrl: 'https://pl31110471.profitableratecpmnetwork.com/7d/46/8e/7d468e21cc1f5c305e280080c5ea4fe0.js',
    imageUrl: 'https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1000&auto=format&fit=crop',
    accentColor: '#F59E0B'
  },
  about: {
    id: 'ad-about-institute',
    sponsorName: 'International Gastronomy Academy',
    badge: '★ Master Certification',
    title: 'Executive Master of Terroir & Culinary Arts',
    headline: 'World-Class Certification for Serious Epicureans',
    description: 'Learn sensory evaluation, precision culinary chemistry, and traditional fermentation arts directly from Michelin-laureate master chefs.',
    offerText: 'Scholarship enrollment open for autumn semester',
    ctaText: 'Download Academy Prospectus',
    smartlinkUrl: 'https://pl31110474.profitableratecpmnetwork.com/8a/6b/71/8a6b7143334202e20dea4259df7595da.js',
    imageUrl: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=1000&auto=format&fit=crop',
    accentColor: '#38BDF8'
  }
};

interface PageAdPopupProps {
  currentView: AppView;
}

export const PageAdPopup: React.FC<PageAdPopupProps> = ({ currentView }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [adConfig, setAdConfig] = useState<PageAdConfig | null>(null);
  const [hasInteracted, setHasInteracted] = useState(false);

  // When page view changes, show the corresponding unique ad for that page
  useEffect(() => {
    const viewKey = currentView || 'home';
    const config = PAGE_ADS[viewKey] || PAGE_ADS.home;
    
    // Check if user already dismissed this specific page ad in current session
    const dismissedKey = `ad_dismissed_${viewKey}`;
    const wasDismissed = sessionStorage.getItem(dismissedKey);

    if (!wasDismissed) {
      setAdConfig(config);
      // Subtle delay before displaying ad so user sees page transition smoothly
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 700);

      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
    }
  }, [currentView]);

  const handleClose = () => {
    if (adConfig) {
      sessionStorage.setItem(`ad_dismissed_${currentView}`, 'true');
    }
    setIsVisible(false);
  };

  const handleCtaClick = () => {
    if (!adConfig) return;
    setHasInteracted(true);
    
    // Mark as dismissed for session
    sessionStorage.setItem(`ad_dismissed_${currentView}`, 'true');
    
    // Open destination smartlink in new window
    try {
      window.open(adConfig.smartlinkUrl, '_blank', 'noopener,noreferrer');
    } catch (e) {
      console.warn('Smartlink trigger:', e);
    }

    setIsVisible(false);
  };

  if (!isVisible || !adConfig) return null;

  return (
    <AnimatePresence>
      <div
        id="page-ad-overlay"
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md"
        onClick={handleClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-xl bg-[#181818] border-2 border-[#C5A059]/60 shadow-2xl rounded-2xl overflow-hidden flex flex-col relative"
        >
          {/* Top Banner Tag */}
          <div className="bg-[#121212] px-4 py-2 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#C5A059] font-bold">
                {adConfig.sponsorName} • SPONSORED PARTNER
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={handleClose}
                className="flex items-center space-x-1 px-2 py-0.5 rounded bg-white/5 hover:bg-white/10 text-white/60 hover:text-[#C5A059] text-[10px] font-mono transition-colors"
                title="Hide ad (resumes after your next action)"
                aria-label="Hide advertisement until next press"
              >
                <span>Hide</span>
              </button>

              <button
                onClick={handleClose}
                className="p-1 rounded-lg bg-[#222] hover:bg-[#333] text-white/70 hover:text-white transition-colors"
                title="Close Ad"
                aria-label="Close Advertisement"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Hero Visual Area */}
          <div className="relative h-44 sm:h-52 w-full overflow-hidden bg-black">
            <SafeImage
              src={adConfig.imageUrl}
              alt={adConfig.title}
              fallbackSrc={GLOBAL_CULINARY_FALLBACK}
              className="w-full h-full object-cover brightness-90 hover:scale-105 transition-transform duration-700"
              containerClassName="w-full h-full"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-black/40 to-transparent"></div>

            {/* Floating Badge */}
            <div className="absolute top-3 left-3 px-3 py-1 bg-black/80 border border-[#C5A059] text-[#C5A059] font-mono text-[10px] font-bold uppercase tracking-wider shadow-lg flex items-center space-x-1.5">
              <Sparkles className="w-3 h-3 text-[#C5A059]" />
              <span>{adConfig.badge}</span>
            </div>

            {/* Bottom In-Image Title */}
            <div className="absolute bottom-3 left-4 right-4">
              <h3 className="text-xl sm:text-2xl font-serif italic text-white font-bold drop-shadow-md leading-tight">
                {adConfig.title}
              </h3>
              <p className="text-xs text-[#C5A059] font-mono font-medium drop-shadow">
                {adConfig.headline}
              </p>
            </div>
          </div>

          {/* Ad Description & Value Proposition */}
          <div className="p-5 sm:p-6 space-y-4 bg-[#181818]">
            <p className="text-xs sm:text-sm text-[#F5F5F0]/85 font-sans leading-relaxed">
              {adConfig.description}
            </p>

            {/* Special Offer Box */}
            <div className="p-3 rounded-xl bg-black/60 border border-[#C5A059]/40 flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-[#C5A059]/15 text-[#C5A059] shrink-0">
                <Gift className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <span className="text-[9px] uppercase tracking-wider text-[#C5A059] font-mono font-bold block">
                  Exclusive Reader Privilege
                </span>
                <span className="text-xs text-white font-medium">
                  {adConfig.offerText}
                </span>
              </div>
            </div>

            {/* Actions: Primary CTA and Dismiss */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              <button
                id="page-ad-cta-btn"
                onClick={handleCtaClick}
                className="w-full sm:flex-1 py-3 px-5 rounded-xl bg-gradient-to-r from-[#C5A059] to-[#E6A15C] hover:from-[#d6b168] hover:to-[#f0b070] text-black font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-2 shadow-xl shadow-amber-900/20 transition-all duration-200 active:scale-95"
              >
                <span>{adConfig.ctaText}</span>
                <ExternalLink className="w-4 h-4" />
              </button>

              <button
                onClick={handleClose}
                className="w-full sm:w-auto py-3 px-4 rounded-xl bg-[#242424] hover:bg-[#2e2e2e] text-white/70 hover:text-white font-mono text-xs font-medium uppercase tracking-wider transition-colors border border-white/10"
              >
                Continue Reading
              </button>
            </div>

            {/* Footer Assurance */}
            <div className="flex items-center justify-between text-[9px] font-mono text-white/40 pt-1 border-t border-white/5">
              <span className="flex items-center space-x-1">
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                <span>Verified Gastronomy Partner</span>
              </span>
              <span>Adsterra High-Yield Network</span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
