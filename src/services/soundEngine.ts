/**
 * Sensory Culinary Sound Engine
 * Synthesizes photorealistic kitchen acoustics (sizzle, chop, simmer, drizzle, whisk, flame, plating)
 * and coordinates high-fidelity chef voiceover narration.
 */

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    audioCtx = new AudioContextClass();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export type CulinarySoundType =
  | 'sizzle'
  | 'chop'
  | 'simmer'
  | 'drizzle'
  | 'whisk'
  | 'flame'
  | 'plating'
  | 'bell';

/**
 * Plays high-fidelity procedural culinary acoustics
 */
export function playCulinarySound(type: CulinarySoundType, volume = 0.5): () => void {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(Math.min(1, Math.max(0, volume)), now);
    masterGain.connect(ctx.destination);

    let stopFn = () => {};

    switch (type) {
      case 'sizzle': {
        // Hot cast iron / copper pan sizzle with crackling pops
        const bufferSize = ctx.sampleRate * 2.5;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          // Pink-ish noise with sporadic crackle bursts
          const crackle = Math.random() > 0.98 ? (Math.random() * 2 - 1) * 2.2 : (Math.random() * 2 - 1) * 0.4;
          data[i] = crackle;
        }
        const noise = ctx.createBufferSource();
        noise.buffer = buffer;

        const filter = ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(3200, now);
        filter.Q.setValueAtTime(1.2, now);

        const gainNode = ctx.createGain();
        gainNode.gain.setValueAtTime(0.01, now);
        gainNode.gain.linearRampToValueAtTime(0.45, now + 0.2);
        gainNode.gain.linearRampToValueAtTime(0.35, now + 2.0);
        gainNode.gain.exponentialRampToValueAtTime(0.001, now + 2.5);

        noise.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(masterGain);

        noise.start(now);
        noise.stop(now + 2.5);

        stopFn = () => {
          try {
            noise.stop();
          } catch (_) {}
        };
        break;
      }

      case 'chop': {
        // 3 rhythmic knife strokes against hard maple cutting board
        [0, 0.22, 0.45].forEach((offset, idx) => {
          const chopTime = now + offset;
          // Acoustic board thud
          const osc = ctx.createOscillator();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(180 - idx * 15, chopTime);
          osc.frequency.exponentialRampToValueAtTime(45, chopTime + 0.08);

          const thudGain = ctx.createGain();
          thudGain.gain.setValueAtTime(0.7, chopTime);
          thudGain.gain.exponentialRampToValueAtTime(0.001, chopTime + 0.09);

          osc.connect(thudGain);
          thudGain.connect(masterGain);

          osc.start(chopTime);
          osc.stop(chopTime + 0.1);

          // Blade slice click
          const clickOsc = ctx.createOscillator();
          clickOsc.type = 'highpass' as any;
          const clickNoiseBuffer = ctx.createBuffer(1, Math.floor(ctx.sampleRate * 0.04), ctx.sampleRate);
          const clickData = clickNoiseBuffer.getChannelData(0);
          for (let i = 0; i < clickData.length; i++) {
            clickData[i] = (Math.random() * 2 - 1) * Math.exp(-i / 200);
          }
          const clickSource = ctx.createBufferSource();
          clickSource.buffer = clickNoiseBuffer;
          const clickGain = ctx.createGain();
          clickGain.gain.setValueAtTime(0.4, chopTime);
          clickGain.gain.exponentialRampToValueAtTime(0.001, chopTime + 0.04);
          clickSource.connect(clickGain);
          clickGain.connect(masterGain);
          clickSource.start(chopTime);
        });
        break;
      }

      case 'simmer': {
        // Deep broth bubbling with droplet resonances
        const duration = 3.0;
        for (let i = 0; i < 8; i++) {
          const bubbleTime = now + i * 0.35 + Math.random() * 0.15;
          const osc = ctx.createOscillator();
          osc.type = 'sine';
          const startFreq = 260 + Math.random() * 180;
          osc.frequency.setValueAtTime(startFreq, bubbleTime);
          osc.frequency.exponentialRampToValueAtTime(startFreq * 1.8, bubbleTime + 0.12);

          const gain = ctx.createGain();
          gain.gain.setValueAtTime(0.01, bubbleTime);
          gain.gain.linearRampToValueAtTime(0.28, bubbleTime + 0.03);
          gain.gain.exponentialRampToValueAtTime(0.001, bubbleTime + 0.14);

          osc.connect(gain);
          gain.connect(masterGain);

          osc.start(bubbleTime);
          osc.stop(bubbleTime + 0.15);
        }
        break;
      }

      case 'whisk': {
        // Fast rhythmic whisking swooshes
        [0, 0.18, 0.36, 0.54, 0.72].forEach((offset) => {
          const wTime = now + offset;
          const osc = ctx.createOscillator();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(540, wTime);
          osc.frequency.linearRampToValueAtTime(820, wTime + 0.08);
          osc.frequency.linearRampToValueAtTime(420, wTime + 0.15);

          const gain = ctx.createGain();
          gain.gain.setValueAtTime(0.01, wTime);
          gain.gain.linearRampToValueAtTime(0.2, wTime + 0.05);
          gain.gain.exponentialRampToValueAtTime(0.001, wTime + 0.16);

          osc.connect(gain);
          gain.connect(masterGain);

          osc.start(wTime);
          osc.stop(wTime + 0.17);
        });
        break;
      }

      case 'drizzle': {
        // Velvety emulsion or sauce drizzling into bowl
        const duration = 2.0;
        const bufferSize = ctx.sampleRate * duration;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = (Math.random() * 2 - 1) * 0.25;
        }
        const noise = ctx.createBufferSource();
        noise.buffer = buffer;

        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(1400, now);
        filter.frequency.linearRampToValueAtTime(2200, now + 1.0);
        filter.frequency.exponentialRampToValueAtTime(800, now + duration);

        const gainNode = ctx.createGain();
        gainNode.gain.setValueAtTime(0.01, now);
        gainNode.gain.linearRampToValueAtTime(0.35, now + 0.3);
        gainNode.gain.exponentialRampToValueAtTime(0.001, now + duration);

        noise.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(masterGain);

        noise.start(now);
        noise.stop(now + duration);
        break;
      }

      case 'flame': {
        // High heat burner roar / searing torch
        const osc = ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(85, now);
        osc.frequency.linearRampToValueAtTime(110, now + 0.5);
        osc.frequency.exponentialRampToValueAtTime(70, now + 1.8);

        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.01, now);
        gain.gain.linearRampToValueAtTime(0.3, now + 0.2);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 1.8);

        osc.connect(gain);
        gain.connect(masterGain);

        osc.start(now);
        osc.stop(now + 1.8);
        break;
      }

      case 'plating': {
        // Crystal / porcelain chime with delicate tweezer placement
        const freqs = [1046.5, 1318.51, 1567.98]; // C6, E6, G6
        freqs.forEach((freq, i) => {
          const osc = ctx.createOscillator();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now + i * 0.06);

          const gain = ctx.createGain();
          gain.gain.setValueAtTime(0.01, now + i * 0.06);
          gain.gain.linearRampToValueAtTime(0.25, now + i * 0.06 + 0.02);
          gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.06 + 1.2);

          osc.connect(gain);
          gain.connect(masterGain);

          osc.start(now + i * 0.06);
          osc.stop(now + i * 0.06 + 1.25);
        });
        break;
      }

      case 'bell': {
        const osc = ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(880, now);
        osc.frequency.exponentialRampToValueAtTime(875, now + 1.5);

        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.01, now);
        gain.gain.linearRampToValueAtTime(0.4, now + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.6);

        osc.connect(gain);
        gain.connect(masterGain);

        osc.start(now);
        osc.stop(now + 1.6);
        break;
      }
    }

    return stopFn;
  } catch (err) {
    console.warn('Audio playback not permitted or unsupported:', err);
    return () => {};
  }
}

