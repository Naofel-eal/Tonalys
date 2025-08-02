import { Routes } from '@angular/router';
import { MainPageComponent } from './infrastructure/web/pages/main-page/main-page.component';
import { ScaleDetailPageComponent } from './infrastructure/web/pages/scale-detail-page/scale-detail-page.component';

export const routes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'scale/:tonic/:mode', component: ScaleDetailPageComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
