import React, { useState, useEffect } from 'react';
import { Bookmark, Search, SlidersHorizontal, Database, Shield, Sparkles, ChefHat, Calendar, ShoppingBag, Info, Mail, HelpCircle, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { shoppingListService } from '../services/shoppingListService';

interface NavbarProps {
  savedCount: number;
  onOpenSaved: () => void;
  onOpenDataModal: () => void;
  onOpenAdminModal: () => void;
  onOpenMasterclass?: () => void;
  onOpenGuide?: () => void;
  onSearchClick: () => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  isAdminUser?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  savedCount,
  onOpenSaved,
  onOpenDataModal,
  onOpenAdminModal,
  onOpenMasterclass,
  onOpenGuide,
  onSearchClick,
  activeSection,
  onNavigate,
  isAdminUser = false
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [shoppingListCount, setShoppingListCount] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const unsub = shoppingListService.subscribe((list) => {
      setShoppingListCount(list.filter(i => !i.completed).length);
    });
    return () => unsub();
  }, []);

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled
          ? 'bg-[#121212]/95 backdrop-blur-md border-b border-[#F5F5F0]/10 py-3 shadow-2xl shadow-black/80'
          : 'bg-gradient-to-b from-[#121212]/95 via-[#121212]/60 to-transparent py-4 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-10 flex items-center justify-between">
        {/* Brand / Logo */}
        <button
          id="nav-brand-logo"
          onClick={() => onNavigate('home')}
          className="group text-left focus:outline-none flex flex-col"
        >
          <span className="text-[10px] tracking-[0.3em] uppercase opacity-60 text-[#F5F5F0]">
            Archive No. 042
          </span>
          <h1 className="font-serif text-xl sm:text-2xl tracking-tight text-[#F5F5F0] group-hover:text-[#C5A059] transition-colors">
            Stassen's Collection <span className="opacity-40 italic">of Ingredients</span>
          </h1>
        </button>

        {/* Desktop Nav Links */}
        <nav id="desktop-nav" className="hidden lg:flex items-center space-x-3 xl:space-x-5 text-[11px] tracking-[0.18em] uppercase font-medium">
          <button
            id="nav-link-home"
            onClick={() => onNavigate('home')}
            className={`transition-all pb-1 ${
              activeSection === 'home'
                ? 'border-b border-[#C5A059] text-[#F5F5F0]'
                : 'opacity-60 hover:opacity-100 text-[#F5F5F0]'
            }`}
          >
            Home
          </button>

          <button
            id="nav-link-collection"
            onClick={() => onNavigate('collection')}
            className={`transition-all pb-1 ${
              activeSection === 'collection'
                ? 'border-b border-[#C5A059] text-[#F5F5F0]'
                : 'opacity-60 hover:opacity-100 text-[#F5F5F0]'
            }`}
          >
            19+ Collection
          </button>

          <a
            id="nav-link-categories"
            href="/categories"
            onClick={(e) => {
              if (!e.metaKey && !e.ctrlKey && !e.shiftKey) {
                e.preventDefault();
                onNavigate('categories-index');
              }
            }}
            className={`transition-all pb-1 text-inherit no-underline ${
              activeSection === 'categories-index' || activeSection === 'category-detail'
                ? 'border-b border-[#C5A059] text-[#F5F5F0]'
                : 'opacity-60 hover:opacity-100 text-[#F5F5F0]'
            }`}
          >
            Categories
          </a>

          {/* 1,000+ Recipes Matrix */}
          <button
            id="nav-link-recipes-matrix"
            onClick={() => onNavigate('recipes-archive')}
            className={`transition-all pb-1 flex items-center space-x-1.5 px-2 py-0.5 rounded-full ${
              activeSection === 'recipes-archive'
                ? 'bg-[#C5A059]/20 border border-[#C5A059] text-[#C5A059]'
                : 'text-[#C5A059] hover:bg-[#C5A059]/10'
            }`}
          >
            <ChefHat className="w-3.5 h-3.5" />
            <span className="font-semibold">1,000+ Recipes</span>
          </button>

          {/* What Can I Cook? Matcher */}
          <button
            id="nav-link-what-can-i-cook"
            onClick={() => onNavigate('what-can-i-cook')}
            className={`transition-all pb-1 flex items-center space-x-1.5 px-2.5 py-1 rounded-full ${
              activeSection === 'what-can-i-cook'
                ? 'bg-[#C5A059] text-black font-bold'
                : 'bg-white/10 hover:bg-white/20 text-[#F5F5F0]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#C5A059] group-hover:text-black" />
            <span className="font-semibold">What Can I Cook?</span>
          </button>

          <button
            id="nav-link-locations"
            onClick={() => onNavigate('locations')}
            className={`transition-all pb-1 ${
              activeSection === 'locations'
                ? 'border-b border-[#C5A059] text-[#F5F5F0]'
                : 'opacity-60 hover:opacity-100 text-[#F5F5F0]'
            }`}
          >
            Locations
          </button>

          <button
            id="nav-link-calendar"
            onClick={() => onNavigate('seasonal-calendar')}
            className={`transition-all pb-1 ${
              activeSection === 'seasonal-calendar'
                ? 'border-b border-[#C5A059] text-[#F5F5F0]'
                : 'opacity-60 hover:opacity-100 text-[#F5F5F0]'
            }`}
          >
            Calendar
          </button>

          {/* Dedicated About */}
          <button
            id="nav-link-about"
            onClick={() => onNavigate('about')}
            className={`transition-all pb-1 ${
              activeSection === 'about'
                ? 'border-b border-[#C5A059] text-[#F5F5F0]'
                : 'opacity-60 hover:opacity-100 text-[#F5F5F0]'
            }`}
          >
            About
          </button>

          {/* Dedicated Contact */}
          <button
            id="nav-link-contact"
            onClick={() => onNavigate('contact')}
            className={`transition-all pb-1 ${
              activeSection === 'contact'
                ? 'border-b border-[#C5A059] text-[#F5F5F0]'
                : 'opacity-60 hover:opacity-100 text-[#F5F5F0]'
            }`}
          >
            Contact
          </button>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center space-x-2 sm:space-x-2.5">
          {/* Quick How-To-Use Guide Button */}
          {onOpenGuide && (
            <button
              id="nav-guide-btn"
              onClick={onOpenGuide}
              aria-label="User Guide"
              className="flex items-center space-x-1.5 px-2.5 sm:px-3 py-1.5 rounded-full border border-[#C5A059]/40 bg-[#C5A059]/10 hover:bg-[#C5A059]/25 text-[#C5A059] text-xs font-semibold transition-all"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Guide</span>
            </button>
          )}

          {/* Quick Search Trigger */}
          <button
            id="nav-search-button"
            onClick={onSearchClick}
            aria-label="Search Ingredients"
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full border border-[#F5F5F0]/15 bg-[#1A1A1A]/80 hover:border-[#C5A059]/60 text-[#F5F5F0] opacity-80 hover:opacity-100 text-xs transition-all"
          >
            <Search className="w-3.5 h-3.5 text-[#C5A059]" />
            <span className="hidden sm:inline font-mono text-[10px] tracking-wider">⌘K</span>
          </button>

          {/* Shopping List Builder Button */}
          <button
            id="nav-shopping-list-btn"
            onClick={() => onNavigate('shopping-list')}
            aria-label="Shopping List"
            className={`relative flex items-center space-x-1.5 px-3 py-1.5 rounded-full border transition-all ${
              activeSection === 'shopping-list'
                ? 'border-[#C5A059] bg-[#C5A059]/20 text-[#C5A059]'
                : 'border-[#F5F5F0]/15 bg-[#1A1A1A]/80 hover:border-[#C5A059]/50 text-[#F5F5F0]/80 hover:text-white'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden xl:inline text-[11px] uppercase tracking-wider">List</span>
            {shoppingListCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-emerald-500 text-white text-[10px] font-bold flex items-center justify-center">
                {shoppingListCount}
              </span>
            )}
          </button>

          {/* Saved Ingredients / My Pantry Button */}
          <button
            id="nav-saved-cellar-btn"
            onClick={() => onNavigate('my-pantry')}
            aria-label="View My Pantry"
            className={`relative flex items-center space-x-2 px-3.5 py-1.5 rounded-full border transition-all ${
              activeSection === 'my-pantry'
                ? 'border-[#C5A059] bg-[#C5A059] text-[#121212] font-semibold'
                : 'border-[#C5A059]/40 bg-[#C5A059]/10 hover:bg-[#C5A059]/20 text-[#F5F5F0]'
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${activeSection === 'my-pantry' ? 'text-[#121212] fill-current' : 'text-[#C5A059]'}`} />
            <span className="text-xs uppercase tracking-widest font-medium">My Pantry</span>
            {savedCount > 0 && (
              <span className={`w-4 h-4 rounded-full text-[10px] font-bold flex items-center justify-center ${
                activeSection === 'my-pantry' ? 'bg-[#121212] text-[#C5A059]' : 'bg-[#C5A059] text-[#121212]'
              }`}>
                {savedCount}
              </span>
            )}
          </button>

          {/* Bulk Ingestion / Ingest Hub Button */}
          <button
            id="nav-bulk-ingest-btn"
            onClick={onOpenDataModal}
            title="Safe Bulk Content Ingestion & Scale Hub (JSON / CSV)"
            aria-label="Bulk Ingestion & Export"
            className="p-2 rounded-full border border-[#F5F5F0]/15 bg-[#1A1A1A]/80 text-[#F5F5F0]/80 hover:text-[#C5A059] hover:border-[#C5A059]/50 transition-all hidden sm:flex items-center justify-center"
          >
            <Database className="w-4 h-4" />
          </button>

          {/* Admin / Telemetry Portal */}
          <button
            id="nav-admin-portal-btn"
            onClick={onOpenAdminModal}
            title="Curator Admin Portal & Visitor Milestones"
            aria-label="Curator Admin Portal"
            className={`relative p-2 rounded-full border transition-all ${
              isAdminUser
                ? 'border-[#C5A059] bg-[#C5A059]/20 text-[#C5A059]'
                : 'border-[#F5F5F0]/15 bg-[#1A1A1A]/80 text-[#F5F5F0]/80 hover:text-[#C5A059] hover:border-[#C5A059]/50'
            }`}
          >
            <Shield className="w-4 h-4" />
            {isAdminUser && (
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-[#38a169]" />
            )}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            id="nav-mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#F5F5F0] opacity-80 hover:opacity-100 focus:outline-none"
            aria-label="Toggle menu"
          >
            <SlidersHorizontal className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            key="mobile-nav-drawer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#161616] border-b border-[#F5F5F0]/10 px-6 py-4 space-y-3 shadow-2xl"
          >
            {onOpenGuide && (
              <button
                onClick={() => { onOpenGuide(); setMobileMenuOpen(false); }}
                className="flex items-center space-x-2 w-full text-left py-2 px-3 rounded-lg bg-[#C5A059]/15 text-[#C5A059] text-xs uppercase tracking-[0.2em] font-bold"
              >
                <HelpCircle className="w-4 h-4" />
                <span>How To Use & Guide Tour</span>
              </button>
            )}

            <button
              onClick={() => { onNavigate('home'); setMobileMenuOpen(false); }}
              className="block w-full text-left py-2 text-xs uppercase tracking-[0.2em] opacity-70 hover:opacity-100 hover:text-[#C5A059]"
            >
              Home (/)
            </button>
            <button
              onClick={() => { onNavigate('collection'); setMobileMenuOpen(false); }}
              className="block w-full text-left py-2 text-xs uppercase tracking-[0.2em] opacity-70 hover:opacity-100 hover:text-[#C5A059]"
            >
              19+ Collection (/collection)
            </button>
            <a
              href="/categories"
              onClick={(e) => {
                if (!e.metaKey && !e.ctrlKey && !e.shiftKey) {
                  e.preventDefault();
                  onNavigate('categories-index');
                  setMobileMenuOpen(false);
                }
              }}
              className="block w-full text-left py-2 text-xs uppercase tracking-[0.2em] opacity-70 hover:opacity-100 hover:text-[#C5A059] text-inherit no-underline"
            >
              Categories & Discovery (/categories)
            </a>
            <button
              onClick={() => { onNavigate('recipes-archive'); setMobileMenuOpen(false); }}
              className="flex items-center space-x-1.5 w-full text-left py-2 text-xs uppercase tracking-[0.2em] text-[#C5A059] font-bold"
            >
              <ChefHat className="w-4 h-4" />
              <span>1,000+ Recipes Matrix</span>
            </button>
            <button
              onClick={() => { onNavigate('what-can-i-cook'); setMobileMenuOpen(false); }}
              className="flex items-center space-x-1.5 w-full text-left py-2 px-3 rounded-lg bg-[#C5A059] text-black text-xs uppercase tracking-[0.2em] font-bold"
            >
              <Sparkles className="w-4 h-4" />
              <span>What Can I Cook? (Matcher)</span>
            </button>
            <button
              onClick={() => { onNavigate('locations'); setMobileMenuOpen(false); }}
              className="block w-full text-left py-2 text-xs uppercase tracking-[0.2em] opacity-70 hover:opacity-100 hover:text-[#C5A059]"
            >
              Locations & Terroirs (/locations)
            </button>
            <button
              onClick={() => { onNavigate('seasonal-calendar'); setMobileMenuOpen(false); }}
              className="block w-full text-left py-2 text-xs uppercase tracking-[0.2em] opacity-70 hover:opacity-100 hover:text-[#C5A059]"
            >
              12-Month Harvest Calendar (/seasonal)
            </button>
            <button
              onClick={() => { onNavigate('shopping-list'); setMobileMenuOpen(false); }}
              className="block w-full text-left py-2 text-xs uppercase tracking-[0.2em] opacity-70 hover:opacity-100 hover:text-[#C5A059]"
            >
              Provisions Shopping List ({shoppingListCount})
            </button>
            <button
              onClick={() => { onNavigate('about'); setMobileMenuOpen(false); }}
              className="block w-full text-left py-2 text-xs uppercase tracking-[0.2em] opacity-70 hover:opacity-100 hover:text-[#C5A059]"
            >
              About (/about)
            </button>
            <button
              onClick={() => { onNavigate('contact'); setMobileMenuOpen(false); }}
              className="block w-full text-left py-2 text-xs uppercase tracking-[0.2em] opacity-70 hover:opacity-100 hover:text-[#C5A059]"
            >
              Contact (/contact)
            </button>
            <button
              onClick={() => { onNavigate('privacy'); setMobileMenuOpen(false); }}
              className="block w-full text-left py-2 text-xs uppercase tracking-[0.2em] opacity-70 hover:opacity-100 hover:text-[#C5A059]"
            >
              Privacy Policy (/privacy)
            </button>
            <button
              onClick={() => { onNavigate('my-pantry'); setMobileMenuOpen(false); }}
              className="block w-full text-left py-2 text-xs uppercase tracking-[0.2em] opacity-90 text-[#C5A059] border-t border-[#F5F5F0]/10 pt-3"
            >
              My Cellar & Pantry ({savedCount})
            </button>
            <button
              onClick={() => { onOpenAdminModal(); setMobileMenuOpen(false); }}
              className="block w-full text-left py-2 text-xs uppercase tracking-[0.2em] text-[#C5A059] font-semibold border-t border-[#F5F5F0]/10 pt-3"
            >
              Curator Admin & Milestones
            </button>
            <button
              id="nav-mobile-bulk-ingest-btn"
              onClick={() => { onOpenDataModal(); setMobileMenuOpen(false); }}
              className="flex items-center space-x-2 w-full text-left py-2 text-xs uppercase tracking-[0.2em] text-[#C5A059] font-mono border-t border-[#F5F5F0]/10 pt-3"
            >
              <Database className="w-4 h-4 text-[#C5A059]" />
              <span>Bulk Ingestion & Export (CSV/JSON)</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
