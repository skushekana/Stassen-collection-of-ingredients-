import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, ExternalLink, ShieldCheck, Gift, Clock, ArrowRight } from 'lucide-react';
import { AdManager, InterstitialAdData } from '../../services/adManager';
import { AppView } from '../../types';
import { SafeImage } from '../SafeImage';
import { GLOBAL_CULINARY_FALLBACK } from '../../utils/imageFallback';

interface InAppInterstitialAdProps {
  currentView: AppView;
}

const TOTAL_COUNTDOWN_SECONDS = 5;

export const InAppInterstitialAd: React.FC<InAppInterstitialAdProps> = ({ currentView }) => {
  const [activeAd, setActiveAd] = useState<InterstitialAdData | null>(null);
  const [secondsRemaining, setSecondsRemaining] = useState<number>(TOTAL_COUNTDOWN_SECONDS);
  const countdownIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Subscribe to interstitial / in-app popunder ad triggers
  useEffect(() => {
    const unsubscribe = AdManager.onInterstitial((ad) => {
      setActiveAd(ad);
      if (ad) {
        setSecondsRemaining(TOTAL_COUNTDOWN_SECONDS);
      }
    });

    return () => {
      unsubscribe();
      if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
    };
  }, []);

  // Run 5-second countdown timer when an ad is active on screen
  useEffect(() => {
    if (!activeAd) {
      if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
      return;
    }

    setSecondsRemaining(TOTAL_COUNTDOWN_SECONDS);

    countdownIntervalRef.current = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
          // Auto-close on countdown expiration
          AdManager.closeInterstitial();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
    };
  }, [activeAd]);

  const handleClose = (e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
    AdManager.closeInterstitial();
  };

  const handleCtaClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!activeAd) return;

    try {
      if (activeAd.smartlinkUrl) {
        window.open(activeAd.smartlinkUrl, '_blank', 'noopener,noreferrer');
      }
    } catch (err) {
      console.warn('Smartlink CTA click note:', err);
    }

    if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
    AdManager.closeInterstitial();
  };

  if (!activeAd) return null;

  const progressPercent = ((TOTAL_COUNTDOWN_SECONDS - secondsRemaining) / TOTAL_COUNTDOWN_SECONDS) * 100;

  return (
    <AnimatePresence>
      <div
        id="in-app-interstitial-overlay"
        data-no-ad="true"
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md transition-opacity duration-300"
        onClick={handleClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 15 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-xl bg-[#181818] border-2 border-[#C5A059]/60 shadow-2xl shadow-black rounded-2xl overflow-hidden flex flex-col relative"
        >
          {/* Top Header with Live 5-Second Timer Bar */}
          <div className="bg-[#121212] px-3.5 py-2.5 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#C5A059] font-bold truncate max-w-[200px] sm:max-w-xs">
                {activeAd.sponsorName} • PARTNER SHOWCASE
              </span>
            </div>

            {/* 5-Second Countdown Badge & Close Button */}
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1.5 px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-white/80 text-[11px] font-mono">
                <Clock className="w-3 h-3 text-[#C5A059] animate-spin" style={{ animationDuration: '3s' }} />
                <span>
                  {secondsRemaining > 0 ? `Auto-close in ${secondsRemaining}s` : 'Closing...'}
                </span>
              </div>

              {/* Close / Skip button */}
              <button
                onClick={handleClose}
                className="flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-[#C5A059]/20 hover:bg-[#C5A059]/30 text-[#C5A059] hover:text-white text-xs font-mono font-bold transition-all border border-[#C5A059]/40 active:scale-95"
                title="Close Ad and continue immediately"
                aria-label="Close Advertisement"
              >
                <span>Close</span>
                <X className="w-3.5 h-3.5 ml-0.5" />
              </button>
            </div>
          </div>

          {/* 5-Second Progress Line Indicator */}
          <div className="w-full h-1 bg-white/5 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#C5A059] to-[#E6A15C] transition-all duration-1000 ease-linear"
              style={{ width: `${100 - progressPercent}%` }}
            />
          </div>

          {/* Hero Visual Area */}
          <div className="relative h-40 sm:h-48 w-full overflow-hidden bg-black">
            <SafeImage
              src={activeAd.imageUrl}
              alt={activeAd.title}
              fallbackSrc={GLOBAL_CULINARY_FALLBACK}
              className="w-full h-full object-cover brightness-90 hover:scale-105 transition-transform duration-700"
              containerClassName="w-full h-full"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-black/40 to-transparent"></div>

            {/* Floating Badge */}
            <div className="absolute top-3 left-3 px-2.5 py-1 bg-black/80 backdrop-blur-sm border border-[#C5A059] text-[#C5A059] font-mono text-[9px] sm:text-[10px] font-bold uppercase tracking-wider shadow-lg flex items-center space-x-1.5 rounded-sm">
              <Sparkles className="w-3 h-3 text-[#C5A059]" />
              <span>{activeAd.badge}</span>
            </div>

            {/* Bottom In-Image Title */}
            <div className="absolute bottom-3 left-4 right-4">
              <h3 className="text-lg sm:text-xl font-serif italic text-white font-bold drop-shadow-md leading-tight">
                {activeAd.title}
              </h3>
              <p className="text-[11px] sm:text-xs text-[#C5A059] font-mono font-medium drop-shadow mt-0.5">
                {activeAd.headline}
              </p>
            </div>
          </div>

          {/* Ad Description & Value Proposition */}
          <div className="p-4 sm:p-5 space-y-3.5 bg-[#181818]">
            <p className="text-xs sm:text-sm text-[#F5F5F0]/85 font-sans leading-relaxed">
              {activeAd.description}
            </p>

            {/* Special Offer Box */}
            <div className="p-2.5 sm:p-3 rounded-xl bg-black/60 border border-[#C5A059]/40 flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-[#C5A059]/15 text-[#C5A059] shrink-0">
                <Gift className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-[9px] uppercase tracking-wider text-[#C5A059] font-mono font-bold block">
                  Exclusive Privilege
                </span>
                <span className="text-xs text-white font-medium truncate block">
                  {activeAd.offerText}
                </span>
              </div>
            </div>

            {/* Actions: Primary CTA and Close Button */}
            <div className="pt-1 flex flex-col sm:flex-row items-center gap-2.5">
              <button
                id="in-app-interstitial-cta-btn"
                onClick={handleCtaClick}
                className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-[#C5A059] to-[#E6A15C] hover:from-[#d6b168] hover:to-[#f0b070] text-black font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-2 shadow-xl shadow-amber-900/20 transition-all duration-200 active:scale-95"
              >
                <span>{activeAd.ctaText}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={handleClose}
                className="w-full sm:w-auto py-3 px-5 rounded-xl bg-[#242424] hover:bg-[#2e2e2e] text-white/80 hover:text-white font-mono text-xs font-semibold uppercase tracking-wider transition-colors border border-white/10 flex items-center justify-center space-x-1.5"
              >
                <span>Close ({secondsRemaining}s)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Footer Assurance */}
            <div className="flex items-center justify-between text-[9px] font-mono text-white/40 pt-1 border-t border-white/5">
              <span className="flex items-center space-x-1">
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                <span>Verified Haute Partner • In-App Showcase</span>
              </span>
              <span>Dismissible Anytime</span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
