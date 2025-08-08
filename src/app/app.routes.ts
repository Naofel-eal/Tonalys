import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./infrastructure/web/main/main.component').then(m => m.MainComponent)
    },
    {
        path: 'scale/:tonic/:mode',
        loadComponent: () => import('./infrastructure/web/scale-detail-page/scale-detail-page.component').then(m => m.ScaleDetailPageComponent)
    }
];
