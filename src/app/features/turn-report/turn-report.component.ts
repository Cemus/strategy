import { Component, OnInit } from '@angular/core';
import { TurnReport } from '../../core/types/turn-report.interface';
import { GameStoreService } from '../../core/services/game-store.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-turn-report',
  imports: [CommonModule],
  templateUrl: './turn-report.component.html',
  styleUrl: './turn-report.component.css',
})
export class TurnReportComponent implements OnInit {
  protected previousTurnReport: TurnReport | null = null;
  protected currentTurnReport!: TurnReport;

  constructor(private readonly gameStore: GameStoreService) {}

  ngOnInit(): void {
    this.gameStore.turnReport$.subscribe((report) => {
      if (this.currentTurnReport) {
        this.previousTurnReport = this.currentTurnReport;
      }
      this.currentTurnReport = report;
    });
  }
}
