import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import {
  BootScreenComponent,
  Win95IconComponent,
  Win95ModalComponent,
  Win95TaskbarComponent,
} from '@shared/ui';
import { BootService } from '../../services/boot.service';
import { WindowManagerService } from '../../services/window-manager.service';

interface FileSystemItem {
  id: string;
  title: string;
  description: string;
  type: 'folder' | 'file' | 'image';
  route?: string;
  image?: string;
  children?: FileSystemItem[];
  isOpen?: boolean;
}

@Component({
  selector: 'app-home',
  imports: [
    BootScreenComponent,
    Win95IconComponent,
    Win95ModalComponent,
    Win95TaskbarComponent,
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  private router = inject(Router);
  private windowManager = inject(WindowManagerService);
  private bootService = inject(BootService);

  protected title = 'landing-page-old-school';
  protected isMobile = this.detectMobile();

  private fileSystem: FileSystemItem[] = [
    {
      id: 'mentoring',
      title: 'Mentoring',
      description: 'Professional mentoring services',
      type: 'folder',
      isOpen: false,
      children: [
        {
          id: 'private-mentoring',
          title: 'private-mentoring.bat',
          description: 'One-on-one personalized mentoring sessions',
          type: 'file',
          route: '/private-mentoring',
        },
        {
          id: 'corporate-training',
          title: 'corporate-training.bat',
          description: 'Comprehensive training programs for teams',
          type: 'file',
          route: '/corporate-training',
        },
      ],
    },
    {
      id: 'about',
      title: 'about-me.jpg',
      description: 'Learn about my journey and experience',
      route: '/about',
      type: 'image',
      image: 'gentleman.webp',
    },
  ];

  protected openFolders = signal<Set<string>>(new Set());
  protected isImageModalOpen = signal<boolean>(false);
  protected selectedImage = signal<string>('');
  protected showBootScreen = signal<boolean>(!this.bootService.hasBooted);

  protected get displayItems(): FileSystemItem[] {
    const openSet = this.openFolders();

    // Si hay alguna carpeta abierta, solo mostrar el contenido de esa carpeta
    if (openSet.size > 0) {
      const result: FileSystemItem[] = [];
      for (const item of this.fileSystem) {
        if (item.type === 'folder' && openSet.has(item.id) && item.children) {
          result.push(...item.children);
        }
      }
      return result;
    }

    // Si no hay carpetas abiertas, mostrar solo elementos de nivel raíz
    return this.fileSystem.filter(
      (item) => item.type !== 'folder' || !openSet.has(item.id)
    );
  }
  onItemClick(item: FileSystemItem): void {
    // En mobile usa single click, en desktop double click
    if (this.isMobile) {
      this.handleItemAction(item);
    }
  }

  onItemDoubleClick(item: FileSystemItem): void {
    // Solo en desktop
    if (!this.isMobile) {
      this.handleItemAction(item);
    }
  }

  private handleItemAction(item: FileSystemItem): void {
    if (item.type === 'folder') {
      this.toggleFolder(item.id);
    } else if (item.type === 'image') {
      this.selectedImage.set(item.image || '');
      this.isImageModalOpen.set(true);
    } else if (item.route) {
      // Define window configurations for .bat files
      const windowConfigs = {
        '/private-mentoring': {
          id: 'private-mentoring',
          title: 'Private Mentoring Sessions',
          icon: '👨‍🏫',
          route: '/private-mentoring',
        },
        '/corporate-training': {
          id: 'corporate-training',
          title: 'Corporate Training Programs',
          icon: '🏢',
          route: '/corporate-training',
        },
        '/about': {
          id: 'about',
          title: 'About - Gentleman Programming',
          icon: '👤',
          route: '/about',
        },
      };

      const windowConfig =
        windowConfigs[item.route as keyof typeof windowConfigs];

      if (windowConfig) {
        this.windowManager.openWindow(windowConfig);
      }

      this.router.navigate([item.route]);
    }
  }

  private toggleFolder(folderId: string): void {
    const current = this.openFolders();
    const newSet = new Set(current);

    if (newSet.has(folderId)) {
      newSet.delete(folderId);
    } else {
      newSet.add(folderId);
    }

    this.openFolders.set(newSet);
  }

  closeImageModal(): void {
    this.isImageModalOpen.set(false);
    this.selectedImage.set('');
  }
  navigateTo(route: string): void {
    // If navigating to home, close all windows
    if (route === '/home') {
      const openWindows = this.windowManager.openWindows();
      openWindows.forEach((window) => {
        this.windowManager.closeWindow(window.id);
      });
    }

    this.router.navigate([route]);
  }

  private detectMobile(): boolean {
    if (typeof window !== 'undefined' && typeof navigator !== 'undefined') {
      return (
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        ) || window.innerWidth <= 768
      );
    }
    return false;
  }

  onBootComplete(): void {
    this.bootService.markAsBooted();
    this.showBootScreen.set(false);
  }
}
