import { Injectable } from '@angular/core';
import { Faction } from '../../../models/faction/faction.model';
import { generateTurnReport } from '../../../utils/turn-report';
import { GameStoreService } from '../../game-store.service';
import { EventManagerService } from '../event/event-manager.service';

@Injectable({
  providedIn: 'root',
})
export class TurnManagerService {
  constructor(
    private readonly store: GameStoreService,
    private readonly event: EventManagerService,
  ) {}

  end() {
    const currentFactions = this.store.faction.getAll();

    this.applyEconomy(currentFactions);
    const worldEvents = this.event.generateEvents(currentFactions);
    const turnReport = generateTurnReport(currentFactions, worldEvents);

    this.store.turn.changeTurn();
    this.store.view.update('report');
    this.store.report.addReport({ ...turnReport });
  }

  applyEconomy(factions: Faction[]) {
    factions.forEach((f) => {
      if (f.player) {
        //temp
        f.applyTurnEconomy();
        this.store.faction.updateSingle(f);
      }
    });
  }
}
