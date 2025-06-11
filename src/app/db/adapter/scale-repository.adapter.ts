import { Injectable } from '@angular/core';
import { Scale } from 'src/app/domain/model/scale';
import { ScaleMapper } from '../mapper/scale-mapper';
import { from, Observable, map, switchMap } from 'rxjs';
import { IScaleRepository } from 'src/app/application/repository/scale.repository';
import { scaleDb } from '../repository/scale-database';
import { ScaleEntity } from '../entity/scale-entity';

@Injectable({
    providedIn: 'root'
})
export class ScaleRepositoryAdapter implements IScaleRepository {

    public saveAll(scales: Scale[]): Observable<Scale[]> {
        const entities = scales.map(ScaleMapper.fromDomain);
        const ids = entities.map(e => e.id);

        return from(scaleDb.scales.bulkPut(entities)).pipe(
            switchMap(() => from(scaleDb.scales.bulkGet(ids))),
            map(entities => entities.filter(Boolean) as ScaleEntity[]),
            map(entities => entities.map(ScaleMapper.toDomain))
        );
    }


    public getAll(): Observable<Scale[]> {
        return from(scaleDb.scales.toArray()).pipe(
            map(entities => entities.map(ScaleMapper.toDomain))
        );
    }

    public getById(id: string): Observable<Scale | null> {
        return from(scaleDb.scales.get(id)).pipe(
            map(entity => entity ? ScaleMapper.toDomain(entity) : null)
        );
    }
}
