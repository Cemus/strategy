import { CharacterStats } from '../models/character/character-stats.model';

export interface Trait {
  label: string;
  description: string;
  statModifiers?: Partial<CharacterStats>;
}
