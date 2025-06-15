import { NoteName, ModeName } from "src/app/domain";

export interface ScaleEntity {
  id: string;
  tonic: NoteName;
  mode: ModeName; 
  notes: NoteName[];
}