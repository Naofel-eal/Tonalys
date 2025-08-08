import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ScaleStoreService } from '../../service/scale-store/scale-store.service';
import { Scale } from '../../../domain';

@Injectable({providedIn: 'root'})
export class ListAllScalesUseCase {
  constructor(private readonly scaleStore: ScaleStoreService) {}

  public execute(): Observable<Scale[]> {
    return this.scaleStore.scales$.pipe(map(scales => Scale.sort(scales)));
  }
}
