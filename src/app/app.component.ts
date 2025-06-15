import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { musicalNoteOutline } from 'ionicons/icons';
import { Scale } from './domain/model/scale';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonRouterOutlet, 
    IonApp
  ],
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public scales: Observable<Scale[]> = of([]);

  public constructor() {
    addIcons({ musicalNoteOutline });
  }
}
