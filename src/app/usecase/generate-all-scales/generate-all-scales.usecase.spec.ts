import { GenerateAllScalesUseCase } from './generate-all-scales.usecase';
import { Note } from 'src/app/domain/model/note';
import { Mode } from 'src/app/domain/model/mode';
import { ModeName } from 'src/app/domain/model/mode-name';
import { NoteName } from 'src/app/domain/model/note-name';

describe('GenerateAllScalesUseCase', () => {
  let useCase: GenerateAllScalesUseCase;

  beforeEach(() => {
    useCase = new GenerateAllScalesUseCase();
  });

  it('should generate a scale for every note and mode combination', () => {
    const result = useCase.execute();

    const expectedCount = Note.values.length * Mode.values.length;
    expect(result.length).toBe(expectedCount);
  });

  it('should generate scales with correct id format', () => {
    const result = useCase.execute();

    for (const scale of result) {
      expect(scale.id).toBe(`${scale.tonic}-${scale.mode}`);
    }
  });

  it('should contain correct notes for a known scale (C MAJOR)', () => {
    const result = useCase.execute();

    const cMajor = result.find(s => s.tonic === NoteName.C && s.mode === ModeName.MAJOR);
    expect(cMajor).toBeDefined();
    expect(cMajor!.notes).toEqual([NoteName.C, NoteName.D, NoteName.E, NoteName.F, NoteName.G, NoteName.A, NoteName.B]);
  });

  it('should not generate duplicate scale ids', () => {
    const result = useCase.execute();
    const ids = result.map(s => s.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });
});
