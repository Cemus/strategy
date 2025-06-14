import { Component, Input } from '@angular/core';
import { Faction } from '../../../core/models/faction/faction.model';
import { TurnReport } from '../../../core/types/turn-report.interface';
import { CommonModule } from '@angular/common';
import { FactionStats } from '../../../core/models/faction/faction-stats.model';

@Component({
  selector: 'app-stats-panel',
  imports: [CommonModule],
  templateUrl: './stats-panel.component.html',
  styleUrl: './stats-panel.component.css',
})
export class StatsPanelComponent {
  @Input() currentTurnReport!: TurnReport;
  @Input() previousTurnReport!: TurnReport;
  @Input() playerFaction!: Faction;

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
