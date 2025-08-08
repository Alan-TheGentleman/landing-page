import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Component, inject, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  private document = inject(DOCUMENT);
  private platformId = inject(PLATFORM_ID);

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.addStructuredData();
    }
  }

  private addStructuredData(): void {
    const script = this.document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Gentleman Programming',
      url: 'https://gentlemanprogramming.com',
      logo: 'https://gentlemanprogramming.com/assets/logo.png',
      description:
        'Expert software development mentoring and corporate training. Learn from Google Developer Expert and Microsoft MVP.',
      founder: {
        '@type': 'Person',
        name: 'Gentleman Programming',
        jobTitle: 'Software Architect & Technical Educator',
        alumniOf: 'Google Developer Expert Program, Microsoft MVP Program',
        award: ['Google Developer Expert', 'Microsoft MVP'],
      },
      sameAs: [
        'https://www.youtube.com/@GentlemanProgramming',
        'https://www.instagram.com/gentlemanprogramming',
        'https://www.tiktok.com/@gentlemanprogramming',
        'https://www.twitch.tv/gentlemanprogramming',
        'https://twitter.com/gentlemanprog',
        'https://www.linkedin.com/in/gentleman-programming/',
      ],
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        ratingCount: '1000',
        bestRating: '5',
        worstRating: '1',
      },
      offers: [
        {
          '@type': 'Offer',
          name: 'Private Mentoring Sessions',
          description: 'One-on-one personalized software development coaching',
          url: 'https://gentlemanprogramming.com/private-mentoring',
        },
        {
          '@type': 'Offer',
          name: 'Corporate Training Programs',
          description: 'Team training for enterprise software development',
          url: 'https://gentlemanprogramming.com/corporate-training',
        },
      ],
    });
    this.document.head.appendChild(script);
  }
}
