import { ScaleMapper } from './scale-mapper';
import { Note } from 'src/app/domain/model/note';
import { Mode } from 'src/app/domain/model/mode';
import { Scale } from 'src/app/domain/model/scale';
import { ScaleEntity } from '../entity/scale-entity';
import { NoteName } from 'src/app/domain/model/note-name';
import { ModeName } from 'src/app/domain/model/mode-name';

describe('ScaleMapper', () => {
  const scale = new Scale(Note.C, Mode.MAJOR);

  it('should map from domain to entity', () => {
    const entity = ScaleMapper.fromDomain(scale);

    expect(entity.id).toBe('C-Major');
    expect(entity.tonic).toBe(NoteName.C);
    expect(entity.mode).toBe(ModeName.MAJOR);
    expect(entity.notes).toEqual([
      NoteName.C,
      NoteName.D,
      NoteName.E,
      NoteName.F,
      NoteName.G,
      NoteName.A,
      NoteName.B
    ]);
  });

  it('should map from entity to domain', () => {
    const entity: ScaleEntity = {
      id: 'C-Major',
      tonic: NoteName.C,
      mode: ModeName.MAJOR,
      notes: [
        NoteName.C,
        NoteName.D,
        NoteName.E,
        NoteName.F,
        NoteName.G,
        NoteName.A,
        NoteName.B
      ]
    };

    const mapped = ScaleMapper.toDomain(entity);

    expect(mapped.tonic.name).toBe(NoteName.C);
    expect(mapped.mode.name).toBe(ModeName.MAJOR);
    expect(mapped.notes.map(n => n.name)).toEqual(entity.notes);
  });
});
