import { Note } from "../note/note";
import { Key } from "./key";

export class KeyboardLayout {
    public readonly keys: Key[];

    public constructor(octaves: number = 1) {
        this.keys = [];
        let keyIndex = 0;
        for (let octave = 0; octave < octaves; ++octave) {
            for (const note of Note.values) {
                this.keys.push(new Key(note, keyIndex++, octave));
            }
        }
    }

    public get whiteKeys(): Key[] {
        return this.keys.filter(k => !k.isBlackKey);
    }
    public get blackKeys(): Key[] {
        return this.keys.filter(k => k.isBlackKey);
    }

    public getLeftWhiteKeyIndex(blackKey: Key): number | null {
        const whites = this.whiteKeys.filter(k => k.octave === blackKey.octave);
        let candidate: Key | undefined;
        for (const white of whites) {
            if (white.note.index < blackKey.note.index) {
                if (!candidate || white.note.index > candidate.note.index) {
                    candidate = white;
                }
            }
        }
        return candidate ? whites.indexOf(candidate) : null;
    }
}
