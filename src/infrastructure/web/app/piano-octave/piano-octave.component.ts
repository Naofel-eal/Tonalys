import { Component, Input } from '@angular/core';
import { KeyboardLayout, Note, Key } from '../../../../domain';
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
  public set notesToHighlight(value: Note[]) {
    this.highlighted.clear();
    if (value) value.forEach(note => this.highlighted.add(note.name));
  }
  
  @Input()
  public rootNote?: Note;

  public get whiteKeys(): Key[] { return this.layout.whiteKeys; }
  public get blackKeys(): Key[] { return this.layout.blackKeys; }

  public isActive(key: Key): boolean {
    return this.highlighted.has(key.note.name);
  }

  public getBlackKeyPosition(key: Key): number | null {
    return this.layout.getLeftWhiteKeyIndex(key);
  }

  public get whiteKeyWidthPercent(): number {
    return PianoOctaveComponent.WHITE_KEYS_TOTAL_WIDTH_PERCENT / this.whiteKeys.length;
  }

  public get blackKeyOffsetPx(): number {
    return PianoOctaveComponent.BLACK_KEY_OFFSET_PX;
  }
}
