import { Observable } from 'rxjs';
import { InjectionToken } from '@angular/core';
import { Scale } from 'src/app/domain';

export interface IScaleRepository {
  saveAll(scales: Scale[]): Observable<Scale[]>;
  getAll(): Observable<Scale[]>;
  getById(id: string): Observable<Scale | null>;
}

export const SCALE_REPOSITORY = new InjectionToken<IScaleRepository>('SCALE_REPOSITORY');