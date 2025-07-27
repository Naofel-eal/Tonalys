import { Scale } from "src/app/domain";
import { Mode } from "src/app/domain/model/mode/mode";
import { Note } from "src/app/domain/model/note/note";
import { ScaleEntity } from "../entity/scale-entity";


export class ScaleMapper {
  public static fromDomain(scale: Scale): ScaleEntity {
    return {
      id: `${scale.tonic.name}-${scale.mode.name}`,
      tonic: scale.tonic.name,
      mode: scale.mode.name,
      notes: scale.notes.map(n => n.name),
      chords: scale.chords
    };
  }

  public static toDomain(entity: ScaleEntity): Scale {
    const tonic = Note.fromName(entity.tonic);
    const mode = Mode.fromName(entity.mode);
    return new Scale(tonic, mode);
  }
}
