import { ChordQualityName } from './chord-quality-name';

export class ChordQuality {
  private constructor(
    public readonly name: ChordQualityName,
    public readonly intervals: number[],
  ) {}

  static readonly MAJOR = new ChordQuality(ChordQualityName.MAJOR, [0, 4, 7]);
  static readonly MINOR = new ChordQuality(ChordQualityName.MINOR, [0, 3, 7]);
  static readonly DIMINISHED = new ChordQuality(ChordQualityName.DIMINISHED, [0, 3, 6]);
  static readonly AUGMENTED = new ChordQuality(ChordQualityName.AUGMENTED, [0, 4, 8]);
  static readonly DOM7 = new ChordQuality(ChordQualityName.DOM7, [0, 4, 7, 10]);
  static readonly MAJ7 = new ChordQuality(ChordQualityName.MAJ7, [0, 4, 7, 11]);
  static readonly MIN7 = new ChordQuality(ChordQualityName.MIN7, [0, 3, 7, 10]);

  static readonly values: ChordQuality[] = [
    ChordQuality.MAJOR,
    ChordQuality.MINOR,
    ChordQuality.DIMINISHED,
    ChordQuality.AUGMENTED,
    ChordQuality.DOM7,
    ChordQuality.MAJ7,
    ChordQuality.MIN7,
  ];

  static fromName(name: ChordQualityName): ChordQuality {
    const type = ChordQuality.values.find((t) => t.name === name);
    if (!type) throw new Error(`Unknown chord type: ${name}`);
    return type;
  }
}
