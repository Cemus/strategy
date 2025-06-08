import { v4 as uuidv4 } from 'uuid';
import { CharacterStats } from './character-stats.model';
import { Trait } from '../../types/trait.interface';
import { Fief } from '../fief.model';
import { Faction } from '../faction.model';

export class Character {
  private _id: string;
  private _name: string;
  private _gender: 'Male' | 'Female';
  private _avatar: string;
  private _model: string;
  private _job: Fief | null;
  private _stats: CharacterStats;
  private _exhausted: boolean;
  private _traits: Trait[];
  private _relations: Record<string, number> = {};
  private _faction: Faction;

  constructor(
    name: string,
    gender: 'Male' | 'Female',
    stats: CharacterStats,
    avatar: string,
    traits: Trait[] = [],
    faction: Faction
  ) {
    this._id = uuidv4();
    this._name = name;
    this._gender = gender;
    this._avatar = avatar;
    this._model = 'default';
    this._job = null;
    this._stats = stats;
    this._exhausted = false;
    this._traits = traits;
    this._relations = {};
    this._faction = faction;
  }

  public get id(): string {
    return this._id;
  }
  public set id(value: string) {
    this._id = value;
  }

  public get name(): string {
    return this._name;
  }
  public set name(value: string) {
    this._name = value;
  }

  public get gender(): 'Male' | 'Female' {
    return this._gender;
  }
  public set gender(value: 'Male' | 'Female') {
    this._gender = value;
  }

  public get avatar(): string {
    return this._avatar;
  }
  public set avatar(value: string) {
    this._avatar = value;
  }

  public get model(): string {
    return this._model;
  }
  public set model(value: string) {
    this._model = value;
  }

  public get job(): Fief | null {
    return this._job;
  }
  public set job(value: Fief | null) {
    this._job = value;
  }

  public get stats(): CharacterStats {
    return this._stats;
  }
  public set stats(value: CharacterStats) {
    this._stats = value;
  }

  public get exhausted(): boolean {
    return this._exhausted;
  }
  public set exhausted(value: boolean) {
    this._exhausted = value;
  }

  public get traits(): Trait[] {
    return this._traits;
  }
  public set traits(value: Trait[]) {
    this._traits = value;
  }

  public get relations(): Record<string, number> {
    return this._relations;
  }
  public set relations(value: Record<string, number>) {
    this._relations = value;
  }

  public get faction(): Faction {
    return this._faction;
  }
  public set faction(value: Faction) {
    this._faction = value;
  }

  public getCost(): number {
    const { knowledge, martial, administration, charisma, dexterity } =
      this._stats;

    const total = administration + knowledge + charisma + martial + dexterity;

    return Math.floor(total / 5);
  }
}
