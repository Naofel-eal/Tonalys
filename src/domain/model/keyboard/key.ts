import { Note } from "../note/note";
import { NoteName } from "../note/note-name";

export class Key {
  private static readonly BLACK_NOTE_NAMES = new Set<NoteName>([
    NoteName.C_SHARP,
    NoteName.D_SHARP,
    NoteName.F_SHARP,
    NoteName.G_SHARP,
    NoteName.A_SHARP,
  ]);

  public constructor(
    public readonly note: Note,
    public readonly index: number,
    public readonly octave: number,
  ) {}

  public get isBlackKey(): boolean {
    return Key.BLACK_NOTE_NAMES.has(this.note.name);
  };
}
