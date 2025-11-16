import { Character } from '../character/character.model';
import { City } from '../city/city.model';
import { v4 as uuidv4 } from 'uuid';
import { Fief } from '../fief/fief.model';
import { CivicStat } from '../../enums/faction/civic-stat.enum';
import { Formulae } from '../../utils/formulae.utils';

export class Faction {
  private _id: string;
  private _name: string;
  private _color: string;
  private _cities: City[] = [];
  private _fiefs: Fief[] = [];
  private _atWar: Faction[] = [];
  private _characters: Character[];
  private _player: boolean;
  private _stats: Record<CivicStat, number>;
  private _spied: boolean = false;
  private _actionCount: number = 3;

  constructor(
    name: string,
    color: string,
    characters: Character[],
    player: boolean,
    stats: Record<CivicStat, number>,
  ) {
    this._id = uuidv4();
    this._name = name;
    this._color = color;
    this._player = player;
    this._characters = characters;
    this._stats = stats;
  }

  public applyTurnEconomy() {
    const total: Partial<Record<CivicStat, number>> = {};

    this.cities.forEach((c) => {
      const cityEconomicOutput = c.computeCityEconomy();

      for (const key in cityEconomicOutput) {
        total[key as keyof Partial<Record<CivicStat, number>>] =
          (total[key as keyof Partial<Record<CivicStat, number>>] ?? 0) +
          (cityEconomicOutput[
            key as keyof Partial<Record<CivicStat, number>>
          ] ?? 0);
      }
    });

    for (const key in this.stats) {
      this.stats[key as keyof Record<CivicStat, number>] +=
        total[key as keyof Partial<Record<CivicStat, number>>] ?? 0;
    }

    this.stats.security = Formulae.clamp(this.stats.security);

    const satisfactionGrowth = Math.floor(
      (50 - (100 - this.stats.security)) / 10,
    );
    this.stats.satisfaction = Formulae.clamp(
      this.stats.satisfaction + satisfactionGrowth,
    );
  }

  public get id(): string {
    return this._id;
  }
  public set id(value: string) {
    this._id = value;
  }

  get name() {
    return this._name;
  }

  set name(val: string) {
    this._name = val;
  }

  get color() {
    return this._color;
  }

  set color(val: string) {
    this._color = val;
  }

  get cities() {
    return this._cities;
  }

  set cities(val: City[]) {
    this._cities = val;
  }

  get fiefs() {
    return this._fiefs;
  }

  set fiefs(val: Fief[]) {
    this._fiefs = val;
  }

  get atWar() {
    return this._atWar;
  }

  set atWar(val: Faction[]) {
    this._atWar = val;
  }

  get characters() {
    return this._characters;
  }

  set characters(val: Character[]) {
    this._characters = val;
  }

  get player() {
    return this._player;
  }

  set player(val: boolean) {
    this._player = val;
  }

  get stats(): Record<CivicStat, number> {
    return this._stats;
  }

  set stats(val: Record<CivicStat, number>) {
    this._stats = val;
  }

  get spied() {
    return this._spied;
  }

  set spied(val: boolean) {
    this._spied = val;
  }

  get actionCount() {
    return this._actionCount;
  }

  set actionCount(val: number) {
    this._actionCount = val;
  }
}
