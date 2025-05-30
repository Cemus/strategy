import { v4 as uuidv4 } from 'uuid';
import { CharacterStats } from './character-stats.model';
import { Trait } from '../../types/trait.interface';
import { Fief } from '../fief.model';

export class Character {
  id: string;
  name: string;
  gender: 'Male' | 'Female';
  avatar: string;
  model: string;
  job: Fief | null;
  stats: CharacterStats;
  exhausted: boolean;
  traits: Trait[];
  relations: Record<string, number>[];

  constructor(
    name: string,
    gender: 'Male' | 'Female',
    stats: CharacterStats,
    avatar: string,
    traits: Trait[] = []
  ) {
    this.id = uuidv4();
    this.name = name;
    this.gender = gender;
    this.avatar = avatar;
    this.model = 'default';
    this.job = null;
    this.stats = stats;
    this.exhausted = false;
    this.traits = traits;
    this.relations = [];
  }

  public getCost(): number {
    const { knowledge, martial, administration, charisma, dexterity } =
      this.stats;

    const total = administration + knowledge + charisma + martial + dexterity;

    return Math.floor(total / 5);
  }
}
