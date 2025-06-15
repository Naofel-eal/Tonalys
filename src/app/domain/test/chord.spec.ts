import { Chord } from '../model/chord';
import { Note } from '../model/note';
import { NoteName } from '../model/note-name';
import { ChordQuality } from '../model/chord-quality';

describe('Chord', () => {
  it('should correctly compute notes of a C major chord', () => {
    const chord = new Chord(Note.fromName(NoteName.C), ChordQuality.MAJOR);
    const noteNames = chord.notes.map(n => n.name);
    expect(noteNames).toEqual([NoteName.C, NoteName.E, NoteName.G]);
  });

  it('should correctly compute notes of a D minor chord', () => {
    const chord = new Chord(Note.fromName(NoteName.D), ChordQuality.MINOR);
    const noteNames = chord.notes.map(n => n.name);
    expect(noteNames).toEqual([NoteName.D, NoteName.F, NoteName.A]);
  });

  it('should correctly wrap around the octave (e.g. B augmented)', () => {
    const chord = new Chord(Note.fromName(NoteName.B), ChordQuality.AUGMENTED);
    const noteNames = chord.notes.map(n => n.name);
    expect(noteNames).toEqual([NoteName.B, NoteName.D_SHARP, NoteName.G]);
  });

  it('should return exactly as many notes as intervals in the quality', () => {
    const chord = new Chord(Note.fromName(NoteName.G), ChordQuality.DOM7);
    expect(chord.notes).toHaveSize(4);
  });

  it('should return notes with correct indexes', () => {
    const chord = new Chord(Note.fromName(NoteName.F), ChordQuality.DIMINISHED);
    const indexes = chord.notes.map(n => n.index);
    expect(indexes).toEqual([5, 8, 11]);
  });
});
