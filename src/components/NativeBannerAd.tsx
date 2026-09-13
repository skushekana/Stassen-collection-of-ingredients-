import React, { useEffect, useRef, useState } from 'react';
import { AdManager } from '../services/adManager';
import { AdSettings } from '../types';

interface NativeBannerAdProps {
  className?: string;
  label?: string;
}

/**
 * Reusable Native Banner Ad Component (Adsterra Unit 1)
 * Safely mounts configured invoke.js script or custom Adsterra snippet.
 * Respects AdManager master switch, emergency disable, and device rules.
 */
export const NativeBannerAd: React.FC<NativeBannerAdProps> = ({
  className = '',
  label = 'Sponsored Culinary Partner'
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [settings, setSettings] = useState<AdSettings>(() => AdManager.getSettings());

  useEffect(() => {
    const unsub = AdManager.subscribe((s) => setSettings(s));
    return () => unsub();
  }, []);

  useEffect(() => {
    if (!settings.enabled || settings.emergencyDisabled || !settings.nativeBannerEnabled) {
      return;
    }

    const container = containerRef.current;
    if (!container) return;

    const scriptSrc = AdManager.extractScriptSrc(settings.nativeBannerScript) ||
      'https://pl31110473.profitableratecpmnetwork.com/86cd85dd6ae704626519d957431acfc8/invoke.js';

    // Check if script is already present inside container
    const existingScript = container.querySelector(`script[src*="${scriptSrc}"]`);
    if (!existingScript && !settings.testMode) {
      try {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.async = true;
        script.setAttribute('data-cfasync', 'false');
        script.src = scriptSrc;
        container.appendChild(script);
      } catch (err) {
        console.warn('Native Banner script mount note:', err);
      }
    }
  }, [settings]);

  if (!settings.enabled || settings.emergencyDisabled || !settings.nativeBannerEnabled) {
    return null;
  }

  return (
    <div
      id="stassen-native-banner-ad-wrap"
      data-no-ad="true"
      className={`my-10 p-5 bg-[#161616] border border-[#F5F5F0]/10 overflow-hidden text-center relative rounded-xl ${className}`}
      aria-label="Advertisement"
    >
      <div className="flex items-center justify-between pb-2 mb-3 border-b border-[#F5F5F0]/5 text-[9px] uppercase tracking-[0.2em] text-[#F5F5F0]/40 font-mono">
        <span className="flex items-center space-x-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]/60 inline-block" />
          <span>{label}</span>
        </span>
        <span className="text-[#C5A059]/70 font-semibold">
          {settings.testMode ? '⚡ TEST MODE' : 'ADVERTISEMENT'}
        </span>
      </div>

      <div ref={containerRef} className="w-full flex justify-center items-center min-h-[60px] overflow-hidden">
        <div id="container-86cd85dd6ae704626519d957431acfc8" className="w-full max-w-full">
          {settings.testMode && (
            <div className="py-4 px-6 text-xs font-mono text-[#C5A059] bg-[#C5A059]/10 rounded border border-[#C5A059]/30">
              Adsterra Native Banner Slot Active (Container: 86cd85dd6ae704626519d957431acfc8)
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
