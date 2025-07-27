import { firstValueFrom, from } from 'rxjs';
import { Scale, Note, Mode } from 'src/app/domain';
import { ScaleEntity } from '../entity/scale-entity';
import { db } from '../repository/scale-database';
import { ScaleRepositoryAdapter } from './scale-repository.adapter';

describe('ScaleRepositoryAdapter', () => {
  let repository: ScaleRepositoryAdapter;

  const scale = new Scale(Note.C, Mode.MAJOR);
  const scaleEntity: ScaleEntity = {
    id: `${scale.tonic.name}-${scale.mode.name}`,
    tonic: scale.tonic.name,
    mode: scale.mode.name,
    notes: scale.notes.map(n => n.name),
  };

  beforeEach(async () => {
    repository = new ScaleRepositoryAdapter();
    await db.scales.clear();
  });

  it('should save and return inserted scales', async () => {
    const result = await firstValueFrom(repository.saveAll([scale]));

    expect(result.length).toBe(1);
    expect(result[0].tonic.name).toBe(scale.tonic.name);
    expect(result[0].mode.name).toBe(scale.mode.name);
    expect(result[0].notes.map(n => n.name)).toEqual(scale.notes.map(n => n.name));
  });

  it('should return all stored scales', async () => {
    await firstValueFrom(from(db.scales.bulkPut([scaleEntity])));

    const result = await firstValueFrom(repository.getAll());

    expect(result.length).toBe(1);
    expect(result[0].tonic.name).toBe(scale.tonic.name);
    expect(result[0].mode.name).toBe(scale.mode.name);
  });

  it('should return scale by id', async () => {
    await firstValueFrom(from(db.scales.put(scaleEntity)));

    const result = await firstValueFrom(repository.getById(scaleEntity.id));

    expect(result).not.toBeNull();
    expect(result!.tonic.name).toBe(scale.tonic.name);
    expect(result!.mode.name).toBe(scale.mode.name);
  });

  it('should return null when id is not found', async () => {
    const result = await firstValueFrom(repository.getById('unknown-id'));

    expect(result).toBeNull();
  });
});
