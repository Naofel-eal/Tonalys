import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { map } from 'rxjs';
import { PianoOctaveComponent } from '../piano-octave/piano-octave.component';
import { NoteName, ModeName, Note, Mode, Scale } from '../../../../domain';

@Component({
  selector: 'app-scale-detail-page',
  standalone: true,
  templateUrl: './scale-detail-page.component.html',
  styleUrls: ['./scale-detail-page.component.css'],
  imports: [AsyncPipe, PianoOctaveComponent, RouterLink],
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
