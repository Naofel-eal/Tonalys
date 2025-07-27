import { Component, inject } from '@angular/core';
import {
  IonHeader, IonToolbar, IonTitle, IonButtons, IonBackButton,
  IonContent, IonIcon, IonLabel, IonItem, IonList
} from '@ionic/angular/standalone';
import { ActivatedRoute, Router } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { map } from 'rxjs';
import { PianoOctaveComponent } from '../../shared/components/piano-octave/piano-octave.component';
import { Scale } from 'src/app/domain';
import { Mode } from 'src/app/domain/model/mode/mode';
import { ModeName } from 'src/app/domain/model/mode/mode-name';
import { Note } from 'src/app/domain/model/note/note';
import { NoteName } from 'src/app/domain/model/note/note-name';

@Component({
  selector: 'app-scale-detail-page',
  standalone: true,
  templateUrl: './scale-detail-page.component.html',
  imports: [
    IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle,
    IonContent, IonList, IonItem, IonIcon, IonLabel, AsyncPipe, PianoOctaveComponent,
  ],
})
export class ScaleDetailPageComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  public readonly scale$ = this.route.paramMap.pipe(
    map(params => {
      try {
        const tonicNoteName = params.get('tonic') as NoteName;
        const modeName = params.get('mode') as ModeName;

        const tonic = Note.fromName(tonicNoteName);
        const mode  = Mode.fromName(modeName);
        return new Scale(tonic, mode);
      }
      catch(error) {
        console.error(error);
        this.router.navigate(['/'])
        return null;
      }
    }),
  );
}
