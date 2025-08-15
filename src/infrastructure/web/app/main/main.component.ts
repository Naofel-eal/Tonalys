import { Component, inject, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { PianoOctaveComponent } from '../piano-octave/piano-octave.component';
import { ListAllScalesUseCase } from '../../../../application';
import { Scale } from '../../../../domain';
import { IonContent, IonRouterLink } from '@ionic/angular/standalone';

@Component({
  selector: 'app-main',
  standalone: true,
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  imports: [AsyncPipe, RouterLink, PianoOctaveComponent, IonContent, IonRouterLink],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MainComponent {
  private readonly listAllScalesUseCase: ListAllScalesUseCase = inject(ListAllScalesUseCase);
  
  public readonly scales$: Observable<Scale[]> = this.listAllScalesUseCase.execute();
}
