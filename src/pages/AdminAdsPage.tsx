import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  Shield,
  ShieldAlert,
  Power,
  Sliders,
  Smartphone,
  Tablet,
  Monitor,
  Clock,
  Layers,
  Code,
  Eye,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  RefreshCw,
  Save,
  RotateCcw,
  Sparkles,
  HelpCircle,
  BarChart3,
  Globe,
  Radio,
  Lock,
  LogIn,
  LayoutTemplate
} from 'lucide-react';
import { AdManager, DEFAULT_AD_SETTINGS } from '../services/adManager';
import { AdSettings, AppView, DeviceCategory, CooldownUnit, SocialBarPosition, AdFrequencyMode } from '../types';
import { isUserAdmin, googleSignIn, simulateAdminSignIn, ADMIN_EMAIL } from '../services/firebase';
import { User } from 'firebase/auth';

interface AdminAdsPageProps {
  currentUser: User | null;
  onNavigateHome: () => void;
}

export const AdminAdsPage: React.FC<AdminAdsPageProps> = ({ currentUser, onNavigateHome }) => {
  const [settings, setSettings] = useState<AdSettings>(() => AdManager.getSettings());
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'general' | 'popunder' | 'socialbar' | 'targeting' | 'scripts' | 'preview' | 'diagnostics' | 'analytics'>('general');
  const [previewDevice, setPreviewDevice] = useState<DeviceCategory>('desktop');
  const [diagnosticRoute, setDiagnosticRoute] = useState<string>('home');
  const [isAuthProcessing, setIsAuthProcessing] = useState(false);

  // Subscribe to real-time settings changes
  useEffect(() => {
    const unsubscribe = AdManager.subscribe((latest) => {
      setSettings(latest);
    });
    return () => unsubscribe();
  }, []);

  const isAdmin = isUserAdmin(currentUser);

  const handleSave = async (customSettings?: Partial<AdSettings>) => {
    setSaveStatus('saving');
    try {
      const payload = customSettings ? { ...settings, ...customSettings } : settings;
      await AdManager.updateSettings(payload, currentUser?.email || undefined);
      setSaveStatus('saved');
      setStatusMessage('Settings successfully saved & synced to all visitors');
      setTimeout(() => setSaveStatus('idle'), 3000);
    } catch (err: any) {
      setSaveStatus('error');
      setStatusMessage('Failed to save settings: ' + (err.message || 'Unknown error'));
      setTimeout(() => setSaveStatus('idle'), 4000);
    }
  };

  const handleToggle = (key: keyof AdSettings) => {
    const updated = { ...settings, [key]: !settings[key] };
    setSettings(updated);
  };

  const handleEmergencyDisable = async () => {
    if (window.confirm('EMERGENCY KILL SWITCH: Are you sure you want to disable ALL Adsterra scripts immediately across all devices and pages?')) {
      await AdManager.emergencyDisableAll();
      setSaveStatus('saved');
      setStatusMessage('EMERGENCY ACTION: All advertising has been disabled site-wide.');
      setTimeout(() => setSaveStatus('idle'), 4000);
    }
  };

  const handleResetDefaults = async () => {
    if (window.confirm('Reset all advertising configurations back to conservative factory defaults?')) {
      await AdManager.resetToDefaults();
      setSettings(AdManager.getSettings());
      setSaveStatus('saved');
      setStatusMessage('Reset to factory defaults completed.');
      setTimeout(() => setSaveStatus('idle'), 3000);
    }
  };

  // Determine current system status
  const getSystemStatus = () => {
    if (settings.emergencyDisabled || !settings.enabled) {
      return { label: 'DISABLED', color: 'bg-rose-500/20 text-rose-400 border-rose-500/30' };
    }
    if (settings.testMode) {
      return { label: 'TEST MODE', color: 'bg-amber-500/20 text-amber-400 border-amber-500/30' };
    }
    if (!settings.popunderEnabled && !settings.socialBarEnabled && !settings.nativeBannerEnabled) {
      return { label: 'PAUSED', color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' };
    }
    return { label: 'ACTIVE', color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' };
  };

  const status = getSystemStatus();

  // All known application routes for targeting
  const ALL_ROUTES: { id: string; label: string; type: 'public' | 'protected' | 'saas' }[] = [
    { id: 'home', label: 'Homepage (Root /)', type: 'public' },
    { id: 'collection', label: 'Ingredient Collection', type: 'public' },
    { id: 'ingredient-detail', label: 'Specimen Botanical Dossier', type: 'public' },
    { id: 'locations', label: 'World Terroirs Atlas', type: 'public' },
    { id: 'recipes-archive', label: 'Masterclass Archive', type: 'public' },
    { id: 'seasonal-calendar', label: 'Seasonal Terroir Calendar', type: 'public' },
    { id: 'shopping-list', label: 'Culinary Shopping List', type: 'public' },
    { id: 'search-results', label: 'Dedicated Search Results', type: 'public' },
    { id: 'about', label: 'Editorial About Page', type: 'public' },
    { id: 'contact', label: 'Contact Atelier Form', type: 'public' },
    { id: 'privacy', label: 'Privacy & Legal Colophon', type: 'public' },
    { id: 'my-pantry', label: 'My Cellar & Pantry (Workspace)', type: 'saas' },
    { id: 'cook-modal', label: 'Active Interactive Cook Mode', type: 'saas' },
    { id: 'admin', label: 'Admin Telemetry Center', type: 'protected' },
    { id: 'admin-ads', label: 'Ad Monetization Control Center', type: 'protected' },
    { id: 'auth', label: 'Authentication & Sign-in Views', type: 'protected' },
    { id: 'checkout', label: 'Payment / Checkout Gateways', type: 'protected' }
  ];

  // Auth Gate: If user is not admin, show secure login prompt
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-[#121212] text-[#F5F5F0] pt-28 pb-20 px-4 flex items-center justify-center">
        <div className="max-w-md w-full p-8 bg-[#181818] border border-[#C5A059]/40 rounded-2xl text-center shadow-2xl">
          <div className="w-14 h-14 rounded-2xl bg-[#C5A059]/15 border border-[#C5A059]/40 flex items-center justify-center text-[#C5A059] mx-auto mb-4">
            <Lock className="w-7 h-7" />
          </div>
          <h2 className="font-serif text-2xl text-white font-bold mb-2">Restricted Admin Access</h2>
          <p className="text-xs text-[#F5F5F0]/70 font-light leading-relaxed mb-6">
            The <span className="text-[#C5A059] font-medium">Adsterra Smart Ads Control Center</span> is reserved strictly for authorized platform administrators ({ADMIN_EMAIL}).
          </p>

          <div className="space-y-3">
            <button
              onClick={async () => {
                try {
                  setIsAuthProcessing(true);
                  await googleSignIn();
                } catch (e) {
                  // Fallback simulation handled below
                } finally {
                  setIsAuthProcessing(false);
                }
              }}
              disabled={isAuthProcessing}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#C5A059] to-[#d6b168] hover:from-[#d6b168] hover:to-[#e6c178] text-[#121212] text-xs font-mono font-bold uppercase tracking-wider flex items-center justify-center space-x-2 transition-all shadow-lg"
            >
              <LogIn className="w-4 h-4" />
              <span>{isAuthProcessing ? 'Authenticating...' : 'Sign in with Google'}</span>
            </button>

            <button
              onClick={async () => {
                setIsAuthProcessing(true);
                await simulateAdminSignIn();
                setIsAuthProcessing(false);
              }}
              className="w-full py-2.5 px-4 rounded-xl bg-[#222] hover:bg-[#2a2a2a] text-white/80 hover:text-white text-xs font-mono tracking-wider border border-white/10 transition-all flex items-center justify-center space-x-2"
            >
              <Shield className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Authorize Preview Lead Curator</span>
            </button>

            <button
              onClick={onNavigateHome}
              className="w-full text-xs text-white/40 hover:text-white/70 py-2 transition-colors font-mono"
            >
              Return to Public Website
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#121212] text-[#F5F5F0] pt-24 pb-24 px-3 sm:px-6 max-w-7xl mx-auto">
      {/* Page Title & Top Master Bar */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center space-x-2.5 mb-1.5">
            <span className="p-1.5 rounded-lg bg-[#C5A059]/15 border border-[#C5A059]/40 text-[#C5A059]">
              <Sliders className="w-4 h-4" />
            </span>
            <span className="text-xs font-mono uppercase tracking-widest text-[#C5A059] font-semibold">
              ADMIN CONTROL PANEL
            </span>
            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold border ${status.color}`}>
              {status.label}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
            Ad Monetization Control Center
          </h1>
          <p className="text-xs text-white/60 font-light mt-0.5">
            Configure Adsterra Popunder, Social Bar, device targeting, frequency limits, and page rules without source code changes.
          </p>
        </div>

        {/* Global Save / Emergency Actions */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => handleSave()}
            disabled={saveStatus === 'saving'}
            className="py-2 px-4 rounded-xl bg-gradient-to-r from-[#C5A059] to-[#d6b168] hover:from-[#d6b168] hover:to-[#e6c178] text-[#121212] font-mono text-xs font-bold uppercase tracking-wider flex items-center space-x-2 shadow-lg transition-all active:scale-95"
          >
            <Save className="w-3.5 h-3.5" />
            <span>{saveStatus === 'saving' ? 'Saving...' : 'Save Settings'}</span>
          </button>

          <button
            onClick={handleEmergencyDisable}
            className="py-2 px-3.5 rounded-xl bg-rose-950/60 hover:bg-rose-900 border border-rose-500/40 text-rose-300 font-mono text-xs font-semibold tracking-wider flex items-center space-x-1.5 transition-all active:scale-95"
            title="Immediately stop all advertising scripts"
          >
            <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
            <span>Emergency Kill Switch</span>
          </button>

          <button
            onClick={handleResetDefaults}
            className="py-2 px-3 rounded-xl bg-[#222] hover:bg-[#2a2a2a] text-white/70 hover:text-white border border-white/10 text-xs font-mono transition-colors"
            title="Reset to factory conservative defaults"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Save status notification banner */}
      {saveStatus === 'saved' && (
        <div className="mb-6 p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs font-mono flex items-center space-x-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{statusMessage || 'Changes saved and active site-wide.'}</span>
        </div>
      )}
      {saveStatus === 'error' && (
        <div className="mb-6 p-3 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-300 text-xs font-mono flex items-center space-x-2">
          <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
          <span>{statusMessage}</span>
        </div>
      )}

      {/* Top Mobile-Friendly Quick Switches Card */}
      <div className="mb-6 p-4 bg-[#181818] border border-white/10 rounded-2xl">
        <div className="text-[10px] font-mono uppercase tracking-widest text-[#C5A059] font-bold mb-3 flex items-center space-x-1.5">
          <Radio className="w-3.5 h-3.5" />
          <span>QUICK ON/OFF STATUS & HARDWARE SWITCHES</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {/* Master Switch */}
          <div
            onClick={() => {
              const updated = { ...settings, enabled: !settings.enabled, emergencyDisabled: false };
              setSettings(updated);
              handleSave(updated);
            }}
            className={`p-3 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
              settings.enabled && !settings.emergencyDisabled
                ? 'bg-emerald-950/30 border-emerald-500/50 text-emerald-300'
                : 'bg-white/5 border-white/10 text-white/40'
            }`}
          >
            <span className="text-[10px] font-mono uppercase tracking-wider block font-bold">MASTER ADS</span>
            <div className="flex items-center justify-between mt-2">
              <span className="text-xs font-bold font-mono">{settings.enabled && !settings.emergencyDisabled ? 'ENABLED' : 'DISABLED'}</span>
              <Power className="w-4 h-4" />
            </div>
          </div>

          {/* Popunder Quick */}
          <div
            onClick={() => {
              const updated = { ...settings, popunderEnabled: !settings.popunderEnabled };
              setSettings(updated);
              handleSave(updated);
            }}
            className={`p-3 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
              settings.popunderEnabled
                ? 'bg-[#C5A059]/15 border-[#C5A059]/50 text-[#C5A059]'
                : 'bg-white/5 border-white/10 text-white/40'
            }`}
          >
            <span className="text-[10px] font-mono uppercase tracking-wider block font-bold">POPUNDER</span>
            <div className="flex items-center justify-between mt-2">
              <span className="text-xs font-bold font-mono">{settings.popunderEnabled ? 'ON' : 'OFF'}</span>
              <Layers className="w-4 h-4" />
            </div>
          </div>

          {/* Social Bar Quick */}
          <div
            onClick={() => {
              const updated = { ...settings, socialBarEnabled: !settings.socialBarEnabled };
              setSettings(updated);
              handleSave(updated);
            }}
            className={`p-3 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
              settings.socialBarEnabled
                ? 'bg-[#C5A059]/15 border-[#C5A059]/50 text-[#C5A059]'
                : 'bg-white/5 border-white/10 text-white/40'
            }`}
          >
            <span className="text-[10px] font-mono uppercase tracking-wider block font-bold">SOCIAL BAR</span>
            <div className="flex items-center justify-between mt-2">
              <span className="text-xs font-bold font-mono">{settings.socialBarEnabled ? 'ON' : 'OFF'}</span>
              <Sparkles className="w-4 h-4" />
            </div>
          </div>

          {/* Desktop Ads Quick */}
          <div
            onClick={() => {
              const updated = { ...settings, desktopEnabled: !settings.desktopEnabled };
              setSettings(updated);
              handleSave(updated);
            }}
            className={`p-3 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
              settings.desktopEnabled
                ? 'bg-sky-950/30 border-sky-500/50 text-sky-300'
                : 'bg-white/5 border-white/10 text-white/40'
            }`}
          >
            <span className="text-[10px] font-mono uppercase tracking-wider block font-bold">DESKTOP ADS</span>
            <div className="flex items-center justify-between mt-2">
              <span className="text-xs font-bold font-mono">{settings.desktopEnabled ? 'ON' : 'OFF'}</span>
              <Monitor className="w-4 h-4" />
            </div>
          </div>

          {/* Mobile Ads Quick */}
          <div
            onClick={() => {
              const updated = { ...settings, mobileEnabled: !settings.mobileEnabled };
              setSettings(updated);
              handleSave(updated);
            }}
            className={`p-3 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
              settings.mobileEnabled
                ? 'bg-sky-950/30 border-sky-500/50 text-sky-300'
                : 'bg-white/5 border-white/10 text-white/40'
            }`}
          >
            <span className="text-[10px] font-mono uppercase tracking-wider block font-bold">MOBILE ADS</span>
            <div className="flex items-center justify-between mt-2">
              <span className="text-xs font-bold font-mono">{settings.mobileEnabled ? 'ON' : 'OFF'}</span>
              <Smartphone className="w-4 h-4" />
            </div>
          </div>

          {/* Test Mode Quick */}
          <div
            onClick={() => {
              const updated = { ...settings, testMode: !settings.testMode };
              setSettings(updated);
              handleSave(updated);
            }}
            className={`p-3 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
              settings.testMode
                ? 'bg-amber-950/40 border-amber-500/50 text-amber-300'
                : 'bg-white/5 border-white/10 text-white/40'
            }`}
          >
            <span className="text-[10px] font-mono uppercase tracking-wider block font-bold">TEST MODE</span>
            <div className="flex items-center justify-between mt-2">
              <span className="text-xs font-bold font-mono">{settings.testMode ? 'ACTIVE' : 'OFF'}</span>
              <Clock className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Tabs Navigation */}
      <div className="flex items-center space-x-1 sm:space-x-2 border-b border-white/10 mb-6 overflow-x-auto pb-1">
        {[
          { id: 'general', label: 'General & Devices', icon: Sliders },
          { id: 'popunder', label: 'Popunder Engine', icon: Layers },
          { id: 'socialbar', label: 'Social Bar Engine', icon: Sparkles },
          { id: 'targeting', label: 'Page Targeting Policy', icon: Globe },
          { id: 'scripts', label: 'Adsterra Scripts & Code', icon: Code },
          { id: 'preview', label: 'Live Device Preview', icon: Eye },
          { id: 'diagnostics', label: 'Rules Diagnostic Tester', icon: HelpCircle },
          { id: 'analytics', label: 'Analytics Pipeline', icon: BarChart3 }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3.5 py-2.5 rounded-t-xl text-xs font-mono uppercase tracking-wider whitespace-nowrap flex items-center space-x-2 transition-all border-b-2 ${
                isActive
                  ? 'bg-[#1e1e1e] text-[#C5A059] border-[#C5A059] font-bold'
                  : 'text-white/60 hover:text-white border-transparent hover:bg-white/5'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: General & Device Settings */}
      {activeTab === 'general' && (
        <div className="space-y-6">
          <div className="p-5 sm:p-6 bg-[#181818] border border-white/10 rounded-2xl space-y-6">
            <h3 className="font-serif text-lg font-bold text-white flex items-center space-x-2">
              <Sliders className="w-4 h-4 text-[#C5A059]" />
              <span>Master System Controls & Fallback Security</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-white">Global Advertising Master Switch</span>
                  <input
                    type="checkbox"
                    checked={settings.enabled && !settings.emergencyDisabled}
                    onChange={() => handleToggle('enabled')}
                    className="w-5 h-5 accent-[#C5A059] cursor-pointer"
                  />
                </div>
                <p className="text-[11px] text-white/50 font-light">
                  When toggled OFF, all Adsterra script execution is terminated globally. Website renders normally without delay.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-white">Test / Simulation Mode</span>
                  <input
                    type="checkbox"
                    checked={settings.testMode}
                    onChange={() => handleToggle('testMode')}
                    className="w-5 h-5 accent-[#C5A059] cursor-pointer"
                  />
                </div>
                <p className="text-[11px] text-white/50 font-light">
                  Bypasses user frequency limits for admin testing. Displays diagnostic badges without firing unnecessary real ads.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-white">Public Pages Monetization</span>
                  <input
                    type="checkbox"
                    checked={settings.publicPagesEnabled}
                    onChange={() => handleToggle('publicPagesEnabled')}
                    className="w-5 h-5 accent-[#C5A059] cursor-pointer"
                  />
                </div>
                <p className="text-[11px] text-white/50 font-light">
                  Allows ad placements on public content pages (Homepage, Collection, Archive, Locations, etc.).
                </p>
              </div>

              <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-white">SaaS Dashboard & Workspace Ads</span>
                  <input
                    type="checkbox"
                    checked={settings.dashboardPagesEnabled}
                    onChange={() => handleToggle('dashboardPagesEnabled')}
                    className="w-5 h-5 accent-[#C5A059] cursor-pointer"
                  />
                </div>
                <p className="text-[11px] text-white/50 font-light">
                  Default OFF. Keeps user workspaces, interactive cooking tools, and document editors 100% clean of advertising.
                </p>
              </div>
            </div>
          </div>

          {/* Device Hardware Rules Card */}
          <div className="p-5 sm:p-6 bg-[#181818] border border-white/10 rounded-2xl space-y-4">
            <h3 className="font-serif text-lg font-bold text-white flex items-center space-x-2">
              <Monitor className="w-4 h-4 text-[#C5A059]" />
              <span>Responsive Hardware Rules (Desktop, Tablet, Mobile)</span>
            </h3>
            <p className="text-xs text-white/60 font-light">
              Control which device viewports are permitted to display advertising. Responsive detection uses client-side viewport measurements.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-3">
                <div className="flex items-center space-x-2 text-white">
                  <Monitor className="w-4 h-4 text-sky-400" />
                  <span className="text-xs font-bold font-mono">DESKTOP (≥ 1024px)</span>
                </div>
                <label className="flex items-center justify-between text-xs text-white/80 cursor-pointer">
                  <span>Enable Ads on Desktop</span>
                  <input
                    type="checkbox"
                    checked={settings.desktopEnabled}
                    onChange={() => handleToggle('desktopEnabled')}
                    className="w-4 h-4 accent-[#C5A059]"
                  />
                </label>
              </div>

              <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-3">
                <div className="flex items-center space-x-2 text-white">
                  <Tablet className="w-4 h-4 text-purple-400" />
                  <span className="text-xs font-bold font-mono">TABLET (768px - 1023px)</span>
                </div>
                <label className="flex items-center justify-between text-xs text-white/80 cursor-pointer">
                  <span>Enable Ads on Tablet</span>
                  <input
                    type="checkbox"
                    checked={settings.tabletEnabled}
                    onChange={() => handleToggle('tabletEnabled')}
                    className="w-4 h-4 accent-[#C5A059]"
                  />
                </label>
              </div>

              <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-3">
                <div className="flex items-center space-x-2 text-white">
                  <Smartphone className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-bold font-mono">MOBILE (&lt; 768px)</span>
                </div>
                <label className="flex items-center justify-between text-xs text-white/80 cursor-pointer">
                  <span>Enable Ads on Mobile</span>
                  <input
                    type="checkbox"
                    checked={settings.mobileEnabled}
                    onChange={() => handleToggle('mobileEnabled')}
                    className="w-4 h-4 accent-[#C5A059]"
                  />
                </label>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Popunder Configuration */}
      {activeTab === 'popunder' && (
        <div className="space-y-6">
          <div className="p-5 sm:p-6 bg-[#181818] border border-white/10 rounded-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-white/5">
              <div>
                <h3 className="font-serif text-lg font-bold text-white flex items-center space-x-2">
                  <Layers className="w-4 h-4 text-[#C5A059]" />
                  <span>Adsterra Popunder Engine & Frequency Calibration</span>
                </h3>
                <p className="text-xs text-white/60 font-light mt-0.5">
                  Popunder triggers safely in the background upon deliberate user interaction. Never loops or fires repeatedly.
                </p>
              </div>

              <div className="flex items-center space-x-3">
                <span className="text-xs font-mono text-white/70">Master Popunder Switch:</span>
                <input
                  type="checkbox"
                  checked={settings.popunderEnabled}
                  onChange={() => handleToggle('popunderEnabled')}
                  className="w-5 h-5 accent-[#C5A059] cursor-pointer"
                />
              </div>
            </div>

            {/* Device Specific Popunder Toggles */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <label className="p-3.5 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between cursor-pointer">
                <span className="text-xs text-white">Desktop Popunder</span>
                <input
                  type="checkbox"
                  checked={settings.popunderDesktop}
                  onChange={() => handleToggle('popunderDesktop')}
                  className="w-4 h-4 accent-[#C5A059]"
                />
              </label>

              <label className="p-3.5 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between cursor-pointer">
                <span className="text-xs text-white">Tablet Popunder</span>
                <input
                  type="checkbox"
                  checked={settings.popunderTablet}
                  onChange={() => handleToggle('popunderTablet')}
                  className="w-4 h-4 accent-[#C5A059]"
                />
              </label>

              <label className="p-3.5 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between cursor-pointer">
                <span className="text-xs text-white">Mobile Popunder (Default: OFF)</span>
                <input
                  type="checkbox"
                  checked={settings.popunderMobile}
                  onChange={() => handleToggle('popunderMobile')}
                  className="w-4 h-4 accent-[#C5A059]"
                />
              </label>
            </div>

            {/* Frequency & Cooldown Controls */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-2">
                <label className="text-xs font-mono uppercase tracking-wider text-[#C5A059] block font-semibold">
                  Frequency Mode
                </label>
                <select
                  value={settings.popunderFrequencyMode}
                  onChange={(e) => setSettings({ ...settings, popunderFrequencyMode: e.target.value as AdFrequencyMode })}
                  className="w-full bg-[#222] border border-white/10 rounded-lg p-2.5 text-xs text-white font-mono focus:border-[#C5A059] outline-none"
                >
                  <option value="once_per_x_minutes">Once per X Minutes</option>
                  <option value="once_per_session">Once per Session</option>
                  <option value="once_per_x_hours">Once per X Hours</option>
                  <option value="once_per_day">Once per Day</option>
                  <option value="custom">Custom Cooldown</option>
                </select>
                <p className="text-[10px] text-white/40">Defines how frequency intervals are calculated.</p>
              </div>

              <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-2">
                <label className="text-xs font-mono uppercase tracking-wider text-[#C5A059] block font-semibold">
                  Cooldown Period & Unit
                </label>
                <div className="flex space-x-2">
                  <input
                    type="number"
                    min="1"
                    max="1440"
                    value={settings.popunderCooldownValue}
                    onChange={(e) => setSettings({ ...settings, popunderCooldownValue: Math.max(1, parseInt(e.target.value) || 1) })}
                    className="w-1/2 bg-[#222] border border-white/10 rounded-lg p-2.5 text-xs text-white font-mono focus:border-[#C5A059] outline-none"
                  />
                  <select
                    value={settings.popunderCooldownUnit}
                    onChange={(e) => setSettings({ ...settings, popunderCooldownUnit: e.target.value as CooldownUnit })}
                    className="w-1/2 bg-[#222] border border-white/10 rounded-lg p-2.5 text-xs text-white font-mono focus:border-[#C5A059] outline-none"
                  >
                    <option value="minutes">Minutes</option>
                    <option value="hours">Hours</option>
                    <option value="days">Days</option>
                  </select>
                </div>
                <p className="text-[10px] text-white/40">Default: 60 minutes between popunder impressions per user.</p>
              </div>

              <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-2">
                <label className="text-xs font-mono uppercase tracking-wider text-[#C5A059] block font-semibold">
                  Impression Limits (Session & Daily)
                </label>
                <div className="flex space-x-2">
                  <div className="w-1/2">
                    <span className="text-[9px] text-white/50 block mb-0.5">Session Max</span>
                    <input
                      type="number"
                      min="1"
                      max="20"
                      value={settings.popunderSessionMax}
                      onChange={(e) => setSettings({ ...settings, popunderSessionMax: Math.max(1, parseInt(e.target.value) || 1) })}
                      className="w-full bg-[#222] border border-white/10 rounded-lg p-2 text-xs text-white font-mono focus:border-[#C5A059] outline-none"
                    />
                  </div>
                  <div className="w-1/2">
                    <span className="text-[9px] text-white/50 block mb-0.5">Daily Max</span>
                    <input
                      type="number"
                      min="1"
                      max="50"
                      value={settings.popunderDailyMax}
                      onChange={(e) => setSettings({ ...settings, popunderDailyMax: Math.max(1, parseInt(e.target.value) || 1) })}
                      className="w-full bg-[#222] border border-white/10 rounded-lg p-2 text-xs text-white font-mono focus:border-[#C5A059] outline-none"
                    />
                  </div>
                </div>
                <p className="text-[10px] text-white/40">Hard caps preventing user annoyance.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: Social Bar Configuration */}
      {activeTab === 'socialbar' && (
        <div className="space-y-6">
          <div className="p-5 sm:p-6 bg-[#181818] border border-white/10 rounded-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-white/5">
              <div>
                <h3 className="font-serif text-lg font-bold text-white flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 text-[#C5A059]" />
                  <span>Adsterra Social Bar Engine</span>
                </h3>
                <p className="text-xs text-white/60 font-light mt-0.5">
                  High-converting, non-intrusive floating social bar. Respects mobile safe areas and navigation controls.
                </p>
              </div>

              <div className="flex items-center space-x-3">
                <span className="text-xs font-mono text-white/70">Master Social Bar Switch:</span>
                <input
                  type="checkbox"
                  checked={settings.socialBarEnabled}
                  onChange={() => handleToggle('socialBarEnabled')}
                  className="w-5 h-5 accent-[#C5A059] cursor-pointer"
                />
              </div>
            </div>

            {/* Device-Specific Social Bar Toggles */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <label className="p-3.5 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between cursor-pointer">
                <span className="text-xs text-white">Desktop Social Bar</span>
                <input
                  type="checkbox"
                  checked={settings.socialBarDesktop}
                  onChange={() => handleToggle('socialBarDesktop')}
                  className="w-4 h-4 accent-[#C5A059]"
                />
              </label>

              <label className="p-3.5 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between cursor-pointer">
                <span className="text-xs text-white">Tablet Social Bar</span>
                <input
                  type="checkbox"
                  checked={settings.socialBarTablet}
                  onChange={() => handleToggle('socialBarTablet')}
                  className="w-4 h-4 accent-[#C5A059]"
                />
              </label>

              <label className="p-3.5 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between cursor-pointer">
                <span className="text-xs text-white">Mobile Social Bar (Default: ON)</span>
                <input
                  type="checkbox"
                  checked={settings.socialBarMobile}
                  onChange={() => handleToggle('socialBarMobile')}
                  className="w-4 h-4 accent-[#C5A059]"
                />
              </label>
            </div>

            {/* Position & Frequency */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-2">
                <label className="text-xs font-mono uppercase tracking-wider text-[#C5A059] block font-semibold">
                  Display Position
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setSettings({ ...settings, socialBarPosition: 'bottom' })}
                    className={`py-2 px-3 rounded-lg text-xs font-mono border transition-all ${
                      settings.socialBarPosition === 'bottom'
                        ? 'bg-[#C5A059]/20 border-[#C5A059] text-[#C5A059] font-bold'
                        : 'bg-[#222] border-white/10 text-white/60'
                    }`}
                  >
                    Bottom (Default)
                  </button>
                  <button
                    type="button"
                    onClick={() => setSettings({ ...settings, socialBarPosition: 'top' })}
                    className={`py-2 px-3 rounded-lg text-xs font-mono border transition-all ${
                      settings.socialBarPosition === 'top'
                        ? 'bg-[#C5A059]/20 border-[#C5A059] text-[#C5A059] font-bold'
                        : 'bg-[#222] border-white/10 text-white/60'
                    }`}
                  >
                    Top Banner
                  </button>
                </div>
                <p className="text-[10px] text-white/40">Bottom position automatically clears mobile navigation bars.</p>
              </div>

              <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-2">
                <label className="text-xs font-mono uppercase tracking-wider text-[#C5A059] block font-semibold">
                  Cooldown Period (Minutes)
                </label>
                <input
                  type="number"
                  min="1"
                  max="720"
                  value={settings.socialBarCooldownMinutes}
                  onChange={(e) => setSettings({ ...settings, socialBarCooldownMinutes: Math.max(1, parseInt(e.target.value) || 1) })}
                  className="w-full bg-[#222] border border-white/10 rounded-lg p-2.5 text-xs text-white font-mono focus:border-[#C5A059] outline-none"
                />
                <p className="text-[10px] text-white/40">Default: 30 minutes between Social Bar impressions.</p>
              </div>

              <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-2">
                <label className="text-xs font-mono uppercase tracking-wider text-[#C5A059] block font-semibold">
                  Impression Limits (Session & Daily)
                </label>
                <div className="flex space-x-2">
                  <div className="w-1/2">
                    <span className="text-[9px] text-white/50 block mb-0.5">Session Max</span>
                    <input
                      type="number"
                      min="1"
                      max="30"
                      value={settings.socialBarSessionMax}
                      onChange={(e) => setSettings({ ...settings, socialBarSessionMax: Math.max(1, parseInt(e.target.value) || 1) })}
                      className="w-full bg-[#222] border border-white/10 rounded-lg p-2 text-xs text-white font-mono focus:border-[#C5A059] outline-none"
                    />
                  </div>
                  <div className="w-1/2">
                    <span className="text-[9px] text-white/50 block mb-0.5">Daily Max</span>
                    <input
                      type="number"
                      min="1"
                      max="100"
                      value={settings.socialBarDailyMax}
                      onChange={(e) => setSettings({ ...settings, socialBarDailyMax: Math.max(1, parseInt(e.target.value) || 1) })}
                      className="w-full bg-[#222] border border-white/10 rounded-lg p-2 text-xs text-white font-mono focus:border-[#C5A059] outline-none"
                    />
                  </div>
                </div>
                <p className="text-[10px] text-white/40">Ensures balanced monetization without overwhelming visitors.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: Page Targeting Policy */}
      {activeTab === 'targeting' && (
        <div className="space-y-6">
          <div className="p-5 sm:p-6 bg-[#181818] border border-white/10 rounded-2xl space-y-4">
            <h3 className="font-serif text-lg font-bold text-white flex items-center space-x-2">
              <Globe className="w-4 h-4 text-[#C5A059]" />
              <span>Route & Page-Level Ad Targeting Policy</span>
            </h3>
            <p className="text-xs text-white/60 font-light">
              Select which pages are allowed to run advertising. Blocked pages (admin, login, checkout, active cooking tools) are protected by default.
            </p>

            <div className="overflow-x-auto pt-2">
              <table className="w-full text-left border-collapse text-xs font-mono">
                <thead>
                  <tr className="border-b border-white/10 text-[#C5A059] text-[10px] uppercase tracking-wider">
                    <th className="py-2.5 px-3">Route / Section</th>
                    <th className="py-2.5 px-3">Classification</th>
                    <th className="py-2.5 px-3 text-center">Ads Allowed</th>
                    <th className="py-2.5 px-3 text-right">Policy Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {ALL_ROUTES.map((route) => {
                    const isAllowed = settings.allowedPages.includes(route.id) && !settings.blockedPages.includes(route.id);
                    return (
                      <tr key={route.id} className="hover:bg-white/5 transition-colors">
                        <td className="py-3 px-3">
                          <span className="font-medium text-white block">{route.label}</span>
                          <span className="text-[10px] text-white/40">/{route.id}</span>
                        </td>
                        <td className="py-3 px-3">
                          <span
                            className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${
                              route.type === 'public'
                                ? 'bg-emerald-950/40 text-emerald-300 border border-emerald-500/30'
                                : route.type === 'saas'
                                ? 'bg-purple-950/40 text-purple-300 border border-purple-500/30'
                                : 'bg-rose-950/40 text-rose-300 border border-rose-500/30'
                            }`}
                          >
                            {route.type}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-center">
                          <input
                            type="checkbox"
                            checked={isAllowed}
                            onChange={(e) => {
                              const checked = e.target.checked;
                              if (checked) {
                                const newAllowed = Array.from(new Set([...settings.allowedPages, route.id]));
                                const newBlocked = settings.blockedPages.filter((p) => p !== route.id);
                                setSettings({ ...settings, allowedPages: newAllowed, blockedPages: newBlocked });
                              } else {
                                const newAllowed = settings.allowedPages.filter((p) => p !== route.id);
                                const newBlocked = Array.from(new Set([...settings.blockedPages, route.id]));
                                setSettings({ ...settings, allowedPages: newAllowed, blockedPages: newBlocked });
                              }
                            }}
                            className="w-4 h-4 accent-[#C5A059] cursor-pointer"
                          />
                        </td>
                        <td className="py-3 px-3 text-right">
                          <span
                            className={`text-[10px] font-bold ${
                              isAllowed ? 'text-emerald-400' : 'text-white/40'
                            }`}
                          >
                            {isAllowed ? 'MONETIZED' : 'PROTECTED'}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: Adsterra Real Scripts Management */}
      {activeTab === 'scripts' && (
        <div className="space-y-6">
          <div className="p-5 sm:p-6 bg-[#181818] border border-white/10 rounded-2xl space-y-6">
            <h3 className="font-serif text-lg font-bold text-white flex items-center space-x-2">
              <Code className="w-4 h-4 text-[#C5A059]" />
              <span>Real Adsterra Publisher Script Configuration</span>
            </h3>
            <p className="text-xs text-white/60 font-light">
              Paste your real publisher script tags or script URLs directly from the <span className="text-[#C5A059]">Adsterra Publisher Dashboard</span>. The application dynamically parses and loads them according to your active frequency and device rules.
            </p>

            <div className="space-y-5 pt-2">
              {/* Popunder Script */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-mono uppercase tracking-wider text-[#C5A059] font-bold flex items-center space-x-1.5">
                    <Layers className="w-3.5 h-3.5" />
                    <span>Adsterra Popunder Script Code / URL</span>
                  </label>
                  <span className="text-[10px] font-mono text-white/40">Accepts &lt;script&gt; tag or direct https:// URL</span>
                </div>
                <textarea
                  rows={3}
                  value={settings.popunderScript}
                  onChange={(e) => setSettings({ ...settings, popunderScript: e.target.value })}
                  placeholder="<script type='text/javascript' src='//pl31110471.profitableratecpmnetwork.com/...'></script>"
                  className="w-full bg-[#121212] border border-white/15 rounded-xl p-3 text-xs text-white/90 font-mono focus:border-[#C5A059] outline-none"
                />
              </div>

              {/* Social Bar Script */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-mono uppercase tracking-wider text-[#C5A059] font-bold flex items-center space-x-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Adsterra Social Bar Script Code / URL</span>
                  </label>
                  <span className="text-[10px] font-mono text-white/40">Accepts &lt;script&gt; tag or direct https:// URL</span>
                </div>
                <textarea
                  rows={3}
                  value={settings.socialBarScript}
                  onChange={(e) => setSettings({ ...settings, socialBarScript: e.target.value })}
                  placeholder="<script type='text/javascript' src='//pl31110474.profitableratecpmnetwork.com/...'></script>"
                  className="w-full bg-[#121212] border border-white/15 rounded-xl p-3 text-xs text-white/90 font-mono focus:border-[#C5A059] outline-none"
                />
              </div>

              {/* Native Banner Script */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-mono uppercase tracking-wider text-[#C5A059] font-bold flex items-center space-x-1.5">
                    <LayoutTemplate className="w-3.5 h-3.5" />
                    <span>Adsterra Native Banner Script / Container Code</span>
                  </label>
                  <span className="text-[10px] font-mono text-white/40">Accepts invoke.js or container tag</span>
                </div>
                <textarea
                  rows={2}
                  value={settings.nativeBannerScript}
                  onChange={(e) => setSettings({ ...settings, nativeBannerScript: e.target.value })}
                  placeholder="//pl31110473.profitableratecpmnetwork.com/86cd85dd6ae704626519d957431acfc8/invoke.js"
                  className="w-full bg-[#121212] border border-white/15 rounded-xl p-3 text-xs text-white/90 font-mono focus:border-[#C5A059] outline-none"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: Live Device Preview */}
      {activeTab === 'preview' && (
        <div className="space-y-6">
          <div className="p-5 sm:p-6 bg-[#181818] border border-white/10 rounded-2xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="font-serif text-lg font-bold text-white flex items-center space-x-2">
                  <Eye className="w-4 h-4 text-[#C5A059]" />
                  <span>Responsive Live Ad Preview Simulator</span>
                </h3>
                <p className="text-xs text-white/60 font-light mt-0.5">
                  Inspect the physical layout, safe margins, and non-intrusive positioning across device form factors.
                </p>
              </div>

              {/* Device switcher */}
              <div className="flex items-center space-x-2 p-1 bg-black/60 border border-white/10 rounded-xl">
                <button
                  onClick={() => setPreviewDevice('desktop')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono flex items-center space-x-1.5 transition-all ${
                    previewDevice === 'desktop' ? 'bg-[#C5A059] text-black font-bold' : 'text-white/60 hover:text-white'
                  }`}
                >
                  <Monitor className="w-3.5 h-3.5" />
                  <span>Desktop</span>
                </button>
                <button
                  onClick={() => setPreviewDevice('tablet')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono flex items-center space-x-1.5 transition-all ${
                    previewDevice === 'tablet' ? 'bg-[#C5A059] text-black font-bold' : 'text-white/60 hover:text-white'
                  }`}
                >
                  <Tablet className="w-3.5 h-3.5" />
                  <span>Tablet</span>
                </button>
                <button
                  onClick={() => setPreviewDevice('mobile')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono flex items-center space-x-1.5 transition-all ${
                    previewDevice === 'mobile' ? 'bg-[#C5A059] text-black font-bold' : 'text-white/60 hover:text-white'
                  }`}
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>Mobile</span>
                </button>
              </div>
            </div>

            {/* Device Frame */}
            <div className="flex justify-center pt-4">
              <div
                className={`transition-all duration-300 bg-[#121212] border-2 border-white/20 rounded-3xl p-4 shadow-2xl relative overflow-hidden ${
                  previewDevice === 'mobile'
                    ? 'w-[360px] min-h-[580px]'
                    : previewDevice === 'tablet'
                    ? 'w-[680px] min-h-[500px]'
                    : 'w-full min-h-[450px]'
                }`}
              >
                {/* Mock Website Frame UI */}
                <div className="h-6 bg-[#1a1a1a] rounded-t-xl mb-3 flex items-center px-3 space-x-1.5">
                  <div className="w-2 h-2 rounded-full bg-rose-500/70"></div>
                  <div className="w-2 h-2 rounded-full bg-amber-500/70"></div>
                  <div className="w-2 h-2 rounded-full bg-emerald-500/70"></div>
                  <span className="text-[9px] font-mono text-white/30 ml-2">https://stassens-ingredients.com</span>
                </div>

                {/* Mock page content */}
                <div className="space-y-4 p-3 bg-[#161616] rounded-xl border border-white/5">
                  <div className="h-4 bg-white/10 rounded w-1/3"></div>
                  <div className="h-20 bg-white/5 rounded-xl border border-white/5 p-3 flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-lg bg-[#C5A059]/20"></div>
                    <div className="space-y-2 flex-1">
                      <div className="h-3 bg-white/10 rounded w-2/3"></div>
                      <div className="h-2 bg-white/5 rounded w-1/2"></div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="h-16 bg-white/5 rounded-lg"></div>
                    <div className="h-16 bg-white/5 rounded-lg"></div>
                  </div>
                </div>

                {/* Simulated Social Bar Placement */}
                {settings.socialBarEnabled && (
                  <div
                    className={`mt-6 p-3 bg-[#1e1e1e] border border-[#C5A059]/50 rounded-xl shadow-lg flex items-center justify-between ${
                      settings.socialBarPosition === 'top' ? 'order-first mb-4' : ''
                    }`}
                  >
                    <div className="flex items-center space-x-2.5">
                      <div className="w-7 h-7 rounded-lg bg-[#C5A059]/20 text-[#C5A059] flex items-center justify-center shrink-0">
                        <Sparkles className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-wider text-[#C5A059] font-bold block">
                          Social Bar Active ({settings.socialBarPosition})
                        </span>
                        <span className="text-[11px] text-white font-medium">Michelin Masterclass Residency</span>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 bg-[#C5A059] text-black text-[9px] font-mono font-bold rounded">
                      EXPLORE
                    </span>
                  </div>
                )}

                {/* Popunder notice */}
                <div className="mt-4 p-2.5 bg-black/40 border border-white/5 rounded-lg text-center">
                  <span className="text-[10px] font-mono text-white/50">
                    ℹ️ Popunder operates in the background on legitimate user click gestures per Adsterra network protocols.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 7: Diagnostic Rules Evaluator */}
      {activeTab === 'diagnostics' && (
        <div className="space-y-6">
          <div className="p-5 sm:p-6 bg-[#181818] border border-white/10 rounded-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/5">
              <div>
                <h3 className="font-serif text-lg font-bold text-white flex items-center space-x-2">
                  <HelpCircle className="w-4 h-4 text-[#C5A059]" />
                  <span>Real-time Rule & Frequency Diagnostic Engine</span>
                </h3>
                <p className="text-xs text-white/60 font-light mt-0.5">
                  Test the exact decision pipeline for any given page and device before deploying live.
                </p>
              </div>

              <button
                onClick={() => {
                  AdManager.clearFrequencyState();
                  alert('Local browser frequency counters and cooldown timers have been reset.');
                }}
                className="py-2 px-3 rounded-xl bg-[#222] hover:bg-[#2a2a2a] text-white/80 hover:text-white border border-white/10 text-xs font-mono flex items-center space-x-1.5 transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reset My Frequency Cooldowns</span>
              </button>
            </div>

            {/* Test Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-mono uppercase tracking-wider text-[#C5A059] block font-semibold mb-1.5">
                  Select Test Route / View
                </label>
                <select
                  value={diagnosticRoute}
                  onChange={(e) => setDiagnosticRoute(e.target.value)}
                  className="w-full bg-[#222] border border-white/10 rounded-lg p-2.5 text-xs text-white font-mono focus:border-[#C5A059] outline-none"
                >
                  {ALL_ROUTES.map((r) => (
                    <option key={r.id} value={r.id}>
                      /{r.id} — {r.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-mono uppercase tracking-wider text-[#C5A059] block font-semibold mb-1.5">
                  Current Hardware Viewport Detected
                </label>
                <div className="p-2.5 bg-black/40 border border-white/10 rounded-lg text-xs font-mono text-white flex items-center justify-between">
                  <span>Device Category: <strong className="text-[#C5A059] uppercase">{AdManager.getDeviceCategory()}</strong></span>
                  <span className="text-white/40">Window Width: {typeof window !== 'undefined' ? window.innerWidth : 1200}px</span>
                </div>
              </div>
            </div>

            {/* Live Evaluation Results */}
            {(() => {
              const popunderCheck = AdManager.canShowPopunder(diagnosticRoute);
              const socialBarCheck = AdManager.canShowSocialBar(diagnosticRoute);
              const freqState = AdManager.getFrequencyState();

              return (
                <div className="space-y-4 pt-2">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className={`p-4 rounded-xl border ${popunderCheck.allowed ? 'bg-emerald-950/20 border-emerald-500/40' : 'bg-rose-950/20 border-rose-500/40'}`}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-mono font-bold uppercase tracking-wider text-white">POPUNDER / INTERSTITIAL</span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${popunderCheck.allowed ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'}`}>
                          {popunderCheck.allowed ? 'ALLOWED TO FIRE' : 'BLOCKED'}
                        </span>
                      </div>
                      <p className="text-xs text-white/70 font-light">
                        {popunderCheck.allowed ? 'All rules passed: Master, page, device, and cooldown filters satisfied.' : popunderCheck.reason}
                      </p>
                    </div>

                    <div className={`p-4 rounded-xl border ${socialBarCheck.allowed ? 'bg-emerald-950/20 border-emerald-500/40' : 'bg-rose-950/20 border-rose-500/40'}`}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-mono font-bold uppercase tracking-wider text-white">SOCIAL BAR ELIGIBILITY</span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${socialBarCheck.allowed ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'}`}>
                          {socialBarCheck.allowed ? 'ALLOWED TO FIRE' : 'BLOCKED'}
                        </span>
                      </div>
                      <p className="text-xs text-white/70 font-light">
                        {socialBarCheck.allowed ? 'All rules passed: Master, page, device, and cooldown filters satisfied.' : socialBarCheck.reason}
                      </p>
                    </div>
                  </div>

                  {/* Manual Test Trigger Button */}
                  <div className="p-4 rounded-xl bg-black/40 border border-[#C5A059]/30 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <div>
                      <span className="text-xs font-mono font-bold text-[#C5A059] block">Test 5-Second In-Website Modal</span>
                      <p className="text-[11px] text-white/60 font-light">Pops up on the screen for 5 seconds with countdown timer and close button without redirecting away.</p>
                    </div>
                    <button
                      onClick={() => {
                        AdManager.triggerPopunder(diagnosticRoute);
                      }}
                      className="px-4 py-2 bg-[#C5A059] hover:bg-[#d6b168] text-black text-xs font-mono font-bold uppercase tracking-wider rounded-lg transition-all shrink-0 active:scale-95"
                    >
                      Launch Preview Modal
                    </button>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}

      {/* TAB 8: Analytics Pipeline */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          <div className="p-5 sm:p-6 bg-[#181818] border border-white/10 rounded-2xl space-y-6">
            <h3 className="font-serif text-lg font-bold text-white flex items-center space-x-2">
              <BarChart3 className="w-4 h-4 text-[#C5A059]" />
              <span>Adsterra Analytics & Monetization Telemetry</span>
            </h3>

            {/* Connection notice */}
            <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-500/30 text-amber-300 text-xs font-mono space-y-1">
              <div className="font-bold flex items-center space-x-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                <span>Adsterra analytics connection not configured.</span>
              </div>
              <p className="text-[11px] text-amber-300/70 font-light">
                To sync automated remote impressions and CPM earnings directly from Adsterra, configure your secret publisher API key in the server environment variables.
              </p>
            </div>

            {/* Local Real Frequency Telemetry (No fake revenue) */}
            {(() => {
              const freq = AdManager.getFrequencyState();
              return (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                  <div className="p-4 rounded-xl bg-black/40 border border-white/5">
                    <span className="text-[10px] font-mono uppercase text-white/50 block">Session Popunders</span>
                    <span className="text-xl font-bold font-mono text-[#C5A059]">{freq.sessionPopunderCount}</span>
                  </div>
                  <div className="p-4 rounded-xl bg-black/40 border border-white/5">
                    <span className="text-[10px] font-mono uppercase text-white/50 block">Session Social Bars</span>
                    <span className="text-xl font-bold font-mono text-[#C5A059]">{freq.sessionSocialBarCount}</span>
                  </div>
                  <div className="p-4 rounded-xl bg-black/40 border border-white/5">
                    <span className="text-[10px] font-mono uppercase text-white/50 block">Daily Popunder Impressions</span>
                    <span className="text-xl font-bold font-mono text-white">{freq.dailyPopunderCount}</span>
                  </div>
                  <div className="p-4 rounded-xl bg-black/40 border border-white/5">
                    <span className="text-[10px] font-mono uppercase text-white/50 block">Daily Social Bar Impressions</span>
                    <span className="text-xl font-bold font-mono text-white">{freq.dailySocialBarCount}</span>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
};
