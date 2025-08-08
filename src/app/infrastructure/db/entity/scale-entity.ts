import { NoteName, ModeName, Chord } from "../../../domain";

export interface ScaleEntity {
  id: string;
  tonic: NoteName;
  mode: ModeName; 
  notes: NoteName[];
  chords: Chord[];
}