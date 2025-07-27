import { Injectable } from '@angular/core';
import { from, Observable, map, switchMap } from 'rxjs';
import { IScaleRepository } from 'src/app/application';
import { Scale } from 'src/app/domain';
import { ScaleEntity } from '../entity/scale-entity';
import { ScaleMapper } from '../mapper/scale-mapper';
import { db } from '../repository/scale-database';

@Injectable({providedIn: 'root'})
export class ScaleRepositoryAdapter implements IScaleRepository {

    public saveAll(scales: Scale[]): Observable<Scale[]> {
        const entities = scales.map(ScaleMapper.fromDomain);
        const ids = entities.map(e => e.id);

        return from(db.scales.bulkPut(entities)).pipe(
            switchMap(() => from(db.scales.bulkGet(ids))),
            map(entities => entities.filter(Boolean) as ScaleEntity[]),
            map(entities => entities.map(ScaleMapper.toDomain))
        );
    }

    public getAll(): Observable<Scale[]> {
        return from(db.scales.toArray()).pipe(
            map(entities => entities.map(ScaleMapper.toDomain))
        );
    }

    public getById(id: string): Observable<Scale | null> {
        return from(db.scales.get(id)).pipe(
            map(entity => entity ? ScaleMapper.toDomain(entity) : null)
        );
    }
}
