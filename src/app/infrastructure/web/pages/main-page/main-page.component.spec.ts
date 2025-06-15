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
    component.scales.subscribe((scales) => {
      expect(scales.length).toBe(1);
      expect(scales[0].tonic.name).toBe('C');
      done();
    });
  });

  it('Given a scale, When getScalesNotes is called, Then it should return the correct notes string', () => {
    const result = component.getScalesNotes(fakeScale);
    expect(result).toBe('C - D - E - F - G - A - B');
  });
});
