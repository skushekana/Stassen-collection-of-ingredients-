import React from 'react';
import { ExternalLink, Sparkles } from 'lucide-react';

interface SponsoredPartnerLinkProps {
  variant?: 'badge' | 'button' | 'card' | 'inline';
  className?: string;
}

export const SMARTLINK_URL = "https://www.profitableratecpmnetwork.com/sehwkj8rzg?key=90d18fa1edda90e6ad9f6aef8b35806f";

/**
 * Clearly identified sponsored partner link (Adsterra Unit 3 Smartlink)
 * Opens in a new window with appropriate rel attributes.
 * Never redirects automatically or replaces normal site navigation.
 */
export const SponsoredPartnerLink: React.FC<SponsoredPartnerLinkProps> = ({
  variant = 'button',
  className = ''
}) => {
  if (variant === 'inline') {
    return (
      <a
        href={SMARTLINK_URL}
        target="_blank"
        rel="noopener noreferrer sponsored"
        className={`text-[#C5A059] opacity-80 hover:opacity-100 hover:underline transition-colors inline-flex items-center space-x-1 ${className}`}
        title="Sponsored Partner Offer (External Link)"
      >
        <span>Sponsored Partner Deals</span>
        <ExternalLink className="w-3 h-3" />
      </a>
    );
  }

  if (variant === 'badge') {
    return (
      <a
        href={SMARTLINK_URL}
        target="_blank"
        rel="noopener noreferrer sponsored"
        className={`px-3 py-1 bg-[#1A1A1A] border border-[#C5A059]/30 text-[#C5A059] text-[10px] uppercase tracking-wider hover:border-[#C5A059] hover:bg-[#C5A059]/10 transition-all inline-flex items-center space-x-1.5 ${className}`}
        title="Explore Sponsored Culinary & Terroir Partner Offers"
      >
        <Sparkles className="w-3 h-3 text-[#C5A059]" />
        <span>Sponsored Partner Offers</span>
        <ExternalLink className="w-2.5 h-2.5 opacity-60" />
      </a>
    );
  }

  if (variant === 'card') {
    return (
      <div className={`p-4 bg-[#181818] border border-[#C5A059]/20 rounded-none my-6 ${className}`}>
        <div className="flex items-center justify-between mb-2">
          <span className="text-[9px] uppercase tracking-[0.2em] text-[#C5A059] font-mono">
            Featured Partner Discovery
          </span>
          <span className="text-[9px] uppercase tracking-widest text-[#F5F5F0]/40 font-mono">
            SPONSORED
          </span>
        </div>
        <p className="text-xs text-[#F5F5F0]/70 mb-3 leading-relaxed">
          Discover exclusive culinary offers, artisanal gastronomy equipment, and seasonal harvest experiences from our network partners.
        </p>
        <a
          href={SMARTLINK_URL}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="px-4 py-2 bg-[#C5A059]/20 hover:bg-[#C5A059] text-[#C5A059] hover:text-black border border-[#C5A059]/40 text-xs uppercase tracking-wider font-semibold transition-all inline-flex items-center space-x-2"
        >
          <span>Explore Partner Selection</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    );
  }

  // Default 'button' variant
  return (
    <a
      href={SMARTLINK_URL}
      target="_blank"
      rel="noopener noreferrer sponsored"
      className={`px-3.5 py-1.5 bg-[#1C1C1C] border border-[#C5A059]/30 hover:border-[#C5A059] text-[#C5A059] text-xs uppercase tracking-wider transition-all inline-flex items-center space-x-2 font-medium ${className}`}
      title="Sponsored Link - Opens external partner in new window"
    >
      <span>Sponsored Partner</span>
      <ExternalLink className="w-3 h-3 opacity-70" />
    </a>
  );
};
