import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { SharedModule } from '../../../../shared/shared.module';
import GameManagerService from '../../../../core/services/manager/game-manager.service';
import { FactionStat } from '../../../../core/models/faction/faction-stat.model';
import { TurnReport } from '../../../../core/types/turn-report.interface';
import { CivicStat } from '../../../../core/enums/civic-stat.enum';

@Component({
  selector: 'app-stat-display',
  imports: [CommonModule, SharedModule],
  templateUrl: './stat-display.component.html',
  styleUrl: './stat-display.component.css',
})
export class StatDisplayComponent implements OnInit, OnChanges {
  @Input() statName!: string;
  @Input() factionId!: string;
  @Input() currentTurnReport!: TurnReport;
  @Input() previousTurnReport!: TurnReport;

  protected currentValue: number = 0;
  protected prevValue: number = 0;

  constructor(protected readonly manager: GameManagerService) {}

  ngOnInit(): void {
    this.updateStatValues();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['currentTurnReport'] || changes['previousTurnReport']) {
      this.updateStatValues();
    }
  }

  statComparison(): string {
    if (this.currentValue === this.prevValue) {
      return 'equal';
    } else if (this.currentValue > this.prevValue) {
      return 'superior';
    } else {
      return 'inferior';
    }
  }

  updateStatValues() {
    this.currentValue = this.manager.report.getReportStat(
      this.factionId,
      this.statName as keyof Record<CivicStat, number>,
      this.currentTurnReport,
    );

    this.prevValue = this.manager.report.getReportStat(
      this.factionId,
      this.statName as keyof Record<CivicStat, number>,
      this.previousTurnReport,
    );
  }
}
