import { AdSettings, AdFrequencyState, DeviceCategory, AdFrequencyMode, CooldownUnit, SocialBarPosition } from '../types';
import { db } from './firebase';
import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';

const SETTINGS_STORAGE_KEY = 'adsterra_smart_ads_settings_v1';
const FREQ_STORAGE_KEY = 'adsterra_smart_ads_frequency_v1';
const FIRESTORE_DOC_ID = 'global';

export const DEFAULT_AD_SETTINGS: AdSettings = {
  // Master Switches
  enabled: true,
  emergencyDisabled: false,
  testMode: false,

  // Format Switches
  popunderEnabled: true,
  socialBarEnabled: true,
  nativeBannerEnabled: true,

  // Device Targeting
  desktopEnabled: true,
  tabletEnabled: true,
  mobileEnabled: true,

  // Popunder Device Rules (Conservative default: Popunder OFF on mobile initially)
  popunderDesktop: true,
  popunderTablet: true,
  popunderMobile: false,

  // Social Bar Device Rules (Social Bar ON across devices)
  socialBarDesktop: true,
  socialBarTablet: true,
  socialBarMobile: true,

  // Popunder Frequency Defaults (1 per 60 minutes, session max 2, daily max 5)
  popunderFrequencyMode: 'once_per_x_minutes',
  popunderCooldownValue: 60,
  popunderCooldownUnit: 'minutes',
  popunderSessionMax: 2,
  popunderDailyMax: 5,

  // Social Bar Frequency Defaults (1 per 30 minutes, session max 3, daily max 8)
  socialBarPosition: 'bottom',
  socialBarFrequencyMode: 'once_per_x_minutes',
  socialBarCooldownMinutes: 30,
  socialBarSessionMax: 3,
  socialBarDailyMax: 8,

  // Page Targeting: Public pages ON, Dashboard/Admin/Auth OFF
  publicPagesEnabled: true,
  dashboardPagesEnabled: false,
  allowedPages: [
    'home',
    'collection',
    'ingredient-detail',
    'locations',
    'recipes-archive',
    'seasonal-calendar',
    'shopping-list',
    'search-results',
    'about',
    'contact',
    'privacy'
  ],
  blockedPages: [
    'admin',
    'admin-ads',
    'app',
    'dashboard',
    'settings',
    'billing',
    'auth',
    'checkout',
    'my-pantry',
    'cook-modal'
  ],

  // Real Adsterra Publisher Code Configuration Fields
  popunderScript: 'https://pl31110471.profitableratecpmnetwork.com/7d/46/8e/7d468e21cc1f5c305e280080c5ea4fe0.js',
  socialBarScript: 'https://pl31110474.profitableratecpmnetwork.com/8a/6b/71/8a6b7143334202e20dea4259df7595da.js',
  nativeBannerScript: 'https://pl31110473.profitableratecpmnetwork.com/86cd85dd6ae704626519d957431acfc8/invoke.js',

  popunderDirectUrl: 'https://pl31110471.profitableratecpmnetwork.com/7d/46/8e/7d468e21cc1f5c305e280080c5ea4fe0.js',
  socialBarDirectUrl: 'https://pl31110474.profitableratecpmnetwork.com/8a/6b/71/8a6b7143334202e20dea4259df7595da.js',

  lastUpdated: new Date().toISOString()
};

export interface InterstitialAdData {
  id: string;
  sponsorName: string;
  badge: string;
  title: string;
  headline: string;
  description: string;
  offerText: string;
  ctaText: string;
  smartlinkUrl: string;
  imageUrl: string;
  accentColor?: string;
  onCloseCallback?: () => void;
}

