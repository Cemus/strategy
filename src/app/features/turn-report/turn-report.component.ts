import { Component, OnInit } from '@angular/core';
import { TurnReport } from '../../core/types/turn-report.interface';
import { GameStoreService } from '../../core/services/game-store.service';
import { CommonModule } from '@angular/common';
import { EventsComponent } from './event/events.component';
import { Faction } from '../../core/models/faction/faction.model';
import { FactionStats } from '../../core/models/faction/faction-stats.model';

@Component({
  selector: 'app-turn-report',
  imports: [CommonModule, EventsComponent],
  templateUrl: './turn-report.component.html',
  styleUrl: './turn-report.component.css',
})
export class TurnReportComponent implements OnInit {
  protected currentTurnReport!: TurnReport;
  protected previousTurnReport: TurnReport | null = null;
  protected playerFaction!: Faction;

  constructor(private readonly gameStore: GameStoreService) {}

  ngOnInit(): void {
    this.gameStore.turnReport$.subscribe((report) => {
      this.previousTurnReport = report;
    });
    this.gameStore.previousTurnReport$.subscribe((report) => {
      this.previousTurnReport = report;
    });
    this.playerFaction = this.gameStore
      .getAllFactions()
      .filter((f) => f.player === true)[0];
  }

  formatDiff(stat: keyof FactionStats): string {
    const currentStat = this.playerFaction.stats[stat];
    const prevStat =
      this.previousTurnReport?.factions.filter((f) => f.player === true)[0]
        .stats[stat] ?? 0;
    const diff = currentStat - prevStat;

    if (diff > 0) {
      return '+' + diff;
    } else if (diff < 0) {
      return diff.toString();
    } else {
      return '—';
    }
  }

  statComparison(stat: keyof FactionStats): string {
    const currentStat = this.playerFaction.stats[stat];
    const prevStat =
      this.previousTurnReport?.factions.filter((f) => f.player === true)[0]
        .stats[stat] ?? 0;

    if (currentStat === prevStat) {
      return 'equal';
    } else if (currentStat > prevStat) {
      return 'superior';
    } else {
      return 'inferior';
    }
  }
}
