import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ListAllScalesUseCase } from '../../../application';
import { Scale } from '../../../domain';
import { RouterLink } from '@angular/router';
import { PianoOctaveComponent } from '../piano-octave/piano-octave.component';
import { AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  imports: [RouterLink, PianoOctaveComponent, AsyncPipe]
})
export class MainComponent implements OnInit {
  public scales$: Observable<Scale[]> = of([]);

  public constructor(
    private readonly listAllScalesUseCase: ListAllScalesUseCase,
  ) {
  }

  public ngOnInit(): void {    
    this.scales$ = this.listAllScalesUseCase.execute();
  }
}
