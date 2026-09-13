import React from 'react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenDataModal: () => void;
  onOpenAdminModal?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenDataModal, onOpenAdminModal }) => {
  return (
    <footer id="main-footer" className="bg-[#0F0F0F] border-t border-[#F5F5F0]/10 text-[#F5F5F0]">
      {/* Editorial Sensory Footer Strip */}
      <div className="border-b border-[#F5F5F0]/10 py-5 px-6 sm:px-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-8 sm:gap-10">
            <div className="flex flex-col">
              <span className="text-[9px] uppercase tracking-widest opacity-40">Archive Curator Note</span>
              <span className="text-xs font-serif italic text-[#C5A059]">Wild-Foraged, Lunar Harvested & Solera Aged</span>
            </div>
            <div className="w-[1px] h-6 bg-[#F5F5F0]/10 hidden sm:block" />
            <div className="flex flex-col">
              <span className="text-[9px] uppercase tracking-widest opacity-40">Sensory Signatures</span>
              <span className="text-xs font-serif italic text-[#F5F5F0]">Umami, Balsamic Acidity, Floral Saffron</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-[10px] uppercase tracking-[0.2em] opacity-40">Explore by World Region</span>
            <div className="flex gap-2">
              <button
                onClick={() => onNavigate('locations')}
                className="px-3 py-1 border border-[#F5F5F0]/20 rounded-full text-[9px] uppercase tracking-wider hover:border-[#C5A059] hover:text-[#C5A059] transition-colors"
              >
                Europe
              </button>
              <button
                onClick={() => onNavigate('locations')}
                className="px-3 py-1 border border-[#F5F5F0]/20 rounded-full text-[9px] uppercase tracking-wider opacity-50 hover:opacity-100 hover:border-[#C5A059] hover:text-[#C5A059] transition-colors"
              >
                Asia
              </button>
              <button
                onClick={() => onNavigate('locations')}
                className="px-3 py-1 border border-[#F5F5F0]/20 rounded-full text-[9px] uppercase tracking-wider opacity-50 hover:opacity-100 hover:border-[#C5A059] hover:text-[#C5A059] transition-colors"
              >
                Americas
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Colophon */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#F5F5F0]/10">
          {/* Colophon & Identity */}
          <div className="md:col-span-5 space-y-4">
            <span className="text-[10px] tracking-[0.3em] uppercase opacity-60 text-[#F5F5F0] block">
              Archive No. 042
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-[#F5F5F0]">
              Stassen's Collection <span className="opacity-40 italic">of Ingredients</span>
            </h3>
            <p className="text-xs text-[#F5F5F0]/70 font-light leading-relaxed max-w-sm">
              Documenting wild-foraged botanicals, secular vinegars, sub-polar marine kelps, and alpine truffles through cinematic living motion and authentic culinary terroir science.
            </p>
            <div className="pt-2 flex items-center space-x-2 text-[10px] uppercase tracking-widest text-[#C5A059]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059] animate-pulse" />
              <span>Continuous Neural Recipe Matrix & Botanical Index</span>
            </div>
          </div>

          {/* Archive Navigation */}
          <div className="md:col-span-3 space-y-3">
            <span className="text-[10px] uppercase tracking-[0.2em] opacity-40 block">
              Curated Pages
            </span>
            <ul className="space-y-2 text-xs uppercase tracking-wider">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="opacity-70 hover:opacity-100 hover:text-[#C5A059] transition-colors"
                >
                  Home (/)
                </button>
              </li>
              <li>
                <a
                  href="/categories"
                  onClick={(e) => {
                    if (!e.metaKey && !e.ctrlKey && !e.shiftKey) {
                      e.preventDefault();
                      onNavigate('categories-index');
                    }
                  }}
                  className="opacity-70 hover:opacity-100 hover:text-[#C5A059] transition-colors block text-inherit no-underline"
                >
                  Categories & Taxonomy (/categories)
                </a>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('collection')}
                  className="opacity-70 hover:opacity-100 hover:text-[#C5A059] transition-colors"
                >
                  Collection (/collection)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('locations')}
                  className="opacity-70 hover:opacity-100 hover:text-[#C5A059] transition-colors"
                >
                  Locations (/locations)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('recipes-archive')}
                  className="text-[#C5A059] opacity-90 hover:opacity-100 hover:underline transition-colors"
                >
                  500+ Recipes Matrix
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('my-pantry')}
                  className="opacity-70 hover:opacity-100 hover:text-[#C5A059] transition-colors"
                >
                  My Cellar & Pantry
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('shopping-list')}
                  className="opacity-70 hover:opacity-100 hover:text-[#C5A059] transition-colors"
                >
                  Shopping List Builder
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('search-results')}
                  className="opacity-70 hover:opacity-100 hover:text-[#C5A059] transition-colors"
                >
                  Search Index
                </button>
              </li>
              {onOpenAdminModal && (
                <li>
                  <button
                    onClick={onOpenAdminModal}
                    className="text-[#C5A059] opacity-80 hover:opacity-100 hover:underline transition-colors flex items-center space-x-1"
                  >
                    <span>Curator Admin & Milestones</span>
                  </button>
                </li>
              )}
              <li>
                <button
                  id="footer-bulk-ingestion-btn"
                  onClick={onOpenDataModal}
                  className="text-[#C5A059] opacity-80 hover:opacity-100 hover:underline transition-colors flex items-center space-x-1"
                >
                  <span>Safe Bulk Ingestion & Export (JSON / CSV)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('admin-ads')}
                  className="text-[#C5A059] opacity-80 hover:opacity-100 hover:underline transition-colors flex items-center space-x-1"
                >
                  <span>Adsterra Smart Ads Control</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Atelier & Legal Navigation */}
          <div className="md:col-span-4 space-y-3">
            <span className="text-[10px] uppercase tracking-[0.2em] opacity-40 block">
              Atelier & Governance
            </span>
            <ul className="space-y-2 text-xs uppercase tracking-wider mb-4">
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="opacity-70 hover:opacity-100 hover:text-[#C5A059] transition-colors"
                >
                  About the Archive
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="opacity-70 hover:opacity-100 hover:text-[#C5A059] transition-colors"
                >
                  Contact & Submissions
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('privacy')}
                  className="opacity-70 hover:opacity-100 hover:text-[#C5A059] transition-colors"
                >
                  Privacy Policy & Ethics
                </button>
              </li>
              <li>
                <a
                  href="https://www.profitableratecpmnetwork.com/sehwkj8rzg?key=90d18fa1edda90e6ad9f6aef8b35806f"
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="text-[#C5A059] opacity-80 hover:opacity-100 hover:underline transition-colors flex items-center space-x-1.5"
                  title="Sponsored Partner Offers (External Link)"
                >
                  <span>Sponsored Partner Deals</span>
                  <span className="text-[9px] uppercase px-1.5 py-0.2 bg-[#C5A059]/20 border border-[#C5A059]/40 rounded-none text-[#C5A059]">Ad</span>
                </a>
              </li>
            </ul>

            <p className="text-xs text-[#F5F5F0]/60 font-light leading-relaxed pt-2 border-t border-[#F5F5F0]/10">
              Every entry in this archive is verified by certified foragers, multi-generational balsamic masters, and master tea blenders.
            </p>
          </div>
        </div>

        {/* Crawlable Botanical & Culinary Taxonomy Directory for Search Engines & Visitors */}
        <div className="pt-8 mt-8 border-t border-[#F5F5F0]/10">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] uppercase tracking-[0.2em] text-[#C5A059] font-medium">
              Taxonomy &amp; Discovery Directory
            </span>
            <a
              href="/categories"
              onClick={(e) => {
                if (!e.metaKey && !e.ctrlKey && !e.shiftKey) {
                  e.preventDefault();
                  onNavigate('categories-index');
                }
              }}
              className="text-[10px] uppercase tracking-wider text-[#F5F5F0]/50 hover:text-[#C5A059] transition-colors"
            >
              Browse All Categories &rarr;
            </a>
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-[#F5F5F0]/60">
            <a href="/categories/ingredients/spices" className="hover:text-[#C5A059] transition-colors">Rare Spices</a>
            <span className="text-white/20">/</span>
            <a href="/categories/ingredients/herbs" className="hover:text-[#C5A059] transition-colors">Botanical Herbs</a>
            <span className="text-white/20">/</span>
            <a href="/categories/ingredients/vegetables" className="hover:text-[#C5A059] transition-colors">Heirloom Vegetables</a>
            <span className="text-white/20">/</span>
            <a href="/categories/ingredients/oils" className="hover:text-[#C5A059] transition-colors">Artisanal Oils &amp; Vinegars</a>
            <span className="text-white/20">/</span>
            <a href="/categories/ingredients/proteins" className="hover:text-[#C5A059] transition-colors">Gourmet Proteins</a>
            <span className="text-white/20">/</span>
            <a href="/categories/ingredients/beverages" className="hover:text-[#C5A059] transition-colors">Rare Teas &amp; Botanicals</a>
            <span className="text-white/20">/</span>
            <a href="/categories/recipes/dinner" className="hover:text-[#C5A059] transition-colors">Haute Cuisine Dinners</a>
            <span className="text-white/20">/</span>
            <a href="/categories/recipes/soup" className="hover:text-[#C5A059] transition-colors">Master Consommés &amp; Soups</a>
            <span className="text-white/20">/</span>
            <a href="/categories/recipes/dessert" className="hover:text-[#C5A059] transition-colors">Artisan Desserts</a>
            <span className="text-white/20">/</span>
            <a href="/categories/recipes/sauce" className="hover:text-[#C5A059] transition-colors">Mother Sauces &amp; Jus</a>
            <span className="text-white/20">/</span>
            <a href="/categories/recipes/baking" className="hover:text-[#C5A059] transition-colors">Boulangerie &amp; Pastry</a>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[10px] uppercase tracking-widest opacity-40 space-y-3 sm:space-y-0">
          <div>
            © {new Date().getFullYear()} Stassen's Collection of Ingredients.
          </div>
          <div className="flex items-center space-x-4">
            <button onClick={() => onNavigate('privacy')} className="hover:underline">Privacy Policy</button>
            <span>•</span>
            <button onClick={() => onNavigate('contact')} className="hover:underline">Contact Atelier</button>
            <span>•</span>
            <span className="text-[#C5A059]">Curated by Human Editors</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
