import { Chord, ModeName, NoteName } from "src/app/domain";

export interface ScaleEntity {
  id: string;
  tonic: NoteName;
  mode: ModeName; 
  notes: NoteName[];
  chords: Chord[];
}