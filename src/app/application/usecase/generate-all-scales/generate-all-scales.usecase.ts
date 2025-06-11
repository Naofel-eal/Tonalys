import { Inject, Injectable } from '@angular/core';
import { Note } from 'src/app/domain/model/note';
import { Mode } from 'src/app/domain/model/mode';
import { Scale } from 'src/app/domain/model/scale';
import { Observable } from 'rxjs';
import { IScaleRepository, SCALE_REPOSITORY } from '../../repository/scale.repository';

@Injectable({
  providedIn: 'root'
})
export class GenerateAllScalesUseCase {
  constructor(
    @Inject(SCALE_REPOSITORY) private readonly scaleRepository: IScaleRepository
  ) {}

  public execute(): Observable<Scale[]> {
    const scales: Scale[] = [];

    Note.values.forEach(note =>
      Mode.values.forEach(mode =>
      scales.push(new Scale(note, mode))
      )
    );

    return this.scaleRepository.saveAll(scales);
  }
}
