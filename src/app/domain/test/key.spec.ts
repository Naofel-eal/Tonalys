import { Note, NoteName, Key } from 'src/app/domain';

describe('Key', () => {

  it('should create a Key for a natural note', () => {
    const note = Note.fromName(NoteName.C);
    const key = new Key(note, 0, 0);
    expect(key).toBeInstanceOf(Key);
    expect(key.isBlackKey).toBeFalse();
    expect(key.note).toBe(note);
    expect(key.index).toBe(0);
    expect(key.octave).toBe(0);
  });

  it('should create a BlackKey for a sharp note', () => {
    const note = Note.fromName(NoteName.C_SHARP);
    const key = new Key(note, 1, 0);
    expect(key.isBlackKey).toBeTrue();
    expect(key.note).toBe(note);
    expect(key.index).toBe(1);
    expect(key.octave).toBe(0);
  });

  it('should correctly distinguish all white and black keys', () => {
    for (const note of Note.values) {
      const key = new Key(note, note.index, 0);
      if (
        note.name === NoteName.C_SHARP ||
        note.name === NoteName.D_SHARP ||
        note.name === NoteName.F_SHARP ||
        note.name === NoteName.G_SHARP ||
        note.name === NoteName.A_SHARP
      ) {
        expect(key.isBlackKey).toBeTrue();
      } else {
        expect(key).toBeInstanceOf(Key);
        expect(key.isBlackKey).toBeFalse();
      }
    }
  });

  it('should preserve octave and index properties', () => {
    const note = Note.fromName(NoteName.F_SHARP);
    const key = new Key(note, 13, 2);
    expect(key.octave).toBe(2);
    expect(key.index).toBe(13);
  });

  it('Key.isBlackKey should always be false', () => {
    const note = Note.fromName(NoteName.E);
    const key = new Key(note, 5, 1);
    expect(key.isBlackKey).toBeFalse();
  });

  it('BlackKey.isBlackKey should always be true', () => {
    const note = Note.fromName(NoteName.A_SHARP);
    const key = new Key(note, 10, 1);
    expect(key.isBlackKey).toBeTrue();
  });

});
