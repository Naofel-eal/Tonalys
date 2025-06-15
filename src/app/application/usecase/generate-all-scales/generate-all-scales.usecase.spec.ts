import { of } from 'rxjs';
import { GenerateAllScalesUseCase } from './generate-all-scales.usecase';
import { IScaleRepository } from '../../repository/scale.repository';
import { Note } from 'src/app/domain/model/note';
import { Mode } from 'src/app/domain/model/mode';
import { NoteName } from 'src/app/domain/model/note-name';
import { ModeName } from 'src/app/domain/model/mode-name';
import { Scale } from 'src/app/domain/model/scale';

describe('GenerateAllScalesUseCase', () => {
  let useCase: GenerateAllScalesUseCase;
  let mockRepository: jasmine.SpyObj<IScaleRepository>;

  beforeEach(() => {
    mockRepository = jasmine.createSpyObj<IScaleRepository>('IScaleRepository', ['saveAll']);
    useCase = new GenerateAllScalesUseCase(mockRepository);
  });

  it('should generate a scale for every note and mode combination and save them', (done) => {
    const expectedScales = Note.values.flatMap(note =>
      Mode.values.map(mode => new Scale(note, mode))
    );

    mockRepository.saveAll.and.returnValue(of(expectedScales));

    useCase.execute().subscribe((scales) => {
      expect(scales.length).toBe(expectedScales.length);
      expect(mockRepository.saveAll).toHaveBeenCalledWith(jasmine.any(Array));
      done();
    });
  });

  it('should contain correct notes for C Major', (done) => {
    const expectedScales = Note.values.flatMap(note =>
      Mode.values.map(mode => new Scale(note, mode))
    );

    mockRepository.saveAll.and.returnValue(of(expectedScales));

    useCase.execute().subscribe((scales) => {
      const cMajor = scales.find(s => s.tonic.name === NoteName.C && s.mode.name === ModeName.MAJOR);
      expect(cMajor).toBeDefined();
      expect(cMajor!.notes.map(n => n.name)).toEqual([
        NoteName.C,
        NoteName.D,
        NoteName.E,
        NoteName.F,
        NoteName.G,
        NoteName.A,
        NoteName.B,
      ]);
      done();
    });
  });

  it('should not generate duplicate scale ids', (done) => {
    const expectedScales = Note.values.flatMap(note =>
      Mode.values.map(mode => new Scale(note, mode))
    );

    mockRepository.saveAll.and.returnValue(of(expectedScales));

    useCase.execute().subscribe((scales) => {
      const ids = scales.map(s => `${s.tonic.name}-${s.mode.name}`);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(ids.length);
      done();
    });
  });
});
