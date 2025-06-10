export class CharacterStats {
  private _governance: number;
  private _knowledge: number;
  private _diplomacy: number;
  private _might: number;
  private _loyalty: number;

  constructor(
    governance: number,
    knowledge: number,
    diplomacy: number,
    might: number,
    loyalty: number
  ) {
    this._governance = governance;
    this._knowledge = knowledge;
    this._diplomacy = diplomacy;
    this._might = might;
    this._loyalty = loyalty;
  }

  public get governance(): number {
    return this._governance;
  }
  public set governance(value: number) {
    this._governance = value;
  }

  public get knowledge(): number {
    return this._knowledge;
  }
  public set knowledge(value: number) {
    this._knowledge = value;
  }

  public get diplomacy(): number {
    return this._diplomacy;
  }
  public set diplomacy(value: number) {
    this._diplomacy = value;
  }

  public get might(): number {
    return this._might;
  }
  public set might(value: number) {
    this._might = value;
  }

  public get loyalty(): number {
    return this._loyalty;
  }
  public set loyalty(value: number) {
    this._loyalty = value;
  }
}
