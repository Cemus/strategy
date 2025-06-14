import { Component, OnInit } from '@angular/core';
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

  constructor(private readonly gameStore: GameStoreService) {}

  ngOnInit(): void {
    this.gameStore.turnReport$.subscribe((report) => {
      this.currentTurnReport = report;
    });
    this.gameStore.previousTurnReport$.subscribe((report) => {
      this.previousTurnReport = report;
    });
    this.playerFaction = this.gameStore
      .getAllFactions()
      .filter((f) => f.player === true)[0];
  }
}
