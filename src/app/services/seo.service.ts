import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

export interface SeoConfig {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
}

@Injectable({
  providedIn: 'root',
})
export class SeoService {
  private titleService = inject(Title);
  private metaService = inject(Meta);
  private document = inject(DOCUMENT);
  private readonly baseTitle = 'Gentleman Programming';
  private readonly baseUrl = 'https://gentlemanprogramming.com';

  updateSeoTags(config: SeoConfig): void {
    const fullTitle = config.title
      ? `${config.title} | ${this.baseTitle}`
      : this.baseTitle;
    const fullUrl = config.url ? `${this.baseUrl}${config.url}` : this.baseUrl;

    this.titleService.setTitle(fullTitle);

    this.metaService.updateTag({
      name: 'description',
      content: config.description,
    });

    if (config.keywords) {
      this.metaService.updateTag({
        name: 'keywords',
        content: config.keywords,
      });
    }

    this.metaService.updateTag({
      property: 'og:title',
      content: fullTitle,
    });

    this.metaService.updateTag({
      property: 'og:description',
      content: config.description,
    });

    this.metaService.updateTag({
      property: 'og:url',
      content: fullUrl,
    });

    this.metaService.updateTag({
      property: 'og:type',
      content: config.type || 'website',
    });

    if (config.image) {
      const imageUrl = config.image.startsWith('http')
        ? config.image
        : `${this.baseUrl}${config.image}`;

      this.metaService.updateTag({
        property: 'og:image',
        content: imageUrl,
      });

      this.metaService.updateTag({
        property: 'twitter:image',
        content: imageUrl,
      });
    }

    this.metaService.updateTag({
      property: 'twitter:title',
      content: fullTitle,
    });

    this.metaService.updateTag({
      property: 'twitter:description',
      content: config.description,
    });

    this.metaService.updateTag({
      property: 'twitter:card',
      content: 'summary_large_image',
    });

    // Properly set canonical link tag
    this.updateCanonicalUrl(fullUrl);
  }

  private updateCanonicalUrl(url: string): void {
    // Remove existing canonical link if present
    const existingLink = this.document.querySelector('link[rel="canonical"]');
    if (existingLink) {
      existingLink.setAttribute('href', url);
    } else {
      // Create new canonical link element
      const canonicalLink = this.document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      canonicalLink.setAttribute('href', url);
      this.document.head.appendChild(canonicalLink);
    }
  }
}
