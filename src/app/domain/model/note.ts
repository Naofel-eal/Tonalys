import { NoteName } from './note-name';

export class Note {
  private constructor(
    public readonly name: NoteName,
    public readonly index: number,
  ) {}

  static readonly C = new Note(NoteName.C, 0);
  static readonly C_SHARP = new Note(NoteName.C_SHARP, 1);
  static readonly D = new Note(NoteName.D, 2);
  static readonly D_SHARP = new Note(NoteName.D_SHARP, 3);
  static readonly E = new Note(NoteName.E, 4);
  static readonly F = new Note(NoteName.F, 5);
  static readonly F_SHARP = new Note(NoteName.F_SHARP, 6);
  static readonly G = new Note(NoteName.G, 7);
  static readonly G_SHARP = new Note(NoteName.G_SHARP, 8);
  static readonly A = new Note(NoteName.A, 9);
  static readonly A_SHARP = new Note(NoteName.A_SHARP, 10);
  static readonly B = new Note(NoteName.B, 11);

  static readonly values: Note[] = [
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

  static fromName(name: NoteName): Note {
    const note = Note.values.find((n) => n.name === name);
    if (!note) throw new Error(`Unknown note: ${name}`);
    return note;
  }

  equals(other: Note): boolean {
    return this.index === other.index;
  }
}
