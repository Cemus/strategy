export class FactionStats {
  private _gold: number;
  private _resource: number;
  private _population: number;
  private _conscript: number;
  private _order: number;
  private _satisfaction: number;
  private _influence: number;

  constructor() {
    this._gold = 1000;
    this._resource = 500;
    this._population = 1000;
    this._conscript = 500;
    this._order = 80;
    this._satisfaction = 80;
    this._influence = 50;
  }

  public get gold(): number {
    return this._gold;
  }
  public set gold(value: number) {
    this._gold = value;
  }

  public get resource(): number {
    return this._resource;
  }
  public set resource(value: number) {
    this._resource = value;
  }

  public get population(): number {
    return this._population;
  }
  public set population(value: number) {
    this._population = value;
  }

  public get conscript(): number {
    return this._conscript;
  }
  public set conscript(value: number) {
    this._conscript = value;
  }

  public get order(): number {
    return this._order;
  }
  public set order(value: number) {
    this._order = value;
  }

  public get satisfaction(): number {
    return this._satisfaction;
  }
  public set satisfaction(value: number) {
    this._satisfaction = value;
  }

  public get influence(): number {
    return this._influence;
  }
  public set influence(value: number) {
    this._influence = value;
  }
}
