import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import {
  Win95DesktopComponent,
  Win95IconComponent,
  Win95ModalComponent,
} from '@shared/ui';
import { Layout } from '@src/app/core/layout/layout';

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
    Layout,
    Win95DesktopComponent,
    Win95IconComponent,
    Win95ModalComponent,
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  private router = inject(Router);

  protected title = 'landing-page-old-school';

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
  onItemDoubleClick(item: FileSystemItem): void {
    if (item.type === 'folder') {
      this.toggleFolder(item.id);
    } else if (item.type === 'image') {
      this.selectedImage.set(item.image || '');
      this.isImageModalOpen.set(true);
    } else if (item.route) {
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
    this.router.navigate([route]);
  }
}
