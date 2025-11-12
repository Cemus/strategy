import { CivicStat } from '../enums/civic-stat.enum';

export interface WorldEvent {
  id: string;
  factionId: string;
  fiefId?: string;
  characterId?: string;
  title: string;
  description: string;
  effects?: Partial<Record<CivicStat, number>>;
}
