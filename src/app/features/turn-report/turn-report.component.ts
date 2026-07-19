import { Component, Input, OnInit } from '@angular/core';
import { EventsComponent } from './event/events.component';
import { Faction } from '../../core/models/faction/faction.model';
import { StatsPanelComponent } from './stats-panel/stats-panel.component';
import { TurnReport } from '../../core/types/report/turn-report.interface';
import GameManagerService from '../../core/services/manager/game-manager.service';

@Component({
  selector: 'app-turn-report',
  imports: [EventsComponent, StatsPanelComponent],
  templateUrl: './turn-report.component.html',
  styleUrl: './turn-report.component.css',
})
export class TurnReportComponent implements OnInit {
  protected currentTurnReport: TurnReport | null;
  protected previousTurnReport: TurnReport | null;
  @Input() playerFaction?: Faction;

  constructor(private readonly manager: GameManagerService) {
    this.currentTurnReport = this.manager.report.getCurrentReport();
    this.previousTurnReport = this.manager.report.getPreviousReport();
  }

  ngOnInit(): void {
    this.manager.turn.turnReports$.subscribe((reports) => {
      const current = reports[reports.length - 1];
      const prev = reports[reports.length - 2];
      this.currentTurnReport = current;
      this.previousTurnReport = prev;
    });

    if (this.playerFaction) {
      this.playerFaction = this.manager.faction.getFactionById(
        this.playerFaction.id,
      );
    }
    console.log(this.currentTurnReport);
    console.log(this.previousTurnReport);
    console.log(this.playerFaction);
  }
}
