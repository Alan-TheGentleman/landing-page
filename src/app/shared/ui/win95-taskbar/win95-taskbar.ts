import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { WindowManagerService } from '../../../services/window-manager.service';
import { SoundService } from '../../../services/sound.service';

@Component({
  selector: 'app-win95-taskbar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="win95-taskbar">
      <button class="start-button" (click)="toggleStartMenu()" title="Start">
        Start
      </button>

      <div class="taskbar-divider"></div>

      <div class="taskbar-windows">
        @for (window of windowManager.openWindows(); track window.id) {
          <button
            class="taskbar-window"
            [class.active]="window.active && !window.minimized"
            [class.minimized]="window.minimized"
            (click)="focusWindow(window.id)"
          >
            <span class="window-icon">{{ window.icon }}</span>
            <span class="window-title">{{ window.title }}</span>
          </button>
        }
      </div>

      <div class="taskbar-tray">
        <div class="tray-icons">
          <span
            class="tray-icon"
            title="YouTube Channel"
            (click)="
              openExternal('https://www.youtube.com/@GentlemanProgramming')
            "
            >▶</span
          >
          <span
            class="tray-icon"
            title="Discord Community"
            (click)="openExternal('https://discord.com/invite/3QVhF5vRsR')"
            >💬</span
          >
          <span
            class="tray-icon"
            title="GitHub Profile"
            (click)="openExternal('https://github.com/Gentleman-Programming')"
            >🐙</span
          >
          <span 
            class="tray-icon tray-icon--clickable" 
            [title]="soundService.isEnabled() ? 'Sound On - Click to mute' : 'Sound Off - Click to unmute'"
            (click)="toggleSound()"
          >{{ soundService.isEnabled() ? '🔊' : '🔇' }}</span>
        </div>
        <div class="taskbar-clock" title="Current Time">
          {{ currentTime() }}
        </div>
      </div>

      @if (startMenuOpen()) {
        <div class="start-menu">
          <div class="start-menu-sidebar">
            <span>Gentleman</span>
            <span>Programming</span>
          </div>
          <div class="start-menu-content">
            <div class="start-menu-item" (click)="navigateTo('/home')">
              <span class="menu-icon">🏠</span>
              <span>Home</span>
            </div>
            <div
              class="start-menu-item"
              (click)="navigateTo('/private-mentoring')"
            >
              <span class="menu-icon">👨</span>
              <span>1:1 Mentoring</span>
            </div>
            <div
              class="start-menu-item"
              (click)="navigateTo('/corporate-training')"
            >
              <span class="menu-icon">🏢</span>
              <span>Corporate Training</span>
            </div>
            <div class="start-menu-item" (click)="navigateTo('/about')">
              <span class="menu-icon">👤</span>
              <span>About Me</span>
            </div>
            <div class="start-menu-separator"></div>
            <div class="start-menu-item" (click)="openContact()">
              <span class="menu-icon">📧</span>
              <span>Contact</span>
            </div>
            <div
              class="start-menu-item"
              (click)="
                openExternal('https://www.youtube.com/@GentlemanProgramming')
              "
            >
              <span class="menu-icon">▶</span>
              <span>YouTube</span>
            </div>
            <div
              class="start-menu-item"
              (click)="openExternal('https://github.com/Gentleman-Programming')"
            >
              <span class="menu-icon">🐙</span>
              <span>GitHub</span>
            </div>
          </div>
        </div>
      }
    </div>
  `,
  styleUrl: './win95-taskbar.scss',
})
export class Win95TaskbarComponent {
  private router = inject(Router);
  protected soundService = inject(SoundService);
  protected windowManager = inject(WindowManagerService);

  startMenuOpen = signal(false);
  currentTime = signal(this.getTime());

  constructor() {
    setInterval(() => {
      this.currentTime.set(this.getTime());
    }, 1000);
  }

  private getTime(): string {
    const now = new Date();
    return now.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  }

  toggleStartMenu(): void {
    const willBeOpen = !this.startMenuOpen();
    this.startMenuOpen.set(willBeOpen);
    this.soundService.play(willBeOpen ? 'menu-open' : 'menu-close');
  }

  focusWindow(id: string): void {
    const window = this.windowManager.openWindows().find(w => w.id === id);
    if (!window) return;
    
    // If window is minimized, restore it
    if (window.minimized) {
      this.windowManager.restoreWindow(id);
      this.router.navigate([window.route]);
    } else {
      // If window is already active, minimize it
      if (window.active) {
        // Navigate to the window first to ensure it's visible for animation
        this.router.navigate([window.route]);
        // Then minimize after a brief delay
        setTimeout(() => {
          // The minimize animation will be triggered by the window component
          this.windowManager.minimizeWindow(id);
          setTimeout(() => {
            this.router.navigate(['/home']);
          }, 300); // Wait for minimize animation to complete
        }, 50);
        return;
      } else {
        this.windowManager.focusWindow(id);
        this.router.navigate([window.route]);
      }
    }
  }

  navigateTo(route: string): void {
    this.soundService.play('button-click');
    this.toggleStartMenu();
    
    // Define window properties based on route
    const windowConfigs = {
      '/home': null, // Home doesn't use window system
      '/private-mentoring': {
        id: 'private-mentoring',
        title: 'Private Mentoring Sessions',
        icon: '👨‍🏫',
        route: '/private-mentoring'
      },
      '/corporate-training': {
        id: 'corporate-training', 
        title: 'Corporate Training Programs',
        icon: '🏢',
        route: '/corporate-training'
      },
      '/about': {
        id: 'about',
        title: 'About - Gentleman Programming',
        icon: '👤',
        route: '/about'
      }
    };
    
    const windowConfig = windowConfigs[route as keyof typeof windowConfigs];
    
    if (windowConfig) {
      this.windowManager.openWindow(windowConfig);
    }
    
    this.router.navigate([route]);
  }

  openContact(): void {
    this.toggleStartMenu();
    window.location.href = 'mailto:gentleman@ohmybitz.com';
  }

  openExternal(url: string): void {
    this.toggleStartMenu();
    window.open(url, '_blank');
  }

  toggleSound(): void {
    const wasEnabled = this.soundService.isEnabled();
    this.soundService.setEnabled(!wasEnabled);
    
    // Play a sound to confirm the action (only if enabling sounds)
    if (!wasEnabled) {
      // Small delay to ensure the service is enabled before playing
      setTimeout(() => {
        this.soundService.play('button-click');
      }, 100);
    }
  }
}
