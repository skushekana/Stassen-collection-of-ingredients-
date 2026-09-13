import React, { useState } from 'react';
import {
  X,
  Sparkles,
  UtensilsCrossed,
  Wine,
  Flame,
  Printer,
  ShoppingBag,
  ArrowRight,
  RotateCcw,
  CheckCircle2,
  Share2,
  ChefHat
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CulinaryMasterclass } from '../types';
import { recipeService, CUISINE_REGIONS } from '../services/recipeService';
import { shoppingListService } from '../services/shoppingListService';
import { accessibilityService } from '../services/accessibilityService';
import { CulinaryImage } from './CulinaryImage';

interface TastingMenuModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCookRecipe: (recipe: CulinaryMasterclass) => void;
}

export const TastingMenuModal: React.FC<TastingMenuModalProps> = ({
  isOpen,
  onClose,
  onCookRecipe
}) => {
  const [courseCount, setCourseCount] = useState<3 | 5 | 7>(5);
  const [selectedCuisine, setSelectedCuisine] = useState<string>('All Cuisines');
  const [menu, setMenu] = useState(() => recipeService.buildTastingMenu(5, undefined));
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [addedShopCount, setAddedShopCount] = useState<number | null>(null);

  const handleRegenerate = (count = courseCount, cuisine = selectedCuisine) => {
    const newMenu = recipeService.buildTastingMenu(count, cuisine === 'All Cuisines' ? undefined : cuisine);
    setMenu(newMenu);
    setAddedShopCount(null);
    accessibilityService.speakText(`Curated ${newMenu.title}`);
  };

  const handleCourseCountChange = (count: 3 | 5 | 7) => {
    setCourseCount(count);
    handleRegenerate(count, selectedCuisine);
  };

  const handleCuisineChange = (cuisine: string) => {
    setSelectedCuisine(cuisine);
    handleRegenerate(courseCount, cuisine);
  };

  const handleAddAllToShoppingList = () => {
    let totalAdded = 0;
    menu.courses.forEach((c) => {
      totalAdded += shoppingListService.addRecipeIngredients(c.recipe);
    });
    setAddedShopCount(totalAdded);
    accessibilityService.speakText(`Added ${totalAdded} specialty ingredients to your shopping list.`);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    const text = `${menu.title}\n${menu.description}\n\nCourses:\n` +
      menu.courses.map((c, i) => `${i + 1}. ${c.courseName}: ${c.recipe.dishTitle} — Wine: ${c.winePairing}`).join('\n');
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
    accessibilityService.speakText('Tasting menu copied to clipboard');
  };

  if (!isOpen) return null;

  return (
    <div
      id="tasting-menu-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-5xl bg-[#141414] border border-[#C5A059]/40 sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
      >
        {/* Header */}
        <header className="px-6 py-5 border-b border-[#F5F5F0]/10 flex items-center justify-between bg-[#181818]">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-[#C5A059]/15 border border-[#C5A059]/40 flex items-center justify-center text-[#C5A059]">
              <UtensilsCrossed className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A059] font-mono font-bold">
                  Haute Gastronomy Atelier
                </span>
                <span className="px-2 py-0.5 rounded bg-amber-500/20 border border-amber-500/40 text-amber-300 text-[9px] font-mono uppercase font-semibold">
                  Michelin Calibrated
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-serif italic text-[#F5F5F0]">
                Chef&apos;s Degustation Tasting Menu
              </h2>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrint}
              className="p-2.5 rounded-xl bg-[#222] hover:bg-[#2c2c2c] border border-white/10 text-white/80 hover:text-[#C5A059] transition-colors"
              title="Print Menu Card"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              onClick={handleShare}
              className="p-2.5 rounded-xl bg-[#222] hover:bg-[#2c2c2c] border border-white/10 text-white/80 hover:text-[#C5A059] transition-colors"
              title="Copy Tasting Menu"
            >
              {isCopied ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
            </button>
            <button
              onClick={onClose}
              className="p-2.5 rounded-xl bg-[#222] hover:bg-[#2c2c2c] border border-white/10 text-white/80 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Controls Bar: Course Count & Cuisine Selector */}
        <div className="px-6 py-4 bg-[#101010] border-b border-[#F5F5F0]/10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-mono text-[#F5F5F0]/60 uppercase tracking-wider mr-1">
              Courses:
            </span>
            {([3, 5, 7] as const).map((count) => (
              <button
                key={count}
                onClick={() => handleCourseCountChange(count)}
                className={`px-3.5 py-1.5 rounded-xl font-mono text-xs font-bold transition-all ${
                  courseCount === count
                    ? 'bg-[#C5A059] text-black shadow-md shadow-[#C5A059]/20'
                    : 'bg-[#1e1e1e] border border-white/10 text-white/70 hover:text-white'
                }`}
              >
                {count} Courses
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-3">
            <select
              value={selectedCuisine}
              onChange={(e) => handleCuisineChange(e.target.value)}
              className="px-3.5 py-1.5 rounded-xl bg-[#1e1e1e] border border-white/15 text-xs font-mono text-[#F5F5F0] focus:outline-none focus:border-[#C5A059]"
            >
              {CUISINE_REGIONS.map((c) => (
                <option key={c} value={c} className="bg-[#141414] text-[#F5F5F0]">
                  {c}
                </option>
              ))}
            </select>

            <button
              onClick={() => handleRegenerate()}
              className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl bg-[#242424] hover:bg-[#2e2e2e] border border-[#C5A059]/40 text-[#C5A059] font-mono text-xs font-medium transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Shuffle Degustation</span>
            </button>
          </div>
        </div>

        {/* Menu Overview Banner */}
        <div className="p-6 bg-gradient-to-b from-[#181818] to-[#121212] border-b border-[#F5F5F0]/10 flex flex-wrap items-center justify-between gap-4">
          <div className="max-w-2xl">
            <h3 className="text-2xl font-serif italic text-[#C5A059] mb-1">
              {menu.title}
            </h3>
            <p className="text-xs text-[#F5F5F0]/70 font-sans leading-relaxed">
              {menu.description}
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <div className="text-right font-mono">
              <span className="text-[10px] text-[#F5F5F0]/50 uppercase tracking-widest block">
                Estimated Tasting
              </span>
              <span className="text-sm font-bold text-emerald-400">
                {menu.totalCalories} kcal total
              </span>
            </div>

            <button
              onClick={handleAddAllToShoppingList}
              className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#D97706] to-[#B45309] hover:from-[#F59E0B] hover:to-[#D97706] text-white font-mono text-xs font-bold uppercase tracking-wider shadow-lg shadow-amber-900/30 transition-transform active:scale-95"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>
                {addedShopCount !== null ? `Added (${addedShopCount}) Items` : 'Add All to Pantry List'}
              </span>
            </button>
          </div>
        </div>

        {/* Scrollable Course Cards */}
        <div className="flex-1 p-6 space-y-5 overflow-y-auto bg-[#101010]">
          {menu.courses.map((course, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-[#161616] border border-[#F5F5F0]/10 hover:border-[#C5A059]/40 transition-all flex flex-col md:flex-row gap-5 items-start md:items-center justify-between group"
            >
              <div className="flex items-start space-x-4 flex-1">
                {/* Course Image */}
                <div className="w-24 h-20 sm:w-28 sm:h-24 rounded-xl overflow-hidden bg-black shrink-0 border border-white/10 relative">
                  <CulinaryImage
                    recipe={course.recipe}
                    src={course.recipe.heroImageUrl}
                    alt={`${course.recipe.dishTitle} — Course ${idx + 1} (${course.courseName})`}
                    cuisine={course.recipe.cuisine}
                    category={course.recipe.primaryIngredientName}
                    priority={idx < 2}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    containerClassName="w-full h-full"
                  />
                  <div className="absolute top-1 left-1 px-1.5 py-0.5 rounded bg-black/80 font-mono text-[9px] text-[#C5A059] font-bold">
                    #{idx + 1}
                  </div>
                </div>

                {/* Course Details */}
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#C5A059] font-bold">
                      {course.courseName}
                    </span>
                    <span className="text-xs text-white/30">•</span>
                    <span className="text-[11px] font-mono text-white/60">
                      {course.recipe.totalPrepTimeMinutes + course.recipe.totalCookTimeMinutes} mins
                    </span>
                    <span className="text-xs text-white/30">•</span>
                    <span className="text-[11px] font-mono text-emerald-400">
                      {course.recipe.nutritionalProfile?.calories || 350} kcal
                    </span>
                  </div>

                  <h4 className="font-serif italic text-lg sm:text-xl text-[#F5F5F0] group-hover:text-[#C5A059] transition-colors leading-tight">
                    {course.recipe.dishTitle}
                  </h4>

                  {/* Sommelier Pairing Note */}
                  <div className="flex items-center space-x-2 text-xs text-amber-200/90 font-mono pt-1">
                    <Wine className="w-3.5 h-3.5 text-[#C5A059] shrink-0" />
                    <span className="truncate">Pairing: {course.winePairing}</span>
                  </div>
                </div>
              </div>

              {/* Cook Action */}
              <div className="shrink-0 w-full md:w-auto flex items-center justify-end">
                <button
                  onClick={() => {
                    onClose();
                    onCookRecipe(course.recipe);
                  }}
                  className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-[#222] hover:bg-[#C5A059] text-[#F5F5F0] hover:text-black font-mono text-xs font-bold uppercase tracking-wider transition-all duration-200 border border-white/10 hover:border-[#C5A059]"
                >
                  <ChefHat className="w-3.5 h-3.5" />
                  <span>Cook Masterclass</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};
