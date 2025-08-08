import type { Routes } from '@angular/router';
import { metaTagsResolver } from './services/meta-tags.resolver';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home').then((m) => m.Home),
    resolve: { metaTags: metaTagsResolver },
  },
  {
    path: 'private-mentoring',
    loadComponent: () =>
      import('./pages/private-mentoring/private-mentoring').then(
        (m) => m.PrivateMentoring
      ),
    resolve: { metaTags: metaTagsResolver },
  },
  {
    path: 'corporate-training',
    loadComponent: () =>
      import('./pages/corporate-training/corporate-training').then(
        (m) => m.CorporateTraining
      ),
    resolve: { metaTags: metaTagsResolver },
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about').then((m) => m.About),
    resolve: { metaTags: metaTagsResolver },
  },
  {
    path: '**',
    redirectTo: '/home',
  },
];
