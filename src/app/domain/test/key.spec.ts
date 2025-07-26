import { Key, WhiteKey, BlackKey } from "../model/key";
import { Note } from "../model/note";
import { NoteName } from "../model/note-name";

describe('Key', () => {

  it('should create a WhiteKey for a natural note', () => {
    const note = Note.fromName(NoteName.C);
    const key = Key.create(note, 0, 0);
    expect(key).toBeInstanceOf(WhiteKey);
    expect(key.isBlackKey).toBeFalse();
    expect(key.note).toBe(note);
    expect(key.index).toBe(0);
    expect(key.octave).toBe(0);
  });

  it('should create a BlackKey for a sharp note', () => {
    const note = Note.fromName(NoteName.C_SHARP);
    const key = Key.create(note, 1, 0);
    expect(key).toBeInstanceOf(BlackKey);
    expect(key.isBlackKey).toBeTrue();
    expect(key.note).toBe(note);
    expect(key.index).toBe(1);
    expect(key.octave).toBe(0);
  });

  it('should correctly distinguish all white and black keys', () => {
    for (const note of Note.values) {
      const key = Key.create(note, note.index, 0);
      if (
        note.name === NoteName.C_SHARP ||
        note.name === NoteName.D_SHARP ||
        note.name === NoteName.F_SHARP ||
        note.name === NoteName.G_SHARP ||
        note.name === NoteName.A_SHARP
      ) {
        expect(key).toBeInstanceOf(BlackKey);
        expect(key.isBlackKey).toBeTrue();
      } else {
        expect(key).toBeInstanceOf(WhiteKey);
        expect(key.isBlackKey).toBeFalse();
      }
    }
  });

  it('should preserve octave and index properties', () => {
    const note = Note.fromName(NoteName.F_SHARP);
    const key = Key.create(note, 13, 2);
    expect(key.octave).toBe(2);
    expect(key.index).toBe(13);
  });

  it('WhiteKey.isBlackKey should always be false', () => {
    const note = Note.fromName(NoteName.E);
    const key = Key.create(note, 5, 1);
    expect(key.isBlackKey).toBeFalse();
  });

  it('BlackKey.isBlackKey should always be true', () => {
    const note = Note.fromName(NoteName.A_SHARP);
    const key = Key.create(note, 10, 1);
    expect(key.isBlackKey).toBeTrue();
  });

});
