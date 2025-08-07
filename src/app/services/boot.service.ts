import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BootService {
  private hasBootedSession = signal(false);

  get hasBooted(): boolean {
    return this.hasBootedSession();
  }

  markAsBooted(): void {
    this.hasBootedSession.set(true);
  }

  resetBoot(): void {
    this.hasBootedSession.set(false);
  }
}