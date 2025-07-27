import Dexie, { Table } from 'dexie';
import { ScaleEntity } from '../entity/scale-entity';

export class Database extends Dexie {
  public scales!: Table<ScaleEntity, string>;

  constructor() {
    super('TonalysDB');

    this.version(1).stores({
      scales: 'id, tonic, mode, notes'
    });
  }
}

export const db = new Database();
