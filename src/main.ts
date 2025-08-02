import { isDevMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideIonicAngular, IonicRouteStrategy } from '@ionic/angular/standalone';
import { provideRouter, RouteReuseStrategy, withHashLocation } from '@angular/router';
import { provideServiceWorker } from '@angular/service-worker';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { SCALE_REPOSITORY } from './app/application';
import { ScaleRepositoryAdapter } from './app/infrastructure';

bootstrapApplication(AppComponent, {
  providers: [
    provideIonicAngular(),
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideRouter(routes, withHashLocation()),
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000',
    }),
    { provide: SCALE_REPOSITORY, useClass: ScaleRepositoryAdapter }
  ],
});
