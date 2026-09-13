import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Play,
  Pause,
  Volume2,
  VolumeX,
  RotateCcw,
  Sparkles,
  Clock,
  Utensils,
  ChefHat,
  Flame,
  ShieldCheck,
  Wine,
  Layers,
  Check,
  Award,
  ChevronRight,
  ChevronLeft,
  ArrowLeft,
  FastForward,
  Info,
  Droplets,
  ExternalLink,
  Plus
} from 'lucide-react';
import { CulinaryMasterclass, Ingredient, MasterclassStep, CulinaryTool } from '../types';
import { generateMasterclassForIngredient, generateStepVisual } from '../services/masterclassService';
import { playCulinarySound, speakChefNarration, stopChefNarration, CulinarySoundType } from '../services/soundEngine';
import { RecipeScalerControl } from './RecipeScalerControl';

interface CulinaryMasterclassModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialIngredient: Ingredient | null;
  allIngredients: Ingredient[];
  onSelectIngredient?: (ingredient: Ingredient) => void;
}

export function CulinaryMasterclassModal({
  isOpen,
  onClose,
  initialIngredient,
  allIngredients,
  onSelectIngredient
}: CulinaryMasterclassModalProps) {
  const [currentIngredient, setCurrentIngredient] = useState<Ingredient | null>(initialIngredient);
  const [masterclass, setMasterclass] = useState<CulinaryMasterclass | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'video' | 'timeline' | 'tools' | 'pairing'>('video');

  // Video / Timeline Player State
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<1 | 1.5 | 2>(1);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [isNarrationEnabled, setIsNarrationEnabled] = useState(true);
  const [stepVisuals, setStepVisuals] = useState<Record<number, string>>({});
  const [isGeneratingVisual, setIsGeneratingVisual] = useState(false);

  // Alchemist / Custom Generator State
  const [customDirective, setCustomDirective] = useState('');
  const [selectedSecondaryIds, setSelectedSecondaryIds] = useState<string[]>([]);
  const [isAlchemistOpen, setIsAlchemistOpen] = useState(false);

  // Step Progress Timer
  const [stepElapsedSeconds, setStepElapsedSeconds] = useState(0);
  const [scaledIngredients, setScaledIngredients] = useState<any[]>([]);
  const timerRef = useRef<any>(null);

  // Synchronize when initialIngredient changes
  useEffect(() => {
    if (initialIngredient) {
      setCurrentIngredient(initialIngredient);
      loadOrGenerateMasterclass(initialIngredient);
    }
  }, [initialIngredient]);

  // Load masterclass
  const loadOrGenerateMasterclass = async (
    ing: Ingredient,
    directive?: string,
    secondaryNames?: string[]
  ) => {
    setIsLoading(true);
    setIsPlaying(false);
    stopChefNarration();
    setCurrentStepIndex(0);
    setStepElapsedSeconds(0);

    try {
      const result = await generateMasterclassForIngredient(ing, {
        customPrompt: directive,
        secondaryIngredients: secondaryNames
      });
      setMasterclass(result);
      setScaledIngredients(result.ingredientsList || []);

      // Load visual for the initial active step on demand
      if (result.timelineSteps.length > 0) {
        loadStepVisual(result, 0);
      }
    } catch (e) {
      console.error('Error generating masterclass:', e);
    } finally {
      setIsLoading(false);
    }
  };

  // Load / generate step visual on demand
  const loadStepVisual = async (mc: CulinaryMasterclass, stepIdx: number) => {
    if (stepVisuals[stepIdx]) return;
    const step = mc.timelineSteps[stepIdx];
    if (!step) return;

    setIsGeneratingVisual(true);
    try {
      const url = await generateStepVisual(
        mc.dishTitle,
        step.title,
        step.actionDescription,
        currentIngredient?.category || 'default',
        step.soundscapeType
      );
      if (url) {
        setStepVisuals(prev => ({ ...prev, [stepIdx]: url }));
      }
    } catch (err) {
      // Step visual fallback seamlessly provided
    } finally {
      setIsGeneratingVisual(false);
    }
  };

  // Handle Play/Pause and Step Audio
  useEffect(() => {
    if (!isPlaying || !masterclass) {
      if (timerRef.current) clearInterval(timerRef.current);
      stopChefNarration();
      return;
    }

    const currentStep = masterclass.timelineSteps[currentStepIndex];
    if (!currentStep) return;

    // Trigger Soundscape acoustic effect
    if (isAudioEnabled && currentStep.soundscapeType) {
      playCulinarySound(currentStep.soundscapeType as CulinarySoundType, 0.45);
    }

    // Trigger Chef voiceover narration
    if (isNarrationEnabled && currentStep.spokenNarration) {
      speakChefNarration(currentStep.spokenNarration);
    }

    // Step step visual
    loadStepVisual(masterclass, currentStepIndex);

    // Duration of step in seconds (simulated video clip: 7s per step)
    const stepDuration = 7 / playbackSpeed;
    const intervalMs = 100;
    const totalTicks = (stepDuration * 1000) / intervalMs;
    let currentTick = 0;

    timerRef.current = setInterval(() => {
      currentTick++;
      setStepElapsedSeconds(Math.round((currentTick / totalTicks) * 10));

      if (currentTick >= totalTicks) {
        // Advance to next step or loop
        if (currentStepIndex < masterclass.timelineSteps.length - 1) {
          setCurrentStepIndex(prev => prev + 1);
          setStepElapsedSeconds(0);
        } else {
          setIsPlaying(false);
          setStepElapsedSeconds(0);
          clearInterval(timerRef.current);
        }
      }
    }, intervalMs);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      stopChefNarration();
    };
  }, [isPlaying, currentStepIndex, playbackSpeed, isAudioEnabled, isNarrationEnabled, masterclass]);

  // Clean up on unmount or close
  useEffect(() => {
    return () => {
      stopChefNarration();
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const handleStepSelect = (index: number) => {
    setCurrentStepIndex(index);
    setStepElapsedSeconds(0);
    if (masterclass) {
      loadStepVisual(masterclass, index);
      const step = masterclass.timelineSteps[index];
      if (step) {
        if (isAudioEnabled && step.soundscapeType) {
          playCulinarySound(step.soundscapeType as CulinarySoundType, 0.4);
        }
        if (isNarrationEnabled && step.spokenNarration) {
          speakChefNarration(step.spokenNarration);
        }
      }
    }
  };

  const handleTriggerAlchemist = () => {
    if (!currentIngredient) return;
    const secondaryNames = allIngredients
      .filter(i => selectedSecondaryIds.includes(i.id))
      .map(i => i.name);
    loadOrGenerateMasterclass(currentIngredient, customDirective, secondaryNames);
    setIsAlchemistOpen(false);
  };

  // Escape key and keyboard navigation for Masterclass
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isAlchemistOpen) {
          setIsAlchemistOpen(false);
        } else {
          stopChefNarration();
          onClose();
        }
      } else if (e.key === 'ArrowLeft' && !['INPUT', 'SELECT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        if (currentStepIndex > 0) {
          handleStepSelect(currentStepIndex - 1);
        }
      } else if (e.key === 'ArrowRight' && !['INPUT', 'SELECT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        if (masterclass && currentStepIndex < masterclass.timelineSteps.length - 1) {
          handleStepSelect(currentStepIndex + 1);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isAlchemistOpen, currentStepIndex, masterclass, onClose]);

  const currentStep: MasterclassStep | undefined = masterclass?.timelineSteps[currentStepIndex];
  const currentStepImage =
    stepVisuals[currentStepIndex] ||
    masterclass?.heroImageUrl ||
    currentIngredient?.imageUrl ||
    'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1200&auto=format&fit=crop';

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="culinary-masterclass-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          id="culinary-masterclass-modal"
          className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/85 backdrop-blur-xl overflow-y-auto"
          onClick={() => {
            stopChefNarration();
            onClose();
          }}
        >
          <motion.div
            key="culinary-masterclass-content"
            initial={{ opacity: 0, scale: 0.96, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 15 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-6xl max-h-[92vh] bg-[#121212] border border-[#C5A059]/30 rounded-2xl shadow-2xl overflow-hidden flex flex-col my-auto"
          >
          {/* Header Bar */}
          <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-white/10 bg-[#171717]">
            <div className="flex items-center gap-3">
              {/* Prominent Back Button */}
              <button
                id="masterclass-back-btn"
                onClick={() => {
                  stopChefNarration();
                  onClose();
                }}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-[#222222] hover:bg-[#2e2e2e] border border-[#F5F5F0]/15 text-[#F5F5F0] hover:text-[#C5A059] transition-all text-xs font-mono group"
                title="Return to previous view (Esc)"
              >
                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5 text-[#C5A059]" />
                <span className="font-medium">Back</span>
              </button>

              <div className="hidden md:flex w-8 h-8 rounded-lg bg-[#C5A059]/15 border border-[#C5A059]/40 items-center justify-center text-[#C5A059]">
                <ChefHat className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono tracking-widest text-[#C5A059] uppercase">
                    Culinary Masterclass Atelier
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/10 text-neutral-300">
                    {masterclass?.difficulty || 'Grand Master Atelier'}
                  </span>
                </div>
                <h2 className="text-base sm:text-lg font-serif text-[#F5F5F0] truncate max-w-xs sm:max-w-md md:max-w-lg">
                  {masterclass?.dishTitle || `${currentIngredient?.name || 'Culinary'} Masterclass`}
                </h2>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Alchemist Button */}
              <button
                onClick={() => setIsAlchemistOpen(!isAlchemistOpen)}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#C5A059]/40 text-xs font-mono text-[#C5A059] hover:bg-[#C5A059]/10 transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Custom Atelier Studio</span>
              </button>

              {/* Close Button */}
              <button
                onClick={() => {
                  stopChefNarration();
                  onClose();
                }}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white transition-colors"
                title="Close Masterclass (Esc)"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Alchemist Drawer Panel (Custom Recipe Generator) */}
          <AnimatePresence>
            {isAlchemistOpen && (
              <motion.div
                key="alchemist-drawer-panel"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="border-b border-[#C5A059]/20 bg-[#1c1c1c] px-6 py-4 overflow-hidden"
              >
                <div className="max-w-4xl mx-auto space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-mono uppercase tracking-wider text-[#C5A059] flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      Atelier Recipe Harmonizer & Pairing Alchemist
                    </h4>
                    <span className="text-[11px] text-neutral-400">
                      Combine archive specimens or define bespoke cooking philosophies
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {/* Primary Ingredient Selector */}
                    <div>
                      <label className="text-[11px] font-mono text-neutral-400 block mb-1">
                        Primary Archive Specimen
                      </label>
                      <select
                        value={currentIngredient?.id || ''}
                        onChange={(e) => {
                          const found = allIngredients.find(i => i.id === e.target.value);
                          if (found) {
                            setCurrentIngredient(found);
                            loadOrGenerateMasterclass(found, customDirective);
                          }
                        }}
                        className="w-full bg-[#121212] border border-white/15 rounded-lg px-3 py-2 text-xs text-[#F5F5F0] focus:border-[#C5A059] outline-none font-sans"
                      >
                        {allIngredients.map((ing) => (
                          <option key={ing.id} value={ing.id}>
                            {ing.name} ({ing.category})
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Custom Chef Directive */}
                    <div>
                      <label className="text-[11px] font-mono text-neutral-400 block mb-1">
                        Chef Directive / Technique Variation
                      </label>
                      <input
                        type="text"
                        placeholder="e.g., Emulsified cold-smoke infusion, Modernist spherification, Wood-fired reduction"
                        value={customDirective}
                        onChange={(e) => setCustomDirective(e.target.value)}
                        className="w-full bg-[#121212] border border-white/15 rounded-lg px-3 py-2 text-xs text-[#F5F5F0] focus:border-[#C5A059] outline-none font-sans placeholder:text-neutral-500"
                      />
                    </div>
                  </div>

                  {/* Secondary Ingredients Pairing Pills */}
                  <div>
                    <label className="text-[11px] font-mono text-neutral-400 block mb-1">
                      Harmonize with Secondary Archive Terroirs (Optional)
                    </label>
                    <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto pr-1">
                      {allIngredients
                        .filter(i => i.id !== currentIngredient?.id)
                        .slice(0, 18)
                        .map((ing) => {
                          const isSelected = selectedSecondaryIds.includes(ing.id);
                          return (
                            <button
                              key={ing.id}
                              onClick={() => {
                                setSelectedSecondaryIds(prev =>
                                  isSelected ? prev.filter(id => id !== ing.id) : [...prev, ing.id]
                                );
                              }}
                              className={`px-2.5 py-1 rounded-md text-[11px] font-mono transition-all flex items-center gap-1 ${
                                isSelected
                                  ? 'bg-[#C5A059] text-black font-semibold'
                                  : 'bg-white/5 text-neutral-300 hover:bg-white/10 border border-white/10'
                              }`}
                            >
                              <span>{ing.name}</span>
                              {isSelected && <Check className="w-3 h-3" />}
                            </button>
                          );
                        })}
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-1">
                    <button
                      onClick={() => setIsAlchemistOpen(false)}
                      className="px-3 py-1.5 rounded-lg text-xs text-neutral-400 hover:text-white"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleTriggerAlchemist}
                      className="px-4 py-1.5 rounded-lg bg-[#C5A059] text-black text-xs font-mono font-medium hover:bg-[#d6b168] transition-colors flex items-center gap-1.5 shadow-md"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Generate Bespoke Masterclass Timeline</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Tabs */}
          <div className="flex items-center justify-between px-6 border-b border-white/10 bg-[#151515] overflow-x-auto">
            <div className="flex items-center gap-1 sm:gap-2">
              <button
                onClick={() => setActiveTab('video')}
                className={`flex items-center gap-2 px-3 sm:px-4 py-3 text-xs font-mono border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === 'video'
                    ? 'border-[#C5A059] text-[#C5A059] font-medium'
                    : 'border-transparent text-neutral-400 hover:text-neutral-200'
                }`}
              >
                <Play className="w-3.5 h-3.5" />
                <span>Cinematic Video Atelier</span>
              </button>

              <button
                onClick={() => setActiveTab('timeline')}
                className={`flex items-center gap-2 px-3 sm:px-4 py-3 text-xs font-mono border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === 'timeline'
                    ? 'border-[#C5A059] text-[#C5A059] font-medium'
                    : 'border-transparent text-neutral-400 hover:text-neutral-200'
                }`}
              >
                <Clock className="w-3.5 h-3.5" />
                <span>Step-by-Step Chronology ({masterclass?.timelineSteps.length || 0})</span>
              </button>

              <button
                onClick={() => setActiveTab('tools')}
                className={`flex items-center gap-2 px-3 sm:px-4 py-3 text-xs font-mono border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === 'tools'
                    ? 'border-[#C5A059] text-[#C5A059] font-medium'
                    : 'border-transparent text-neutral-400 hover:text-neutral-200'
                }`}
              >
                <Utensils className="w-3.5 h-3.5" />
                <span>Artisanal Tools & Bay ({masterclass?.requiredTools.length || 0})</span>
              </button>

              <button
                onClick={() => setActiveTab('pairing')}
                className={`flex items-center gap-2 px-3 sm:px-4 py-3 text-xs font-mono border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === 'pairing'
                    ? 'border-[#C5A059] text-[#C5A059] font-medium'
                    : 'border-transparent text-neutral-400 hover:text-neutral-200'
                }`}
              >
                <Wine className="w-3.5 h-3.5" />
                <span>Sommelier & Flavor Spectrum</span>
              </button>
            </div>

            {/* Quick Stats */}
            {masterclass && (
              <div className="hidden lg:flex items-center gap-4 text-xs font-mono text-neutral-400 py-2">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#C5A059]" />
                  Total: {masterclass.overallDurationFormatted}
                </span>
                <span className="flex items-center gap-1">
                  <Utensils className="w-3.5 h-3.5 text-[#C5A059]" />
                  Servings: {masterclass.servings}
                </span>
              </div>
            )}
          </div>

          {/* Main Modal Body */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[#121212]">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-24 space-y-4">
                <div className="w-12 h-12 rounded-full border-2 border-[#C5A059] border-t-transparent animate-spin" />
                <p className="text-sm font-mono text-[#C5A059] tracking-wider uppercase">
                  Curating Haute Gastronomy Masterclass & Visual Timelines...
                </p>
                <p className="text-xs text-neutral-500 font-sans max-w-md text-center">
                  Calculating exact thermal control points, enzymatic volatile preservation, and artisanal tool manifests.
                </p>
              </div>
            ) : !masterclass ? (
              <div className="text-center py-20">
                <p className="text-neutral-400 text-sm">No masterclass active. Select an ingredient to begin.</p>
              </div>
            ) : (
              <div className="space-y-6">
                {/* TAB 1: CINEMATIC VIDEO & REAL-TIME ATELIER */}
                {activeTab === 'video' && (
                  <div className="space-y-6">
                    {/* Video Screen & Interactive Frame */}
                    <div className="relative aspect-video max-h-[460px] w-full bg-black rounded-xl overflow-hidden border border-white/15 shadow-2xl group">
                      {/* Current Step Cinematic Image with Ken Burns Zoom & Subtle Parallax */}
                      <motion.div
                        key={currentStepIndex}
                        initial={{ scale: 1.05, opacity: 0.85 }}
                        animate={{ scale: isPlaying ? 1.12 : 1.05, opacity: 1 }}
                        transition={{ duration: 7, ease: 'linear' }}
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${currentStepImage})` }}
                      />

                      {/* Atmospheric Vignette & Steam Layer */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none" />
                      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60 pointer-events-none" />

                      {/* Top Overlay Badge: Live Step & Timestamp */}
                      <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10 pointer-events-none">
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-1 rounded bg-black/70 backdrop-blur-md border border-[#C5A059]/40 text-[#C5A059] text-[11px] font-mono tracking-wider">
                            STEP {currentStepIndex + 1} OF {masterclass.timelineSteps.length}
                          </span>
                          <span className="px-2.5 py-1 rounded bg-black/70 backdrop-blur-md border border-white/20 text-neutral-200 text-[11px] font-mono">
                            OFFSET: {currentStep?.timeOffsetFormatted || '00:00'}
                          </span>
                        </div>

                        {/* Soundscape Indicator */}
                        {currentStep && (
                          <span className="px-2.5 py-1 rounded-full bg-[#C5A059]/20 backdrop-blur-md border border-[#C5A059]/50 text-[#C5A059] text-[10px] font-mono uppercase flex items-center gap-1.5">
                            <Flame className="w-3 h-3 text-[#C5A059] animate-pulse" />
                            Acoustics: {currentStep.soundscapeType}
                          </span>
                        )}
                      </div>

                      {/* Center Play Overlay (when paused) */}
                      {!isPlaying && (
                        <div className="absolute inset-0 flex items-center justify-center z-10">
                          <button
                            onClick={() => setIsPlaying(true)}
                            className="w-16 h-16 rounded-full bg-[#C5A059] text-black flex items-center justify-center shadow-2xl hover:scale-105 active:scale-95 transition-all"
                          >
                            <Play className="w-7 h-7 fill-current translate-x-0.5" />
                          </button>
                        </div>
                      )}

                      {/* Bottom Live Caption & Action Card */}
                      <div className="absolute bottom-16 left-4 right-4 z-10">
                        <div className="bg-black/75 backdrop-blur-md p-4 rounded-xl border border-white/15 space-y-1.5">
                          <h3 className="text-base sm:text-lg font-serif text-[#F5F5F0]">
                            {currentStep?.title}
                          </h3>
                          <p className="text-xs sm:text-sm text-neutral-300 font-sans leading-relaxed line-clamp-2">
                            {currentStep?.actionDescription}
                          </p>

                          {/* Ingredient additions in this step */}
                          {currentStep && currentStep.ingredientAdditions.length > 0 && (
                            <div className="flex flex-wrap gap-2 pt-1">
                              {currentStep.ingredientAdditions.map((add, idx) => (
                                <span
                                  key={idx}
                                  className="px-2 py-0.5 rounded bg-[#C5A059]/20 border border-[#C5A059]/40 text-[#C5A059] text-[10px] font-mono flex items-center gap-1"
                                >
                                  <Droplets className="w-2.5 h-2.5" />
                                  <span>{add.ingredientName} ({add.amount}) — {add.technique}</span>
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Video Player Control Bar */}
                      <div className="absolute bottom-0 left-0 right-0 h-14 bg-black/90 backdrop-blur-lg border-t border-white/10 px-4 flex items-center justify-between z-20">
                        {/* Play/Pause & Step Nav */}
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setIsPlaying(!isPlaying)}
                            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-[#F5F5F0] transition-colors"
                          >
                            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                          </button>

                          <button
                            onClick={() => {
                              if (currentStepIndex > 0) handleStepSelect(currentStepIndex - 1);
                            }}
                            disabled={currentStepIndex === 0}
                            className="p-1.5 rounded-lg text-neutral-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
                          >
                            <ChevronLeft className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => {
                              if (currentStepIndex < masterclass.timelineSteps.length - 1) {
                                handleStepSelect(currentStepIndex + 1);
                              }
                            }}
                            disabled={currentStepIndex === masterclass.timelineSteps.length - 1}
                            className="p-1.5 rounded-lg text-neutral-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
                          >
                            <ChevronRight className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => {
                              setCurrentStepIndex(0);
                              setStepElapsedSeconds(0);
                              setIsPlaying(false);
                            }}
                            className="p-1.5 rounded-lg text-neutral-400 hover:text-white"
                            title="Reset Masterclass Timeline"
                          >
                            <RotateCcw className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Interactive Step Scrubber Pills */}
                        <div className="hidden md:flex items-center gap-1.5 flex-1 max-w-md mx-4">
                          {masterclass.timelineSteps.map((step, idx) => (
                            <button
                              key={step.stepNumber}
                              onClick={() => handleStepSelect(idx)}
                              className={`h-2 rounded-full transition-all flex-1 ${
                                idx === currentStepIndex
                                  ? 'bg-[#C5A059] ring-2 ring-[#C5A059]/40'
                                  : idx < currentStepIndex
                                  ? 'bg-white/50'
                                  : 'bg-white/15 hover:bg-white/30'
                              }`}
                              title={`Step ${step.stepNumber}: ${step.title}`}
                            />
                          ))}
                        </div>

                        {/* Audio & Speed Controls */}
                        <div className="flex items-center gap-2">
                          {/* Audio Acoustics Toggle */}
                          <button
                            onClick={() => setIsAudioEnabled(!isAudioEnabled)}
                            className={`p-1.5 rounded text-xs font-mono flex items-center gap-1 ${
                              isAudioEnabled ? 'text-[#C5A059]' : 'text-neutral-500'
                            }`}
                            title="Toggle Kitchen Soundscape Acoustics"
                          >
                            {isAudioEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                            <span className="text-[10px] hidden sm:inline">Sounds</span>
                          </button>

                          {/* Narration Toggle */}
                          <button
                            onClick={() => {
                              if (isNarrationEnabled) stopChefNarration();
                              setIsNarrationEnabled(!isNarrationEnabled);
                            }}
                            className={`px-2 py-1 rounded text-[10px] font-mono border ${
                              isNarrationEnabled
                                ? 'border-[#C5A059]/40 bg-[#C5A059]/10 text-[#C5A059]'
                                : 'border-white/10 text-neutral-500'
                            }`}
                            title="Toggle Master Chef Spoken Voiceover"
                          >
                            Voiceover: {isNarrationEnabled ? 'ON' : 'OFF'}
                          </button>

                          {/* Speed Toggle */}
                          <button
                            onClick={() => {
                              const speeds: Array<1 | 1.5 | 2> = [1, 1.5, 2];
                              const next = speeds[(speeds.indexOf(playbackSpeed) + 1) % speeds.length];
                              setPlaybackSpeed(next);
                            }}
                            className="px-2 py-1 rounded bg-white/10 text-neutral-300 text-[10px] font-mono hover:bg-white/20"
                          >
                            {playbackSpeed}x
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Overview & Chef Gastronomic Rationale */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="md:col-span-2 p-5 rounded-xl bg-[#171717] border border-white/10 space-y-2">
                        <div className="flex items-center gap-2 text-[#C5A059] text-xs font-mono uppercase tracking-wider">
                          <ChefHat className="w-4 h-4" />
                          <span>Culinary Overview & Gastronomic Philosophy</span>
                        </div>
                        <p className="text-xs text-neutral-300 font-sans leading-relaxed">
                          {masterclass.overview}
                        </p>
                        <div className="pt-2 border-t border-white/5">
                          <span className="text-[11px] font-mono text-neutral-400 block mb-0.5">Chef's Thermodynamic Rationale:</span>
                          <p className="text-xs text-neutral-400 italic">
                            "{masterclass.chefRationale}"
                          </p>
                        </div>
                      </div>

                      {/* Quick Ingredient Manifest & Smart Scaler */}
                      <div className="space-y-4">
                        <RecipeScalerControl
                          baseServings={masterclass.servings || 4}
                          ingredients={masterclass.ingredientsList}
                          recipeTitle={masterclass.dishTitle}
                          onScaledChange={(scaled) => setScaledIngredients(scaled)}
                        />

                        <div className="p-5 rounded-xl bg-[#171717] border border-white/10 space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-mono uppercase tracking-wider text-[#C5A059]">
                              Ingredient Manifest (Scaled)
                            </span>
                            <span className="text-[10px] font-mono text-neutral-400">
                              {scaledIngredients.length} Items
                            </span>
                          </div>
                          <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                            {scaledIngredients.map((item, idx) => (
                              <div key={idx} className="flex items-start justify-between text-xs py-1 border-b border-white/5">
                                <div>
                                  <span className={`font-medium ${item.isArchiveSpecialty ? 'text-[#C5A059]' : 'text-neutral-200'}`}>
                                    {item.name}
                                  </span>
                                  <p className="text-[10px] text-neutral-400">{item.prepState}</p>
                                </div>
                                <span className="text-[11px] font-mono text-[#C5A059] font-bold ml-2 whitespace-nowrap">
                                  {item.amount}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 2: STEP-BY-STEP CHRONOLOGY */}
                {activeTab === 'timeline' && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-base font-serif text-[#F5F5F0]">
                          Haute Gastronomy Chronological Execution
                        </h3>
                        <p className="text-xs text-neutral-400">
                          Exact minute-by-minute protocol with critical temperature, lipid, and aromatic control points.
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {masterclass.timelineSteps.map((step, idx) => {
                        const isCurrent = idx === currentStepIndex;
                        const stepImg = stepVisuals[idx] || masterclass.heroImageUrl;

                        return (
                          <div
                            key={step.stepNumber}
                            className={`p-5 rounded-xl border transition-all ${
                              isCurrent
                                ? 'bg-[#1a1a1a] border-[#C5A059] shadow-lg ring-1 ring-[#C5A059]/20'
                                : 'bg-[#151515] border-white/10 hover:border-white/20'
                            }`}
                          >
                            <div className="flex flex-col lg:flex-row gap-5">
                              {/* Left Step Visual Thumbnail */}
                              <div className="w-full lg:w-48 h-32 rounded-lg overflow-hidden relative flex-shrink-0 bg-black/50 border border-white/10">
                                <div
                                  className="w-full h-full bg-cover bg-center"
                                  style={{ backgroundImage: `url(${stepImg})` }}
                                />
                                <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/80 text-[10px] font-mono text-[#C5A059] border border-[#C5A059]/30">
                                  {step.timeOffsetFormatted}
                                </div>
                              </div>

                              {/* Right Step Content */}
                              <div className="flex-1 space-y-3">
                                <div className="flex items-center justify-between flex-wrap gap-2">
                                  <div className="flex items-center gap-2">
                                    <span className="w-6 h-6 rounded-full bg-[#C5A059] text-black font-mono text-xs font-bold flex items-center justify-center">
                                      {step.stepNumber}
                                    </span>
                                    <h4 className="text-base font-serif text-[#F5F5F0]">
                                      {step.title}
                                    </h4>
                                  </div>

                                  <div className="flex items-center gap-2">
                                    {/* Play Step Audio */}
                                    <button
                                      onClick={() => {
                                        setCurrentStepIndex(idx);
                                        if (step.soundscapeType) {
                                          playCulinarySound(step.soundscapeType as CulinarySoundType, 0.5);
                                        }
                                        if (step.spokenNarration) {
                                          speakChefNarration(step.spokenNarration);
                                        }
                                      }}
                                      className="px-2.5 py-1 rounded bg-white/10 hover:bg-[#C5A059] hover:text-black text-neutral-300 text-[11px] font-mono transition-colors flex items-center gap-1.5"
                                    >
                                      <Volume2 className="w-3.5 h-3.5" />
                                      <span>Listen to Step ({step.soundscapeType})</span>
                                    </button>
                                  </div>
                                </div>

                                <p className="text-xs text-neutral-300 font-sans leading-relaxed">
                                  {step.actionDescription}
                                </p>

                                {/* Ingredient Additions Table */}
                                {step.ingredientAdditions.length > 0 && (
                                  <div className="bg-black/30 rounded-lg p-3 border border-white/5 space-y-1.5">
                                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#C5A059] block">
                                      Ingredient Additions at {step.timeOffsetFormatted}:
                                    </span>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                      {step.ingredientAdditions.map((add, addIdx) => (
                                        <div key={addIdx} className="text-xs text-neutral-300 flex items-start gap-1.5">
                                          <div className="w-1.5 h-1.5 rounded-full bg-[#C5A059] mt-1.5 flex-shrink-0" />
                                          <div>
                                            <span className="font-medium text-white">{add.ingredientName}</span> ({add.amount})
                                            <span className="text-neutral-400 block text-[10px]">
                                              {add.technique} — {add.timingNote}
                                            </span>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}

                                {/* Critical Control Point & Sensory Cues */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-[11px]">
                                  <div className="p-2 rounded bg-red-950/20 border border-red-900/30 text-red-200">
                                    <span className="font-mono text-red-400 font-bold block mb-0.5">
                                      CRITICAL CONTROL POINT (CCP):
                                    </span>
                                    {step.criticalControlPoint}
                                  </div>
                                  <div className="p-2 rounded bg-amber-950/20 border border-amber-900/30 text-amber-200">
                                    <span className="font-mono text-amber-400 font-bold block mb-0.5">
                                      SENSORY & OLFACTORY CUES:
                                    </span>
                                    {step.sensoryCue}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* TAB 3: ARTISANAL TOOLS & EQUIPMENT BAY */}
                {activeTab === 'tools' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-base font-serif text-[#F5F5F0]">
                        Artisanal Atelier Equipment Manifest
                      </h3>
                      <p className="text-xs text-neutral-400">
                        Professional master chef tools required to achieve exact cellular preservation and thermal precision.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {masterclass.requiredTools.map((tool) => (
                        <div
                          key={tool.id}
                          className="p-5 rounded-xl bg-[#171717] border border-white/10 space-y-3 hover:border-[#C5A059]/40 transition-colors"
                        >
                          <div className="flex items-start justify-between">
                            <div>
                              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#C5A059]/15 text-[#C5A059] border border-[#C5A059]/30">
                                {tool.category}
                              </span>
                              <h4 className="text-sm font-serif text-[#F5F5F0] mt-1.5 font-medium">
                                {tool.name}
                              </h4>
                            </div>
                            <Utensils className="w-5 h-5 text-neutral-500" />
                          </div>

                          <div className="space-y-1.5 text-xs">
                            <div>
                              <span className="text-[10px] font-mono text-neutral-400 block">Material & Metallurgy:</span>
                              <span className="text-neutral-200">{tool.material}</span>
                            </div>
                            <div>
                              <span className="text-[10px] font-mono text-neutral-400 block">Culinary Function:</span>
                              <span className="text-neutral-300 leading-relaxed">{tool.purpose}</span>
                            </div>
                            <div className="p-2.5 rounded bg-black/40 border border-white/5 text-[11px] text-[#C5A059]">
                              <span className="font-mono font-bold block mb-0.5">Chef's Pro-Tip:</span>
                              {tool.proTip}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* TAB 4: SOMMELIER & FLAVOR SPECTRUM */}
                {activeTab === 'pairing' && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Flavor & Aroma Spectrum */}
                      <div className="p-5 rounded-xl bg-[#171717] border border-white/10 space-y-4">
                        <div className="flex items-center gap-2 text-[#C5A059] text-xs font-mono uppercase tracking-wider">
                          <Award className="w-4 h-4" />
                          <span>Haute Gastronomy Flavor Spectrum</span>
                        </div>

                        <div className="space-y-3">
                          {[
                            { label: 'Umami Glutamate Depth', value: masterclass.flavorAromaProfile.umami },
                            { label: 'Aromatic Volatile Lift', value: masterclass.flavorAromaProfile.aromaticIntensity },
                            { label: 'Texture & Viscosity Complexity', value: masterclass.flavorAromaProfile.textureComplexity },
                            { label: 'Palate Finish & Persistence', value: masterclass.flavorAromaProfile.finishLength },
                            { label: 'Acidity Brightness & Balance', value: masterclass.flavorAromaProfile.acidity }
                          ].map((metric, idx) => (
                            <div key={idx} className="space-y-1">
                              <div className="flex justify-between text-xs font-mono">
                                <span className="text-neutral-300">{metric.label}</span>
                                <span className="text-[#C5A059]">{metric.value}/100</span>
                              </div>
                              <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                                <div
                                  className="h-full bg-gradient-to-r from-[#C5A059]/60 to-[#C5A059] rounded-full"
                                  style={{ width: `${metric.value}%` }}
                                />
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Plating Presentation */}
                        <div className="pt-4 border-t border-white/10 space-y-1">
                          <span className="text-xs font-mono uppercase tracking-wider text-[#C5A059] block">
                            Plating Architecture & Presentation
                          </span>
                          <p className="text-xs text-neutral-300 font-sans leading-relaxed">
                            {masterclass.platingPresentation}
                          </p>
                        </div>
                      </div>

                      {/* Sommelier Cellar Pairing */}
                      <div className="p-5 rounded-xl bg-[#171717] border border-white/10 space-y-4">
                        <div className="flex items-center gap-2 text-[#C5A059] text-xs font-mono uppercase tracking-wider">
                          <Wine className="w-4 h-4" />
                          <span>Grand Sommelier Cellar Selection</span>
                        </div>

                        <div className="p-4 rounded-lg bg-black/40 border border-white/10 space-y-3">
                          <div>
                            <span className="text-[10px] font-mono text-[#C5A059] uppercase tracking-wider block">
                              Recommended Vintage & Producer
                            </span>
                            <h4 className="text-sm font-serif text-white font-medium">
                              {masterclass.sommelierPairing.vintage}
                            </h4>
                          </div>

                          <div>
                            <span className="text-[10px] font-mono text-neutral-400 block">Terroir & Soil Profile:</span>
                            <span className="text-xs text-neutral-300">{masterclass.sommelierPairing.terroir}</span>
                          </div>

                          <div>
                            <span className="text-[10px] font-mono text-neutral-400 block">Sommelier Tasting Note:</span>
                            <p className="text-xs text-neutral-300 italic leading-relaxed">
                              "{masterclass.sommelierPairing.tastingNote}"
                            </p>
                          </div>
                        </div>

                        {/* Quick Switch to other Archive Masterclasses */}
                        <div className="space-y-2 pt-2">
                          <span className="text-xs font-mono uppercase tracking-wider text-[#C5A059] block">
                            Explore Archive Terroir Masterclasses
                          </span>
                          <div className="grid grid-cols-2 gap-2">
                            {allIngredients.slice(0, 4).map((ing) => (
                              <button
                                key={ing.id}
                                onClick={() => {
                                  setCurrentIngredient(ing);
                                  loadOrGenerateMasterclass(ing);
                                }}
                                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-left transition-colors"
                              >
                                <span className="text-xs text-[#F5F5F0] font-serif block truncate">{ing.name}</span>
                                <span className="text-[10px] font-mono text-neutral-400">{ing.origin}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);
}
