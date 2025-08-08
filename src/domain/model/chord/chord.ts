import { Note } from '../note/note';
import { ChordQuality } from './chord-quality';

export class Chord {
  public notes: Note[] = [];

  public constructor(
    public readonly root: Note,
    public readonly quality: ChordQuality,
  ) {
    this.computeNotes();
  }

  private computeNotes(): void {
    this.notes = this.quality.intervals.map((interval) => {
      const idx = (this.root.index + interval) % Note.values.length;
      return Note.values[idx];
    });
  }
}
