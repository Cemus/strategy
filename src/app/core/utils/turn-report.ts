import { Faction } from '../models/faction/faction.model';
import { TurnReport } from '../types/turn-report.interface';

export function generateTurnReport(factions: Faction[]): TurnReport {
  return {
    factions: factions,
  };
}
