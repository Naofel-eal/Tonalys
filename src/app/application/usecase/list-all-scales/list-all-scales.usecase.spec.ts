import { TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { ListAllScalesUseCase } from './list-all-scales.usecase';
import { IScaleRepository, SCALE_REPOSITORY } from '../../repository/scale.repository';
import { Scale } from 'src/app/domain/model/scale';
import { Mode } from 'src/app/domain/model/mode';
import { Note } from 'src/app/domain/model/note';

class ScaleRepositoryStub implements IScaleRepository {
  saveAll(scales: Scale[]): Observable<Scale[]> {
    throw new Error('Method not implemented.');
  }
  getById(id: string): Observable<Scale | null> {
    throw new Error('Method not implemented.');
  }
  getAll(): Observable<Scale[]> {
    return of([]);
  }
}

describe('ListAllScalesUseCase', () => {
  let useCase: ListAllScalesUseCase;
  let scaleRepository: IScaleRepository;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ListAllScalesUseCase,
        { provide: SCALE_REPOSITORY, useClass: ScaleRepositoryStub }
      ]
    });
    useCase = TestBed.inject(ListAllScalesUseCase);
    scaleRepository = TestBed.inject(SCALE_REPOSITORY);
  });

  it('given_RepositoryReturnsEmptyArray_When_execute_Then_ReturnsEmptyArray', (done) => {
    spyOn(scaleRepository, 'getAll').and.returnValue(of([]));
    useCase.execute().subscribe(result => {
      expect(result).toEqual([]);
      done();
    });
  });

  it('given_RepositoryReturnsScales_When_execute_Then_ReturnsScales', (done) => {
    const scales: Scale[] = [
      new Scale(Note.C, Mode.MINOR),
      new Scale(Note.D, Mode.MAJOR),
    ];
    spyOn(scaleRepository, 'getAll').and.returnValue(of(scales));
    useCase.execute().subscribe(result => {
      expect(result).toEqual(scales);
      done();
    });
  });
});