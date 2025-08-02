import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { Scale } from './domain/model/scale/scale';
import { Observable, of } from 'rxjs';
import { GenerateAllScalesUseCase } from './application';
import { addIcons } from 'ionicons';
import { chevronForwardOutline, musicalNoteOutline } from 'ionicons/icons';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonRouterOutlet, IonApp],
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public scales: Observable<Scale[]> = of([]);

  public constructor(private readonly generateAllScales: GenerateAllScalesUseCase) {
    addIcons({ musicalNoteOutline, chevronForwardOutline });
    this.generateAllScales.execute();
  }
}
