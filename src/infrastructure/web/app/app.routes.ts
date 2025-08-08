import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./main/main.component').then(m => m.MainComponent)
    },
    {
        path: 'scale/:tonic/:mode',
        loadComponent: () => import('./scale-detail-page/scale-detail-page.component').then(m => m.ScaleDetailPageComponent)
    }
];
