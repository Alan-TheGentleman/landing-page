import { Injectable, inject, signal } from '@angular/core';
import { SoundService } from './sound.service';

export interface WindowState {
  id: string;
  title: string;
  icon: string;
  route: string;
  active: boolean;
  minimized: boolean;
  maximized: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class WindowManagerService {
  private windows = signal<WindowState[]>([]);
  private soundService = inject(SoundService);

  // Expose windows as readonly signal
  readonly openWindows = this.windows.asReadonly();

  openWindow(
    window: Omit<WindowState, 'active' | 'minimized' | 'maximized'>
  ): void {
    const existingWindow = this.windows().find((w) => w.id === window.id);

    if (existingWindow) {
      // Si la ventana ya existe, la restauramos y activamos
      const newWindows = this.windows().map((w) => ({
        ...w,
        active: w.id === window.id,
        minimized: w.id === window.id ? false : w.minimized,
      }));
      this.windows.set(newWindows);
      this.soundService.play('window-open');
    } else {
      // Crear nueva ventana y marcar todas las otras como inactivas
      const newWindows = this.windows().map((w) => ({ ...w, active: false }));
      newWindows.push({
        ...window,
        active: true,
        minimized: false,
        maximized: false,
      });
      this.windows.set(newWindows);
      this.soundService.play('window-open');
    }
  }

  closeWindow(windowId: string): void {
    const currentWindows = this.windows();
    const windowIndex = currentWindows.findIndex((w) => w.id === windowId);

    if (windowIndex === -1) return;

    const newWindows = currentWindows.filter((w) => w.id !== windowId);

    // Si cerramos la ventana activa y hay otras ventanas, activar la última
    const wasActive = currentWindows[windowIndex].active;
    if (wasActive && newWindows.length > 0) {
      newWindows[newWindows.length - 1].active = true;
    }

    this.windows.set(newWindows);
    this.soundService.play('window-close');
  }

  focusWindow(windowId: string): void {
    const newWindows = this.windows().map((w) => ({
      ...w,
      active: w.id === windowId,
      minimized: w.id === windowId ? false : w.minimized,
    }));
    this.windows.set(newWindows);
  }

  minimizeWindow(windowId: string): void {
    const newWindows = this.windows().map((w) => ({
      ...w,
      minimized: w.id === windowId ? true : w.minimized,
      active: w.id === windowId ? false : w.active,
      maximized: w.id === windowId ? false : w.maximized,
    }));
    this.windows.set(newWindows);
    this.soundService.play('window-minimize');
  }

  maximizeWindow(windowId: string): void {
    const newWindows = this.windows().map((w) => ({
      ...w,
      maximized: w.id === windowId ? !w.maximized : w.maximized,
      minimized: w.id === windowId ? false : w.minimized,
    }));
    this.windows.set(newWindows);
    this.soundService.play('window-maximize');
  }

  restoreWindow(windowId: string): void {
    const newWindows = this.windows().map((w) => ({
      ...w,
      minimized: w.id === windowId ? false : w.minimized,
      maximized: w.id === windowId ? false : w.maximized,
      active: w.id === windowId ? true : false,
    }));
    this.windows.set(newWindows);
  }

  getActiveWindow(): WindowState | null {
    return this.windows().find((w) => w.active) || null;
  }

  isWindowOpen(windowId: string): boolean {
    return this.windows().some((w) => w.id === windowId);
  }
}
