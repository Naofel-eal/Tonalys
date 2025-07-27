import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScaleDetailPageComponent } from './scale-detail-page.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('ScaleDetailPageComponent', () => {
  let component: ScaleDetailPageComponent;
  let fixture: ComponentFixture<ScaleDetailPageComponent>;
  const paramMap = new Map();
  paramMap.set("tonic", 'C#')
  paramMap.set("mode", 'Minor')
  let mockActivatedRoute = { paramMap: of(paramMap)}

  beforeEach((() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScaleDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
