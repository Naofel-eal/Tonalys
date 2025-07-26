import { Note } from "./note";
import { NoteName } from "./note-name";

export abstract class Key {
  private static readonly BLACK_NOTE_NAMES = new Set<NoteName>([
    NoteName.C_SHARP,
    NoteName.D_SHARP,
    NoteName.F_SHARP,
    NoteName.G_SHARP,
    NoteName.A_SHARP,
  ]);

  protected constructor(
    public readonly note: Note,
    public readonly index: number,
    public readonly octave: number,
  ) {}

  public abstract get isBlackKey(): boolean;

  public static create(note: Note, index: number, octave: number): Key {
    return Key.BLACK_NOTE_NAMES.has(note.name)
      ? new BlackKey(note, index, octave)
      : new WhiteKey(note, index, octave);
  }
}

export class WhiteKey extends Key {
  public override get isBlackKey(): boolean { return false; }
}

export class BlackKey extends Key {
  public override get isBlackKey(): boolean { return true; }
}
