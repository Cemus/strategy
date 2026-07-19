import { Injectable } from '@angular/core';
import { EventManagerService } from './event/event-manager.service';
import { FiefManagerService } from './fief/fief-manager.service';
import { CharacterManagerService } from './character/character-manager.service';
import { ReportManagerService } from './report/report-manager.service';
import { TurnManagerService } from './turn/turn-manager.service';
import { CityManagerService } from './city/city-manager.service';
import { FactionManagerService } from './faction/faction-manager.service';
import { buildDefaultData } from '../../utils/game-data.utils';
import { ViewManagerservice } from './view/view-manager.service';
import { MapManagerService } from './map/map-manager.service';
import { CommandManagerService } from './command/command-manager.service';

@Injectable({ providedIn: 'root' })
export default class GameManagerService {
  public isInitialized: boolean = false;

  constructor(
    readonly character: CharacterManagerService,
    readonly fief: FiefManagerService,
    readonly event: EventManagerService,
    readonly report: ReportManagerService,
    readonly turn: TurnManagerService,
    readonly city: CityManagerService,
    readonly faction: FactionManagerService,
    readonly view: ViewManagerservice,
    readonly map: MapManagerService,
    readonly command: CommandManagerService,
  ) {}

  async init() {
    if (this.isInitialized === false) {
      const { factions, cities, characters } = await buildDefaultData();

      this.city.init(cities);
      this.faction.init(factions);
      this.character.init(characters);
      this.report.init(factions);
      this.isInitialized = true;
    }
  }
}
