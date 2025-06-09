import { Note } from './note';
import { ChordQuality } from './chord-quality';

export class Chord {
  constructor(
    public readonly root: Note,
    public readonly type: ChordQuality,
  ) {}

  get notes(): Note[] {
    return this.type.intervals.map((interval) => {
      const idx = (this.root.index + interval) % Note.values.length;
      return Note.values[idx];
    });
  }
}
