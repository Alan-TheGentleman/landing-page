import { isPlatformBrowser } from '@angular/common';
import { Injectable, inject, PLATFORM_ID } from '@angular/core';

export type SoundType =
  | 'window-open'
  | 'window-close'
  | 'window-minimize'
  | 'window-maximize'
  | 'button-click'
  | 'menu-open'
  | 'menu-close'
  | 'startup'
  | 'error';

@Injectable({
  providedIn: 'root',
})
export class SoundService {
  private sounds: Map<SoundType, HTMLAudioElement> = new Map();
  private enabled = true;
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  constructor() {
    if (this.isBrowser) {
      this.initializeSounds();
    }
  }

  private initializeSounds(): void {
    const soundFiles: Record<SoundType, string> = {
      'window-open': '/assets/sounds/windows-open.wav',
      'window-close': '/assets/sounds/windows-close.wav',
      'window-minimize': '/assets/sounds/windows-minimize.wav',
      'window-maximize': '/assets/sounds/windows-maximize.wav',
      'button-click': '/assets/sounds/button-click.wav',
      'menu-open': '/assets/sounds/menu-open.wav',
      'menu-close': '/assets/sounds/menu-close.wav',
      startup: '/assets/sounds/windows-startup.wav',
      error: '/assets/sounds/windows-error.wav',
    };

    Object.entries(soundFiles).forEach(([type, path]) => {
      const audio = new Audio();
      audio.src = path;
      audio.preload = 'auto';
      audio.volume = 0.3; // Keep sounds at reasonable volume
      this.sounds.set(type as SoundType, audio);
    });
  }

  play(soundType: SoundType): void {
    if (!this.enabled || !this.isBrowser) return;

    const sound = this.sounds.get(soundType);
    if (sound) {
      // Clone and play to allow multiple simultaneous sounds
      const audioClone = sound.cloneNode() as HTMLAudioElement;
      audioClone.volume = sound.volume;
      audioClone.play().catch((error) => {
        console.warn(`Could not play sound ${soundType}:`, error);
      });
    }
  }

  setEnabled(enabled: boolean): void {
    this.enabled = enabled;
  }

  isEnabled(): boolean {
    return this.enabled;
  }

  setVolume(soundType: SoundType, volume: number): void {
    if (!this.isBrowser) return;

    const sound = this.sounds.get(soundType);
    if (sound) {
      sound.volume = Math.max(0, Math.min(1, volume));
    }
  }

  setGlobalVolume(volume: number): void {
    if (!this.isBrowser) return;

    const normalizedVolume = Math.max(0, Math.min(1, volume));
    this.sounds.forEach((sound) => {
      sound.volume = normalizedVolume;
    });
  }
}
