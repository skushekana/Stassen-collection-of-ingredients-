import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Play,
  Pause,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  Volume2,
  VolumeX,
  Flame,
  Clock,
  Sparkles,
  ChefHat,
  Wine,
  CheckCircle2,
  AlertCircle,
  ShoppingBag,
  ListOrdered,
  Maximize2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CulinaryMasterclass, MasterclassStep } from '../types';
import { CulinaryImage } from './CulinaryImage';
import { RecipeScalerControl } from './RecipeScalerControl';
import { scaleAndConvertAmount, MeasurementSystem } from '../utils/recipeScaling';

interface InteractiveCookModalProps {
  recipe: CulinaryMasterclass | null;
  onClose: () => void;
}

interface ActiveTimer {
  id: string;
  label: string;
  secondsRemaining: number;
  totalSeconds: number;
  isRunning: boolean;
}

export const InteractiveCookModal: React.FC<InteractiveCookModalProps> = ({
  recipe,
  onClose,
}) => {
  const steps = recipe?.timelineSteps || [];

  // Restore step from sessionStorage if available for this recipe
  const storageKey = recipe ? `cooking_step_${recipe.id}` : '';
  const initialStep = (() => {
    if (!storageKey) return 0;
    const saved = sessionStorage.getItem(storageKey);
    if (saved !== null) {
      const idx = parseInt(saved, 10);
      if (!isNaN(idx) && idx >= 0 && idx < steps.length) return idx;
    }
    return 0;
  })();

  const [currentStepIndex, setCurrentStepIndex] = useState<number>(initialStep);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [isVoiceNarrationActive, setIsVoiceNarrationActive] = useState<boolean>(false);
  const [isSommelierOpen, setIsSommelierOpen] = useState<boolean>(false);
  const [isIngredientDrawerOpen, setIsIngredientDrawerOpen] = useState<boolean>(false);
  
  // Scaling state synchronized with cooking mode
  const [currentServings, setCurrentServings] = useState<number>(recipe?.servings || 4);
  const [measurementSystem, setMeasurementSystem] = useState<MeasurementSystem>('original');
  const [scaledIngredientsList, setScaledIngredientsList] = useState<any[]>(recipe?.ingredientsList || []);

  // Multiple Timers State
  const [timers, setTimers] = useState<ActiveTimer[]>([]);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const currentStep: MasterclassStep | undefined = steps[currentStepIndex] || steps[0];

  // Save current step to sessionStorage
  useEffect(() => {
    if (recipe && storageKey) {
      sessionStorage.setItem(storageKey, String(currentStepIndex));
    }
  }, [currentStepIndex, recipe, storageKey]);

  // Screen Wake Lock API to prevent phone screen from going blank
  useEffect(() => {
    let wakeLock: any = null;
    async function requestWakeLock() {
      if ('wakeLock' in navigator) {
        try {
          wakeLock = await (navigator.wakeLock as any).request('screen');
        } catch (err) {
          console.warn('Wake Lock error:', err);
        }
      }
    }
    requestWakeLock();
    return () => {
      if (wakeLock) {
        wakeLock.release().catch(() => {});
      }
    };
  }, [recipe]);

  // Initialize timers when step changes or recipe loads
  useEffect(() => {
    if (currentStep) {
      const stepSecs = currentStep.timeOffsetSeconds || 300; // default 5 mins if unspecified
      const newTimer: ActiveTimer = {
        id: `step-${currentStepIndex}`,
        label: `Step ${currentStepIndex + 1}: ${currentStep.title}`,
        secondsRemaining: stepSecs,
        totalSeconds: stepSecs,
        isRunning: false
      };
      // Check if timer for this step already exists
      setTimers(prev => {
        if (prev.some(t => t.id === newTimer.id)) return prev;
        return [newTimer, ...prev];
      });
    }
  }, [currentStepIndex, currentStep]);

  // Global Timer tick interval for all active timers
  useEffect(() => {
    timerIntervalRef.current = setInterval(() => {
      setTimers(prev =>
        prev.map(t => {
          if (t.isRunning && t.secondsRemaining > 0) {
            return { ...t, secondsRemaining: t.secondsRemaining - 1 };
          }
          if (t.isRunning && t.secondsRemaining <= 0) {
            return { ...t, isRunning: false };
          }
          return t;
        })
      );
    }, 1000);

    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, []);

  // Timer actions
  const toggleTimer = (id: string) => {
    setTimers(prev =>
      prev.map(t => (t.id === id ? { ...t, isRunning: !t.isRunning } : t))
    );
  };

  const resetTimer = (id: string) => {
    setTimers(prev =>
      prev.map(t => (t.id === id ? { ...t, secondsRemaining: t.totalSeconds, isRunning: false } : t))
    );
  };

  const addCustomTimer = (minutes: number, label: string) => {
    const secs = minutes * 60;
    const newTimer: ActiveTimer = {
      id: `custom-${Date.now()}`,
      label: label || 'Custom Timer',
      secondsRemaining: secs,
      totalSeconds: secs,
      isRunning: true
    };
    setTimers(prev => [newTimer, ...prev]);
  };

  // Keyboard navigation
  useEffect(() => {
    if (!recipe) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if ('speechSynthesis' in window) window.speechSynthesis.cancel();
        onClose();
      } else if (e.key === 'ArrowLeft' && !['INPUT', 'SELECT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        if (currentStepIndex > 0) setCurrentStepIndex(prev => prev - 1);
      } else if (e.key === 'ArrowRight' && !['INPUT', 'SELECT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        if (currentStepIndex < steps.length - 1) {
          setCompletedSteps(prev => new Set(prev).add(currentStepIndex));
          setCurrentStepIndex(prev => prev + 1);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [recipe, currentStepIndex, steps.length, onClose]);

  // Voiceover narration
  useEffect(() => {
    if (isVoiceNarrationActive && currentStep?.spokenNarration) {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(currentStep.spokenNarration);
        utterance.rate = 0.95;
        utterance.pitch = 0.95;
        utterance.onend = () => setIsVoiceNarrationActive(false);
        window.speechSynthesis.speak(utterance);
      }
    } else {
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    }
    return () => {
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    };
  }, [isVoiceNarrationActive, currentStepIndex, currentStep]);

  const handleNext = () => {
    setCompletedSteps(prev => new Set(prev).add(currentStepIndex));
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
    }
  };

  const toggleStepComplete = () => {
    setCompletedSteps(prev => {
      const next = new Set(prev);
      if (next.has(currentStepIndex)) {
        next.delete(currentStepIndex);
      } else {
        next.add(currentStepIndex);
        // Automatically advance if marked complete and not last step
        if (currentStepIndex < steps.length - 1) {
          setTimeout(() => setCurrentStepIndex(i => i + 1), 300);
        }
      }
      return next;
    });
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    return `${String(mins).padStart(2, '0')}:${String(remainder).padStart(2, '0')}`;
  };

  if (!recipe) return null;

  const multiplier = currentServings / (recipe.servings || 4);

  return (
    <div
      id="interactive-cook-modal"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-2xl p-0 sm:p-4 overflow-y-auto"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-5xl bg-[#121212] border border-[#F5F5F0]/15 sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col h-full sm:h-[95vh]"
      >
        {/* Top Header Bar */}
        <header className="px-4 sm:px-6 py-3.5 border-b border-[#F5F5F0]/10 flex items-center justify-between bg-[#181818] sticky top-0 z-30">
          <div className="flex items-center space-x-3">
            <button
              id="cook-back-btn"
              onClick={onClose}
              className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-[#222222] hover:bg-[#2e2e2e] border border-[#F5F5F0]/15 text-[#F5F5F0] hover:text-[#C5A059] transition-all text-xs font-mono group min-h-[44px]"
              title="Exit Cooking Mode (Esc)"
            >
              <ArrowLeft className="w-4 h-4 text-[#C5A059]" />
              <span className="font-medium">Exit Cooking Mode</span>
            </button>

            <div className="hidden md:flex items-center space-x-2">
              <span className="px-2.5 py-1 rounded text-[10px] font-mono uppercase bg-[#C5A059]/20 text-[#C5A059] font-bold">
                {recipe.countryRegion || recipe.cuisine || 'Haute Gastronomy'}
              </span>
              <span className="text-xs text-[#F5F5F0]/60 font-serif italic truncate max-w-xs">
                {recipe.dishTitle}
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-2.5">
            {/* Toggle Ingredient Manifest Drawer */}
            <button
              onClick={() => setIsIngredientDrawerOpen(true)}
              className="flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-[#222] hover:bg-[#2b2b2b] border border-[#C5A059]/40 text-[#C5A059] text-xs font-mono transition-all min-h-[44px]"
              title="View Ingredients List (Maintains Current Step)"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">Ingredients ({scaledIngredientsList.length})</span>
            </button>

            {/* Sommelier Pairing Toggle */}
            {recipe.sommelierPairing && (
              <button
                onClick={() => setIsSommelierOpen(!isSommelierOpen)}
                className={`flex items-center space-x-1.5 px-3 py-2 rounded-xl border text-xs font-mono transition-all min-h-[44px] ${
                  isSommelierOpen
                    ? 'bg-[#C5A059] text-black border-[#C5A059]'
                    : 'bg-[#202020] border-[#F5F5F0]/15 text-[#F5F5F0]/80 hover:text-[#C5A059]'
                }`}
              >
                <Wine className="w-4 h-4" />
                <span className="hidden sm:inline">Sommelier</span>
              </button>
            )}

            {/* Close */}
            <button
              onClick={onClose}
              aria-label="Close cooking mode"
              className="p-2.5 rounded-xl bg-[#202020] hover:bg-[#2a2a2a] border border-[#F5F5F0]/15 text-[#F5F5F0]/80 hover:text-[#F5F5F0] min-h-[44px] min-w-[44px] flex items-center justify-center"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Step Progress Bar */}
        <div className="w-full bg-[#1c1c1c] h-2 flex">
          {steps.map((_, idx) => (
            <div
              key={idx}
              onClick={() => setCurrentStepIndex(idx)}
              className={`h-full flex-1 cursor-pointer transition-all duration-300 ${
                idx === currentStepIndex
                  ? 'bg-[#C5A059]'
                  : completedSteps.has(idx)
                  ? 'bg-emerald-500'
                  : 'bg-transparent border-r border-[#121212]'
              }`}
              title={`Jump to step ${idx + 1}`}
            />
          ))}
        </div>

        {/* Main Cooking Mode Workspace (Mobile First) */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-y-auto">
          {/* Left Column: Visual & Timers Tray */}
          <div className="lg:col-span-5 border-b lg:border-b-0 lg:border-r border-[#F5F5F0]/10 bg-[#0d0d0d] p-5 sm:p-6 flex flex-col justify-between space-y-6">
            <div className="space-y-5">
              {/* Step Image */}
              <div className="relative aspect-video sm:aspect-[4/3] rounded-2xl overflow-hidden border border-[#F5F5F0]/15 shadow-2xl bg-black">
                <CulinaryImage
                  src={currentStep?.imageUrl || recipe.heroImageUrl}
                  alt={currentStep?.title || recipe.dishTitle}
                  cuisine={recipe.cuisine}
                  category={recipe.primaryIngredientName}
                  className="w-full h-full object-cover"
                  priority={true}
                />
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-[#C5A059]/40 text-[#C5A059] text-[10px] font-mono tracking-widest uppercase font-bold flex items-center space-x-1.5 shadow-lg">
                  <ChefHat className="w-3.5 h-3.5" />
                  <span>Step {currentStepIndex + 1} of {steps.length}</span>
                </div>
              </div>

              {/* Active Timers Tray (Supports Multiple Timers) */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase tracking-wider text-[#C5A059] flex items-center space-x-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Active Kitchen Timers ({timers.length})</span>
                  </span>
                  <div className="flex items-center space-x-1">
                    <button
                      onClick={() => addCustomTimer(5, '5 Min Simmer')}
                      className="px-2 py-1 rounded bg-[#222] hover:bg-[#333] border border-white/10 text-[10px] font-mono text-neutral-300"
                    >
                      +5m Timer
                    </button>
                    <button
                      onClick={() => addCustomTimer(10, '10 Min Rest')}
                      className="px-2 py-1 rounded bg-[#222] hover:bg-[#333] border border-white/10 text-[10px] font-mono text-neutral-300"
                    >
                      +10m Timer
                    </button>
                  </div>
                </div>

                <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
                  {timers.map((timer) => (
                    <div
                      key={timer.id}
                      className={`p-3.5 rounded-2xl border flex items-center justify-between transition-all ${
                        timer.secondsRemaining === 0
                          ? 'bg-rose-950/40 border-rose-500 text-rose-200 animate-pulse'
                          : timer.isRunning
                          ? 'bg-[#1a1814] border-[#C5A059]/60 shadow-lg'
                          : 'bg-[#181818] border-white/10'
                      }`}
                    >
                      <div>
                        <span className="text-[10px] font-mono text-neutral-400 block truncate max-w-[140px] sm:max-w-[180px]">
                          {timer.label}
                        </span>
                        <span className="text-2xl font-mono font-bold tracking-wider text-[#F5F5F0]">
                          {formatTime(timer.secondsRemaining)}
                        </span>
                      </div>

                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => resetTimer(timer.id)}
                          aria-label="Reset timer"
                          className="p-2 rounded-xl bg-[#252525] border border-white/10 text-neutral-300 hover:text-white min-h-[40px] min-w-[40px] flex items-center justify-center"
                          title="Reset Timer"
                        >
                          <RotateCcw className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => toggleTimer(timer.id)}
                          aria-label={timer.isRunning ? 'Pause timer' : 'Start timer'}
                          className={`px-4 py-2 rounded-xl font-mono text-xs font-bold uppercase transition-transform active:scale-95 min-h-[40px] flex items-center space-x-1 ${
                            timer.isRunning
                              ? 'bg-amber-600 hover:bg-amber-500 text-white'
                              : 'bg-[#C5A059] hover:bg-[#d6b168] text-black'
                          }`}
                        >
                          {timer.isRunning ? (
                            <>
                              <Pause className="w-3.5 h-3.5" />
                              <span>Pause</span>
                            </>
                          ) : (
                            <>
                              <Play className="w-3.5 h-3.5 fill-current" />
                              <span>Start</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Voiceover Master Chef Narration */}
            <div className="pt-3 border-t border-[#F5F5F0]/10">
              <button
                onClick={() => setIsVoiceNarrationActive(!isVoiceNarrationActive)}
                className={`w-full py-3.5 px-4 rounded-xl border flex items-center justify-center space-x-2 text-xs font-mono uppercase tracking-wider transition-all min-h-[48px] ${
                  isVoiceNarrationActive
                    ? 'bg-[#C5A059]/20 border-[#C5A059] text-[#C5A059] animate-pulse'
                    : 'bg-[#181818] border-white/10 text-[#F5F5F0]/90 hover:border-[#C5A059]/50 hover:text-[#C5A059]'
                }`}
              >
                {isVoiceNarrationActive ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                <span>{isVoiceNarrationActive ? 'Chef Voice Speaking...' : 'Play Audio Step Narration'}</span>
              </button>
            </div>
          </div>

          {/* Right Column: Step Details, Instructions, Ingredients & Controls */}
          <div className="lg:col-span-7 p-5 sm:p-8 space-y-6 flex flex-col justify-between overflow-y-auto">
            <div className="space-y-6">
              {/* Step Title Header & Mark Complete */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
                <div>
                  <div className="flex items-center space-x-2 text-xs font-mono text-[#C5A059] tracking-widest uppercase mb-1">
                    <span>Chronological Step {currentStepIndex + 1} of {steps.length}</span>
                    {currentStep?.timeOffsetFormatted && (
                      <>
                        <span>•</span>
                        <span>{currentStep.timeOffsetFormatted}</span>
                      </>
                    )}
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-serif text-[#F5F5F0] leading-tight">
                    {currentStep?.title}
                  </h3>
                </div>

                {/* Mark Step Complete Toggle */}
                <button
                  onClick={toggleStepComplete}
                  className={`flex items-center space-x-2 px-5 py-3 rounded-xl border text-xs font-mono uppercase font-bold tracking-wider transition-all min-h-[48px] ${
                    completedSteps.has(currentStepIndex)
                      ? 'bg-emerald-600/20 border-emerald-500 text-emerald-300'
                      : 'bg-[#222] border-white/15 text-[#F5F5F0] hover:border-[#C5A059]'
                  }`}
                >
                  <CheckCircle2 className={`w-5 h-5 ${completedSteps.has(currentStepIndex) ? 'text-emerald-400' : 'text-neutral-400'}`} />
                  <span>{completedSteps.has(currentStepIndex) ? 'Step Completed ✓' : 'Mark Step Complete'}</span>
                </button>
              </div>

              {/* Complete Instruction Box */}
              <div className="p-6 rounded-2xl bg-[#191919] border border-[#F5F5F0]/15 text-[#F5F5F0] text-base sm:text-lg leading-relaxed font-sans shadow-xl">
                {currentStep?.actionDescription}
              </div>

              {/* Critical Control Point & Sensory Cues */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {currentStep?.criticalControlPoint && (
                  <div className="p-4 rounded-2xl bg-amber-950/25 border border-amber-500/30 space-y-1">
                    <span className="flex items-center text-[10px] font-mono uppercase tracking-widest text-amber-400 font-bold">
                      <AlertCircle className="w-3.5 h-3.5 mr-1" />
                      Critical Control Point (CCP)
                    </span>
                    <p className="text-xs text-amber-200/90 leading-relaxed">
                      {currentStep.criticalControlPoint}
                    </p>
                  </div>
                )}

                {currentStep?.sensoryCue && (
                  <div className="p-4 rounded-2xl bg-emerald-950/25 border border-emerald-500/30 space-y-1">
                    <span className="flex items-center text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-bold">
                      <Sparkles className="w-3.5 h-3.5 mr-1" />
                      Sensory Cue
                    </span>
                    <p className="text-xs text-emerald-200/90 leading-relaxed">
                      {currentStep.sensoryCue}
                    </p>
                  </div>
                )}
              </div>

              {/* Step Ingredient Additions (Scaled Automatically) */}
              {currentStep?.ingredientAdditions && currentStep.ingredientAdditions.length > 0 && (
                <div className="space-y-3 pt-2">
                  <span className="text-xs font-mono uppercase tracking-widest text-[#C5A059] block font-bold">
                    Relevant Ingredients for this Step (Scaled for {currentServings} Servings)
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {currentStep.ingredientAdditions.map((item, idx) => {
                      // Scale amount if possible
                      const scaledAmt = scaleAndConvertAmount(item.amount, multiplier, measurementSystem);
                      return (
                        <div
                          key={idx}
                          className="p-3.5 rounded-xl bg-[#181818] border border-[#F5F5F0]/10 flex items-start justify-between"
                        >
                          <div>
                            <span className="font-serif text-sm text-[#F5F5F0] font-medium block">
                              {item.ingredientName}
                            </span>
                            <span className="text-[11px] text-[#C5A059] font-mono">
                              {item.technique}
                            </span>
                          </div>
                          <span className="px-2.5 py-1 rounded bg-[#242424] text-[#C5A059] text-xs font-mono font-bold">
                            {scaledAmt}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Sommelier Note Drawer (if toggled) */}
              {isSommelierOpen && recipe.sommelierPairing && (
                <div className="p-5 rounded-2xl bg-[#1C1A14] border border-[#C5A059]/40 space-y-2">
                  <div className="flex items-center space-x-2 text-[#C5A059]">
                    <Wine className="w-4 h-4" />
                    <span className="text-xs font-mono uppercase tracking-widest font-bold">
                      Sommelier Reserve Pairing
                    </span>
                  </div>
                  <h4 className="font-serif text-base text-[#F5F5F0]">
                    {recipe.sommelierPairing.vintage}
                  </h4>
                  <p className="text-xs text-[#F5F5F0]/80 italic">
                    Terroir: {recipe.sommelierPairing.terroir}
                  </p>
                  <p className="text-xs text-[#F5F5F0]/70 leading-relaxed">
                    {recipe.sommelierPairing.tastingNote}
                  </p>
                </div>
              )}
            </div>

            {/* Bottom Android-Friendly Touch Navigation Controls */}
            <div className="pt-6 border-t border-[#F5F5F0]/10 flex items-center justify-between gap-4 sticky bottom-0 bg-[#121212] pb-2 z-20">
              <button
                onClick={handlePrev}
                disabled={currentStepIndex === 0}
                className="flex items-center space-x-2 px-6 py-4 rounded-2xl bg-[#1c1c1c] border border-white/15 text-xs font-mono uppercase tracking-wider text-[#F5F5F0] hover:border-[#C5A059] disabled:opacity-30 disabled:pointer-events-none transition-all min-h-[52px]"
              >
                <ChevronLeft className="w-5 h-5 text-[#C5A059]" />
                <span className="font-bold">Previous</span>
              </button>

              <div className="text-center hidden sm:block">
                <span className="text-xs font-mono text-[#F5F5F0]/60">
                  Step {currentStepIndex + 1} of {steps.length}
                </span>
              </div>

              {currentStepIndex === steps.length - 1 ? (
                <button
                  onClick={onClose}
                  className="flex items-center space-x-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-mono text-xs font-bold uppercase tracking-wider shadow-xl shadow-emerald-900/40 transition-transform active:scale-95 min-h-[52px]"
                >
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Finish Recipe</span>
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="flex items-center space-x-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-[#D97706] to-[#B45309] hover:from-[#F59E0B] hover:to-[#D97706] text-white font-mono text-xs font-bold uppercase tracking-wider shadow-xl shadow-amber-900/40 transition-transform active:scale-95 min-h-[52px]"
                >
                  <span className="font-bold">Next Step</span>
                  <ChevronRight className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Slide-over Ingredient Manifest Modal (Accessible without losing cooking step) */}
      <AnimatePresence>
        {isIngredientDrawerOpen && (
          <div
            className="fixed inset-0 z-60 bg-black/80 backdrop-blur-md flex items-center justify-end p-0 sm:p-4"
            onClick={() => setIsIngredientDrawerOpen(false)}
          >
            <motion.div
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md bg-[#181818] border-l border-white/15 h-full sm:h-[92vh] sm:rounded-2xl shadow-2xl flex flex-col p-6 overflow-y-auto space-y-6"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <h3 className="font-serif text-lg text-[#F5F5F0]">Recipe Ingredient Manifest</h3>
                  <p className="text-xs font-mono text-[#C5A059]">Synchronized with Cooking Mode</p>
                </div>
                <button
                  onClick={() => setIsIngredientDrawerOpen(false)}
                  className="p-2 rounded-xl bg-[#252525] text-white hover:bg-[#333]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Embedded Recipe Scaler inside the Ingredient Drawer */}
              <RecipeScalerControl
                baseServings={recipe.servings || 4}
                ingredients={recipe.ingredientsList}
                recipeTitle={recipe.dishTitle}
                onScaledChange={(scaled, s, sys) => {
                  setCurrentServings(s);
                  setMeasurementSystem(sys);
                  setScaledIngredientsList(scaled);
                }}
              />

              <div className="space-y-2.5 flex-1 overflow-y-auto pr-1">
                {scaledIngredientsList.map((item, idx) => (
                  <div key={idx} className="flex items-start justify-between text-xs py-2 border-b border-white/5">
                    <div>
                      <span className={`font-medium ${item.isArchiveSpecialty ? 'text-[#C5A059]' : 'text-neutral-200'}`}>
                        {item.name}
                      </span>
                      <p className="text-[10px] text-neutral-400">{item.prepState}</p>
                    </div>
                    <span className="text-xs font-mono text-[#C5A059] font-bold ml-3 whitespace-nowrap">
                      {item.amount}
                    </span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setIsIngredientDrawerOpen(false)}
                className="w-full py-3 rounded-xl bg-[#C5A059] text-black font-mono text-xs font-bold uppercase"
              >
                Return to Cooking Step
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
