import React, { useState } from 'react';
import {
  Compass,
  Film,
  Sparkles,
  BookOpen,
  MapPin,
  Calendar,
  Bookmark,
  Database,
  Shield,
  Search,
  ChevronRight,
  ChevronDown,
  X,
  Play,
  CheckCircle2,
  Maximize2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Ingredient } from '../types';

interface FeaturePreviewDockProps {
  onNavigate: (sectionId: string) => void;
  onOpenSpecimen: (ingredient: Ingredient) => void;
  sampleIngredient: Ingredient;
  onOpenSavedCellar: () => void;
  onOpenDataModal: () => void;
  onOpenAdminModal: () => void;
  onOpenMasterclass?: (ingredient?: Ingredient) => void;
  onFocusSearch: () => void;
  onFilterCategory: (category: string) => void;
  onFilterSeason: (season: string) => void;
}

export const FeaturePreviewDock: React.FC<FeaturePreviewDockProps> = ({
  onNavigate,
  onOpenSpecimen,
  sampleIngredient,
  onOpenSavedCellar,
  onOpenDataModal,
  onOpenAdminModal,
  onOpenMasterclass,
  onFocusSearch,
  onFilterCategory,
  onFilterSeason,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTourStep, setActiveTourStep] = useState<number | null>(null);

  const features = [
    {
      id: 'culinary-masterclasses',
      title: 'Haute Cuisine Masterclasses',
      description: 'AI-generated 3-star culinary lessons with precise chronological timelines, tool blueprints, and acoustic soundscapes.',
      icon: Sparkles,
      action: () => {
        if (onOpenMasterclass) onOpenMasterclass(sampleIngredient);
      },
      tag: 'Grand Atelier',
    },
    {
      id: 'gallery-videos',
      title: 'Video Showcase & Live Cards',
      description: 'Filterable grid where cards stream looping video loops on hover.',
      icon: Film,
      action: () => {
        onNavigate('collection');
        onFilterCategory('All Categories');
      },
      tag: 'Interactive Gallery',
    },
    {
      id: 'specimen-modal',
      title: 'Specimen Detail Cinema Modal',
      description: 'Photo/video carousel, flavor profile graphs, culinary pairings, & terroir links.',
      icon: Maximize2,
      action: () => {
        onOpenSpecimen(sampleIngredient);
      },
      tag: 'Detailed View',
    },
    {
      id: 'seasonal-storytelling',
      title: 'Seasonal Storytelling Almanac',
      description: 'Dynamic editorial narratives, harvest rituals, & flavor chemistry per season.',
      icon: Sparkles,
      action: () => onNavigate('seasonal-storytelling'),
      tag: 'New Feature',
    },
    {
      id: 'world-locations',
      title: 'World Terroirs & Regions',
      description: 'Geographic distribution across Europe, Asia, Sub-Polar, and the Americas.',
      icon: MapPin,
      action: () => onNavigate('locations'),
      tag: 'Geography',
    },
    {
      id: 'harvest-seasons',
      title: 'Phenological Harvest Calendar',
      description: '4-Season cyclical harvest wheel with peak months and ingredient links.',
      icon: Calendar,
      action: () => onNavigate('seasons'),
      tag: 'Almanac',
    },
    {
      id: 'curator-journal',
      title: "Curator's Field Dispatches",
      description: 'Deep editorial essays on foraging rituals, barrel aging, and terroir chemistry.',
      icon: BookOpen,
      action: () => onNavigate('journal'),
      tag: 'Editorial',
    },
    {
      id: 'saved-cellar',
      title: 'Saved Cellar & Bookmarks',
      description: 'Personal collection drawer to bookmark specimens, review tasting notes, & export.',
      icon: Bookmark,
      action: onOpenSavedCellar,
      tag: 'Personal Vault',
    },
    {
      id: 'dataset-manager',
      title: '100+ Ingredients JSON Manager',
      description: 'Plug-in custom datasets, import/export schema JSON, and reset catalog.',
      icon: Database,
      action: onOpenDataModal,
      tag: 'Data Pipeline',
    },
    {
      id: 'curator-admin',
      title: 'Curator Admin & Gmail Milestones',
      description: 'Firestore live visitor counter, +50 visit simulations, & Gmail notifications.',
      icon: Shield,
      action: onOpenAdminModal,
      tag: 'Admin & Telemetry',
    },
  ];

  const runGuidedTour = async () => {
    setIsOpen(false);
    // Step 1: Scroll to Showcase
    onNavigate('collection');
    await new Promise((r) => setTimeout(r, 1200));

    // Step 2: Open Specimen Modal
    onOpenSpecimen(sampleIngredient);
    await new Promise((r) => setTimeout(r, 2200));

    // Step 3: Scroll to Seasonal Storytelling
    onNavigate('seasonal-storytelling');
    await new Promise((r) => setTimeout(r, 1500));

    // Step 4: Scroll to Locations
    onNavigate('locations');
    await new Promise((r) => setTimeout(r, 1500));

    // Step 5: Open Admin Modal
    onOpenAdminModal();
  };

  return (
    <aside aria-label="Feature Preview Explorer" className="fixed bottom-6 right-6 z-40">
      {/* Trigger Floating Pill */}
      <motion.button
        id="preview-features-trigger"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className="flex items-center space-x-2.5 px-4 py-2.5 bg-[#C5A059] text-[#121212] font-semibold text-xs uppercase tracking-widest shadow-2xl shadow-black/80 hover:bg-[#d6ba94] transition-all cursor-pointer rounded-full border border-[#121212]/40"
      >
        <Compass className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-90' : ''}`} />
        <span>Explore All Features</span>
        <span className="w-5 h-5 rounded-full bg-[#121212] text-[#C5A059] text-[10px] flex items-center justify-center font-bold">
          {features.length}
        </span>
      </motion.button>

      {/* Feature Menu Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="feature-dock-panel"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="absolute bottom-14 right-0 w-[360px] sm:w-[420px] max-h-[80vh] bg-[#141414] border border-[#C5A059]/40 shadow-2xl shadow-black/90 p-5 overflow-y-auto text-[#F5F5F0]"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-[#F5F5F0]/10 mb-3">
              <div>
                <span className="text-[9px] uppercase tracking-[0.3em] text-[#C5A059] font-bold block">
                  Interactive Preview Hub
                </span>
                <h4 className="font-serif text-lg text-[#F5F5F0]">
                  Stassen's Archive Capabilities
                </h4>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-[#F5F5F0]/60 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Quick 1-Click Guided Tour Button */}
            <button
              onClick={runGuidedTour}
              className="w-full flex items-center justify-center space-x-2 py-2.5 px-3 bg-[#C5A059]/15 hover:bg-[#C5A059]/25 border border-[#C5A059]/40 text-[#C5A059] text-xs uppercase tracking-wider font-semibold mb-4 transition-colors"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Launch 1-Click Guided Feature Tour</span>
            </button>

            {/* Feature List Grid */}
            <div className="space-y-2">
              {features.map((feat) => {
                const Icon = feat.icon;
                return (
                  <div
                    key={feat.id}
                    onClick={() => {
                      feat.action();
                      setIsOpen(false);
                    }}
                    className="p-3 bg-[#1A1A1A] hover:bg-[#222222] border border-[#F5F5F0]/5 hover:border-[#C5A059]/50 transition-all cursor-pointer group flex items-start space-x-3 text-left"
                  >
                    <div className="p-2 bg-[#121212] border border-[#F5F5F0]/10 group-hover:border-[#C5A059]/40 group-hover:text-[#C5A059] text-[#F5F5F0]/70 transition-colors shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="font-serif text-xs sm:text-sm text-[#F5F5F0] group-hover:text-[#C5A059] transition-colors truncate">
                          {feat.title}
                        </span>
                        <span className="text-[8px] uppercase tracking-wider px-1.5 py-0.2 bg-[#C5A059]/10 text-[#C5A059] border border-[#C5A059]/20 shrink-0 ml-2">
                          {feat.tag}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#F5F5F0]/60 font-light mt-0.5 line-clamp-1 leading-snug">
                        {feat.description}
                      </p>
                    </div>

                    <ChevronRight className="w-4 h-4 text-[#F5F5F0]/30 group-hover:text-[#C5A059] group-hover:translate-x-0.5 transition-all shrink-0 self-center" />
                  </div>
                );
              })}
            </div>

            <div className="pt-3 mt-3 border-t border-[#F5F5F0]/10 flex items-center justify-between text-[9px] uppercase tracking-wider text-[#F5F5F0]/40">
              <span>Press ⌘K for instant search</span>
              <span className="text-[#C5A059]">All Systems Active</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </aside>
  );
};
