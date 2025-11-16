import { Injectable } from '@angular/core';
import { CivicStat } from '../../../enums/faction/civic-stat.enum';
import { GameStoreService } from '../../store/game-store.service';
import {
  FactionStatSnapShot,
  TurnReport,
} from '../../../types/report/turn-report.interface';
import { Faction } from '../../../models/faction/faction.model';
import { WorldEvent } from '../../../types/event/world-event.interface';

@Injectable({
  providedIn: 'root',
})
export class ReportManagerService {
  constructor(private readonly store: GameStoreService) {}

  init(factions: Faction[]) {
    this.store.report.addReport(this.generateReport(factions, []));
  }

  getCurrentReport(): TurnReport | null {
    const reports = this.store.report.getAll();
    if (reports.length === 0) return null;
    return reports[reports.length - 1];
  }

  getPreviousReport(): TurnReport | null {
    const reports = this.store.report.getAll();
    if (reports.length < 2) return null;
    return reports[reports.length - 2];
  }

  getReportStat(
    factionId: string,
    stat: keyof Record<CivicStat, number>,
    report: TurnReport | null,
  ): number {
    if (!report) return 0;
    const factionSnap = report.factionsSnapshot.find(
      (f) => f.factionId === factionId,
    );

    return factionSnap?.stats[stat] ?? 0;
  }

  generateReport(factions: Faction[], worldEvents: WorldEvent[]): TurnReport {
    const factionsSnapshot: FactionStatSnapShot[] = [];

    factions.forEach((f) => {
      const currentFactionSnapShot = new FactionStatSnapShot(f.id, {
        ...f.stats,
      });

      factionsSnapshot.push(currentFactionSnapShot);
    });

    return {
      factionsSnapshot: factionsSnapshot,
      worldEvents: worldEvents,
    };
  }
}
