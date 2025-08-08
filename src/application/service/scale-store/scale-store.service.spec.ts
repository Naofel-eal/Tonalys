import { fakeAsync, flushMicrotasks } from '@angular/core/testing';
import { BehaviorSubject, of } from 'rxjs';
import { ScaleStoreService } from './scale-store.service';
import { IScaleRepository } from '../../repository/scale.repository';
import { Mode, Note, Scale } from 'src/app/domain';

describe('ScaleStoreService', () => {
  let store: ScaleStoreService;
  let repository: jasmine.SpyObj<IScaleRepository>;
  let getAllSubject: BehaviorSubject<Scale[]>;
  let saveAllSpy: jasmine.Spy;

  beforeEach(() => {
    getAllSubject = new BehaviorSubject<Scale[]>([]);
    repository = jasmine.createSpyObj<IScaleRepository>('IScaleRepository', ['getAll', 'saveAll']);
    repository.getAll.and.returnValue(getAllSubject.asObservable());
    repository.saveAll.and.callFake((scales: Scale[]) => of(scales));

    store = new ScaleStoreService(repository);
  });

  it('should emit scales from repository.getAll() on init if not empty', fakeAsync(() => {
    const scales: Scale[] = [new Scale(Note.C, Mode.MAJOR)];
    getAllSubject.next(scales);

    let result: Scale[] | undefined;
    store.scales$.subscribe(v => result = v);

    store.init();
    flushMicrotasks();

    expect(result).toEqual(scales);
    expect(repository.getAll).toHaveBeenCalledTimes(1);
  }));

  it('should call generateAll and emit generated scales if repository.getAll() is empty', fakeAsync(() => {
    const generated: Scale[] = [new Scale(Note.C, Mode.MAJOR), new Scale(Note.D, Mode.MINOR)];
    repository.saveAll.and.returnValue(of(generated));

    let emitted: Scale[] | undefined;
    store.scales$.subscribe(v => emitted = v);

    store.init();
    flushMicrotasks();

    expect(emitted).toEqual(generated);
    expect(repository.saveAll).toHaveBeenCalledTimes(1);
  }));

  it('should not call repository.getAll or emit again if already initialized', () => {
    store['initialized'] = true;
    store.init();
    expect(repository.getAll).not.toHaveBeenCalled();
  });

  it('should emit new scales when refresh is called', fakeAsync(() => {
    const refreshed: Scale[] = [new Scale(Note.C, Mode.MAJOR)];
    repository.getAll.and.returnValue(of(refreshed));

    let result: Scale[] | undefined;
    store.scales$.subscribe(v => result = v);

    store.refresh();
    flushMicrotasks();

    expect(result).toEqual(refreshed);
    expect(repository.getAll).toHaveBeenCalledTimes(1);
  }));

  it('generateAll should save and emit new scales', fakeAsync(() => {
    const generated: Scale[] = [new Scale(Note.C, Mode.MAJOR)];
    repository.saveAll.and.returnValue(of(generated));

    let result: Scale[] | undefined;
    store.scales$.subscribe(v => result = v);

    store.generateAll().subscribe();
    flushMicrotasks();

    expect(result).toEqual(generated);
    expect(repository.saveAll).toHaveBeenCalledTimes(1);
  }));
});
