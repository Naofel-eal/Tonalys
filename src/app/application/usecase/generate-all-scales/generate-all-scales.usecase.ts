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
    const scales = Note.values.flatMap(note =>
      Mode.values.map(mode => new Scale(note, mode))
    );
    return this.scaleRepository.saveAll(scales);
  }
}
