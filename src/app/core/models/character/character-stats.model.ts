export class CharacterStats {
  private _knowledge: number;
  private _charisma: number;
  private _dexterity: number;
  private _administration: number;
  private _martial: number;

  constructor(
    knowledge: number,
    charisma: number,
    dexterity: number,
    administration: number,
    martial: number
  ) {
    this._knowledge = knowledge;
    this._charisma = charisma;
    this._dexterity = dexterity;
    this._administration = administration;
    this._martial = martial;
  }

  public get knowledge(): number {
    return this._knowledge;
  }
  public set knowledge(value: number) {
    this._knowledge = value;
  }

  public get charisma(): number {
    return this._charisma;
  }
  public set charisma(value: number) {
    this._charisma = value;
  }

  public get dexterity(): number {
    return this._dexterity;
  }
  public set dexterity(value: number) {
    this._dexterity = value;
  }

  public get administration(): number {
    return this._administration;
  }
  public set administration(value: number) {
    this._administration = value;
  }

  public get martial(): number {
    return this._martial;
  }
  public set martial(value: number) {
    this._martial = value;
  }
}
