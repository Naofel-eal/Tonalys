import { Component, OnInit } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonAccordionGroup,
  IonAccordion,
  IonItem,
  IonList,
  IonLabel,
  IonIcon,
} from '@ionic/angular/standalone';
import { AsyncPipe } from '@angular/common';
import { map, Observable, of } from 'rxjs';
import { Scale } from 'src/app/domain/model/scale';
import { PianoOctaveComponent } from '../../shared/components/piano-octave/piano-octave.component';
import { ListAllScalesUseCase } from '../../../../application/usecase/list-all-scales/list-all-scales.usecase';

@Component({
  selector: 'app-main',
  standalone: true,
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonAccordionGroup,
    IonAccordion,
    IonItem,
    IonList,
    IonLabel,
    IonIcon,
    AsyncPipe,
    PianoOctaveComponent
  ],
})
export class MainPageComponent implements OnInit {
  public scales$: Observable<Scale[]> = of([]);

  public constructor(private readonly listAllScalesUseCase: ListAllScalesUseCase) {
  }

  public ngOnInit(): void {
    this.scales$ = this.listAllScalesUseCase.execute().pipe(
      map(scales => this.sortScales(scales))
    );
  }

  private sortScales(scales: Scale[]): Scale[] {
    return [...scales].sort(
      (a, b) => a.tonic.index - b.tonic.index || a.mode.name.localeCompare(b.mode.name)
    );
  }

  public getScalesNotesRepresentation(scale: Scale): string {
    return scale.notes.map((n) => n.name).join(' - ');
  }
}
