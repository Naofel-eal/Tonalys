import { Chord } from "../chord/chord";
import { Mode } from "../mode/mode";
import { Note } from "../note/note";

export class Scale {
  public readonly notes: Note[];
  
  public constructor(
    public readonly tonic: Note,
    public readonly mode: Mode,
  ) {
    this.notes = this.computeNotes();
  }

  private computeNotes(): Note[] {
    return this.mode.intervals.map((interval) => {
      const idx = (this.tonic.index + interval) % Note.values.length;
      return Note.values[idx];
    });
  }

  public containsChord(chord: Chord): boolean {
    return chord.notes.every((note) =>
      this.notes.some((scaleNote) => scaleNote.equals(note)),
    );
  }
}
