import { Component } from '@angular/core';
import { GenerateAllScalesUseCase } from '../../../application';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';

@Component({
  selector: 'app-root',
  imports: [IonRouterOutlet, IonApp],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  public constructor(private readonly generateAllScales: GenerateAllScalesUseCase) {
    this.generateAllScales.execute();
  }
}
