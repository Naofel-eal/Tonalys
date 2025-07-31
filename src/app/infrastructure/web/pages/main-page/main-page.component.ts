import { Component, OnInit } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonIcon,
} from '@ionic/angular/standalone';
import { AsyncPipe } from '@angular/common';
import { map, Observable, of } from 'rxjs';
import { Scale } from 'src/app/domain/model/scale/scale';
import { PianoOctaveComponent } from '../../shared/components/piano-octave/piano-octave.component';
import { ListAllScalesUseCase } from '../../../../application/usecase/list-all-scales/list-all-scales.usecase';
import { Router } from '@angular/router';
import packageJson from '../../../../../../package.json';

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
    IonIcon,
    AsyncPipe,
    PianoOctaveComponent,
  ],
})
export class MainPageComponent implements OnInit {
  public version: string = packageJson.version;
  public scales$: Observable<Scale[]> = of([]);

  public constructor(
    private readonly listAllScalesUseCase: ListAllScalesUseCase,
    private readonly router: Router
  ) {
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
    const sortedNotes = this.sortNotes(scale.notes);
    return sortedNotes.map(n => n.name).join(' - ');
  }

  private sortNotes(notes: { index: number; name: string }[]): { index: number; name: string }[] {
    return [...notes].sort((a, b) => a.index - b.index);
  }

  public openScale(scale: Scale): void {
    this.router.navigate(['/scale', scale.tonic.name, scale.mode.name]);
  }
}
