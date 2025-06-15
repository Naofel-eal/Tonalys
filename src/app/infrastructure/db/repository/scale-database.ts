import Dexie, { Table } from 'dexie';
import { ScaleEntity } from '../entity/scale-entity';

export class ScaleDatabase extends Dexie {
  public scales!: Table<ScaleEntity, string>;

  constructor() {
    super('TonalysDB');

    this.version(1).stores({
      scales: 'id, tonic, mode'
    });
  }
}

export const scaleDb = new ScaleDatabase();
