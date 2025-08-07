import type { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home').then((m) => m.Home),
  },
  {
    path: 'private-mentoring',
    loadComponent: () =>
      import('./pages/private-mentoring/private-mentoring').then(
        (m) => m.PrivateMentoring
      ),
  },
  {
    path: 'corporate-training',
    loadComponent: () =>
      import('./pages/corporate-training/corporate-training').then(
        (m) => m.CorporateTraining
      ),
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about').then((m) => m.About),
  },
  {
    path: '**',
    redirectTo: '/home',
  },
];
