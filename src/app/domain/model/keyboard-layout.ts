import { BlackKey } from "./black-key";
import { Key } from "./key";
import { Note } from "./note";
import { WhiteKey } from "./white-key";

export class KeyboardLayout {
    public readonly keys: Key[];

    public constructor(octaves: number = 1) {
        this.keys = [];
        let keyIndex = 0;
        for (let octave = 0; octave < octaves; ++octave) {
            for (const note of Note.values) {
                this.keys.push(Key.create(note, keyIndex++, octave));
            }
        }
    }

    public get whiteKeys(): WhiteKey[] {
        return this.keys.filter((k): k is WhiteKey => !k.isBlackKey);
    }
    public get blackKeys(): BlackKey[] {
        return this.keys.filter((k): k is BlackKey => k.isBlackKey);
    }

    public getLeftWhiteKeyIndex(blackKey: BlackKey): number | null {
        const whites = this.whiteKeys.filter(k => k.octave === blackKey.octave);
        let candidate: WhiteKey | undefined;
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
