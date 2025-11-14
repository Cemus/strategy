import { CharacterStat } from '../enums/character-stat.enum';

export interface Trait {
  label: string;
  description: string;
  statModifiers?: Partial<Record<Partial<CharacterStat>, number>>;
}
