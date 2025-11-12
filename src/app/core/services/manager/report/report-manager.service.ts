import { Injectable } from '@angular/core';
import { CivicStat } from '../../../enums/civic-stat.enum';
import { TurnReport } from '../../../types/turn-report.interface';
import { GameStoreService } from '../../game-store.service';

@Injectable({
  providedIn: 'root',
})
export class ReportManagerService {
  constructor(private readonly store: GameStoreService) {}

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
}
