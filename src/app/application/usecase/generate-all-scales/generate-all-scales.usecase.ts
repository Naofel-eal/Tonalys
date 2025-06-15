import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Scale, Note, Mode } from 'src/app/domain';
import { SCALE_REPOSITORY, IScaleRepository } from '../../repository/scale.repository';

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
