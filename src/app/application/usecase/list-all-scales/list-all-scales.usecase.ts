import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Scale } from 'src/app/domain';
import { ScaleStoreService } from '../../service/scale-store.service';

@Injectable({providedIn: 'root'})
export class ListAllScalesUseCase {
  constructor(private readonly scaleStore: ScaleStoreService) {}

  public execute(): Observable<Scale[]> {
    return this.scaleStore.scales$;
  }
}
