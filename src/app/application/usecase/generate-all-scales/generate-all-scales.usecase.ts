import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ScaleStoreService } from '../../service/scale-store/scale-store.service';
import { Scale } from '../../../domain';

@Injectable({providedIn: 'root'})
export class GenerateAllScalesUseCase {
  constructor(private readonly store: ScaleStoreService) {}

  public execute(): Observable<Scale[]> {
    this.store.init();
    return this.store.scales$;
  }
}
