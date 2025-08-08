import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';

interface BreadcrumbItem {
  name: string;
  item: string;
  position: number;
}

@Injectable({
  providedIn: 'root',
})
export class BreadcrumbService {
  private document = inject(DOCUMENT);
  private readonly baseUrl = 'https://gentlemanprogramming.com';

  updateBreadcrumb(currentPage: string): void {
    const breadcrumbItems = this.generateBreadcrumbItems(currentPage);
    this.addBreadcrumbStructuredData(breadcrumbItems);
  }

  private generateBreadcrumbItems(currentPage: string): BreadcrumbItem[] {
    const items: BreadcrumbItem[] = [
      {
        name: 'Home',
        item: this.baseUrl,
        position: 1,
      },
    ];

    switch (currentPage) {
      case '/home':
        // Only home, no additional breadcrumb needed
        break;
      case '/private-mentoring':
        items.push({
          name: 'Private Mentoring',
          item: `${this.baseUrl}/private-mentoring`,
          position: 2,
        });
        break;
      case '/corporate-training':
        items.push({
          name: 'Corporate Training',
          item: `${this.baseUrl}/corporate-training`,
          position: 2,
        });
        break;
      case '/about':
        items.push({
          name: 'About',
          item: `${this.baseUrl}/about`,
          position: 2,
        });
        break;
    }

    return items;
  }

  private addBreadcrumbStructuredData(items: BreadcrumbItem[]): void {
    // Remove existing breadcrumb structured data
    const existingScript = this.document.querySelector(
      'script[data-breadcrumb="true"]'
    );
    if (existingScript) {
      existingScript.remove();
    }

    // Only add breadcrumb if there are multiple items
    if (items.length < 2) {
      return;
    }

    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: items.map((item) => ({
        '@type': 'ListItem',
        position: item.position,
        name: item.name,
        item: item.item,
      })),
    };

    const script = this.document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-breadcrumb', 'true');
    script.text = JSON.stringify(structuredData, null, 2);
    this.document.head.appendChild(script);
  }
}
