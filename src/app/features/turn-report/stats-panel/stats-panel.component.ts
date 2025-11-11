import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Faction } from '../../../core/models/faction/faction.model';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';
import { StatDisplayComponent } from './stat-display/stat-display.component';
import { TurnReport } from '../../../core/types/turn-report.interface';

@Component({
  selector: 'app-stats-panel',
  imports: [CommonModule, SharedModule, StatDisplayComponent],
  templateUrl: './stats-panel.component.html',
  styleUrl: './stats-panel.component.css',
})
export class StatsPanelComponent {
  @Input() playerFaction!: Faction;
  @Input() currentTurnReport!: TurnReport;
  @Input() previousTurnReport!: TurnReport;
}
