import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./infrastructure/web/pages/main-page/main-page.component').then((m) => m.MainPageComponent),
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
