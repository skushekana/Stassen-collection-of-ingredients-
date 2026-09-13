import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, ExternalLink, EyeOff } from 'lucide-react';
import { AdManager } from '../../services/adManager';
import { AdSettings, AppView } from '../../types';

interface SocialBarAdProps {
  currentView: AppView;
}

// 1 minute (60,000 ms) wait period after user presses on something
const POST_INTERACTION_WAIT_MS = 60000;

export const SocialBarAd: React.FC<SocialBarAdProps> = ({ currentView }) => {
  const [settings, setSettings] = useState<AdSettings>(() => AdManager.getSettings());
  const [isVisible, setIsVisible] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  
  // States:
  // 'initial' : haven't been dismissed by user yet
  // 'hidden_dormant' : user clicked Hide; sitting dormant waiting for user to click something on the page
  // 'hidden_countdown' : user clicked something on the page; currently waiting the 1-minute period
  // 'shown' : currently visible
  const [status, setStatus] = useState<'initial' | 'hidden_dormant' | 'hidden_countdown' | 'shown'>('initial');

  const currentViewRef = useRef<AppView>(currentView);
  currentViewRef.current = currentView;

  const scriptContainerRef = useRef<HTMLDivElement>(null);
  const countdownTimerRef = useRef<NodeJS.Timeout | null>(null);
  const initialMountTimerRef = useRef<NodeJS.Timeout | null>(null);
  const lastHideTimestampRef = useRef<number>(0);
  const clickListenerActiveRef = useRef<boolean>(false);

  // Subscribe to ad settings updates
  useEffect(() => {
    const unsubscribe = AdManager.subscribe((newSettings) => {
      setSettings(newSettings);
    });
    return () => unsubscribe();
  }, []);

  // Initial appearance check on first mount or route navigation
  useEffect(() => {
    const check = AdManager.canShowSocialBar(currentView);
    if (!check.allowed) {
      setIsVisible(false);
      return;
    }

    // If user previously hid the ad, DO NOT auto-show on route change or timer.
    // It must stay hidden until the user presses something and the 1-minute countdown finishes.
    if (status === 'hidden_dormant' || status === 'hidden_countdown') {
      return;
    }

    // Initial mount slight delay (1.5s) for smooth entrance
    if (initialMountTimerRef.current) clearTimeout(initialMountTimerRef.current);
    initialMountTimerRef.current = setTimeout(() => {
      const recheck = AdManager.canShowSocialBar(currentView);
      if (recheck.allowed && status === 'initial') {
        setIsVisible(true);
        setStatus('shown');
        AdManager.recordSocialBarImpression();
      }
    }, 1500);

    return () => {
      if (initialMountTimerRef.current) clearTimeout(initialMountTimerRef.current);
    };
  }, [currentView, settings, status]);

  // Listener function to detect user's next interaction with the website
  const handleSiteInteraction = useCallback((event: Event) => {
    // 1. If this interaction occurred within 1.5s of clicking Hide, ignore it (it's the hide click or touch release)
    if (Date.now() - lastHideTimestampRef.current < 1500) {
      return;
    }

    // 2. Ignore clicks inside the ad itself if any part is still in DOM
    const target = event.target as HTMLElement | null;
    if (target?.closest('#adsterra-social-bar-wrapper') || target?.closest('[data-no-ad="true"]')) {
      return;
    }

    // 3. Detach listeners so subsequent clicks don't reset the timer
    removeSiteInteractionListeners();
    setStatus('hidden_countdown');

    // 4. Start the 1-minute wait period after this user press
    if (countdownTimerRef.current) clearTimeout(countdownTimerRef.current);
    countdownTimerRef.current = setTimeout(() => {
      const view = currentViewRef.current;
      const recheck = AdManager.canShowSocialBar(view);
      if (recheck.allowed) {
        setIsVisible(true);
        setStatus('shown');
        AdManager.recordSocialBarImpression();
      } else {
        // If route blocked, remain dormant
        setStatus('hidden_dormant');
      }
    }, POST_INTERACTION_WAIT_MS);
  }, []);

  const removeSiteInteractionListeners = useCallback(() => {
    if (clickListenerActiveRef.current) {
      window.removeEventListener('click', handleSiteInteraction, true);
      window.removeEventListener('pointerdown', handleSiteInteraction, true);
      window.removeEventListener('keydown', handleSiteInteraction, true);
      clickListenerActiveRef.current = false;
    }
  }, [handleSiteInteraction]);

  const attachSiteInteractionListeners = useCallback(() => {
    removeSiteInteractionListeners();
    // Attach passive capture listener
    window.addEventListener('click', handleSiteInteraction, { capture: true, passive: true });
    window.addEventListener('pointerdown', handleSiteInteraction, { capture: true, passive: true });
    window.addEventListener('keydown', handleSiteInteraction, { capture: true, passive: true });
    clickListenerActiveRef.current = true;
  }, [handleSiteInteraction, removeSiteInteractionListeners]);

  // User explicitly clicks "Hide", "X", or "Hide for now"
  const handleHide = (e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }

    // 1. Hide immediately from screen
    setIsVisible(false);
    setStatus('hidden_dormant');
    lastHideTimestampRef.current = Date.now();

    // 2. Clear any pending timers
    if (countdownTimerRef.current) {
      clearTimeout(countdownTimerRef.current);
      countdownTimerRef.current = null;
    }
    if (initialMountTimerRef.current) {
      clearTimeout(initialMountTimerRef.current);
      initialMountTimerRef.current = null;
    }

    // 3. Attach listener that waits for user to press on something in the website
    attachSiteInteractionListeners();
  };

  // Cleanup on component unmount
  useEffect(() => {
    return () => {
      removeSiteInteractionListeners();
      if (countdownTimerRef.current) clearTimeout(countdownTimerRef.current);
      if (initialMountTimerRef.current) clearTimeout(initialMountTimerRef.current);
    };
  }, [removeSiteInteractionListeners]);

  const isTop = settings.socialBarPosition === 'top';

  return (
    <AnimatePresence>
      {isVisible && (
        <div
          id="adsterra-social-bar-wrapper"
          data-no-ad="true"
          className={`fixed z-40 left-0 right-0 pointer-events-none flex justify-center px-3 sm:px-6 transition-all duration-300 ${
            isTop
              ? 'top-16 sm:top-20'
              : 'bottom-20 sm:bottom-6' // Lift above mobile quick nav bar to avoid covering controls
          }`}
        >
          <motion.div
            initial={{ opacity: 0, y: isTop ? -20 : 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: isTop ? -20 : 20, scale: 0.98 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="pointer-events-auto w-full max-w-2xl bg-[#181818]/95 backdrop-blur-md border border-[#C5A059]/40 shadow-2xl shadow-black/80 rounded-2xl overflow-hidden"
          >
            {/* Top subtle bar header */}
            <div className="bg-[#121212] px-3.5 py-1.5 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="text-[9px] font-mono uppercase tracking-widest text-[#C5A059] font-bold">
                  {settings.testMode ? '⚡ AD TEST MODE • SOCIAL BAR' : '★ FEATURED GASTRONOMY SPONSOR'}
                </span>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="text-[10px] font-mono text-white/50 hover:text-white px-1.5 py-0.5 rounded bg-white/5 transition-colors"
                  title={isMinimized ? 'Expand' : 'Minimize'}
                >
                  {isMinimized ? 'Expand' : 'Minimize'}
                </button>

                {/* Explicit "Hide" button */}
                <button
                  onClick={handleHide}
                  className="flex items-center space-x-1 px-2 py-0.5 rounded bg-white/5 hover:bg-white/10 text-white/60 hover:text-[#C5A059] text-[10px] font-mono transition-colors"
                  title="Hide ad until next user action + wait period"
                  aria-label="Hide advertisement until next user press"
                >
                  <EyeOff className="w-3 h-3" />
                  <span>Hide</span>
                </button>

                {/* Dismiss X button */}
                <button
                  onClick={handleHide}
                  className="p-1 rounded-md text-white/50 hover:text-white hover:bg-white/10 transition-colors"
                  title="Hide ad"
                  aria-label="Close Social Bar"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Social Bar Body (Collapsible) */}
            {!isMinimized && (
              <div className="p-3 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-start space-x-3">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#C5A059]/30 to-[#C5A059]/10 border border-[#C5A059]/40 flex items-center justify-center shrink-0 text-[#C5A059] mt-0.5">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-semibold text-white tracking-wide flex items-center gap-1.5">
                      <span>Michelin Terroir & Master Culinary Residency 2026</span>
                      <span className="hidden sm:inline-block px-1.5 py-0.2 bg-[#C5A059]/20 text-[#C5A059] text-[9px] font-mono rounded">
                        VIP Allocations
                      </span>
                    </h4>
                    <p className="text-[11px] text-white/70 line-clamp-1 sm:line-clamp-2 mt-0.5 font-light">
                      Direct access to single-estate white truffles, aged balsamic barrels, and Kyoto culinary masters.
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center space-x-2 shrink-0 self-end sm:self-center">
                  <button
                    onClick={handleHide}
                    className="px-2.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/60 hover:text-white font-mono text-[10px] tracking-wider transition-colors"
                  >
                    Hide for now
                  </button>
                  <a
                    href={settings.socialBarDirectUrl || 'https://pl31110474.profitableratecpmnetwork.com/8a/6b/71/8a6b7143334202e20dea4259df7595da.js'}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleHide}
                    className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#C5A059] to-[#d6b168] hover:from-[#d6b168] hover:to-[#e6c178] text-[#121212] font-mono text-[11px] font-bold uppercase tracking-wider flex items-center space-x-1.5 shadow-md active:scale-95 transition-all"
                  >
                    <span>Explore Partner</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            )}

            {/* Invisible Container for Publisher Script mounting */}
            <div ref={scriptContainerRef} className="hidden" aria-hidden="true" />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
