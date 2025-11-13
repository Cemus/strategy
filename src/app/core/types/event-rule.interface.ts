import { WorldEvent } from '../types/world-event.interface';

export type EventLevel = 'Fief' | 'City' | 'Faction' | 'Character';

export interface EventRule<Args extends any[]> {
  name: string;
  level: EventLevel;
  applicable?: (...args: Args) => boolean;
  chance: (...args: Args) => number;
  success: (...args: Args) => WorldEvent;
  failure?: (...args: Args) => WorldEvent;
  weight?: number;
  onSuccess?: (...args: Args) => void;
  onFailure?: (...args: Args) => void;
}
