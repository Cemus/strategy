import { Character } from '../character/character.model';
import { City } from '../city.model';
import { Fief } from '../fief.model';
import { FactionStats } from './faction-stats.model';

export class Faction {
  private _name: string;
  private _color: string;
  private _cities: City[] = [];
  private _fiefs: Fief[] = [];
  private _atWar: Faction[] = [];
  private _characters: Character[];
  private _player: boolean;
  private _stats: FactionStats = new FactionStats();
  private _spied: boolean = false;
  private _actionCount: number = 3;

  constructor(
    name: string,
    color: string,
    characters: Character[],
    player: boolean
  ) {
    this._name = name;
    this._color = color;
    this._player = player;
    this._characters = characters;
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

  get stats(): FactionStats {
    return this._stats;
  }

  set stats(val: FactionStats) {
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
