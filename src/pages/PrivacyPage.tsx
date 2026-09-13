import React, { useEffect } from 'react';
import { ShieldCheck, Lock, Eye, Database, ArrowLeft } from 'lucide-react';
import { setPageSeo } from '../utils/seo';

interface PrivacyPageProps {
  onNavigateToCollection: () => void;
}

export const PrivacyPage: React.FC<PrivacyPageProps> = ({ onNavigateToCollection }) => {
  useEffect(() => {
    setPageSeo(
      "Privacy Policy & Data Ethics | Stassen's Collection",
      "Our privacy policy details the collection of analytics data, local storage preferences, and AI curation disclosures."
    );
  }, []);
  return (
    <div id="privacy-page" className="min-h-screen bg-[#121212] text-[#F5F5F0] pt-24 pb-20 px-4 sm:px-8 lg:px-12">
      <div className="max-w-4xl mx-auto">
        {/* Top Breadcrumb */}
        <button
          onClick={onNavigateToCollection}
          className="flex items-center space-x-1.5 text-xs uppercase tracking-widest text-[#F5F5F0]/60 hover:text-[#C5A059] transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Collection</span>
        </button>

        {/* Header */}
        <div className="mb-12 pb-8 border-b border-[#F5F5F0]/10">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A059] font-medium block mb-2">
            Archival Data Governance & Trust
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#F5F5F0] tracking-tight leading-tight">
            Privacy Policy & Data Ethics
          </h1>
          <p className="text-sm sm:text-base text-[#F5F5F0]/70 mt-3 font-light leading-relaxed">
            How we protect visitor privacy, local cellar storage, shopping lists, and computational neural session states.
          </p>
        </div>

        {/* Content */}
        <div className="space-y-10 text-xs sm:text-sm text-[#F5F5F0]/80 font-light leading-relaxed">
          <section className="p-6 bg-[#181818] border border-[#F5F5F0]/10">
            <h2 className="font-serif text-lg text-[#C5A059] mb-3 flex items-center space-x-2">
              <Lock className="w-4 h-4" />
              <span>1. Client-Side & Local Cellar Storage</span>
            </h2>
            <p className="mb-3">
              Your personalized pantry inventory, favorited specimen bookmarks, custom shopping lists, and completed recipe progress are stored directly within your local browser storage (<code className="text-[#C5A059] bg-black/40 px-1.5 py-0.5 font-mono text-[11px]">localStorage</code>).
            </p>
            <p>
              We do not track, sell, or transmit your individual shopping list items or pantry stock levels to third-party ad brokers. Your cellar is yours alone.
            </p>
          </section>

          <section className="p-6 bg-[#181818] border border-[#F5F5F0]/10">
            <h2 className="font-serif text-lg text-[#C5A059] mb-3 flex items-center space-x-2">
              <Database className="w-4 h-4" />
              <span>2. AI Masterclass & Neural Generation</span>
            </h2>
            <p className="mb-3">
              When generating on-demand culinary masterclasses or real-time sommelier pairings, queries are processed securely on our server backend without logging personally identifiable information.
            </p>
            <p>
              Recipe generation parameters (botanical specimen, chosen cuisine archetype) are processed in real-time to generate haute timelines and are never associated with your personal profile.
            </p>
          </section>

          <section className="p-6 bg-[#181818] border border-[#F5F5F0]/10">
            <h2 className="font-serif text-lg text-[#C5A059] mb-3 flex items-center space-x-2">
              <Eye className="w-4 h-4" />
              <span>3. Telemetry & Analytics</span>
            </h2>
            <p>
              We maintain minimal, privacy-respecting telemetry solely to ensure server availability, monitor neural generation latency, and maintain optimal rendering across responsive screen formats.
            </p>
          </section>

          <div className="text-xs text-[#F5F5F0]/50 pt-4 border-t border-[#F5F5F0]/10">
            Last Updated: January 2026 • Curatorial Protocol Version 4.2
          </div>
        </div>
      </div>
    </div>
  );
};
