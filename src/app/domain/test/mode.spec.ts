import { Mode, ModeName } from 'src/app/domain';

describe('Mode', () => {
  it('should expose all defined modes in .values', () => {
    expect(Mode.values.length).toBe(2);
  });

  it('should expose correct intervals for MAJOR mode', () => {
    expect(Mode.MAJOR.intervals).toEqual([0, 2, 4, 5, 7, 9, 11]);
  });

  it('should expose correct intervals for MINOR mode', () => {
    expect(Mode.MINOR.intervals).toEqual([0, 2, 3, 5, 7, 8, 10]);
  });

  it('should expose correct intervals for DORIAN mode', () => {
    expect(Mode.DORIAN.intervals).toEqual([0, 2, 3, 5, 7, 9, 10]);
  });

  it('fromName should return correct instance for each mode name', () => {
    expect(Mode.fromName(ModeName.MAJOR)).toBe(Mode.MAJOR);
    expect(Mode.fromName(ModeName.MINOR)).toBe(Mode.MINOR);
  });

  it('fromName should throw error for invalid mode name', () => {
    expect(() => Mode.fromName('INVALID' as unknown as ModeName)).toThrowError(/Unknown mode/);
  });
});
