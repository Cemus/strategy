import { Injectable } from '@angular/core';
import { Command } from '../../../types/command/command';
import { CityManagerService } from '../city/city-manager.service';
import { FactionManagerService } from '../faction/faction-manager.service';

@Injectable({
  providedIn: 'root',
})
export class CommandManagerService {
  constructor(
    private readonly cityManager: CityManagerService,
    private readonly factionManager: FactionManagerService,
  ) {}

  execute(command: Command) {
    switch (command.id) {
      case 'declareWar':
        this.factionManager.war(
          command.context.factions[0].id,
          command.context.factions[1].id,
        );
        break;
      case 'battle':
        break;
      case 'spyNetwork':
        this.factionManager.spyCity(
          command.context.factions[0].id,
          command.context.cities[0].id,
        );
        break;
      case 'fortify':
        this.cityManager.updateStat(command.context.cities[0].id, {
          security: 5,
        });
        break;
      case 'askTruce':
        this.factionManager.truce(
          command.context.factions[0].id,
          command.context.factions[1].id,
        );
        break;
      case 'random':
        break;
    }
  }
}
