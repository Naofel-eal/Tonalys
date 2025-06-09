import { ChordQuality } from '../model/chord-quality';
import { ChordQualityName } from '../model/chord-quality-name';

describe('ChordQuality', () => {
  it('should expose all known chord qualities in values()', () => {
    expect(ChordQuality.values.length).toBe(7);
    expect(ChordQuality.values.map(q => q.name)).toEqual([
      ChordQualityName.MAJOR,
      ChordQualityName.MINOR,
      ChordQualityName.DIMINISHED,
      ChordQualityName.AUGMENTED,
      ChordQualityName.DOM7,
      ChordQualityName.MAJ7,
      ChordQualityName.MIN7,
    ]);
  });

  it('should expose correct intervals for each chord quality', () => {
    expect(ChordQuality.MAJOR.intervals).toEqual([0, 4, 7]);
    expect(ChordQuality.MINOR.intervals).toEqual([0, 3, 7]);
    expect(ChordQuality.DIMINISHED.intervals).toEqual([0, 3, 6]);
    expect(ChordQuality.AUGMENTED.intervals).toEqual([0, 4, 8]);
    expect(ChordQuality.DOM7.intervals).toEqual([0, 4, 7, 10]);
    expect(ChordQuality.MAJ7.intervals).toEqual([0, 4, 7, 11]);
    expect(ChordQuality.MIN7.intervals).toEqual([0, 3, 7, 10]);
  });

  it('fromName should return correct instance for a valid name', () => {
    expect(ChordQuality.fromName(ChordQualityName.MAJOR)).toBe(ChordQuality.MAJOR);
    expect(ChordQuality.fromName(ChordQualityName.MIN7)).toBe(ChordQuality.MIN7);
  });

  it('fromName should throw an error for an invalid name', () => {
    expect(() => ChordQuality.fromName('INVALID' as unknown as ChordQualityName)).toThrowError(/Unknown chord type/);
  });
});
