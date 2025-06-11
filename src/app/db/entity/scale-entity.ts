import { ModeName } from "../../domain/model/mode-name";
import { NoteName } from "../../domain/model/note-name";

export interface ScaleEntity {
  id: string;
  tonic: NoteName;
  mode: ModeName; 
  notes: NoteName[];
}