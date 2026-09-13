import React, { useState, useEffect } from 'react';
import { Ingredient, CulinaryMasterclass } from '../types';
import { X, Trash2, ArrowRight, ArrowLeft, Bookmark, Download, ChefHat, Play, Clock, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { IngredientImage } from './IngredientImage';

interface SavedCellarDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  savedIngredients: Ingredient[];
  savedRecipes?: CulinaryMasterclass[];
  onRemove: (id: string) => void;
  onRemoveRecipe?: (recipeId: string) => void;
  onSelect: (ingredient: Ingredient) => void;
  onSelectRecipe?: (recipe: CulinaryMasterclass) => void;
  onCookRecipe?: (recipe: CulinaryMasterclass) => void;
  onNavigateToRecipesArchive?: () => void;
  onClearAll: () => void;
}

export const SavedCellarDrawer: React.FC<SavedCellarDrawerProps> = ({
  isOpen,
  onClose,
  savedIngredients,
  savedRecipes = [],
  onRemove,
  onRemoveRecipe,
  onSelect,
  onSelectRecipe,
  onCookRecipe,
  onNavigateToRecipesArchive,
  onClearAll
}) => {
  const [activeTab, setActiveTab] = useState<'ingredients' | 'recipes'>('ingredients');

  // Keyboard listener: Escape to go back / close
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const exportPantry = () => {
    const dataToExport = {
      exportedAt: new Date().toISOString(),
      savedIngredients,
      savedRecipes
    };
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(dataToExport, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "stassens-cellar-selection.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="saved-cellar-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-50 overflow-hidden bg-black/80 backdrop-blur-sm flex justify-end"
          onClick={onClose}
        >
          <motion.div
            key="saved-cellar-drawer-panel"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg bg-[#121212] border-l border-[#F5F5F0]/15 h-full flex flex-col justify-between shadow-2xl p-6 sm:p-8 overflow-hidden"
          >
            {/* Header */}
            <div className="flex flex-col flex-1 overflow-hidden">
              <div className="flex items-center justify-between pb-4 border-b border-[#F5F5F0]/10 mb-4">
                <div className="flex items-center space-x-2.5">
                  <button
                    id="cellar-back-btn"
                    onClick={onClose}
                    className="flex items-center space-x-1 px-2.5 py-1 rounded bg-[#222] hover:bg-[#2e2e2e] border border-[#F5F5F0]/15 text-[#F5F5F0] hover:text-[#C5A059] text-xs font-mono mr-1"
                    title="Return (Esc)"
                  >
                    <ArrowLeft className="w-3.5 h-3.5 text-[#C5A059]" />
                    <span>Back</span>
                  </button>
                  <Bookmark className="w-4 h-4 text-[#C5A059] fill-current hidden sm:block" />
                  <h3 className="font-serif text-xl sm:text-2xl text-[#F5F5F0]">Saved Cellar</h3>
                </div>
                <button
                  onClick={onClose}
                  className="p-1.5 text-[#F5F5F0]/60 hover:text-white rounded hover:bg-white/5"
                  title="Close (Esc)"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Dual Tab Switcher */}
              <div className="flex border-b border-[#F5F5F0]/10 mb-4">
                <button
                  onClick={() => setActiveTab('ingredients')}
                  className={`flex-1 py-2 text-xs uppercase tracking-wider font-semibold border-b-2 transition-all flex items-center justify-center space-x-1.5 ${
                    activeTab === 'ingredients'
                      ? 'border-[#C5A059] text-[#C5A059] bg-[#C5A059]/5'
                      : 'border-transparent text-[#F5F5F0]/50 hover:text-[#F5F5F0]'
                  }`}
                >
                  <span>Specimens ({savedIngredients.length})</span>
                </button>
                <button
                  onClick={() => setActiveTab('recipes')}
                  className={`flex-1 py-2 text-xs uppercase tracking-wider font-semibold border-b-2 transition-all flex items-center justify-center space-x-1.5 ${
                    activeTab === 'recipes'
                      ? 'border-[#C5A059] text-[#C5A059] bg-[#C5A059]/5'
                      : 'border-transparent text-[#F5F5F0]/50 hover:text-[#F5F5F0]'
                  }`}
                >
                  <ChefHat className="w-3.5 h-3.5" />
                  <span>Saved Recipes ({savedRecipes.length})</span>
                </button>
              </div>

              {/* Ingredients Tab Content */}
              {activeTab === 'ingredients' && (
                <div className="flex-1 overflow-y-auto pr-1">
                  <p className="text-xs text-[#F5F5F0]/60 mb-4 font-light leading-relaxed">
                    Your private curation of rare botanicals and culinary extracts ({savedIngredients.length} saved).
                  </p>

                  {savedIngredients.length === 0 ? (
                    <div className="py-16 text-center border border-dashed border-[#F5F5F0]/10 p-6 bg-[#161616]">
                      <Bookmark className="w-8 h-8 text-[#C5A059] mx-auto mb-3 opacity-40" />
                      <p className="font-serif text-lg text-[#F5F5F0] mb-1">No Saved Ingredients</p>
                      <p className="text-xs text-[#F5F5F0]/50">
                        Click the bookmark icon on any ingredient card to save it to your private collection.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {savedIngredients.map((item) => (
                        <div
                          key={item.id}
                          className="group flex items-center justify-between p-3 bg-[#181818] border border-[#F5F5F0]/10 hover:border-[#C5A059]/40 transition-all"
                        >
                          <div
                            onClick={() => {
                              onSelect(item);
                              onClose();
                            }}
                            className="flex items-center space-x-3 cursor-pointer flex-1 overflow-hidden"
                          >
                            <div className="w-12 h-12 shrink-0 border border-[#F5F5F0]/10 overflow-hidden relative">
                              <IngredientImage
                                ingredient={item}
                                alt={item.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="overflow-hidden">
                              <h4 className="font-serif text-base text-[#F5F5F0] group-hover:text-[#C5A059] transition-colors truncate">
                                {item.name}
                              </h4>
                              <p className="text-[10px] uppercase tracking-wider opacity-40 truncate">
                                {item.category} • {item.season}
                              </p>
                            </div>
                          </div>

                          <button
                            onClick={() => onRemove(item.id)}
                            className="p-2 text-[#F5F5F0]/40 hover:text-[#e05a5a] transition-colors"
                            title="Remove from cellar"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Recipes Tab Content */}
              {activeTab === 'recipes' && (
                <div className="flex-1 overflow-y-auto pr-1">
                  <p className="text-xs text-[#F5F5F0]/60 mb-4 font-light leading-relaxed">
                    Your saved haute masterclasses from the 1,000+ recipe matrix ({savedRecipes.length} saved).
                  </p>

                  {savedRecipes.length === 0 ? (
                    <div className="py-16 text-center border border-dashed border-[#F5F5F0]/10 p-6 bg-[#161616]">
                      <ChefHat className="w-8 h-8 text-[#C5A059] mx-auto mb-3 opacity-40" />
                      <p className="font-serif text-lg text-[#F5F5F0] mb-1">No Saved Recipes Yet</p>
                      <p className="text-xs text-[#F5F5F0]/50 mb-4">
                        Bookmark recipes in the 1,000+ Masterclass Archive to save and cook them anytime.
                      </p>
                      {onNavigateToRecipesArchive && (
                        <button
                          onClick={() => {
                            onNavigateToRecipesArchive();
                            onClose();
                          }}
                          className="px-4 py-2 bg-[#C5A059] text-black text-xs font-semibold uppercase tracking-wider hover:bg-[#d8b46a] transition-all inline-flex items-center space-x-1.5"
                        >
                          <span>Explore 1,000+ Archive</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {savedRecipes.map((recipe) => (
                        <div
                          key={recipe.id}
                          className="group flex flex-col p-3.5 bg-[#181818] border border-[#F5F5F0]/10 hover:border-[#C5A059]/40 transition-all gap-2.5"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex-1 overflow-hidden">
                              <span className="text-[9px] uppercase tracking-wider text-[#C5A059] font-medium block">
                                {recipe.cuisine || 'Haute Cuisine'} • {recipe.overallDurationFormatted}
                              </span>
                              <h4 className="font-serif text-sm sm:text-base text-[#F5F5F0] group-hover:text-[#C5A059] transition-colors leading-snug">
                                {recipe.dishTitle}
                              </h4>
                              <span className="text-[10px] text-[#F5F5F0]/50 block mt-0.5">
                                Key: {recipe.primaryIngredientName}
                              </span>
                            </div>

                            {onRemoveRecipe && (
                              <button
                                onClick={() => onRemoveRecipe(recipe.id)}
                                className="p-1.5 text-[#F5F5F0]/40 hover:text-red-400 transition-colors"
                                title="Remove recipe"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>

                          <div className="flex items-center justify-between pt-2 border-t border-[#F5F5F0]/10 text-xs">
                            <span className="text-[10px] font-mono text-[#F5F5F0]/40">
                              {recipe.difficulty}
                            </span>
                            {onCookRecipe && (
                              <button
                                onClick={() => {
                                  onCookRecipe(recipe);
                                  onClose();
                                }}
                                className="px-3 py-1 bg-[#C5A059] text-black font-semibold text-[11px] uppercase tracking-wider hover:bg-[#d8b46a] transition-all flex items-center space-x-1"
                              >
                                <Play className="w-2.5 h-2.5 fill-current" />
                                <span>Cook Masterclass</span>
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Footer actions */}
            {(savedIngredients.length > 0 || savedRecipes.length > 0) && (
              <div className="pt-4 border-t border-[#F5F5F0]/10 space-y-2 mt-4">
                <button
                  onClick={exportPantry}
                  className="w-full flex items-center justify-center space-x-2 py-2.5 bg-[#C5A059] text-[#121212] text-xs uppercase tracking-[0.2em] font-semibold hover:bg-[#d6ba94] transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>Export Saved Cellar (JSON)</span>
                </button>

                <button
                  onClick={onClearAll}
                  className="w-full py-1.5 text-center text-[10px] uppercase tracking-widest text-[#F5F5F0]/40 hover:text-[#e05a5a] transition-colors"
                >
                  Clear All Saved Items
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
