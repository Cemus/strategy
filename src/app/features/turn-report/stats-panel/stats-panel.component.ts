import { Component, Input } from '@angular/core';
import { Faction } from '../../../core/models/faction/faction.model';
import { TurnReport } from '../../../core/types/turn-report.interface';
import { CommonModule } from '@angular/common';
import { FactionStats } from '../../../core/models/faction/faction-stats.model';
import { SharedModule } from '../../../shared/shared.module';

@Component({
  selector: 'app-stats-panel',
  imports: [CommonModule, SharedModule],
  templateUrl: './stats-panel.component.html',
  styleUrl: './stats-panel.component.css',
})
export class StatsPanelComponent {
  @Input() currentTurnReport!: TurnReport;
  @Input() previousTurnReport!: TurnReport;
  @Input() playerFaction!: Faction;

  prevStatValue(stat: keyof FactionStats): number {
    return (
      this.previousTurnReport?.factions.filter((f) => f.player === true)[0]
        .stats[stat] ?? 0
    );
  }

  currentStatValue(stat: keyof FactionStats): number {
    return this.playerFaction.stats[stat];
  }

  statComparison(stat: keyof FactionStats): string {
    const currentStat = this.currentStatValue(stat);
    const prevStat = this.prevStatValue(stat);

    if (currentStat === prevStat) {
      return 'equal';
    } else if (currentStat > prevStat) {
      return 'superior';
    } else {
      return 'inferior';
    }
  }
}