export const SPONSOR_ADS_CATALOG: InterstitialAdData[] = [
  {
    id: 'ad-home-pass',
    sponsorName: 'Haute Terroirs Syndicate',
    badge: '★ VIP Welcome Access',
    title: 'Global Gastronomy Grand Pass 2026',
    headline: 'Unlock Direct Cellar & Forager Access',
    description: 'Gain priority allocations of 3-Star Michelin seasonal truffles, Japanese A5 Kagoshima Wagyu, and rare solera-aged vinegars with guaranteed temperature-controlled express transit.',
    offerText: 'Complimentary First-Allocation Terroir Tasting Kit with enrollment',
    ctaText: 'Claim VIP Epicurean Pass',
    smartlinkUrl: 'https://pl31110471.profitableratecpmnetwork.com/7d/46/8e/7d468e21cc1f5c305e280080c5ea4fe0.js',
    imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1000&auto=format&fit=crop',
    accentColor: '#C5A059'
  },
  {
    id: 'ad-recipes-knives',
    sponsorName: 'Sakai Damascus Guild',
    badge: '★ Master Atelier Selection',
    title: 'Hand-Forged 100-Layer Damascus Master Blades',
    headline: 'Precision Cutlery for Haute Gastronomy',
    description: 'Forged in Sakai, Japan with high-carbon VG-10 core steel. Engineered for micron-thin truffles, sashimi kobujime slicing, and effortless fine culinary prep.',
    offerText: 'Includes custom walnut saya sheath & whetstone kit',
    ctaText: 'Explore Master Knife Atelier',
    smartlinkUrl: 'https://pl31110474.profitableratecpmnetwork.com/8a/6b/71/8a6b7143334202e20dea4259df7595da.js',
    imageUrl: 'https://images.unsplash.com/photo-1593618998160-e34014e67546?q=80&w=1000&auto=format&fit=crop',
    accentColor: '#E6A15C'
  },
  {
    id: 'ad-collection-truffle',
    sponsorName: 'Alba Tartufi Heritage',
    badge: '★ Direct Forest Forager',
    title: 'Piedmont White Alba Truffle Private Reserve',
    headline: 'Certified Fresh Italian Winter Harvest',
    description: 'Direct shipment within 36 hours of excavation from the Langhe hills. Certified ISO-authenticated Tuber Magnatum Pico with full terroir origin traceability.',
    offerText: 'Direct truffle hunting dispatch & wooden storage box',
    ctaText: 'Access Alba Truffle Harvest',
    smartlinkUrl: 'https://pl31110471.profitableratecpmnetwork.com/7d/46/8e/7d468e21cc1f5c305e280080c5ea4fe0.js',
    imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1000&auto=format&fit=crop',
    accentColor: '#D4AF37'
  },
  {
    id: 'ad-locations-residency',
    sponsorName: 'Terroir Expeditions Ltd',
    badge: '★ Culinary Travel Guild',
    title: 'Kyoto & Modena Masterclass Culinary Residency',
    headline: 'Immersion in Ancient Gastronomic Capitals',
    description: 'Join master chefs for a 7-day culinary expedition through Nagano pine forests, Kyoto Kaiseki teahouses, and Modena 100-year balsamic acetaie cellars.',
    offerText: 'Limited to 12 guest artisans per seasonal expedition',
    ctaText: 'Reserve Residency Portfolio',
    smartlinkUrl: 'https://pl31110474.profitableratecpmnetwork.com/8a/6b/71/8a6b7143334202e20dea4259df7595da.js',
    imageUrl: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=1000&auto=format&fit=crop',
    accentColor: '#C5A059'
  },
  {
    id: 'ad-calendar-solstice',
    sponsorName: 'Solstice Botanical Guild',
    badge: '★ Seasonal Harvest Vault',
    title: 'First-Cold Extraction Greek & Iberian Harvest',
    headline: 'Single-Estate Early Crop EVOO & Saffron Guild',
    description: 'Secure your share of ultra-high polyphenol (800+ mg/kg) Kalamata and Andalusian olive oils, pressed within 4 hours of picking during October harvest.',
    offerText: 'Delivered in UV-protected obsidian glass amphoras',
    ctaText: 'Join Seasonal Harvest Club',
    smartlinkUrl: 'https://pl31110471.profitableratecpmnetwork.com/7d/46/8e/7d468e21cc1f5c305e280080c5ea4fe0.js',
    imageUrl: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?q=80&w=1000&auto=format&fit=crop',
    accentColor: '#84CC16'
  },
  {
    id: 'ad-pantry-cellar',
    sponsorName: 'Sommelier Vault Systems',
    badge: '★ Grand Cru Cellar Tech',
    title: 'Smart Precision Cellar & Terroir Locker',
    headline: 'Preserve Fragile Volatiles & Vintage Vintages',
    description: 'Precision temperature, ultrasonic humidity, and nitrogen preservation systems designed for high-value botanical ingredients and rare Grand Cru wines.',
    offerText: 'Complimentary Sommelier AI Cellar Audit included',
    ctaText: 'Upgrade Cellar Storage',
    smartlinkUrl: 'https://pl31110474.profitableratecpmnetwork.com/8a/6b/71/8a6b7143334202e20dea4259df7595da.js',
    imageUrl: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=1000&auto=format&fit=crop',
    accentColor: '#A855F7'
  }
];

