import { Injectable } from '@angular/core';
import CharacterStoreService from './character/character-store.service';
import CityStoreService from './city/city-store.service';
import FactionStoreService from './faction/faction-store.service';
import FiefStoreService from './fief/fief-store.service';
import MapStoreService from './map/map-store.service';
import ReportStoreService from './report/report-store.service';
import TurnStoreService from './turn/turn-store.service';
import ViewStoreService from './view/view-store.service';

@Injectable({
  providedIn: 'root',
})
export class GameStoreService {
  constructor(
    readonly faction: FactionStoreService,
    readonly city: CityStoreService,
    readonly fief: FiefStoreService,
    readonly character: CharacterStoreService,
    readonly view: ViewStoreService,
    readonly turn: TurnStoreService,
    readonly report: ReportStoreService,
    readonly map: MapStoreService,
  ) {}
}
