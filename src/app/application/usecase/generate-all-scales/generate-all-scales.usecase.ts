import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Scale } from 'src/app/domain';
import { ScaleStoreService } from '../../service/scale-store.service';

@Injectable({providedIn: 'root'})
export class GenerateAllScalesUseCase {
  constructor(private readonly store: ScaleStoreService) {}

  public execute(): Observable<Scale[]> {
    this.store.init();
    return this.store.scales$;
  }
}
