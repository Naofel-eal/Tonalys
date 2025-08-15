import { Component } from '@angular/core';
import { GenerateAllScalesUseCase } from '../../../application';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { chevronForwardOutline, musicalNotesOutline, chevronBackOutline, listOutline, star, handLeft, refresh, handLeftOutline, refreshOutline } from 'ionicons/icons';

@Component({
  selector: 'app-root',
  imports: [IonRouterOutlet, IonApp],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  public constructor(private readonly generateAllScales: GenerateAllScalesUseCase) {
    this.generateAllScales.execute();
    addIcons({ chevronForwardOutline, musicalNotesOutline, chevronBackOutline, listOutline, star, handLeft, refresh, handLeftOutline, refreshOutline });
  }
}
