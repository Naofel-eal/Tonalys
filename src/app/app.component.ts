import { Component, OnInit } from '@angular/core';
import { GenerateAllScalesUseCase } from './application/usecase/generate-all-scales/generate-all-scales.usecase';
import { addIcons } from 'ionicons';
import { triangle, ellipse, square } from "ionicons/icons";
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { Scale } from './domain/model/scale';
import { Observable } from 'rxjs';

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
  public constructor(
    private readonly generateScalesUseCase: GenerateAllScalesUseCase,
  ) {
    addIcons({ triangle, ellipse, square });
  }

  public ngOnInit(): void {
    const scales: Observable<Scale[]> = this.generateScalesUseCase.execute();
    scales.subscribe((storedScales) => console.log('✅ Scales saved and fetched:', storedScales));
  }
}