/**
 * Natural Master Chef Narration Engine
 * Plays audio from Gemini TTS if available, or renders speech with authentic human chef cadence.
 */
let currentSpeechUtterance: SpeechSynthesisUtterance | null = null;
let currentAudioElement: HTMLAudioElement | null = null;

export function speakChefNarration(
  text: string,
  options?: {
    onStart?: () => void;
    onEnd?: () => void;
    onError?: () => void;
  }
): () => void {
  // Cancel any active speech
  stopChefNarration();

  // Clean narration text (remove timestamps or internal notes)
  const cleanedText = text
    .replace(/^(\d{1,2}:\d{2})\s*[-–:]\s*/g, '')
    .replace(/\[.*?\]/g, '')
    .trim();

  if (!cleanedText) return () => {};

  if ('speechSynthesis' in window) {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(cleanedText);

    // Pick best natural voice (British, French English, or warm deep English)
    const voices = synth.getVoices();
    const preferredVoice = voices.find(
      (v) =>
        (v.lang.includes('en-GB') || v.lang.includes('en-US') || v.lang.includes('en-AU')) &&
        (v.name.includes('Natural') || v.name.includes('Premium') || v.name.includes('Daniel') || v.name.includes('George') || v.name.includes('Serena'))
    ) || voices.find((v) => v.lang.startsWith('en'));

    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    // Warm, composed, professional chef delivery
    utterance.rate = 0.92; // slightly measured for culinary authority
    utterance.pitch = 0.95; // warm, refined tone
    utterance.volume = 1.0;

    utterance.onstart = () => {
      options?.onStart?.();
    };

    utterance.onend = () => {
      options?.onEnd?.();
      currentSpeechUtterance = null;
    };

    utterance.onerror = (e) => {
      console.warn('Speech synthesis error:', e);
      options?.onError?.();
      currentSpeechUtterance = null;
    };

    currentSpeechUtterance = utterance;
    synth.speak(utterance);

    return () => {
      stopChefNarration();
    };
  } else {
    options?.onEnd?.();
    return () => {};
  }
}

export function stopChefNarration() {
  if ('speechSynthesis' in window) {
    try {
      window.speechSynthesis.cancel();
    } catch (_) {}
  }
  if (currentAudioElement) {
    try {
      currentAudioElement.pause();
      currentAudioElement.currentTime = 0;
    } catch (_) {}
    currentAudioElement = null;
  }
  currentSpeechUtterance = null;
}
