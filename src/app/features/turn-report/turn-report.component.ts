import {
  ChangeDetectorRef,
  Component,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { TurnReport } from '../../core/types/turn-report.interface';
import { GameStoreService } from '../../core/services/game-store.service';
import { CommonModule } from '@angular/common';
import { EventsComponent } from './event/events.component';
import { Faction } from '../../core/models/faction/faction.model';
import { StatsPanelComponent } from './stats-panel/stats-panel.component';

@Component({
  selector: 'app-turn-report',
  imports: [CommonModule, EventsComponent, StatsPanelComponent],
  templateUrl: './turn-report.component.html',
  styleUrl: './turn-report.component.css',
})
export class TurnReportComponent implements OnInit {
  protected currentTurnReport!: TurnReport;
  protected previousTurnReport!: TurnReport;
  protected playerFaction!: Faction;

  constructor(private readonly store: GameStoreService) {}

  ngOnInit(): void {
    this.store.report.turnReports$.subscribe((reports) => {
      const current = reports[reports.length - 1];
      const prev = reports[reports.length - 2];
      this.currentTurnReport = current;
      this.previousTurnReport = prev;
    });

    this.playerFaction = this.store.faction
      .getAll()
      .filter((f) => f.player === true)[0];
  }
}
