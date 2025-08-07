import { CommonModule } from '@angular/common';
import { Component, Input, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { WindowManagerService } from '../../../services/window-manager.service';

@Component({
  selector: 'app-win95-window',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="win95-window" 
         [class.win95-window--minimized]="isMinimized()" 
         [class.win95-window--maximized]="isMaximized()"
         [class.win95-window--minimizing]="isMinimizing()">
      <div class="win95-window__titlebar">
        <div class="win95-window__title">
          @if (icon) {
            <span class="win95-window__icon">{{ icon }}</span>
          }
          <span class="win95-window__title-text">{{ title }}</span>
        </div>
        <div class="win95-window__controls">
          <button class="win95-window__control win95-window__control--minimize" type="button" (click)="minimizeWindow()">
            <span>_</span>
          </button>
          <button class="win95-window__control win95-window__control--maximize" type="button" (click)="maximizeWindow()">
            <span>□</span>
          </button>
          <button class="win95-window__control win95-window__control--close" type="button" (click)="closeWindow()">
            <span>✕</span>
          </button>
        </div>
      </div>
      <div class="win95-window__content">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styleUrl: './win95-window.scss',
})
export class Win95WindowComponent {
  @Input() title: string = 'Untitled';
  @Input() icon?: string;
  
  private router = inject(Router);
  private windowManager = inject(WindowManagerService);
  
  // Animation state
  private minimizingState = signal(false);
  
  private getWindowId(): string | null {
    const currentRoute = this.router.url;
    const routeToWindowId: { [key: string]: string } = {
      '/private-mentoring': 'private-mentoring',
      '/corporate-training': 'corporate-training',
      '/about': 'about'
    };
    return routeToWindowId[currentRoute] || null;
  }
  
  isMinimized(): boolean {
    const windowId = this.getWindowId();
    if (!windowId) return false;
    const window = this.windowManager.openWindows().find(w => w.id === windowId);
    return window?.minimized || false;
  }
  
  isMaximized(): boolean {
    const windowId = this.getWindowId();
    if (!windowId) return false;
    const window = this.windowManager.openWindows().find(w => w.id === windowId);
    return window?.maximized || false;
  }
  
  isMinimizing(): boolean {
    return this.minimizingState();
  }
  
  minimizeWindow(): void {
    const windowId = this.getWindowId();
    if (windowId) {
      // Start minimize animation
      this.minimizingState.set(true);
      
      // After animation completes, minimize in service and navigate
      setTimeout(() => {
        this.windowManager.minimizeWindow(windowId);
        this.minimizingState.set(false);
        this.router.navigate(['/home']);
      }, 300); // Match animation duration
    }
  }
  
  maximizeWindow(): void {
    const windowId = this.getWindowId();
    if (windowId) {
      this.windowManager.maximizeWindow(windowId);
    }
  }
  
  closeWindow(): void {
    const windowId = this.getWindowId();
    if (windowId) {
      this.windowManager.closeWindow(windowId);
    }
    // Navigate back to home
    this.router.navigate(['/home']);
  }
}