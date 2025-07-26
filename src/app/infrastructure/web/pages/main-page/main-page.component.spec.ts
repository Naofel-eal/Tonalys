import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MainPageComponent } from './main-page.component';
import { ListAllScalesUseCase } from 'src/app/application/usecase/list-all-scales/list-all-scales.usecase';
import { Scale } from 'src/app/domain/model/scale';
import { of } from 'rxjs';
import { IonicModule } from '@ionic/angular';
import { Mode, Note, NoteName } from 'src/app/domain';

const fakeScale: Scale = {
  tonic: { name: NoteName.C } as Note,
  mode: Mode.MAJOR,
  notes: [
    { name: NoteName.C } as Note,
    { name: NoteName.D } as Note,
    { name: NoteName.E } as Note,
    { name: NoteName.F } as Note,
    { name: NoteName.G } as Note,
    { name: NoteName.A } as Note,
    { name: NoteName.B } as Note,
  ],
} as Scale;

describe('MainPageComponent', () => {
  let component: MainPageComponent;
  let fixture: ComponentFixture<MainPageComponent>;
  let listAllScalesUseCaseSpy: jasmine.SpyObj<ListAllScalesUseCase>;

  beforeEach(waitForAsync(() => {
    const spy = jasmine.createSpyObj('ListAllScalesUseCase', ['execute']);

    TestBed.configureTestingModule({
      imports: [IonicModule.forRoot()],
      providers: [{ provide: ListAllScalesUseCase, useValue: spy }],
    }).compileComponents();

    listAllScalesUseCaseSpy = TestBed.inject(
      ListAllScalesUseCase
    ) as jasmine.SpyObj<ListAllScalesUseCase>;

    listAllScalesUseCaseSpy.execute.and.returnValue(of([fakeScale]));

    fixture = TestBed.createComponent(MainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('Given the component is created, Then it should instantiate properly', () => {
    expect(component).toBeTruthy();
  });

  it('Given ngOnInit, When usecase is executed, Then it should assign scales observable', (done) => {
    component.scales$.subscribe((scales) => {
      expect(scales.length).toBe(1);
      expect(scales[0].tonic.name).toBe('C');
      done();
    });
  });

  it('Given a scale, When getScalesNotes is called, Then it should return the correct notes string', () => {
    const result = component.getScalesNotesRepresentation(fakeScale);
    expect(result).toBe('C - D - E - F - G - A - B');
  });

  it('should return scales sorted by tonic index then mode name', (done) => {
    const scales: Scale[] = [
      { tonic: { name: NoteName.D, index: 2 } as Note, mode: Mode.MAJOR, notes: [] } as unknown as Scale,
      { tonic: { name: NoteName.C, index: 0 } as Note, mode: Mode.MINOR, notes: [] } as unknown as Scale,
      { tonic: { name: NoteName.C, index: 0 } as Note, mode: Mode.MAJOR, notes: [] } as unknown as Scale,
      { tonic: { name: NoteName.C_SHARP, index: 1 } as Note, mode: Mode.DORIAN, notes: [] } as unknown as Scale,
      { tonic: { name: NoteName.D, index: 2 } as Note, mode: Mode.DORIAN, notes: [] } as unknown as Scale,
    ];

    const component = new MainPageComponent({} as any);
    (component as any).scales$ = of(scales);

    component.sortedScales$.subscribe(sorted => {
      expect(sorted.map(s => s.tonic.name)).toEqual([
        Note.C.name,
        Note.C.name,
        Note.C_SHARP.name,
        Note.D.name,
        Note.D.name
      ]);
      done();
    });
  });
});
