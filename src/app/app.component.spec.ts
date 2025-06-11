import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { SCALE_REPOSITORY } from './application/repository/scale.repository';
import { of } from 'rxjs';
import { provideRouter } from '@angular/router';

const mockScaleRepository = {
  saveAll: () => of([]),
  getAll: () => of([]),
  getById: () => of(null),
};

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        provideRouter([]),
        { provide: SCALE_REPOSITORY, useValue: mockScaleRepository },
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
