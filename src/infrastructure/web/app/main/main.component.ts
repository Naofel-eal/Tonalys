import { Component, HostListener, inject } from '@angular/core';
import { AsyncPipe, NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { PianoOctaveComponent } from '../piano-octave/piano-octave.component';
import { ListAllScalesUseCase } from '../../../../application';
import { Scale } from '../../../../domain';

const SCROLL_THRESHOLD_BEFORE_REDUCE_HEADER_IN_PX = 100;

@Component({
  selector: 'app-main',
  standalone: true,
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  imports: [AsyncPipe, RouterLink, PianoOctaveComponent, NgClass],
})
export class MainComponent {
  private readonly listAllScalesUseCase: ListAllScalesUseCase = inject(ListAllScalesUseCase);
  
  public readonly scales$: Observable<Scale[]> = this.listAllScalesUseCase.execute();
  public headerReduced = false;

  @HostListener('window:scroll', [])
  public onWindowScroll() {
    const scrollY = window.scrollY;
    this.headerReduced  = scrollY > SCROLL_THRESHOLD_BEFORE_REDUCE_HEADER_IN_PX;
  }
}
