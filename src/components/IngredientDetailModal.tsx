import React, { useState, useEffect } from 'react';
import { Ingredient } from '../types';
import { X, Bookmark, Share2, MapPin, Calendar, Compass, Shield, Sparkles, Image as ImageIcon, ArrowRight, ArrowLeft, ExternalLink, Check, Camera, ChefHat, Play, Clock, Sun, Leaf, CloudRain, Snowflake } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { IngredientImage } from './IngredientImage';
import { SeasonalBadge, SeasonalDetailHero } from './SeasonalIndicator';
import { getSeasonalityInfo } from '../utils/seasonality';
import { prefetchMasterclass } from '../services/masterclassService';

interface IngredientDetailModalProps {
  ingredient: Ingredient | null;
  onClose: () => void;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
  onSelectRelated: (ingredientId: string) => void;
  allIngredients: Ingredient[];
  onOpenMasterclass?: (ingredient: Ingredient) => void;
  onGoBack?: () => void;
  hasPreviousInHistory?: boolean;
}

export const IngredientDetailModal: React.FC<IngredientDetailModalProps> = ({
  ingredient,
  onClose,
  isSaved,
  onToggleSave,
  onSelectRelated,
  allIngredients,
  onOpenMasterclass,
  onGoBack,
  hasPreviousInHistory
}) => {
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    if (ingredient) {
      prefetchMasterclass(ingredient);
    }
  }, [ingredient]);

  // Keyboard shortcut listener: Escape goes back / closes
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && ingredient) {
        if (hasPreviousInHistory && onGoBack) {
          onGoBack();
        } else {
          onClose();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [ingredient, hasPreviousInHistory, onGoBack, onClose]);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const relatedIngredients = ingredient
    ? allIngredients.filter((i) => ingredient.relatedIngredientIds.includes(i.id))
    : [];

  return (
    <AnimatePresence>
      {ingredient && (
        <motion.div
          key="ingredient-detail-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-6"
          onClick={onClose}
        >
          <motion.div
            key={`ingredient-detail-modal-${ingredient.id}`}
            initial={{ opacity: 0, scale: 0.96, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 15 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-5xl bg-[#121212] border border-[#F5F5F0]/15 shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col rounded-2xl"
          >
          {/* Top Modal Navigation Header with dedicated Back button */}
          <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-[#F5F5F0]/10 bg-[#161616] shrink-0">
            <div className="flex items-center space-x-2 sm:space-x-3">
              {/* Prominent Back Button */}
              <button
                id="modal-back-btn"
                onClick={hasPreviousInHistory && onGoBack ? onGoBack : onClose}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-[#222222] hover:bg-[#2e2e2e] border border-[#F5F5F0]/15 text-[#F5F5F0] hover:text-[#C5A059] transition-all text-xs font-mono group"
                title={hasPreviousInHistory ? "Go back to previous specimen" : "Go back to collection"}
              >
                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5 text-[#C5A059]" />
                <span className="font-medium">
                  {hasPreviousInHistory ? 'Back' : 'Back to Collection'}
                </span>
              </button>

              <div className="hidden md:flex items-center space-x-2 pl-2 border-l border-[#F5F5F0]/10">
                <span className="text-[10px] uppercase tracking-[0.2em] opacity-60 text-[#F5F5F0]">
                  No. {ingredient.id.toUpperCase().slice(0, 7)}
                </span>
                <span className="text-xs text-[#F5F5F0]/30">•</span>
                <span className="text-[10px] uppercase tracking-widest text-[#C5A059]">
                  {ingredient.category}
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-2 sm:space-x-3">
              {/* Masterclass Action in Header */}
              {onOpenMasterclass && (
                <button
                  onClick={() => onOpenMasterclass(ingredient)}
                  className="hidden sm:flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full bg-[#C5A059] text-black text-xs font-mono font-semibold tracking-wider hover:bg-[#d6b168] transition-all shadow-md active:scale-95"
                >
                  <ChefHat className="w-3.5 h-3.5" />
                  <span>Launch Masterclass</span>
                </button>
              )}

              <button
                onClick={handleShare}
                aria-label="Share specimen link"
                className="p-2 text-[#F5F5F0]/70 hover:text-[#C5A059] transition-colors rounded-lg bg-[#222222]/60"
                title="Copy share link"
              >
                {copiedLink ? <Check className="w-4 h-4 text-[#C5A059]" /> : <Share2 className="w-4 h-4" />}
              </button>

              <button
                onClick={() => onToggleSave(ingredient.id)}
                aria-label={isSaved ? "Remove from cellar" : "Save to cellar"}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full border text-xs uppercase tracking-wider transition-all ${
                  isSaved
                    ? 'bg-[#C5A059] border-[#C5A059] text-[#121212] font-semibold'
                    : 'border-[#F5F5F0]/20 bg-[#1E1E1E] text-[#F5F5F0] hover:border-[#C5A059]/60'
                }`}
              >
                <Bookmark className="w-3.5 h-3.5 fill-current" />
                <span className="hidden sm:inline">{isSaved ? 'In Cellar' : 'Save'}</span>
              </button>

              <button
                onClick={onClose}
                aria-label="Close modal"
                className="p-2 text-[#F5F5F0]/60 hover:text-white transition-colors rounded-lg hover:bg-white/5"
                title="Close (Esc)"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Modal Scrollable Body */}
          <div className="overflow-y-auto p-6 sm:p-8 space-y-8">
            {/* Masterclass Showcase Banner */}
            {onOpenMasterclass && (
              <div className="p-4 sm:p-5 rounded-xl bg-gradient-to-r from-[#1E1E1E] via-[#241F17] to-[#1E1E1E] border border-[#C5A059]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-lg">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[9px] font-mono uppercase tracking-widest bg-[#C5A059]/20 text-[#C5A059] border border-[#C5A059]/40">
                      Haute Cuisine Masterclass
                    </span>
                    <span className="text-xs text-neutral-400 font-mono flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#C5A059]" />
                      Full Timeline & Acoustics
                    </span>
                  </div>
                  <h3 className="font-serif text-lg sm:text-xl text-[#F5F5F0]">
                    Experience the 3-Star Atelier Recipe for {ingredient.name}
                  </h3>
                  <p className="text-xs text-neutral-400 max-w-xl">
                    Discover exact chronological step timings, required artisanal metallurgy tools, thermal control points, and synchronized culinary soundscapes.
                  </p>
                </div>

                <button
                  onClick={() => onOpenMasterclass(ingredient)}
                  className="px-5 py-2.5 rounded-lg bg-[#C5A059] text-black text-xs font-mono font-semibold tracking-wider hover:bg-[#d6b168] transition-all flex items-center gap-2 shrink-0 shadow-md active:scale-95"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Start Masterclass</span>
                </button>
              </div>
            )}

            {/* Split Media & Master Bio Section */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Media Showcase (Left 7 Cols) */}
              <div className="lg:col-span-7 space-y-3">
                <div className="relative w-full aspect-[16/10] bg-[#1E1E1E] border border-[#F5F5F0]/10 overflow-hidden shadow-2xl group">
                  <IngredientImage
                    ingredient={ingredient}
                    alt={ingredient.name}
                    className="w-full h-full object-cover transition-all duration-700 filter brightness-95 group-hover:scale-105"
                  />

                  {/* Dark Vignette Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121212]/80 via-transparent to-transparent pointer-events-none" />

                  {/* High-Res Terroir Photography Badge */}
                  <div className="absolute bottom-3 right-3 flex items-center space-x-1.5 bg-[#161616]/90 px-2.5 py-1 border border-[#F5F5F0]/15 backdrop-blur-md">
                    <Camera className="w-3 h-3 text-[#C5A059]" />
                    <span className="text-[10px] uppercase tracking-wider text-[#F5F5F0]/90 font-medium">
                      AI Terroir Specimen
                    </span>
                  </div>
                </div>

                {/* Terroir & Season Spec Strip */}
                <div className="grid grid-cols-2 gap-2 text-center text-xs">
                  <div className="p-3 bg-[#161616] border border-[#F5F5F0]/5">
                    <span className="block text-[9px] uppercase tracking-[0.2em] opacity-40">Terroir Character</span>
                    <span className="font-serif text-sm text-[#F5F5F0]">{ingredient.terroir}</span>
                  </div>
                  <div className="p-3 bg-[#161616] border border-[#F5F5F0]/5">
                    <span className="block text-[9px] uppercase tracking-[0.2em] opacity-40">Harvest Season & Window</span>
                    <span className="font-serif text-sm text-[#C5A059]">{ingredient.season} ({ingredient.harvestWindow})</span>
                  </div>
                </div>
              </div>

              {/* Bio, Nomenclature & Description (Right 5 Cols) */}
              <div className="lg:col-span-5 space-y-4">
                <div>
                  <div className="flex items-center space-x-2 text-xs text-[#C5A059] mb-1">
                    <MapPin className="w-3.5 h-3.5" />
                    <span className="tracking-wide uppercase text-[10px]">{ingredient.origin}, {ingredient.country}</span>
                    <span className="text-[#F5F5F0]/20">•</span>
                    <SeasonalBadge ingredient={ingredient} size="sm" />
                  </div>

                  <h2 className="font-serif text-3xl sm:text-4xl text-[#F5F5F0] leading-tight">
                    {ingredient.name}
                  </h2>

                  {ingredient.scientificName && (
                    <p className="font-serif italic text-sm text-[#F5F5F0]/50 mt-1">
                      {ingredient.scientificName}
                    </p>
                  )}
                </div>

                {/* Flavor Notes */}
                <div>
                  <span className="text-[9px] uppercase tracking-[0.2em] opacity-40 block mb-2">Flavor Profile</span>
                  <div className="flex flex-wrap gap-1.5">
                    {ingredient.flavorNotes.map((note, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 bg-[#1E1E1E] text-[#F5F5F0] text-xs font-serif italic border border-[#F5F5F0]/10"
                      >
                        {note}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Botanical Description */}
                <div>
                  <span className="text-[9px] uppercase tracking-[0.2em] opacity-40 block mb-2">Curator's Specimen Notes</span>
                  <p className="text-xs text-[#F5F5F0]/70 font-light leading-relaxed">
                    {ingredient.description}
                  </p>
                </div>

                {/* Storage / Harvesting Advice */}
                <div className="p-3 bg-[#161616] border-l-2 border-[#C5A059] text-xs">
                  <span className="text-[9px] uppercase tracking-[0.2em] text-[#C5A059] block font-bold mb-1">
                    Storage & Preservation Advice
                  </span>
                  <p className="text-[#F5F5F0]/70 font-light">
                    {ingredient.storageAdvice}
                  </p>
                </div>
              </div>
            </div>

            {/* Prominent Seasonal Availability & Phenological Harvest Section in Modal */}
            <SeasonalDetailHero ingredient={ingredient} />

            {/* Sensory Spectrum & Pairings Analysis */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-6 border-t border-[#F5F5F0]/10">
              {/* Sensory Spectrum Radar (Left 6 Cols) */}
              <div className="md:col-span-6 space-y-4">
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#C5A059] block font-bold">
                  Sensory Spectrum & Flavor Intensity
                </span>

                <div className="space-y-3 bg-[#161616] p-5 border border-[#F5F5F0]/10">
                  {Object.entries(ingredient.flavorProfile).map(([key, value]) => (
                    <div key={key} className="space-y-1">
                      <div className="flex justify-between text-xs font-mono">
                        <span className="capitalize text-[#F5F5F0]/70 tracking-wider text-[11px]">{key}</span>
                        <span className="text-[#C5A059]">{value}/100</span>
                      </div>
                      <div className="w-full h-1.5 bg-[#252525] overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${value}%` }}
                          transition={{ duration: 0.8, ease: "easeOut" }}
                          className="h-full bg-gradient-to-r from-[#C5A059]/70 to-[#C5A059]"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Best Pairings & Culinary Applications (Right 6 Cols) */}
              <div className="md:col-span-6 space-y-4">
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#C5A059] block font-bold">
                  Gastronomic Pairings & Haute Cuisine Applications
                </span>

                <div className="space-y-3 bg-[#161616] p-5 border border-[#F5F5F0]/10">
                  {/* Pairings List */}
                  <div>
                    <span className="text-[9px] uppercase tracking-[0.2em] opacity-40 block mb-2">Ideal Ingredient Symbiosis</span>
                    <div className="space-y-2">
                      {ingredient.pairings.map((pairing, i) => (
                        <div key={i} className="flex items-start space-x-2 text-xs">
                          <span className="text-[#C5A059]">•</span>
                          <div>
                            <span className="font-serif italic text-[#F5F5F0]">{pairing.ingredient}: </span>
                            <span className="text-[#F5F5F0]/60 font-light">{pairing.harmony} ({pairing.note})</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Culinary Uses */}
                  <div className="pt-3 border-t border-[#F5F5F0]/10">
                    <span className="text-[9px] uppercase tracking-[0.2em] opacity-40 block mb-2">Recommended Culinary Applications</span>
                    <div className="flex flex-wrap gap-1.5">
                      {ingredient.culinaryApplications.map((use, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 bg-[#1E1E1E] text-[#F5F5F0]/80 text-[10px] tracking-wider uppercase border border-[#F5F5F0]/5"
                        >
                          {use}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Related Ingredients Navigation */}
            {relatedIngredients.length > 0 && (
              <div className="pt-6 border-t border-[#F5F5F0]/10 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#C5A059] block font-bold">
                    Related Specimen in Stassen's Archive
                  </span>
                  <span className="text-[10px] uppercase tracking-widest opacity-40">
                    Shared Terroir or Chemical Affinity
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {relatedIngredients.map((rel) => (
                    <div
                      key={rel.id}
                      onClick={() => onSelectRelated(rel.id)}
                      className="group flex items-center space-x-3 p-3 bg-[#161616] border border-[#F5F5F0]/10 hover:border-[#C5A059]/50 transition-all cursor-pointer"
                    >
                      <div className="w-14 h-14 shrink-0 overflow-hidden relative">
                        <IngredientImage
                          ingredient={rel}
                          alt={`${rel.name} — ${rel.category}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="overflow-hidden">
                        <span className="block text-[9px] uppercase tracking-wider text-[#C5A059]">
                          {rel.category}
                        </span>
                        <h4 className="font-serif text-base text-[#F5F5F0] group-hover:text-[#C5A059] transition-colors truncate">
                          {rel.name}
                        </h4>
                        <span className="text-[10px] opacity-40 truncate block">
                          {rel.origin}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);
};

