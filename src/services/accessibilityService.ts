// Accessibility State & Voice Narration Service
export type TextScale = 'normal' | 'large' | 'xlarge';

export interface AccessibilitySettings {
  textScale: TextScale;
  highContrast: boolean;
  dyslexicFont: boolean;
  reducedMotion: boolean;
  soundEnabled: boolean;
  screenReaderActive: boolean;
}

const STORAGE_KEY = 'stassens_accessibility_settings_v1';

const DEFAULT_SETTINGS: AccessibilitySettings = {
  textScale: 'normal',
  highContrast: false,
  dyslexicFont: false,
  reducedMotion: false,
  soundEnabled: true,
  screenReaderActive: false
};

class AccessibilityService {
  private settings: AccessibilitySettings;
  private listeners: Set<(settings: AccessibilitySettings) => void> = new Set();
  private speechSynth: SpeechSynthesis | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;

  constructor() {
    this.settings = this.loadSettings();
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.speechSynth = window.speechSynthesis;
    }
    this.applyToDOM();
  }

  private loadSettings(): AccessibilitySettings {
    if (typeof window === 'undefined') return DEFAULT_SETTINGS;
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return { ...DEFAULT_SETTINGS, ...JSON.parse(saved) };
      }
    } catch (e) {
      console.warn('Error reading accessibility settings', e);
    }
    return DEFAULT_SETTINGS;
  }

  private saveSettings(): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.settings));
    } catch (e) {
      console.warn('Error persisting accessibility settings', e);
    }
  }

  public getSettings(): AccessibilitySettings {
    return { ...this.settings };
  }

  public updateSettings(partial: Partial<AccessibilitySettings>): AccessibilitySettings {
    this.settings = { ...this.settings, ...partial };
    this.saveSettings();
    this.applyToDOM();
    this.notify();
    return this.getSettings();
  }

  public toggleHighContrast(): boolean {
    const val = !this.settings.highContrast;
    this.updateSettings({ highContrast: val });
    if (val) {
      this.speakText('High contrast mode activated');
    } else {
      this.speakText('Standard contrast mode');
    }
    return val;
  }

  public cycleTextScale(): TextScale {
    const current = this.settings.textScale;
    let next: TextScale = 'normal';
    if (current === 'normal') next = 'large';
    else if (current === 'large') next = 'xlarge';
    else next = 'normal';

    this.updateSettings({ textScale: next });
    this.speakText(`Text size set to ${next}`);
    return next;
  }

  public toggleDyslexicFont(): boolean {
    const val = !this.settings.dyslexicFont;
    this.updateSettings({ dyslexicFont: val });
    this.speakText(val ? 'Legible typography enabled' : 'Editorial typography enabled');
    return val;
  }

  public toggleReducedMotion(): boolean {
    const val = !this.settings.reducedMotion;
    this.updateSettings({ reducedMotion: val });
    this.speakText(val ? 'Reduced motion enabled' : 'Full motion enabled');
    return val;
  }

  public toggleVoiceNarration(): boolean {
    const val = !this.settings.screenReaderActive;
    this.updateSettings({ screenReaderActive: val });
    if (val) {
      this.speakText('Voice assistant narration enabled. Tap any card or title to hear narration.');
    } else {
      this.stopSpeech();
    }
    return val;
  }

  public speakText(text: string): void {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      utterance.lang = 'en-US';
      this.currentUtterance = utterance;
      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.warn('Speech synthesis unavailable', e);
    }
  }

  public stopSpeech(): void {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }

  private applyToDOM(): void {
    if (typeof document === 'undefined') return;
    const root = document.documentElement;

    // Apply high contrast
    if (this.settings.highContrast) {
      root.classList.add('high-contrast-mode');
    } else {
      root.classList.remove('high-contrast-mode');
    }

    // Apply text scale
    root.classList.remove('text-scale-large', 'text-scale-xlarge');
    if (this.settings.textScale === 'large') {
      root.classList.add('text-scale-large');
    } else if (this.settings.textScale === 'xlarge') {
      root.classList.add('text-scale-xlarge');
    }

    // Dyslexic font
    if (this.settings.dyslexicFont) {
      root.classList.add('font-dyslexic-mode');
    } else {
      root.classList.remove('font-dyslexic-mode');
    }

    // Reduced motion
    if (this.settings.reducedMotion) {
      root.classList.add('reduce-motion-mode');
    } else {
      root.classList.remove('reduce-motion-mode');
    }
  }

  public subscribe(listener: (settings: AccessibilitySettings) => void): () => void {
    this.listeners.add(listener);
    listener(this.getSettings());
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify(): void {
    const current = this.getSettings();
    this.listeners.forEach((l) => l(current));
  }
}

export const accessibilityService = new AccessibilityService();
