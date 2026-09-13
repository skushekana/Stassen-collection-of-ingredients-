import React from 'react';
import { Compass, BookOpen, Flame, MapPin, Calendar, ShoppingBag, Bookmark, Sparkles, HelpCircle } from 'lucide-react';

interface QuickNavigatorHubProps {
  activeSection: string;
  onNavigate: (section: string) => void;
  onOpenGuide: () => void;
  savedCount: number;
  shoppingListCount: number;
}

export const QuickNavigatorHub: React.FC<QuickNavigatorHubProps> = ({
  activeSection,
  onNavigate,
  onOpenGuide,
  savedCount,
  shoppingListCount,
}) => {
  return (
    <div
      id="quick-navigator-hub"
      className="w-full bg-[#141414] border-y border-[#F5F5F0]/10 py-2.5 px-4 sticky top-[60px] sm:top-[68px] z-30 shadow-md backdrop-blur-md bg-[#141414]/90"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 overflow-x-auto scrollbar-none">
        <div className="flex items-center space-x-1.5 shrink-0 text-xs font-mono">
          <span className="text-[#C5A059] uppercase tracking-wider text-[10px] font-bold hidden sm:inline mr-1">
            Quick Hub:
          </span>

          <button
            id="hub-link-collection"
            onClick={() => onNavigate('collection')}
            className={`flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs transition-all ${
              activeSection === 'collection'
                ? 'bg-[#C5A059] text-black font-semibold'
                : 'bg-[#202020] text-[#F5F5F0]/80 hover:text-white hover:bg-[#282828]'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>19+ Collection</span>
          </button>

          <button
            id="hub-link-recipes"
            onClick={() => onNavigate('recipes-archive')}
            className={`flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs transition-all ${
              activeSection === 'recipes-archive'
                ? 'bg-[#C5A059] text-black font-semibold'
                : 'bg-[#202020] text-[#C5A059] hover:bg-[#282828]'
            }`}
          >
            <Flame className="w-3.5 h-3.5 text-amber-400" />
            <span>1,000+ Recipes</span>
          </button>

          <button
            id="hub-link-locations"
            onClick={() => onNavigate('locations')}
            className={`flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs transition-all ${
              activeSection === 'locations'
                ? 'bg-[#C5A059] text-black font-semibold'
                : 'bg-[#202020] text-[#F5F5F0]/80 hover:text-white hover:bg-[#282828]'
            }`}
          >
            <MapPin className="w-3.5 h-3.5 text-blue-400" />
            <span>7 Terroirs</span>
          </button>

          <button
            id="hub-link-calendar"
            onClick={() => onNavigate('seasonal-calendar')}
            className={`flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs transition-all ${
              activeSection === 'seasonal-calendar'
                ? 'bg-[#C5A059] text-black font-semibold'
                : 'bg-[#202020] text-[#F5F5F0]/80 hover:text-white hover:bg-[#282828]'
            }`}
          >
            <Calendar className="w-3.5 h-3.5 text-rose-400" />
            <span>Harvest Calendar</span>
          </button>

          <button
            id="hub-link-shopping"
            onClick={() => onNavigate('shopping-list')}
            className={`flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs transition-all ${
              activeSection === 'shopping-list'
                ? 'bg-[#C5A059] text-black font-semibold'
                : 'bg-[#202020] text-[#F5F5F0]/80 hover:text-white hover:bg-[#282828]'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5 text-emerald-400" />
            <span>Shopping List</span>
            {shoppingListCount > 0 && (
              <span className="ml-0.5 px-1.5 py-0.2 rounded-full bg-emerald-500 text-white text-[10px] font-bold">
                {shoppingListCount}
              </span>
            )}
          </button>

          <button
            id="hub-link-pantry"
            onClick={() => onNavigate('my-pantry')}
            className={`flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs transition-all ${
              activeSection === 'my-pantry'
                ? 'bg-[#C5A059] text-black font-semibold'
                : 'bg-[#202020] text-[#F5F5F0]/80 hover:text-white hover:bg-[#282828]'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>My Cellar</span>
            {savedCount > 0 && (
              <span className="ml-0.5 px-1.5 py-0.2 rounded-full bg-[#C5A059] text-black text-[10px] font-bold">
                {savedCount}
              </span>
            )}
          </button>
        </div>

        {/* How to Use Guide button */}
        <div className="shrink-0 flex items-center">
          <button
            id="hub-open-guide-btn"
            onClick={onOpenGuide}
            className="flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#C5A059]/15 border border-[#C5A059]/40 text-[#C5A059] hover:bg-[#C5A059] hover:text-black transition-all text-xs font-semibold"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>How To Use & Guide</span>
          </button>
        </div>
      </div>
    </div>
  );
};