class AdManagerService {
  private settings: AdSettings = { ...DEFAULT_AD_SETTINGS };
  private listeners: Set<(settings: AdSettings) => void> = new Set();
  private interstitialListeners: Set<(ad: InterstitialAdData | null) => void> = new Set();
  private activeInterstitial: InterstitialAdData | null = null;
  private isPopunderExecuting = false;
  private hasInitializedFirestore = false;

  constructor() {
    this.loadInitialSettings();
    this.initFirestoreSync();
  }

  private loadInitialSettings() {
    if (typeof window === 'undefined') return;
    try {
      const cached = localStorage.getItem(SETTINGS_STORAGE_KEY);
      if (cached) {
        const parsed = JSON.parse(cached);
        this.settings = { ...DEFAULT_AD_SETTINGS, ...parsed };
      }
    } catch (e) {
      console.warn('AdManager initial cache read note:', e);
    }
  }

  private initFirestoreSync() {
    if (typeof window === 'undefined') return;
    try {
      const docRef = doc(db, 'adSettings', FIRESTORE_DOC_ID);
      onSnapshot(
        docRef,
        (snapshot) => {
          if (snapshot.exists()) {
            const remoteData = snapshot.data() as AdSettings;
            this.settings = { ...DEFAULT_AD_SETTINGS, ...remoteData };
            localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(this.settings));
            this.notifyListeners();
          } else {
            // First time bootstrapping remote doc
            this.saveSettingsToFirestore(this.settings).catch(() => {});
          }
          this.hasInitializedFirestore = true;
        },
        (error) => {
          // Gracefully continue with local storage if offline or during rule evaluation
          this.hasInitializedFirestore = true;
        }
      );
    } catch (err) {
      // Offline fallback
    }
  }

  private notifyListeners() {
    this.listeners.forEach((listener) => listener(this.settings));
  }

  public subscribe(callback: (settings: AdSettings) => void): () => void {
    this.listeners.add(callback);
    callback(this.settings);
    return () => {
      this.listeners.delete(callback);
    };
  }

  public getSettings(): AdSettings {
    return { ...this.settings };
  }

  public async updateSettings(newSettings: Partial<AdSettings>, userEmail?: string): Promise<boolean> {
    const updated: AdSettings = {
      ...this.settings,
      ...newSettings,
      lastUpdated: new Date().toISOString(),
      updatedBy: userEmail || this.settings.updatedBy || 'admin'
    };

    this.settings = updated;
    localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(updated));
    this.notifyListeners();

    try {
      await this.saveSettingsToFirestore(updated);
      return true;
    } catch (err) {
      console.warn('Ad settings saved locally; Firestore sync notice:', err);
      return true;
    }
  }

  public async emergencyDisableAll(): Promise<void> {
    await this.updateSettings({
      enabled: false,
      emergencyDisabled: true,
      popunderEnabled: false,
      socialBarEnabled: false
    });
  }

  public async resetToDefaults(): Promise<void> {
    const reset = { ...DEFAULT_AD_SETTINGS, lastUpdated: new Date().toISOString() };
    this.settings = reset;
    localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(reset));
    this.notifyListeners();
    try {
      await this.saveSettingsToFirestore(reset);
    } catch (e) {}
  }

  private async saveSettingsToFirestore(settingsToSave: AdSettings) {
    const docRef = doc(db, 'adSettings', FIRESTORE_DOC_ID);
    await setDoc(docRef, settingsToSave, { merge: true });
  }

  // Detect Device Category reliably using viewport widths
  public getDeviceCategory(): DeviceCategory {
    if (typeof window === 'undefined') return 'desktop';
    const width = window.innerWidth;
    if (width < 768) return 'mobile';
    if (width < 1024) return 'tablet';
    return 'desktop';
  }

  // Helper to extract frequency tracking state
  public getFrequencyState(): AdFrequencyState {
    const today = new Date().toISOString().slice(0, 10);
    const defaultState: AdFrequencyState = {
      lastPopunderTimestamp: 0,
      lastSocialBarTimestamp: 0,
      sessionPopunderCount: 0,
      sessionSocialBarCount: 0,
      dailyPopunderCount: 0,
      dailySocialBarCount: 0,
      lastActiveDay: today
    };

    if (typeof window === 'undefined') return defaultState;

    try {
      const stored = localStorage.getItem(FREQ_STORAGE_KEY);
      let state: AdFrequencyState = stored ? JSON.parse(stored) : defaultState;

      // Reset daily counts if calendar day changed
      if (state.lastActiveDay !== today) {
        state.dailyPopunderCount = 0;
        state.dailySocialBarCount = 0;
        state.lastActiveDay = today;
        localStorage.setItem(FREQ_STORAGE_KEY, JSON.stringify(state));
      }

      // Sync session counts from sessionStorage
      const sessionPop = parseInt(sessionStorage.getItem('ad_session_pop_count') || '0', 10);
      const sessionSoc = parseInt(sessionStorage.getItem('ad_session_soc_count') || '0', 10);
      state.sessionPopunderCount = sessionPop;
      state.sessionSocialBarCount = sessionSoc;

      return state;
    } catch (e) {
      return defaultState;
    }
  }

  public saveFrequencyState(state: AdFrequencyState) {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(FREQ_STORAGE_KEY, JSON.stringify(state));
      sessionStorage.setItem('ad_session_pop_count', String(state.sessionPopunderCount));
      sessionStorage.setItem('ad_session_soc_count', String(state.sessionSocialBarCount));
    } catch (e) {
      console.warn('AdManager frequency state save note:', e);
    }
  }

  public clearFrequencyState() {
    if (typeof window === 'undefined') return;
    try {
      localStorage.removeItem(FREQ_STORAGE_KEY);
      sessionStorage.removeItem('ad_session_pop_count');
      sessionStorage.removeItem('ad_session_soc_count');
    } catch (e) {}
  }

  // Calculate cooldown in milliseconds
  public getCooldownMs(val: number, unit: CooldownUnit): number {
    if (unit === 'days') return val * 24 * 60 * 60 * 1000;
    if (unit === 'hours') return val * 60 * 60 * 1000;
    return val * 60 * 1000; // minutes
  }

  // Evaluate if general ads are enabled
  public isAdsEnabled(): boolean {
    if (this.settings.emergencyDisabled) return false;
    return this.settings.enabled;
  }

  // Check if a specific route allows ads
  public isPageAllowed(routeView: string): boolean {
    if (!this.isAdsEnabled()) return false;
    
    // Explicitly blocked routes
    if (this.settings.blockedPages.includes(routeView)) return false;
    
    // If it's a dashboard/admin/auth page and dashboard ads are disabled
    if (['admin', 'admin-ads', 'app', 'dashboard', 'settings', 'billing', 'auth', 'checkout'].includes(routeView)) {
      return this.settings.dashboardPagesEnabled;
    }

    // Must be in allowedPages list or publicPagesEnabled is true
    return this.settings.allowedPages.includes(routeView) || this.settings.publicPagesEnabled;
  }

  // Comprehensive Rule Check for Popunder
  public canShowPopunder(currentRoute: string): { allowed: boolean; reason?: string } {
    if (!this.isAdsEnabled()) {
      return { allowed: false, reason: 'Ads globally disabled or emergency kill switch active' };
    }
    if (!this.settings.popunderEnabled) {
      return { allowed: false, reason: 'Popunder ad format disabled in settings' };
    }
    if (!this.isPageAllowed(currentRoute)) {
      return { allowed: false, reason: `Page "${currentRoute}" is blocked from displaying ads` };
    }

    const device = this.getDeviceCategory();
    if (device === 'desktop' && (!this.settings.desktopEnabled || !this.settings.popunderDesktop)) {
      return { allowed: false, reason: 'Popunder disabled on desktop devices' };
    }
    if (device === 'tablet' && (!this.settings.tabletEnabled || !this.settings.popunderTablet)) {
      return { allowed: false, reason: 'Popunder disabled on tablet devices' };
    }
    if (device === 'mobile' && (!this.settings.mobileEnabled || !this.settings.popunderMobile)) {
      return { allowed: false, reason: 'Popunder disabled on mobile devices' };
    }

    if (this.settings.testMode) {
      return { allowed: true, reason: 'Test Mode: Frequency limits bypassed for validation' };
    }

    const freq = this.getFrequencyState();

    // Check session max
    if (freq.sessionPopunderCount >= this.settings.popunderSessionMax) {
      return { allowed: false, reason: `Session impression limit reached (${freq.sessionPopunderCount}/${this.settings.popunderSessionMax})` };
    }

    // Check daily max
    if (freq.dailyPopunderCount >= this.settings.popunderDailyMax) {
      return { allowed: false, reason: `Daily impression limit reached (${freq.dailyPopunderCount}/${this.settings.popunderDailyMax})` };
    }

    // Check cooldown
    const cooldownMs = this.getCooldownMs(this.settings.popunderCooldownValue, this.settings.popunderCooldownUnit);
    const elapsed = Date.now() - freq.lastPopunderTimestamp;
    if (freq.lastPopunderTimestamp > 0 && elapsed < cooldownMs) {
      const remainingMin = Math.ceil((cooldownMs - elapsed) / 60000);
      return { allowed: false, reason: `Cooldown active: ${remainingMin}m remaining` };
    }

    return { allowed: true };
  }

  // Comprehensive Rule Check for Social Bar
  public canShowSocialBar(currentRoute: string): { allowed: boolean; reason?: string } {
    if (!this.isAdsEnabled()) {
      return { allowed: false, reason: 'Ads globally disabled or emergency kill switch active' };
    }
    if (!this.settings.socialBarEnabled) {
      return { allowed: false, reason: 'Social Bar ad format disabled in settings' };
    }
    if (!this.isPageAllowed(currentRoute)) {
      return { allowed: false, reason: `Page "${currentRoute}" is blocked from displaying ads` };
    }

    const device = this.getDeviceCategory();
    if (device === 'desktop' && (!this.settings.desktopEnabled || !this.settings.socialBarDesktop)) {
      return { allowed: false, reason: 'Social Bar disabled on desktop devices' };
    }
    if (device === 'tablet' && (!this.settings.tabletEnabled || !this.settings.socialBarTablet)) {
      return { allowed: false, reason: 'Social Bar disabled on tablet devices' };
    }
    if (device === 'mobile' && (!this.settings.mobileEnabled || !this.settings.socialBarMobile)) {
      return { allowed: false, reason: 'Social Bar disabled on mobile devices' };
    }

    if (this.settings.testMode) {
      return { allowed: true, reason: 'Test Mode: Frequency limits bypassed for validation' };
    }

    const freq = this.getFrequencyState();

    // Check session max
    if (freq.sessionSocialBarCount >= this.settings.socialBarSessionMax) {
      return { allowed: false, reason: `Session impression limit reached (${freq.sessionSocialBarCount}/${this.settings.socialBarSessionMax})` };
    }

    // Check daily max
    if (freq.dailySocialBarCount >= this.settings.socialBarDailyMax) {
      return { allowed: false, reason: `Daily impression limit reached (${freq.dailySocialBarCount}/${this.settings.socialBarDailyMax})` };
    }

    // Check cooldown
    const cooldownMs = this.settings.socialBarCooldownMinutes * 60 * 1000;
    const elapsed = Date.now() - freq.lastSocialBarTimestamp;
    if (freq.lastSocialBarTimestamp > 0 && elapsed < cooldownMs) {
      const remainingMin = Math.ceil((cooldownMs - elapsed) / 60000);
      return { allowed: false, reason: `Cooldown active: ${remainingMin}m remaining` };
    }

    return { allowed: true };
  }

  // Record an impression and update frequency state
  public recordPopunderImpression(): void {
    const freq = this.getFrequencyState();
    freq.lastPopunderTimestamp = Date.now();
    freq.sessionPopunderCount += 1;
    freq.dailyPopunderCount += 1;
    this.saveFrequencyState(freq);
  }

  public recordSocialBarImpression(): void {
    const freq = this.getFrequencyState();
    freq.lastSocialBarTimestamp = Date.now();
    freq.sessionSocialBarCount += 1;
    freq.dailySocialBarCount += 1;
    this.saveFrequencyState(freq);
  }

  public onInterstitial(callback: (ad: InterstitialAdData | null) => void): () => void {
    this.interstitialListeners.add(callback);
    callback(this.activeInterstitial);
    return () => {
      this.interstitialListeners.delete(callback);
    };
  }

  public getActiveInterstitial(): InterstitialAdData | null {
    return this.activeInterstitial;
  }

  public closeInterstitial(): void {
    const active = this.activeInterstitial;
    this.activeInterstitial = null;
    this.interstitialListeners.forEach((listener) => listener(null));
    if (active?.onCloseCallback) {
      try {
        active.onCloseCallback();
      } catch (e) {
        console.warn('onCloseCallback error:', e);
      }
    }
  }

  // Safe Popunder / In-Website Interstitial Execution on legitimate user gesture
  public triggerPopunder(
    currentRoute: string,
    customAd?: Partial<InterstitialAdData>,
    onComplete?: () => void
  ): boolean {
    if (this.isPopunderExecuting) {
      if (onComplete) onComplete();
      return false;
    }

    const check = this.canShowPopunder(currentRoute);
    if (!check.allowed) {
      if (onComplete) onComplete();
      return false;
    }

    this.isPopunderExecuting = true;

    try {
      // Pick ad corresponding to route or select next from catalog
      const routeKey = currentRoute || 'home';
      const fallbackAd =
        SPONSOR_ADS_CATALOG.find((ad) => ad.id.includes(routeKey)) ||
        SPONSOR_ADS_CATALOG[Math.floor(Math.random() * SPONSOR_ADS_CATALOG.length)];

      const smartlink =
        this.extractScriptSrc(this.settings.popunderScript) ||
        this.settings.popunderDirectUrl ||
        fallbackAd.smartlinkUrl;

      const adToDisplay: InterstitialAdData = {
        ...fallbackAd,
        ...customAd,
        smartlinkUrl: smartlink,
        onCloseCallback: onComplete
      };

      this.activeInterstitial = adToDisplay;
      this.recordPopunderImpression();
      this.interstitialListeners.forEach((listener) => listener(adToDisplay));

      return true;
    } catch (e) {
      console.warn('In-app interstitial trigger note:', e);
      if (onComplete) onComplete();
      return false;
    } finally {
      setTimeout(() => {
        this.isPopunderExecuting = false;
      }, 500);
    }
  }

  // Safe parser to extract src from pasted script tag or plain url
  public extractScriptSrc(rawInput: string): string | null {
    if (!rawInput || typeof rawInput !== 'string') return null;
    const trimmed = rawInput.trim();
    if (!trimmed) return null;

    // Check if user pasted full <script src="..."> tag
    const srcMatch = trimmed.match(/src=["']([^"']+)["']/i);
    if (srcMatch && srcMatch[1]) {
      return srcMatch[1];
    }

    // Check if it starts with http or //
    if (trimmed.startsWith('http://') || trimmed.startsWith('https://') || trimmed.startsWith('//')) {
      return trimmed;
    }

    return null;
  }
}

export const AdManager = new AdManagerService();
