import { ModeName } from './mode-name';

export class Mode {
  private constructor(
    public readonly name: ModeName,
    public readonly intervals: number[],
  ) {}

  static readonly MAJOR = new Mode(ModeName.MAJOR, [0, 2, 4, 5, 7, 9, 11]);
  static readonly MINOR = new Mode(ModeName.MINOR, [0, 2, 3, 5, 7, 8, 10]);
  static readonly DORIAN = new Mode(ModeName.DORIAN, [0, 2, 3, 5, 7, 9, 10]);

  static readonly values: Mode[] = [Mode.MAJOR, Mode.MINOR, Mode.DORIAN];

  static fromName(name: ModeName): Mode {
    const mode = Mode.values.find((m) => m.name === name);
    if (!mode) throw new Error(`Unknown mode: ${name}`);
    return mode;
  }
}
