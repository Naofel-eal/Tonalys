import { BehaviorSubject } from 'rxjs';
import { ListAllScalesUseCase } from './list-all-scales.usecase';
import { Scale } from 'src/app/domain/model/scale';
import { Mode } from 'src/app/domain/model/mode';
import { Note } from 'src/app/domain/model/note';
import { ScaleStoreService } from '../../service/scale-store.service';

describe('ListAllScalesUseCase', () => {
  let useCase: ListAllScalesUseCase;
  let mockStore: jasmine.SpyObj<ScaleStoreService>;
  let scalesSubject: BehaviorSubject<Scale[]>;

  beforeEach(() => {
    scalesSubject = new BehaviorSubject<Scale[]>([]);
    mockStore = jasmine.createSpyObj<ScaleStoreService>('ScaleStoreService', [], { scales$: scalesSubject.asObservable() });

    useCase = new ListAllScalesUseCase(mockStore);
  });

  it('should return empty array when store is empty', (done) => {
    useCase.execute().subscribe(result => {
      expect(result).toEqual([]);
      done();
    });
  });

  it('should return all scales when store has values', (done) => {
    const scales: Scale[] = [
      new Scale(Note.C, Mode.MINOR),
      new Scale(Note.D, Mode.MAJOR),
    ];
    scalesSubject.next(scales);

    useCase.execute().subscribe(result => {
      expect(result).toEqual(scales);
      done();
    });
  });
});
