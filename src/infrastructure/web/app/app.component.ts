import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GenerateAllScalesUseCase } from '../../../application';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  public constructor(private readonly generateAllScales: GenerateAllScalesUseCase) {
    this.generateAllScales.execute();
  }
}
