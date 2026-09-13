import React, { useState, useEffect } from 'react';
import {
  Volume2,
  VolumeX,
  Eye,
  Type,
  SunMoon,
  Sparkles,
  HelpCircle,
  X,
  Layers,
  Flame,
  Check
} from 'lucide-react';
import { accessibilityService, AccessibilitySettings, TextScale } from '../services/accessibilityService';

interface TopAccessibilityBarProps {
  currentPageTitle?: string;
  currentPageNumber?: number;
  totalPageCount?: number;
  onPageChange?: (page: number) => void;
}

export const TopAccessibilityBar: React.FC<TopAccessibilityBarProps> = ({
  currentPageTitle = 'Haute Gastronomy Matrix',
  currentPageNumber,
  totalPageCount,
  onPageChange
}) => {
  const [settings, setSettings] = useState<AccessibilitySettings>(accessibilityService.getSettings());
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    const unsub = accessibilityService.subscribe((s) => setSettings(s));
    return () => unsub();
  }, []);

  const handleCycleText = () => {
    accessibilityService.cycleTextScale();
  };

  const handleToggleContrast = () => {
    accessibilityService.toggleHighContrast();
  };

  const handleToggleDyslexic = () => {
    accessibilityService.toggleDyslexicFont();
  };

  const handleToggleMotion = () => {
    accessibilityService.toggleReducedMotion();
  };

  const handleToggleVoice = () => {
    const active = accessibilityService.toggleVoiceNarration();
    setIsSpeaking(active);
    if (active) {
      accessibilityService.speakText(
        `Welcome to Stassen's Collection of Ingredients. You are currently viewing ${currentPageTitle}${
          currentPageNumber ? `, Page ${currentPageNumber} of ${totalPageCount || 1}` : ''
        }. Tap any recipe card or specimen to hear detailed audio narration.`
      );
    }
  };

  return (
    <aside
      id="top-accessibility-bar"
      aria-label="Accessibility & Page Navigation Toolbar"
      className="w-full bg-[#0d0d0d] border-b border-[#F5F5F0]/15 text-[#F5F5F0] text-[11px] py-2 px-3 sm:px-6 relative z-50 shadow-md"
    >
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-y-2 gap-x-4">
        {/* Left: Prominent Page Number & Section Indicator */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2 bg-[#1A1A1A] border border-[#F5F5F0]/20 px-2.5 py-1 rounded-sm shadow-inner">
            <span className="w-2 h-2 rounded-full bg-[#C5A059] animate-pulse" />
            <span className="font-mono uppercase tracking-wider text-[10px] text-[#C5A059] font-bold inline-flex items-center gap-1">
              <span>PAGE</span>
              <span className="text-white text-xs px-1 bg-[#C5A059]/20 border border-[#C5A059]/40 rounded-sm font-bold">
                {currentPageNumber || 1}
              </span>
              <span>OF</span>
              <span>{totalPageCount || 'ARCHIVE'}</span>
            </span>
          </div>

          {currentPageNumber === 1 && (
            <span className="hidden md:inline-flex items-center space-x-1 text-[10px] uppercase tracking-wider text-amber-300 bg-amber-950/60 border border-amber-500/40 px-2 py-0.5 rounded-sm">
              <Flame className="w-3 h-3 text-amber-400 fill-current animate-bounce" />
              <span>Page 1: Hottest Masterclasses</span>
            </span>
          )}

          {/* Quick Page 1 Jump if on higher page */}
          {currentPageNumber && currentPageNumber > 1 && onPageChange && (
            <button
              onClick={() => onPageChange(1)}
              className="text-[10px] uppercase tracking-widest text-[#C5A059] hover:underline flex items-center space-x-1"
            >
              <Flame className="w-2.5 h-2.5" />
              <span>Jump to Page 1</span>
            </button>
          )}
        </div>

        {/* Right: Accessibility Toolbar Controls */}
        <div className="flex items-center flex-wrap gap-1.5 sm:gap-2">
          <span className="hidden lg:inline text-[9px] uppercase tracking-[0.2em] text-[#F5F5F0]/50 font-mono mr-1">
            Accessibility:
          </span>

          {/* Text Size Scale Toggle */}
          <button
            id="a11y-text-size-btn"
            onClick={handleCycleText}
            title={`Adjust text size (Current: ${settings.textScale.toUpperCase()})`}
            aria-label="Cycle font size"
            className="flex items-center space-x-1 px-2.5 py-1 bg-[#1A1A1A] hover:bg-[#252525] border border-[#F5F5F0]/20 hover:border-[#C5A059] text-xs font-mono transition-colors"
          >
            <Type className="w-3.5 h-3.5 text-[#C5A059]" />
            <span className="font-bold">
              {settings.textScale === 'normal' ? 'A (100%)' : settings.textScale === 'large' ? 'A+ (115%)' : 'A++ (130%)'}
            </span>
          </button>

          {/* High Contrast Mode Toggle */}
          <button
            id="a11y-contrast-btn"
            onClick={handleToggleContrast}
            title="Toggle High Contrast Mode (WCAG AAA)"
            aria-label="Toggle high contrast"
            className={`flex items-center space-x-1 px-2 py-1 border transition-colors ${
              settings.highContrast
                ? 'bg-amber-400 text-black border-amber-300 font-bold'
                : 'bg-[#1A1A1A] hover:bg-[#252525] border-[#F5F5F0]/20 text-[#F5F5F0]'
            }`}
          >
            <SunMoon className="w-3.5 h-3.5" />
            <span className="text-[10px] uppercase tracking-wider hidden sm:inline">
              {settings.highContrast ? 'High Contrast ON' : 'Contrast'}
            </span>
          </button>

          {/* Dyslexic / High-Legibility Font */}
          <button
            id="a11y-font-btn"
            onClick={handleToggleDyslexic}
            title="Toggle Ultra-Legible Dyslexic Font"
            aria-label="Toggle legible font"
            className={`flex items-center space-x-1 px-2 py-1 border transition-colors ${
              settings.dyslexicFont
                ? 'bg-[#C5A059] text-black border-[#C5A059] font-bold'
                : 'bg-[#1A1A1A] hover:bg-[#252525] border-[#F5F5F0]/20 text-[#F5F5F0]'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span className="text-[10px] uppercase tracking-wider hidden sm:inline">
              {settings.dyslexicFont ? 'Legible Font ON' : 'Legible Font'}
            </span>
          </button>

          {/* Reduced Motion Toggle */}
          <button
            id="a11y-motion-btn"
            onClick={handleToggleMotion}
            title="Toggle Reduced Motion / Animations"
            aria-label="Toggle reduced motion"
            className={`flex items-center space-x-1 px-2 py-1 border transition-colors ${
              settings.reducedMotion
                ? 'bg-emerald-600 text-white border-emerald-400 font-bold'
                : 'bg-[#1A1A1A] hover:bg-[#252525] border-[#F5F5F0]/20 text-[#F5F5F0]'
            }`}
          >
            <span className="text-[10px] font-mono">⚡</span>
            <span className="text-[10px] uppercase tracking-wider hidden sm:inline">
              {settings.reducedMotion ? 'Motion Reduced' : 'Motion'}
            </span>
          </button>

          {/* Text-to-Speech Voice Assistant */}
          <button
            id="a11y-voice-btn"
            onClick={handleToggleVoice}
            title="Voice Reader & Step Audio Narration"
            aria-label="Voice narrator"
            className={`flex items-center space-x-1.5 px-2.5 py-1 border transition-colors ${
              settings.screenReaderActive
                ? 'bg-[#C5A059] text-black border-[#C5A059] font-bold'
                : 'bg-[#1A1A1A] hover:bg-[#252525] border-[#F5F5F0]/20 text-[#F5F5F0]'
            }`}
          >
            {settings.screenReaderActive ? (
              <Volume2 className="w-3.5 h-3.5 animate-pulse text-black" />
            ) : (
              <VolumeX className="w-3.5 h-3.5 text-[#C5A059]" />
            )}
            <span className="text-[10px] uppercase tracking-wider">
              {settings.screenReaderActive ? 'Voice Reading' : 'Audio Reader'}
            </span>
          </button>

          {/* Accessibility Guide Modal */}
          <button
            onClick={() => setShowHelpModal(true)}
            title="Accessibility Guide & Keyboard Navigation"
            aria-label="Accessibility help"
            className="p-1 hover:text-[#C5A059] transition-colors"
          >
            <HelpCircle className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Accessibility Modal Dialog */}
      {showHelpModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="a11y-modal-title"
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <div className="bg-[#181818] border border-[#C5A059]/40 max-w-lg w-full p-6 text-[#F5F5F0] shadow-2xl relative">
            <button
              onClick={() => setShowHelpModal(false)}
              aria-label="Close accessibility modal"
              className="absolute top-4 right-4 text-[#F5F5F0]/60 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 id="a11y-modal-title" className="font-serif text-xl text-[#C5A059] mb-3 flex items-center space-x-2">
              <Eye className="w-5 h-5" />
              <span>Accessibility & Sensory Assistance</span>
            </h3>

            <p className="text-xs text-[#F5F5F0]/80 leading-relaxed mb-4">
              Stassen's Collection of Ingredients is committed to Universal Sensory Accessibility (WCAG 2.1 AAA standards) for all culinary researchers, chefs, and visually-assisted visitors.
            </p>

            <div className="space-y-3 text-xs mb-6">
              <div className="p-2.5 bg-[#202020] border border-white/5 flex items-start space-x-3">
                <Type className="w-4 h-4 text-[#C5A059] mt-0.5 shrink-0" />
                <div>
                  <strong className="text-white block">Font Scaling (A / A+ / A++)</strong>
                  <span className="text-[#F5F5F0]/60">Cycles typography scale from 100% to 115% and 130% across all recipe steps and specimen taxonomy.</span>
                </div>
              </div>

              <div className="p-2.5 bg-[#202020] border border-white/5 flex items-start space-x-3">
                <SunMoon className="w-4 h-4 text-[#C5A059] mt-0.5 shrink-0" />
                <div>
                  <strong className="text-white block">High Contrast Monochrome Mode</strong>
                  <span className="text-[#F5F5F0]/60">Pure black backgrounds with radiant gold accents meeting 7:1 contrast ratios.</span>
                </div>
              </div>

              <div className="p-2.5 bg-[#202020] border border-white/5 flex items-start space-x-3">
                <Volume2 className="w-4 h-4 text-[#C5A059] mt-0.5 shrink-0" />
                <div>
                  <strong className="text-white block">Speech Synthesis Voice Narrator</strong>
                  <span className="text-[#F5F5F0]/60">Speaks culinary steps, time offsets, temperature triggers, and specimen terroir notes in real time.</span>
                </div>
              </div>

              <div className="p-2.5 bg-[#202020] border border-white/5 flex items-start space-x-3">
                <span className="font-mono text-sm font-bold text-[#C5A059] mt-0.5 shrink-0">⌘K</span>
                <div>
                  <strong className="text-white block">Keyboard Navigation</strong>
                  <span className="text-[#F5F5F0]/60">Press <strong>⌘K</strong> (or Ctrl+K) anywhere to instantly open the search portal. Press <strong>Tab</strong> to navigate all interactive elements with high-visibility gold focus rings.</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowHelpModal(false)}
              className="w-full py-2.5 bg-[#C5A059] text-black font-semibold text-xs uppercase tracking-widest hover:bg-[#d6b168]"
            >
              Close Accessibility Guide
            </button>
          </div>
        </div>
      )}
    </aside>
  );
};
