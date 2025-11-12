import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { generateTurnReport } from '../utils/turn-report';
import { buildDefaultData } from '../utils/game-utils';
import FactionStoreService from './store/faction-store.service';
import CityStoreService from './store/city-store.service';
import FiefStoreService from './store/fief-store.service';
import CharacterStoreService from './store/character-store.service';
import VueStoreService from './store/vue-store.service';
import TurnStoreService from './store/turn-store.service';
import ReportStoreService from './store/report-store.service';
import MapStoreService from './store/map-store.service';

@Injectable({
  providedIn: 'root',
})
export class GameStoreService {
  private initializationSubject = new BehaviorSubject<boolean>(false);
  initialization$ = this.initializationSubject.asObservable();

  constructor(
    readonly faction: FactionStoreService,
    readonly city: CityStoreService,
    readonly fief: FiefStoreService,
    readonly character: CharacterStoreService,
    readonly vue: VueStoreService,
    readonly turn: TurnStoreService,
    readonly report: ReportStoreService,
    readonly map: MapStoreService,
  ) {}

  isInitialized() {
    return this.initializationSubject.value;
  }

  async init() {
    if (this.initializationSubject.value === false) {
      const { factions, cities, characters } = await buildDefaultData();

      this.city.updateAll(cities);
      this.faction.updateAll(factions);
      this.character.updateAll(characters);
      this.report.updateAll([generateTurnReport(factions, [])]);
      this.initializationSubject.next(true);
    }
  }
}
