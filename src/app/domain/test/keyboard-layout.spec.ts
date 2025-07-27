import { Key, KeyboardLayout, Note } from 'src/app/domain';

function getBlack(layout: KeyboardLayout, noteName: string, octave = 0): Key {
    return layout.blackKeys.find(
        k => k.note.name === noteName && k.octave === octave
    )!;
}
function getWhite(layout: KeyboardLayout, noteName: string, octave = 0): Key {
    return layout.Keys.find(
        k => k.note.name === noteName && k.octave === octave
    )!;
}

describe('KeyboardLayout', () => {

    it('should generate 12 keys per octave', () => {
        const layout = new KeyboardLayout(1);
        expect(layout.keys.length).toBe(12);
    });

    it('should generate correct number of keys for multiple octaves', () => {
        const layout = new KeyboardLayout(3);
        expect(layout.keys.length).toBe(36);
        expect(layout.Keys.length).toBe(7 * 3);
        expect(layout.blackKeys.length).toBe(5 * 3);
    });

    it('should correctly separate white and black keys', () => {
        const layout = new KeyboardLayout(1);
        expect(layout.Keys.every(k => k instanceof Key)).toBeTrue();
        expect(layout.blackKeys.every(k => k instanceof Key)).toBeTrue();
        expect(layout.Keys.length).toBe(7);
        expect(layout.blackKeys.length).toBe(5);
    });

    it('should assign correct notes and octaves to each key', () => {
        const layout = new KeyboardLayout(2);
        layout.keys.forEach((k, i) => {
            expect(k.note).toBeInstanceOf(Note);
            expect(k.octave).toBe(Math.floor(i / 12));
        });
    });

    describe('getLeftKeyIndex', () => {
        let layout: KeyboardLayout;
        beforeEach(() => { layout = new KeyboardLayout(1); });

        it('returns correct index for all black keys in C major octave', () => {
            expect(layout.getLeftKeyIndex(getBlack(layout, 'C#'))).toBe(0);
            expect(layout.getLeftKeyIndex(getBlack(layout, 'D#'))).toBe(1);
            expect(layout.getLeftKeyIndex(getBlack(layout, 'F#'))).toBe(3);
            expect(layout.getLeftKeyIndex(getBlack(layout, 'G#'))).toBe(4);
            expect(layout.getLeftKeyIndex(getBlack(layout, 'A#'))).toBe(5);
        });

        it('returns correct index for multi-octave layout', () => {
            const layout = new KeyboardLayout(2);
            expect(layout.getLeftKeyIndex(getBlack(layout, 'C#', 0))).toBe(0);
            expect(layout.getLeftKeyIndex(getBlack(layout, 'C#', 1))).toBe(0);
        });

        it('returns null for Key argument', () => {
            const white = getWhite(layout, 'C');
            expect(layout.getLeftKeyIndex(white)).toBeNull();
        });
    });

    it('should increment key indices across octaves', () => {
        const layout = new KeyboardLayout(2);
        expect(layout.keys[0].index).toBe(0);
        expect(layout.keys[12].index).toBe(12);
    });
});
