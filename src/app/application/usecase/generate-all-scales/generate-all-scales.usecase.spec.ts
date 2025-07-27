import { BehaviorSubject } from 'rxjs';
import { GenerateAllScalesUseCase } from './generate-all-scales.usecase';
import { ScaleStoreService } from '../../service/scale-store.service';
import { Scale, Note, Mode, NoteName, ModeName } from 'src/app/domain';

describe('GenerateAllScalesUseCase', () => {
  let useCase: GenerateAllScalesUseCase;
  let store: jasmine.SpyObj<ScaleStoreService>;
  let scalesSubject: BehaviorSubject<Scale[]>;

  beforeEach(() => {
    scalesSubject = new BehaviorSubject<Scale[]>([]);

    store = jasmine.createSpyObj<ScaleStoreService>('ScaleStoreService', ['init'], { scales$: scalesSubject.asObservable() });

    useCase = new GenerateAllScalesUseCase(store);
  });

  it('should call store.init and return scales$', (done) => {
    const expectedScales = Note.values.flatMap(note =>
      Mode.values.map(mode => new Scale(note, mode))
    );

    scalesSubject.next(expectedScales);

    useCase.execute().subscribe((scales) => {
      expect(store.init).toHaveBeenCalled();
      expect(scales).toEqual(expectedScales);
      done();
    });
  });

  it('should contain correct notes for C Major', (done) => {
    const expectedScales = Note.values.flatMap(note =>
      Mode.values.map(mode => new Scale(note, mode))
    );
    scalesSubject.next(expectedScales);

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
    scalesSubject.next(expectedScales);

    useCase.execute().subscribe((scales) => {
      const ids = scales.map(s => `${s.tonic.name}-${s.mode.name}`);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(ids.length);
      done();
    });
  });
});
