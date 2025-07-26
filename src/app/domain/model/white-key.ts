import { Key } from "./key";

export class WhiteKey extends Key {
  public override get isBlackKey(): boolean { return false; }
}
