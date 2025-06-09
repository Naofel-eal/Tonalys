import { Scale } from '../model/scale';
import { Note } from '../model/note';
import { NoteName } from '../model/note-name';
import { Mode } from '../model/mode';
import { Chord } from '../model/chord';
import { ChordQuality } from '../model/chord-quality';

describe('Scale', () => {
  it('should compute the correct notes for C Major scale', () => {
    const scale = new Scale(Note.fromName(NoteName.C), Mode.MAJOR);
    const noteNames = scale.notes.map(n => n.name);

    expect(noteNames).toEqual([
      NoteName.C,
      NoteName.D,
      NoteName.E,
      NoteName.F,
      NoteName.G,
      NoteName.A,
      NoteName.B,
    ]);
  });

  it('should compute the correct notes for A Minor scale', () => {
    const scale = new Scale(Note.fromName(NoteName.A), Mode.MINOR);
    const noteNames = scale.notes.map(n => n.name);

    expect(noteNames).toEqual([
      NoteName.A,
      NoteName.B,
      NoteName.C,
      NoteName.D,
      NoteName.E,
      NoteName.F,
      NoteName.G,
    ]);
  });

  it('should return true if a chord is fully included in the scale', () => {
    const scale = new Scale(Note.fromName(NoteName.C), Mode.MAJOR);
    const chord = new Chord(Note.fromName(NoteName.G), ChordQuality.MAJOR);

    expect(scale.containsChord(chord)).toBe(true);
  });

  it('should return false if a chord is not included in the scale', () => {
    const scale = new Scale(Note.fromName(NoteName.C), Mode.MAJOR);
    const chord = new Chord(Note.fromName(NoteName.G_SHARP), ChordQuality.MAJOR);

    expect(scale.containsChord(chord)).toBe(false);
  });

  it('should wrap notes correctly around the octave', () => {
    const scale = new Scale(Note.fromName(NoteName.B), Mode.MAJOR);
    const noteNames = scale.notes.map(n => n.name);

    expect(noteNames).toEqual([
      NoteName.B,
      NoteName.C_SHARP,
      NoteName.D_SHARP,
      NoteName.E,
      NoteName.F_SHARP,
      NoteName.G_SHARP,
      NoteName.A_SHARP,
    ]);
  });
});
