import { Component, OnInit } from '@angular/core';
import { GenerateAllScalesUseCase } from './usecase/generate-all-scales/generate-all-scales.usecase';
import { ScaleEntity } from './entity/scale-entity';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent implements OnInit {
  constructor(
    private readonly generateScalesUseCase: GenerateAllScalesUseCase
  ) {}

  ngOnInit(): void {
    const scales: ScaleEntity[] = this.generateScalesUseCase.execute();
    console.log('✅ Scales:', scales);
  }
}
