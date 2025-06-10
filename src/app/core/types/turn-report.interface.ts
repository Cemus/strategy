import { WorldEvent } from './world-event.interface';
import { Faction } from '../models/faction/faction.model';

export interface TurnReport {
  factions: Faction[];
  worldEvents?: WorldEvent[];
}
