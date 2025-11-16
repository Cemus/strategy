import { Faction } from '../faction/faction.model';
import { v4 as uuidv4 } from 'uuid';
import { Fief } from '../fief/fief.model';
import { CivicStat } from '../../enums/faction/civic-stat.enum';

export class City {
  private _id: string;
  private _name: string;
  private _faction: Faction;
  private _neighbors: City[];
  private _fiefs: Fief[];
  private _pathData: string;
  private _mapColor: string;
  private _stats: Record<CivicStat, number>;
  private _isCapital: boolean = false;

  constructor(
    name: string,
    faction: Faction,
    fiefs: Fief[],
    pathData: string,
    stats: Record<CivicStat, number>,
  ) {
    this._name = name;
    this._faction = faction;
    this._fiefs = fiefs;
    this._pathData = pathData;

    this._id = uuidv4();
    this._neighbors = [];
    this._mapColor = 'gray';

    this._stats = stats;
  }

  public computeCityEconomy() {
    const totals: Partial<Record<CivicStat, number>> = {};
    const cityBaseRevenue = 100;

    for (const fief of this.fiefs) {
      const output = fief.getEconomicOutput();
      for (const key in output) {
        totals[key as keyof Partial<Record<CivicStat, number>>] =
          (totals[key as keyof Partial<Record<CivicStat, number>>] ?? 0) +
          (output[key as keyof Partial<Record<CivicStat, number>>] ?? 0);
      }
    }

    totals[CivicStat.Gold] = (totals[CivicStat.Gold] ?? 0) + cityBaseRevenue;
    return totals;
  }

  get id() {
    return this._id;
  }

  set id(val: string) {
    this._id = val;
  }

  get name() {
    return this._name;
  }

  set name(val: string) {
    this._name = val;
  }

  get faction() {
    return this._faction;
  }

  set faction(val: Faction) {
    this._faction = val;
  }

  get neighbors() {
    return this._neighbors;
  }

  set neighbors(val: City[]) {
    this._neighbors = val;
  }

  get fiefs() {
    return this._fiefs;
  }

  set fiefs(val: Fief[]) {
    this._fiefs = val;
  }

  get pathData() {
    return this._pathData;
  }

  set pathData(val: string) {
    this._pathData = val;
  }

  get mapColor() {
    return this._mapColor;
  }

  set mapColor(val: string) {
    this._mapColor = val;
  }

  public get stats(): Record<CivicStat, number> {
    return this._stats;
  }
  public set stats(value: Record<CivicStat, number>) {
    this._stats = value;
  }

  public get isCapital(): boolean {
    return this._isCapital;
  }
  public set isCapital(value: boolean) {
    this._isCapital = value;
  }
}
