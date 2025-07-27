import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MainPageComponent } from './main-page.component';
import { ListAllScalesUseCase } from 'src/app/application/usecase/list-all-scales/list-all-scales.usecase';
import { Scale } from 'src/app/domain/model/scale/scale';
import { of } from 'rxjs';
import { IonicModule } from '@ionic/angular';
import { Mode, Note, NoteName } from 'src/app/domain';
import { provideRouter } from '@angular/router';

function createScale(tonic: Note, mode: Mode, notes: Note[]): Scale {
  return { tonic, mode, notes } as Scale;
}

describe('MainPageComponent', () => {
  let component: MainPageComponent;
  let fixture: ComponentFixture<MainPageComponent>;
  let listAllScalesUseCaseSpy: jasmine.SpyObj<ListAllScalesUseCase>;

  const fakeScale: Scale = createScale(
    { name: NoteName.C, index: 0 } as Note,
    Mode.MAJOR,
    [
      { name: NoteName.C } as Note,
      { name: NoteName.D } as Note,
      { name: NoteName.E } as Note,
      { name: NoteName.F } as Note,
      { name: NoteName.G } as Note,
      { name: NoteName.A } as Note,
      { name: NoteName.B } as Note,
    ]
  );

  beforeEach(waitForAsync(() => {
    const spy = jasmine.createSpyObj<ListAllScalesUseCase>('ListAllScalesUseCase', ['execute']);

    TestBed.configureTestingModule({
      imports: [IonicModule.forRoot()],
      providers: [
        { provide: ListAllScalesUseCase, useValue: spy },
        provideRouter([])
      ],
    }).compileComponents();

    listAllScalesUseCaseSpy = TestBed.inject(
      ListAllScalesUseCase
    ) as jasmine.SpyObj<ListAllScalesUseCase>;

    listAllScalesUseCaseSpy.execute.and.returnValue(of([fakeScale]));

    fixture = TestBed.createComponent(MainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should instantiate the component', () => {
    expect(component).toBeTruthy();
  });

  it('should expose scales$ with sorted values from use case', (done) => {
    component.scales$.subscribe((scales: Scale[]) => {
      expect(scales.length).toBe(1);
      expect(scales[0].tonic.name).toBe(NoteName.C);
      done();
    });
  });

  it('should format notes as a string via getScalesNotesRepresentation', () => {
    const result = component.getScalesNotesRepresentation(fakeScale);
    expect(result).toBe('C - D - E - F - G - A - B');
  });

  it('should expose sorted scales when usecase returns multiple', (done) => {
    const unordered: Scale[] = [
      createScale({ name: NoteName.D, index: 2 } as Note, Mode.MAJOR, []),
      createScale({ name: NoteName.C, index: 0 } as Note, Mode.MINOR, []),
      createScale({ name: NoteName.C, index: 0 } as Note, Mode.MAJOR, []),
      createScale({ name: NoteName.C_SHARP, index: 1 } as Note, Mode.DORIAN, []),
      createScale({ name: NoteName.D, index: 2 } as Note, Mode.DORIAN, []),
    ];
    listAllScalesUseCaseSpy.execute.and.returnValue(of(unordered));

    fixture = TestBed.createComponent(MainPageComponent);
    component = fixture.componentInstance;
    component.ngOnInit();

    component.scales$.subscribe(sorted => {
      expect(sorted.map(s => s.tonic.name)).toEqual([
        NoteName.C,
        NoteName.C,
        NoteName.C_SHARP,
        NoteName.D,
        NoteName.D
      ]);
      done();
    });
  });
});
