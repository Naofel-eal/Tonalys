import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Scale } from 'src/app/domain';
import { SCALE_REPOSITORY, IScaleRepository } from '../../repository/scale.repository';

@Injectable({
  providedIn: 'root'
})
export class ListAllScalesUseCase {
  constructor(
    @Inject(SCALE_REPOSITORY) private readonly scaleRepository: IScaleRepository
  ) {}

  public execute(): Observable<Scale[]> {
    return this.scaleRepository.getAll();
  }
}
