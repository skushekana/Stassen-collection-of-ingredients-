import React, { useState } from 'react';
import { X, Compass, BookOpen, Flame, MapPin, Calendar, ShoppingBag, Bookmark, Search, CheckCircle2, ChevronRight, Sparkles, ChefHat, Layers, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface UserGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (section: string) => void;
}

export const UserGuideModal: React.FC<UserGuideModalProps> = ({
  isOpen,
  onClose,
  onNavigate,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'ingredients' | 'recipes' | 'tools' | 'pages'>('overview');

  if (!isOpen) return null;

  const handleJump = (destination: string) => {
    onNavigate(destination);
    onClose();
  };

  return (
    <div
      id="user-guide-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 10 }}
        transition={{ duration: 0.2 }}
        className="relative w-full max-w-4xl bg-[#141414] border border-[#C5A059]/30 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-[#F5F5F0]/10 flex items-center justify-between bg-[#181818]">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-2xl bg-[#C5A059]/10 border border-[#C5A059]/30 text-[#C5A059]">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-mono tracking-[0.25em] text-[#C5A059] uppercase">
                  User Guide & Navigation Tour
                </span>
                <span className="px-2 py-0.5 rounded-full bg-[#C5A059]/20 text-[#C5A059] text-[9px] font-bold uppercase">
                  1,000+ Recipes • 19+ Botanicals
                </span>
              </div>
              <h2 className="text-xl font-serif text-[#F5F5F0]">
                How to Use & Navigate Stassen's Collection
              </h2>
            </div>
          </div>

          <button
            id="close-user-guide-modal"
            onClick={onClose}
            aria-label="Close Guide"
            className="p-2 rounded-full bg-[#202020] hover:bg-[#2a2a2a] text-[#F5F5F0]/70 hover:text-white transition-colors border border-[#F5F5F0]/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-[#F5F5F0]/10 bg-[#161616] px-6 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-3 px-4 text-xs font-mono uppercase tracking-wider border-b-2 whitespace-nowrap transition-colors ${
              activeTab === 'overview'
                ? 'border-[#C5A059] text-[#C5A059] font-bold'
                : 'border-transparent text-[#F5F5F0]/60 hover:text-white'
            }`}
          >
            🌟 Quick Start
          </button>
          <button
            onClick={() => setActiveTab('ingredients')}
            className={`py-3 px-4 text-xs font-mono uppercase tracking-wider border-b-2 whitespace-nowrap transition-colors ${
              activeTab === 'ingredients'
                ? 'border-[#C5A059] text-[#C5A059] font-bold'
                : 'border-transparent text-[#F5F5F0]/60 hover:text-white'
            }`}
          >
            🌿 Botanical Dossiers
          </button>
          <button
            onClick={() => setActiveTab('recipes')}
            className={`py-3 px-4 text-xs font-mono uppercase tracking-wider border-b-2 whitespace-nowrap transition-colors ${
              activeTab === 'recipes'
                ? 'border-[#C5A059] text-[#C5A059] font-bold'
                : 'border-transparent text-[#F5F5F0]/60 hover:text-white'
            }`}
          >
            🔥 1,000+ Recipes & Cook Mode
          </button>
          <button
            onClick={() => setActiveTab('tools')}
            className={`py-3 px-4 text-xs font-mono uppercase tracking-wider border-b-2 whitespace-nowrap transition-colors ${
              activeTab === 'tools'
                ? 'border-[#C5A059] text-[#C5A059] font-bold'
                : 'border-transparent text-[#F5F5F0]/60 hover:text-white'
            }`}
          >
            🛒 Pantry & Shopping
          </button>
          <button
            onClick={() => setActiveTab('pages')}
            className={`py-3 px-4 text-xs font-mono uppercase tracking-wider border-b-2 whitespace-nowrap transition-colors ${
              activeTab === 'pages'
                ? 'border-[#C5A059] text-[#C5A059] font-bold'
                : 'border-transparent text-[#F5F5F0]/60 hover:text-white'
            }`}
          >
            🧭 All Pages Directory
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 text-[#F5F5F0]">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="p-5 rounded-2xl bg-[#C5A059]/10 border border-[#C5A059]/30">
                <h3 className="font-serif text-lg text-[#C5A059] mb-2 flex items-center space-x-2">
                  <Sparkles className="w-5 h-5" />
                  <span>Welcome to the World of Rare Gastronomy</span>
                </h3>
                <p className="text-sm text-[#F5F5F0]/80 leading-relaxed">
                  Stassen's Collection is a living digital atelier documenting the world’s rarest botanicals, ancient harvest terroirs, and over <strong>1,000+ haute gastronomy masterclasses</strong>. Here is everything you can do:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div
                  onClick={() => handleJump('collection')}
                  className="p-5 rounded-2xl bg-[#1a1a1a] border border-[#F5F5F0]/10 hover:border-[#C5A059]/50 cursor-pointer transition-all hover:bg-[#202020] group"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
                      <BookOpen className="w-5 h-5" />
                    </span>
                    <span className="text-xs font-mono text-[#C5A059] group-hover:translate-x-1 transition-transform flex items-center">
                      Explore Collection <ArrowRight className="w-3.5 h-3.5 ml-1" />
                    </span>
                  </div>
                  <h4 className="font-serif text-base text-white mb-1">1. Browse 19+ Rare Botanicals</h4>
                  <p className="text-xs text-[#F5F5F0]/70">
                    Click any specimen card to view high-resolution photography, sensory aroma radar, chemical pairing charts, seasonal timelines, and culinary applications.
                  </p>
                </div>

                <div
                  onClick={() => handleJump('recipes-archive')}
                  className="p-5 rounded-2xl bg-[#1a1a1a] border border-[#F5F5F0]/10 hover:border-[#C5A059]/50 cursor-pointer transition-all hover:bg-[#202020] group"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
                      <ChefHat className="w-5 h-5" />
                    </span>
                    <span className="text-xs font-mono text-[#C5A059] group-hover:translate-x-1 transition-transform flex items-center">
                      Open 1,000+ Recipes <ArrowRight className="w-3.5 h-3.5 ml-1" />
                    </span>
                  </div>
                  <h4 className="font-serif text-base text-white mb-1">2. Cook 1,000+ Masterclasses</h4>
                  <p className="text-xs text-[#F5F5F0]/70">
                    Filter by 10 world cuisines and launch the <strong>Interactive Cook Mode</strong> with step timers, visual photography on every step, and voiceover audio.
                  </p>
                </div>

                <div
                  onClick={() => handleJump('locations')}
                  className="p-5 rounded-2xl bg-[#1a1a1a] border border-[#F5F5F0]/10 hover:border-[#C5A059]/50 cursor-pointer transition-all hover:bg-[#202020] group"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="p-2 rounded-xl bg-blue-500/10 text-blue-400">
                      <MapPin className="w-5 h-5" />
                    </span>
                    <span className="text-xs font-mono text-[#C5A059] group-hover:translate-x-1 transition-transform flex items-center">
                      View Terroirs <ArrowRight className="w-3.5 h-3.5 ml-1" />
                    </span>
                  </div>
                  <h4 className="font-serif text-base text-white mb-1">3. Discover 7 Global Terroirs</h4>
                  <p className="text-xs text-[#F5F5F0]/70">
                    Explore where each ingredient grows, micro-climates, altitude conditions, and regional harvesting traditions across 7 continents.
                  </p>
                </div>

                <div
                  onClick={() => handleJump('seasonal-calendar')}
                  className="p-5 rounded-2xl bg-[#1a1a1a] border border-[#F5F5F0]/10 hover:border-[#C5A059]/50 cursor-pointer transition-all hover:bg-[#202020] group"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="p-2 rounded-xl bg-rose-500/10 text-rose-400">
                      <Calendar className="w-5 h-5" />
                    </span>
                    <span className="text-xs font-mono text-[#C5A059] group-hover:translate-x-1 transition-transform flex items-center">
                      Harvest Matrix <ArrowRight className="w-3.5 h-3.5 ml-1" />
                    </span>
                  </div>
                  <h4 className="font-serif text-base text-white mb-1">4. 12-Month Seasonal Matrix</h4>
                  <p className="text-xs text-[#F5F5F0]/70">
                    Track month-by-month peak harvest windows, prime culinary freshness periods, and rare seasonal shortages.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'ingredients' && (
            <div className="space-y-4">
              <h3 className="font-serif text-lg text-white">How to Access & Read Botanical Dossiers</h3>
              <p className="text-xs text-[#F5F5F0]/70">
                Every rare botanical specimen in our archive has an in-depth botanical dossier. Here is what is included:
              </p>

              <div className="space-y-3">
                <div className="p-4 rounded-xl bg-[#1c1c1c] border border-[#F5F5F0]/10 flex items-start space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-[#C5A059] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-sm font-semibold text-white block">Aroma & Flavor Radar</span>
                    <span className="text-xs text-[#F5F5F0]/70">5-axis flavor intensity chart showing sweetness, acidity, umami, bitterness, and aromatic resonance.</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#1c1c1c] border border-[#F5F5F0]/10 flex items-start space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-[#C5A059] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-sm font-semibold text-white block">Chemical & Flavor Pairings</span>
                    <span className="text-xs text-[#F5F5F0]/70">Scientific molecular affinities and high-affinity pairings (e.g. White Truffle + Aged Butter + Barolo).</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#1c1c1c] border border-[#F5F5F0]/10 flex items-start space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-[#C5A059] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-sm font-semibold text-white block">Cellar Persistence & Pantry Tracking</span>
                    <span className="text-xs text-[#F5F5F0]/70">Click the bookmark icon on any card to store it in your personal Pantry with custom stock weights and notes.</span>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => handleJump('collection')}
                  className="w-full py-3 rounded-xl bg-[#C5A059] text-black font-semibold text-xs uppercase tracking-widest hover:bg-[#d6b168] transition-colors flex items-center justify-center space-x-2"
                >
                  <span>Go to Botanical Collection Now</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {activeTab === 'recipes' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30">
                <span className="text-xs font-mono uppercase tracking-wider text-[#C5A059] block font-bold">
                  Over 1,000+ Masterclasses Available
                </span>
                <p className="text-xs text-[#F5F5F0]/80 mt-1">
                  Our kitchen atelier features over 1,000+ recipes spanning Italian, Japanese Kaiseki, French Haute Cuisine, Nordic Boreal, Levant, Mesoamerican, and Modernist Gastronomy.
                </p>
              </div>

              <div className="space-y-3">
                <div className="p-4 rounded-xl bg-[#1c1c1c] border border-[#F5F5F0]/10 flex items-start space-x-3">
                  <div className="p-2 rounded-lg bg-[#C5A059]/10 text-[#C5A059] shrink-0">
                    <Flame className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-white block">Step-by-Step Visuals on Every Stage</span>
                    <span className="text-xs text-[#F5F5F0]/70">
                      Every recipe has detailed step images for preparation, thermal searing, reduction, and final artistic plating.
                    </span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#1c1c1c] border border-[#F5F5F0]/10 flex items-start space-x-3">
                  <div className="p-2 rounded-lg bg-[#C5A059]/10 text-[#C5A059] shrink-0">
                    <ChefHat className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-white block">Interactive Live Cooking Mode</span>
                    <span className="text-xs text-[#F5F5F0]/70">
                      Click "Cook This Masterclass" on any recipe to open full-screen cooking mode with audio soundscapes, step chronometer timers, and spoken chef narration.
                    </span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#1c1c1c] border border-[#F5F5F0]/10 flex items-start space-x-3">
                  <div className="p-2 rounded-lg bg-[#C5A059]/10 text-[#C5A059] shrink-0">
                    <ShoppingBag className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-white block">1-Click Shopping List Export</span>
                    <span className="text-xs text-[#F5F5F0]/70">
                      Add all ingredients from any recipe straight to your shopping list with a single tap.
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => handleJump('recipes-archive')}
                  className="w-full py-3 rounded-xl bg-[#C5A059] text-black font-semibold text-xs uppercase tracking-widest hover:bg-[#d6b168] transition-colors flex items-center justify-center space-x-2"
                >
                  <span>Open 1,000+ Recipe Atelier Now</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {activeTab === 'tools' && (
            <div className="space-y-4">
              <h3 className="font-serif text-lg text-white">Kitchen Provisions & Personal Pantry</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div
                  onClick={() => handleJump('shopping-list')}
                  className="p-5 rounded-2xl bg-[#1c1c1c] border border-[#F5F5F0]/10 hover:border-[#C5A059] cursor-pointer transition-all"
                >
                  <ShoppingBag className="w-6 h-6 text-emerald-400 mb-2" />
                  <h4 className="font-serif text-base text-white">Provisions Shopping List</h4>
                  <p className="text-xs text-[#F5F5F0]/70 mt-1">
                    Manage active culinary items, check off completed groceries, and export or print your checklist.
                  </p>
                  <span className="text-[11px] text-[#C5A059] font-mono mt-3 inline-block">Jump to Shopping List →</span>
                </div>

                <div
                  onClick={() => handleJump('my-pantry')}
                  className="p-5 rounded-2xl bg-[#1c1c1c] border border-[#F5F5F0]/10 hover:border-[#C5A059] cursor-pointer transition-all"
                >
                  <Bookmark className="w-6 h-6 text-[#C5A059] mb-2" />
                  <h4 className="font-serif text-base text-white">My Cellar & Pantry</h4>
                  <p className="text-xs text-[#F5F5F0]/70 mt-1">
                    Your saved rare ingredients, personal stock weights, notes, and bookmarked masterclasses.
                  </p>
                  <span className="text-[11px] text-[#C5A059] font-mono mt-3 inline-block">Jump to My Pantry →</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'pages' && (
            <div className="space-y-4">
              <h3 className="font-serif text-lg text-white">Direct 1-Click Page Navigation Directory</h3>
              <p className="text-xs text-[#F5F5F0]/70">
                Click any page below to instantly navigate to that section of the website:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {[
                  { name: 'Home Showcase', desc: 'Hero exhibition & highlights', route: 'home', icon: '🏠' },
                  { name: '19+ Rare Collection', desc: 'Complete botanical archive', route: 'collection', icon: '🌿' },
                  { name: '1,000+ Recipes Matrix', desc: 'Haute gastronomy masterclasses', route: 'recipes-archive', icon: '🔥' },
                  { name: 'World Terroirs & Map', desc: '7 geographic harvest zones', route: 'locations', icon: '🌍' },
                  { name: '12-Month Calendar', desc: 'Seasonal peak availability', route: 'seasonal-calendar', icon: '📅' },
                  { name: 'Shopping List', desc: 'Interactive ingredient grocery checklist', route: 'shopping-list', icon: '🛒' },
                  { name: 'My Cellar & Pantry', desc: 'Saved specimens & personal inventory', route: 'my-pantry', icon: '📦' },
                  { name: 'Archive Philosophy', desc: 'Our curatorial story & methods', route: 'about', icon: '📜' },
                  { name: 'Contact & Submissions', desc: 'Specimen inquiries & submissions', route: 'contact', icon: '✉️' },
                  { name: 'Privacy & Terms', desc: 'Archival data & preservation', route: 'privacy', icon: '🛡️' },
                ].map((item) => (
                  <button
                    key={item.route}
                    onClick={() => handleJump(item.route)}
                    className="p-4 rounded-xl bg-[#1a1a1a] border border-[#F5F5F0]/10 hover:border-[#C5A059] text-left transition-all hover:bg-[#222222] group"
                  >
                    <div className="text-2xl mb-1">{item.icon}</div>
                    <div className="font-semibold text-sm text-white group-hover:text-[#C5A059] transition-colors">
                      {item.name}
                    </div>
                    <div className="text-[11px] text-[#F5F5F0]/60 mt-0.5">
                      {item.desc}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-[#F5F5F0]/10 bg-[#161616] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <span className="text-[#F5F5F0]/60 font-mono text-[11px]">
            Tip: Press <kbd className="px-1.5 py-0.5 rounded bg-[#222] text-[#C5A059] font-bold border border-[#F5F5F0]/20">⌘K</kbd> or <kbd className="px-1.5 py-0.5 rounded bg-[#222] text-[#C5A059] font-bold border border-[#F5F5F0]/20">Ctrl+K</kbd> anywhere to search instantly.
          </span>
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2 rounded-full bg-[#252525] hover:bg-[#303030] text-white transition-colors font-medium text-xs"
          >
            Close Guide
          </button>
        </div>
      </motion.div>
    </div>
  );
};
