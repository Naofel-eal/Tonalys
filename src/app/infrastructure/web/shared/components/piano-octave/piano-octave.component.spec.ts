import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PianoOctaveComponent } from './piano-octave.component';
import { Scale } from 'src/app/domain/model/scale/scale';
import { Note } from 'src/app/domain/model/note/note';
import { Mode } from 'src/app/domain/model/mode/mode';

describe('PianoOctaveComponent', () => {
  let component: PianoOctaveComponent;
  let fixture: ComponentFixture<PianoOctaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({}).compileComponents();

    fixture = TestBed.createComponent(PianoOctaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should expose all white and black keys from layout', () => {
    expect(component.Keys.length).toBe(7);
    expect(component.blackKeys.length).toBe(5);
  });

  it('should clear highlights and set them correctly when scale is set', () => {
    const scale = new Scale(Note.C, Mode.MAJOR);
    component.scale = scale;
    expect(component.isActive(component.Keys[0])).toBeTrue();
    expect(component.isActive(component.Keys[1])).toBeTrue();
    expect(component.isActive(component.Keys[6])).toBeTrue();
    expect(component.isActive(component.blackKeys[0])).toBeFalse();
  });

  it('should return false for all keys if no scale is set', () => {
    component.scale = undefined;
    fixture.detectChanges();
    expect(component.Keys.every(k => !component.isActive(k))).toBeTrue();
    expect(component.blackKeys.every(k => !component.isActive(k))).toBeTrue();
  });

  it('should compute correct black key positions', () => {
    const blackKey = component.blackKeys[0];
    expect(component.getBlackKeyPosition(blackKey)).toBe(0);
    const fSharpKey = component.blackKeys.find(k => k.note.name === 'F#');
    expect(fSharpKey).toBeDefined();
    expect(component.getBlackKeyPosition(fSharpKey!)).toBe(3);
  });

  it('should compute correct white key width percent', () => {
    expect(component.KeyWidthPercent).toBeCloseTo(100 / 7, 5);
  });

  it('should return correct black key offset px', () => {
    expect(component.blackKeyOffsetPx).toBe(16);
  });

  it('should support custom scales with altered notes', () => {
    const customScale = new Scale(Note.E, Mode.DORIAN);
    component.scale = customScale;
    expect(component.isActive(component.Keys.find(k => k.note.name === 'E')!)).toBeTrue();
    expect(component.isActive(component.blackKeys.find(k => k.note.name === 'F#')!)).toBeTrue();
    expect(component.isActive(component.Keys.find(k => k.note.name === 'C')!)).toBeFalse();
  });
});
