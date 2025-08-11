import { Component, HostListener, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AsyncPipe, NgClass } from '@angular/common';
import { map } from 'rxjs';
import { PianoOctaveComponent } from '../piano-octave/piano-octave.component';
import { NoteName, ModeName, Note, Mode, Scale } from '../../../../domain';

const SCROLL_THRESHOLD_BEFORE_REDUCE_HEADER_IN_PX = 100;

@Component({
  selector: 'app-scale-detail-page',
  standalone: true,
  templateUrl: './scale-detail-page.component.html',
  styleUrls: ['./scale-detail-page.component.css'],
  imports: [AsyncPipe, PianoOctaveComponent, RouterLink, NgClass],
})
export class ScaleDetailPageComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  public headerReduced = false;

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

  @HostListener('window:scroll', [])
  public onWindowScroll() {
    const scrollY = window.scrollY;
    this.headerReduced  = scrollY > SCROLL_THRESHOLD_BEFORE_REDUCE_HEADER_IN_PX;
  }
}