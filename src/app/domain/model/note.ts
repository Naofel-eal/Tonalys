import { NoteName } from './note-name';

export class Note {
  private constructor(
    public readonly name: NoteName,
    public readonly index: number,
  ) {}

  public static readonly C = new Note(NoteName.C, 0);
  public static readonly C_SHARP = new Note(NoteName.C_SHARP, 1);
  public static readonly D = new Note(NoteName.D, 2);
  public static readonly D_SHARP = new Note(NoteName.D_SHARP, 3);
  public static readonly E = new Note(NoteName.E, 4);
  public static readonly F = new Note(NoteName.F, 5);
  public static readonly F_SHARP = new Note(NoteName.F_SHARP, 6);
  public static readonly G = new Note(NoteName.G, 7);
  public static readonly G_SHARP = new Note(NoteName.G_SHARP, 8);
  public static readonly A = new Note(NoteName.A, 9);
  public static readonly A_SHARP = new Note(NoteName.A_SHARP, 10);
  public static readonly B = new Note(NoteName.B, 11);

  public static readonly values: Note[] = [
    Note.C,
    Note.C_SHARP,
    Note.D,
    Note.D_SHARP,
    Note.E,
    Note.F,
    Note.F_SHARP,
    Note.G,
    Note.G_SHARP,
    Note.A,
    Note.A_SHARP,
    Note.B,
  ];

  public static fromName(name: NoteName): Note {
    const note = Note.values.find((n) => n.name === name);
    if (!note) throw new Error(`Unknown note: ${name}`);
    return note;
  }

  public equals(other: Note): boolean {
    return this.index === other.index;
  }
}
