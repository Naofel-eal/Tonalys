import { Component, OnInit } from '@angular/core';
import { GenerateAllScalesUseCase } from './usecase/generate-all-scales/generate-all-scales.usecase';
import { ScaleEntity } from './entity/scale-entity';
import { addIcons } from 'ionicons';
import { triangle, ellipse, square } from "ionicons/icons";
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonApp, IonRouterOutlet } from '@ionic/angular/standalone';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [
    IonRouterOutlet, 
    IonApp, 
    IonTabs,
    IonTabBar,
    IonTabButton,
    IonIcon,
    IonLabel,
  ],
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private readonly generateScalesUseCase: GenerateAllScalesUseCase
  ) {
    addIcons({ triangle, ellipse, square });
  }

  ngOnInit(): void {
    const scales: ScaleEntity[] = this.generateScalesUseCase.execute();
    console.log('✅ Scales:', scales);
  }
}
