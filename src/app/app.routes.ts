import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./infrastructure/web/pages/main-page/main-page.component').then((m) => m.MainPageComponent),
  },
  { 
    path: 'scale/:tonic/:mode', 
    loadComponent: () => 
      import('./infrastructure/web/pages/scale-detail-page/scale-detail-page.component').then((m) => m.ScaleDetailPageComponent)
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
