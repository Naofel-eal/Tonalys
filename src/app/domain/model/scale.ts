import { Note } from './note';
import { Mode } from './mode';
import { Chord } from './chord';

export class Scale {
  constructor(
    public readonly tonic: Note,
    public readonly mode: Mode,
  ) {}

  get notes(): Note[] {
    return this.mode.intervals.map((interval) => {
      const idx = (this.tonic.index + interval) % Note.values.length;
      return Note.values[idx];
    });
  }

  containsChord(chord: Chord): boolean {
    return chord.notes.every((note) =>
      this.notes.some((scaleNote) => scaleNote.equals(note)),
    );
  }
}
