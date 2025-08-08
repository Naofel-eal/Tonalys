import { Chord } from "../chord/chord";
import { ChordQuality } from "../chord/chord-quality";
import { Mode } from "../mode/mode";
import { Note } from "../note/note";

export class Scale {
  public readonly notes: Note[];
  public readonly chords: Chord[];
  
  public constructor(
    public readonly tonic: Note,
    public readonly mode: Mode,
  ) {
    this.notes = this.computeNotes();
    this.chords = this.computeChords();
  }

  private computeNotes(): Note[] {
    const notes = this.mode.intervals.map((interval) => {
      const idx = (this.tonic.index + interval) % Note.values.length;
      return Note.values[idx];
    });
    return Note.sort(notes);
  }

  private computeChords(): Chord[] {
    const chords: Chord[] = [];
     this.notes.forEach(note => {
      ChordQuality.values.forEach(quality => {
        const chord = new Chord(note, quality);
        if (this.containsChord(chord)) chords.push(chord);
      });
    });
    return chords;
  }

  public containsChord(chord: Chord): boolean {
    return chord.notes.every((note) =>
      this.notes.some((scaleNote) => scaleNote.equals(note)),
    );
  }

  public static sort(scales: Scale[]) {
    return [...scales].sort((a, b) => a.tonic.index - b.tonic.index || a.mode.name.localeCompare(b.mode.name));
  }
}
