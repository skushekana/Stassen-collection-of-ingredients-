import React, { useEffect } from 'react';
import { Compass, BookOpen, Sparkles, Shield, Heart, Award, ArrowLeft } from 'lucide-react';
import { setPageSeo } from '../utils/seo';

interface AboutPageProps {
  onNavigateToCollection: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigateToCollection }) => {
  useEffect(() => {
    setPageSeo(
      "About Our Mission & Story | Stassen's Collection of Ingredients",
      "Learn about the story, philosophy, and rigorous botanical curation standards behind the Stassen's Collection archive of rare global ingredients."
    );
  }, []);
  return (
    <div id="about-page" className="min-h-screen bg-[#121212] text-[#F5F5F0] pt-24 pb-20 px-4 sm:px-8 lg:px-12">
      <div className="max-w-4xl mx-auto">
        {/* Top Breadcrumb */}
        <button
          onClick={onNavigateToCollection}
          className="flex items-center space-x-1.5 text-xs uppercase tracking-widest text-[#F5F5F0]/60 hover:text-[#C5A059] transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Collection</span>
        </button>

        {/* Hero Title */}
        <div className="mb-12 pb-8 border-b border-[#F5F5F0]/10">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A059] font-medium block mb-2">
            Archival Gastronomy & Terroir Preservation
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#F5F5F0] tracking-tight leading-tight">
            About Stassen's Collection of Ingredients
          </h1>
          <p className="text-sm sm:text-base text-[#F5F5F0]/70 mt-3 font-light leading-relaxed">
            A living botanical and gastronomic archive dedicated to rare heirloom cultivars, foraged wild mycorrhizae, ancient ferments, and the micro-climates that give them life.
          </p>
        </div>

        {/* Story Section */}
        <div className="space-y-12 text-sm sm:text-base text-[#F5F5F0]/80 font-light leading-relaxed">
          <section>
            <h2 className="font-serif text-2xl text-[#F5F5F0] mb-4 text-[#C5A059]">
              The Philosophy of the Archive
            </h2>
            <p className="mb-4">
              Modern industrial agriculture homogenizes taste, reducing thousands of ancient crop varieties to a handful of shelf-stable commodities. Stassen's Collection was conceived as a rigorous counterpoint: an ongoing repository cataloging the world's most aromatic, terroir-dense, and ecologically significant culinary specimens.
            </p>
            <p>
              From the high volcanic plateaus of Western Macedonia where saffron crocuses bloom for a fleeting 20-day autumn window, to the sub-arctic birch forests of Lapland where cloudberries concentrate golden nectar under the midnight sun, each specimen in our archive carries a distinct geographic and chemical signature.
            </p>
          </section>

          {/* Pillars Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-10">
            <div className="p-6 bg-[#181818] border border-[#F5F5F0]/10">
              <Compass className="w-6 h-6 text-[#C5A059] mb-4" />
              <h3 className="font-serif text-lg text-[#F5F5F0] mb-2">Terroir Integrity</h3>
              <p className="text-xs text-[#F5F5F0]/70 leading-relaxed">
                We document soil chemistry, diurnal temperature shifts, and altitude metrics that concentrate essential terpenes and esters.
              </p>
            </div>

            <div className="p-6 bg-[#181818] border border-[#F5F5F0]/10">
              <BookOpen className="w-6 h-6 text-[#C5A059] mb-4" />
              <h3 className="font-serif text-lg text-[#F5F5F0] mb-2">Thermal Calibration</h3>
              <p className="text-xs text-[#F5F5F0]/70 leading-relaxed">
                Every recipe and masterclass provides precise thermal thresholds to prevent the evaporation of delicate volatile aromatics.
              </p>
            </div>

            <div className="p-6 bg-[#181818] border border-[#F5F5F0]/10">
              <Shield className="w-6 h-6 text-[#C5A059] mb-4" />
              <h3 className="font-serif text-lg text-[#F5F5F0] mb-2">Ethical Foraging</h3>
              <p className="text-xs text-[#F5F5F0]/70 leading-relaxed">
                Respecting regenerative indigenous harvesting traditions, non-destructive tools, and mycelial preservation protocols.
              </p>
            </div>
          </div>

          <section>
            <h2 className="font-serif text-2xl text-[#F5F5F0] mb-4 text-[#C5A059]">
              The Autonomous Masterclass Engine
            </h2>
            <p className="mb-4">
              To honor these ingredients, the archive features a continuous generative culinary engine powered by cutting-edge neural models. Over 500 bespoke masterclasses investigate chemical synergies, starch-lipid emulsions, and sommelier pairings for each specimen.
            </p>
            <p>
              Whether you are an atelier chef formulating seasonal degustations or an epicure exploring flavor physics at home, the archive provides instant tools for substitution analysis, provisioning, and interactive real-time cooking orchestration.
            </p>
          </section>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 pt-8 border-t border-[#F5F5F0]/10 flex justify-between items-center">
          <span className="text-xs text-[#F5F5F0]/50 uppercase tracking-widest">
            Archive Edition 2026 • Curated Gastronomy
          </span>
          <button
            onClick={onNavigateToCollection}
            className="px-6 py-2.5 bg-[#C5A059] text-[#121212] font-medium text-xs uppercase tracking-widest hover:bg-[#d4b066] transition-all"
          >
            Explore the Collection
          </button>
        </div>
      </div>
    </div>
  );
};
