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
import { addIcons } from 'ionicons';
import { musicalNoteOutline } from 'ionicons/icons';
import { ListAllScalesUseCase } from 'src/app/application/usecase/list-all-scales/list-all-scales.usecase';
import { Scale } from 'src/app/domain/model/scale';
import { PianoOctaveComponent } from '../../shared/components/piano-octave/piano-octave.component';

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

  public constructor(private readonly listAllScales: ListAllScalesUseCase) {
    addIcons({ musicalNoteOutline });
  }

  public get sortedScales$(): Observable<Scale[]> {
    return this.scales$.pipe(
      map(scales =>
        [...scales].sort((a, b) =>
          a.tonic.index - b.tonic.index || a.mode.name.localeCompare(b.mode.name)
        )
      )
    );
  }

  public ngOnInit(): void {
    this.scales$ = this.listAllScales.execute();
  }

  public getScalesNotesRepresentation(scale: Scale): string {
    return scale.notes.map((n) => n.name).join(' - ');
  }
}
