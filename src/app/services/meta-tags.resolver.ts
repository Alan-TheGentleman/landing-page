import { inject } from '@angular/core';
import type { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { BreadcrumbService } from './breadcrumb.service';
import { SeoService } from './seo.service';

export interface RouteMetaTags {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
}

const metaTagsConfig: Record<string, RouteMetaTags> = {
  '/home': {
    title: 'Home - Professional Software Development Services',
    description:
      'Welcome to Gentleman Programming. Expert software development mentoring, corporate training, and personalized coaching. Start your journey with a nostalgic Windows 95 experience.',
    keywords:
      'software development, programming mentoring, coding bootcamp, tech coaching, web development training',
  },
  '/private-mentoring': {
    title: 'Private Mentoring - One-on-One Software Development Coaching',
    description:
      'Accelerate your software development career with personalized mentoring. Learn from Google Developer Expert and Microsoft MVP. Frontend, backend, architecture, and career coaching.',
    keywords:
      'private mentoring, software coaching, one-on-one programming lessons, career development, tech mentorship',
  },
  '/corporate-training': {
    title: 'Corporate Training - Team Software Development Programs',
    description:
      'Transform your development team with enterprise-proven training programs. Frontend, backend, DevOps, and architecture training from Google GDE and Microsoft MVP. Measurable ROI guaranteed.',
    keywords:
      'corporate training, team training, enterprise software training, development team coaching, tech upskilling',
  },
  '/about': {
    title: 'About - Gentleman Programming | Google GDE & Microsoft MVP',
    description:
      'Google Developer Expert and Microsoft MVP with 15+ years experience. Creator of 200K+ developer community. Enterprise architect, technical educator, and bestselling author.',
    keywords:
      'Google Developer Expert, Microsoft MVP, software architect, technical educator, developer community, programming mentor',
  },
};

export const metaTagsResolver: ResolveFn<boolean> = (
  route: ActivatedRouteSnapshot
) => {
  const seoService = inject(SeoService);
  const breadcrumbService = inject(BreadcrumbService);
  const path =
    `/${route.url.map((segment) => segment.path).join('/')}` || '/home';

  const metaTags = metaTagsConfig[path] || metaTagsConfig['/home'];

  // Update SEO tags
  seoService.updateSeoTags({
    ...metaTags,
    url: path,
  });

  // Update breadcrumb structured data
  breadcrumbService.updateBreadcrumb(path);

  return true;
};
