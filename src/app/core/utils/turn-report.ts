import { Faction } from '../models/faction/faction.model';
import {
  FactionStatSnapShot,
  TurnReport,
} from '../types/turn-report.interface';

export function generateTurnReport(factions: Faction[]): TurnReport {
  const factionsSnapshot: FactionStatSnapShot[] = [];

  factions.forEach((f) => {
    const currentFactionSnapShot = new FactionStatSnapShot(f.id, {
      ...f.stats,
    });

    factionsSnapshot.push(currentFactionSnapShot);
  });

  return {
    factionsSnapshot: factionsSnapshot,
  };
}
