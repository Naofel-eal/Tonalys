import { Injectable } from '@angular/core';
import { Mode } from 'src/app/domain/model/mode';
import { Note } from 'src/app/domain/model/note';
import { Scale } from 'src/app/domain/model/scale';
import { ScaleEntity } from 'src/app/entity/scale-entity';

@Injectable({
  providedIn: 'root'
})
export class GenerateAllScalesUseCase {

  constructor() {}

  public execute(): ScaleEntity[] {
    const scales: ScaleEntity[] = [];

    for (const note of Note.values) {
      for (const mode of Mode.values) {
        const scale = new Scale(note, mode);
        scales.push({
          id: `${note.name}-${mode.name}`,
          tonic: note.name,
          mode: mode.name,
          notes: scale.notes.map(n => n.name),
        });
      }
    }

    return scales;
  }
}

