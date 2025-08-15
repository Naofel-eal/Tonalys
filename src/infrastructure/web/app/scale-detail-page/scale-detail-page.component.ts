import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { map } from 'rxjs';
import { PianoOctaveComponent } from '../piano-octave/piano-octave.component';
import { NoteName, ModeName, Note, Mode, Scale } from '../../../../domain';
import { IonBackButton, IonButtons, IonContent, IonHeader, IonIcon, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-scale-detail-page',
  standalone: true,
  templateUrl: './scale-detail-page.component.html',
  styleUrls: ['./scale-detail-page.component.css'],
  imports: [
    AsyncPipe, PianoOctaveComponent,
    IonContent, IonHeader, IonBackButton, 
    IonTitle, IonToolbar, IonButtons, IonIcon
  ],
})
export class ScaleDetailPageComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  public readonly scale$ = this.route.paramMap.pipe(
    map(params => {
      try {
        const tonic = Note.fromName(params.get('tonic') as NoteName);
        const mode  = Mode.fromName(params.get('mode') as ModeName);
        return new Scale(tonic, mode);
      } catch (error) {
        console.error(error);
        this.router.navigate(['/']);
        return null;
      }
    }),
  );
}