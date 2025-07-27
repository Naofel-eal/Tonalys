import { Component, Input } from '@angular/core';
import { Scale } from 'src/app/domain/model/scale/scale';
import { KeyboardLayout } from 'src/app/domain/model/keyboard/keyboard-layout';
import { Key } from 'src/app/domain/model/keyboard/key';

@Component({
  selector: 'app-piano-octave',
  templateUrl: './piano-octave.component.html',
  styleUrls: ['./piano-octave.component.css'],
})
export class PianoOctaveComponent {
  private static readonly BLACK_KEY_OFFSET_PX = 16;
  private static readonly WHITE_KEYS_TOTAL_WIDTH_PERCENT = 100;

  private readonly layout = new KeyboardLayout();
  private readonly highlighted = new Set<string>();

  @Input()
  public set scale(value: Scale | undefined) {
    this.highlighted.clear();
    if (value) value.notes.forEach(note => this.highlighted.add(note.name));
  }

  public get Keys(): Key[] { return this.layout.Keys; }
  public get blackKeys(): Key[] { return this.layout.blackKeys; }

  public isActive(key: Key): boolean {
    return this.highlighted.has(key.note.name);
  }

  public getBlackKeyPosition(key: Key): number | null {
    return this.layout.getLeftKeyIndex(key);
  }

  public get KeyWidthPercent(): number {
    return PianoOctaveComponent.WHITE_KEYS_TOTAL_WIDTH_PERCENT / this.Keys.length;
  }

  public get blackKeyOffsetPx(): number {
    return PianoOctaveComponent.BLACK_KEY_OFFSET_PX;
  }
}
