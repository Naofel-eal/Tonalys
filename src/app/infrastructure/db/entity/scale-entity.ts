import { ModeName } from "src/app/domain/model/mode/mode-name";
import { NoteName } from "src/app/domain/model/note/note-name";

export interface ScaleEntity {
  id: string;
  tonic: NoteName;
  mode: ModeName; 
  notes: NoteName[];
}