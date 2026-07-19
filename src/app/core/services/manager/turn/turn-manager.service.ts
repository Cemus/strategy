import { Injectable } from '@angular/core';
import { Faction } from '../../../models/faction/faction.model';
import { GameStoreService } from '../../store/game-store.service';
import { EventManagerService } from '../event/event-manager.service';
import { ReportManagerService } from '../report/report-manager.service';
import { CharacterManagerService } from '../character/character-manager.service';

@Injectable({
  providedIn: 'root',
})
export class TurnManagerService {
  public turn$;
  public turnReports$;
  constructor(
    private readonly store: GameStoreService,
    private readonly event: EventManagerService,
    private readonly report: ReportManagerService,
    private readonly characterManager: CharacterManagerService,
  ) {
    this.turn$ = this.store.turn.turn$;
    this.turnReports$ = this.store.report.turnReports$;
  }

  end() {
    const currentFactions = this.store.faction.getAll();

    this.applyEconomy(currentFactions);
    const worldEvents = this.event.generateEvents(currentFactions);
    const turnReport = this.report.generateReport(currentFactions, worldEvents);

    this.store.turn.changeTurn();
    this.characterManager.unexhaustAll();
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
