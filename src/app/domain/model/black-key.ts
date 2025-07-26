import { Key } from "./key";

export class BlackKey extends Key {
  public override get isBlackKey(): boolean { return true; }
}