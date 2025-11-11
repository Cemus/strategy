import { Injectable } from '@angular/core';
import { WorldEvent } from '../types/world-event.interface';
import { CharacterEventService } from './events/character-event.service';
import CityEventService from './events/city-event.service';
import FactionEventService from './events/faction-event.service';
import { Faction } from '../models/faction/faction.model';
import { City } from '../models/city/city.model';
/*
@Injectable({ providedIn: 'root' })
export class WorldEventService {
  constructor(
    private readonly cityEventService: CityEventService,
    private readonly characterEventService: CharacterEventService,
    private readonly factionEventService: FactionEventService,
  ) {}

  generateEvents(factions: Faction[], cities:City[],): WorldEvent[] {
    return [
      ...this.cityEventService.generateEvents(),
      ...this.characterEventService.generateEvents(),
      ...this.factionEventService.generateEvents(),
    ];
  }
}
*/
