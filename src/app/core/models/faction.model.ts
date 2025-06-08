import { Character } from './character/character.model';
import { City } from './city.model';
import { Fief } from './fief.model';

export class Faction {
  private _name: string;
  private _color: string;
  private _cities: City[];
  private _fiefs: Fief[];
  private _atWar: Faction[];
  private _characters: Character[];
  private _player: boolean;
  private _gold: number;
  private _resource: number;
  private _unit: number;
  private _population: number;
  private _spied: boolean;
  private _actionCount: number;

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

    this._cities = [];
    this._fiefs = [];
    this._gold = 1000;
    this._resource = 1000;
    this._unit = 250;
    this._population = 250;
    this._atWar = [];
    this._spied = false;
    this._actionCount = 3;
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

  get gold() {
    return this._gold;
  }

  set gold(val: number) {
    this._gold = val;
  }

  get resource() {
    return this._resource;
  }

  set resource(val: number) {
    this._resource = val;
  }

  get unit() {
    return this._unit;
  }

  set unit(val: number) {
    this._unit = val;
  }

  get population() {
    return this._population;
  }

  set population(val: number) {
    this._population = val;
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
