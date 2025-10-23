import { Component, Input } from '@angular/core';
import { Faction } from '../../../core/models/faction/faction.model';
import { TurnReport } from '../../../core/types/turn-report.interface';
import { CommonModule } from '@angular/common';
import { FactionStats } from '../../../core/models/faction/faction-stats.model';
import { SharedModule } from '../../../shared/shared.module';
import { StatDisplayComponent } from './stat-display/stat-display.component';

@Component({
  selector: 'app-stats-panel',
  imports: [CommonModule, SharedModule, StatDisplayComponent],
  templateUrl: './stats-panel.component.html',
  styleUrl: './stats-panel.component.css',
})
export class StatsPanelComponent {
  @Input() currentTurnReport!: TurnReport;
  @Input() previousTurnReport!: TurnReport;
  @Input() playerFaction!: Faction;

  previousStatValue(stat: keyof FactionStats): number {
    console.log('stat', stat);
    console.log(
      'prev bus',
      this.previousTurnReport?.factions.filter((f) => f.player === true)[0]
    );
    console.log(
      'prev',
      this.previousTurnReport?.factions.filter((f) => f.player === true)[0]
        .stats[stat] ?? 0
    );
    return (
      this.previousTurnReport?.factions.filter((f) => f.player === true)[0]
        .stats[stat] ?? 0
    );
  }

  currentStatValue(stat: keyof FactionStats): number {
    console.log('current', this.playerFaction.stats[stat]);
    return this.playerFaction.stats[stat];
  }
}
