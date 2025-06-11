import { Scale } from 'src/app/domain/model/scale';
import { Note } from 'src/app/domain/model/note';
import { Mode } from 'src/app/domain/model/mode';
import { ScaleEntity } from '../entity/scale-entity';

export class ScaleMapper {
  public static fromDomain(scale: Scale): ScaleEntity {
    return {
      id: `${scale.tonic.name}-${scale.mode.name}`,
      tonic: scale.tonic.name,
      mode: scale.mode.name,
      notes: scale.notes.map(n => n.name),
    };
  }

  public static toDomain(entity: ScaleEntity): Scale {
    const tonic = Note.fromName(entity.tonic);
    const mode = Mode.fromName(entity.mode);
    return new Scale(tonic, mode);
  }
}
